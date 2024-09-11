import React, { Component } from "react";
import { message, Spin } from "antd";
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
  getData = (id) => {
    let params = {
      founder_id: this.props.id,
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          trademark: result.data[0].trademark,
          patents: result.data[0].patents,
          other_ips: result.data[0].other_ips,
          other_relevant_details: result.data[0].other_relevant_details,
          all_iprs_rwgistered_in_company:
            result.data[0].all_iprs_rwgistered_in_company,
        });
        if (result.data[0].trademark) {
          this.setState({ valueispresent: true });
        }
      }
    });
  };
  updatefounder = () => {
    let params = {
      trademark: this.state.trademark,
      patents: this.state.patents,
      other_ips: this.state.other_ips,
      other_relevant_details: this.state.other_relevant_details,
      all_iprs_rwgistered_in_company: this.state.all_iprs_rwgistered_in_company,
      founder_id: this.state.founder_id,
      no: 3,
      main_founder_id: localStorage.getItem("founder_id"),
      f3_status: this.state.processtype == "saveandproceed" ? "success" : "new",
    };
    this.setState({ loading: true });
    Bridge.founder.updatefounder(params).then((result) => {
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
  saveandproceed = () => {
    if (!this.state.trademark) {
      message.warning("Please enter the value of field Trademarks");
      return;
    } else if (!this.state.patents) {
      message.warning("Please enter the value of field Patents");
      return;
    } else if (!this.state.other_ips) {
      message.warning("Please enter the value of field customer Other IPS.");
      return;
    } else if (!this.state.all_iprs_rwgistered_in_company) {
      message.warning(
        "Please enter the value of field All IPRS Registered In Company"
      );
      return;
    }
    // this.props.check();
    this.setState({ processtype: "saveandproceed" }, () =>
      this.updatefounder()
    );
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
                      <div className="form-group mt-3">
                        <label for="">
                          Trademark<span className="text-danger">*</span>
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudTrademark"
                          // id="selected-field"
                          value={this.props.unicorn.tudTrademark}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">
                          Patents<span className="text-danger">*</span>
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudPatents"
                          value={this.props.unicorn.tudPatents}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">
                          Other IPs<span className="text-danger">*</span>
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudOtherIPs"
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
                          <span className="text-danger">*</span>
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudIPsRegistrationInfo"
                          value={
                            this.props.unicorn.tudIPsRegistrationInfo
                          }
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
