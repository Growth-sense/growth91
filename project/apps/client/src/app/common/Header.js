import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Modal, message, Spin, Button } from "antd";
import {
  UserOutlined,
  ReloadOutlined,
  BankOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Bridge from "../constants/Bridge";
import Apis from "../constants/Apis";
import axios from "axios";
import moment from "moment";
import Membership from "./modal/Membership";
import { TRACKING_ID } from "../constants/data";
import ReactGA from "react-ga4";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loggedinstatus: false,
      modalVisible: false,
      bankdetailsmodal: false,
      profiledetailsmodal: false,
      accountno: "",
      ifsccode: "",
      investor_id: "",
      formloader: false,
      loggedinuser: "",
      profile: "",
      firstname: "",
      middlename: "",
      lastname: "",
      contactno: "",
      profileimagetoshow: "",
      communitylink: "/Login",
      membership_type: "",
      membership_start_date: "",
      membership_end_date: "",
      show_member_ship_alert: 0,
      membership_expired_status: false,
      expiry_date: "",
      membership_amount: 0,
      //for founder profile
      founder_profileimagetoshow: "",
      founder_profile: "",
      founder_contactno: "",
      founder_lastname: "",
      founder_middlename: "",
      founder_firstname: "",
      profile_founder_detailsmodal: false,

      //for upgrade membership
      discount: 0,
      discounted_amount: 0,
      email: "",
      premium_button_show_status: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("investor_id")) {
      this.setState(
        {
          name: localStorage.getItem("investor_name"),
          loggedinstatus: true,
          loggedinuser: "investor",
          investor_id: localStorage.getItem("investor_id"),
        },
        () => this.getbankdetails()
      );
    } else if (localStorage.getItem("founder_id")) {
      this.setState(
        {
          loggedinstatus: true,
          loggedinuser: "founder",
          name: localStorage.getItem("founder_name"),
        },
        () => this.get_founder_details()
      );
    } else {
      this.setState({
        name: "",
        loggedinstatus: false,
      });
    }
    this.getsettings();
  }
  getsettings = () => {
    this.setState({ amountloader: true });
    Bridge.admin.settings.getsettings().then((result) => {
      if (result.status == 1) {
        // console.log('result',result);
        let amount =
          Number(result.data[0].amount / 100) * Number(result.data[0].discount);
        amount = Number(result.data[0].amount) - Number(amount);
        this.setState({
          membership_amount: result.data[0].amount,
          discount: result.data[0].discount,
          discounted_amount: amount,
        });
      } else {
      }
    });
  };

  getbankdetails = () => {
    let params = {
      id: this.state.investor_id,
    };
    Bridge.investor.getbankdetails(params).then((result) => {
      if (result.status == 1) {
        //checking user block status
        if (result.data[0].user_block_status == 0) {
          let url =
            Apis.IMAGEURL +
            "profile/" +
            result.data[0].investor_id +
            "/" +
            result.data[0].user_profile_picture;
          // console.log('result',result);
          this.setState({
            accountno: result.data[0].bank_ac_no,
            ifsccode: result.data[0].ifsc_code,
            firstname: result.data[0].first_name,
            middlename: result.data[0].middle_name,
            lastname: result.data[0].last_name,
            contactno: result.data[0].mobile,
            profileimagetoshow: result.data[0].user_profile_picture ? url : "",
            membership_type: result.data[0].membership_type,
          });
          let exploded_start_date = "";
          let exploded_end_date = "";
          let start_date = result.data[0].membership_start_date;
          if (start_date) {
            let explodeddate = start_date.split(" ")[0];
            exploded_start_date = explodeddate;
            start_date = moment(explodeddate).format("DD MMM, YYYY");
            this.setState({ membership_start_date: start_date });
          }
          let end_date = result.data[0].membership_end_date;
          if (end_date) {
            let explodeddate = end_date.split(" ")[0];
            exploded_end_date = explodeddate;
            let current_date = moment().format("YYYY-MM-DD");
            let test_end_date = moment(exploded_end_date).format("YYYY-MM-DD");
            let sub_1_end_date = moment(exploded_end_date)
              .subtract(1, "months")
              .format("YYYY-MM-DD");
            // console.log('sub_1_end_date',sub_1_end_date);
            // && current_date<test_end_date
            if (current_date > sub_1_end_date) {
              this.setState({ premium_button_show_status: true });
            } else {
              this.setState({ premium_button_show_status: false });
            }
            end_date = moment(explodeddate).format("DD MMM, YYYY");
            this.setState({
              membership_end_date: end_date,
              expiry_date: exploded_end_date,
            });
          }
          if (exploded_start_date && exploded_end_date) {
            let current_date = moment();
            let ending_date = moment(exploded_end_date);
            let starting_date = moment(exploded_start_date).add(11, "M");
            let d = new Date(exploded_start_date);
            var newDate = new Date(d.setMonth(d.getMonth() + 11));
            let s_d = moment(newDate);
            if (current_date > ending_date || current_date == ending_date) {
              // this.setState({membership_expired_status:true});
            }
          }
          // check for button show
          this.setState({ formloader: false });
        } else {
          message.warning(
            "Your Login Id/Email has been block, Please Contact to Administrator",
            5
          );
          localStorage.clear();
          window.location.assign("/Login");
        }
      } else {
        this.setState({ formloader: false });
      }
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  logout = () => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.event({
      category: "Logout",
      action: "User Logged Out",
    });
    localStorage.clear();
    window.location.href = "/login";
  };

  showbankingdetails = () => {
    this.setState({
      bankdetailsmodal: true,
    });
  };

  handleCancelbankdetails = () => {
    this.setState({
      bankdetailsmodal: false,
    });
  };

  updatebankdetails = () => {
    if (
      this.state.accountno == "" ||
      this.state.accountno.length < 9 ||
      this.state.accountno.length > 18
    ) {
      message.warning("Please enter Account number");
      return;
    }
    if (this.state.ifsccode == "") {
      message.warning("Please enter IFSC Code");
      return;
    }
    if (this.state.ifsccode.length != 11) {
      message.warning("Please enter valid IFSC Code");
      return;
    }

    if (this.state.investor_id == "") {
      message.warning("Invalid Request");
      return;
    }
    var reg = /^[A-Za-z]{4}[0-9]{6,7}$/;
    if (this.state.ifsccode.match(reg)) {
    } else {
      message.warning("Invalid IFSC code.");
      return;
    }
    let box = {
      accountno: this.state.accountno,
      ifsccode: this.state.ifsccode,
    };
    let d = "";

    this.setState({ formloader: true });
    axios({
      method: "post",
      url: "${process.env.REACT_APP_BASE_URL}verification/bank.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: box,
    }).then((response) => {
      if (response.data.status == "SUCCESS") {
        message.success(response.data.message);
        d = "success";
        this.updatebank();
        this.setState({ formloader: false });
      } else {
        message.warning("Invalid bank account details.");
        this.setState({ formloader: false });
        return;
      }
    });
  };

  updatebank() {
    this.setState({ formloader: true });

    let params = {
      accountno: this.state.accountno,
      ifsccode: this.state.ifsccode,
      id: this.state.investor_id,
    };

    Bridge.investor.updateaccountdetails(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          formloader: false,
          bankdetailsmodal: false,
        });
      } else {
        message.warning(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  }

  // show profile details
  showprofiledetailspopup = () => {
    this.setState({
      profiledetailsmodal: true,
    });
  };

  // hide profile details
  hideprofiledetailspopup = () => {
    this.setState({
      profiledetailsmodal: false,
    });
    window.location.reload();
  };

  updateprofiledetails = () => {
    if (this.state.firstname == "") {
      message.warning("First name is required");
      return false;
    } else if (this.state.lastname == "") {
      message.warning("Last name is required");
      return false;
    } else if (
      this.state.contactno == "" ||
      this.state.contactno.length != 10
    ) {
      message.warning("Contact number is required");
      return false;
    }
    this.setState({ formloader: true });

    let formData = new FormData(); //formdata object

    formData.append("first_name", this.state.firstname); //append the values with key, value pair
    formData.append("middle_name", this.state.middlename);
    formData.append("last_name", this.state.lastname);
    formData.append("mobile", this.state.contactno);
    formData.append("user_profile_picture", this.state.profile);
    formData.append("investor_id", this.state.investor_id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (localStorage.getItem("investor_id")) {
      Bridge.investor.updateprofiledetails(formData, config).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState(
            {
              formloader: false,
              profiledetailsmodal: false,
              firstname: "",
              lastname: "",
              contactno: "",
              profile: "",
            },
            () => this.getbankdetails()
          );
          window.location.reload();
        } else {
          message.error(result.message);
          this.setState({
            formloader: false,
          });
        }
      });
    }
  };

  checkforlogin = () => {
    if (localStorage.getItem("investor_id")) {
      let name = this.state.firstname + " " + this.state.lastname;
      let img = this.state.profileimagetoshow;
      let investor_id = localStorage.getItem("investor_id");
      let investor_email = localStorage.getItem("investor_email");
      // let loc = `http://growth91.myakola.com/api/Users/setsignindata?email=${investor_email}&user_id=${investor_id}`;
      let loc = `${process.env.REACT_APP_BASE_URL}community/test.php?email=${investor_email}&user_id=${investor_id}&name=${name}&img=${img}`;
      window.location.assign(loc);
    } else if (localStorage.getItem("founder_id")) {
      let name =
        this.state.founder_firstname + " " + this.state.founder_lastname;
      let img = this.state.founder_profileimagetoshow;
      let investor_id = localStorage.getItem("founder_id");
      let investor_email = localStorage.getItem("founder_email");
      // let loc = `http://growth91.myakola.com/api/Users/setsignindata?email=${investor_email}&user_id=${investor_id}`;
      let loc = `${process.env.REACT_APP_BASE_URL}community/test.php?email=${investor_email}&user_id=${investor_id}&name=${name}&img=${img}`;
      window.location.assign(loc);
    } else {
      window.location.assign("/Login");
    }
  };

  renew_membership = () => {
    let order_id = "order-01";
    let user_id = localStorage.getItem("investor_id");
    let amount = this.state.discounted_amount;
    let expiry_date = this.state.expiry_date;
    let url = `${process.env.REACT_APP_BASE_URL}cashfree/renew/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&expiry_date=${expiry_date}`;
    // alert(url);
    window.location.assign(url);
  };

  //for update founder profile
  update_founder_profiledetails = () => {
    if (this.state.founder_firstname == "") {
      message.warning("First name is required");
      return false;
    } else if (this.state.founder_lastname == "") {
      message.warning("Last name is required");
      return false;
    } else if (!(this.state.founder_contactno.length == 10)) {
      message.warning("Contact number is required");
      return false;
    }
    this.setState({ formloader: true });

    let formData = new FormData(); //formdata object

    formData.append("founder_first_name", this.state.founder_firstname); //append the values with key, value pair
    formData.append("founder_middle_name", this.state.founder_middlename);
    formData.append("founder_last_name", this.state.founder_lastname);
    formData.append("founder_mobile", this.state.founder_contactno);
    formData.append("founder_user_profile_picture", this.state.founder_profile);
    formData.append("founder_id", localStorage.getItem("founder_id"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (localStorage.getItem("founder_id")) {
      Bridge.founder
        .update_founder_profile_details(formData, config)
        .then((result) => {
          // alert('Hello');
          if (result.status == 1) {
            message.success(result.message);
            this.setState(
              {
                formloader: false,
                profile_founder_detailsmodal: false,
                contactno: "",
                profile: "",
              },
              () => this.get_founder_details()
            );
            window.location.reload();
          } else {
            message.error(result.message);
            this.setState({
              formloader: false,
            });
          }
        });
    }
  };

  //for upgrade membership
  // pay
  pay = () => {
    let order_id = "order-01";
    let user_id = localStorage.getItem("investor_id");
    let amount = this.state.discounted_amount;
    let membership_fees = this.state.discounted_amount;
    let registered_amt = this.state.membership_amount;
    let url = `${process.env.REACT_APP_BASE_URL}cashfree/register/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&membership_fees=${membership_fees}&registered_amt=${registered_amt}`;
    window.location.assign(url);
  };

  get_founder_details = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.get_founder_profile_details(params).then((result) => {
      if (result.status == "1") {
        if (result.data[0].user_block_status == 0) {
          let url =
            Apis.IMAGEURL +
            "profile/" +
            result.data[0].investor_id +
            "/" +
            result.data[0].user_profile_picture;
          // console.log('result',result);
          this.setState({
            founder_firstname: result.data[0].first_name,
            founder_middlename: result.data[0].middle_name,
            founder_lastname: result.data[0].last_name,
            founder_contactno: result.data[0].mobile,
            founder_profileimagetoshow: result.data[0].user_profile_picture
              ? url
              : "",
          });
        } else {
          message.warning(
            "Your Login Id/Email has been block, Please Contact to Administrator",
            5
          );
          localStorage.clear();
          window.location.assign("/Login");
        }
      } else {
        this.setState({ formloader: false });
      }
    });
  };
  // show update modal
  open_regular_member_modal = () => {};

  render() {
    const menu = (
      <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
        <Menu.Item key="two" icon={<PieChartOutlined />}>
          <a href="/investor-dashboard" style={{ fontSize: 14 }}>
            Dashboard
          </a>
        </Menu.Item>
        <Menu.Item key="four" icon={<UserOutlined />}>
          <a
            href="#"
            onClick={this.showprofiledetailspopup}
            style={{ fontSize: 14 }}
          >
            Edit Profile
          </a>
        </Menu.Item>
        {/* <Menu.Item key="five" icon={<BankOutlined />}>
          <a href="#" onClick={this.showbankingdetails} style={{ fontSize:14 }}>
            Bank Details
          </a>
        </Menu.Item> */}
        {/* <Menu.Item key="three" icon={<ReloadOutlined />}
        style={{ width:160 }}>
          <a href='/MembershipPlan' style={{ fontSize:14 }}>
            Membership 
          </a>
        </Menu.Item> */}
        <Menu.Item key="six" icon={<ReloadOutlined />} style={{ width: 160 }}>
          <a
            href="#"
            style={{ fontSize: 14 }}
            onClick={() => this.setState({ modalVisible: true })}
          >
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    const menu2 = (
      <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
        <Menu.Item key="two" icon={<PieChartOutlined />}>
          <a href="/founder-dashboard" style={{ fontSize: 14 }}>
            Dashboard
          </a>
        </Menu.Item>

        <Menu.Item key="four" icon={<UserOutlined />}>
          <a
            href="#"
            style={{ fontSize: 14 }}
            onClick={() => {
              this.setState({ profile_founder_detailsmodal: true });
            }}
          >
            Edit Profile
          </a>
        </Menu.Item>

        <Menu.Item key="five" icon={<ReloadOutlined />} style={{ width: 160 }}>
          <a
            href="#"
            style={{ fontSize: 14 }}
            onClick={() => this.setState({ modalVisible: true })}
          >
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <button
                className="navbar-toggler px-1 py-0 mt-1"
                style={{ height: "36px" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <Link className="navbar-brand" to="/deals">
                <img
                  src="/web/growth91LOGO (4).png"
                  width="120"
                  style={{
                    position: "relative",
                    top: -8,
                  }}
                  className="d-inline-block align-top"
                  alt="Growth91"
                />
              </Link>
              <div className="d-lg-block d-none">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                  <li className="nav-item">
                    <a className="nav-link" href="/" style={{ padding: "12px 1px" }}>
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/deals" style={{ padding: "12px 1px" }}>
                      Deals
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/secondary-shares" style={{ padding: "12px 1px" }}>
                      Buy/Sell
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Founders" style={{ padding: "12px 1px" }}>
                    Founders
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/resources" style={{ padding: "12px 1px" }}>
                      Resources
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="/community">
                      Community
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a className="nav-link" href="/Learn" style={{ padding: "12px 1px" }}>
                      About us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link"  rel="noreferrer" href="https://growth91.com/blog/" style={{ padding: "12px 1px" }}>
                     Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link"  rel="noreferrer" href="/FutureUnicorn" style={{ padding: "12px 1px" }}>
                     Future Unicorns
                     <span 
                       className="bounce-animation"
                       style={{ 
                         backgroundColor: "#ff9c1a", 
                         color: "white", 
                         fontSize: "10px", 
                         padding: "2px 6px", 
                         borderRadius: "4px", 
                         marginLeft: "5px",
                         position: "relative", 
                         top: "-8px",
                         display: "inline-block",
                         animation: "bounce 1s infinite"
                       }}
                     >
                       NEW
                     </span>
                     <style jsx>{`
                       @keyframes bounce {
                         0%, 100% {
                           transform: translateY(0);
                         }
                         50% {
                           transform: translateY(-5px);
                         }
                       }
                       .bounce-animation {
                         animation: bounce 1s ease infinite;
                       }
                     `}</style>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={this.checkforlogin}
                    >
                      Community
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>

            <div
              className="ms-sm-5  mt-2 me-0 my-auto"
              style={{
                width: "fit-content",
                display: "flex",
                alignTtems: "end",
              }}
            >
              <div
                className="d-flex header-right-col"
                style={{ alignItems: "center" }}
              >
                {this.state.loggedinstatus == true ? (
                  <>
                    {this.state.loggedinuser == "investor" ? (
                      <Dropdown overlay={menu}>
                        <a onClick={(e) => e.preventDefault()}>
                          {this.state.profileimagetoshow ? (
                            <img
                              src={this.state.profileimagetoshow}
                              className="user-img"
                              alt="profile"
                              style={{
                                width: 45,
                                height: 45,
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <div className="user-wrappr">
                              {this.state.firstname?.slice(0, 1)}
                              {this.state.lastname?.slice(0, 1)}
                            </div>
                          )}
                        </a>
                      </Dropdown>
                    ) : (
                      <Dropdown overlay={menu2}>
                        <a onClick={(e) => e.preventDefault()}>
                          {this.state.founder_profileimagetoshow ? (
                            <img
                              src={this.state.founder_profileimagetoshow}
                              className="user-img"
                              alt="profile"
                              style={{
                                width: 45,
                                height: 45,
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <div className="user-wrappr">
                              {this.state.name?.slice(0, 2)}
                            </div>
                          )}
                        </a>
                      </Dropdown>
                    )}
                  </>
                ) : (
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" href="/Login">
                        {this.props.dontShowLoginButton ? "" : "Login"}
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
        {/* {this.state.membership_expired_status==true && (
          <div className='membership-alert-div'>
            <p className='text-center'>
              Membership is expired on {moment(this.state.membership_end_date).format('DD MMM, YYYY')}. Please kindly renew membership.
            </p>
          </div>
        )} */}
        <Modal
          title="Confirm"
          visible={this.state.modalVisible}
          onOk={this.logout}
          onCancel={this.handleCancel}
          okText="Yes"
          cancelText="No"
          // style={{ maxWidth: 480 }}
          style={{ width: "100%", resize: "none" }}
        >
          <h6>Are you sure you want to sign out?</h6>
        </Modal>

        <Modal
          title="Update Bank Details"
          visible={this.state.bankdetailsmodal}
          onOk={this.updatebankdetails}
          onCancel={this.handleCancelbankdetails}
          okText="Update"
          cancelText="Cancel"
          // style={{ maxWidth: 480 }}
          style={{ width: "100%", resize: "none" }}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Account Number"
                value={this.state.accountno}
                onChange={(e) => this.setState({ accountno: e.target.value })}
              />
            </div>
            <br />

            <div className="form-group">
              <label>IFSC Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="IFSC Code"
                value={this.state.ifsccode}
                onChange={(e) => this.setState({ ifsccode: e.target.value })}
              />
            </div>
          </Spin>
        </Modal>

        <Modal
          title="Update Profile Details"
          visible={this.state.profiledetailsmodal}
          onOk={this.updateprofiledetails}
          onCancel={this.hideprofiledetailspopup}
          okText="Update"
          cancelText="Cancel"
          // style={{ maxWidth: 480 }}
          style={{ width: "100%", resize: "none" }}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.firstname}
                readOnly
                onChange={(e) => this.setState({ firstname: e.target.value })}
              />
            </div>

            <div className="form-group mb-3">
              <label>Middle Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.middlename}
                readOnly
                // onChange={(e) => this.setState({ middlename:e.target.value })}
              />
            </div>

            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.lastname}
                readOnly
                // onChange={(e) => this.setState({ lastname:e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Contact No</label>
              <input
                type="text"
                className="form-control"
                value={this.state.contactno}
                readOnly
                // onChange={(e) => this.setState({ contactno:e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={localStorage.getItem("investor_email")}
                readOnly
                // onChange={(e) => this.setState({ contactno:e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Profile Image</label>
              <br />
              {this.state.profileimagetoshow && (
                <img
                  style={{
                    width: 130,
                    borderRadius: "50%",
                    height: 130,
                    objectFit: "cover",
                    margin: "14px 0",
                  }}
                  src={this.state.profileimagetoshow}
                  alt="profile"
                  className="profile-image"
                />
              )}
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => this.setState({ profile: e.target.files[0] })}
              />
            </div>

            <div className="form-group mb-3">
              <label>Membership Type:</label>
              <br />
              <div className="d-flex align-items-start">
                {this.state.membership_type == "premium" && (
                  <img
                    src="./assets/images/badge.png"
                    style={{ maxWidth: 40 }}
                  />
                )}
                <span style={{ textTransform: "capitalize" }}>
                  {this.state.membership_type}
                </span>
              </div>
            </div>
            {this.state.membership_type == "premium" ? (
              <>
                {" "}
                <div className="form-group mb-3">
                  <label>Membership Start Date:</label>
                  <br />
                  <div className="d-flex align-items-start">
                    <span
                      style={{ textTransform: "capitalize", paddingLeft: 9 }}
                    >
                      {this.state.membership_start_date
                        ? this.state.membership_start_date
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label>Membership Expiry Date:</label>
                  <br />
                  <div className="d-flex align-items-start">
                    <span
                      style={{ textTransform: "capitalize", paddingLeft: 9 }}
                    >
                      {this.state.membership_end_date
                        ? this.state.membership_end_date
                        : ""}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Regular membership modal start  */}
            {this.state.investor_id &&
              this.state.membership_type &&
              this.state.membership_start_date &&
              this.state.membership_end_date && (
                <Membership
                  investor_id={this.state.investor_id}
                  type={this.state.membership_type}
                  start_date={this.state.membership_start_date}
                  end_date={this.state.membership_end_date}
                  closeModal={() => this.hideprofiledetailspopup()}
                  premium_button_show_status={
                    this.state.premium_button_show_status
                  }
                />
              )}
            {/* Regular membership modal End  */}
          </Spin>
        </Modal>

        {/* profile update for founder */}
        <Modal
          title="Update Profile Details"
          visible={this.state.profile_founder_detailsmodal}
          onOk={this.update_founder_profiledetails}
          onCancel={() => {
            this.setState({ profile_founder_detailsmodal: false });
          }}
          okText="Update"
          cancelText="Cancel"
          // style={{ maxWidth: 480 }}
          style={{ width: "100%", resize: "none" }}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.founder_firstname}
                readOnly
                onChange={(e) =>
                  this.setState({ founder_firstname: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-3">
              <label>Middle Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.founder_middlename}
                readOnly
                // onChange={(e) => this.setState({ founder_middlename:e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.founder_lastname}
                readOnly
                // onChange={(e) => this.setState({ founder_lastname:e.target.value })}
              />
            </div>

            <div className="form-group mb-3">
              <label>Contact No</label>
              <input
                type="text"
                className="form-control"
                value={this.state.founder_contactno}
                readOnly
                // onChange={(e) => this.setState({ founder_contactno:e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={localStorage.getItem("founder_email")}
                readOnly
                // onChange={(e) => this.setState({ contactno:e.target.value })}
              />
            </div>

            <div className="form-group mb-3">
              <label>Profile Image</label>
              <br />
              {this.state.founder_profileimagetoshow && (
                <img
                  style={{
                    width: 130,
                    borderRadius: "50%",
                    height: 130,
                    objectFit: "cover",
                    margin: "14px 0",
                  }}
                  src={this.state.founder_profileimagetoshow}
                  alt="profile"
                  className="profile-image"
                />
              )}
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) =>
                  this.setState({ founder_profile: e.target.files[0] })
                }
              />
            </div>
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default Header;
