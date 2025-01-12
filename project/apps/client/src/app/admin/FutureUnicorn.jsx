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
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Apis from "../constants/Apis";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { InformationList } from "../InformationList";
import { FutureUnicornList } from "../FutureUnicornList";


const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class FutureUnicorn extends Component {
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
      disableModelStatus: false,
      ctype: "",
      editctype: "",
      youtubelink: "",

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
      dealstatus: "",
      updatemodalstatus: false,

      logourl: "",
      bannerurl: "",

      founderlist: [],
      cfounderlist: [],
      allFounders: [],

      // add founder state list
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      startup_name: "",
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
      edit_startup_name: "",
      edit_nationality: "",
      edit_dob: "",
      edit_legal_name: "",
      edit_father_name: "",
      edit_address: "",
      edit_bank_ac_no: "",
      edit_ifsc_code: "",
      edit_profile_image: "",
      isActiveValue: 0,
    };
  }




  render() {
    

    return (
   <>
   {localStorage.getItem("founder_id")?(<InformationList/>):(<FutureUnicornList/>)}
   </>
    );
  }
}

export default FutureUnicorn;



