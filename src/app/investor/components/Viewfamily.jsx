import React, { Component } from "react";
import { Modal, Spin, DatePicker, Input, Skeleton } from "antd";
import Bridge from "../../constants/Bridge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import Urldata from "./Urldata.jsx";

const { TextArea } = Input;
class Viewfamily extends Component {
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
      selfdetail: "",
      selfnationality: "Indian Citizen",
      refferal_code: "",
      is_refferal_code_matched: "",
      phone1: "",
      memberdetail: "",
      viewmemberdetail: "",
      memberdetailid: localStorage.getItem("investor_id"),
      FamilyOtp: "",
      familyotpmodal: false,
      SendreqEmail: "",
      Sendreqmobile: "",
      selfaccount: "",
      ids: "",
    };
  }

  componentWillMount() {
    document.title = "Investor Dashboard - Growth91 ";
  }

  componentDidMount() {
    this.setState({ investor_id: this.props.investor_id });
    if (this.props.investor_id) {
      // this.getmember();
    }
    this.getbankdetails();
    this.getInvestments();
  }
  test=()=>{

  }
  getInvestments = () => {
    this.setState({ loading: true });
    let params = {
      investor_id:  localStorage.getItem("investor_id"),
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
  getbankdetails = (ids) => {
    let params = {
      id: ids||localStorage.getItem("investor_id"),
    };
    console.log(ids);
    Bridge.investor.getbankdetails(params).then((result) => {
      if (result.status == 1) {
        //checking user block status
        if (result.data[0].user_block_status == 0) {
          // console.log('result',result);
          this.setState({
            selfaccount: result.data[0],
            viewmemberdetail:result.data[0]
          });
        }
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
    if (this.state.SendreqEmail == "" || this.state.Sendreqmobile == "") {
      toast.error("Plz fill all field");
    } else {
      let params = {
        email: this.state.SendreqEmail,
        mobile: this.state.Sendreqmobile,
      };
      Bridge.family.checkFamilyMember(params).then((result) => {
        console.log(result);
        if (result.status == "1") {
          this.sendinvite();
          this.setState({ addModalStatus: false });
        } else {
          toast.error("Invailid User detail");
        }
      });
    }

    this.setState({ formloader: false });
  };
  onChangeEmail = (email) => {
    this.setState({ email: email });
  };
  sendinvite = () => {
    const ids = this.props.match.params.id;
    console.log(ids);

    let params = {
      email: this.state.SendreqEmail,
      mobile: this.state.Sendreqmobile,
      groupID: this.state.ids,
      userID: localStorage.getItem("Parent_investor_id"),
    };
    Bridge.family.saveInvite(params).then((result) => {
      console.log(result);
      if (result.status == "1") {
        toast.success(
          " Request has been sent to register E-mail id and Phone no"
        );
      } else {
        toast.info("Invitation already sent!");
        this.setState({ addModalStatus: false });
      }
    });
  };

  getmember = (value) => {
    if(localStorage.getItem("investor_id"))
    this.setState({ ids: value });
    let params = {
      parent_id: localStorage.getItem("Parent_investor_id"),
      groupID: value,
    };
    Bridge.investor.getfamilymember(params).then((result) => {
      console.log(result);
    const data =result.data.filter((item,index)=>{
      console.log(item.investor_id );
        return(

          item.investor_id == localStorage.getItem("investor_id")    
        )
      })
      console.log(data);
      console.log(data.length,"0");
      if(data.length !=0 ){
        localStorage.setItem(
          "investor_id",
          localStorage.getItem("Parent_investor_id")
        );
        localStorage.setItem(
          "investor_email",
          localStorage.getItem("Parent_investor_email")
        );
        localStorage.setItem(
          "investor_kycstatus",
          localStorage.getItem("Parent_investor_kycstatus")
        );
        localStorage.setItem(
          "investor_name",
          localStorage.getItem("Parent_investor_name")
        );
    // window.location.reload();

      }
      this.setState({ memberdetail: result.data });
    });
  };
  submitfamilyotp = (e) => {
    this.setState({ familyotpmodal: false });
    window.location.reload();
  };
  setmember = (e) => {
    let id;
    if (!e) {
      id = localStorage.getItem("investor_id");
      this.setState({ memberdetailid: id });
    } else {
      id = e.target.value;
      this.setState({ memberdetailid: id });
    }

    const data =
      this.state.memberdetail &&
      this.state.memberdetail.filter((item, index) => {
        return item.investor_id === id;
      });

    console.log(data[0]);
    console.log(id);
    if (id != localStorage.getItem("Parent_investor_id")) {
      
      this.getbankdetails(id)

      localStorage.setItem("investor_id", id);
      localStorage.setItem("investor_email", data[0].email);
      localStorage.setItem("investor_kycstatus", data[0].kycstatus);
      localStorage.setItem(
        "investor_name",
        data[0].first_name + " " + data[0].last_name
      );

      this.setState({ viewmemberdetail: data[0] });
      // window.location.reload();
    } else {
    //   alert("aadil")
    //   this.setState({ viewmemberdetail: this.state.selfaccount });
    //   console.log(this.state.selfaccount);
      localStorage.setItem("investor_id",
        localStorage.getItem("Parent_investor_id")
      );
      localStorage.setItem(
        "investor_email",
        localStorage.getItem("Parent_investor_email")
      );
      localStorage.setItem(
        "investor_kycstatus",
        localStorage.getItem("Parent_investor_kycstatus")
      );
      localStorage.setItem(
        "investor_name",
        localStorage.getItem("Parent_investor_name")
      );
      this.getbankdetails(id)



      // window.location.reload();
    }
  };
  render() {
    console.log(this.state.viewmemberdetail);
    return (
      <div>
        <Urldata setid={this.getmember} />
        <div className="col-lg-10 pb-4 " style={{ marginTop: "160px" }}>
          <div>
            <section
              id="hdii"
              className="m-lg-0  m-3"
              // style={{ minHeight: "40vh" }}
            >
              <div>
                <div className="row dashboard-items ">
                  <div className="col-lg-12 family-columns">
                    <div 
                    className="filteruser-dropdown form-control d-flex"
                    >
                      <select
                        name=""
                        id=""
                        className="optionselect form-select "
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
                    <div className="add-family-butttos">
                      <button
                        className="add-family-butttons"
                        style={{
                          background: "#29176F",
                          color: "white",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                        onClick={() => this.setState({ addModalStatus: true })}
                      >
                        Add Family Member
                      </button>
                    </div>
                  </div>
                </div>
                {this.state.viewmemberdetail &&(
                  <div className="row dashboard-items">
                    <div className="col-lg-12">
                      <div className="heads-names active">
                        <h2>
                          Welcome{" "}
                          {this.state.viewmemberdetail.first_name +
                            " " +
                            this.state.viewmemberdetail.last_name}
                        </h2>{" "}
                        <div className="edit-contacts">
                          <h5>
                            Registered Mobile Number :{" "}
                            {this.state.viewmemberdetail.mobile}
                          </h5>
                          <h5>
                            Registered Email id :{" "}
                            {this.state.viewmemberdetail.email }
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="row card-dashboard-rows"></div>
                  </div>
                    )
                  }
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
                value={this.state.SendreqEmail}
                onChange={(e) =>
                  this.setState({ SendreqEmail: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="mb-2">Mobile</label>
              <Input
                value={this.state.Sendreqmobile}
                onChange={(e) =>
                  this.setState({ Sendreqmobile: e.target.value })
                }
              />
            </div>
          </Spin>
        </Modal>

        <ToastContainer />
      </div>
    );
  }
}
export default withRouter(Viewfamily);
