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
    Bridge.Unicorn.getAllUnicorns(params).then((result) => {
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

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];

      for (let item of this.state.startups) {
        if (
          (item.tudStartupFounderName &&
            item.tudStartupFounderName
              .toLowerCase()
              .includes(text.toLowerCase())) ||
          (item.tudStartupName &&
            item.tudStartupName.toLowerCase().includes(text.toLowerCase())) ||
          (item.tudStartupFounderEmail &&
            item.tudStartupFounderEmail.toLowerCase().includes(text.toLowerCase())) ||
          // (item.status &&
          //   item.status.toLowerCase().includes(text.toLowerCase())) ||
          (item.tudTempUdID &&
            item.tudTempUdID.includes(text.toLowerCase()))
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

  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.startups) {
      let obj = {
        "Sr No": count++,
        "Unicorn ID": item.tudTempUdID ? item.tudTempUdID : "---",
        "Unicorn Name": item.tudStartupName ? item.tudStartupName : "---",
        "Unicorn Status": item.mainPublished == "Published"? "Published" : "Draft",
        "Founder Id": item.founderID ? item.founderID : "---",
        Email: item.tudStartupFounderEmail ? item.tudStartupFounderEmail : "---",
        "Founder Name": item.tudStartupFounderName
          ? item.tudStartupFounderName
          : "---",
        "Founder Mobile": item.tudStartupFounderMobileNumber
          ? item.tudStartupFounderMobileNumber
          : "---",
      };
      arr = [...arr, obj];
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Unicorns data exported successfully.");
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
          UnicornID: item.tudTempUdID ? item.tudTempUdID : "---",
          "Unicorn Name": item.tudStartupName ? item.tudStartupName : "---",
          Email: item.tudStartupFounderEmail ? item.tudStartupFounderEmail : "---",
          "Unicorn Status": item.mainPublished =="Published"? "Published":"Draft",
          "Admin Name": item.tudStartupFounderName
            ? item.tudStartupFounderName
            : "---",
          "Admin Mobile": item.tudStartupFounderMobileNumber
            ? item.tudStartupFounderMobileNumber
            : "---",
          AdminId: item.founderID ? item.founderID : "---",
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
                  <Breadcrumb.Item>All Unicorns</Breadcrumb.Item>
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
                    onClick={() => this.exportToCSV("Unicorn_Details_All")}
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

export default UnicornAdminAll;