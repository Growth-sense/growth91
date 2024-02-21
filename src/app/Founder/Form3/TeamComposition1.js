import React, { Component } from "react";
import { message } from "antd";
import Bridge from "../../constants/Bridge";

class TeamComposition1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roleType: "",
      email: "",
      count: 0,
      forms: [],
      disablestatus: true,
    };
  }
  // on load
  componentDidMount() {
    this.setState({ roleType: this.state.usertype });
    this.loaddata();
    let founder_id = localStorage.getItem("founder_id");
    console.log("founder_id", founder_id);
  }
  loaddata = () => {
    let arr = [];
    for (let c = 0; c < this.props.count; c++) {
      let obj = {};
      obj = {
        id: c,
        name: "",
        role: "",
        email: "",
        emailerror: "",
      };
      arr = [...arr, obj];
    }
    this.setState({ forms: arr });
  };
  /// set value
  setvalue = (e, count) => {
    let arr = [];
    this.state.forms.map((item, index) => {
      if (count == index) {
        if (e.target.name == "name") {
          item.name = e.target.value;
        }
        if (e.target.name == "email") {
          let status = this.validateEmail(e.target.value);
          if (status == true) {
            item.email = e.target.value;
            item.emailerror = "";
          } else {
            item.email = e.target.value;
            item.emailerror = "Invalid email address.";
          }
        }
      }
      arr = [...arr, item];
    });
    this.setState({ forms: arr });
  };
  validateEmail = (emailAdress) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  };

  // save founders
  savefounders = () => {
    let disablestatus = true;
    let required = false;
    let VALID=true;
    for(let item of this.state.forms){
      if(!item.name || !item.role || !item.email){
        VALID=false;
      }
    }
    if(VALID==false){
      message.warning('Please enter all form details.',5);
      return;
    }
    this.state.forms.map((item, index) => {
      if (item.emailerror != "") {
        required = true;
        this.setState({ disablestatus: true });
        message.warning("Invalid email address.");
        return;
      }
    });
    if (required == false) {
      this.setState({ disablestatus: false });
      let i=0;
      let step=0;
      let arr=[];
      for(let item of this.state.forms){
        if(this.props.usertype=='founder'){
          step=1;
        }else if(this.props.usertype=='core-team-member'){
          step=2;
        }else if(this.props.usertype=='advisor'){
          step=3;
        }
        let params = {
          name: item.name,
          role: item.role,
          email: item.email,
          step:step,
        }
        arr=[...arr,params];
        i++;
      }
      let params={
        founder_id: localStorage.getItem("founder_id"),
        company_id:this.props.startupid,
        arr:JSON.stringify(arr)
      }
      if(arr.length>0){
        Bridge.founder.invite_startup_form_users(params).then((result) => {
          if (result.status==1) {
            message.success(result.message);
            this.props.activate();
            if(step=='3'){
              window.location.reload();
            }
            return;
          }else {
            message.warning(result.message);
            return;
          }
        });
      }else{
        message.warn('Please fill the form correctly.');
        return;
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          {this.state.forms.map((item, index) => {
            return (
              <div>
                <div className="row" key={index}>
                  <div className="form-group col-md-4">
                    <label>
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={item.name}
                      name="name"
                      onChange={(e) => this.setvalue(e, index)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      Role Type<span className="text-danger">*</span>
                    </label>
                    <input type="text" readonly={true} value={item.role} />
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      Email Address<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={item.email}
                      onChange={(e) => this.setvalue(e, index)}
                    />
                    {item.emailerror != "" && (
                      <span
                        className="text-danger"
                        style={{ position: "relative", top: -25 }}
                      >
                        {item.emailerror}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* {this.props.usertype == "advisor" ? (
          <button
            className="submit-button startup-form-next-button"
            onClick={this.savefounders}
            style={{position:'relative',left:22}}
          >
            Submit
          </button>
        ) : (
          <button
            className="submit-button startup-form-next-button"
            onClick={this.savefounders}
            style={{position:'relative',left:22}}
          >
            Next
          </button>
        )} */}
      </div>
    );
  }
}

export default TeamComposition1;
