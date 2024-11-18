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
  Switch,
  Input,
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import moment from "moment";

import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const { Option } = Select;
const { Content } = Layout;

class InstitutionalReferral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      addModalStatus: false,
      formloader: false,
      deleteModalStatus: false,
      searchinput: "",
      referralList: [],
      //get
      id: "",

      // add input states
      name: "",
      email: "",
      mobile: "",
      accordance: "",
      cReferralList: [],
      facebook: "",
      instagram: "",
      linkedIn: "",
      twitter: "",
      accountNo: "",
      ifsc_code: "",
      bankname: "",
      profile_img: "",
      profilePreview: "",
      toggle: "",
      showStatus: false,
      modalLoading: false,
    };
  }

  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  };

  // show edit modal
  showStatusModal = (item) => {
    this.setState({
      showStatus: true,
      id: item.referral_id,
      toggle: item.toggle,
    });
  };

  componentDidMount() {
    this.getlist();
  }

  //to pass data throw url
  saveIdLocalStorage = (text) => {
    localStorage.setItem("referral_id", text.referral_id);

    setTimeout(function () {
      window.location.assign("/admin-referral-view");
    }, 200); //
  };
  // get data list
  getlist = () => {
    this.setState({ loading: true });
    Bridge.institutionalReferral.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          referralList: result.data,
          cReferralList: result.data,
        });
        this.setState({ loading: false, formloader: false });
      } else {
        message.error(result.message);
        this.setState({ loading: false, formloader: false });
      }
    });
  };

  showDeleteModal = (text) => {
    this.setState({
      deleteModalStatus: true,
      id: text.referral_id,
    });
  };

  //delete referral
  deleteReferral = () => {
    if (this.state.id == "") {
      message.warning("Please select the referral List");
      return false;
    }
    this.setState({ loading: true });
    let formData = new FormData(); //formdata object
    formData.append("referral_id", this.state.id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.institutionalReferral.delete(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            loading: false,
            deleteModalStatus: false,
          },
          () => this.getlist()
        );
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // add new referral
  addReferral = () => {
    if (this.state.name == "") {
      message.warning("name is required");
      return false;
    }
    if (this.state.email == "") {
      message.warning("Email is required");
      return false;
    }
    if (
      this.state.mobile == "" ||
      this.state.mobile.length < 10 ||
      this.state.mobile.length > 12
    ) {
      message.warning("Mobile Number is required");
      return false;
    }

    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    let dateTime = date;
    let params = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedIn: this.state.linkedIn,
      twitter: this.state.twitter,
      bankAccountNo: this.state.accountNo,
      ifscCode: this.state.ifsc_code,
      bankName: this.state.bankname,
      dtOfRegistration: dateTime,
    };
    this.setState({ loading: true, formloader: true });
    Bridge.institutionalReferral.add(params).then((result) => {
      if (result.status == 1) {
        this.setState(
          {
            name: "",
            email: "",
            mobile: "",
            ofMoney: "",
            facebook: "",
            instagram: "",
            linkedIn: "",
            twitter: "",
            accountNo: "",
            ifsc_Code: "",
            bankname: "",

            addModalStatus: false,
          },
          () => {
            this.addImg(result.data);
          },
          this.sendEmail(result.data, result.name, result.email)
        );
        // message.success("Successful")
      } else {
        this.setState({ formloader: false.valueOf, addModalStatus: false });
        message.error(result.message);
      }
    });
    // window.location.reload();
  };
  //cancel ADD REFERRAL post reload
  // cancel_addReferral=()=>{
  //   this.setState({ editModalStatus:false });
  //     window.location.reload();
  // }

  //for sending mail
  sendEmail(id, name, email) {
    const tempArr = name.split(" ");
    let tempId = id.toString();
    let str = "";
    //for name code
    if (tempArr.length == 1) {
      str +=
        name.slice(0, 1).toUpperCase() +
        name.substr(name.length - 1, 1).toUpperCase();
    }
    if (tempArr.length == 2) {
      for (let i = 0; i < tempArr.length; i++) {
        str += tempArr[i].slice(0, 1).toUpperCase();
      }
    }
    if (tempArr.length >= 3) {
      for (let i = 0; i < tempArr.length; i++) {
        if (i == 1) {
          continue;
        }
        str += tempArr[i].slice(0, 1).toUpperCase();
      }
    }

    //for id code
    let resultId;
    if (tempId.length == 1) {
      resultId = "00" + tempId;
    }
    if (tempId.length == 2) {
      resultId = "0" + tempId;
    }
    if (tempId.length >= 3) {
      resultId = tempId.substr(tempId.length - 3, 3);
    }
    //end id code
    let referralCode = str + "IR" + resultId;
    let referralLink = "https://growth91.com/Signup?id=" + referralCode;
    let params = {
      referral_id: id,
      name: name,
      email: email,
      referralCode: referralCode,
      referralLink: referralLink,
    };
    Bridge.institutionalReferral.sendemail(params).then((result) => {
      if (result.status == "1") {
        message.success(result.message);
      } else {
        message.error("Failed to Send Email");
      }
    });
  }

  //for search the test
  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.cReferralList) {
        if (
          (item.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
          (item.email && item.email.includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        referralList: arr,
        loading: false,
      });
    } else {
      this.setState({
        referralList: this.state.cReferralList,
        loading: false,
      });
    }
  };

  //for status change API Calling
  onChangeStatus = () => {
    let params = {
      referral_id: this.state.id,
      toggle: this.state.toggle,
    };
    this.setState({ modalLoading: true });
    Bridge.institutionalReferral.updatestatus(params).then((result) => {
      if (result.status == "1") {
        message.success("successfully updated status");
        this.setState({ modalLoading: false, showStatus: false });
        this.getlist();
      } else {
        message.error("Status can't updated");
        this.setState({ modalLoading: false, showStatus: false });
      }
    });
  };
  //for adding image and pdf
  addImg(id) {
    let formData = new FormData();
    formData.append("referral_id", id);
    formData.append("profile_img", this.state.profile_img);
    formData.append("accordance", this.state.accordance);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.institutionalReferral
      .uploadreferralimg(formData, config)
      .then((result) => {
        if (result.status == 1) {
          this.setState({ formloader: false, loading: false }, () =>
            this.getlist()
          );
        } else {
          message.error("failed to upload accordance and profile image");
        }
      });
    // window.location.reload();
  }
  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.referralList) {
      let obj = {
        "Sr No": count,
        Name: item.name,
        Email: item.email,
        "Date Of Registration": item.date_of_registration,
        "Total Invested Amount": item.total_invested_amount,
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Founders data exported successfully.");
  };

  render() {
    const dataSource =
      this.state.referralList &&
      this.state.referralList.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          id: item.referral_id,
          name: item.name ? item.name : "---",
          dtOfReg: item.date_of_registration
            ? moment(item.date_of_registration).format("DD MMM, YYYY")
            : "---",
          email: item.email,
          total_invested_amount: item.total_invested_amount
            ? item.total_invested_amount
            : 0,
          action: item,
        };
      });
    const columns = [
      {
        title: "Sr. No.",
        dataIndex: "srno",
        key: "srno",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 150,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Date Of Registration",
        dataIndex: "dtOfReg",
        key: "dtOfReg",
      },
      {
        title: "Total Invested Amount",
        dataIndex: "total_invested_amount",
        key: "total_invested_amount",
        align: "right",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          const menu = (
            <Menu mode="vertical" style={{ width: 200 }}>
              <Menu.Item key="1" icon={<EditOutlined />}>
                <label
                  onClick={() => this.showStatusModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Status
                </label>
              </Menu.Item>
              <Menu.Item key="2" icon={<EyeOutlined />}>
                <Link
                  to="#"
                  onClick={() => this.saveIdLocalStorage(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;View
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<DeleteOutlined />}>
                <label
                  style={{ fontSize: 14 }}
                  onClick={() => this.showDeleteModal(text)}
                >
                  &nbsp;&nbsp;Delete
                </label>
              </Menu.Item>
            </Menu>
          );
          return (
            <div>
              <Dropdown className="ms-2" overlay={menu} placement="bottom">
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
                title="Referrals"
                extra={
                  <Button type="primary" onClick={this.showAddModal}>
                    <i
                      className="bx bxs-plus-circle"
                      style={{
                        color: "#fff",
                        position: "relative",
                        top: 3,
                        left: -3,
                      }}
                    ></i>{" "}
                    Add New Referrals
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
                  <Breadcrumb.Item>Institutional Referral</Breadcrumb.Item>
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
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                  <Button
                    type="primary"
                    onClick={() => this.exportToCSV("Premium Membership")}
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
                  scroll={{ x: "max-content" }}
                />
              </Card>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>

        {/* Start Edit modal  */}
        <Modal
          title="Enable/Disable Status"
          visible={this.state.showStatus}
          onOk={this.onChangeStatus}
          okText="OK"
          onCancel={() => this.setState({ showStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.modalLoading}>
            <div className="form-group mt-3">
              <label className="mb-2">
                Status <span className="text-danger">*</span>
              </label>
              <Select
                className="form-input-field"
                value={this.state.toggle}
                onChange={(value) => this.setState({ toggle: value })}
              >
                <Option value="1">Active</Option>
                <Option value="0">InActive</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}
        {/* Start Add modal  */}
        <Modal
          title="Add New Referral"
          visible={this.state.addModalStatus}
          onOk={this.addReferral}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          // onCancel={this.cancel_addReferral}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <h2>Basic Details</h2>
            <div className="form-group">
              <img
                src={this.state.profilePreview}
                className="rounded-circle mb-2"
                height="120"
                width="120"
                alt="Avatar"
              />

              <Input
                type="file"
                onChange={(e) =>
                  this.setState({
                    profile_img: e.target.files[0],
                    profilePreview: URL.createObjectURL(e.target.files[0]),
                  })
                }
                accept=".jpg, .jpeg, .png"
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.last_name}
                onChange={(e) => this.setState({ name: e.target.value })}
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
                Mobile No <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.mobile}
                onChange={(e) => this.setState({ mobile: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2 w-100">Accordance</label>
              <Input
                type="file"
                onChange={(e) =>
                  this.setState({ accordance: e.target.files[0] })
                }
                accept=".pdf"
              />
            </div>

            <br />
            <h2>Social Link</h2>
            <div className="form-group mt-3">
              <label className="mb-2">Facebook</label>
              <Input
                type="text"
                value={this.state.facebook}
                onChange={(e) => this.setState({ facebook: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Instagram</label>
              <Input
                type="text"
                value={this.state.instagram}
                onChange={(e) => this.setState({ instagram: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">LinkedIn</label>
              <Input
                type="text"
                value={this.state.linkedIn}
                onChange={(e) => this.setState({ linkedIn: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Twitter</label>
              <Input
                type="text"
                value={this.state.twitter}
                onChange={(e) => this.setState({ twitter: e.target.value })}
              />
            </div>
            <br />
            <h2>Bank Details</h2>
            <div className="mt-4">
              <label className="mb-2">Bank Account No.</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.accountNo}
                onChange={(e) => this.setState({ accountNo: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">IFSC Code</label>
              <Input
                type="text"
                value={this.state.ifsc_code}
                onChange={(e) => this.setState({ ifsc_code: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Account Holder Name</label>
              <Input
                type="text"
                value={this.state.bankname}
                onChange={(e) => this.setState({ bankname: e.target.value })}
              />
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Delete Referral"
          visible={this.state.deleteModalStatus}
          onOk={this.deleteReferral}
          okText="Delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure to want to Delete Institutional Referral ?
            </p>
          </Spin>
        </Modal>
        {/* End delete modal  */}
      </>
    );
  }
}

export default InstitutionalReferral;
