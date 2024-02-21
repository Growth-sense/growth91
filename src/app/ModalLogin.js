import React, { Component } from "react";
import { message, Spin, Modal } from "antd";
import Bridge from "./constants/Bridge";
import $ from "jquery";

import moment from "moment";
import GoogleAuth from "./auth/founder/GoogleAuth";
import CountdownTimer from "timer-countdown";
import { set } from "react-ga";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "./constants/data";
class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      otp: "",
      loading: false,
      screen2: false,
      num1: "",
      num2: "",
      num3: "",
      num4: "",
      num5: "",
      num6: "",
      otpoutput: "",
      timer: "00:00",
      istimerstarted: false,
      minutes: 1,
      seconds: 0,
      otp_restriction_date: "",
      minutes2: 10,
      seconds2: 0,
      show_data: "none",
      formloader: false,
      countseconds: 119000,
    };
  }
  componentDidMount() {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.event({
      category: "Login",
      action: "User Visited Login Page",
    });

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
        this.setState({ show_data: "none" });
        return;
      }
      if (localStorage.getItem("founder_id")) {
        this.setState({ show_data: "none" });
        return;
      }
    } else {
      this.setState({ show_data: "block" });
    }
  }

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
  startcountdown = () => {
    this.setState({ countseconds: 119000 });
  };
  resendotp = () => {
    ReactGA.event({
      category: "Deals Login PopUp",
      action: `Resend OTP button clicked`,
    });
    if (!this.state.email) {
      message.warning(
        "Your email is incorrect or this account doesn't exist. Please try agian or signup for Growth91."
      );
      return;
    }
    let params = {
      email: this.state.email,
      otp: this.state.otp,
    };
    Bridge.founder.fsendotp(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            istimerstarted: true,
            userType: result.data.user_type,
            minutes: 0,
            seconds: 59,
          },
          () => this.startcountdown()
        );
      } else if (result.status == 2) {
        message.warning(result.message);
      } else {
        message.warning(result.message);
      }
    });
  };
  generateOTP = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  sendotp = () => {
    ReactGA.event({
      category: "Deals Login PopUp",
      action: `Login Button clicked`,
    });
    // Here we have to check that this mail is registered or not
    if (!this.state.email) {
      message.warning(
        "Your email is incorrect or this account doesn't exist. Please try agian or signup for Growth91."
      );
      console.log("clicked");
      return;
    }
    this.setState({ formloader: true });
    let params = {
      email: this.state.email,
      otp: this.state.otp,
    };
    Bridge.founder.fsendotp(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            loading: false,
            screen2: true,
            otpoutput: result.data,
            istimerstarted: true,
            formloader: false,
          },
          () => this.startcountdown()
        );
        this.start10mincountdown();
      } else if (result.status == 2) {
        message.warning(result.message);
        this.setState({ formloader: false });
      } else {
        // message.warning(result.message);
        message.warning(
          "Your email is incorrect or this account doesn't exist. Please try agian or signup for Growth91."
        );
        this.setState({ formloader: false });
      }
    });
  };
  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  login = () => {
    ReactGA.event({
      category: "Deals Login PopUp",
      action: `Submit button clicked`,
    });
    if (!this.state.num1) {
      message.warning("Invalid otp");
      return;
    }
    let { num1 } = this.state;
    let SUMOFOTP = num1;

    if (this.state.otp == SUMOFOTP) {
      switch (this.state.otpoutput[0].user_type) {
        case "investor":
          localStorage.setItem(
            "investor_id",
            this.state.otpoutput[0].investor_id
          );
          localStorage.setItem("investor_email", this.state.otpoutput[0].email);
          localStorage.setItem(
            "investor_kycstatus",
            this.state.otpoutput[0].kycstatus
          );
          localStorage.setItem(
            "investor_name",
            this.state.otpoutput[0].first_name +
            " " +
            this.state.otpoutput[0].last_name
          );
          window.location.reload(true);
          message.success("OTP verified successfully.");
          break;

        case "founder":
          localStorage.setItem(
            "founder_id",
            this.state.otpoutput[0].investor_id
          );
          localStorage.setItem(
            "founder_name",
            this.state.otpoutput[0].first_name +
            " " +
            this.state.otpoutput[0].last_name
          );
          localStorage.setItem(
            "founder_is_investor",
            this.state.otpoutput[0].is_investor
          );
          localStorage.setItem("founder_email", this.state.otpoutput[0].email);
          localStorage.setItem(
            "founder_kycstatus",
            this.state.otpoutput[0].kycstatus
          );
          window.location.reload(true);
          message.success("You have logged In successfully.");
          ReactGA.event({
            category: "Login",
            action: "User Logged-in to the website",
          });
          break;
        default:
          message.error("Please Register first");
      }
    } else {
      message.warning("Invalid OTP");
      return;
    }
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
  completed = () => {
    // console.log('Timer has completed');
    this.setState({ istimerstarted: false });
  };
  tick = (milliseconds) => {
    // console.log('millsieconds',milliseconds);
  };
  render() {
    return (
      <Modal open={true} footer={false} closable={false} keyboard={false} maskStyle={this.props.customMaskStyle}>
        <div style={{ display: this.state.show_data }}>
          <section className="login-section m-0 p-0">
            <div className="container">
              <div className="row">
                <div className="col-12 m-auto">
                  <Spin spinning={this.state.loading}>
                    {this.state.screen2 == true ? (
                      <div className="login-form">
                        <h3 className="text-center">Login</h3>
                        <p
                          style={{
                            fontSize: 16,
                            color: "#000",
                            paddingBottom: 33,
                            lineHeight: "24px",
                          }}
                        >
                          OTP was sent to your Registered Email and Mobile Number
                          Please Enter it Below:
                        </p>
                        <div
                          style={{
                            position: "absolute",
                            right: 40,
                            marginTop: -25,
                            display: "flex",
                          }}
                        >
                          {this.state.istimerstarted == true ? (
                            <span
                              className="resend-otp-link"
                              style={{ cursor: "not-allowed" }}
                            >
                              <span
                                style={{
                                  background: "rgb(162, 159, 159)",
                                  color: "white",
                                  padding: "0 8px",
                                  textDecoration: "none",
                                  border: "1px solid rgb(162, 159, 159)",
                                  borderRadius: "5px",
                                }}
                              >
                                Resend OTP
                              </span>
                            </span>
                          ) : (
                            <span
                              className="resend-otp-link"
                              onClick={this.resendotp}
                            >
                              <span
                                style={{
                                  background: "rgb(41, 23, 111)",
                                  color: "white",
                                  border: "rgb(41, 23, 111)",
                                  textDecoration: "none",
                                  borderRadius: "5px",
                                  padding: "0 8px",
                                  marginRight: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                Resend OTP
                              </span>
                            </span>
                          )}

                          {this.state.istimerstarted == true && (
                            <span style={{ marginLeft: 10 }}>
                              <div className="otp-timer">
                                <CountdownTimer
                                  timeLeft={
                                    this.state.istimerstarted == true
                                      ? Number(this.state.countseconds)
                                      : 0
                                  }
                                  completeCallback={this.completed}
                                  tickCallback={this.tick}
                                />
                              </div>
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
                          onClick={this.login}
                        >
                          Submit
                        </button>
                        <hr
                          style={{
                            border: "1px solid rgb(170 167 167)",
                            background: "#ddd",
                            margin: "33px 0",
                          }}
                        />
                        {/* <div className="d-flex">
                        <span>Don’t have an account?</span> &nbsp;&nbsp;
                        <a href="/Signup">Sign Up instead</a>
                      </div> */}
                      </div>
                    ) : (
                      <Spin spinning={this.state.formloader}>
                        <div className="login-form">
                          <h3 className="text-center">Login</h3>
                          {/*<button className="login-with-google" onClick={this.signInWithGoogle}>
                          <img src='./assets/images/home/google.png' style={{ width:27 }} alt='google' />
                          Login with Google</button>*/}
                          <div
                            className="text-center mb-3"
                            style={{ fontSize: "18px" }}
                          >
                            Don’t have an account? &nbsp;&nbsp;
                            <a style={{ fontSize: "18px" }} href="/Signup" onClick={() => {
                              ReactGA.event({
                                category: "Deals Login PopUp",
                                action: `SignUp Button clicked`,
                              });
                            }}>
                              Signup
                            </a>
                          </div>
                          <div className="login-with-google">
                            <GoogleAuth />
                          </div>
                          <div className="or-div">
                            <hr />
                            <p className="text-center">OR LOG IN WITH EMAIL</p>
                          </div>
                          <input
                            type="email"
                            name="email"
                            className="form-input-field"
                            placeholder="Email"
                            value={this.state.email.trim()}
                            autoComplete="off"
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                          <button
                            type="button"
                            className="login-button"
                            onClick={this.sendotp}
                          >
                            Log in
                          </button>

                          {/* <div className="d-flex">
                          <span>Don’t have an account?</span> &nbsp;&nbsp;
                          <a href="/Signup">Sign Up instead</a>
                        </div> */}

                        </div>
                      </Spin>
                    )}
                  </Spin>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Modal>
    );
  }
}

export default ModalLogin;
