import React, { Component } from "react";
import { Radio, message } from "antd";
import Bridge from "../../../constants/Bridge";
import $ from 'jquery';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      roleType: "",
      leaderShip: "",
      understandFinance: "",
      understandHr: "",
      understandLaw: "",
      passionCurProject: "",
      experimentalMindset: "",
      outOFBox: "",
      problemSolving: "",
      networkBusiness: "",
      networkSocial: "",
      passionOfBusiness: "",
      loading:false,
      form_data:{},
      error_status_0:'',
      class0:'',
      allerror:false,
      type:'',
      show_error:true,
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.item.name,
      email: this.props.item.email,
      roleType: this.props.item.role,
    },()=>this.getuserdetails());
    // this.props.check();
    
  }
  save = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let params = {
      name: this.state.name,
      email: this.state.email,
      roleType: this.state.roleType,
      leaderShip: this.state.leaderShip,
      understandFinance: this.state.understandFinance,
      understandHr: this.state.understandHr,
      understandLaw: this.state.understandLaw,
      passionCurProject: this.state.passionCurProject,
      passionOfBusiness: this.state.passionOfBusiness,
      experimentalMindset: this.state.experimentalMindset,
      outOFBox: this.state.outOFBox,
      problemSolving: this.state.problemSolving,
      networkBusiness: this.state.networkBusiness,
      networkSocial: this.state.networkSocial,
      user_type: this.state.roleType,
      submmited_by_founder_id: localStorage.getItem("form_founder_id"),
      form_id: localStorage.getItem("form_id"),
    };
    Bridge.save_startup_form_2(params).then((result) => {
      if (result.status === 1) {
        message.success(result.message);
        this.getuserdetails();
        $("html, body").animate({ scrollTop: 0 }, 1000);
        this.props.check();
        if(this.state.type==='saveandproceed'){
          this.checkforvalidation();
          this.setState({show_error:false});
        }else if(this.state.type==='save'){
          this.setState({show_error:false});
        }
      } else {
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
    } else if (!this.state.passionOfBusiness) {
      message.warning("Invalid ratings of passion of business field");
      return;
    } else if (!this.state.experimentalMindset) {
      message.warning("Invalid ratings of experimental mindset field");
      return;
    } else if (!this.state.outOFBox) {
      message.warning("Invalid ratings of out of boc field");
      return;
    } else if (!this.state.problemSolving) {
      message.warning("Invalid ratings of problem solving field");
      return;
    } else if (!this.state.networkBusiness) {
      message.warning("Invalid ratings of network business field");
      return;
    } else if (!this.state.networkSocial) {
      message.warning("Invalid ratings of network social field");
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
      if (response.status===1) {
        if(response.data.length>0){
          let item=response.data[0];
          this.setState({
            name:item.name,
            email:item.email,
            roleType:item.role_type,
            leaderShip:Number(item.leadership),
            understandFinance:Number(item.understanding_finance),
            understandHr:Number(item.understanding_hr),
            understandLaw:Number(item.understanding_low),
            passionOfBusiness:Number(item.passion_of_business),
            passionCurProject:Number(item.passion_for_current_project),
            experimentalMindset:Number(item.experimental_mindset),
            outOFBox:Number(item.out_of_box_thinking),
            problemSolving:Number(item.problem_solving),
            networkBusiness:Number(item.network_business),
            networkSocial:Number(item.network_social),
          });
        }
      }
    });
  }
   // get user details
  checkforvalidation = () => {
    let founder_id = localStorage.getItem("form_founder_id");
    let form_id = localStorage.getItem("form_id");
    let params = {
      form_id:form_id,
    };
    Bridge.check_validation(params).then((result) => {
      if (result.status === 1) {
        let validate = false;
        let role_type=localStorage.getItem('form_user_type');
        let form_id=localStorage.getItem('form_id');
        let form_email=localStorage.getItem('form_email');
      
        let arr2=[];
          for(let item of result.data){
          if(item.role_type===this.props.user_type && item.email===this.props.item.email && item.form_id===form_id){
            arr2=[...arr2,item];
          }
        }
        
        if(arr2.length>0){
          if (
            (arr2[0].leadership!=='0' && arr2[0].leadership) &&
            (arr2[0].understanding_finance!=='0' && arr2[0].understanding_finance) &&
            (arr2[0].understanding_hr!=='0' && arr2[0].understanding_hr) &&
            (arr2[0].understanding_low!=='0' && arr2[0].understanding_low) &&
            (arr2[0].passion_for_current_project!=='0' && arr2[0].passion_for_current_project) &&
            (arr2[0].passion_of_business!=='0' && arr2[0].passion_of_business) &&
            (arr2[0].experimental_mindset!=='0' && arr2[0].experimental_mindset) &&
            (arr2[0].out_of_box_thinking!=='0' && arr2[0].out_of_box_thinking) &&
            (arr2[0].problem_solving!=='0' && arr2[0].problem_solving) &&
            (arr2[0].network_business!=='0' && arr2[0].network_business) &&
            (arr2[0].network_social!=='0' && arr2[0].network_social)
          ){
            this.setState({class0:" success-tab",error_status_0:"1"});
            validate = true;
          }else{
            this.setState({class0:" error-tab",error_status_0: "0" });
            validate = false;
          }
          arr2[0].validated=validate;
        }else{
           this.setState({ class0: " error-tab", error_status_0: "0",allerror:true, });
          validate = false;
        }
        this.setState({ validated: validate });
      }
    });
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="row" style={{ maxWidth: 900 }}>
          
            {((this.props.error==='0' && this.state.show_error===true) || 
              (((this.state.error_status_0==='0' && this.state.form_data.validated===false) && 
                this.state.show_error===true))) && (
              !this.state.name ||
              !this.state.email ||
              !this.state.roleType ||
              (this.state.leaderShip===0||!this.state.leaderShip) ||
              (this.state.understandFinance===0|| !this.state.understandFinance) ||
              (this.state.understandHr===0 || !this.state.understandHr) ||
              (this.state.understandLaw===0 || !this.state.understandLaw) ||
              (this.state.passionCurProject===0 || !this.state.passionCurProject) ||
              (this.state.passionOfBusiness===0 || !this.state.passionOfBusiness) ||
              (this.state.experimentalMindset===0 || !this.state.experimentalMindset) ||
              (this.state.outOFBox===0 || !this.state.outOFBox) ||
              (this.state.problemSolving===0 || !this.state.problemSolving) ||
              (this.state.networkBusiness===0 || !this.state.networkBusiness) ||
              (this.state.networkSocial===0 || !this.state.networkSocial)
              ) &&(
                <div className='error-div' style={{marginLeft:12}}>
                  <div className='error-icon'><i className='bx bxs-error'></i></div>
                  <ul>
                    {(this.state.leaderShip===0 || !this.state.leaderShip)  &&(
                      <li><span>Please select leader ship field.</span></li>
                    )}
                    {(this.state.understandFinance===0 || !this.state.understandFinance) &&(
                      <li><span>Please select Understanding of Finance field.</span></li>
                    )}
                    {(this.state.understandHr===0 || !this.state.understandHr) &&(
                      <li><span>Please select Understanding of HR field.</span></li>
                    )}
                    {(this.state.understandLaw===0 || !this.state.understandLaw)&&(
                      <li><span>Please select Understanding of Law  field.</span></li>
                    )}
                    {(this.state.passionCurProject==='0' || this.state.passionCurProject==='') &&(
                      <li><span>Please select Passion for Current Project field.</span></li>
                    )}
                    {(this.state.passionOfBusiness===0 || !this.state.passionOfBusiness)&&(
                      <li><span>Please select Passion for business field.</span></li>
                    )}
                    {(this.state.experimentalMindset===0 || !this.state.experimentalMindset) &&(
                      <li><span>Please select Experimental Mindset field.</span></li>
                    )}
                    {(this.state.outOFBox===0 || !this.state.outOFBox) &&(
                      <li><span>Please select Out of Box Thinking field.</span></li>
                    )}
                    {(this.state.problemSolving===0 || !this.state.problemSolving) &&(
                      <li><span>Please select Problem Solving Skills field.</span></li>
                    )}
                    {(this.state.networkBusiness===0 || !this.state.networkBusiness) &&(
                      <li><span>Please select Networking Business field.</span></li>
                    )}
                    {(this.state.networkSocial===0 || !this.state.networkSocial)&&(
                      <li><span>Please select Networking Social field.</span></li>
                    )}
                  </ul>
                </div>
              )}
              {(this.state.allerror===true && this.props.error!=='0' && this.props.show_error===true)  && (
                <div className='error-div' style={{marginLeft:12}}>
                  <div className='error-icon'><i className='bx bxs-error'></i></div>
                  <ul>
                  {(this.state.leaderShip===0 || !this.state.leaderShip)  &&(
                      <li><span>Please select leader ship field.</span></li>
                    )}
                    {(this.state.understandFinance===0 || !this.state.understandFinance) &&(
                      <li><span>Please select Understanding of Finance field.</span></li>
                    )}
                    {(this.state.understandHr===0 || !this.state.understandHr) &&(
                      <li><span>Please select Understanding of HR field.</span></li>
                    )}
                    {(this.state.understandLaw===0 || !this.state.understandLaw)&&(
                      <li><span>Please select Understanding of Law  field.</span></li>
                    )}
                    {(this.state.passionCurProject==='0' || this.state.passionCurProject==='') &&(
                      <li><span>Please select Passion for Current Project field.</span></li>
                    )}
                    {(this.state.passionOfBusiness===0 || !this.state.passionOfBusiness)&&(
                      <li><span>Please select Passion for business field.</span></li>
                    )}
                    {(this.state.experimentalMindset===0 || !this.state.experimentalMindset) &&(
                      <li><span>Please select Experimental Mindset field.</span></li>
                    )}
                    {(this.state.outOFBox===0 || !this.state.outOFBox) &&(
                      <li><span>Please select Out of Box Thinking field.</span></li>
                    )}
                    {(this.state.problemSolving===0 || !this.state.problemSolving) &&(
                      <li><span>Please select Problem Solving Skills field.</span></li>
                    )}
                    {(this.state.networkBusiness===0 || !this.state.networkBusiness) &&(
                      <li><span>Please select Networking Business field.</span></li>
                    )}
                    {(this.state.networkSocial===0 || !this.state.networkSocial)&&(
                      <li><span>Please select Networking Social field.</span></li>
                    )}
                  </ul>
                </div>
              )}

            <div className="col-lg-12">
              <div className="form-group">
                <label for="">Name</label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  disabled={true}
                />
              </div>
              <div className="form-group">
                <label for="">Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  disabled={true}
                />
              </div>
              <div className="form-group">
                <label for="">Role type</label>
                <input
                  type="text"
                  value={this.state.roleType}
                  onChange={(e) => this.setState({ roleType: e.target.value })}
                  disabled={true}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label for="" style={{ marginBottom: 14 }}>
                  Leadership<span className="text-danger">*</span>
                </label>
                <Radio.Group
                  onChange={(e) =>
                    this.setState({ leaderShip: e.target.value })
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

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label for="" style={{ marginBottom: 14 }}>
                  Understanding of HR
                  <span className="text-danger">*</span>
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

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label for="" style={{ marginBottom: 14 }}>
                  Passion for business
                  <span className="text-danger">*</span>
                </label>
                <Radio.Group
                  onChange={(e) =>
                    this.setState({ passionOfBusiness: e.target.value })
                  }
                  value={this.state.passionOfBusiness}
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

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label for="" style={{ marginBottom: 14 }}>
                  Out of Box Thinking
                  <span className="text-danger">*</span>
                </label>
                <Radio.Group
                  onChange={(e) => this.setState({ outOFBox: e.target.value })}
                  value={this.state.outOFBox}
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

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label for="" style={{ marginBottom: 14 }}>
                  Problem Solving
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

              <br />
              <div className="form-group d-flex justify-content-between">
                <div className="arrow-buttons">
                {/*}  <button
                    style={{
                      position: "relative",
                      left: -20,
                      background:"#fff",
                      border: "1px solid #29176f",
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
      </div>
    );
  }
}
