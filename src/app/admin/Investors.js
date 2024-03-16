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
  Tag,
  Input,
  Image,
  Checkbox,
  notification,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import axios from "axios";
import {
  EditOutlined,
  EyeInvisibleFilled,
  EyeOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Apis from "../constants/Apis";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Sidebar2 from "./common/Sidebar2";

const { TextArea } = Input;

const { Option } = Select;
const { Content } = Layout;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class Investors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      addModalStatus: false,
      formloader: false,
      editModalStatus: false,
      disableModalStatus: false,
      updatemodalstatus: false,

      // add
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      nationality: "",
      dob: "",
      legal_name: "",
      father_name: "",
      address: "",
      bank_ac_no: "",
      ifsc_code: "",
      profile_image: "",
      investors: [],
      cinvestors: [],
      allInvestors: [],
      searchinput: "",
      image_to_show: "",

      // kyc Images
      pan_image_kyc: "",
      adhar_front_image_kyc: "",
      adhar_back_image_kyc: "",
      bank_image_kyc: "",
      cancel_cheque_image_kyc: "",

      // kyc details
      pan_number: "",
      panValid: true,
      adhar_number: "",
      // account_name: "",
      // branch_name: "",
      bank_number: "",
      ifsc_bank: "",
      pan_name: "",
      adhaar_name: "",
      adhaar_address: "",

      // update
      edit_first_name: "",
      edit_last_name: "",
      edit_email: "",
      edit_mobile: "",
      edit_nationality: "",
      edit_dob: "",
      edit_legal_name: "",
      edit_father_name: "",
      edit_address: "",
      edit_bank_ac_no: "",
      edit_ifsc_code: "",
      edit_profile_image: "",

      investor_id: "",

      kycmodalstatus: false,
      g91modalstatus: false,
      addg91modalstatus: false,

      pan_image: "",
      pan_status: 0,
      adhar_status: 0,
      bank_status: 0,
      kycformloader: false,
      kycdetails: {},
      kycstatus: "",
      bank_details: {},
      adhar_details: {},
      pan_details: {},
      adhar_front_img: "",
      adhar_back_img: "",
      kyc_remark: "",
      legal_name: "",
      legal_address: "",
      non_resident_form_details: {},
      bank_account_swift: "",
      bank_account_no: "",
      verify_kyc: "",
      tax_id: "",
      national_id: "",
      remark: "",
      resident_country: "",
      isActiveValue: 0,
      disabledFields: {
        input1: true,
        input2: true,
        input3: true,
        input4: true,
        input5: true,
        input6: true,
        input7: true,
        input8: true,
      },
    };
  }

  componentWillMount() {
    document.title = "Investors - Growth91 - Startup Marketplace";
  }

  componentDidMount() {
    this.getinvestorlist();
  }

  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  };

  // get post list
  getinvestorlist = () => {
    this.setState({ loading: true });
    Bridge.admin.investor.list().then((result) => {
      if (result.status == 1) {
        this.setState({ allInvestors: result.data });
        if (this.state.searchinput) {
          let arr = [];
          let text = this.state.searchinput;
          for (let item of result.data) {
            if (
              (item.first_name && item.first_name.includes(text)) ||
              (item.last_name && item.last_name.includes(text)) ||
              (item.email && item.email.includes(text)) ||
              (item.investor_id && item.investor_id.includes(text)) ||
              (item.mobile && item.mobile.includes(text))
            ) {
              arr = [...arr, item];
            }
          }
          this.setState({
            investors: arr,
            cinvestors: result.data,
            loading: false,
          });
        } else {
          this.setState({
            investors: result.data,
            cinvestors: result.data,
            loading: false,
          });
        }
      } else {
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
    } else {
      this.setState({
        editlogo: e.target.files[0],
      });
    }
  };

  // show edit modal
  showEditModal = (item) => {
    // console.log('item',item);
    let url =
      Apis.IMAGEURL +
      "profile/" +
      item.investor_id +
      "/" +
      item.user_profile_picture;
    this.setState({
      edit_first_name: item.first_name,
      edit_last_name: item.last_name,
      edit_mobile: item.mobile,
      edit_email: item.email,
      edit_nationality: item.nationality,
      edit_dob: item.date_of_birth ? moment(item.date_of_birth) : "",
      edit_legal_name: item.legal_name,
      edit_father_name: item.fathers_name,
      edit_address: item.address,
      edit_bank_ac_no: item.bank_ac_no,
      edit_ifsc_code: item.ifsc_code,
      investor_id: item.investor_id,
      image_to_show: item.user_profile_picture ? url : "",
      editModalStatus: true,
    });
  };

  showupdatemodal = (item) => {
    this.setState({
      investor_id: item.investor_id,
      approvestatus: item.user_status,
      dealstatus: item.deal_status,
      updatemodalstatus: true,
    });
  };

  // update post
  updateinvestor = () => {
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
    }
    // else if(this.state.edit_dob == ''){
    //   message.warning('Date of birth is required.');
    //   return false;
    // }else if(this.state.edit_legal_name == ''){
    //   message.warning('Legal name is required.');
    //   return false;
    // }else if(this.state.edit_father_name == ''){
    //   message.warning('Father name is required.');
    //   return false;
    // }else if(this.state.edit_address == ''){
    //   message.warning('Address is required.');
    //   return false;
    // }

    this.setState({ formloader: true });

    let someData = new FormData();

    someData.append("first_name", this.state.edit_first_name);
    someData.append("last_name", this.state.edit_last_name);
    someData.append("mobile", this.state.edit_mobile);
    someData.append("email", this.state.edit_email);
    someData.append("nationality", this.state.edit_nationality);
    someData.append("dob", this.state.edit_dob);
    someData.append("legal_name", this.state.edit_legal_name);
    someData.append("father_name", this.state.edit_father_name);
    someData.append("address", this.state.edit_address);
    someData.append("bank_ac_no", this.state.edit_bank_ac_no);
    someData.append("ifsc_code", this.state.edit_ifsc_code);
    someData.append("profile_image", this.state.edit_profile_image);
    someData.append("investor_id", this.state.investor_id);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    Bridge.admin.investor.edit(someData, config).then((result) => {
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
          () => this.getinvestorlist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
    // window.location.reload();
  };

  // Cancel post modal
  // cancel_updateinvestor = () => {
  //   this.setState({ editModalStatus:false });
  //   window.location.reload();
  // }

  showDesableModel = (item) => {
    this.setState({
      disableModalStatus: true,
      investor_id: item.investor_id,
      isActiveValue: item.user_block_status,
    });
  };

  disableUser = () => {
    if (this.state.investor_id == "") {
      message.warning("Please Select Any Investor", 5);
      return false;
    }
    this.setState({ formloader: true });
    let params = "";
    if (this.state.isActiveValue == 0) {
      params = {
        investor_id: this.state.investor_id,
        user_block_status: 1,
      };
    } else {
      params = {
        investor_id: this.state.investor_id,
        user_block_status: 0,
      };
    }
    Bridge.admin.block_disable_investor(params).then((result) => {
      if (result.status == "1") {
        this.setState(
          { disableModalStatus: false, formloader: false, investor_id: "" },
          () => this.getinvestorlist()
        );
        if (this.state.isActiveValue == 0) {
          message.success("User has been blocked/Disable Successfully", 5);
        } else {
          message.success("User has been Unblocked Successfully", 5);
        }
      } else {
        this.setState(
          { disableModalStatus: false, formloader: false, investor_id: "" },
          () => this.getinvestorlist()
        );
        if (this.state.isActiveValue == 0) {
          message.warning(
            "User is Already Disabled/Something Went Wrong!, Pls Try later",
            5
          );
        } else {
          message.warning(
            "User is Already Unblocked/Something Went Wrong!, Pls Try later",
            5
          );
        }
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
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.cinvestors) {
        if (
          (item.first_name && item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.last_name && item.last_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.email && item.email.includes(text)) ||
          (item.mobile && item.mobile.includes(text)) ||
          (item.investor_id && item.investor_id.includes(text))||
          (item.referred_by && item.referred_by.includes(text))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        investors: arr,
        loading: false,
      });
    } else {
      this.setState({
        investors: this.state.cinvestors,
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

  onChangeFile2 = (e) => {
    this.setState({
      edit_profile_image: e.target.files[0],
    });
  };

  // add new deal
  addinvestor = () => {
    let emailisPresent = false;
    for (let item of this.state.allInvestors) {
      if (item.email && item.email == this.state.email) {
        emailisPresent = true;
        break;
      } else {
        emailisPresent = false;
      }
    }
    if (this.state.first_name == "") {
      message.warning("First name is required");
      return false;
    } else if (this.state.last_name == "") {
      message.warning("Last name is required");
      return false;
    } else if (this.state.email == "") {
      message.warning("Email is required.");
      return false;
    } else if (emailisPresent == true) {
      message.warning("Email is Aready Exist, Please try to add another one");
      return false;
    } else if (this.state.mobile == "") {
      message.warning("Contact no is required.");
      return false;
    } else if (this.state.nationality == "") {
      message.warning("Please select the nationality option.");
      return false;
    }

    this.setState({ formloader: true });

    let formData = new FormData();

    formData.append("first_name", this.state.first_name);
    formData.append("last_name", this.state.last_name);
    formData.append("mobile", this.state.mobile);
    formData.append("email", this.state.email);
    formData.append("nationality", this.state.nationality);
    formData.append("dob", this.state.dob);
    formData.append("legal_name", this.state.legal_name);
    formData.append("father_name", this.state.father_name);
    formData.append("address", this.state.address);
    formData.append("bank_ac_no", this.state.bank_ac_no);
    formData.append("ifsc_code", this.state.ifsc_code);
    formData.append("profile_image", this.state.profile_image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    Bridge.admin.investor.add(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
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
            profile_image: "",
          },
          () => this.getinvestorlist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
    // window.location.reload();
  };

  //cancel ADD INVESTOR post reload
  // cancel_addinvestor=()=>{
  //   this.setState({ editModalStatus:false });
  //   window.location.reload();
  // }

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
        this.setState({}, () => this.getinvestorlist());
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
          () => this.getinvestorlist()
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

  showkycmodal = (item) => {
    this.setState({
      kycmodalstatus: true,
      investor_id: item.investor_id,
      kycdetails: item,
      pan_status: item.pan_status,
      adhar_status: item.adhar_status,
      bank_status: item.bank_status,
      kycstatus: item.kycstatus,
      adhar_front_img: item.adharFront,
      adhar_back_img: item.adharBack,
      cheque_image: item.cheque_image,
      pan_image: item.pan_image,
      kyc_remark: item.kyc_remark,
      legal_name: item.legal_name == "null" ? "" : item.legal_name,
      legal_address: item.address == "null" ? "" : item.address,
      nationality: item.nationality,
      bank_number: item.bank_ac_no,
      ifsc_bank: item.ifsc_code,
      pan_number: item.panno,

      adhar_number: item.adharno == "null" ? "" : item.adharno,
      father_name: item.fathers_name == "null" ? "" : item.fathers_name,
      adhaar_name: item.adhaar_name == "null" ? "" : item.adhaar_name,
      pan_name: item.pan_name,
      adhaar_address: item.adhaar_address,
    });
    let params = {
      investor_id: item.investor_id,
    };
    this.setState({ kycformloader: true });
    //non_resident_form_details
    if (item.nationality == "Non Resident") {
      Bridge.get_non_resident(params).then((result) => {
        if (result.status == 1) {
          if (result.data.length > 0) {
            this.setState({
              legal_address: result.data[0].legal_address,
              legal_name: result.data[0].legal_name,
              bank_account_swift: result.data[0].bank_account_swift,
              bank_account_no: result.data[0].bank_account_no,
              verify_kyc: result.data[0].verify_kyc,
              tax_id: result.data[0].tax_id,
              national_id: result.data[0].national_id,
              remark: result.data[0].remark,
              resident_country: result.data[0].resident_country,
              passport: result.data[0].passport,
            });
          }
          this.setState({
            non_resident_form_details: result.data,
            kycformloader: false,
          });
        } else {
          this.setState({
            kycformloader: false,
            bank_details: [],
            adhar_details: [],
            pan_details: [],
          });
        }
      });
    } else {
      Bridge.admin.getkycdetails(params).then((result) => {
        if (result.status == 1) {
          // console.log('result',result);
          this.setState({
            bank_details: result.bank_details,
            adhar_details: result.adhar_details,
            pan_details: result.pan_details,
            kycformloader: false,
          });
        } else {
          this.setState({
            kycformloader: false,
            bank_details: [],
            adhar_details: [],
            pan_details: [],
          });
        }
      });
    }
  };

  showg91modal = (item) => {
    this.setState({
      g91modalstatus: true,
    });
  };

  onChangeEmail = (email) => {
    this.setState({ email: email });
    for (let item of this.state.allInvestors) {
      if (item.email && item.email == email) {
        message.warning(
          "Given Email is Already Exist in the Investor List, Please try to add different email"
        );
        break;
      }
    }
  };
  checkforpanno = (text) => {
    let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regex.test(text)) {
      return true;
    }
    return false;
  };
  verify_pan_no = () => {
    if (!this.state.pan_number || this.state.pan_number.length != 10) {
      notification.warning({
        message: `Invalid PAN number`,
        description: "Please enter the valid PAN number",
        placement: "top",
        duration: 5,
      });
      return;
    }
    let panstatus = this.checkforpanno(this.state.pan_number);
    if (panstatus == false) {
      notification.warning({
        message: `Invalid format of PAN No`,
        description: "Please enter valid PAN No.",
        placement: "top",
        duration: 5,
      });
      return;
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}verification/pan.php`,
      headers: {
        "Content-Type": "application/json",
      },

      data: {
        pan_no: this.state.pan_number,
      },
    }).then((response) => {
      if (response.data.valid === true) {
        notification.success({
          message: `Success`,
          description: "PAN is verified successfully.",
          placement: "top",
          duration: 5,
        });
      } else {
        notification.warning({
          message: `Invalid PAN Number`,
          description: "Please enter the valid pan number.",
          placement: "top",
          duration: 5,
        });
      }
    });
  };
  // update kyc details
  updatekycdetails = () => {
    if (this.state.nationality == "Non Resident") {
      let params = {
        investor_id: this.state.investor_id,
        legal_name: this.state.legal_name,
        legal_address: this.state.legal_address,

        bank_account_swift: this.state.bank_account_swift,
        bank_account_no: this.state.bank_account_no,
        verify_kyc: this.state.verify_kyc,
        tax_id: this.state.tax_id,
        national_id: this.state.national_id,
        remark: this.state.remark,
        resident_country: this.state.resident_country,
        nationality: this.state.nationality,
        kyc_status: this.state.kycstatus,
      };
      if (!this.state.legal_name) {
        message.warning("Invalid legal name");
        return;
      } else if (!this.state.legal_address) {
        message.warning("Invalid legal address");
        return;
      // } else if (!this.state.bank_account_swift) {
      //   message.warning("Invalid bank account (Swift)");
      //   return;
      } else if (!this.state.bank_account_no) {
        message.warning("Invalid Bank Account Number");
        return;
      } else if (!this.state.tax_id) {
        message.warning("Invalid Tax ID");
        return;
      } else if (!this.state.national_id) {
        message.warning("Invalid National ID");
        return;
      } else if (!this.state.resident_country) {
        message.warning("Invalid Passport Number");
        return;
      }

      this.setState({ kycformloader: true });
      Bridge.admin.update_non_resident_kyc_details(params).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState(
            {
              kycformloader: false,
              kycmodalstatus: false,
            },
            () => this.getinvestorlist()
          );
        } else {
          message.error(result.message);
          this.setState({
            kycformloader: false,
          });
        }
      });
    } else {
      let params = {
        investor_id: this.state.investor_id,
        pan_status: this.state.kycstatus == "admin_approved" ? 1 : 0,
        adhar_status: this.state.kycstatus == "admin_approved" ? 1 : 0,
        bank_status: this.state.kycstatus == "admin_approved" ? 1 : 0,
        kyc_status: this.state.kycstatus,
        kyc_remark: this.state.kyc_remark,
        legal_name: this.state.legal_name,
        legal_address: this.state.legal_address,
      };
      if (!this.state.kycstatus) {
        message.warning("Please select kyc status");
        return;
      }
      if (!this.state.kyc_remark) {
        message.warning("Please enter remark");
        return;
      }
      this.setState({ kycformloader: true });

      Bridge.admin.updatekycdetails(params).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState(
            {
              kycformloader: false,
              kycmodalstatus: false,
            },
            () => this.getinvestorlist()
          );
        } else {
          message.error(result.message);
          this.setState({
            kycformloader: false,
          });
        }
      });
    }
    this.uploadKYCImages();
    this.uploadKYCDetails();
  };

  uploadKYCDetails = () => {
    const kycFormData = new FormData();
    kycFormData.append("form-type", "admin_access");
    kycFormData.append("investor_id", this.state.investor_id);
    kycFormData.append("adharno", this.state.adhar_number);
    kycFormData.append("bank_ac_no", this.state.bank_number);
    kycFormData.append("ifsc_code", this.state.ifsc_bank);
    kycFormData.append("panno", this.state.pan_number);

    Bridge.kyc.update_kyc_docs(kycFormData).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    });

    if (this.state.legal_name || this.state.father_name) {
      const kycFormData = new FormData();
      kycFormData.append("form-type", "legal_details");
      kycFormData.append("investor_id", this.state.investor_id);
      kycFormData.append("legal_name", this.state.legal_name);
      kycFormData.append("fathers_name", this.state.father_name);

      Bridge.kyc.update_kyc_docs(kycFormData).then((result) => { });
    }
  };

  uploadKYCImages = () => {
    if (
      this.state.adhar_front_image_kyc ||
      this.state.adhar_back_image_kyc ||
      this.state.adhaar_name ||
      this.state.adhaar_address
    ) {
      const kycFormData = new FormData();
      kycFormData.append("form-type", "aadhaar");
      kycFormData.append("investor_id", this.state.investor_id);
      kycFormData.append("adhaar_name", this.state.adhaar_name);
      kycFormData.append("adhaar_address", this.state.adhaar_address);

      kycFormData.append(
        "aadhaar_front",
        this.state.adhar_front_image_kyc && this.state.adhar_front_image_kyc
      );

      kycFormData.append(
        "aadhaar_back",
        this.state.adhar_back_image_kyc && this.state.adhar_back_image_kyc
      );

      Bridge.kyc.update_kyc_docs(kycFormData).then((result) => {
        window.reload();
      });
    }

    if (this.state.cancel_cheque_image_kyc) {
      const kycFormCheque = new FormData();
      kycFormCheque.append("form-type", "cheque");
      kycFormCheque.append("investor_id", this.state.investor_id);
      kycFormCheque.append(
        "cheque_image",
        this.state.cancel_cheque_image_kyc && this.state.cancel_cheque_image_kyc
      );

      Bridge.kyc.update_kyc_docs(kycFormCheque).then((result) => { });
    }

    const kycFormPan = new FormData();
    kycFormPan.append("form-type", "pan");

    kycFormPan.append("investor_id", this.state.investor_id);
    kycFormPan.append("pan_name", this.state.pan_name);
    kycFormPan.append("pan_image", this.state.pan_image_kyc);

    Bridge.kyc.update_kyc_docs(kycFormPan).then((result) => { });
  };

  onAdharFrontimageChange = (e) => {
    this.setState({
      adhar_front_image_kyc: e.target.files[0],
    });
  };
  onAdharBackimageChange = (e) => {
    this.setState({
      adhar_back_image_kyc: e.target.files[0],
    });
  };

  onCancelChequeimageChange = (e) => {
    this.setState({
      cancel_cheque_image_kyc: e.target.files[0],
    });
  };

  onPanimageChange = (e) => {
    this.setState({
      pan_image_kyc: e.target.files[0],
    });
  };

  onCheckSameAsPAN = (e) => {
    if (e.target.checked) {
      alert("checked");
    } else {
      alert("unchecked");
    }
  };

  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.investors) {
      let status = "";
      if (item.kycstatus == "admin_approved") {
        status = "system_approved";
      } else if (item.kycstatus == "admin_approved") {
        status = "Admin_Approved";
      } else if (item.kycstatus == "admin_rejected") {
        status = "Admin_Rejected";
      } else if (item.kycstatus == "Pending" || item.kycstatus == "") {
        status = "Pending";
      }
      console.log(item.user_status);
      let obj = {
        "Sr No": count,
        "Investor Id": item.investor_id,
        "Name": item.first_name + " " + item.last_name,
        "Legal Name": item.legal_name,
        "Father's Name": item.fathers_name,
        "Address": item.address,
        "Contact No": item.mobile,
        "Email": item.email,
        "KYC Status": status,
        "Pan Id": item.panno,
        "Aadhaar Address": item.adhaar_address,
        "Aadhaar No": item.adharno,
        "Referral":item.referred_by,
        "User Status":item.user_block_status === '0' ?("Active"):("blocked/Disabled User")
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    // console.log(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Investor data exported successfully.");
  };

  handleButtonClick = (fieldName) => {
    const disabledFields = { ...this.state.disabledFields };
    disabledFields[fieldName] = !disabledFields[fieldName];
    this.setState({ disabledFields });
  };

  handlePanChange = (e) => {
    const panValue = e.target.value;
    this.setState({ pan_number: panValue });

    // Perform PAN validation (adjust the regex pattern as needed)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const isValidPan = panRegex.test(panValue);
    this.setState({ panValid: isValidPan });
  };

  render() {
    const dataSource =
      this.state.investors &&
      this.state.investors.map((item, index) => {
        return {
          key: index,
          investorid: item.investor_id,
          name: item.first_name + " " + item.last_name,
          contactno: item.mobile ? item.mobile : "---",
          email: item.email ? item.email : "---",
          investment_amt: item.email ? item.email : "---",
          isActive: item.user_block_status ? item.user_block_status : 0,
          Referral:item.referred_by,
          total_invested_amount: item.total_invested_amount
          ? "₹" + item.total_invested_amount
          : "---",
          action: item,
          kyc: item,
        };
      });

    const columns = [
      {
        title: "Investor Id",
        dataIndex: "investorid",
        key: "investorid",
        width: 160,
        fixed: "left",
      },
      {
        title: "Investor Name",
        dataIndex: "name",
        key: "name",
        width: 180,
        fixed: "left",
      },

      {
        title: "Contact No",
        dataIndex: "contactno",
        key: "contactno",
        width: 180,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: 'Referral',
        dataIndex: 'Referral',
        key: 'referred_by',
      },
      {
        title: "KYC Status",
        dataIndex: "kyc",
        key: "kyc",
        render: (text, record) => {
          let status = "";
          if (text.kycstatus == "system_approved") {
            status = <Tag color="red">System Approved</Tag>;
          } else if (text.kycstatus == "admin_approved") {
            status = <Tag color="green">Admin Approved</Tag>;
          } else if (text.kycstatus == "admin_rejected") {
            status = <Tag color="red">Admin Rejected</Tag>;
          } else if (text.kycstatus == "Pending" || text.kycstatus == "") {
            status = <Tag color="blue">Pending</Tag>;
          } else {
            status = "---";
          }
          return <div>{status}</div>;
        },
      },
      {
        title: "User Status",
        dataIndex: "isActive",
        key: "isActive",
        render: (text) => {
          if (text == 0) {
            return <Tag color="green">Active User</Tag>;
          } else {
            return <Tag color="red">blocked/Disabled User</Tag>;
          }
        },
      },
      {
        title: "Total Invested Amount",
        dataIndex: "total_invested_amount",
        key: "total_invested_amount",
        width: 150,
        align: "right",
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
              style={{ width: 180 }}
            >
              <Menu.Item
                key={`kyc_update_${record.key}`}
                icon={<EditOutlined />}
              >
                <a
                  href="#"
                  onClick={() => this.showkycmodal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Verify Kyc
                </a>
              </Menu.Item>
              <Menu.Item
                key={`g91money_${record.key}`}
                icon={<EditOutlined />}
              >
                <a
                  href="#"
                  onClick={() => this.showg91modal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;G91 Money
                </a>
              </Menu.Item>
              <Menu.Item key={`update_${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showEditModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
              {text.user_block_status == 0 ? (
                <Menu.Item
                  key={`disable_${record.key}`}
                  icon={<EyeInvisibleFilled />}
                >
                  <a
                    href="#"
                    style={{ fontSize: 14 }}
                    onClick={() => this.showDesableModel(text)}
                  >
                    &nbsp;&nbsp;Block/Disable
                  </a>
                </Menu.Item>
              ) : (
                <Menu.Item key={`unblock${record.key}`} icon={<EyeOutlined />}>
                  <a
                    href="#"
                    style={{ fontSize: 14 }}
                    onClick={() => this.showDesableModel(text)}
                  >
                    &nbsp;&nbsp;Unblock Investor
                  </a>
                </Menu.Item>
              )}
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

    const g91dataSource = []

    const g91columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Descripton",
        dataIndex: "descripton",
        key: "descripton",
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

            <Content className="home-section" style={{ margin: "0 16px" }}>
              <Card
                title="Investors"
                extra={
                  <Button type="primary" onClick={this.showAddModal}>
                    <i
                      className="bx bxs-plus-circle"
                      style={{
                        color: "#fff",
                        position: "relative",
                        top: 3,
                        left: -3,
                      }}
                    ></i>{" "}
                    Add New Investor
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
                  <Breadcrumb.Item>Investors</Breadcrumb.Item>
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
                    value={this.state.searchinput}
                    placeholder="Search"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                  <Button
                    type="primary"
                    onClick={() => this.exportToCSV("Investor list")}
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
                />
              </Card>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>

        {/* Start Add modal  */}
        <Modal
          title="Add New Investor"
          visible={this.state.addModalStatus}
          onOk={this.addinvestor}
          okText="Submit"
          // onCancel={this.cancel_addinvestor}
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group mb-3">
              <label className="mb-2">
                First Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.first_name}
                onChange={(e) => this.setState({ first_name: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-2">
                Last Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.last_name}
                onChange={(e) => this.setState({ last_name: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-2">
                Email <span className="text-danger">*</span>
              </label>
              <Input
                type="email"
                value={this.state.email}
                onChange={(e) => this.onChangeEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-2">
                Contact No <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.mobile}
                onChange={(e) => this.setState({ mobile: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-2">
                Nationality <span className="text-danger">*</span>
              </label>
              <select
                name="nationality"
                className="form-input-field"
                value={this.state.nationality}
                onChange={this.handleChangeSelect}
              >
                <option value="">Select Nationality</option>
                <option value="Indian Citizen">Indian Citizen</option>
                <option value="International">International</option>
                <option value="NRI With NIRO">NRI With NIRO</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label className="mb-2">
                Date of birth <span className="text-danger"></span>
              </label>
              <DatePicker
                onChange={this.onChangeDOB}
                value={this.state.dob}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-2">
                Legal Name <span className="text-danger"></span>
              </label>
              <Input
                type="text"
                value={this.state.legal_name}
                onChange={(e) => this.setState({ legal_name: e.target.value })}
              />
            </div>
            <div className="editor-field mb-3">
              <label className="mb-2">
                Father Name <span className="text-danger"></span>
              </label>
              <Input
                type="text"
                value={this.state.father_name}
                onChange={(e) => this.setState({ father_name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="mb-2">
                Address <span className="text-danger"></span>
              </label>
              <TextArea
                rows={4}
                value={this.state.address}
                onChange={(e) => this.setState({ address: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="mb-2">Bank Account No.</label>
              <Input
                type="number"
                value={this.state.bank_ac_no}
                onChange={(e) => this.setState({ bank_ac_no: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="mb-2">IFSC Code</label>
              <Input
                type="text"
                value={this.state.ifsc_code}
                onChange={(e) => this.setState({ ifsc_code: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="mb-2">
                Profile Image <span className="text-danger"></span>
              </label>
              <Input
                type="file"
                onChange={(e) => this.onChangeFile(e)}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start Edit modal  */}
        <Modal
          title="Update Investor"
          visible={this.state.editModalStatus}
          onOk={this.updateinvestor}
          okText="Update"
          // onCancel={this.cancel_updateinvestor}
          onCancel={() => this.setState({ editModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                First Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_first_name}
                onChange={(e) =>
                  this.setState({ edit_first_name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Last Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_last_name}
                onChange={(e) =>
                  this.setState({ edit_last_name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Email <span className="text-danger">*</span>
              </label>
              <Input
                type="email"
                value={this.state.edit_email}
                onChange={(e) => this.setState({ edit_email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Contact No <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_mobile}
                onChange={(e) => this.setState({ edit_mobile: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Nationality <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_nationality}
                onChange={(value) => this.setState({ edit_nationality: value })}
                readOnly
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Date of birth <span className="text-danger"></span>
              </label>
              <DatePicker
                onChange={this.onChangeDOBedit}
                value={this.state.edit_dob}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Legal Name <span className="text-danger"></span>
              </label>
              <Input
                type="text"
                value={this.state.edit_legal_name}
                onChange={(e) =>
                  this.setState({ edit_legal_name: e.target.value })
                }
              />
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">
                Father Name <span className="text-danger"></span>
              </label>
              <Input
                type="text"
                value={this.state.edit_father_name}
                onChange={(e) =>
                  this.setState({ edit_father_name: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                Address <span className="text-danger"></span>
              </label>
              <TextArea
                rows={4}
                value={this.state.edit_address}
                onChange={(e) =>
                  this.setState({ edit_address: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Bank Account No.</label>
              <Input
                type="number"
                value={this.state.edit_bank_ac_no}
                onChange={(e) =>
                  this.setState({ edit_bank_ac_no: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">IFSC Code</label>
              <Input
                type="text"
                value={this.state.edit_ifsc_code}
                onChange={(e) =>
                  this.setState({ edit_ifsc_code: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2 w-100">
                Profile Image <span className="text-danger"></span>
              </label>
              {this.state.image_to_show && (
                <img
                  src={this.state.image_to_show}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: 10,
                  }}
                />
              )}
              <Input
                type="file"
                onChange={(e) => this.onChangeFile2(e)}
                accept=".jpg, .jpeg, .png, .webp"
              />
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}

        {/* Start disable modal  */}
        <Modal
          title={
            this.state.isActiveValue == 0
              ? "Block/Disable Investor"
              : "Unblock Investor"
          }
          visible={this.state.disableModalStatus}
          onOk={this.disableUser}
          okText={this.state.isActiveValue == 0 ? "Block/Disable" : "Unblock"}
          onCancel={() => this.setState({ disableModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to{" "}
              {this.state.isActiveValue == 0 ? "block/Disable" : "Unblock"} to
              investor?
            </p>
          </Spin>
        </Modal>
        {/* End disable modal  */}

        {/* Start kyc modal  */}
        <Modal
          title="Verify Kyc"
          visible={this.state.kycmodalstatus}
          onOk={this.updatekycdetails}
          okText="Update"
          onCancel={() => {
            this.setState({ kycmodalstatus: false });
          }}
          width={600}
        >
          <Spin spinning={this.state.kycformloader}>
            {this.state.nationality == "Non Resident" ? (
              <>
                <div style={{ marginBottom: 20 }}>
                  <label>Legal Name:</label>
                  <br />
                  <Input
                    type="text"
                    style={{ width: 350 }}
                    onChange={(e) =>
                      this.setState({ legal_name: e.target.value })
                    }
                    value={this.state.legal_name}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label>Legal Address:</label>
                  <br />
                  <Input
                    type="text"
                    style={{ width: 350 }}
                    onChange={(e) =>
                      this.setState({ legal_address: e.target.value })
                    }
                    value={this.state.legal_address}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label>Bank Account (Swift):</label>
                  <br />
                  <Input
                    type="number"
                    onWheel={() => document.activeElement.blur()}
                    style={{ width: 350 }}
                    onChange={(e) =>
                      this.setState({ bank_account_swift: e.target.value })
                    }
                    value={this.state.bank_account_swift}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label>Bank Account Number:</label>
                  <br />
                  <Input
                    type="number"
                    onWheel={() => document.activeElement.blur()}
                    style={{ width: 350 }}
                    onChange={(e) =>
                      this.setState({ bank_account_no: e.target.value })
                    }
                    value={this.state.bank_account_no}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label>Verify KYC:</label>
                  <br />
                  <Input
                    type="text"
                    style={{ width: 350 }}
                    onChange={(e) =>
                      this.setState({ verify_kyc: e.target.value })
                    }
                    value={this.state.verify_kyc}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label>Tax ID:</label>
                  <br />
                  <Input
                    type="text"
                    style={{ width: 350 }}
                    onChange={(e) => this.setState({ tax_id: e.target.value })}
                    value={this.state.tax_id}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label>National ID:</label>
                  <br />
                  <Input
                    type="text"
                    style={{ width: 350 }}
                    onChange={(e) =>
                      this.setState({ national_id: e.target.value })
                    }
                    value={this.state.national_id}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label>Passport No:</label>
                  <br />
                  <Input
                    type="text"
                    style={{ width: 350 }}
                    onChange={(e) =>
                      this.setState({ passport: e.target.value })
                    }
                    value={this.state.passport}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label>Resident Country:</label>
                  <br />
                  <Input
                    type="text"
                    style={{ width: 350 }}
                    onChange={(e) =>
                      this.setState({ resident_country: e.target.value })
                    }
                    value={this.state.resident_country}
                  />
                </div>
              </>
            ) : (
              <div>
                {this.state.kycdetails && (
                  <div>
                    <h5 style={{ marginBottom: 15 }}>
                      <u>PAN No Details:</u>
                    </h5>
                    {
                      <p style={{ marginBottom: 20, color: "#000" }}>
                        <div style={{ marginBottom: 10 }}>
                          <label>PAN Number:</label>
                          <br />
                          <Input.Group compact>
                            <Input
                              type="text"
                              style={{ maxWidth: 350 }}
                              onChange={this.handlePanChange}
                              value={this.state.pan_number}
                              disabled={this.state.disabledFields.input1}
                            />
                            <Button type="secondary" onClick={() => this.handleButtonClick('input1')}>
                              {this.state.disabledFields.input1 ? <EditOutlined /> : <SaveOutlined />}
                            </Button>
                            {/* <Button onClick={this.verify_pan_no} type="primary">
                          Verify
                        </Button> */}
                          </Input.Group>
                          {!this.state.panValid && this.state.pan_number.trim() !== '' ? (
                            <p style={{ color: 'red' }}>Invalid PAN number.</p>
                          ) : null}
                        </div>
                        {/* Pan card no:{" "}
                        {this.state.kycdetails.panno
                          ? this.state.kycdetails.panno
                          : "---"}
                        <br /> */}
                        Reference id:{" "}
                        {this.state.pan_details[0]?.reference_id
                          ? this.state.pan_details[0]?.reference_id
                          : "---"}
                        <br />
                        Registered name:{" "}
                        {this.state.pan_details[0]?.registered_name
                          ? this.state.pan_details[0]?.registered_name
                          : "---"}
                        <br />
                        Type:{" "}
                        {this.state.pan_details[0]?.type
                          ? this.state.pan_details[0]?.type
                          : "---"}
                        <br />
                        Is valid:{" "}
                        {this.state.pan_details[0]?.valid == 1
                          ? "Valid"
                          : "Invalid"}
                        <br />
                      </p>
                    }

                    {/* <div style={{ marginBottom: 20 }}>
                      <label>Name :</label>
                      <br />
                      <Input.Group compact>
                        <Input
                          type="text"
                          style={{ maxWidth: 350 }}
                          onChange={(e) =>
                            this.setState({ pan_name: e.target.value })
                          }
                          value={this.state.pan_name && this.state.pan_name}
                          disabled={this.state.disabledFields.input2}
                        />
                        <Button type="secondary" onClick={() => this.handleButtonClick('input2')}>
                        {this.state.disabledFields.input2 ? <EditOutlined /> : <SaveOutlined />}
                        </Button>
                      </Input.Group>
                    </div> */}

                    <div style={{ marginBottom: 20 }}>
                      {this.state.pan_image ? (
                        <>
                          PAN Card Image:
                          <br />
                          <Image
                            width={200}
                            src={`${Apis.IMAGEURL}/pan/${this.state.investor_id}/${this.state.pan_image}`}
                          />
                          <br />
                          <label>Change PAN Card Image :</label>
                          <br />
                          <input
                            type="file"
                            name="file"
                            onChange={this.onPanimageChange}
                            style={{ width: 350 }}
                            accept="application/pdf, image/*"
                            // accept="application/pdf, pdf, .png, .jpg ,.jpeg"

                          />
                        </>
                      ) : (
                        <>
                          <label>Upload PAN Card Image :</label>
                          <br />

                          <input
                            type="file"
                            accept=" application/pdf, image/*"
                            name="file"
                            onChange={this.onPanimageChange}
                            style={{ width: 350 }}
                          />
                        </>
                      )}
                    </div>

                    <hr style={{ marginBottom: 20 }} />

                    <h5 style={{ marginBottom: 15 }}>
                      <u>Adhar card Details:</u>
                    </h5>
                    {
                      <p style={{ marginBottom: 20, color: "#000" }}>
                        <div style={{ marginBottom: 10 }}>
                          <label>Aadhaar Card Number:</label>
                          <br />
                          <Input.Group compact>
                            <Input
                              type="text"
                              style={{ maxWidth: 350 }}
                              onChange={(e) =>
                                this.setState({ adhar_number: e.target.value })
                              }
                              value={this.state.adhar_number}
                              disabled={this.state.disabledFields.input3}
                            />
                            <Button type="secondary" onClick={() => this.handleButtonClick('input3')}>
                              {this.state.disabledFields.input3 ? <EditOutlined /> : <SaveOutlined />}
                            </Button>
                          </Input.Group>
                        </div>
                        {/* <div style={{ marginBottom: 10 }}>
                          <label>Name (As on Aadhar ):</label>
                          <br />
                          <Input.Group compact>
                            <Input
                              type="text"
                              style={{ maxWidth: 350 }}
                              onChange={(e) =>
                                this.setState({ adhaar_name: e.target.value })
                              }
                              value={this.state.adhaar_name}
                              disabled={this.state.disabledFields.input4}
                            />
                            <Button type="secondary" onClick={() => this.handleButtonClick('input4')}>
                              {this.state.disabledFields.input4 ? <EditOutlined /> : <SaveOutlined />}
                            </Button>
                          </Input.Group>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          <label>Address (As on Aadhar):</label>
                          <br />
                          <Input.Group compact>
                            <Input
                              type="text"
                              style={{ maxWidth: 350 }}
                              onChange={(e) =>
                                this.setState({ adhaar_address: e.target.value })
                              }
                              value={this.state.adhaar_address}
                              disabled={this.state.disabledFields.input6}
                            />
                            <Button type="secondary" onClick={() => this.handleButtonClick('input6')}>
                              {this.state.disabledFields.input6 ? <EditOutlined /> : <SaveOutlined />}
                            </Button>
                          </Input.Group>
                        </div> */}
                        {/* Adhar card no:{" "}
                          {this.state.kycdetails.adharno
                            ? this.state.kycdetails.adharno
                            : "---"}
                          <br /> */}
                        Name:{" "}
                        {this.state.adhar_details[0]?.name
                          ? this.state.adhar_details[0]?.name
                          : "---"}
                        <br />
                        Father Name:{" "}
                        {this.state.adhar_details[0]?.care_of
                          ? this.state.adhar_details[0]?.care_of
                          : "---"}
                        <br />
                        DOB:{" "}
                        {this.state.adhar_details[0]?.dob
                          ? this.state.adhar_details[0]?.dob
                          : "---"}
                        <br />
                        Gender:{" "}
                        {this.state.adhar_details[0]?.gender
                          ? this.state.adhar_details[0]?.gender
                          : "---"}
                        <br />
                        {/* Mobile no: {this.state.adhar_details[0].mobile_no?this.state.adhar_details[0].mobile_no:'---'}<br/> */}
                        Reference id:{" "}
                        {this.state.adhar_details[0]?.reference_id
                          ? this.state.adhar_details[0]?.reference_id
                          : "---"}
                        <br />
                        Address:{" "}
                        {this.state.adhar_details[0]?.address
                          ? this.state.adhar_details[0]?.address
                          : "---"}
                        <br />
                        {/* Is valid: {this.state.adhar_details[0].valid==1?'Valid':'Invalid'}<br/> */}
                      </p>
                    }

                    {/* <div style={{ marginBottom: 20 }}>
                      <label>Father's Name:</label>
                      <br />
                      <Input.Group compact>
                        <Input
                          type="text"
                          style={{ maxWidth: 350 }}
                          onChange={(e) =>
                            this.setState({ father_name: e.target.value })
                          }
                          value={this.state.father_name}
                          disabled={this.state.disabledFields.input5}
                        />
                        <Button type="secondary" onClick={() => this.handleButtonClick('input5')}>
                          {this.state.disabledFields.input5 ? <EditOutlined /> : <SaveOutlined />}
                        </Button>
                      </Input.Group>
                    </div> */}

                    <div>
                      <div style={{ marginBottom: 20 }}>
                        {this.state.adhar_front_img ? (
                          <>
                            Adhar Card Image Front:
                            <br />
                            <Image
                              width={200}
                              src={`${Apis.IMAGEURL}/adhar-front/${this.state.investor_id}/${this.state.adhar_front_img}`}
                            />
                            <br />
                            <label>Change Adhar Card Image Front :</label>
                            <br />
                            <input
                              accept="application/pdf, image/*"
                              type="file"
                              name="file"
                              onChange={this.onAdharFrontimageChange}
                              style={{ width: 350 }}
                            />
                          </>
                        ) : (
                          <>
                            <label>Upload Adhar Card Image Front :</label>
                            <br />

                            <input
                              type="file"
                              accept="application/pdf, image/*"
                              name="file"
                              onChange={this.onAdharFrontimageChange}
                              style={{ width: 350 }}
                            />
                          </>
                        )}
                      </div>
                      <div>
                        <div style={{ marginBottom: 20 }}>
                          {this.state.adhar_back_img ? (
                            <>
                              Adhar Card Image Back:
                              <br />
                              <Image
                                width={200}
                                src={`${Apis.IMAGEURL}/adhar-back/${this.state.investor_id}/${this.state.adhar_back_img}`}
                              />
                              <br />
                              <label>Change Adhar Card Image Back :</label>
                              <br />
                              <input
                                type="file"
                                accept="application/pdf, image/*"
                                name="file"
                                onChange={this.onAdharBackimageChange}
                                style={{ width: 350 }}
                              />
                            </>
                          ) : (
                            <>
                              <label>Upload Adhar Card Image Back :</label>
                              <br />

                              <input
                                type="file"
                                accept="application/pdf, image/*"
                                name="file"
                                onChange={this.onAdharBackimageChange}
                                style={{ width: 350 }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <hr style={{ marginBottom: 20 }} />

                    <h5 style={{ marginBottom: 15 }}>
                      <u>Bank Account Details:</u>
                    </h5>
                    {
                      <p style={{ marginBottom: 20, color: "#000" }}>
                        <div style={{ marginBottom: 10 }}>
                          <label>Bank Account Number:</label>
                          <br />
                          <Input.Group compact>
                            <Input
                              type="text"
                              style={{ maxWidth: 350 }}
                              onChange={(e) =>
                                this.setState({ bank_number: e.target.value })
                              }
                              value={this.state.bank_number}
                              disabled={this.state.disabledFields.input2}
                            />
                            <Button type="secondary" onClick={() => this.handleButtonClick('input2')}>
                              {this.state.disabledFields.input2 ? <EditOutlined /> : <SaveOutlined />}
                            </Button>
                          </Input.Group>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          <label>IFSC code:</label>
                          <br />
                          <Input.Group compact>
                            <Input
                              type="text"
                              style={{ maxWidth: 350 }}
                              onChange={(e) =>
                                this.setState({ ifsc_bank: e.target.value })
                              }
                              value={this.state.ifsc_bank}
                              disabled={this.state.disabledFields.input5}
                            />
                            <Button type="secondary" onClick={() => this.handleButtonClick('input5')}>
                              {this.state.disabledFields.input5 ? <EditOutlined /> : <SaveOutlined />}
                            </Button>
                          </Input.Group>
                        </div>
                        {/* Bank account no:{" "}
                        {this.state.kycdetails.bank_ac_no
                          ? this.state.kycdetails.bank_ac_no
                          : "---"}
                        <br />
                        Ifsc code:{" "}
                        {this.state.kycdetails.ifsc_code
                          ? this.state.kycdetails.ifsc_code
                          : "---"}
                        <br /> */}
                        Bank account is exits:{" "}
                        {this.state.bank_details[0]?.account_exists
                          ? this.state.bank_details[0]?.account_exists
                          : "---"}
                        <br />
                        {/* Amount deposited: {this.state.bank_details[0].amount_deposited?this.state.bank_details[0].amount_deposited:'---'}<br/> */}
                        Name at bank:{" "}
                        {this.state.bank_details[0]?.name_at_bank
                          ? this.state.bank_details[0]?.name_at_bank
                          : "---"}
                        <br />
                        Reference id:{" "}
                        {this.state.bank_details[0]?.ref_id
                          ? this.state.bank_details[0]?.ref_id
                          : "---"}
                        <br />
                      </p>
                    }

                    {/* <div style={{ marginBottom: 20 }}>
                      <label>Account Name:</label>
                      <br />
                      <Input
                        type="text"
                        style={{ maxWidth: 350 }}
                        onChange={(e) =>
                          this.setState({ account_name: e.target.value })
                        }
                        value={this.state.account_name}
                      />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label>Branch Name:</label>
                      <br />
                      <Input
                        type="text"
                        style={{ maxWidth: 350 }}
                        onChange={(e) =>
                          this.setState({ branch_name: e.target.value })
                        }
                        value={this.state.branch_name}
                      />
                    </div> */}

                    <div>
                      <div style={{ marginBottom: 20 }}>
                        {this.state.cheque_image ? (
                          <>
                            Cancel Cheque Image:
                            <br />
                            <Image
                              width={200}
                              src={`${Apis.IMAGEURL}/cheque_image/${this.state.investor_id}/${this.state.cheque_image}`}
                            />
                            <br />
                            <label>Update Cancel Cheque Image :</label>
                            <br />
                            <input
                              type="file"
                              accept="application/pdf, image/*"
                              name="file"
                              onChange={this.onCancelChequeimageChange}
                              style={{ width: 350 }}
                            />
                          </>
                        ) : (
                          <>
                            <label>Upload Cancel Cheque Image :</label>
                            <br />

                            <input
                              type="file"
                              accept="application/pdf, image/*"
                              name="file"
                              onChange={this.onCancelChequeimageChange}
                              style={{ width: 350 }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <br />

            {/* <div style={{ marginBottom: 20 }}>
              <label>Legal Name:</label>
              <br />
              <Input
                type="text"
                style={{ width: 350 }}
                onChange={(e) => this.setState({ legal_name: e.target.value })}
                value={this.state.legal_name}
              />
            </div> */}

            <div>
              <hr style={{ marginBottom: 20 }} />
              <h5 style={{ marginBottom: 15 }}>
                <u>For Documentation:</u>
              </h5>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label>Legal name:</label>
              <br />
              <Input.Group compact>
                <Input
                  type="text"
                  style={{ maxWidth: 350 }}
                  onChange={(e) =>
                    this.setState({ legal_name: e.target.value })
                  }
                  value={this.state.legal_name}
                  disabled={this.state.disabledFields.input7}
                />
                <Button type="secondary" onClick={() => this.handleButtonClick('input7')}>
                  {this.state.disabledFields.input7 ? <EditOutlined /> : <SaveOutlined />}
                </Button>
              </Input.Group>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({
                      legal_name: this.state.pan_details[0]?.registered_name,
                    });
                  }
                }}
              >
                Same as PAN Card
              </Checkbox>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Father Name:</label>
              <br />
              <Input.Group compact>
                <Input
                  type="text"
                  style={{ maxWidth: 350 }}
                  onChange={(e) =>
                    this.setState({ father_name: e.target.value })
                  }
                  value={this.state.father_name}
                  disabled={this.state.disabledFields.input4}
                />
                <Button type="secondary" onClick={() => this.handleButtonClick('input4')}>
                  {this.state.disabledFields.input4 ? <EditOutlined /> : <SaveOutlined />}
                </Button>
              </Input.Group>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({
                      father_name: this.state.adhar_details[0]?.care_of,
                    });
                  }
                }}
              >
                Same as Aadhar Card
              </Checkbox>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Legal Address:</label>
              <br />
              <Input.Group compact>
                <Input
                  type="text"
                  style={{ maxWidth: 350 }}
                  onChange={(e) =>
                    this.setState({ legal_address: e.target.value })
                  }
                  value={this.state.legal_address}
                  disabled={this.state.disabledFields.input8}
                />
                <Button type="secondary" onClick={() => this.handleButtonClick('input8')}>
                  {this.state.disabledFields.input8 ? <EditOutlined /> : <SaveOutlined />}
                </Button>
              </Input.Group>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({
                      legal_address: this.state.adhar_details[0]?.address,
                    });
                  }
                }}
              >
                Same as Aadhar Card
              </Checkbox>
            </div>

            <div>
              <label className="mb-1">
                Verify KYC <span className="text-danger">*</span>
              </label>
              <br />
              <Select
                value={this.state.kycstatus}
                style={{ width: 350 }}
                onChange={(value) => this.setState({ kycstatus: value })}
                placeholder="Please select kyc status"
              >
                <Option value="">Select Kyc Status</Option>
                <Option value="admin_approved">Admin Approved</Option>
                <Option value="admin_rejected">Admin Rejected</Option>
                <Option value="Pending">Pending</Option>
                <Option value="system_approved">System Approved</Option>
              </Select>
            </div>
            {this.state.nationality == "Non Resident" ? (
              <div style={{ marginBottom: 20, marginTop: 20 }}>
                <label>Remark:</label>
                <br />
                <TextArea
                  rows={4}
                  style={{ width: 350 }}
                  value={this.state.remark}
                  onChange={(e) => this.setState({ remark: e.target.value })}
                />
              </div>
            ) : (
              <div style={{ marginTop: 20 }}>
                <label className="mb-1">
                  Remark <span className="text-danger">*</span>
                </label>
                <br />
                <TextArea
                  style={{ width: 350 }}
                  rows={4}
                  value={this.state.kyc_remark}
                  onChange={(e) =>
                    this.setState({ kyc_remark: e.target.value })
                  }
                />
              </div>
            )}
          </Spin>
        </Modal>
        {/* End kyc modal  */}

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
                <Option value="Public">Public</Option>
                <Option value="Private">Private</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End update status modal  */}

        <Modal
          title="G91 Money"
          visible={this.state.g91modalstatus}
          onCancel={() => this.setState({ g91modalstatus: false })}
          footer={false}
          width={700}
        >
          <Card
            title=""
            extra={<Button type="primary" onClick={() => this.setState({ addg91modalstatus: true })}>Add G91 Money</Button>}
            style={{ width: '100%' }}
          >
            <Table
              dataSource={g91dataSource}
              columns={g91columns}
              loading={this.state.loading}
              bordered
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Modal>

        {/* Add modal  */}
        <Modal
          title="Add G91 Money"
          visible={this.state.addg91modalstatus}
          onOk=""
          onCancel={() => this.setState({ addg91modalstatus: false })}
          width={450}
          okText={'Submit'}
        >
          <div className='mt-2'>
            <label className='mb-2'>Amount <span className='text-danger'>*</span></label>
            <br />
            <Input
            />
          </div>
          <div className='mt-2'>
            <label className='mb-2'>Description <span className='text-danger'>*</span></label>
            <br />
            <Input
            />
          </div>
        </Modal>
      </>
    );
  }
}

export default Investors;
