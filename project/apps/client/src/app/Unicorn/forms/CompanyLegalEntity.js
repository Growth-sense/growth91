import React, { Component } from "react";
import { message, Spin, DatePicker, Checkbox } from "antd";
import Bridge from "../../constants/Bridge";

import moment from "moment";
import $ from "jquery";
class FundRaiseRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_of_legality_entity: "",
      website: "",
      cin_legality_entity: "",
      pan_legality_entity: "",
      registered_in_country: "",
      formality_established_date: "",
      activities_start_date_befire_formal: "",
      address_registered_office: "",
      address_corporate_office: "",
      director_1_name: "",
      director_1_din: "",
      director_2_name: "",
      director_2_din: "",
      director_3_name: "",
      director_3_din: "",
      director_4_name: "",
      director_4_din: "",
      founder_id: "",
      loading: false,
      valueispresent: false,
      processtype: "",
    };
  }

  componentDidMount() {
    if (this.props.id) {
      let id = this.props.id;
      // this.getData(id);
    }
    $("#selected-field").focus();
    this.props.check();
  }

;

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
   ;
    this.setState({ loading: true });
    Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {

      if (result.status == 1) {
        this.setState({ loading: false, valueispresent: true })
        if (this.state.processtype == "next") {
          this.props.next();
        } else if (this.state.processtype == "prev") {
          this.props.prev();
        } else if (this.state.processtype == "saveandproceed") {
          this.props.activate();
          message.success(
            "Company legality entity details are updated successfully.",
            6
          );
        } else {
          message.success(
            "Company legality entity details are updated successfully.",
            6
          );
        }
        if (this.props.error == "0") {
          this.props.check();
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };
  disabledDate = (current) => {
    // Can not select days before today and today
    return(

      current && current > moment().endOf("day")
    )
  };
  validateName(x) {
    var nameVal = x;
    if (/^[A-Za-z\s]+$/.test(x)) return true;
    else return false;
  }

  checkforpan = (e) => {
    var panVal = e;
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regpan.test(panVal)) {
      // valid pan card number
      return true;
    } else {
      // invalid pan card number
      message.warning("Invalid pan card no.");
      return false;
    }
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
      this.state.name_of_legality_entity &&
      // this.state.website &&
      this.state.cin_legality_entity &&
      this.state.pan_legality_entity &&
      this.state.registered_in_country &&
      this.state.formality_established_date &&
      // this.state.activities_start_date_befire_formal &&
      this.state.address_registered_office &&
      this.state.address_corporate_office &&
      this.state.director_1_name &&
      this.state.director_1_din &&
      // this.state.director_2_name &&
      // this.state.director_2_din &&
      // this.state.director_3_name &&
      // this.state.director_3_din &&
      // this.state.director_4_name &&
      // this.state.director_4_din &&
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
                  {console.log("props error", this.props.error)}
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
                        Company Legal Entity
                      </span>
                    </div>
                    <hr />
                  </div>

                  {this.props.error == "0" &&
                    (!this.state.name_of_legality_entity ||
                      !this.state.cin_legality_entity ||
                      !this.state.pan_legality_entity ||
                      !this.state.registered_in_country ||
                      !this.state.formality_established_date ||
                      !this.state.address_registered_office ||
                      !this.state.address_corporate_office ||
                      !this.state.director_1_name ||
                      !this.state.director_1_din ||
                      {
                        /* !this.state.director_2_name ||
                        !this.state.director_2_din ||
                        !this.state.director_3_name ||
                        !this.state.director_3_din ||
                        !this.state.director_4_name ||
                        !this.state.director_4_din    */
                      }) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {!this.state.name_of_legality_entity && (
                            <li>
                              <span>Please enter name of legality entity.</span>
                            </li>
                          )}
                          {/* {!this.state.website &&(
                              <li>
                                <span>Please enter website name.</span>
                              </li>
                            )} */}
                          {!this.state.cin_legality_entity && (
                            <li>
                              <span>Please enter cin legality entity.</span>
                            </li>
                          )}
                          {!this.state.pan_legality_entity && (
                            <li>
                              <span>Please enter pan of legality entity</span>
                            </li>
                          )}
                          {!this.state.registered_in_country && (
                            <li>
                              <span>Please enter registered country name.</span>
                            </li>
                          )}
                          {!this.state.formality_established_date && (
                            <li>
                              <span>
                                Please enter value of formally established date.
                              </span>
                            </li>
                          )}
                          {/* {!this.state.activities_start_date_befire_formal &&(
                              <li>
                                <span>Please enter value of activities start date before formal</span>
                              </li>
                            )} */}
                          {!this.state.address_registered_office && (
                            <li>
                              <span>
                                Please enter address registered office
                              </span>
                            </li>
                          )}
                          {!this.state.director_1_name && (
                            <li>
                              <span>Please enter director name 1.</span>
                            </li>
                          )}
                          {!this.state.director_1_din && (
                            <li>
                              <span>Please enter din of director name 1.</span>
                            </li>
                          )}
                          {/* {!this.state.director_2_name &&(
                              <li>
                                <span>Please enter director name 2.</span>
                              </li>
                            )}
                            {!this.state.director_2_din &&(
                              <li>
                                <span>Please enter din of director name 2.</span>
                              </li>
                            )}
                            {!this.state.director_3_name &&(
                              <li>
                                <span>Please enter director name 1.</span>
                              </li>
                            )}
                            {!this.state.director_3_din &&(
                              <li>
                                <span>Please enter din of director name 3.</span>
                              </li>
                            )}
                            {!this.state.director_4_name &&(
                              <li>
                                <span>Please enter director name 4.</span>
                              </li>
                            )}
                            {!this.state.director_4_din &&(
                              <li>
                                <span>Please enter din of director name 4.</span>
                              </li>
                            )} */}
                        </ul>
                      </div>
                    )}
                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="d-flex">
                          <Checkbox
                            name="tpage9NA"
                            style={{ width: 35 }}
                            checked={this.props.unicorn.tpage9NA == "1"}
                            value={this.props.unicorn.tpage9NA == true ? 1 : 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                this.props.setMultiple({
                                  tpage9NA: "1",
                                  tudLeagalName: "",
                                  tudWebsite: "",
                                  tudLegalCin: "",
                                  tudLegalPan: "",
                                  tudLegalCountry: "",
                                  tudEstablishedDate: "",
                                  tudActivityStartedDate: "",
                                  tudRegisteredOffice: "",
                                  tudCorporateOffice: "",
                                  tudDirector1: "",
                                  tudDin1: "",
                                  tudDirector2: "",
                                  tudDin2: "",
                                  tudDirector3: "",
                                  tudDin3: "",
                                  tudDirector4: "",
                                  tudDin4: "",
                                });
                              } else {
                                this.props.onInput(
                                  e.target.name,
                                  e.target.checked ? "1" : "0"
                                );
                              }
                            }}
                          ></Checkbox>
                          <span className="ml-2">Not Applicable</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="">Name of the legal entity </label>
                        <textarea
                          name="tudLeagalName"
                          id="selected-field"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudLeagalName}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Website </label>
                        <textarea
                          name="tudWebsite"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudWebsite}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Legal entity - CIN </label>
                        <textarea
                          name="tudLegalCin"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudLegalCin}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Legal entity - PAN </label>
                        <textarea
                          name="tudLegalPan"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudLegalPan}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Registered in (Country) </label>
                        <textarea
                          name="tudLegalCountry"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudLegalCountry}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group step-form-date-input">
                        <label for="">Formally established on(date) </label>

                        <input
                          type="date"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudEstablishedDate}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                          name="tudEstablishedDate"
                          // disabledDate={this.disabledDate}
                          format={"DD-MM-YYYY"}
                          style={{
                            width: "100%",
                            marginBottom: 30,
                          }}
                        />
                      </div>
                      <div className="form-group step-form-date-input">
                        <label for="">
                          Activities start date before formal establishment(if
                          any)
                        </label>
                        <input
                          type="date"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudActivityStartedDate}
                          name="tudActivityStartedDate"
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                          // disabledDate={this.disabledDate}
                          format={"DD-MM-YYYY"}
                          style={{
                            width: "100%",
                            marginBottom: 30,
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label for="">Address - Registered office</label>
                        <textarea
                          name="tudRegisteredOffice"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudRegisteredOffice}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">
                          Address - Corporate/Working office{" "}
                        </label>
                        <textarea
                          name="tudCorporateOffice"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudCorporateOffice}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Director - 1(Name) </label>
                        <textarea
                          name="tudDirector1"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudDirector1}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Director - 1 (DIN) </label>
                        <textarea
                          onWheel={() => document.activeElement.blur()}
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          name="tudDin1"
                          value={this.props.unicorn.tudDin1}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Director - 2(Name) </label>
                        <textarea
                          name="tudDirector2"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudDirector2}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Director - 2(DIN) </label>
                        <textarea
                          onWheel={() => document.activeElement.blur()}
                          name="tudDin2"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudDin2}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Director - 3(Name)</label>
                        <textarea
                          name="tudDirector3"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudDirector3}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Director - 3 (DIN) </label>
                        <textarea
                          onWheel={() => document.activeElement.blur()}
                          name="tudDin3"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudDin3}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>{" "}
                      <div className="form-group">
                        <label for="">Director - 4(Name)</label>
                        <textarea
                          name="tudDirector4"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudDirector4}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">Director - 4 (DIN)</label>
                        <textarea
                          onWheel={() => document.activeElement.blur()}
                          name="tudDin4"
                          disabled={this.props.unicorn.tpage9NA == "1"}
                          value={this.props.unicorn.tudDin4}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
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

export default FundRaiseRegistration;
