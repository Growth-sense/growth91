import React, { useState, useEffect } from 'react';
import { Table, message, Typography, Layout, Button, Input } from 'antd';
import Bridge from '../../constants/Bridge';
import Navbar from '../common/Navbar';
import Sidebar2 from '../common/Sidebar2';
import { loadModulePermissions } from "../common/permissions";
import NoPermission from "../common/NoPermission";
import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const { Content } = Layout;

const { Title } = Typography;

const AdminStartupRequests = () => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [canView, setCanView] = useState(false);
    const [noPermission, setNoPermission] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                const perms = await loadModulePermissions("startup_requests");
                if (!perms.canView) {
                    setNoPermission(true);
                    return;
                }
                setCanView(true);
                fetchRequests();
            } catch (e) {
                setNoPermission(true);
            }
        };

        initialize();
    }, []);

    useEffect(() => {
        let result = [...requests];
        if (searchInput) {
            const lower = searchInput.toLowerCase();
            result = result.filter(item =>
                (item.userName && item.userName.toLowerCase().includes(lower)) ||
                (item.userEmail && item.userEmail.toLowerCase().includes(lower)) ||
                (item.startupName && item.startupName.toLowerCase().includes(lower))
            );
        }
        setFilteredRequests(result);
    }, [searchInput, requests]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await Bridge.adminGetStartupRequests({});
            if (res.status == 1) {
                setRequests(res.data || []);
                setFilteredRequests(res.data || []);
            } else {
                message.error(res.message || 'Failed to fetch requests');
            }
        } catch (error) {
            console.error(error);
            message.error('Error fetching requests');
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (filteredRequests.length === 0) {
            message.warning("No data to export.");
            return;
        }
        const exportData = filteredRequests.map(item => ({
            "Request ID": item.id,
            "User Name": item.userName || "N/A",
            "User Email": item.userEmail || "N/A",
            "Role": item.userRole || "N/A",
            "Requested Startup": item.startupName || "N/A",
            "Requirements/Comments": item.requirements || "N/A",
            "Investment Amount (₹)": item.investmentAmount || "N/A",
            "Submitted Date": item.createdAt ? moment(item.createdAt).format("DD MMM, YYYY") : "N/A"
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Startup_Requests_Export" + fileExtension);
    };

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            width: 200,
            render: (text, record) => (
                <div>
                    <div><strong>{text}</strong></div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{record.userEmail}</div>
                </div>
            )
        },
        {
            title: 'Role',
            dataIndex: 'userRole',
            key: 'userRole',
        },
        {
            title: 'Requested Startup',
            dataIndex: 'startupName',
            key: 'startupName',
            render: (text) => <strong style={{ color: '#000000ff' }}>{text}</strong>
        },
        {
            title: 'Requirements/Comments',
            dataIndex: 'requirements',
            key: 'requirements',
            render: (text) => (
                <div style={{ maxWidth: '300px', whiteSpace: 'pre-wrap' }}>
                    {text || 'N/A'}
                </div>
            )
        },
        {
            title: 'Investment Amount (₹)',
            dataIndex: 'investmentAmount',
            key: 'investmentAmount',
            render: (text) => text || 'N/A'
        },
        {
            title: 'Submitted Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (text) => moment(text).format("DD MMM, YYYY")
        }
    ];

    if (noPermission) {
        return <NoPermission />;
    }

    return (
        <Layout style={{ minHeight: "100vh", marginTop: 0 }} className="main-dashboard-container">
            <Navbar />
            <Layout className="site-layout">
                <Sidebar2 />
                <Content className="home-section">
                    <div style={{ padding: "16px" }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: "#fff", borderRadius: "8px" }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="mb-0" style={{ fontWeight: 600 }}>Startup Discovery Requests</h4>
                                <Button type="primary" onClick={exportToCSV}>Export Data</Button>
                            </div>

                            <div className="admin-filter-bar">
                                <Input
                                    size="large"
                                    placeholder="Search by User Name, Email or Startup."
                                    value={searchInput}
                                    onChange={e => setSearchInput(e.target.value)}
                                    style={{ maxWidth: 400 }}
                                />
                            </div>

                            <Table 
                                columns={columns} 
                                dataSource={filteredRequests}
                                rowKey="id"
                                loading={loading}
                                pagination={{ pageSize: 15 }}
                                scroll={{ x: 1000 }}
                            />
                        </div>
                    </div>

                    <style>{`
                        .admin-filter-bar {
                            display: flex;
                            justify-content: flex-end;
                            gap: 15px;
                            margin-bottom: 20px;
                            flex-wrap: wrap;
                        }

                        @media (max-width: 768px) {
                            .admin-filter-bar {
                                justify-content: flex-start;
                            }
                            .admin-filter-bar > * {
                                width: 100% !important;
                                max-width: 100% !important;
                            }
                        }
                    `}</style>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminStartupRequests;
