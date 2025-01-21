import React, { Component } from "react";
import {
  message,
  Modal,
  Spin,
  DatePicker,
  Input,
  Skeleton,
  notification,
  Checkbox,
} from "antd";
import Bridge from "../../constants/Bridge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import Urldata from "./Urldata.jsx";
import axios from "axios";
import $ from "jquery";

import ReactGA from "react-ga4";
import { TRACKING_ID } from "../../constants/data";
ReactGA.initialize(TRACKING_ID);

const { TextArea } = Input;
class Viewfamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerWithoutEmailCheck: false,
      isEmailRequired: true,
      nameDetailsShow: false,
      panDetailsShow: false,
      panCardValidatedName: "",
      investor_id: "",
      kycstatus: "",
      bankstatus: "",
      loading: false,
      investments: [],
      panno: "",
      startinvestedcompanies: 0,
      startinvestedamount: 0,
      addModalStatus: false,
      formloader: false,
      middle_name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      nationality: "Indian Citizen",
      selffirst_name: "",
      selflast_name: "",
      selfemail: "",
      selfphone: "",
      selfdetail: "",
      selfnationality: "Indian Citizen",
      refferal_code: "",
      is_refferal_code_matched: "",
      phone1: "",
      memberdetail: "",
      viewmemberdetail: "",
      memberdetailid: localStorage.getItem("investor_id"),
      FamilyOtp: "",
      familyotpmodal: false,
      SendreqEmail: "",
      Sendreqmobile: "",
      selfaccount: "",
      ids: "",
      typeofmember: "Indian Resident",
      country_code: "",
      countemailseconds: 119000,
      panVerifyStatus: false,
      adharVerifyStatus: false,
      bankAcountVerifyStatus: false,
      loading: false,
      activetab: 0,
      accountno: "",
      ifsccode: "",
      pan_details: {},
      adhar_details: {},
      bank_details: {},
      kycstatus: "",
      nationality: "",
      autoFill: false,
    };
  }

  //group id from id parameter

  handleRegisterWithoutEmailCheckbox = (e) => {
    const registerWithoutEmail = e.target.checked; // Get the checked state
    this.setState({ registerWithoutEmail }, () => {
      // This callback will be called after the state has been updated
      console.log("Checkbox is now:", registerWithoutEmail);
      this.handleRegisterWithoutEmailCheckboxFunction(registerWithoutEmail);
    });
  };

  handleRegisterWithoutEmailCheckboxFunction = (registerWithoutEmail) => {
    if (registerWithoutEmail) {
      this.setState(
        {
          registerWithoutEmailCheck: true,
          isEmailRequired: false,
          nameDetailsShow: true,
          panDetailsShow: true,
          autoFill: false,
          SendreqEmail: "",
          email: "",
        },
        () => {
          // Log state after all updates are completed
          console.log(
            "registerWithoutEmailCheck",
            this.state.registerWithoutEmailCheck
          );
          console.log("Checkbox is checked!");
        }
      );
    } else {
      this.setState(
        {
          registerWithoutEmailCheck: false,
          isEmailRequired: true,
          nameDetailsShow: false,
          panDetailsShow: false,
          autoFill: false,
          SendreqEmail: "",
          email: "",
        },
        () => {
          // Log state after all updates are completed
          console.log("Checkbox is unchecked!");
          console.log(
            "registerWithoutEmailCheck",
            this.state.registerWithoutEmailCheck
          );
        }
      );
    }
  };

  getUserWithEmail = (e) => {
    e.preventDefault();
    console.log("getUserWithEmail");
    console.log(this.state.SendreqEmail);

    // getUsersDetailsByEmail get user details with this api
    let params = {
      email: this.state.SendreqEmail,
    };
    Bridge.users.getUsersDetailsByEmail(params).then((result) => {
      console.log(result);
      if (result.status == 1 && result.data.length > 0) {
        console.log(result.data[0]);
        this.setState({
          nameDetailsShow: true,
          panDetailsShow: false,
          first_name: result.data[0].first_name,
          last_name: result.data[0].last_name,
          email: result.data[0].email,
          phone: result.data[0].mobile,
          country_code: result.data[0].country_code,
          autoFill: true,
        });
      } else {
        this.setState({
          nameDetailsShow: true,
          panDetailsShow: false,
          autoFill: false,
          first_name: "",
          last_name: "",
          phone: "",
          country_code: "",
          email: "",
        });

        // notification that user not exist but you can still invite by entering details
        notification.warning({
          message: "User not found",
          description: "You can still invite the user by entering details.",
          placement: "top",
          duration: 5,
        });
      }
    });
  };

  componentWillMount() {
    document.title = "Investor Dashboard - Growth91 ";
  }

  componentDidMount() {
    this.setState({ investor_id: this.props.investor_id });
    if (this.props.investor_id) {
      // this.getmember();
    }
    this.getInvestments();
  }
  test = () => {};
  getInvestments = () => {
    this.setState({ loading: true });
    let params = {
      investor_id: localStorage.getItem("investor_id"),
    };
    Bridge.investor.getInvestments(params).then((result) => {
      if (result.status == 1) {
        let total = 0;
        for (let d of result.data) {
          total += Number(d.Investment_amt);
        }
        this.setState({
          investments: result.data,
          startinvestedcompanies: result.data.length,
          startinvestedamount: total,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };
  getbankdetails = () => {
    let params = {
      id: localStorage.getItem("investor_id"),
    };
    Bridge.investor.getbankdetails(params).then((result) => {
      if (result.status == 1) {
        //checking user block status
        if (result.data[0].user_block_status == 0) {
          console.log("result", result.data);
          this.setState({
            selfaccount: result.data[0],
            viewmemberdetail: result.data[0],
          });
        }
      }
    });
  };
  handleChangeSelect = (e) => {
    this.setState({
      nationality: e.target.value,
    });
  };
  addfamily = () => {
    this.setState({ formloader: true });
    // if (this.state.SendreqEmail == "" || this.state.Sendreqmobile == "") {
    if (this.state.SendreqEmail == "") {
      toast.error("Please fill require fields");
    } else {
      let params = {
        email: this.state.SendreqEmail,
        // mobile: this.state.Sendreqmobile,
      };
      Bridge.family.checkFamilyMember(params).then((result) => {
        console.log(result);
        if (result.status == "1") {
          this.sendinvite();
          this.setState({ addModalStatus: false });
        } else {
          toast.error("Invailid User detail");
        }
      });
    }

    this.setState({ formloader: false });
  };
  onChangeEmail = (email) => {
    this.setState({ email: email });
  };

  sendinvite = () => {
    console.log(this.state.ids);
    let params = {
      email: this.state.SendreqEmail,
      mobile: this.state.Sendreqmobile,
      groupID: this.state.ids,
      userID: localStorage.getItem("Parent_investor_id"),
    };
    Bridge.family.saveInvite(params).then((result) => {
      console.log(result);
      if (result.status == "1") {
        toast.success(
          "An invitation is sent to the requested email address."
        );
      } else {
        toast.info("Invitation already sent!");
        this.setState({ addModalStatus: false });
      }
    });
  };

  getmember = (id, userid) => {
    console.log(id);

    this.setState({ ids: id });
    let params = {
      parent_id: localStorage.getItem("Parent_investor_id"),
      groupID: id,
    };
    Bridge.investor.getfamilymember(params).then((result) => {
      console.log(result);
      const data = result.data.filter((item, index) => {
        console.log(item.investor_id);
        console.log(localStorage.getItem("investor_id"));
        return item.investor_id == localStorage.getItem("investor_id");
      });
      console.log(data);
      console.log(data.length, "0");
      const newchanges = data.filter((item, index) => {
        return item.investor_id == localStorage.getItem("investor_id");
      });
      console.log(newchanges);
      if (newchanges.length == 0) {
        localStorage.setItem(
          "investor_id",
          localStorage.getItem("Parent_investor_id")
        );
        localStorage.setItem(
          "investor_email",
          localStorage.getItem("Parent_investor_email")
        );
        localStorage.setItem(
          "investor_kycstatus",
          localStorage.getItem("Parent_investor_kycstatus")
        );
        localStorage.setItem(
          "investor_name",
          localStorage.getItem("Parent_investor_name")
        );
      }
      this.getbankdetails(localStorage.getItem("investor_id"));

      //   if(data.length !=0 ){
      //     localStorage.setItem(
      //       "investor_id",
      //       localStorage.getItem("Parent_investor_id")
      //     );
      //     localStorage.setItem(
      //       "investor_email",
      //       localStorage.getItem("Parent_investor_email")
      //     );
      //     localStorage.setItem(
      //       "investor_kycstatus",
      //       localStorage.getItem("Parent_investor_kycstatus")
      //     );
      //     localStorage.setItem(
      //       "investor_name",
      //       localStorage.getItem("Parent_investor_name")
      //     );
      // // window.location.reload();

      //   }
      this.setState({ memberdetail: result.data });
    });
  };
  submitfamilyotp = (e) => {
    this.setState({ familyotpmodal: false });
    window.location.reload();
  };
  setmember = (e) => {
    let id;
    if (!e) {
      id = localStorage.getItem("investor_id");
      this.setState({ memberdetailid: id });
    } else {
      id = e.target.value;
      this.setState({ memberdetailid: id });
    }

    const data =
      this.state.memberdetail &&
      this.state.memberdetail.filter((item, index) => {
        return item.investor_id === id;
      });

    console.log(data[0]);
    console.log(id);
    if (id != localStorage.getItem("Parent_investor_id")) {
      localStorage.setItem("investor_id", id);
      localStorage.setItem("investor_email", data[0].email);
      localStorage.setItem("investor_kycstatus", data[0].kycstatus);
      localStorage.setItem(
        "investor_name",
        data[0].first_name + " " + data[0].last_name
      );

      this.setState({ viewmemberdetail: data[0] });
      this.getbankdetails();
      window.location.reload();
    } else {
      localStorage.setItem(
        "investor_id",
        localStorage.getItem("Parent_investor_id")
      );
      localStorage.setItem(
        "investor_email",
        localStorage.getItem("Parent_investor_email")
      );
      localStorage.setItem(
        "investor_kycstatus",
        localStorage.getItem("Parent_investor_kycstatus")
      );
      localStorage.setItem(
        "investor_name",
        localStorage.getItem("Parent_investor_name")
      );
      this.getbankdetails();

      window.location.reload();
    }
  };

  // register
  addInvestorViaFamily = () => {
    console.log("addInvestorViaFamily");
    if (this.state.registerWithoutEmailCheck) {
      this.addInvestorViaFamilyWithoutEmail();
    } else {
      let params = {
        first_name: this.state.first_name,
        middle_name: this.state.middle_name,
        last_name: this.state.last_name,
        email: this.state.SendreqEmail,
        phone: this.state.phone,
      };
      Bridge.users.addInvestorViaFamily(params).then((result) => {
        console.log("data", result);
        console.log(result);
        if (result.status == 1) {
          this.setState({
            addModalStatus: false,
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            phone: "",
          });
          // addfamily
          this.addfamily();
        }
      });
    }
  };

  addInvestorViaFamilyWithoutEmail = () => {
    //validate name and pan verification status
    if (!this.state.first_name || !this.state.last_name) {
      toast.error("Please enter first name and last name");
      return;
    }

    if (!this.state.panno || this.state.panno.length != 10) {
      toast.error("Please enter valid PAN number");
      return;
    }

    // panVerifyStatus
    if (!this.state.panVerifyStatus) {
      toast.error("Please verify PAN number");
      return;
    }

    let params = {
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      groupID: this.state.ids,
      userID: localStorage.getItem("Parent_investor_id"),
      pan: this.state.panno,
      legalname: this.state.legalname,
    };
    Bridge.users.addInvestorViaFamilyWithoutEmail(params).then((result) => {
      console.log("data", result);
      console.log(result);
      if (result.status == 1) {
        this.setState({
          addModalStatus: false,
          first_name: "",
          middle_name: "",
          last_name: "",
          panVerifyStatus: false,
          panno: "",
          legalname: "",
        });

        // close the modal
        this.setState({ addModalStatus: false });
      } else {
        toast.error(result.message);
      }
    });
  };

  checkforpanno = (text) => {
    let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regex.test(text)) {
      return true;
    }
    return false;
  };
  CHECK_pan_no = (e) => {
    e.preventDefault();
    if (!this.state.panno || this.state.panno.length !== 10) {
      notification.warning({
        message: `Invalid PAN number`,
        description: "Please enter the valid PAN number",
        placement: "top",
        duration: 5,
      });
      return;
    }

    let panstatus = this.checkforpanno(this.state.panno);
    if (panstatus === false) {
      notification.warning({
        message: `Invalid format of PAN No`,
        description: "Please enter valid PAN No.",
        placement: "top",
        duration: 5,
      });
      return;
    }

    this.setState({ loading: true });
    axios({
      method: "post",
      url: `https://growth91.growthmetaverse.in/api/Panverification/verify_pan`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        pan_no: this.state.panno,
      },
    })
      .then((response) => {
        // Parse the `data` field
        let parsedData;
        try {
          parsedData = JSON.parse(response.data.data);
        } catch (error) {
          notification.error({
            message: "Error",
            description: "Failed to parse response data.",
            placement: "top",
            duration: 5,
          });
          this.setState({ loading: false });
          return;
        }

        if (parsedData.valid === true) {
          notification.success({
            message: `Success`,
            description: "PAN is Valid.",
            placement: "top",
            duration: 5,
          });

          ReactGA.event({
            category: "KYC",
            action: "PAN Verified",
          });

          this.setState(
            {
              panVerifyStatus: true,
              legalname: parsedData.registered_name,
              fathername: parsedData.father_name || "",
              screen1: false,
              screen2: true,
              screen3: false,
              screen4: false,
              screen5: false,
              pan_details: parsedData,
              selectedTab: "1",
              adharscreen: "0",
              pan_submit: true,
              imgtype: "",
            },
            () => {
              this.setState({ loading: false });
            }
          );

          $("html, body").animate(
            {
              scrollTop: 280,
            },
            1000
          );
        } else {
          notification.warning({
            message: parsedData.message || "Verification Failed",
            description: "Please enter the valid PAN number.",
            placement: "top",
            duration: 5,
          });
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "Failed to verify PAN. Please try again later.",
          placement: "top",
          duration: 5,
        });
        this.setState({ loading: false });
      });
  };

  render() {
    console.log(this.state.viewmemberdetail);
    return (
      <div>
        <Urldata setid={this.getmember} />
        <div className="col-lg-10 pb-4 " style={{ marginTop: "160px" }}>
          <div>
            <section
              id="hdii"
              className="m-lg-0  m-3"
              // style={{ minHeight: "40vh" }}
            >
              <div>
                <div className="row dashboard-items ">
                  <div className="col-lg-12 family-columns">
                    <div className="filteruser-dropdown form-control d-flex">
                      <select
                        name=""
                        id=""
                        className="optionselect form-select "
                        value={this.state.memberdetailid}
                        onChange={this.setmember}
                      >
                        <option
                          value={localStorage.getItem("Parent_investor_id")}
                        >
                          Self
                        </option>
                        {this.state.memberdetail &&
                          this.state.memberdetail.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <option value={item.investor_id}>
                                  {item.first_name} {item.last_name}
                                </option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                    <div className="add-family-butttos">
                      <button
                        className="add-family-butttons"
                        style={{
                          background: "#29176F",
                          color: "white",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                        onClick={() => this.setState({ addModalStatus: true })}
                      >
                        Add Family Member
                      </button>
                    </div>
                  </div>
                </div>
                {this.state.viewmemberdetail && (
                  <div className="row dashboard-items">
                    <div className="col-lg-12">
                      <div className="heads-names active">
                        <h2>
                          Welcome{" "}
                          {this.state.viewmemberdetail.first_name +
                            " " +
                            this.state.viewmemberdetail.last_name}
                        </h2>{" "}
                        <div className="edit-contacts">
                          <h5>
                            Registered Mobile Number :{" "}
                            {this.state.viewmemberdetail.mobile}
                          </h5>
                          <h5>
                            Registered Email id :{" "}
                            {this.state.viewmemberdetail.email}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="row card-dashboard-rows"></div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        <section
          id="hdii"
          className="m-lg-0  m-3"
          style={{ minHeight: "70vh" }}
        >
          <Skeleton loading={this.state.loading} active>
            <div className="row dashboard-items ">
              <div className="col-lg-4">
                <div className="single">
                  <h2>₹{this.state.startinvestedamount.toFixed()}</h2>
                  <small>Total Investment Value</small>
                </div>
              </div>
              &nbsp;
              <div className="col-lg-4">
                <div className="single">
                  <h2>{this.state.startinvestedcompanies}</h2>
                  <small>Number of Investment</small>
                </div>
              </div>
              <div className="col-lg-3">
                <a href="/investor-portfolio" style={{ color: "#000" }}>
                  <div className="view-all-comments">
                    <p>
                      View All
                      <br /> Investments
                    </p>
                    <i className="bx bx-chevron-right"></i>
                  </div>
                </a>
              </div>
            </div>
          </Skeleton>

          {this.state.nationality == "Indian Resident" ? (
            <Spin spinning={this.state.loading}>
              <div className="row kyc-cards" style={{ marginTop: 25 }}>
                <div className="col-lg-4">
                  {this.state.kycstatus == "admin_rejected" ? (
                    <div className="single">
                      <div className="d-flex flex-row justify-content-between ">
                        <h5>KYC </h5>
                        <div>
                          {(this.state.kycstatus == "admin_approved" ||
                            this.state.kycstatus == "system_approved") &&
                          this.state.nationality == "Indian Resident" ? (
                            <span
                              style={{
                                color: "rgb(91 145 21)",
                                background: "rgb(42 247 4 / 25%)",
                              }}
                            >
                              COMPLETED
                            </span>
                          ) : this.state.kycstatus == "admin_rejected" &&
                            this.state.nationality == "Indian Resident" ? (
                            <span
                              style={{
                                color: "rgb(243 92 0)",
                                background: "rgb(231 107 63 / 10%)",
                              }}
                            >
                              REJECTED
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "rgb(231, 63, 63)",
                                background: "rgba(231, 63, 63, 0.1)",
                              }}
                            >
                              PENDING
                            </span>
                          )}
                        </div>
                      </div>
                      <p>
                        You KYC is rejected, pls reach Growth91
                        <sup>®</sup> Admin for update.
                      </p>
                    </div>
                  ) : (
                    <>
                      {(this.state.kycstatus == "" ||
                        this.state.kycstatus == "Pending") &&
                        this.state.nationality == "Indian Resident" && (
                          <a href="/kyc-instructions">
                            <div className="single">
                              <div className="d-flex flex-row justify-content-between ">
                                <h5>KYC </h5>
                                <div>
                                  {(this.state.kycstatus == "admin_approved" ||
                                    this.state.kycstatus ==
                                      "system_approved") &&
                                  this.state.nationality ==
                                    "Indian Resident" ? (
                                    <span
                                      style={{
                                        color: "rgb(91 145 21)",
                                        background: "rgb(42 247 4 / 25%)",
                                      }}
                                    >
                                      COMPLETED
                                    </span>
                                  ) : this.state.kycstatus ==
                                      "admin_rejected" &&
                                    this.state.nationality ==
                                      "Indian Resident" ? (
                                    <span
                                      style={{
                                        color: "rgb(243 92 0)",
                                        background: "rgb(231 107 63 / 10%)",
                                      }}
                                    >
                                      REJECTED
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        color: "rgb(231, 63, 63)",
                                        background: "rgba(231, 63, 63, 0.1)",
                                      }}
                                    >
                                      PENDING
                                    </span>
                                  )}
                                </div>
                              </div>
                              {(this.state.kycstatus == "admin_approved" ||
                                this.state.kycstatus == "system_approved") &&
                              this.state.nationality == "Indian Resident" ? (
                                <p>
                                  You have completed your KYC. You can invest
                                  from Deal page.
                                </p>
                              ) : this.state.kycstatus == "admin_rejected" &&
                                this.state.nationality == "Indian Resident" ? (
                                <p>
                                  Your KYC is incomplete. Please contact
                                  contact@Growth91
                                  <sup>®</sup>
                                  .com <br />
                                  from more details.
                                </p>
                              ) : (
                                <p>Complete your KYC.</p>
                              )}
                            </div>
                          </a>
                        )}
                    </>
                  )}
                </div>
              </div>
            </Spin>
          ) : (
            <Spin spinning={this.state.loading}>
              {this.state.kycstatus == "Pending" && (
                <div className="row kyc-cards" style={{ marginTop: 100 }}>
                  <div className="col-lg-4">
                    <>
                      <a
                        href={
                          this.state.kycstatus == "Pending"
                            ? "/non-resident-form"
                            : "#"
                        }
                      >
                        <div className="single">
                          <div className="d-flex flex-row justify-content-between ">
                            <h5>KYC</h5>
                            <div>
                              {this.state.kycstatus == "admin_approved" ? (
                                <span
                                  style={{
                                    color: "rgb(91 145 21)",
                                    background: "rgb(42 247 4 / 25%)",
                                  }}
                                >
                                  COMPLETED
                                </span>
                              ) : this.state.kycstatus == "admin_rejected" ? (
                                <span
                                  style={{
                                    color: "rgb(243 92 0)",
                                    background: "rgb(231 107 63 / 10%)",
                                  }}
                                >
                                  REJECTED
                                </span>
                              ) : (
                                this.state.kycstatus == "Pending" && (
                                  <span
                                    style={{
                                      color: "rgb(231, 63, 63)",
                                      background: "rgba(231, 63, 63, 0.1)",
                                    }}
                                  >
                                    PENDING
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          {this.state.kycstatus == "admin_approved" ? (
                            <p>
                              You have completed your KYC. You can invest from
                              Deal page.
                            </p>
                          ) : this.state.kycstatus == "admin_rejected" ? (
                            <p>
                              Your KYC is incomplete. Please contact
                              contact@Growth91
                              <sup style={{ fontSize: "0.6rem" }}>
                                TM
                              </sup>.com <br />
                              from more details.
                            </p>
                          ) : (
                            this.state.kycstatus == "Pending" && (
                              <p>Complete your KYC.</p>
                            )
                          )}
                        </div>
                      </a>
                    </>
                  </div>
                </div>
              )}
            </Spin>
          )}
          <br />

          <div className="row kyc-cards">
            <div className="col-lg-2"></div>
          </div>
        </section>
        <Modal
          title="Add New Members"
          visible={this.state.addModalStatus}
          onOk={this.addInvestorViaFamily}
          okText="Submit"
          // onCancel={this.cancel_addfounder}
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
          // onClick={this.register}
        >
          <Spin spinning={this.state.formloader}>
            <div
              className="row"
              style={{
                display: this.state.registerWithoutEmail ? "none" : "flex",
              }}
            >
              <div className="col-md-8">
                <div className="form-group">
                  <label className="mb-2">
                    Email{" "}
                    <span
                      className="text-danger"
                      style={{
                        display: this.state.isEmailRequired ? "inline" : "none",
                      }}
                    >
                      *
                    </span>
                  </label>
                  <Input
                    required={this.state.isEmailRequired}
                    value={this.state.SendreqEmail}
                    onChange={(e) =>
                      this.setState({ SendreqEmail: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4 mt-2 h-100">
                <button
                  type="button"
                  className="add-family-butttons mt-4 w-100 mt-2"
                  style={{
                    background: "#29176F",
                    color: "white",

                    borderRadius: "5px",
                  }}
                  // onClick={this.CHECK_pan_no}

                  onClick={this.getUserWithEmail}
                >
                  Get User
                </button>
              </div>
            </div>

            <div className="row">
              {/* no user found checkbox */}
              <div className="col-md-12">
                <div className="form-group my-2">
                  <Checkbox
                    onChange={this.handleRegisterWithoutEmailCheckbox}
                  ></Checkbox>
                  <label className="mb-2"> &nbsp;Register Without Email </label>
                </div>
              </div>
            </div>

            <div
              className="row"
              style={{ display: this.state.nameDetailsShow ? "flex" : "none" }}
            >
              <div className="col-md-12">
                {/* first name */}
                <div className="form-group my-2">
                  <label className="mb-2">
                    First Name<span className="text-danger">*</span>
                  </label>
                  <Input
                    value={this.state.first_name}
                    disabled={this.state.autoFill}
                    onChange={(e) =>
                      this.setState({ first_name: e.target.value })
                    }
                  />
                </div>

                {/* middle name */}
                <div className="form-group my-2">
                  <label className="mb-2">Middle Name</label>
                  <Input
                    value={this.state.middle_name}
                    disabled={this.state.autoFill}
                    onChange={(e) =>
                      this.setState({ middle_name: e.target.value })
                    }
                  />
                </div>

                {/* last name */}
                <div className="form-group my-2">
                  <label className="mb-2">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <Input
                    value={this.state.last_name}
                    disabled={this.state.autoFill}
                    onChange={(e) =>
                      this.setState({ last_name: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* row */}
            <div
              className="row align-items-center"
              style={{ display: this.state.panDetailsShow ? "flex" : "none" }}
            >
              <div className="col-md-8">
                <div className="form-group my-2">
                  <label className="mb-2">
                    PAN Number<span className="text-danger">*</span>
                  </label>
                  <Input
                    value={this.state.panno}
                    onChange={(e) => {
                      this.setState({
                        panno: e.target.value,
                      });
                    }}
                    disabled={this.state.pan_submit == true ? true : false}
                  />
                </div>
              </div>

              <div className="col-md-4 mt-2 h-100">
                <button
                  type="button"
                  className="add-family-butttons mt-4 w-100 mt-2"
                  style={{
                    background: "#29176F",
                    color: "white",

                    borderRadius: "5px",
                  }}
                  // onClick={this.CHECK_pan_no}

                  onClick={this.CHECK_pan_no}
                >
                  Check PAN
                </button>
              </div>

              <div className="col-md-12">
                <div className="form-group my-2">
                  <label className="mb-2">Name as per PAN Card</label>
                  <Input value={this.state.legalname} disabled />
                </div>
              </div>
            </div>

            {/* <div className="form-group">
              <label className="mb-2">Mobile</label>
              <Input
                value={this.state.Sendreqmobile}
                onChange={(e) =>
                  this.setState({ Sendreqmobile: e.target.value })
                }
              />
            </div> */}
          </Spin>
        </Modal>

        <ToastContainer />
      </div>
    );
  }
}
export default withRouter(Viewfamily);