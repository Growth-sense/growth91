import React, { Component } from "react";
import { message, Spin } from "antd";
import Bridge from "../../constants/Bridge";

import $ from "jquery";
import "./BasicDetais.css";
import axios from "axios";
import CountrySelect from "../../investor/register/CountrySelect";
class BasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      startup_name: "",
      primary_contact_person_name: "",
      primary_contact_person_mobile: "",
      primary_contact_person_email: "",
      loading: false,
      valueispresent: false,
      processtype: "",
      files: [],
    };
  }
  componentDidMount() {
    console.log(this.props.Unicorn);
    if (this.props.id) {
      this.setstate = {
        email: "",
        startup_name: "",
        primary_contact_person_name: "",
        primary_contact_person_mobile: "",
        primary_contact_person_email: "",
        loading: false,
        valueispresent: false,
        processtype: "",
        files: [],
      };
      let id = this.props.id;
    }
    console.log(this.props.tab);
    $("#selected-field").focus();
    this.props.check(1);
  }
  //get form data
  // getData = (id) => {
  //   let params = {
  //     founder_id: localStorage.getItem("founder_id"),
  //   };
  //     if (result.status == 1) {
  //       this.setState({
  //         email: result.data[0].email,
  //         startup_name: result.data[0].startup_name,
  //         primary_contact_person_name:
  //           result.data[0].primary_contact_person_name,
  //         primary_contact_person_mobile:
  //           result.data[0].primary_contact_person_mobile,
  //         primary_contact_person_email:
  //           result.data[0].primary_contact_person_email,
  //       });
  //       if (
  //         result.data[0].email != "" &&
  //         result.data[0].startup_name != "" &&
  //         result.data[0].primary_contact_person_name != "" &&
  //         result.data[0].primary_contact_person_mobile
  //       ) {
  //         this.setState({ valueispresent: true });
  //       } else {
  //         this.setState({ valueispresent: false });
  //       }
  //     }
  //   });
  // };
  checkEmail = (email) => {
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
      message.warning("Please provide a valid email address", 4);
      return false;
    } else {
      return true;
    }
  };
  // register
  register = () => {
    if (this.props.adminnext) {
      if (this.state.processtype == "next") {
        this.props.next();
        return;
      } else if (this.state.processtype == "prev") {
        this.props.prev();
        return;
      }
    }
    let params = {
      tudEmail: this.state.email,
      tudStartupName: this.state.startup_name,
      tudPrimaryContactName: this.state.primary_contact_person_name,
      tudPrimaryContactMobile: this.state.primary_contact_person_mobile,
      tudPrimaryContactEmail: this.state.primary_contact_person_email,
      founderID: localStorage.getItem("founder_id"),
      // f1_status:this.state.processtype=='saveandproceed'?'success':'new',
    };
    this.setState({ loading: true });

    Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
      if (result.status == 1) {
        this.props.check();
        let id = localStorage.getItem("getData");
        this.setState({ loading: false }, () => this.getData(id));
        if (this.state.processtype == "next") {
          this.props.next();
        } else if (this.state.processtype == "saveandproceed") {
          this.props.activate();
          message.success("Basic details are updated successfully.", 6);
        } else {
          message.success("Basic details are updated successfully.", 6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };
  saveandproceed = () => {
    if (!this.state.email) {
      message.warning("Invalid email address.", 4);
      return;
    } else {
      let d = this.checkEmail(this.state.email);
      if (d == false) {
        return;
      }
    }
    if (!this.state.startup_name) {
      message.warning("Invalid startup name.", 4);
      return;
    } else if (!this.state.primary_contact_person_name) {
      message.warning("Please enter contact person name.", 4);
      return;
    }
    if (this.state.primary_contact_person_mobile.length != 10) {
      message.warning("Please enter valid contact person mobile number.", 4);
      return;
    }
    if (!this.state.primary_contact_person_email) {
      message.warning("Please enter contact person email.", 4);
      return;
    } else {
      let d = this.checkEmail(this.state.primary_contact_person_email);
      if (d == false) {
        return;
      }
    }
    // this.props.check(1);
    this.setState({ processtype: "saveandproceed" }, () => this.register());
  };
  save = () => {
    this.setState({ processtype: "save" }, () => this.register());
  };
  next = () => {
    this.setState({ processtype: "next" }, () => this.register());
  };
  fileSelectedHandler = (e) => {
    this.setState({ files: [...this.state.files, ...e.target.files] });
  };

  render() {
    return (
      <div>
        <section className="StepForm-section" style={{ display: "block" }}>
          <Spin spinning={this.state.loading}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
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
                          width: 119,
                          height: 20,
                          zIndex: 4,
                          position: "absolute",
                          paddingRight: 10,
                        }}
                      >
                        Basic Details
                      </span>
                    </div>
                    <hr />
                  </div>

                  {this.props.error == "0" &&
                    (!this.state.email ||
                      !this.state.startup_name ||
                      !this.state.primary_contact_person_name ||
                      !this.state.primary_contact_person_mobile) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {!this.state.email && (
                            <li>
                              <span>Email is required.</span>
                            </li>
                          )}
                          {!this.state.startup_name && (
                            <li>
                              <span>Name Of Startup is required.</span>
                            </li>
                          )}
                          {!this.state.primary_contact_person_name && (
                            <li>
                              <span>
                                Primary Contact Person(Name) is required.
                              </span>
                            </li>
                          )}
                          {!this.state.primary_contact_person_mobile && (
                            <li>
                              <span>
                                Primary Contact Person (Mobile) is required.
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group input-rezized">
                        <label for="">
                          Enter Your Email<span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your Email"
                          name="tudEmail"
                          value={this.props.unicorn.tudEmail}
                          id="selected-field"
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          } //.
                        />
                      </div>
                      <div className="form-group input-rezized">
                        <label for="">
                          Name Of Startup<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your Startup name"
                          name="tudStartupName"
                          value={this.props.unicorn.tudStartupName}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          } //.
                        />
                      </div>
                      <div className="form-group input-rezized">
                        <label for="">
                          Primary Contact Person(Name)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          name="tudPrimaryContactName"
                          value={this.props.unicorn.tudPrimaryContactName}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          } //.
                        />
                      </div>
                      <div className="form-group input-rezized">
                        <label for="">
                          Primary Contact Person (Mobile)
                          <span className="text-danger">*</span>
                        </label>
                        <div style={{display:"flex",alignItems:"baseline"}}>
                        <CountrySelect
                          value={this.props.unicorn.tudCountryCode}
                          onChange={(e) =>
                            this.props.onInput("tudCountryCode", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          placeholder="Enter Mobile"
                          name="tudPrimaryContactMobile"
                          value={this.props.unicorn.tudPrimaryContactMobile}
                          onWheel={() => document.activeElement.blur()}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          } 
                        />
                        </div>
                      </div>
                      <div className="form-group input-rezized">
                        <label for="">
                          Primary Contact Person (Email){" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter Email "
                          name="tudPrimaryContactEmail"
                          value={this.props.unicorn.tudPrimaryContactEmail}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          } //.
                        />
                      </div>
                      {/* <input type="file" multiple onChange={this.fileSelectedHandler} /> */}
                      <div
                        className="form-group  justify-content-between"
                        // style={{display:"none !important"}}
                      >
                        <div className="arrow-buttons">
                          <button
                            style={{
                              position: "relative",
                              left: -20,
                              background:
                                this.state.valueispresent == true
                                  ? "#fff"
                                  : "#fff",
                              border:
                                this.state.valueispresent == true
                                  ? "1px solid #29176f"
                                  : "1px solid #29176f",
                              color:
                                this.state.valueispresent == true
                                  ? "#29176f"
                                  : "#29176f",
                            }}
                            onClick={this.next}
                            class="submit-button"
                          >
                            <i className="bx bx-chevron-right"></i>
                          </button>
                        </div>
                        {/* <div>
                          <button
                            style={{ width: 116, marginRight: 13 }}
                            class="submit-button"
                            onClick={() => this.save()}
                          >
                            Save
                          </button>
                          <button
                            style={{ width: 190 }}
                            class="submit-button"
                            onClick={() => this.saveandproceed()}
                          >
                            Validate & Proceed
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Spin>
        </section>
      </div>
    );
  }
}
export default BasicDetails;
