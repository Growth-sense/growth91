import React, { Component } from "react";
import axios from "axios";
import {
  Layout,
  Breadcrumb,
  Table,
  Card,
  Button,
  Modal,
  message,
  Select,
  Spin,
  DatePicker,
  Dropdown,
  Menu,
  Switch,
  Checkbox,
  Input,
  Tooltip,
  Tag,
  Alert,
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import {
  EditOutlined,
  UserOutlined,
  PayCircleOutlined,
  ShareAltOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Apis from "../constants/Apis";
import DealPitches from "./DealPitches";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Invitation_list from "./common/Invitation_list";
import StateSelect from '../common/Selector/StateSelect'

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class Deals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      addModalStatus: false,
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
      deal_service:"",

      // add input states
      startupname: "",
      dealStartDtReg: "",
      dealStartDtPrem: "",
      dealEndDtReg: "",
      dealEndDtPrem: "",
      targetamount: "",
      mintargetamount: "",
      captable_threshold_amount: "",
      maxtargetamount: "",
      captable_multiple_amount: "",
      multipleofdescription: "",
      escrowAct: "",
      raiseGap: "",
      backedby: "",
      category: "",
      logo: "",
      banner: "",
      digioTemplateId: "",
      add_dealtype: "",
      deal_name: "",
      particular_deal_name: "",
      enable_special_offer: false,
      special_offer_text: "",
      default_special_offer_text: "",
      offer_discount: "",

      // add commitment states
      show_add_commitment_modal: false,
      ac_deal_id: "",
      ac_investor: {},
      ac_investor_state: null,
      ac_investor_name: "",
      ac_interested_id: "",
      ac_deal_name: "",
      ac_commaAmount: 0,
      ac_igst_percentage: 0,
      ac_igst_value: 0,
      ac_cgst_percentage: 0,
      ac_cgst_value: 0,
      ac_sgst_percentage: 0,
      ac_sgst_value: 0,
      ac_amount: 0,
      ac_minamount: 0,
      ac_captable_threshold_amount: 0,
      ac_maxamount: 0,
      ac_captable_multiple_amount: 0,
      ac_deduct: false,
      ac_agree: false,
      ac_gst: 0,
      ac_amountplusgst: 0,
      ac_processingfees: 0.0,
      ac_totalamount: 0.0,
      ac_tdsstatus: false,
      ac_legalfee: 0.0,
      ac_label: "",
      ac_percentage: 0,
      ac_tdsdeductedamount: 0,
      ac_order_token: "",
      ac_walletMoney: 0,
      ac_gstValue: 0,
      ac_walletDeductionMoney: 0,
      ac_checkWallet: false,
      ac_checkDiscount: false,
      ac_DiscountedMoney: 0,
      ac_amount_error: "",
      ac_amount_error_status: false,
      ac_multiples_of: 0,
      ac_invest_amt: "",
      ac_agreeCheck: false,
      ac_enable_special_offer: false,
      ac_special_offer_text: "",
      ac_default_special_offer_text: "",
      ac_offer_discount: "",
      ac_investor_list: [],
      ac_check_membership_type: "",

      // edit commitment states
      show_edit_commitment_modal: false,
      ac_edit_deal_id: '',
      ac_edit_investor_id: '',
      ac_edit_amount: 0,
      ac_edit_processingfees: 0,
      ac_edit_totalamount: 0,
      ac_edit_deduct: false,
      ac_edit_agree: false,
      ac_edit_order_token: '',
      ac_edit_tdsstatus: false,
      ac_edit_gst: 0,
      ac_edit_igst: 0,
      ac_edit_cgst: 0,
      ac_edit_sgst: 0,
      ac_edit_igstvalue: 0,
      ac_edit_cgstvalue: 0,
      ac_edit_sgstvalue: 0,
      ac_edit_legalfee: 0,
      ac_edit_walletDeductionMoney: 0,
      ac_edit_interested_id: 0,
      ac_edit_commitment_id: 0,

      // update input states
      editstartupname: "",
      editdealStartDtReg: "",
      editdealStartDtPrem: "",
      editdealEndDtReg: "",
      editdealEndDtPrem: "",
      edittargetamount: "",
      editmintargetamount: "",
      editcaptable_threshold_amount: "",
      editmaxtargetamount: "",
      editcaptable_multiple_amount: "",
      editmultipleofdescription: "",
      editescrowAct: "",
      editraiseGap: "",
      editbackedby: "",
      editcategory: "",
      editlogo: "",
      editbanner: "",
      edityoutubelink: "",
      editdigioTemplateId: "",
      editenable_special_offer: false,
      editspecial_offer_text: "",
      editdefault_special_offer_text: "",
      editoffer_discount: "",
      edit_deal_service:"",

      deal_id: "",

      deallist: [],
      cdeallist: [],
      signer_mobile: "",
      signer_name: "",
      signer_email: "",
      escrow_account_ifsc: "",
      escrow_account_name: "",
      escrow_account_bank: "",
      escrow_account_branch: "",
      // edit states
      approvestatus: "",
      dealstatus: "",
      updatemodalstatus: false,

      logourl: "",
      bannerurl: "",
      dealtype: "",
      startups: [],
      invite_deal_id: 0,
      invited_user_list_count: 0,

      pdffile: "",
      editpdffile: "",
      add_pitch_files: [],
      edit_pitch_files: [],
      add_show_pitch_image: "",
      edit_show_pitch_image: "",
      add_multiples_of: "",
      edit_multiples_of: "",
      page_link: "",
      show_status: "",
      edit_page_link: "",
      edit_signer_mobile: "",
      edit_deal_name: "",
      edit_signer_name: "",
      edit_signer_email: "",
      edit_escrow_account_ifsc: "",
      edit_escrow_account_name: "",
      edit_escrow_account_bank: "",
      edit_escrow_account_branch: "",
      show_eligibility_modal: false,
      confirmation: "",
      eligibility_date: "",
      eligibility_remarks: "",
      investor_sign_coordinate: "",
      edit_investor_sign_coordinate: "",
      founder_sign_coordinate: "",
      edit_founder_sign_coordinate: "",
      invite_modal_status: false,
      invite_details: false,
      invite_name: "",
      invite_email: "",
      invite_mobile: "",
      invited_user_list: [],
      show_offline_payment_modal: false,
      investor_payment_remarks: "",
      attach_file: "",
      investor_payment_date: "",
      utr_no_reference_id: "",
      investor_investment_amount: "",
      investor_payment_type: "",
      offline_igst: 0,
      offline_cgst: 0,
      offline_sgst: 0,
      offline_igstvalue: 0,
      offline_cgstvalue: 0,
      offline_sgstvalue: 0,
      investor_name: "",
      investor_email: "",
      investor_list: [],
      offline_deal_id: "",
      offline_startup_id: "",
      input_status: false,
      cc_to_fouder: "No",
      input_file_status: false,
      invite_form_loader: false,
      bannerimg: "",
      attachment_preview: "",
      add_vendor_id: "",
      edit_vendor_id: "",
      edit_deal_type: "",
      allPrivateDealInvestor: [],
      selectallstatus: false,
      count: 0,
      bulk_user_loader: false,
      invite_deal_titile: "",
      processing_fees: "",
      membership_type: "",
      premium_percentage: "",
      regular_percentage: "",
      commitment_investor_list: [],
      commitment_investor_listc: [],
    };
  }

  componentDidMount() {
    this.getdeallist();
    this.getstartuplist();
    this.getinvestorlist();
    this.getordertoken();
    this.getGst();
  }

  getinvestorlist = () => {
    this.setState({ loading: true });
    Bridge.admin.investor.list().then((result) => {
      if (result.status == 1) {
        this.setState({ ac_investor_list: result.data });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get post list
  getstartuplist = () => {
    this.setState({ loading: true });
    Bridge.startups.list().then((result) => {
      if (result.status == 1) {
        let arr = [];
        let sorted = result.data.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : b.name.toLowerCase() > a.name.toLowerCase()
              ? -1
              : 0
        );
        this.setState({
          startups: sorted,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get post list
  getdeallist = () => {
    this.setState({ loading: true });
    Bridge.deal.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          deallist: result.data,
          cdeallist: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // on change file
  onChangeEditFile = (e, type) => {
    if (type == "banner") {
      this.setState({
        editbanner: e.target.files[0],
      });
    } else if (type == "logo") {
      this.setState({
        editlogo: e.target.files[0],
      });
    } else if (type == "pdf") {
      this.setState({
        editpdffile: e.target.files[0],
      });
    }
  };

  // show edit modal
  showEditModal = (item) => {
    console.log('item',item);
    let logourl = Apis.IMAGEURL + "deal/logo/" + item.deal_id + "/" + item.logo;
    let bannerimg =
      Apis.IMAGEURL + "deal/banner/" + item.deal_id + "/" + item.banner_img;
    let pitchImg =
      Apis.IMAGEURL +
      "deal/pitch_images/" +
      item.deal_id +
      "/" +
      item.pitch_files;
    this.setState({
      editstartupname: item.startupid,
      editdealStartDtReg: item.deal_st_date ? moment(item.deal_st_date) : "",
      editdealStartDtPrem: item.deal_start_dt_prem
        ? moment(item.deal_start_dt_prem)
        : "",
      editdealEndDtReg: item.deal_end_date ? moment(item.deal_end_date) : "",
      editdealEndDtPrem: item.deal_end_dt_prem
        ? moment(item.deal_end_dt_prem)
        : "",
      editescrowAct: item.escrowact,
      edit_escrow_account_ifsc: item.escrow_account_ifsc,
      edit_escrow_account_name: item.escrow_account_name,
      edit_escrow_account_bank: item.escrow_account_bank,
      edit_escrow_account_branch: item.escrow_account_branch,
      editraiseGap: item.raiegap,
      editenable_special_offer: item.enable_special_offer == 'Yes' ? true : false,
      editspecial_offer_text: item.special_offer_text,
      editdefault_special_offer_text: item.default_special_offer_text,
      editoffer_discount: item.offer_discount,
      edittargetamount: item.deal_fund_requested,
      editmintargetamount: item.Min_inv_amt,
      editcaptable_threshold_amount: item.captable_threshold_amount,
      editmaxtargetamount: item.Max_inv_amt,
      editcaptable_multiple_amount: item.captable_multiple_amount,
      editmultipleofdescription: item.Muliples_of,
      editbackedby: item.backed_by,
      editcategory:
        item.deal_category != "" ? JSON.parse(item.deal_category) : [],
      deal_id: item.deal_id,
      editModalStatus: true,
      logourl: logourl,
      bannerurl: bannerimg,
      edityoutubelink: item.youtubelink,
      edit_show_pitch_image: pitchImg,
      edit_multiples_of: item.multiples_of,
      editdigioTemplateId: item.digio_template_id,
      edit_investor_sign_coordinate: item.investor_sign_coordinate,
      edit_founder_sign_coordinate: item.founder_sign_coordinate,
      edit_regular_show_date: item.regular_show_date
        ? moment(item.regular_show_date)
        : "",
      edit_premium_show_date: item.premium_show_date
        ? moment(item.premium_show_date)
        : "",
      edit_page_link: item.page_link,
      edit_signer_name: item.signer_name,
      edit_deal_name: item.deal_name,
      edit_deal_service: item.deal_service,
      edit_signer_email: item.signer_email,
      edit_signer_mobile: item.signer_mobile,
      edit_vendor_id: item.vendor_id,
      edit_deal_type: item.deal_type,

    });
    // console.log(this.state.edit_founder_sign_coordinate)
  };

  // show Commitment modal
  showCommitmentModal = (item) => {
    this.setState({
      Commitment_list_modal: true,
      ac_deal_id: item.deal_id,
      ac_deal_name: item.deal_name,
      ac_minamount: Number(item.Min_inv_amt),
      ac_captable_threshold_amount: parseInt(parseFloat(item.captable_threshold_amount).toFixed(2), 10),
      ac_maxamount: item.Max_inv_amt,
      ac_captable_multiple_amount: parseInt(parseFloat(item.captable_multiple_amount).toFixed(2), 10),
      ac_enable_special_offer: item.enable_special_offer == 'Yes' ? true : false,
      ac_special_offer_text: item.special_offer_text,
      ac_default_special_offer_text: item.default_special_offer_text,
      ac_offer_discount: item.offer_discount,
      ac_multiples_of: item.multiples_of,
    });
    axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/Deal/display_investor_commitment_list`, {
      params: {
        deal_id: item.deal_id,
      }
    })
      .then(response => {
        this.setState({
          commitment_investor_list: response.data.data,
          commitment_investor_listc: response.data.data,
          loading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  showupdatemodal = (item) => {
    this.setState({
      deal_id: item.deal_id,
      approvestatus: item.user_status,
      dealstatus: item.deal_status,
      dealtype: item.deal_type,
      updatemodalstatus: true,
      show_status: item.show_status,
    });
  };

  // update post
  updatedeal = () => {
    if (this.state.editstartupname == "") {
      message.warning("Startup name is required");
      return false;
    } else if (this.state.edit_deal_name == "") {
      message.warning("Deal Name is required");
      return false;
    } else if (this.state.edit_signer_name == "") {
      message.warning("Signer Name is required");
      return false;
    } else if (this.state.edit_signer_mobile == "") {
      message.warning("Signer Mobile is required.");
      return false;
    } else if (this.state.edit_signer_mobile.length != 10) {
      message.warning("Please Add Correct Mobile Number.");
      return false;
    } else if (this.state.edit_signer_email == "") {
      message.warning("Please Enter Signer Email.");
      return false;
    } else if (this.state.edit_signer_mobile == "") {
      message.warning("Startup Founder Mobile is required.");
      return false;
    } else if (this.state.edit_signer_mobile.length != 10) {
      message.warning("Please Add Correct Startup Founder Mobile Number.");
      return false;
    } else if (this.state.edit_signer_email == "") {
      message.warning("Please Enter Startup Founder Email.");
      return false;
    } else if (this.state.editdealStartDtReg == "") {
      message.warning("Deal start date for Regular is required");
      return false;
    } else if (this.state.editdealStartDtPrem == "") {
      message.warning("Deal start date for Premium is required");
      return false;
    } else if (this.state.editdealEndDtReg == "") {
      message.warning("Deal End date is for Regular required.");
      return false;
    } else if (this.state.editdealEndDtPrem == "") {
      message.warning("Deal End date for Premium is required");
      return false;
    } else if (this.state.edittargetamount == "") {
      message.warning("Target amount is required.");
      return false;
    } else if (this.state.editmintargetamount == "") {
      message.warning("Min investment amount value is required.");
      return false;
    } else if (this.state.editcaptable_threshold_amount == "") {
      message.warning("Captable threshold amount value is required.");
      return false;
    } else if (this.state.editenable_special_offer == true && this.state.editspecial_offer_text == null) {
      message.warning("Special offer text value is required.");
      return false;
    } else if (this.state.editenable_special_offer == true && this.state.editdefault_special_offer_text == null) {
      message.warning("Default special offer text value is required.");
      return false;
    } else if (this.state.editmaxtargetamount == "") {
      message.warning("Max investment amount value is required.");
      return false;
    } else if (this.state.editcaptable_multiple_amount == "") {
      message.warning("Captable multiple amount value is required.");
      return false;
    } else if (this.state.editmultipleofdescription == "") {
      message.warning("Deal Description field value is required.");
      return false;
    } else if (this.state.edit_escrow_account_name == "") {
      message.warning("Escrow Account Name is required.");
      return false;
    } else if (this.state.editescrowAct == "") {
      message.warning("Escrow Account No is required.");
      return false;
    } else if (this.state.edit_escrow_account_bank == "") {
      message.warning("Escrow Account Bank is required.");
      return false;
    } else if (this.state.edit_escrow_account_branch == "") {
      message.warning("Escrow Account Branch is required.");
      return false;
    } else if (this.state.edit_escrow_account_ifsc == "") {
      message.warning("Escrow Account IfSC is required.");
      return false;
    } else if (this.state.editraiseGap == "") {
      message.warning("% Raise Gap value is required.");
      return false;
    } else if (this.state.editdigioTemplateId == "") {
      message.warning("Digio Template Id is required");
      return false;
    } else if (this.state.edit_investor_sign_coordinate == "") {
      message.warning("Digio Sign Coordinate for Investor is required");
      return false;
    } else if (this.state.edit_founder_sign_coordinate == "") {
      message.warning("Digio Sign Coordinate for Founder is required");
      return false;
    } else if (this.state.editcategory == "") {
      message.warning("Category value is required.");
      return false;
    }
    // else if (this.state.editbackedby == "") {
    //   message.warning("Backed by value is required.");
    //   return false;
    // }
    // else if (this.state.edityoutubelink == "") {
    //   message.warning("Youtube link is required.");
    //   return false;
    // }
    this.setState({ formloader: true });

    let params = {
      startupname: this.state.editstartupname,
      dealstartdate: this.state.editdealStartDtReg,
      dealStartDtPrem: this.state.editdealStartDtPrem,
      dealenddate: this.state.editdealEndDtReg,
      dealEndDtPrem: this.state.editdealEndDtPrem,
      targetamount: this.state.edittargetamount,
      mintargetamount: this.state.editmintargetamount,
      captable_threshold_amount: this.state.editcaptable_threshold_amount,
      maxtargetamount: this.state.editmaxtargetamount,
      captable_multiple_amount: this.state.editcaptable_multiple_amount,
      enable_special_offer: this.state.editenable_special_offer ? 'Yes' : 'No',
      special_offer_text: this.state.editspecial_offer_text,
      default_special_offer_text: this.state.editdefault_special_offer_text,
      offer_discount: this.state.editoffer_discount,
      multipleofdescription: this.state.editmultipleofdescription,
      escrowAct: this.state.editescrowAct,
      escrow_account_ifsc: this.state.edit_escrow_account_ifsc,
      escrow_account_name: this.state.edit_escrow_account_name,
      escrow_account_bank: this.state.edit_escrow_account_bank,
      escrow_account_branch: this.state.edit_escrow_account_branch,
      raiseGap: this.state.editraiseGap,
      backedby: this.state.editbackedby,
      category: this.state.editcategory,
      id: this.state.deal_id,
      youtubelink: this.state.edityoutubelink,
      multiples_of: this.state.edit_multiples_of,
      digioTemplateId: this.state.editdigioTemplateId,
      investor_sign_coordinate: this.state.edit_investor_sign_coordinate,
      founder_sign_coordinate: this.state.edit_founder_sign_coordinate,
      regular_show_date: this.state.edit_regular_show_date
        ? this.state.edit_regular_show_date
        : moment(),
      premium_show_date: this.state.edit_premium_show_date
        ? this.state.edit_premium_show_date
        : moment(),
      page_link: this.state.edit_page_link,
      signer_name: this.state.edit_signer_name,
      deal_name: this.state.edit_deal_name,
      signer_mobile: this.state.edit_signer_mobile,
      signer_email: this.state.edit_signer_email,
      vendor_id: this.state.edit_vendor_id,
      deal_service:this.state.edit_deal_service,
      deal_type:this.state.edit_deal_type
    };
    Bridge.deal.edit(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            editModalStatus: false,
            editstartupname: "",
            editdealStartDtReg: "",
            editdealStartDtPrem: "",
            editdealEndDtReg: "",
            editdealEndDtPrem: "",
            edittargetamount: "",
            editmintargetamount: "",
            editcaptable_threshold_amount: "",
            editmaxtargetamount: "",
            editcaptable_multiple_amount: "",
            editenable_special_offer: false,
            editspecial_offer_text: "",
            editdefault_special_offer_text: "",
            editoffer_discount: "",
            editmultipleofdescription: "",
            editbackedby: "",
            editcategory: "",
            editraiseGap: "",
            editescrowAct: "",
            editdigioTemplateId: "",
            edit_investor_sign_coordinate: "",
            edit_founder_sign_coordinate: "",
            edit_signer_name: "",
            edit_deal_name: "",
            edit_signer_mobile: "",
            edit_escrow_account_ifsc: "",
            edit_escrow_account_name: "",
            edit_escrow_account_bank: "",
            edit_escrow_account_branch: "",
            edit_deal_type: "",
          },
          () => this.getdeallist()
        );

        if (
          this.state.editlogo ||
          this.state.editbanner ||
          this.state.editpdffile ||
          this.state.edit_pitch_files
        ) {
          this.updateimg(this.state.deal_id, "edit");
        }
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
    // window.location.reload();
  };
  cancel_updatedeal = () => {
    this.setState({ editModalStatus: false });
    window.location.reload();
  };

  // showDeleteModal = (item) => {
  //   this.setState({
  //     deleteModalStatus: true,
  //     deal_id: item.deal_id,
  //   });
  // }

  // deletedeal = () => {
  //   if (this.state.deal_id == ''){
  //     message.warning('Please select the deal first.');
  //     return false;
  //   }

  //   this.setState({ formloader: true });
  //   let formData = new FormData();    //formdata object
  //   formData.append('id', this.state.deal_id);
  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     }
  //   }
  //   Bridge.deal.delete(formData,config).then((result) => {
  //     if (result.status == 1) {
  //       message.success(result.message);
  //       this.setState({
  //         formloader: false,
  //         deleteModalStatus: false,
  //         deal_id:'',
  //       },() =>this.getdeallist());
  //     } else {
  //       message.error(result.message);
  //       this.setState({
  //         formloader: false,
  //       });
  //     }
  //   });
  // }

  // on change select
  handleChangeSelect = (value) => {
    this.setState({ ctype: value });
  };

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      for (let item of this.state.cdeallist) {
        if (
          (item.deal_name && item.deal_name.toLowerCase().includes(text.toLowerCase())) ||
          item.deal_fund_requested.includes(text) ||
          item.Min_inv_amt.includes(text) ||
          item.Max_inv_amt.includes(text) ||
          item.Muliples_of.includes(text) ||
          (item.backed_by && item.backed_by.toLowerCase().includes(text.toLowerCase())) ||
          (item.deal_category && item.deal_category.toLowerCase().includes(text.toLowerCase())) ||
          (item.deal_id && item.deal_id.toLowerCase().includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        deallist: arr,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };
  searchinputc = (e) => {
    let text = e.target.value;
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      for (let item of this.state.commitment_investor_listc) {
        if (
          (item.deal_name && item.deal_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.first_name && item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.last_name && item.last_name.toLowerCase().includes(text.toLowerCase())) ||
          item.investor_id.includes(text)
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        commitment_investor_list: arr,
        loading: false,
      });
    } else {
      this.setState({
        commitment_investor_list: this.state.commitment_investor_listc,
        loading: false,
      });
    }
  };

  onChangeStartDate = (date, dateString) => {
    this.setState({
      dealStartDtReg: date,
    });
  };

  onChangeEndDate = (date, dateString) => {
    this.setState({
      dealEndDtReg: date,
    });
  };

  onChangeStartDtPremium = (date, dateString) => {
    this.setState({ dealStartDtPrem: date });
  };
  onChangeEndDtPremium = (date, dateString) => {
    this.setState({ dealEndDtPrem: date });
  };
  onChangeStartDtPremEdit = (date, dateString) => {
    this.setState({ editdealStartDtPrem: date });
  };
  onChangeEndDtPremEdit = (date, dateString) => {
    this.setState({ editdealEndDtPrem: date });
  };

  onChangeStartDateEdit = (date, dateString) => {
    this.setState({
      editdealStartDtReg: date,
    });
  };

  onChangeEndDateEdit = (date, dateString) => {
    this.setState({
      editdealEndDtReg: date,
    });
  };

  handleChangeSelected = (value) => {
    this.setState({ category: value });
  };
  handleChangeSelectededit = (value) => {
    this.setState({ editcategory: value });
  };

  // on change file
  onChangeFile = (e, type) => {
    if (type == "banner") {
      this.setState({
        banner: e.target.files[0],
      });
    } else if (type == "logo") {
      this.setState({
        logo: e.target.files[0],
      });
    } else if (type == "pdf") {
      this.setState({
        pdffile: e.target.files[0],
      });
    }
  };

  // add new deal
  adddeal = () => {
    if (this.state.startupname == "") {
      message.warning("Startup name is required");
      return false;
    } else if (this.state.deal_name == "") {
      message.warning("Deal Name is required");
      return false;
    
    } else if (this.state.deal_service == "") {
      message.warning("Deal service is required");
      return false;
    } else if (this.state.add_dealtype == "") {
      message.warning("Deal Type is required");
      return false;
    } else if (this.state.signer_name == "") {
      message.warning("Startup Founder Name is required");
      return false;
    } else if (this.state.signer_mobile == "") {
      message.warning("Startup Founder Mobile is required.");
      return false;
    } else if (this.state.signer_mobile.length != 10) {
      message.warning("Please Add Correct Startup Founder Mobile Number.");
      return false;
    } else if (this.state.signer_email == "") {
      message.warning("Startup Founder Email is required.");
      return false;
    } else if (this.state.dealStartDtReg == "") {
      message.warning("Deal start date for regular is required");
      return false;
    } else if (this.state.dealStartDtPrem == "") {
      message.warning("Deal start date for Premium is required");
      return false;
    } else if (this.state.dealEndDtReg == "") {
      message.warning("Deal end date for Regular is required.");
      return false;
    } else if (this.state.dealEndDtPrem == "") {
      message.warning("Deal End date for Premium is required");
      return false;
    } else if (this.state.targetamount == "") {
      message.warning("Target amount is required.");
      return false;
    } else if (this.state.mintargetamount == "") {
      message.warning("Min investment amount value is required.");
      return false;
    } else if (this.state.captable_threshold_amount == "") {
      message.warning("Captable threshold amount value is required.");
      return false;
    } else if (this.state.maxtargetamount == "") {
      message.warning("Max investment amount value is required.");
      return false;
    } else if (this.state.captable_multiple_amount == "") {
      message.warning("Captable multiple amount value is required.");
      return false;
    } else if (this.state.enable_special_offer == true && this.state.special_offer_text == null) {
      message.warning("Special offer text value is required.");
      return false;
    } else if (this.state.enable_special_offer == true && this.state.default_special_offer_text == null) {
      message.warning("Default special offer text value is required.");
      return false;
    } else if (this.state.multipleofdescription == "") {
      message.warning("Deal description field value is required.");
      return false;
    } else if (this.state.raiseGap == "") {
      message.warning("% Raise Gap value is required.");
      return false;
    } else if (this.state.escrow_account_name == "") {
      message.warning("Escrow Account Name is required.");
      return false;
    } else if (this.state.escrowAct == "") {
      message.warning("Escrow Account No is required.");
      return false;
    } else if (this.state.escrow_account_bank == "") {
      message.warning("Escrow Account Bank is required.");
      return false;
    } else if (this.state.escrow_account_branch == "") {
      message.warning("Escrow Account Branch is required.");
      return false;
    } else if (this.state.escrow_account_ifsc == "") {
      message.warning("Escrow Account IFSC is required.");
      return false;
    } else if (this.state.digioTemplateId == "") {
      message.warning("Digio Template Id is required");
      return false;
    } else if (this.state.investor_sign_coordinate == "") {
      message.warning("Digio Sign Co-ordinates for Investor is required");
      return false;
    } else if (this.state.founder_sign_coordinate == "") {
      message.warning("Digio Sign Co-ordinates for Founder is required");
      return false;
    } else if (this.state.category == "") {
      message.warning("Category value is required.");
      return false;
    } else if (this.state.banner == "") {
      message.warning("Banner is required.");
      return false;
    } else if (this.state.logo == "") {
      message.warning("Logo is required.");
      return false;
    }
    // else if (this.state.backedby == "") {
    //   message.warning("Backed by value is required.");
    //   return false;
    // }
    // else if (this.state.youtubelink == "") {
    //   message.warning("Youtube link is required.");
    //   return false;
    // }
    this.setState({ formloader: true });
    let daata = {
      confirmation: this.state.confirmation,
      date: this.state.eligibility_date,
      remarks: this.state.eligibility_remarks,
    };
    this.setState({ eligilibility_loader: true });

    Bridge.deal.addeligibility(daata).then((result) => {
      if (result.status == "1") {
        let e_id = result.data;
        this.setState({
          confirmation: "",
          eligibility_date: "",
          eligibility_remarks: "",
        });
        let params = {
          startupname: this.state.startupname,
          deal_name: this.state.deal_name,
          deal_service: this.state.deal_service,
          dealstartdate: this.state.dealStartDtReg,
          dealStartDtPrem: this.state.dealStartDtPrem,
          dealenddate: this.state.dealEndDtReg,
          dealEndDtPrem: this.state.dealEndDtPrem,
          targetamount: this.state.targetamount,
          mintargetamount: this.state.mintargetamount,
          captable_threshold_amount: this.state.captable_threshold_amount,
          maxtargetamount: this.state.maxtargetamount,
          captable_multiple_amount: this.state.captable_multiple_amount,
          enable_special_offer: this.state.enable_special_offer ? 'Yes' : 'No',
          special_offer_text: this.state.special_offer_text,
          default_special_offer_text: this.state.default_special_offer_text,
          offer_discount: this.state.offer_discount,
          multipleofdescription: this.state.multipleofdescription,
          backedby: this.state.backedby,
          category: this.state.category,
          youtubelink: this.state.youtubelink,
          multiples_of: this.state.add_multiples_of,
          escrowAct: this.state.escrowAct,
          escrow_account_ifsc: this.state.escrow_account_ifsc,
          escrow_account_name: this.state.escrow_account_name,
          escrow_account_bank: this.state.escrow_account_bank,
          escrow_account_branch: this.state.escrow_account_branch,
          raiseGap: this.state.raiseGap,
          digioTemplateId: this.state.digioTemplateId,
          investor_sign_coordinate: this.state.investor_sign_coordinate,
          founder_sign_coordinate: this.state.founder_sign_coordinate,
          regular_show_date: this.state.add_regular_show_date
            ? this.state.add_regular_show_date
            : moment(),
          premium_show_date: this.state.add_premium_show_date
            ? this.state.add_premium_show_date
            : moment(),
          page_link: this.state.page_link,
          signer_mobile: this.state.signer_mobile,
          signer_name: this.state.signer_name,
          signer_email: this.state.signer_email,
          eligibility_id: e_id,
          deal_type: this.state.add_dealtype,
          vendor_id: this.state.add_vendor_id,
          automated_email:"No"
        };
        // console.log("params",params)
        Bridge.deal.add(params).then((result) => {
          if (result.status == 1) {
            message.success(result.message);
            this.setState(
              {
                formloader: false,
                addModalStatus: false,
                startupname: "",
                deal_name: "",
                dealStartDtReg: "",
                dealStartDtPrem: "",
                dealEndDtReg: "",
                dealEndDtPrem: "",
                targetamount: "",
                mintargetamount: "",
                captable_threshold_amount: "",
                maxtargetamount: "",
                captable_multiple_amount: "",
                enable_special_offer: false,
                special_offer_text: "",
                default_special_offer_text: "",
                offer_discount: "",
                multipleofdescription: "",
                backedby: "",
                category: "",
                raiseGap: "",
                escrowAct: "",
                signer_name: "",
                signer_mobile: "",
                signer_email: "",
                escrow_account_ifsc: "",
                escrow_account_name: "",
                escrow_account_bank: "",
                escrow_account_branch: "",
                digioTemplateId: "",
                investor_sign_coordinate: "",
                founder_sign_coordinate: "",
                add_dealtype: "",
              },
              () => this.updateimg(result.data, "add")
            );
          } else {
            message.error(result.message);
            this.setState({
              formloader: false,
              addModalStatus: false,
            });
          }
        });
      } else {
        message.warning("something went wrong");
        this.setState({
          show_eligibility_modal: false,
          addModalStatus: false,
          formloader: false,
        });
      }
    });
    // window.location.reload();
  };

  //cancel DEAL MODEL post reload
  cancel_adddeal = () => {
    this.setState({ addModalStatus: false });
    // window.location.reload();
  };

  updateimg = (id, type) => {
    let formdata = new FormData();
    if (type == "add") {
      formdata.append("banner", this.state.banner);
      formdata.append("logo", this.state.logo);
      formdata.append("pdffile", this.state.pdffile);
    } else {
      formdata.append("banner", this.state.editbanner);
      formdata.append("logo", this.state.editlogo);
      formdata.append("pdffile", this.state.editpdffile);
      formdata.append("pitch_files", this.state.edit_pitch_files);
    }

    formdata.append("deal_id", id);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.deal.uploaddealimg(formdata, config).then((result) => {
      if (result.status == 1) {
        this.setState({}, () => this.getdeallist());
      } else {
      }
    });
  };

  updatestatus = () => {
    let params = {
      dealstatus: this.state.dealstatus,
      approvestatus: this.state.approvestatus,
      id: this.state.deal_id,
      dealtype: this.state.dealtype,
      show_status: this.state.show_status,
    };
    // console.log("params", params);
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
          () => this.getdeallist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  onSelectPitchImage = (e) => {
    // let addedFiles = this.state.edit_pitch_files.concat(e.target.files);
    // let file = e.target.files[0];
    // this.state.edit_pitch_files.push(file);
    this.setState({ edit_pitch_files: e.target.files[0] });
    // console.log("upload file " + addedFiles);
    // console.log("event " + e.target.files);
  };

  //for ADDING confirmation function
  addConfirmation = () => {
    if (this.state.confirmation == "" && this.state.confirmation == false) {
      message.warning("Please tick the confirmation of eligibility");
      return false;
    } else if (this.state.eligibility_date == "") {
      message.warning("Please Select Date");
      return false;
    }
    if (this.state.confirmation == true) {
      this.setState({ confirmation: 1 });
    }
    this.setState({ addModalStatus: true, show_eligibility_modal: false });
  };
  //end function
  showInviteInvestorModal = (item) => {
    let deal_id = item.deal_id;
    let params = {
      deal_id,
    };
    if (deal_id) {
      Bridge.get_invitation_list(params).then((result) => {
        // console.log('result',result);
        if (result.status == "1") {
          this.setState({ allPrivateDealInvestor: result.data });
        } else {
          message.warning("Something Went Wrong please try again later");
        }
      });
    }

    let banner_link =
      Apis.IMAGEURL + "deal/banner/" + item.deal_id + "/" + item.banner_img;
    this.setState({
      invite_modal_status: true,
      invite_deal_id: item.deal_id,
      input_file_status: false,
      input_status: false,
      invite_details: item,
      invite_name: "",
      invite_email: "",
      invite_mobile: "",
      bannerimg: banner_link,
      invite_form_loader: false,
      invited_user_list: [],
      invite_deal_titile: item.deal_name,
     
    });
  };
  close_invite_modal = () => {
    this.setState({
      invite_modal_status: false,
      invite_details: "",
      invite_deal_titile: "",
    });
  };
  download_sample_file = () => {
    let fileName = "Sample file";
    let arr = [
      {
        Name: "",
        Email: "",
        Mobile: "",
      },
    ];
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Sample file is downloaded successfully.");
  };
  handleChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) this.handleFile(files[0]);
  };
  handleFile = (file) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.dataTrigger(data, file);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  dataTrigger = (data, file) => {
    const invite_data = data.shift();
    this.setState({ input_status: true });
    let arr = [];
    let index = 0;
    for (let item of data) {
      let name = item[0];
      let email = item[1];
      let mobile = item[2];
      if (item.length > 0 && email && name && mobile) {
        let obj = {
          id: index++,
          name: name,
          email: email,
          mobile: mobile,
          selected: false,
        };
        arr = [...arr, obj];
      }
    }
    this.setState({ invited_user_list: arr }, () =>
      this.get_invitation_list(arr)
    );
  };
  get_invitation_list = (exellist) => {
    let deal_id = this.state.invite_deal_id;
    let params = {
      deal_id,
    };
    if (deal_id) {
      Bridge.get_invitation_list(params).then((result) => {
        if (result.status == "1") {
          let invited_list = result.data;
          if (invited_list.length > 0) {
            let arr = [];
            let emaillist = [];
            for (let item of invited_list) {
              emaillist.push(item.email);
            }
            for (let item of exellist) {
              item.isExists = false;
              if (emaillist.includes(item.email)) {
                item.isExists = true;
              }
              arr.push(item);
            }
            // console.log('arr',arr);
            this.setState({ invited_user_list: arr });
          } else {
            let arr = [];
            for (let item of exellist) {
              item.isExists = false;
              arr.push(item);
            }
            // console.log('arr',arr);
            this.setState({ invited_user_list: arr });
          }
        }
      });
    }
  };
  handleChangeInputs = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      input_status: false,
      input_file_status: true,
    });
  };
  togglecc = (event) => {
    console.log(event.target.checked);
    if(event.target.checked === true){
      this.setState({
        [event.target.name]: 'Yes',
        input_status: false,
        input_file_status: true,
      });
    }
    else{
        this.setState({
          [event.target.name]: 'No',
          input_status: false,
          input_file_status: true,
        });


      }

  };

  onInviteChangeEmail = (email) => {
    this.setState({ invite_email: email });
    for (let item of this.state.allPrivateDealInvestor) {
      if (item.email && item.email == email) {
        message.warning("This Email Address Already Exist.");
        break;
      }
    }
  };

  invite_investor = () => {
    console.log(this.state.cc_to_fouder);

    let emailisPresent = false;
    for (let item of this.state.allPrivateDealInvestor) {
      if (item.email && item.email == this.state.invite_email) {
        emailisPresent = true;
        break;
      } else {
        emailisPresent = false;
      }
    }
    if (
      this.state.input_file_status == false ||
      this.state.input_status == false
    ) {
      if (this.state.input_status == false) {
        if (!this.state.invite_name) {
          message.warning("Name is required.", 5);
          return;
        } else if (!this.state.invite_email) {
          message.warning("Email is required.", 5);
          return;
        } else if (emailisPresent == true) {
          message.warning("Email is aready Exist in the private Deal List", 5);
          return;
        } else if (this.state.invite_mobile.length != 10) {
          message.warning("Mobile no is required.", 5);
          return;
        }
        this.setState({ invite_form_loader: true });
        let params = {
          name: this.state.invite_name,
          email: this.state.invite_email,
          mobile: this.state.invite_mobile,
          invite_type: "1",
          deal_id: this.state.invite_details.deal_id,
          startup_id: this.state.invite_details.startupid,
          invited_by: "admin",
          fun_founder_id: this.state.invite_details.operational_founder,
          bannerimg: this.state.bannerimg,
          deal_name: this.state.invite_details.name,
          cc_to_fouder:this.state.cc_to_fouder

          // deal_email:this.state.invite_details.email,
        };
        Bridge.deal.invite_investors_for_private_deal(params).then((result) => {
          if (result.status == 1) {
            message.success(result.message);
            this.setState({
              invite_form_loader: false,
              invite_modal_status: false,
              invite_details: "",
              input_status: false,
              input_file_status: false,
              invite_name: "",
              invite_email: "",
              invite_mobile: "",
            });
          } else {
            message.error(result.message);
            this.setState({ invite_form_loader: false });
          }
        });
      } else if (this.state.input_file_status == false) {
        this.setState({ invite_form_loader: true });
        if (this.state.invited_user_list.length == 0) {
          message.warning("Please select file first");
          return;
        }
        for (let item1 of this.state.invited_user_list) {
          for (let item2 of this.state.allPrivateDealInvestor) {
            if (item1.isExists == false) {
              if (item1.email && item1.email == item2.email) {
                emailisPresent = true;
                break;
              } else {
                emailisPresent = false;
              }
            }
          }
        }
        if (emailisPresent == true) {
          message.warning(
            "Email is already Exist in Private Deal, Please Use Different Email"
          );
          this.setState({ invite_form_loader: false });
          return;
        }
        let params = {
          invited_users: this.state.invited_user_list,
          invite_type: "2",
          deal_id: this.state.invite_details.deal_id,
          startup_id: this.state.invite_details.startupid,
          invited_by: "admin",
          founder_id: this.state.invite_details.operational_founder,
          bannerimg: this.state.bannerimg,
          deal_name: this.state.invite_details.name,
          cc_to_fouder:this.state.cc_to_fouder

          // deal_email:this.state.invite_details.email,
        };
        let valid = false;

        for (let item of this.state.invited_user_list) {
          if (item.selected == true) {
            valid = true;
          }
        }
        if (valid == false) {
          message.warning("Please select user to invite.");
          this.setState({ invite_form_loader: false });
          return;
        }
        // console.log('params',params)
        let arr = [];
        for (let item of this.state.invited_user_list) {
          if (item.isExists == false) {
            arr.push(item);
          }
        }
        this.setState({ invited_user_list_count: arr.length });
        this.invited_user_one_by_one(params, 0, arr);
        return;
      }
    }
    // window.location.reload();
  };
  // invite user one by one
  invited_user_one_by_one = (params, index, invited_users) => {
    this.setState({ bulk_user_loader: true, invite_form_loader: false });
    // console.log('index',index)
    // console.log('invited_users.length',invited_users.length)
    if (invited_users.length == index) {
      message.success("Invitation is sent successfully!");
      setTimeout(() => {
        this.setState({ bulk_user_loader: false });
        this.setState({
          invite_form_loader: false,
          invite_modal_status: false,
          invite_details: "",
          input_status: false,
          input_file_status: false,
          invited_users: [],
        });
      }, 1000);

      return;
    }
    // console.log('invited_users',invited_users);
    let single_item = invited_users[index];
    let obj = {
      name: single_item.name,
      email: single_item.email,
      mobile: single_item.mobile,
      invite_type: "2",
      deal_id: this.state.invite_details.deal_id,
      startup_id: this.state.invite_details.startupid,
      invited_by: "admin",
      fun_founder_id: this.state.invite_details.operational_founder,
      bannerimg: this.state.bannerimg,
      deal_name: this.state.invite_details.name,
      cc_to_fouder:this.state.cc_to_fouder

    };
    Bridge.deal.invite_investors_for_private_deal(obj).then((result) => {
      if (result.status == 1) {
        setTimeout(() => {
          let num = index + 1;
          this.setState({ count: num });
          this.invited_user_one_by_one(params, num, invited_users);
        }, 500);
      } else {
        message.error(result.message);
        this.setState({ invite_form_loader: false });
      }
    });
    // window.location.reload();
  };

  //for pay offline
  payOffline = () => {
    if (this.state.investor_email == "") {
      message.warning("investor email is required");
      return false;
    } else if (this.state.investor_payment_type == "select") {
      message.warning("Payment type is required");
      return false;
    } else if (this.state.investor_investment_amount == "") {
      message.warning("investment amount is required");
      return false;
    } else if (this.state.utr_no_reference_id == "") {
      message.warning("Utr No./ Reference ID is required");
      return false;
    } else if (this.state.investor_payment_date == "") {
      message.warning("Investor Payment Date is required");
      return false;
    } else if (
      this.state.processing_fees == "" &&
      this.state.processing_fees == "0"
    ) {
      message.warning("Invalid Investor Email");
      return false;
    }

    // else if(this.state.attach_file==''){
    //   message.warning("Please Attach file");
    //   return false;
    // }
    this.setState({ formloader: true });
    let formdata = new FormData();
    formdata.append("investor_id", this.state.investor_list[0].investor_id);
    formdata.append("deal_id", this.state.offline_deal_id);
    formdata.append("startup_id", this.state.offline_startup_id);
    formdata.append("investor_email", this.state.investor_email);
    formdata.append("investor_name", this.state.investor_name);
    formdata.append("payment_type", this.state.investor_payment_type);
    formdata.append("investment_amt", this.state.investor_investment_amount);
    formdata.append("reference_id", this.state.utr_no_reference_id);
    formdata.append("payment_dt", this.state.investor_payment_date);
    formdata.append("attach_copy", this.state.attach_file);
    formdata.append("remarks", this.state.investor_payment_remarks);
    formdata.append("processing_fees", this.state.processing_fees);
    formdata.append("igst", this.state.offline_igst);
    formdata.append("sgst", this.state.offline_sgst);
    formdata.append("cgst", this.state.offline_cgst);
    formdata.append("igstvalue", this.state.offline_igstvalue);
    formdata.append("sgstvalue", this.state.offline_sgstvalue);
    formdata.append("cgstvalue", this.state.offline_cgstvalue);
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.deal.add_offline_data(formdata, config).then((result) => {
      if (result.status == "1") {
        // console.log("successfully added");
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
          membership_type: "",
          premium_percentage: "",
          regular_percentage: "",
        });
      } else {
        message.error("failed to add offline payment data");
        this.setState({ show_offline_payment_modal: false, formloader: false });
      }
    });
    //  window.location.reload();
  };
  //cancel post reload
  // cancel_payOffline=()=>{
  //   this.setState({ editModalStatus:false });
  //     window.location.reload();
  // }
  showOfflinePaymentModal = (text) => {
    this.setState({
      show_offline_payment_modal: true,
      offline_deal_id: text.deal_id,
      offline_startup_id: text.startup_id,
    });
  };

  onChangeEmail = () => {
    if (!this.state.investor_email) {
      this.setState({ investor_name: "" });
    }
    let params = {
      email: this.state.investor_email,
    };
    Bridge.deal.get_investor_by_email(params).then((result) => {
      console.log( result.data);
      if (result.status == "1") {
        this.setState({
          investor_name:
            result.data[0].first_name + " " + result.data[0].last_name,
          investor_list: result.data,
          membership_type: result.data[0].membership_type,
          premium_percentage: result.data1[0].premium_member_deal_percentage,
          regular_percentage: result.data1[0].regular_member_deal_percentage,
        });
      } else {
        message.error("Invalid email");
        this.setState({
          investor_name: "",
          membership_type: "",
          premium_percentage: "",
          regular_percentage: "",
        });
      }
    });
  };

  //offline payment on change value of processing fees
  onChangeInvestmentAmount = () => {
    if (this.state.membership_type == "") {
      message.warning("Invalid Investor Email");
      return false;
    }
    let legalfee = "";
    if (this.state.membership_type == "premium") {
      legalfee = parseFloat(
        (this.state.investor_investment_amount / 100) *
        parseFloat(this.state.premium_percentage)
      );
    } else {
      legalfee = parseFloat(
        (this.state.investor_investment_amount / 100) *
        parseFloat(this.state.regular_percentage)
      );
    }
    let processingfees = this.state.investor_investment_amount
      ? legalfee.toFixed(0)
      : 0;
    this.setState({ processing_fees: processingfees });
  };

  //for getting authorized signaroy
  getAuthorizedSignatory = (value) => {
    // console.log(value)
    let params = {
      startup_id: value,
    };
    if (value != "") {
      this.setState({ signer_email: "" });
      this.setState({ signer_name: "" });
      this.setState({ signer_mobile: "" });
      Bridge.admin.get_authorized_signatory_details(params).then((result) => {
        if (result.status == "1") {
          this.setState({ signer_email: result.data[0].email });
          this.setState({
            signer_name:
              result.data[0].first_name + " " + result.data[0].last_name,
          });
          this.setState({ signer_mobile: result.data[0].mobile });
        }
      });
    }
  };

  //for getting authorized signaroy
  get_updated_AuthorizedSignatory = (value) => {
    // console.log(value)
    let params = {
      startup_id: value,
    };
    if (value != "") {
      this.setState({ edit_signer_email: "" });
      this.setState({ edit_signer_mobile: "" });
      this.setState({ edit_signer_name: "" });
      Bridge.admin.get_authorized_signatory_details(params).then((result) => {
        if (result.status == "1") {
          this.setState({ edit_signer_email: result.data[0].email });
          this.setState({
            edit_signer_name:
              result.data[0].first_name + " " + result.data[0].last_name,
          });
          this.setState({ edit_signer_mobile: result.data[0].mobile });
        }
      });
    }
  };
  // show selected item

  selectItem = (item) => {
    let list = this.state.invited_user_list;
    let arr = [];
    for (let single of list) {
      if (single.id == item.id) {
        single.selected = !single.selected;
      }
      arr.push(single);
    }

    this.setState({ invited_user_list: arr });
  };

  toggleallcheck = (e) => {
    this.setState({ selectallstatus: e.target.checked });
    let arr = [];
    let list = this.state.invited_user_list;
    for (let single of list) {
      if (single.isExists == false) {
        single.selected = e.target.checked == true ? true : false;
        arr.push(single);
      } else {
        single.selected = false;
        arr.push(single);
      }
    }
    this.setState({ invited_user_list: arr });
  };

  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.deallist) {
      let obj = {
        "Sr No": count,
        "Deal ID": item.deal_id,
        "Startup Name": item.name,
        "Startup ID": item.startup_id,
        "Deal Name": item.deal_name,
        "Deal Type": item.deal_type,
        "Deal Service": item.deal_service,
        "Deal Show Date(Regular)": item.regular_show_date,
        "Deal Show Date(Premium)": item.premium_show_date,
        "Deal Start Date(Regular)": item.deal_st_date,
        "Deal Start Date(Premium)": item.deal_start_dt_prem,
        "Deal End Date(Regular)": item.deal_end_date,
        "Deal End Date(Premium)": item.deal_end_dt_prem,
        "Target Amount": item.deal_fund_requested,
        "Min Investment Amount": item.Min_inv_amt,
        "Max Investment Amount": item.Max_inv_amt,
        "Multiples Of": item.multiples_of,
        "Number Of Invitations": item.total_invitions,
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

  exportToCSV_CommitList = (fileName) => {
    let arr = [];
    console.log(this.state.commitment_investor_list);
    let count = 1;
    for (let item of this.state.commitment_investor_list) {
      console.log(item);
      let params = {
        id:item.investor_id,
      };
      Bridge.investor.getbankdetails(params).then((result) => {
        console.log(result);
        
      })  
      let obj = {
        "Sr No": count,
        "Name": item.first_name + " " + item.last_name,
        "Legal Name": item.pan_registered_name,
        "Investment Amount": item.amount,
        "Email": item.email,
        "Phone": item.mobile,
        "KYC PAN": item.kyc_pan,
        "KYC Address": item.kyc_address,
        "KYC Father Name": item.kyc_fathername,
        "residential address": item.residential_address,
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Commitment data exported successfully.");
  };

  exportToCSV_startupfounder = (fileName) => {
    let arr = [];
    console.log(this.state.commitment_investor_list);
    let count = 1;
    for (let item of this.state.commitment_investor_list) {
      let obj = {
        "Sr No": count,
        "Investor ID": item.investor_id,
        "Name": item.first_name + " " + item.last_name,
        "Legal Name": item.pan_registered_name,
        "Investment Amount": item.amount,
        "Email": item.email,
        "Phone": item.mobile,
        "KYC PAN": item.kyc_pan,
        "KYC Address": item.kyc_address,
        "KYC Father Name": item.kyc_fathername,
        "residential address": item.residential_address,

      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Commitment data exported successfully.");
  };
  exportToCSV_Reconcillation = (fileName) => {
    let arr = [];
    console.log(this.state.commitment_investor_list);
    let count = 1;
    for (let item of this.state.commitment_investor_list) {
      let obj = {
        "Sr No": count,
        "Name": item.first_name + " " + item.last_name,
        "Investment Amount": item.amount,
        "Fees": item.processingfees,
       
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Commitment data exported successfully.");
  };

  calculategst = () => {
    let legalfee = parseFloat((this.state.ac_amount / 100) * parseFloat(this.state.ac_percentage));
    let gst = this.state.ac_gst;
    let amt = parseFloat(this.state.ac_amount);
    let walletDeductionMoney;

    let discountedMoney = 0;
    if (this.state.ac_checkDiscount) {
      let offerDiscount = parseFloat(this.state.ac_offer_discount);
      discountedMoney = (legalfee * offerDiscount) / 100;
    }

    if (this.state.ac_checkWallet == false) {
      walletDeductionMoney = 0;
    } else {
      walletDeductionMoney =
        legalfee.toFixed(0) <= this.state.ac_walletMoney
          ? legalfee.toFixed(0)
          : this.state.ac_walletMoney;
    }

    legalfee = parseFloat(legalfee).toFixed(0);

    let igst_per, cgst_per, sgst_per, igst_value, cgst_value, sgst_value;

    if(this.state.ac_investor_state == "Maharashtra"){
      igst_per = 0;
      cgst_per = 9;
      sgst_per = 9;

      igst_value = Math.ceil(legalfee * igst_per / 100);
      cgst_value = Math.ceil(legalfee * cgst_per / 100);
      sgst_value = Math.ceil(legalfee * sgst_per / 100);

    }
    else{
      igst_per = 18;
      cgst_per = 0;
      sgst_per = 0;

      igst_value = Math.ceil(legalfee * igst_per / 100);
      cgst_value = Math.ceil(legalfee * cgst_per / 100);
      sgst_value = Math.ceil(legalfee * sgst_per / 100);

    }

    let gstValue = ((parseFloat(legalfee).toFixed(0) - walletDeductionMoney) * gst) / 100;
    let totalAmount = (amt + parseFloat(legalfee)).toFixed(0) - walletDeductionMoney + igst_value + cgst_value + sgst_value;

    legalfee -= discountedMoney;

    this.setState({
      ac_gst: gst,
      ac_legalfee: this.state.ac_amount ? legalfee.toFixed(0) : 0,
      ac_amountplusgst: this.state.ac_amount ? amt.toFixed(0) : 0,
      ac_processingfees: this.state.ac_amount ? legalfee.toFixed(0) : 0,
      ac_totalamount: this.state.ac_amount ? totalAmount.toFixed(0) : 0,
      ac_walletDeductionMoney: walletDeductionMoney,
      ac_gstValue: gstValue,
      ac_DiscountedMoney: discountedMoney,
      ac_igst_percentage: igst_per,
      ac_cgst_percentage: cgst_per,
      ac_sgst_percentage: sgst_per,
      ac_igst_value: igst_value,
      ac_cgst_value: cgst_value,
      ac_sgst_value: sgst_value
    });

    return gst;
  };

  check_for_error = () => {
    let error = "";
    let multiple_of =
      parseFloat(this.state.ac_amount) / parseFloat(this.state.ac_multiples_of);
    if (Number(this.state.ac_amount) < Number(this.state.ac_minamount)) {
      error = `Minimum investment amount is Rs. ${this.state.ac_minamount}`;
      this.setState({ ac_amount_error: error, ac_amount_error_status: true });
    } else if (Number(this.state.ac_amount) > Number(this.state.ac_maxamount)) {
      error = `Maximum investment amount is Rs. ${this.state.ac_maxamount}`;
      this.setState({ ac_amount_error: error, ac_amount_error_status: true });
    } else if (Number(this.state.ac_amount) < Number(this.state.ac_captable_threshold_amount) && Number(this.state.ac_amount) % Number(this.state.ac_multiples_of) != 0) {
      const roundedLowerAmount = Math.floor(Number(this.state.ac_amount) / Number(this.state.ac_multiples_of)) * Number(this.state.ac_multiples_of);
      const roundedHigherAmount = Math.ceil(Number(this.state.ac_amount) / Number(this.state.ac_multiples_of)) * Number(this.state.ac_multiples_of);

      error = `Please enter an amount in multiples of ${this.state.ac_multiples_of}. You may choose Rs ${roundedLowerAmount}
      or Rs ${roundedHigherAmount}.
      If you would like to enter the Captable, commit an amount of Rs. ${this.state.ac_captable_threshold_amount} or more.`;

      this.setState({ ac_amount_error: error, ac_amount_error_status: true });
    } else if (Number(this.state.ac_amount) > Number(this.state.ac_captable_threshold_amount) && Number(this.state.ac_amount) % Number(this.state.ac_captable_multiple_amount) != 0) {
      const roundedLowerAmount = Math.floor(Number(this.state.ac_amount) / Number(this.state.ac_captable_multiple_amount)) * Number(this.state.ac_captable_multiple_amount);
      const roundedHigherAmount = Math.ceil(Number(this.state.ac_amount) / Number(this.state.ac_captable_multiple_amount)) * Number(this.state.ac_captable_multiple_amount);

      error = `Please enter an amount in multiples of ${this.state.ac_captable_multiple_amount}. You may choose Rs ${roundedLowerAmount}
      or Rs ${roundedHigherAmount}.
      If you would like to enter the Captable, commit an amount of Rs. ${this.state.ac_captable_threshold_amount} or more.`;

      this.setState({ ac_amount_error: error, ac_amount_error_status: true });
    } else {
      this.setState({ ac_amount_error: "", ac_amount_error_status: false });
    }
  };
  get_invest_amt = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/get_investor_investment_for_deal`, {
      params: {
        deal_id: this.state.ac_deal_id,
        investor_id: this.state.ac_investor.investor_id
      }
    })
      .then((response) => {
        this.setState({ ac_invest_amt: response.data.data[0].totalamount });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  increase_commit = () => {
    if (this.state.ac_investor_name === "") {
      message.warning(
        "Please Select Investor"
      );
      return;
    }
    if (this.state.ac_investor_state === null) {
      message.warning(
        "Please Select Investor's state"
      );
      return;
    }
    const {
      ac_amount,
      ac_captable_threshold_amount,
      ac_multiples_of,
      ac_maxamount,
      ac_captable_multiple_amount,
      ac_minamount
    } = this.state;

    let newAmount = Number(ac_amount);
    let changeAmount = 0;

    if (
      newAmount < ac_captable_threshold_amount &&
      newAmount % ac_multiples_of != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(ac_multiples_of)) * Number(ac_multiples_of);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (
      newAmount > ac_captable_threshold_amount &&
      newAmount % ac_captable_multiple_amount != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(ac_captable_multiple_amount)) * Number(ac_captable_multiple_amount);
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
        ac_amount: newAmount,
        ac_commaAmount: this.formatNumberWithCommas(newAmount),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  decrease_commit = () => {
    if (this.state.ac_investor_name === "") {
      message.warning(
        "Please Select Investor"
      );
      return;
    }
    if (this.state.ac_investor_state === null) {
      message.warning(
        "Please Select Investor's state"
      );
      return;
    }
    const {
      ac_amount,
      ac_captable_threshold_amount,
      ac_multiples_of,
      ac_minamount,
      ac_captable_multiple_amount,
    } = this.state;

    let newAmount = Number(ac_amount);
    let changeAmount;

    if (
      newAmount == ac_captable_threshold_amount &&
      newAmount % ac_multiples_of != 0
    ) {
      const roundedHigherAmount =
        Math.ceil(newAmount / Number(ac_multiples_of)) * Number(ac_multiples_of);
      newAmount = roundedHigherAmount;
      changeAmount = 0;
    } else if (
      newAmount < ac_captable_threshold_amount &&
      newAmount % ac_multiples_of != 0
    ) {
      const roundedLowerAmount =
        Math.floor(newAmount / Number(ac_multiples_of)) * Number(ac_multiples_of);
      newAmount = roundedLowerAmount;
      changeAmount = 0;
    } else if (
      newAmount > ac_captable_threshold_amount &&
      newAmount % ac_captable_multiple_amount != 0
    ) {
      const roundedLowerAmount =
        Math.floor(newAmount / Number(ac_captable_multiple_amount)) * Number(ac_captable_multiple_amount);
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
        ac_amount: newAmount,
        ac_commaAmount: this.formatNumberWithCommas(newAmount),
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  };

  handleCommitAmount = (value) => {
    if (this.state.ac_investor_name === "") {
      message.warning(
        "Please Select Investor"
      );
      return;
    }
    if (this.state.ac_investor_state == null) {
      message.warning(
        "Please Select State of the investor"
      );
      return;
    }
    this.setState(
      {
        ac_amount: value.replace(/,/g, ''),
        ac_commaAmount: this.formatNumberWithCommas(value)
      },
      () => {
        this.calculategst();
        this.check_for_error();
      }
    );
  }

  formatNumberWithCommas = (number) => {
    return number.toLocaleString('en-IN');
  };

  onChangeInvestorSelect = (value, option) => {
    
    const { data } = option.props;
    console.log(data);
    const fullName = `${data.first_name} ${data.last_name}`;

    this.setState(
      {
        ac_investor: data,
        ac_investor_name: fullName,
        ac_investor_state: data.state
      },
      () => {
        this.get_invest_amt();
        this.check_for_membership_type();
        this.getInterestedID();
      }
    );
  };


  filterOptionInvestorSelect = (input, option) => {
    return option.props.children.toLowerCase().includes(input.toLowerCase());
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

    if (targetName === 'deduct') {
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
      } else {
        let processingfees = parseFloat(
          (this.state.ac_amount / 100) * parseFloat(this.state.ac_percentage)
        );
        this.setState({
          ac_processingfees: processingfees,
          ac_tdsdeductedamount: 0,
        });
      }
    }
  };

  //for getting gst from admin page
  getGst = () => {
    Bridge.admin.settings.getsettings().then((result) => {
      if (result.status == "1") {
        this.setState({ ac_gst: result.data[0].taxation_percentage });
      } else {
        // console.log("gst can not be able to fetch")
      }
    });
  };

  check_for_membership_type = () => {
    this.setState({ formloader: true });
    let params = {
      investor_id: this.state.ac_investor.investor_id,
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

  getordertoken = () => {
    Bridge.getcashfreetoken().then((result) => {
      let orderToken = result.order_token;
      // console.log(orderToken , "Order Token")
      this.setState({ ac_order_token: orderToken });
    });
  };

  // get post list
  getdealsettings = () => {
    this.setState({ formloader: true });
    Bridge.admin.settings.getdealsettings().then((result) => {
      if (result.status == 1) {
        // console.log('result',result.data);
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

  getInterestedID = () => {
    const formData = new FormData();
    formData.append('deal_id', this.state.ac_deal_id);
    formData.append('investor_id', this.state.ac_investor.investor_id);
    axios.post(`${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/save_investor_interest_deal`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        this.setState({
          ac_interested_id: response.data.data,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ac_commit_value = () => {
    const formData = new FormData();
    formData.append('deal_id', this.state.ac_deal_id);
    formData.append('investor_id', this.state.ac_investor.investor_id);
    formData.append('amount', this.state.ac_amount);
    formData.append('processingfees', this.state.ac_processingfees);
    formData.append('totalamount', this.state.ac_totalamount);
    formData.append('deduct', this.state.ac_deduct);
    formData.append('agree', this.state.ac_agree);
    formData.append('order_token', this.state.ac_order_token);
    formData.append('tdsstatus', this.state.ac_tdsstatus);
    formData.append('gst', this.state.ac_gst);
    formData.append('igst', this.state.ac_igst_percentage);
    formData.append('cgst', this.state.ac_cgst_percentage);
    formData.append('sgst', this.state.ac_sgst_percentage);
    formData.append('igstvalue', this.state.ac_igst_value);
    formData.append('cgstvalue', this.state.ac_cgst_value);
    formData.append('sgstvalue', this.state.ac_sgst_value);
    formData.append('legalfee', this.state.ac_legalfee);
    formData.append('interested_id', this.state.ac_interested_id);
    formData.append('walletDeductionMoney', this.state.ac_walletDeductionMoney);
    axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/Deal/save_investor_commitment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        this.setState({
          show_add_commitment_modal: false,
        }, () => {
          axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/Deal/display_investor_commitment_list`, {
            params: {
              deal_id: this.state.ac_deal_id,
            }
          })
            .then(response => {
              this.setState({
                commitment_investor_list: response.data.data,
                commitment_investor_listc: response.data.data,
                loading: false,
              });
            })
            .catch(error => {
              console.error(error);
            });
        });
        message.success("Investor commitment saved successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showEditCommitmentModal = (item, record) => {
    console.log(record);
    this.setState({
      ac_edit_deal_id: record.data.deal_id,
      ac_edit_investor_id: record.data.investor_id,
      ac_edit_amount: record.data.amount,
      ac_edit_processingfees: record.data.processingfees,
      ac_edit_totalamount: record.data.totalamount,
      ac_edit_deduct: record.data.deduct,
      ac_edit_agree: record.data.agree,
      ac_edit_order_token: record.data.order_token,
      ac_edit_tdsstatus: record.data.tdsstatus,
      ac_edit_gst: record.data.gst,
      ac_edit_igst: record.data.igst,
      ac_edit_cgst: record.data.cgst,
      ac_edit_sgst: record.data.sgst,
      ac_edit_igstvalue: record.data.igstvalue,
      ac_edit_cgstvalue: record.data.cgstvalue,
      ac_edit_sgstvalue: record.data.sgstvalue,
      ac_edit_legalfee: record.data.legalfee,
      ac_edit_walletDeductionMoney: record.data.walletDeductionMoney,
      ac_edit_interested_id: record.data.id,
      ac_edit_commitment_id: record.data.id,
      show_edit_commitment_modal: true,
    });
  };

  ac_commit_update = () => {
    if (this.state.ac_edit_amount == "") {
      message.warning("Amount is required");
      return false;
    } else if (this.state.ac_edit_processingfees == "") {
      message.warning("Fee is required");
      return false;
    }
    else if (this.state.ac_edit_igst == "") {
      message.warning("igst is required");
      return false;
    }
    else if (this.state.ac_edit_igstvalue == "") {
      message.warning("igst value is required");
      return false;
    }
    else if (this.state.ac_edit_cgst == "") {
      message.warning("cgst is required");
      return false;
    }
    else if (this.state.ac_edit_cgstvalue == "") {
      message.warning("cgst value is required");
      return false;
    }
    else if (this.state.ac_edit_sgst == "") {
      message.warning("sgst is required");
      return false;
    }
    else if (this.state.ac_edit_sgstvalue == "") {
      message.warning("sgst value is required");
      return false;
    }
    

    const formData = new FormData();
    formData.append('deal_id', this.state.ac_edit_deal_id);
    formData.append('investor_id', this.state.ac_edit_investor_id);
    formData.append('amount', this.state.ac_edit_amount);
    formData.append('processingfees', this.state.ac_edit_processingfees);
    formData.append('totalamount', +this.state.ac_edit_amount + +this.state.ac_edit_processingfees + this.state.ac_edit_igstvalue + this.state.ac_edit_cgstvalue + this.state.ac_edit_sgstvalue);
    formData.append('deduct', this.state.ac_edit_deduct);
    formData.append('agree', this.state.ac_edit_agree);
    formData.append('order_token', this.state.ac_edit_order_token);
    formData.append('tdsstatus', this.state.ac_edit_tdsstatus);
    formData.append('gst', this.state.ac_edit_gst);
    formData.append('igst', this.state.ac_edit_igst);
    formData.append('cgst', this.state.ac_edit_cgst);
    formData.append('sgst', this.state.ac_edit_sgst);
    formData.append('igstvalue', this.state.ac_edit_igstvalue);
    formData.append('cgstvalue', this.state.ac_edit_cgstvalue);
    formData.append('sgstvalue', this.state.ac_edit_sgstvalue);
    formData.append('legalfee', this.state.ac_edit_processingfees);
    formData.append('walletDeductionMoney', this.state.ac_edit_walletDeductionMoney);
    formData.append('interested_id', this.state.ac_edit_interested_id);
    formData.append('commitment_id', this.state.ac_edit_commitment_id);
    axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/Deal/edit_investor_commitment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          show_edit_commitment_modal: false,
        }, () => {
          axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/Deal/display_investor_commitment_list`, {
            params: {
              deal_id: this.state.ac_deal_id,
            }
          })
            .then(response => {
              this.setState({
                commitment_investor_list: response.data.data,
                commitment_investor_listc: response.data.data,
                loading: false,
              });
            })
            .catch(error => {
              console.error(error);
            });
        });
        message.success("Investor commitment Updated successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const filterDealList = this.state.deallist &&
      this.state.deallist.filter((item, index) => {
        // console.log(item)
        return item.deal_status == "Open"

      })
    const dataSource = filterDealList.map((item, index) => {
      return {
        key: index,
        srno: index + 1,
        dealid: item.deal_id,
        startup: item.name ? item.name + " (" + item.startupid + ")" : "---",
        add_regular_show_date: item.regular_show_date
          ? moment(item.regular_show_date).format("DD MMM, YYYY")
          : "---",
        add_premium_show_date: item.premium_show_date
          ? moment(item.premium_show_date).format("DD MMM, YYYY")
          : "---",
        dealStartDtReg: item.deal_st_date
          ? moment(item.deal_st_date).format("DD MMM, YYYY")
          : "---",
        dealStartDtPrem: item.deal_start_dt_prem
          ? moment(item.deal_start_dt_prem).format("DD MMM, YYYY")
          : "---",
        dealEndDtReg: item.deal_end_date
          ? moment(item.deal_end_date).format("DD MMM, YYYY")
          : "---",
        dealEndDtPrem: item.deal_end_dt_prem
          ? moment(item.deal_end_dt_prem).format("DD MMM, YYYY")
          : "---",
        targetamount: item,
        mininvestment: item.Min_inv_amt ? item.Min_inv_amt : "---",
        maxinvestment: item.Max_inv_amt ? item.Max_inv_amt : "---",
        muliplesof: item.Muliples_of ? item.Muliples_of : "---",
        multiplesof: item.multiples_of ? item.multiples_of : "---",
        action: item,
        deal_type: item.deal_type,
        deal_service: item.deal_service,
        deal_name: item.deal_name,
        noofinvitations: item,
        operational_founder: item,
      };
    });
    const invite_users_dataSource =
      this.state.invited_user_list &&
      this.state.invited_user_list.map((item, index) => {
        return {
          checkbox: item,
          key: index,
          srno: index + 1,
          name: item.name ? item.name : "",
          email: item,
          mobile: item.mobile ? item.mobile : "",
          isExists: item,
        };
      });
    const CommitmentdataSource =
      this.state.commitment_investor_list &&
      this.state.commitment_investor_list.map((item, index) => {


        return {
          key: index,
          child: item["0"],
          investor_id: item.investor_id,
          amount: '₹' + item.amount,
          fee: item.processingfees ? '₹' + item.processingfees : '₹0',
          commitment_satus: item.commitment_satus === "committed" ? <Tag color="green">Invested</Tag> : <Tag color="red">Pending</Tag>,
          created_at: item.created_at ? moment(item.created_at).format('D-MMM-YYYY h:mm A') : '',
          name: item.first_name + " " + item.last_name,
          legalname: item.pan_registered_name,
          deal_name: item.deal_name,
          totalamount: item.totalamount,
          data: item,
        };
      });

    const getNestData = (record) => {
      const nestColumns = [
        // {
        //   dataIndex: "nestinvestor_id",
        //   key: "nestinvestor_id",
        //   width: 100,
        // },
        // {
        //   dataIndex: "nestname",
        //   key: "nestname",
        //   width: 100,
        // },
        {
          // dataIndex: "nestdeal_name",
          // key: "nestdeal_name",
          width: 210,
        },
        {
          title: "Amount",
          dataIndex: "nestamount",
          key: "nestamount",
          width: 100,
          align: 'right',
        },
        {
          title: "Fee",
          dataIndex: "nestfee",
          key: "nestfee",
          width: 100,
          align: 'right',
        },
        // {
        //   dataIndex: "nestcommitment_satus",
        //   key: "nestcommitment_satus",
        //   width: 100,
        // },
        {
          title: "Committed on",
          dataIndex: "nestcreated_at",
          key: "nestcreated_at",
          width: 110,
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          fixed: "right",
          width: 100,
          render: (text, record) => {
            const menu = (
              <Menu
                mode="vertical"
                defaultSelectedKeys={[this.state.path]}
                style={{ width: 200 }}
              >
                <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                  <a
                    href="#"
                    onClick={() => this.showEditCommitmentModal(text, record)}
                    style={{ fontSize: 14 }}
                  >
                    &nbsp;&nbsp;Edit
                  </a>
                </Menu.Item>
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
        return {
          key: index,
          nestinvestor_id: item.investor_id,
          nestamount: '₹' + item.amount,
          nestfee: item.processingfees ? '₹' + item.processingfees : '₹0',
          nestcommitment_satus: item.commitment_satus === "committed" ? <Tag color="green">Invested</Tag> : <Tag color="red">Pending</Tag>,
          nestcreated_at: item.created_at ? moment(item.created_at).format('D-MMM-YYYY h:mm A') : '',
          nestname: item.first_name + " " + item.last_name,
          nestdeal_name: item.deal_name,
          data: item,
        }
      });

      return (
        <Table className='table-2'
          dataSource={nestDataSource}
          columns={nestColumns}
          loading={this.state.loading}
          bordered
          pagination={false}
          scroll={{ x: 'max-content' }}
        >
        </Table>
      )
    }

    const invite_users_columns = [
      {
        title: (
          <input
            type="checkbox"
            style={{ cursor: "pointer" }}
            checked={this.state.selectallstatus}
            onChange={this.toggleallcheck}
          />
        ),
        dataIndex: "checkbox",
        key: "checkbox",
        width: 100,
        render: (item) => {
          if (item.isExists == false) {
            return (
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                checked={item.selected == true ? true : false}
                onChange={() => this.selectItem(item)}
              />
            );
          } else {
            return <></>;
          }
        },
      },
      {
        title: "Sr No",
        dataIndex: "srno",
        key: "srno",
        width: 100,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 100,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 100,
        render: (item) => {
          if (item.isExists == false) {
            return <p>{item.email}</p>;
          } else {
            return <p style={{ color: "red" }}>! {item.email} </p>;
          }
        },
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        key: "mobile",
        width: 100,
      },
    ];

    const columns = [
      {
        title: "Sr No",
        dataIndex: "srno",
        key: "srno",
        width: 100,
      },
      {
        title: "Deal ID",
        dataIndex: "dealid",
        key: "dealid",
        width: 100,
      },
      {
        title: "Startup Name (ID)",
        dataIndex: "startup",
        key: "startup",
        width: 180,
      },

      // Added Deal Name Column (shubham)
      {
        title: "Deal Name ",
        dataIndex: "deal_name",
        key: "deal_name",
        width: 180,
      },
      {
        title: "Deal Type",
        dataIndex: "deal_type",
        key: "deal_type",
        width: 100,
      },
      {
        title: "Deal Service",
        dataIndex: "deal_service",
        key: "deal_service",
        width: 100,
      },
      {
        title: "Deal Show Date(Regular)",
        dataIndex: "add_regular_show_date",
        key: "add_regular_show_date",
      },
      {
        title: "Deal Show Date(Premium)",
        dataIndex: "add_premium_show_date",
        key: "add_premium_show_date",
      },
      {
        title: "Deal Start Date(Regular)",
        dataIndex: "dealStartDtReg",
        key: "dealStartDtReg",
      },
      {
        title: "Deal Start Date(Premium)",
        dataIndex: "dealStartDtPrem",
        key: "dealStartDtPrem",
      },
      {
        title: "Deal End Date(Regular)",
        dataIndex: "dealEndDtReg",
        key: "dealEndDtReg",
      },
      {
        title: "Deal End Date(Premium)",
        dataIndex: "dealEndDtPrem",
        key: "dealEndDtPrem",
      },
      {
        title: "Target Amount",
        dataIndex: "targetamount",
        key: "targetamount",
        align: "right",
        render: (text) => {
          var amt = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(text.deal_fund_requested);
          return (
            <div style={{ textAlign: "right" }}>
              {text.deal_fund_requested ? amt : "---"}
            </div>
          );
        },
      },
      {
        title: "Min Investment Amount",
        dataIndex: "mininvestment",
        key: "mininvestment",
        align: "right",
      },
      {
        title: "Max Investment Amount",
        dataIndex: "maxinvestment",
        key: "maxinvestment",
        align: "right",
      },
      {
        title: "Multiples Of",
        dataIndex: "multiplesof",
        key: "multiplesof",
        align: "right",
      },
      {
        title: "Number Of Invitations",
        dataIndex: "noofinvitations",
        key: "noofinvitations",
        render: (text, record) => {
          if (Number(text.total_invitions) > 0) {
            return (
              <div>
                {Number(text.total_invitions) > 0 && (
                  <Invitation_list
                    deal_id={text.deal_id}
                    total_invitions={text.total_invitions}
                  />
                )}
              </div>
            );
          } else {
            return "0";
          }
        },
      },
      {
        title: "Description",
        dataIndex: "muliplesof",
        key: "muliplesof",
        render: (text, record) => {
          // return  <div>{description}</div>;
          let description =
            record.muliplesof.length > 30
              ? record.muliplesof.substring(0, 30) + "..."
              : record.muliplesof;

          let all_description = record.muliplesof;

          return <Tooltip title={all_description}>{description}</Tooltip>;
        },
      },

      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          const menu = (
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.state.path]}
              style={{ width: 200 }}
            >
              <Menu.Item key={`Update${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showupdatemodal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Update Status
                </a>
              </Menu.Item>
              <DealPitches data={text} key={record.key} />
              <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showEditModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
              <Menu.Item key={`ViewCommitment${record.key}`} icon={<EyeOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showCommitmentModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;View Commitments
                </a>
              </Menu.Item>
              {/* {text.deal_type == "Private" && ( */}
              <Menu.Item key={`invite_${record.key}`} icon={<UserOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showInviteInvestorModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Invite Investors
                </a>
              </Menu.Item>
              {/* )} */}
              <Menu.Item
                key={`offline_${record.key}`}
                icon={<PayCircleOutlined />}
              >
                <a
                  href="#"
                  onClick={() => this.showOfflinePaymentModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Offline Payment
                </a>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  const linkToCopy = `https://growth91.com${text.page_link}`;
                  navigator.clipboard.writeText(linkToCopy);
                  message.success(`Copied link to clipboard: ${linkToCopy}`);
                }}
                key={`share${record.key}`}
                icon={<ShareAltOutlined />}
              >
                <p style={{ fontSize: 14 }}>&nbsp;&nbsp;Copy URL</p>
              </Menu.Item>

              {/* <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined />}>
                <a
                  href="#"
                  style={{ fontSize: 14 }}
                  onClick={() => this.showDeleteModal(text)}
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

    const Commitmentcolumns = [
      {
        title: "Investor ID",
        dataIndex: "investor_id",
        key: "investor_id",
        width: 100,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 100,
      },
      {
        title: "Legal Name",
        dataIndex: "legalname",
        key: "legalname",
        width: 100,
      },
      // {
      //   title: "Total Commitment	",
      //   dataIndex: "totalamount",
      //   key: "totalamount",
      //   width: 100,
      // },
      {
        title: "Total Amount",
        dataIndex: "amount",
        key: "amount",
        width: 100,
        align: 'right',
      },
      {
        title: "Total Fees",
        dataIndex: "fee",
        key: "fee",
        width: 100,
        align: 'right',
      },
      // {
      //   title: "Deal Name",
      //   dataIndex: "deal_name",
      //   key: "deal_name",
      //   width: 100,
      // },
      {
        title: "Commitment Status",
        dataIndex: "commitment_satus",
        key: "commitment_satus",
        width: 100,
      },
      // {
      //   title: "Commitment AT",
      //   dataIndex: "created_at",
      //   key: "created_at",
      //   width: 100,
      // },
     
    // ];
    // (localStorage.getItem("super_admin") === "1" &&
    // Commitmentcolumns.push( 
       {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text, record) => {
        const menu = (
          <Menu
            mode="vertical"
            defaultSelectedKeys={[this.state.path]}
            style={{ width: 200 }}
          >
            {/* {localStorage.getItem("super_admin") === "1" ? ( */}
              <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showEditCommitmentModal(text, record)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
            {/* )  */}
            {/* : (
              ""
            ) */}
            {/* } */}
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
    } ]
  // ))

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
              <Card
                title="Open Deals"
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({ show_eligibility_modal: true });
                    }}
                  >
                    <i
                      className="bx bxs-plus-circle"
                      style={{
                        color: "#fff",
                        position: "relative",
                        top: 3,
                        left: -3,
                      }}
                    ></i>{" "}
                    Add New Deal
                  </Button>
                }
                style={{ margin: 16 }}
              >
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Open Deals</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Input
                    placeholder="Search"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                  <Button
                    type="primary"
                    onClick={() => this.exportToCSV("Deals Overview")}
                  >
                    <i
                      className="bx bxs-cloud-download"
                      style={{
                        color: "#fff",
                        position: "relative",
                        top: 3,
                        left: -3,
                      }}
                    ></i>{" "}
                    Export Data
                  </Button>
                </div>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  loading={this.state.loading}
                  bordered
                  scroll={{ x: "max-content" }}
                />
              </Card>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>
        {/* Start Eligibility modal  */}
        <Modal
          title="Confirmation Of Eligibility to Raise Funds"
          visible={this.state.show_eligibility_modal}
          onOk={this.addConfirmation}
          okText="Confirm"
          onCancel={() =>
            this.setState({
              show_eligibility_modal: false,
              confirmation: "",
              eligibility_date: "",
              eligibility_remarks: "",
            })
          }
          width={400}
        >
          <div className="form-group">
            <label className="mb-2">
              Eligible to raise funds <span className="text-danger">*</span>
            </label>
            &nbsp;&nbsp;&nbsp;
            <Checkbox
              checked={this.state.confirmation}
              onChange={(e) =>
                this.setState({ confirmation: e.target.checked })
              }
            ></Checkbox>
          </div>
          <div className="form-group mt-3">
            <label className="mb-2">
              Date <span className="text-danger">*</span>
            </label>
            <DatePicker
              value={this.state.eligibility_date}
              onChange={(date, dateString) =>
                this.setState(
                  { eligibility_date: date }
                  // console.log(this.state.eligibility_date)
                )
              }
              style={{ width: "100%" }}
            />
          </div>
          <div className="form-group mt-3">
            <label className="mb-2">Remarks</label>
            <TextArea
              rows={4}
              value={this.state.eligibility_remarks}
              onChange={(e) =>
                this.setState({ eligibility_remarks: e.target.value })
              }
              style={{ width: "100%" }}
            />
          </div>
        </Modal>
        {/* End Eligibility modal  */}

        {/* Start Add modal  */}
        <Modal
          title="Add New Deal"
          visible={this.state.addModalStatus}
          onOk={this.adddeal}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          // onCancel={this.cancel_adddeal}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Startup Name <span className="text-danger">*</span>
              </label>

              <Select
                defaultValue={this.state.startupname}
                value={this.state.startupname}
                style={{
                  width: "100%",
                }}
                onChange={(value) =>
                  this.setState(
                    { startupname: value },
                    this.getAuthorizedSignatory(value)
                  )
                }
              >
                {this.state.startups &&
                  this.state.startups.map((item, index) => {
                    return (
                      <Option value={item.startupid} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
            <div className="form-group">
              <label className="mb-2">
                Deal Name <span className="text-danger">*</span>
              </label>

              <Input
                type="text"
                value={this.state.deal_name}
                onChange={(e) => this.setState({ deal_name: e.target.value })}
              />
            </div>
            <div className="form-group-mt-3">
              <label className="mb-2">
                Deal Type<span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.add_dealtype}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ add_dealtype: value });
                }}
              >
                <Option value="Public">Public</Option>
                <Option value="Private">Private</Option>
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Startup Founder Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.signer_name}
                readOnly
                onChange={(e) => this.setState({ signer_name: e.target.value })}
              />
            </div>
            <div className="form-group-mt-3">
              <label className="mb-2">
              Instrument type<span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.deal_service}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ deal_service: value });
                }}
              >
                <Option value="CCD">CCD</Option>
                <Option value="CCPS">CCPS</Option>
                <Option value="CCD/CCPS">CCD/CCPS</Option>
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Startup Founder Mobile Number{" "}
                <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.signer_mobile}
                readOnly
                onWheel={() => document.activeElement.blur()}
                onChange={(e) =>
                  this.setState({ signer_mobile: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Startup Founder Email <span className="text-danger">*</span>
              </label>
              <Input
                type="email"
                value={this.state.signer_email}
                readOnly
                onChange={(e) =>
                  this.setState({ signer_email: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Deal Show Date For Regular Member</label>
              <DatePicker
                onChange={(date, dateString) =>
                  this.setState({ add_regular_show_date: date })
                }
                value={this.state.add_regular_show_date}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Deal Show Date For Premium Member</label>
              <DatePicker
                onChange={(date, dateString) =>
                  this.setState({ add_premium_show_date: date })
                }
                value={this.state.add_premium_show_date}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal Start Date For Regular Member{" "}
                <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeStartDate}
                value={this.state.dealStartDtReg}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal Start Date For Premium Member{" "}
                <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeStartDtPremium}
                value={this.state.dealStartDtPrem}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal End Date For Regular Member
                <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeEndDate}
                value={this.state.dealEndDtReg}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal End Date For Premium Member{" "}
                <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeEndDtPremium}
                value={this.state.dealEndDtPrem}
                style={{ width: "100%" }}
              />
            </div>

            <div className="mt-4 editor-field">
              <label className="mb-2">
                Target Amount <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.targetamount}
                onWheel={() => document.activeElement.blur()}
                onChange={(e) =>
                  this.setState({ targetamount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
              Minimum Investment Amount Per CCD <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.mintargetamount}
                onChange={(e) =>
                  this.setState({ mintargetamount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
              Minimum Amount Per CCPS <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.captable_threshold_amount}
                onChange={(e) =>
                  this.setState({ captable_threshold_amount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
              Max Investment by Single Investor <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.maxtargetamount}
                onChange={(e) =>
                  this.setState({ maxtargetamount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
              Share Price Per CCPS<span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.captable_multiple_amount}
                onChange={(e) =>
                  this.setState({ captable_multiple_amount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
              Share Price Per CCD <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.add_multiples_of}
                onChange={(e) =>
                  this.setState({ add_multiples_of: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                %Raise Gap(Starting Seed) <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.raiseGap}
                onChange={(e) => this.setState({ raiseGap: e.target.value })}
              />
            </div>
            <div className="mt-4 d-flex flex-row-reverse justify-content-end">
              <label className="mx-2" for="SpecialOffer" >
                Enable Special Offer
              </label>
              <input
                type="checkbox"
                id="SpecialOffer"
                checked={this.state.enable_special_offer}
                onChange={(e) =>
                  this.setState({ enable_special_offer: e.target.checked })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Special Offer Text
              </label>
              <Input
                type="text"
                name="special_offer_text"
                value={this.state.special_offer_text}
                onChange={(e) =>
                  this.setState({ special_offer_text: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Input Default Text
              </label>
              <Input
                type="text"
                name="default_special_offer_text"
                value={this.state.default_special_offer_text}
                onChange={(e) =>
                  this.setState({ default_special_offer_text: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">%Discount</label>
              <Input
                type="number"
                value={this.state.offer_discount}
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => this.setState({ offer_discount: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Escrow Account Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                name="escrow_account_name"
                value={this.state.escrow_account_name}
                onChange={(e) =>
                  this.setState({ escrow_account_name: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Escrow Account Number <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.escrowAct}
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => this.setState({ escrowAct: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Escrow Account Bank <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                name="escrow_account_bank"
                value={this.state.escrow_account_bank}
                onChange={(e) =>
                  this.setState({ escrow_account_bank: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Escrow Account Branch <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                name="escrow_account_branch"
                value={this.state.escrow_account_branch}
                onChange={(e) =>
                  this.setState({ escrow_account_branch: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Escrow Account IFSC <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.escrow_account_ifsc}
                onChange={(e) =>
                  this.setState({ escrow_account_ifsc: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Digio Template Id <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.digioTemplateId}
                onChange={(e) =>
                  this.setState({ digioTemplateId: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Digio Sign Co-Ordinates for Investor
                <span className="text-danger">*</span>
              </label>
              <br />
              <TextArea
                rows={6}
                placeholder='{
             "1":[
                   {
                     "llx": 415.9997340569878,
                     "lly": 100.00795283018864,
                     "urx": 555.9988860244233,
                    "ury": 139.9996981132075
                    }
                 ]
                }'
                value={this.state.investor_sign_coordinate}
                onChange={(e) =>
                  this.setState({ investor_sign_coordinate: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Digio Sign Co-Ordinates for Founder
                <span className="text-danger">*</span>
              </label>
              <br />
              <TextArea
                rows={6}
                placeholder='{
                "1":[
               {
                "llx": 43.9997340569878,
                "lly": 123.00795283018864,
                "urx": 533.9988860244233,
                "ury": 123.9996981132075
                }
                  ]
              }'
                value={this.state.founder_sign_coordinate}
                onChange={(e) =>
                  this.setState({ founder_sign_coordinate: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Deal Description <span className="text-danger">*</span>
              </label>
              <TextArea
                rows={4}
                value={this.state.multipleofdescription}
                onChange={(e) =>
                  this.setState({ multipleofdescription: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Backed By</label>
              <Input
                type="text"
                value={this.state.backedby}
                onChange={(e) => this.setState({ backedby: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Youtube Link</label>
              <Input
                type="text"
                value={this.state.youtubelink}
                onChange={(e) => this.setState({ youtubelink: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Category <span className="text-danger">*</span>
              </label>

              <Select
                value={this.state.category}
                style={{ width: "100%" }}
                onChange={this.handleChangeSelected}
                mode="multiple"
                allowClear
              >
                <Option value="">--Select--</Option>
                <Option value="Fashion">Fashion</Option>
                <Option value="Edtech">Edtech</Option>
                <Option value="HealthTech">HealthTech</Option>
                <Option value="FinTech">FinTech</Option>
                <Option value="Artificial Intelligence">
                  Artificial Intelligence
                </Option>
                <Option value="Augumented Reality">Augumented Reality</Option>
                <Option value="Virtual Reality">Virtual Reality</Option>
                <Option value="Blockchain">Blockchain</Option>
                <Option value="E-commerce">E-commerce</Option>
                <Option value="InsurTech">InsurTech</Option>
                <Option value="Electric Vehicles">Electric Vehicles</Option>
                <Option value="Foods & Beverages">Foods & Beverages</Option>
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                <Option value="AgriTech">AgriTech</Option>
                <Option value="SaaS">SaaS</Option>
                <Option value="Entertainment">Entertainment</Option>
                <Option value="D2C">D2C</Option>
                <Option value="Finance">Finance</Option>
                <Option value="MediaTech">MediaTech</Option>
                <Option value="News and Publication">News and Publication</Option>
                <Option value="AYUSH">AYUSH</Option>
                <Option value="Cyber Security">Cyber Security</Option>
                <Option value="Industry Procurement">Industry Procurement</Option>
              </Select>
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Banner Image <span className="text-danger">*</span>
              </label>
              <Input
                type="file"
                onChange={(e) => this.onChangeFile(e, "banner")}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Select Logo <span className="text-danger">*</span>
              </label>
              <Input
                type="file"
                onChange={(e) => this.onChangeFile(e, "logo")}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">Page Link</label>
              <Input
                type="text"
                value={this.state.page_link}
                onChange={(e) => this.setState({ page_link: e.target.value })}
              />
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">Vendor Id</label>
              <Input
                type="text"
                value={this.state.add_vendor_id}
                onChange={(e) =>
                  this.setState({ add_vendor_id: e.target.value })
                }
              />
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start Edit modal  */}
        <Modal
          title="Update Deal"
          visible={this.state.editModalStatus}
          onOk={this.updatedeal}
          okText="Update"
          // onCancel={this.cancel_updatedeal}
          onCancel={() => this.setState({ editModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
          
            <div className="form-group">
              <label className="mb-2">
                Startup Name <span className="text-danger">*</span>
              </label>

              <Select
                defaultValue={this.state.editstartupname}
                value={this.state.editstartupname}
                style={{
                  width: "100%",
                }}
                onChange={(value) =>
                  this.setState(
                    { editstartupname: value },
                    this.get_updated_AuthorizedSignatory(value)
                  )
                }
              >
                {this.state.startups &&
                  this.state.startups.map((item, index) => {
                    return (
                      <Option value={item.startupid} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
            
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                defaultValue={this.state.edit_deal_name}
                value={this.state.edit_deal_name}
                onChange={(e) =>
                  this.setState({ edit_deal_name: e.target.value })
                }
              />
            </div>
            <div className="form-group-mt-3">
              <label className="mb-2">
                Deal Type<span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.add_dealtype}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ edit_deal_type: value });
                }}
              >
                <Option value="Public">Public</Option>
                <Option value="Private">Private</Option>
              </Select>
            </div>
            <div className="form-group-mt-3">
              <label className="mb-2">
              Instrument type<span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.edit_deal_service}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ edit_deal_service: value });
                }}
              >
                <Option value="CCD">CCD</Option>
                <Option value="CCPS">CCPS</Option>
                <Option value="CCD/CCPS">CCD/CCPS</Option>
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Startup Founder Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.edit_signer_name}
                readOnly
                onChange={(e) =>
                  this.setState({ edit_signer_name: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Startup Founder Mobile Number{" "}
                <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.edit_signer_mobile}
                readOnly
                onChange={(e) =>
                  this.setState({ edit_signer_mobile: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Startup Founder Email <span className="text-danger">*</span>
              </label>
              <Input
                type="email"
                value={this.state.edit_signer_email}
                readOnly
                onChange={(e) =>
                  this.setState({ edit_signer_email: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Deal Show Date Regular</label>
              <DatePicker
                onChange={(date, dateString) =>
                  this.setState({ edit_regular_show_date: date })
                }
                value={this.state.edit_regular_show_date}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Deal Show Date For Premium Member </label>
              <DatePicker
                onChange={(date, dateString) =>
                  this.setState({ edit_premium_show_date: date })
                }
                value={this.state.edit_premium_show_date}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal Start Date For Regular Member{" "}
                <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeStartDateEdit}
                value={this.state.editdealStartDtReg}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal Start Date For Premium Member{" "}
                <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeStartDtPremEdit}
                value={this.state.editdealStartDtPrem}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal End Date For Regular Member{" "}
                <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeEndDateEdit}
                value={this.state.editdealEndDtReg}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Deal End Date For Premium Member{" "}
                <span className="text-danger">*</span>
              </label>
              <DatePicker
                onChange={this.onChangeEndDtPremEdit}
                value={this.state.editdealEndDtPrem}
                style={{ width: "100%" }}
              />
            </div>

            <div className="mt-4 editor-field">
              <label className="mb-2">
                Target Amount <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.edittargetamount}
                onChange={(e) =>
                  this.setState({ edittargetamount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Minimum Investment Amount Per CCD<span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.editmintargetamount}
                onChange={(e) =>
                  this.setState({ editmintargetamount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
              Minimum Amount Per CCPS <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.editcaptable_threshold_amount}
                onChange={(e) =>
                  this.setState({ editcaptable_threshold_amount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
              Max Investment by Single Investor <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.editmaxtargetamount}
                onChange={(e) =>
                  this.setState({ editmaxtargetamount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Share Price Per CCPS <span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.editcaptable_multiple_amount}
                onChange={(e) =>
                  this.setState({ editcaptable_multiple_amount: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2"> Share Price Per CCD</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.edit_multiples_of}
                onChange={(e) =>
                  this.setState({ edit_multiples_of: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">%Raise Gap(Starting Seed) </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.editraiseGap}
                onChange={(e) =>
                  this.setState({ editraiseGap: e.target.value })
                }
              />
            </div>
            <div className="mt-4 d-flex flex-row-reverse justify-content-end">
              <label className="mx-2" for="SpecialOffer" >
                Enable Special Offer
              </label>
              <input
                type="checkbox"
                id="SpecialOffer"
                checked={this.state.editenable_special_offer}
                onChange={(e) =>
                  this.setState({ editenable_special_offer: e.target.checked })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Special Offer Text
              </label>
              <Input
                type="text"
                name="special_offer_text"
                value={this.state.editspecial_offer_text}
                onChange={(e) =>
                  this.setState({ editspecial_offer_text: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Input Default Text
              </label>
              <Input
                type="text"
                name="default_special_offer_text"
                value={this.state.editdefault_special_offer_text}
                onChange={(e) =>
                  this.setState({ editdefault_special_offer_text: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">%Discount</label>
              <Input
                type="number"
                value={this.state.editoffer_discount}
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => this.setState({ editoffer_discount: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Escrow Account Name <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                name="escrow_account_name"
                value={this.state.edit_escrow_account_name}
                onChange={(e) =>
                  this.setState({ edit_escrow_account_name: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Escrow Account Number</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.editescrowAct}
                onChange={(e) =>
                  this.setState({ editescrowAct: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Escrow Account Bank <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                name="escrow_account_bank"
                value={this.state.edit_escrow_account_bank}
                onChange={(e) =>
                  this.setState({ edit_escrow_account_bank: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Escrow Account Branch <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                name="escrow_account_branch"
                value={this.state.edit_escrow_account_branch}
                onChange={(e) =>
                  this.setState({ edit_escrow_account_branch: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Escrow Account IFSC</label>
              <Input
                type="text"
                value={this.state.edit_escrow_account_ifsc}
                onChange={(e) =>
                  this.setState({ edit_escrow_account_ifsc: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Digio Templated Id<span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.editdigioTemplateId}
                onChange={(e) =>
                  this.setState({ editdigioTemplateId: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Digio Sign Co-Ordinates For Investor{" "}
                <span className="text-danger">*</span>
              </label>
              <TextArea
                placeholder='{
             "1":[
                   {
                     "llx": 415.9997340569878,
                     "lly": 100.00795283018864,
                     "urx": 555.9988860244233,
                    "ury": 139.9996981132075
                    }
                 ]
                }'
                rows={6}
                value={this.state.edit_investor_sign_coordinate}
                onChange={(e) =>
                  this.setState({
                    edit_investor_sign_coordinate: e.target.value,
                  })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Digio Sign Co-Ordinates For Founder{" "}
                <span className="text-danger">*</span>
              </label>
              <TextArea
                placeholder='{
                "1":[
               {
                "llx": 43.9997340569878,
                "lly": 123.00795283018864,
                "urx": 533.9988860244233,
                "ury": 123.9996981132075
                }
                  ]
              }'
                rows={6}
                value={this.state.edit_founder_sign_coordinate}
                onChange={(e) =>
                  this.setState({
                    edit_founder_sign_coordinate: e.target.value,
                  })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Deal Description <span className="text-danger">*</span>
              </label>
              <TextArea
                rows={4}
                value={this.state.editmultipleofdescription}
                onChange={(e) =>
                  this.setState({ editmultipleofdescription: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Backed By</label>
              <Input
                type="text"
                value={this.state.editbackedby}
                onChange={(e) =>
                  this.setState({ editbackedby: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Youtube Link</label>
              <Input
                type="text"
                value={this.state.edityoutubelink}
                onChange={(e) =>
                  this.setState({ edityoutubelink: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Category <span className="text-danger">*</span>
              </label>

              <Select
                value={this.state.editcategory}
                style={{ width: "100%" }}
                onChange={this.handleChangeSelectededit}
                mode="multiple"
                allowClear
              >
                <Option value="">--Select--</Option>
                <Option value="Fashion">Fashion</Option>
                <Option value="Edtech">Edtech</Option>
                <Option value="HealthTech">HealthTech</Option>
                <Option value="FinTech">FinTech</Option>
                <Option value="Artificial Intelligence">
                  Artificial Intelligence
                </Option>
                <Option value="Augumented Reality">Augumented Reality</Option>
                <Option value="Virtual Reality">Virtual Reality</Option>
                <Option value="Blockchain">Blockchain</Option>
                <Option value="E-commerce">E-commerce</Option>
                <Option value="InsurTech">InsurTech</Option>
                <Option value="Electric Vehicles">Electric Vehicles</Option>
                <Option value="Foods & Beverages">Foods & Beverages</Option>
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                <Option value="AgriTech">AgriTech</Option>
                <Option value="SaaS">SaaS</Option>
                <Option value="Entertainment">Entertainment</Option>
                <Option value="D2C">D2C</Option>
                <Option value="Finance">Finance</Option>
                <Option value="MediaTech">MediaTech</Option>
                <Option value="News and Publication">News and Publication</Option>
                <Option value="AYUSH">AYUSH</Option>
                <Option value="Cyber Security">Cyber Security</Option>
                <Option value="Industry Procurement">Industry Procurement</Option>
                <Option value="Digital Content Generation and Photography Industry">Digital Content Generation and Photography Industry</Option>
                <Option value="HR Tech">HR Tech</Option>
              </Select>
            </div>
            <div className="mt-4">
              <label className="mb-2 w-100">
                Banner Image <span className="text-danger">*</span>
              </label>
              {this.state.bannerurl && (
                <img
                  src={this.state.bannerurl}
                  style={{ maxWidth: 200 }}
                  className="mb-2"
                />
              )}
              <Input
                type="file"
                onChange={(e) => this.onChangeEditFile(e, "banner")}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </div>
            <div className="mt-4">
              <label className="mb-2 w-100">
                Select Logo <span className="text-danger">*</span>
              </label>
              {this.state.logourl && (
                <img
                  src={this.state.logourl}
                  style={{ maxWidth: 200 }}
                  className="mb-2"
                />
              )}
              <Input
                type="file"
                onChange={(e) => this.onChangeEditFile(e, "logo")}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">Page Link</label>
              <Input
                type="text"
                value={this.state.edit_page_link}
                onChange={(e) =>
                  this.setState({ edit_page_link: e.target.value })
                }
              />
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">Vendor Id</label>
              <Input
                type="text"
                value={this.state.edit_vendor_id}
                onChange={(e) =>
                  this.setState({ edit_vendor_id: e.target.value })
                }
              />
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Delete deal"
          visible={this.state.deleteModalStatus}
          onOk={this.deletedeal}
          okText="Delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to delete te deal?
            </p>
          </Spin>
        </Modal>
        {/* End delete modal  */}

        {/* Start update status modal  */}
        <Modal
          title="Update Status"
          visible={this.state.updatemodalstatus}
          onOk={this.updatestatus}
          okText="Update"
          onCancel={() => this.setState({ updatemodalstatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <div className="mt-4">
              <label className="mb-2">
                {" "}
                Approve / Pending Status<span className="text-danger">*</span>
              </label>

              <Select
                value={this.state.approvestatus}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ approvestatus: value });
                }}
              >
                <Option value="">--Select--</Option>
                <Option value="Approved">Approved</Option>
                <Option value="Pending">Pending</Option>
              </Select>
            </div>
            <div className="mt-4">
              <label className="mb-2">
                {" "}
                Deal Status<span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.dealstatus}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ dealstatus: value });
                }}
              >
                <Option value="">--Select--</Option>
                <Option value="Open">Open</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            </div>

            <div className="mt-4">
              <label className="mb-2">
                {" "}
                Deal Show Status<span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.show_status}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ show_status: value });
                }}
              >
                <Option value="">--Select--</Option>
                <Option value="1">Enable</Option>
                <Option value="0">Disable</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End update status modal  */}

        {/* Start invite modal  */}
        <Modal
          title={"Invite Investors for deal : " + this.state.invite_deal_titile}
          visible={this.state.invite_modal_status}
          onOk={this.invite_investor}
          onCancel={this.close_invite_modal}
          okText="Invite"
        >
          <Spin spinning={this.state.invite_form_loader}>
            <div>
              <div className="mt-4 editor-field">
                <label className="mb-2">Name</label>
                <Input
                  type="text"
                  value={this.state.invite_name}
                  name="invite_name"
                  onChange={(e) => this.handleChangeInputs(e)}
                  disabled={this.state.input_status == true ? true : false}
                />
              </div>
              <div className="mt-4 editor-field">
                <label className="mb-2">Email</label>
                <Input
                  type="email"
                  value={this.state.invite_email}
                  name="invite_email"
                  onChange={(e) => this.onInviteChangeEmail(e.target.value)}
                  disabled={this.state.input_status == true ? true : false}
                />
              </div>
              <div className="mt-4 editor-field">
                <label className="mb-2">Mobile</label>
                <Input
                  type="number"
                  onWheel={() => document.activeElement.blur()}
                  value={this.state.invite_mobile}
                  name="invite_mobile"
                  onChange={(e) => this.handleChangeInputs(e)}
                  disabled={this.state.input_status == true ? true : false}
                />
              </div>
      
            </div>
            <div
              style={{
                position: "relative",
                margin: "35px 0",
              }}
            >
              <p
                style={{
                  position: "absolute",
                  top: -15,
                  left: "47%",
                  backgroundColor: "#ffffff",
                  padding: "0 12px",
                  zindex: 9,
                }}
              >
                OR
              </p>
              <hr />
            </div>
            <div>
              <Card
                title="Bulk Invite"
                extra={
                  <Button type="primary" onClick={this.download_sample_file}>
                    Download Sample Xlsx
                  </Button>
                }
              >
                <div className="mt-4">
                  <label className="mb-2 w-100">
                    Select Xlsx File <span className="text-danger">*</span>{" "}
                    <span className="text-danger">(Select xlsx file only)</span>
                  </label>
                  <div
                    style={{
                      pointerEvents:
                        this.state.input_file_status == true ? "none" : false,
                      background:
                        this.state.input_file_status == true
                          ? "#d9d9d96e"
                          : "#fff",
                      padding: "0 16px 17px 9px",
                      margin: 0,
                      cursor:
                        this.state.input_file_status == true
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    <SheetJSApp dataTrigger={this.dataTrigger} />
                  </div>
                </div>
                {this.state.invited_user_list.length > 0 && (
                  <div>
                    <hr />
                    <h5
                      style={{
                        marginBottom: 23,
                        paddingLeft: 4,
                        paddingTop: 13,
                      }}
                    >
                      Invite User list:{" "}
                    </h5>

                    <Spin
                      spinning={this.state.bulk_user_loader}
                      tip={`${this.state.count}/${this.state.invited_user_list_count}`}
                    >
                      <Table
                        dataSource={invite_users_dataSource}
                        columns={invite_users_columns}
                        loading={this.state.loading}
                        bordered
                        scroll={{ x: "max-content" }}
                        pagination={false}
                      />
                    </Spin>
                  </div>
                )}
              </Card>
                  <div className="mt-4 editor-field d-flex align-items-center">
                <label className="mb-2">CC to founder</label>
                <input
                  type="checkbox"
                  value={this.state.cc_to_fouder}
                  name="cc_to_fouder"
                  onChange={(e) => this.togglecc(e)}
                  // disabled={this.state.input_status == true ? true : false}
                />
              </div>
            </div>
          </Spin>
        </Modal>
        {/* End invite modal  */}

        {/* offline payment */}
        <Modal
          title="Offine Payment"
          visible={this.state.show_offline_payment_modal}
          onOk={this.payOffline}
          okText="Submit"
          onCancel={() =>
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
            })
          }
        >
          <Spin spinning={this.state.formloader}>
            <div className="mt-4">
              <label className="mb-2">
                Investor Email<span className="text-danger">*</span>
              </label>
              <Input
                type="email"
                value={this.state.investor_email}
                onChange={(e) =>
                  this.setState({ investor_email: e.target.value }, () =>
                    this.onChangeEmail()
                  )
                }
              />
            </div>

            <div className="mt-4">
              <label className="mb-2">
                Investor Name<span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.investor_name}
                readOnly
                onChange={(e) =>
                  this.setState({ investor_name: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="mb-2">
                Payment Type<span className="text-danger">*</span>
              </label>
              <Select
                value={this.state.investor_payment_type}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ investor_payment_type: value });
                }}
              >
                <Option value="select">--Select--</Option>
                <Option value="Cheque">Cheque</Option>
                <Option value="Cash">Cash</Option>
                <Option value="Postal Order">Postal Order</Option>
                <Option value="Demand draft">Demand draft</Option>
                <Option value="PG payment link">PG payment link</Option>
                <Option value="IMPS">IMPS</Option>
                <Option value="NEFT">NEFT</Option>
              </Select>
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Investment Amount<span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.investor_investment_amount}
                onChange={(e) =>
                  this.setState(
                    { investor_investment_amount: e.target.value },
                    () => this.onChangeInvestmentAmount()
                  )
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                igst Percentage
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.offline_igst}
                onChange={(e) =>
                  this.setState(
                    { 
                      offline_igst: e.target.value,
                    }
                  )
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                igst Value
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.offline_igstvalue}
                onChange={(e) =>
                  this.setState(
                    { offline_igstvalue: e.target.value }
                  )
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                cgst Percentage
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.offline_cgst}
                onChange={(e) =>
                  this.setState(
                    { offline_cgst: e.target.value }
                  )
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                cgst Value
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.offline_cgstvalue}
                onChange={(e) =>
                  this.setState(
                    { offline_cgstvalue: e.target.value }
                  )
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                sgst Percentage
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.offline_sgst}
                onChange={(e) =>
                  this.setState(
                    { offline_sgst: e.target.value }
                  )
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                sgst Value
              </label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.offline_sgstvalue}
                onChange={(e) =>
                  this.setState(
                    { offline_sgstvalue: e.target.value }
                  )
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Convenience Fees<span className="text-danger">*</span>
              </label>
              <Input
                type="number"
                value={this.state.processing_fees}
                onChange={(e) =>
                  this.setState({ processing_fees: e.target.value })
                }
              // readOnly
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                UTR No./ Reference ID<span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                value={this.state.utr_no_reference_id}
                onChange={(e) =>
                  this.setState({ utr_no_reference_id: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Date<span className="text-danger">*</span>
              </label>
              <DatePicker
                value={this.state.investor_payment_date}
                onChange={(date, dateString) =>
                  this.setState({ investor_payment_date: date })
                }
                style={{ width: "100%" }}
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
                    attachment_preview: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
              {this.state.attachment_preview && (
                <a
                  href={this.state.attachment_preview}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={this.state.attachment_preview}
                    height="120"
                    width="120"
                    alt="click here"
                  />{" "}
                </a>
              )}
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
        {/* end offline payment */}

        {/* Start commitment list modal  */}
        <Modal
          title={
            <div className="d-flex justify-content-between px-4">
              <div>Commitment List</div>
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ show_add_commitment_modal: true });
                }}
              >
                <i
                  className="bx bxs-plus-circle"
                  style={{
                    color: "#fff",
                    position: "relative",
                    top: 3,
                    left: -3,
                  }}
                ></i>{" "}
                Add New Commitment
              </Button>
              <Button
              type="primary"
              onClick={() => this.exportToCSV_CommitList("Commitment List")}
            >
              <i
                className="bx bxs-cloud-download"
                style={{
                  color: "#fff",
                  position: "relative",
                  top: 3,
                  left: -3,
                }}
              ></i>{" "}
              Export For Startup Founder
            </Button>
          
            <Button
              type="primary"
              onClick={() => this.exportToCSV_Reconcillation("ReconcillationList")}
            >
              <i
                className="bx bxs-cloud-download"
                style={{
                  color: "#fff",
                  position: "relative",
                  top: 3,
                  left: -3,
                }}
              ></i>{" "}
              Export For Reconcillation
            </Button>
            </div>
          }
          visible={this.state.Commitment_list_modal}
          onOk={() => this.setState({ Commitment_list_modal: false })}
          onCancel={() => this.setState({ Commitment_list_modal: false })}
          okText='ok'
          width={1000}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Input
              placeholder="Search"
              onChange={(e) => this.searchinputc(e)}
              style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
            />
           
          </div>

          <Table
            dataSource={CommitmentdataSource}
            columns={Commitmentcolumns}
            loading={this.state.loading}
            bordered
            // scroll={{ x: "max-content" }}
            expandable={{
              rowExpandable: (record) => record.child.length > 0,
              expandedRowRender: (record) => getNestData(record),
            }}
          />
        </Modal>
        {/* End commitment list modal  */}

        <Modal
          title={`Invest in ${this.state.ac_deal_name}`}
          visible={this.state.show_add_commitment_modal}
          onOk={() => this.setState({ show_add_commitment_modal: false })}
          onCancel={() => this.setState({ show_add_commitment_modal: false })}
          width={600}
          footer={false}
        >
          <div className="form-group">
            <label className="mb-2">
              Select Investor{" "}
              <span className="text-danger">*</span>
            </label>
            <Select
              name="ac_investor"
              className="form-input-field"
              value={this.state.ac_investor_name}
              style={{ width: '100%' }}
              showSearch
              placeholder="Select an Investor"
              optionFilterProp="children"
              onChange={this.onChangeInvestorSelect}
              filterOption={this.filterOptionInvestorSelect}
            >
              {this.state.ac_investor_list &&
                this.state.ac_investor_list.map((item, index) => (
                  <Option key={index} value={item.investor_id} data={item}>
                    {`${item.first_name} ${item.last_name}`}
                  </Option>
                ))}
            </Select>
          </div>
          <div style={{height:20}} />
          <StateSelect value={this.state.ac_investor_state} onChange={(e, value) => {this.setState({ac_investor_state: value})}} />
          <div className="login mt-3">
            <label>
              <b>
                Amount: <br />
                Minimum investment Rs. {this.formatNumberWithCommas(this.state.ac_minamount)} <br />
                Cap Table entry is Rs. {this.formatNumberWithCommas(this.state.ac_captable_threshold_amount)}
              </b>
            </label>
            <input
              type="text"
              name="amount"
              className="form-input-field mt-4"
              autoFocus={true}
              placeholder="amount"
              style={{
                border: this.state.ac_amount_error_status == true && this.state.ac_amount ? "1px solid red" : "1px solid transparent",
              }}
              id="selected-field"
              value={this.state.ac_commaAmount}
              onChange={(e) => { this.handleCommitAmount(e.target.value) }}
            />
            <div className="d-flex justify-content-between mb-3">
              <button className="commit-plus" onClick={this.decrease_commit}>-</button>
              <button className="commit-minus" onClick={this.increase_commit}>+</button>
            </div>
            {this.state.ac_amount_error_status == true && (
              <p className="text-danger pb-0" style={{ position: "relative", top: -19 }}>
                {this.state.ac_amount_error}
              </p>
            )}
          </div>
          <div className="form-group form-check d-flex">
            <Checkbox
              checked={this.state.ac_checkWallet}
              onChange={(e) => {
                this.setState({ ac_checkWallet: e.target.checked }, () => this.calculategst());
              }}
            >
              {" "}
            </Checkbox>
            <label className="form-check-label">
              Use Your ₹ {this.state.ac_walletMoney} Growth91
              <sup style={{ fontSize: "0.6rem" }}>
              ®
              </sup> Money{" "}
            </label>
          </div>
          {
            this.state.ac_enable_special_offer && this.state.ac_special_offer_text != null ? (
              <>
                <div className="form-group form-check d-flex">
                  <Checkbox
                    checked={this.state.ac_checkDiscount}
                    onChange={(e) => {
                      this.setState({ ac_checkDiscount: e.target.checked }, () => this.calculategst());
                    }}
                  >
                    {" "}
                  </Checkbox>
                  <label className="form-check-label">
                    {this.state.ac_special_offer_text}
                  </label>
                </div>
              </>
            ) : null
          }
          {
            this.state.ac_checkDiscount ? (
              <div className="login mt-3">
                <input
                  type="text"
                  className="form-input-field mb-0"
                  autoFocus={true}
                  placeholder={this.state.ac_default_special_offer_text}
                />
              </div>
            ) : null
          }
          <div className="d-flex justify-content-center modal-table">
            <table className="col-12 m-5 investment-charge-table" cellPadding={4}>
              <tr>
                <th>
                  <strong>Particulars</strong>
                </th>
                <th className="text-center">
                  <strong>Amount</strong>
                </th>
              </tr>
              <tr>
                <td>Investment Amount</td>
                <td className="text-center">
                  ₹ {this.state.ac_amount ? this.state.ac_amount : "0"}
                </td>
              </tr>
              <tr>
                <td>
                  Convenience Fees
                  <br />
                  <span>{this.state.ac_label}</span>
                </td>
                <td className="text-center">
                  ₹ {this.state.ac_processingfees}
                </td>
              </tr>
              {
                this.state.ac_checkDiscount ? (
                  <tr>
                    <td>Special Discount</td>
                    <td className="text-center">
                      - ₹ {this.state.ac_DiscountedMoney ? this.state.ac_DiscountedMoney : "0"}
                    </td>
                  </tr>
                ) : null
              }
              <tr>
                <td>Wallet Money</td>
                <td className="text-center">
                  - ₹ {this.state.ac_walletDeductionMoney}
                </td>
              </tr>
              <tr>
                <td>
                  GST
                </td>
                <td className="text-center">
                  ₹ {this.state.ac_igst_value + this.state.ac_cgst_value + this.state.ac_sgst_value}
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td className="text-center">
                  ₹ {parseFloat(this.state.ac_totalamount).toFixed(0)}
                </td>
              </tr>
            </table>
          </div>
          {
            this.state.ac_invest_amt !== null ? (
              <div className="">
                <Alert
                  message={`You have committed Rs. ${this.state.ac_invest_amt} to this deal so far. (Including platform fees)`}
                  type="info"
                />
              </div>
            ) : null
          }
          <div className="m-3">
            <label className="container-check">
              I Agree to Terms and Conditions and have read the Privacy Policy. And, I understand that I will be required to pay the full amount committed after the deal is closed.
              <input
                type="checkbox"
                name="agree"
                onChange={this.onChangeCheckbox}
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="col-12">
            {this.state.ac_amount_error_status == true ? (
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
              <button
                type="button"
                className="login-button prime-bg d-md-block mx-auto w-100"
                onClick={
                  () => {
                    if (this.state.ac_investor_name === "") {
                      message.warning(
                        "Please Select Investor"
                      );
                      return;
                    }
                    if (this.state.ac_investor_state == null) {
                      message.warning(
                        "Please Select Investor"
                      );
                      return;
                    }
                    if (Number(this.state.ac_amount) < Number(this.state.ac_minamount)) {
                      message.warning(
                        "Minimum investment amount is " + this.state.ac_minamount
                      );
                      return;
                    }
                    if (Number(this.state.ac_amount) > Number(this.state.ac_maxamount)) {
                      message.warning(
                        "Maximum investment amount is " + this.state.ac_maxamount,
                        5
                      );
                      return;
                    }
                    if (this.state.ac_agree != true) {
                      message.warning("Please agree to terms and conditions");
                      return;
                    }
                    if (this.state.ac_amount) {
                      this.ac_commit_value();
                    }

                  }}
              >
                Commit My Interest
              </button>
            )}
          </div>
        </Modal>

        {/* Start Edit modal  */}
        <Modal
          title="Update Commitment"
          visible={this.state.show_edit_commitment_modal}
          onOk={this.ac_commit_update}
          okText="Update"
          onCancel={() => this.setState({ show_edit_commitment_modal: false })}
          width={550}
        >
          <div className="mt-4 editor-field">
            <label className="mb-2">
              Amount <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_amount}
              onChange={(e) =>
                this.setState({ ac_edit_amount: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="mb-2">
              Fee <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_processingfees}
              onChange={(e) =>
                this.setState({ ac_edit_processingfees: e.target.value })
              }
            />
          </div>
          <div className="mt-4 editor-field">
            <label className="mb-2">
              igst Percentage <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_igst}
              onChange={(e) =>
                this.setState({ ac_edit_igst: e.target.value,
                  ac_edit_igstvalue: Math.ceil((this.state.ac_edit_processingfees * e.target.value) / 100)
                 })
              }
            />
          </div>
          <div className="mt-4 editor-field">
            <label className="mb-2">
              igst Value <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_igstvalue}
              onChange={(e) =>
                this.setState({ ac_edit_igstvalue: e.target.value })
              }
            />
          </div>

          <div className="mt-4 editor-field">
            <label className="mb-2">
              cgst Percentage <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_cgst}
              onChange={(e) =>
                this.setState({ ac_edit_cgst: e.target.value,
                  ac_edit_cgstvalue: Math.ceil((this.state.ac_edit_processingfees * e.target.value) / 100)
                 })
              }
            />
          </div>
          <div className="mt-4 editor-field">
            <label className="mb-2">
              cgst Value <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_cgstvalue}
              onChange={(e) =>
                this.setState({ ac_edit_cgstvalue: e.target.value })
              }
            />
          </div>


          <div className="mt-4 editor-field">
            <label className="mb-2">
              sgst Percentage <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_sgst}
              onChange={(e) =>
                this.setState({ ac_edit_sgst: e.target.value,
                  ac_edit_sgstvalue: Math.ceil((this.state.ac_edit_processingfees * e.target.value) / 100)
                 })
              }
            />
          </div>
          <div className="mt-4 editor-field">
            <label className="mb-2">
              sgst Value <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_sgstvalue}
              onChange={(e) =>
                this.setState({ ac_edit_sgstvalue: e.target.value })
              }
            />
          </div>
          
          
        </Modal>
        {/* End Edit modal  */}
      </>
    );
  }
}

export default Deals;

class SheetJSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cols: [],
    };
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        cellDates: true,
      });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      this.props.dataTrigger(data, file);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <>
        <DataInput handleFile={this.handleFile} />
      </>
    );
  }
}

const SheetJSFT = ["csv", "xlsx"]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <input
        style={{ paddingTop: 21 }}
        type="file"
        placeholder="default size"
        id="file"
        accept={SheetJSFT}
        onChange={this.handleChange}
      />
    );
  }
}
