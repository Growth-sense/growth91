import React, { Component } from "react";
import { message, Spin } from "antd";
import Bridge from "../../constants/Bridge";

import $ from "jquery";
class Viewpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reference_of_customers: "",
      reference_of_vendors: "",
      reference_of_past_employer: "",
      reference_of_guide_from_college: "",
      founder_id: "",
      loading: false,
      processtype: "",
    };
  }

  componentDidMount() {
    if (this.props.id) {
      let id = this.props.id;
    }
    $("#selected-field").focus();
    this.props.check();
  }
  getData = (id) => {
    let params = {
      founder_id: this.props.id,
    };
    Bridge.founder.getFounderDetails(params).then((result) => {
      console.log("result", result.data[0].reference_of_guide_from_college);
      if (result.status == 1) {
        this.setState({
          reference_of_customers: result.data[0].reference_of_customers,
          reference_of_vendors: result.data[0].reference_of_vendors,
          reference_of_past_employer: result.data[0].reference_of_past_employer,
          reference_of_guide_from_college:
            result.data[0].reference_of_guide_from_college,
        });
        if (result.data[0].reference_of_customers) {
          this.setState({ valueispresent: true });
        }
      }
    });
  };

  updatefounder = () => {
    let params = {
      reference_of_customers: this.state.reference_of_customers,
      reference_of_vendors: this.state.reference_of_vendors,
      reference_of_past_employer: this.state.reference_of_past_employer,
      reference_of_guide_from_college:
        this.state.reference_of_guide_from_college,
      founder_id: this.state.founder_id,
      no: 18,
      main_founder_id: localStorage.getItem("founder_id"),
      f18_status:
        this.state.processtype == "saveandproceed" ? "success" : "new",
    };
    this.setState({ loading: true });
    Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
      if (result.status == 1) {
        this.setState({ loading: false }, () => this.props.activate());
        if (this.state.processtype == "next") {
          this.props.next();
        } else if (this.state.processtype == "prev") {
          this.props.prev();
        } else if (this.state.processtype == "saveandproceed") {
          this.props.activate();
          message.success("Reference details are updated successfully.", 6);
        } else {
          message.success("Reference details are updated successfully.", 6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };

  saveandproceed = () => {
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
    let active = false;

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
                        Reference{" "}
                      </span>
                    </div>
                    <hr />
                  </div>
                  <div className="row" style={{ maxWidth: 900 }}>
                 
                    <div
                      className="form-group  justify-content-between"
                      style={{ display: "none !important" }}
                    >
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
          </Spin>
        </section>
      </div>
    );
  }
}

export default Viewpage;
