import React, { useState, useEffect } from "react";
import { Layout, Table, message, Button, Dropdown, Menu, Modal, Tag, Select, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Bridge from "../../constants/Bridge";
import { loadModulePermissions } from "../common/permissions";
import NoPermission from "../common/NoPermission";
import Sidebar2 from "../common/Sidebar2";
import Navbar from "../common/Navbar";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const { Content } = Layout;
const { Option } = Select;

const STATUS_OPTIONS = [
  "Interest communicated to Seller",
  "Under Review",
  "KYC Pending",
  "Discussion Initiated",
  "Negotiation Stage",
  "Documentation Stage",
  "Completed",
  "Cancelled"
];

const AdminBuyerInterests = () => {
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState([]);
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [searchinput, setSearchinput] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Detail Modal
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState(null);

  // Status Update Modal
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const [canEdit, setCanEdit] = useState(false);
  const [canView, setCanView] = useState(false);
  const [noPermission, setNoPermission] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const perms = await loadModulePermissions("opportunities");
        if (!perms.canView) {
          setNoPermission(true);
          return;
        }
        setCanView(perms.canView);
        setCanEdit(perms.canEdit);
        getInterests();
      } catch (e) {
        setNoPermission(true);
      }
    };

    initialize();
  }, []);

  const getInterests = () => {
    setLoading(true);
    Bridge.adminGetBuyerInterests({})
      .then((result) => {
        if (result.status == 1) {
          setInterests(result.data || []);
          setFilteredInterests(result.data || []);
        } else {
          message.error(result.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed to load buyer interests.");
        setLoading(false);
      });
  };

  useEffect(() => {
    let result = [...interests];
    if (statusFilter !== "All") {
      result = result.filter(item => item.status === statusFilter);
    }
    if (searchinput) {
      const lower = searchinput.toLowerCase();
      result = result.filter(item =>
        (item.buyerName && item.buyerName.toLowerCase().includes(lower)) ||
        (item.buyerEmail && item.buyerEmail.toLowerCase().includes(lower)) ||
        (item.opportunityName && item.opportunityName.toLowerCase().includes(lower))
      );
    }
    setFilteredInterests(result);
  }, [searchinput, statusFilter, interests]);

  const handleUpdateStatus = () => {
    if (!newStatus || !selectedInterest) return;

    Bridge.adminUpdateBuyerInterestStatus({ id: selectedInterest.id, status: newStatus })
      .then((res) => {
        if (res.status == 1) {
          message.success("Status updated successfully.");
          setStatusModalVisible(false);
          getInterests();
        } else {
          message.error(res.message);
        }
      })
      .catch(() => message.error("Error updating status."));
  };

  const exportToCSV = () => {
    if (filteredInterests.length === 0) {
      message.warning("No data to export.");
      return;
    }
    const exportData = filteredInterests.map(item => ({
      "Interest ID": item.id,
      "Buyer Name": item.buyerName || "N/A",
      "Buyer Email": item.buyerEmail || "N/A",
      "Buyer Mobile": item.buyerMobile || "N/A",
      "Opportunity Name": item.opportunityName,
      "Amount Interested": item.interestType === "amount" ? item.interestValue : "N/A",
      "Quantity Interested": item.interestType === "securities" ? item.interestValue : "N/A",
      "Status": item.status,
      "Submitted On": item.submittedOn ? moment(item.submittedOn).format("DD MMM, YYYY") : "N/A"
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "Buyer_Interests_Export" + fileExtension);
  };

  const exportToCSVSingle = (record) => {
    const exportData = [{
      "Interest ID": record.id,
      "Buyer Name": record.buyerName || "N/A",
      "Buyer Email": record.buyerEmail || "N/A",
      "Buyer Mobile": record.buyerMobile || "N/A",
      "Buyer PAN": record.buyerPan || "N/A",
      "Residential Status": record.residentialStatus || "N/A",
      "Opportunity Name": record.opportunityName,
      "Interest Type": record.interestType,
      "Interest Value": record.interestValue,
      "Status": record.status,
      "Submitted On": record.submittedOn ? moment(record.submittedOn).format("DD MMM, YYYY") : "N/A"
    }];

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Buyer_Interest_${record.id}_Export${fileExtension}`);
  };

  const columns = [
    { title: "Interest ID", dataIndex: "id", key: "id", width: 120 },
    { title: "Buyer Name", dataIndex: "buyerName", key: "buyerName", width: 200 },
    { title: "Buyer Email ID", dataIndex: "buyerEmail", key: "buyerEmail", width: 250 },
    { title: "Buyer Mobile Number", dataIndex: "buyerMobile", key: "buyerMobile", width: 220 },
    { title: "Opportunity Name", dataIndex: "opportunityName", key: "opportunityName", width: 220 },
    {
      title: "Amount Interested",
      key: "amountInterested",
      width: 180,
      render: (_, record) => (
        <span>
          {record.interestType === 'amount' ? `₹${record.interestValue}` : "N/A"}
        </span>
      )
    },
    {
      title: "Quantity Interested",
      key: "quantityInterested",
      width: 180,
      render: (_, record) => (
        <span>
          {record.interestType === 'securities' ? `${record.interestValue}` : "N/A"}
        </span>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (status) => {
        let color = "default";
        if (status === "Completed") color = "success";
        if (status === "Under Review") color = "processing";
        if (status === "Cancelled") color = "error";
        return <span className={`ant-tag ant-tag-${color}`}>{status}</span>;
      }
    },
    {
      title: "Submitted On",
      dataIndex: "submittedOn",
      key: "submittedOn",
      width: 180,
      render: (val) => val ? moment(val).format("DD MMM, YYYY") : "N/A"
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => {
        const menu = (
          <Menu mode="vertical" style={{ width: 150 }}>
            {canEdit && (
              <Menu.Item key="status">
                <a onClick={() => { setSelectedInterest(record); setNewStatus(record.status); setStatusModalVisible(true); }} style={{ fontSize: 14 }}>
                  &nbsp;&nbsp;Update Status
                </a>
              </Menu.Item>
            )}
            <Menu.Item key="download">
              <a onClick={() => exportToCSVSingle(record)} style={{ fontSize: 14 }}>
                &nbsp;&nbsp;Download
              </a>
            </Menu.Item>
          </Menu>
        );
        return (
          <div>
            <Dropdown overlay={menu} placement="bottom">
              <a onClick={(e) => e.preventDefault()}>
                <div className="menu-action">
                  <i className="bx bx-dots-vertical-rounded" style={{ fontSize: '20px', color: '#100050' }}></i>
                </div>
              </a>
            </Dropdown>
          </div>
        );
      }
    }
  ];

  if (noPermission) return <NoPermission />;

  return (
    <Layout
      style={{ minHeight: "100vh", marginTop: 0 }}
      className="main-dashboard-container"
    >
      <Navbar />
      <Layout className="site-layout">
        <Sidebar2 />
        <Content className="home-section">
          <div style={{ padding: "16px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: "#fff", borderRadius: "8px" }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0" style={{ fontWeight: 600 }}>Buyer Interests</h4>
                <Button type="primary" onClick={exportToCSV}>Export Data</Button>
              </div>

              <div className="admin-filter-bar">
                <Select
                  size="large"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{ minWidth: 200 }}
                  className="custom-status-select"
                >
                  <Option value="All">All Statuses</Option>
                  {STATUS_OPTIONS.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
                </Select>
                <Input
                  size="large"
                  placeholder="Search by Buyer Name, Email or Opportunity..."
                  value={searchinput}
                  onChange={e => setSearchinput(e.target.value)}
                  style={{ maxWidth: 300 }}
                />
              </div>

              <Table
                columns={columns}
                dataSource={filteredInterests}
                rowKey="id"
                loading={loading}
                scroll={{ x: 1500 }}
                pagination={{ pageSize: 20 }}
              />
            </div>
          </div>

          {/* Status Modal */}
          <Modal
            title="Update Status"
            visible={statusModalVisible}
            onCancel={() => setStatusModalVisible(false)}
            onOk={handleUpdateStatus}
          >
            <div className="mb-2">Select new status:</div>
            <Select value={newStatus} onChange={setNewStatus} style={{ width: '100%' }}>
              {STATUS_OPTIONS.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
            </Select>
          </Modal>

          {/* Detail Modal */}
          <Modal
            title="Buyer Interest Details"
            visible={detailModalVisible}
            onCancel={() => setDetailModalVisible(false)}
            footer={[
              <Button key="close" onClick={() => setDetailModalVisible(false)}>Close</Button>,
              <Button key="download" type="primary" onClick={() => exportToCSVSingle(selectedInterest)}>Download</Button>
            ]}
          >
            {selectedInterest && (
              <div>
                <p><strong>Interest ID:</strong> {selectedInterest.id}</p>
                <p><strong>Opportunity:</strong> {selectedInterest.opportunityName}</p>
                <hr />
                <h6>Buyer Information</h6>
                <p><strong>Name:</strong> {selectedInterest.buyerName}</p>
                <p><strong>Email:</strong> {selectedInterest.buyerEmail}</p>
                <p><strong>Mobile:</strong> {selectedInterest.buyerMobile}</p>
                <p><strong>PAN:</strong> {selectedInterest.buyerPan}</p>
                <p><strong>Residential Status:</strong> {selectedInterest.residentialStatus}</p>
                <hr />
                <h6>Interest Details</h6>
                <p>
                  <strong>{selectedInterest.interestType === 'securities' ? 'Number of Securities' : 'Investment Amount'}:</strong>{' '}
                  {selectedInterest.interestType === 'amount' ? `₹${selectedInterest.interestValue}` : selectedInterest.interestValue}
                </p>
                <p><strong>Status:</strong> <Tag color="blue">{selectedInterest.status}</Tag></p>
                <p><strong>Submitted On:</strong> {moment(selectedInterest.submittedOn).format("DD MMM, YYYY hh:mm A")}</p>
              </div>
            )}
          </Modal>

          <style>{`
            .custom-status-select .ant-select-selector {
              border: none !important;
              background: #f8f9fc !important;
              border-radius: 6px !important;
            }
            
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

export default AdminBuyerInterests;
