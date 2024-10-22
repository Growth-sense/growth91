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


const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class Founders extends Component {
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
      modes:"ass"
    };
  }

  componentDidMount() {
    this.getfounderlist();
  }

  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  };

  // get post list
  getfounderlist = () => {
    this.setState({ loading: true });
    Bridge.founders.list().then((result) => {
      if (result.status == 1) {
        this.setState({
          allFounders: result.data,
          founderlist: result.data.map((el)=>{return {...el,name: el.first_name + " " + el.last_name}}),
          cfounderlist: result.data.map((el)=>{return {...el,name: el.first_name + " " + el.last_name}}),
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
    } else {
      this.setState({
        editlogo: e.target.files[0],
      });
    }
  };

  // show edit modal
  showEditModal = (item) => {
    console.log("item", item);
    // let logourl = Apis.IMAGEURL+'deal/logo/'+item.deal_id+'/'+item.logo;
    // let bannerimg = Apis.IMAGEURL+'deal/banner/'+item.deal_id+'/'+item.banner_img;

    this.setState({
      edit_first_name: item.first_name,
      edit_last_name: item.last_name,
      edit_mobile: item.mobile,
      edit_email: item.email,
      edit_startup_name: item.startup_name,
      edit_nationality: item.nationality,
      edit_dob: item.date_of_birth ? moment(item.date_of_birth) : "",
      edit_legal_name: item.legal_name,
      edit_father_name: item.fathers_name,
      edit_address: item.address,
      edit_bank_ac_no: item.bank_ac_no,
      edit_ifsc_code: item.ifsc_code,
      editModalStatus: true,
      founder_id: item.investor_id,
    });
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
    } else if (this.state.edit_startup_name == "") {
      message.warning("Startup name is required.");
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
    // }else if(this.state.edit_bank_ac_no == ''){
    //   message.warning('Bank account no is required.');
    //   return false;
    // }else if(this.state.edit_ifsc_code == ''){
    //   message.warning('IFSC code is required.');
    //   return false;
    // }

    this.setState({ formloader: true });

    let params = {
      first_name: this.state.edit_first_name,
      last_name: this.state.edit_last_name,
      mobile: this.state.edit_mobile,
      email: this.state.edit_email,
      startup_name: this.state.edit_startup_name,
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
            edit_startup_name: "",
            edit_nationality: "",
            edit_dob: "",
            edit_legal_name: "",
            edit_father_name: "",
            edit_address: "",
            edit_bank_ac_no: "",
            edit_ifsc_code: "",
            founder_id: "",
          },
          () => this.getfounderlist()
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
    // window.location.reload();
  };
  // cancel post reload
  // cancel_updatedeal = () => {
  //   this.setState({ editModalStatus:false });
  //   window.location.reload();
  // }

  showDisableModel = (item) => {
    this.setState({
      disableModelStatus: true,
      founder_id: item.investor_id,
      isActiveValue: item.user_block_status,
    });
  };

  disableFounder = () => {
    if (this.state.founder_id == "") {
      message.warning("Please select the founder first.");
      return false;
    }
    this.setState({ formloader: true });
    let params = "";
    if (this.state.isActiveValue == 0) {
      params = {
        investor_id: this.state.founder_id,
        user_block_status: 1,
      };
    } else {
      params = {
        investor_id: this.state.founder_id,
        user_block_status: 0,
      };
    }
    Bridge.admin.block_disable_investor(params).then((result) => {
      if (result.status == "1") {
        this.setState(
          { disableModelStatus: false, formloader: false, founder_id: "" },
          () => this.getfounderlist()
        );
        if (this.state.isActiveValue == 0) {
          message.success("User has been blocked/Disable Successfully", 5);
        } else {
          message.success("User has been Unblocked Successfully", 5);
        }
      } else {
        this.setState(
          { disableModelStatus: false, formloader: false, founder_id: "" },
          () => this.getfounderlist()
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
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      console.log(this.state.cfounderlist);
      for (let item of this.state.cfounderlist) {
        console.log(item);

        if (
          (item.startup_name && item.startup_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
          (item.last_name && item.last_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.investor_id && item.investor_id.includes(text)) ||
          (item.email && item.email.includes(text)) ||
          (item.mobile && item.mobile.includes(text))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        founderlist: arr,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
        founderlist: this.state.cfounderlist,

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
    console.log("value", value);
    this.setState({ category: value });
  };
  handleChangeSelectededit = (value) => {
    console.log("value", value);
    this.setState({ editcategory: value });
  };

  // on change file
  onChangeFile = (e) => {
    this.setState({
      profile_image: e.target.files[0],
    });
  };

  onChangeEmail = (email) => {
    this.setState({ email: email });
    for (let item of this.state.allFounders) {
      if (item.email && item.email == email) {
        message.warning("Given Email Already Exist.");
        break;
      }
    }
  };

  // add new founder
  addfounder = () => {
    let emailisPresent = false;
    for (let item of this.state.allFounders) {
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
      message.warning(
        "Email is aready Exist, Please try to add different Email"
      );
      return false;
    } else if (this.state.mobile == "") {
      message.warning("Contact no is required.");
      return false;
    } else if (this.state.startup_name == "") {
      message.warning("Startup name is required.");
      return false;
    } else if (this.state.nationality == "") {
      message.warning("Please select the nationality option.");
      return false;
    }
    // else if(this.state.dob == ''){
    //   message.warning('Date of birth is required.');
    //   return false;
    // }else if(this.state.legal_name == ''){
    //   message.warning('Legal name is required.');
    //   return false;
    // }else if(this.state.father_name == ''){
    //   message.warning('Father name is required.');
    //   return false;
    // }else if(this.state.address == ''){
    //   message.warning('Address is required.');
    //   return false;
    // }else if(this.state.bank_ac_no == ''){
    //   message.warning('Bank account no is required.');
    //   return false;
    // }else if(this.state.ifsc_code == ''){
    //   message.warning('IFSC code is required.');
    //   return false;
    // }else if(this.state.profile_image == ''){
    //   message.warning('Please select the image first');
    //   return false;
    // }

    this.setState({ formloader: true });

    let params = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      mobile: this.state.mobile,
      email: this.state.email,
      startup_name: this.state.startup_name,
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
          startupname: "",
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
    // window.location.reload();
  };
  //cancel post reload
  // cancel_addfounder=()=>{
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

    console.log("formdata", formdata);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Bridge.deal.uploaddealimg(formdata, config).then((result) => {
      if (result.status == 1) {
        this.setState({}, () => this.getfounderlist());
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
          () => this.getfounderlist()
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
  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.founderlist) {
      let obj = {
        "Sr No": count,
        "Founder Id": item.investor_id,
        Name: item.first_name + " " + item.last_name,
        "Startup Name": item.startup_name,
        "Contact No": item.mobile,
        Email: item.email,
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

  render() {
    const disdingid = (datas) => {
      console.log(this.state.modes);
      if(this.state.modes=="ass"){

        const data = [...this.state.founderlist]
          .map((el) => {
            return { ...el, investor_id: Number(el.investor_id) };
          }).sort((a, b) => {
            console.log(datas);
            return a.investor_id> b.investor_id ? 1 : -1;
          });
        this.setState({
          founderlist: data,
          modes:"dis"

        });
        console.log(data);
      }
      else if(this.state.modes=="dis"){
        const data = [...this.state.founderlist]
          .map((el) => {
            return { ...el, investor_id: Number(el.investor_id) };
          }).sort((a, b) => {
            console.log(datas);
            return a.investor_id> b.investor_id ? -1 : 1;
          });
        this.setState({
          founderlist: data,
          modes:"ass"
        });
        console.log(data);
      }
       
       
    };
    const disdingname= (datas) => {
      if(this.state.modes=="ass"){

        const data = [...this.state.founderlist]
          .map((el) => {
            return { ...el, name: el.name.toLowerCase() };
          }).sort((a, b) => {
            console.log(datas);
            return a.name> b.name ? 1 : -1;
          });
        this.setState({
          founderlist: data,
          modes:"dis"

        });
        console.log(data);
      }
      else if(this.state.modes=="dis"){
        const data = [...this.state.founderlist]
          .map((el) => {
            return { ...el, name: el.name.toLowerCase() };
          }).sort((a, b) => {
            console.log(datas);
            return a.name> b.name ? -1 : 1;
          });
        this.setState({
          founderlist: data,
          modes:"ass"
        });
        console.log(data);
      }


      
    };
    const dataSource =
      this.state.founderlist &&
      this.state.founderlist.map((item, index) => {
        return {
          key: index,
          founderid: item.investor_id,
          name:item.name && (item.name).toLowerCase(),  
                  startupname: item.startup_name ? item.startup_name : "---",
          contactno: item.mobile ? item.mobile : "---",
          email: item.email ? item.email : "---",
          isActive: item.user_block_status ? item.user_block_status : 0,
          action: item,
        };
      });

    const columns = [
      {
        title:<span
        onClick={() => {
          disdingid();
        }}
      >Founder Id</span>,
        dataIndex: "founderid",
        key: "founderid",
        width: 160,
        fixed: "left",
      },
      {
        title:  <span
        onClick={() => {
          disdingname()
        }}
      >Name</span>,
        dataIndex: "name",
        key: "name",
        width: 100,
        fixed: "left",
        render:(text,record)=>{
          return <span style={{textTransform:"capitalize"}}>{text}</span>
        }
      },
      {
        title: "Startup Name",
        dataIndex: "startupname",
        key: "startupname",
        width: 180,
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
                  onClick={() => this.showEditModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item>
             {/* { localStorage.getItem("super_admin") === "1" &&( */}
              text.user_block_status == 0 ? (
                <Menu.Item
                  key={`disable${record.key}`}
                  icon={<EyeInvisibleOutlined />}
                >
                  <a
                    href="#"
                    style={{ fontSize: 14 }}
                    onClick={() => this.showDisableModel(text)}
                  >
                    &nbsp;&nbsp;Disable/Block
                  </a>
                </Menu.Item>
              ) : (
                <Menu.Item key={`unblock${record.key}`} icon={<EyeOutlined />}>
                  <a
                    href="#"
                    style={{ fontSize: 14 }}
                    onClick={() => this.showDisableModel(text)}
                  >
                    &nbsp;&nbsp;Unblock
                  </a>
                </Menu.Item>
              )
              {/* )} */}
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
                title="Founders"
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
                    Add New Founder
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
                  <Breadcrumb.Item>Founders</Breadcrumb.Item>
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
                    onClick={() => this.exportToCSV("Founder list")}
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
          title="Add New Founder"
          visible={this.state.addModalStatus}
          onOk={this.addfounder}
          okText="Submit"
          // onCancel={this.cancel_addfounder}
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                First Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.first_name}
                onChange={(e) => this.setState({ first_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Last Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.last_name}
                onChange={(e) => this.setState({ last_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Email <span className="text-danger">*</span>
              </label>
              <Input
                type="email"
                value={this.state.email}
                onChange={(e) => this.onChangeEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Contact No <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.mobile}
                onChange={(e) => this.setState({ mobile: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">
                Startup Name<span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.startup_name}
                onChange={(e) =>
                  this.setState({ startup_name: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
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
            <div className="form-group mt-3">
              <label className="mb-2">Date of birth</label>
              <DatePicker
                onChange={this.onChangeDOB}
                value={this.state.dob}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Legal Name</label>
              <Input
                type="text"
                value={this.state.legal_name}
                onChange={(e) => this.setState({ legal_name: e.target.value })}
              />
            </div>
            <div className="mt-4 editor-field">
              <label className="mb-2">Father Name</label>
              <Input
                type="text"
                value={this.state.father_name}
                onChange={(e) => this.setState({ father_name: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Address</label>
              <TextArea
                rows={4}
                value={this.state.address}
                onChange={(e) => this.setState({ address: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Bank Account No.</label>
              <Input
                type="number"
                value={this.state.bank_ac_no}
                onChange={(e) => this.setState({ bank_ac_no: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">IFSC Code</label>
              <Input
                type="number"
                value={this.state.ifsc_code}
                onChange={(e) => this.setState({ ifsc_code: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">Profile Image </label>
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
          title="Update Founder"
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
            <div className="form-group">
              <label className="mb-2">
                Startup Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.edit_startup_name}
                onChange={(e) =>
                  this.setState({ edit_startup_name: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Nationality <span className="text-danger">*</span>
              </label>
              <select
                name="nationality"
                className="form-input-field"
                value={this.state.edit_nationality}
                onChange={this.edit_nationality}
              >
                <option value="">Select Nationality</option>
                <option value="Indian Citizen">Indian Citizen</option>
                <option value="International">International</option>
                <option value="NRI With NIRO">NRI With NIRO</option>
              </select>
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
              <label className="mb-2">
                Bank Account No. <span className="text-danger"></span>
              </label>
              <Input
                type="number"
                value={this.state.edit_bank_ac_no}
                onChange={(e) =>
                  this.setState({ edit_bank_ac_no: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                IFSC Code <span className="text-danger"></span>
              </label>
              <Input
                type="number"
                value={this.state.edit_ifsc_code}
                onChange={(e) =>
                  this.setState({ edit_ifsc_code: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
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
        {/* End Edit modal  */}

        {/* Start disable modal  */}
        <Modal
          title={
            this.state.isActiveValue == 0
              ? "Block/Disable Founder"
              : "Unblock Founder"
          }
          visible={this.state.disableModelStatus}
          onOk={this.disableFounder}
          okText={this.state.isActiveValue == 0 ? "Block/Disable" : "Unblock"}
          onCancel={() => this.setState({ disableModelStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to{" "}
              {this.state.isActiveValue == 0 ? "block/Disable" : "Unblock"} to
              founder?
            </p>
          </Spin>
        </Modal>
        {/* End disable modal  */}

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
      </>
    );
  }
}

export default Founders;
