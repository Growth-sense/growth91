import React, { Component } from "react";
import { Modal, Spin, DatePicker, Input, Skeleton } from "antd";
import Bridge from "../../constants/Bridge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { TextArea } = Input;
export default class Viewfamily extends Component {
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
      addModalStatus: false,
      formloader: false,
      middle_name: "",
      first_name: "aadil",
      last_name: "khan test family",
      email: "epu26061@doolk.com",
      phone: "8878331005",
      nationality: "Indian Citizen",
      selffirst_name: "",
      selflast_name: "",
      selfemail: "",
      selfphone: "",
      selfdetail:"",
      selfnationality: "Indian Citizen",
      refferal_code: "",
      is_refferal_code_matched: "",
      phone1: "",
      memberdetail: "",
      viewmemberdetail: "",
      memberdetailid: localStorage.getItem("investor_id"),
      FamilyOtp: "",
      familyotpmodal: false,
    };
  }

  componentWillMount() {
    document.title = "Investor Dashboard - Growth91 ";
  }

  componentDidMount() {
    this.setState({ investor_id: this.props.investor_id });
    if (this.props.investor_id) {
      this.getbankdetails();
      this.getInvestments();
      this.getmember();
    }
  }
  // get investments list
  getInvestments = () => {
    this.setState({ loading: true });
    let params = {
      investor_id: this.props.investor_id,
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
      id: this.props.investor_id,
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
            selfdetail: result.data[0],
          },
          localStorage.setItem("investor_kycstatus", result.data[0].kycstatus)
        );
      } else {
      }
    });
  };
  handleChangeSelect = (e) => {
    this.setState({
      nationality: e.target.value,
    });
  };
  addfamily = () => {
    this.setState({ formloader: true });
    if (
      this.state.first_name == "" ||
      this.state.last_name == "" ||
      this.state.email == "" ||
      this.state.phone == "" ||
      this.state.nationality == ""
    ) {
      toast.error("Plz fill all field");
    } else {
      let params = {
        first_name: this.state.first_name,
        middle_name: this.state.middle_name,
        last_name: this.state.last_name,
        parent_id: this.state.investor_id,
        email: this.state.email,
        nationality: this.state.nationality,
        phone: this.state.phone,
        refferal_code: "",
        is_refferal_code_matched: "",
        phone1: "",
      };
      Bridge.investor.addfamily(params).then((result) => {
        console.log(result);
        toast.success(" Request has been sent to register E-mail id and Phone no");
        this.setState({ addModalStatus: false });
        this.getmember();
      });
    }

    this.setState({ formloader: false });
  };
  onChangeEmail = (email) => {
    this.setState({ email: email });
  };
  getmember = () => {
    let params = {
      parent_id: localStorage.getItem("Parent_investor_id"),
    };
    Bridge.investor.getfamilymember(params).then((result) => {
      console.log(result);
      this.setState({ memberdetail: result.data });
    });
  };
  submitfamilyotp = (e) => {
    this.setState({ familyotpmodal: false });
    window.location.reload();
  };
  setmember = (e) => {
    this.setState({ memberdetailid: e.target.value });
    let id = e.target.value;

    const data = this.state.memberdetail.filter((item, index) => {
      return item.investor_id === id;
    });

    console.log(data[0]);
    console.log(id);
    console.log(localStorage.getItem("Parent_investor_id"));

    this.setState({ viewmemberdetail: data[0] });

    if (id != localStorage.getItem("Parent_investor_id")) {
      localStorage.setItem("investor_id", id);
      this.setState({ familyotpmodal: true });
      window.location.reload();

     
    } else {
      localStorage.setItem(
        "investor_id",
        localStorage.getItem("Parent_investor_id")
      );
      window.location.reload();
    }
  };
  render() {
    console.log(this.state.viewmemberdetail);
    return (
      <div>
        <div class="col-lg-10 pb-4 " style= {{marginTop:"160px"}}>
          <div>
            <section
              id="hdii"
              class="m-lg-0  m-3"
              // style={{ minHeight: "40vh" }}
            >
              <div>
                <div class="row dashboard-items ">
                  <div class="col-lg-12 family-columns">
                    <div class="filteruser-dropdown form-control">
                      <select
                        name=""
                        id=""
                        class="optionselect"
                        value={this.state.memberdetailid}
                        onChange={this.setmember}
                      >
                        <option
                          value={localStorage.getItem("Parent_investor_id")}
                        >
                          Self
                        </option>
                        {this.state.memberdetail &&
                          this.state.memberdetail.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <option value={item.investor_id}>
                                  {item.first_name} {item.last_name}
                                </option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                   <div class="add-familt-butttons">
                      <a
                        style={{ color: "white" }}
                        onClick={() => this.setState({ addModalStatus: true })}
                      >
                        Add Family Member
                      </a>
                    </div> 
                  </div>
                </div>
                {this.state.viewmemberdetail&& this.state.viewmemberdetail ? (
                  <div class="row dashboard-items">
                    <div class="col-lg-12">
                      <div class="heads-names active">
                        <h2>
                          Welcome {this.state.viewmemberdetail.first_name}
                        </h2>{" "}
                        <div class="edit-contacts">
                          <h5>
                            Registered Mobile Number  :{" "}
                            {this.state.viewmemberdetail.mobile}
                           
                          </h5>
                          <h5>
                            Registered Email id :{" "}
                            {this.state.viewmemberdetail.email}
                           
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="row card-dashboard-rows"></div>
                  </div>
                ):( <div class="row dashboard-items">
                    <div class="col-lg-12">
                      <div class="heads-names active">
                        <h2>
                          Welcome {this.state.selfdetail.first_name}
                        </h2>{" "}
                        <div class="edit-contacts">
                          <h5>
                            Registered Mobile Number  :{" "}
                            {this.state.selfdetail.mobile}
                           
                          </h5>
                          <h5>
                            Registered Email id :{" "}
                            {localStorage.getItem("investor_email")}
                           
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="row card-dashboard-rows"></div>
                  </div>)}
              </div>
            </section>
          </div>
        </div>
        <section
          id="hdii"
          className="m-lg-0  m-3"
          style={{ minHeight: "70vh" }}
        >
          <Skeleton loading={this.state.loading} active>
            <div className="row dashboard-items ">
              <div className="col-lg-4">
                <div className="single">
                  <h2>₹{this.state.startinvestedamount.toFixed()}</h2>
                  <small>Total Investment Value</small>
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
                <a href="/investor-portfolio" style={{ color: "#000" }}>
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
              <div className="row kyc-cards" style={{ marginTop: 25 }}>
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
                            this.state.nationality == "Indian Resident" ? (
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
                        <sup>®</sup> Admin for update.
                      </p>
                    </div>
                  ) : (
                    <>
                      {(this.state.kycstatus == "" ||
                        this.state.kycstatus == "Pending") &&
                        this.state.nationality == "Indian Resident" && (
                          <a href="/kyc-instructions">
                            <div className="single">
                              <div className="d-flex flex-row justify-content-between ">
                                <h5>KYC </h5>
                                <div>
                                  {(this.state.kycstatus == "admin_approved" ||
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
                              {(this.state.kycstatus == "admin_approved" ||
                                this.state.kycstatus == "system_approved") &&
                              this.state.nationality == "Indian Resident" ? (
                                <p>
                                  You have completed your KYC. You can invest
                                  from Deal page.
                                </p>
                              ) : this.state.kycstatus == "admin_rejected" &&
                                this.state.nationality == "Indian Resident" ? (
                                <p>
                                  Your KYC is incomplete. Please contact
                                  contact@Growth91
                                  <sup>®</sup>
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
                            ? "/non-resident-form"
                            : "#"
                        }
                      >
                        <div className="single">
                          <div className="d-flex flex-row justify-content-between ">
                            <h5>KYC</h5>
                            <div>
                              {this.state.kycstatus == "admin_approved" ? (
                                <span
                                  style={{
                                    color: "rgb(91 145 21)",
                                    background: "rgb(42 247 4 / 25%)",
                                  }}
                                >
                                  COMPLETED
                                </span>
                              ) : this.state.kycstatus == "admin_rejected" ? (
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
                                      background: "rgba(231, 63, 63, 0.1)",
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
                              You have completed your KYC. You can invest from
                              Deal page.
                            </p>
                          ) : this.state.kycstatus == "admin_rejected" ? (
                            <p>
                              Your KYC is incomplete. Please contact
                              contact@Growth91
                              <sup style={{ fontSize: "0.6rem" }}>
                                TM
                              </sup>.com <br />
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
        <Modal
          title="Add New Member"
          visible={this.state.addModalStatus}
          onOk={this.addfamily}
          okText="Submit"
          // onCancel={this.cancel_addfounder}
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
           <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Email <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.Email}
                onChange={(e) => this.setState({ Email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">Mobile</label>
              <Input
                value={this.state.mobile}
                onChange={(e) => this.setState({ mobile: e.target.value })}
              />
            </div>
          
         

           
          </Spin>
        </Modal>
       
        <ToastContainer />
      </div>
    );
  }
}
