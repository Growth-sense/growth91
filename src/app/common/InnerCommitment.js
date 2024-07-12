import React, { Component } from "react";
import {
  Spin,
  Select,
  Alert,
  Typography,
  Layout,
  Modal,
  message,
  Popover,
  Tag,
  Input,
  Button,
  Dropdown,
  Menu,
  Checkbox,
} from "antd";
import { AlignType } from "rc-table/lib/interface";
import Bridge from "../constants/Bridge";
import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import Apis from "../constants/Apis";

// import { Collapse } from 'antd';
import { Collapse, Table } from "antd";

import { Link } from "react-router-dom";
import { textAlign } from "@mui/system";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import InvestmentMembershipmodal from "../components/membership/InvestmentMembershipmodal";
import EditInvestmentMembershipmodal from "../components/membership/EditInvestmentMembershipmodal.js";
const { Panel } = Collapse;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";
const { Option } = Select;
const { Paragraph } = Typography;

class InnerCommitment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      addModalStatus: false,
      modalstatus: false,
      title: "",
      description: "",
      filename: "",
      formloader: false,
      editModalStatus: false,
      edittitle: "",
      editdescription: "",
      editfilename: "",
      blogid: "",
      imagename: "",
      deleteModalStatus: false,
      ctype: "",
      editctype: "",
      youtubelink: "",
      investmentmodal: false,
      minamount: 0,

      // offline payment
      discounted_amount: 0,
      amount: 0,

      // modal
      show_payment_modal: false,
      show_kyc_modal: false,
      show_offline_payment_modal: false,
      expandedRows: [],
      // collapsedRows:[],

      // add input states
      startupname: "",
      dealstartdate: "",
      dealenddate: "",
      targetamount: "",
      mintargetamount: "",
      maxtargetamount: "",
      multipleofdescription: "",
      backedby: "",
      category: "",
      logo: "",
      banner: "",

      // update input states
      editstartupname: "",
      editdealstartdate: "",
      editdealenddate: "",
      edittargetamount: "",
      editmintargetamount: "",
      editmaxtargetamount: "",
      editmultipleofdescription: "",
      editbackedby: "",
      editcategory: "",
      editlogo: "",
      editbanner: "",
      edityoutubelink: "",

      deal_id: "",

      deallist: [],
      cdeallist: [],

      // edit states
      approvestatus: "",
      paymentStatus: "",
      dealstatus: "",
      getAllCommitData: [],
      cgetAllCommitData: [],
      updatemodalstatus: false,

      logourl: "",
      bannerurl: "",

      paymentlist: [],
      cpaymentlist: [],

      // add founder state list
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      nationality: "",
      dob: "",
      legal_name: "",
      father_name: "",
      address: "",
      bank_ac_no: "",
      ifsc_code: "",
      profile_image: "",

      founder_id: "",

      // edit founder state list
      edit_first_name: "",
      edit_last_name: "",
      edit_mobile: "",
      edit_email: "",
      edit_nationality: "",
      edit_dob: "",
      edit_legal_name: "",
      edit_father_name: "",
      edit_address: "",
      edit_bank_ac_no: "",
      edit_ifsc_code: "",
      edit_profile_image: "",
      id: "",

      escrowact: "",
      escrow_account_ifsc: "",
      escrow_account_name: "",
      escrow_account_bank: "",
      escrow_account_branch: "",
      processingfees: "",
      amount: "",
      totalamount: "",
      commitmentAmt: "",

      // offline payment modal data
      investor_payment_remarks: "",
      attach_file: "",
      utr_no_reference_id: "",
      investor_payment_type: "NEFT / IMPS / RTGS",
      // edit commitment states
      show_edit_commitment_modal: false,
      ac_edit_deal_id: "",
      ac_edit_investor_id: "",
      ac_edit_amount: 0,
      ac_edit_processingfees: 0,
      ac_edit_totalamount: 0,
      ac_edit_deduct: false,
      ac_edit_agree: false,
      ac_edit_order_token: "",
      ac_edit_tdsstatus: false,
      ac_edit_gst: 0,
      ac_edit_legalfee: 0,
      ac_edit_walletDeductionMoney: 0,
      ac_edit_interested_id: 0,
      parent_id: 0,
      ac_edit_escrowact: 0,
      ac_edit_escrow_account_ifsc: 0,

      ac_edit_commitment_id: 0,
      ac_minamount: 0,
      ac_captable_threshold_amount: 0,
      show_add_commitment_modal: false,
      ac_investor_name: "",
      ac_multiples_of: 0,
      ac_maxamount: 0,
      ac_captable_multiple_amount: 0,
      ac_amount: 0,
      ac_commaAmount: 0,
      ac_processingfees: 0.0,
      ac_checkDiscount: false,
      ac_checkWallet: false,
      ac_offer_discount: "",
      ac_walletMoney: 0,
      investor_idac_percentage: 0,
      ac_check_membership_type: "",
      ac_walletDeductionMoney: 0,
      ac_totalamount: 0.0,
      ac_gst: 0,
      captable_threshold_amount: 0,
      check_membership_type: "",
      edit_deal_name: "",
      checkWallet: false,

      walletMoney: 0,
    };
  }

  componentDidMount() {
    this.check_for_membership_type();

    this.getpaymentlist();
    // console.log('type',this.props.type);

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/display_investor_commitment`,
        {
          params: {
            investor_id: this.props.investor_id,
          },
        }
      )
      .then((getAllCommitData) => {
        this.setState({
          getAllCommitData: getAllCommitData.data.data,
          cgetAllCommitData: getAllCommitData.data.data,
          loading: false,
        });
      });
  }

  check_for_membership_type = () => {
    this.setState({ formloader: true });
    let params = {
      investor_id: this.props.investor_id,
    };
    Bridge.check_for_membership_type(params).then((result) => {
      if (result.status == 1) {
        if (result.data.length > 0) {
          this.setState({
            ac_check_membership_type: result.data[0].membership_type,
          });
        }
      } else {
        this.setState({ formloader: false });
      }
    });
    setTimeout(() => {
      this.getdealsettings();
    }, 500);
  };
  getdealsettings = () => {
    this.setState({ formloader: true });
    Bridge.admin.settings.getdealsettings().then((result) => {
      if (result.status == 1) {
        console.log("result", result.data);
        this.setState({
          ac_label: result.data[0].label,
        });
        if (this.state.ac_check_membership_type == "premium") {
          this.setState({
            ac_percentage: result.data[0].premium_member_deal_percentage,
          });
        } else {
          this.setState({
            ac_percentage: result.data[0].regular_member_deal_percentage,
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
  increase_commit = () => {
    const {
      ac_captable_threshold_amount,
      ac_maxamount,
      ac_captable_multiple_amount,
      ac_minamount,
      ac_edit_amount,
      ac_multiples_of,
    } = this.state;
    let newAmount = Number(ac_edit_amount);
    let changeAmount;
console.log(  ac_captable_threshold_amount,
  ac_maxamount,
  ac_captable_multiple_amount,
  ac_minamount,
  ac_edit_amount,
  ac_multiples_of,);
    if (
      newAmount < ac_captable_threshold_amount &&
      newAmount % ac_multiples_of != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(ac_multiples_of)) *
        Number(ac_multiples_of);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (
      newAmount > ac_captable_threshold_amount &&
      newAmount % ac_captable_multiple_amount != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(ac_captable_multiple_amount)) *
        Number(ac_captable_multiple_amount);
      newAmount = roundedHigherAmount;

      changeAmount = 0;
    } else if (newAmount < Number(ac_captable_threshold_amount)) {
      changeAmount = Number(ac_multiples_of);
    } else {
      changeAmount = Number(ac_captable_multiple_amount);
    }

    newAmount += changeAmount;

    if (newAmount > ac_maxamount) {
      newAmount = ac_maxamount;
    } else if (newAmount < ac_minamount) {
      newAmount = Number(ac_minamount);
    }
    this.setState(
      {
        amount: newAmount,
        ac_edit_amount: newAmount,
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  decrease_commit = () => {
    const {
      ac_captable_threshold_amount,
      ac_maxamount,
      ac_captable_multiple_amount,
      ac_minamount,
      ac_edit_amount,
      ac_multiples_of,
    } = this.state;

    let newAmount = Number(ac_edit_amount);
    let changeAmount;

    if (
      newAmount == ac_captable_threshold_amount &&
      newAmount % ac_multiples_of != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(ac_multiples_of)) *
        Number(ac_multiples_of);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (
      newAmount < ac_captable_threshold_amount &&
      newAmount % ac_multiples_of != 0
    ) {
      const roundedLowerAmount =
        Math.floor(newAmount / Number(ac_multiples_of)) *
        Number(ac_multiples_of);
      newAmount = roundedLowerAmount;
      changeAmount = 0;
    } else if (
      newAmount > ac_captable_threshold_amount &&
      newAmount % ac_captable_multiple_amount != 0
    ) {
      const roundedLowerAmount =
        Math.floor(newAmount / Number(ac_captable_multiple_amount)) *
        Number(ac_captable_multiple_amount);
      newAmount = roundedLowerAmount;
      changeAmount = 0;
    } else if (newAmount <= Number(ac_captable_threshold_amount)) {
      changeAmount = Number(ac_multiples_of);
    } else {
      changeAmount = Number(ac_captable_multiple_amount);
    }

    newAmount -= changeAmount;

    if (newAmount < ac_minamount) {
      newAmount = ac_minamount;
    }

    this.setState(
      {
        amount: newAmount,
        ac_edit_amount: newAmount,
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  onChangeCheckbox = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.checked;

    this.setState((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
      ac_agreeCheck: targetValue,
      ac_agree: targetValue,
    }));

    if (targetName === "deduct") {
      if (targetValue) {
        let processingfees = parseFloat(
          (this.state.ac_amount / 100) * parseFloat(this.state.ac_percentage)
        );
        let tdsamount = parseFloat(processingfees / 100) * 10;
        let minusamt = parseFloat(processingfees - tdsamount);

        this.setState({
          ac_processingfees: minusamt,
          ac_tdsdeductedamount: tdsamount,
        });
        console.log(
          " this.state.ac_amount,this.state.ac_percentage,tdsamount,minusamt,processingfees"
        );
      } else {
        console.log(
          " this.state.ac_amount,this.state.ac_percentage,tdsamount,minusamt,processingfees"
        );

        let processingfees = parseFloat(
          (this.state.ac_amount / 100) * parseFloat(this.state.ac_percentage)
        );
        console.log(
          this.state.ac_amount,
          this.state.ac_percentage,
          // tdsamount,
          // minusamt,
          processingfees
        );
        this.setState({
          ac_processingfees: processingfees,
          ac_tdsdeductedamount: 0,
        });
      }
    }
  };

  calculategst = () => {
    let legalfee = parseFloat(
      (this.state.ac_edit_amount / 100) * parseFloat(this.state.ac_percentage)
    );
    let gst = this.state.ac_edit_gst;
    let amt = parseFloat(this.state.ac_edit_amount);
    let walletDeductionMoney;
    if (this.state.checkWallet == false) {
      walletDeductionMoney = 0;
    } else {
      walletDeductionMoney =
        legalfee.toFixed(0) <= this.state.walletMoney
          ? legalfee.toFixed(0)
          : this.state.walletMoney;
    }
    console.log(this.state.ac_edit_amount, legalfee);
    let gstValue = ((legalfee.toFixed(0) - walletDeductionMoney) * gst) / 100;
    console.log(amt, legalfee, walletDeductionMoney, gstValue);
    this.setState({
      gst: gst,
      ac_edit_legalfee: this.state.ac_edit_amount ? legalfee.toFixed(0) : 0,
      amountplusgst: this.state.ac_edit_amount ? amt.toFixed(0) : 0,
      ac_edit_processingfees: this.state.ac_edit_amount
        ? legalfee.toFixed(0)
        : 0,
      ac_totalamount: this.state.ac_edit_amount
        ? (amt + parseFloat(legalfee)).toFixed(0) -
          walletDeductionMoney +
          gstValue
        : 0,
      walletDeductionMoney: walletDeductionMoney,
      gstValue: gstValue,
    });

    return gst;
  };

  formatNumberWithCommas = (number) => {
    return number.toLocaleString("en-IN");
  };
  // investing your money
  invest = () => {
    this.state.getAllCommitData?.map((item, index) => {
      if (item.id === this.state.id) {
        let deal_id = item.deal_id;
        let investor_id = item.investor_id;
        let amount = item.totalamount;
        let commitment_id = item.id;
        let deduct = item.deduct == true ? "1" : "0";
        let agree = item.agree == true ? "1" : "0";
        let order_token = item.order_token;
        let tdsstatus = item.tdsstatus == true ? "1" : "0";
        let processingfees = item.processingfees;
        let gst = item.gst;
        let legalfees = item.legalfee;
        let order_id = "order-01";
        let walletamt = item.walletDeductionMoney
          ? item.walletDeductionMoney
          : 0;
        let created_at = item.created_at;

        let url = `${process.env.REACT_APP_BASE_URL}cashfree/checkout.php?investor_id=${investor_id}&deal_id=${deal_id}&commitment_id=${commitment_id}&deduct=${deduct}&agree=${agree}&order_token=${order_token}&tdsstatus=${tdsstatus}&processingfees=${processingfees}&gst=${gst}&legalfees=${legalfees}&Investment_amt=${amount}&order_id=${order_id}&wallet=${walletamt}&created_at=${created_at}`;
        console.log("url", url);
        console.log(this.props.invest_amt);
        window.location.assign(url);
      }
    });
  };

  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  };

  // get post list
  getDeals = (record) => {
    // this.setState({ loading: true });
    Bridge.deal.list().then((result) => {
      console.log(result.data, "data");
      if (result.status == 1) {
        this.setState({
          deals: result.data,
          loading: false,
        });
        console.log(record);
      
        let current_date = moment();
        for (let d of result.data) {
          if (d.deal_id == record.actions[0].action.deal_id) {
            console.log(record.actions[0].action.deal_id, "sid");
            let deal_regular_show_date = moment(d.regular_show_date);
            let deal_premium_show_date = moment(d.premium_show_date);
            let deal_start_dt_rg = moment(d.deal_st_date);
            let deal_start_dt_prem = moment(d.deal_start_dt_prem);
            // if (this.state.check_membership_type == "premium") {
            //   if (
            //     moment(current_date).format("YYYY-MM-DD") ==
            //     moment(deal_premium_show_date).format("YYYY-MM-DD")
            //   ) {
            //     this.setState({ show_data: "block" });
            //   } else if (current_date > deal_premium_show_date) {
            //     this.setState({ show_data: "block" });
            //   } else {
            //     this.setState({ show_data: "none" });
            //     window.location.assign("/deals");
            //     return;
            //   }
            // } else if (this.state.check_membership_type == "regular") {
            //   if (
            //     moment(current_date).format("YYYY-MM-DD") ==
            //     moment(deal_regular_show_date).format("YYYY-MM-DD")
            //   ) {
            //     this.setState({ show_data: "block" });
            //   } else if (current_date > deal_regular_show_date) {
            //     this.setState({ show_data: "block" });
            //   } else {
            //     this.setState({ show_data: "none" });
            //     window.location.assign("/deals");
            //     return;
            //   }
            // }
          }
          // else{
          //   // window.location.href = ("/deals")
          //   // return;
          //   console.log(d.deal_id , this.state.deal_id);
          // }
        }
        for (let d of result.data) {
          if (d.deal_id == record.actions[0].action.deal_id) {
            let investor_id = this.state.investor_id;

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

            let differece = "";
            let dealEndDate = "";
            let currentDate = "";
            this.setState({ coming_soon_days: "" });

            console.log(
              this.formatNumberWithCommas(record.amount.substring(1))
            );
            console.log(d);
            this.setState(
              {
                commaAmount: this.formatNumberWithCommas(
                  record.amount.substring(1)
                ),
                amount: record.amount,
                maxamount: d.Max_inv_amt,
                minamount: d.Min_inv_amt,
                captable_threshold_amount: d.captable_threshold_amount,
                ac_edit_deal_id: d.deal_id,
                ac_minamount: d.Min_inv_amt,
                ac_maxamount: d.Max_inv_amt,
                ac_multiples_of: d.multiples_of,
                ac_offer_discount: d.offer_discount,

                deal_name: d.name,
                deal_description: d.Muliples_of,
                ac_captable_threshold_amount: d.captable_threshold_amount,
                ac_captable_multiple_amount: parseInt(
                  parseFloat(d.captable_multiple_amount).toFixed(2),
                  10
                ),

                // isBlank:d.deal_status == "Closed" ? window.location.href = "/" : "/",
                isPrivate: d.deal_t_type == "Private" ? true : false,
                isFunded: d.deal_status == "Closed" ? true : false,
                tags: d.deal_category ? JSON.parse(d.deal_category) : [],
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
                // commaAmount: "", //d.Min_inv_amt
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
        alert("sad");
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };
  // get post list
  getpaymentlist = () => {
    this.setState({ loading: true });
    Bridge.admin.transactions().then((result) => {
      if (result.status == 1) {
        let arr = [];
        if (this.props.type == "admin") {
          for (let item of result.data) {
            if (item.payment_type == "online payment") {
              arr.push(item);
            }
          }
        } else {
          for (let item of result.data) {
            if (item.investor_id == this.props.investor_id) {
              arr.push(item);
            }
          }
        }
        this.setState({
          paymentlist: arr,
          cpaymentlist: arr,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  // on change file
  onChangeEditFile = (e, type) => {
    if (type == "banner") {
      this.setState({
        editbanner: e.target.files[0],
      });
    } else {
      this.setState({
        editlogo: e.target.files[0],
      });
    }
  };
  handleCancel1 = () => {
    this.setState({
      show_edit_commitment_modal: false,
    });
  };
  // show edit modal
  showEditModal = (text, record) => {
    this.getDeals(record);

    console.log(record, "aaa");
    this.setState({
      edit_deal_name: record.deal_name,
      ac_edit_investor_id: record.actions[0].action.investor_id,
      ac_edit_amount: record.amount,
      ac_edit_processingfees: record.fee,
      ac_edit_totalamount: record.totalamount,
      ac_edit_deduct: record.actions[0].deduct,
      ac_edit_agree: record.agree,
      ac_edit_order_token: record.actions[0].order_token,
      ac_edit_tdsstatus: record.actions[0].tdsstatus,
      ac_edit_gst: record.actions[0].action.gst,
      ac_edit_legalfee: record.legalfee,
      ac_edit_walletDeductionMoney: record.actions[0].action.walletDeductionMoney,
      // ac_edit_interested_id: record.actions[0].action.id,
      parent_id: record.parent_id,
      ac_edit_interested_id: record.interested_id,
      show_edit_commitment_modal: true,
      ac_commaAmount: record.totalamount - record.fee,
      ac_processingfees: record.fee,
      ac_amountplusgst: record.amount,
      ac_totalamount: record.totalamount,
      ac_edit_escrowact: record.actions[0].escrowact,
      ac_edit_escrow_account_ifsc: record.actions[0].escrow_account_ifsc,
    });
    this.setState({
      show_edit_commitment_modal: true,
    });

    this.setState({
      edit_first_name: text.first_name,
      edit_last_name: text.last_name,
      edit_mobile: text.mobile,
      edit_email: text.email,
      edit_nationality: text.nationality,
      edit_dob: text.date_of_birth ? moment(text.date_of_birth) : "",
      edit_legal_name: text.legal_name,
      edit_father_name: text.fathers_name,
      edit_address: text.address,
      edit_bank_ac_no: text.bank_ac_no,
      edit_ifsc_code: text.ifsc_code,
      editModalStatus: true,
      founder_id: text.investor_id,
    });
  };
  handleCommitAmount = (value) => {
    this.setState(
      {
        amount: value.replace(/,/g, ""),
        ac_edit_amount: this.formatNumberWithCommas(value),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
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
  showupdatemodal = (item) => {
    this.setState({
      deal_id: item.deal_id,
      approvestatus: item.user_status,
      dealstatus: item.deal_status,
      updatemodalstatus: true,
    });
  };

  // update post
  updatedeal = () => {
    if (this.state.edit_first_name == "") {
      message.warning("First name is required");
      return false;
    } else if (this.state.edit_last_name == "") {
      message.warning("Last name is required");
      return false;
    } else if (this.state.edit_email == "") {
      message.warning("Email is required.");
      return false;
    } else if (this.state.edit_mobile == "") {
      message.warning("Contact no is required.");
      return false;
    } else if (this.state.edit_nationality == "") {
      message.warning("Please select the nationality option.");
      return false;
    } else if (this.state.edit_dob == "") {
      message.warning("Date of birth is required.");
      return false;
    } else if (this.state.edit_legal_name == "") {
      message.warning("Legal name is required.");
      return false;
    } else if (this.state.edit_father_name == "") {
      message.warning("Father name is required.");
      return false;
    } else if (this.state.edit_address == "") {
      message.warning("Address is required.");
      return false;
    } else if (this.state.edit_bank_ac_no == "") {
      message.warning("Bank account no is required.");
      return false;
    } else if (this.state.edit_ifsc_code == "") {
      message.warning("IFSC code is required.");
      return false;
    }

    this.setState({ formloader: true });

    let params = {
      first_name: this.state.edit_first_name,
      last_name: this.state.edit_last_name,
      mobile: this.state.edit_mobile,
      email: this.state.edit_email,
      nationality: this.state.edit_nationality,
      dob: this.state.edit_dob,
      legal_name: this.state.edit_legal_name,
      father_name: this.state.edit_father_name,
      address: this.state.edit_address,
      bank_ac_no: this.state.edit_bank_ac_no,
      ifsc_code: this.state.edit_ifsc_code,
      founder_id: this.state.founder_id,
    };

    Bridge.founders.edit(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            editModalStatus: false,
            edit_first_name: "",
            edit_last_name: "",
            edit_mobile: "",
            edit_email: "",
            edit_nationality: "",
            edit_dob: "",
            edit_legal_name: "",
            edit_father_name: "",
            edit_address: "",
            edit_bank_ac_no: "",
            edit_ifsc_code: "",
            founder_id: "",
          },
          () => this.getpaymentlist()
        );
        // if(this.state.editlogo || this.state.editbanner) {
        //   this.updateimg(this.state.deal_id, 'edit');
        // }
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  showDeleteModal = (item) => {
    this.setState({
      deleteModalStatus: true,
      deal_id: item.deal_id,
    });
  };

  deletedeal = () => {
    if (this.state.deal_id == "") {
      message.warning("Please select the deal first.");
      return false;
    }

    this.setState({ formloader: true });
    let formData = new FormData(); //formdata object
    formData.append("id", this.state.deal_id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.deal.delete(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            deleteModalStatus: false,
            deal_id: "",
          },
          () => this.getpaymentlist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  // on change select
  handleChangeSelect = (value) => {
    this.setState({ ctype: value });
  };

  // actuall functionality

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      for (let item of this.state.cgetAllCommitData) {
        if (
          (item.deal_name &&
            item.deal_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.amount && item.amount.includes(text)) ||
          (item.processingfees && item.processingfees.includes(text))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        getAllCommitData: arr,
        loading: false,
      });
    } else {
      this.setState({
        getAllCommitData: this.state.cgetAllCommitData,
        loading: false,
      });
    }
  };

  onChangeStartDate = (date, dateString) => {
    this.setState({
      dealstartdate: date,
    });
  };

  onChangeEndDate = (date, dateString) => {
    this.setState({
      dealenddate: date,
    });
  };

  onChangeStartDateEdit = (date, dateString) => {
    this.setState({
      editdealstartdate: date,
    });
  };

  onChangeDOB = (date, dateString) => {
    this.setState({
      dob: date,
    });
  };

  onChangeDOBedit = (date, dateString) => {
    this.setState({
      edit_dob: date,
    });
  };

  handleChangeSelected = (value) => {
    // console.log('value', value);
    this.setState({ category: value });
  };
  handleChangeSelectededit = (value) => {
    // console.log('value', value);
    this.setState({ editcategory: value });
  };

  // on change file
  onChangeFile = (e) => {
    this.setState({
      profile_image: e.target.files[0],
    });
  };

  // add new deal
  addfounder = () => {
    if (this.state.first_name == "") {
      message.warning("First name is required");
      return false;
    } else if (this.state.last_name == "") {
      message.warning("Last name is required");
      return false;
    } else if (this.state.email == "") {
      message.warning("Email is required.");
      return false;
    } else if (this.state.mobile == "") {
      message.warning("Contact no is required.");
      return false;
    } else if (this.state.nationality == "") {
      message.warning("Please select the nationality option.");
      return false;
    } else if (this.state.dob == "") {
      message.warning("Date of birth is required.");
      return false;
    } else if (this.state.legal_name == "") {
      message.warning("Legal name is required.");
      return false;
    } else if (this.state.father_name == "") {
      message.warning("Father name is required.");
      return false;
    } else if (this.state.address == "") {
      message.warning("Address is required.");
      return false;
    } else if (this.state.bank_ac_no == "") {
      message.warning("Bank account no is required.");
      return false;
    } else if (this.state.ifsc_code == "") {
      message.warning("IFSC code is required.");
      return false;
    } else if (this.state.profile_image == "") {
      message.warning("Please select the image first");
      return false;
    }

    this.setState({ formloader: true });

    let params = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      mobile: this.state.mobile,
      email: this.state.email,
      nationality: this.state.nationality,
      dob: this.state.dob,
      legal_name: this.state.legal_name,
      father_name: this.state.father_name,
      address: this.state.address,
      bank_ac_no: this.state.bank_ac_no,
      ifsc_code: this.state.ifsc_code,
    };

    Bridge.founders.add(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          formloader: false,
          addModalStatus: false,
          first_name: "",
          last_name: "",
          mobile: "",
          email: "",
          nationality: "",
          dob: "",
          legal_name: "",
          father_name: "",
          address: "",
          bank_ac_no: "",
          ifsc_code: "",
        });
        // ,() =>this.updateimg(result.data, 'add')
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };
  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.paymentlist) {
      let obj = {
        "Sr No": count,
        "Payment Id": item.paymentid,
        "Investor Name": item.first_name + item.last_name,
        "Deal Name": item.name,
        "Payment Status": item.payment_status,
        "Payment Order Id": item.payment_ref,
        "Payment Date": item.payment_date,
        Investment: item.payment_amount,
        "Convenience Fees": item.processing_fees,
        "Wallet Amount": item.wallet,
        "Payable Amount": item.total_paid_amount,
        "Payment Type": item.payment_type,
        "Payment Description": item.description,
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Founders data exported successfully.");
  };
  updateimg = (id, type) => {
    let formdata = new FormData();
    if (type == "add") {
      formdata.append("banner", this.state.banner);
      formdata.append("logo", this.state.logo);
    } else {
      formdata.append("banner", this.state.editbanner);
      formdata.append("logo", this.state.editlogo);
    }

    formdata.append("deal_id", id);

    // console.log('formdata',formdata);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.deal.uploaddealimg(formdata, config).then((result) => {
      if (result.status == 1) {
        this.setState({}, () => this.getpaymentlist());
      } else {
      }
    });
  };

  updatestatus = () => {
    let params = {
      dealstatus: this.state.dealstatus,
      approvestatus: this.state.approvestatus,
      id: this.state.deal_id,
    };
    this.setState({ formloader: true });
    Bridge.deal.updatestatus(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            dealstatus: "",
            approvestatus: "",
            updatemodalstatus: false,
          },
          () => this.getpaymentlist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  handleChangeSelect = (e) => {
    this.setState({
      nationality: e.target.value,
    });
  };

  handleChangeSelectedit = (e) => {
    this.setState({
      edit_nationality: e.target.value,
    });
  };

  openPaymentModal = (pid) => {
    this.setState({
      show_payment_modal: true,
      id: pid,
    });
  };

  openKycModal = (pid) => {
    this.setState({
      show_kyc_modal: true,
      id: pid,
    });
  };
  closeKycModal = () => {
    this.setState({ show_kyc_modal: false });
  };
  closePaymentModal = () => {
    this.setState({ show_payment_modal: false });
  };

  cancelOffline = () => {
    this.setState({ show_offline_payment_modal: false });
  };

  show_offline_payment_modal = () => {
    this.setState({
      show_offline_payment_modal: true,
    });
    this.state.getAllCommitData?.map((item, index) => {
      if (item.id === this.state.id) {
        this.setState({
          escrowact: item.escrowact,
          escrow_account_ifsc: item.escrow_account_ifsc,
          escrow_account_name: item.escrow_account_name,
          escrow_account_bank: item.escrow_account_bank,
          escrow_account_branch: item.escrow_account_branch,
          processingfees: item.processingfees,
          amount: item.amount,
          totalamount: item.totalamount,
        });
      }
    });
  };

  //  for offline payment
  handleOfflinePayment = () => {
    if (
      this.state.investor_payment_type == "Select" ||
      this.state.investor_payment_type == ""
    ) {
      message.warning("Payment type is required");
      return false;
    } else if (this.state.utr_no_reference_id == "") {
      message.warning("Utr No./ Reference ID is required");
      return false;
    }

    this.state.getAllCommitData?.map((item, index) => {
      if (item.id === this.state.id) {
        let investor_id = item.investor_id;
        let deal_id = item.deal_id;
        let startup_id = item.startup_id;
        let commitment_id = item.id;

        this.setState({ formloader: true });
        const date = new Date();
        let formdata = new FormData();
        formdata.append("investor_id", investor_id);
        formdata.append("deal_id", deal_id);
        formdata.append("startup_id", startup_id);
        formdata.append("commitment_id", commitment_id);
        formdata.append(
          "investor_email",
          localStorage.getItem("investor_email")
        );
        formdata.append("investor_name", localStorage.getItem("investor_name"));
        formdata.append("payment_type", this.state.investor_payment_type);
        formdata.append("investment_amt", this.state.amount);
        formdata.append("reference_id", this.state.utr_no_reference_id);
        formdata.append("payment_dt", date);
        formdata.append("attach_copy", this.state.attach_file);
        formdata.append("remarks", this.state.investor_payment_remarks);
        formdata.append("processing_fees", this.state.processingfees);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        Bridge.deal
          .add_investor_offline_data(formdata, config)
          .then((result) => {
            if (result.status == "1") {
              message.success("Successfully added offline payment data");
              this.setState({
                show_offline_payment_modal: false,
                offline_deal_id: "",
                offline_startup_id: "",
                investor_email: "",
                investor_name: "",
                investor_payment_date: "",
                investor_investment_amount: "",
                investor_payment_remarks: "",
                investor_payment_type: "",
                attach_file: "",
                utr_no_reference_id: "",
                formloader: false,
                processing_fees: "",
                amount: "",
                membership_type: "",
                premium_percentage: "",
                regular_percentage: "",
              });
              window.location.reload();
            } else {
              message.error("failed to add offline payment data");
              this.setState({
                show_offline_payment_modal: false,
                formloader: false,
              });
            }
          });
      }
    });
  };
  handleOk = () => {
    this.setState({ modalstatus: false });
  };
  handleCancel = () => {
    this.setState({ modalstatus: false });
    this.invest();
  };
  upgrade = () => {
    let order_id = "order-01";
    let user_id = this.props.investor_id;
    let amount = this.state.discounted_amount;
    let membership_fees = this.state.discounted_amount;
    let registered_amt = this.state.amount;
    let deal_id = this.props.deal_id;
    let url = `${process.env.REACT_APP_BASE_URL}cashfree/membership/investment/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&membership_fees=${membership_fees}&registered_amt=${registered_amt}&deal_id=${deal_id}`;
    window.location.assign(url);
  };
  ac_commit_update = () => {
    if (this.state.ac_edit_amount == "") {
      message.warning("Amount is required");
      return false;
    } else if (this.state.ac_edit_processingfees == "") {
      message.warning("Fee is required");
      return false;
    }
    // return
    const formData = new FormData();
    formData.append("deal_id", this.state.ac_edit_deal_id);
    formData.append("investor_id", this.props.investor_id);
    formData.append("amount", this.state.ac_edit_amount);
    formData.append("processingfees", this.state.ac_processingfees);
    formData.append(
      "totalamount",
      +this.state.ac_edit_amount + +this.state.ac_edit_processingfees
    );
    formData.append("deduct", this.state.ac_edit_deduct);
    formData.append("agree", this.state.ac_edit_agree);
    formData.append("order_token", this.state.ac_edit_order_token);
    formData.append("tdsstatus", this.state.ac_edit_tdsstatus);
    formData.append("gst", this.state.ac_edit_gst);
    formData.append("legalfee", this.state.ac_edit_legalfee);
    formData.append(
      "walletDeductionMoney",
      this.state.ac_edit_walletDeductionMoney
    );
    formData.append("interested_id", this.state.ac_edit_interested_id);
    formData.append("commitment_id", this.state.ac_edit_commitment_id);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/Deal/edit_investor_commitment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState(
          {
            show_edit_commitment_modal: false,
          },
          () => {
            axios
              .get(
                `${process.env.REACT_APP_BASE_URL}api/admin/Deal/display_investor_commitment_list`,
                {
                  params: {
                    deal_id: this.state.ac_deal_id,
                  },
                }
              )
              .then((response) => {
                this.setState({
                  commitment_investor_list: response.data.data,
                  commitment_investor_listc: response.data.data,
                  loading: false,
                });
              })
              .catch((error) => {
                console.error(error);
              });
          }
        );
        message.success("Investor commitment Updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const dataSource =
      this.state.getAllCommitData &&
      this.state.getAllCommitData.map((item, index) => {
        console.log(item);

        const buttonstatus = () => {
          if (
            item.accept_payment == "yes" &&
            item.kycstatus == "Pending" &&
            item.deal_status == "Closed"
          ) {
            // dceal close parameter
            return (
              <Button type="primary" onClick={() => this.openKycModal(item.id)}>
                Payment
              </Button>
            );
          } else if (
            item.accept_payment == "yes" &&
            item.kycstatus == "admin_rejected" &&
            item.deal_status == "Closed"
          ) {
            return (
              <>
                <Popover
                  placement="leftBottom"
                  title="KYC is rejected.."
                  trigger="hover"
                >
                  <Button
                    type="text-dark bg-light"
                    disabled
                    style={{ color: "rgba(0, 0, 0, 0.85)" }}
                  >
                    Payment
                  </Button>
                </Popover>
              </>
            );
          } else if (
            item.accept_payment == "yes" &&
            item.kycstatus !== "Pending" &&
            item.kycstatus !== "admin_rejected" &&
            item.deal_status == "Closed" &&
            item.offline_payment_id !== null
          ) {
            return (
              <Popover
                placement="leftBottom"
                title="Payment under review"
                trigger="hover"
              >
                <Button
                  type="text-dark bg-light"
                  disabled
                  style={{ color: "rgba(0, 0, 0, 0.85)" }}
                >
                  Payment
                </Button>
              </Popover>
            );
          } else if (
            item.accept_payment == "yes" &&
            item.kycstatus !== "Pending" &&
            item.kycstatus !== "admin_rejected" &&
            item.deal_status == "Closed"
          ) {
            return (
              <Button
                type="primary"
                onClick={() => this.openPaymentModal(item.id)}
              >
                Payment
              </Button>
            );
          } else {
            return (
              <>
                <Popover
                  placement="leftBottom"
                  title="Payment link will be activated once deal is closed"
                  trigger="hover"
                >
                  <Button
                    disabled
                    type="text-dark bg-light"
                    style={{ color: "rgba(0, 0, 0, 0.85)" }}
                  >
                    Payment
                  </Button>
                </Popover>
              </>
            );
          }
        };

        return {
          key: index,
          child: item["0"],
          action: item,
          dealname: item.deal_name ? item.deal_name : "---",
          amount: "₹" + item.amount,
          fee: item.processingfees ? "₹" + item.processingfees : "₹0",
          dealview:
            item.deal_status == "Open" ? (
              <Link to={item.page_link}>
                {" "}
                <Button type="primary">View</Button>
              </Link>
            ) : (
              <Link to={null}>
                {" "}
                <Button disabled>View</Button>
              </Link>
            ),
          payment: buttonstatus(),
          page_link: item.page_link,
          name: item.first_name + " " + item.last_name,
          paymentstatus: item.paymentstatus,
          commitment_satus: item.commitment_satus,
          accept_payment: item.accept_payment,
          kycstatus: item.kycstatus,
          deal_status: item.deal_status,
          payment_type: item.payment_type ? item.payment_type : "---",
          // totalamount: item.total_paid_amount ? '₹' + item.total_paid_amount : "---",
          wallet: item.wallet ? "₹" + item.wallet : "₹0",
          // created_at: item.created_at,
          totalamount: item.totalamount,
          // status: item.commitment_satus=="committed" ? <Tag color="green">{item.commitment_satus}</Tag> : <Tag color="red">{item.commitment_satus}</Tag>
        };
      });

    const getNestData = (record) => {
      console.log(record);
      const nestColumns = [
        {
          // title: "Deal Name",
          // dataIndex: 'nestdealname',
          // key: 'nestdealname',
          width: 125,
        },
        {
          title: "Amount",
          dataIndex: "nestamount",
          key: "nestamount",
          width: 100,
          align: "right",
        },
        {
          title: "Fee",
          dataIndex: "nestfee",
          key: "nestfee",
          width: 100,
          align: "right",
        },
        {
          title: "Committed on",
          dataIndex: "nestcreated_at",
          key: "nestcreated_at",
          width: 210,
        },
        {
          title: "Action on",
          dataIndex: "actions",
          key: "actions",
          width: 210,
          render: (text, records) => {
            console.log(records);
            const menu = (
              <Menu
                mode="vertical"
                defaultSelectedKeys={[this.state.path]}
                style={{ width: 100 }}
              >
                <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                  <a
                    href="#"
                    onClick={() => this.showEditModal(text, records)}
                    style={{ fontSize: 14 }}
                  >
                    &nbsp;&nbsp;Edits
                  </a>
                </Menu.Item>
                {/* <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined/>}>
                  <a
                    href="#"
                    style={{ fontSize: 14 }}
                    onClick={() => this.showDeleteModal(record.key)}
                  >
                    &nbsp;&nbsp;Delete
                  </a>
                </Menu.Item> */}
              </Menu>
            );
            return (
              <div>
                <Dropdown overlay={menu} placement="bottom">
                  <a onClick={(e) => e.preventDefault()}>
                    <div className="menu-action">
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </div>
                  </a>
                </Dropdown>
              </div>
            );
          },
        },
      ];

      const nestDataSource = record.child.map((item, index) => {
       console.log(item);
      
        return {
          key: index,
          actions:[record].map((itemx,index)=>{return itemx}),
          // nestdealname: item.deal_name ? item.deal_name : '---',
          nestamount: "₹" + item.amount,
          nestfee: item.processingfees ? "₹" + item.processingfees : "₹0",
          // nestcreated_at: item.created_at,
          parent_id:item.parent_id,
          interested_id:item.id,
          commitment_id:item.id,
          deal_name:item.deal_name,
          amount:item.amount,
          fee:item.processingfees,
          totalamount:item.totalamount,
          nestcreated_at: item.created_at
            ? moment(item.created_at).format("D-MMM-YYYY h:mm A")
            : "",

        };
    });

      return (
        <Table
          className="table-2"
          dataSource={nestDataSource}
          columns={nestColumns}
          loading={this.state.loading}
          bordered
          pagination={false}
          // scroll={{ x: 'max-content' }}
        ></Table>
      );
    };

    const columns = [
      {
        title: "Deal Name",
        dataIndex: "dealname",
        key: "dealname",
        width: 100,
      },
      // {
      //   title: 'Total Commitment',
      //   dataIndex: 'totalamount',
      //   key: 'totalamount',
      //   width: 300,
      // },
      {
        title: "Total Amount",
        dataIndex: "amount",
        key: "amount",
        width: 100,
        align: "right",
      },
      {
        title: "Total Fees",
        dataIndex: "fee",
        key: "fee",
        width: 100,
        align: "right",
      },
      {
        title: "Deal View",
        dataIndex: "dealview",
        key: "dealview",
        width: 100,
      },
      {
        title: "Payment",
        dataIndex: "payment",
        key: "payment",
        width: 100,
      },

      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100,

        render: (text, record) => {
          const menu = (
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.state.path]}
              style={{ width: 100 }}
            >
              <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showEditModal(text, record)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
              {/* <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined/>}>
                <a
                  href="#"
                  style={{ fontSize: 14 }}
                  onClick={() => this.showDeleteModal(record.key)}
                >
                  &nbsp;&nbsp;Delete
                </a>
              </Menu.Item> */}
            </Menu>
          );
          return (
            <div>
              <Dropdown overlay={menu} placement="bottom">
                <a onClick={(e) => e.preventDefault()}>
                  <div className="menu-action">
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </div>
                </a>
              </Dropdown>
            </div>
          );
        },
      },
    ];

    return (
      <div className="mt-5">
        {this.state.loading ? (
          <div className="text-center mt-5">
            <h4>Loading data...</h4>
            <Spin size="large" />
          </div>
        ) : this.state.cgetAllCommitData?.length > 0 ? (
          <>
            <Input
              // .trim().split(/ +/)
              placeholder="Search"
              type={"text"}
              onChange={(e) => this.searchinput(e)}
              style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                float: "right",
                paddingBottom: "10px",
              }}
            >
              {/* <Button
                type='primary'
              >
                <i className='bx bxs-cloud-download'
                  style={{
                    color: '#fff',
                    position: 'relative',
                    top: 3,
                    left: -3,
                    display:"none",
                  }}
                ></i> Export Data
              </Button> */}
            </div>
            <Table
              className="table-2"
              dataSource={dataSource}
              columns={columns}
              loading={this.state.loading}
              bordered
              // scroll={{ x: 'max-content' }}
              expandable={{
                rowExpandable: (record) => record.child.length > 0,
                expandedRowRender: (record) => getNestData(record),
              }}
            ></Table>
          </>
        ) : (
          <>
            <div className="text-center mt-5">
              <h4>
                Commitments made on Growth91 will be visible here.<br></br>
                <a href="/deals" style={{ fontSize: "1.5rem" }}>
                  View our active deals
                </a>
              </h4>
              <img src="No_data_rafiki.png" width={200} />
            </div>
          </>
        )}
        <Modal
          centered
          open={this.state.show_kyc_modal}
          onCancel={this.closeKycModal}
          cancelText={"Cancel"}
          width={700}
          footer={false}
        >
          <div className="row">
            <div style={{ width: "100%" }}>
              <p style={{ margin: "20px", maxWidth: "100%" }}>
                <Alert
                  message="Please complete your KYC before making the payment."
                  type="info"
                />
              </p>
              <br />
              <br />
            </div>

            <div class="container mx-auto">
              <div class="row">
                <div class="col-12 col-sm-6 col-md-6">
                  <Link to="/kyc-instructions">
                    <button
                      class="btn btn-primary btn-lg"
                      style={{
                        position: "relative",
                        left: 22,
                      }}
                      type="button"
                    >
                      Complete Kyc
                    </button>
                  </Link>
                </div>
                <div class="col-12 col-sm-6 col-md-6"></div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          centered
          open={this.state.show_payment_modal}
          onCancel={this.closePaymentModal}
          cancelText={"Cancel"}
          width={700}
          footer={false}
        >
          <div className="row">
            <div style={{ width: "100%" }}>
              <p style={{ margin: "20px", maxWidth: "100%" }}>
                {/* <Alert
                              message="Kindly note, currently HDFC bank customers are facing issues with online payments. HDFC bank customers are requested to use offline mode for payment."
                              type="info"
                            /> */}
                Kindly note, currently HDFC bank customers are facing issues
                with online payments. HDFC bank customers are requested to use{" "}
                <button
                  onClick={this.show_offline_payment_modal}
                  style={{
                    textDecoration: "underline",
                    border: "none",
                    background: "white",
                  }}
                >
                  offline mode for payment.
                </button>
              </p>
              <br />
              <br />
            </div>

            <div class="container mx-auto">
              <div class="row">
                <div class="col-12 col-sm-6 col-md-6">
                  <button
                    class="btn btn-primary btn-lg"
                    style={{
                      position: "relative",
                      left: 22,
                    }}
                    type="button"
                    onClick={this.invest}
                  >
                    Proceed with Online Payment
                  </button>
                </div>
                <div class="col-12 col-sm-6 col-md-6">
                  {/* <button class="btn btn-primary btn-lg" type="button"
                    style={{
                      position: 'relative',
                      left: 200
                    }}

                    onClick={this.show_offline_payment_modal}

                  >Offline</button> */}
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          title="Offline Payment"
          centered
          open={this.state.show_offline_payment_modal}
          onOk={this.handleOfflinePayment}
          onCancel={this.cancelOffline}
          okText={"Save"}
          cancelText={"Cancel"}

          // wrapClassName="vertical-center-modal"
        >
          <Spin spinning={this.state.formloader}>
            <div className="mt-4">
              <label className="fs-5">Escrow Account Details</label>
            </div>

            {this.state.escrow_account_name !== null ? (
              <div className="mt-2 d-flex flex-wrap" style={{ gap: "10px" }}>
                <label>Account Name :</label>
                <Paragraph style={{ marginBottom: 0 }} copyable>
                  {this.state.escrow_account_name}
                </Paragraph>
              </div>
            ) : null}

            <div className="mt-2 d-flex flex-wrap" style={{ gap: "10px" }}>
              <label>Account Number :</label>
              {/* <Input type="email" value={this.state.investor_email} readOnly /> */}
              {/* <Paragraph>{this.getAllCommitData.data.data[0].escrowact}</Paragraph> */}
              <Paragraph style={{ marginBottom: 0 }} copyable>
                {this.state.escrowact}
              </Paragraph>
            </div>

            {this.state.escrow_account_bank !== null ? (
              <div className="mt-2 d-flex flex-wrap" style={{ gap: "10px" }}>
                <label>Account Bank :</label>
                <Paragraph style={{ marginBottom: 0 }} copyable>
                  {this.state.escrow_account_bank}
                </Paragraph>
              </div>
            ) : null}

            {this.state.escrow_account_branch !== null ? (
              <div className="mt-2 d-flex flex-wrap" style={{ gap: "10px" }}>
                <label>Account Branch :</label>
                <Paragraph style={{ marginBottom: 0 }} copyable>
                  {this.state.escrow_account_branch}
                </Paragraph>
              </div>
            ) : null}

            <div className="mt-2 d-flex flex-wrap" style={{ gap: "10px" }}>
              <label>Account IFSC :</label>
              <Paragraph style={{ marginBottom: 0 }} copyable>
                {this.state.escrow_account_ifsc}
              </Paragraph>
            </div>

            {/* <div className="mt-4">
              <label className="mb-2">
                Payment Type<span className="text-danger">*</span>
              </label>
              <Select required
                defaultValue="NEFT/IMPS/RTGS"
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ investor_payment_type: value });
                }}
                options={[
                  {
                    value: 'NEFT/IMPS/RTGS',
                    label: 'NEFT / IMPS / RTGS',
                  },
                  {
                    value: 'Cheque',
                    label: 'Cheque',
                  },
                  {
                    value: 'Cash',
                    label: 'Cash',
                  },
                  {
                    value: 'Postal Order',
                    label: 'Postal Order',
                  },
                  {
                    value: 'Demand draft',
                    label: 'Demand draft',
                  },
                  {
                    value: 'PG payment link',
                    label: 'PG payment link',
                  },
                  {
                    value: 'IMPS',
                    label: 'IMPS',
                  },
                  {
                    value: 'NEFT',
                    label: 'NEFT',
                  },
                ]}
              />
            </div> */}
            <div className="mt-4">
              <label className="mb-2">
                Payment Type<span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value="NEFT / IMPS / RTGS"
                readOnly
                disabled
                style={{ color: "#000" }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Investment Amount<span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.amount}
                readOnly
                disabled
                style={{ color: "#000" }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Convenience Fees<span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.processingfees}
                readOnly
                disabled
                style={{ color: "#000" }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Total Amount<span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.totalamount}
                readOnly
                disabled
                style={{ color: "#000" }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                UTR No./ Reference ID<span className="text-danger">*</span>
              </label>
              <Input
                required
                type="text"
                value={this.state.utr_no_reference_id}
                onChange={(e) =>
                  this.setState({ utr_no_reference_id: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="mb-2">
                Attach Copy<span className="text-danger"></span>
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*,.pdf"
                onChange={(e) =>
                  this.setState({
                    attach_file: e.target.files[0],
                  })
                }
              />
            </div>

            <div className="mt-4">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.investor_payment_remarks}
                onChange={(e) =>
                  this.setState({ investor_payment_remarks: e.target.value })
                }
              />
            </div>
          </Spin>
        </Modal>
        <Modal
          title={false}
          open={this.state.modalstatus}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={"Upgrade"}
          cancelText={"Cancel"}
          header={false}
          footer={false}
        >
          <div className="membership-modal">
            <center>
              <img
                src={"./membership-top-img.png"}
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  maxWidth: 276,
                }}
              />
            </center>
            <p>
              Upgrade to Premium Membership to get {this.state.discount}% <br />
              off for the all deals
              <br />
              You have to pay <strike>₹{this.state.amount}</strike>
              &nbsp; ₹{this.state.discounted_amount} only.
            </p>
            <div className="membership-buttons">
              <a href="#" onClick={this.handleCancel} className="cancel">
                Skip Now
              </a>
              <a href="#" onClick={this.upgrade} className="upgrade">
                Upgrade
              </a>
            </div>
          </div>
        </Modal>
        {/* Start Edit modal  */}
        <Modal
          title={`Invest in ${this.state.edit_deal_name}`}
          visible={this.state.show_edit_commitment_modal}
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
                  {this.formatNumberWithCommas(this.state.minamount)} <br />
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
                    this.state.amount_error_status == true && this.state.amount
                      ? "1px solid red"
                      : "1px solid transparent",
                }}
                id="selected-field"
                value={this.state.ac_edit_amount}
                onChange={(e) => {
                  this.handleCommitAmount(e.target.value);
                }}
              />
              <div className="d-flex justify-content-between mb-3">
                <button className="commit-plus" onClick={this.decrease_commit}>
                  -
                </button>
                <button className="commit-minus" onClick={this.increase_commit}>
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
                  this.setState({ checkWallet: e.target.checked }, () =>
                    this.calculategst()
                  );
                }}
              >
                {" "}
              </Checkbox>
              <label className="form-check-label">
                Use Your ₹ {this.state.walletMoney} Growth91
                <sup style={{ fontSize: "0.6rem" }}>TM</sup> Money{" "}
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
                    {this.state.ac_edit_amount
                      ? this.state.ac_edit_amount
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
                    ₹ {this.state.ac_edit_processingfees}
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
                  <td>₹ {parseFloat(this.state.ac_totalamount).toFixed(0)}</td>
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
                I Agree to Terms and Conditions and have read the Privacy
                Policy. And, I understand that I will be required to pay the
                full amount committed after the deal is closed.
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
                <EditInvestmentMembershipmodal
                  processingfees={this.state.ac_edit_processingfees}
                  deal_id={this.state.ac_edit_deal_id}
                  membership_type={this.state.ac_check_membership_type}
                  invest={this.invest}
                  amount={this.state.ac_edit_amount}
                  agreecheck={this.state.ac_agreeCheck}
                  totalamount={this.state.ac_totalamount}
                  fee={this.state.legalfee}
                  minamount={this.state.ac_minamount}
                  maxamount={this.state.ac_maxamount}
                  agree={this.state.ac_agreeCheck}
                  error_status={this.state.amount_error_status}
                  investor_id={this.state.ac_edit_investor_id}
                  deduct={this.state.ac_edit_deduct}
                  tdsstatus={this.state.ac_edit_tdsstatus}
                  gst={this.state.ac_edit_gst}
                  order_token={this.state.ac_edit_order_token}
                  legalfee={this.state.ac_edit_legalfee}
                  walletDeductionMoney={this.state.ac_edit_walletDeductionMoney}
                  user_id={this.state.ac_edit_investor_id}
                  escrow_account_ifsc={this.state.ac_edit_escrow_account_ifsc}
                  escrowact={this.state.ac_edit_escrowact}
                  interested_id={this.state.ac_edit_interested_id}
                  invest_amt={this.state.ac_totalamount}
                  commitment_id={this.state.ac_edit_interested_id}
                  // parent_id={this.state.parent_id}
                />
              )}
            </div>
          </div>
        </Modal>

        {/* End Edit modal  */}
      </div>
    );
  }
}

export default InnerCommitment;
