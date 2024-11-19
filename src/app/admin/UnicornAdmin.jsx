/* eslint-disable jsx-a11y/anchor-is-valid */
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
  Dropdown,
  Menu,
  Input,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import { EditOutlined, DeleteOutlined, ManOutlined } from "@ant-design/icons";
import Documents from "./components/modal/Documents";
import Investors from "./components/modal/Investors";
import Analytics from "./components/modal/Analytics";
import Sidebar2 from "./common/Sidebar2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import { Link } from "react-router-dom";
import Urldata from "../investor/components/Urldata";
import { useLocation } from "react-router-dom";
import Founderadmindashboard from "../Unicorn/forms/Founderadmindashboard";

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class UnicornAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startups: [],
      cstartups: [],
      startupid: "",
      searchinput: "",

      // add
      name: "",
      status: "",
      created_at: "",

      // edit
      editname: "",
      editstatus: "",
      editModalStatus: false,

      addModalStatus: false,
      loading: false,
      formloader: false,
      founderlist: [],
      selectedfounder: [],
      editselectedfounder: [],
      authorised_founder: "",
      operational_founder: "",
      edit_authorised_founder: "",
      edit_operational_founder: "",
      enquireModalStatus: false,
      commitexport: "",
      intrestedlist: "",
      show_investor_presentation_modal: false,
      previewid: "",
      formpreviewid: "",
      previewmodal: false,
      formpreviewmodal: false,
    };
  }

  componentDidMount() {
    this.getgrouplist();
    // this.getstartuplist();
    setTimeout(() => {
      // this.getfounderlist();
    }, 1000);
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
        // console.log('result', result.data);
        // let arr=[];
        // for(let item of result.data){
        //   let status=false;
        //   for(let item2 of this.state.cstartups){
        //     if(item2.founder_id==item.investor_id){
        //       status=true;
        //     }
        //   }
        //   if(status==false){
        //     arr=[...arr,item];
        //   }
        // }
        // console.log('arr',arr);
        this.setState({
          founderlist: result.data,
          cfounderlist: result.data,
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
  getgrouplist = () => {
    this.setState({ loading: true });
    let params = {
      page: 0,
      pagesize: 10,
    };
    Bridge.Unicorn.unicorndealsByInvestors(params).then((result) => {
      if (result.status == 1) {
        // console.log(result);

        this.setState({
          startups: result.data,
          cstartups: result.data,
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

  getintrestedlist = (data) => {
    this.setState({ loading: true });
    // console.log(data);

    let params = {
      udFounderID: data,
    };
    Bridge.Unicorn.unicorn_interested_list(params).then((result) => {
      if (result.status == 1) {
        // console.log(result);

        this.setState({
          intrestedlist: result.data,

          loading: false,
          commitexport: result.data.map((item, index) => {
            return {
              key: index,
              first_name: item.first_name + " " + item.last_name,
              email: item.email,
              mobile: item.mobile,
              interestDate: item.interestDate,
              Intrested:
                (item.interestKnowMore == 1 &&
                  "I Want to know more about it") ||
                (item.interestWorkwithYou == 1 && "I want to work with you") ||
                (item.interestInvestinStartup == 1 &&
                  "I am excited to invest in your startups"),
              Comments: item.interestMessage,
              // emailcontent: emaildata,
            };
          }),
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

  // update post

  showenquiremodal = (item) => {
    // console.log(item);
    this.getintrestedlist(item.udFounderID);
    this.setState({
      enquireModalStatus: true,
      startupid: item.startupid,
    });
  };

  // actuall functionality

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      // console.log(this.state.startups);

      for (let item of this.state.startups) {
        if (
          (item.udPrimaryContactName &&
            item.udPrimaryContactName
              .toLowerCase()
              .includes(text.toLowerCase())) ||
          (item.udStartupName &&
            item.udStartupName.toLowerCase().includes(text.toLowerCase())) ||
          (item.udEmail &&
            item.udEmail.toLowerCase().includes(text.toLowerCase())) ||
          // (item.status &&
          //   item.status.toLowerCase().includes(text.toLowerCase())) ||
          (item.unicornDealID &&
            item.unicornDealID.includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        startups: arr,
        loading: false,
      });
    } else {
      this.setState({
        startups: this.state.cstartups,
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

  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.startups) {
      let obj = {
        "Sr No": count++,
        "Unicorn ID": item.unicornDealID ? item.unicornDealID : "---",
        "Unicorn Name": item.udStartupName ? item.udStartupName : "---",
        "Unicorn Status": item.groupStatus ? item.groupStatus : "Published",

        "Founder Id": item.udFounderID ? item.udFounderID : "---",
        Email: item.udEmail ? item.udEmail : "---",
        "Founder Name": item.udPrimaryContactName
          ? item.udPrimaryContactName
          : "---",
        "Founder Mobile": item.udPrimaryContactMobile
          ? item.udPrimaryContactMobile
          : "---",

        // Status: item.status,
        // 'Tax Type': item.payment_type,
        // 'KYC Status': item.isapproved,
        // 'Invested date': item.Invested_dt ? moment(item.Invested_dt).format('DD MMM, YYYY') : '---',
      };
      arr = [...arr, obj];
      // count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Investment data exported successfully.");
  };
  exportToCSV_CommitList = (fileName) => {
    let arr = [];
    let count = 1;
    // console.log(this.state.commitexport);

    for (let item of this.state.commitexport) {
      let obj = {
        "Sr No": count++,
        Name: item.first_name,
        "E-mail": item.email,
        "Interest Shown Date": item.interestDate,
        "Mobile Number": item.mobile,
        "Comments from Visitor": item.Comments,
        "Type of Interest Shown":
          item.Intrested == false ? "---" : item.Intrested,

        // Status: item.status,
        // 'Tax Type': item.payment_type,
        // 'KYC Status': item.isapproved,
        // 'Invested date': item.Invested_dt ? moment(item.Invested_dt).format('DD MMM, YYYY') : '---',
      };
      arr = [...arr, obj];
      // count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Investment data exported successfully.");
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

  selectFounder = (value) => {
    this.setState({ selectedfounder: value });
  };

  editselectFounder = (value) => {
    this.setState({ editselectedfounder: value });
  };
  getmember = (value, id) => {
    this.setState({ ids: value });
    let params = {
      parent_id: localStorage.getItem("Parent_investor_id"),
      groupID: value,
    };
    Bridge.investor.getfamilymember(params).then((result) => {
      // console.log(result);
      const data = result.data.filter((item, index) => {
        // console.log(item.investor_id);
        // console.log(localStorage.getItem("investor_id"));
        return item.investor_id == localStorage.getItem("investor_id");
      });
      // console.log(data);
      // console.log(data.length, "0");
      //   if(data.length !=0 ){
      //     localStorage.setItem(
      //       "investor_id",
      //       localStorage.getItem("Parent_investor_id")
      //     );
      //     localStorage.setItem(
      //       "investor_email",
      //       localStorage.getItem("Parent_investor_email")
      //     );
      //     localStorage.setItem(
      //       "investor_kycstatus",
      //       localStorage.getItem("Parent_investor_kycstatus")
      //     );
      //     localStorage.setItem(
      //       "investor_name",
      //       localStorage.getItem("Parent_investor_name")
      //     );
      // // window.location.reload();

      //   }
      this.setState({ memberdetail: result.data });
    });
  };
  render() {
    // console.log(this.state.formpreviewid);
    
    const highlightimages = [
      "./assets/images/deals-details/Petmojo/highlight4.jpg",
      "./assets/images/deals-details/Petmojo/highlight01.jpg",
      "./assets/images/deals-details/highlight2.jfif",
      "./assets/images/deals-details/highlight3.jpg",
    ];
    const dataSource =
      this.state.startups &&
      this.state.startups.map((item, index) => {
        // console.log(item);
        return {
          UnicornID: item.unicornDealID ? item.unicornDealID : "---",
          "Unicorn Name": item.udStartupName ? item.udStartupName : "---",
          Email: item.udEmail ? item.udEmail : "---",
          "Unicorn Status": item.groupStatus ? item.groupStatus : "Published",
          "Admin Name": item.udPrimaryContactName
            ? item.udPrimaryContactName
            : "---",
          "Admin Mobile": item.udPrimaryContactMobile
            ? item.udPrimaryContactMobile
            : "---",
          AdminId: item.udFounderID ? item.udFounderID : "---",
          action: item,
        };
      });

    const columns = [
      {
        title: "Unicorn ID",
        dataIndex: "UnicornID",
        key: "UnicornID",
        width: 260,
        fixed: "left",
      },
      {
        title: "Unicorn Name",
        dataIndex: "Unicorn Name",
        key: "Unicorn Name",
        width: 280,
      },
      {
        title: "Unicorn Status",
        dataIndex: "Unicorn Status",
        key: "Unicorn Status",
        width: 280,
      },

      {
        title: "Founder ID",
        dataIndex: "AdminId",
        key: "AdminId",
        width: 280,
      },
      {
        title: "Founder Name",
        dataIndex: "Admin Name",
        key: "Admin Name",
        width: 280,
      },

      {
        title: "Founder Email ID",
        dataIndex: "Email",
        key: "Email",
        width: 280,
      },

      {
        title: "Founder Mobile No.",
        dataIndex: "Admin Mobile",
        key: "Admin Mobile",
        width: 280,
      },

      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          // console.log(record);

          const menu = (
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.state.path]}
              style={{ width: 200 }}
            >
              {/* <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showEditModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item> */}
              {/* <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined />}>
                <a
                  href="#"
                  style={{ fontSize: 14 }}
                  onClick={() => this.showDeleteModal(text)}
                >
                  &nbsp;&nbsp;Delete
                </a>
              </Menu.Item> */}
              <Menu.Item icon={<ManOutlined />}>
                <a
                  style={{ fontSize: 14 }}
                  onClick={() =>
                    this.setState({
                      previewid: record.UnicornID,
                      previewmodal: true,
                    })
                  }
                >
                  &nbsp;&nbsp;Unicorn Preview
                </a>
              </Menu.Item>
              <Menu.Item icon={<ManOutlined />}>
                <a
                  style={{ fontSize: 14 }}
                  onClick={() =>
                    this.setState({
                      formpreviewid: record.action.udFounderID,
                      formpreviewmodal: true,
                    })
                  }
                >
                  &nbsp;&nbsp;Unicorn Form Preview
                </a>
              </Menu.Item>
              <Menu.Item icon={<ManOutlined />}>
                <a
                  onClick={() => this.showenquiremodal(text)}
                  style={{ fontSize: 14 }}
                  //   onClick={() => this.showDeleteModal(text)}
                >
                  &nbsp;&nbsp;View Enquires for Unicorn
                </a>
              </Menu.Item>
              {/* <Menu.Item key={`Delete${record.key}`} icon={<ManOutlined />}>
                <Link
                  to={`/FutureUnicornDescription?id=3${record.unicornDealID}`}
                  style={{ fontSize: 14 }}
                  //   onClick={() => this.showDeleteModal(text)}
                >
                  &nbsp;&nbsp;Preview
                </Link>
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

    const CommitmentdataSource =
      this.state.intrestedlist &&
      this.state.intrestedlist.map((item, index) => {
        return {
          key: index,
          first_name: item.first_name + " " + item.last_name,
          email: item.email,
          mobile: item.mobile,
          Intrested:
            (item.interestKnowMore == 1 && "I Want to know more about it") ||
            (item.interestWorkwithYou == 1 && "I want to work with you") ||
            (item.interestInvestinStartup == 1 &&
              "I am excited to invest in your startups"),
          Comments: item.interestMessage,
          // emailcontent: emaildata,
        };
      });
    const columnsintr = [
      {
        title: "Name",
        dataIndex: "first_name",
        key: "first_name",
        width: 260,
        fixed: "left",
      },
      {
        title: "Email ID",
        dataIndex: "email",
        key: "email",
        width: 280,
      },
      {
        title: "Mobile No.",
        dataIndex: "mobile",
        key: "mobile",
        width: 280,
      },

      {
        title: "Type of Interest Expressed",
        dataIndex: "Intrested",
        key: "Intrested",
        width: 280,
      },
      {
        title: "Comments from User",
        dataIndex: "Comments",
        key: "Comments",
        width: 280,
      },
    ];
    return (
      <>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
          <Urldata setid={this.getmember} />
          <Navbar />
          <Layout className="site-layout">
            <Sidebar2 />

            <Content className="home-section">
              <Card title="Future Unicorn" style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Unicorn</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                {/* <Input 
                  value={this.state.searchinput}
                  placeholder="Search" 
                  onChange={(e) => this.searchinput(e)}
                  style={{ maxWidth:300,marginBottom:20,height:40 }}
                /> */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Input
                    value={this.state.searchinput}
                    placeholder="Search"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                  {/* <Button 
                    type='primary' 
                    onClick={()=>this.refresh()}
                  >
                    <i className='bx bxs-cloud-download' 
                      style={{ 
                      color:'#fff',
                      position:'relative',
                      top:3,
                      left:-3
                  }}
                    ></i> Refersh data
                  </Button> */}
                  <Button
                    type="primary"
                    onClick={() => this.exportToCSV("Investment Details")}
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

        {/* Start enquire modal  */}
        <Modal
          title={"Enquires List"}
          visible={this.state.enquireModalStatus}
          onOk={() =>
            this.setState({ enquireModalStatus: false, intrestedlist: "" })
          }
          onCancel={() =>
            this.setState({ enquireModalStatus: false, intrestedlist: "" })
          }
          okText="OK"
          width={1000}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
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
              Export Data
            </Button>
          </div>

          <Table
            dataSource={CommitmentdataSource}
            columns={columnsintr}
            loading={this.state.loading}
            bordered
            scroll={{ x: "max-content" }}
          />
        </Modal>
        {/* End Add modal  */}
        {/* Start enquire modal  */}
        <Modal
          title={"Unicorn Preview"}
          visible={this.state.previewmodal}
          onOk={() => this.setState({ previewmodal: false, intrestedlist: "" })}
          onCancel={() =>
            this.setState({ previewmodal: false, intrestedlist: "" })
          }
          okText="OK"
          width={1000}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          ></div>

          {this.state.startups &&
            this.state.startups
              .filter((item) => item.unicornDealID == this.state.previewid)
              .map((item, index) => {
                return (
                  <>
                    <style>
                      {`
.form-checkbox label{

text-transform : none;

}

`}
                    </style>

                    <section class="futureunicorn-slider-sections">
                      <div class="container-flex">
                        <div className="row row-imgdirects">
                          <div
                            className="row-img-direct "
                            style={{ alignItems: "center" }}
                          >
                            <div className="img-certified-directors">
                              <img
                                src={`${
                                  process.env.REACT_APP_BASE_URL
                                }api/uploads/unicorndeals/${
                                  item.tudTempUdID
                                }/${JSON.parse(item.udLogoImage)}`}
                                alt=""
                              />
                            </div>
                            <div className="content-certify-directors">
                              <h3>{item.udPrimaryContactName}</h3>
                              <p>
                                <span></span>
                                {/* Certified Corporate Director - Business Management
                            Consultant */}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row row-imgdirects bg-box-futures d-none">
                          <ul className="grid-box-futures">
                            <li>
                              <span>
                                <a href={`tel:${item.udPrimaryContactMobile}`}>
                                  <img
                                    src="./assets/images/telephone.png"
                                    alt=""
                                  />
                                </a>
                              </span>
                              <span value={item.udPrimaryContactMobile}>
                                Call
                              </span>
                            </li>
                            <li>
                              <span>
                                <a href={`sms:${item.udPrimaryContactMobile}`}>
                                  <img src="./assets/images/chat.png" alt="" />
                                </a>
                              </span>
                              <span value={item.udPrimaryContactMobile}>
                                Message
                              </span>
                            </li>
                            <li>
                              <span>
                                <a
                                  href={`mailto:${item.udPrimaryContactEmail}`}
                                >
                                  <img src="./assets/images/email.png" alt="" />
                                </a>
                              </span>
                              <span value={item.udPrimaryContactEmail}>
                                Email
                              </span>
                            </li>
                            <li>
                              <span>
                                <img src="./assets/images/phone.png" alt="" />
                              </span>
                              <span value={item.udPrimaryContactEmail}>
                                Whatsapp
                              </span>
                            </li>
                            <li>
                              <span>
                                <Link
                                  to={`//${item.udSocialFacebook}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src="./assets/images/messenger.png"
                                    alt=""
                                  />
                                </Link>
                              </span>
                              <span value={item.udSocialFacebook}>
                                Messanger
                              </span>
                            </li>
                            <li>
                              <span>
                                <img
                                  src="./assets/images/location.png"
                                  alt=""
                                />
                              </span>
                              <span>Navigate</span>
                            </li>
                            <li>
                              <span>
                                <img src="./assets/images/web.png" alt="" />
                              </span>

                              <span value={item.udSocialOthers}>Website</span>
                            </li>
                            <li>
                              <span>
                                <img
                                  src="./assets/images/thumb-up.png"
                                  alt=""
                                />
                              </span>
                              <span>Social</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section class="faq-sections future-main-accordians ">
                      <div class="container">
                        <div class="row">
                          <div class="main-accordain-all">
                            <div
                              class="accordion accordion-flush"
                              id="accordionFlushExample"
                            >
                              <div
                                class="accordion-item"
                                style={{ border: "none" }}
                              >
                                <h3
                                  class="accordion-header"
                                  id="flush-headingOne"
                                >
                                  <div class="default-Show">
                                    <span>
                                      <img
                                        src="./assets/images/information.png"
                                        alt=""
                                      />
                                    </span>
                                    About Us
                                  </div>
                                </h3>

                                <div class="accordion-body about-us-p">
                                  <p>{item.udDealDescription}</p>
                                </div>
                              </div>
                              <div
                                class="accordion-item"
                                style={{ border: "none" }}
                              >
                                <h3
                                  class="accordion-header"
                                  id="flush-headingsixx"
                                >
                                  <div class="default-Show">
                                    <span>
                                      <img
                                        src="./assets/images/highluights.png"
                                        alt=""
                                      />
                                    </span>
                                    Highlights
                                  </div>
                                </h3>
                                <div class="accordion-body">
                                  <div className="row row-bg-highlights">
                                    {item.udStartupHighlights &&
                                      JSON.parse(item.udStartupHighlights).map(
                                        (
                                          itemstartuphighlight,
                                          indexstartuphighlight
                                        ) => {
                                          return (
                                            <div
                                              className={`col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12  ${
                                                itemstartuphighlight.content1 ==
                                                ""
                                                  ? `d-none`
                                                  : ""
                                              }`}
                                            >
                                              <div className="highlights-accordian">
                                                <div className="para-highlights-accordian">
                                                  <div className="img-highlights">
                                                    <img
                                                      src={
                                                        highlightimages[
                                                          indexstartuphighlight
                                                        ]
                                                      }
                                                      alt=""
                                                    />
                                                  </div>
                                                  <div className="para-p-highlight">
                                                    <p>
                                                      {
                                                        itemstartuphighlight.content1
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h3
                                  className="accordion-header"
                                  id="flush-headingfour"
                                >
                                  <button
                                    style={{
                                      padding: "1rem 1.25rem",
                                      cursor: "pointer",
                                      fontSize: "0.82em",
                                    }}
                                    className="btn"
                                    type="button"
                                    onClick={() => {
                                      this.setState({
                                        show_investor_presentation_modal: true,
                                      });
                                    }}
                                  >
                                    <span style={{ marginRight: "0rem" }}>
                                      <img
                                        src="./assets/images/gallery.png"
                                        alt="gallery icon"
                                      />
                                    </span>
                                    Investor Presentation
                                  </button>
                                </h3>
                              </div>

                              {this.state.show_investor_presentation_modal ==
                                true && (
                                <>
                                  <div
                                    className="modal show fade fadein"
                                    tabIndex="-1"
                                    style={{
                                      display: "block",
                                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                                      zIndex: 1050,
                                      transition: "all 0.5s ease",
                                    }}
                                    aria-labelledby="investorModalLabel"
                                    aria-hidden="true"
                                  >
                                    <div
                                      className="modal-dialog"
                                      style={{
                                        maxWidth: "1300px", // Adjusted width for dialog style
                                        margin: "1% auto", // Centers the modal
                                        transition: "all 0.5s ease",
                                      }}
                                    >
                                      <div
                                        className="modal-content"
                                        style={{
                                          borderRadius: "8px",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <div className="modal-header">
                                          <h5
                                            className="modal-title"
                                            id="investorModalLabel"
                                          >
                                            Investor Presentation
                                          </h5>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => {
                                              this.setState({
                                                show_investor_presentation_modal: false,
                                              });
                                            }}
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                        <div className="modal-body">
                                          <iframe
                                            src={`${
                                              process.env.REACT_APP_BASE_URL
                                            }api/uploads/unicorndeals/${
                                              item.tudTempUdID
                                            }/${JSON.parse(
                                              item.udPitchDeck
                                            )}#toolbar=1&navpanes=0`}
                                            frameBorder="0"
                                            height="600px" // Adjusted height for a dialog style
                                            width="100%"
                                            title="Investor Presentation"
                                            style={{
                                              borderRadius: "8px",
                                              boxShadow:
                                                "0px 0px 15px rgba(0, 0, 0, 0.1)",
                                            }}
                                          ></iframe>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Overlay effect to close the modal when clicked outside */}
                                  <div
                                    className="modal-backdrop fade show"
                                    onClick={() => {
                                      this.setState({
                                        show_investor_presentation_modal: false,
                                      });
                                    }}
                                    style={{
                                      zIndex: 1040,
                                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    }}
                                  ></div>
                                </>
                              )}
                              <div class="accordion-item">
                                <h3
                                  class="accordion-header"
                                  id="flush-headingMarket"
                                >
                                  <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseMarket"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseMarket"
                                  >
                                    <span>
                                      <img
                                        src="./assets/images/market-research.png"
                                        alt=""
                                      />
                                    </span>
                                    Market Overview
                                  </button>
                                </h3>
                                <div
                                  id="flush-collapseMarket"
                                  class="accordion-collapse collapse"
                                  aria-labelledby="flush-headingMarket"
                                  data-bs-parent="#accordionFlushExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row market-overreview-row">
                                      {item.udMark &&
                                        JSON.parse(item.udMark).map(
                                          (itemudamrk, indexudmark) => {
                                            return (
                                              <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                <div className="membership-accordian">
                                                  <div className="para-member-accordian">
                                                    <p>
                                                      {itemudamrk.content1}{" "}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="accordion-item"
                                style={{ border: "none" }}
                              >
                                <h3
                                  class="accordion-header"
                                  id="flush-headingTeam"
                                >
                                  <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTeam"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseTeam"
                                  >
                                    <span>
                                      <img
                                        src="./assets/images/group-chat.png"
                                        alt=""
                                      />
                                    </span>
                                    Team
                                  </button>
                                </h3>
                                <div
                                  id="flush-collapseTeam"
                                  class="accordion-collapse collapse"
                                  aria-labelledby="flush-headingTeam"
                                  data-bs-parent="#accordionFlushExample"
                                >
                                  <div class="accordion-body ">
                                    <div className="row row-box-linse Grid-team">
                                      {item.udVendorId &&
                                        JSON.parse(item.udVendorId).map(
                                          (itemudVendorId, indexudVendorId) => {
                                            return (
                                              <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-12 col-sm-12 col-xs-12">
                                                <div className="main-card-of-teams">
                                                  <div className="img-teams-of-cards">
                                                    <img
                                                      src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${itemudVendorId.imgname}`}
                                                      alt=""
                                                    />
                                                  </div>
                                                  <div className="name-of-teams-card">
                                                    <div className="head-deals-team">
                                                      <h3
                                                        style={{
                                                          textTransform:
                                                            "capitalize",
                                                        }}
                                                      >
                                                        {itemudVendorId.name}
                                                      </h3>
                                                      <p
                                                        style={{
                                                          textTransform:
                                                            "capitalize",
                                                        }}
                                                      >
                                                        {itemudVendorId.Role}
                                                      </p>
                                                    </div>
                                                    <ul>
                                                      <li>
                                                        {
                                                          itemudVendorId.description1
                                                        }
                                                      </li>
                                                      <li>
                                                        {
                                                          itemudVendorId.description2
                                                        }
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="accordion-item">
                                <h3
                                  class="accordion-header"
                                  id="flush-headingVideos"
                                >
                                  <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseVideos"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseVideos"
                                  >
                                    <span>
                                      <img
                                        src="./assets/images/gallery.png"
                                        alt=""
                                      />
                                    </span>
                                    Videos
                                  </button>
                                </h3>
                                <div
                                  id="flush-collapseVideos"
                                  class="accordion-collapse collapse"
                                  aria-labelledby="flush-headingVideos"
                                  data-bs-parent="#accordionFlushExample"
                                >
                                  <div class="accordion-body connect-acc-us">
                                    <div className="row justify-content-center">
                                      <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                        <div className="img-future-gallery">
                                          <iframe
                                            style={{
                                              boxShadow:
                                                "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                                              borderRadius: 3,
                                              // marginLeft: 65,
                                            }}
                                            width="100%"
                                            height="335"
                                            src={`https://www.youtube.com/embed/${item.udYoutubeLink
                                              .split("=")
                                              .pop()}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                          ></iframe>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="accordion-item">
                                <h3
                                  class="accordion-header"
                                  id="flush-headingfourees"
                                >
                                  <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-headingfoureesnew"
                                    aria-expanded="false"
                                    aria-controls="flush-headingfourees"
                                  >
                                    <span>
                                      <img
                                        src="./assets/images/live-streaming.png"
                                        alt=""
                                      />
                                    </span>
                                    Media Coverage
                                  </button>
                                </h3>
                                <div
                                  id="flush-headingfoureesnew"
                                  class="accordion-collapse collapse"
                                  aria-labelledby="flush-headingfourees"
                                  data-bs-parent="#accordionFlushExample"
                                >
                                  <div class="accordion-body">
                                    <div className="row row-bg-media-coverage">
                                      {item.udMediaCoverageFiles &&
                                        JSON.parse(
                                          item.udMediaCoverageFiles
                                        ).map(
                                          (
                                            itemudMediaCoverageFiles,
                                            indexudMediaCoverageFiles
                                          ) => {
                                            return (
                                              <div className="col-md-4 col-lg-4 col-xxl-4  col-12 col-sm-12 col-xxl-4">
                                                <div className="para-media-coverage-accordian">
                                                  <div className="img-media-coverage">
                                                    <img
                                                      src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${itemudMediaCoverageFiles.imgname}`}
                                                      alt=""
                                                    />
                                                  </div>
                                                  <div className="para-p-media-coverage">
                                                    <p>
                                                      {
                                                        itemudMediaCoverageFiles.title
                                                      }
                                                    </p>
                                                  </div>
                                                  <div className="button-media-coverage">
                                                    <a
                                                      href={
                                                        itemudMediaCoverageFiles.content
                                                      }
                                                    >
                                                      View More
                                                    </a>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="accordion-item">
                                <h3
                                  class="accordion-header"
                                  id="flush-headingWait"
                                >
                                  <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-headingWaitnew"
                                    aria-expanded="false"
                                    aria-controls="flush-headingWait"
                                  >
                                    <span>
                                      <img
                                        src="./assets/images/mobile.png"
                                        alt=""
                                      />
                                    </span>
                                    Contact us
                                  </button>
                                </h3>
                                <div
                                  id="flush-headingWaitnew"
                                  class="accordion-collapse collapse"
                                  aria-labelledby="flush-headingWait"
                                  data-bs-parent="#accordionFlushExample"
                                >
                                  <div class="accordion-body connect-acc-us">
                                    <div className="row row-box-line">
                                      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                        <div className="lets-talks-div">
                                          <h3>Legal Name</h3>
                                          <ul>
                                            <li>
                                              <span>{item.udLegalname}</span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                        <div className="lets-talks-div">
                                          <h3>Founded</h3>
                                          <ul>
                                            <li>
                                              <span>{item.udFoundedon}</span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                        <div className="lets-talks-div">
                                          <h3>Let's Meet</h3>
                                          <ul>
                                            <li>
                                              <span>Corporate Office :</span>
                                              <span>{item.udAddress}</span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                        <div className="lets-talks-div">
                                          <h3>Employees</h3>
                                          <ul>
                                            <li>
                                              <span>{item.udEmployees}</span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                        <div className="lets-talks-div">
                                          <h3>Visit Us</h3>
                                          <ul>
                                            <li>
                                              <Link
                                                to={`//${item.udWebsite}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <span
                                                  style={{
                                                    textTransform: "lowercase",
                                                  }}
                                                >
                                                  {item.udWebsite}
                                                </span>
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                        <div className="lets-talks-div">
                                          <h3>Follow Us</h3>
                                          <ul>
                                            <li>
                                              <Link
                                                to={`//${item.udSocialInsta}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <i class="fa-brands fa-instagram"></i>
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                to={`//${item.udSocialYouTube}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <i class="fa-brands fa-youtube"></i>
                                              </Link>
                                            </li>

                                            <li>
                                              <Link
                                                to={`//${item.udSocialFacebook}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <i class="fa-brands fa-facebook"></i>
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-12"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "30px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </section>
                  </>
                );
              })}
        </Modal>
        {/* End Add modal  */}
        <Modal
          title={"Unicorn form Preview"}
          visible={this.state.formpreviewmodal}
          onOk={() => {this.setState({ formpreviewmodal: false, formpreviewid: "" }) ;
          window.location.reload();}
      }
          onCancel={() =>
{            this.setState({ formpreviewmodal: false, formpreviewid: "" })
window.location.reload();
}          }
          okText="OK"
          width={1000}
        >
         {this.state.formpreviewid!=="" &&
          <Founderadmindashboard adminview={this.state.formpreviewid}/>
         }
        </Modal>
      </>
    );
  }
}

export default UnicornAdmin;
