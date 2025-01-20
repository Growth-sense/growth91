import React, { Component } from 'react';
import { message, Spin, notification } from 'antd';
import Bridge from '../constants/Bridge';
import $ from 'jquery';
import moment from 'moment';
import Urldata from './Urldata.jsx';
import NewWebHeader from '../common/NewWebHeader';
import { NewWebFooter } from '../common/NewWebFooter';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

class familyinvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
    email:"",
      otp:"",
      emailotp:"",
      mobileotp:"",
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
      formloader:false,
      inviteid:""
    };
  }
  componentDidMount() {

   console.log(this.state.inviteid);
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

  setemail=(value)=>{;
    this.setState({email:value});
  }
  setOtp=(value)=>{
    console.log("Asd");
    this.setState({otp:value});
  }
  setinviteid=(value)=>{
    console.log(value);
    if(value !==""){
        this.setState({inviteid:value});
console.log("ddd");
}
}
sendotp =()=>{
      this.setState({screen2:true});
    
    let params = {
        inviteID: this.state.inviteid,
      };
    //   return
  Bridge.family.familyInviteOTP(params).then((result) => {

    console.log(result);
  })
  }
  accpetinvitaion =(e)=>{
      e.preventDefault()
    if( !this.state.emailotp){
        alert("plz fill all field")
    }
    else{

        let params = {
            emailOTP:this.state.emailotp,
            // mobileOTP:this.state.mobileotp,
            inviteID: this.state.inviteid,
        };
        console.log(params);
        Bridge.family.verifyFamilyInvite(params).then((result) => {
            if(result.message == "You have joined the Family!"){
                toast.success(result.message)
                window.location.assign('/');
            }   
            else{
                toast.error(result.message)

            }
            console.log(result);
        })
    }
}
  render() {
    console.log(this.state.otp);
    return (
      <>
        <NewWebHeader newabout={"newabout"} />
        <section className="login-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <Urldata setid={this.setinviteid}  />
                <Spin spinning={this.state.loading}>
                  {this.state.screen2==true ? (
                    <div className="login-form">
                      <h3 className="text-center">Verify</h3>
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
                      {/* <div
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
                      </div> */}
                      
                      <label>Email Otp</label>
                      <input 
                        type="text" 
                        name="otp" 
                        className="form-input-field" 
                        placeholder='Email Otp' 
                        value={this.state.emailotp}
                        autoComplete="off"
                        onChange={(e) =>
                          this.setState({ emailotp: e.target.value })
                        }
                        // disabled={true}
                      /> 
                     
                      
                      {/* <label>Mobile Otp</label>
                      <input 
                        type="text" 
                        name="otp" 
                        className="form-input-field" 
                        placeholder='Mobile Otp' 
                        value={this.state.mobileotp}
                        autoComplete="off"
                        onChange={(e) =>
                          this.setState({ mobileotp: e.target.value })
                        }
                        // disabled={true}
                      />  */}
                     
                      <button
                        type="button"
                        className="login-button"
                        onClick={this.accpetinvitaion}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="login-form">
                      <h3 className="text-center">Verify</h3>
                      {/* <label>Email</label>
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
                        onChange={(e) =>
                          this.setState({ otp: e.target.value })
                        }
                        // disabled={true}
                      /> */}
                      <button
                        type="button"
                        className="login-button"
                        onClick={this.sendotp}
                      >
                        Accecpt Invitation
                      </button>
                    </div>
                  )}
                </Spin>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer/>
        <NewWebFooter/>
      </>
    );
  }
}

export default familyinvite;
