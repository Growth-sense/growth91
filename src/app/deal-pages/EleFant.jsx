import React, { Component } from "react";
import WebHeader from "../common/WebHeader";
import WebFooter from "../common/WebFooter";
import "./newboo.css";
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
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import Apis from "../constants/Apis";
import moment from "moment";
import Bridge from "../constants/Bridge";
import InvestmentMembershipmodal from "../components/membership/InvestmentMembershipmodal";

const { Panel } = Collapse;
const { TabPane } = Tabs;
class EleFant extends Component {
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
      commaAmount: 0,
      amount: 0,
      minamount: 0,
      captable_threshold_amount: 0,
      maxamount: 0,
      captable_multiple_amount: 0,
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
      images: [
        "./assets/images/deals-details/the EleFant/Pitch/1.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/2.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/3.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/4.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/5.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/6.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/7.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/8.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/9.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/10.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/11.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/12.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/13.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/14.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/15.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/16.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/17.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/18.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/19.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/20.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/21.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/22.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/23.jpg",
        "./assets/images/deals-details/the EleFant/Pitch/24.jpg",
      ],
      current: "",
    };
  }
  callback1 = (key) => { };
  callback2 = (key) => { };
  callback3 = (key) => { };

  componentWillMount() {
    document.title = "The EleFant - Growth91 - Startup Marketplace ";
  }
  componentDidMount() {
    let deal_id = "117";
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
                minamount: Number(d.Min_inv_amt),
                captable_threshold_amount: parseInt(
                  parseFloat(d.captable_threshold_amount).toFixed(2),
                  10
                ),
                maxamount: d.Max_inv_amt,
                captable_multiple_amount: parseInt(
                  parseFloat(d.captable_multiple_amount).toFixed(2),
                  10
                ),
                amount: "", //d.Min_inv_amt
                commaAmount: "", //d.Min_inv_amt
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
    } else if (
      Number(this.state.amount) <
      Number(this.state.captable_threshold_amount) &&
      Number(this.state.amount) % Number(this.state.multiples_of) != 0
    ) {
      const roundedLowerAmount =
        Math.floor(
          Number(this.state.amount) / Number(this.state.multiples_of)
        ) * Number(this.state.multiples_of);
      const roundedHigherAmount =
        Math.ceil(Number(this.state.amount) / Number(this.state.multiples_of)) *
        Number(this.state.multiples_of);

      error = `Please enter an amount in multiples of ${this.state.multiples_of}. You may choose Rs ${roundedLowerAmount}
      or Rs ${roundedHigherAmount}.`;
      // If you would like to enter the Captable, commit an amount of Rs. ${this.state.captable_threshold_amount} or more.`;

      this.setState({ amount_error: error, amount_error_status: true });
    } else if (
      Number(this.state.amount) >
      Number(this.state.captable_threshold_amount) &&
      Number(this.state.amount) % Number(this.state.captable_multiple_amount) !=
      0
    ) {
      const roundedLowerAmount =
        Math.floor(
          Number(this.state.amount) /
          Number(this.state.captable_multiple_amount)
        ) * Number(this.state.captable_multiple_amount);
      const roundedHigherAmount =
        Math.ceil(
          Number(this.state.amount) /
          Number(this.state.captable_multiple_amount)
        ) * Number(this.state.captable_multiple_amount);

      error = `Please enter an amount in multiples of ${this.state.captable_multiple_amount}. You may choose Rs ${roundedLowerAmount}
      or Rs ${roundedHigherAmount}.`;
      // If you would like to enter the Captable, commit an amount of Rs. ${this.state.captable_threshold_amount} or more.`;

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

  increase_commit = () => {
    const {
      amount,
      captable_threshold_amount,
      multiples_of,
      maxamount,
      captable_multiple_amount,
      minamount,
    } = this.state;

    let newAmount = Number(amount);
    let changeAmount;

    if (
      newAmount < captable_threshold_amount &&
      newAmount % multiples_of != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(multiples_of)) * Number(multiples_of);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (
      newAmount > captable_threshold_amount &&
      newAmount % captable_multiple_amount != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(captable_multiple_amount)) *
        Number(captable_multiple_amount);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (newAmount < Number(captable_threshold_amount)) {
      changeAmount = Number(multiples_of);
    } else {
      changeAmount = Number(captable_multiple_amount);
    }

    newAmount += changeAmount;

    if (newAmount > maxamount) {
      newAmount = maxamount;
    } else if (newAmount < minamount) {
      newAmount = Number(minamount);
    }

    this.setState(
      {
        amount: newAmount,
        commaAmount: this.formatNumberWithCommas(newAmount),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  decrease_commit = () => {
    const {
      amount,
      captable_threshold_amount,
      multiples_of,
      minamount,
      captable_multiple_amount,
    } = this.state;

    let newAmount = Number(amount);
    let changeAmount;

    if (
      newAmount == captable_threshold_amount &&
      newAmount % multiples_of != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(multiples_of)) * Number(multiples_of);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (
      newAmount < captable_threshold_amount &&
      newAmount % multiples_of != 0
    ) {
      const roundedLowerAmount =
        Math.floor(newAmount / Number(multiples_of)) * Number(multiples_of);
      newAmount = roundedLowerAmount;
      changeAmount = 0;
    } else if (
      newAmount > captable_threshold_amount &&
      newAmount % captable_multiple_amount != 0
    ) {
      const roundedLowerAmount =
        Math.floor(newAmount / Number(captable_multiple_amount)) *
        Number(captable_multiple_amount);
      newAmount = roundedLowerAmount;
      changeAmount = 0;
    } else if (newAmount <= Number(captable_threshold_amount)) {
      changeAmount = Number(multiples_of);
    } else {
      changeAmount = Number(captable_multiple_amount);
    }

    newAmount -= changeAmount;

    if (newAmount < minamount) {
      newAmount = minamount;
    }

    this.setState(
      {
        amount: newAmount,
        commaAmount: this.formatNumberWithCommas(newAmount),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  handleCommitAmount = (value) => {
    this.setState(
      {
        amount: value.replace(/,/g, ""),
        commaAmount: this.formatNumberWithCommas(value),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  formatNumberWithCommas = (number) => {
    return number.toLocaleString("en-IN");
  };

  getSliderSettings() {
    return {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  }

  handleClickImage = (image) => {
    this.setState({
      current: image,
    });
  };

  handleCloseModal = () => {
    this.setState({
      current: "",
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
          If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      /> */}
      </>
    );
    const settings = this.getSliderSettings();
    const { images, current } = this.state;

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
                            src="./assets/images/deals-details/the EleFant/logo.png"
                            alt=""
                            className="img-fluid"
                            style={{
                              marginRight: "20px",
                              width: "50%",
                              objectFit: "contain",
                            }}
                          />
                          <h5 className="ml-5 mt-4">The EleFant</h5>
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
                        India's first mobile app-based Toy Library - With the EleFant, customers get access to a vast selection of top-quality toys specially curated by child psychologists and game therapists through an affordable membership model. It's like having a library for toys, where you can play, return, and rotate toys whenever your little one is ready for something new. Discover, play, and return—it's as simple as that! Save 95% cost, 90% clutter and 100% environmentally sustainable solution!
                      </p>
                      <p style={{ textAlign: "justify" }}>
                        The EleFant app, available on both Android and iOS with a stellar rating of 4.8+, makes it easy to browse and order from our extensive collection. Currently serving families in over 14 cities, with over 9,000 downloads, 600+ active subscribers, and a network of 42+ dedicated Librarians, the EleFant is revolutionizing the way kids play and parents manage toy clutter. It clogged a revenue of Rs. 2.25 Cr. in just 5 months of operation.  Join The EleFant in creating a world where every child's playtime is filled with joy, learning, and endless possibilities!
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
                            Amount: <br />
                            Minimum investment Rs.{" "}
                            {this.formatNumberWithCommas(
                              this.state.minamount
                            )}{" "}
                            <br />
                            Cap Table entry is Rs.
                            {this.formatNumberWithCommas(
                              this.state.captable_threshold_amount
                            )}
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
                          value={this.state.commaAmount}
                          onChange={(e) => {
                            this.handleCommitAmount(e.target.value);
                          }}
                        />
                        <div className="d-flex justify-content-between mb-3">
                          <button
                            className="commit-plus"
                            onClick={this.decrease_commit}
                          >
                            -
                          </button>
                          <button
                            className="commit-minus"
                            onClick={this.increase_commit}
                          >
                            +
                          </button>
                        </div>
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
                  <div className="col-lg-7 deal-banner deals-video-banner">

                    <iframe style={{
                      boxShadow: "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                      borderRadius: 3,
                      // marginLeft: 65,
                    }}
                      width="100%"
                      height="335"
                      src="https://www.youtube.com/embed/cimjF2sWGoM?si=iJjUnU8ldiMCU6U2" title="The EleFant" frameborder="10" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>

                    </iframe>



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
                                  <div className="single text-center h-lg market-boxes">
                                    {/* <h2 style={{paddingBottom:"20px"}}>$1 Tn </h2> */}
                                    <p
                                      style={{
                                        color: "white",
                                        fontSize: "21px",
                                        padding: "2px",
                                        margin: "48px 0px",
                                        opacity:"1",
                                        lineHeight:'1.5'
                                      }}
                                    >
                                      India has the largest child population
                                      globally, with 275 million children in the
                                      age group of 0 to 12 years. The Indian
                                      National Education Policy 2020 emphasizes
                                      play-based and activity-based learning,
                                      recognizing the significance of play in
                                      enhancing children's learning outcomes. It
                                      proposes an integrated approach to formal
                                      education that includes play, discovery,
                                      and interactive learning.
                                    </p>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="single text-center h-lg market-boxes">
                                    {/* <h2 style={{paddingBottom:"20px"}}>$200 Bn</h2> */}
                                    <p
                                      style={{
                                        color: "white",
                                        fontSize: "21px",
                                        padding: "2px",
                                        margin: "48px 0px",
                                        opacity:"1",
                                        lineHeight:'1.5'
                                      }}
                                    >
                                      The Indian toy market is set to reach $3
                                      billion by 2028, driven by rising incomes
                                      and a focus on child development. Toy
                                      subscription services, expected to grow at
                                      a CAGR of 12.2% from 2023 to 2028, offer a
                                      convenient and eco-friendly solution,
                                      tapping into India's vast and expanding
                                      child population, which is over 17% of the
                                      global total by 2036. The increasing
                                      spending power of middle-class families
                                      contributes to the market's potential,
                                      with a growing openness to innovative
                                      child development solutions like toy
                                      subscriptions.
                                    </p>
                                  </div>
                                </div>

                                <div className="col-lg-4">
                                  <div className="single text-center h-lg market-boxes">
                                    {/* <h2 style={{paddingBottom:"20px"}}>$200 Bn</h2> */}
                                    <p
                                      style={{
                                        color: "white",
                                        fontSize: "21px",
                                        padding: "2px",
                                        margin: "48px 0px",
                                        opacity:"1",
                                        lineHeight:'1.5'
                                      }}
                                    >
                                      The evolution of the toy industry reflects
                                      a transition from traditional toys to
                                      modern, technology-driven offerings. In
                                      the past, simple toys focused on promoting
                                      imagination. Presently, STEM-based,
                                      Montessori and eco-friendly toys are
                                      prevalent, aligning with changing consumer
                                      preferences. Looking to the future,
                                      emerging technologies like virtual reality
                                      and artificial intelligence are expected
                                      to shape toys, providing immersive
                                      experiences. The industry anticipates a
                                      continued focus on learning, creativity,
                                      and social interaction in toys,
                                      emphasizing their crucial role in child
                                      development.
                                    </p>
                                  </div>
                                </div>
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
                    className="container highlight-section"
                    style={{
                      marginBottom: "-80px !important",
                      padding: "0px !important",
                    }}
                  >
                    <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>
                      Highlights
                    </h1>
                    <div className="row highlight-rows">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single elefanthighlight text-left"
                          style={{}}
                        >
                        <div className="hightlights-images">
                        <img src="./assets/images/deals-details/Petmojo/highlight01.jpg" />

                        </div>
                          <p style={{ padding: "1px !important" }}>
                            The EleFant's USP lies in its innovative
                            subscription-based toy library model, enabling users
                            to access a diverse range of toys without the burden
                            of ownership. This unique approach not only provides
                            variety but also promotes sustainability. The app
                            facilitates easy browsing, personalized
                            recommendations, and real-time tracking, The app's
                            success is further highlighted by 7000+ downloads in
                            4 month period, a consistent 4.8+ rating, and a
                            registered user base of 3500+, demonstrating its
                            strong market appeal and growth prospects.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single elefanthighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                          <img src="./assets/images/deals-details/highlight2.jfif" />
       
                          </div>
                          <p style={{ padding: "0px !important" }}>
                            The EleFant's commitment to quality and education is
                            reflected in its curated catalog, making it a go-to
                            platform for parents seeking sustainable and
                            enriching play experiences for their children.
                            The EleFant has established a robust presence with 42+
                            libraries across India, securing over 600+ committed
                            subscribers, and achieving sales exceeding 2.5
                            crores in the past five months.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single elefanthighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                          <img src="./assets/images/deals-details/highlight3.jpg" />
               
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                            The EleFant empowers women through its business model,
                            allowing them to become Toy Librarians. These women
                            entrepreneurs, including CAs, engineers, and
                            professionals, can set up and run toy libraries,
                            offering financial independence in just a few hours
                            a day.The EleFant provides continuous support and
                            training, fostering a community of empowered women
                            contributing to its success.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single elefanthighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                          <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" />
 
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                            The EleFant has strengthened its position through
                            strategic moves, including the acquisition of
                            India's top Toy Library, specializing in renting
                            toys, games, and books. Additionally, a strategic
                            partnership with Khilonewala's founders, Abhishek
                            Jain & Bharat Jain, adds valuable expertise to The
                            EleFant's ecosystem. With an impressive track record
                            of 120+ built libraries, 75 currently operational,
                            and over 11 years of experience, The EleFant has
                            established itself as a key player. Notably, the
                            delivery of 5 lakh toy kits underscores its
                            substantial reach and impact in the market.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single elefanthighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                          <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" />
                 
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                            The EleFant's toy library model brings cost savings,
                            convenience, and sustainability to customers by
                            offering high-quality toys at reduced costs,
                            app-based browsing with doorstep delivery, and
                            promoting toy reuse. Suppliers benefit from
                            increased reach, marketing exposure, financial
                            stability, customer feedback, and alignment with
                            sustainability goals. To create a competitive moat,
                            The EleFant focuses on high-quality curation, customer
                            experience, technology and innovation, brand
                            building, and strategic partnerships, ensuring a
                            comprehensive and unique value proposition in the
                            toy industry.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single elefanthighlight text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                          <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" />
              
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                            The EleFant employs a robust marketing strategy,
                            leveraging community leaders for referral marketing,
                            offering rewards programs, and utilizing digital
                            channels with targeted campaigns and influencer
                            collaborations. Hyperlocal initiatives include kiosk
                            stations and local event sponsorships, while
                            strategic partnerships target healthcare, education,
                            and corporate sectors. The inorganic growth plan
                            involves mergers and acquisitions with regional
                            players for rapid expansion. This comprehensive
                            approach aims to establish The EleFant as a prominent
                            brand through a blend of referral, digital,
                            hyperlocal, and strategic partnership efforts.
                          </p>
                        </div>
                      </div>
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
                    
                          <div className="deal-terms-section">
                           

                           
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
                              <Slider
                                {...settings}
                                className="mb-5 pitch-slider"
                              >
                                {images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    onClick={() => this.handleClickImage(image)}
                                  />
                                ))}
                              </Slider>
                              {current && (
                                <Lightbox
                                  mainSrc={current}
                                  onCloseRequest={this.handleCloseModal}
                                />
                              )}
                            </div>
        </div>
                        
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="deals-details-page"
              style={{ marginBottom: "-50px" }}>
            <div>
              <div>

                  {/* media */}

                  <div
                    className="container highlight-section"
                    style={{
                      marginBottom: "-80px !important",
                      padding: "0px !important",
                    }}
                  >
                    <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>
                      Media Coverage
                    </h1>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single medialink text-left d-flex flex-column  ">
                          <img src="./assets/images/deals-details/the EleFant/Articles/1.webp" />

                          <p style={{ padding: "1px !important" }}>
                            Mumbai CA dad starts a toy rental business rents affordable toys for kids
                            <a
                              href="https://www.thebetterindia.com/334684/mumbai-ca-dad-starts-a-toy-rental-business-rents-affordable-toys-for-kids/"
                              target="_blank"
                            >
                              {" "}
                              Readmore
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single medialink text-left d-flex flex-column  ">
                          <img src="./assets/images/deals-details/the EleFant/Articles/2.jpeg" />
                          <p style={{ padding: "1px !important" }}>
                            CA to entrepreneur sourabh jains of the elefant
                            <a
                              href="https://www.transcontinentaltimes.com/ca-to-entrepreneur-sourabh-jains-of-the-elefant/"
                              target="_blank"
                            >
                              {" "}
                              Readmore
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single medialink text-left d-flex flex-column  ">
                          <img src="./assets/images/deals-details/the EleFant/Articles/3.webp" />
                          <p style={{ padding: "1px !important" }}>
                            Father made the elephant toy library for daughter in
                            mumbai toy rental business rents affordable toys for
                            kids…
                            <a
                              href=" https://www.etvbharat.com/marathi/maharashtra/state/mumbai/father-made-the-elephant-toy-library-for-daughter-in-mumbai-toy-rental-business-rents-affordable-toys-for-kids/mh20231127214026314314737"
                              target="_blank"
                            >
                              {" "}
                              Readmore
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single medialink text-left d-flex flex-column  ">
                          <img src="./assets/images/deals-details/the EleFant/Articles/4.webp" />
                          <p style={{ padding: "1px !important" }}>
                            The elefant toys library in mumbai a father made
                            this library for daughter in malad and he selled
                            toys for kids in.
                            <a
                              href="https://www.etvbharat.com/telugu/telangana/bharat/the-elefant-toys-library-in-mumbai-a-father-made-this-library-for-daughter-in-malad-and-he-selled-toys-for-kids-in/na20231128222551359359573"
                              target="_blank"
                            >
                              {" "}
                              Readmore
                            </a>
                          </p>
                        </div>
                      </div>
                      {/* <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single medialink text-left d-flex flex-column  ">
                          <img src="./assets/images/deals-details/the EleFant/Articles/1.webp" />
                          <p style={{ padding: "1px !important" }}>
                            mumbai ca dad starts a toy rental business rents
                            affordable toys for kids
                            <a
                              href="https://www.thebetterindia.com/334684/mumbai-ca-dad-starts-a-toy-rental-business-rents-affordable-toys-for-kids/
                              "
                              target="_blank"
                            >
                              {" "}
                              Readmore
                            </a>
                          </p>
                        </div>
                      </div> */}
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single medialink text-left d-flex flex-column  ">
                          <img src="./assets/images/deals-details/the EleFant/Articles/6.webp" />
                          <p style={{ padding: "1px !important" }}>
                            Radio City Interview
                            <a
                              href="https://www.youtube.com/watch?v=5AR2YasvPHg"
                              target="_blank"
                            >
                              {" "}
                              Readmore
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single text-left">
                          <img src="./assets/images/deals-details/highlight4.png" />
                          <p style={{ paddingLeft: "0px !important" }}>
                          Unlike competitors who are suffering from cost control and burn rates IndusUno gathers rich and detailed industry data that can be leveraged exponentially with scale.
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
{/* Investor Presentation */}
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
                                            <h4>₹ 25000 for CCD</h4>
                                            <h4>₹ 307800 for CCPS</h4>
                                          </div>
                                          <div className="info">
                                            <span>Valuation</span>
                                            <h4>₹ 18 Cr</h4>
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
                                            <h4>
                                              Madshades Technologies Private Ltd
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span>Founded</span>
                                            <h4>2022-08-19</h4>
                                          </div>
                                          <div className="info">
                                            <span>Status</span>
                                            <h4>Private Limited Company</h4>
                                          </div>
                                          <div className="info">
                                            <span>Employees</span>
                                            <h4>35</h4>
                                          </div>
                                          <div className="info">
                                            <span>Website</span>
                                            <h4>
                                              <a
                                                style={{
                                                  color: "rgb(7, 211, 252)",
                                                }}
                                                href="https://www.theelefant.com"
                                                target="_blank"
                                              >
                                                www.theelefant.com
                                              </a>
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span>Social Links</span>
                                            <div className="social-icons">
                                              <a href="https://www.facebook.com/theelefantofficial">
                                                <i className="bx bxl-facebook fs-19"></i>
                                              </a>
                                              <a href="https://www.linkedin.com/company/the-elefant/?originalSubdomain=in">
                                                <i className="bx bxl-linkedin fs-19"></i>
                                              </a>
                                              <a href="https://www.instagram.com/theelefant_official">
                                                <i className="bx bxl-instagram fs-19"></i>
                                              </a>
                                              <a href="https://www.youtube.com/@theEleFant">
                                                <i className="bx bxl-youtube fs-19"></i>
                                              </a>
                                            </div>
                                          </div>
                                          <div className="info">
                                            <span>Address</span>
                                            <h4>
                                              705 Palm Spring Centre, New link
                                              Road, Malad West Mumbai 400064
                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>

                           

                           
                          </div>
                          {/* start */}

                        
                          <div
                            className="deals-page"
                            style={{
                              marginTop: "50px !important",
                            }}
                          >
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
                                                    console.log(
                                                      this.state.documents
                                                        .length
                                                    );
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
                                  </div>
                                  </div>
                                  </div>
                                  </div>
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
                                                    header="Are you focused on product or service?"
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
                                                       EleFant offers a service, specifically a subscription-based toy library model. It provides users with access to a curated selection of toys through a membership or subscription, allowing them to enjoy a variety of toys without the need for ownership. The service is facilitated through a mobile application, which plays a crucial role in managing subscriptions, selecting toys, and enhancing the overall user experience. The focus is on providing an economical, clutter-free, and environmentally friendly toy solution for children.
                                                      </p>
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="What are the challenges for scale up and how these will be managed?"
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
Scaling up EleFant poses challenges such as optimizing logistics for a growing subscriber base, efficient customer acquisition through targeted marketing, maintaining quality control and toy upkeep, expanding the librarian network, ensuring compliance with regulations, staying competitive in a dynamic market, and focusing on customer retention strategies. To tackle these challenges, EleFant needs to invest in robust logistics infrastructure, implement comprehensive marketing strategies, enforce stringent quality control measures, provide continuous librarian training and support, stay updated on regulatory requirements, foster innovation to stay competitive and build strong customer relationships through personalized services and continuous improvement based on customer feedback. Addressing these aspects strategically will be essential for EleFant's successful and sustainable scale-up in the toy subscription industry.                                                      </p>
                                                    
                                                    </div>
                                                  </Panel>

                                                  <Panel
                                                    header="Are you targeting new untapped market? Justify"
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
                                                       
                                                       EleFant has the potential to tap into a relatively untapped market by offering its unique subscription-based toy library model. The traditional toy market primarily involves one-time purchases, which may pose financial and storage challenges for parents. EleFant's subscription model addresses these concerns by providing an economical, clutter-free, and environmentally friendly toy solution. This approach caters to a segment of parents who may be looking for more sustainable and cost-effective alternatives. Moreover, the emphasis on curated, high-quality, and educational toys, coupled with a personalized user experience through the app, distinguishes EleFant in the market. By targeting this untapped market segment, EleFant positions itself as a convenient and innovative solution, potentially attracting a new customer base seeking more flexible and sustainable options for their children's play and learning experiences.                                                      </p>
                                                    </div>
                                                  </Panel>
                                                  <Panel
                                                    header="What are your moats?"
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
EleFant's competitive edge is built on a distinctive subscription-based toy library model, fostering recurring revenue and customer loyalty. This approach not only offers an economical and sustainable alternative to traditional toy ownership but also ensures a consistent relationship with customers. The curated catalog of high-quality, educational toys, coupled with personalized recommendations based on a child's age and interests, establishes a unique selling proposition. The user-friendly mobile application, with features like real-time tracking and push notifications, enhances convenience and sets EleFant apart in terms of technological accessibility. Furthermore, EleFant's commitment to environmental sustainability by reducing toy waste adds an eco-friendly dimension, aligning with the growing consumer trend towards socially responsible products. Collectively, these factors create a robust competitive moat for EleFant in the toy industry.                                                      </p>
                                                     
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
                            <div className="row elefantteam">
                              <div className="col-lg-6">
                                <div
                                  className="single"
                                  style={{ paddingBottom: "0px !important" }}
                                // style={{  marginBottom: 0px !important}}
                                >
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/the EleFant/team/sourabh.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>CA Sourabh Jain</h3>
                                      <span>Founder and CEO</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/sourabhjain-theelefant/"
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
                                  {/* <p>
                                  With over 20 years of experience building enterprises, Swapnil Jain leads ORAI Robotics as CEO, driving strategic direction, sales, marketing, and advocating for their innovative AI-powered platform
                                  </p> */}
                                  <ul>
                                    <li>
                                      <a>
                                        16 years of diverse and global
                                        experience across accountancy and
                                        internal Audit, delivering value-added
                                        solutions to clients and businesses
                                        across various sectors and markets.
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        {" "}
                                        Registered Independent Director, CA, and
                                        CS.
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        {" "}
                                        Bringing strategic leadership and
                                        financial acumen to The EleFant.
                                      </a>
                                    </li>
                                  </ul>
                                  {/* <p>
                                    16 years of diverse and global experience
                                    across accountancy and internal Audit,
                                    delivering value-added solutions to clients
                                    and businesses across various sectors and
                                    markets. Registered Independent Director,
                                    CA, and CS. bringing strategic leadership
                                    and financial acumen to EleFant.
                                  </p> */}
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/the EleFant/team/santhosh.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Santhosh Vemishetty</h3>
                                      <span>Head - Product & Tech</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/santhoshv44/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <p>
                                    Business Management, from Osmania University
                                    Financial
                                  </p> */}
                                  <ul>
                                    <li>
                                      <a>
                                        10+ years of experience, specializing in
                                        building innovative, data-driven
                                        products, Retail/F&B processes, and SaaS
                                        products, leading Omni Channel Retail
                                        transformation
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        Ex-Target, Aditya Birla, Chai Point,
                                        Flash Coffee
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        Contributing to The EleFant's product
                                        innovation.
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/the EleFant/team/nirupa.png"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Nirupa Vora</h3>
                                      <span>
                                        Head - Toy Curator & Librarian
                                        Engagement
                                      </span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/nirupa-vora-18b442291/"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <p>
                                    Business Management, from Osmania University
                                    Financial
                                  </p> */}
                                  <ul>
                                    <li style={{ listStyleType: "disc" }}>
                                      <a>
                                      With her background as a former Principal, she brings valuable experience to curate and engage with the toy library, ensuring a quality selection of toys and fostering positive interactions with librarians.
                                      </a>
                                    </li>
                                    {/* <li>
                                      <a>
                                        {" "}
                                        Registered Independent Director, CA, and
                                        CS.
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        {" "}
                                        Bringing strategic leadership and
                                        financial acumen to The EleFant.
                                      </a>
                                    </li> */}
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/the EleFant/team/ruchi-new.png"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>CA Ruchi Gour</h3>
                                      <span>
                                        Head -Finance & Investor Relations CA
                                      </span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/ruchi-gour-92109b30/"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <p>
                                    Business Management, from Osmania University
                                    Financial
                                  </p> */}
                                  <ul>
                                    <li>
                                      <a>
                                        14+ experience across finance domains of
                                        process audits, accounting
                                        controllership, business finance,
                                        funding, investments and acquisitions
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        Ex Amazon, Swiggy, Meesho, Dream 11, and
                                        ITC
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        Managing The EleFant's financial operations
                                        and investor relations.
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/IndusUno/team/Lalit Chitkara.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Lalit Chitkara</h3>
                                      <span>
                                        Head Operations and Supply Chain
                                      </span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/lalit-chitkara-7180637b/"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <p>
                                    MBA Supply Chain Ex Industry Buying ,
                                    <br />
                                    15+ Years of Leadership Experience
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/IndusUno/team/Ashish Jain.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Ashish Jain</h3>
                                      <span>Head Key Account Management</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/ashish-jain-189b1a9a/"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <p>
                                    B.Tech Electronics Ex Industry Buying ,
                                    <br />7 Years Experience
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/IndusUno/team/Kushal Gupta.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Kushal Gupta</h3>
                                      <span>
                                        Head Engineering and Technology
                                      </span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/logical-kushal-gupta/"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <p>
                                    M.Tech (Computer Science)
                                    <br />
                                    10+ Years Experience
                                  </p>
                                </div>
                              </div> */}
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

export default EleFant;
