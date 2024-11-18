
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';
import $ from 'jquery';

class MobileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      have_any_android_app_startup:'',
      app_name_details:'',
      have_ios_app:'',
      ios_name_details:'',
      founder_id:'',
      loading:false,
      valueispresent:false,
      processtype:'',
    }
  }
  componentDidMount() {
    if(localStorage.getItem('founder_id')) {
      this.setState({founder_id:localStorage.getItem('founder_id')});
      let id = localStorage.getItem('founder_id');
      this.getData(id);
    }
    $('#selected-field').focus();
    this.props.check(1);
  }
  getData = (id) => {
    let params = {
      founder_id: id
    }
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          have_any_android_app_startup:result.data[0].have_any_android_app_startup,
          app_name_details:result.data[0].app_name_details,
          have_ios_app:result.data[0].have_ios_app,
          ios_name_details:result.data[0].ios_name_details,
        });
        if(result.data[0].have_any_android_app_startup) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }
  updatefounder = () => {
    let params={
      have_any_android_app_startup:this.state.have_any_android_app_startup,
      app_name_details:this.state.app_name_details,
      have_ios_app:this.state.have_ios_app,
      ios_name_details:this.state.ios_name_details,
      founder_id: this.state.founder_id,
      no:4,
      main_founder_id:localStorage.getItem('founder_id'),
      f4_status:this.state.processtype=='saveandproceed'?'success':'new',
    }
    this.setState({loading:true});
    Bridge.founder.updatefounder(params).then((result) => {
      if (result.status==1) {
        this.setState({ loading: false,valueispresent:true },() => this.getData(this.state.founder_id));
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Mobile app data is updated successfully.',6);
        } else {
          message.success('Mobile app data is updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({loading:false});
      }
    });
  }
  changeStatus = (param) => {
    this.setState({
      have_any_android_app_startup: param,
    });
  }
  changeStatus1 = (param) => {
    this.setState({
      have_ios_app: param,
    });
  }
  saveandproceed=()=>{
    if(!this.state.have_any_android_app_startup) {
      message.warning('Please select that you have an android app or not.');
      return;
    } else if(!this.state.have_ios_app) {
      message.warning('Please select that you have an android app or not.');
      return;
    } 
    if(this.state.have_any_android_app_startup == 'Yes') {
      if(!this.state.app_name_details) {
        message.warning('Invalid Android app name');
        return;
      }
    }
    if(this.state.have_ios_app == 'Yes') {
      if(!this.state.ios_name_details) {
        message.warning('Invalid IOS app name');
        return;
      }
    }
    // this.props.check();
    this.setState({processtype:'saveandproceed'},()=>this.updatefounder());
  }
  save=()=>{
    this.setState({processtype:'save'},()=>this.updatefounder());
  }
  next=()=>{
    this.setState({processtype:'next'},()=>this.updatefounder());
  }
  prev=()=>{
    this.setState({processtype:'prev'},()=>this.updatefounder());
  }
  render() {
    let active = (this.state.have_any_android_app_startup && this.state.have_ios_app && this.state.valueispresent==true) ? false : true;
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
                            position: 'relative',
                            paddingRight: 10,
                          }}
                          >Mobile App</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && 
                        (!this.state.have_any_android_app_startup
                          || !this.state.have_ios_app)) &&(
                        <div className='error-div'>
                          <div className='error-icon'>
                            <i className='bx bxs-error'></i>
                          </div>
                          <ul>
                            {!this.state.have_any_android_app_startup &&(
                              <li>
                                <span>Please select the field do you have Android app.</span>
                              </li>
                            )}
                            {!this.state.have_ios_app &&(
                              <li>
                                <span>Please select the field do you have IOS app.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                          <div className="form-group ">
                            <label for="">Do you have an android app for your Startup?<span className="text-danger">*</span></label>
                            <div className='button-grp'> 
                              <button 
                              className={this.state.have_any_android_app_startup=='Yes' && 'active'} 
                              onClick={() => this.changeStatus('Yes')}
                              >Yes</button>
                              <button 
                              className={this.state.have_any_android_app_startup=='No' && 'active'} 
                              onClick={() => this.changeStatus('No')}
                              >No</button>
                            </div>
                        </div>
                            <div className="form-group">
                              <label for="">Give details (App Name, Downloads, Rating, Active User, etc.)</label>
                              <input 
                                type="text" 
                                name='app_name_details'
                                value={this.state.app_name_details}
                                onChange={(e) => this.setState({app_name_details: e.target.value}) }
                              />
                            </div>
                            <div className="form-group ">
                                <label for="">Do you have an IOS app for your Startup?</label>
                                <div className='button-grp'> 
                                  <button 
                                  className={this.state.have_ios_app=='Yes' && 'active'} 
                                  onClick={() => this.changeStatus1('Yes')}
                                  >Yes</button>
                                  <button 
                                  className={this.state.have_ios_app=='No' && 'active'} 
                                  onClick={() => this.changeStatus1('No')}
                                  >No</button>
                                </div>
                            </div> 
                            <div className="form-group">
                              <label for="">Give details (app name, downloads, rating, active user, ect.)</label>
                              <input 
                                type="text" 
                                name='ios_name_details'
                                value={this.state.ios_name_details}
                                onChange={(e) => this.setState({ios_name_details: e.target.value}) }
                              />
                            </div>
                            <div className="form-group d-flex justify-content-between">
                              <div className='arrow-buttons'>
                                <button
                                style={{ 
                                  position:'relative',
                                  left:-20,
                                  background: '#fff',
                                  border: '1px solid #29176f',
                                  color: '#29176f',
                                }} 
                                onClick={this.prev}
                                class="submit-button"><i className='bx bx-chevron-left'></i></button>
                                <button
                                style={{ 
                                  position:'relative',
                                  left:-20,
                                  background: active==false ? '#fff' : '#fff',
                                  border: active==false ? '1px solid #29176f' : '1px solid #29176f',
                                  color: active==false ? '#29176f' : '#29176f',
                                }} 
                                onClick={this.next}
                                class="submit-button">
                                  <i className='bx bx-chevron-right'></i>
                                </button>
                              </div>
                              <div>
                                <button 
                                  style={{ width:116,marginRight:13 }}
                                  class="submit-button" 
                                  onClick={() => this.save()}
                                >Save</button>
                                <button 
                                  style={{ width:190 }}
                                  class="submit-button" 
                                  onClick={() => this.saveandproceed()}
                                >Validate & Proceed</button>
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
export default MobileApp;