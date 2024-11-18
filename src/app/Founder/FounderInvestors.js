import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Sidebar from "./common/Sidebar";
import Sidebar2 from "./common/Sidebar2";
import ReactGA from "react-ga4";

import {
  Breadcrumb,
  Table,
  Card,
  Modal,
  message,
  Spin,
  Dropdown,
  Menu,
  Checkbox,
  Input,
  Button,
} from "antd";
import Bridge from "../constants/Bridge";
import {
  EditOutlined,
  DeleteOutlined,
  VerifiedOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import WebFooter from "../common/WebFooter";
import { param } from "jquery";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";

const { TextArea } = Input;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class FounderInvstors extends Component {
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

      analyticslist: [],
      canalyticslist: [],

      monthyear: "",
      revenue: "",
      grossprofitmargin: "",
      customerchurnrate: "",
      monthlyactiveusers: "",
      ration: "",

      editmonthyear: "",
      editrevenue: "",
      editgrossprofitmargin: "",
      editcustomerchurnrate: "",
      editmonthlyactiveusers: "",
      editration: "",

      investers: [],
      cinvesters: [],
      rocmodalstatus: false,
      roc_remarks: "",
      roc_status: "",
    };
  }

  componentDidMount() {
    this.getinvestorlist();
  }

  // get post list
  getinvestorlist = () => {
    this.setState({ loading: true });
    if (localStorage.getItem("startup_id") != "") {
      let params = {
        startup_id: localStorage.getItem("startup_id"),
      };
      Bridge.founder.get_startup_founder_investor(params).then((result) => {
        if (result.status == 1) {
          this.setState({
            investers: result.data.reverse(),
            cinvesters: result.data.reverse(),
            loading: false,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    } else {
      console.log("not a operational founder");
    }
  };

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.cinvesters) {
        if (
          (item.first_name &&
            item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.last_name &&
            item.last_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.Invested_dt &&
            item.Invested_dt.toLowerCase().includes(text.toLowerCase())) ||
          (item.Investment_amt &&
            item.Investment_amt.toLowerCase().includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        investers: arr.reverse(),
        loading: false,
      });
    } else {
      this.setState({
        investers: this.state.cinvesters.reverse(),
        loading: false,
      });
    }
  };

  //10-11-2022
  viewSignDocument = (docId) => {
    if (docId != "") {
      this.setState({ loading: true });
      axios({
        method: "post",
        responseType: "blob",
        url: `${process.env.REACT_APP_BASE_URL}api/admin/DocumentSign/DownloadDocument`,
        headers: {
          "Content-Type": "application/pdf",
        },
        data: {
          digioDocId: docId,
        },
      })
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {
            type: "application/pdf",
          });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          this.setState({ loading: false });
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log(error);
        });
    } else {
      message.warning(
        "Please Request to Document Signing/ Could not able to find document Id into the database"
      );
    }
  };

  showrocmodal = (item) => {
    if (item.roc_status == "fndr_roc_confirmation") {
      this.setState({ roc_status: true });
    } else {
      this.setState({ roc_status: "" });
    }
    this.setState({
      rocmodalstatus: true,
      roc_remarks: item.froc_remarks,
      investment_id: item.investment_id,
    });
  };
  updateROC = () => {
    let roc_status;
    if (this.state.roc_status == "") {
      message.warning("please click ROC checkbox ");
      return;
    }
    if (this.state.roc_status == true) {
      roc_status = "fndr_roc_confirmation";
    } else {
      roc_status = "";
    }
    let date = new Date().toISOString().split("T")[0];
    let params = {
      investment_id: this.state.investment_id,
      roc_status: roc_status,
      roc_remarks: this.state.roc_remarks,
      roc_status_date: date,
    };
    // return;
    this.setState({ loading: true });
    Bridge.founder.roc_update(params).then((result) => {
      if (result.status == "1") {
        message.success("ROC Updated Successfully");
        this.setState(
          {
            rocmodalstatus: false,
            loading: false,
          },
          this.getinvestorlist
        );
      } else {
        message.error("Unable to update ROC");
        this.setState({ loading: false });
      }
    });
  };

  exportToCSV = (fileName) => {
    ReactGA.event({
      category: "Founder",
      action: "Exported Investor List",
    });

    let arr = [];
    let count = 1;
    for (let item of this.state.investers) {
      let obj = {
        "Investor name": item.first_name + " " + item.last_name,
        "Investment Amount": item,
        "Investment date": item.Invested_dt
          ? moment(item.Invested_dt).format("DD MMM, YYYY")
          : "---",
        "Deal Name": item.s_name,
        Deal_id: item.dealid,
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Investor list data exported successfully.");
  };
  render() {
    const dataSource =
      this.state.investers &&
      this.state.investers.map((item, index) => {
        // console.log(item,"DO io");
        return {
          key: index,
          srno: index + 1,
          name: item.first_name + " " + item.last_name,
          deal_id: item.deal_id,
          investmentamount: item,
          investmentdate: item.Invested_dt
            ? moment(item.Invested_dt).format("DD MMM, YYYY")
            : "---",
          action: item,
          dealname: item.deal_name,
        };
      });

    const columns = [
      {
        title: "Sr No",
        dataIndex: "srno",
        key: "srno",
        width: 100,
      },
      {
        title: "Investor Name",
        dataIndex: "name",
        key: "name",
        width: 100,
      },
      {
        title: "Deal Id",
        dataIndex: "deal_id",
        key: "deal_id",
        width: 100,
      },
      {
        title: "Deal Name",
        dataIndex: "dealname",
        key: "dealname",
        width: 100,
      },
      {
        title: "Investment Amount",
        dataIndex: "investmentamount",
        key: "investmentamount",
        width: 180,
        render: (text, record) => {
          return <div>₹{text.Investment_amt}</div>;
        },
      },
      {
        title: "Investment Date",
        dataIndex: "investmentdate",
        key: "investmentdate",
        width: 180,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          const menu = (
            <Menu mode="vertical" defaultSelectedKeys={[this.state.path]}>
              {text.fund_raise_status == "success" && (
                <Menu.Item
                  key={`show${record.key}`}
                  icon={<VerifiedOutlined />}
                >
                  <a
                    href="#"
                    style={{ fontSize: 14 }}
                    onClick={() => this.showrocmodal(text)}
                  >
                    &nbsp;&nbsp;Show ROC
                  </a>
                </Menu.Item>
              )}
              {text.document_signed_id &&
                text.founder_document_sign_status == "fndr_sign_success" && (
                  <Menu.Item
                    key={`signed${record.key}`}
                    icon={<AuditOutlined />}
                  >
                    <a
                      href="#"
                      style={{ fontSize: 14 }}
                      onClick={() =>
                        this.viewSignDocument(text.document_signed_id)
                      }
                    >
                      View Signed Document
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
              <Card title="Investors" style={{ margin: 16 }}>
                <Breadcrumb style={{ margin: "0" }}>
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Investors</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
              
                <Input
                  value={this.state.searchinput}
                  placeholder="Search"
                  onChange={(e) => this.searchinput(e)}
                  style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                />
                <Button
                  type="primary"
                  style={{ float:"right" }}
                  onClick={() => this.exportToCSV("Investor List")}
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
                <Table
                  className="table-2"
                  dataSource={dataSource}
                  columns={columns}
                  loading={this.state.loading}
                  bordered
                />
              </Card>
            </div>

            {/* How do i invest? */}
            <section id="hdii"></section>
          </div>

          <div className="col-md-2 col-0"></div>
          {/* Start ROC modal  */}
          <Modal
            title="ROC Update"
            visible={this.state.rocmodalstatus}
            onOk={this.updateROC}
            okText="Update"
            onCancel={() => this.setState({ rocmodalstatus: false })}
          >
            <Spin spinning={this.state.formloader}>
              <div className="mt-4">
                <label className="mb-2">ROC Update</label>&nbsp;&nbsp;
                <Checkbox
                  onChange={(e) =>
                    this.setState({ roc_status: e.target.checked })
                  }
                  value={this.state.roc_status}
                  checked={this.state.roc_status}
                ></Checkbox>
              </div>
              <div className="mt-4">
                <label className="mb-2">Remarks</label>
                <TextArea
                  rows={4}
                  value={this.state.roc_remarks}
                  onChange={(e) =>
                    this.setState({ roc_remarks: e.target.value })
                  }
                  maxLength={300}
                />
              </div>
            </Spin>
          </Modal>
          {/* End ROC modal  */}
        </div>

        <Footer />
      </div>
    );
  }
}
export default FounderInvstors;
