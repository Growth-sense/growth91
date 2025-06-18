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

class UnicornAdminPayment extends Component {
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

  // Export data to CSV
  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.startups) {
      let obj = {
        "Sr No": count++,
        "First Name": item.first_name ? item.first_name : "---",
        "Last Name": item.last_name ? item.last_name : "---",
        "Email": item.email ? item.email : "---",
        "Mobile": item.mobile ? item.mobile : "---",
        "Unicorn Status": item.unicorn_form_status ? item.unicorn_form_status : "---",
        "Plan": item.unicorn_plan ? item.unicorn_plan : "---",
        "Plan Start Date": item.unicorn_start_date ? 
          moment(item.unicorn_start_date, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY") : "---",
        "GST": item.unicorn_gst ? item.unicorn_gst : "---",
        "Registered Address": item.unicorn_gst_registered_address ? item.unicorn_gst_registered_address : "---",
        "Business Name": item.unicorn_gst_name ? item.unicorn_gst_name : "---"
      };
      arr = [...arr, obj];
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Unicorn payment data exported successfully.");
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
     
      this.setState({ memberdetail: result.data });
    });
  };

  // Search functionality to match all displayed fields
  searchinput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    this.setState({ searchinput: e.target.value });
    
    if (searchValue === "") {
      // If search input is empty, restore original data
      this.setState({ startups: this.state.cstartups });
      return;
    }

    // Filter the data based on all displayed fields
    const filteredData = this.state.cstartups.filter((item) => {
      // Check each field that's displayed in the table
      return (
        // First name
        (item.first_name && item.first_name.toLowerCase().includes(searchValue)) ||
        // Last name
        (item.last_name && item.last_name.toLowerCase().includes(searchValue)) ||
        // Email
        (item.email && item.email.toLowerCase().includes(searchValue)) ||
        // Mobile
        (item.mobile && item.mobile.toLowerCase().includes(searchValue)) ||
        // Unicorn Status
        (item.unicorn_form_status && item.unicorn_form_status.toLowerCase().includes(searchValue)) ||
        // Plan
        (item.unicorn_plan && item.unicorn_plan.toLowerCase().includes(searchValue)) ||
        // Plan Start Date
        (item.unicorn_start_date && 
          moment(item.unicorn_start_date, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY").toLowerCase().includes(searchValue)) ||
        // GST
        (item.unicorn_gst && item.unicorn_gst.toLowerCase().includes(searchValue)) ||
        // Registered Address
        (item.unicorn_gst_registered_address && item.unicorn_gst_registered_address.toLowerCase().includes(searchValue)) || 
        // Business Name
        (item.unicorn_gst_name && item.unicorn_gst_name.toLowerCase().includes(searchValue))
      );
    });

    this.setState({ startups: filteredData });
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
          unicornGst: item.unicorn_gst ?? "---",
          unicornRegisteredAddress: item.unicorn_gst_registered_address ?? "---",
          unicornBusinessName: item.unicorn_gst_name ?? "---"
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
      },
      {
        title: "GST",
        dataIndex: "unicornGst",
        key: "unicornGst",
        width: 280,
      },
      {
        title: "Registered Address",
        dataIndex: "unicornRegisteredAddress",
        key: "unicornRegisteredAddress",
        width: 280,
      },
      {
        title: "Business Name",
        dataIndex: "unicornBusinessName",
        key: "unicornBusinessName",
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
                  <Button
                    type="primary"
                    onClick={() => this.exportToCSV("Unicorn_Payment_Details")}
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
      </>
    );
  }
}

export default UnicornAdminPayment;
