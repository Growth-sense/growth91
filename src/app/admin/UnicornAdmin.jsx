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
        console.log(result);

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
    console.log(data);

    let params = {
      udFounderID: data,
    };
    Bridge.Unicorn.unicorn_interested_list(params).then((result) => {
      if (result.status == 1) {
        console.log(result);

        this.setState({
          intrestedlist: result.data,

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

  // update post

  showenquiremodal = (item) => {
    console.log(item);
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
      for (let item of this.state.startups) {
        if (
          (item.first_name &&
            item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.groupName &&
            item.groupName.toLowerCase().includes(text.toLowerCase())) ||
          (item.email &&
            item.email.toLowerCase().includes(text.toLowerCase())) ||
          (item.status &&
            item.status.toLowerCase().includes(text.toLowerCase())) ||
          (item.groupID && item.groupID.includes(text.toLowerCase()))
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
        "Founder Id": item.udFounderID ? item.udFounderID : "---",
        "Unicorn Name": item.udStartupName ? item.udStartupName : "---",
        Email: item.udEmail ? item.udEmail : "---",
        "Unicorn Status": item.groupStatus ? item.groupStatus : "Published",
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
      console.log(result);
      const data = result.data.filter((item, index) => {
        console.log(item.investor_id);
        console.log(localStorage.getItem("investor_id"));
        return item.investor_id == localStorage.getItem("investor_id");
      });
      console.log(data);
      console.log(data.length, "0");
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
    const dataSource =
      this.state.startups &&
      this.state.startups.map((item, index) => {
        console.log(item);
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
        title: "Unicorn Id",
        dataIndex: "UnicornID",
        key: "UnicornID",
        width: 260,
        fixed: "left",
      },
      {
        title: "Founder Id",
        dataIndex: "AdminId",
        key: "AdminId",
        width: 280,
      },
      {
        title: "Unicorn Name",
        dataIndex: "Unicorn Name",
        key: "Unicorn Name",
        width: 280,
      },

      {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
        width: 280,
      },
      {
        title: "Unicorn Status",
        dataIndex: "Unicorn Status",
        key: "Unicorn Status",
        width: 280,
      },
      {
        title: "Founder Name",
        dataIndex: "Admin Name",
        key: "Admin Name",
        width: 280,
      },

      {
        title: "Founder Mobile",
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
          console.log(record);

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
              <Menu.Item key={`Delete${record.key}`} icon={<ManOutlined />}>
                <Link
                  to={`/FutureUnicornDescription?id=${record.UnicornID}`}
                  style={{ fontSize: 14 }}
                  //   onClick={() => this.showenquiremodal(text)}
                >
                  &nbsp;&nbsp;Preview
                </Link>
              </Menu.Item>
              <Menu.Item key={`Delete${record.key}`} icon={<ManOutlined />}>
                <a
                  onClick={() => this.showenquiremodal(text)}
                  style={{ fontSize: 14 }}
                  //   onClick={() => this.showDeleteModal(text)}
                >
                  &nbsp;&nbsp;View Enquires
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
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 280,
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        key: "mobile",
        width: 280,
      },

      {
        title: "Type of Interest Shown",
        dataIndex: "Intrested",
        key: "Intrested",
        width: 280,
      },
      {
        title: "Comments from Visitor",
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
                    justifyContent: "space-between",
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
              justifyContent: "space-between",
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
      </>
    );
  }
}

export default UnicornAdmin;
