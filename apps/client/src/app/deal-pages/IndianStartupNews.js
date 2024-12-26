import React, { Component } from "react";
import WebHeader from "../common/WebHeader";
import WebFooter from "../common/WebFooter";
import {
  Tabs,
  Collapse,
  message,
  Modal,
  Spin,
  Checkbox,
  Progress,
  Alert,
} from "antd";
import axios from "axios";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Apis from "../constants/Apis";
import moment from "moment";
import Bridge from "../constants/Bridge";
import InvestmentMembershipmodal from "../components/membership/InvestmentMembershipmodal";

const { Panel } = Collapse;
const { TabPane } = Tabs;
class IndianStartupNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal_id: "",
      investor_id: "",
      interested_id: "",
      deal_name: "",
      created_at: "",
      deal_description: "",
      isPrivate: false,
      isFunded: false,
      isBlank: false,
      tags: [],
      logo: "",
      youtube_url: "",
      dealenddays: 0,
      kycstatus: false,
      bankstatus: false,
      amount: 0,
      minamount: 0,
      maxamount: 0,
      investmentmodal: false,
      confirmmodalstatus: false,
      deduct: false,
      agree: "",
      isInvested: false,
      name: "",
      email: "",
      mobile: "",
      conveniencefees: 100,
      gst: 0,
      amountplusgst: 0,
      processingfees: 0.0,
      totalamount: 0.0,
      tdsstatus: false,
      legalfee: 0.0,
      legalplusprocessing: 0.0,
      label: "",
      percentage: 0,
      check_membership_type: "",
      tdsdeductedamount: 0,
      order_token: "",
      pdffile: "",
      pitch_files: "",
      pitch_list: [],
      walletMoney: 0,
      gstValue: 0,
      walletDeductionMoney: 0,
      checkWallet: false,
      percentage_raised: 0,
      documents: [],
      button_status: true,
      show_data: "none",
      button_show_status: true,
      amount_error: "",
      amount_error_status: false,
      multiples_of: 0,
      founder_is_investor: 0,
      user_type: "",
      coming_soon_days: "",
      deal_regular_end_date: "",
      is_deal_visible: true,
      deal_regular_end_date_status: 0,
      invest_amt: "",
      escrowact: "",
      escrow_account_ifsc: "",
      agreeCheck: false,
    };
  }
  callback1 = (key) => {};
  callback2 = (key) => {};
  callback3 = (key) => {};

  componentWillMount() {
    document.title = "IndianStartupNews - Growth91 - Startup Marketplace ";
  }
  componentDidMount() {
    let deal_id = "14";
    this.setState({ deal_id: deal_id }, () => {
      this.get_pitch_list();
    });

    if (
      localStorage.getItem("investor_id") ||
      localStorage.getItem("founder_id")
    ) {
      if (localStorage.getItem("investor_id")) {
        let investor_id = localStorage.getItem("investor_id");
        this.setState(
          { investor_id: investor_id, user_type: "investor" },
          () => {
            this.getstatusdata();
            this.getinvestmentdetails();
            this.check_for_membership_type();
            this.getwallethistory();
            this.get_invest_amt();
          }
        );
      } else if (localStorage.getItem("founder_id")) {
        this.get_founder_details();
        this.setState({ user_type: "founder" });
      }
    } else {
      this.getDeals();
    }
    this.getordertoken();
    this.getGst();
    this.get_deal_doucments(deal_id);
    console.log("hello");
  }
  get_founder_details = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.get_founder_profile_details(params).then((result) => {
      if (result.status == "1") {
        if (result.data.length > 0) {
          let investor_id = localStorage.getItem("founder_id");
          this.setState({ investor_id: investor_id }, () =>
            this.getwallethistory()
          );
          setTimeout(() => {
            if (result.data[0].is_investor == "1") {
              this.getstatusdata();
              this.getinvestmentdetails();
              this.check_for_membership_type();
              this.setState({ founder_is_investor: "1" });
            } else {
              this.check_for_membership_type();
              this.setState({ founder_is_investor: "0" });
            }
          }, 200);
        }
      } else {
        this.setState({ formloader: false });
      }
    });
  };
  get_deal_doucments = (deal_id) => {
    let params = {
      deal_id: deal_id,
    };
    Bridge.get_deal_doucments(params).then((result) => {
      if (result.status == "1") {
        let arr = [];
        for (let item of result.data) {
          item.selected = false;
          arr = [...arr, item];
        }
        this.setState({ documents: arr }, () =>
          this.get_document_purchased_list()
        );
      }
    });
  };
  show_selected_checkbox = (single) => {
    let arr = [];
    let docuemnts = this.state.documents;
    for (let item of docuemnts) {
      if (item.documentid == single.documentid) {
        item.selected = item.selected == true ? false : true;
      }
      arr = [...arr, item];
    }
    this.setState({ docuemnts: arr });
    let data = [];
    for (let item2 of arr) {
      data = [...data, item2.selected];
    }
    let status = data.includes(true);
    this.setState({ button_status: !status });
  };

  getwallethistory() {
    if (this.state.investor_id) {
      let params = {
        investor_id: this.state.investor_id,
      };
      Bridge.investor.get_wallet_history(params).then((result) => {
        if (result.status == "1") {
          let credit_amount = 0;
          let debit_amount = 0;
          for (let item of result.data) {
            if (item.type == "credited") {
              credit_amount = parseInt(credit_amount) + parseInt(item.amount);
            }
            if (item.type == "debited") {
              debit_amount = parseInt(debit_amount) + parseInt(item.amount);
            }
          }
          let total = parseInt(credit_amount - debit_amount);
          this.setState({ walletMoney: Math.abs(total) });
        } else {
        }
      });
    }
  }
  //for getting gst from admin page
  getGst = () => {
    Bridge.admin.settings.getsettings().then((result) => {
      if (result.status == "1") {
        this.setState({ gst: result.data[0].taxation_percentage });
      } else {
        // console.log("gst can not be able to fetch")
      }
    });
  };
  check_for_membership_type = () => {
    this.setState({ formloader: true });
    let params = {
      investor_id: this.state.investor_id,
    };
    Bridge.check_for_membership_type(params).then((result) => {
      if (result.status == 1) {
        if (result.data.length > 0) {
          this.setState({
            check_membership_type: result.data[0].membership_type,
          });
          setTimeout(() => {
            this.getDeals();
          }, 500);
        }
      } else {
        this.setState({ formloader: false });
      }
    });
    setTimeout(() => {
      this.getdealsettings();
    }, 500);
  };
  getordertoken = () => {
    Bridge.getcashfreetoken().then((result) => {
      let orderToken = result.order_token;
      // console.log(orderToken , "Order Token")
      this.setState({ order_token: orderToken });
    });
  };
  // get post list
  getdealsettings = () => {
    this.setState({ formloader: true });
    Bridge.admin.settings.getdealsettings().then((result) => {
      if (result.status == 1) {
        // console.log('result',result.data);
        this.setState({
          label: result.data[0].label,
        });
        if (this.state.check_membership_type == "premium") {
          this.setState({
            percentage: result.data[0].premium_member_deal_percentage,
          });
        } else {
          this.setState({
            percentage: result.data[0].regular_member_deal_percentage,
          });
        }
      } else {
        // message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  get_pitch_list = () => {
    this.setState({ loading: true });
    let params = {
      deal_id: this.state.deal_id,
    };
    Bridge.deal.get_image_list_of_pitch(params).then((result) => {
      if (result.status == 1) {
        let arr = [];
        for (let data of result.data) {
          let pitchImg =
            Apis.IMAGEURL +
            "deal/pitch_images/" +
            data.deal_id +
            "/" +
            data.image;
          data.img = pitchImg;
          arr = [...arr, data];
        }
        arr.sort((a, b) =>
          a.pitch_order > b.pitch_order
            ? 1
            : b.pitch_order > a.pitch_order
            ? -1
            : 0
        );
        // console.log('arr',arr);
        this.setState({ pitch_list: arr, loading: false });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  getinvestmentdetails = () => {
    this.setState({ loading: true });
    let params = {
      investor_id: this.state.investor_id,
      deal_id: this.state.deal_id,
    };
    Bridge.investor.getinvestmentdetails(params).then((result) => {
      if (result.status == 1) {
        if (result.data != "") {
          this.setState({ isInvested: true });
        }
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get deal list
  getstatusdata = () => {
    this.setState({ loading: true });
    let params = {
      id: this.state.investor_id,
    };
    Bridge.users.getstatusdata(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          kycstatus: result.data[0].kycstatus,
          bankstatus: result.data[0].ifsc_code ? true : false,
          loading: false,
          name: result.data[0].first_name + " " + result.data[0].last_name,
          email: result.data[0].email,
          mobile: result.data[0].mobile,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get deal list
  getDeals = () => {
    this.setState({ loading: true });
    Bridge.deal.list().then((result) => {
      console.log(result.data, "data");
      if (result.status == 1) {
        this.setState({
          deals: result.data,
          loading: false,
        });
        let current_date = moment();
        for (let d of result.data) {
          // console.log(d.deal_id , "id")
          // console.log(this.state.deal_id , "sid")
          if (d.deal_id == this.state.deal_id) {
            //  console.log(d.deal_status)
            let deal_regular_show_date = moment(d.regular_show_date);
            let deal_premium_show_date = moment(d.premium_show_date);
            let deal_start_dt_rg = moment(d.deal_st_date);
            let deal_start_dt_prem = moment(d.deal_start_dt_prem);
            if (this.state.check_membership_type == "premium") {
              if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_premium_show_date).format("YYYY-MM-DD")
              ) {
                this.setState({ show_data: "block" });
              } else if (current_date > deal_premium_show_date) {
                this.setState({ show_data: "block" });
              } else {
                this.setState({ show_data: "none" });
                window.location.assign("/deals");
                return;
              }
            } else if (this.state.check_membership_type == "regular") {
              if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_regular_show_date).format("YYYY-MM-DD")
              ) {
                this.setState({ show_data: "block" });
              } else if (current_date > deal_regular_show_date) {
                this.setState({ show_data: "block" });
              } else {
                this.setState({ show_data: "none" });
                window.location.assign("/deals");
                return;
              }
            }
          }
          // else{
          //   // window.location.href = ("/deals")
          //   // return;
          //   console.log(d.deal_id , this.state.deal_id);
          // }
        }
        for (let d of result.data) {
          console.log(d);
          if (d.deal_id == this.state.deal_id) {
            if (d.show_status == "0") {
              this.setState({ is_deal_visible: false });
              // window.location.assign("/deals")
            } else {
              this.setState({ is_deal_visible: true });
            }
            let investor_id = this.state.investor_id;
            if (d.deal_t_type == "Private") {
              if (
                investor_id &&
                d.invitations.length > 0 &&
                d.invitations.includes(investor_id)
              ) {
              } else {
                window.location.assign("/deals");
                return;
              }
            }
            let logourl =
              Apis.IMAGEURL + "deal/logo/" + d.deal_id + "/" + d.logo;

            let pdffile = `${process.env.REACT_APP_BASE_URL}api/uploads/deal/pitch/${d.deal_id}/${d.pitch_file}`;
            let pitchImg =
              Apis.IMAGEURL +
              "deal/pitch_images/" +
              d.deal_id +
              "/" +
              d.pitch_files;
            let percetage_raised = parseFloat(
              (d.total_invested_amount / d.deal_fund_requested) * 100 +
                parseInt(d.raiegap)
            ).toFixed(0);
            let deal_premium_start_date = moment(d.deal_start_dt_prem);
            let deal_regular_start_date = moment(d.deal_st_date);
            let deal_premium_end_date = moment(d.deal_end_dt_prem);
            let deal_regular_end_date = moment(d.deal_deal_end_date);
            this.setState({ deal_regular_end_date: deal_regular_end_date });
            let button_show_status = false;

            // console.log('this.state.check_membership_type',this.state.check_membership_type);
            // console.log('deal_regular_start_date',deal_regular_start_date);
            // console.log('deal_regular_end_date',deal_regular_end_date);
            // console.log('current_date',current_date);
            // deal changes
            let differece = "";
            let dealEndDate = "";
            let currentDate = "";
            this.setState({ coming_soon_days: "" });
            if (this.state.check_membership_type == "premium") {
              dealEndDate = moment(d.deal_end_dt_prem).format("YYYY-MM-DD");
              currentDate = moment().format("YYYY-MM-DD");
              let days = this.getDifferenceInDays(currentDate, dealEndDate);
              differece = days;
              if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_premium_start_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else if (
                moment(current_date).format("YYYY-MM-DD") >
                  deal_premium_start_date.format("YYYY-MM-DD") &&
                moment(current_date).format("YYYY-MM-DD") <
                  moment(deal_premium_end_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_premium_end_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else {
                button_show_status = false;
              }
              //for deal start date
              if (
                moment(current_date).format("YYYY-MM-DD") <=
                moment(deal_premium_start_date).format("YYYY-MM-DD")
              ) {
                this.setState({
                  coming_soon_days: this.getDifferenceInDays(
                    moment(current_date).format("YYYY-MM-DD"),
                    moment(deal_premium_start_date).format("YYYY-MM-DD")
                  ),
                });
              }
            } else if (
              this.state.check_membership_type == "regular" ||
              this.state.check_membership_type == ""
            ) {
              dealEndDate = moment(d.deal_end_date).format("YYYY-MM-DD");
              currentDate = moment().format("YYYY-MM-DD");
              let days = this.getDifferenceInDays(currentDate, dealEndDate);
              differece = days;
              if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_regular_start_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else if (
                moment(current_date).format("YYYY-MM-DD") >
                  deal_regular_start_date.format("YYYY-MM-DD") &&
                moment(current_date).format("YYYY-MM-DD") <
                  moment(deal_regular_end_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else if (
                moment(current_date).format("YYYY-MM-DD") ==
                moment(deal_regular_end_date).format("YYYY-MM-DD")
              ) {
                button_show_status = true;
              } else {
                button_show_status = false;
              }
              //for deal start date
              if (
                moment(current_date).format("YYYY-MM-DD") <=
                moment(deal_regular_start_date).format("YYYY-MM-DD")
              ) {
                this.setState({
                  coming_soon_days: this.getDifferenceInDays(
                    moment(current_date).format("YYYY-MM-DD"),
                    moment(deal_regular_start_date).format("YYYY-MM-DD")
                  ),
                });
              }
            }
            // console.log('button_show_status',this.state.button_show_status);
            this.setState(
              {
                deal_name: d.name,
                deal_description: d.Muliples_of,
                // isBlank:d.deal_status == "Closed" ? window.location.href = "/" : "/",
                isPrivate: d.deal_t_type == "Private" ? true : false,
                isFunded: d.deal_status == "Closed" ? true : false,
                tags: d.deal_category ? JSON.parse(d.deal_category) : [],
                logo: logourl,
                youtube_url: d.youtubelink,
                dealenddays: differece > 0 ? differece : 0,
                minamount: d.Min_inv_amt,
                maxamount: d.Max_inv_amt,
                amount: "", //d.Min_inv_amt
                pdffile: pdffile,
                pitch_files: pitchImg,
                percentage_raised: percetage_raised,
                button_show_status: button_show_status,
                show_data: "block",
                multiples_of: d.multiples_of,
              },
              () => this.calculategst()
            );
          }
        }
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  getDifferenceInDays = (date1, date2) => {
    let diff = Math.floor((Date.parse(date2) - Date.parse(date1)) / 86400000);
    let final = 0;
    if (diff < 0) {
      final = 0;
      this.setState({
        deal_regular_end_date_status: 1,
      });
    } else {
      final = diff;
      this.setState({
        deal_regular_end_date_status: 0,
      });
    }
    return final;
  };

  showalertmessage = () => {
    // message.warning('Please complete your KYC process or bank details to access this deal.');
  };

  showModal1 = () => {
    if (this.state.kycstatus == "admin_rejected") {
      message.warning(
        "Your KYC is Rejected, Please Contact to contact@Growth91<sup>TM</sup>.com"
      );
      return;
    }
    this.setState(
      {
        investmentmodal: true,
      },
      () => {
        this.calculategst();
      }
    );
  };

  // post api hit on express
  getpostData = () => {
    const formData = new FormData();
    formData.append("deal_id", this.state.deal_id);
    formData.append("investor_id", this.state.investor_id);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/save_investor_interest_deal`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        this.setState({
          interested_id: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleOk1 = () => {
    this.setState({
      investmentmodal: false,
    });
  };

  handleCancel1 = () => {
    this.setState({
      investmentmodal: false,
    });
  };

  showModal2 = () => {
    this.setState({
      confirmmodalstatus: true,
    });
  };

  handleOk2 = () => {
    this.setState({
      confirmmodalstatus: false,
    });
  };

  handleCancel2 = () => {
    this.setState({
      confirmmodalstatus: false,
    });
  };
  onChangeCheckbox = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
      agreeCheck: e.target.checked,
    });

    if (e.target.name == "deduct") {
      if (e.target.checked == true) {
        let processingfees = parseFloat(
          (this.state.amount / 100) * parseFloat(this.state.percentage)
        );
        let tdsamount = parseFloat(processingfees / 100) * 10;
        let minusamt = parseFloat(processingfees - tdsamount);

        this.setState({
          processingfees: minusamt,
          tdsdeductedamount: tdsamount,
        });
      } else {
        let processingfees = parseFloat(
          (this.state.amount / 100) * parseFloat(this.state.percentage)
        );
        this.setState({
          processingfees: processingfees,
          tdsdeductedamount: 0,
        });
      }
    }
  };

  // investing your money
  invest = () => {
    let investor_id = this.state.investor_id;
    let deal_id = this.state.deal_id;
    let Investment_amt = this.state.totalamount;
    let deductstatus = this.state.deduct == true ? "1" : "0";
    let agreestatus = this.state.agree == true ? "1" : "0";
    let payment_ref = this.state.order_token;
    let tdsstatus = this.state.tdsstatus == true ? "1" : "0";
    let processingfees = this.state.processingfees;
    let gst = this.state.gst;
    let legalfees = this.state.legalfee;
    let order_id = "order-01";
    let walletamt = this.state.walletDeductionMoney
      ? this.state.walletDeductionMoney
      : 0;

    let url = `${process.env.REACT_APP_BASE_URL}cashfree/checkout.php?investor_id=${investor_id}&deal_id=${deal_id}&deductstatus=${deductstatus}&agreestatus=${agreestatus}&payment_ref=${payment_ref}&tdsstatus=${tdsstatus}&processingfees=${processingfees}&gst=${gst}&legalfees=${legalfees}&Investment_amt=${Investment_amt}&order_id=${order_id}&wallet=${walletamt}`;
    // console.log('url',url);
    window.location.assign(url);
  };

  loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  calculategst = () => {
    let legalfee = parseFloat(
      (this.state.amount / 100) * parseFloat(this.state.percentage)
    );
    let gst = this.state.gst;
    let amt = parseFloat(this.state.amount);
    let walletDeductionMoney;
    if (this.state.checkWallet == false) {
      walletDeductionMoney = 0;
    } else {
      walletDeductionMoney =
        legalfee.toFixed(0) <= this.state.walletMoney
          ? legalfee.toFixed(0)
          : this.state.walletMoney;
    }
    let gstValue = ((legalfee.toFixed(0) - walletDeductionMoney) * gst) / 100;
    this.setState({
      gst: gst,
      legalfee: this.state.amount ? legalfee.toFixed(0) : 0,
      amountplusgst: this.state.amount ? amt.toFixed(0) : 0,
      processingfees: this.state.amount ? legalfee.toFixed(0) : 0,
      totalamount: this.state.amount
        ? (amt + parseFloat(legalfee)).toFixed(0) -
          walletDeductionMoney +
          gstValue
        : 0,
      walletDeductionMoney: walletDeductionMoney,
      gstValue: gstValue,
    });
    return gst;
  };
  documentPay = () => {
    if (!this.state.investor_id) {
      message.warning("Please login first to invest.", 5);
      return;
    }
    let documents = this.state.documents;
    let paying_for_documents = [];
    let totalamt = 0;
    for (let item of documents) {
      if (item.selected == true) {
        totalamt +=
          this.state.check_membership_type == "premium"
            ? Number(item.premium_price)
            : Number(item.regular_price);
        paying_for_documents = [...paying_for_documents, item.documentid];
      }
    }
    let order_id = "order-01";
    let user_id = this.state.investor_id;
    let amount = totalamt;
    let docs = paying_for_documents.join("-").toString();
    let deal_id = this.state.deal_id;
    let url = `${process.env.REACT_APP_BASE_URL}cashfree/buy_documents/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&docs=${docs}&deal_id=${deal_id}`;

    window.location.href = url;
  };
  get_document_purchased_list = () => {
    if (this.state.investor_id) {
      let params = {
        investor_id: this.state.investor_id,
        deal_id: this.state.deal_id,
      };
      Bridge.deal.get_document_purchased_list(params).then((result) => {
        if (result.status == 1) {
          let arr = [];
          let documents = this.state.documents;
          for (let item of documents) {
            let status = false;
            item.user_paid = false;
            for (let item2 of result.data) {
              if (item2.document_id == item.documentid || item.paid == "Free") {
                item.user_paid = true;
              }
            }
            arr = [...arr, item];
          }
          this.setState({ documents: arr });
        }
      });
    }
  };
  check_for_error = () => {
    let error = "";
    let multiple_of =
      parseFloat(this.state.amount) / parseFloat(this.state.multiples_of);
    if (Number(this.state.amount) < Number(this.state.minamount)) {
      error = `Minimum investment amount is Rs. ${this.state.minamount}`;
      this.setState({ amount_error: error, amount_error_status: true });
    } else if (Number(this.state.amount) > Number(this.state.maxamount)) {
      error = `Maximum investment amount is Rs. ${this.state.maxamount}`;
      this.setState({ amount_error: error, amount_error_status: true });
    } else if (Number.isInteger(multiple_of) == false) {
      error = `Amount should be in multiple of Rs. ${this.state.multiples_of}`;
      this.setState({ amount_error: error, amount_error_status: true });
    } else {
      this.setState({ amount_error: "", amount_error_status: false });
    }
  };
  get_invest_amt = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/get_investor_investment_for_deal`,
        {
          params: {
            deal_id: this.state.deal_id,
            investor_id: this.state.investor_id,
          },
        }
      )
      .then((response) => {
        console.log("invest_amt : ", response.data.data[0].totalamount);
        this.setState({ invest_amt: response.data.data[0].totalamount });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const myStyle = {
      color: "white",
      fontSize: "17px",
      padding: "50px",
      // justifyItem:"center"1
    };
    const genExtra = () => (
      <>
        {/* <PlusOutlined
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      /> */}
      </>
    );

    return (
      <>
        {this.state.is_deal_visible == true ? (
          <div style={{ display: this.state.show_data }}>
            <WebHeader />
            <section
              className="deals-details-page"
              style={{ marginBottom: "-50px" }}
            >
              <div className="container main-section">
                <div className="row">
                  <div className="col-lg-5 col-md-5 col-sm-5">
                    <Spin spinning={this.state.loading}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          {/* Image is static */}
                          <img
                            src="./assets/images/deals-details/IndianStartupNews/logo.jpg"
                            alt=""
                            className="img-fluid"
                            style={{
                              marginRight: "20px",
                              width: "50%",
                              objectFit: "contain",
                            }}
                          />
                          <h5 className="ml-5 mt-4">IndianStartupNews</h5>
                          {/* <h5>{this.state.logo}</h5> */}
                        </div>
                        {this.state.isPrivate == true && (
                          <div
                            className="private-tag"
                            style={{
                              height: 38,
                            }}
                          >
                            <span style={{ fontSize: 12 }}>Private</span>{" "}
                          </div>
                        )}
                      </div>
                      <div className="d-flex tags">
                        {this.state.tags.length > 0 &&
                          this.state.tags.map((tag, index) => (
                            <div
                              className="hero-tag"
                              key={index}
                              style={{
                                background: "rgb(41 23 111)",
                                color: "#fff",
                              }}
                            >
                              {tag}
                            </div>
                          ))}
                      </div>

                      <p style={{ textAlign: "justify" }}>
                      Indian Startup News is an exclusive online media platform that offers comprehensive coverage of the entire startup ecosystem. Their objective is to provide a holistic overview of startups, ranging from the initial ideation phase to the accelerated growth stage and connect them with the right people to help them grow and succeed.
                      </p>
                      <div className=" percentage-container">
                        <div className="percentage-values">
                          {this.state.coming_soon_days ? (
                            <>
                              <div>
                                <h3>{this.state.percentage_raised}%</h3>
                                <span>RAISED</span>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <h3>{this.state.coming_soon_days} Days</h3>
                                <span>CAMPAIGN START IN</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <h3>{this.state.percentage_raised}%</h3>
                                <span>RAISED</span>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <h3>{this.state.dealenddays} Days</h3>
                                <span>CAMPAIGN ENDS IN</span>
                              </div>
                            </>
                          )}
                        </div>
                        <Progress
                          percent={this.state.percentage_raised}
                          strokeColor={{
                            "0%": "rgb(255 156 26)",
                            "100%": "rgb(255 156 26)",
                          }}
                          showInfo={false}
                        />
                      </div>
                      {!this.state.investor_id ? (
                        <div className="button-group text-center">
                          <a className="prime-bg" href="/Login">
                            Login
                          </a>
                          {/* <button className='share-button'>
                        <i className='bx bxs-share'></i>
                      </button> */}
                        </div>
                      ) : (
                        <>
                          {this.state.button_show_status == true ? (
                            <>
                              <div className="button-group">
                                {this.state.isFunded == true ? (
                                  <a
                                    href="#"
                                    className="black-button prime-bg text-center"
                                  >
                                    Deal is closed
                                  </a>
                                ) : this.state.user_type != "founder" &&
                                  this.state.invest_amt !== null ? (
                                  <div className="button-group">
                                    <p>{`You have committed Rs. ${this.state.invest_amt} to this deal so far. (Including platform fees)`}</p>
                                    <a
                                      href="#!"
                                      style={{ padding: "13px 0" }}
                                      onClick={() => {
                                        this.getpostData();
                                        this.showModal1();
                                      }}
                                      className="black-button prime-bg text-center"
                                      id="btn-invest"
                                    >
                                      Add more
                                    </a>
                                  </div>
                                ) : this.state.isPrivate == true &&
                                  this.state.user_type != "founder" ? (
                                  <a
                                    style={{ padding: "13px 0" }}
                                    href="#"
                                    onClick={() => {
                                      this.getpostData();
                                      this.showModal1();
                                    }}
                                    className="black-button prime-bg text-center"
                                  >
                                    Express Your Interest
                                  </a>
                                ) : this.state.user_type == "founder" ? (
                                  <div>
                                    {this.state.user_type == "founder" &&
                                    this.state.founder_is_investor == "1" ? (
                                      <a
                                        href="#"
                                        style={{ padding: "15px 0" }}
                                        className="black-button prime-bg text-center"
                                        onClick={() => {
                                          this.getpostData();
                                          this.showModal1();
                                        }}
                                      >
                                        Express Your Interest
                                      </a>
                                    ) : (
                                      <a
                                        href="/founder-as-investor"
                                        className="black-button prime-bg text-center"
                                      >
                                        Apply as investor
                                      </a>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    {this.state.user_type == "investor" &&
                                    this.state.invest_amt === null ? (
                                      <a
                                        href="#"
                                        className="black-button prime-bg text-center"
                                        onClick={() => {
                                          this.getpostData();
                                          this.showModal1();
                                        }}
                                        style={{ padding: "13px 0" }}
                                      >
                                        Express Your Interest
                                      </a>
                                    ) : null}
                                  </div>
                                )}
                                {/* <button className='share-button'>
                              <i className='bx bxs-share'></i>
                            </button> */}
                              </div>
                            </>
                          ) : (
                            // <div className='button-group'>
                            //   <a href="#" className="black-button prime-bg" style={{cursor:'default'}} >Coming soon..</a>
                            // </div>
                            <>
                              {this.state.deal_regular_end_date_status == 0 ? (
                                <div className="button-group">
                                  <a
                                    href="#"
                                    className="black-button prime-bg"
                                    style={{ cursor: "default" }}
                                  >
                                    Coming soon..
                                  </a>
                                </div>
                              ) : (
                                <div className="button-group">
                                  <a
                                    href="#"
                                    className="black-button prime-bg"
                                    style={{ cursor: "default" }}
                                  >
                                    Deal is closed
                                  </a>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </Spin>
                  </div>
                  <Modal
                    title={`Invest in ${this.state.deal_name}`}
                    visible={this.state.investmentmodal}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    width={600}
                    footer={false}
                  >
                    <div className="row modal-body">
                      <div className="login mt-3">
                        <label>
                          <b>
                            Amount: (Minimum investment amount should be Rs.{" "}
                            {this.state.minamount})
                          </b>
                        </label>
                        <input
                          type="text"
                          name="amount"
                          className="form-input-field mt-4"
                          autofocus={true}
                          placeholder="amount"
                          style={{
                            border:
                              this.state.amount_error_status == true &&
                              this.state.amount
                                ? "1px solid red"
                                : "1px solid transparent",
                          }}
                          id="selected-field"
                          value={this.state.amount}
                          onChange={(e) => {
                            this.setState(
                              {
                                amount: e.target.value,
                              },
                              () => {
                                this.calculategst();
                                this.check_for_error();
                              }
                            );
                          }}
                        />
                        {this.state.amount_error_status == true && (
                          <p
                            className="text-danger pb-0"
                            style={{ position: "relative", top: -19 }}
                          >
                            {this.state.amount_error}
                          </p>
                        )}
                      </div>

                      <div class="form-group form-check d-flex">
                        <Checkbox
                          checked={this.state.checkWallet}
                          onChange={(e) => {
                            this.setState(
                              { checkWallet: e.target.checked },
                              () => this.calculategst()
                            );
                          }}
                        >
                          {" "}
                        </Checkbox>
                        <label className="form-check-label">
                          Use Your ₹ {this.state.walletMoney} Growth91
                          <sup style={{ fontSize: "0.6rem" }}>
                            TM
                          </sup> Money{" "}
                        </label>
                      </div>
                      <div className=" d-flex justify-content-center modal-table">
                        <table
                          className="col-12 m-5 investment-charge-table"
                          cellPadding={4}
                        >
                          <tr>
                            <th>
                              <strong>Particulars</strong>
                            </th>
                            <th>
                              <strong>Amount</strong>
                            </th>
                          </tr>
                          <tr>
                            <td>Investment Amount</td>
                            <td lassName="text-center">
                              ₹{" "}
                              {this.state.amountplusgst
                                ? this.state.amountplusgst
                                : "0"}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Convenience Fees
                              <br />
                              <span>{this.state.label}</span>
                            </td>
                            <td lassName="text-center">
                              ₹ {this.state.processingfees}
                            </td>
                          </tr>
                          <tr>
                            <td>Wallet Money</td>
                            <td lassName="text-center">
                              - ₹ {this.state.walletDeductionMoney}
                            </td>
                          </tr>
                          <tr>
                            <td>Total</td>
                            <td>
                              ₹ {parseFloat(this.state.totalamount).toFixed(0)}
                            </td>
                          </tr>
                        </table>
                      </div>
                      {this.state.invest_amt !== null ? (
                        <div className="">
                          <Alert
                            message={`You have committed Rs. ${this.state.invest_amt} to this deal so far. (Including platform fees)`}
                            type="info"
                          />
                        </div>
                      ) : null}
                      <div className="m-3">
                        <label className="container-check">
                          I Agree to Terms and Conditions and have read the
                          Privacy Policy. And, I understand that I will be
                          required to pay the full amount committed after the
                          deal is closed.
                          <input
                            type="checkbox"
                            name="agree"
                            onChange={this.onChangeCheckbox}
                          />
                          <span className="checkmark"></span>
                        </label>

                        {/* <label className="container-check">I will deduct TDS on service charges and deposit to Income tax on time
                      <input type="checkbox" name="deduct" onChange={this.onChangeCheckbox}  />
                      <span className="checkmark"></span>
                    </label> */}
                      </div>

                      <div className="col-12">
                        {this.state.amount_error_status == true ? (
                          <button
                            type="button"
                            className="login-button text-center"
                            style={{
                              border: "1px solid #9a9a9a",
                              backgroundColor: "#9a9a9a",
                              cursor: "not-allowed",
                              padding: "0.9em 0 ",
                            }}
                          >
                            Express Your Interest
                          </button>
                        ) : (
                          <InvestmentMembershipmodal
                            processingfees={this.state.processingfees}
                            deal_id={this.state.deal_id}
                            membership_type={this.state.check_membership_type}
                            invest={this.invest}
                            amount={this.state.amount}
                            agreecheck={this.state.agreeCheck}
                            totalamount={this.state.totalamount}
                            fee={this.state.legalfee}
                            minamount={this.state.minamount}
                            maxamount={this.state.maxamount}
                            agree={this.state.agree}
                            error_status={this.state.amount_error_status}
                            investor_id={this.state.investor_id}
                            deduct={this.state.deduct}
                            tdsstatus={this.state.tdsstatus}
                            gst={this.state.gst}
                            order_token={this.state.order_token}
                            legalfee={this.state.legalfee}
                            walletDeductionMoney={
                              this.state.walletDeductionMoney
                            }
                            user_id={this.state.investor_id}
                            escrow_account_ifsc={this.state.escrow_account_ifsc}
                            escrowact={this.state.escrowact}
                            interested_id={this.state.interested_id}
                            invest_amt={this.state.invest_amt}
                          />
                        )}
                      </div>
                    </div>
                  </Modal>
                  <Modal
                    title="Deduct TDS"
                    visible={this.state.confirmmodalstatus}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    width={700}
                    footer={false}
                  >
                    <div className="row">
                      <div style={{ width: "100%" }}>
                        <p style={{ margin: "10px", maxWidth: "100%" }}>
                          TDS is applicable according to Section-194j of the
                          income Tex act, 1961.
                        </p>
                        <p style={{ margin: "10px", maxWidth: "100%" }}>
                          Rate: 10%
                        </p>{" "}
                        <br />
                        <p style={{ margin: "10px", maxWidth: "100%" }}>
                          <b>Do you want to Deduct TDS?</b>
                        </p>
                      </div>

                      <div className="col-11">
                        <button
                          type="button"
                          className="login-button bg-primary mt-4 mx-4"
                          onClick={() => this.invest()}
                        >
                          Yes
                        </button>
                        <input
                          type="button"
                          value="No Thanks"
                          onClick={() => this.invest()}
                          className="login-button mx-4 my-3"
                        ></input>
                      </div>
                    </div>
                  </Modal>
                  <div className="col-lg-7">
                    {this.state.youtube_url && (
                      <iframe
                        style={{
                          boxShadow: "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                          borderRadius: 3,
                          // marginLeft: 65,
                        }}
                        width="100%"
                        height="335"
                        src={this.state.youtube_url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                    {!this.state.youtube_url && (
                        <img
                          src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0001.jpg"
                          width="100%"
                          style={{ height: "auto" }}
                        />
                      // <video controls width="100%" style={{ height: "auto" }}>
                      //   <source
                      //     src="./assets/videos/deals-details/IndianStartupNews/IndianStartupNews.mp4"
                      //     type="video/mp4"
                      //   />
                      //   Sorry, your browser doesn't support videos.
                      // </video>
                    )}
                  </div>

                  <div
                    className="container highlight-section"
                    style={{
                      marginBottom: "-80px !important",
                      padding: "0px !important",
                    }}
                  >
                    <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>
                      Highlights
                    </h1>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single text-left">
                          <img src="./assets/images/deals-details/Petmojo/highlight01.jpg" />
                          <p style={{ padding: "1px !important" }}>
                            3 Million+ Total account reached monthly across different channels.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single text-left">
                          <img src="./assets/images/deals-details/highlight2.jfif" />
                          <p style={{ padding: "0px !important" }}>
                            20 Million+ Total impressions monthly.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single text-left">
                          <img src="./assets/images/deals-details/highlight3.jpg" />
                          <p style={{ paddingLeft: "0px !important" }}>
                            Website ranks in 4th position (Keyword 'startup news'). 
                          </p>
                        </div>
                      </div>
                      {/* <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single text-left">
                          <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" />
                          <p style={{ paddingLeft: "0px !important" }}>
                            Net profitable in first 6 months of growth
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single text-left">
                          <img src="./assets/images/deals-details/Petmojo/highlight5.png" />
                          <p style={{ paddingLeft: "0px !important" }}>
                            Incubated and backed by BITS Pilani
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="deals-page">
              <div className="tab-wrapper">
                <div className="container">
                  <div className="row">
                    <div
                      className="col-lg-12 col-md-12 col-sm-12"
                      style={{
                        marginTop: 110,
                      }}
                    >
                      <Tabs
                        defaultActiveKey="1"
                        centered
                        style={{ marginBottom: "30px !important" }}
                      >
                        <TabPane tab="Details" key="2">
                          <div className="deal-terms-section">
                            <div
                              className="container"
                              style={{ marginTop: "1px !important" }}
                            >
                              <div className="row">
                                <div className="col-lg-10 m-auto">
                                  <h1>Documents</h1>
                                  <div className="row document-section">
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-8">
                                      <div
                                        className="download-section"
                                        style={{
                                          backgroundColor: "white",
                                          padding: "4rem 19px",
                                        }}
                                      >
                                        <>
                                          <div>
                                            <table
                                              className="download-document-table"
                                              style={{ width: "100%" }}
                                            >
                                              <tr
                                                style={{
                                                  background: "#29176f",
                                                  color: "#fff",
                                                }}
                                              >
                                                <th>Sr no</th>
                                                <th>Document</th>
                                                <th>Type</th>
                                                <th>Download</th>
                                              </tr>
                                              {this.state.documents.length >
                                                0 &&
                                                this.state.documents.map(
                                                  (item, index) => {
                                                    let documentlink = `${process.env.REACT_APP_BASE_URL}api/uploads/docs/${item.documentid}/${item.document}`;
                                                    return (
                                                      <tr
                                                        key={index}
                                                        style={{ height: 70 }}
                                                      >
                                                        {/* <td
                                                          style={{ width: 40 }}
                                                        >
                                                          {item.paid ==
                                                            "Paid" && (
                                                            <>
                                                              {this.state
                                                                .check_membership_type ==
                                                                "premium" &&
                                                              item.premium_price !=
                                                                "0" &&
                                                              item.premium_price !=
                                                                "" ? (
                                                                <>
                                                                  {item.user_paid ==
                                                                  false ? (
                                                                    <Checkbox
                                                                      onChange={() =>
                                                                        this.show_selected_checkbox(
                                                                          item
                                                                        )
                                                                      }
                                                                      value={
                                                                        item.selected
                                                                      }
                                                                    ></Checkbox>
                                                                  ) : (
                                                                    <>
                                                                      {item.user_paid ==
                                                                        true && (
                                                                        <img
                                                                          src="./paid.png"
                                                                          style={{
                                                                            maxWidth: 20,
                                                                          }}
                                                                        />
                                                                      )}
                                                                    </>
                                                                  )}
                                                                </>
                                                              ) : (
                                                                <>
                                                                  {this.state
                                                                    .check_membership_type ==
                                                                    "regular" &&
                                                                    item.regular_price !=
                                                                      "0" &&
                                                                    item.regular_price !=
                                                                      "" &&
                                                                    item.user_paid ==
                                                                      false && (
                                                                      <Checkbox
                                                                        onChange={() =>
                                                                          this.show_selected_checkbox(
                                                                            item
                                                                          )
                                                                        }
                                                                        value={
                                                                          item.selected
                                                                        }
                                                                      ></Checkbox>
                                                                    )}
                                                                </>
                                                              )}
                                                            </>
                                                          )}
                                                        </td> */}
                                                        <td
                                                          style={{ width: 40 }}
                                                        >
                                                          {index + 1}
                                                        </td>
                                                        <td
                                                          style={{ width: 140 }}
                                                        >
                                                          {item.docname}
                                                        </td>
                                                        <td
                                                          style={{ width: 40 }}
                                                        >
                                                          {item.paid == "Paid"
                                                            ? this.state
                                                                .check_membership_type ==
                                                              "premium"
                                                              ? item.premium_price ==
                                                                "0"
                                                                ? "Free"
                                                                : "₹" +
                                                                  item.premium_price
                                                              : item.regular_price ==
                                                                "0"
                                                              ? "Free"
                                                              : "₹" +
                                                                item.regular_price
                                                            : "Free"}
                                                        </td>
                                                        <td
                                                          style={{ width: 50 }}
                                                        >
                                                          {this.state
                                                            .investor_id && (
                                                            <center>
                                                              {(item.user_paid ==
                                                                true ||
                                                                item.paid ==
                                                                  "Free") && (
                                                                <a
                                                                  href={
                                                                    documentlink
                                                                  }
                                                                  target="_blank"
                                                                  style={{
                                                                    width: 80,
                                                                  }}
                                                                >
                                                                  <img
                                                                    src="./download.ico"
                                                                    style={{
                                                                      maxWidth: 50,
                                                                    }}
                                                                  />
                                                                </a>
                                                              )}
                                                              {item.paid ==
                                                                "Paid" &&
                                                                this.state
                                                                  .check_membership_type ==
                                                                  "premium" &&
                                                                (item.premium_price ==
                                                                "0" ? (
                                                                  <a
                                                                    href={
                                                                      documentlink
                                                                    }
                                                                    target="_blank"
                                                                    style={{
                                                                      width: 80,
                                                                    }}
                                                                  >
                                                                    <img
                                                                      src="./download.ico"
                                                                      style={{
                                                                        maxWidth: 50,
                                                                      }}
                                                                    />
                                                                  </a>
                                                                ) : (
                                                                  ""
                                                                ))}
                                                            </center>
                                                          )}
                                                        </td>
                                                      </tr>
                                                    );
                                                  }
                                                )}
                                            </table>
                                          </div>
                                        </>
                                        {this.state.button_status == false && (
                                          <button
                                            className="download-button"
                                            onClick={() => this.documentPay()}
                                          >
                                            Pay
                                          </button>
                                        )}
                                        {!this.state.investor_id && (
                                          <>
                                            <button
                                              className="download-button"
                                              style={{
                                                background: "rgb(41 23 111)",
                                              }}
                                              onClick={() =>
                                                window.location.assign("/login")
                                              }
                                            >
                                              Login to View
                                            </button>
                                            {/* <em
                                            style={{
                                              fontSize: 14,
                                              fontWeight: "700",
                                            }}
                                          >
                                            Become Growth91
                                            <sup style={{ fontSize: "0.6rem" }}>
                                              TM
                                            </sup>{" "}
                                            member to access the document{" "}
                                          </em> */}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-lg-2"></div>
                                  </div>

                                  <h1
                                    style={{
                                      paddingBottom: "-30px !important",
                                      marginTop: "30px",
                                    }}
                                  >
                                    Deal Terms
                                  </h1>
                                  <div
                                    className=""
                                    style={{ marginTop: "0px !important" }}
                                  >
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <div className="info">
                                            <span>End Date</span>
                                            <h4
                                              style={{
                                                textTransform: "Capitalize",
                                              }}
                                            >
                                              {this.state.deal_regular_end_date
                                                ? moment(
                                                    this.state
                                                      .deal_regular_end_date
                                                  ).format("MMM DD, YYYY")
                                                : ""}
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span> Min Investment</span>
                                            <h4>₹ 2.5 Lakh</h4>
                                          </div>
                                          <div className="info">
                                            <span>Valuation</span>
                                            <h4>
                                              Pre money valuation : ₹ 6.5 Crore
                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <h1
                                    style={{
                                      paddingBottom: "0px",
                                      marginTop: "20px",
                                    }}
                                  >
                                    Company Details
                                  </h1>
                                  <section
                                    className="deal-about-artment-section"
                                    style={{ marginTop: "50px" }}
                                  >
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <div className="info">
                                            <span>Legal Name</span>
                                            <h4>India Startup News</h4>
                                          </div>
                                          <div className="info">
                                            <span>Founded</span>
                                            <h4>27th July 2021</h4>
                                          </div>
                                          <div className="info">
                                            <span>Status</span>
                                            <h4>Private</h4>
                                          </div>
                                          <div className="info">
                                            <span>Employees</span>
                                            <h4>6</h4>
                                          </div>
                                          <div className="info">
                                            <span>Website</span>
                                            <h4>
                                              <a
                                                style={{
                                                  color: "rgb(7, 211, 252)",
                                                }}
                                                href="https://indianstartupnews.com"
                                                target="_blank"
                                              >
                                                https://indianstartupnews.com
                                              </a>
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span>Social Links</span>
                                            <div className="social-icons">
                                              <a href="https://www.facebook.com/indianstartupnews">
                                                <i className="bx bxl-facebook fs-19"></i>
                                              </a>
                                              <a href="https://www.linkedin.com/company/indianstartupnews">
                                                <i className="bx bxl-linkedin fs-19"></i>
                                              </a>
                                              <a href="https://www.instagram.com/indianstartupnews">
                                                <i className="bx bxl-instagram fs-19"></i>
                                              </a>
                                              {/* <a href="https://www.youtube.com/channel/UCGSO5fKYSUCBtiDpc2lSoLA">
                                              <i className="bx bxl-youtube fs-19"></i>
                                            </a> */}
                                            </div>
                                          </div>
                                          <div className="info">
                                            <span>Address</span>
                                            <h4>EWS - 613, Industrail Estate, Housing Board, Bhilai,Chhattisgarh 490026.</h4>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>

                            <div
                              className="container home-decor-section mt-0"
                              style={{ marginTop: "3px !important" }}
                            >
                              <h1
                                className="text-center"
                                style={{
                                  marginBottom: "20px",
                                  marginTop: "0px !important",
                                }}
                              >
                                Market Overview
                              </h1>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="single text-center">
                                    {/* <h2 style={{paddingBottom:"20px"}}>$1 Tn </h2> */}
                                    <p
                                      style={{
                                        color: "white",
                                        fontSize: "21px",
                                        padding: "2px",
                                        margin: "48px 0px",
                                      }}
                                    >
                                      The online publishing industry has witnessed transformative changes over the years. In the past, the digital revolution enabled the shift from print to online, leading to an explosion of content volume and accessibility.
                                    </p>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="single text-center">
                                    {/* <h2 style={{paddingBottom:"20px"}}>$200 Bn</h2> */}
                                    <p
                                      style={{
                                        color: "white",
                                        fontSize: "21px",
                                        padding: "2px",
                                        margin: "63px 0px",
                                      }}
                                    >
                                     The sector is currently being driven by technological breakthroughs, the emergence of social media, and the use of mobile internet, with an increased emphasis on data analytics, multimedia content, and personalisation.
                                    </p>
                                  </div>
                                </div>

                                <div className="col-lg-4">
                                  <div className="single text-center">
                                    {/* <h2 style={{paddingBottom:"20px"}}>$200 Bn</h2> */}
                                    <p
                                      style={{
                                        color: "white",
                                        fontSize: "21px",
                                        padding: "2px",
                                        margin: "51px 0px",
                                      }}
                                    >
                                      {" "}
                                      Looking to the future, the industry is expected to continue evolving with the integration of AI, ML, AR, and VR technologies. Indian Startup News is committed to navigating these changes to deliver high-quality, trustworthy content.
                                    </p>
                                  </div>
                                </div>

                                {/* <div className="col-lg-4">
                                <div className="single text-center">
                                  <h2 style={{paddingBottom:"20px"}}>21 </h2>
                                  
                                  <p style={myStyle}>
                                  fintech unicorns in 2022
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="single text-center">
                                  <h2 style={{paddingBottom:"20px"}}>5X </h2>
                                  <p style={myStyle}>
                                  growth in digital tech talent
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="single text-center">
                                  <h2 style={{paddingBottom:"20px"}}></h2>
                                  <p style={myStyle}>
                                  Regulators actively encouraging innovation
                                  </p>
                                </div>
                              </div> */}
                              </div>
                              <div className="text-center fs-4">
                                <span style={{ color: "#000" }}>Source: </span>
                                <span style={{ color: "rgb(127, 119, 118)" }}>
                                  Multiple publicly available research and
                                  survey reports
                                </span>
                              </div>
                              <p className=""> </p>
                              <div className="text-center fluid-container"></div>
                            </div>

                            <div
                              className=""
                              style={{
                                backgroundColor: "white",
                                marginTop: "1px !important",
                              }}
                            >
                              <h1
                                style={{
                                  fontSize: 32,
                                  marginBottom: 30,
                                  textAlign: "center",
                                  marginTop: "-10px !important",
                                }}
                              >
                                Investor Presentation
                              </h1>
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0001.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0002.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0003.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0004.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0005.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0006.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0007.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0008.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0009.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0010.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0011.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0012.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0013.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                              <img
                                src="./assets/images/deals-details/IndianStartupNews/pitch/PitchDeck_page-0014.jpg"
                                style={{
                                  width: "100%",
                                  marginBottom: "40px",
                                  maxWidth: "837px",
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: "0 auto 40px auto",
                                }}
                              />
                            </div>
                          </div>
                          {/* start */}

                          <div
                            className="deals-page"
                            style={{
                              marginTop: "50px !important",
                            }}
                          >
                            <div className="tab-wrapper">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <Tabs defaultActiveKey="1" centered>
                                      <TabPane tab="FAQ" key="1">
                                        <section
                                          className="faq-section"
                                          style={{
                                            margin: "0px",
                                            padding: "0px",
                                            background: "none",
                                          }}
                                        >
                                          <div className="">
                                            <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 m-auto">
                                                <h1 className="text-center mb-4">
                                                  About {this.state.deal_name}
                                                </h1>
                                                <Collapse
                                                  // defaultActiveKey={['1']}
                                                  onChange={this.callback1}
                                                  expandIconPosition="left"
                                                  accordion
                                                >
                                                  <Panel
                                                    header="What is the ISN's value proposition?"
                                                    key="1"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                        <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        1. ISN's value proposition lies in three essential elements. Firstly, their specialized coverage of the Indian startup ecosystem offers unparalleled insights and analysis. 
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        2. Secondly, their integrated service model, including NagadPaisa, goes beyond traditional news reporting to actively support startup growth. 
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        3. Lastly, their strong social presence and active community engagement create a trusted and connected environment for their users.
                                                      </p>
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="What is primary GTM strategy of ISN?"
                                                    key="2"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        1. Their primary GTM strategy is centered on a digital-first approach, with a strong emphasis on cultivating and engaging their audience through social media platforms like Instagram and LinkedIn.
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        2. Notably, these platforms have proven to be highly successful for them. ISN's goal is to deliver top-notch content that deeply resonates with their audience, encompassing essential insights, news, and trends within the Indian startup ecosystem. 
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        3. They intend to capitalize on SEO and SEM strategies to enhance their visibility and drive traffic towards their website. Furthermore, they remain committed to investing in data analytics to gain a better understanding of their audience's preferences, allowing them to customize their content accordingly.
                                                      </p>
                                                    </div>
                                                  </Panel>

                                                  <Panel
                                                    header="What are your moats?"
                                                    key="7"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        1. In the future, Indian Startup News has the potential to establish competitive advantages through various means.
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        2. They can leverage AI-powered personalization and data-driven insights strong community engagement, and strategic partnerships.
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        3. These initiatives would bolster the platform's capacity to deliver tailored content, provide valuable market intelligence, foster user loyalty, and gain privileged access to resources and information.
                                                      </p>
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="How's ISN is different from competition?"
                                                    key="4"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        1. Indian Startup News distinguishes itself from competitors by maintaining a concentrated focus on the Indian startup ecosystem, offering in-depth insights that are often overlooked by more general platforms.
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        2. They foster an environment of active community engagement, facilitating valuable connections and knowledge sharing among entrepreneurs and investors.
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#7f7776",
                                                        }}
                                                      >
                                                        3. Additionally, Indian Startup News extends its support beyond reporting on startups by actively facilitating their growth through the specialized service called NagadPaisa. They provide tailored funding solutions to the startups.
                                                      </p>
                                                    </div>
                                                  </Panel>
                                                </Collapse>
                                                <h1 className="text-center mb-2 mt-4">
                                                  Growth91 Investment FAQ
                                                </h1>
                                                <Collapse
                                                  // defaultActiveKey={['10']}
                                                  onChange={this.callback3}
                                                  expandIconPosition="left"
                                                  accordion
                                                >
                                                  <Panel
                                                    header="What is the due diligence process followed by Growth91"
                                                    key="11"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      At Growth91, we follow
                                                      stringent due-diligence
                                                      process. We ask for
                                                      detailed information about
                                                      start-up and their team.
                                                      After the scrutiny and if
                                                      deemed fit, start-up would
                                                      be listed on Growth91
                                                      platform. Independent
                                                      investment opinion and
                                                      due-diligence report
                                                      prepared by external
                                                      qualified experts are made
                                                      available for investors.
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="Do you offer any guarantee on returns?"
                                                    key="12"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      No, we do not guarantee
                                                      any returns. The startup
                                                      which is raising the money
                                                      is also not guaranteeing
                                                      any specific returns. In
                                                      principle, it is not
                                                      legally correct for the
                                                      company to provide any
                                                      guarantee about returns on
                                                      equity linked securities.
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="What is the refund process in case I don’t receive any allocation?"
                                                    key="13"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      If an investor doesn’t
                                                      receive the allocation,
                                                      the investment amount will
                                                      be refunded to the bank
                                                      account from which the
                                                      investment has been made.
                                                      As per Growth91 policy,
                                                      there will be no interest
                                                      or compensation on these
                                                      returned funds.
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="What is the exit mechanism available for the investors"
                                                    key="14"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      The Company and the
                                                      Promoters shall make all
                                                      reasonable endeavours to
                                                      provide exit to the
                                                      Investors by any of the
                                                      following ways: 1. Initial
                                                      Public Offer (IPO) 2.
                                                      Merger or Acquisition
                                                      Event 3. Buyout Event 3.
                                                      Compulsory Call Option
                                                      with minimum assured
                                                      returns. (Please refer to
                                                      investor agreement for
                                                      more details)
                                                    </div>
                                                  </Panel>

                                                  <Panel
                                                    header="In which account Investor’s money are transferred"
                                                    key="15"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      Money invested by the
                                                      investor in all public
                                                      deals are automatically
                                                      transferred to separate
                                                      and dedicated escrow
                                                      account created for
                                                      respective Startup. The
                                                      escrow account is managed
                                                      by authorized trustee.
                                                      After the funding/deal and
                                                      documentation formalities
                                                      are completed, the fund
                                                      will be transferred to
                                                      respective startup bank
                                                      account.
                                                    </div>
                                                  </Panel>

                                                  <Panel
                                                    header="I have more questions; how do I contact Growth91?"
                                                    key="16"
                                                    extra={genExtra()}
                                                  >
                                                    <div
                                                      style={{
                                                        color: "#7f7776",
                                                      }}
                                                    >
                                                      You can always send your
                                                      queries to{" "}
                                                      <a href="mailto:contact@growth91.com">
                                                        contact@growth91.com
                                                      </a>
                                                      , we will respond to your
                                                      queries in shortest
                                                      possible time.
                                                    </div>
                                                  </Panel>
                                                </Collapse>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                      </TabPane>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* stop */}
                        </TabPane>
                        <TabPane tab="Team" key="3">
                          <div
                            className="container meet-the-team-section"
                            style={{ maxWidth: 921 }}
                          >
                            <h2 className="text-center">Meet the Team</h2>
                            <div className="row">
                              <div className="col-lg-6">
                                <div
                                  className="single"
                                  style={{ paddingBottom: "0px !important" }}
                                  // style={{  marginBottom: 0px !important}}
                                >
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/IndianStartupNews/team/Deepak Chouhan.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Deepak Chauhan</h3>
                                      <span>Founder & CEO</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/deepak-chauhan-1a3541113/?originalSubdomain=in"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                        {/* <a href="mailto:vaibhav.tambe@transbnk.co.in">
                                        <i className="bx bxl-gmail"></i>
                                        </a> */}
                                      </div>
                                    </div>
                                  </div>
                                  <p>
                                    Deepak handles the overall Operation at ISN and Nagadpaisa.
                                  </p>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/IndianStartupNews/team/Pratiksha Sahu.jpeg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Pratiksha Sahu</h3>
                                      <span>CTO at Nagadpaisa</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/sciencaholic/"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <p>
                                  Pratiksha is leading the Nagadpaisa Tech, defining technology strategy, managing tech teams, overseeing system architecture and driving innovation to support business goals.
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/IndianStartupNews/team/Vishal Murmu.jpeg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Vishal Murmu</h3>
                                      <span>CPO at Nagadpaisa</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/vishal-murmu-91794a86/"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <p>
                                  Vishal helps in building Nagadpaisa, guiding product strategy, overseeing product development, understanding market trends
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/IndianStartupNews/team/ Vivek Viswakarma.jpeg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3> Vivek Viswakarma</h3>
                                      <span>Social Media Manager at ISN</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/vivek170/"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <p>
                                  Vivek manages all the Social Media Content for ISN
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPane>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <WebFooter />
          </div>
        ) : (
          window.location.assign("/Deals")
        )}
      </>
    );
  }
}

export default IndianStartupNews;
