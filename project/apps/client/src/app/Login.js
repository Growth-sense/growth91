import React, { Component } from "react";
import WebHeader from "./common/WebHeader";
import WebFooter from "./common/WebFooter";
import { message, Spin } from "antd";
import Bridge from "./constants/Bridge";
import $ from "jquery";
//for firebase google authentication
//to use auth
import { authentication } from "./firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//google authentication using google identity service
import GoogleAuth from "./auth/investor/GoogleAuth";

import ReactGA from "react-ga4";
import { TRACKING_ID } from "./constants/data";
import NewWebHeader from "./common/NewWebHeader";

class Login extends Component {
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
    };
  }

  



  componentDidMount() {
    console.log("on login page");

    let otp = this.generateOTP();
    this.setState({
      otp: otp.length != 6 ? 144255 : Number(otp).toFixed(),
    });
  }

  // run below code  everytime the component is mounted
  componentDidMount() {
    // initialize google analytics
    ReactGA.initialize(TRACKING_ID);
    // log page view
    ReactGA.pageview(window.location.pathname + window.location.search);
    
  }


  //google login function
  signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        console.log(re);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //end function

  generateOTP = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  sendotp = () => {
    if (!this.state.email) {
      message.warning("Invalid email");
      return;
    }
    let params = {
      email: this.state.email,
      otp: this.state.otp,
    };

    Bridge.investor.sendotp(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          loading: false,
          screen2: true,
          otpoutput: result.data,
        });
      } else {
        message.warning(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  login = () => {
    if (
      !this.state.num1 ||
      !this.state.num2 ||
      !this.state.num3 ||
      !this.state.num4 ||
      !this.state.num5 ||
      !this.state.num6
    ) {
      message.warning("Invalid otp");
      return;
    }

    let { num1, num2, num3, num4, num5, num6 } = this.state;
    let SUMOFOTP = `${num1}${num2}${num3}${num4}${num5}${num6}`;
    if (SUMOFOTP.length != 6) {
      message.warning("Invalid otp");
      return;
    }
    if (this.state.otp == SUMOFOTP) {
      localStorage.setItem(
        "investor_id",
        this.state.otpoutput[0].investor_id
      );
      localStorage.setItem(
        "Parent_investor_id",
        this.state.otpoutput[0].investor_id
      );
      localStorage.setItem("investor_email", this.state.otpoutput[0].email);
      localStorage.setItem("Parent_investor_email", this.state.otpoutput[0].email);
      localStorage.setItem(
        "Parent_investor_kycstatus",
        this.state.otpoutput[0].kycstatus
      );
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
      localStorage.setItem(
        "Parent_investor_name",
        this.state.otpoutput[0].first_name +
        " " +
        this.state.otpoutput[0].last_name
      );
      localStorage.setItem(
        "investor_mobile",
        this.state.otpoutput[0].mobile || ""
      );
      localStorage.setItem(
        "investor_pan",
        this.state.otpoutput[0].panno || ""
      );
      localStorage.setItem(
        "investor_pan_name",
        this.state.otpoutput[0].pan_name || ""
      );
      const guestID = localStorage.getItem("unicorn_guest_id");
      if (guestID) {
        localStorage.removeItem("unicorn_guest_id");
        localStorage.removeItem("unicorn_guest_until");
        localStorage.removeItem("unicorn_guest_gated_attempts");
      }
      window.location.assign("/investor-dashboard");
      message.success("OTP verified succesfully.");
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

  onSuccess = (res) => {
    console.log("login success", res);
  };

  onFailure = (res) => {
    console.log("login Failed", res);
  };

  render() {
    return (
      <div>
        {/* <WebHeader /> */}
        <NewWebHeader newabout={"newabout"}/>

        <section className="login-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <Spin spinning={this.state.loading}>
                  {this.state.screen2 == true ? (
                    <div className="login-form">
                      <h3 className="text-center">Login</h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#000",
                        }}
                      >
                        We have sent an OTP to your registered email ID. Enter
                        it here to verify your email and continue:
                      </p>
                      <div className="otp-input">
                        <input
                          type="text"
                          name="num1"
                          className="form-input-field"
                          onChange={(e) => this.onChangeNum1(e)}
                          value={this.state.num1}
                          maxLength={1}
                        />
                        <input
                          type="text"
                          name="num2"
                          id="num2"
                          className="form-input-field"
                          value={this.state.num2}
                          maxLength={1}
                          onChange={(e) => this.onChangeNum2(e)}
                        />
                        <input
                          type="text"
                          name="num3"
                          id="num3"
                          className="form-input-field"
                          value={this.state.num3}
                          maxLength={1}
                          onChange={(e) => this.onChangeNum3(e)}
                        />
                        <input
                          type="text"
                          name="num4"
                          id="num4"
                          className="form-input-field"
                          value={this.state.num4}
                          maxLength={1}
                          onChange={(e) => this.onChangeNum4(e)}
                        />
                        <input
                          type="text"
                          name="num5"
                          id="num5"
                          className="form-input-field"
                          value={this.state.num5}
                          maxLength={1}
                          onChange={(e) => this.onChangeNum5(e)}
                        />
                        <input
                          type="text"
                          name="num6"
                          id="num6"
                          className="form-input-field"
                          value={this.state.num6}
                          maxLength={1}
                          onChange={(e) =>
                            this.setState({ num6: e.target.value })
                          }
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
                      <a href="#">Log in as founder</a>
                      <div className="d-flex">
                        <span>Don’t have an account?</span> &nbsp;&nbsp;
                        <a href="#">Sign up instead</a>
                      </div>
                    </div>
                  ) : (
                    <div className="login-form">
                      <h3 className="text-center">Login</h3>
                      {/* <button className="login-with-google" onClick={this.signInWithGoogle}>
                      <img src='./assets/images/home/google.png' style={{ width:27 }} alt='google' />
                      Login with Google
                    </button> */}
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
                        value={this.state.email}
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
                      <hr
                        style={{
                          border: "1px solid rgb(170 167 167)",
                          background: "#ddd",
                          margin: "33px 0",
                        }}
                      />
                      <div className="d-flex">
                        <span>Don’t have an account?</span> &nbsp;&nbsp;
                        <a href="/Signup">Sign Up instead</a>
                      </div>
                    </div>
                  )}
                </Spin>
              </div>
            </div>
          </div>
        </section>
        <WebFooter />
      </div>
    );
  }
}

export default Login;
