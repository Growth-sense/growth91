import React, { Component } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Sidebar from "../common/Sidebar";
import Bridge from "../../constants/Bridge";
import { Spin, Skeleton } from "antd";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investor_id: "",
      kycstatus: "",
      bankstatus: "",
      loading: false,
      investments: [],
      startinvestedcompanies: 0,
      startinvestedamount: 0,
      nationality: "",
    };
  }
  componentDidMount() {
    let investor_id = localStorage.getItem("founder_id");
    this.setState({ investor_id: investor_id }, () => {
      this.getbankdetails();
      this.getInvestments();
    });
  }
  // get investments list
  getInvestments = () => {
    this.setState({ loading: true });
    let params = {
      investor_id: this.state.investor_id,
    };
    Bridge.investor.getInvestments(params).then((result) => {
      if (result.status == 1) {
        let total = 0;
        for (let d of result.data) {
          total += Number(d.Investment_amt);
        }
        this.setState({
          investments: result.data,
          startinvestedcompanies: result.data.length,
          startinvestedamount: total,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };
  // get bank details
  getbankdetails = () => {
    this.setState({ loading: true });
    let params = {
      id: this.state.investor_id,
    };
    Bridge.investor.getbankdetails(params).then((result) => {
      if (result.status == 1) {
        this.setState(
          {
            kycstatus: result.data[0].kycstatus,
            bankstatus: result.data[0].bank_ac_no == "" ? 0 : 1,
            loading: false,
            membership_type: result.data[0].membership_type,
            nationality: result.data[0].nationality,
          },
          localStorage.setItem("investor_kycstatus", result.data[0].kycstatus)
        );
      } else {
      }

      console.log("nationality :", this.state.nationality);
    });
  };

  render() {
    return (
      <div style={{ background: "rgba(0, 0, 0, 0.036)" }}>
        <Header />
        <section></section>

        <div className="row">
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"
            style={{ width:'fit-content' }}> */}
          <div
            className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            {/* <section></section> */}
            <Sidebar />
          </div>
          <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ">
            {/* <section></section> */}
            <Sidebar />
          </div>

          <div className="col col-lg-8 pb-4" style={{ paddingTop: 30 }}>
            <div>
              <section
                id="hdii"
                className="m-lg-0  m-3"
                style={{ minHeight: "70vh" }}
              >
                <Skeleton loading={this.state.loading} active>
                  <div className="row dashboard-items ">
                    <div className="col-lg-4">
                      <div className="single">
                        <h2>₹{this.state.startinvestedamount}</h2>
                        <small>To Investment Value</small>
                      </div>
                    </div>
                    &nbsp;
                    <div className="col-lg-4">
                      <div className="single">
                        <h2>{this.state.startinvestedcompanies}</h2>
                        <small>Number of Investment</small>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <a
                        href={
                          localStorage.getItem("investor_id")
                            ? "/investor-portfolio"
                            : "/founder-as-investor-portfolio"
                        }
                        style={{ color: "#000" }}
                      >
                        <div className="view-all-comments">
                          <p>
                            View All
                            <br /> Investments
                          </p>
                          <i className="bx bx-chevron-right"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </Skeleton>
                {this.state.nationality == "Indian Resident" ? (
                  <Spin spinning={this.state.loading}>
                    <div className="row kyc-cards" style={{ marginTop: 125 }}>
                      <div className="col-lg-4">
                        {this.state.kycstatus == "admin_rejected" ? (
                          <div className="single">
                            <div className="d-flex flex-row justify-content-between ">
                              <h5>KYC </h5>
                              <div>
                                {(this.state.kycstatus == "admin_approved" ||
                                  this.state.kycstatus == "system_approved") &&
                                this.state.nationality == "Indian Resident" ? (
                                  <span
                                    style={{
                                      color: "rgb(91 145 21)",
                                      background: "rgb(42 247 4 / 25%)",
                                    }}
                                  >
                                    COMPLETED
                                  </span>
                                ) : this.state.kycstatus == "admin_rejected" &&
                                  this.state.nationality ==
                                    "Indian Resident" ? (
                                  <span
                                    style={{
                                      color: "rgb(243 92 0)",
                                      background: "rgb(231 107 63 / 10%)",
                                    }}
                                  >
                                    REJECTED
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      color: "rgb(231, 63, 63)",
                                      background: "rgba(231, 63, 63, 0.1)",
                                    }}
                                  >
                                    PENDING
                                  </span>
                                )}
                              </div>
                            </div>
                            <p>
                              You KYC is rejected, pls reach Growth91
                             <sup>®</sup> Admin
                              for update.
                            </p>
                          </div>
                        ) : (
                          <>
                            {(this.state.kycstatus == "" ||
                              this.state.kycstatus == "Pending") &&
                              this.state.nationality == "Indian Resident" && (
                                <a href="/founder-kyc-instructions">
                                  <div className="single">
                                    <div className="d-flex flex-row justify-content-between ">
                                      <h5>KYC </h5>
                                      <div>
                                        {(this.state.kycstatus ==
                                          "admin_approved" ||
                                          this.state.kycstatus ==
                                            "system_approved") &&
                                        this.state.nationality ==
                                          "Indian Resident" ? (
                                          <span
                                            style={{
                                              color: "rgb(91 145 21)",
                                              background: "rgb(42 247 4 / 25%)",
                                            }}
                                          >
                                            COMPLETED
                                          </span>
                                        ) : this.state.kycstatus ==
                                            "admin_rejected" &&
                                          this.state.nationality ==
                                            "Indian Resident" ? (
                                          <span
                                            style={{
                                              color: "rgb(243 92 0)",
                                              background:
                                                "rgb(231 107 63 / 10%)",
                                            }}
                                          >
                                            REJECTED
                                          </span>
                                        ) : (
                                          <span
                                            style={{
                                              color: "rgb(231, 63, 63)",
                                              background:
                                                "rgba(231, 63, 63, 0.1)",
                                            }}
                                          >
                                            PENDING
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {(this.state.kycstatus ==
                                      "admin_approved" ||
                                      this.state.kycstatus ==
                                        "system_approved") &&
                                    this.state.nationality ==
                                      "Indian Resident" ? (
                                      <p>
                                        You have completed your KYC. You can
                                        invest from Deal page.
                                      </p>
                                    ) : this.state.kycstatus ==
                                        "admin_rejected" &&
                                      this.state.nationality ==
                                        "Indian Resident" ? (
                                      <p>
                                        Your KYC is incomplete. Please contact
                                        contact@Growth91
                                        <sup style={{ fontSize: "0.6rem" }}>
                                          TM
                                        </sup>
                                        .com <br />
                                        from more details.
                                      </p>
                                    ) : (
                                      <p>Complete your KYC.</p>
                                    )}
                                  </div>
                                </a>
                              )}
                          </>
                        )}
                      </div>
                    </div>
                  </Spin>
                ) : (
                  <Spin spinning={this.state.loading}>
                    {this.state.kycstatus == "Pending" && (
                      <div className="row kyc-cards" style={{ marginTop: 100 }}>
                        <div className="col-lg-4">
                          <>
                            <a
                              href={
                                this.state.kycstatus == "Pending"
                                  ? "/founder-non-resident-form"
                                  : "#"
                              }
                            >
                              <div className="single">
                                <div className="d-flex flex-row justify-content-between ">
                                  <h5>KYC</h5>
                                  <div>
                                    {this.state.kycstatus ==
                                    "admin_approved" ? (
                                      <span
                                        style={{
                                          color: "rgb(91 145 21)",
                                          background: "rgb(42 247 4 / 25%)",
                                        }}
                                      >
                                        COMPLETED
                                      </span>
                                    ) : this.state.kycstatus ==
                                      "admin_rejected" ? (
                                      <span
                                        style={{
                                          color: "rgb(243 92 0)",
                                          background: "rgb(231 107 63 / 10%)",
                                        }}
                                      >
                                        REJECTED
                                      </span>
                                    ) : (
                                      this.state.kycstatus == "Pending" && (
                                        <span
                                          style={{
                                            color: "rgb(231, 63, 63)",
                                            background:
                                              "rgba(231, 63, 63, 0.1)",
                                          }}
                                        >
                                          PENDING
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                                {this.state.kycstatus == "admin_approved" ? (
                                  <p>
                                    You have completed your KYC. You can invest
                                    from Deal page.
                                  </p>
                                ) : this.state.kycstatus == "admin_rejected" ? (
                                  <p>
                                    Your KYC is incomplete. Please contact
                                    contact@Growth91
                                   <sup>®</sup>
                                    .com <br />
                                    from more details.
                                  </p>
                                ) : (
                                  this.state.kycstatus == "Pending" && (
                                    <p>Complete your KYC.</p>
                                  )
                                )}
                              </div>
                            </a>
                          </>
                        </div>
                      </div>
                    )}
                  </Spin>
                )}
                <br />
                <div className="row kyc-cards">
                  <div className="col-lg-2"></div>
                </div>
              </section>
            </div>
          </div>
          <div className="col-lg-2 col-0"></div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Dashboard;
