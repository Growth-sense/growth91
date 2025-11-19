import React, { Component } from "react";
import { message, Spin } from "antd";
import Bridge from "../../constants/Bridge";

import $ from "jquery";
import "./BasicDetais.css";
import axios from "axios";
import CountrySelect from "../../investor/register/CountrySelect";
import InfoTooltip from "./InfoTooltip";
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
      marketoverview: [{ content1: "" }, { content1: "" }, { content1: "" }],
      startuphighlight: [
        { title: "Revenue Growth ", content1: "" },
        { title: " New Initiatives, Operational Efficiency", content1: "" },
        { title: "Performance and Achievements ", content1: "" },
        {
          title: " Previous Funding/Future Funding and its Utilization",
          content1: "",
        },
      ],
      titlestartuphigh: [
        "Revenue Growth ",
        " New Initiatives, Operational Efficiency",
        "Performance and Achievements ",
        " Previous Funding/Future Funding and its Utilization",
      ],
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
        marketoverview: [{ content1: "" }, { content1: "" }, { content1: "" }],
        startuphighlight: [
          { title: "Revenue Growth ", content1: "" },
          { title: " New Initiatives, Operational Efficiency", content1: "" },
          { title: "Performance and Achievements ", content1: "" },
          {
            title: " Previous Funding/Future Funding and its Utilization",
            content1: "",
          },
        ],
        titlestartuphigh: [
          "Revenue Growth ",
          " New Initiatives, Operational Efficiency",
          "Performance and Achievements ",
          " Previous Funding/Future Funding and its Utilization",
        ],
      };
      let id = this.props.id;
    }
    console.log(this.props.tab);
    $("#selected-field").focus();

    if (this.props.unicorn.tudMark) {
      this.setState({ marketoverview: JSON.parse(this.props.unicorn.tudMark) });
    }
    if (this.props.unicorn.tudStartupHighlights) {
      this.setState({ startuphighlight: JSON.parse(this.props.unicorn.tudStartupHighlights) });
    }

    this.props.check(1);
  }

  componentDidUpdate(prevProps) {
    // When unicorn data loads asynchronously in parent, sync tudMark/tudStartupHighlights into local state
    if (prevProps.unicorn.tudMark !== this.props.unicorn.tudMark && this.props.unicorn.tudMark) {
      try {
        const mark = JSON.parse(this.props.unicorn.tudMark);
        if (Array.isArray(mark) && mark.length === 3) {
          this.setState({ marketoverview: mark });
        }
      } catch (e) {
        // ignore parse errors, keep existing state
      }
    }

    if (prevProps.unicorn.tudStartupHighlights !== this.props.unicorn.tudStartupHighlights && this.props.unicorn.tudStartupHighlights) {
      try {
        const highlights = JSON.parse(this.props.unicorn.tudStartupHighlights);
        if (Array.isArray(highlights) && highlights.length === 4) {
          this.setState({ startuphighlight: highlights });
        }
      } catch (e) {
        // ignore parse errors, keep existing state
      }
    }
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

  handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.marketoverview];
    newEntries[index][name] = value;
    this.setState({ marketoverview: newEntries });
    if (this.props.setMultiple) {
      this.props.setMultiple({ tudMark: JSON.stringify(newEntries) });
    }
  };

  handleInputhighlightChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...this.state.startuphighlight];
    newEntries[index][name] = value;
    this.setState({ startuphighlight: newEntries });
    if (this.props.setMultiple) {
      this.props.setMultiple({ tudStartupHighlights: JSON.stringify(newEntries) });
    }
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
                              <span>Startup Name is required.</span>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Startup Name<span className="text-danger">*</span>
                          <InfoTooltip title="Brand name of your startup." />
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

                      {this.state.startuphighlight.map((item, index) => {
                        return (
                          <div className="form-group">
                            <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {index === 0 && "Highlight #1: Revenue"}
                              {index === 1 && "Highlight #2: Ops & Efficiency"}
                              {index === 2 && "Highlight #3: Traction"}
                              {index === 3 && "Highlight #4: Fundraising"}
                              <span className="text-danger">*</span>
                              <InfoTooltip title={
                                index === 0 ? "Key revenue growth, monetization, or repeat customer insights." :
                                index === 1 ? "Process improvements, team efficiency, or tech upgrades." :
                                index === 2 ? "Milestones like users, cities served, recognitions, or partnerships." :
                                "Share prior funding, usage, and future fundraising plan."
                              } />
                            </label>
                            <>
                            <textarea
                              id="selected-field"
                              cols="30"
                              rows="6"
                              maxLength="500"
                              placeholder={this.state.titlestartuphigh[index]}
                              name="content1"
                              value={item.content1}
                              onChange={(e) => {
                                this.handleInputhighlightChange(index, e);
                              }}
                              style={{marginBottom: "5px"}}
                            ></textarea>
                            <div className="character-count" style={{marginBottom: "20px"}}>
                              {`${item.content1.length}/500 characters`}
                            </div>
                            </>
                          </div>
                        );
                      })}

                      <div style={{ 
                        backgroundColor: '#f0f8ff', 
                        padding: '15px', 
                        borderRadius: '5px', 
                        marginBottom: '20px',
                        border: '1px solid #d1ecf1',
                        fontSize: '14px',
                        color: '#0c5460'
                      }}>
                        <strong>Note:</strong> Please make sure not to leave this column empty, kindly add something related to traction, even if it's early-stage (like pilot users, waitlist signups, partnerships, or early interest).
                      </div>

                      {this.state.marketoverview.map((item, index) => {
                        return (
                          <div className="form-group">
                            <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              Market Insight {index + 1}<span className="text-danger">*</span>
                              <InfoTooltip title={
                                index === 0 ? "Define the gap/problem your product is solving. (Max 750 characters)" :
                                index === 1 ? "Add supporting industry insight or demand data." :
                                "Add trends, whitespace, or unique value angle."
                              } />
                            </label>
                            <textarea
                              id="selected-field"
                              cols="30"
                              rows="6"
                              maxLength="750"
                              name="content1"
                              value={item.content1}
                              onChange={(e) => {
                                this.handleInputChange(index, e);
                              }}
                              style={{marginBottom: "5px"}}
                            >
                              {" "}
                            </textarea>
                            <div className="character-count" style={{marginBottom: "20px"}}>
                              {`${item.content1.length}/750 characters`}
                            </div>
                          </div>
                        );
                      })}

                      <div style={{ 
                        backgroundColor: '#f0f8ff', 
                        padding: '15px', 
                        borderRadius: '5px', 
                        marginBottom: '20px',
                        border: '1px solid #d1ecf1',
                        fontSize: '14px',
                        color: '#0c5460'
                      }}>
                        <strong>Note:</strong> Please don't leave this section empty, make sure to include TAM, SAM, and SOM wherever possible.
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
