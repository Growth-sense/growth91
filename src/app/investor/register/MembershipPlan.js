import React, { Component } from "react";
import WebHeaderMembership from "../../common/WebHeaderMembership";
import WebFooter from "../../common/WebFooter";
import Bridge from "../../constants/Bridge";
import { message, Spin } from "antd";
import ReactGA from "react-ga4";
import NewWebHeader from "../../common/NewWebHeader";
import { NewWebFooter } from "../../common/NewWebFooter";

class MembershipPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      discount: 0,
      discounted_amount: 0,
      loading: false,
    };
  }
  componentDidMount() {
    console.log("investor_id", localStorage.getItem("reg_id"));
    // if (!localStorage.getItem("reg_id")) {
    //   window.location.assign("/Login");
    // }
    this.getsettings();
  }
  getsettings = () => {
    this.setState({ amountloader: true });
    Bridge.admin.settings.getsettings().then((result) => {
      if (result.status == 1) {
        let amount =
          Number(result.data[0].amount / 100) * Number(result.data[0].discount);
        amount = Number(result.data[0].amount) - Number(amount);
        this.setState({
          amount: result.data[0].amount,
          discount: result.data[0].discount,
          discounted_amount: amount,
        });
      } else {
      }
    });
  };
  // pay
  pay = () => {
    if (this.state.discounted_amount == "0") {
      this.setState({ loading: true });
      let params = {
        investor_id: localStorage.getItem("reg_id"),
      };
      Bridge.investor.change_membership_details(params).then((result) => {
        if (result.status == 1) {
          this.setState({ loading: false });
          message.success(
            "We have successfully upgraded you as a premium member",
            5
          );
          setTimeout(() => {
            this.goToDashboard();
          }, 3000);
        } else {
          message.warn("Please try again!");
        }
      });
    } else {
      this.activeuser();
      console.log("id", localStorage.getItem("reg_id"));
    }
  };
  upgrademyplan = () => {
    let params = {
      membership_fees: this.state.discounted_amount,
      registered_amt: this.state.amount,
      id: localStorage.getItem("reg_id"),
    };
    Bridge.upgradeplan(params).then((result) => {
      if (result.status == 1) {
        this.pay();
      } else {
      }
    });
  };
  activeuser = () => {
    let params = {
      investor_id: localStorage.getItem("reg_id"),
    };
    Bridge.investor.getinvestordetails(params).then((result) => {
      if (result.status == "1") {
        localStorage.setItem("investor_id", result.data[0].investor_id);
        localStorage.setItem("investor_email", result.data[0].email);
        localStorage.setItem("investor_kycstatus", result.data[0].kycstatus);
        localStorage.setItem(
          "investor_name",
          result.data[0].first_name + " " + result.data[0].last_name
        );
        setTimeout(() => {
          let order_id = "order-01";
          let user_id = result.data[0].investor_id;
          let amount = this.state.discounted_amount;
          let membership_fees = this.state.discounted_amount;
          let registered_amt = this.state.amount;
          let url = `${process.env.REACT_APP_BASE_URL}cashfree/register/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&membership_fees=${membership_fees}&registered_amt=${registered_amt}`;
          window.location.assign(url);
        }, 300);
      } else {
        // message.warning("Invalid Request");
      }
    });
  };
  goToDashboard = () => {
    window.location.assign("/deals");
    ReactGA.event({
      category: "Investor",
      action: "Get started",
    });
  };
  render() {
    return (
      <div>
        <NewWebHeader newabout={"newabout"} />
        <section className="pricing-section">
          <div className="container">
            <div className="tab-content" id="pills-tabContent1">
              <div
                className="tab-pane fade show active overflow-v"
                id="pills-home1"
              >
                <h4 className="text-center prenium-text">
                  We would like to invite you to upgrade to Premium Membership to
                  avail the exclusive benefits.

                  As a bonus, we are extending{" "}
                  <span style={{ fontSize: "22px", color: "green" }}>
                    "{this.state.discount}% Discount"
                  </span>{" "}
                  to upgrade Membership.
                </h4>
                <div className="row">
                <div className="col-md-5 m-auto">
                    <div className="pracing-item disabled">
                      <div className="top-left">
                        <p>Free</p>
                      </div>
                      <div className="top-area">
                        <i
                          className="bx bx-donate-heart"
                          style={{ fontSize: "40px", color: "green" }}
                        ></i>
                        <p> Regular Membership</p>
                      </div>
                      <ul className="text-left " style={{ textAline: "left" }}>
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i className="fa fa-check text-success"></i>
                          </span>
                          Access to Company Documents
                        </li>
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i className="fa fa-check text-success"></i>
                          </span>
                          View Company Performance{" "}
                        </li>
                        {/* <li className="ps-md-5 ps-0">
                          <span>
                            <i className="fa fa-check text-success"></i>
                          </span>
                          Invest{" "}
                        </li> */}
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Preview of opportunities (24~48 hrs)
                        </li>
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Minimum Amount as Per CCPS
                        </li>
                        <li className="ps-md-5 ps-0">
                          <span>
                            <i
                              className="fa fa-times text-danger"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Priority in Equity
                        </li>
                      </ul>
                      <p
                        className="text-success text-center mb-3"
                        style={{ fontSize: "24px" }}
                      >
                        {" "}
                        Free{" "}
                      </p>
                      <p className="buy-now-disabled active-color mb-5 py-1">
                        Activated Plan
                      </p>
                    </div>
                  </div>
                  <div className="col-md-5 m-auto">
                    <Spin spinning={this.state.loading}>
                      <div className="pracing-item">
                        <div className="top-left">
                          <p>100% off</p>
                        </div>
                        <div className="top-area">
                          <i
                            className="bx bxs-dollar-circle"
                            style={{ fontSize: "40px", color: "gold" }}
                          ></i>
                          <p>Premium Membership</p>
                        </div>
                        <ul>
                          <li className="ps-md-5 ps-0">
                            <span>
                              <i className="fa fa-check text-success"></i>
                            </span>
                            Access to Company Documents
                          </li>
                          {/* <li className="ps-md-5 ps-0">
                            <span>
                              <i className="fa fa-check text-success"></i>
                            </span>
                            Invest{" "}
                          </li> */}
                          <li className="ps-md-5 ps-0">
                            <span>
                              <i className="fa fa-check text-success"></i>
                            </span>
                            View Company Performance{" "}
                          </li>
                          <li className="ps-md-5 ps-0">
                            <span>
                              <i
                                className="fa fa-check text-success"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Preview of opportunities (24~48 hrs)
                          </li>
                          <li className="ps-md-5 ps-0">
                            <span>
                              <i
                                className="fa fa-check text-success"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Minimum Amount as Per CCPS
                          </li>
                          <li className="ps-md-5 ps-0">
                            <span>
                              <i
                                className="fa fa-check text-success"
                                aria-hidden="true"
                              ></i>
                            </span>
                            Priority in Equity
                          </li>
                        </ul>
                        <p
                          className="text-success text-center mb-3"
                          style={{ fontSize: "24px" }}
                        >
                          <del
                            className="text-secondary"
                            style={{ fontSize: "20px" }}
                          >
                            &#x20b9; {this.state.amount}
                          </del>
                          &nbsp; &#x20b9; {this.state.discounted_amount}{" "}
                        </p>
                        <button
                          href="#"
                          className="buy-now mb-5"
                          onClick={this.pay}
                        >
                          Upgrade Plan Now
                        </button>
                      </div>
                    </Spin>
                  </div>
             

                </div>
                <br />
                <br />
                <div className="row justify-content-center">
                  <div
                    className="small-button-dark2 py-2"
                    style={{ width: "auto" }}
                  >
                    <a
                      href="#"
                      onClick={() => {
                        this.goToDashboard();
                      }}
                      className="p-3"
                    >
                      Start Investing
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ul className="nav nav-pills" id="pills-tab1" role="tablist"></ul>
            <div className="heading-title">
              <h2>Thank you for joining Growth91 community.</h2>
              <img
                src="/web/5264.jpg"
                className="d-inline-block align-top img-fluid"
                alt="Growth91"
              />
            
            </div>
          </div>
        </section>

        <NewWebFooter />
      </div>
    );
  }
}

export default MembershipPlan;
