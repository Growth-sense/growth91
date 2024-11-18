import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Card,
  Button,
  Select,
  message,
  Modal,
  Spin,
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import Apis from "../constants/Apis";
import { CopyOutlined } from "@ant-design/icons";
import InstitutionalReferralEdit from "./InstitutionalReferralEdit";
const { Option } = Select;
const { Content } = Layout;

class InstitutionalReferralView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      email: "",
      mobile: "",
      accordance: "",
      totalInvestedAmount: "",
      facebook: "",
      instagram: "",
      linkedIn: "",
      twitter: "",
      accountNo: "",
      ifsc_code: "",
      bankname: "",
      profileImg: "",
      referralCode: "",
      referralLink: "",
      showEdit: false,
      showProfileTbl: true,
      referralList: [],
      user_list: [],
      show_list_of_investment: false,
      investor_details_investment: [],
      investment_list_loading: false,
    };
    this.hideEditModal = this.hideEditModal.bind(this);
    this.updateEditModal = this.updateEditModal.bind(this);
  }

  componentDidMount() {
    this.getlist();
  }

  get_user_list = () => {
    let params = {
      reffered_by: this.state.referralCode,
    };
    // console.log("params", params);
    Bridge.admin.get_institutional_investor_list(params).then((result) => {
      if (result.data.status == 1) {
        // console.log("data", result);
        this.setState({
          user_list: result.data.data,
        });
      }
    });
  };

  // get  list
  getlist = () => {
    this.setState({ loading: true });
    Bridge.institutionalReferral.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          loading: false,
          referralList: result.data,
        });
        result.data &&
          result.data.map((item, index) => {
            if (item.referral_id == localStorage.getItem("referral_id")) {
              let profileUrl =
                Apis.IMAGEURL +
                "institutional_referral/profile_img/" +
                item.referral_id +
                "/" +
                item.profile_img;
              this.setState(
                {
                  name: item.name,
                  email: item.email,
                  mobile: item.mobile,
                  accordance: item.accordance,
                  facebook: item.facebook,
                  instagram: item.instagram,
                  linkedIn: item.linkedin,
                  twitter: item.twitter,
                  accountNo: item.bank_account_no,
                  ifsc_code: item.ifsc_code,
                  bankname: item.bank_name,
                  profileImg: profileUrl,
                  referralCode: item.referral_code,
                  referralLink: item.referral_link,
                },
                () => this.get_user_list()
              );
            }
          });
      } else {
        message.error(result.message);
        this.setState({ loading: false });
      }
    });
  };
  showEditModal(t) {
    this.setState({ showEdit: t, showProfileTbl: !t });
  }
  hideEditModal() {
    this.setState({ showProfileTbl: true, showEdit: false });
  }
  updateEditModal() {
    // window.location.reload();
    this.getlist();
    this.setState({ showProfileTbl: true, showEdit: false });
  }

  copyReferralLink(value) {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(value);
    message.success("Copied");
  }
  copyReferralCode(code) {
    navigator.clipboard.writeText(code);
    message.success("Copied");
  }

  get_details_investment_by_investors(item) {
    this.setState({
      show_list_of_investment: true,
      investment_list_loading: true,
    });
    let params = {
      referred_by: item.referred_by,
      email: item.email,
    };
    Bridge.admin.get_details_investment_by_investors(params).then((result) => {
      if (result.status == "1") {
        this.setState({
          investor_details_investment: result.data,
          investment_list_loading: false,
        });
      } else {
        this.setState({ investment_list_loading: false });
      }
    });
  }
  render() {
    const dataSource =
      this.state.user_list &&
      this.state.user_list.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          name: item.first_name + " " + item.last_name,
          email: item.email,
          totalInvestedAmount: item,
        };
      });

    const dataSource_1 =
      this.state.investor_details_investment &&
      this.state.investor_details_investment.map((item, index) => {
        // console.log(item);
        return {
          key: index,
          srno: index + 1,
          deal_name: item.deal_name,
          deal_id: item.deal_id ? item.deal_id : "---",
          transaction_id: item.payment_ref ? item.payment_ref : "---",
          dt_of_investment: item.Invested_dt ? item.Invested_dt : "---",
          investment_amount: item.Investment_amt ? item.Investment_amt : "---",
        };
      });

    const columns = [
      {
        title: "Sr. No.",
        dataIndex: "srno",
        key: "srno",
        width: 160,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },

      {
        title: "Total Invested Amount",
        dataIndex: "totalInvestedAmount",
        key: "totalInvestedAmount",
        align: "right",
        render: (text) => (
          <a
            href="#!"
            onClick={() => this.get_details_investment_by_investors(text)}
          >
            {text.total_invested_amount}
          </a>
        ),
      },
    ];

    const columns_1 = [
      {
        title: "Sr. No.",
        dataIndex: "srno",
        key: "srno",
        width: 80,
      },
      {
        title: "Deal Name",
        dataIndex: "deal_name",
        key: "deal_name",
      },
      {
        title: "Deal Id",
        dataIndex: "deal_id",
        key: "deal_id",
      },

      {
        title: "Transaction ID",
        dataIndex: "transaction_id",
        key: "transaction_id",
      },
      {
        title: "Date Of Investment",
        dataIndex: "dt_of_investment",
        key: "dt_of_investment",
      },
      {
        title: "Invested Amount",
        dataIndex: "investment_amount",
        key: "investment_amount",
        align: "right",
      },
    ];

    return (
      <>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
          <Navbar />

          <Layout className="site-layout">
            <Sidebar2 />

            <Content className="home-section">
              {this.state.showProfileTbl && (
                <Card title="Referrals" style={{ margin: 16 }}>
                  <Breadcrumb
                    style={{
                      margin: "0",
                    }}
                  >
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Referral View</Breadcrumb.Item>
                  </Breadcrumb>
                  <br />
                  <br />

                  <div className="card p-2">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group mt-3">
                          <img
                            src={this.state.profileImg}
                            className="rounded-circle"
                            width="120"
                            height="120"
                            alt="Avatar"
                          />
                        </div>
                        <div className="form-group mt-3">
                          {this.state.facebook && (
                            <a
                              href={this.state.facebook}
                              target={"true"}
                              role="button"
                            >
                              <i
                                className="fab fa-facebook-f fa-lg"
                                style={{ color: "3b5998" }}
                              ></i>
                            </a>
                          )}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {this.state.twitter && (
                            <a
                              href={this.state.twitter}
                              target={"true"}
                              role="button"
                            >
                              <i
                                className="fab fa-twitter"
                                style={{ color: "#55acee" }}
                              ></i>
                            </a>
                          )}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {this.state.instagram && (
                            <a
                              href={this.state.instagram}
                              target={"true"}
                              role="button"
                            >
                              {" "}
                              <i
                                className="fab fa-instagram fa-lg"
                                style={{ color: " #ac2bac" }}
                              ></i>
                            </a>
                          )}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {this.state.linkedIn && (
                            <a
                              href={this.state.linkedIn}
                              target={"true"}
                              role="button"
                            >
                              <i
                                className="fab fa-linkedin-in fa-lg"
                                style={{ color: "#0082ca" }}
                              ></i>
                            </a>
                          )}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                      </div>

                      <div className="col-md-3">
                        <br />
                        <span className="mb-2">Referral Code:</span>
                        <br />
                        <span className="mb-2">Referral link:</span>
                        <br />
                        <span className="mb-2">Name:</span>
                        <br />
                        <span className="mb-2">Email:</span>
                        <br />
                        <span className="mb-2">Mobile:</span>
                        <br />
                      </div>
                      <div className="col-md-6">
                        <br />
                        <span className="mb-2">
                          {this.state.referralCode}&nbsp;&nbsp;&nbsp;
                          <a
                            href="#"
                            onClick={() =>
                              this.copyReferralCode(this.state.referralCode)
                            }
                          >
                            <CopyOutlined />
                          </a>
                        </span>
                        <br />
                        <span className="mb-2">
                          {this.state.referralLink}&nbsp;&nbsp;&nbsp;
                          <a
                            href="#"
                            onClick={() =>
                              this.copyReferralLink(this.state.referralLink)
                            }
                          >
                            <CopyOutlined />
                          </a>
                        </span>
                        <br />
                        <span className="mb-2">{this.state.name}</span>
                        <br />
                        <span className="mb-2">{this.state.email}</span>
                        <br />
                        <span className="mb-2">{this.state.mobile}</span>
                        <br />
                        <br />
                        <div style={{ textAlign: "right" }}>
                          <button
                            className="btn prime-bg"
                            style={{
                              marginBottom: 20,
                              borderRadius: 5,
                              border: "none",
                              color: "white",
                              height: 40,
                            }}
                            onClick={() => this.showEditModal(true)}
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-10">List Of Benefactors</div>
                    {/* <div className="col-2 justify-content-end">
                      <Button
                        className="btn prime-bg"
                        style={{
                          maxWidth: 300,
                          marginBottom: 20,
                          borderRadius: 5,
                          border: "none",
                          color: "white",
                          height: 40,
                        }}
                      >
                        Download
                      </Button>
                    </div> */}
                  </div>
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={this.state.loading}
                    bordered
                    scroll={{ x: "max-content" }}
                  />
                </Card>
              )}
              {this.state.showEdit && (
                <InstitutionalReferralEdit
                  hideEditModal={this.hideEditModal}
                  updateEditModal={this.updateEditModal}
                />
              )}
              <Modal
                title="Investment Details"
                visible={this.state.show_list_of_investment}
                onOk={() => this.setState({ show_list_of_investment: false })}
                okText="OK"
                onCancel={() =>
                  this.setState({ show_list_of_investment: false })
                }
                width={900}
              >
                <div className="row">
                  <div className="col-10">List Of Investment</div>
                </div>
                <Spin spinning={this.state.investment_list_loading}>
                  <Table
                    dataSource={dataSource_1}
                    columns={columns_1}
                    loading={this.state.loading}
                    bordered
                    scroll={{ x: "max-content" }}
                  />
                </Spin>
              </Modal>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>
      </>
    );
  }
}
export default InstitutionalReferralView;
