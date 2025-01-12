
import React, { Component } from 'react';
import { message, Spin, Radio, Space } from 'antd';
import Bridge from '../../../constants/Bridge';
import Header from '../custom/Header';
 
class Step1 extends Component {

  constructor(props) {
    super(props);
    this.state = {

      leadership:'',
      leadership_support_your_rating:'',
      understanding_of_finance:'',
      ufinance_support_your_rating:'',
      understanding_of_hr:'',
      uhr_support_your_rating:'',
      understanding_of_low_and_statutory:'',
      ulow_support_your_rating:'',
      passion_for_business:'',
      passion_for_business_support_rating:'',
      passion_for_current_project:'',
      passion_for_current_project_support_rating:'',
      experimental_mindset:'',
      experimental_mindset_support_rating:'',
      out_of_box_thinking:'',
      out_of_box_thinking_support_rating:'',
      problem_solving_skills:'',
      problem_solving_skills_support_rating:'',
      networking_business:'',
      networking_business_support_rating:'',
      networking_social:'',
      networking_social_support_rating:'',
      other_memebers_in_founding_core_team:'',

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
      console.log('result',result.data[0]);
      this.setState({
        leadership:result.data[0].leadership,
        leadership_support_your_rating:result.data[0].leadership_support_your_rating,
        understanding_of_finance:result.data[0].understanding_of_finance,
        ufinance_support_your_rating:result.data[0].ufinance_support_your_rating,
        understanding_of_hr:result.data[0].understanding_of_hr,
        uhr_support_your_rating:result.data[0].uhr_support_your_rating,
        understanding_of_low_and_statutory:result.data[0].understanding_of_low_and_statutory,
        ulow_support_your_rating:result.data[0].ulow_support_your_rating,
        passion_for_business:result.data[0].passion_for_business,
        passion_for_business_support_rating:result.data[0].passion_for_business_support_rating,
        passion_for_current_project:result.data[0].passion_for_current_project,
        passion_for_current_project_support_rating:result.data[0].passion_for_current_project_support_rating,
        experimental_mindset:result.data[0].experimental_mindset,
        experimental_mindset_support_rating:result.data[0].experimental_mindset_support_rating,
        out_of_box_thinking:result.data[0].out_of_box_thinking,
        out_of_box_thinking_support_rating:result.data[0].out_of_box_thinking_support_rating,
        problem_solving_skills:result.data[0].problem_solving_skills,
        problem_solving_skills_support_rating:result.data[0].problem_solving_skills_support_rating,
        networking_business:result.data[0].networking_business,
        networking_business_support_rating:result.data[0].networking_business_support_rating,
        networking_social:result.data[0].networking_social,
        networking_social_support_rating:result.data[0].networking_social_support_rating,
        other_memebers_in_founding_core_team:result.data[0].other_memebers_in_founding_core_team,
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
      leadership:this.state.leadership,
      leadership_support_your_rating:this.state.leadership_support_your_rating,
      understanding_of_finance:this.state.understanding_of_finance,
      ufinance_support_your_rating:this.state.ufinance_support_your_rating,
      understanding_of_hr:this.state.understanding_of_hr,
      uhr_support_your_rating:this.state.uhr_support_your_rating,
      understanding_of_low_and_statutory:this.state.understanding_of_low_and_statutory,
      ulow_support_your_rating:this.state.ulow_support_your_rating,
      passion_for_business:this.state.passion_for_business,
      passion_for_business_support_rating:this.state.passion_for_business_support_rating,
      passion_for_current_project:this.state.passion_for_current_project,
      passion_for_current_project_support_rating:this.state.passion_for_current_project_support_rating,
      experimental_mindset:this.state.experimental_mindset,
      experimental_mindset_support_rating:this.state.experimental_mindset_support_rating,
      out_of_box_thinking:this.state.out_of_box_thinking,
      out_of_box_thinking_support_rating:this.state.out_of_box_thinking_support_rating,
      problem_solving_skills:this.state.problem_solving_skills,
      problem_solving_skills_support_rating:this.state.problem_solving_skills_support_rating,
      networking_business:this.state.networking_business,
      networking_business_support_rating:this.state.networking_business_support_rating,
      networking_social:this.state.networking_social,
      networking_social_support_rating:this.state.networking_social_support_rating,
      other_memebers_in_founding_core_team:this.state.other_memebers_in_founding_core_team,
      founder_id:localStorage.getItem('founder_id'),
      num:3,
    }
    // console.log('params',params);
    this.setState({ loading: true });
    Bridge.startup_form.update_startup_founder(params).then((result) => {
      if(result.status==1) {
        message.success('Self Evalution details are updated successfully.',6);
        this.setState({loading:false},()=>this.getData());
        if(this.state.other_memebers_in_founding_core_team=='Yes'){
          this.props.activate();
        } else {
          if(this.state.processtype=='saveandproceed'){
            this.props.activate2();
          }
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  }

  saveandproceed=()=>{

    if(!this.state.leadership){
      message.warning('Please give rating for leardership field.');
      return;
    }
    if(!this.state.understanding_of_finance){
      message.warning('Please give rating for Understanding of Finance field.');
      return;
    }
    if(!this.state.understanding_of_hr){
      message.warning('Please give rating for Understanding of HR field.');
      return;
    }
    if(!this.state.understanding_of_low_and_statutory){
      message.warning('Please give rating for Understanding of Law and Statutory Compliances field.');
      return;
    }
    if(!this.state.passion_for_business){
      message.warning('Please give rating for Understanding of Law and Statutory Compliances field.');
      return;
    }
    if(!this.state.passion_for_current_project){
      message.warning('Please give rating for Passion for current project field.');
      return;
      return;
    }
    if(!this.state.experimental_mindset){
      message.warning('Please give rating for Experimental Mindset field.');
      return;
    }
    if(!this.state.out_of_box_thinking){
      message.warning('Please give rating for Out of Box Thinking field.');
      return;
    }
    if(!this.state.problem_solving_skills){
      message.warning('Please give rating for Problem Solving Skills field.');
      return;
    }
    if(!this.state.networking_business){
      message.warning('Please give rating for Networking Business field.');
      return;
    }
    if(!this.state.networking_social){
      message.warning('Please give rating for Networking Social field.');
      return;
    }
    if(!this.state.other_memebers_in_founding_core_team){
      message.warning('Please select you have an core team members or not.');
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

    const plainOptions = ['1','2','3','4','5','6','7','8','9','10'];

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
                       <Header title='Core Team Member' />

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
                          <div className="form-group" style={{marginBottom:20}}>
                            <label for="" style={{marginBottom:14}}>Member Name<span className="text-danger">*</span></label>
                            <input 
                              type="text" 
                              name='member_name'
                              value={this.state.member_name}
                              onChange={(e) => this.setState({member_name: e.target.value}) }
                            />
                          </div> 
                        <div className="form-group" style={{marginBottom:20}}>
                          <label for="" style={{marginBottom:14}}>Leadership<span className="text-danger">*</span></label>
                          <Radio.Group 
                            options={plainOptions} 
                            onChange={(e)=>this.setState({leadership:e.target.value})} 
                            value={this.state.leadership}
                          />
                        </div> 
                        <div className="form-group" style={{marginBottom:20}}>
                              <label for="">Please support your rating with some justification, examples
                              </label>
                              <textarea 
                                cols="30" rows="6"
                                name='leadership_support_your_rating'
                                value={this.state.leadership_support_your_rating}
                                onChange={(e) => this.setState({leadership_support_your_rating: e.target.value}) }
                              ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                          <label for="" style={{marginBottom:14}}>Understanding of Finance<span className="text-danger">*</span></label>
                          <Radio.Group 
                            options={plainOptions} 
                            onChange={(e)=>this.setState({understanding_of_finance:e.target.value})} 
                            value={this.state.understanding_of_finance}
                          />
                        </div> 
                        <div className="form-group">
                              <label for="">Please support your rating with some justification, examples
                              </label>
                              <textarea 
                                cols="30" rows="6"
                                name='ufinance_support_your_rating'
                                value={this.state.ufinance_support_your_rating}
                                onChange={(e) => this.setState({ufinance_support_your_rating: e.target.value}) }
                              ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                          <label for="" style={{marginBottom:14}}>Understanding of HR<span className="text-danger">*</span></label>
                          
                          <Radio.Group 
                            options={plainOptions} 
                            onChange={(e)=>this.setState({understanding_of_hr:e.target.value})} 
                            value={this.state.understanding_of_hr}
                          />  
                        </div> 
                        <div className="form-group">
                            <label for="">Please support your rating with some justification, examples
                            </label>
                            <textarea 
                              cols="30" rows="6"
                              name='uhr_support_your_rating'
                              value={this.state.uhr_support_your_rating}
                              onChange={(e) => this.setState({uhr_support_your_rating: e.target.value}) }
                            ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                          <label for="" style={{marginBottom:14}}>Understanding of Law and Statutory Compliances<span className="text-danger">*</span></label>
                          <Radio.Group 
                            options={plainOptions} 
                            onChange={(e)=>this.setState({understanding_of_low_and_statutory:e.target.value})} 
                            value={this.state.understanding_of_low_and_statutory}
                          /> 
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples
                          </label>
                          <textarea 
                            cols="30" rows="6"
                            name='ulow_support_your_rating'
                            value={this.state.ulow_support_your_rating}
                            onChange={(e) => this.setState({ulow_support_your_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                            <label for="" style={{marginBottom:14}}>Passion for Business<span className="text-danger">*</span></label>
                            <Radio.Group 
                              options={plainOptions} 
                              onChange={(e)=>this.setState({passion_for_business:e.target.value})} 
                              value={this.state.passion_for_business}
                            />
                        </div> 
                        <div className="form-group">
                            <label for="">Please support your rating with some justification, examples
                            </label>
                            <textarea 
                              cols="30" rows="6"
                              name='passion_for_business_support_rating'
                              value={this.state.passion_for_business_support_rating}
                              onChange={(e) => this.setState({passion_for_business_support_rating: e.target.value}) }
                            ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                            <label for="" style={{marginBottom:14}}>Passion for Current Project<span className="text-danger">*</span></label>
                            <Radio.Group 
                              options={plainOptions} 
                              onChange={(e)=>this.setState({passion_for_current_project:e.target.value})} 
                              value={this.state.passion_for_current_project}
                            />
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples
                          </label>
                          <textarea 
                            cols="30" rows="6"
                            name='passion_for_current_project_support_rating'
                            value={this.state.passion_for_current_project_support_rating}
                            onChange={(e) => this.setState({passion_for_current_project_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                          <label for="" style={{marginBottom:14}}>Experimental Mindset<span className="text-danger">*</span></label>
                          <Radio.Group 
                            options={plainOptions} 
                            onChange={(e)=>this.setState({experimental_mindset:e.target.value})} 
                            value={this.state.experimental_mindset}
                          />
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples
                          </label>
                          <textarea 
                            cols="30" rows="6"
                            name='experimental_mindset_support_rating'
                            value={this.state.experimental_mindset_support_rating}
                            onChange={(e) => this.setState({experimental_mindset_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                            <label for="" style={{marginBottom:14}}>Out of Box Thinking<span className="text-danger">*</span></label>
                            <Radio.Group 
                              options={plainOptions} 
                              onChange={(e)=>this.setState({out_of_box_thinking:e.target.value})} 
                              value={this.state.out_of_box_thinking}
                            />
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples
                          </label>
                          <textarea 
                            cols="30" rows="6"
                            name='out_of_box_thinking_support_rating'
                            value={this.state.out_of_box_thinking_support_rating}
                            onChange={(e) => this.setState({out_of_box_thinking_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                            <label for="" style={{marginBottom:14}}>Problem Solving Skills<span className="text-danger">*</span></label>
                            <Radio.Group 
                              options={plainOptions} 
                              onChange={(e)=>this.setState({problem_solving_skills:e.target.value})} 
                              value={this.state.problem_solving_skills}
                            />
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples
                          </label>
                          <textarea 
                            cols="30" rows="6"
                            name='problem_solving_skills_support_rating'
                            value={this.state.problem_solving_skills_support_rating}
                            onChange={(e) => this.setState({problem_solving_skills_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                            <label for="" style={{marginBottom:14}}>Networking Business<span className="text-danger">*</span></label>
                            <Radio.Group 
                              options={plainOptions} 
                              onChange={(e)=>this.setState({networking_business:e.target.value})} 
                              value={this.state.networking_business}
                            />
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples
                          </label>
                          <textarea 
                            cols="30" rows="6"
                            name='networking_business_support_rating'
                            value={this.state.networking_business_support_rating}
                            onChange={(e) => this.setState({networking_business_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group" style={{marginBottom:20}}>
                          <label for="" style={{marginBottom:14}}>Networking Social<span className="text-danger">*</span></label>
                          <Radio.Group 
                            options={plainOptions} 
                            onChange={(e)=>this.setState({networking_social:e.target.value})} 
                            value={this.state.networking_social}
                          />
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples
                          </label>
                          <textarea 
                            cols="30" rows="6"
                            name='networking_social_support_rating'
                            value={this.state.networking_social_support_rating}
                            onChange={(e) => this.setState({networking_social_support_rating: e.target.value}) }
                          ></textarea>
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

export default Step1;
