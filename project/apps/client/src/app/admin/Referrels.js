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
  DatePicker,
  Dropdown,
  Menu,
  Input,
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import Apis from "../constants/Apis";

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

class Referrels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      addModalStatus: false,
      title: "",
      description: "",
      filename: "",
      formloader: false,
      editModalStatus: false,
      edittitle: "",
      editdescription: "",
      editfilename: "",
      blogid: "",
      imagename: "",
      deleteModalStatus: false,
      ctype: "",
      editctype: "",
      youtubelink: "",

      // add input states
      startupname: "",
      dealstartdate: "",
      dealenddate: "",
      targetamount: "",
      mintargetamount: "",
      maxtargetamount: "",
      multipleofdescription: "",
      backedby: "",
      category: "",
      logo: "",
      banner: "",

      // update input states
      editstartupname: "",
      editdealstartdate: "",
      editdealenddate: "",
      edittargetamount: "",
      editmintargetamount: "",
      editmaxtargetamount: "",
      editmultipleofdescription: "",
      editbackedby: "",
      editcategory: "",
      editlogo: "",
      editbanner: "",
      edityoutubelink: "",

      deal_id: "",

      deallist: [],
      cdeallist: [],

      // edit states
      approvestatus: "",
      dealstatus: "",
      updatemodalstatus: false,

      logourl: "",
      bannerurl: "",

      founderlist: [],
      cfounderlist: [],

      // add founder state list
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      nationality: "",
      dob: "",
      legal_name: "",
      father_name: "",
      address: "",
      bank_ac_no: "",
      ifsc_code: "",
      profile_image: "",

      founder_id: "",

      // edit founder state list
      edit_first_name: "",
      edit_last_name: "",
      edit_mobile: "",
      edit_email: "",
      edit_nationality: "",
      edit_dob: "",
      edit_legal_name: "",
      edit_father_name: "",
      edit_address: "",
      edit_bank_ac_no: "",
      edit_ifsc_code: "",
      edit_profile_image: "",
    };
  }

  componentDidMount() {
    this.getfounderlist();
  }

  showAddModal = () => {
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
          // founderlist: result.data,
          // cfounderlist: result.data,
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
    console.log("item", item);
    // let logourl = Apis.IMAGEURL+'deal/logo/'+item.deal_id+'/'+item.logo;
    // let bannerimg = Apis.IMAGEURL+'deal/banner/'+item.deal_id+'/'+item.banner_img;

    this.setState({
      edit_first_name: item.first_name,
      edit_last_name: item.last_name,
      edit_mobile: item.mobile,
      edit_email: item.email,
      edit_nationality: item.nationality,
      edit_dob: item.date_of_birth ? moment(item.date_of_birth) : "",
      edit_legal_name: item.legal_name,
      edit_father_name: item.fathers_name,
      edit_address: item.address,
      edit_bank_ac_no: item.bank_ac_no,
      edit_ifsc_code: item.ifsc_code,
      editModalStatus: true,
      founder_id: item.investor_id,
    });
  };

  showupdatemodal = (item) => {
    this.setState({
      deal_id: item.deal_id,
      approvestatus: item.user_status,
      dealstatus: item.deal_status,
      updatemodalstatus: true,
    });
  };

  // update post
  updatedeal = () => {
    if (this.state.edit_first_name == "") {
      message.warning("First name is required");
      return false;
    } else if (this.state.edit_last_name == "") {
      message.warning("Last name is required");
      return false;
    } else if (this.state.edit_email == "") {
      message.warning("Email is required.");
      return false;
    } else if (this.state.edit_mobile == "") {
      message.warning("Contact no is required.");
      return false;
    } else if (this.state.edit_nationality == "") {
      message.warning("Please select the nationality option.");
      return false;
    } else if (this.state.edit_dob == "") {
      message.warning("Date of birth is required.");
      return false;
    } else if (this.state.edit_legal_name == "") {
      message.warning("Legal name is required.");
      return false;
    } else if (this.state.edit_father_name == "") {
      message.warning("Father name is required.");
      return false;
    } else if (this.state.edit_address == "") {
      message.warning("Address is required.");
      return false;
    } else if (this.state.edit_bank_ac_no == "") {
      message.warning("Bank account no is required.");
      return false;
    } else if (this.state.edit_ifsc_code == "") {
      message.warning("IFSC code is required.");
      return false;
    }

    this.setState({ formloader: true });

    let params = {
      first_name: this.state.edit_first_name,
      last_name: this.state.edit_last_name,
      mobile: this.state.edit_mobile,
      email: this.state.edit_email,
      nationality: this.state.edit_nationality,
      dob: this.state.edit_dob,
      legal_name: this.state.edit_legal_name,
      father_name: this.state.edit_father_name,
      address: this.state.edit_address,
      bank_ac_no: this.state.edit_bank_ac_no,
      ifsc_code: this.state.edit_ifsc_code,
      founder_id: this.state.founder_id,
    };

    Bridge.founders.edit(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            editModalStatus: false,
            edit_first_name: "",
            edit_last_name: "",
            edit_mobile: "",
            edit_email: "",
            edit_nationality: "",
            edit_dob: "",
            edit_legal_name: "",
            edit_father_name: "",
            edit_address: "",
            edit_bank_ac_no: "",
            edit_ifsc_code: "",
            founder_id: "",
          },
          () => this.getfounderlist()
        );
        // if(this.state.editlogo || this.state.editbanner) {
        //   this.updateimg(this.state.deal_id, 'edit');
        // }
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
      deal_id: item.deal_id,
    });
  };

  deletedeal = () => {
    if (this.state.deal_id == "") {
      message.warning("Please select the deal first.");
      return false;
    }

    this.setState({ formloader: true });
    let formData = new FormData(); //formdata object
    formData.append("id", this.state.deal_id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.deal.delete(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            deleteModalStatus: false,
            deal_id: "",
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

  // on change select
  handleChangeSelect = (value) => {
    this.setState({ ctype: value });
  };

  // actuall functionality

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      for (let item of this.state.cfounderlist) {
        if (
          (item.startup_name && item.startup_name.includes(text)) ||
          (item.first_name && item.first_name.includes(text)) ||
          (item.last_name && item.last_name.includes(text)) ||
          (item.email && item.email.includes(text)) ||
          (item.mobile && item.mobile.includes(text))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        founderlist: arr,
        loading: false,
      });
    } else {
      this.setState({
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
    console.log("value", value);
    this.setState({ category: value });
  };
  handleChangeSelectededit = (value) => {
    console.log("value", value);
    this.setState({ editcategory: value });
  };

  // on change file
  onChangeFile = (e) => {
    this.setState({
      profile_image: e.target.files[0],
    });
  };

  // add new deal
  addfounder = () => {
    if (this.state.first_name == "") {
      message.warning("First name is required");
      return false;
    } else if (this.state.last_name == "") {
      message.warning("Last name is required");
      return false;
    } else if (this.state.email == "") {
      message.warning("Email is required.");
      return false;
    } else if (this.state.mobile == "") {
      message.warning("Contact no is required.");
      return false;
    } else if (this.state.nationality == "") {
      message.warning("Please select the nationality option.");
      return false;
    } else if (this.state.dob == "") {
      message.warning("Date of birth is required.");
      return false;
    } else if (this.state.legal_name == "") {
      message.warning("Legal name is required.");
      return false;
    } else if (this.state.father_name == "") {
      message.warning("Father name is required.");
      return false;
    } else if (this.state.address == "") {
      message.warning("Address is required.");
      return false;
    } else if (this.state.bank_ac_no == "") {
      message.warning("Bank account no is required.");
      return false;
    } else if (this.state.ifsc_code == "") {
      message.warning("IFSC code is required.");
      return false;
    } else if (this.state.profile_image == "") {
      message.warning("Please select the image first");
      return false;
    }

    this.setState({ formloader: true });

    let params = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      mobile: this.state.mobile,
      email: this.state.email,
      nationality: this.state.nationality,
      dob: this.state.dob,
      legal_name: this.state.legal_name,
      father_name: this.state.father_name,
      address: this.state.address,
      bank_ac_no: this.state.bank_ac_no,
      ifsc_code: this.state.ifsc_code,
    };

    Bridge.founders.add(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          formloader: false,
          addModalStatus: false,
          first_name: "",
          last_name: "",
          mobile: "",
          email: "",
          nationality: "",
          dob: "",
          legal_name: "",
          father_name: "",
          address: "",
          bank_ac_no: "",
          ifsc_code: "",
        });
        // ,() =>this.updateimg(result.data, 'add')
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  updateimg = (id, type) => {
    let formdata = new FormData();
    if (type == "add") {
      formdata.append("banner", this.state.banner);
      formdata.append("logo", this.state.logo);
    } else {
      formdata.append("banner", this.state.editbanner);
      formdata.append("logo", this.state.editlogo);
    }

    formdata.append("deal_id", id);

    console.log("formdata", formdata);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.deal.uploaddealimg(formdata, config).then((result) => {
      if (result.status == 1) {
        this.setState({}, () => this.getfounderlist());
      } else {
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

  render() {
    const dataSource =
      this.state.founderlist &&
      this.state.founderlist.map((item, index) => {
        return {
          key: index,
          founderid: item.investor_id,
          name: item.first_name + " " + item.last_name,
          startupname: item.startup_name ? item.startup_name : "---",
          contactno: item.mobile ? item.mobile : "---",
          email: item.email ? item.email : "---",
          action: item,
        };
      });

    const columns = [
      {
        title: "Investor Id",
        dataIndex: "investorid",
        key: "investorid",
        width: 160,
        fixed: "left",
      },
      {
        title: "Investor Name",
        dataIndex: "name",
        key: "name",
        width: 160,
        fixed: "left",
      },
      {
        title: "Approval Date",
        dataIndex: "approvaldate",
        key: "approvaldate",
        width: 180,
      },
      {
        title: "Investment Till Date",
        dataIndex: "contactno",
        key: "contactno",
        width: 180,
      },
      {
        title: "Reffered By",
        dataIndex: "referredby",
        key: "referredby",
      },
      {
        title: "Reffer Code",
        dataIndex: "refercode",
        key: "refercode",
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
              <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showEditModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
              <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined />}>
                <a
                  href="#"
                  style={{ fontSize: 14 }}
                  onClick={() => this.showDeleteModal(text)}
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
              <Card title="Referrals" style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Referrals</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                <Input
                  value={this.state.searchinput}
                  placeholder="Search"
                  onChange={(e) => this.searchinput(e)}
                  style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                />
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
          title="Add New Founder"
          visible={this.state.addModalStatus}
          onOk={this.addfounder}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                First Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.first_name}
                onChange={(e) => this.setState({ first_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Last Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.last_name}
                onChange={(e) => this.setState({ last_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Email <span className="text-danger">*</span>
              </label>
              <Input
                type="email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Contact No <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.mobile}
                onChange={(e) => this.setState({ mobile: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Nationality <span className="text-danger">*</span>
              </label>
              <select
                name="nationality"
                className="form-input-field"
                value={this.state.nationality}
                onChange={this.handleChangeSelect}
              >
                <option value="">Select Nationality</option>
                <option value="Indian Citizen">Indian Citizen</option>
                <option value="International">International</option>
                <option value="NRI With NIRO">NRI With NIRO</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Date of birth <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeDOB}
                value={this.state.dob}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Legal Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.legal_name}
                onChange={(e) => this.setState({ legal_name: e.target.value })}
              />
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">
                Father Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.father_name}
                onChange={(e) => this.setState({ father_name: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Address <span className="text-danger">*</span>
              </label>
              <TextArea
                rows={4}
                value={this.state.address}
                onChange={(e) => this.setState({ address: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Bank Account No. <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.bank_ac_no}
                onChange={(e) => this.setState({ bank_ac_no: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                IFSC Code <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.ifsc_code}
                onChange={(e) => this.setState({ ifsc_code: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Profile Image <span className="text-danger">*</span>
              </label>
              <Input
                type="file"
                onChange={(e) => this.onChangeFile(e)}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start Edit modal  */}
        <Modal
          title="Update Founder"
          visible={this.state.editModalStatus}
          onOk={this.updatedeal}
          okText="Update"
          onCancel={() => this.setState({ editModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                First Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_first_name}
                onChange={(e) =>
                  this.setState({ edit_first_name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Last Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_last_name}
                onChange={(e) =>
                  this.setState({ edit_last_name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Email <span className="text-danger">*</span>
              </label>
              <Input
                type="email"
                value={this.state.edit_email}
                onChange={(e) => this.setState({ edit_email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Contact No <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_mobile}
                onChange={(e) => this.setState({ edit_mobile: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Nationality <span className="text-danger">*</span>
              </label>
              <select
                name="nationality"
                className="form-input-field"
                value={this.state.edit_nationality}
                onChange={this.edit_nationality}
              >
                <option value="">Select Nationality</option>
                <option value="Indian Citizen">Indian Citizen</option>
                <option value="International">International</option>
                <option value="NRI With NIRO">NRI With NIRO</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Date of birth <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeDOBedit}
                value={this.state.edit_dob}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Legal Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.edit_legal_name}
                onChange={(e) =>
                  this.setState({ edit_legal_name: e.target.value })
                }
              />
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">
                Father Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.edit_father_name}
                onChange={(e) =>
                  this.setState({ edit_father_name: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Address <span className="text-danger">*</span>
              </label>
              <TextArea
                rows={4}
                value={this.state.edit_address}
                onChange={(e) =>
                  this.setState({ edit_address: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Bank Account No. <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.edit_bank_ac_no}
                onChange={(e) =>
                  this.setState({ edit_bank_ac_no: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                IFSC Code <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.edit_ifsc_code}
                onChange={(e) =>
                  this.setState({ edit_ifsc_code: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Profile Image <span className="text-danger">*</span>
              </label>
              <Input
                type="file"
                onChange={(e) => this.onChangeFile(e)}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Delete deal"
          visible={this.state.deleteModalStatus}
          onOk={this.deletedeal}
          okText="Delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to delete te deal?
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
                {" "}
                Approve / Pending Status<span className="text-danger">*</span>
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
                {" "}
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

export default Referrels;
