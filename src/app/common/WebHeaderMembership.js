import React, { Component } from "react";
import { Menu, Dropdown, Modal, message, Spin, Button } from "antd";
import {
  UserOutlined,
  ReloadOutlined,
  BankOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Bridge from "../constants/Bridge";
import Apis from "../constants/Apis";
import $ from "jquery";
import moment from "moment";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "../constants/data";
class WebHeaderMembership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loggedinstatus: false,
      modalVisible: false,
      bankdetailsmodal: false,
      profiledetailsmodal: false,
      founder_profiledetailsmodal: false,
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
      membership_type: "",
      profileimagetoshow: "",
      communitylink: "/Login",
      discounted_amount: 0,
      membership_amount: 0,

      //for founder data
      founder_profileimagetoshow: "",
      founder_profile: "",
      founder_contactno: "",
      founder_lastname: "",
      founder_middlename: "",
      founder_firstname: "",
      // founder_membership_type:'',
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
        let url =
          Apis.IMAGEURL +
          "profile/" +
          result.data[0].investor_id +
          "/" +
          result.data[0].user_profile_picture;
        if (result.data[0].user_block_status == 0) {
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
            if (current_date >= s_d && current_date <= ending_date) {
              // console.log('expired');
              this.setState({ membership_expired_status: true });
            }
            // console.log('current_date',current_date);
            // console.log('ending_date',ending_date);
            // console.log('starting_date',s_d);
          }
        } else {
          // message.warning("Your Login Id/Email has been block, Please Contact to Administrator",5)
          // localStorage.clear();
          // window.location.assign("/Login");
        }
      } else {
        this.setState({
          formloader: false,
        });
      }
    });
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
        let url =
          Apis.IMAGEURL +
          "profile/" +
          result.data[0].investor_id +
          "/" +
          result.data[0].user_profile_picture;
        // console.log('result',result);
        if (result.data[0].user_block_status == 0) {
          this.setState({
            founder_firstname: result.data[0].first_name,
            founder_middlename: result.data[0].middle_name,
            founder_lastname: result.data[0].last_name,
            founder_contactno: result.data[0].mobile,
            founder_profileimagetoshow: result.data[0].user_profile_picture
              ? url
              : "",
            // founder_membership_type: result.data[0].membership_type
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
      message.warning("Please enter account number");
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
      message.warning("Invalid ifsc code.");
      return;
    }

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
  };

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
  };

  // updating profile details
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
    formData.append("membership_type", this.state.membership_type);
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
        } else {
          message.error(result.message);
          this.setState({
            formloader: false,
          });
        }
      });
    }
  };

  //  showing Founder profile details
  founder_profiledetailspopup = () => {
    this.setState({
      founder_profiledetailsmodal: true,
    });
  };

  // hide founder profile details
  founder_hideprofiledetailspopup = () => {
    this.setState({
      founder_profiledetailsmodal: false,
    });
  };

  // updating founder profile details

  founder_updateprofiledetails = () => {
    if (this.state.founder_firstname == "") {
      message.warning("First name is required");
      return false;
    } else if (this.state.founder_lastname == "") {
      message.warning("Last name is required");
      return false;
    } else if (
      this.state.founder_contactno == "" ||
      this.state.founder_contactno.length != 10
    ) {
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
    console.log(this.state.founder_profile);
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
          if (result.status == 1) {
            message.success(result.message);
            this.setState(
              {
                formloader: false,
                founder_profiledetailsmodal: false,
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
      // console.log('founder_name',investor_id)
      // let loc = `http://growth91.myakola.com/api/Users/setsignindata?email=${investor_email}&user_id=${investor_id}`;
      let loc = `${process.env.REACT_APP_BASE_URL}community/test.php?email=${investor_email}&user_id=${investor_id}&name=${name}&img=${img}`;
      window.location.assign(loc);
    } else {
      window.location.assign("/Login");
    }
  };
  open_menu = () => {
    $(".mobile-menu").addClass("active");
    $(".menu-icon .open-menu").addClass("d-none").removeClass("d-block");
    $(".menu-icon .close-menu").removeClass("d-none").addClass("d-block");
    // alert('menu opened');
  };
  close_menu = () => {
    $(".mobile-menu").removeClass("active");
    $(".menu-icon .open-menu").removeClass("d-none").addClass("d-block");
    $(".menu-icon .close-menu").addClass("d-none").removeClass("d-block");
    // alert('menu closed');
  };

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

    // Founder Menu
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
            onClick={this.founder_profiledetailspopup}
            style={{ fontSize: 14 }}
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
        <header className="main-header">
          <div className="">
            <div className="top-header" style={{ background: "#29176f" }}>
              <div className="row">
                <div className="col-md-6">
                  <ul className="topbar-left ps-5">
                    <li
                      style={{
                        color: "white",
                        fontSize: "14px",
                        paddingTop: 9,
                      }}
                    >
                      <a href="mailto:contact@Growth91.com">
                        <span>
                          <i className="fa fa-envelope"></i>
                        </span>{" "}
                        contact@Growth91.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="topbar-right">
                    <li style={{ borderRight: "none" }}>
                      <a
                        href="https://www.linkedin.com/company/growth91/"
                        target="_blank"
                      >
                        <i className="fab fa-linkedin-in mt-0"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <nav className="main-navbar">
              <div className="nav-inner ">
                <a
                  className="brand h3 prime-purple"
                  style={{ cursor: "default" }}
                >
                  <img src="/web/growth91LOGO (4).png" width="116" alt="img" />
                </a>
                <ul
                  className="desktop-menu "
                  style={{ position: "relative", right: "60px" }}
                >
                  {/* {(localStorage.getItem('founder_id') || localStorage.getItem('investor_id')) == null ? 
                        
                        <li><a className={window.location.pathname=='/' && 'active'} href="/">Home</a></li> : ''
                      } */}
                  <li>
                    <a
                      className={window.location.pathname == "/" && "active"}
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className={
                        (window.location.pathname == "/deals" ||
                          window.location.pathname == "/DealDetails") &&
                        "active"
                      }
                      href="/deals"
                    >
                      Deals
                    </a>
                  </li>
                  <li>
                    <a
                      className={
                        window.location.pathname == "/Founders" && "active"
                      }
                      href="/Founders"
                    >
                      Founders
                    </a>
                  </li>
                  <li>
                    <a
                      className={
                        window.location.pathname == "/Investors" && "active"
                      }
                      href="/Investors"
                    >
                      Investors
                    </a>
                  </li>
                  <li>
                    <a
                      className={
                        (window.location.pathname == "/Learn" ||
                          window.location.pathname == "/How-it-works" ||
                          window.location.pathname == "/Blog" ||
                          window.location.pathname == "/details") &&
                        "active"
                      }
                      href="/Learn"
                    >
                      Learn
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={this.checkforlogin}>
                      Community
                    </a>
                  </li>
                </ul>
                <li className="sidebar-min ms-5 mt-2 me-0 ps-5 mb-2 py-auto">
                  {this.state.loggedinuser == "investor" ? (
                    <Dropdown overlay={menu}>
                      <a onClick={(e) => e.preventDefault()}>
                        {this.state.profileimagetoshow ? (
                          <img
                            src={this.state.profileimagetoshow}
                            className="user-img"
                            alt="profile"
                            style={{
                              width: 48,
                              height: 48,
                              objectFit: "cover",
                              borderRadius: "50%",
                              border: "2px solid #fff",
                            }}
                          />
                        ) : (
                          <div className="user-wrappr">
                            {this.state.name.slice(0, 2)}
                          </div>
                        )}
                      </a>
                    </Dropdown>
                  ) : (
                    // <Dropdown overlay={menu2}>
                    //   <a onClick={e => e.preventDefault()}>
                    //     <div className="user-wrappr">
                    //       {this.state.name.slice(0,2)}
                    //     </div>
                    //   </a>
                    // </Dropdown>
                    ""
                  )}
                </li>
                <div className="mobile-header">
                  <div className="menu-icon pb-2">
                    <div
                      className="open-menu"
                      onClick={() => this.open_menu()}
                      id="open-menu"
                    >
                      <i className="bx bx-menu"></i>
                    </div>
                    <div
                      className="close-menu"
                      onClick={() => this.close_menu()}
                      id="close-menu"
                    >
                      <i className="bx bx-x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="mobile-menu">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/deals">Deals</a>
                </li>
                <li>
                  <a href="/Founders">Founders</a>
                </li>
                <li>
                  <a href="/investors">Investors</a>
                </li>
                <li>
                  <a href="Learn">Learn</a>
                </li>
                <li>
                  <a onClick={this.checkforlogin}>Community</a>
                </li>
                {/* <i className="bx bxs-bell-ring position-relative text-white me-md-5 me-4" style={{fontSize: '1.5rem', marginTop: "10px"}}>
                                
                                <span className="position-absolute top-0 start-100 translate-middle px-2 mt-2 ms-2 bg-danger border border-light rounded-circle">
                                  <span className="" style={{fontSize: '0.65rem', padding: "0px"}}>4+</span>
                                </span>
                              </i> */}
                {localStorage.getItem("founder_id") ||
                localStorage.getItem("investor_id") ? (
                  " "
                ) : (
                  <div>
                    <li id="logbtn">
                      <a href="/Login">
                        <span>
                          <i
                            className="fa fa-user"
                            style={{ fontSize: "18px" }}
                          ></i>{" "}
                          &nbsp;{" "}
                        </span>
                        Log in{" "}
                      </a>
                    </li>
                    <li id="logbtn">
                      <a href="/Signup">
                        <span>
                          <i
                            className="fa fa-user"
                            style={{ fontSize: "18px" }}
                          ></i>{" "}
                          &nbsp;{" "}
                        </span>
                        Sign Up{" "}
                      </a>
                    </li>
                  </div>
                )}
                {/* <li><a href="/Login"><span><i className="fa fa-user" style={{fontSize: "18px"}}></i></span>Log in  </a></li> */}
              </ul>
            </div>
          </div>
        </header>

        <Modal
          title="Confirm"
          visible={this.state.modalVisible}
          onOk={this.logout}
          onCancel={this.handleCancel}
          okText="Yes"
          cancelText="No"
          style={{ maxWidth: 380 }}
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
          style={{ maxWidth: 480 }}
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

        {/* profile update for investor */}
        <Modal
          title="Update Profile Details"
          visible={this.state.profiledetailsmodal}
          onOk={this.updateprofiledetails}
          onCancel={this.hideprofiledetailspopup}
          okText="Update"
          cancelText="Cancel"
          style={{ maxWidth: 480 }}
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
                onChange={(e) => this.setState({ middlename: e.target.value })}
              />
            </div>

            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.lastname}
                readOnly
                onChange={(e) => this.setState({ lastname: e.target.value })}
              />
            </div>

            <div className="form-group mb-3">
              <label>Contact No</label>
              <input
                type="text"
                className="form-control"
                value={this.state.contactno}
                readOnly
                onChange={(e) => this.setState({ contactno: e.target.value })}
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

            {/* {(this.state.membership_type=='regular')?
           (<Button 
            type="danger" 
            style={{marginTop:5,marginBottom:20}}
            onClick={this.pay}
            >Updgrade Membership</Button>
            ):
            // (<Button 
            // type="danger" 
            // style={{marginTop:10,marginBottom:20}}
            // onClick={this.renew_membership}
            // >Renew Membership</Button>)

            <></>
            
            } */}
          </Spin>
        </Modal>

        {/* profile update for founder */}
        <Modal
          title="Update Profile Details"
          visible={this.state.founder_profiledetailsmodal}
          onOk={this.founder_updateprofiledetails}
          onCancel={this.founder_hideprofiledetailspopup}
          okText="Update"
          cancelText="Cancel"
          style={{ maxWidth: 480 }}
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
                onChange={(e) =>
                  this.setState({ founder_middlename: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.founder_lastname}
                readOnly
                onChange={(e) =>
                  this.setState({ founder_lastname: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-3">
              <label>Contact No</label>
              <input
                type="text"
                className="form-control"
                value={this.state.founder_contactno}
                readOnly
                onChange={(e) =>
                  this.setState({ founder_contactno: e.target.value })
                }
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
            {/* <div className="form-group mb-3">
              <label>Membership Type:</label><br/>
              <div className='d-flex align-items-start'>
                {this.state.founder_membership_type=='premium' && (
                  <img src="./assets/images/badge.png" style={{maxWidth:40}} />
                )}
                <span style={{textTransform:'capitalize'}}>
                  {this.state.founder_membership_type}
                </span>
              </div>
            </div>
            {(this.state.founder_membership_type=='premium')?(<>  <div className="form-group mb-3">
              <label>Membership Start Date:</label><br/>
              <div className='d-flex align-items-start'>
                <span style={{textTransform:'capitalize',paddingLeft:9}}>
                  {this.state.founder_membership_start_date?this.state.founder_membership_start_date:''}
                </span>
              </div>
            </div>
            <div className="form-group mb-3">
              <label>Membership Expiry Date:</label><br/>
              <div className='d-flex align-items-start'>
                <span style={{textTransform:'capitalize',paddingLeft:9}}>
                  {this.state.founder_membership_end_date?this.state.founder_membership_end_date:''}
                </span>
              </div>
            </div></>):(<></>)} */}

            {/* {(this.state.founder_membership_type=='regular')?
           (<Button 
            type="danger" 
            style={{marginTop:5,marginBottom:20}}
            onClick={this.pay}
            >Updgrade Membership</Button>
            ):
            // (<Button 
            // type="danger" 
            // style={{marginTop:10,marginBottom:20}}
            // onClick={this.renew_membership}
            // >Renew Membership</Button>)

            <></>
            
            } */}
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default WebHeaderMembership;
