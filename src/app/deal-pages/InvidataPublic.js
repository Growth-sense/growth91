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
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Apis from "../constants/Apis";
import moment from "moment";
import Bridge from "../constants/Bridge";
import InvestmentMembershipmodal from "../components/membership/InvestmentMembershipmodal";

const { Panel } = Collapse;
const { TabPane } = Tabs;

class InvidataPublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal_id: "",
      investor_id: "",
      deal_name: "",
      deal_description: "",
      isPrivate: false,
      isFunded: false,
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
      is_deal_visible: true,
    };
  }
  callback = (key) => {};
  componentDidMount() {
    let deal_id = "43";
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
    this.getwallethistory();
    this.get_deal_doucments(deal_id);
  }
  get_founder_details = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    Bridge.founder.get_founder_profile_details(params).then((result) => {
      if (result.status == "1") {
        if (result.data.length > 0) {
          let investor_id = localStorage.getItem("founder_id");
          // console.log('is investor',result.data[0].is_investor);
          // console.log('investor_id',result.data[0].investor_id);
          this.setState({ investor_id: investor_id });
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
    if (localStorage.getItem("investor_id")) {
      let params = {
        investor_id: localStorage.getItem("investor_id"),
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
      if (result.status == 1) {
        this.setState({
          deals: result.data,
          loading: false,
        });
        let current_date = moment();
        for (let d of result.data) {
          if (d.deal_id == this.state.deal_id) {
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
        }
        for (let d of result.data) {
          if (d.deal_id == this.state.deal_id) {
            if (d.show_status == "0") {
              this.setState({ is_deal_visible: false });
              // message.warning('You cannot invest in this deal.',2);
              // window.location.assign('/deals');
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
            ).toFixed(2);
            let deal_premium_start_date = moment(d.deal_start_dt_prem);
            let deal_regular_start_date = moment(d.deal_st_date);
            let deal_premium_end_date = moment(d.deal_end_dt_prem);
            let deal_regular_end_date = moment(d.deal_deal_end_date);
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
            } else if (this.state.check_membership_type == "regular") {
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
                isPrivate: d.deal_t_type == "Private" ? true : false,
                isFunded: d.deal_status == "Closed" ? true : false,
                tags: d.deal_category ? JSON.parse(d.deal_category) : [],
                logo: logourl,
                youtube_url: d.youtubelink,
                dealenddays: differece > 0 ? differece : 0,
                minamount: d.Min_inv_amt,
                maxamount: d.Max_inv_amt,
                amount: d.Min_inv_amt,
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
    } else {
      final = diff;
    }
    return final;
  };

  showalertmessage = () => {
    // message.warning('Please complete your KYC process or bank details to access this deal.');
  };

  showModal1 = () => {
    // if(this.state.kycstatus!='Approved'){
    //   message.warning('Dear Investor,You need to complete the KYC before you can invest in the deal.',10);
    //   setTimeout(()=>{
    //     window.location.assign('/investor-kyc');
    //   },2000);
    //   return;
    // }
    if (this.state.kycstatus == "admin_rejected") {
      message.warning(
        "Your KYC is Rejected, Please Contact to contact@Growth91.com"
      );
      return;
    }
    this.setState(
      {
        investmentmodal: true,
      },
      () => this.calculategst()
    );
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
    // if(Number(this.state.amount) < Number(this.state.minamount)){
    //   message.warning('Minimum investment amount is '+this.state.minamount);
    //   return;
    // }
    // if(Number(this.state.amount) > Number(this.state.maxamount)){
    //   message.warning('Maximum investment amount is '+this.state.maxamount,5);
    //   return;
    // }
    // if(this.state.agree != true) {
    //   message.warning('Please agree to terms and conditions');
    //   return;
    // }

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

    // this.setState({
    //   loading: true,
    // });
    // Bridge.deal.invest(params).then((result) => {
    //   if (result.status == 1) {
    //     message.success(result.message);
    //     this.setState({
    //       loading: false,
    //       investmentmodal:false,
    //       confirmmodalstatus:false,
    //       deductstatus:false,
    //       agreestatus:false,
    //       Investment_amt:0,
    //     });
    //     setTimeout(() => {
    //       window.location.reload();
    //     },4000);
    //   } else {
    //     message.error(result.message);
    //     this.setState({
    //       loading: false,
    //     });
    //   }
    // });
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
    // let processingfees = parseFloat((this.state.amount/100)*parseFloat(this.state.percentage));
    // let legalplusprocessing = parseFloat(legalfee)+parseFloat(processingfees);

    // gst and total amount with gst
    // let gst = parseFloat(();
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

    // parseFloat(gst) +
    this.setState({
      gst: gst,
      legalfee: legalfee.toFixed(0),
      amountplusgst: amt.toFixed(0),
      processingfees: legalfee.toFixed(0),
      totalamount:
        (amt + parseFloat(legalfee)).toFixed(0) -
        walletDeductionMoney +
        gstValue,
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
    window.location.assign(url);
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
  render() {
    const genExtra = () => (
      <PlusOutlined
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    );

    return (
      <>
        {this.state.is_deal_visible == true ? (
          <div style={{ display: this.state.show_data }}>
            <WebHeader />
            <section className="deals-details-page">
              <div className="container main-section">
                <div className="row">
                  <div className="col-lg-5">
                    <Spin spinning={this.state.loading}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          {/* Image is static */}
                          <img
                            src="./assets/images/deals-details/Invidata Logo.png"
                            alt=""
                            className="img-fluid"
                          />
                          <h5>Invidata Public</h5>
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
                            &nbsp;&nbsp;
                            <ExclamationCircleOutlined
                              style={{
                                marginTop: -2,
                              }}
                            />
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
                        Invidata Public is a Cyber Security company which has
                        developed its own INVISIBLE Characters Coding which can
                        be easily deciphered by Chrome Browser and reproduced
                        for the consumers but can’t be read or copied/ cloned by
                        scammers / hackers thus providing an Organization and
                        it’s Consumers a double layered protection.
                      </p>
                      <div className=" percentage-container">
                        <div className="percentage-values">
                          {this.state.coming_soon_days ? (
                            <>
                              <div>
                                <h3>{this.state.percentage_raised} %</h3>
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
                                <h3>{this.state.percentage_raised} %</h3>
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
                        <div className="button-group">
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
                                  <a href="#" className="black-button prime-bg">
                                    Deal is closed
                                  </a>
                                ) : this.state.isInvested == true &&
                                  this.state.user_type != "founder" ? (
                                  <a
                                    style={{
                                      padding: "11px 136px",
                                    }}
                                    href="#!"
                                    onClick={() => this.showModal1()}
                                    className="black-button prime-bg"
                                  >
                                    Add more
                                  </a>
                                ) : this.state.isPrivate == true &&
                                  this.state.user_type != "founder" ? (
                                  <a
                                    href="#"
                                    onClick={() => this.showModal1()}
                                    className="black-button prime-bg"
                                  >
                                    Express Your Interest
                                  </a>
                                ) : this.state.user_type == "founder" ? (
                                  <div>
                                    {this.state.user_type == "founder" &&
                                    this.state.founder_is_investor == "1" ? (
                                      <a
                                        href="#"
                                        className="black-button prime-bg"
                                        onClick={() => this.showModal1()}
                                      >
                                        Express Your Interest
                                      </a>
                                    ) : (
                                      <a
                                        href="/founder-as-investor"
                                        className="black-button prime-bg"
                                      >
                                        Apply as investor
                                      </a>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    {this.state.user_type == "investor" && (
                                      <a
                                        href="#"
                                        className="black-button prime-bg"
                                        onClick={() => this.showModal1()}
                                      >
                                        Express Your Interest
                                      </a>
                                    )}
                                  </div>
                                )}
                                {/* <button className='share-button'>
                                <i className='bx bxs-share'></i>
                              </button> */}
                              </div>
                            </>
                          ) : (
                            <div className="button-group">
                              <a
                                href="#"
                                className="black-button prime-bg"
                                style={{ cursor: "default" }}
                              >
                                Coming soon..
                              </a>
                              {/* <button className='share-button'>
                            <i className='bx bxs-share'></i>
                          </button> */}
                            </div>
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
                          className="form-input-field mt-4 "
                          placeholder="amount"
                          style={{
                            border:
                              this.state.amount_error_status == true &&
                              this.state.amount
                                ? "1px solid red"
                                : "1px solid transparent",
                          }}
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

                      <div class="form-group form-check">
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
                          Use Your ₹ {this.state.walletMoney} Growth91 Money{" "}
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
                            <td>
                              Investment Amount
                              {/* <br/><span>Includes GST - 18%</span> */}
                            </td>
                            <td lassName="text-center">
                              ₹ {this.state.amountplusgst}
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

                          {/* <tr>
                        <td>GST {this.state.gst} %</td>
                        <td lassName='text-center'>₹ {this.state.gstValue}</td>
                      </tr> */}
                          <tr>
                            <td>Total</td>
                            <td>
                              ₹ {parseFloat(this.state.totalamount).toFixed(0)}
                            </td>
                          </tr>
                          {/* {this.state.deduct && (
                        <tr>
                          <td>TDS Deducted</td>
                          <td lassName='text-center'>
                            {parseFloat(this.state.tdsdeductedamount).toFixed(2)}
                          </td>
                        </tr>
                      )} */}
                        </table>
                      </div>
                      <Alert
                        message="Note: The UPI transaction limit is Rs. 1 lakh per transaction,
                        as set by NPCI. The UPI transaction limit per day varies
                        from bank to bank."
                        type="info"
                      />
                      <div className="m-3">
                        <label className="container-check">
                          I Agree to the all terms of uses and have read all
                          Privacy Policy
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
                            className="login-button"
                            style={{
                              border: "1px solid #9a9a9a",
                              backgroundColor: "#9a9a9a",
                              cursor: "not-allowed",
                            }}
                          >
                            Express Your Interest
                          </button>
                        ) : (
                          <InvestmentMembershipmodal
                            processingfees={this.state.processingfees}
                            membership_type={this.state.check_membership_type}
                            invest={this.invest}
                            amount={this.state.amount}
                            minamount={this.state.minamount}
                            maxamount={this.state.maxamount}
                            agree={this.state.agree}
                            deal_id={this.state.deal_id}
                            error_status={this.state.amount_error_status}
                            investor_id={this.state.investor_id}
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
                  </div>
                </div>

                {/* <div className='container extra-info'
            style={{ maxWidth:1075 }}>
              <div className='row align-items-center'>
                <div className='col-lg-4'>
                    <h3>Artment's AMA</h3>
                    <p>
                      <strong>What Is An AMA?</strong><br/><br/>
                      AMA (Ask Me Anything) is a 45-60 minute online zoom session for investors to directly interact with the startup founders and ask any questions that they have regarding the startup or the campaign.
                    </p>
                </div>
                <div className='col-lg-3'>
                  <div className='middle'>
                    <span>Recorded On</span>
                    <p>
                      7:00 PM <br/>
                      26th Apr 2022
                    </p>
                  </div>
                </div>
                <div className='col-lg-5'>
                  <iframe 
                    width="100%" 
                    height="200" 
                    src="https://www.youtube.com/embed/tqgt5Arx4wM" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </div> */}

                <div className="container home-decor-section">
                  <h1 className="text-center">
                    Indian Software Industy - Market Overview
                  </h1>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="single text-center">
                        <h2>US$65B </h2>
                        <p>Indian Software Industy Size in 2022</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="single text-center">
                        <h2>12%</h2>
                        <p>IIP Annual Growth Rate 2022</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="single text-center">
                        <h2>72%</h2>
                        <p>Capacity Utilisation</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="single text-center">
                        <h2>81B</h2>
                        <p>Electronic Mfg Demand by 2026</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="single text-center">
                        <h2>17B</h2>
                        <p>IIOT Demand by 2026</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="single text-center">
                        <h2>400M</h2>
                        <p>Skilled people by 2026</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="mb-0 pr-2">
                      Source{" "}
                      <a href="https://www.ibef.org/industry/manufacturing-sector-india">
                        IBEF{" "}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="container highlight-section">
                  <h1>Highlights</h1>
                  <div className="row">
                    {/* <div className='col-lg-6'>
                    <div className='single text-center'>
                      <img src='./web/images/arlogo.jpg' />
                      <p>Industrial Automation – Need of the manufacturing 4.0</p>
                    </div>
                </div> */}
                    <div className="col-lg-6">
                      <div className="single text-center">
                        <img src="https://s27389.pcdn.co/wp-content/uploads/2021/04/creating-rolling-out-effective-cyber-security-strategy-1024x440.jpeg.optimal.jpeg" />
                        <p>
                          The Web as I envisaged it, we have not seen it yet{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single text-center">
                        <img src="https://s27389.pcdn.co/wp-content/uploads/2021/04/creating-rolling-out-effective-cyber-security-strategy-1024x440.jpeg.optimal.jpeg" />
                        <p>Internet is the future</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single text-center">
                        <img src="https://s27389.pcdn.co/wp-content/uploads/2021/04/creating-rolling-out-effective-cyber-security-strategy-1024x440.jpeg.optimal.jpeg" />
                        <p>Technology is best when it brings people together</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single text-center">
                        <img src="https://s27389.pcdn.co/wp-content/uploads/2021/04/creating-rolling-out-effective-cyber-security-strategy-1024x440.jpeg.optimal.jpeg" />
                        <p>Made In India mission</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pitch-div">
                <img
                  src="./assets/images/deals-details/Invidata/Slide1.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide2.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide3.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide4.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide5.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide6.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide7.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide8.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide9.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide10.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide11.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide12.jpg"
                  style={{ width: "100%" }}
                />
                <img
                  src="./assets/images/deals-details/Invidata/Slide13.jpg"
                  style={{ width: "100%" }}
                />
              </div>
            </section>

            <div className="pitch-div">
              <img
                src="./assets/images/deals-details/Invidata/Slide1.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide2.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide3.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide4.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide5.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide6.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide7.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide8.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide9.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide10.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide11.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide12.jpg"
                style={{ width: "100%" }}
              />
              <img
                src="./assets/images/deals-details/Invidata/Slide13.jpg"
                style={{ width: "100%" }}
              />
            </div>

            {this.state.hidePageInfo ? (
              <></>
            ) : (
              <div
                className="deals-page"
                style={{
                  marginTop: 171,
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
                              style={{ margin: "0px", padding: "0px" }}
                            >
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-10 m-auto">
                                    <h1 className="text-center">
                                      About {this.state.deal_name}
                                    </h1>
                                    <Collapse
                                      defaultActiveKey={["1"]}
                                      onChange={this.callback}
                                      expandIconPosition="left"
                                    >
                                      <Panel
                                        header="How Invidata provides security?"
                                        key="1"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          Invidata came with a breakthrough
                                          technology which encrypts your data
                                          into invisible file.
                                        </div>
                                      </Panel>
                                      <Panel
                                        header="How one can use the services provided by Invidata?"
                                        key="2"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          Invidata offers many subscription
                                          options. The subscription can be
                                          chosen based on the needs of the user.
                                        </div>
                                      </Panel>
                                      <Panel
                                        header="What is the encryption process like?"
                                        key="3"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          You may submit the data that you want
                                          to have encrypted. You will be able to
                                          download and share the encrypted file
                                          in only a few clicks.
                                        </div>
                                      </Panel>
                                      <Panel
                                        header="How to decrypt the files once encrypted?"
                                        key="4"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          Invidata's website provides both the
                                          encryption and decryption
                                          fucntionlity. One can use Invidata's
                                          website to decrypt the data as well.
                                        </div>
                                      </Panel>
                                      <Panel
                                        header="Is invidata available offline?"
                                        key="5"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          Yes, You can download Invidata's
                                          desktop application from Invidata's
                                          website.
                                        </div>
                                      </Panel>
                                    </Collapse>
                                    <h1 className="text-center">
                                      About Growth91
                                    </h1>
                                    <Collapse
                                      defaultActiveKey={["1"]}
                                      onChange={this.callback}
                                      expandIconPosition="left"
                                    >
                                      <Panel
                                        header="Do these startups undergo due diligence?"
                                        key="7"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          Startups are displayed to the
                                          investors only after due diligence has
                                          been conducted by us and an
                                          independent screening committee
                                          specially formed for the purpose of
                                          conducting due diligence of the same.
                                        </div>
                                      </Panel>
                                      <Panel
                                        header="What kind of documentation will I need to sign?"
                                        key="8"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          Each investor must sign the G-SAFE
                                          agreement and agree to a Risk
                                          Disclosure agreement.
                                        </div>
                                      </Panel>
                                      <Panel
                                        header="Do you offer any guarantee or returns?"
                                        key="9"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          No, we do not guarantee any returns.
                                        </div>
                                      </Panel>
                                      <Panel
                                        header="If I invest in a startup and they fail to reach their funding goal, will I be refunded?"
                                        key="10"
                                        extra={genExtra()}
                                      >
                                        <div>
                                          Yes, if a company fails to meet their
                                          funding goal all investments in that
                                          company will be cancelled and refunded
                                          within 15 working days to the bank
                                          account from which the investment has
                                          been made. Please note, there will be
                                          no interest or any other form of
                                          compensation paid on these returned
                                          funds.
                                        </div>
                                      </Panel>
                                    </Collapse>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </TabPane>
                          <TabPane tab="Detais" key="2">
                            <section className="deal-terms-section">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-10 m-auto">
                                    <h1>Documents</h1>
                                    <div className="row document-section">
                                      <div className="col-lg-6">
                                        <p className="mb-0 pb-0">
                                          Documents (All the documents and
                                          certificates of the startup)
                                          <br />
                                          <br />
                                          Founded 29-11-2021
                                        </p>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="download-section">
                                          <>
                                            <div>
                                              <table
                                                className="download-document-table"
                                                style={{ width: "100%" }}
                                              >
                                                <tr>
                                                  <th></th>
                                                  <th>Document</th>
                                                  <th>Type</th>
                                                  <th></th>
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
                                                          <td
                                                            style={{
                                                              width: 40,
                                                            }}
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
                                                                        "" && (
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
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: 140,
                                                            }}
                                                          >
                                                            {item.docname}
                                                          </td>
                                                          <td
                                                            style={{
                                                              width: 40,
                                                            }}
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
                                                            style={{
                                                              width: 50,
                                                            }}
                                                          >
                                                            {/* {item.paid=='Free' && (
                                                  <a href={documentlink} target="_blank" style={{width:80}}>
                                                     <img src='./download.ico' style={{maxWidth:50}} />
                                                  </a>
                                                )} */}
                                                            {item.user_paid ==
                                                              true && (
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
                                                          </td>
                                                        </tr>
                                                      );
                                                    }
                                                  )}
                                              </table>
                                            </div>
                                          </>
                                          {this.state.button_status ==
                                            false && (
                                            <button
                                              className="download-button"
                                              onClick={this.documentPay}
                                            >
                                              Pay
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <h1>Deal Terms</h1>
                                    <section className="deal-terms-section">
                                      <div className="container">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <div className="info">
                                              <span>End Date</span>
                                              <h4>30th oct, 2022</h4>
                                            </div>
                                            <div className="info">
                                              <span> Min Investment</span>
                                              <h4> 1,000rs</h4>
                                            </div>
                                            <div className="info">
                                              <span> Target</span>
                                              <h4>10,00,000</h4>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>

                                    <h1>Company Details</h1>
                                    <section className="deal-about-artment-section">
                                      <div className="container">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <div className="info">
                                              <span>Legal Name</span>
                                              <h4> Invidata Private Limited</h4>
                                            </div>
                                            <div className="info">
                                              <span>Founded</span>
                                              <h4>29 November, 2021</h4>
                                            </div>
                                            <div className="info">
                                              <span>Status</span>
                                              <h4>Private</h4>
                                            </div>
                                            <div className="info">
                                              <span>Employees</span>
                                              <h4>-</h4>
                                            </div>
                                            <div className="info">
                                              <span>Website</span>
                                              <h4>
                                                <a
                                                  style={{
                                                    color: "rgb(7, 211, 252)",
                                                  }}
                                                  href="https://Invidata.com/"
                                                  target="_blank"
                                                >
                                                  https://wws.invidata.tech/
                                                </a>
                                              </h4>
                                            </div>
                                            <div className="info">
                                              <span>Social Icons</span>
                                              <div className="social-icons">
                                                <a href="https://www.facebook.com/invidata">
                                                  <i className="bx bxl-facebook fs-19"></i>
                                                </a>
                                                <a href="https://www.linkedin.com/company/invidatatechnology/">
                                                  <i className="bx bxl-linkedin fs-19"></i>
                                                </a>
                                                <a href="https://twitter.com/invidatacompany">
                                                  <i className="bx bxl-twitter fs-19"></i>
                                                </a>
                                              </div>
                                            </div>
                                            <div className="info">
                                              <span>Headquarters</span>
                                              <h4>Maharashtra , India</h4>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </TabPane>
                          <TabPane tab="Teams" key="3">
                            <div
                              className="container meet-the-team-section"
                              style={{ maxWidth: 921 }}
                            >
                              <h2 className="text-center">Meet the Team</h2>
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="single">
                                    <div className="d-flex">
                                      <img
                                        src="./assets/images/deals-details/Team1.png"
                                        alt=""
                                      />
                                      <div className="intro">
                                        <h3>Dr. Dilip Rai</h3>
                                        <span>Technology Head</span>
                                        <div
                                          className="social-icons"
                                          style={{
                                            marginTop: 4,
                                            marginLeft: -6,
                                          }}
                                        >
                                          <a
                                            href="https://www.facebook.com/adityaagarwal21/https://www.facebook.com/adityaagarwal21/"
                                            target="_blank"
                                          >
                                            <i className="bx bxl-facebook"></i>
                                          </a>
                                          <a
                                            href="https://www.linkedin.com/in/thediliprai/?originalSubdomain=in"
                                            target="_blank"
                                          >
                                            <i className="bx bxl-linkedin"></i>
                                          </a>
                                          <a
                                            href="https://www.instagram.com/ad1tyaaaa/"
                                            target="_blank"
                                          >
                                            <i className="bx bxl-instagram"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <p>
                                      Inventor of Zero Variable Programming
                                      Concept in 2011. Ph.D in Psychology from
                                      Calcutta University
                                    </p>
                                  </div>
                                </div>

                                {/* <div className="col-lg-6">
                    <div className="single">
                      <div className="d-flex">
                        <img src="./assets/images/meet-the-team/2.webp" alt=""/>
                        <div className='intro'>
                          <h3>Aanchal Agarwal</h3>
                          <span>CEO</span>
                          <div className='social-icons'
                          style={{
                            marginTop: 4,
                            marginLeft: -6,
                          }}
                          >
                            <a href='https://www.linkedin.com/in/aanchal-agarwal-65991459/' target="_blank">
                              <i className='bx bxl-linkedin'></i>
                            </a>
                            <a href='https://instagram.com/aanchal5783?r=nametag'>
                              <i className='bx bxl-instagram' ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p>
                      CA finalist and CFA scholar. Specialisation in MIS, Audit, Budgeting, Working Capital Management, etc. <br/><br/>

                      Optimises and leads company’s operations, efficiency and finances.
                      </p>
                    </div>
                  </div> */}

                                <div className="col-lg-6">
                                  <div className="single">
                                    <div className="d-flex">
                                      <img
                                        src="./assets/images/deals-details/Team2.png"
                                        alt=""
                                      />
                                      <div className="intro">
                                        <h3>Mr. Ravi Saxena</h3>
                                        <span>Advisor</span>
                                        <div
                                          className="social-icons"
                                          style={{
                                            marginTop: 4,
                                            marginLeft: -6,
                                          }}
                                        >
                                          <a
                                            href="https://www.linkedin.com/in/ravi-saxena-23082435/"
                                            target="_blank"
                                          >
                                            <i className="bx bxl-linkedin"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <p>
                                      Founding Evangelist Iim Ahemdabad
                                      Management Consultant (Marketing
                                      Operations, Hr). Ex-Avery India, Eicher,
                                      Mahindra And Mahindra And Gei Hamon India
                                    </p>
                                  </div>
                                </div>

                                <div className="col-lg-6">
                                  <div className="single">
                                    <div className="d-flex">
                                      <img
                                        src="./assets/images/deals-details/Team3.png"
                                        alt=""
                                      />
                                      <div className="intro">
                                        <h3>Sanjay Sarda</h3>
                                        <span>Advisor</span>
                                        <div
                                          className="social-icons"
                                          style={{
                                            marginTop: 4,
                                            marginLeft: -6,
                                          }}
                                        >
                                          <a
                                            href="https://www.linkedin.com/in/sanjaysarda/"
                                            target="_blank"
                                          >
                                            <i className="bx bxl-linkedin"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <p>
                                      Business Management Consultant, M.Tech Iit
                                      Kharagpur, Certified Corporate Director
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
            )}

            <WebFooter />
          </div>
        ) : (
          window.location.assign("/Deals")
        )}
      </>
    );
  }
}

export default InvidataPublic;
