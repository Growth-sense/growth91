
import React, { Component } from 'react';
import { message, Spin, Checkbox } from 'antd';
import Bridge from '../../constants/Bridge';

import $ from 'jquery';
class FundRaiseRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorized_captial_of_company:'',
      paid_up_capital_company:'',
      percentage_holding_by_founders:'',
      percentage_holding_by_core_team:'',
      reserved_for_esop:'',
      percentage_holding_of_others:'',
      actual_amount_real_salaries_taken:'',
      usecure_loans_received_from_founders:'',
      usecure_loans_received_from_other:'',
      any_other_secured_or_ddebt_from_bank:'',  
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
          message.success('Capital details are updated successfully.',6);
        } else {
          message.success('Capital details are updated successfully.',6);
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

    let active = (this.state.authorized_captial_of_company && this.state.paid_up_capital_company && this.state.percentage_holding_by_founders && this.state.percentage_holding_by_core_team && this.state.reserved_for_esop && this.state.percentage_holding_of_others && this.state.actual_amount_real_salaries_taken && this.state.usecure_loans_received_from_founders && this.state.usecure_loans_received_from_other && this.state.any_other_secured_or_ddebt_from_bank && 
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
                          position: "relative",
                          paddingRight: 10,
                        }}
                      >
                        Capital
                      </span>
                    </div>
                    <hr />
                  </div>
                  {this.props.error == "0" &&
                    (!this.state.authorized_captial_of_company ||
                      !this.state.paid_up_capital_company ||
                      !this.state.percentage_holding_by_founders ||
                      !this.state.percentage_holding_by_core_team ||
                      !this.state.reserved_for_esop ||
                      !this.state.percentage_holding_of_others ||
                      !this.state.actual_amount_real_salaries_taken ||
                      !this.state.usecure_loans_received_from_founders ||
                      !this.state.usecure_loans_received_from_other ||
                      !this.state.any_other_secured_or_ddebt_from_bank) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {!this.state.authorized_captial_of_company && (
                            <li>
                              <span>
                                Please enter the value of field authorized
                                capital of company.
                              </span>
                            </li>
                          )}
                          {!this.state.paid_up_capital_company && (
                            <li>
                              <span>
                                Please enter the value of field paid up capital
                                of company.
                              </span>
                            </li>
                          )}
                          {!this.state.percentage_holding_by_core_team && (
                            <li>
                              <span>
                                Please enter the value of field Percentage
                                holding by Core Team Member.
                              </span>
                            </li>
                          )}
                          {!this.state.percentage_holding_by_founders && (
                            <li>
                              <span>
                                Please enter the value of field Percentage
                                holding by Founders.
                              </span>
                            </li>
                          )}
                          {!this.state.reserved_for_esop && (
                            <li>
                              <span>
                                Please enter the value of field Percentage
                                reserved for ESOP.
                              </span>
                            </li>
                          )}
                          {!this.state.percentage_holding_of_others && (
                            <li>
                              <span>
                                Please enter the value of field Percentage
                                holding of others.
                              </span>
                            </li>
                          )}
                          {!this.state.actual_amount_real_salaries_taken && (
                            <li>
                              <span>
                                Please enter the value of field Actual amount
                                (real cash, less salaries taken).
                              </span>
                            </li>
                          )}
                          {!this.state.usecure_loans_received_from_founders && (
                            <li>
                              <span>
                                Please enter the value of field Unsecured loans
                                received from founders.
                              </span>
                            </li>
                          )}
                          {!this.state.usecure_loans_received_from_other && (
                            <li>
                              <span>
                                Please enter the value of field Unsecured loans
                                received from others.
                              </span>
                            </li>
                          )}
                          {!this.state.any_other_secured_or_ddebt_from_bank && (
                            <li>
                              <span>
                                Please enter the value of field Any other
                                secured or unsecured debt from bank.
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
                            name="tpage13NA"
                            style={{ width: 35 }}
                            checked={this.props.unicorn.tpage13NA == "1"}
                            value={this.props.unicorn.tpage13NA == true ? 1 : 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                this.props.setMultiple({
                                  tpage13NA: "1",
                                  tudAuthorisedCap: "",
                                  tudPaidupCapi: "",
                                  tudFounderPer: "",
                                  tudCorePer: "",
                                  tudEsopPer: "",
                                  tudOtherPer: "",
                                  tudAmountByFounder: "",
                                  tudUnsecLoanFounder: "",
                                  tudUnsecLoanOthers: "",
                                  tudOtherLoan: "",
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
                        <label for="">
                          Authorized capital of the company as on date
                        </label>
                        <input
                          type="text"
                          id="selected-field"
                          name="tudAuthorisedCap"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudAuthorisedCap}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Paid-up capital of the company as on date
                        </label>
                        <input
                          type="text"
                          name="tudPaidupCapi"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudPaidupCapi}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">Percentage holding by founders.</label>
                        <input
                          type="number"
                          name="tudFounderPer"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudFounderPer}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Percentage holding by other core team members.
                        </label>
                        <input
                          type="number"
                          name="tudCorePer"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          onWheel={() => document.activeElement.blur()}
                          value={this.props.unicorn.tudCorePer}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">Percentage reserved for ESOP.</label>
                        <input
                          type="number"
                          onWheel={() => document.activeElement.blur()}
                          name="tudEsopPer"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudEsopPer}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Percentage holding of others (holding 1% and above)
                        </label>
                        <input
                          type="number"
                          onWheel={() => document.activeElement.blur()}
                          name="tudOtherPer"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudOtherPer}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Actual amount (real cash, less salaries taken)
                          invested by the founders?
                        </label>
                        <input
                          type="number"
                          onWheel={() => document.activeElement.blur()}
                          name="tudAmountByFounder"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudAmountByFounder}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Unsecured loans received from founders? (Amount and
                          term of repayment)
                        </label>
                        <input
                          type="text"
                          name="tudUnsecLoanFounder"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudUnsecLoanFounder}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Unsecured loans received from others? (Amount and
                          terms of repayment)
                        </label>
                        <input
                          type="text"
                          name="tudUnsecLoanOthers"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudUnsecLoanOthers}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Any other secured or unsecured debt from bank or any
                          others entity.
                        </label>
                        <input
                          type="text"
                          name="tudOtherLoan"
                          disabled={this.props.unicorn.tpage13NA == "1"}
                          value={this.props.unicorn.tudOtherLoan}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
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
                            // ={active}
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
