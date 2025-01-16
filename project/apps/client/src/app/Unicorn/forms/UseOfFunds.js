import React, { Component } from "react";
import { message, Spin } from "antd";
import Bridge from "../../constants/Bridge";

import $ from "jquery";
class UseOfFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      funds_required: "",
      expected_runway_with_current_fund_raise: "",
      desired_valuation_for_current_fund_raise: "",
      logic_for_desired_valuation: "",
      logical_and_realistic_lower_valuation: "",
      capex_immediately: "",
      capex_future_plans: "",
      use_of_funds_product_development: "",
      use_of_funds_marketing: "",
      use_of_funds_repayment: "",
      use_of_funds_salaries_in_per: "",
      use_of_funds_cost_and_commision: "",
      are_you_open_to_consider_logical_lower_valuation: "",
      use_of_funds_other: "",
      founder_id: "",
      loading: false,
      valueispresent: false,
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
      if (result.status == 1) {
        console.log("result use of funds", result.data);
        this.setState({
          funds_required: result.data[0].funds_required,
          expected_runway_with_current_fund_raise:
            result.data[0].expected_runway_with_current_fund_raise,
          desired_valuation_for_current_fund_raise:
            result.data[0].desired_valuation_for_current_fund_raise,
          logic_for_desired_valuation:
            result.data[0].logic_for_desired_valuation,
          logical_and_realistic_lower_valuation:
            result.data[0].logical_and_realistic_lower_valuation,
          capex_immediately: result.data[0].capex_immediately,
          capex_future_plans: result.data[0].capex_future_plans,
          use_of_funds_product_development:
            result.data[0].use_of_funds_product_development,
          use_of_funds_marketing: result.data[0].use_of_funds_marketing,
          use_of_funds_repayment: result.data[0].use_of_funds_repayment,
          use_of_funds_salaries_in_per:
            result.data[0].use_of_funds_salaries_in_per,
          use_of_funds_cost_and_commision:
            result.data[0].use_of_funds_cost_and_commision,
          are_you_open_to_consider_logical_lower_valuation:
            result.data[0].are_you_open_to_consider_logical_lower_valuation,
          use_of_funds_other: result.data[0].use_of_funds_other,
        });
        if (result.data[0].funds_required) {
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
      funds_required: this.state.funds_required,
      expected_runway_with_current_fund_raise:
        this.state.expected_runway_with_current_fund_raise,
      desired_valuation_for_current_fund_raise:
        this.state.desired_valuation_for_current_fund_raise,
      logic_for_desired_valuation: this.state.logic_for_desired_valuation,
      logical_and_realistic_lower_valuation:
        this.state.logical_and_realistic_lower_valuation,
      capex_immediately: this.state.capex_immediately,
      capex_future_plans: this.state.capex_future_plans,
      use_of_funds_product_development:
        this.state.use_of_funds_product_development,
      use_of_funds_marketing: this.state.use_of_funds_marketing,
      use_of_funds_repayment: this.state.use_of_funds_repayment,
      use_of_funds_salaries_in_per: this.state.use_of_funds_salaries_in_per,
      use_of_funds_cost_and_commision:
        this.state.use_of_funds_cost_and_commision,
      use_of_funds_other: this.state.use_of_funds_other,
      are_you_open_to_consider_logical_lower_valuation:
        this.state.are_you_open_to_consider_logical_lower_valuation,
      founder_id: this.state.founder_id,
      no: 15,
      main_founder_id: localStorage.getItem("founder_id"),
      f15_status:
        this.state.processtype == "saveandproceed" ? "success" : "new",
    };

    this.setState({ loading: true });
    Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {
      if (result.status == 1) {
        this.setState({ loading: false, valueispresent: true });
        if (this.state.processtype == "next") {
          this.props.next();
        } else if (this.state.processtype == "prev") {
          this.props.prev();
        } else if (this.state.processtype == "saveandproceed") {
          this.props.activate();
          message.success("Use of funds details are updated successfully.", 6);
        } else {
          message.success("Use of funds details are updated successfully.", 6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };

  saveandproceed = () => {
    if (!this.state.funds_required) {
      message.warning("Please enter the value of field Funds required.");
      return;
    } else if (!this.state.expected_runway_with_current_fund_raise) {
      message.warning(
        "Please enter the value of Expected runway with current fund raise."
      );
      return;
    } else if (!this.state.desired_valuation_for_current_fund_raise) {
      message.warning(
        "Please enter the value of field Desired valuation of current fund raise."
      );
      return;
    } else if (!this.state.logic_for_desired_valuation) {
      message.warning(
        "Please enter the value of field Logic/rationale for your desired valuation."
      );
      return;
    } else if (!this.state.are_you_open_to_consider_logical_lower_valuation) {
      message.warning(
        "Please enter the value of field consider logical and realistic lower valuation."
      );
      return;
    } else if (!this.state.capex_immediately) {
      message.warning(
        "Please enter the value of field CapEx(immediately after current round )"
      );
      return;
    } else if (!this.state.capex_future_plans) {
      message.warning("Please enter the value of field CapEx(Future plans).");
      return;
    } else if (!this.state.use_of_funds_product_development) {
      message.warning(
        "Please enter the value of field Use of funds (Product development %)."
      );
      return;
    } else if (!this.state.use_of_funds_marketing) {
      message.warning(
        "Please enter the value of field Use of funds (Marketing %)."
      );
      return;
    } else if (!this.state.use_of_funds_repayment) {
      message.warning(
        "Please enter the value of field Use of funds (Repayment of loans amount %)."
      );
      return;
    } else if (!this.state.use_of_funds_salaries_in_per) {
      message.warning(
        "Please enter the value of field Use of funds (Salaries %)."
      );
      return;
    } else if (!this.state.use_of_funds_cost_and_commision) {
      message.warning(
        "Please enter the value of field Use of funds (Fund raise cast and commission %)."
      );
      return;
    } else if (!this.state.use_of_funds_other) {
      message.warning(
        "Please enter the value of field Use of funds (Other %)."
      );
      return;
    } else if (!this.state.are_you_open_to_consider_logical_lower_valuation) {
      message.warning(
        "Please enter the value of field Open to consider logical lower valuation."
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
      this.state.funds_required &&
      this.state.expected_runway_with_current_fund_raise &&
      this.state.desired_valuation_for_current_fund_raise &&
      this.state.logic_for_desired_valuation &&
      this.state.are_you_open_to_consider_logical_lower_valuation &&
      this.state.capex_immediately &&
      this.state.capex_future_plans &&
      this.state.use_of_funds_product_development &&
      this.state.use_of_funds_marketing &&
      this.state.use_of_funds_repayment &&
      this.state.use_of_funds_salaries_in_per &&
      this.state.use_of_funds_cost_and_commision &&
      this.state.use_of_funds_other &&
      this.state.are_you_open_to_consider_logical_lower_valuation &&
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
                          position: "absolute",
                          paddingRight: 10,
                        }}
                      >
                        Use Of Funds{" "}
                      </span>
                    </div>
                    <hr />
                  </div>

                  {this.props.error == "0" &&
                    (!this.state.funds_required ||
                      !this.state.expected_runway_with_current_fund_raise ||
                      !this.state.desired_valuation_for_current_fund_raise ||
                      !this.state.logic_for_desired_valuation ||
                      !this.state
                        .are_you_open_to_consider_logical_lower_valuation ||
                      !this.state.capex_immediately ||
                      !this.state.capex_future_plans ||
                      !this.state.use_of_funds_product_development ||
                      !this.state.use_of_funds_marketing ||
                      !this.state.use_of_funds_repayment ||
                      !this.state.use_of_funds_salaries_in_per ||
                      !this.state.use_of_funds_cost_and_commision ||
                      !this.state.use_of_funds_other ||
                      !this.state
                        .are_you_open_to_consider_logical_lower_valuation) && (
                      <div className="error-div">
                        <div className="error-icon">
                          <i className="bx bxs-error"></i>
                        </div>
                        <ul>
                          {!this.state.funds_required && (
                            <li>
                              <span>
                                Please enter the value of field Funds required.
                              </span>
                            </li>
                          )}
                          {!this.state
                            .expected_runway_with_current_fund_raise && (
                            <li>
                              <span>
                                Please enter the value of Expected runway with
                                current fund raise.
                              </span>
                            </li>
                          )}
                          {!this.state
                            .desired_valuation_for_current_fund_raise && (
                            <li>
                              <span>
                                Please enter the value of field Desired
                                valuation of current fund raise.
                              </span>
                            </li>
                          )}
                          {!this.state.logic_for_desired_valuation && (
                            <li>
                              <span>
                                Please enter the value of field Logic/rationale
                                for your desired valuation.
                              </span>
                            </li>
                          )}
                          {!this.state
                            .are_you_open_to_consider_logical_lower_valuation && (
                            <li>
                              <span>
                                Please enter the value of field consider logical
                                and realistic lower valuation.
                              </span>
                            </li>
                          )}
                          {!this.state.capex_immediately && (
                            <li>
                              <span>
                                Please enter the value of field
                                CapEx(immediately after current round )
                              </span>
                            </li>
                          )}
                          {!this.state.capex_future_plans && (
                            <li>
                              <span>
                                Please enter the value of field CapEx(Future
                                plans).
                              </span>
                            </li>
                          )}
                          {!this.state.use_of_funds_product_development && (
                            <li>
                              <span>
                                Please enter the value of field Use of funds
                                (Product development %).
                              </span>
                            </li>
                          )}
                          {!this.state.use_of_funds_marketing && (
                            <li>
                              <span>
                                Please enter the value of field Use of funds
                                (Marketing %).
                              </span>
                            </li>
                          )}
                          {!this.state.use_of_funds_repayment && (
                            <li>
                              <span>
                                Please enter the value of field Use of funds
                                (Repayment of loans amount %).
                              </span>
                            </li>
                          )}
                          {!this.state.use_of_funds_salaries_in_per && (
                            <li>
                              <span>
                                Please enter the value of field Use of funds
                                (Salaries %).
                              </span>
                            </li>
                          )}
                          {!this.state.use_of_funds_cost_and_commision && (
                            <li>
                              <span>
                                Please enter the value of field Use of funds
                                (Fund raise cast and commission %).
                              </span>
                            </li>
                          )}
                          {!this.state.use_of_funds_other && (
                            <li>
                              <span>
                                Please enter the value of field Use of funds
                                (Other %).
                              </span>
                            </li>
                          )}
                          {!this.state
                            .are_you_open_to_consider_logical_lower_valuation && (
                            <li>
                              <span>
                                Please enter the value of field Open to consider
                                logical lower valuation.
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                  <div className="row" style={{ maxWidth: 900 }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label for="">
                          Funds required<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="selected-field"
                          name="tudFundRequired"
                          value={this.props.unicorn.tudFundRequired}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Expected runway with current fund raise
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudExpRunway"
                          value={this.props.unicorn.tudExpRunway}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Desired valuation of current fund raise
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudValueFundRaise"
                          value={this.props.unicorn.tudValueFundRaise}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Logic / rational for your desired valuation
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudLogicFundRaise"
                          value={this.props.unicorn.tudLogicFundRaise}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Are you open to consider logical and realistic lower
                          valuation?<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudOpentoLower"
                          value={this.props.unicorn.tudOpentoLower}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          CapEx (immediately after current round )
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudCapexImmidate"
                          value={this.props.unicorn.tudCapexImmidate}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          CapEx (Future plans)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudCapexFuture"
                          value={this.props.unicorn.tudCapexFuture}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Use of funds (Product development %)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudProductFund"
                          value={this.props.unicorn.tudProductFund}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Use of funds (Marketing %)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudMarketingFund"
                          value={this.props.unicorn.tudMarketingFund}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Use of funds (Repayment of loans amount %)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudUseofFundRepayment"
                          value={this.props.unicorn.tudUseofFundRepayment}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Use of funds (Salaries %)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudSalaryFund"
                          value={this.props.unicorn.tudSalaryFund}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Use of funds (Fund raise cast and commission %)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudCastComFund"
                          value={this.props.unicorn.tudCastComFund}
                          onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="">
                          Use of funds (Other %)
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="tudOthersFund"
                          value={this.props.unicorn.tudOthersFund}
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

export default UseOfFunds;
