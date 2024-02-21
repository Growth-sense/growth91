
import React, { Component } from 'react';
import WebHeader from '../common/WebHeader';
import WebFooter from '../common/WebFooter';
import { message, Spin, notification } from 'antd';
import Bridge from '../constants/Bridge';
import $ from 'jquery';
import moment from 'moment';
import Urldata from './Urldata';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      otp:"",
      loading:false,
      screen2:false,
      num1:"",
      num2:"",
      num3:"",
      num4:"",
      num5:"",
      num6:"",
      otpoutput:"",
      timer:'00:00',
      istimerstarted:false,
      minutes:2,
      seconds:0,
      otp_restriction_date:'',
      minutes2:10,
      seconds2:0,
      startupid:'',
      founder_id:'',
      formloader:false
    };
  }
  componentDidMount() {
    let otp=this.generateOTP();
    this.setState({
      otp:otp.length==6 ? Number(otp).toFixed() : '144255',
      otp_restriction_date: moment(),
    });
  }
  start10mincountdown=()=>{
    this.myInterval = setInterval(() => {
      const { seconds2, minutes2 } = this.state
      if (seconds2 > 0) {
        this.setState(({ seconds2 }) => ({
          seconds2: seconds2 - 1
        }));
      }
      if(seconds2===0){
        if(minutes2===0){
          let otp=this.generateOTP();
          this.setState({
            otp:otp.length!=6 ? '144255' : Number(otp).toFixed(),
            minutes2:10,
            seconds2:0,
          });
        } else {
          this.setState(({ minutes2 }) => ({
            minutes2:minutes2 - 1,
            seconds2:59,
          }));
        }
      } 
    }, 1200);
  }
  startcountdown=()=>{
    this.myInterval=setInterval(()=>{
      const { seconds, minutes } = this.state
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          this.setState({istimerstarted:false});
        } else {
          this.setState(({ minutes }) => ({
            minutes:minutes - 1,
            seconds:59,
            istimerstarted:true
          }));
        }
      } 
    },1200);
  }
  componentWillUnmount() {
    clearInterval(this.myInterval)
  }
  resendotp=()=>{
    if(!this.state.email){
      message.warning("Invalid email");
      return;
    }
    let params={
      email: this.state.email,
      otp: this.state.otp,
    };
    Bridge.startupformlogin(params).then((result) => {
      if(result.status==1){
        message.success(result.message);
        this.setState({
          istimerstarted:true,
          minutes:2,
          seconds:0,
        },()=>this.startcountdown());
      } else {
        message.warning(result.message);
      }
    });
  }
  
//end function
  generateOTP = () => {
    var digits="0123456789";
    let OTP="";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  openNotificationWithIcon = (placement,message) => {
    notification.warning({
      message: 'Warning!',
      description:message,
      duration:5,
      placement,
    });
  };
  verify_user=()=>{
    if(!this.state.email){
      message.warning("Invalid email");
      return;
    }
    if(this.state.otp.length!=6){
      this.setState({otp: '123444'});
    }
    this.setState({formloader:true});
    let params={
      email: this.state.email,
      otp: this.state.otp,
      founder_id:this.state.founder_id,
    }
    Bridge.startupformlogin(params).then((result) => {
      if(result.status==1){
        message.success(result.message);
        localStorage.setItem("form_id", result.data[0].id);
        localStorage.setItem("form_email", result.data[0].email);
        localStorage.setItem("form_founder_id", result.data[0].by_founder_id);
        localStorage.setItem("form_user_type", result.data[0].role);
        window.location.assign("/information-form");
        this.setState({
          loading:false,
          formloader:false,
          // screen2:true,
          // otpoutput:result.data,
        });
      } else {
        message.warning(result.message);
        this.setState({loading:false});
      }
    });
  };
  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  }
  login=() =>{
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
    if(this.state.otp == SUMOFOTP){
      // localStorage.setItem("form_id", this.state.otpoutput[0].id);
      // localStorage.setItem("form_email", this.state.otpoutput[0].email);
      // localStorage.setItem("form_founder_id", this.state.otpoutput[0].by_founder_id);
      // localStorage.setItem("form_user_type", this.state.otpoutput[0].role);
      // window.location.assign("/information-form");
      // message.success("You have logged in successfully.");
    }else{
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
    // console.log("login success", res);
  };

  onFailure = (res) => {
    // console.log("login Failed", res);
  };
  setemail=(value)=>{;
    this.setState({email:value});
  }
  setOtp=(value)=>{
    this.setState({otp:value});
  }
  setFounderId=(value)=>{
    this.setState({founder_id:value});
  }
  render() {
    return (
      <div>
        <WebHeader />
        <section className="login-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <Urldata setEmail={this.setemail} setOtp={this.setOtp} setFounderId={this.setFounderId} />
                <Spin spinning={this.state.loading}>
                  {this.state.screen2==true ? (
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
                        We have sent an OTP to your registered email ID. Enter
                        it here to verify your email and continue:
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
                            <span>Resend OTP</span>
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
                    </div>
                  ) : (
                    <div className="login-form">
                      <h3 className="text-center">Verify</h3>
                      <label>Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-input-field" 
                        placeholder='Email' 
                        value={this.state.email}
                        autoComplete="off"
                        disabled={true}
                        // onChange={(e) =>
                        //   this.setState({ email: e.target.value })
                        // }
                      />
                      <label>Otp</label>
                      <input 
                        type="text" 
                        name="otp" 
                        className="form-input-field" 
                        placeholder='otp' 
                        value={this.state.otp}
                        autoComplete="off"
                        disabled={true}
                      />
                      <button
                        type="button"
                        className="login-button"
                        onClick={this.verify_user}
                      >
                        Verify
                      </button>
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
