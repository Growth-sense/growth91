
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../../constants/Bridge';

import $ from 'jquery';
import "./BasicDetais.css";
class BasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      startup_name:'',
      primary_contact_person_name:'',
      primary_contact_person_mobile:'',
      primary_contact_person_email:'',
      loading: false,
      valueispresent:false,
      processtype:'',
      files: []
    }
  }
  componentDidMount() {
    console.log(this.props.data);
    if (this.props.id) {
      this.setstate = {
        email:'',
        startup_name:'',
        primary_contact_person_name:'',
        primary_contact_person_mobile:'',
        primary_contact_person_email:'',
        loading: false,
        valueispresent:false,
        processtype:'',
        files: []
      }
      let id = this.props.id;
      this.getData(id);
    }
    console.log(this.props.tab);
    $('#selected-field').focus();
    this.props.check(1);
  }
  //get form data
  getData = (id) => {
    let params = {
      founder_id:id
    }
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          email:result.data[0].email,
          startup_name:result.data[0].startup_name,
          primary_contact_person_name:result.data[0].primary_contact_person_name,
          primary_contact_person_mobile:result.data[0].primary_contact_person_mobile,
          primary_contact_person_email:result.data[0].primary_contact_person_email,
        });
        if(result.data[0].email!=''&&result.data[0].startup_name!=''&&result.data[0].primary_contact_person_name!=''&&result.data[0].primary_contact_person_mobile){
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
  // register
  register=()=>{
    let params={
      email:this.state.email,
      startup_name:this.state.startup_name,
      primary_contact_person_name:this.state.primary_contact_person_name,
      primary_contact_person_mobile:this.state.primary_contact_person_mobile,
      primary_contact_person_email:this.state.primary_contact_person_email,
      main_founder_id:localStorage.getItem('founder_id'),
      f1_status:this.state.processtype=='saveandproceed'?'success':'new',
    }
    this.setState({ loading: true });
    Bridge.founder.registernewfounder(params).then((result) => {
      if (result.status==1) {
        this.props.check();
        let id=localStorage.getItem('getData');
        this.setState({loading:false},()=>this.getData(id));
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Basic details are updated successfully.',6);
        } else {
          message.success('Basic details are updated successfully.',6);
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
    } else if(!this.state.primary_contact_person_name) {
      message.warning('Please enter contact person name.',4);
      return;
    }  
    if(this.state.primary_contact_person_mobile.length!=10) {
      message.warning('Please enter valid contact person mobile number.',4);
      return;
    }  
    if(!this.state.primary_contact_person_email) {
      message.warning('Please enter contact person email.',4);
      return;
    } else {
      let d = this.checkEmail(this.state.primary_contact_person_email);
      if(d == false) {
        return;
      }
    }
    // this.props.check(1);
    this.setState({processtype:'saveandproceed'},()=>this.register());
  }
  save=()=>{
    this.setState({processtype:'save'},()=>this.register());
  }
  next=()=>{
    this.setState({processtype:'next'},()=>this.register());
  }
  fileSelectedHandler = (e) => {
    this.setState({ files: [...this.state.files, ...e.target.files] })
  }

  render() {
    console.log(this.state);
    return (
      <div>
         <section className="StepForm-section">
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                       
                      <div className="line-seperator">
                        <div style={{
                          position: 'absolute',
                          top: -10,
                          background: '#fff',
                          paddingRight: 16,
                        }}>
                          <span
                          style={{
                            background: '#fff',
                            width: 119,
                            height: 20,
                            zIndex: 4,
                            position: 'absolute',
                            paddingRight: 10,
                          }}
                          >Basic Details</span>
                        </div>
                        <hr/>
                      </div>

                      {((this.props.error=='0') && (!this.state.email
                      || !this.state.startup_name ||
                      !this.state.primary_contact_person_name || !this.state.primary_contact_person_mobile)) &&(
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
                            {!this.state.primary_contact_person_name &&(
                              <li>
                                <span>Primary Contact Person(Name) is required.</span>
                              </li>
                            )}
                            {!this.state.primary_contact_person_mobile && (
                              <li>
                                <span>Primary Contact Person (Mobile) is required.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                          <div className="form-group input-rezized">
                              <label for="">Enter Your Email<span className="text-danger">*</span></label>
                              <input  disabled
                                type="email" 
                                placeholder="Enter your Email"
                                name='email'
                                value={this.props.data.email}
                                id="selected-field"
                                onChange={(e) => this.setState({email: e.target.value}) }//.
                              />
                            </div>
                            <div className="form-group input-rezized">
                              <label for="">Name Of Startup <span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                placeholder="Enter your Startup name"
                                name='startup_name'
                                value={this.props.data.startup_name}
                                onChange={(e) => this.setState({startup_name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group input-rezized">
                              <label for="">Primary Contact Person(Name)<span className="text-danger">*</span></label>
                              <input  disabled
                                  type="text" 
                                  placeholder="Enter Name"
                                  name='primary_contact_person_name'
                                  value={this.props.data.primary_contact_person_name}

                                  onChange={(e) => this.setState({primary_contact_person_name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group input-rezized">
                              <label for="">Primary Contact Person (Mobile)<span className="text-danger">*</span></label>
                              <input  disabled
                                type="number" 
                                placeholder="Enter Mobile"
                                name='primary_contact_person_mobile'
                                value={this.props.data.primary_contact_person_mobile}
                                onWheel={() => document.activeElement.blur()}
                                onChange={(e) => this.setState({primary_contact_person_mobile: e.target.value}) }
                              />
                            </div>
                            <div className="form-group input-rezized">
                              <label for="">Primary Contact Person (Email) <span className="text-danger">*</span></label>
                              <input  disabled
                                type="email" 
                                placeholder="Enter Email "
                                name='primary_contact_person_email'
                                value={this.props.data.primary_contact_person_email}
                                onChange={(e) => this.setState({primary_contact_person_email: e.target.value}) }
                              />
                            </div>
                            {/* <input  disabledtype="file" multiple onChange={this.fileSelectedHandler} /> */}
                            <div className="form-group d-flex justify-content-between">
                              <div className='arrow-buttons'>
                                <button 
                                style={{ 
                                  position:'relative',
                                  left:-20,
                                  background: this.state.valueispresent==true ? '#fff' : '#fff',
                                  border: this.state.valueispresent==true ? '1px solid #29176f' : '1px solid #29176f',
                                  color: this.state.valueispresent==true ? '#29176f' : '#29176f',
                                }} 
                                onClick={this.next}
                                class="submit-button">
                                  <i className='bx bx-chevron-right'></i>
                                </button>
                              </div>
                              <div>
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
export default BasicDetails;