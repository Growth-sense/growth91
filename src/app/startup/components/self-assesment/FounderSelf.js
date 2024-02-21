import React, { Component } from "react";
import { DatePicker, Radio, Tabs, message, Spin } from "antd";
import Bridge from "../../../constants/Bridge";
import moment from 'moment';
import $ from 'jquery';

class FounderSelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      roleType:'',
      mobile:'',
      linkedIn:'',
      timeCommitment:'',
      educationInstitute:'',
      yearsOfExperience:'',
      previousEmployment:'',
      briefFamilyBackground:'',
      anyOtherSpecificInfo:'',
      dtOfJoinBusiness:'',
      strength:'',
      weakness:'',
      dreams:'',
      longTermVision:'',
      shortTermVision:'',
      leaderShip:'',
      leaderShipReview:'',
      understandFinance:'',
      understandFinanceReview:'',
      understandHr:'',
      understandHrReview:'',
      understandLaw:'',
      understandLawReview:'',
      passionBusiness:'',
      passionBusinessReview:'',
      passionCurProject:'',
      passionCurProjectReview:'',
      experimentalMindset:'',
      experimentalMindsetReview:'',
      outOfBox:'',
      outOfBoxReview:'',
      problemSolving:'',
      problemSolvingReview:'',
      networkBusiness:'',
      networkBusinessReview:'',
      networkSocial:'',
      networkSocialReview:'',
      list: [],
      loading:false,
      form_data:{},
      type:'',
    };
  }
  componentDidMount() {
    this.get_form_details();
    this.props.check();
    // this.checkforvalidation();
  }
  get_form_details = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let form_id = localStorage.getItem("form_id");
    let params = {
      founder_id: founder_id,
    };
     this.setState({loading:true});
    Bridge.get_form_user_details(params).then((result) => {
      if (result.status == 1) {
        let arr = [];
        if (localStorage.getItem('form_user_type')=='founder') {
          for (let item of result.data) {
            if (item.role=="founder" && item.id==form_id) {
              arr = [...arr, item];
            }
          }
        }else if (localStorage.getItem('form_user_type')=='core-team-member') {
          for (let item of result.data) {
            if (item.role=="core-team-member" && item.id==form_id) {
              arr = [...arr, item];
            }
          }
        }
        if(arr.length>0){
          this.setState({
            name:arr[0].name,
            email:arr[0].email,
            roleType:arr[0].role,
            list:arr,
            loading:false,
          },()=>this.getuserdetails());
        }
      } else {
         this.setState({loading:false});
      }
    });
  };
  onChange = (key) => {
  };
  save = () => {
    let params = {
      name:this.state.name,
      email:this.state.email,
      roleType:this.state.roleType,
      mobile:this.state.mobile,
      linkedIn:this.state.linkedIn,
      timeCommitment:this.state.timeCommitment,
      educationInstitute:this.state.educationInstitute,
      yearsOfExperience:this.state.yearsOfExperience,
      previousEmployment:this.state.previousEmployment,
      briefFamilyBackground:this.state.briefFamilyBackground,
      anyOtherSpecificInfo:this.state.anyOtherSpecificInfo,
      dtOfJoinBusiness:this.state.dtOfJoinBusiness,
      strength:this.state.strength,
      weakness:this.state.weakness,
      dreams:this.state.dreams,
      longTermVision:this.state.longTermVision,
      shortTermVision:this.state.shortTermVision,
      leaderShip:this.state.leaderShip,
      leaderShipReview:this.state.leaderShipReview,
      understandFinance:this.state.understandFinance,
      understandFinanceReview:this.state.understandFinanceReview,
      understandHr:this.state.understandHr,
      understandHrReview:this.state.understandHrReview,
      understandLaw:this.state.understandLaw,
      understandLawReview:this.state.understandLawReview,
      passionBusiness:this.state.passionBusiness,
      passionBusinessReview:this.state.passionBusinessReview,
      passionCurProject:this.state.passionCurProject,
      passionCurProjectReview:this.state.passionCurProjectReview,
      experimentalMindset:this.state.experimentalMindset,
      experimentalMindsetReview:this.state.experimentalMindsetReview,
      outOfBox:this.state.outOfBox,
      outOfBoxReview:this.state.outOfBoxReview,
      problemSolving:this.state.problemSolving,
      problemSolvingReview:this.state.problemSolvingReview,
      networkBusiness:this.state.networkBusiness,
      networkBusinessReview:this.state.networkBusinessReview,
      networkSocial:this.state.networkSocial,
      networkSocialReview:this.state.networkSocialReview,
      submmited_by_founder_id: localStorage.getItem("form_founder_id"),
      form_id: localStorage.getItem("form_id"),
    };
    Bridge.save_startup_founder2_form_self_assesment_form(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.getuserdetails();
        this.props.check();
        $("html, body").animate({ scrollTop: 0 }, 1000);
        // if(this.state.type=='saveandproceed'){
        //   if(this.props.is_founder_available==true){
        //     this.props.activatetab(1);
        //   }else if(this.props.is_core_team_available==true){
        //     this.props.activatetab(2);
        //   }else if(this.props.is_advisor_available==true){
        //     this.props.activatetab(3);
        //   }
        // }
      } else {
        message.warning(result.message);
      }
    });
  };
  saveandproceed = () => {
    this.checkforvalidation();
    if (!this.state.name) {
      message.warning("Invalid name");
      return;
    } else if (!this.state.email) {
      message.warning("Invalid email");
      return;
    } else if (!this.state.roleType) {
      message.warning("Invalid role type");
      return;
    }else if(!this.state.mobile || this.state.mobile.length!=10){
      message.warning("Invalid mobile number.");
      return;
    }else if(!this.state.linkedIn){
      message.warning("Invalid linkedIn.");
      return;
    }else if(!this.state.timeCommitment){
      message.warning("Invalid time Commitment field.");
      return;
    }else if(!this.state.educationInstitute){
      message.warning("Invalid time Education, Institute field.");
      return;
    }else if(!this.state.yearsOfExperience){
      message.warning("Invalid time Year of Experience.");
      return;
    }else if(!this.state.dtOfJoinBusiness){
      message.warning("Invalid time Date of Joining the business.");
      return;
    } else if (!this.state.leaderShip) {
      message.warning("Invalid leadeship ratings");
      return;
    } else if (!this.state.understandFinance) {
      message.warning("Invalid understanding of finance ratings");
      return;
    } else if (!this.state.understandHr) {
      message.warning("Invalid leadeship understanding of hr ratings");
      return;
    } else if (!this.state.understandLaw) {
      message.warning("Invalid understanding of law ratings");
      return;
    } else if (!this.state.passionCurProject) {
      message.warning("Invalid ratings of passion of current project");
      return;
    } else if (!this.state.passionBusiness) {
      message.warning("Invalid ratings of passion of business field");
      return;
    }else if(!this.state.experimentalMindset){
      message.warning("Invalid ratings of Experimental Mindset field");
      return;
    }else if(!this.state.outOfBox){
      message.warning("Invalid ratings of Out of Box Thinking field");
      return;
    }else if(!this.state.problemSolving){
      message.warning("Invalid ratings of Problem Solving Skills field");
      return;
    }else if(!this.state.networkBusiness){
      message.warning("Invalid ratings of Networking- Business field");
      return;
    }else if(!this.state.networkSocial){
      message.warning("Invalid ratings of Networking- Social field");
      return;
    }
    this.setState({type:'saveandproceed'},()=>this.save());
  };
  savedirectly=()=>{
    this.setState({type:'save'},()=>this.save());
  }
  // user details
  getuserdetails=()=>{
    let params = {
      submitted_by_user_id:localStorage.getItem("form_founder_id"),
      email:this.state.email,
       form_id: localStorage.getItem('form_id'),
    };
    Bridge.get_startup_form2_details(params).then((response) => {
      if (response.status==1) {
        if(response.data.length>0){
          let item=response.data[0];
          this.setState({
            name:item.name,
            email:item.email,
            roleType:item.role_type,
            mobile:item.mobile,
            linkedIn:item.linkedIn,
            timeCommitment:item.timeCommitment,
            educationInstitute:item.educationInstitute,
            yearsOfExperience:item.yearsOfExperience,
            previousEmployment:item.previousEmployment,
            briefFamilyBackground:item.briefFamilyBackground,
            anyOtherSpecificInfo:item.anyOtherSpecificInfo,
            dtOfJoinBusiness:item.dtOfJoinBusiness ? moment(item.dtOfJoinBusiness) : moment(),
            strength:item.strength,
            weakness:item.weakness,
            dreams:item.dreams,
            longTermVision:item.longTermVision,
            shortTermVision:item.shortTermVision,
            leaderShip:Number(item.leadership),
            leaderShipReview:item.leaderShipReview,
            understandFinance:Number(item.understanding_finance),
            understandFinanceReview:item.understandFinanceReview,
            understandHr:Number(item.understanding_hr),
            understandHrReview:item.understandHrReview,
            understandLaw:Number(item.understanding_low),
            understandLawReview:item.understandLawReview,
            passionBusiness:Number(item.passion_of_business),
            passionBusinessReview:item.passionBusinessReview,
            passionCurProject:Number(item.passion_for_current_project),
            passionCurProjectReview:item.passionCurProjectReview,
            experimentalMindset:Number(item.experimental_mindset),
            experimentalMindsetReview:item.experimentalMindsetReview,
            outOfBox:Number(item.out_of_box_thinking),
            outOfBoxReview:item.outOfBoxReview,
            problemSolving:Number(item.problem_solving),
            problemSolvingReview:item.problemSolvingReview,
            networkBusiness:Number(item.network_business),
            networkBusinessReview:item.networkBusinessReview,
            networkSocial:Number(item.network_social),
            networkSocialReview:item.networkSocialReview,
          });
        }
      }
    });
  }
  checkforvalidation = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let form_id = localStorage.getItem("form_id");
    let form_email = localStorage.getItem("form_email");
    let params = {
      form_id: form_id,
    };
    Bridge.check_validation(params).then((result) => {
      if (result.status == 1) {
        let validate = false;
        let arr=[];
        let role_type=localStorage.getItem('form_user_type');
        let form_id=localStorage.getItem('form_id');
        /// for founder
        for(let item of result.data){
          if((item.role_type==role_type && role_type=='founder') && item.email==form_email){
            arr=[...arr,item];
          }
        }
        if(arr.length>0){
           if (
            arr[0].name &&
            arr[0].email &&
            arr[0].role_type &&
            (arr[0].mobile.length==10) &&
            arr[0].linkedIn &&
            arr[0].timeCommitment &&
            arr[0].educationInstitute &&
            arr[0].yearsOfExperience &&
            arr[0].dtOfJoinBusiness &&
            (arr[0].leadership!=0 && arr[0].leadership) &&
            (arr[0].understanding_finance!=0 && arr[0].understanding_finance) &&
            (arr[0].understanding_hr!=0 && arr[0].understanding_hr) &&
            (arr[0].understanding_low!=0 && arr[0].understanding_low) &&
            (arr[0].passion_for_current_project!=0 && arr[0].passion_for_current_project) &&
            (arr[0].passion_of_business!=0 && arr[0].passion_of_business) &&
            (arr[0].experimental_mindset!=0 && arr[0].experimental_mindset) &&
            (arr[0].out_of_box_thinking!=0 && arr[0].out_of_box_thinking) &&
            (arr[0].problem_solving!=0 && arr[0].problem_solving) &&
            (arr[0].network_business!=0 && arr[0].network_business) &&
            (arr[0].network_social!=0 && arr[0].network_social)
          ) {
            this.setState({class0:" success-tab",error_status_0:"1"});
            validate=true;
          } else {
            this.setState({class0:" error-tab",error_status_0:"0"});
            validate=false;
          }
          arr[0].validated=validate;
          this.setState({form_data:arr[0]});
        }
        this.setState({validated:validate});
      }
    });
  };

  render() {
    const disabledDate = (current) => {
      return current && current > moment().endOf('day');
    };
    return (
      <div>
        <section
          className="StepForm-section"
          style={{
            marginTop: 0,
            padding: 0,
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          <div className="container">
            <div className="line-seperator">
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  background: "#fff",
                  paddingRight: 16,
                }}
              >
                <span
                  style={{
                    background: "#fff",
                    width: 150,
                    height: 20,
                    zIndex: 4,
                    position: "absolute",
                    paddingRight: 10,
                  }}
                >
                  Self Assessment
                </span>
              </div>
              <hr />
            </div>
           
            {((this.props.error=='0' && this.state.form_data.validated==false) && (
              !this.state.name ||
              !this.state.email ||
              !this.state.roleType ||
              (this.state.mobile.length!=10) ||
              !this.state.linkedIn ||
              !this.state.timeCommitment ||
              !this.state.educationInstitute ||
              !this.state.yearsOfExperience ||
              !this.state.dtOfJoinBusiness ||
              (this.state.leaderShip==0||!this.state.leaderShip) ||
              (this.state.understandFinance==0|| !this.state.understandFinance) ||
              (this.state.understandHr==0 || !this.state.understandHr) ||
              (this.state.understandLaw==0 || !this.state.understandLaw) ||
              (this.state.passionCurProject==0 || !this.state.passionCurProject) ||
              (this.state.passionBusiness==0 || !this.state.passionBusiness) ||
              (this.state.experimentalMindset==0 || !this.state.experimentalMindset) ||
              (this.state.outOfBox==0 || !this.state.outOfBox) ||
              (this.state.problemSolving==0 || !this.state.problemSolving) ||
              (this.state.networkBusiness==0 || !this.state.networkBusiness) ||
              (this.state.networkSocial==0 || !this.state.networkSocial)
              )) &&(
                <div className='error-div'>
                  <div className='error-icon'>
                    <i className='bx bxs-error'></i>
                  </div>
                  <ul>
                    {!this.state.form_data.name &&(
                      <li><span>Name is required.</span></li>
                    )}
                    {!this.state.form_data.email &&(
                      <li><span>Email is required.</span></li>
                    )}
                    {!this.state.form_data.role_type &&(
                      <li><span>Role type is required.</span></li>
                    )}
                    {this.state.form_data.mobile.length!=10 &&(
                      <li><span>Mobile No is required.</span></li>
                    )}
                    {!this.state.form_data.linkedIn &&(
                      <li><span>Linkedin link is required.</span></li>
                    )}
                    {!this.state.form_data.timeCommitment &&(
                      <li><span>Time Commitment field is required.</span></li>
                    )}
                    {!this.state.form_data.educationInstitute &&(
                      <li><span>Education Institute field is required.</span></li>
                    )}
                    {!this.state.form_data.yearsOfExperience &&(
                      <li><span>Year of experience field is required.</span></li>
                    )}
                    {!this.state.form_data.dtOfJoinBusiness &&(
                      <li><span>Date of Joining business field is required.</span></li>
                    )}
                    {(this.state.form_data.leadership=='0' || !this.state.form_data.leadership)  &&(
                      <li><span>Please select leader ship field.</span></li>
                    )}
                    {(this.state.form_data.understanding_finance=='0' || !this.state.form_data.understanding_finance) &&(
                      <li><span>Please select Understanding of Finance field.</span></li>
                    )}
                    {(this.state.form_data.understanding_hr==0 || !this.state.form_data.understanding_hr) &&(
                      <li><span>Please select Understanding of HR field.</span></li>
                    )}
                    {(this.state.form_data.understanding_low==0 || !this.state.form_data.understanding_low)&&(
                      <li><span>Please select Understanding of Law  field.</span></li>
                    )}
                    {(this.state.form_data.passion_for_current_project==0 || !this.state.form_data.passion_for_current_project) &&(
                      <li><span>Please select Passion for Current Project field.</span></li>
                    )}
                    {(this.state.form_data.passion_of_business==0 || !this.state.form_data.passion_of_business)&&(
                      <li><span>Please select Passion for business field.</span></li>
                    )}
                    {(this.state.form_data.experimental_mindset==0 || !this.state.form_data.experimental_mindset) &&(
                      <li><span>Please select Experimental Mindset field.</span></li>
                    )}
                    {(this.state.form_data.out_of_box_thinking==0 || !this.state.form_data.out_of_box_thinking) &&(
                      <li><span>Please select Out of Box Thinking field.</span></li>
                    )}
                    {(this.state.form_data.problem_solving==0 || !this.state.form_data.problem_solving) &&(
                      <li><span>Please select Problem Solving Skills field.</span></li>
                    )}
                    {(this.state.form_data.network_business==0 || !this.state.form_data.network_business) &&(
                      <li><span>Please select Networking Business field.</span></li>
                    )}
                    {(this.state.form_data.network_social==0 || !this.state.form_data.network_social)&&(
                      <li><span>Please select Networking Social field.</span></li>
                    )}
                  </ul>
                </div>
              )}
            <Spin spinning={this.state.loading}>
            <div className="row" style={{ marginTop: 30 }}>
              <div className="col-lg-12">
                <div className="row" style={{ maxWidth: 900 }}>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label for="">Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Email <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Role type <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        value={this.state.roleType}
                        onChange={(e) =>
                          this.setState({ roleType: e.target.value })
                        }
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Mobile Number <span className="text-danger">*</span></label>
                      <input
                        type="number"
                        value={this.state.mobile}
                        onWheel={() => document.activeElement.blur()}
                        onChange={(e) =>
                          this.setState({ mobile: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">
                        LinkedIn Profile URL
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.linkedIn}
                        onChange={(e) =>
                          this.setState({ linkedIn: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label for="">
                        Time Commitment
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.timeCommitment}
                        onChange={(e) =>
                          this.setState({ timeCommitment: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">
                        Education, Institute, Year
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.educationInstitute}
                        onChange={(e) =>
                          this.setState({ educationInstitute: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">
                        Year of Experience
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.yearsOfExperience}
                        onChange={(e) =>
                          this.setState({ yearsOfExperience: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Previous employment briefs</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.previousEmployment}
                        onChange={(e) =>
                          this.setState({ previousEmployment: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">Brief family background</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.briefFamilyBackground}
                        onChange={(e) =>
                          this.setState({
                            briefFamilyBackground: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">Any other specific information</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.anyOtherSpecificInfo}
                        onChange={(e) =>
                          this.setState({
                            anyOtherSpecificInfo: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group step-form-date-input">
                      <label for="">
                        Date of Joining the business
                        <span className="text-danger">*</span>
                      </label>
                      <DatePicker
                        format={"DD-MM-YYYY"}
                        style={{
                          width: "100%",
                          marginBottom: 30,
                        }}
                        disabledDate={disabledDate}
                        value={this.state.dtOfJoinBusiness}
                        onChange={ (date, dateString)=>
                          this.setState({ dtOfJoinBusiness:date })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Your Strength</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.strength}
                        onChange={(e) =>
                          this.setState({ strength: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">Your Weakness</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.weakness}
                        onChange={(e) =>
                          this.setState({ weakness: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">What are your dreams?</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.dreams}
                        onChange={(e) =>
                          this.setState({ dreams: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">What is your long-term vision?</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.longTermVision}
                        onChange={(e) =>
                          this.setState({ longTermVision: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="">What is your short-term vision/goal?</label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.shortTermVision}
                      onChange={(e) =>
                        this.setState({ shortTermVision: e.target.value })
                      }
                    ></textarea>
                  </div>

                  
                  <div className="form-group" style={{ marginBottom: 20 }}>
                  <em>Please rate your skillset, 1 being lowest and 10 being highest. </em>
                  
                    <label for="" style={{ marginBottom: 14 }}>
                      Leadership<span className="text-danger">*</span>
                    </label>
                    
                    <Radio.Group
                      onChange={(e) =>{
                        this.setState({ leaderShip: e.target.value });
                      }
                      }
                      value={this.state.leaderShip}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.leaderShipReview}
                      onChange={(e) =>
                        this.setState({ leaderShipReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Understanding of Finance
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ understandFinance: e.target.value })
                      }
                      value={this.state.understandFinance}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.understandFinanceReview}
                      onChange={(e) =>
                        this.setState({
                          understandFinanceReview: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Understanding of HR<span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ understandHr: e.target.value })
                      }
                      value={this.state.understandHr}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.understandHrReview}
                      onChange={(e) =>
                        this.setState({ understandHrReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Understanding of Law and Statutory Compliances
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ understandLaw: e.target.value })
                      }
                      value={this.state.understandLaw}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.understandLawReview}
                      onChange={(e) =>
                        this.setState({ understandLawReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Passion for business
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ passionBusiness: e.target.value })
                      }
                      value={this.state.passionBusiness}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.passionBusinessReview}
                      onChange={(e) =>
                        this.setState({ passionBusinessReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Passion for Current Project
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ passionCurProject: e.target.value })
                      }
                      value={this.state.passionCurProject}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.passionCurProjectReview}
                      onChange={(e) =>
                        this.setState({
                          passionCurProjectReview: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Experimental Mindset
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ experimentalMindset: e.target.value })
                      }
                      value={this.state.experimentalMindset}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>

                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.experimentalMindsetReview}
                      onChange={(e) =>
                        this.setState({
                          experimentalMindsetReview: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Out of Box Thinking
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ outOfBox: e.target.value })
                      }
                      value={this.state.outOfBox}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.outOfBoxReview}
                      onChange={(e) =>
                        this.setState({ outOfBoxReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Problem Solving Skills
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ problemSolving: e.target.value })
                      }
                      value={this.state.problemSolving}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.problemSolvingReview}
                      onChange={(e) =>
                        this.setState({ problemSolvingReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Networking- Business
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ networkBusiness: e.target.value })
                      }
                      value={this.state.networkBusiness}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.networkBusinessReview}
                      onChange={(e) =>
                        this.setState({ networkBusinessReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Networking- Social
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ networkSocial: e.target.value })
                      }
                      value={this.state.networkSocial}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.networkSocialReview}
                      onChange={(e) =>
                        this.setState({ networkSocialReview: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <br />
                  <div className="form-group d-flex justify-content-between">
                    <div className="arrow-buttons">
                      {/*<button
                        style={{
                          position: "relative",
                          left: -20,
                          background:"#fff",
                          border:"1px solid #29176f",
                          color:"#29176f",
                        }}
                        onClick={this.props.next}
                        class="submit-button"
                      >
                        <i className="bx bx-chevron-right"></i>
                      </button>*/}
                    </div>
                    <div>
                      <button
                        style={{ width: 190, marginRight: 13 }}
                        class="submit-button"
                        onClick={() => this.saveandproceed()}
                      >
                        Validate
                      </button>
                      <button
                        style={{ width: 116 }}
                        class="submit-button"
                        onClick={() => this.savedirectly()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Spin>
          </div>
        </section>
      </div>
    );
  }
}
export default FounderSelf;
