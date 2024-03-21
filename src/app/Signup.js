
import React, { Component } from 'react';
import WebHeader from './common/WebHeader';
import WebFooter from './common/WebFooter';
import { message, Spin, Select, Radio } from 'antd';
import Bridge from './constants/Bridge';
//for firebase google authentication
//to use auth
import { authentication } from "./firebase-config";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const { Option } = Select;

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      loading: false,
      screen1: true,
      screen2: false,
      screen3: false,
      nationality:'',
      membertype:'regular',
    }
  }
  register = () => {
    if(!this.state.first_name) {
      message.error('Please enter your first name');
      return;
    }else if(!this.state.last_name) {
      message.error('Please enter your last name.');
      return;
    } else if(!this.state.email) {
      message.error('Please enter your email.');
      return;
    } else if(!this.state.nationality) {
      message.error('Invalid nationality.');
      return;
    }
    let params={
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      email: this.state.email,
      nationality: this.state.nationality,
      membership_type:this.state.membertype,
    }
    this.setState({loading:true});
    Bridge.investor.register(params).then((result) => {
      if (result.status == 1) {
        // message.success(result.message);
        this.setState({
          loading: false,
          // first_name: '',
          // middle_name: '',
          // last_name: '',
          // email: '',
        });
        if(result.data) {
          localStorage.setItem('reg_id', result.data);
          localStorage.setItem('member_type',this.state.membertype);
          window.location.assign('/investor-registration');
        }
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  }

  handleChange  = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //google login function
signInWithGoogle=()=>
   {
    const provider=new GoogleAuthProvider();
    signInWithPopup(authentication,provider)
    .then((re)=>{console.log(re)})
    .catch((err)=>{console.log(err)});
   }
   //end function

  handleChangeSelect = (e) => {
    this.setState({
      nationality:e.target.value,
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
    } else if(!this.state.membertype) {
      message.warning('Please select member typ.');
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
  onChange = (e) => {
    this.setState({membertype:e.target.value})
  }

  render() {
    return (
      <div>
        <WebHeader />
        <section className="signup-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <Spin spinning={this.state.loading}>
                  <div className="login-form">
                    <h3 className="text-center" fetchpriority="high">Get Started</h3>
                    {this.state.screen1 == true && (
                      <>
                        <div className="row">
                          <div className="col-lg-6">
                            <label>First Name <span className='text-danger'>*</span></label>
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
                            <label>Last Name <span className='text-danger'>*</span></label>
                            <input 
                              type="text" 
                              name="last_name" 
                              className="form-input-field" 
                              value={this.state.last_name} 
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <label>Email <span className='text-danger'>*</span></label>
                            <input 
                              type="email" 
                              name="email" 
                              className="form-input-field" 
                              value={this.state.email} 
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <label>MemberShip Type <span className='text-danger'>*</span></label>
                            <Radio.Group 
                              onChange={this.onChange} 
                              value={this.state.membertype}
                            >
                              <Radio value='regular'>Regular Member</Radio>
                              <Radio value='premium'>Premium Member</Radio>
                            </Radio.Group>
                          </div>
                          <br/>
                        </div>
                        <button 
                        style={{marginTop:20}}
                        onClick={this.showsecondscreen} type="button" className="login-button">Sign up</button>
                      </>
                    )}
                    {this.state.screen2==true && (
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
                              <option value='Indian Citizen'>Indian Citizen</option>
                              <option value='International'>International</option>
                              <option value='NRI With NRO'>NRI With NRO</option>
                            </select>
                          </div>
                        </div>
                        <button onClick={this.register} type="button" className="login-button">Next</button>
                      </>
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
                      <a href="/founder-registration">Apply Here</a>
                    </div>
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </section>
        <WebFooter />
      </div>
    )
  }
}

export default Signup;
