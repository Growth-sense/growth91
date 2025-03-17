 
import React, { Component } from 'react';
import { message, Spin, DatePicker, Checkbox } from 'antd';
import Bridge from '../../constants/Bridge';

import moment from 'moment';
import $ from 'jquery';
class Compliances extends Component {

  constructor(props) {
    super(props);
    this.state = {
      are_you_registered_for_gst:'',
      status_of_gst_compliance:'',
      date_of_last_audited_balance_sheet:'',
      date_of_filling_last_itr:'',
      date_of_last_agm:'',
      pending_complience_related_to_roc:'',
      past_days:'',
      list_of_other_situatory:'',
      email_and_mobile_of_ca:'',
      email_and_mobile_of_cs:'',
      name_email_and_mobile_of_any_other:'',
      founder_id:'',
      loading:false,
      valueispresent:false,
      processtype:'',
    }
  }

  componentDidMount() {
   if (this.props.id) {
      let id = this.props.id;
     
    }
    $('#selected-field').focus();
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
        this.setState({ loading: false,valueispresent:true },);
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Compliences details are updated successfully.',6);
        } else {
          message.success('Compliences details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
 
  }

  save=()=>{
    this.setState({processtype:'save'},()=>this.updatefounder());
  }
  next=()=>{
    this.setState({processtype:'next'},()=>this.updatefounder());
  }
  prev=()=>{
    this.setState({processtype:'prev'},()=>this.updatefounder());
  }

  render() {

        let active = (this.state.are_you_registered_for_gst &&
      this.state.status_of_gst_compliance &&
      this.state.date_of_last_audited_balance_sheet &&
      this.state.date_of_filling_last_itr &&
      this.state.date_of_last_agm &&
      this.state.pending_complience_related_to_roc &&
      this.state.past_days &&
      this.state.list_of_other_situatory &&
      this.state.email_and_mobile_of_ca &&
      this.state.email_and_mobile_of_cs &&
      this.state.name_email_and_mobile_of_any_other &&
        this.state.valueispresent==true) ? false : true;

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
                        Compliances
                      </span>
                    </div>
                    <hr />
                  </div>

                  {this.props.error == "0" &&
                    (!this.state.are_you_registered_for_gst ||
                      !this.state.status_of_gst_compliance ||
                      !this.state.date_of_last_audited_balance_sheet ||
                      !this.state.date_of_filling_last_itr ||
                      !this.state.date_of_last_agm ||
                      !this.state.pending_complience_related_to_roc ||
                      !this.state.past_days ||
                      !this.state.list_of_other_situatory) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {!this.state.are_you_registered_for_gst && (
                            <li>
                              <span>
                                Please enter value of field Are you registered
                                for GST.
                              </span>
                            </li>
                          )}
                          {!this.state.status_of_gst_compliance && (
                            <li>
                              <span>
                                Please enter value of field Give detailed status
                                of GST Compliance.
                              </span>
                            </li>
                          )}
                          {!this.state.date_of_last_audited_balance_sheet && (
                            <li>
                              <span>
                                Please enter value of field Date of audited
                                balance sheet.
                              </span>
                            </li>
                          )}
                          {!this.state.date_of_filling_last_itr && (
                            <li>
                              <span>
                                Please enter value of field Date of filling last
                                ITR.
                              </span>
                            </li>
                          )}
                          {!this.state.date_of_last_agm && (
                            <li>
                              <span>
                                Please enter value of field Date of last AGM.
                              </span>
                            </li>
                          )}
                          {!this.state.pending_complience_related_to_roc && (
                            <li>
                              <span>
                                Please enter value of field Any pending
                                compliance related to ROC.
                              </span>
                            </li>
                          )}
                          {!this.state.past_days && (
                            <li>
                              <span>
                                Please enter value of field Any past delays.
                              </span>
                            </li>
                          )}
                          {!this.state.list_of_other_situatory && (
                            <li>
                              <span>
                                Please enter value of field Give list of other
                                statutory compliance applicable.
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
                            name="tpage17NA"
                            style={{ width: 35 }}
                            checked={this.props.unicorn.tpage17NA == "1"}
                            value={this.props.unicorn.tpage17NA == true ? 1 : 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                this.props.setMultiple({
                                  tpage17NA: "1",
                                  tudGstRegistered: "",
                                  tudGstDetails: "",
                                  tudAuditedBL: "",
                                  tudItrFilling: "",
                                  tudAgm: "",
                                  tudPendingRoc: "",
                                  tudPastDelays: "",
                                  tudOtherApplicableCompliance: "",
                                  tudCaInfo: "",
                                  tudCsInfo: "",
                                  tudOtherLegalInfo: "",
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
                      <div className="form-group ">
                        <label for="">Are you registered for GST?</label>
                        <div className="button-grp">
                          <button
                            className={
                              this.props.unicorn.tudGstRegistered == "Yes" &&
                              "active"
                            }
                            name="tudGstRegistered"
                            disabled={this.props.unicorn.tpage17NA == "1"}
                            value="Yes"
                            onClick={(e) =>
                              this.props.onInput(e.target.name, e.target.value)
                            }
                          >
                            Yes
                          </button>
                          <button
                            className={
                              this.props.unicorn.tudGstRegistered == "No" &&
                              "active"
                            }
                            disabled={this.props.unicorn.tpage17NA == "1"}
                            name="tudGstRegistered"
                            value="No"
                            onClick={(e) =>
                              this.props.onInput(e.target.name, e.target.value)
                            }
                          >
                            No
                          </button>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="">
                          Give detailed status of GST Compliance
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudGstDetails"
                          disabled={this.props.unicorn.tpage17NA == "1"}
                          value={this.props.unicorn.tudGstDetails}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group step-form-date-input">
                        <label for="">Date of audited balance sheet</label>

                        <input
                          type="date"
                          value={this.props.unicorn.tudAuditedBL}
                          name="tudAuditedBL"
                          disabled={this.props.unicorn.tpage17NA == "1"}
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
                      <div className="form-group step-form-date-input">
                        <label for="">Date of filling last ITR</label>

                        <input
                          type="date"
                          value={this.props.unicorn.tudItrFilling}
                          name="tudItrFilling"
                          disabled={this.props.unicorn.tpage17NA == "1"}
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
                      <div className="form-group step-form-date-input">
                        <label for="">Date of last AGM</label>

                        <input
                          type="date"
                          name="tudAgm"
                          disabled={this.props.unicorn.tpage17NA == "1"}
                          value={this.props.unicorn.tudAgm}
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
                        <label for="">
                          Any pending compliance related to ROC.
                        </label>
                        <input
                          type="text"
                          name="tudPendingRoc"
                          disabled={this.props.unicorn.tpage17NA == "1"}
                          value={this.props.unicorn.tudPendingRoc}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Any past delays (which are in compliance now) in
                          compliance and reasons reason for the same )
                        </label>
                        <input
                          type="text"
                          name="tudPastDelays"
                          disabled={this.props.unicorn.tpage17NA == "1"}
                          value={this.props.unicorn.tudPastDelays}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Give list of other statutory compliance applicable
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudOtherApplicableCompliance"
                          disabled={this.props.unicorn.tpage17NA == "1"}
                          value={
                            this.props.unicorn.tudOtherApplicableCompliance
                          }
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">
                          Name, email and mobile number of CA{" "}
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudCaInfo"
                          disabled={this.props.unicorn.tpage17NA == "1"}
                          value={this.props.unicorn.tudCaInfo}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">
                          Name, email and mobile number of CS{" "}
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudCsInfo"
                          disabled={this.props.unicorn.tpage17NA == "1"}
                          value={this.props.unicorn.tudCsInfo}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label for="">
                          Name, email and mobile number of any other tax,legal
                          or statutory consultants.
                        </label>
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          name="tudOtherLegalInfo"
                          disabled={this.props.unicorn.tpage17NA == "1"}
                          value={this.props.unicorn.tudOtherLegalInfo}
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

export default Compliances;
