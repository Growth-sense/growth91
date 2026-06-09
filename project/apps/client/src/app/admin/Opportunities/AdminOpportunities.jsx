import React, { useState, useEffect } from "react";
import { Layout, Table, message, Button, Dropdown, Menu, Modal, Tag, Select, Input } from "antd";
import { EditOutlined, StopOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import Bridge from "../../constants/Bridge";
import { loadModulePermissions } from "../common/permissions";
import NoPermission from "../common/NoPermission";
import Sidebar2 from "../common/Sidebar2";
import Navbar from "../common/Navbar";
import OpportunityFormModal from "./OpportunityFormModal";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const { Content } = Layout;
const { Option } = Select;

const AdminOpportunities = () => {
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [copportunities, setCopportunities] = useState([]);
  const [searchinput, setSearchinput] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [adminId, setAdminId] = useState(null);

  // Status Update Modal
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  // permissions
  const [canEdit, setCanEdit] = useState(false);
  const [canView, setCanView] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
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
        setCanAdd(perms.canAdd);

        const adminRaw = localStorage.getItem("admin_login");
        if (adminRaw) {
          try {
            const adminData = JSON.parse(adminRaw);
            setAdminId(adminData.value);
          } catch (e) {}
        }

        getOpportunities();
      } catch (e) {
        setNoPermission(true);
      }
    };

    initialize();
  }, []);

  const getOpportunities = () => {
    setLoading(true);
    Bridge.adminGetOpportunities({})
      .then((result) => {
        if (result.status == 1) {
          setOpportunities(result.data || []);
          setCopportunities(result.data || []);
          setLoading(false);
        } else {
          message.error(result.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        message.error("Failed to load opportunities.");
        setLoading(false);
      });
  };

  const openAddDrawer = () => {
    setSelectedOpportunity(null);
    setDrawerVisible(true);
  };

  const openEditDrawer = (record) => {
    setSelectedOpportunity(record);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedOpportunity(null);
  };

  const openStatusModal = (record) => {
    setSelectedOpportunity(record);
    setNewStatus(record.liveStatus || "Publish");
    setStatusModalVisible(true);
  };

  const handleStatusUpdate = () => {
    if (!selectedOpportunity || !selectedOpportunity.mainId) {
      message.error("Cannot disable a draft that has never been published.");
      return;
    }

    setLoading(true);
    Bridge.adminUpdateOpportunityStatus({
      mainId: selectedOpportunity.mainId,
      status: newStatus,
    })
      .then((res) => {
        setLoading(false);
        setStatusModalVisible(false);
        if (res.status == 1) {
          message.success("Status updated successfully.");
          getOpportunities();
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error("Error updating status");
      });
  };

  const handleSearchAndFilter = (searchText, status) => {
    let arr = [...copportunities];

    if (status && status !== "All") {
      arr = arr.filter((item) => item.status === status);
    }

    if (searchText) {
      arr = arr.filter((item) => {
        return (
          (item.id && String(item.id).toLowerCase().includes(searchText.toLowerCase())) ||
          (item.startupName && item.startupName.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.instrumentType && item.instrumentType.toLowerCase().includes(searchText.toLowerCase()))
        );
      });
    }

    setOpportunities(arr);
    setSearchinput(searchText);
    setStatusFilter(status);
  };

  const onSearchChange = (e) => {
    handleSearchAndFilter(e.target.value, statusFilter);
  };

  const onFilterChange = (value) => {
    handleSearchAndFilter(searchinput, value);
  };

  const exportToCSV = (fileName) => {
    let arr = [];
    for (let item of opportunities) {
      let obj = {
        "Opportunity ID": item.id,
        "Startup Name": item.startupName || "---",
        "Instrument Type": item.instrumentType || "---",
        "Indicative Price Range": item.indicativePriceRange || "---",
        "Listing Status": item.status || "---",
        "Live Status": item.liveStatus || "---",
        "Created By": item.createdBy || "---",
        "Last Updated Timestamp": item.updatedAt ? moment(item.updatedAt).format("DD MMM, YYYY") : "---"
      };
      arr.push(obj);
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Opportunities exported successfully.");
  };

  const exportToCSVSingle = (fileName, item) => {
    let arr = [];
    const dataToExport = item.mainData || item;
    let obj = {
      "Opportunity ID": item.id, // Keep the original ID
      "Startup Name": dataToExport.startupName || "---",
      "Startup Description": dataToExport.startupDescription || "---",
      "Startup Logo URL": dataToExport.startupLogo ? `${process.env.REACT_APP_BASE_URL}api/uploads/opportunities/${dataToExport.startupLogo}` : "---",
      "Founder Information": dataToExport.founderInformation || "---",
      "Sector": dataToExport.sector || "---",
      "Stage": dataToExport.stage || "---",
      "Instrument Type": dataToExport.instrumentType || "---",
      "Indicative Price Range": dataToExport.indicativePriceRange || "---",
      "Website": dataToExport.website || "---",
      "LinkedIn": dataToExport.linkedIn || "---",
      "Listing Status": dataToExport.status || "---",
      "Live Status": dataToExport.liveStatus || "---",
      "Created By": item.createdBy || "---",
      "Last Updated Timestamp": item.updatedAt ? moment(item.updatedAt).format("DD MMM, YYYY") : "---",
      "News Articles (JSON)": dataToExport.newsArticles ? JSON.stringify(dataToExport.newsArticles) : "[]",
      "Social Media Links (JSON)": dataToExport.socialMediaLinks ? JSON.stringify(dataToExport.socialMediaLinks) : "[]"
    };
    arr.push(obj);
    
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Opportunity Details exported successfully.");
  };

  if (noPermission) {
      return (
        <Layout style={{ minHeight: "100vh", marginTop: 0 }} className="main-dashboard-container">
          <Navbar />
          <Layout className="site-layout">
            <Sidebar2 />
            <Content className="home-section">
              <NoPermission />
            </Content>
          </Layout>
        </Layout>
      );
  }

  const columns = [
    {
      title: "Opportunity ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Startup Name",
      dataIndex: "startupName",
      key: "startupName",
      width: 150,
      sorter: (a, b) => (a.startupName || "").localeCompare(b.startupName || ""),
    },
    {
      title: "Instrument Type",
      dataIndex: "instrumentType",
      key: "instrumentType",
      width: 130,
      sorter: (a, b) => (a.instrumentType || "").localeCompare(b.instrumentType || ""),
    },
    {
      title: "Indicative Price Range",
      dataIndex: "indicativePriceRange",
      key: "indicativePriceRange",
      width: 150,
      sorter: (a, b) => (a.indicativePriceRange || "").localeCompare(b.indicativePriceRange || ""),
    },
    {
      title: "Listing Status",
      key: "status",
      width: 120,
      sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
      render: (text, record) => {
        if (record.status === 'Draft') {
          return (
            <div>
              <Tag color="orange">Draft Edit</Tag>
              {record.liveStatus && <div style={{fontSize: 10, marginTop: 4}}>Live: {record.liveStatus}</div>}
            </div>
          );
        }
        return <Tag color={record.status === 'Publish' ? 'green' : 'red'}>{record.status}</Tag>;
      }
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 130,
      sorter: (a, b) => String(a.createdBy || "").localeCompare(String(b.createdBy || "")),
      render: (text) => text || "Unknown"
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 150,
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
      render: (text) => (text ? moment(text).format("DD MMM, YYYY") : "N/A"),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => {
        const menu = (
          <Menu mode="vertical" style={{ width: 180 }}>
            <Menu.Item icon={<EditOutlined />} disabled={!canEdit}>
              <a onClick={() => canEdit && openEditDrawer(record)} style={{ fontSize: 14 }}>
                &nbsp;&nbsp;Edit Opportunity
              </a>
            </Menu.Item>
            <Menu.Item icon={<StopOutlined />} disabled={!canEdit || !record.mainId}>
              <a onClick={() => canEdit && record.mainId && openStatusModal(record)} style={{ fontSize: 14 }}>
                &nbsp;&nbsp;Update Live Status
              </a>
            </Menu.Item>
            <Menu.Item icon={<i className="bx bxs-cloud-download"></i>} disabled={!canView}>
              <a onClick={() => canView && exportToCSVSingle(`Opportunity_Details_${record.id}`, record)} style={{ fontSize: 14 }}>
                &nbsp;&nbsp;Download Details
              </a>
            </Menu.Item>
          </Menu>
        );
        return (
          <div>
            <Dropdown overlay={menu} placement="bottomRight">
              <a onClick={(e) => e.preventDefault()}>
                <div className="menu-action">
                  <i className="bx bx-dots-vertical-rounded" style={{ fontSize: '20px', color: '#100050' }}></i>
                </div>
              </a>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", marginTop: 0 }} className="main-dashboard-container">
      <Navbar />
      <Layout className="site-layout">
        <Sidebar2 />
        <Content className="home-section" style={{ backgroundColor: "#F9F9FC", padding: "24px" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Opportunities Management</h4>
            {canAdd && (
              <Button type="primary" icon={<PlusOutlined />} onClick={openAddDrawer}>
                Add New Opportunity
              </Button>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <div className="admin-filter-bar">
              <Select 
                size="large"
                value={statusFilter}
                style={{ minWidth: 200 }} 
                onChange={onFilterChange}
                className="custom-status-select"
              >
                <Option value="All">All Statuses</Option>
                <Option value="Publish">Publish</Option>
                <Option value="Draft">Draft</Option>
              </Select>

              <Input 
                size="large"
                placeholder="Search" 
                value={searchinput}
                onChange={onSearchChange}
                style={{ maxWidth: 300 }}
                allowClear
              />

              <Button 
                size="large"
                type="primary" 
                onClick={() => exportToCSV("Opportunities_List")}
              >
                <i className="bx bxs-cloud-download" style={{ color: "#fff", position: "relative", top: 3, left: -3 }}></i> Export Data
              </Button>
            </div>

            <Table
              dataSource={opportunities}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 15 }}
              scroll={{ x: 1000 }}
            />
          </div>

          {/* Form Modal */}
          <OpportunityFormModal 
            visible={drawerVisible}
            onClose={closeDrawer}
            initialData={selectedOpportunity}
            adminId={adminId}
            onSuccess={() => {
              closeDrawer();
              getOpportunities();
            }}
          />

          {/* Status Update Modal */}
          <Modal
            title="Update Live Status"
            visible={statusModalVisible}
            onOk={handleStatusUpdate}
            onCancel={() => setStatusModalVisible(false)}
            confirmLoading={loading}
          >
            <div className="mb-3">
              <label className="form-label">Select Live Status</label>
              <Select 
                value={newStatus} 
                style={{ width: "100%" }} 
                onChange={(value) => setNewStatus(value)}
              >
                <Option value="Publish">Publish</Option>
                <Option value="Disable">Disable</Option>
              </Select>
              <p className="text-muted mt-2" style={{fontSize: '12px'}}>
                Note: Updating status immediately affects the main live listing. 
                Draft edits are preserved.
              </p>
            </div>
          </Modal>

          <style>{`
            /* Custom style to make Select remove border */
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

export default AdminOpportunities;
