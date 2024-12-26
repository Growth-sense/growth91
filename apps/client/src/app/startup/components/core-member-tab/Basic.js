
import React, { Component } from 'react';
import { message, Spin, Radio, Space } from 'antd';
import Bridge from '../../../../constants/Bridge';
import Header from '../custom/Header';
 
class Basic extends Component {

  constructor(props) {
    super(props);
    this.state = {

      email:'',
      startup_name:'',
      your_email:'',
      your_name:'',
      designation:'',

      loading: false,
      valueispresent:false,
      processtype:'',
    }
  }

  componentDidMount() {
    if(localStorage.getItem('founder_id'))  {
    this.setState({
        valueispresent:true
    },()=>this.getData());
    }
  }
    
  //get form data
  getData = () => {
    let params = {
    founder_id: localStorage.getItem('founder_id')
    }
    Bridge.startup_form.get_startup_details(params).then((result) => {
    if (result.status == 1) {
      this.setState({
        email:result.data[0].email,
        startup_name:result.data[0].startup_name,
        your_email:result.data[0].your_email,
        your_name:result.data[0].your_name,
        designation:result.data[0].designation,
      });
      if(result.data[0].email!=''&&result.data[0].startup_name!=''&&
      result.data[0].your_email!=''&&result.data[0].your_name){
        this.setState({valueispresent:true});
      }else{
        this.setState({valueispresent:false});
      }
    } 
    });
  }

  checkEmail = (email) => {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
    message.warning('Please provide a valid email address',4);
      return false;
    } else {
      return true;
    }
  }

  // update
  update_startup_founder = () => {
    let params={
      email:this.state.email,
      startup_name:this.state.startup_name,
      your_email:this.state.your_email,
      your_name:this.state.your_name,
      designation:this.state.designation,
      founder_id:localStorage.getItem('founder_id'),
      num:1,
    }
    // console.log('params',params);
    this.setState({ loading: true });
    Bridge.startup_form.update_startup_founder(params).then((result) => {
      if(result.status==1) {
        message.success('Basic details are updated successfully.',6);
        this.setState({loading:false},()=>this.getData());
        if(this.state.processtype=='saveandproceed'){
          this.props.activate();
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  }

  saveandproceed=()=>{
    if(!this.state.email) {
      message.warning('Invalid email address.',4);
      return;
    } else {
      let d = this.checkEmail(this.state.email);
      if(d == false) {
        return;
      }
    } 
    if(!this.state.startup_name) {
      message.warning('Invalid startup name.',4);
      return;
    } else if(!this.state.your_email) {
      message.warning('Please enter your email address.',4);
      return;
    }  else
    if(!this.state.your_name) {
      message.warning('Please enter valid your name.',4);
      return;
    }  else
    if(!this.state.designation) {
      message.warning('Please enter your designation.',4);
      return;
    } 
    this.setState({processtype:'saveandproceed'});
    this.update_startup_founder();
  }

  save=()=>{
    this.setState({processtype:'save'});
    this.update_startup_founder();
  }

  render() {
    return (
      <div>
         <section className="StepForm-section">
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                       <Header title='Basic Details' />

                      {((this.props.error=='0') && (
                        !this.state.email || 
                        !this.state.startup_name ||
                      !this.state.your_email || 
                      !this.state.your_name || 
                      !this.state.designation)) &&(
                        <div className='error-div'>
                          <div className='error-icon'>
                            <i className='bx bxs-error'></i>
                          </div>
                          <ul>
                            {!this.state.email &&(
                              <li>
                                <span>Email is required.</span>
                              </li>
                            )}
                            {!this.state.startup_name &&(
                              <li>
                                <span>Name Of Startup is required.</span>
                              </li>
                            )}
                            {!this.state.your_email &&(
                              <li>
                                <span>Your email is required.</span>
                              </li>
                            )}
                            {!this.state.your_name && (
                              <li>
                                <span>Your name is required.</span>
                              </li>
                            )}
                            {!this.state.designation && (
                              <li>
                                <span>Please select designation.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                          <div className="form-group">
                              <label for="">Enter Your Email<span className="text-danger">*</span></label>
                              <input 
                                type="email" 
                                placeholder="Enter your Email"
                                name='email'
                                value={this.state.email}
                                onChange={(e) => this.setState({email: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Name Of Startup <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Enter your Startup name"
                                name='startup_name'
                                value={this.state.startup_name}
                                onChange={(e) => this.setState({startup_name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Your Email<span className="text-danger">*</span></label>
                              <input 
                                type="email" 
                                placeholder="Enter your Email"
                                name='your_email'
                                value={this.state.your_email}
                                onChange={(e) => this.setState({your_email: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Your Name<span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Enter Your Name"
                                name='your_name'
                                value={this.state.your_name}
                                onChange={(e) => this.setState({your_name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Choose your designation<span className="text-danger">*</span></label>
                              <Radio.Group 
                                onChange={(e)=>this.setState({designation:e.target.value})} 
                                value={this.state.designation}
                                style={{fontSize:15}}
                              >
                                <Space direction="vertical">
                                  <Radio value='Founder'>Founder</Radio>
                                  <Radio value='Core Team Member'>Core Team Member</Radio>
                                  <Radio value='Advisor'>Advisor</Radio>
                                </Space>
                              </Radio.Group>
                            </div>
                            <br/>
                             
                            <div className="form-group d-flex justify-content-between">
                                <div className='arrow-buttons'>
                                  <button
                                    style={{ 
                                      position:'relative',
                                      left:-20,
                                      background: this.state.valueispresent==true ? '#fff' : '#ddd',
                                      border: this.state.valueispresent==true ? '1px solid #29176f' : '1px solid #ddd',
                                      color: this.state.valueispresent==true ? '#29176f' : '#959595',
                                    }} 
                                    onClick={this.props.next}
                                    disabled={this.state.valueispresent==true ? false : true}
                                    class="submit-button"
                                  >
                                    <i className='bx bx-chevron-right'></i>
                                  </button>
                                </div>
                                <div>
                                  <button 
                                    style={{ width:190,marginRight:13 }}
                                    class="submit-button" 
                                    onClick={() => this.saveandproceed()}
                                  >Save & Proceed</button>
                                  <button 
                                    style={{ width:116 }}
                                    class="submit-button" 
                                    onClick={() => this.save()}
                                  >Save</button>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </Spin>
          </section>
       </div>
    )
  }
}

export default Basic;
