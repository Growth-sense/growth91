
import React, { Component } from 'react';
import { message, Spin, DatePicker } from 'antd';
import Bridge from '../../../constants/Bridge';
import Header from '../custom/Header';
import moment from 'moment';
 
class Otherassesment extends Component {

  constructor(props) {
    super(props);
    this.state = {

      mobile_number:'',
      founder_linkedin_url:'',
      founder_designation:'',
      founder_time_commitment:'',
      founder_education_year:'',
      founder_year_of_experience:'',
      founder_previour_employment_briefs:'',
      founder_brief_familty_background:'',
      founder_any_specific_info:'',
      founder_date_of_joining:'',
      founder_strength:'',
      founder_weakness:'',
      founder_dreams:'',
      founder_long_term_vision:'',
      founder_short_term_vision:'',

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
        mobile_number:result.data[0].mobile_number,
        founder_linkedin_url:result.data[0].founder_linkedin_url,
        founder_designation:result.data[0].founder_designation,
        founder_time_commitment:result.data[0].founder_time_commitment,
        founder_education_year:result.data[0].founder_education_year,
        founder_year_of_experience:result.data[0].founder_year_of_experience,
        founder_previour_employment_briefs:result.data[0].founder_previour_employment_briefs,
        founder_brief_familty_background:result.data[0].founder_brief_familty_background,
        founder_any_specific_info:result.data[0].founder_any_specific_info,
        founder_date_of_joining:moment(result.data[0].founder_date_of_joining),
        founder_strength:result.data[0].founder_strength,
        founder_weakness:result.data[0].founder_weakness,
        founder_dreams:result.data[0].founder_dreams,
        founder_long_term_vision:result.data[0].founder_long_term_vision,
        founder_short_term_vision:result.data[0].founder_short_term_vision,
      });
      // if(result.data[0].email!=''&&result.data[0].startup_name!=''&&
      // result.data[0].your_email!=''&&result.data[0].your_name){
      //   this.setState({valueispresent:true});
      // }else{
      //   this.setState({valueispresent:false});
      // }
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
      mobile_number:this.state.mobile_number,
      founder_linkedin_url:this.state.founder_linkedin_url,
      founder_designation:this.state.founder_designation,
      founder_time_commitment:this.state.founder_time_commitment,
      founder_education_year:this.state.founder_education_year,
      founder_year_of_experience:this.state.founder_year_of_experience,
      founder_previour_employment_briefs:this.state.founder_previour_employment_briefs,
      founder_brief_familty_background:this.state.founder_brief_familty_background,
      founder_any_specific_info:this.state.founder_any_specific_info,
      founder_date_of_joining:this.state.founder_date_of_joining,
      founder_strength:this.state.founder_strength,
      founder_weakness:this.state.founder_weakness,
      founder_dreams:this.state.founder_dreams,
      founder_long_term_vision:this.state.founder_long_term_vision,
      founder_short_term_vision:this.state.founder_short_term_vision,
      founder_id:localStorage.getItem('founder_id'),
      num:2,
    }
    // console.log('params',params);
    this.setState({ loading: true });
    Bridge.startup_form.update_startup_founder(params).then((result) => {
      if(result.status==1) {
        message.success('Designation details are updated successfully.',6);
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
    if(this.state.mobile_number.length!=10){
      message.warning('Please enter the mobile number.');
      return;
    }
    if(!this.state.founder_linkedin_url){
      message.warning('Please enter the LinkedIn url.');
      return;
    }
    if(!this.state.founder_designation){
      message.warning('Please enter the deisgnation value.');
      return;
    }
    if(!this.state.founder_time_commitment){
      message.warning('Please enter the value of time Commitment.');
      return;
    }
    if(!this.state.founder_education_year){
      message.warning('Please enter the value of education year');
      return;
    }
    if(!this.state.founder_year_of_experience){
      message.warning('Please enter the value of year of experience.');
      return;
    }
    if(!this.state.founder_previour_employment_briefs){
      message.warning('Please enter the value of Previous employment briefs.');
      return;
    }
    if(!this.state.founder_brief_familty_background){
      message.warning('Please enter the description about family background.');
      return;
    }
    if(!this.state.founder_any_specific_info){
      message.warning('Please write here any specific info.');
      return;
    }
    if(!this.state.founder_date_of_joining){
      message.warning('Please select date of Joining.');
      return;
    }
    if(!this.state.founder_strength){
      message.warning('Please enter your strength.');
      return;
    }
    if(!this.state.founder_weakness){
      message.warning('Please enter  your weekness.');
      return;
    }
    if(!this.state.founder_dreams){
      message.warning('Please enter your dreams.');
      return;
    }
    if(!this.state.founder_long_term_vision){
      message.warning('Please enter the value of long term vision field,');
      return;
    }
    if(!this.state.founder_short_term_vision){
      message.warning('Please enter the value of short term vision field,');
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
         }}>
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                       <Header title='Other Assesment' />

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
                              <label for="">Mobile Number</label>
                              <input 
                              onWheel={() => document.activeElement.blur()}
                                type="number" 
                                name='mobile_number'
                                value={this.state.mobile_number}
                                onChange={(e) => this.setState({mobile_number: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">LinkedIn Profile URL<span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='founder_linkedin_url'
                                value={this.state.founder_linkedin_url}
                                onChange={(e) => this.setState({founder_linkedin_url: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Designation/Role<span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='founder_designation'
                                value={this.state.founder_designation}
                                onChange={(e) => this.setState({founder_designation: e.target.value}) }
                              />
                            </div>                            
                            <div className="form-group">
                              <label for="">Time Commitment<span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='founder_time_commitment'
                                value={this.state.founder_time_commitment}
                                onChange={(e) => this.setState({founder_time_commitment: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Education, Institute, Year<span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='founder_education_year'
                                value={this.state.founder_education_year}
                                onChange={(e) => this.setState({founder_education_year: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Years of Experience<span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='founder_year_of_experience'
                                value={this.state.founder_year_of_experience}
                                onChange={(e) => this.setState({founder_year_of_experience: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Previous employment briefs</label>
                              <input 
                                type="text" 
                                name='founder_previour_employment_briefs'
                                value={this.state.founder_previour_employment_briefs}
                                onChange={(e) => this.setState({founder_previour_employment_briefs: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Brief family background</label>
                              <input 
                                type="text" 
                                name='founder_brief_familty_background'
                                value={this.state.founder_brief_familty_background}
                                onChange={(e) => this.setState({founder_brief_familty_background: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Any other specific information</label>
                              <input 
                                type="text" 
                                name='founder_any_specific_info'
                                value={this.state.founder_any_specific_info}
                                onChange={(e) => this.setState({founder_any_specific_info: e.target.value}) }
                              />
                            </div>
                            <div className="form-group step-form-date-input">
                              <label for="">Date of Joining the business<span className="text-danger">*</span></label>
                             
                              <DatePicker
                                value={this.state.founder_date_of_joining}
                                onChange={(date, dateString) => {
                                  this.setState({ founder_date_of_joining:date }) 
                                }}
                                disabledDate={this.disabledDate}
                                format={'DD-MM-YYYY'}
                                style={{
                                  width:'100%', 
                                  marginBottom:30,
                                }}
                              />
                            </div> 
                            <div className="form-group">
                              <label for="">Your Strength</label>
                              <input 
                                type="text" 
                                name='founder_strength'
                                value={this.state.founder_strength}
                                onChange={(e) => this.setState({founder_strength: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Your Weakness</label>
                              <input 
                                type="text" 
                                name='founder_weakness'
                                value={this.founder_weakness}
                                onChange={(e) => this.setState({founder_weakness: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">What are your vision?</label>
                              <input 
                                type="text" 
                                name='founder_dreams'
                                value={this.state.founder_dreams}
                                onChange={(e) => this.setState({founder_dreams: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">What is your long-term vision?</label>
                              <input 
                                type="text" 
                                name='founder_long_term_vision'
                                value={this.state.founder_long_term_vision}
                                onChange={(e) => this.setState({founder_long_term_vision: e.target.value}) }
                              />
                            </div>
                            </div>
                            <div className="form-group">
                              <label for="">What is your short-term vision/goal?</label>
                              <input 
                                type="text" 
                                name='founder_short_term_vision'
                                value={this.state.founder_short_term_vision}
                                onChange={(e) => this.setState({founder_short_term_vision: e.target.value}) }
                              />
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
            </Spin>
          </section>
       </div>
    )
  }
}

export default Otherassesment;
