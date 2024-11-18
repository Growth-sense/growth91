
import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import { message, Spin, Select, Button  } from 'antd';
import Bridge from './constants/Bridge';
import $ from 'jquery';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      mobile:'',
      loading: false,
      screen1: true,
      screen2: false,
      screen3: false,
      nationality:'',
      otpscreenstatus:false,
      num1:'',
      num2:'',
      num3:'',
      num4:'',
      num5:'',
      num6:'',
      localotp:'',
      otpoutput:'',
      user_id:'',
    }
  }

  componentDidMount() {
    let otp = this.getRandomArbitrary('111111', '999999');
    this.setState({
        localotp:Number(otp).toFixed()
    });
  }

  getRandomArbitrary = (min, max) => {
    return (Math.random() * (max - min) + min);
  }

  register = () => {
    
    if(!this.state.first_name) {
      message.warning('Please enter your first name');
      return;
    }else if(!this.state.last_name) {
      message.warning('Please enter your last name.');
      return;
    } else if(!this.state.email) {
      message.warning('Please enter your email.');
      return;
    } else if(!this.state.mobile || this.state.mobile.length != 10) {
      message.warning('Invalid mobile.');
      return;
    }

    let phonestatus = this.checkphonenumber(this.state.mobile);
    if(phonestatus==false) {
        message.warning('Invalid mobile number');
        return;
    }
    

    let params={
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      email: this.state.email,
      mobile: this.state.mobile,
      otp: this.state.localotp,
    }
    
    this.setState({
      loading: true,
    });
    Bridge.investor.register_premium_member(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          loading: false,
          screen1:false,
          first_name: '',
          middle_name: '',
          last_name: '',
          email: '',
          mobile: '',
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  }

  checkphonenumber = (inputtxt) => {
    var phoneno = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    if(inputtxt.match(phoneno)) {
        return true;
    } else  {
        return false;
    }
  }

    confirmotp = (e) => {
        if(
            !this.state.num1 || 
            !this.state.num2 || 
            !this.state.num3 || 
            !this.state.num4 || 
            !this.state.num5 || 
            !this.state.num6 
        ) {
        message.warning('Invalid otp')
        return;
        }
        let { num1,num2,num3,num4,num5,num6 } = this.state;
        let SUMOFOTP = `${num1}${num2}${num3}${num4}${num5}${num6}`;
    
        if(this.state.localotp == SUMOFOTP)  {
            message.success('Registration is completed successfully.');
            setTimeout(() => {
                window.location.assign('/Login');
            }, 3000);
        }  else {
            message.warning('Invalid OTP');
            return;
        } 
    }

  handleChange  = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  

  showsecondscreen = () => {
    if(!this.state.first_name) {
      message.warning('Please enter your first name');
      return;
    }else if(!this.state.last_name) {
      message.warning('Please enter your last name.');
      return;
    } else if(!this.state.email) {
      message.warning('Please enter your email.');
      return;
    }
    this.setState({
      screen2:true,
      screen1:false,
    });
  }

  showthirdcreen = () => {
    if(!this.state.nationality) {
      message.warning('Invalid nationality.');
      return;
    }
    this.setState({
      screen1:false,
      screen2:false,
      screen3:true,
    });
  }

  onChangeNum1 = (e) => {
    this.setState({ 
      num1: e.target.value 
    });
    $('#num2').focus();
  }

  onChangeNum2 = (e) => {
    this.setState({ 
      num2: e.target.value 
    });
    $('#num3').focus();
  }

  onChangeNum3 = (e) => {
    this.setState({ 
      num3: e.target.value 
    });
    $('#num4').focus();
  }

  onChangeNum4 = (e) => {
    this.setState({ 
      num4: e.target.value 
    });
    $('#num5').focus();
  }

  onChangeNum5 = (e) => {
    this.setState({ 
      num5: e.target.value 
    });
    $('#num6').focus();
  }

  render() {
    return (
      <div>
        <Header />
        <section className="signup-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <Spin spinning={this.state.loading}>
                  <div className="login-form">
                    <h3 className="text-center">Get Started</h3>
                    <button className="login-with-google">
                      <img src='./assets/images/home/google.png' style={{ width:27 }} alt='google' />
                      Login with Google
                    </button>
                    <div className='or-div'>
                      <hr/>
                      <p className="text-center">OR SIGN UP WITH EMAIL</p> 
                    </div>
                    {this.state.screen1 == true ? (
                      <>
                        <div className="row">
                          <div className="col-lg-6">
                            <input 
                              type="text" 
                              name="first_name" 
                              className="form-input-field" 
                              placeholder="First Name"
                              value={this.state.first_name} 
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg-6">
                            <input 
                              type="text" 
                              name="middle_name" 
                              className="form-input-field" 
                              placeholder="Middle Name (optional)" 
                              value={this.state.middle_name} 
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <input 
                              type="text" 
                              name="last_name" 
                              className="form-input-field" 
                              placeholder="Last Name" 
                              value={this.state.last_name} 
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <input 
                              type="email" 
                              name="email" 
                              className="form-input-field" 
                              placeholder="Email" 
                              value={this.state.email} 
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <input 
                              type="text" 
                              name="mobile" 
                              className="form-input-field" 
                              placeholder="mobile" 
                              value={this.state.mobile} 
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <button onClick={this.register} type="button" className="login-button">Sign up</button>
                      </>
                    ) : (
                        <div className="login-form">
                            <p style={{
                                fontSize: 14,
                                color: '#000',
                            }}>
                                We have sent an OTP to your registered email ID. Enter
                                it here to verify your email and continue: 
                            </p>
                            <div className='otp-input'>
                                <input 
                                    type="text" 
                                    name="num1" 
                                    className="form-input-field" 
                                    onChange={(e) => this.onChangeNum1(e)}
                                    value={this.state.num1} maxLength={1}
                                />
                                <input 
                                    type="text" 
                                    name="num2" 
                                    id="num2"
                                    className="form-input-field" 
                                    value={this.state.num2} maxLength={1}
                                    onChange={(e) => this.onChangeNum2(e)}
                                />
                                <input 
                                    type="text" 
                                    name="num3" 
                                    id="num3"
                                    className="form-input-field" 
                                    value={this.state.num3} maxLength={1}
                                    onChange={(e) => this.onChangeNum3(e)}
                                />
                                <input 
                                    type="text" 
                                    name="num4" 
                                    id="num4"
                                    className="form-input-field" 
                                    value={this.state.num4} maxLength={1}
                                    onChange={(e) => this.onChangeNum4(e)}
                                />
                                <input 
                                    type="text" 
                                    name="num5"
                                    id="num5" 
                                    className="form-input-field" 
                                    value={this.state.num5} maxLength={1}
                                    onChange={(e) => this.onChangeNum5(e)}
                                />
                                <input 
                                    type="text" 
                                    name="num6" 
                                    id="num6"
                                    className="form-input-field" 
                                    value={this.state.num6} maxLength={1}
                                    onChange={(e) => this.setState({ num6:e.target.value })}
                                />
                            </div>
                            <button 
                                type="button" 
                                className="login-button"
                                onClick={this.confirmotp}
                            >Submit</button>
                        </div>
                    )}
                    
                    
                    <hr style={{ 
                      border: '1px solid rgb(170 167 167)',
                      background: '#ddd',
                      margin: '33px 0',
                    }}/>
                    <div className="d-flex">
                      <span>Already have an account?</span> &nbsp;&nbsp;
                      <a href="/Login">Log in instead</a>
                    </div>
                    <div className="d-flex">
                      <span>Are you a founder looking to raise funds?</span> &nbsp;&nbsp;
                      <a href="/FundRaiseRegistration">Apply Here</a>
                    </div>
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Signup;
