/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Card,
  Button,
  message,
  Select,
  Input,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import Sidebar2 from "./common/Sidebar2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Urldata from "../investor/components/Urldata";
import moment from "moment";

const { Content } = Layout;

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class UnicornAdminAll extends Component {
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
    };
  }

  componentDidMount() {
    this.getgrouplist();
    // this.getstartuplist();
    setTimeout(() => {
    }, 1000);
  }

  // get post list
  getgrouplist = () => {
    this.setState({ loading: true });
    let params = {
      page: 0,
      pagesize: 10,
    };
    Bridge.Unicorn.getUnicornPayment(params).then((result) => {
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
    
    const dataSource =
      this.state.startups &&
      this.state.startups.map((item, index) => {
        // console.log(item);
        return {
          founderFirstName: item.first_name ?? "---",
          founderLastName: item.last_name ?? "---",
          founderEmail: item.email ?? "---",
          fouderMobile: item.mobile ?? "---",
          unicornPlan: item.unicorn_plan ?? "---",
          unicornStatus: item.unicorn_form_status,
          unicornStartDate: item.unicorn_start_date ? moment(item.unicorn_start_date, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY") : "---",
        };
      });

    const columns = [
      {
        title: "First name",
        dataIndex: "founderFirstName",
        key: "founderFirstName",
        width: 260,
        fixed: "left",
      },
      {
        title: "Last Name",
        dataIndex: "founderLastName",
        key: "founderLastName",
        width: 280,
      },
      {
        title: "Email",
        dataIndex: "founderEmail",
        key: "founderEmail",
        width: 280,
      },

      {
        title: "Mobile",
        dataIndex: "fouderMobile",
        key: "fouderMobile",
        width: 280,
      },
      
      {
        title: "Unicorn Status",
        dataIndex: "unicornStatus",
        key: "unicornStatus",
        width: 280,
      },
      {
        title: "Plan",
        dataIndex: "unicornPlan",
        key: "unicornPlan",
        width: 280,
      },
      {
        title: "Plan Start Date",
        dataIndex: "unicornStartDate",
        key: "unicornStartDate",
        width: 280,
      }
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
                  <Breadcrumb.Item>Unicorns</Breadcrumb.Item>
                  <Breadcrumb.Item>Payments</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                

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
      </>
    );
  }
}

export default UnicornAdminAll;