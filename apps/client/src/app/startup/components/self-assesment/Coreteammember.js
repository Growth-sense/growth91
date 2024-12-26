import React, { Component } from "react";
import { DatePicker, Radio } from "antd";
class Coreteammember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      roleType: "",
      mobile: "",
      linkedIn: "",
      yearsOfExperience: "",
      eductionInstitute: "",
      credentials: "",
      timeCommitment: "",
      commercialsAndOther: "",
      specificResponsibilities: "",
      dtOfJoinBusiness: "",
      strength: "",
      weakness: "",
      dreams: "",
      longTermVision: "",
      shortTermVision: "",
      leaderShip: "",
      leaderShipReview: "",
      understandFinance: "",
      understandFinanceReview: "",
      understandHr: "",
      understandHrReview: "",
      understandLaw: "",
      understandLawReview: "",
      passionBusiness: "",
      passionBusinessReview: "",
      passionCurProject: "",
      passionCurProjectReview: "",
      experimentalMindset: "",
      experimentalMindsetReview: "",
      outOFBox: "",
      outOfBoxReview: "",
      problemSolving: "",
      problemSolvingReview: "",
      networkBusiness: "",
      networkBusinessReview: "",
      networkSocial: "",
      networkSocialReview: "",
    };
  }

  render() {
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
              <div className="col-lg-12">
                <div className="row" style={{ maxWidth: 900 }}>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label for="">Name</label>
                      <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Email</label>
                      <input
                        type="email"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Role type</label>
                      <input
                        type="text"
                        value={this.state.roleType}
                        onChange={(e) =>
                          this.setState({ roleType: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Mobile Number</label>
                      <input
                        type="number"
                        value={this.state.mobile}
                        onWheel={() => document.activeElement.blur()}
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
                        Years of experience
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.yearsOfExperience}
                        onChange={(e) =>
                          this.setState({ yearsOfExperience: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">
                        Education, Institute, Year
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.eductionInstitute}
                        onChange={(e) =>
                          this.setState({ educationInstitute: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">
                        Credentials
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.credentials}
                        onChange={(e) =>
                          this.setState({ credentials: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Time Commitment</label>
                      <input
                        type="text"
                        value={this.state.timeCommitment}
                        onChange={(e) =>
                          this.setState({ timeCommitment: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Commercials and Other Terms</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.commercialsAndOther}
                        onChange={(e) =>
                          this.setState({ commercialAndOther: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">Specific responsibilities</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.specificResponsibilities}
                        onChange={(e) =>
                          this.setState({
                            specificResponsibilities: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group step-form-date-input">
                      <label for="">
                        Date of Joining the business
                        <span className="text-danger">*</span>
                      </label>
                      <DatePicker
                        format={"DD-MM-YYYY"}
                        style={{
                          width: "100%",
                          marginBottom: 30,
                        }}
                        value={this.state.dtOfJoinBusiness}
                        onChange={(e) =>
                          this.setState({ dtOfJoinBusiness: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Your Strength</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.strength}
                        onChange={(e) =>
                          this.setState({ strength: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">Your Weakness</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.weakness}
                        onChange={(e) =>
                          this.setState({ weakness: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">What are your dreams</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.dreams}
                        onChange={(e) =>
                          this.setState({ dreams: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label for="">What is your long-term vision?</label>
                      <textarea
                        id=""
                        cols="30"
                        rows="6"
                        value={this.state.longTermVision}
                        onChange={(e) =>
                          this.setState({ longTermVision: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="">What is your short-term vision/goal?</label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.shortTermVision}
                      onChange={(e) =>
                        this.setState({ shortTermVision: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Leadership<span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ leaderShip: e.target.value })
                      }
                      value={this.state.leaderShip}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      cols="30"
                      rows="6"
                      value={this.state.leaderShipReview}
                      onChange={(e) =>
                        this.setState({ leaderShip: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Understanding of Finance
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ understandFinance: e.target.value })
                      }
                      value={this.state.understandFinance}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.understandFinanceReview}
                      onChange={(e) =>
                        this.setState({
                          understandFinanceReview: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Understanding of HR<span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ understandHr: e.target.value })
                      }
                      value={this.state.understandHr}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.understandHrReview}
                      onChange={(e) =>
                        this.setState({ understandHrReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Understanding of Law and Statutory Compliances
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ understandLaw: e.target.value })
                      }
                      value={this.state.understandLaw}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.understandLawReview}
                      onChange={(e) =>
                        this.setState({ understandLawReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Passion for business
                      <span className="text-danger">*</span>
                    </label>

                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ passionBusiness: e.target.value })
                      }
                      value={this.state.passionBusiness}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.passionBusinessReview}
                      onChange={(e) =>
                        this.setState({ passionBusinessReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Passion for Current Project
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ passionCurProject: e.target.value })
                      }
                      value={this.state.passionCurProject}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.passionCurProjectReview}
                      onChange={(e) =>
                        this.setState({
                          passionCurProjectReview: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Experimental Mindset
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ experimentalMindset: e.target.value })
                      }
                      value={this.state.experimentalMindset}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>

                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.experimentalMindsetReview}
                      onChange={(e) =>
                        this.setState({
                          experimentalMindsetReview: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Out of Box Thinking
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ outOFBox: e.target.value })
                      }
                      value={this.state.outOFBox}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.outOfBoxReview}
                      onChange={(e) =>
                        this.setState({ outOfBoxReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Problem Solving Skills
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ problemSolving: e.target.value })
                      }
                      value={this.state.problemSolving}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.problemSolvingReview}
                      onChange={(e) =>
                        this.setState({ problemSolvingReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Networking- Business
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ networkBusiness: e.target.value })
                      }
                      value={this.state.networkBusiness}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.networkBusinessReview}
                      onChange={(e) =>
                        this.setState({ networkBusinessReview: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label for="" style={{ marginBottom: 14 }}>
                      Networking- Social
                      <span className="text-danger">*</span>
                    </label>
                    <Radio.Group
                      onChange={(e) =>
                        this.setState({ networkSocial: e.target.value })
                      }
                      value={this.state.networkSocial}
                    >
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                      <Radio value={6}>6</Radio>
                      <Radio value={7}>7</Radio>
                      <Radio value={8}>8</Radio>
                      <Radio value={9}>9</Radio>
                      <Radio value={10}>10</Radio>
                    </Radio.Group>
                  </div>
                  <div className="form-group">
                    <label for="">
                      Please support your rating with some justification,
                      examples
                    </label>
                    <textarea
                      id=""
                      cols="30"
                      rows="6"
                      value={this.state.networkSocialReview}
                      onChange={(e) =>
                        this.setState({ networkSocialReview: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <br />
                  <div className="form-group d-flex justify-content-between">
                    <div className="arrow-buttons">
                      <button
                        style={{
                          position: "relative",
                          left: -20,
                          background:
                            this.state.valueispresent == true ? "#fff" : "#ddd",
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
                      </button>
                    </div>
                    <div>
                      <button
                        style={{ width: 190, marginRight: 13 }}
                        class="submit-button"
                        onClick={() => this.saveandproceed()}
                      >
                        Save & Proceed
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
        </section>
      </div>
    );
  }
}
export default Coreteammember;
