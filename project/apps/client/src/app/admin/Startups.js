import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Card,
  Button,
  Modal,
  message,
  Select,
  Spin,
  Dropdown,
  Menu,
  Input,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Documents from "./components/modal/Documents";
import Investors from "./components/modal/Investors";
import Analytics from "./components/modal/Analytics";
import Sidebar2 from "./common/Sidebar2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import NoPermission from "./common/NoPermission";
import { loadModulePermissions } from "./common/permissions";

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class Startups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startups: [],
      cstartups: [],
      startupid: "",
      searchinput: "",

      // add
      name: "",
      status: "",
      created_at: "",

      // edit
      editname: "",
      editstatus: "",

      addModalStatus: false,
      loading: false,
      formloader: false,
      founderlist: [],
      selectedfounder: [],
      editselectedfounder: [],
      authorised_founder: "",
      operational_founder: "",
      edit_authorised_founder: "",
      edit_operational_founder: "",

      // permissions
      canAddStartup: false,
      canEditStartup: false,
      canDeleteStartup: false,
      canExportStartup: false,
      canManageStartupDocs: false,
      canViewStartupAnalytics: false,
    };
  }

  async componentDidMount() {
    await this.loadPermissions();

    if(this.props.noPermission){
      return;
    }

    this.getstartuplist();
    setTimeout(() => {
      this.getfounderlist();
    }, 1000);
  }

  loadPermissions = async () => {
    // Uses shared helper: respects feature flag + super_admin + myPermissions
    const perms = await loadModulePermissions("startups");

    this.setState({
      canAddStartup: perms.canAdd,
      canEditStartup: perms.canEdit,
      canDeleteStartup: perms.canDelete,
      canExportStartup: perms.canExport,
      canManageStartupDocs: perms.canDocuments,
      canViewStartupAnalytics: perms.canAnalytics,
    });
  };

  showAddModal = () => {
    if (!this.state.canAddStartup) {
      message.error("You do not have permission to add startups.");
      return;
    }
    this.setState({
      addModalStatus: true,
    });
  };

  // get post list
  getfounderlist = () => {
    this.setState({ loading: true });
    Bridge.founders.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          founderlist: result.data,
          cfounderlist: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get post list
  getstartuplist = () => {
    this.setState({ loading: true });
    Bridge.startups.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          startups: result.data,
          cstartups: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // on change file
  onChangeEditFile = (e, type) => {
    if (type == "banner") {
      this.setState({
        editbanner: e.target.files[0],
      });
    } else {
      this.setState({
        editlogo: e.target.files[0],
      });
    }
  };

  // show edit modal
  showEditModal = (item) => {
    if (!this.state.canEditStartup) {
      message.error("You do not have permission to edit startups.");
      return;
    }
    this.setState({
      editname: item.name,
      editstatus: item.status,
      editModalStatus: true,
      startupid: item.startupid,
      editselectedfounder:
        item.founder_id && item.founder_id.length > 0
          ? JSON.parse(item.founder_id)
          : [],
      edit_authorised_founder: item.authorised_founder,
      edit_operational_founder: item.operational_founder,
    });
  };

  // update post
  updatestartup = () => {
    if (!this.state.canEditStartup) {
      message.error("You do not have permission to edit startups.");
      return;
    }

    if (this.state.editname == "") {
      message.warning("Name is required");
      return false;
    } else if (this.state.editstatus == "") {
      message.warning("Status is required");
      return false;
    } else if (this.state.editselectedfounder == "") {
      message.warning("Founder is required");
      return false;
    } else if (this.state.edit_operational_founder.length == 0) {
      message.warning("Please select operational founder.");
      return false;
    } else if (this.state.edit_authorised_founder.length == 0) {
      message.warning("Please select authorized founder.");
      return false;
    }

    this.setState({ formloader: true });

    let params = {
      name: this.state.editname,
      status: this.state.editstatus,
      startupid: this.state.startupid,
      founder_id: this.state.editselectedfounder,
      operational_founder: this.state.edit_operational_founder,
      authorised_founder: this.state.edit_authorised_founder,
    };
    Bridge.startups.edit(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            editModalStatus: false,
            name: "",
            status: "",
            startupid: "",
            edit_selected_op_founder: "",
          },
          () => this.getstartuplist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  showDeleteModal = (item) => {
    if (!this.state.canDeleteStartup) {
      message.error("You do not have permission to delete startups.");
      return;
    }
    this.setState({
      deleteModalStatus: true,
      startupid: item.startupid,
    });
  };

  deletestartup = () => {
    if (!this.state.canDeleteStartup) {
      message.error("You do not have permission to delete startups.");
      return;
    }

    if (this.state.startupid == "") {
      message.warning("Please select the startup first.");
      return false;
    }

    this.setState({ formloader: true });

    let params = {
      startupid: this.state.startupid,
    };
    Bridge.startups.delete(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            deleteModalStatus: false,
            startupid: "",
          },
          () => this.getstartuplist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  // actuall functionality

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.cstartups) {
        if (
          (item.name &&
            item.name.toLowerCase().includes(text.toLowerCase())) ||
          (item.status &&
            item.status.toLowerCase().includes(text.toLowerCase())) ||
          (item.startupid && item.startupid.includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        startups: arr,
        loading: false,
      });
    } else {
      this.setState({
        startups: this.state.cstartups,
        loading: false,
      });
    }
  };

  onChangeStartDate = (date, dateString) => {
    this.setState({
      dealstartdate: date,
    });
  };

  onChangeEndDate = (date, dateString) => {
    this.setState({
      dealenddate: date,
    });
  };

  onChangeStartDateEdit = (date, dateString) => {
    this.setState({
      editdealstartdate: date,
    });
  };

  onChangeDOB = (date, dateString) => {
    this.setState({
      dob: date,
    });
  };

  onChangeDOBedit = (date, dateString) => {
    this.setState({
      edit_dob: date,
    });
  };

  handleChangeSelected = (value) => {
    this.setState({ category: value });
  };
  handleChangeSelectededit = (value) => {
    this.setState({ editcategory: value });
  };

  // on change file
  onChangeFile = (e) => {
    this.setState({
      profile_image: e.target.files[0],
    });
  };

  // add new deal
  addstartup = () => {
    if (!this.state.canAddStartup) {
      message.error("You do not have permission to add startups.");
      return;
    }

    if (this.state.name == "") {
      message.warning("Startup name is required");
      return false;
    } else if (this.state.status == "") {
      message.warning("Status is required");
      return false;
    } else if (this.state.selectedfounder.length == 0) {
      message.warning("Founder is required");
      return false;
    } else if (this.state.operational_founder.length == 0) {
      message.warning("Please select operational founder.");
      return false;
    } else if (this.state.authorised_founder.length == 0) {
      message.warning("Please select authorized founder.");
      return false;
    }
    this.setState({ formloader: true });
    let params = {
      name: this.state.name,
      status: this.state.status,
      founder_id: this.state.selectedfounder,
      operational_founder: this.state.operational_founder,
      authorised_founder: this.state.authorised_founder,
    };
    Bridge.startups.add(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            addModalStatus: false,
            name: "",
            status: "",
            selected_op_founder: "",
            document_signer_founder: "",
          },
          () => this.getstartuplist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  updatestatus = () => {
    let params = {
      dealstatus: this.state.dealstatus,
      approvestatus: this.state.approvestatus,
      id: this.state.deal_id,
    };
    this.setState({ formloader: true });
    Bridge.deal.updatestatus(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            dealstatus: "",
            approvestatus: "",
            updatemodalstatus: false,
          },
          () => this.getfounderlist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  exportToCSV = (fileName) => {
    if (!this.state.canExportStartup) {
      message.error("You do not have permission to export startups data.");
      return;
    }

    let arr = [];
    let count = 1;
    for (let item of this.state.startups) {
      let obj = {
        "Sr No": count++,
        "Startup ID": item.startupid ? item.startupid : "---",
        "Startup Name": item.name ? item.name : "---",
        "Founder Name": item.founder_name ? item.founder_name : "---",
        "Founder Email": item.founder_email ? item.founder_email : "---",
        "Founder Mobile": item.founder_mobile ? item.founder_mobile : "---",
        "No of Investors": item.investors_count ? item.investors_count : "---",
        "Total Investment": item.total_investment
          ? item.total_investment
          : "---",
        "Total Fees": item.total_fees ? item.total_fees : "---",
        Status: item.status,
      };
      arr = [...arr, obj];
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Investment data exported successfully.");
  };

  handleChangeSelect = (e) => {
    this.setState({
      nationality: e.target.value,
    });
  };

  handleChangeSelectedit = (e) => {
    this.setState({
      edit_nationality: e.target.value,
    });
  };

  selectFounder = (value) => {
    this.setState({ selectedfounder: value });
  };

  editselectFounder = (value) => {
    this.setState({ editselectedfounder: value });
  };

  render() {
    const { noPermission } = this.props;
    const disdingid = (datas) => {
      const data = [...this.state.startups].sort((a, b) =>
        a.datas > b.datas ? 1 : -1
      );
      this.setState({
        startups: data,
      });
      console.log(data);
    };
    const dataSource =
      this.state.startups &&
      this.state.startups.map((item, index) => {
        return {
          key: index,
          startupid: item.startupid,
          startupname: item.name ? item.name : "---",
          investors: item,
          analytics: item,
          status: item.status ? item.status : "---",
          documents: item,
          action: item,
          founder_name: item.first_name + " " + item.last_name,
        };
      });

    const columns = [
      {
        title: <span onClick={() => disdingid("id")}>Startup Id</span>,
        dataIndex: "startupid",
        key: "startupid",
        width: 160,
        fixed: "left",
      },
      {
        title: <span onClick={() => disdingid("name")}>Startup Name</span>,
        dataIndex: "startupname",
        key: "startupname",
        width: 180,
      },
      {
        title: "Investors",
        dataIndex: "investors",
        key: "investors",
        width: 180,
        render: (text) => {
          return <Investors id={text.startupid} />;
        },
      },
      {
        title: "Analytics",
        dataIndex: "analytics",
        key: "analytics",
        render: (text) => {
          if (!this.state.canViewStartupAnalytics) {
            return (
              <span
                style={{ color: "#1890ff", cursor: "not-allowed" }}
                onClick={(e) => e.preventDefault()}
              >
                Analytics
              </span>
            );
          }
          return <Analytics id={text.startupid} />;
        },
      },
      {
        title: "Documents",
        dataIndex: "documents",
        key: "documents",
        render: (text) => {
          if (!this.state.canManageStartupDocs) {
            // Show link-style text but do nothing on click
            return (
              <span
                style={{ color: "#1890ff", cursor: "not-allowed" }}
                onClick={(e) => e.preventDefault()}
              >
                Documents
              </span>
            );
          }
          // Full working modal when allowed
          return <Documents id={text.startupid} user="admin" />;
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          const menu = (
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.state.path]}
              style={{ width: 200 }}
            >
              <Menu.Item
                key={`Edit${record.key}`}
                icon={<EditOutlined />}
                disabled={!this.state.canEditStartup}
              >
                <a
                  href="#"
                  onClick={() =>
                    this.state.canEditStartup && this.showEditModal(text)
                  }
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
              <Menu.Item
                key={`Delete${record.key}`}
                icon={<DeleteOutlined />}
                disabled={!this.state.canDeleteStartup}
              >
                <a
                  href="#"
                  style={{ fontSize: 14 }}
                  onClick={() =>
                    this.state.canDeleteStartup && this.showDeleteModal(text)
                  }
                >
                  &nbsp;&nbsp;Delete
                </a>
              </Menu.Item>
            </Menu>
          );
          return (
            <div>
              <Dropdown overlay={menu} placement="bottom">
                <a onClick={(e) => e.preventDefault()}>
                  <div className="menu-action">
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </div>
                </a>
              </Dropdown>
            </div>
          );
        },
      },
    ];

    return (
      <>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
          <Navbar />
          <Layout className="site-layout">
            <Sidebar2 />

            {noPermission ? (
              <NoPermission />
            ) : (
              <>
                <Content className="home-section">
                  <Card
                    title="Startups"
                    extra={
                      <Button
                        type="primary"
                        onClick={this.showAddModal}
                        disabled={!this.state.canAddStartup}
                      >
                        <i
                          className="bx bxs-plus-circle"
                          style={{
                            color: "#fff",
                            position: "relative",
                            top: 3,
                            left: -3,
                          }}
                        ></i>{" "}
                        Add New Startup
                      </Button>
                    }
                    style={{ margin: 16 }}
                  >
                    <Breadcrumb
                      style={{
                        margin: "0",
                      }}
                    >
                      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item>Startups</Breadcrumb.Item>
                    </Breadcrumb>
                    <br />
                    <br />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Input
                        value={this.state.searchinput}
                        placeholder="Search"
                        onChange={(e) => this.searchinput(e)}
                        style={{
                          maxWidth: 300,
                          marginBottom: 20,
                          height: 40,
                        }}
                      />

                      <Button
                        type="primary"
                        onClick={() =>
                          this.exportToCSV("Investment Details")
                        }
                        disabled={!this.state.canExportStartup}
                      >
                        <i
                          className="bx bxs-cloud-download"
                          style={{
                            color: "#fff",
                            position: "relative",
                            top: 3,
                            left: -3,
                          }}
                        ></i>{" "}
                        Export Data
                      </Button>
                    </div>
                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      loading={this.state.loading}
                      bordered
                    />
                  </Card>
                </Content>
              </>
            )}

            {noPermission ? "" : <BottomBar />}
          </Layout>
        </Layout>

        {/* Start Add modal  */}
        <Modal
          title="Add New Startup"
          visible={this.state.addModalStatus}
          onOk={this.addstartup}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Startup Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Founders <span className="text-danger">*</span>
              </label>
              <Select
                name="selectedfounder"
                className="form-input-field"
                value={this.state.selectedfounder}
                onChange={(value) => this.selectFounder(value)}
                mode="multiple"
                showSearch
                placeholder="Search and select founders"
                filterOption={(input, option) => {
                  const text =
                    typeof option.children === "string"
                      ? option.children
                      : option.children.join("");
                  return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
              >
                {this.state.founderlist &&
                  this.state.founderlist.map((item, index) => {
                    return (
                      <Option key={index} value={item.investor_id}>
                        {item.first_name} {item.last_name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Operational Founder{" "}
                <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                className="form-input-field"
                value={this.state.operational_founder}
                style={{ width: "100%" }}
                onChange={(value) =>
                  this.setState({ operational_founder: value })
                }
              >
                {this.state.founderlist &&
                  this.state.founderlist.map((item, index) => {
                    if (this.state.selectedfounder.includes(item.investor_id)) {
                      return (
                        <Option key={index} value={item.investor_id}>
                          {item.first_name} {item.last_name}
                        </Option>
                      );
                    }
                    return null;
                  })}
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Authorized Signatory{" "}
                <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                className="form-input-field"
                value={this.state.authorised_founder}
                style={{ width: "100%" }}
                onChange={(value) =>
                  this.setState({ authorised_founder: value })
                }
              >
                {this.state.founderlist &&
                  this.state.founderlist.map((item, index) => {
                    if (this.state.selectedfounder.includes(item.investor_id)) {
                      return (
                        <Option key={index} value={item.investor_id}>
                          {item.first_name} {item.last_name}
                        </Option>
                      );
                    }
                    return null;
                  })}
              </Select>
            </div>

            <div className="form-group mt-3">
              <label className="mb-2">
                Status <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                className="form-input-field"
                value={this.state.status}
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ status: value })}
              >
                <Option value="Open">Open</Option>
                <Option value="Closed">Closed</Option>
                <Option value="Deactive">Deactive</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start Edit modal  */}
        <Modal
          title="Update Startup"
          visible={this.state.editModalStatus}
          onOk={this.updatestartup}
          okText="Update"
          onCancel={() => this.setState({ editModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Startup Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.editname}
                onChange={(e) => this.setState({ editname: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Founders <span className="text-danger">*</span>
              </label>
              <Select
                name="editselectedfounder"
                className="form-input-field"
                value={this.state.editselectedfounder}
                defaultValue={this.state.editselectedfounder}
                onChange={(value) => this.editselectFounder(value)}
                mode="multiple"
              >
                {this.state.cfounderlist &&
                  this.state.cfounderlist.map((item, index) => {
                    return (
                      <Option key={index} value={item.investor_id}>
                        {item.first_name} {item.last_name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Authorised Founder{" "}
                <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                className="form-input-field"
                value={this.state.edit_authorised_founder}
                style={{ width: "100%" }}
                onChange={(value) =>
                  this.setState({ edit_authorised_founder: value })
                }
              >
                {this.state.founderlist &&
                  this.state.founderlist.map((item, index) => {
                    if (
                      this.state.editselectedfounder.includes(item.investor_id)
                    ) {
                      return (
                        <Option key={index} value={item.investor_id}>
                          {item.first_name} {item.last_name}
                        </Option>
                      );
                    }
                    return null;
                  })}
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Operational Founder{" "}
                <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                className="form-input-field"
                value={this.state.edit_operational_founder}
                style={{ width: "100%" }}
                onChange={(value) =>
                  this.setState({ edit_operational_founder: value })
                }
              >
                {this.state.founderlist &&
                  this.state.founderlist.map((item, index) => {
                    if (
                      this.state.editselectedfounder.includes(item.investor_id)
                    ) {
                      return (
                        <Option key={index} value={item.investor_id}>
                          {item.first_name} {item.last_name}
                        </Option>
                      );
                    }
                    return null;
                  })}
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Status <span className="text-danger">*</span>
              </label>
              <Select
                name="editstatus"
                className="form-input-field"
                value={this.state.editstatus}
                onChange={(value) => this.setState({ editstatus: value })}
              >
                <Option value="Open">Open</Option>
                <Option value="Closed">Closed</Option>
                <Option value="Deactive">Deactive</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Delete startup"
          visible={this.state.deleteModalStatus}
          onOk={this.deletestartup}
          okText="Delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to delete te startup?
            </p>
          </Spin>
        </Modal>
        {/* End delete modal  */}

        {/* Start update status modal  */}
        <Modal
          title="Update Status"
          visible={this.state.updatemodalstatus}
          onOk={this.updatestatus}
          okText="Update"
          onCancel={() => this.setState({ updatemodalstatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <div className="mt-4">
              <label className="mb-2">
                Approve / Pending Status
                <span className="text-danger">*</span>
              </label>

              <Select
                value={this.state.approvestatus}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ approvestatus: value });
                }}
              >
                <Option value="">--Select--</Option>
                <Option value="Approved">Approved</Option>
                <Option value="Pending">Pending</Option>
              </Select>
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Deal Status<span className="text-danger">*</span>
              </label>

              <Select
                value={this.state.dealstatus}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ dealstatus: value });
                }}
              >
                <Option value="">--Select--</Option>
                <Option value="Public">Public</Option>
                <Option value="Private">Private</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End update status modal  */}
      </>
    );
  }
}

export default Startups;