import React, { Component } from "react";
import Footer from "../common/Footer";
import WebHeader from "../common/WebHeader";
import { message, Spin } from "antd";
import Bridge from "../constants/Bridge";
import $ from "jquery";
import moment from "moment";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "../constants/data";
import NewWebHeader from "../common/NewWebHeader";
import { NewWebFooter } from "../common/NewWebFooter";
ReactGA.initialize(TRACKING_ID);
class InvestorFounderRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen1: true,
      loading: false,
      first_name: "",
      middle_name: "",
      last_name: "",
      firstname:"",
middlename:"",
lastname:"",
      email: "",
      mobile: "",
      companyName: "",
      num1: "",
      num2: "",
      num3: "",
      num4: "",
      num5: "",
      num6: "",
      otp: "",
      otpoutput: "",
      timer: "00:00",
      istimerstarted: false,
      minutes: 2,
      seconds: 0,
      otp_restriction_date: "",
      minutes2: 10,
      seconds2: 0,
      show_data: "none",
      phone: "",
      mobileotp: "122411",
      emailotp: "111232",
      otpsent: false,
      email_otpsent: false,
      mobile_no_otp: "",
      email_otp: "",
      verfied: false,
      email_verified: false,
      mobileminuts: 2,
      mobileseconds: 0,
      istimerstarted2: false,
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
    }
    let otp = this.generateOTP();
    this.setState({
      otp: otp.length == 6 ? Number(otp).toFixed() : "144255",
      otp_restriction_date: moment(),
    });
    if (localStorage.getItem("founder_id")) {
      // if(localStorage.getItem('investor_id')){
      //   window.location.assign('/investor-dashboard');
      //   this.setState({show_data:'none'});
      //   return;
      // }
      if (localStorage.getItem("founder_id")) {
        window.location.assign("/founder-dashboard");
        this.setState({ show_data: "none" });
        return;
      }
    } else {
      this.setState({ show_data: "block" });
    }
  }
  generateOTP = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  // OTP mail sent

  sendotptomail = () => {
    ReactGA.event({
      category: "Founder SignUp",
      action: "Send email OTP",
    });
    if (!this.state.email) {
      message.warning("Please enter your email.");
      return;
    }

    let otp = this.generateOTP();
    otp = otp.length == "6" ? Number(otp).toFixed() : "144255";
    this.setState({ emailotp: otp });

    let params = {
      email: this.state.email,
      mobile: this.state.phone,
      otp: this.state.otp,
    };

    Bridge.sendregisterotp(params).then((result) => {
      if (result.status == 1) {
        message.success("OTP sent successfully.");
        this.setState(
          {
            email_otpsent: true,
            // istimerstarted:true,
            loading: false,
          },
          () => this.startcountdown()
        );
        this.start10mincountdown();
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
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
          console.log("result", result);
          this.setState({
            accountno: result.data[0].bank_ac_no,
            ifsccode: result.data[0].ifsc_code,
            firstname: result.data[0].first_name,
            middlename: result.data[0].middle_name,
            lastname: result.data[0].last_name,
            contactno: result.data[0].mobile,
            email: localStorage.getItem("investor_email"),

            // profileimagetoshow: result.data[0].user_profile_picture ? url : "",
            membership_type: result.data[0].membership_type,
            investor_kyc_status: result.data[0].kycstatus,
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
            if (current_date > sub_1_end_date && current_date < test_end_date) {
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
            if (current_date >= s_d && current_date <= ending_date) {
              // console.log('expired');
              this.setState({ membership_expired_status: true });
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
          //   window.location.assign("/Login");
        }
      } else {
        this.setState({ formloader: false });
      }
    });
  };
  verify_mail_otp = () => {
    ReactGA.event({
      category: "Founder SignUp",
      action: "Verify Email OTP",
    });
    console.log(this.state.emailotp);
    console.log(this.state.email_otp);
    // if(this.state.email_otp==this.state.emailotp){

    //   message.success('Email is verified successfully.');
    //   this.setState({verfied:true});
    // }else{
    //   message.warning('OTP is not correct/matching.');
    //   return;
    // }

    let { num1 } = this.state;
    let SUMOFOTP = num1;
    if (this.state.otp == SUMOFOTP) {
      message.success("Email is verified successfully.");
      this.setState({ email_verified: true });
      // this.setState({screen2:true,screen1:false,otpscreen:false});
    } else {
      message.warning("OTP is not correct/matching. Please enter again.");
      return;
    }
  };

  resendotp = () => {
    ReactGA.event({
      category: "Founder SignUp",
      action: "Resend Email OTP",
    });
    if (!this.state.email) {
      message.warning("Invalid email");
      return;
    }

    let params = {
      email: this.state.email,
      mobile: this.state.phone,
      otp: this.state.otp,
    };
    Bridge.sendregisterotp(params).then((result) => {
      if (result.status == 1) {
        message.success("OTP sent successfully.");
        this.setState(
          {
            istimerstarted: true,
            minutes: 2,
            seconds: 0,
          },
          () => this.startcountdown()
        );
      } else {
        message.warning(result.message);
      }
    });
  };

  verifyOtp = () => {
    if (!this.state.num1) {
      message.warning("OTP is not correct");
      return;
    }
    let { num1 } = this.state;
    let SUMOFOTP = num1;
    if (this.state.otp == SUMOFOTP) {
      message.success("OTP is verified successfully.");
      this.register();
    } else {
      message.warning("OTP is not correct");
      return;
    }
  };
  startcountdown = () => {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          this.setState({ istimerstarted: false });
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
            istimerstarted: true,
          }));
        }
      }
    }, 1200);
  };
  start10mincountdown = () => {
    this.myInterval = setInterval(() => {
      const { seconds2, minutes2 } = this.state;
      if (seconds2 > 0) {
        this.setState(({ seconds2 }) => ({
          seconds2: seconds2 - 1,
        }));
      }
      if (seconds2 === 0) {
        if (minutes2 === 0) {
          let otp = this.generateOTP();
          this.setState({
            otp: otp.length != 6 ? "144255" : Number(otp).toFixed(),
            minutes2: 10,
            seconds2: 0,
          });
        } else {
          this.setState(({ minutes2 }) => ({
            minutes2: minutes2 - 1,
            seconds2: 59,
          }));
        }
      }
    }, 1200);
  };

  //registration function
  register = () => {
    ReactGA.event({
      category: "Founder SignUp",
      action: "SignUp button clicked.",
    });
    if (!this.state.companyName) {
      message.error("Please Enter your Company Name");
      return false;
    }
    let string = this.state.first_name + " " + this.state.last_name;
    let newArray = string.split(" ");
    let name = "";
    if (newArray.length == "3") {
      let firstChar = newArray[0].charAt(0).toUpperCase();
      let firs2tChar = newArray[2].charAt(0).toUpperCase();
      name = firstChar + "" + firs2tChar;
    } else if (newArray.length == "2") {
      let firstChar = newArray[0].charAt(0).toUpperCase();
      let firs2tChar = newArray[1].charAt(0).toUpperCase();
      name = firstChar + "" + firs2tChar;
    }
    let params = {
      first_name: this.state.firstname,
      middle_name: this.state.middlename,
      last_name: this.state.lastname,
      email: this.state.email,
      referral_code: name + "RR",
      startup_name: this.state.companyName,
      mobile: this.state.contactno,
    };
    this.setState({ loading: true });
    Bridge.founders.addnewfounder(params).then((result) => {
      if (result.status == "1") {
        console.log("result", result.data);
        localStorage.setItem("founder_id", result.data[0].investor_id);
        localStorage.setItem(
          "founder_name",
          result.data[0].first_name + " " + result.data[0].last_name
        );
        localStorage.setItem("founder_is_investor", result.data[0].is_investor);
        localStorage.setItem("founder_email", result.data[0].email);
        localStorage.setItem("founder_kycstatus", result.data[0].kycstatus);
        window.location.assign("/founder-dashboard");
        message.success("Registration is completed successfully.");
        this.setState({ loading: false });

        ReactGA.event({
          category: "Founder Registration",
          action: "Founder Registration",
        });

        // window.location.assign('/login');
      } else {
        message.error(result.message);
        this.setState({ loading: false });
        // window.location.assign("/founder-registration");
      }
    });
  };
  //end function

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //send confirmation email

  //otp function
  onChangeNum1 = (e) => {
    this.setState({
      num1: e.target.value,
    });
    $("#num2").focus();
  };

  onChangeNum2 = (e) => {
    this.setState({
      num2: e.target.value,
    });
    $("#num3").focus();
  };

  onChangeNum3 = (e) => {
    this.setState({
      num3: e.target.value,
    });
    $("#num4").focus();
  };

  onChangeNum4 = (e) => {
    this.setState({
      num4: e.target.value,
    });
    $("#num5").focus();
  };

  onChangeNum5 = (e) => {
    this.setState({
      num5: e.target.value,
    });
    $("#num6").focus();
  };
  handleChangePhoneNo = (e) => {
    this.setState({ phone: e.target.value });
  };
  sendotptomobile = () => {
    ReactGA.event({
      category: "Founder SignUp",
      action: "Send mobile OTP",
    });
    let otp = this.generateOTP();
    otp = otp.length == 6 ? Number(otp).toFixed() : "144255";
    this.setState({ mobileotp: otp });
    if (this.state.phone.length != 10) {
      message.warning("Mobile number is required.");
      return;
    }
    let params = `?mobile=${this.state.phone}&otp=${otp}`;
    Bridge.investor
      .sendotptomobile(params)
      .then((result) => {
        if (result.status == "1") {
          this.setState({ otpsent: true }, () => this.startcountdown2());
          message.success(result.message);
        } else {
          message.warning(result.message);
        }
      })
      .catch((err) => {});
  };
  verify_mobile_otp = () => {
    ReactGA.event({
      category: "Founder SignUp",
      action: "Verify Mobile OTP",
    });
    if (this.state.mobile_no_otp == this.state.mobileotp) {
      message.success("Mobile number is verified successfully.");
      this.setState({ verfied: true });
    } else {
      message.warning("OTP is not correct/matching. Please enter again");
      return;
    }
  };
  resent_mobile_otp = () => {
    ReactGA.event({
      category: "Founder SignUp",
      action: "Resend Mobile OTP",
    });
    let otp = this.generateOTP();
    otp = otp.length == 6 ? Number(otp).toFixed() : "144255";
    this.setState({ mobileotp: otp });
    if (this.state.phone.length != 10) {
      message.warning("Mobile number is required.");
      return;
    }
    let params = `?mobile=${this.state.phone}&otp=${otp}`;
    Bridge.investor
      .sendotptomobile(params)
      .then((result) => {
        if (result.status == "1") {
          this.setState(
            { otpsent: true, mobileseconds: 0, mobileminuts: 2 },
            () => this.startcountdown2()
          );
          message.success(result.message);
        } else {
          message.warning(result.message);
        }
      })
      .catch((err) => {});
  };
  startcountdown2 = () => {
    this.myInterval = setInterval(() => {
      const { mobileseconds, mobileminuts } = this.state;
      if (mobileseconds > 0) {
        this.setState(({ mobileseconds }) => ({
          mobileseconds: mobileseconds - 1,
        }));
      }
      if (mobileseconds === 0) {
        if (mobileminuts === 0) {
          this.setState({ istimerstarted2: false });
        } else {
          this.setState(({ mobileminuts }) => ({
            mobileminuts: mobileminuts - 1,
            mobileseconds: 59,
            istimerstarted2: true,
          }));
        }
      }
    }, 1200);
  };
  //end

  render() {
    return (
      <div style={{ display: this.state.show_data }}>
        <NewWebHeader newabout={"newabout"} />
        <section className="signup-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <Spin spinning={this.state.loading}>
                  <div className="login-form">
                    <h3 className="text-center">Get Started As Founder</h3>
                    <hr />
                    <br />
                    {this.state.screen1 == true ? (
                      <>
                        <div className="row">
                          <div className="col-lg-6">
                            <label>
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="first_name"
                              className="form-input-field"
                              value={this.state.firstname}
                            //   onChange={(e) =>
                            //     this.setState({ first_name: e.target.value })
                            //   }
                            />
                          </div>
                          <div className="col-lg-6">
                            <label>Middle Name(Optional)</label>
                            <input
                              type="text"
                              name="middle_name"
                              className="form-input-field"
                              value={this.state.middlename}
                            //   onChange={(e) =>
                            //     this.setState({ middle_name: e.target.value })
                            //   }
                            />
                          </div>
                          <div className="col-lg-12">
                            <label>
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="last_name"
                              className="form-input-field"
                              value={this.state.lastname}
                            //   onChange={(e) =>
                            //     this.setState({ last_name: e.target.value })
                            //   }
                            />
                          </div>
                          <div className="col-lg-12">
                            {/* <label>Email  <span className='text-danger'>*</span></label>
                            <input 
                              type="email" 
                              name="email" 
                              className="form-input-field" 
                              
                              value={this.state.email} 
                              onChange={(e)=>this.setState({email:e.target.value})}
                            /> */}
                          </div>
                          {/* <div className="col-lg-12">
                            {this.state.otpsent == true ? (
                              <div style={{ position: "relative" }}>
                                {this.state.verfied == true ? (
                                  <>
                                    <label>
                                      Mobile Number{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="tel"
                                      name="phone"
                                      minLength={10}
                                      maxLength={10}
                                      pattern="[0-9]{10}"
                                      className="form-input-field"
                                      value={this.state.phone.trim()}
                                      disabled={true}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <label>
                                      Mobile Number{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="tel"
                                      name="phone"
                                      minLength={10}
                                      maxLength={10}
                                      pattern="[0-9]{10}"
                                      className="form-input-field"
                                      value={this.state.phone.trim()}
                                      onChange={(e) => {
                                        this.setState({
                                          phone: e.target.value,
                                        });
                                      }}
                                      readOnly={this.state.istimerstarted2}
                                    />
                                    <label>
                                      OTP<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <input
                                        type="number"
                                        onWheel={() =>
                                          document.activeElement.blur()
                                        }
                                        name="mobile_no_otp"
                                        className="form-input-field"
                                        value={this.state.mobile_no_otp}
                                        onChange={(e) =>
                                          this.setState({
                                            mobile_no_otp: e.target.value,
                                          })
                                        }
                                      />
                                      {this.state.verfied == false && (
                                        <button
                                          style={{
                                            right: 76,
                                            background:
                                              this.state.verfied == true
                                                ? "green"
                                                : "#29176f",
                                            borderRadius: 5,
                                          }}
                                          className="send_otp_button_op"
                                          onClick={this.verify_mobile_otp}
                                        >
                                          Verify
                                        </button>
                                      )}
                                      {this.state.verfied == false && (
                                        <button
                                          style={{
                                            background:
                                              this.state.istimerstarted2 == true
                                                ? "#a29f9f"
                                                : "#29176f",
                                            border:
                                              this.state.istimerstarted2 == true
                                                ? "1px solid #a29f9f"
                                                : "#29176f",
                                            borderRadius: 5,
                                          }}
                                          className="send_otp_button_op"
                                          disabled={
                                            this.state.istimerstarted2 == true
                                              ? true
                                              : false
                                          }
                                          onClick={this.resent_mobile_otp}
                                        >
                                          Resend
                                        </button>
                                      )}
                                      <div style={{ position: "relative" }}>
                                        {this.state.istimerstarted2 == true &&
                                          this.state.verfied == false && (
                                            <div
                                              style={{
                                                position: "absolute",
                                                right: 0,
                                                top: 44,
                                              }}
                                            >
                                              {this.state.mobileminuts}:
                                              {this.state.mobileseconds < 10
                                                ? `0${this.state.mobileseconds}`
                                                : this.state.mobileseconds}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  </>
                                )}

                                {this.state.verfied == true && (
                                  <span
                                    className="text-success"
                                    style={{ position: "relative", top: -19 }}
                                  >
                                    Mobile Number Verified successfully.
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div style={{ position: "relative" }}>
                                <label>
                                  Mobile No{" "}
                                  <span className="text-danger">*</span>
                                </label>

                                <label>
                                  <span className="country_code">+91</span>
                                </label>
                                <input
                                  style={{ paddingLeft: 50 }}
                                  type="tel"
                                  name="phone"
                                  minLength={10}
                                  maxLength={10}
                                  pattern="[0-9]{10}"
                                  className="form-input-field"
                                  value={this.state.phone.trim()}
                                  onChange={this.handleChangePhoneNo}
                                />
                                <button
                                  className="send_otp_button"
                                  onClick={this.sendotptomobile}
                                >
                                  Send OTP
                                </button>
                              </div>
                            )}
                          </div> */}

                          {/* Email Send OTP */}
                          {/* {this.state.email_otpsent == true ? (
                            <div style={{ position: "relative" }}>
                              {this.state.email_verified == true ? (
                                <>
                                  <label>
                                    Email <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    name="num1"
                                    className="form-input-field"
                                    onChange={(e) => this.onChangeNum1(e)}
                                    value={this.state.email.trim()}
                                    disabled={true}
                                  />
                                </>
                              ) : (
                                <>
                                  <label>
                                    Email <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    name="num1"
                                    className="form-input-field"
                                    // onChange={(e) => this.onChangeNum1(e)}
                                    value={this.state.email.trim()}
                                    onChange={(e) => {
                                      this.setState({ num1: e.target.value });
                                    }}
                                    readOnly={this.state.istimerstarted}
                                  />
                                  <label>
                                    OTP<span className="text-danger">*</span>
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      name="num1"
                                      className="form-input-field"
                                      placeholder="Please enter OTP"
                                      value={this.state.num1}
                                      onChange={(e) =>
                                        this.setState({ num1: e.target.value })
                                      }
                                    />
                                    {this.state.email_verified == false && (
                                      <button
                                        style={{
                                          right: 76,
                                          background:
                                            this.state.email_verified == true
                                              ? "green"
                                              : "#29176f",
                                          borderRadius: 5,
                                        }}
                                        className="send_otp_button_op"
                                        onClick={this.verify_mail_otp}
                                      >
                                        Verify
                                      </button>
                                    )}
                                    {this.state.email_verified == false && (
                                      <button
                                        style={{
                                          background:
                                            this.state.istimerstarted == true
                                              ? "#a29f9f"
                                              : "#29176f",
                                          border:
                                            this.state.istimerstarted == true
                                              ? "1px solid #a29f9f"
                                              : "#29176f",
                                          borderRadius: 5,
                                        }}
                                        className="send_otp_button_op"
                                        disabled={
                                          this.state.istimerstarted == true
                                            ? true
                                            : false
                                        }
                                        onClick={this.resendotp}
                                      >
                                        Resend
                                      </button>
                                    )}
                                    <div style={{ position: "relative" }}>
                                      {this.state.istimerstarted == true &&
                                        this.state.email_verified == false && (
                                          <div
                                            style={{
                                              position: "absolute",
                                              right: 0,
                                              top: 44,
                                            }}
                                          >
                                            {this.state.minutes}:
                                            {this.state.seconds < 10
                                              ? `0${this.state.seconds}`
                                              : this.state.seconds}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </>
                              )}

                              {this.state.email_verified == true && (
                                <span
                                  className="text-success"
                                  style={{ position: "relative", top: -19 }}
                                >
                                  Email is Verified successfully.
                                </span>
                              )}
                            </div>
                          ) : (
                           ` <div className="col-lg-12">
                              <div style={{ position: "relative" }}>
                                <label>
                                  Email <span className="text-danger">*</span>
                                </label>
                                <input
                                  t`ype="email"
                                  name="email"
                                  className="form-input-field"
                                  value={this.state.email.trim()}
                                  onChange={this.handleChange}
                                />
                                <button
                                  className="send_otp_button"
                                  onClick={this.sendotptomail}
                                >
                                  Send OTP
                                </button>
                              </div>
                            </div>
                          )} */}
                          <div className="col-lg-12">
                            <div style={{ position: "relative" }}>
                              <label>
                                Mobile No <span className="text-danger">*</span>
                              </label>

                              <label>
                                <span className="country_code">+91</span>
                              </label>
                              <input
                                style={{ paddingLeft: 50 }}
                                type="tel"
                                name="phone"
                                minLength={10}
                                maxLength={10}
                                pattern="[0-9]{10}"
                                className="form-input-field"
                                value={this.state.contactno}
                                onChange={this.handleChangePhoneNo}
                                disabled={true}
                              />
                              {/* <button
                                  className="send_otp_button"
                                  onClick={this.sendotptomobile}
                                >
                                  Send OTP
                                </button> */}
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div style={{ position: "relative" }}>
                              <label>
                                Email <span className="text-danger">*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                className="form-input-field"
                                value={this.state.email.trim()}
                                onChange={this.handleChange}
                                disabled={true}
                                
                              />
                              {/* <button
                                  className="send_otp_button"
                                  onClick={this.sendotptomail}
                                >
                                  Send OTP
                                </button> */}
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <label>
                              Company Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              className="form-input-field"
                              value={this.state.companyName}
                              onChange={(e) =>
                                this.setState({ companyName: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <button
                          onClick={this.register}
                          type="button"
                          className="login-button"
                        >
                          Sign up
                        </button>
                      </>
                    ) : (
                      ""
                      //   <div className="login-form">
                      //       <p style={{
                      //           fontSize: 14,
                      //           color: '#000',
                      //       }}>
                      //           OTP sent to your Email. Please Verify:
                      //       </p>
                      //       <div
                      //     style={{
                      //       position:'absolute',
                      //       right:33,
                      //       marginTop:-25,
                      //       display:'flex',
                      //     }}
                      //     >
                      //   {this.state.istimerstarted==true ? (
                      //     <span className="resend-otp-link" style={{cursor:'not-allowed'}}>
                      //       <span style={{color:'#a3a0a0'}}>Resend OTP</span>
                      //     </span>
                      //   ):(
                      //     <span className="resend-otp-link" onClick={this.resendotp}>
                      //       <span>Resend OTP</span>
                      //     </span>
                      //   )}
                      //   {this.state.istimerstarted==true&& (
                      //     <span style={{marginLeft:10}}>
                      //       ({this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds})
                      //     </span>
                      //   )}
                      // </div>
                      // <div className='otp-input'>
                      //   <input
                      //     type="text"
                      //     name="num1"
                      //     className="form-input-field"
                      //     onChange={(e) => this.onChangeNum1(e)}
                      //     value={this.state.num1}
                      //   />
                      // </div>
                      // <button
                      //   type="button"
                      //   className="login-button"
                      //   onClick={this.verifyOtp}
                      // >Submit</button>
                      // </div>
                    )}
                    <hr
                      style={{
                        border: "1px solid rgb(170 167 167)",
                        background: "#ddd",
                        margin: "33px 0",
                      }}
                    />
                    <div className="d-flex">
                      <span>Already have an account?</span> &nbsp;&nbsp;
                      <a href="/Login">Log in </a>
                    </div>
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </section>
        <NewWebFooter />
      </div>
    );
  }
}
export default InvestorFounderRegistration;
