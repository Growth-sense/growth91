import React, { Component } from "react";
import { Checkbox, message, Spin } from "antd";
import Bridge from "../../constants/Bridge";

import $ from "jquery";
class IntellectualProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trademark: "",
      patents: "",
      other_ips: "",
      other_relevant_details: "",
      all_iprs_rwgistered_in_company: "",
      founder_id: "",
      loading: false,
      valueispresent: false,
      processtype: "",
      page4NA: false,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("founder_id")) {
      this.setState({ founder_id: localStorage.getItem("founder_id") });
      let id = localStorage.getItem("founder_id");
    }
    $("#selected-field").focus();
    this.props.check();
  }
  
  updatefounder = () => {
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
        this.setState({ loading: false, valueispresent: true });
        if (this.state.processtype == "next") {
          this.props.next();
        } else if (this.state.processtype == "prev") {
          this.props.prev();
        } else if (this.state.processtype == "saveandproceed") {
          this.props.activate();
          message.success(
            "Intellectual Property details are updated successfully.",
            6
          );
        } else {
          message.success(
            "Intellectual Property details are updated successfully.",
            6
          );
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };
  
  save = () => {
    this.setState({ processtype: "save" }, () => this.updatefounder());
  };
  next = () => {
    this.setState({ processtype: "next" }, () => this.updatefounder());
  };
  prev = () => {
    this.setState({ processtype: "prev" }, () => this.updatefounder());
  };
  render() {
    let active =
      this.state.trademark &&
      this.state.patents &&
      this.state.other_ips &&
      this.state.other_relevant_details &&
      this.state.all_iprs_rwgistered_in_company &&
      this.state.valueispresent == true
        ? false
        : true;
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
                          position: "relative",
                          paddingRight: 10,
                        }}
                      >
                        Intellectual Property
                      </span>
                    </div>
                    <hr />
                  </div>
                  {this.props.error == "0" &&
                    (!this.state.trademark ||
                      !this.state.patents ||
                      !this.state.other_ips ||
                      !this.state.all_iprs_rwgistered_in_company) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {!this.state.trademark && (
                            <li>
                              <span>Trademark is required.</span>
                            </li>
                          )}
                          {!this.state.patents && (
                            <li>
                              <span>Patents are required.</span>
                            </li>
                          )}
                          {!this.state.other_ips && (
                            <li>
                              <span>Other IPs are required.</span>
                            </li>
                          )}
                          {!this.state.all_iprs_rwgistered_in_company && (
                            <li>
                              <span>
                                Registered company names are required.
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="d-flex">
                          
                          <Checkbox
                            name="tpage4NA"
                            style={{ width: 35 }}
                            checked={this.props.unicorn.tpage4NA == "1"}
                            value={this.props.unicorn.tpage4NA== true ?(1):(0)}
                            onChange={(e) =>{
                              if(e.target.checked){
                                this.props.setMultiple({
                                  tpage4NA: "1",
                                  tudTrademark: "",
                                  tudPatents: "",
                                  tudOtherIPs: "",
                                  tudOtherDetailsIPs: "",
                                  tudIPsRegistrationInfo: "",
                                })
                              }
                              else{
                                this.props.onInput(e.target.name, e.target.checked ? "1" : "0")
                              }
                              
                            }
                            }
                          ></Checkbox>
                          <span className="ml-2">Not Applicable</span>
                        </div>
                      </div>

                      <div className="form-group mt-3">
                        <label for="">Trademark</label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudTrademark"
                          disabled={this.props.unicorn.tpage4NA == "1"}
                          // id="selected-field"
                          value={this.props.unicorn.tudTrademark}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Patents</label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudPatents"
                          disabled={this.props.unicorn.tpage4NA == "1"}
                          value={this.props.unicorn.tudPatents}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Other IPs</label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudOtherIPs"
                          disabled={this.props.unicorn.tpage4NA == "1"}
                          value={this.props.unicorn.tudOtherIPs}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Other relevant details about IPs</label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudOtherDetailsIPs"
                          disabled={this.props.unicorn.tpage4NA == "1"}
                          value={this.props.unicorn.tudOtherDetailsIPs}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">
                          Are all IPRs registered in Company's name (And not
                          Founder's or other name). If not, please give details.
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudIPsRegistrationInfo"
                          disabled={this.props.unicorn.tpage4NA == "1"}
                          value={this.props.unicorn.tudIPsRegistrationInfo}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group  justify-content-between process-options">
                        <div className="arrow-buttons">
                          <button
                            style={{
                              position: "relative",
                              left: -20,
                              background: "#fff",
                              border: "1px solid #29176f",
                              color: "#29176f",
                            }}
                            onClick={this.prev}
                            class="submit-button"
                          >
                            <i className="bx bx-chevron-left"></i>
                          </button>
                          <button
                            style={{
                              position: "relative",
                              left: -20,
                              background: active == false ? "#fff" : "#fff",
                              border:
                                active == false
                                  ? "1px solid #29176f"
                                  : "1px solid #29176f",
                              color: active == false ? "#29176f" : "#29176f",
                            }}
                            onClick={this.next}
                            class="submit-button"
                          >
                            <i className="bx bx-chevron-right"></i>
                          </button>
                        </div>
                        <div></div>
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
export default IntellectualProperty;
