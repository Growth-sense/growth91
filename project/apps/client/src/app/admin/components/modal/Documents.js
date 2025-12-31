import React, { Component } from "react";
import {
  Menu,
  Modal,
  Dropdown,
  Tooltip,
  Table,
  Button,
  Card,
  Input,
  message,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Bridge from "../../../constants/Bridge";
import Apis from "../../../constants/Apis";

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentloading: false,
      listofdocumentstatus: false,
      startups: [],
      startupid: "",
      documents: [],
      addmodalstatus: false,
      updatemodalstatus: false,
      editmodalstatus: false,
      deleteModalStatus: false,

      // add
      name: "",
      paidstatus: "",
      cost: "",
      document: "",

      // edit
      editname: "",
      editpaidstatus: "",
      editcost: "",
      editdocument: "",
      editDocumentUrl: "",
      showDocumentFileName: "",

      documentid: "",
      visible: true,

      add_premium_price: 0,
      add_regular_price: 0,

      edit_premium_price: 0,
      edit_regular_price: 0,
      formloader: false,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState(
        {
          startupid: this.props.id,
        },
        () => this.getdocuments()
      );
    }

    if (this.props.user == "investor") {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  }

  showdocumentmodal = (item) => {
    this.setState({
      listofdocumentstatus: true,
      startupid: item.startupid,
    });
  };

  closedocumentmodal = () => {
    this.setState({
      listofdocumentstatus: false,
      startupid: "",
    });
  };

  showaddmodal = () => {
    this.setState({
      addmodalstatus: true,
      name: "",
      paidstatus: "",
      cost: "",
      documentfile: "",
    });
  };

  closeaddmodal = () => {
    this.setState({
      addmodalstatus: false,
      name: "",
      paidstatus: "",
      cost: "",
      documentfile: "",
    });
  };

  getdocuments = () => {
    this.setState({
      documentloading: true,
    });
    let params = {
      startupid: this.props.id,
    };
    Bridge.admin.document.list(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          documentloading: false,
          documents: result.data,
        });
      } else {
        this.setState({
          documentloading: false,
        });
      }
    });
  };

  addocument = () => {
    if (this.state.name == "") {
      message.warning("Document name is required");
      return false;
    } else if (this.state.paidstatus == "") {
      message.warning("Select Document is Paid or Free");
      return false;
    } else if (this.state.document.length == 0) {
      message.warning("Please select the file");
      return false;
    }
    // else if(this.state.document.size>3){
    //   message.warning("File size is greater then 3 mb,Required less then 3 mb");
    //   return false;
    // }
    this.setState({ formloader: true });
    let formData = new FormData(); //formdata object
    formData.append("docname", this.state.name); //append the values with key, value pair
    formData.append("paid", this.state.paidstatus);
    formData.append("document", this.state.document);
    formData.append("startupid", this.props.id);
    formData.append("premium_price", this.state.add_premium_price);
    formData.append("regular_price", this.state.add_regular_price);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.admin.document.add(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            addmodalstatus: false,
            name: "",
            paidstatus: "",
            cost: "",
            document: "",
            add_premium_price: 0,
            add_regular_price: 0,
          },
          () => this.getdocuments()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  showEditModal = (item) => {
    this.setState({
      updatemodalstatus: true,
      editname: item.docname,
      editpaidstatus: item.paid,
      showDocumentFileName: item.document,
      editDocumentUrl:
        Apis.IMAGEURL + "docs/" + item.documentid + "/" + item.document,
      documentid: item.documentid,
      edit_premium_price: item.premium_price,
      edit_regular_price: item.regular_price,
    });
  };

  updatedocument = () => {
    if (this.state.editname == "") {
      message.warning("Document name is required");
      return false;
    } else if (this.state.editpaidstatus == "") {
      message.warning("Select Document is Paid or Free");
      return false;
    }

    this.setState({ formloader: true });
    let formData = new FormData(); //formdata object
    formData.append("docname", this.state.editname); //append the values with key, value pair
    formData.append("paid", this.state.editpaidstatus);
    formData.append("cost", this.state.editcost);
    formData.append("document", this.state.editdocument);
    formData.append("startupid", this.props.id);
    formData.append("documentid", this.state.documentid);
    formData.append("premium_price", this.state.edit_premium_price);
    formData.append("regular_price", this.state.edit_regular_price);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.admin.document.edit(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            updatemodalstatus: false,
            editname: "",
            editpaidstatus: "",
            editcost: "",
            editdocument: "",
            showDocumentFileName: "",
            editDocumentUrl: "",
          },
          () => this.getdocuments()
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
    this.setState({
      deleteModalStatus: true,
      documentid: item.documentid,
    });
  };

  showdocument = (item) => {
    if (item.document) {
      let url = Apis.IMAGEURL + "docs/" + item.documentid + "/" + item.document;
      window.open(url, "_blank");
    }
  };
  deletedoc = () => {
    this.setState({ formloader: true });

    let formData = new FormData(); //formdata object

    formData.append("documentid", this.state.documentid);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.admin.document.delete(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            deleteModalStatus: false,
          },
          () => this.getdocuments()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  render() {
    const { canAdd = true, canEdit = true, canDelete = true } = this.props;
    const documentdataSource =
      this.state.documents &&
      this.state.documents.map((item, index) => {
        return {
          key: index,
          documentid: item.documentid,
          documentname: item.docname ? item.docname : "---",
          paid: item.paid ? item.paid : "---",
          premium: item.premium_price ? "₹ " + item.premium_price : "0.00",
          regular: item.regular_price ? "₹ " + item.regular_price : "0.00",
          action: item,
        };
      });
    const documentdataSource2 =
      this.state.documents &&
      this.state.documents.map((item, index) => {
        return {
          key: index,
          documentid: item.documentid,
          documentname: item,
          paid: item.paid ? item.paid : "---",
          premium: item.premium_price ? "₹ " + item.premium_price : "0.00",
          regular: item.regular_price ? "₹ " + item.regular_price : "0.00",
          action: item,
        };
      });

    const documentcolums = [
      {
        title: "Document Id",
        dataIndex: "documentid",
        key: "documentid",
        width: 160,
        fixed: "left",
      },
      {
        title: "Document Name",
        dataIndex: "documentname",
        key: "documentname",
        width: 180,
      },
      {
        title: "Paid",
        dataIndex: "paid",
        key: "paid",
        width: 180,
      },
      {
        title: "Premium Member Cost",
        dataIndex: "premium",
        key: "premium",
        align: "right",
      },
      {
        title: "Regular Member Cost",
        dataIndex: "regular",
        key: "regular",
        align: "right",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          // console.log("ddss",text)
          const menu = (
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.state.path]}
              style={{ width: 130 }}
            >
              <Menu.Item key={`View${record.key}`} icon={<EyeOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showdocument(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;View
                </a>
              </Menu.Item>
              <Menu.Item
                key={`Edit${record.key}`}
                icon={<EditOutlined />}
                disabled={!canEdit}
              >
                <a
                  href="#"
                  onClick={() => canEdit && this.showEditModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
              <Menu.Item
                key={`Delete${record.key}`}
                icon={<DeleteOutlined />}
                disabled={!canDelete}
              >
                <a
                  href="#"
                  style={{ fontSize: 14 }}
                  onClick={() => canDelete && this.showDeleteModal(text)}
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

    const documentcolums2 = [
      {
        title: "Document Id",
        dataIndex: "documentid",
        key: "documentid",
        width: 160,
        fixed: "left",
      },
      {
        title: "Document Name",
        dataIndex: "documentname",
        key: "documentname",
        width: 180,
        render: (text, record) => {
          return (
            <div>
              <a
                onClick={() => this.showdocument(text)}
                style={{ color: "blue" }}
              >
                {text.docname}
              </a>
            </div>
          );
        },
      },
      {
        title: "Paid",
        dataIndex: "paid",
        key: "paid",
        width: 180,
      },
      {
        title: "Premium Member Cost",
        dataIndex: "premium",
        key: "premium",
      },
      {
        title: "Regular Member Cost",
        dataIndex: "regular",
        key: "regular",
      },
    ];
    return (
      <div>
        <a href="#!" onClick={this.showdocumentmodal}>
          <Tooltip title="View Documents">
            <i
              className="bx bx-bookmarks"
              style={{
                position: "relative",
                top: 5,
              }}
            ></i>{" "}
            &nbsp;
            <span
              style={{
                position: "relative",
                top: 3,
              }}
            >
              Documents
            </span>
          </Tooltip>
        </a>

        {/* Start document modal  */}
        <Modal
          title="Documents"
          visible={this.state.listofdocumentstatus}
          onOk={this.closedocumentmodal}
          footer={false}
          onCancel={() => this.setState({ listofdocumentstatus: false })}
          width={900}
        >
          <Card
            size="small"
            title=""
            extra={
              this.state.visible == true && (
                <Button
                  type="primary"
                  onClick={this.showaddmodal}
                  disabled={!canAdd}
                >
                  Add New Document
                </Button>
              )
            }
          >
            {this.state.visible == true ? (
              <Table
                dataSource={documentdataSource}
                columns={documentcolums}
                loading={this.state.documentloading}
                bordered
                scroll={{ x: "max-content" }}
              />
            ) : (
              <Table
                dataSource={documentdataSource2}
                columns={documentcolums2}
                loading={this.state.documentloading}
                bordered
                scroll={{ x: "max-content" }}
              />
            )}
          </Card>
        </Modal>

        <Modal
          title="Add Document"
          visible={this.state.addmodalstatus}
          onOk={this.addocument}
          okText="Submit"
          onCancel={() => this.setState({ addmodalstatus: false })}
          width={500}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group mb-3">
              <label className="mb-2">
                Document Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Paid <span className="text-danger">*</span>
              </label>
              <select
                name="paid"
                className="form-input-field"
                value={this.state.paidstatus}
                onChange={(E) => this.setState({ paidstatus: E.target.value })}
              >
                <option value="">Select Status</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            {this.state.paidstatus == "Paid" && (
              <div className="form-group mb-3">
                <label className="mb-2">
                  Regular Member Cost <span className="text-danger">*</span>
                </label>
                <Input
                  type="number"
                  value={this.state.add_regular_price}
                  onChange={(e) =>
                    this.setState({ add_regular_price: e.target.value })
                  }
                />
              </div>
            )}
            {this.state.paidstatus == "Paid" && (
              <div className="form-group mb-3">
                <label className="mb-2">
                  Premium Member Cost <span className="text-danger">*</span>
                </label>
                <Input
                  type="number"
                  value={this.state.add_premium_price}
                  onChange={(e) =>
                    this.setState({ add_premium_price: e.target.value })
                  }
                />
              </div>
            )}
            <div className="form-group">
              <label className="mb-2">
                Upload Document <span className="text-danger">*</span>
              </label>
              <Input
                type="file"
                accept=".pdf, .xls, .xlsx"
                size=""
                onChange={(e) => this.setState({ document: e.target.files[0] })}
              />
            </div>
          </Spin>
        </Modal>
        <Modal
          title="Update Document"
          visible={this.state.updatemodalstatus}
          onOk={this.updatedocument}
          okText="Update"
          onCancel={() => this.setState({ updatemodalstatus: false })}
          width={500}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group mb-3">
              <label className="mb-2">
                Document Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.editname}
                onChange={(e) => this.setState({ editname: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Paid <span className="text-danger">*</span>
              </label>
              <select
                name="paid"
                className="form-input-field"
                value={this.state.editpaidstatus}
                onChange={(E) =>
                  this.setState({ editpaidstatus: E.target.value })
                }
              >
                <option value="">Select Status</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            {this.state.editpaidstatus == "Paid" && (
              <div className="form-group mb-3">
                <label className="mb-2">
                  Regular Member Cost <span className="text-danger">*</span>
                </label>
                <Input
                  type="number"
                  value={this.state.edit_regular_price}
                  onChange={(e) =>
                    this.setState({ edit_regular_price: e.target.value })
                  }
                />
              </div>
            )}
            {this.state.editpaidstatus == "Paid" && (
              <div className="form-group mb-3">
                <label className="mb-2">
                  Premium Member Cost <span className="text-danger">*</span>
                </label>
                <Input
                  type="number"
                  value={this.state.edit_premium_price}
                  onChange={(e) =>
                    this.setState({ edit_premium_price: e.target.value })
                  }
                />
              </div>
            )}

            <div className="form-group">
              <a href={this.state.editDocumentUrl} target="true">
                {this.state.editdocument ? "" : this.state.showDocumentFileName}
              </a>
              <br />
              <label className="mb-2">Upload Document </label>
              <Input
                type="file"
                accept=".pdf, .xls, .xlsx"
                onChange={(e) =>
                  this.setState({ editdocument: e.target.files[0] })
                }
              />
            </div>
          </Spin>
        </Modal>
        {/* End document modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Delete document"
          visible={this.state.deleteModalStatus}
          onOk={this.deletedoc}
          okText="Delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to delete te document?
            </p>
          </Spin>
        </Modal>
        {/* End delete modal  */}
      </div>
    );
  }
}
