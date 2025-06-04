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
  DatePicker,
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
import { FutureUnicornDescription } from "../FutureUnicornDescription";

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
      unicornDealID: "",
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
      publishModalStatus: false,
      commitexport: "",
      unicornstatus: "",
      intrestedlist: "",
      show_investor_presentation_modal: false,
      previewid: "",
      formpreviewid: "",
      previewmodal: false,
      formpreviewmodal: false,
      viewPlanModel: false,
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
  showpublishmodal = (item) => {
    console.log(item);
    // this.getintrestedlist(item.udFounderID);
    this.setState({
      publishModalStatus: true,
      unicornDealID: item.unicornDealID,
      unicornstatus: item.udPublished,
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
        "Unicorn Status": item.udPublished =="Published"? "Enable":"Disable",
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
    message.success("Unicorns data exported successfully.");
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
  changesstatus = (e) => {
    let params = {
      "unicornDealID":this.state.unicornDealID,
    "udPublished":this.state.unicornstatus

    };
    Bridge.Unicorn.unicorn_Publish_unpublish(params).then((result) => {
      if (result.status == 1) {
        // console.log(result);
        message.success(result.message);
        this.getgrouplist();

      
      } else {
        message.error(result.message);
        this.setState({
        });
      }
    });
  };
   
  

  handleChangeSelect = (e) => {
    this.setState({
      nationality: e.target.value,
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
          "Unicorn Status": item.udPublished =="Published"? "Enable":"Disable",
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
              style={{ width: 250 }}
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
                  onClick={() =>{
                    this.setState({
                      viewPlanModel: true,
                      edit_unicorn_plan_name: record.action.unicorn_plan,
                      edit_unicorn_plan_start_date: record.action.unicorn_start_date ? moment(record.action.unicorn_start_date, "YYYY-MM-DD HH:mm:ss") : null,
                      edit_unicorn_plan_end_date: record.action.unicorn_end_date ? moment(record.action.unicorn_end_date, "YYYY-MM-DD HH:mm:ss") : null,
                      edit_unicorn_plan_left_edit: record.action.left_edit,
                      edit_unicorn_utr_ref: record.action.utrref,
                      edit_unicorn_gst: record.action.unicorn_gst,
                      edit_unicorn_address: record.action.unicorn_gst_registered_address,
                    })
                  }
                    
                  }
                >
                  &nbsp;&nbsp;View Unicorn Plan
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
              <Menu.Item icon={<ManOutlined />}>
                <a
                  onClick={() => this.showpublishmodal(text)}
                  style={{ fontSize: 14 }}
                  //   onClick={() => this.showDeleteModal(text)}
                >
                  &nbsp;&nbsp;Edit Status
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
                  onChange={(ee) => this.searchinput(e)}
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
                    onClick={() => this.exportToCSV("Unicorn Details")}
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

        {/* View Unicorn Plan Modal */}
        <Modal
          title="View Unicorn Plan"
          visible={this.state.viewPlanModel}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={() => this.setState({ viewPlanModel: false })}
          width={550}
        >
            <div className="form-group mt-3">
              <label className="mb-2">
                Unicorn Plan
              </label>
              <select
                disabled={true}
                name="unicornPlan"
                className="form-input-field"
                value={this.state.edit_unicorn_plan_name}
              >
                <option value="">No plan</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Start Date
              </label>
              <DatePicker
                disabled={true}
                value={this.state.edit_unicorn_plan_start_date}
                allowClear={true}
               
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                End Date
              </label>
              <DatePicker
                disabled={true}
                value={this.state.edit_unicorn_plan_end_date}
                allowClear={true}
               
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Publish Credits
              </label>
              <Input
                disabled={true}
                type="number"
                value={this.state.edit_unicorn_plan_left_edit}
               
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                UTR No
              </label>
              <Input
                disabled={true}
                type="text"
                value={this.state.edit_unicorn_utr_ref}
                
              />
            </div>
             <div className="form-group mt-3">
              <label className="mb-2">
                GST Number
              </label>
              <Input
                disabled={true}
                type="text"
                value={this.state.edit_unicorn_gst}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Registered Address
              </label>
              <TextArea
                disabled={true}
                type="text"
                value={this.state.edit_unicorn_address}
              />
            </div>
        </Modal>


        <Modal
          title={"Edit Status"}
          visible={this.state.publishModalStatus}
          onOk={() =>{
            this.changesstatus()
            this.setState({
              publishModalStatus: false,
              unicornDealID: "",
              udPublished: "",
            })}
          }
          onCancel={() =>
            this.setState({
              publishModalStatus: false,
              unicornDealID: "",
              udPublished: "",
            })
          }
          okText="OK"
          width={400}
        >
          
         
           
            <div className="mt-4">
              <label className="mb-2">Active</label>
              <Select
                style={{ width: "100%" }}
                allowClear
                value={this.state.unicornstatus}
                onChange={(value)=>{ this.setState({ unicornstatus: value });}}
                          >
                <Option value="">--Select--</Option>
                <Option value="Published">Enable</Option>
                <Option value="Unpublished">Disable</Option>
              </Select>
            </div>
          
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
          <FutureUnicornDescription id={this.state.previewid} />
          <div></div>
        </Modal>
        {/* End Add modal  */}
        <Modal
          title={"Unicorn form Preview"}
          visible={this.state.formpreviewmodal}
          onOk={() => {
            this.setState({ formpreviewmodal: false, formpreviewid: "" });
            window.location.reload();
          }}
          onCancel={() => {
            this.setState({ formpreviewmodal: false, formpreviewid: "" });
            window.location.reload();
          }}
          okText="OK"
          width={1000}
        >
          {this.state.formpreviewid !== "" && (
            <Founderadmindashboard adminview={this.state.formpreviewid} />
          )}
        </Modal>
      </>
    );
  }
}

export default UnicornAdmin;
