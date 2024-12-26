
import React, { Component } from 'react';
import { message, Spin, Radio, Space } from 'antd';
import Bridge from '../../../constants/Bridge';
import Header from '../custom/Header';
 
class Basic extends Component {

  constructor(props) {
    super(props);
    this.state = {

      email:'',
      startup_name:'',
      your_email:'',
      your_name:'',
      designation:'Founder',

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
         <section className="StepForm-section"
         style={{
              marginTop:0,
              padding:0,
              border:'none',
              borderRadius:0, 
              boxShadow:'none',
         }}
         >
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                       <Header title='Self Evaluation' />

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
                          </ul>
                        </div>
                      )}
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">Mobile Number</label>
                              <input type="number"value={this.state.mobile}
                              onWheel={() => document.activeElement.blur()}
                                onChange={(e)=>this.setState({mobile:e.target.value})} />
                            </div>
                            <div className="form-group">
                              <label for="">LinkedIn Profile URL <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Enter your Startup name"
                                name='linkedin_url'
                                value={this.state.linkedin_url}
                                onChange={(e) => this.setState({linkedin_url: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Designation/Role <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder=""
                                name='designation'
                                value={this.state.designation}
                                onChange={(e) => this.setState({designation: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Your Name<span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder="Time Commitment"
                                name='time_commitment'
                                value={this.state.time_commitment}
                                onChange={(e) => this.setState({time_commitment: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Education, Institute, Year <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder=""
                                name='education_institute'
                                value={this.state.education_institute}
                                onChange={(e) => this.setState({education_institute: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Year of Experience <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                placeholder=""
                                name='year_of_experience'
                                value={this.state.year_of_experience}
                                onChange={(e) => this.setState({year_of_experience: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Previous Employment Briefs <span className="text-danger">*</span></label>
                          
                              <textarea 
                              id="" 
                              cols="30"
                              rows="6"
                              value={this.state.previous_employment_briefs}
                              onChange={(e) => this.setState({previous_employment_briefs:e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Brief Family Background <span className="text-danger">*</span></label>
                               <textarea 
                              id="" 
                              cols="30"
                              rows="6"
                              value={this.state.family_background}
                              onChange={(e) => this.setState({family_background:e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Any other specific information <span className="text-danger">*</span></label>
                               <textarea 
                              id="" 
                              cols="30"
                              rows="6"
                              value={this.state.other_specific_information}
                              onChange={(e) => this.setState({other_specific_information:e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Date of Joining Business <span className="text-danger">*</span></label>
                              <input 
                                type="date" 
                                placeholder=""
                                name='date_of_joining_business'
                                value={this.state.date_of_joining_business}
                                onChange={(e) => this.setState({date_of_joining_business: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Your Strengths <span className="text-danger">*</span></label>
                              <textarea 
                              id="" 
                              cols="30"
                              rows="6"
                              value={this.state.your_strengths}
                              onChange={(e) => this.setState({your_strengths:e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Your Weakness <span className="text-danger">*</span></label>
                               <textarea 
                              id="" 
                              cols="30"
                              rows="6"
                              value={this.state.your_weekness}
                              onChange={(e) => this.setState({your_weekness:e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">What are your dreams <span className="text-danger">*</span></label>
                              <textarea 
                              id="" 
                              cols="30"
                              rows="6"
                              value={this.state.your_dreams}
                              onChange={(e) => this.setState({your_dreams:e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">What are your long term vision? <span className="text-danger">*</span></label>
                              <textarea 
                              id="" 
                              cols="30"
                              rows="6"
                              value={this.state.long_term_vision}
                              onChange={(e) => this.setState({long_term_vision:e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">What are your short term vision/goal? <span className="text-danger">*</span></label>
                              <textarea 
                                id="" 
                                cols="30"
                                rows="6"
                                value={this.state.short_term_vision}
                                onChange={(e) => this.setState({short_term_vision:e.target.value}) }
                              ></textarea>
                            </div>
                            <br/>
                             
                            <div className="form-group d-flex justify-content-between">
                                <div className='arrow-buttons'>
                                  <button
                                    style={{ 
                                      position:'relative',
                                      left:-20,
                                      background: '#fff',
                                      border: '1px solid #29176f',
                                      color:'#29176f',
                                    }} 
                                    onClick={this.props.next}
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
