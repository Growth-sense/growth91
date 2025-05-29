import React, { Component } from "react";
import { message, Spin } from "antd";
import Bridge from "../../constants/Bridge";

import $ from "jquery";
import CountrySelect from "../../investor/register/CountrySelect";
class Dellistinicorn extends Component {
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
                        Other info{" "}
                      </span>
                    </div>
                    <hr />
                  </div>
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label for="">Startup Founder Name<span className="text-danger">*</span></label>
                        <input
                          type="email"
                          onWheel={() => document.activeElement.blur()}
                          name="tudStartupFounderName"
                          value={this.props.unicorn.tudStartupFounderName}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Legal Name<span className="text-danger">*</span></label>
                        <input
                          type="text"
                          onWheel={() => document.activeElement.blur()}
                          name="tudLegalname"
                          value={this.props.unicorn.tudLegalname}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Startup Founder Mobile Number<span className="text-danger">*</span></label>
                        <div style={{display:"flex",alignItems:"baseline"}}>
                          <CountrySelect
                            value={this.props.unicorn.tudStartupFounderMobileCountryCode}
                            onChange={(e) =>
                              this.props.onInput("tudStartupFounderMobileCountryCode", e.target.value)
                            }
                          />
                          <input
                            type="email"
                            onWheel={() => document.activeElement.blur()}
                            name="tudStartupFounderMobileNumber"
                            value={
                              this.props.unicorn.tudStartupFounderMobileNumber
                            }
                            onChange={(e) =>
                              this.props.onInput(e.target.name, e.target.value)
                            }
                          />
                        </div>
                        
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Startup Founder Email<span className="text-danger">*</span></label>
                        <input
                          type="email"
                          onWheel={() => document.activeElement.blur()}
                          name="tudStartupFounderEmail"
                          value={this.props.unicorn.tudStartupFounderEmail}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Founded<span className="text-danger">*</span></label>
                        <input
                          type="date"
                          onWheel={() => document.activeElement.blur()}
                          name="tudFoundedon"
                          value={this.props.unicorn.tudFoundedon}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Address<span className="text-danger">*</span></label>
                        <input
                          type="text"
                          onWheel={() => document.activeElement.blur()}
                          name="tudAddress"
                          value={this.props.unicorn.tudAddress}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Employees <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          onWheel={() => document.activeElement.blur()}
                          name="tudEmployees"
                          value={this.props.unicorn.tudEmployees}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                      
                      <div className="form-group">
                        <label for="">Deal Description<span className="text-danger">*</span></label>
                        <input
                          type="texttext"
                          onWheel={() => document.activeElement.blur()}
                          name="tudDealDescription"
                          value={this.props.unicorn.tudDealDescription}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Youtube Link</label>
                        <label for="">(Leave the section blank if you don't have a video link to add)</label>
                        <input
                          type="text"
                          onWheel={() => document.activeElement.blur()}
                          name="tudYoutubeLink"
                          value={this.props.unicorn.tudYoutubeLink}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Category<span className="text-danger">*</span></label>
                        <input
                          type="text"
                          onWheel={() => document.activeElement.blur()}
                          name="tudCategory"
                          value={this.props.unicorn.tudCategory}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>{" "}
                   
                      <div className="form-group">
                        <label for="">Tag for your profile<span className="text-danger">*</span></label>
                        <div className="radio-options" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
                            <input
                              type="radio"
                              name="tudTag"
                              value="Need Investment"
                              onChange={(e) => this.props.onInput(e.target.name, e.target.value)}
                              checked={this.props.unicorn.tudTag === "Need Investment"}
                              style={{ marginRight: "8px", width: "16px", height: "16px", marginTop: "2px" }}
                            />
                            <span>Need Investment</span>
                          </label>
                          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
                            <input
                              type="radio"
                              name="tudTag"
                              value="Hiring"
                              onChange={(e) => this.props.onInput(e.target.name, e.target.value)}
                              checked={this.props.unicorn.tudTag === "Hiring"}
                              style={{ marginRight: "8px", width: "16px", height: "16px", marginTop: "2px" }}
                            />
                            <span>Hiring</span>
                          </label>
                          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
                            <input
                              type="radio"
                              name="tudTag"
                              value="Looking for Growth Partnerships"
                              onChange={(e) => this.props.onInput(e.target.name, e.target.value)}
                              checked={this.props.unicorn.tudTag === "Looking for Growth Partnerships"}
                              style={{ marginRight: "8px", width: "16px", height: "16px", marginTop: "2px" }}
                            />
                            <span>Looking for Growth Partnerships</span>
                          </label>
                          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
                            <input
                              type="radio"
                              name="tudTag"
                              value="None"
                              checked={this.props.unicorn.tudTag === "None"}
                              onChange={(e) => this.props.onInput(e.target.name, e.target.value)}
                              style={{ marginRight: "8px", width: "16px", height: "16px", marginTop: "2px" }}
                            />
                            <span>None</span>
                          </label>
                        </div>
                      </div>

                      
                        
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
            </div>
          </Spin>
        </section>
      </div>
    );
  }
}

export default Dellistinicorn;
