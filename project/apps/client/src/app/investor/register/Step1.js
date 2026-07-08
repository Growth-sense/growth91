import React, { Component } from "react";
import { message, Spin, Select, Radio, Input } from "antd";
import Bridge from "../../constants/Bridge";
import moment from "moment";
import $ from "jquery";
import Fetchurldata from "./Fetchurldata";
import CountrySelect from "./CountrySelect";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "../../constants/data";

ReactGA.initialize(TRACKING_ID);

const { option } = Select;
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      loading: false,
      screen1: true,
      screen2: false,
      screen3: false,
      nationality: "",
      otpscreen: false,
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
      minutes2: 2,
      seconds2: 0,
      refferal_code: "",
      is_refferal_code_matched: "",
      show_error: false,
      show_data: "none",
      phone: "",
      phone1: "",
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
      typeofmember: "Indian Resident",
      country_code: "",
      countemailseconds: 119000,
    };
  }
  componentDidMount() {
    let otp = this.generateOTP();
    this.setState({
      otp: otp.length == 6 ? Number(otp).toFixed() : "144255",
      otp_restriction_date: moment(),
    });
    if (
      localStorage.getItem("investor_id") ||
      localStorage.getItem("founder_id")
    ) {
      if (localStorage.getItem("investor_id")) {
        window.location.assign("/deals");
        this.setState({ show_data: "none" });
        return;
      }
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
  // register
  register = () => {
    this.state.typeofmember == "Indian Resident"
      ? ReactGA.event({
          category: "Investor SignUp",
          action: "SignUp button clicked.",
        })
      : ReactGA.event({
          category: "Investor SignUp",
          action: "Non Resident. SignUp button clicked.",
        });

    if (!this.state.first_name) {
      message.error("Please enter your first name");
      return;
    } else if (!this.state.last_name) {
      message.error("Please enter your last name.");
      return;
    } else if (!this.state.email) {
      message.error("Please enter your email.");
      return;
    }
    // else if(this.state.phone.length!='10') {
    //   message.error('Invalid mobile.');
    //   return;
    // }
    if (this.state.typeofmember == "Indian Resident") {
      if (this.state.verfied == false) {
        message.error("Please verify mobile number");
        return;
      } else if (this.state.phone.length != "10") {
        message.error("Invalid mobil number.");
        return;
      }

      if (!this.state.email_verified) {
        message.error("Email Not verified");
        return;
      }
    }
    
    if (this.state.typeofmember == "Non Resident") {
      if(this.state.country_code == null || this.state.country_code == ""){
        message.error("Please select country code");
        return;
      }
      if (this.state.phone.length <= "7" || this.state.phone.length >= "15") {
        message.error("Invalid mobile number.");
        console.log(this.state.phone);
        return;
      }
      if (!this.state.email_verified) {
        message.error("Email Not verified");
        return;
      }
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
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      email: this.state.email,
      nationality: this.state.typeofmember,
      refferal_code: this.state.refferal_code,
      reffered_code2: name + "RR",
      is_refferal_code_matched: this.state.is_refferal_code_matched,
      phone: this.state.phone,
      phone1: this.state.phone1,
      country_code: this.state.typeofmember == "Indian Resident" ? "" : this.state.country_code,
    };

    // this.setState({loading:true});
    Bridge.investor.register(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({ loading: false });

        try {
          const guestID = localStorage.getItem("unicorn_guest_id");
          if (guestID) {
            Bridge.Unicorn.GuestAnalytics.addEvent({
              guestID,
              unicornDealID: null,
              eventType: "signup_completed",
            });

            // optional: clear guest state
            localStorage.removeItem("unicorn_guest_id");
            localStorage.removeItem("unicorn_guest_until");
            localStorage.removeItem("unicorn_guest_gated_attempts");
          }
        } catch (e) {
          console.error("guest analytics error", e);
        }
        
        if (result.data) {
          console.log("result", result);
          // return
          // localStorage.removeItem('reg_id');
          localStorage.setItem("reg_id", result.data);
          window.location.assign("/investor-agreement");

          ReactGA.event({
            category: "Investor Registration",
            action: "Investor Registered Successfully",
            label: "Investor Registered Successfully",
          });
        }
      } else if (result.error === "RATE_LIMIT_EXCEEDED" || result.status === 429) {
        this.setState({ loading: false });
      } else {
        message.error(result.message);
        this.setState({ loading: false });
      }
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //google login function
  // signInWithGoogle=()=>{
  //   const provider=new GoogleAuthProvider();
  //   signInWithPopup(authentication,provider)
  //   .then((re)=>{console.log(re)})
  //   .catch((err)=>{console.log(err)});
  // }
  //end function
  handleChangeSelect = (e) => {
    this.setState({
      nationality: e.target.value,
    });
  };

  sendotptomail = () => {
    this.state.typeofmember == "Indian Resident"
      ? ReactGA.event({
          category: "Investor SignUp",
          action: "Send email OTP",
        })
      : ReactGA.event({
          category: "Investor SignUp",
          action: "Non Resident. Send email OTP clicked",
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
            istimerstarted: true,
            loading: false,
          },
          () => this.startcountdown()
        );
        this.start10mincountdown();
      } else if (result.error === "RATE_LIMIT_EXCEEDED" || result.status === 429) {
        this.setState({ loading: false });
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };

  verify_mail_otp = () => {
    this.state.typeofmember == "Indian Resident"
      ? ReactGA.event({
          category: "Investor SignUp",
          action: "Verify email OTP",
        })
      : ReactGA.event({
          category: "Investor SignUp",
          action: "Non Resident. Verify email OTP clicked",
        });
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
    } else {
      message.warning("OTP is not correct/matching. Please enter again.");
      return;
    }
  };

  showsecondscreen = () => {
    if (!this.state.first_name) {
      message.warning("Please enter your first name");
      return;
    } else if (!this.state.last_name) {
      message.warning("Please enter your last name.");
      return;
    } else if (!this.state.email) {
      message.warning("Please enter your email.");
      return;
    } else if (this.state.phone.length != "10") {
      message.warning("Please enter your phone.");
      return;
    }
    if (this.state.typeofmember == "Indian Resident") {
      if (this.state.verfied == false) {
        message.warning("Please verify your mobile no");
        return;
      }
    }

    let params = {
      email: this.state.email,
      mobile: this.state.phone,
      otp: this.state.otp,
    };
    this.setState({ loading: true });
    Bridge.sendregisterotp(params).then((result) => {
      if (result.status == 1) {
        message.success("OTP sent successfully.");
        this.setState(
          {
            screen2: false,
            screen1: false,
            otpscreen: true,
            otpoutput: result.data,
            istimerstarted: true,
            loading: false,
          },
          () => this.startcountdown()
        );
        this.start10mincountdown();
      } else if (result.error === "RATE_LIMIT_EXCEEDED" || result.status === 429) {
        this.setState({ loading: false });
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };
  resendotp = () => {
    ReactGA.event({
      category: "Investor SignUp",
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
      } else if (result.error === "RATE_LIMIT_EXCEEDED" || result.status === 429) {
        return;
      } else {
        message.warning(result.message);
      }
    });
  };
  startcountdown = () => {
    this.setState({ countemailseconds: 119000, email_verified: false });
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
  showthirdcreen = () => {
    if (!this.state.nationality) {
      message.warning("Invalid nationality.");
      return;
    }
    this.setState({
      screen1: false,
      screen2: false,
      screen3: true,
    });
  };
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

  check_refferal_code = () => {
    let params = {
      refferal_code: this.state.refferal_code,
    };
    Bridge.investor.check_referral_code_ins(params).then((result) => {
      if (result.status == "1") {
        this.setState({
          is_refferal_code_matched: true,
          show_error: true,
        });
      } else {
        this.setState({
          is_refferal_code_matched: false,
          show_error: true,
        });
      }
    });
  };
  setCode = (value) => {
    console.log("value", value);
    this.setState({ refferal_code: value }, () => this.check_refferal_code());
  };
  handleChangePhoneNo = (e) => {
    this.setState({ phone: e.target.value });
  };
  sendotptomobile = () => {
    ReactGA.event({
      category: "Investor SignUp",
      action: "Send mobile OTP",
    });

    let otp = this.generateOTP();
    otp = otp.length == "6" ? Number(otp).toFixed() : "144255";
    this.setState({ mobileotp: otp });
    if (this.state.phone.length != 10) {
      message.warning("Mobile no is required.");
      return;
    }
    let params = {
      mobile: this.state.phone,
      otp: otp
    };
    
    Bridge.investor
      .sendotptomobile(params)
      .then((result) => {
        if (result.status == "1") {
          this.setState({ otpsent: true }, () => this.startcountdown2());
          message.success(
            "OTP sent to your mobile successfully. please verify"
          );
        } else if (result.error === "RATE_LIMIT_EXCEEDED" || result.status === 429) {
          return;
        } else {
          message.warning(result.message);
        }
      })
      .catch((err) => {});
  };

  verify_mobile_otp = () => {
    ReactGA.event({
      category: "Investor SignUp",
      action: "Verify Mobile OTP",
    });
    if (this.state.mobile_no_otp == this.state.mobileotp) {
      message.success("Mobile Number is verified successfully.");
      this.setState({ verfied: true });
    } else {
      message.warning("OTP is not correct/matching.");
      return;
    }
  };
  resent_mobile_otp = () => {
    ReactGA.event({
      category: "Investor SignUp",
      action: "Resend Mobile OTP",
    });
    // let otp=this.generateOTP();
    let otp;
    if (this.state.mobileotp.length == 6) {
      Number(this.state.mobileotp).toFixed();
    }
    // this.setState({mobileotp:otp});
    if (this.state.phone.length != 10) {
      message.warning("Mobile number is required.");
      return;
    }
    let params = {
      mobile: this.state.phone,
      otp: otp
    };
    Bridge.investor
      .sendotptomobile(params)
      .then((result) => {
        if (result.status == "1") {
          this.setState(
            { otpsent: true, mobileseconds: 0, mobileminuts: 2 },
            () => this.startcountdown2()
          );
          message.success(
            "OTP resent to your mobile successfully. please verify"
          );
        } else if (result.error === "RATE_LIMIT_EXCEEDED" || result.status === 429) {
          return;
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
          // console.log("called",this.state.mobileseconds);
        }
      }
    }, 1200);
  };
  onChangeMembertype = (e) => {
    ReactGA.event({
      category: "Investor SignUp",
      action: `Investor Type Selected : ${e.target.value}`,
    });

    console.log("memberstype", e.target.value);
    this.setState({ typeofmember: e.target.value });
  };
  onSearch = (value) => {
    console.log("search:", value);
  };
  emailcompleted = () => {
    // console.log('Timer has completed');
    this.setState({ istimerstarted: false });
  };
  emailtick = (milliseconds) => {
    // console.log('millsieconds',milliseconds);
  };
  render() {
    const selectBefore = (
      <div
        style={{
          width: 110,
          // height: 45.38,
          border: "none",
          outline: "none",
          background: "transparent",
        }}
        className="select"
      >
        <CountrySelect
          value={this.state.country_code}
          onChange={(e) => this.setState({ country_code: e.target.value })}
        />
      </div>
    );

    const indianCountryCode = (
      <div
        style={{
          width: 80,

          border: "none",
          outline: "none",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="select"
      >
        <div>+91</div>
      </div>
    );

    return (
      <div style={{ display: this.state.show_data }}>

        <section className="signup-section" style={{ marginTop: 5, paddingTop: 0}}>
          <Fetchurldata setEmail={this.setCode} />
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <Spin spinning={this.state.loading}>
                  <div className="login-form">
                    

                    {this.state.screen1 == true && (
                      <>
                        {console.log(
                          "this.state.typeofmember",
                          this.state.typeofmember
                        )}
                        <div className="row">
                          <div className="col-lg-12">
                            <div style={{ 
                              display: "flex", 
                              justifyContent: "center", 
                              marginBottom: 25 
                            }}>
                              <div 
                                style={{ 
                                  cursor: "pointer", 
                                  padding: "10px 20px", 
                                  fontWeight: this.state.typeofmember === "Indian Resident" ? "600" : "400",
                                  color: this.state.typeofmember === "Indian Resident" ? "rgb(41, 23, 111)" : "#333",
                                  borderBottom: this.state.typeofmember === "Indian Resident" ? "2px solid rgb(41, 23, 111)" : "none",
                                  transition: "all 0.3s ease",
                                  marginRight: "20px"
                                }}
                                onClick={() => {
                                  this.onChangeMembertype({ target: { value: "Indian Resident" } });
                                }}
                              >
                                Indian Resident
                              </div>
                              <div 
                                style={{ 
                                  cursor: "pointer", 
                                  padding: "10px 20px", 
                                  fontWeight: this.state.typeofmember === "Non Resident" ? "600" : "400",
                                  color: this.state.typeofmember === "Non Resident" ? "rgb(41, 23, 111)" : "#333",
                                  borderBottom: this.state.typeofmember === "Non Resident" ? "2px solid rgb(41, 23, 111)" : "none",
                                  transition: "all 0.3s ease"
                                }}
                                onClick={() => {
                                  ReactGA.event({
                                    category: "Investor SignUp",
                                    action: "Non Resident button clicked",
                                  });
                                  this.onChangeMembertype({ target: { value: "Non Resident" } });
                                }}
                              >
                                Non Resident
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label>
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="first_name"
                              className="form-input-field"
                              value={this.state.first_name}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg-6">
                            <label>Middle Name (Optional)</label>
                            <input
                              type="text"
                              name="middle_name"
                              className="form-input-field"
                              value={this.state.middle_name}
                              onChange={this.handleChange}
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
                              value={this.state.last_name}
                              onChange={this.handleChange}
                            />
                          </div>
                          {/* <div className="col-lg-12">
                            <label>Email <span className='text-danger'>*</span></label>
                            <input 
                              type="text" 
                              name="email" 
                              className="form-input-field" 
                              value={this.state.email} 
                              onChange={this.handleChange}
                            />
                          </div> */}
                          <div className="col-lg-12">
                            {this.state.typeofmember == "Non Resident" ? (
                              <div
                                style={{ position: "relative" }}
                                className="international-mobile-field"
                              >
                                <label>
                                  Mobile No{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Input
                                  showSearch
                                  addonBefore={selectBefore}
                                  defaultValue="mysite"
                                  name="phone"
                                  minLength={7}
                                  maxLength={15}
                                  optionFilterProp="children"
                                  onSearch={this.onSearch}
                                  filterOption={(input, option) =>
                                    (option?.label ?? "")
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  // className="form-input-field"
                                  value={this.state.phone.trim()}
                                  onChange={(e) =>
                                    this.setState({ phone: e.target.value })
                                  }
                                  onClick={() => {
                                    ReactGA.event({
                                      category: "Investor SignUp",
                                      action:
                                        "Non Resident Page Mobile number drop down clicked",
                                    });
                                  }}
                                />
                                <div className="mt-4">
                                  <label>
                                    {" "}
                                    Indian Contact Number(Optional)
                                  </label>
                                </div>

                                <Input
                                  addonBefore={indianCountryCode}
                                  showSearch
                                  name="phone1"
                                  minLength={10}
                                  maxLength={14}
                                  // optionFilterProp="children"
                                  // onSearch={this.onSearch}
                                  // filterOption={(input, option) =>
                                  //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                  // }
                                  // className="form-input-field"
                                  value={this.state.phone1}
                                  onChange={(e) =>
                                    this.setState({
                                      phone1: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            ) : (
                              <>
                                {this.state.otpsent == true ? (
                                  <div style={{ position: "relative" }}>
                                    {this.state.verfied == true ? (
                                      <>
                                        <label>
                                          Mobile No{" "}
                                          <span className="text-danger">*</span>
                                        </label>

                                        <label>
                                          <span className="country_code">
                                            +91
                                          </span>
                                        </label>

                                        <input
                                          style={{ paddingLeft: 50 }}
                                          type="tel"
                                          name="phone"
                                          minLength={10}
                                          maxLength={10}
                                          pattern="[0-9]{14}"
                                          className="form-input-field"
                                          value={this.state.phone.trim()}
                                          disabled={true}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <label>
                                          Mobile No{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <label>
                                          <span className="country_code">
                                            +91
                                          </span>
                                        </label>
                                        <input
                                          style={{ paddingLeft: 50 }}
                                          type="tel"
                                          name="phone"
                                          minLength={10}
                                          maxLength={10}
                                          pattern="[0-9]{14}"
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
                                          OTP
                                          <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                          <input
                                            type="tel"
                                            name="mobile_no_otp"
                                            className="form-input-field"
                                            placeholder="Please enter OTP"
                                            pattern={"0-9"}
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
                                                  this.state.istimerstarted2 ==
                                                  true
                                                    ? "#a29f9f"
                                                    : "#29176f",
                                                border:
                                                  this.state.istimerstarted2 ==
                                                  true
                                                    ? "1px solid #a29f9f"
                                                    : "#29176f",
                                                borderRadius: 5,
                                              }}
                                              className="send_otp_button_op"
                                              disabled={
                                                this.state.istimerstarted2 ==
                                                true
                                                  ? true
                                                  : false
                                              }
                                              onClick={this.resent_mobile_otp}
                                            >
                                              Resend
                                            </button>
                                          )}
                                          <div style={{ position: "relative" }}>
                                            {this.state.istimerstarted2 ==
                                              true &&
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
                                        style={{
                                          position: "relative",
                                          top: -19,
                                        }}
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

                                    <span className="country_code">+91</span>

                                    <input
                                      style={{ paddingLeft: 50 }}
                                      type="tel"
                                      name="phone"
                                      minLength={10}
                                      maxLength={14}
                                      pattern="[0-9]{14}"
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
                              </>
                            )}
                          </div>

                          {/* Email OTP */}
                          {/* Email Send OTP */}
                          {this.state.email_otpsent == true ? (
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
                                      type="number"
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
                                            {this.state.minutes2}:
                                            {this.state.seconds2 < 10
                                              ? `0${this.state.seconds2}`
                                              : this.state.seconds2}
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
                                />
                                <button
                                  className="send_otp_button"
                                  onClick={this.sendotptomail}
                                >
                                  Send OTP
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="col-lg-12">
                            <label>Referral Code</label>
                            <input
                              type="text"
                              name="refferal_code"
                              className="form-input-field"
                              value={this.state.refferal_code}
                              onChange={(e) =>
                                this.setState(
                                  { refferal_code: e.target.value },
                                  () => this.check_refferal_code()
                                )
                              }
                              disabled={
                                this.state.is_refferal_code_matched == true &&
                                this.state.refferal_code != ""
                              }
                            />
                            {this.state.is_refferal_code_matched == false &&
                              this.state.show_error == true &&
                              this.state.refferal_code != "" && (
                                <span
                                  className="text-danger"
                                  style={{
                                    top: -12,
                                    fontSize: 16,
                                    position: "relative",
                                  }}
                                >
                                  Invalid Referral Code
                                </span>
                              )}
                            {this.state.is_refferal_code_matched == true &&
                              this.state.show_error == true &&
                              this.state.refferal_code != "" && (
                                <span
                                  className="text-success"
                                  style={{
                                    top: -12,
                                    fontSize: 16,
                                    position: "relative",
                                  }}
                                >
                                  Referral Code is valid
                                </span>
                              )}
                          </div>
                          <br />
                        </div>
                        <button
                          style={{ marginTop: 20 }}
                          onClick={this.register}
                          type="button"
                          className="login-button"
                        >
                          Sign up
                        </button>
                      </>
                    )}
                    {/* {this.state.otpscreen==true &&(
                      <div className="login-form">
                      <h3 className="text-center">Login</h3>
                      <p
                        style={{
                          fontSize:16,
                          color:"#000",
                          paddingBottom:33,
                          lineHeight:'24px',
                        }}
                      >
                        OTP is sent to your Email. Please enter it below:
                      </p>
                      <div
                      style={{
                        position:'absolute',
                        right:33,
                        marginTop:-25,
                        display:'flex',
                      }}
                      >
                        {this.state.istimerstarted==true ? (
                          <span className="resend-otp-link" style={{cursor:'not-allowed'}}>
                            <span style={{color:'#a3a0a0'}}>Resend OTP</span>
                          </span> 
                        ):(
                          <span className="resend-otp-link" onClick={this.resendotp}>
                            <span >Resend OTP</span>
                          </span> 
                        )}
                        {this.state.istimerstarted==true&& (                      
                          <span style={{marginLeft:10}}>
                            ({this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds})
                          </span>
                        )}     
                      </div>
                      <div className="otp-input">
                        <input
                          type="text"
                          name="num1"
                          className="form-input-field"
                          onChange={(e) => this.onChangeNum1(e)}
                          value={this.state.num1}
                        />
                      </div>
                      <button
                        type="button"
                        className="login-button"
                        onClick={this.verifyotp}
                      >
                        Verify
                      </button>
                    </div>
                    )} */}

                    {/* {this.state.screen2==true && (
                      <>
                        <div className="row">
                          <div className="col-lg-12">
                            <select 
                              name="nationality" 
                              className="form-input-field"
                              value={this.state.nationality} 
                              onChange={this.handleChangeSelect} 
                            >
                              <option value=''>Select Nationality</option>
                              <option value='Indian Resident'>Indian Resident</option>
                              <option value='NRI Having NRO Account'>NRI Having NRO Account</option>
                              <option value='Other'>Other</option>
                            </select>
                          </div>
                        </div>
                        <button onClick={this.register} type="button" className="login-button">Next</button>
                      </>
                    )} */}

                    <hr
                      style={{
                        border: "1px solid rgb(170 167 167)",
                        background: "#ddd",
                        margin: "33px 0",
                      }}
                    />
                    <div className="d-flex">
                      <span>Already have an account?</span> &nbsp;&nbsp;
                      <a href="/Login">Log in instead</a>
                    </div>
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Step1;
