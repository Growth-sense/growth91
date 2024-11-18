import React, { Component } from "react";
import { DatePicker, Radio, Tabs, message, Spin } from "antd";
import Bridge from "../../../constants/Bridge";
import moment from 'moment';
import $ from 'jquery';

class Advisor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roleType: "Advisor",
      email: "",
      mobile: "",
      linkedIn: "",
      credentials: "",
      specific_responsibilities: "",
      commercialsAndOthers: "",
      formalAppointment: "",
      dateOfJoining: "",
      list: [],
      loading:false,
      form_data:{},
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
        for (let item of result.data) {
          if (item.role=="advisor" && item.id==form_id) {
            arr = [...arr, item];
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
      dtOfJoinBusiness:this.state.dateOfJoining,
      credentials: this.state.credentials,
      specific_responsibilities: this.state.specific_responsibilities,
      commercialsAndOthers: this.state.commercialsAndOthers,
      formalAppointment: this.state.formalAppointment,
      submmited_by_founder_id: localStorage.getItem("form_founder_id"),
      form_id: localStorage.getItem("form_id"),
    };
    // return;
    Bridge.save_startup_founder2_form_self_assesment_form_advisor(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.getuserdetails();
        this.props.check();
        this.checkforvalidation();
        $("html, body").animate({ scrollTop: 0 }, 1000);
      } else {
        message.warning(result.message);
      }
    });
  };
  saveandproceed = () => {
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
    }else if(!this.state.dateOfJoining){
      message.warning("Invalid time Date of Joining business field.");
      return;
    }else if(!this.state.credentials){
      message.warning("Invalid time credentials field.");
      return;
    }else if(!this.state.specific_responsibilities){
      message.warning("Invalid time Specific responsibilities.");
      return;
    }else if(!this.state.commercialsAndOthers){
      message.warning("Invalid time Commercials and other field.");
      return;
    } else if (!this.state.formalAppointment) {
      message.warning("Invalid formal appointment field");
      return;
    } 
    this.save();
  };
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
            credentials: item.credentials,
            specific_responsibilities: item.specific_responsibilities,
            commercialsAndOthers: item.commercialsAndOthers,
            formalAppointment: item.formalAppointment,
            dateOfJoining: item.dtOfJoinBusiness ? moment(item.dtOfJoinBusiness) : moment(),
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
          if((item.role_type==role_type && role_type=='advisor') && item.email==form_email){
            arr=[...arr,item];
          }
        }
        if(arr.length>0){
           if (
            arr[0].name &&
            arr[0].email &&
            arr[0].role_type &&
             arr[0].mobile.length==10 &&
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
            <div className="row">
            {((this.props.error=='0' && this.state.form_data.validated==false) && (
              !this.state.form_data.name ||
              !this.state.form_data.email ||
              !this.state.form_data.role_type ||
              (this.state.form_data.mobile.length!=10) ||
              !this.state.form_data.linkedIn ||
              !this.state.form_data.dtOfJoinBusiness ||
              !this.state.form_data.credentials ||
              !this.state.form_data.specific_responsibilities ||
              !this.state.form_data.commercialsAndOthers ||
              !this.state.form_data.formalAppointment
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
                    {!this.state.form_data.dtOfJoinBusiness &&(
                      <li><span>Date of Joining business field is required.</span></li>
                    )}
                    {!this.state.form_data.credentials &&(
                      <li><span>credentials field is required.</span></li>
                    )}
                    {!this.state.form_data.specific_responsibilities &&(
                      <li><span>Specific responsibilities field is required.</span></li>
                    )}
                    {!this.state.form_data.commercialsAndOthers &&(
                      <li><span>Commercial and other field is required.</span></li>
                    )}
                    {!this.state.form_data.formalAppointment &&(
                      <li><span>Formal appointment field is required.</span></li>
                    )}
                  </ul>
                </div>
              )}
              <div className="col-lg-12">
                <div className="row" style={{ maxWidth: 900 }}>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label for="">Name</label>
                      <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) =>this.setState({ name: e.target.value })}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Email</label>
                      <input
                        type="email" readOnly
                        value={this.state.email}
                        onChange={(e) =>this.setState({ email: e.target.value })}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Role type</label>
                      <input
                        type="text" readOnly
                        value={this.state.roleType}
                        onChange={(e) =>this.setState({ roleType: e.target.value })}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Mobile Number</label>
                      <input
                        type="number"
                        onWheel={() => document.activeElement.blur()}
                        value={this.state.mobile}
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
                        Credentials <span className="text-danger">*</span>
                      </label>
                      <textarea
                        color="30"
                        rows="6"
                        type="text"
                        value={this.state.credentials}
                        onChange={(e) =>
                          this.setState({ credentials: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">
                        Specific responsibilities, if any
                        <span className="text-danger">*</span>
                      </label>
                      <textarea
                        cols="30"
                        rows="6"
                        type="text"
                        value={this.state.specific_responsibilities}
                        onChange={(e) =>
                          this.setState({
                            specific_responsibilities: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">
                        Commercials and other terms
                        <span className="text-danger">*</span>
                      </label>
                      <textarea
                        cols="30"
                        rows="6"
                        value={this.state.commercialsAndOthers}
                        onChange={(e) =>
                          this.setState({ commercialsAndOthers: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">
                        Is it a formal appointment
                        <span className="text-danger">*</span>
                      </label>
                      <textarea
                        color="30"
                        rows="6"
                        type="text"
                        value={this.state.formalAppointment}
                        onChange={(e) =>
                          this.setState({ formalAppointment: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Date of Joining the business</label>

                      <DatePicker
                        format={"DD-MM-YYYY"}
                        style={{
                          width: "100%",
                          marginBottom: 30,
                        }}
                        disabledDate={disabledDate}
                        value={this.state.dateOfJoining}
                        onChange={ (date, dateString)=>{                          
                          this.setState({ dateOfJoining:date })
                        }
                        }
                      />
                    </div>
                    <br />

                    <div>
                      <div className="form-group d-flex justify-content-between">
                        <div className="arrow-buttons">
                          {/*<button
                            style={{
                              position: "relative",
                              left: -20,
                              background:
                                this.state.valueispresent == true
                                  ? "#fff"
                                  : "#ddd",
                              border:
                                this.state.valueispresent == true
                                  ? "1px solid #29176f"
                                  : "1px solid #ddd",
                              color:
                                this.state.valueispresent == true
                                  ? "#29176f"
                                  : "#959595",
                            }}
                            onClick={this.props.next}
                            disabled={
                              this.state.valueispresent == true ? false : true
                            }
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
                            onClick={() => this.save()}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Advisor;
