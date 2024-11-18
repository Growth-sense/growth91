import React, { Component } from "react";
import FounderFormStatus from "../FounderFormStatus";
import $ from "jquery";
import { message, Spin, Select } from "antd";
import Bridge from "../../constants/Bridge";
import ReactGA from "react-ga4";
const { Option } = Select;
class AssessmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      founder_count: 1,
      core_team_count: 0,
      advisor_count: 0,
      loading: false,
      ispresent: false,
      form_status: false,
      startupid: "",
      forms: [],
      formloader: false,
    };
  }
  // doing entry
  show2tab = () => {
    if (this.state.ispresent == false) {
      this.setState({ loading: true });
      let params = {
        founder_id: localStorage.getItem("founder_id"),
      };
      Bridge.founder.add_startup_form_entry(params).then((result) => {
        if (result.status == 1) {
          this.activeTab(1);
          this.setState({ loading: false });
        } else {
          message.warning(result.message);
          this.setState({ loading: false });
        }
      });
    } else {
      this.activeTab(1);
    }
  };
  activeTab = (value) => {
    this.setState({ activeTab: value });
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  };
  componentDidMount() {
    this.getstartupformdetails();
    this.get_startup_form_details();
  }
  get_startup_form_details = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.get_startup_form_details(params).then((res) => {
      if (res.status == "1") {
        this.setState({ startupid: res.startup_id });
      } else {
      }
    });
  };
  /// get form details
  getstartupformdetails = () => {
    this.setState({ loading: true });
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    const headers = {
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    Bridge.founder.getstartupformdetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          ispresent: true,
          form_status: result.data[0].form_status,
          loading: false,
        });
      } else {
        this.setState({ loading: false, ispresent: false });
      }
    });
  };
  handleChange = (value, name) => {
    this.setState({
      [name]: value,
    });
  };
  // doing entry
  selectusers = () => {
    this.setState({ loading: true });
    let params = {
      founder_id: localStorage.getItem("founder_id"),
      founder_count: this.state.founder_count,
      core_team_count: this.state.core_team_count,
      advisor_count: this.state.advisor_count,
    };
    Bridge.founder.update_startup_form_entry(params).then((result) => {
      if (result.status == 1) {
        this.setState({ loading: false }, () => this.loaddata());
      } else {
        this.setState({ loading: false });
      }
    });
  };
  loaddata = () => {
    let arr = [];
    for (let c = 0; c < this.state.founder_count; c++) {
      let obj = {};
      obj = {
        id: c,
        name: "",
        role: "founder",
        email: "",
        emailerror: "",
      };
      arr = [...arr, obj];
    }
    let arr2 = [];
    for (let c = 0; c < this.state.core_team_count; c++) {
      let obj = {};
      obj = {
        id: c,
        name: "",
        role: "core-team-member",
        email: "",
        emailerror: "",
      };
      arr2 = [...arr2, obj];
    }
    let arr3 = [];
    for (let c = 0; c < this.state.advisor_count; c++) {
      let obj = {};
      obj = {
        id: c,
        name: "",
        role: "advisor",
        email: "",
        emailerror: "",
      };
      arr3 = [...arr3, obj];
    }
    let newArray = arr.concat(arr2);
    let newArr = newArray.concat(arr3);
    this.setState({ forms: newArr }, () => this.activeTab(2));
  };
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
    let required = false;
    let VALID = true;
    for (let item of this.state.forms) {
      if (!item.name || !item.role || !item.email) {
        VALID = false;
      }
    }
    if (VALID == false) {
      message.warning("Please enter all form details.", 5);
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
    // check for duplicate email
    let duplicateArr = [];
    for (let item of this.state.forms) {
      if (item.email) {
        duplicateArr.push(item.email);
      }
    }
    const seen = new Set();
    const duplicates = duplicateArr.filter(
      (n) => seen.size === seen.add(n).size
    );
    if (duplicates.length > 0) {
      message.warning("Duplicate email exists.", 5);
      return;
    }
    if (required == false) {
      this.setState({ disablestatus: false });
      let i = 0;
      let step = 0;
      let arr = [];
      for (let item of this.state.forms) {
        let params = {
          name: item.name,
          role: item.role,
          email: item.email,
          step: "3",
        };
        arr = [...arr, params];
        i++;
      }
      this.setState({ formloader: true });
      let params = {
        founder_id: localStorage.getItem("founder_id"),
        company_id: this.state.startupid,
        arr: JSON.stringify(arr),
      };
      if (arr.length > 0) {
        Bridge.founder.invite_startup_form_users(params).then((result) => {
          if (result.status == 1) {
            message.success(result.message, 5);
            this.setState({ formloader: false });

            ReactGA.event({
              category: "Founder",
              action: "Invited team members",
            });

            setTimeout(() => {
              window.location.reload();
            }, 5000);

            return;
          } else {
            message.warning(result.message);
            this.setState({ formloader: false });
            return;
          }
        });
      } else {
        message.warn("Please fill the form correctly.");
        this.setState({ formloader: false });
        return;
      }
    }
  };
  show_tab = (params) => {};
  back = () => {
    this.setState({ activeTab: "1" });
  };
  render() {
    return (
      <div>
        <section className="assessment-form-section">
          {this.state.form_status == "submitted" ? (
            <div style={{ padding: 20 }}>
              <FounderFormStatus />
            </div>
          ) : (
            <>
              {this.state.activeTab == 0 && (
                <Spin spinning={this.state.loading}>
                  <div className="container dashboard-form-flex">
                    <br />
                    <h2 style={{textAlign  : "center" }}> Assessment Form</h2>
                    <br />
                    <p>
                      Founders, Advisors and the core team collectively drive
                      the company on it’s growth journey. Please help us
                      understand strengths of founding and core team members
                      with reference to various business functions and
                      requirements. For convenience, requested information is
                      spread across 3-15 sections. Feel free to connect for any
                      queries.
                      <br />
                      <span style={{ color: "red" }}>
                        ( Instruction: Startup form and Assessment Forms are
                        best viewed on PC/Laptop. )
                      </span>
                    </p>
                    <br />

                    <button
                      className="submit-button"
                      onClick={() => this.show2tab()}
                    >
                      Next
                    </button>
                  </div>
                </Spin>
              )}
              {this.state.activeTab == 1 && (
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <h1>Introduction</h1>
                      <br />
                      <h2> Assessment Form, Ver 3.0</h2>
                      <br />
                      <p>
                        Please enter number of founders, core team members and
                        advisors you have in your company.
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 form-group">
                        <img
                          src="icon/founder1.png"
                          alt="Founder"
                          className="img-fluid px-2 py-2"
                        />
                        <Select
                          className="assesment-form-select"
                          onChange={(value) =>
                            this.handleChange(value, "founder_count")
                          }
                          value={this.state.founder_count}
                          style={{ width: "100%" }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                          <Option value={5}>5</Option>
                        </Select>
                        <label style={{ marginTop: 20 }}>
                          No of Founder/Co-Founders
                        </label>
                      </div>
                      <div className="col-lg-4 form-group">
                        <img
                          src="icon/team.png"
                          alt="Founder"
                          className="img-fluid px-2 py-2"
                        />
                        <Select
                          className="assesment-form-select"
                          onChange={(value) =>
                            this.handleChange(value, "core_team_count")
                          }
                          value={this.state.core_team_count}
                          style={{ width: "100%" }}
                        >
                          <Option value={0}>0</Option>
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                          <Option value={5}>5</Option>
                        </Select>
                        <label style={{ marginTop: 20 }}>
                          No of Core Team Member
                        </label>
                      </div>
                      <div className="col-lg-4 form-group">
                        <img
                          src="icon/advisor.png"
                          alt="Founder"
                          className="img-fluid px-2 py-2"
                        />
                        <Select
                          className="assesment-form-select"
                          onChange={(value) =>
                            this.handleChange(value, "advisor_count")
                          }
                          value={this.state.advisor_count}
                          style={{ width: "100%" }}
                        >
                          <Option value={0}>0</Option>
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                          <Option value={5}>5</Option>
                        </Select>
                        <label style={{ marginTop: 20 }}>No of Advisor</label>
                      </div>
                      <br />
                      <button
                        className="submit-button"
                        style={{ marginTop: 30, marginLeft: 11 }}
                        onClick={() => this.selectusers()}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <Spin spinning={this.state.formloader}>
                <div
                  style={{
                    paddingTop: 24,
                    paddingLeft: 21,
                  }}
                >
                  {(this.state.activeTab == 2 ||
                    this.state.activeTab == 3 ||
                    this.state.activeTab == 4) && (
                    <>
                      <h3 style={{ paddingBottom: 48 }}>
                        Please enter the team composition
                      </h3>
                      {/* Start founder */}
                      {this.state.forms.map((item, index) => {
                        if (item.role == "founder") {
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
                                    onChange={(e) => this.setvalue(e, index)} className="value-capitalize"
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label>
                                    Role Type
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    readonly={true}
                                    value={item.role} style={{textTransform:"capitalize"}}
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label>
                                    Email Address
                                    <span className="text-danger">*</span>
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
                        }
                      })}
                      {/* end founder  */}
                      {this.state.core_team_count != 0 ? (
                        <>
                          {/* Start core team members */}
                          {this.state.forms.map((item, index) => {
                            if (item.role == "core-team-member") {
                              return (
                                <div>
                                  <div className="row" key={index}>
                                    <div className="form-group col-md-4">
                                      <label>
                                        Name{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Name"
                                        value={item.name}
                                        name="name"
                                        onChange={(e) =>
                                          this.setvalue(e, index)
                                        } className="value-capitalize"
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>
                                        Role Type
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        readonly={true}
                                        value={item.role} style={{textTransform:"capitalize"}}
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>
                                        Email Address
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        value={item.email}
                                        onChange={(e) =>
                                          this.setvalue(e, index)
                                        }
                                      />
                                      {item.emailerror != "" && (
                                        <span
                                          className="text-danger"
                                          style={{
                                            position: "relative",
                                            top: -25,
                                          }}
                                        >
                                          {item.emailerror}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                          {/* End core team member  */}
                        </>
                      ) : (
                        <div>
                          <p>No Core team members are selected.</p>
                        </div>
                      )}
                      {this.state.advisor_count != 0 ? (
                        <>
                          {/* Start advisor  */}
                          {this.state.forms.map((item, index) => {
                            if (item.role == "advisor") {
                              return (
                                <div>
                                  <div className="row" key={index}>
                                    <div className="form-group col-md-4">
                                      <label>
                                        Name{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Name"
                                        value={item.name}
                                        name="name"
                                        onChange={(e) =>
                                          this.setvalue(e, index)
                                        } className="value-capitalize"
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>
                                        Role Type
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        readonly={true}
                                        value={item.role} style={{textTransform:"capitalize"}}
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>
                                        Email Address
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        value={item.email}
                                        onChange={(e) =>
                                          this.setvalue(e, index)
                                        }
                                      />
                                      {item.emailerror != "" && (
                                        <span
                                          className="text-danger"
                                          style={{
                                            position: "relative",
                                            top: -25,
                                          }}
                                        >
                                          {item.emailerror}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                          {/* End advisor  */}
                        </>
                      ) : (
                        <div>
                          <p>No advisors are selected.</p>
                        </div>
                      )}
                      <button
                        className="submit-button startup-form-next-button"
                        onClick={this.back}
                        style={{
                          marginRight: 10,
                        }}
                      >
                        Back
                      </button>
                      <button
                        className="submit-button startup-form-next-button"
                        onClick={this.savefounders}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              </Spin>
            </>
          )}
        </section>
      </div>
    );
  }
}

export default AssessmentForm;
