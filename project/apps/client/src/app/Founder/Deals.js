import React, { Component } from "react";
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
} from "antd";
import Sidebar from "./common/Sidebar";
import Bridge from "../constants/Bridge";
import { EditOutlined,UserOutlined ,PayCircleOutlined} from "@ant-design/icons";
import moment from "moment";
import Apis from "../constants/Apis";
import DealPitches from "../admin/DealPitches";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Invitation_list from "../admin/common/Invitation_list";
import Header from "../common/Header";
import Footer from "../common/Footer";

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

      // add input states
      startupname: "",
      dealStartDtReg: "",
      dealStartDtPrem: "",
      dealEndDtReg: "",
      dealEndDtPrem: "",
      targetamount: "",
      mintargetamount: "",
      maxtargetamount: "",
      multipleofdescription: "",
      escrowAct: "",
      raiseGap: "",
      backedby: "",
      category: "",
      logo: "",
      banner: "",
      digioTemplateId: "",
      add_dealtype:'',

      // update input states
      editstartupname: "",
      editdealStartDtReg: "",
      editdealStartDtPrem: "",
      editdealEndDtReg: "",
      editdealEndDtPrem: "",
      edittargetamount: "",
      editmintargetamount: "",
      editmaxtargetamount: "",
      editmultipleofdescription: "",
      editescrowAct: "",
      editraiseGap: "",
      editbackedby: "",
      editcategory: "",
      editlogo: "",
      editbanner: "",
      edityoutubelink: "",
      editdigioTemplateId: "",

      deal_id: "",

      deallist: [],
      cdeallist: [],
      signer_mobile: "",
      signer_name: "",
      signer_email: "",
      escrow_account_ifsc: "",
      // edit states
      approvestatus: "",
      dealstatus: "",
      updatemodalstatus: false,

      logourl: "",
      bannerurl: "",
      dealtype: "",
      startups: [],

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
      edit_signer_name: "",
      edit_signer_email: "",
      edit_escrow_account_ifsc: "",
      show_eligibility_modal: false,
      confirmation: "",
      eligibility_date: "",
      eligibility_remarks: "",
      investor_sign_coordinate: "",
      edit_investor_sign_coordinate: "",
      founder_sign_coordinate: "",
      edit_founder_sign_coordinate: "",
      invite_modal_status:false,
      invite_details:false,
      invite_name:'',
      invite_email:'',
      invite_mobile:'',
      invited_user_list:[],
      show_offline_payment_modal:false,
      investor_payment_remarks:'',
      attach_file:'',
      investor_payment_date:'',
      utr_no_reference_id:'',
      investor_investment_amount:'',
      investor_payment_type:'',
      investor_name:'',
      investor_email:'',
      investor_list:[],
      offline_deal_id:'',
      offline_startup_id:'',
      input_status:false,
      input_file_status:false,
      invite_form_loader:false,
      bannerimg:'',
      attachment_preview:'',
      add_vendor_id:'',
      edit_vendor_id:'',
      allPrivateDealInvestor:[],
      selectallstatus:false,
      count:0,
      bulk_user_loader:false,
    };
  }

  componentDidMount() {
    this.getdeallist();
    this.getstartuplist();
  }

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
        console.log('result',result.data)
        let arr=[]
        let logged_in_user=localStorage.getItem('founder_id');
        for(let item of result.data){
          let founder_id=item.operational_founder;
          if(founder_id==logged_in_user){
            arr=[...arr,item]
          }
        }
        // d subbaraa
        this.setState({
          deallist: arr,
          cdeallist: arr,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({loading:false});
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
    // console.log('item',item);
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
      editstartupname: item.deal_name,
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
      editraiseGap: item.raiegap,
      edittargetamount: item.deal_fund_requested,
      editmintargetamount: item.Min_inv_amt,
      editmaxtargetamount: item.Max_inv_amt,
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
      edit_signer_email: item.signer_email,
      edit_signer_mobile: item.signer_mobile,
      edit_vendor_id:item.vendor_id,
    });
    // console.log(this.state.edit_founder_sign_coordinate)
  };

  showupdatemodal = (item) => {
    this.setState({
      deal_id: item.deal_id,
      approvestatus: item.user_status,
      dealstatus: item.deal_status,
      dealtype: item.deal_t_type,
      updatemodalstatus: true,
      show_status: item.show_status,
    });
  };

  // update post
  updatedeal = () => {
    if (this.state.editstartupname == "") {
      message.warning("Startup name is required");
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
    } else if (this.state.editmaxtargetamount == "") {
      message.warning("Max investment amount value is required.");
      return false;
    } else if (this.state.editmultipleofdescription == "") {
      message.warning("Deal Description field value is required.");
      return false;
    } else if (this.state.editescrowAct == "") {
      message.warning("Escrow Account No is required.");
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
    }  else if (this.state.editcategory == "") {
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
      maxtargetamount: this.state.editmaxtargetamount,
      multipleofdescription: this.state.editmultipleofdescription,
      escrowAct: this.state.editescrowAct,
      escrow_account_ifsc: this.state.edit_escrow_account_ifsc,
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
      signer_mobile: this.state.edit_signer_mobile,
      signer_email: this.state.edit_signer_email,
      vendor_id:this.state.edit_vendor_id,
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
            editmaxtargetamount: "",
            editmultipleofdescription: "",
            editbackedby: "",
            editcategory: "",
            editraiseGap: "",
            editescrowAct: "",
            editdigioTemplateId: "",
            edit_investor_sign_coordinate: "",
            edit_founder_sign_coordinate: "",
            edit_signer_name: "",
            edit_signer_mobile: "",
            edit_escrow_account_ifsc: "",
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
          item.deal_name.includes(text) ||
          item.startupid.includes(text) ||
          item.deal_id.includes(text) ||
          // item.Max_inv_amt.includes(text) ||
          // item.Muliples_of.includes(text) ||
          // item.backed_by.includes(text) ||
          item.deal_type.includes(text)
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
    } else  if (this.state.add_dealtype == "") {
      message.warning("Deal Type is required");
      return false;
    }
     else if (this.state.signer_name == "") {
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
    } else if (this.state.maxtargetamount == "") {
      message.warning("Max investment amount value is required.");
      return false;
    } else if (this.state.multipleofdescription == "") {
      message.warning("Deal description field value is required.");
      return false;
    } else if (this.state.raiseGap == "") {
      message.warning("% Raise Gap value is required.");
      return false;
    } else if (this.state.escrowAct == "") {
      message.warning("Escrow Account No is required.");
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
          dealstartdate: this.state.dealStartDtReg,
          dealStartDtPrem: this.state.dealStartDtPrem,
          dealenddate: this.state.dealEndDtReg,
          dealEndDtPrem: this.state.dealEndDtPrem,
          targetamount: this.state.targetamount,
          mintargetamount: this.state.mintargetamount,
          maxtargetamount: this.state.maxtargetamount,
          multipleofdescription: this.state.multipleofdescription,
          backedby: this.state.backedby,
          category: this.state.category,
          youtubelink: this.state.youtubelink,
          multiples_of: this.state.add_multiples_of,
          escrowAct: this.state.escrowAct,
          escrow_account_ifsc: this.state.escrow_account_ifsc,
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
          deal_type:this.state.add_dealtype,
          vendor_id:this.state.add_vendor_id,
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
                dealStartDtReg: "",
                dealStartDtPrem: "",
                dealEndDtReg: "",
                dealEndDtPrem: "",
                targetamount: "",
                mintargetamount: "",
                maxtargetamount: "",
                multipleofdescription: "",
                backedby: "",
                category: "",
                raiseGap: "",
                escrowAct: "",
                signer_name: "",
                signer_mobile: "",
                signer_email: "",
                escrow_account_ifsc: "",
                digioTemplateId: "",
                investor_sign_coordinate: "",
                founder_sign_coordinate: "",
                add_dealtype:'',
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
  };


  onInviteChangeEmail=(email)=>{
    this.setState({invite_email:email})
    for(let item of this.state.allPrivateDealInvestor) {
      if(item.email && item.email==email)
      {
        message.warning("This Email Address Already Exist.");
        break;
      }
    }
  }

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
  showInviteInvestorModal=(item)=>{

    let deal_id=item.deal_id;
    let params={
        deal_id,
    }
    if(deal_id){
        Bridge.get_invitation_list(params).then((result) => {
            console.log('result',result);
            if(result.status=='1'){
                this.setState({allPrivateDealInvestor:result.data});
               
            }else{
              message.warning("Something Went Wrong please try again letter")
            }
        });
    }

    let banner_link=Apis.IMAGEURL + "deal/banner/" + item.deal_id + "/" + item.banner_img;
    this.setState({
      invite_modal_status:true,
      input_file_status:false,
      input_status:false,
      invite_details:item,
      invite_name:'',
      invite_email:'',
      invite_mobile:'',
      bannerimg:banner_link,
      invite_form_loader:false,
      invited_user_list:[],
    });
  }
  close_invite_modal=()=>{
    this.setState({
      invite_modal_status:false,
      invite_details:'',
    });
  }
  download_sample_file=()=>{
    let fileName='Sample file';
    let arr = [{
      "Name": "",
      "Email":"",
      "Mobile": "",
    }];
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Sample file is downloaded successfully.");
  }
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
    this.setState({input_status:true});
    let arr = [];
    let index=0;
    for (let item of data) {
      let name = item[0];
      let email = item[1];
      let mobile = item[2];
      if (item.length > 0 && email && name && mobile) {
        let obj = {
          id: index++,
          name: name,
          email:email,
          mobile: mobile,
        };
        arr = [...arr, obj];
      }
    }
    this.setState({ invited_user_list: arr });
  };
  handleChangeInputs=(event)=>{
    this.setState({
      [event.target.name]:event.target.value,
      input_status:false,
      input_file_status:true,
    })
  }

  get_invitation_list=()=>{
    // let deal_id=this.props.deal_id;
    let params={
        deal_id : this.state.deal_id
    }
    if(this.state.deal_id){
      Bridge.get_invitation_list(params).then((result) => {
        // console.log('result',result);
        if(result.status=='1'){
              alert(params);
                this.setState({list:result.data});
                if(this.state.list.email == this.state.invite_email){
                    message.warning('Email already exist.',5);
                    return;
                  }
            }
        });
    }
}

invite_investor=()=>{
  let emailisPresent=false;
  for(let item of this.state.allPrivateDealInvestor) {
    if(item.email && item.email==this.state.invite_email)
    {
     emailisPresent=true;
     break;
    }else{
      emailisPresent=false;
    }
  }
  if(this.state.input_file_status==false || this.state.input_status==false){
    if(this.state.input_status==false){
      if(!this.state.invite_name){
        message.warning('Name is required.',5);
        return;
      } else if(!this.state.invite_email){
        message.warning('Email is required.',5);
        return;
      }else if(emailisPresent==true){
        message.warning('Email is aready Exist in the private Deal List',5);
        return;
      } else if(this.state.invite_mobile.length!=10){
        message.warning('Mobile no is required.',5);
        return;
      }
      this.setState({invite_form_loader:true});
      let params={
        name:this.state.invite_name,
        email:this.state.invite_email,
        mobile:this.state.invite_mobile,
        invite_type:'1',
        deal_id:this.state.invite_details.deal_id,
        startup_id:this.state.invite_details.startupid,
        invited_by:'admin',
        founder_id:this.state.invite_details.operational_founder,
        bannerimg:this.state.bannerimg,
        deal_name:this.state.invite_details.name,
        // deal_email:this.state.invite_details.email,
      }
      Bridge.deal.invite_investors_for_private_deal(params).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState({
            invite_form_loader:false,
            invite_modal_status:false,
            invite_details:'',
            input_status:false,
            input_file_status:false,
            invite_name:'',
            invite_email:'',
            invite_mobile:'',
          });
          window.location.reload();
        } else {
          message.error(result.message);
          this.setState({invite_form_loader:false});
        }
      });
    } else if(this.state.input_file_status==false){
      this.setState({invite_form_loader:true});
      if(this.state.invited_user_list.length==0){
        message.warning('Please select file first');
        return;
      }
      for(let item1 of this.state.invited_user_list){
        for(let item2 of this.state.allPrivateDealInvestor) {
          if(item1.email && item1.email==item2.email)
          {
           emailisPresent=true;
           break;
          }else{
            emailisPresent=false;
          }
        }
      }
      if(emailisPresent==true){
       message.warning("Email is already Exist in Private Deal, Please Use Different Email");
       this.setState({invite_form_loader:false})
       return;
      }
      let params={
        invited_users:this.state.invited_user_list,
        invite_type:'2',
        deal_id:this.state.invite_details.deal_id,
        startup_id:this.state.invite_details.startupid,
        invited_by:'admin',
        founder_id:this.state.invite_details.operational_founder,
        bannerimg:this.state.bannerimg,
        deal_name:this.state.invite_details.name,
        // deal_email:this.state.invite_details.email,
      }
      let valid=false;

      for(let item of this.state.invited_user_list){
        if(item.selected==true){
          valid=true;
        }
      }
      if(valid==false){
        message.warning('Please select user to invite.');
        this.setState({invite_form_loader:false});
        return;
      }
      console.log('params',params)
      this.invited_user_one_by_one(params,0,this.state.invited_user_list,);
      return
      
    }
  }
}
// invite user one by one
invited_user_one_by_one=(params,index,invited_users)=>{
  this.setState({bulk_user_loader:true,invite_form_loader:false});
  console.log('index',index)
  console.log('invited_users.length',invited_users.length)
  if(invited_users.length==(index)){
    message.success('Invitation is sent successfully!');
    // window.location.href = "/founder-deals";
    setTimeout(()=>{
      this.setState({bulk_user_loader:false});
      this.setState({
        invite_form_loader:false,
        invite_modal_status:false,
        invite_details:'',
        input_status:false,
        input_file_status:false,
        invited_users:[],
      });
    },1000);
    window.location.reload();
    return;
  }
  // console.log('invited_users',invited_users);
  let single_item=invited_users[index];
  let obj={
    name:single_item.name,
    email:single_item.email,
    mobile:single_item.mobile,
    invite_type:'2',
    deal_id:this.state.invite_details.deal_id,
    startup_id:this.state.invite_details.startupid,
    invited_by:'admin',
    founder_id:this.state.invite_details.operational_founder,
    bannerimg:this.state.bannerimg,
    deal_name:this.state.invite_details.name,
  }
  Bridge.deal.invite_investors_for_private_deal(obj).then((result) => {
    if (result.status == 1) {
      setTimeout(() =>{
        let num=index+1;
        this.setState({count:num});
        this.invited_user_one_by_one(params,(num),invited_users);
      },500);  
      
    } else {
      message.error(result.message);
      this.setState({invite_form_loader:false});
    }
  });    
}

  //for pay offline 
  payOffline=()=>{
    if(this.state.investor_email==''){
      message.warning("investor email is required");
      return;
    } else if(this.state.investor_payment_type==''){
      message.warning("Payment type is required");
      return false;
    }else if(this.state.investor_payment_type=='select'){
      message.warning("Payment type is required");
      return false;
    }else if(this.state.investor_investment_amount==''){
      message.warning("investment amount is required");
      return false;
    }
    else if(this.state.utr_no_reference_id==''){
      message.warning("Utr No./ Reference ID is required");
      return false;
    }
    else if(this.state.investor_payment_date==''){
      message.warning("Investor Payment Date is required");
      return false;
    } else if(this.state.attach_file==''){
      message.warning("Please Attach file");
      return false;
    }
    this.setState({formloader:true})
    let formdata = new FormData();
      formdata.append('investor_id',this.state.investor_list[0].investor_id);
      formdata.append('deal_id',this.state.offline_deal_id);
      formdata.append('startup_id',this.state.offline_startup_id);
      formdata.append('investor_email',this.state.investor_email);
      formdata.append('investor_name',this.state.investor_name);
      formdata.append('payment_type',this.state.investor_payment_type);
      formdata.append('investment_amt',this.state.investor_investment_amount);
      formdata.append('reference_id',this.state.utr_no_reference_id);
      formdata.append('payment_dt',this.state.investor_payment_date);
      formdata.append('attach_copy',this.state.attach_file);
      formdata.append('remarks',this.state.investor_payment_remarks);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.deal.add_offline_data(formdata,config).then((result)=>{
      if(result.status=='1'){
        // console.log("successfully added");
        message.success("Successfully added offline payment data");
        this.setState({
          show_offline_payment_modal:false,
          offline_deal_id:'',
          offline_startup_id:'',
          investor_email:'',
          investor_name:'',
          investor_payment_date:'',
          investor_investment_amount:'',
          investor_payment_remarks:'',
          investor_payment_type:'',
          attach_file:'',
          utr_no_reference_id:'',
          formloader:false,

        })
      }else{
        message.errror("failed to add offline payment data");
        this.setState({show_offline_payment_modal:false,formloader:false})
      }
    })
  
  }
  showOfflinePaymentModal=(text)=>{
    this.setState({show_offline_payment_modal:true, offline_deal_id:text.deal_id,offline_startup_id:text.deal_name});
  }
  onChangeEmail=()=>{
    if(!this.state.investor_email){
      this.setState({investor_name:''})
    }
    let params={
      email:this.state.investor_email,
    }
    Bridge.deal.get_investor_by_email(params).then((result)=>{
      if(result.status=='1'){
        this.setState({investor_name:result.data[0].first_name+' '+result.data[0].last_name,investor_list:result.data})
      }else{
        message.error("Invalid email")
        this.setState({investor_name:''})
      }
    })
  }

  //for getting authorized signaroy
  getAuthorizedSignatory=(value)=>{
    console.log(value)
    let params={
      startup_id:value
    }
    if(value!=''){
      this.setState({signer_email:""});
      this.setState({signer_name: ""})
      this.setState({signer_mobile: ""});
      Bridge.admin.get_authorized_signatory_details(params).then((result)=>{
        if(result.status=='1'){
          this.setState({signer_email: result.data[0].email});
          this.setState({signer_name: result.data[0].first_name+' '+result.data[0].last_name})
          this.setState({signer_mobile: result.data[0].mobile});
        }
      })
    }
    
  }

   //for getting authorized signaroy
   get_updated_AuthorizedSignatory=(value)=>{
    console.log(value)
    let params={
      startup_id:value
    }
    if(value!=''){
      this.setState({edit_signer_email:""});
      this.setState({edit_signer_mobile: ""})
      this.setState({edit_signer_name: ""});
      Bridge.admin.get_authorized_signatory_details(params).then((result)=>{
        if(result.status=='1'){
          this.setState({edit_signer_email: result.data[0].email});
          this.setState({edit_signer_name: result.data[0].first_name+' '+result.data[0].last_name})
          this.setState({edit_signer_mobile: result.data[0].mobile});
        }
      })
    }
    
  }
  toggleallcheck=(e)=>{
    this.setState({selectallstatus:e.target.checked});
    let arr=[];
    let list=this.state.invited_user_list;
    for(let single of list){
      single.selected=(e.target.checked==true ? true : false);
      arr.push(single);
    }
    this.setState({invited_user_list:arr});
  }
  render() {
    const dataSource =
      this.state.deallist &&
      this.state.deallist.map((item, index) => {
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
          targetamount:item,
          mininvestment: item.Min_inv_amt ? item.Min_inv_amt : "---",
          maxinvestment: item.Max_inv_amt ? item.Max_inv_amt : "---",
          muliplesof: item.Muliples_of ? item.Muliples_of : "---",
          multiplesof: item.multiples_of ? item.multiples_of : "---",
          action: item,
          deal_type:item.deal_type,
          noofinvitations:item,
        };
      });
      const invite_users_dataSource =this.state.invited_user_list &&
      this.state.invited_user_list.map((item, index) => {
        return {
          checkbox:item,
          key: index,
          srno: index + 1,
          name:item.name ? item.name : '',
          email:item.email ? item.email : '',
          mobile:item.mobile ? item.mobile : '',
        }
      });
      const invite_users_columns=[
        {
          title: (
            <input 
              type="checkbox" 
              style={{cursor:'pointer'}}
              checked={this.state.selectallstatus} 
              onChange={this.toggleallcheck}
            />
          ),
          dataIndex: "checkbox",
          key: "checkbox",
          width: 100,
          render: (item) => {
            return (
              <input 
                type="checkbox" 
                style={{cursor:'pointer'}}
                checked={item.selected==true ? true : false} 
                onChange={()=>this.selectItem(item)}
              />
            )
          }
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
        },
        {
          title: "Mobile",
          dataIndex: "mobile",
          key: "mobile",
          width: 100,
        }
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
      {
        title: "Deal Type",
        dataIndex: "deal_type",
        key: "deal_type",
        width: 100,
      },
      {
        title: "Target Amount",
        dataIndex: "targetamount",
        key: "targetamount",
        render:(text)=>{
          var amt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text.deal_fund_requested);
          return(
            <div style={{textAlign:'right'}}>
              {text.deal_fund_requested ? amt : "---"}
            </div>
          )
        }
      },
      {
        title: "Number Of Invitations",
        dataIndex: "noofinvitations",
        key: "noofinvitations",
        render: (text, record) => {
          if(Number(text.total_invitions)>0){
            return (
              <div>
                {Number(text.total_invitions)>0 && (
                  <Invitation_list deal_id={text.deal_id} total_invitions={text.total_invitions} />
                )}
              </div>
            )
          }else{
            return '0';
          }
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
              <Menu.Item key={`invite_${record.key}`} icon={<UserOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showInviteInvestorModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Invite Investors
                </a>
              </Menu.Item>
            </Menu>
          );
          return (
            <div>
              {text.deal_type=='Private' && (
                <Button
                  onClick={()=>this.showInviteInvestorModal(text)}
                  style={{fontSize:14}}
                  type="primary"
                >
                  &nbsp;&nbsp;Invite Investors
                </Button>
              )}
            </div>
          );
        },
      },
    ]
    return (
      <div>
        <Header />
    
        <div className="row">
          <div
            className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <section></section>
            <Sidebar />
          </div>
          <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ">
            <section></section>
            <Sidebar />
          </div>
          <div className="col col-md-10 pb-4">
            <div style={{ marginTop: 130 }}>
            <Card
                title="Deals"
                style={{ margin: 16 }}
              >
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Deals</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                {this.state.deallist.length==0 ? (
                  <>
                    <Input
                      value={this.state.searchinput}
                      placeholder="Search"
                      onChange={(e) => this.searchinput(e)}
                      style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                    />
                  <div className='text-center mt-5'>
                    <h4>You are not operational founder for any deals on Growth91 platform. </h4>
                    <img src='No_data_rafiki.png' width={200} />
                  </div>
                  </>

                ):(
                  <>
                    <Input
                      value={this.state.searchinput}
                      placeholder="Search"
                      onChange={(e) => this.searchinput(e)}
                      style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                    />
                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      loading={this.state.loading}
                      bordered
                      scroll={{ x: "max-content" }}
                    />
                  </>
                )}
              </Card>
            </div>
            {/* How do i invest? */}
            <section id="hdii"></section>
          </div>
          <div className="col-2"></div>
        </div>
        {/* Start invite modal  */}
        <Modal 
          title="Invite Investors" 
          visible={this.state.invite_modal_status} 
          onOk={this.invite_investor} 
          onCancel={this.close_invite_modal}
          okText='Invite'
        >
          <Spin spinning={this.state.invite_form_loader}>
            <div>
              <div className="mt-4 editor-field">
                <label className="mb-2">Name</label>
                <Input
                  type="text"
                  value={this.state.invite_name}
                  name="invite_name"
                  onChange={(e) =>this.handleChangeInputs(e)}
                  disabled={this.state.input_status==true ? true : false}
                />
              </div>  
              <div className="mt-4 editor-field">
                <label className="mb-2">Email</label>
                <Input
                  type="email"
                  value={this.state.invite_email}
                  name="invite_email"
                  onChange={(e) =>this.onInviteChangeEmail(e.target.value)}
                  disabled={this.state.input_status==true ? true : false}
                />
              </div>  
              <div className="mt-4 editor-field">
                <label className="mb-2">Mobile</label>
                <Input
                  type="number"
                  onWheel={() => document.activeElement.blur()}
                  value={this.state.invite_mobile}
                  name="invite_mobile"
                  onChange={(e) =>this.handleChangeInputs(e)}
                  disabled={this.state.input_status==true ? true : false}
                />
              </div>  
            </div>
            <div
            style={{
              position: 'relative',
              margin: '35px 0',
            }}    
            >
              <p style={{position:'absolute',top:-15,left:'47%',
              backgroundColor: '#ffffff',
              padding: '0 12px',
              zindex: 9}}>OR</p>
              <hr/>
            </div>
            <div>
              {console.log('deallist',this.state.deallist)}
              
                <Card
                title="Bulk Invite"
                extra={
                  <Button type="primary" onClick={this.download_sample_file}>Download Sample Xlsx</Button>
                }
              >
                <div className="mt-4">
                  <label className="mb-2 w-100">
                    Select Xlsx File <span className="text-danger">*</span> <span className="text-danger">(Select xlsx file only)</span>
                  </label>
                  <div 
                    style={{
                      pointerEvents:this.state.input_file_status==true ? 'none': false,
                      background: this.state.input_file_status==true ?'#d9d9d96e' :'#fff',
                      padding: '0 16px 17px 9px',
                      margin: 0,
                      cursor: this.state.input_file_status==true ? 'not-allowed' :'pointer',
                    }}
                  > 
                    <SheetJSApp dataTrigger={this.dataTrigger} />
                  </div>
                </div>
                {this.state.invited_user_list.length>0 && (
                  <div>
                    <hr/>
                    <h5
                    style={{
                      marginBottom:23,
                      paddingLeft:4,
                      paddingTop:13,
                    }}    
                    >Invite User list: </h5>
                    <Spin 
                      spinning={this.state.bulk_user_loader} 
                      tip={`${this.state.count}/${this.state.invited_user_list.length}`}
                    >
                      <Table
                        dataSource={invite_users_dataSource}
                        columns={invite_users_columns}
                        loading={this.state.loading}
                        bordered
                        scroll={{ x: "max-content" }}
                      />
                    </Spin>
                  </div>
                )}
              </Card>
            </div>
            </Spin>
        </Modal>
        {/* End invite modal  */}

       
        {/* End Add modal  */}
        <Footer />
      </div>
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

const SheetJSFT = ["csv","xlsx"]
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