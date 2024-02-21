import React, { Component } from "react";
import Submission from "./founder-tab/Submission";
import FounderSelf from "./self-assesment/FounderSelf";
import Coreteammember from "./self-assesment/Coreteammember";
import Advisor from "./self-assesment/Advisor";
import CommonAssessment from "./self-assesment/CommonAssessment";

import Bridge from "../../constants/Bridge";
import $ from "jquery";

class Founder extends Component {
  constructor(props) {
    super(props);
    this.state = {                             
      activeform: 0,
      class0: "",
      class1: "",
      class2: "",
      class3: "",                      
      class4: "",
      class5: "",
      class6: "",
      class7: "",
      class8: "",
      class9: "",
      class10: "",
      class11: "",
      class12: "",
      class13: "",
      class14: "",
      class15: "",
      class16: "",
      class17: "",
      class18: "",
      class19: "",

      error_status_0: "",
      error_status_1: "",
      error_status_2: "",
      error_status_3: "",
      error_status_4: "",
      error_status_5: "",
      error_status_6: "",
      error_status_7: "",
      error_status_8: "",
      error_status_9: "",
      error_status_10: "",
      error_status_11: "",
      error_status_12: "",
      error_status_13: "",
      error_status_14: "",
      error_status_15: "",
      error_status_16: "",
      error_status_17: "",
      error_status_18: "",
      error_status_19: "",

      validated: false,
      member_is_present: "no",
      is_founder_available:true,
      is_core_team_available:true,
      is_advisor_available:true,
      founder_error_data:{},
      user_list:[],
      user_type:'',
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("form_id")) {
      window.location.assign("/authenticate");
    }
    if (localStorage.getItem("form_id")) {
      this.getData();
      this.get_invited_user_list();
    }//
    setTimeout(()=>{
      this.checkforvalidation();
    },500);
    this.setState({
      user_type:localStorage.getItem('form_user_type')
    });
  }
  get_invited_user_list=()=>{
    let params = {
      founder_id:localStorage.getItem("form_founder_id"),
    };
    Bridge.get_invited_user_list(params).then((result) => {
      if (result.status == 1) {
        this.setState({user_list:result.data});
        let founders=0;
        let core_members=0;
        let advisors=0;
        let form_id=localStorage.getItem('form_id');
        
        let form_email=localStorage.getItem("form_email");
        let form_founder_id=localStorage.getItem("form_founder_id");
        for(let item of result.data){
          if(item.email!=form_email && item.by_founder_id==form_founder_id){
            if(item.role=='founder'){
              founders++;
            }else if(item.role=='core-team-member'){
              core_members++;
            }else if(item.role=='advisor'){
              advisors++;
            }
          }
        }
       
        if(founders=='0'){
          this.setState({is_founder_available:false});
        } else{
           this.setState({is_founder_available:true});
        }
        if(core_members=='0'){
          this.setState({is_core_team_available:false});
        }  else{
           this.setState({is_core_team_available:true});
        }
        if(advisors=='0'){
          this.setState({is_advisor_available:false});
        } else{
           this.setState({is_advisor_available:true});
        }
      }
    });
  };
  getData = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.startup_form.get_startup_details(params).then((result) => {
      if (result.status == 1) {
      }
    });
  };
  activeform = (value) => {
    this.setState({ activeform: value });
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  };
  onChange = (value) => {
    this.setState({ activeform: value });
  };
  activethistab = (num) => {
    this.setState({ activeform: num });
    $("html, body").animate({ scrollTop: 0 }, 1000);
    this.checkforvalidation();
  };
  checkforvalidation = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let form_id = localStorage.getItem("form_id");
    let form_email = localStorage.getItem("form_email");
    let params = {
      form_id: form_id,
    };
    Bridge.check_validation(params).then((result) => {
      
      if (result.status == 1) {

        let user_list=this.state.user_list;
        let founder=0;
        let core_member=0;
        let advisor=0;
        let newArray=[];
        let form_founder_id=localStorage.getItem('form_founder_id');
        for(let item of user_list){
          if(item.email != form_email && item.by_founder_id==form_founder_id){
            newArray=[...newArray,item];
            if(item.role=='founder'){
              founder++;
            }
            if(item.role=='core-team-member'){
              core_member++;
            }
            if(item.role=='advisor'){
              advisor++;
            }
          }
        }
        
        let validate = false;
        let arr=[];
        let role_type=localStorage.getItem('form_user_type');
        let form_id=localStorage.getItem('form_id');
        /// for self assesment
        for(let item of result.data){
          if(role_type=='advisor'){
            if((item.role_type==role_type && role_type=='advisor') && item.email==form_email && item.form_id==form_id){
              arr=[...arr,item];
            }
          }else{
            if((item.role_type==role_type) && item.email==form_email && item.form_id==form_id){
              arr=[...arr,item];
            }
          }
          
        }
  
        if(role_type=='advisor'){
          if(arr.length>0){
             if (
              arr[0].name &&
              arr[0].email &&
              arr[0].role_type &&
              (arr[0].mobile && arr[0].mobile.length==10) &&
              arr[0].linkedIn &&
              arr[0].credentials &&
              arr[0].specific_responsibilities &&
              arr[0].commercialsAndOthers &&
              arr[0].formalAppointment &&
              arr[0].dtOfJoinBusiness
            ) {
              this.setState({class0:" success-tab",error_status_0:"1"});
              validate=true;
            } else {
              // this.setState({class0:" error-tab",error_status_0:"0"});
              // validate=false;
            }

            this.setState({founder_error_data:arr[0]});
          }
        }else{
            if(arr.length>0){
             if (
              arr[0].name &&
              arr[0].email &&
              arr[0].role_type &&
              (arr[0].mobile && arr[0].mobile.length==10) &&
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
              // this.setState({class0:" error-tab",error_status_0:"0"});
              // validate=false;
            }
            this.setState({founder_error_data:arr[0]});
          }
        }
        

        // for founder tab
        let arr2=[];
        for(let item of result.data){
          if(item.role_type=='founder' && item.email!=form_email && item.form_id==form_id){
            arr2=[...arr2,item];
          }
        }
        if(arr2.length>0){
          let status=false;
          for(let item of arr2){
            if(
              item.name &&
              item.email &&
              item.role_type &&
              (item.leadership!=0 && item.leadership) &&
              (item.understanding_finance!=0 && item.understanding_finance) &&
              (item.understanding_hr!=0 && item.understanding_hr) &&
              (item.understanding_low!=0 && item.understanding_low) &&
              (item.passion_for_current_project!=0 && item.passion_for_current_project) &&
              (item.passion_of_business!=0 && item.passion_of_business) &&
              (item.experimental_mindset!=0 && item.experimental_mindset) &&
              (item.out_of_box_thinking!=0 && item.out_of_box_thinking) &&
              (item.problem_solving!=0 && item.problem_solving) &&
              (item.network_business!=0 && item.network_business) &&
              (item.network_social!=0 && item.network_social)
            ) {
              status=true;
            } else {
              status=false;
            }
          }
          if(status==true && arr2.length==founder){
            this.setState({class1:" success-tab",error_status_1:"1"});
            validate=true;
          }else{
            // this.setState({class1:" error-tab",error_status_1:"0"});
            // validate=false;
          }
        }
        
        // for core team member
        let arr3=[];
        for(let item of result.data){
          if(item.role_type=='core-team-member' && item.email!=form_email && item.form_id==form_id){
            arr3=[...arr3,item];
          }
        }
        
        if(arr3.length>0){
          let status=false;
          for(let item of arr3){
            if (
              item.name &&
              item.email &&
              item.role_type &&
              (item.leadership!=0 && item.leadership) &&
              (item.understanding_finance!=0 && item.understanding_finance) &&
              (item.understanding_hr!=0 && item.understanding_hr) &&
              (item.understanding_low!=0 && item.understanding_low) &&
              (item.passion_for_current_project!=0 && item.passion_for_current_project) &&
              (item.passion_of_business!=0 && item.passion_of_business) &&
              (item.experimental_mindset!=0 && item.experimental_mindset) &&
              (item.out_of_box_thinking!=0 && item.out_of_box_thinking) &&
              (item.problem_solving!=0 && item.problem_solving) &&
              (item.network_business!=0 && item.network_business) &&
              (item.network_social!=0 && item.network_social)
            ) {
              status=true;
            } else {
              status=false;
            }
          }
          if(status==true && arr3.length==core_member){
            this.setState({class2:" success-tab",error_status_2:"1"});
            validate=true;
          }else{
            // this.setState({class2:" error-tab",error_status_2:"0"});
            // validate=false;
          }
        }

        // for advisor
        let arr4=[];
        for(let item of result.data){
          if(item.role_type=='advisor' && item.email!=form_email && item.form_id==form_id){
            arr4=[...arr4,item];
          }
        }
        if(arr4.length>0){
          let status=false;
          for(let item of arr4){
            if (
              item.name &&
              item.email &&
              item.role_type &&
              (item.leadership!=0 && item.leadership) &&
              (item.understanding_finance!=0 && item.understanding_finance) &&
              (item.understanding_hr!=0 && item.understanding_hr) &&
              (item.understanding_low!=0 && item.understanding_low) &&
              (item.passion_for_current_project!=0 && item.passion_for_current_project) &&
              (item.passion_of_business!=0 && item.passion_of_business) &&
              (item.experimental_mindset!=0 && item.experimental_mindset) &&
              (item.out_of_box_thinking!=0 && item.out_of_box_thinking) &&
              (item.problem_solving!=0 && item.problem_solving) &&
              (item.network_business!=0 && item.network_business) &&
              (item.network_social!=0 && item.network_social)
            ) {
              status=true;
            } else {
              status=false;
            }
          }
          if(status==true && arr4.length==advisor){
            this.setState({class3:" success-tab",error_status_3:"1"});
            validate=true;
          }else{
            // this.setState({class3:" error-tab",error_status_3:"0"});
            // validate=false;
          }
        }
        this.setState({validated:validate});
      }
    });
  };
  checkforvalidation2 = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let form_id = localStorage.getItem("form_id");
    let form_email = localStorage.getItem("form_email");
    let params = {
      form_id: form_id,
    };
    Bridge.check_validation(params).then((result) => {
      
      if (result.status == 1) {
        
        let user_list=this.state.user_list;
        let founder=0;
        let core_member=0;
        let advisor=0;
        let newArray=[];
        
        let form_founder_id=localStorage.getItem('form_founder_id');
        for(let item of user_list){
          if(item.email != form_email && item.by_founder_id==form_founder_id){
            newArray=[...newArray,item];
            if(item.role=='founder'){
              founder++;
            }
            if(item.role=='core-team-member'){
              core_member++;
            }
            if(item.role=='advisor'){
              advisor++;
            }
          }
        }
        
        let validate = false;
        let arr=[];
        let role_type=localStorage.getItem('form_user_type');
        let form_id=localStorage.getItem('form_id');
        /// for self assesment
        for(let item of result.data){
          if(role_type=='advisor'){
            if((item.role_type==role_type && role_type=='advisor') && item.email==form_email && item.form_id==form_id){
              arr=[...arr,item];
            }
          }else{
            if((item.role_type==role_type) && item.email==form_email && item.form_id==form_id){
              arr=[...arr,item];
            }
          }
        }
        
        if(role_type=='advisor'){
          if(arr.length>0){
             if (
              arr[0].name &&
              arr[0].email &&
              arr[0].role_type &&
              (arr[0].mobile && arr[0].mobile.length==10) &&
              arr[0].linkedIn &&
              arr[0].credentials &&
              arr[0].specific_responsibilities &&
              arr[0].commercialsAndOthers &&
              arr[0].formalAppointment &&
              arr[0].dtOfJoinBusiness
            ) {
              this.setState({class0:" success-tab",error_status_0:"1"});
              validate=true;
            } else {
              this.setState({class0:" error-tab",error_status_0:"0"});
              validate=false;
            }
            this.setState({founder_error_data:arr[0]});
          }else{
            this.setState({class0:" error-tab",error_status_0:"0"});
            validate=false;
          }
        }else{
          
            if(arr.length>0){
             if (
              arr[0].name &&
              arr[0].email &&
              arr[0].role_type &&
              (arr[0].mobile && arr[0].mobile.length==10) &&
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
            this.setState({founder_error_data:arr[0]});
          }else{
            this.setState({class0:" error-tab",error_status_0:"0"});
              validate=false;
          }
        }
        

        // for founder tab
        let arr2=[];
        for(let item of result.data){
          if(item.role_type=='founder' && item.email!=form_email && item.form_id==form_id){
            arr2=[...arr2,item];
          }
        }
        if(arr2.length>0){
          let status=false;
          for(let item of arr2){
            if(
              item.name &&
              item.email &&
              item.role_type &&
              (item.leadership!=0 && item.leadership) &&
              (item.understanding_finance!=0 && item.understanding_finance) &&
              (item.understanding_hr!=0 && item.understanding_hr) &&
              (item.understanding_low!=0 && item.understanding_low) &&
              (item.passion_for_current_project!=0 && item.passion_for_current_project) &&
              (item.passion_of_business!=0 && item.passion_of_business) &&
              (item.experimental_mindset!=0 && item.experimental_mindset) &&
              (item.out_of_box_thinking!=0 && item.out_of_box_thinking) &&
              (item.problem_solving!=0 && item.problem_solving) &&
              (item.network_business!=0 && item.network_business) &&
              (item.network_social!=0 && item.network_social)
            ) {
              status=true;
            } else {
              status=false;
            }
          }
          if(status==true && arr2.length==founder){
            this.setState({class1:" success-tab",error_status_1:"1"});
            validate=true;
          }else{
            this.setState({class1:" error-tab",error_status_1:"0"});
            validate=false;
          }
        }else{
          this.setState({class1:" error-tab",error_status_1:"0"});
            validate=false;
        }
        
        // for core team member
        let arr3=[];
        for(let item of result.data){
          if(item.role_type=='core-team-member' && item.email!=form_email && item.form_id==form_id){
            arr3=[...arr3,item];
          }
        }
        if(arr3.length>0){
          let status=false;
          for(let item of arr3){
            if (
              item.name &&
              item.email &&
              item.role_type &&
              (item.leadership!=0 && item.leadership) &&
              (item.understanding_finance!=0 && item.understanding_finance) &&
              (item.understanding_hr!=0 && item.understanding_hr) &&
              (item.understanding_low!=0 && item.understanding_low) &&
              (item.passion_for_current_project!=0 && item.passion_for_current_project) &&
              (item.passion_of_business!=0 && item.passion_of_business) &&
              (item.experimental_mindset!=0 && item.experimental_mindset) &&
              (item.out_of_box_thinking!=0 && item.out_of_box_thinking) &&
              (item.problem_solving!=0 && item.problem_solving) &&
              (item.network_business!=0 && item.network_business) &&
              (item.network_social!=0 && item.network_social)
            ) {
              status=true;
            } else {
              status=false;
            }
          }
          if(status==true && arr3.length==core_member){
            this.setState({class2:" success-tab",error_status_2:"1"});
            validate=true;
          }else{
            this.setState({class2:" error-tab",error_status_2:"0"});
            validate=false;
          }
        }else{
          this.setState({class2:" error-tab",error_status_2:"0"});
            validate=false;
        }

        // for advisor
        let arr4=[];
        for(let item of result.data){
          if(item.role_type=='advisor' && item.email!=form_email && item.form_id==form_id){
            arr4=[...arr4,item];
          }
        }
       
        if(arr4.length>0){
          let status=false;
          for(let item of arr4){
            if (
              item.name &&
              item.email &&
              item.role_type &&
              (item.leadership!='0' && item.leadership) &&
              (item.understanding_finance!='0' && item.understanding_finance) &&
              (item.understanding_hr!='0' && item.understanding_hr) &&
              (item.understanding_low!='0' && item.understanding_low) &&
              (item.passion_for_current_project!='0' && item.passion_for_current_project) &&
              (item.passion_of_business!='0' && item.passion_of_business) &&
              (item.experimental_mindset!='0' && item.experimental_mindset) &&
              (item.out_of_box_thinking!='0' && item.out_of_box_thinking) &&
              (item.problem_solving!='0' && item.problem_solving) &&
              (item.network_business!='0' && item.network_business) &&
              (item.network_social!='0' && item.network_social)
            ) {
              status=true;
            } else {
              status=false;
            }
          }
       
          if(status==true && arr4.length==advisor){
            this.setState({class3:" success-tab",error_status_3:"1"});
            validate=true;
          }else{
            this.setState({class3:" error-tab",error_status_3:"0"});
            validate=false;
          }
        }else{
          this.setState({class3:" error-tab",error_status_3:"0"});
            validate=false;
        }
        this.setState({validated:validate});
      }
    });
  };

  change_member_status = (value) => {
    // console.log("value", value);
    this.setState({ member_is_present: value });
  };
  // update user status
  update_user_count=(user_type)=>{
    if(user_type=='founder'){
      this.setState({is_founder_available:false});
    }else if(user_type=='core-team-member'){
      this.setState({is_core_team_available:false});
    }else if(user_type=='advisor'){
      this.setState({is_advisor_available:false});
    }
  }
  activatetab=(value)=>{
    // console.log('value',value);
    this.setState({ activeform: value });
    $("html, body").animate({ scrollTop: 0 }, 1000);
    this.checkforvalidation();
  }


  render() {
    return (
      <div className="row">
        <div className="col-lg-4">
          <div className="multistep-form-icons">
            <ul>
              <li onClick={() => this.activethistab(0)}>
                <div>
                  <div
                    className={
                      this.state.activeform == 0
                        ? "circle active-tab"
                        : "circle " + this.state.class0
                    }
                  >
                    {(this.state.activeform==0 || this.state.class0=="") &&
                      <i className='bx bxs-group' style={{fontSize:22}}></i>}
                    {this.state.activeform != 0 &&
                      this.state.class0==" success-tab" && (
                        <i style={{ fontSize: 28 }} className="bx bx-check"></i>
                      )}
                    {this.state.activeform!= 0 &&
                      this.state.class0==" error-tab" && (
                        <i style={{fontSize:28}} className="bx bx-x"></i>
                      )}
                  </div>
                  <span>Self Evaluation</span>
                  <div className="line"></div>
                </div>
              </li>
              {this.state.is_founder_available==true && (
                <li onClick={() => this.activethistab(1)}>
                  <div>
                    <div
                      className={
                        this.state.activeform == 1
                          ? "circle active-tab"
                          : "circle " + this.state.class1
                      }
                    >
                      {(this.state.activeform == 1 || this.state.class1 == "") &&
                        <i className='bx bxs-group' style={{fontSize:22}}></i>}
                      {this.state.activeform != 1 && this.state.class1==" success-tab" && (
                          <i style={{ fontSize: 28 }} className="bx bx-check"></i>
                        )}
                      {this.state.activeform!=1 && this.state.class1==" error-tab" && (
                          <i style={{ fontSize: 28 }} className="bx bx-x"></i>
                        )}
                    </div>
                    <span>Co Founders / Founders</span>
                    <div className="line"></div>
                  </div>
                </li>
              )}
              {this.state.is_core_team_available==true && (
                <li onClick={() => this.activethistab(2)}>
                  <div>
                    <div
                      className={
                        this.state.activeform == 2
                          ? "circle active-tab"
                          : "circle " + this.state.class2
                      }
                    >
                      {(this.state.activeform == 2 || this.state.class2 == "") &&
                        <i className='bx bxs-group' style={{fontSize:22}}></i>}
                      {this.state.activeform != 2 &&
                        this.state.class2 == " success-tab" && (
                          <i style={{ fontSize: 28 }} className="bx bx-check"></i>
                        )}
                      {this.state.activeform != 2 &&
                        this.state.class2 == " error-tab" && (
                          <i style={{ fontSize: 28 }} className="bx bx-x"></i>
                        )}
                    </div>
                    <span>Core Team Members</span>
                    <div className="line"></div>
                  </div>
                </li>
               )}
              {this.state.is_advisor_available==true && (
                <li onClick={() => this.activethistab(3)}>
                  <div>
                    <div
                      className={
                        this.state.activeform == 3
                          ? "circle active-tab"
                          : "circle " + this.state.class3
                      }
                    >
                      {(this.state.activeform == 3 || this.state.class3 == "") &&
                        <i className='bx bxs-group' style={{fontSize:22}}></i>}
                      {this.state.activeform != 3 &&
                        this.state.class3 == " success-tab" && (
                          <i style={{ fontSize: 28 }} className="bx bx-check"></i>
                        )}
                      {this.state.activeform != 3 &&
                        this.state.class3 == " error-tab" && (
                          <i style={{ fontSize: 28 }} className="bx bx-x"></i>
                        )}
                    </div>
                    <span>Advisors</span>
                    <div className="line"></div>
                  </div>
                </li>
              )}
              <li onClick={() => this.activethistab(4)}>
                <div>
                  <div
                    className={
                      this.state.activeform == 4
                        ? "circle active-tab"
                        : "circle" + this.state.class4
                    }
                  >
                    {(this.state.activeform == 4 || this.state.class4 == "") &&
                      <i className='bx bx-check-double' style={{fontSize:22}}></i>}
                    {this.state.activeform != 4 &&
                      this.state.class4 == " success-tab" && (
                        <i style={{ fontSize: 28 }} className="bx bx-check"></i>
                      )}
                    {this.state.activeform != 4 &&
                      this.state.class4 == " error-tab" && (
                        <i style={{ fontSize: 28 }} className="bx bx-x"></i>
                      )}
                  </div>
                  <span>Submission</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-8">
          {this.state.activeform == "0" && (
            <>
              {this.state.user_type=='founder' &&(
                 <FounderSelf
                  activate={() => this.activeform(1)}
                  next={() => this.activeform(1)}
                  fatchdata={() => this.getData()}
                  error={this.state.error_status_0}
                  form_data={this.state.founder_error_data.length>0 ? this.state.founder_error_data : []}
                  check={()=>this.checkforvalidation()}
                  is_founder_available={this.state.is_founder_available}
                  is_core_team_available={this.state.is_core_team_available}
                  is_advisor_available={this.state.is_advisor_available}
                  activatetab={this.activatetab}
                />
              )}
              {this.state.user_type=='core-team-member' &&(
                <>
                  <FounderSelf 
                    activate={() => this.activeform(1)}
                    next={() => this.activeform(1)}
                    fatchdata={() => this.getData()}
                    error={this.state.error_status_0}
                    form_data={this.state.founder_error_data.length>0 ? this.state.founder_error_data : []}
                    check={()=>this.checkforvalidation()}
                    is_founder_available={this.state.is_founder_available}
                    is_core_team_available={this.state.is_core_team_available}
                    is_advisor_available={this.state.is_advisor_available}
                  />
                </>
              )}
              {this.state.user_type=='advisor' &&(
                 <Advisor 
                  activate={() => this.activeform(1)}
                  next={() => this.activeform(1)}
                  fatchdata={() => this.getData()}
                  error={this.state.error_status_0}
                  form_data={this.state.founder_error_data.length>0 ? this.state.founder_error_data : []}
                  check={()=>this.checkforvalidation()}
                  is_founder_available={this.state.is_founder_available}
                  is_core_team_available={this.state.is_core_team_available}
                  is_advisor_available={this.state.is_advisor_available}
                />
              )}
            </>
          )}
          {this.state.activeform == "1" && (
            <CommonAssessment
              activate={() => this.activeform(2)}
              prev={() => this.activeform(0)}
              next={() => this.activeform(2)}
              onClick={() => this.activatethisform(1)}
              fatchdata={() => this.getData()}
              error={this.state.error_status_1}
              title="Founder Assesment"
              user_type="founder"
              update={this.update_user_count}
              check={()=>this.checkforvalidation()}
              is_founder_available={this.state.is_founder_available}
              is_core_team_available={this.state.is_core_team_available}
              is_advisor_available={this.state.is_advisor_available}
            />
          )}
          {this.state.activeform == "2" && (
            <CommonAssessment
              activate={() => this.activeform(3)}
              prev={() => this.activeform(1)}
              next={() => this.activeform(3)}
              fatchdata={() => this.getData()}
              error={this.state.error_status_2}
              change_member_status={this.change_member_status}
              activate2={() => this.activeform(4)}
              title="Core Team Assesment"
              user_type="core-team-member"
              update={this.update_user_count}
              check={()=>this.checkforvalidation()}
              is_founder_available={this.state.is_founder_available}
              is_core_team_available={this.state.is_core_team_available}
              is_advisor_available={this.state.is_advisor_available}
            />
          )}
          {this.state.activeform == "3" && (
            <CommonAssessment
              activate={() => this.activeform(4)}
              prev={() => this.activeform(2)}
              next={() => this.activeform(4)}
              fatchdata={() => this.getData()}
              error={this.state.error_status_3}
              title="Advisor Assesment"
              user_type="advisor"
              update={this.update_user_count}
              check={()=>this.checkforvalidation()}
              is_founder_available={this.state.is_founder_available}
              is_core_team_available={this.state.is_core_team_available}
              is_advisor_available={this.state.is_advisor_available}
            />
          )}
          {this.state.activeform == "4" && (
            <Submission
              activate={() => this.activeform(5)}
              prev={() => this.activeform(3)}
              prev2={() => this.activeform(2)}
              next={() => this.activeform(4)}
              fatchdata={() => this.getData()}
              error={this.state.error_status_4}
              member_status={this.state.member_is_present}
              check={()=>this.checkforvalidation2()}
              validated={this.state.validated}
              error0={this.state.error_status_0}
              error1={this.state.error_status_1}
              error2={this.state.error_status_2}
              error3={this.state.error_status_3}
              is_founder_available={this.state.is_founder_available}
              is_core_team_available={this.state.is_core_team_available}
              is_advisor_available={this.state.is_advisor_available}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Founder;
