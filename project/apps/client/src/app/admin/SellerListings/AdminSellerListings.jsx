/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Button,
  Modal,
  message,
  Select,
  Input,
  Drawer,
  Descriptions,
  Space,
  Typography,
  Dropdown,
  Menu
} from "antd";
import Navbar from "../common/Navbar";
import BottomBar from "../common/BottomBar";
import Bridge from "../../constants/Bridge";
import { EditOutlined, DownloadOutlined, FileTextOutlined, EyeOutlined, MessageOutlined } from "@ant-design/icons";
import Sidebar2 from "../common/Sidebar2";
import moment from "moment";
import { loadModulePermissions } from "../common/permissions";
import NoPermission from "../common/NoPermission";

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

class AdminSellerListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      loading: false,
      detailVisible: false,
      selectedListing: null,
      
      // actions
      updateStatusModal: false,
      commentModal: false,
      newStatus: "",
      newComment: "",
      assignedTo: "",

      // permissions
      canEdit: false,
      canView: false,
      noPermission: false,
    };
  }

  async componentDidMount() {
    await this.loadPermissions();
    if (this.state.noPermission) return;
    this.getListings();
  }

  loadPermissions = async () => {
    try {
      const perms = await loadModulePermissions("seller_listings");
      if (!perms.canView) {
        this.setState({ noPermission: true });
        return;
      }
      this.setState({
        canView: perms.canView,
        canEdit: perms.canEdit,
      });
    } catch (e) {
      this.setState({ noPermission: true });
    }
  };

  getListings = () => {
    this.setState({ loading: true });
    Bridge.adminGetSellerListings({}).then((result) => {
      if (result.status == 1) {
        this.setState({
          listings: result.data || [],
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({ loading: false });
      }
    });
  };

  openDetailDrawer = (record) => {
    this.setState({
      selectedListing: record,
      detailVisible: true,
    });
  };

  closeDetailDrawer = () => {
    this.setState({
      selectedListing: null,
      detailVisible: false,
    });
  };

  openStatusModal = (record) => {
    this.setState({
      selectedListing: record,
      newStatus: record.sdStatus,
      updateStatusModal: true,
    });
  };

  openCommentModal = (record) => {
    this.setState({
      selectedListing: record,
      newComment: record.sdAdminComment || "",
      commentModal: true,
    });
  };

  handleStatusUpdate = () => {
    const { selectedListing, newStatus } = this.state;
    this.setState({ loading: true });
    Bridge.adminUpdateSellerListingStatus({
      sdSdID: selectedListing.sdSdID,
      sdStatus: newStatus,
    }).then((result) => {
      this.setState({ loading: false, updateStatusModal: false });
      if (result.status == 1) {
        message.success("Status updated successfully.");
        this.getListings();
      } else {
        message.error(result.message);
      }
    });
  };

  handleCommentUpdate = () => {
    const { selectedListing, newComment } = this.state;
    this.setState({ loading: true });
    Bridge.adminUpdateSellerListingComment({
      sdSdID: selectedListing.sdSdID,
      sdAdminComment: newComment,
    }).then((result) => {
      this.setState({ loading: false, commentModal: false });
      if (result.status == 1) {
        message.success("Comment updated successfully.");
        this.getListings();
      } else {
        message.error(result.message);
      }
    });
  };

  renderDocumentLink = (url, name, id) => {
    if (!url) return <Text type="secondary">Not Uploaded</Text>;
    return (
      <a href={`${process.env.REACT_APP_BASE_URL}api/uploads/seller_listings/${id}/${url}`} target="_blank" rel="noopener noreferrer">
        <Space><FileTextOutlined /> View {name}</Space>
      </a>
    );
  };

  render() {
    if (this.state.noPermission) {
      return (
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
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

    const { listings, loading, selectedListing } = this.state;

    const columns = [
      {
        title: "Listing ID",
        dataIndex: "sdSdID",
        key: "sdSdID",
        width: 120,
        fixed: "left",
        render: (text) => <strong>#{text}</strong>,
      },
      {
        title: "Submission Date",
        dataIndex: "sdPublishedAt",
        key: "sdPublishedAt",
        width: 150,
        render: (text) => moment(text).format("DD MMM YYYY"),
      },
      {
        title: "Seller Name",
        dataIndex: "sdUserName",
        key: "sdUserName",
        width: 200,
      },
      {
        title: "Startup Name",
        dataIndex: "sdStartupName",
        key: "sdStartupName",
        width: 200,
      },
      {
        title: "Instrument",
        dataIndex: "sdInstrumentType",
        key: "sdInstrumentType",
        width: 150,
      },
      {
        title: "Quantity",
        dataIndex: "sdQuantity",
        key: "sdQuantity",
        width: 120,
      },
      {
        title: "Indicative Price",
        dataIndex: "sdAskPriceExpected",
        key: "sdAskPriceExpected",
        width: 150,
        render: (text) => `₹ ${text}`,
      },
      {
        title: "Status",
        dataIndex: "sdStatus",
        key: "sdStatus",
        width: 180,
        render: (text) => {
          let color = "default";
          if (text === "Approved") color = "success";
          if (text === "Under Review") color = "processing";
          if (text === "Rejected") color = "error";
          if (text === "Additional Information Required") color = "warning";
          if (text === "On Hold") color = "default";
          return <span className={`ant-tag ant-tag-${color}`}>{text}</span>;
        },
      },
      // {
      //   title: "Assigned To",
      //   dataIndex: "sdAssignedToName",
      //   key: "sdAssignedToName",
      //   width: 150,
      //   render: (text) => text || "Unassigned",
      // },
      {
        title: "Actions",
        key: "actions",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          const menu = (
            <Menu
              mode="vertical"
              style={{ width: 200 }}
            >
              <Menu.Item icon={<EyeOutlined />}>
                <a onClick={() => this.openDetailDrawer(record)} style={{ fontSize: 14 }}>
                  &nbsp;&nbsp;View Details
                </a>
              </Menu.Item>
              {this.state.canEdit && (
                <>
                  <Menu.Item icon={<EditOutlined />}>
                    <a onClick={() => this.openStatusModal(record)} style={{ fontSize: 14 }}>
                      &nbsp;&nbsp;Update Status
                    </a>
                  </Menu.Item>
                  <Menu.Item icon={<MessageOutlined />}>
                    <a onClick={() => this.openCommentModal(record)} style={{ fontSize: 14 }}>
                      &nbsp;&nbsp;Admin Comment
                    </a>
                  </Menu.Item>
                </>
              )}
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
        },
      },
    ];

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
              <Breadcrumb style={{ margin: "0 0 16px 0" }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Buy/Sell</Breadcrumb.Item>
                <Breadcrumb.Item>Seller Listings</Breadcrumb.Item>
              </Breadcrumb>
              
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: "#fff", borderRadius: "8px" }}>
                <Title level={3}>Seller Listings</Title>
                <p>Review and verify seller submissions before marking them as Approved.</p>
                
                <div className="admin-table-wrapper">
                <Table 
                  dataSource={listings} 
                  columns={columns} 
                  rowKey="sdSdID"
                  loading={loading}
                  scroll={{ x: 'max-content' }}
                  pagination={{ pageSize: 10 }}
                  bordered
                />
              </div>
              <style>{`
                .admin-table-wrapper {
                  width: 100%;
                  overflow-x: auto;
                  -webkit-overflow-scrolling: touch;
                }
                
                @media (max-width: 768px) {
                  .admin-table-wrapper .ant-table-cell-fix-left,
                  .admin-table-wrapper .ant-table-cell-fix-right {
                    position: static !important;
                  }
                  
                  .admin-table-wrapper .ant-table-ping-left .ant-table-cell-fix-left-last::after,
                  .admin-table-wrapper .ant-table-ping-right .ant-table-cell-fix-right-first::after {
                    box-shadow: none !important;
                  }
                }
              `}</style>
              </div>
            </div>
          </Content>
          <BottomBar />
        </Layout>

        {/* Detail Drawer */}
        {selectedListing && (
          <Modal
            title={`Listing Details #${selectedListing.sdSdID}`}
            width={720}
            onCancel={this.closeDetailDrawer}
            visible={this.state.detailVisible}
            footer={null}
          >
            <Descriptions title="A. Seller Information" bordered column={1} size="small" className="mb-4">
              <Descriptions.Item label="User Name">{selectedListing.sdUserName}</Descriptions.Item>
              <Descriptions.Item label="Investor Name">{selectedListing.sdInvestorName || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedListing.sdUserEmail}</Descriptions.Item>
              <Descriptions.Item label="Mobile">{selectedListing.sdUserMobile}</Descriptions.Item>
              <Descriptions.Item label="PAN">{selectedListing.sdPanNumber || 'N/A'} ({selectedListing.sdPanName || 'N/A'})</Descriptions.Item>
              <Descriptions.Item label="Residential Status">{selectedListing.sdResidentialStatus}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="B. Startup Information" bordered column={1} size="small" className="mb-4">
              <Descriptions.Item label="Legal Name">{selectedListing.sdLegalName}</Descriptions.Item>
              <Descriptions.Item label="Startup/Common Name">{selectedListing.sdStartupName}</Descriptions.Item>
              <Descriptions.Item label="Year of Investment">{selectedListing.sdYearOfInvestment}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="C. Security Information" bordered column={1} size="small" className="mb-4">
              <Descriptions.Item label="Instrument Type">{selectedListing.sdInstrumentType}</Descriptions.Item>
              <Descriptions.Item label="Quantity">{selectedListing.sdQuantity}</Descriptions.Item>
              <Descriptions.Item label="Last Known Price">₹ {selectedListing.sdLastKnownPrice || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Indicative Ask Price - Min">₹ {selectedListing.sdAskPriceMin}</Descriptions.Item>
              <Descriptions.Item label="Indicative Ask Price - Expected">₹ {selectedListing.sdAskPriceExpected}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="D. Compliance Information" bordered column={1} size="small" className="mb-4">
              <Descriptions.Item label="Demat / Physical">{selectedListing.sdIsDemat ? "Demat" : "Physical"}</Descriptions.Item>
              <Descriptions.Item label="DP Name">{selectedListing.sdDpName || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Client ID">{selectedListing.sdClientId || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="DP ID">{selectedListing.sdDpId || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="ISIN">{selectedListing.sdIsinNumber || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Declarations Agreed">{selectedListing.sdDeclare ? "Yes" : "No"}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="E. Uploaded Documents" bordered column={1} size="small" className="mb-4">
              <Descriptions.Item label="Share Certificate">{this.renderDocumentLink(selectedListing.sdShareCertificate, "Share Certificate", selectedListing.tsdTempSdID)}</Descriptions.Item>
              <Descriptions.Item label="SHA">{this.renderDocumentLink(selectedListing.sdExecutedSha, "SHA", selectedListing.tsdTempSdID)}</Descriptions.Item>
              <Descriptions.Item label="DOA">{this.renderDocumentLink(selectedListing.sdDoa, "DOA", selectedListing.tsdTempSdID)}</Descriptions.Item>
              <Descriptions.Item label="POA / Demat Doc">{this.renderDocumentLink(selectedListing.sdPoaDoc, "POA/Demat Document", selectedListing.tsdTempSdID)}</Descriptions.Item>
            </Descriptions>

            {selectedListing.sdAdminComment && (
              <Descriptions title="Admin Comment" bordered column={1} size="small" className="mb-4">
                <Descriptions.Item label="Comment">{selectedListing.sdAdminComment}</Descriptions.Item>
              </Descriptions>
            )}
          </Modal>
        )}

        {/* Status Update Modal */}
        <Modal
          title="Update Listing Status"
          visible={this.state.updateStatusModal}
          onOk={this.handleStatusUpdate}
          onCancel={() => this.setState({ updateStatusModal: false })}
          confirmLoading={loading}
        >
          <div className="mb-3">
            <label className="form-label">Select New Status</label>
            <Select 
              value={this.state.newStatus} 
              style={{ width: "100%" }} 
              onChange={(value) => this.setState({ newStatus: value })}
            >
              <Option value="Under Review">Under Review</Option>
              <Option value="Additional Information Required">Additional Information Required</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Rejected">Rejected</Option>
              <Option value="On Hold">On Hold</Option>
            </Select>
          </div>
        </Modal>

        {/* Comment Update Modal */}
        <Modal
          title="Add/Edit Admin Comment"
          visible={this.state.commentModal}
          onOk={this.handleCommentUpdate}
          onCancel={() => this.setState({ commentModal: false })}
          confirmLoading={loading}
        >
          <div className="mb-3">
            <label className="form-label">Comment (Visible to Admin only)</label>
            <TextArea 
              rows={4} 
              value={this.state.newComment} 
              onChange={(e) => this.setState({ newComment: e.target.value })} 
              placeholder="Enter your internal notes here..."
            />
          </div>
        </Modal>
      </Layout>
    );
  }
}

export default AdminSellerListings;
