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
class Tulua extends Component {
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
        "./assets/images/deals-details/Tulua new/Pitch/1.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/2.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/3.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/4.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/5.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/6.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/7.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/8.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/9.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/10.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/11.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/12.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/13.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/14.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/15.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/16.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/17.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/18.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/19.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/20.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/21.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/22.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/23.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/24.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/25.jpg",
        "./assets/images/deals-details/Tulua new/Pitch/26.jpg",
       
      ],
      current: "",
    };
  }
  callback1 = (key) => {};
  callback2 = (key) => {};
  callback3 = (key) => {};

  componentWillMount() {
    document.title = "Tulua - Growth91 - Startup Marketplace ";
  }
  componentDidMount() {
    let deal_id = "32";
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
            console.log(this.state.captable_threshold_amount);

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
                            src="./assets/images/deals-details/Tulua new/logo.png"
                            alt=""
                            className="img-fluid"
                            style={{
                              marginRight: "20px",
                              width: "50%",
                              objectFit: "contain",
                            }}
                          />
                          <h5 className="ml-5 mt-4">Tulua</h5>
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
                      Tulua Foods Pvt Ltd, established in 2020, specializes in providing high-quality, clean-label spice and masala products. With a mission to spotlight authentic Indian flavours, Tulua offers a diverse range of over 50 SKUs, including whole spices, powdered spices, and ready-to-cook (RTC) pastes. Their commitment to quality, transparency, and authenticity sets them apart in the market. Operating in both B2B and B2C segments, Tulua supplies branded spices to hospitality businesses and caters directly to individual consumers through various sales channels. Achieving rapid growth and significant milestones, Tulua has secured funding to support its expansion plans, including venturing into export markets and introducing new product lines. </p>
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
                    
                    <iframe
                      style={{
                        boxShadow: "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                        borderRadius: 3,
                        // marginLeft: 65,
                      }}
                      
                      width="100%"
                      height="335"
                      src="https://www.youtube.com/embed/RSPCgSoVGis"
                      title="RTC Range Product Application"
                      frameborder="10"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                    <iframe
                      style={{
                        boxShadow: "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                        borderRadius: 3,
                        // marginLeft: 65,
                      }}
                      width="100%"
                      height="335"
                      src="https://www.youtube.com/embed/3i4zXuWjLGs"
                      title="Spice Range Introduction Video"
                      frameborder="10"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                    
                  </div>
                  {/* Market Overview */}
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
                                     The Indian spice market is experiencing robust growth, with a projected CAGR of 11.29% during 2021-2027, reaching INR 142,569.3 Crores in 2021 and expected to reach INR 270,928.4 Crores by 2027. This growth is driven by India's status as the largest producer, consumer, and exporter of spices globally, alongside increasing demand fueled by changing consumer preferences.
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
                                     The total addressable market for spices in India was $42 billion in 2022, with an anticipated growth rate of 15.7% between 2021-2031. Similarly, the total addressable market for Ready-To-Cook (RTC) products in India was $460 million in 2022, forecasted to grow at a rate of 16.3% between 2021-2031, highlighting significant opportunities in both segments.
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
                                      The Ready to Cook market, valued at $18 billion, is witnessing rapid growth due to shifting consumer habits, increased health awareness, and the convenience of pre-packaged meal kits. This trend presents ample opportunities for smaller companies to enter the market and innovate with new product offerings, catering to the needs of busy individuals seeking healthy and convenient meal solutions.
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
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single  Ecoratings text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" />
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                          Tulua Foods Pvt Ltd has experienced exceptional revenue growth, with a 941% increase in the first three quarters, reaching Rs. 1.79 crore. Despite being a young startup, Tulua has shown financial stability, surpassing milestones from Rs. 8 lakhs in FY20-21 to Rs. 1.79 crore in FY23-24. Projections indicate further growth, aiming for Rs. 2.8 crore in FY23-24 and Rs. 10.9 crore in FY24-25, highlighting their confidence in future success.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single Ecoratings text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src="./assets/images/deals-details/Petmojo/highlight01.jpg" />
                          </div>
                          <p style={{ padding: "1px !important" }}>
                          Tulua operates in the spice and grocery sector, capitalizing on the growing demand for high-quality, clean-label spice and masala products in India. With a focus on authenticity and convenience, Tulua targets both domestic and international markets, leveraging an omnichannel approach catering to HoReCa, exports, and retail. This positions Tulua well to capture a significant share of the expanding market for branded spices and convenience foods.

                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single Ecoratings text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src="./assets/images/deals-details/highlight2.jfif" />
                          </div>
                          <p style={{ padding: "0px !important" }}>
                          Tulua's product packaging sets it apart from competitors, boasting premium designs that appeal to the millennial and GenZ demographic Despite the premium packaging, Tulua ensures affordability with competitive pricing across its product range. For instance, spice prices range from Rs 40 to Rs 115, while ready-to-cook pastes are priced at Rs 150 for 100g and Rs 225 for 200g. This combination of attractive packaging and reasonable pricing enhances Tulua's appeal to modern consumers seeking both quality and aesthetic appeal in their culinary products.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single Ecoratings text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src="./assets/images/deals-details/highlight3.jpg" />
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                          Tulua's consumer retail segment has experienced significant growth, with over 1,400 active customers and a notable 18% repeat rate without targeted retention marketing. Sales have surged by 400% compared to the previous quarter, showcasing strong demand and consumer satisfaction with Tulua's clean-label products, including ready-to-cook pastes and single-origin spices.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single Ecoratings text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" />
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                          Tulua's enterprise products consist of a wide selection of high-quality spices, including 15 single spice powders, 8 blended spice powders, and 22 whole spices. Sourced directly from farms and mandis, these products ensure superior taste and freshness, making them the preferred choice for hotels, restaurants, cafes, and airlines.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                        <div
                          className="single Ecoratings text-left"
                          style={{}}
                        >
                          <div className="hightlights-images">
                            <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" />
                          </div>
                          <p style={{ paddingLeft: "0px !important" }}>
                          Tulua prioritizes rigorous quality control measures and uses single-origin ingredients and chef-made recipes to ensure authentic Indian flavors in their products. Tulua's products are 100% natural with no added flavors or additives, appealing to health-conscious consumers. Additionally, the company operates as a plastic-neutral brand and sources locally to reduce environmental impact.  
                          </p>
                        </div>
                      </div>
                     
                    </div>
                  </div>

                  {/* media */}

                 
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
                           <img src="./assets/images/deals-details/Tulua new/Articles/1.png" />

                          <p style={{ padding: "1px !important" }}>
                          Tulua Simplifying Indian Cooking With Foray Into India Spice Market                            <a
                              href="https://yourstory.com/smbstory/from-a-ready-to-cook-brand-to-launching-spices-how-tulua-simplify-indian-cooking"
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
                           <img src="./assets/images/deals-details/Tulua new/Articles/2.jpg" />
                          <p style={{ padding: "1px !important" }}>
                          Tulua launches aromatic line of spices highlighting the true Indian flavour                       
                            <a
                              href="https://www.aninews.in/news/business/business/tulua-launches-aromatic-line-of-spices-highlighting-the-true-indian-flavour20230809163343/#google_vignette"
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
                           <img src="./assets/images/deals-details/Tulua new/Articles/2.jpg" />
                          <p style={{ padding: "1px !important" }}>
                          Tulua launches aromatic line of spices highlighting the true Indian flavour                            <a
                              href="https://www.business-standard.com/content/press-releases-ani/tulua-launches-aromatic-line-of-spices-highlighting-the-true-indian-flavour-123080900618_1.html"
                              target="_blank"
                            >

                              Readmore
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="single medialink text-left d-flex flex-column  ">
                           <img src="./assets/images/deals-details/Tulua new/Articles/4.jpg" />
                          <p style={{ padding: "1px !important" }}>
                           Raksha Bandhan 2023: What to buy for someone who cannot think beyond
                            <a
                              href="https://recipes.timesofindia.com/articles/trending/raksha-bandhan-2023-what-to-buy-for-someone-who-cannot-think-beyond-food/articleshow/103091174.cms"
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
                          <img src="./assets/images/deals-details/Tulua new/Articles/5.jpg" />
                          <p style={{ padding: "1px !important" }}>
                          Tulua Introduces Aromatic Line of Spices
                            <a
                              href="https://www.indianretailer.com/restaurant/news/tulua-introduces-aromatic-line-of-spices.n21176"
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
                           <img src="./assets/images/deals-details/Tulua new/Articles/6.jpg" />
                          <p style={{ padding: "1px !important" }}>
                          Tulua to work in tandem with chefs to create customised blended spices
                            <a
                              href="https://hospitality.economictimes.indiatimes.com/news/operations/food-and-beverages/tulua-to-work-in-tandem-with-chefs-to-create-customised-blended-spices/103919395"
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

                </div>
              </div>
            </section>
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
                           

                           
{/* Investor Presentation */}
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
                                            <h4>₹ 307800 for CCPS</h4>
                                          </div>
                                          <div className="info">
                                            <span>Valuation</span>
                                            <h4>₹ 36 Cr</h4>
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
                                            Tulua Foods Pvt Ltd
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span>Founded</span>
                                            <h4>14-01-2020</h4>
                                          </div>
                                          <div className="info">
                                            <span>Status</span>
                                            <h4>Private Limited Company</h4>
                                          </div>
                                          <div className="info">
                                            <span>Employees</span>
                                            <h4>12</h4>
                                          </div>
                                          <div className="info">
                                            <span>Website</span>
                                            <h4>
                                              <a
                                                style={{
                                                  color: "rgb(7, 211, 252)",
                                                }}
                                                href="https://www.tulua.shop"
                                                target="_blank"
                                              >
                                                www.tulua.shop
                                              </a>
                                            </h4>
                                          </div>
                                          <div className="info">
                                            <span>Social Links</span>
                                            <div className="social-icons">
                                              {/* <a href="https://www.facebook.com/theelefantofficial">
                                                <i className="bx bxl-facebook fs-19"></i>
                                              </a> */}
                                              {/* <a href="https://www.linkedin.com/company/ecoratings">
                                                <i className="bx bxl-linkedin fs-19"></i>
                                              </a> */}
                                               <a href="https://www.instagram.com/eattulua">
                                                <i className="bx bxl-instagram fs-19"></i>
                                              </a>
                                              {/*
                                              <a href="https://www.youtube.com/@theEleFant">
                                                <i className="bx bxl-youtube fs-19"></i>
                                              </a> */}
                                            </div>
                                          </div>
                                          <div className="info">
                                            <span>Address</span>
                                            <h4>
                                            407, Neo Corporate Plaza, Extd Ramchandra Lane, Kanchp                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>

                           
{/* Investor Presentation */}
                         
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
                                                       Tulua primarily offers products rather than services. It specializes in providing high-quality, clean label spice and masala products to consumers and businesses. These products include single-origin spices, blended spices, and ready-to-cook pastes, aimed at enhancing the flavor and convenience of Indian cuisine. While Tulua may offer some ancillary services such as customer support or distribution, its core focus is on developing and delivering top-quality spice products to the market</p>
                                                       
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
The challenges for scaling up Tulua's operations encompass recruiting and retaining efficient talent to manage increased production and distribution demands, along with efficiently managing inventory costs, particularly for fast-moving commodity products like spices. To address these challenges, Tulua can invest in recruitment efforts to attract experienced professionals and provide ongoing training and development programs for existing employees. Implementing advanced inventory management systems and adopting just-in-time inventory practices can optimize inventory levels and reduce carrying costs. By proactively addressing these challenges and implementing effective strategies, Tulua can navigate the complexities of scaling up its operations successfully.                                                      </p>
                                                    
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
                                                       
                                                       Yes, Tulua is targeting new untapped markets, and this approach is justified for several reasons. Firstly, the spice industry in India has historically been unbranded and commoditized, with limited options for high-quality, clean label products. By offering authentic Indian flavors with its range of single-origin spices, blended spices, and ready-to-cook pastes, Tulua taps into a previously underserved segment of consumers seeking premium-quality spice products. Secondly, Tulua's omni-channel approach allows it to target diverse market segments, including HoReCa, exports, and retail, expanding its reach beyond traditional distribution channels. This diversification mitigates risk and maximizes revenue potential by accessing new customer bases. Additionally, as consumer preferences shift towards healthier and more ethically sourced food options, Tulua's focus on clean label products positions it well to capitalize on this emerging market trend. Overall, by targeting new untapped markets, Tulua can seize growth opportunities, establish a competitive edge, and drive innovation in the spice industry.                                                      </p>
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
Tulua boasts several competitive moats that distinguish it in the market. Firstly, its unwavering commitment to quality and authenticity ensures that consumers receive superior products with genuine Indian flavors, thanks to rigorous quality control and single-origin ingredient sourcing. Secondly, Tulua's emphasis on clean label products aligns with the rising consumer demand for healthier food options, offering 100% natural products without any artificial additives. Moreover, Tulua's sustainability practices, including operating as a plastic-neutral brand and sourcing ingredients locally, appeal to environmentally conscious consumers. The company's innovative packaging design, tailored to resonate with millennial and GenZ consumers, further enhances its brand appeal and visibility. Finally, Tulua's chef-made recipes add a unique touch, providing customers with authentic and flavorful culinary experiences that set it apart from competitors.                                                      </p>
                                                     
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
                                      src="./assets/images/deals-details/Tulua new/Team/Richy.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Richy Dave</h3>
                                      <span>Founder and CEO</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAABSGvdwBYWYVSJpLCEhNTdp-49AwJ8YAWqk&keywords=richy%20dave&origin=RICH_QUERY_SUGGESTION&position=0&searchId=476c03f4-0e20-4f03-9fd4-4cdc61e88987&sid=Ydr&spellCorrectionEnabled=false"
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
                                      10+ years of experience in Marketing and Brand-building.
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        {" "}
                                        Ex-founder of Surge Digital, a boutique creative marketing agency.

                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                      looks after Marketing & Brand building, Supply chain.                                      </a>
                                    </li>
                                  </ul>
                                
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/Tulua new/Team/hitesh.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Hitesh Dave</h3>
                                      <span>Director of Sales</span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                        //   href="https://www.linkedin.com/in/aqeelahmed/"
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
                                      35+ yrs experience in sales & distribution in markets across India and China.

                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                      Formerly setup food service network for brands such as Sankalp.                                      </a>
                                    </li>
                                  
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="single">
                                  <div className="d-flex">
                                    <img
                                      src="./assets/images/deals-details/Tulua new/Team/arjunvaidya.jpg"
                                      alt=""
                                    />
                                    <div className="intro">
                                      <h3>Arjun Vaidya</h3>
                                      <span>
                                      D2C founder & Investor.

                                      </span>
                                      <div
                                        className="social-icons"
                                        style={{
                                          marginTop: 4,
                                          marginLeft: -6,
                                        }}
                                      >
                                        <a
                                          href="https://www.linkedin.com/in/arjunvaidya/"
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
                                      With vast experience in sales and marketing,

                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        {" "}
                                        She has a deep network and has closed strategic alliances worth US$ 200 million as part of Brand Capital, the strategic investment arm of Times Group.
                                      </a>
                                    </li>
                                    {/* 
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

export default Tulua;
