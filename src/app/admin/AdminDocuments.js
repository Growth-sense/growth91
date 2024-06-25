import React, { Component } from "react";
import axios from "axios";
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
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

class AdminDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formloader: false,
      addModalStatus: false,
      editModalStatus: false,
      deleteModalStatus: false,
      investorlist: [],
      dealinvestorlist: [],
      deallist: [],
      founderlist: [],
      documentlist: [],
      cdocumentlist: [],

      // add states
      admindocName: "",
      admindocActive: "",
      admindocDescription: "",
      documentType: "",
      documentFile: null,
      selectedDeals: [],
      selectedInvestors: [],
      selectedFounders: [],

      // edit states
      editadmindocName: "",
      editadmindocActive: "",
      editadmindocDescription: "",
      editdocumentType: "",
      editdocumentFile: null,
      editselectedDeals: [],
      editselectedInvestors: [],
      editselectedFounders: [],

      // delete states
      admindocID: "",
    };
  }

  componentDidMount() {
    this.getDocumentList();
    this.getdeallist();
    this.getinvestorlist();
    this.getfounderlist();
  }

  getDocumentList = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/Documents/listadmindocs`)
      .then((response) => {
        const result = response.data;
        if (result.status === "1") {
          this.setState({
            documentlist: result.data,
            cdocumentlist: result.data,
            loading: false,
          });
        } else {
          console.error(result.message);
          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        this.setState({
          loading: false,
        });
      });
  };

  getdeallist = () => {
    this.setState({ loading: true });
    Bridge.deal.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          deallist: result.data,
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

  getinvestorlist = () => {
    this.setState({ loading: true });
    Bridge.admin.investor.list().then((result) => {
      if (result.status === "1") {
        this.setState({ investorlist: result.data });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  getfounderlist = () => {
    this.setState({ loading: true });
    Bridge.founders.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          founderlist: result.data,
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

  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      for (let item of this.state.cdocumentlist) {
        if (
          (item.admindocID &&
            item.admindocID.toLowerCase().includes(text.toLowerCase())) ||
          (item.admindocName &&
            item.admindocName.toLowerCase().includes(text.toLowerCase())) ||
          (item.admindocDescription &&
            item.admindocDescription
              .toLowerCase()
              .includes(text.toLowerCase())) ||
          (item.admindocForDeal &&
            item.admindocForDeal.toLowerCase().includes(text.toLowerCase())) ||
          (item.admindocForInvestor &&
            item.admindocForInvestor
              .toLowerCase()
              .includes(text.toLowerCase())) ||
          (item.admindocForFounder &&
            item.admindocForFounder
              .toLowerCase()
              .includes(text.toLowerCase())) ||
          (item.admindocForAll &&
            item.admindocForAll.toLowerCase().includes(text.toLowerCase())) ||
          (item.admindocActive &&
            item.admindocActive.toLowerCase().includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        documentlist: arr,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  handleSubmit = () => {
    const {
      documentType,
      selectedDeals,
      selectedInvestors,
      selectedFounders,
      admindocDescription,
      admindocActive,
      admindocName,
      documentFile,
    } = this.state;

    if (!admindocName) {
      message.warning("Document Name is required");
      return;
    }

    if (!documentType) {
      message.warning("Document Type is required");
      return;
    }

    if (!admindocDescription) {
      message.warning("Description is required");
      return;
    }

    let formData = new FormData();
    formData.append("admindocName", admindocName);
    formData.append("admindocDescription", admindocDescription);
    formData.append("admindocActive", admindocActive);
    formData.append("document", documentFile);

    let deal_id = "0";
    let investor_id = "0";
    let founder_id = "0";
    let forAlll = "No";

    if (documentType === "Deal") {
      deal_id = selectedDeals.length > 0 ? selectedDeals.join(",") : "0";
      investor_id =
        selectedInvestors.length > 0 ? selectedInvestors.join(",") : "-1";
    } else if (documentType === "Investor") {
      deal_id = selectedDeals.length > 0 ? selectedDeals.join(",") : "0";
      investor_id =
        selectedInvestors.length > 0 ? selectedInvestors.join(",") : "-1";
    } else if (documentType === "Founder") {
      founder_id =
        selectedFounders.length > 0 ? selectedFounders.join(",") : "-1";
    } else if (documentType === "Public") {
      forAlll = "Yes";
    }

    formData.append("deal_id", deal_id);
    formData.append("investor_id", investor_id);
    formData.append("founder_id", founder_id);
    formData.append("forAlll", forAlll);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/Documents/addadmindocs`,
        formData
      )
      .then((response) => {
        console.log("API Response:", response.data);
        this.setState(
          {
            admindocName: "",
            admindocActive: "",
            admindocDescription: "",
            documentType: "",
            documentFile: null,
            selectedDeals: [],
            selectedInvestors: [],
            selectedFounders: [],
            addModalStatus: false,
          },
          () => this.getDocumentList()
        );
        message.success("Document Added Successfully");
        // window.location.reload();
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  updatedocument = () => {
    const {
      editdocumentType,
      editselectedDeals,
      editselectedInvestors,
      editselectedFounders,
      editadmindocDescription,
      editadmindocActive,
      editadmindocName,
      editdocumentFile,
      admindocID,
    } = this.state;

    if (!editadmindocName) {
      message.warning("Document Name is required");
      return;
    }

    if (!editdocumentType) {
      message.warning("Document Type is required");
      return;
    }

    if (!editadmindocDescription) {
      message.warning("Description is required");
      return;
    }

    let formData = new FormData();
    formData.append("admindocName", editadmindocName);
    formData.append("admindocDescription", editadmindocDescription);
    formData.append("admindocActive", editadmindocActive);
    formData.append("document", editdocumentFile);
    formData.append("admindocID", admindocID);

    let deal_id = "0";
    let investor_id = "0";
    let founder_id = "0";
    let forAlll = "No";

    if (editdocumentType === "Deal") {
      deal_id =
        editselectedDeals.length > 0 ? editselectedDeals.join(",") : "0";
      investor_id =
        editselectedInvestors.length > 0
          ? editselectedInvestors.join(",")
          : "-1";
    } else if (editdocumentType === "Investor") {
      deal_id =
        editselectedDeals.length > 0 ? editselectedDeals.join(",") : "0";
      investor_id =
        editselectedInvestors.length > 0
          ? editselectedInvestors.join(",")
          : "-1";
    } else if (editdocumentType === "Founder") {
      founder_id =
        editselectedFounders.length > 0 ? editselectedFounders.join(",") : "-1";
    } else if (editdocumentType === "Public") {
      forAlll = "Yes";
    }

    formData.append("deal_id", deal_id);
    formData.append("investor_id", investor_id);
    formData.append("founder_id", founder_id);
    formData.append("forAlll", forAlll);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/Documents/editadmindocs`,
        formData
      )
      .then((response) => {
        console.log("API Response:", response.data);
        this.setState(
          {
            editadmindocName: "",
            editadmindocActive: "",
            editadmindocDescription: "",
            editdocumentType: "",
            editdocumentFile: null,
            editselectedDeals: [],
            editselectedInvestors: [],
            editselectedFounders: [],
            admindocID: "",
            editModalStatus: false,
          },
          () => this.getDocumentList()
        );
        message.success("Document Updated Successfully");
        // window.location.reload();
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  filterOptionInvestorSelect = (input, option) => {
    return option.props.children.toLowerCase().includes(input.toLowerCase());
  };

  showDeleteModal = (id) => {
    this.setState({
      deleteModalStatus: true,
      admindocID: id,
    });
  };

  showEditModal = (id, item) => {
    this.setState({
      admindocID: id,
      editadmindocName: item.documentName,
      editadmindocActive: item.active,
      editadmindocDescription: item.description,
      editModalStatus: true,
    });
  };

  deletedocument = () => {
    if (this.state.admindocID == "") {
      message.warning("Please select the document first.");
      return false;
    }

    this.setState({ formloader: true });
    let formData = new FormData();
    formData.append("admindocID", this.state.admindocID);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/Documents/deleteadmindocs`,
        formData,
        config
      )
      .then((response) => {
        const result = response.data;
        if (result.status === "1") {
          message.success(result.message);
          this.setState(
            {
              formloader: false,
              deleteModalStatus: false,
              admindocID: "",
            },
            () => this.getDocumentList()
          );
        } else {
          message.error(result.message);
          this.setState({
            formloader: false,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        message.error("An error occurred while deleting the document.");
        this.setState({
          formloader: false,
        });
      });
  };

  handleDealSelection = async (value) => {
    this.setState({ selectedDeals: value });

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/Investors/list`,
        {
          params: {
            deal_id: value.join(","),
          },
        }
      );

      const investorList = response.data;

      this.setState({ dealinvestorlist: investorList.data });
    } catch (error) {
      console.error("Error fetching investor list:", error);
    }
  };

  handleEditDealSelection = async (value) => {
    this.setState({ editselectedDeals: value });

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/Investors/list`,
        {
          params: {
            deal_id: value.join(","),
          },
        }
      );

      const investorList = response.data;

      this.setState({ dealinvestorlist: investorList.data });
    } catch (error) {
      console.error("Error fetching investor list:", error);
    }
  };

  render() {
    const dataSource = this.state.documentlist.map((item, index) => {
      return {
        key: item.admindocID,
        srno: item.admindocID,
        documentName: item.admindocName,
        description: item.admindocDescription,
        forDeal: item.admindocForDeal,
        forInvestor: item.admindocForInvestor,
        forFounder: item.admindocForFounder,
        forPublic: item.admindocForAll,
        active: item.admindocActive,
      };
    });

    const columns = [
      {
        title: "Bank No",
        dataIndex: "srno",
        key: "srno",
      },
      {
        title: "Document Name",
        dataIndex: "documentName",
        key: "documentName",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "For Deal",
        dataIndex: "forDeal",
        key: "forDeal",
      },
      {
        title: "For Investor",
        dataIndex: "forInvestor",
        key: "forInvestor",
      },
      {
        title: "For Founder",
        dataIndex: "forFounder",
        key: "forFounder",
      },
      {
        title: "For Public",
        dataIndex: "forPublic",
        key: "forPublic",
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        render: (text, record) => {
          const menu = (
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.state.path]}
              style={{ width: 200 }}
            >
              <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showEditModal(record.key, record)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
              <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined />}>
                <a
                  href="#"
                  style={{ fontSize: 14 }}
                  onClick={() => this.showDeleteModal(record.key)}
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

            <Content className="home-section">
              <Card
                title="Documents"
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({ addModalStatus: true });
                    }}
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
                    Add New Document
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
                  <Breadcrumb.Item>Documents</Breadcrumb.Item>
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
                    placeholder="Search"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                </div>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  loading={this.state.loading}
                  bordered
                  scroll={{ x: "max-content" }}
                />
              </Card>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>

        {/* Start Add modal  */}
        <Modal
          title="Add New Document"
          visible={this.state.addModalStatus}
          onOk={this.handleSubmit}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="mt-4">
              <label className="mb-2">
                Name <span className="text-danger">*</span>
              </label>
              <Input
                accept=".pdf, .ppt, .pptx"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const fileName = file.name.replace(/\.[^/.]+$/, "");
                  this.setState({
                    admindocName: fileName,
                    documentFile: file,
                  });
                }}
              />
            </div>

            <div className="mt-4">
              <label className="mb-2">
                Document Type <span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.documentType}
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ documentType: value })}
                allowClear
              >
                <Option value="">--Select--</Option>
                <Option value="Deal">Deal</Option>
                <Option value="Investor">Investor</Option>
                <Option value="Founder">Founder</Option>
                <Option value="Public">Public</Option>
              </Select>
            </div>

            {this.state.documentType === "Deal" && (
              <>
                <div className="mt-4 editor-field">
                  <label className="mb-2">Deal</label>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select deals"
                    onChange={this.handleDealSelection}
                    filterOption={this.filterOptionInvestorSelect}
                    showSearch
                    optionFilterProp="children"
                  >
                    {this.state.deallist &&
                      this.state.deallist.map((item, index) => (
                        <Option key={index} value={item.deal_id} data={item}>
                          {`${item.deal_name}`}
                        </Option>
                      ))}
                  </Select>
                </div>
                <div className="mt-4 editor-field">
                  <label className="mb-2">Investor</label>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select investors"
                    onChange={(value) =>
                      this.setState({ selectedInvestors: value })
                    }
                    filterOption={this.filterOptionInvestorSelect}
                    showSearch
                    optionFilterProp="children"
                    disabled={
                      !this.state.selectedDeals ||
                      this.state.selectedDeals.length === 0
                    }
                  >
                    {this.state.dealinvestorlist &&
                      this.state.dealinvestorlist.map((item, index) => {
                        console.log(item);
                        return (
                          <Option
                            key={index}
                            value={item.investor_id}
                            data={item}
                          >
                            {`${item.first_name} ${item.last_name} (${item.email})`}
                          </Option>
                        );
                      })}
                  </Select>
                </div>
              </>
            )}

            {this.state.documentType === "Investor" && (
              <div className="mt-4 editor-field">
                <label className="mb-2">Investor</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select investors"
                  onChange={(value) =>
                    this.setState({ selectedInvestors: value })
                  }
                  filterOption={this.filterOptionInvestorSelect}
                  showSearch
                  optionFilterProp="children"
                >
                  {this.state.investorlist &&
                    this.state.investorlist.map((item, index) => (
                      <Option key={index} value={item.investor_id} data={item}>
                        {`${item.first_name} ${item.last_name}`}
                      </Option>
                    ))}
                </Select>
              </div>
            )}

            {this.state.documentType === "Founder" && (
              <div className="mt-4 editor-field">
                <label className="mb-2">Founder</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select founders"
                  onChange={(value) =>
                    this.setState({ selectedFounders: value })
                  }
                  filterOption={this.filterOptionInvestorSelect}
                  showSearch
                  optionFilterProp="children"
                >
                  {this.state.founderlist &&
                    this.state.founderlist.map((item, index) => (
                      <Option key={index} value={item.investor_id} data={item}>
                        {`${item.first_name} ${item.last_name}`}
                      </Option>
                    ))}
                </Select>
              </div>
            )}

            <div className="mt-4 editor-field">
              <label className="mb-2">
                Description <span className="text-danger">*</span>
              </label>
              <TextArea
                rows={4}
                value={this.state.admindocDescription}
                onChange={(e) =>
                  this.setState({ admindocDescription: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="mb-2">Active</label>
              <Select
                value={this.state.admindocActive}
                style={{ width: "100%" }}
                allowClear
                onChange={(value) => this.setState({ admindocActive: value })}
              >
                <Option value="">--Select--</Option>
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start Edit modal  */}
        <Modal
          title="Edit Document"
          visible={this.state.editModalStatus}
          onOk={this.updatedocument}
          okText="Update"
          onCancel={() => this.setState({ editModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="mt-4">
              <label className="mb-2">
                Name <span className="text-danger">*</span>
              </label>
              <Input
                accept=".pdf, .ppt, .pptx"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const fileName = file.name.replace(/\.[^/.]+$/, "");
                  this.setState({
                    editadmindocName: fileName,
                    editdocumentFile: file,
                  });
                }}
              />
            </div>

            <div className="mt-4">
              <label className="mb-2">
                Document Type <span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.editdocumentType}
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ editdocumentType: value })}
                allowClear
              >
                <Option value="">--Select--</Option>
                <Option value="Deal">Deal</Option>
                <Option value="Investor">Investor</Option>
                <Option value="Founder">Founder</Option>
                <Option value="Public">Public</Option>
              </Select>
            </div>

            {this.state.editdocumentType === "Deal" && (
              <>
                <div className="mt-4 editor-field">
                  <label className="mb-2">Deal</label>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select deals"
                    onChange={this.handleEditDealSelection}
                    filterOption={this.filterOptionInvestorSelect}
                    showSearch
                    optionFilterProp="children"
                  >
                    {this.state.deallist &&
                      this.state.deallist.map((item, index) => (
                        <Option key={index} value={item.deal_id} data={item}>
                          {`${item.deal_name}`}
                        </Option>
                      ))}
                  </Select>
                </div>
                <div className="mt-4 editor-field">
                  <label className="mb-2">Investor</label>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select investors"
                    onChange={(value) =>
                      this.setState({ editselectedInvestors: value })
                    }
                    filterOption={this.filterOptionInvestorSelect}
                    showSearch
                    optionFilterProp="children"
                    disabled={
                      !this.state.editselectedDeals ||
                      this.state.editselectedDeals.length === 0
                    }
                  >
                    {this.state.dealinvestorlist &&
                      this.state.dealinvestorlist.map((item, index) => (
                        <Option
                          key={index}
                          value={item.investor_id}
                          data={item}
                        >
                          {`${item.first_name} ${item.last_name}`}
                        </Option>
                      ))}
                  </Select>
                </div>
              </>
            )}

            {this.state.editdocumentType === "Investor" && (
              <div className="mt-4 editor-field">
                <label className="mb-2">Investor</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select investors"
                  onChange={(value) =>
                    this.setState({ editselectedInvestors: value })
                  }
                  filterOption={this.filterOptionInvestorSelect}
                  showSearch
                  optionFilterProp="children"
                >
                  {this.state.investorlist &&
                    this.state.investorlist.map((item, index) => (
                      <Option key={index} value={item.investor_id} data={item}>
                        {`${item.first_name} ${item.last_name}`}
                      </Option>
                    ))}
                </Select>
              </div>
            )}

            {this.state.editdocumentType === "Founder" && (
              <div className="mt-4 editor-field">
                <label className="mb-2">Founder</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select founders"
                  onChange={(value) =>
                    this.setState({ editselectedFounders: value })
                  }
                  filterOption={this.filterOptionInvestorSelect}
                  showSearch
                  optionFilterProp="children"
                >
                  {this.state.founderlist &&
                    this.state.founderlist.map((item, index) => (
                      <Option key={index} value={item.investor_id} data={item}>
                        {`${item.first_name} ${item.last_name}`}
                      </Option>
                    ))}
                </Select>
              </div>
            )}

            <div className="mt-4 editor-field">
              <label className="mb-2">
                Description <span className="text-danger">*</span>
              </label>
              <TextArea
                rows={4}
                value={this.state.editadmindocDescription}
                onChange={(e) =>
                  this.setState({ editadmindocDescription: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="mb-2">Active</label>
              <Select
                value={this.state.editadmindocActive}
                style={{ width: "100%" }}
                allowClear
                onChange={(value) =>
                  this.setState({ editadmindocActive: value })
                }
              >
                <Option value="">--Select--</Option>
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Delete Document"
          visible={this.state.deleteModalStatus}
          onOk={this.deletedocument}
          okText="Delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to delete the document?
            </p>
          </Spin>
        </Modal>
        {/* End delete modal  */}
      </>
    );
  }
}

export default AdminDocuments;
