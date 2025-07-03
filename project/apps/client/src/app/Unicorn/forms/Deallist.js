import React, { Component } from "react";
import { message, Spin, Select } from "antd";
import Bridge from "../../constants/Bridge";

import $ from "jquery";
import CountrySelect from "../../investor/register/CountrySelect";
import InfoTooltip from "./InfoTooltip";
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

  getSelectedTags = () => {
    const tags = this.props.unicorn.tudTag;
    if (!tags) return [];
    if (tags === "None") return ["None"];
    return tags.split(",").map(tag => tag.trim()).filter(tag => tag);
  };

  handleTagChange = (e) => {
    const { value, checked } = e.target;
    const currentTags = this.getSelectedTags();
    
    if (value === "None") {
      // If "None" is selected, clear all other selections
      this.props.onInput("tudTag", "None");
      return;
    }
    
    let newTags;
    if (checked) {
      // Remove "None" if it was selected and add new tag
      const filteredTags = currentTags.filter(tag => tag !== "None");
      if (filteredTags.length >= 2) {
        // Already have 2 tags, don't add more
        e.target.checked = false;
        return;
      }
      newTags = [...filteredTags, value];
    } else {
      // Remove the unchecked tag
      newTags = currentTags.filter(tag => tag !== value);
    }
    
    // Update the tudTag field
    const tagString = newTags.length > 0 ? newTags.join(", ") : "None";
    this.props.onInput("tudTag", tagString);
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Startup Founder Name<span className="text-danger">*</span>
                          <InfoTooltip title="Full name of all the startup founders." />
                        </label>
                        <label for="">(If more than one founder, please add coma seprated)</label>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Company Legal Name<span className="text-danger">*</span>
                          <InfoTooltip title="Registered legal name as per ROC or GST filings." />
                        </label>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Founder Contact Number<span className="text-danger">*</span>
                          <InfoTooltip title="Contact mobile number of the founder." />
                        </label>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Startup Founder Email<span className="text-danger">*</span>
                          <InfoTooltip title="Official founder email address." />
                        </label>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Date of Incorporation<span className="text-danger">*</span>
                          <InfoTooltip title="Date your startup was incorporated/When you started working on the Idea" />
                        </label>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Registered Address<span className="text-danger">*</span>
                          <InfoTooltip title="Full address including city, state, and PIN code." />
                        </label>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Team Size <span className="text-danger">*</span>
                          <InfoTooltip title="Number of full-time team members." />
                        </label>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Elevator Pitch / Introduction about your startup<span className="text-danger">*</span>
                          <InfoTooltip title="Summary of what you're offering and what you're looking for." />
                        </label>
                        <textarea
                          cols="30"
                          rows="6"
                          maxLength="750"
                          name="tudDealDescription"
                          value={this.props.unicorn.tudDealDescription}
                          onChange={(e) => {
                            this.props.onInput(e.target.name, e.target.value)
                          }}
                          style={{marginBottom: "5px"}}
                        ></textarea>
                        <div className="character-count" style={{
                          marginBottom: "20px",
                          color:
                            this.props.unicorn.tudDealDescription.length < 500
                              ? "#ff4d4f"
                              : "green",
                        }}>
                          {`${this.props.unicorn.tudDealDescription.length}/750 characters`}
                        </div>
                      </div>{" "}
                      <div className="form-group">
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Video Link (Optional)
                          <InfoTooltip title="Product demo/Pitch Video or explainer video (if available)." />
                        </label>
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
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Startup Sector<span className="text-danger">*</span>
                          <InfoTooltip title="Choose the Industry that best describes your startup's space." />
                        </label>
                        <Select
                          style={{marginBottom : 35}}
                          name="tudCategory"
                          value={this.props.unicorn.tudCategory}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                          className="form-control"
                        >
                          <option value="">--Select Sector--</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Astrology">Astrology</option>
                          <option value="AstroTech">AstroTech</option>
                          <option value="Career and Recruitment">Career and Recruitment</option>
                          <option value="CleanTech">CleanTech</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="EdTech">EdTech</option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Finance">Finance</option>
                          <option value="FinTech">FinTech</option>
                          <option value="Foods and Beverages">Foods and Beverages</option>
                          <option value="GenAI">GenAI</option>
                          <option value="HealthTech">HealthTech</option>
                          <option value="Healthy Snacking">Healthy Snacking</option>
                          <option value="HRTech">HRTech</option>
                          <option value="Other">Other</option>
                          <option value="PetCare">PetCare</option>
                          <option value="SpiritualTech">SpiritualTech</option>
                          <option value="Toy Library">Toy Library</option>
                        </Select>
                      </div>{" "}
                   
                      <div className="form-group">
                        <label for="" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          Visibility Tags<span className="text-danger">*</span>
                          <InfoTooltip title="Select up to 2 tags like 'Need Investment', 'Hiring', 'Looking for Partnerships'." />
                        </label>
                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
                          Select up to 2 options
                        </div>
                        <div className="checkbox-options" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
                            <input
                              type="checkbox"
                              value="Need Investment"
                              onChange={(e) => this.handleTagChange(e)}
                              checked={this.getSelectedTags().includes("Need Investment")}
                              style={{ marginRight: "8px", width: "16px", height: "16px", marginTop: "2px" }}
                            />
                            <span>Need Investment</span>
                          </label>
                          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
                            <input
                              type="checkbox"
                              value="Hiring"
                              onChange={(e) => this.handleTagChange(e)}
                              checked={this.getSelectedTags().includes("Hiring")}
                              style={{ marginRight: "8px", width: "16px", height: "16px", marginTop: "2px" }}
                            />
                            <span>Hiring</span>
                          </label>
                          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
                            <input
                              type="checkbox"
                              value="Looking for Growth Partnerships"
                              onChange={(e) => this.handleTagChange(e)}
                              checked={this.getSelectedTags().includes("Looking for Growth Partnerships")}
                              style={{ marginRight: "8px", width: "16px", height: "16px", marginTop: "2px" }}
                            />
                            <span>Looking for Growth Partnerships</span>
                          </label>
                          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
                            <input
                              type="checkbox"
                              value="None"
                              onChange={(e) => this.handleTagChange(e)}
                              checked={this.getSelectedTags().includes("None")}
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
