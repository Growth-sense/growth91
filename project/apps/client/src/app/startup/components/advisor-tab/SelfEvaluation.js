
import React, { Component } from 'react';
import { message, Spin, Radio, Space } from 'antd';
import Bridge from '../../../../constants/Bridge';
import Header from '../custom/Header';
 
class SelfEvaluation extends Component {

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

    // if(!this.state.leadership){
    //   message.warning('Please enter the vale of leardership.');
    //   return;
    // }
    // if(!this.state.leadership_support_your_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.understanding_of_finance){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.ufinance_support_your_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.understanding_of_hr){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.uhr_support_your_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.understanding_of_low_and_statutory){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.ulow_support_your_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.passion_for_business){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.passion_for_business_support_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.passion_for_current_project){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.passion_for_current_project_support_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.experimental_mindset){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.experimental_mindset_support_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.out_of_box_thinking){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.out_of_box_thinking_support_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.problem_solving_skills){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.problem_solving_skills_support_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.networking_business){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.networking_business_support_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.networking_social){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.networking_social_support_rating){
    //   message.warning('');
    //   return;
    // }
    // if(!this.state.other_memebers_in_founding_core_team){
    //   message.warning('');
    //   return;
    // }
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
                            <label for="">Leadership<span className="text-danger">*</span></label>
                        <Radio.Group 
                          onChange={(e)=>this.setState({leadership:e.target.value})} 
                          value={this.state.leadership}
                        >
                          <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                          </Radio.Group>
                        </div> 
                        <div className="form-group">
                              <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                              <textarea 
                                cols="30" rows="6"
                                name='leadership_support_your_rating'
                                value={this.state.leadership_support_your_rating}
                                onChange={(e) => this.setState({leadership_support_your_rating: e.target.value}) }
                              ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="">Understanding of Finance<span className="text-danger">*</span></label>
                                <Radio.Group 
                                  onChange={(e)=>this.setState({understanding_of_finance:e.target.value})} 
                                  value={this.state.understanding_of_finance}
                                >
                                  <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                                 </Radio.Group>
                        </div> 
                        <div className="form-group">
                              <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                              <textarea 
                                cols="30" rows="6"
                                name='ufinance_support_your_rating'
                                value={this.state.ufinance_support_your_rating}
                                onChange={(e) => this.setState({ufinance_support_your_rating: e.target.value}) }
                              ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="">Understanding of HR<span className="text-danger">*</span></label>
                            <Radio.Group 
                              onChange={(e)=>this.setState({understanding_of_hr:e.target.value})} 
                              value={this.state.understanding_of_hr}
                            >
                              <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                              </Radio.Group>
                        </div> 
                        <div className="form-group">
                            <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                            <textarea 
                              cols="30" rows="6"
                              name='uhr_support_your_rating'
                              value={this.state.uhr_support_your_rating}
                              onChange={(e) => this.setState({uhr_support_your_rating: e.target.value}) }
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="">Understanding of Law and Statutory Compliances<span className="text-danger">*</span></label>
                            <Radio.Group 
                            onChange={(e)=>this.setState({understanding_of_low_and_statutory:e.target.value})} 
                            value={this.state.understanding_of_low_and_statutory}
                            >
                              <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                              </Radio.Group>
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                          <textarea 
                            cols="30" rows="6"
                            name='ulow_support_your_rating'
                            value={this.state.ulow_support_your_rating}
                            onChange={(e) => this.setState({ulow_support_your_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="">Passion for Business<span className="text-danger">*</span></label>
                            <Radio.Group 
                              onChange={(e)=>this.setState({passion_for_business:e.target.value})} 
                              value={this.state.passion_for_business}
                            >
                              <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                              </Radio.Group>
                        </div> 
                        <div className="form-group">
                            <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                            <textarea 
                              cols="30" rows="6"
                              name='passion_for_business_support_rating'
                              value={this.state.passion_for_business_support_rating}
                              onChange={(e) => this.setState({passion_for_business_support_rating: e.target.value}) }
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="">Passion for Current Project<span className="text-danger">*</span></label>
                            <Radio.Group 
                            onChange={(e)=>this.setState({passion_for_current_project:e.target.value})} 
                            value={this.state.passion_for_current_project}
                            >
                            <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                            </Radio.Group>
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                          <textarea 
                            cols="30" rows="6"
                            name='passion_for_current_project_support_rating'
                            value={this.state.passion_for_current_project_support_rating}
                            onChange={(e) => this.setState({passion_for_current_project_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label for="">Experimental Mindset<span className="text-danger">*</span></label>
                          <Radio.Group
                           onChange={(e)=>this.setState({experimental_mindset:e.target.value})} 
                           value={this.state.experimental_mindset}
                          >
                            <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                            </Radio.Group>
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                          <textarea 
                            cols="30" rows="6"
                            name='experimental_mindset_support_rating'
                            value={this.state.experimental_mindset_support_rating}
                            onChange={(e) => this.setState({experimental_mindset_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="">Out of Box Thinking<span className="text-danger">*</span></label>
                            <Radio.Group 
                            onChange={(e)=>this.setState({out_of_box_thinking:e.target.value})} 
                            value={this.state.out_of_box_thinking}
                            >
                              <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                              </Radio.Group>
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                          <textarea 
                            cols="30" rows="6"
                            name='out_of_box_thinking_support_rating'
                            value={this.state.out_of_box_thinking_support_rating}
                            onChange={(e) => this.setState({out_of_box_thinking_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="">Problem Solving Skills<span className="text-danger">*</span></label>
                            <Radio.Group 
                            onChange={(e)=>this.setState({problem_solving_skills:e.target.value})} 
                            value={this.state.problem_solving_skills}
                            >
                              <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                              </Radio.Group>
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                          <textarea 
                            cols="30" rows="6"
                            name='problem_solving_skills_support_rating'
                            value={this.state.problem_solving_skills_support_rating}
                            onChange={(e) => this.setState({problem_solving_skills_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="">Networking Business<span className="text-danger">*</span></label>
                            <Radio.Group 
                            onChange={(e)=>this.setState({networking_business:e.target.value})} 
                            value={this.state.networking_business}
                            >
                              <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                            </Radio.Group>
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                          <textarea 
                            cols="30" rows="6"
                            name='networking_business_support_rating'
                            value={this.state.networking_business_support_rating}
                            onChange={(e) => this.setState({networking_business_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label for="">Networking Social<span className="text-danger">*</span></label>
                          <Radio.Group 
                          onChange={(e)=>this.setState({networking_social:e.target.value})} 
                          value={this.state.networking_social}
                          >
                           <Radio value={1}>1</Radio>
                                  <Radio value={2}>2</Radio>
                                  <Radio value={3}>3</Radio>
                                  <Radio value={4}>3</Radio>
                                  <Radio value={5}>5</Radio>
                                  <Radio value={6}>6</Radio>
                                  <Radio value={7}>7</Radio>
                                  <Radio value={8}>8</Radio>
                                  <Radio value={9}>9</Radio>
                                  <Radio value={10}>10</Radio>
                            </Radio.Group>
                        </div> 
                        <div className="form-group">
                          <label for="">Please support your rating with some justification, examples<span className="text-danger">*</span></label>
                          <textarea 
                            cols="30" rows="6"
                            name='networking_social_support_rating'
                            value={this.state.networking_social_support_rating}
                            onChange={(e) => this.setState({networking_social_support_rating: e.target.value}) }
                          ></textarea>
                        </div>
                        <div className="form-group ">
                          <label for="">Are there other members in Founding/Core Team?<span className="text-danger">*</span></label>
                          <div className='button-grp'> 
                            <button 
                            className={this.state.other_memebers_in_founding_core_team=='Yes' && 'active'} 
                            onClick={() => this.changeStatus('Yes')}
                            >Yes</button>
                            <button 
                            className={this.state.other_memebers_in_founding_core_team=='No' && 'active'} 
                            onClick={() => this.changeStatus('No')}
                            >No</button>
                          </div>
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

export default SelfEvaluation;
