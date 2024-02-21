import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Card,
  Select,
  Input,
  message,
  Spin,
  Button,
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const { Content } = Layout;

class RetailReferral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srno: "",
      name: "",
      email: "",
      mobile: "",
      dealId: "",
      transactionId: "",
      investedAmount: "",
      referralMoney: "",
      status: "",
      retailReferralList: [],
      cretailReferralList: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({ loading: true }, () => this.getretailreferral());
  }

  getretailreferral = () => {
    Bridge.adminretailReferral.list().then((result) => {
      if (result.status == "1") {
        this.setState({
          retailReferralList: result.data,
          cretailReferralList: result.data,
          loading: false,
        });
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  };
  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      for (let item of this.state.cretailReferralList) {
        if (
          (item.first_name && item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.last_name && item.last_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.email && item.email.toLowerCase().includes(text.toLowerCase())) ||
          (item.mobile && item.mobile.includes(text)) ||
          (item.srno && item.srno.includes(text))  ||
          (item.investor_id && item.investor_id.includes(text)) 
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        retailReferralList: arr,
        loading: false,
      });
    } else {
      this.setState(
        {
          loading: false,
        },
        () => this.getretailreferral()
      );
    }
  };
  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.retailReferralList) {
      let obj = {
        "Sr No": count,
        "Benefactor Name": item.benefactF + " " + item.benefactL,
        "Benefactor Email": item.benefactEmail,
        "Beneficiary Name": item.first_name + " " + item.last_name,
        "Beneficiary Email": item.email,
        "Investor Id": item.investor_id,
        "Deal ID": item.deal_id,
        "	Transaction Id": item.payment_ref,
        "Invested Amount": item.payment_amount,
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("RetailReferral data exported successfully.");
  };
  render() {
    const dataSource =
      this.state.retailReferralList &&
      this.state.retailReferralList.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          investorId: item.investor_id,
          benefactorName: item.benefactF + "" + item.benefactL,
          benefactorEmail: item.benefactEmail,
          name:
            item.first_name +
            " " +
            item.last_name +
            " (" +
            item.investor_id +
            ")",
          email: item.email ? item.email : "---",
          dealId: item.deal_id ? item.deal_id : "---",
          transId: item.payment_ref ? item.payment_ref : "---",
          investedAmount: item.payment_amount ? item.payment_amount : "---",
          // referralMoney:'---',
          // status:'---'
        };
      });

    const columns = [
      {
        title: "Sr. No.",
        dataIndex: "srno",
        key: "srno",
        width: 100,
      },
      {
        title: "Benefactor Name",
        dataIndex: "benefactorName",
        key: "benefactorName",
      },
      {
        title: "Benefactor Email",
        dataIndex: "benefactorEmail",
        key: "benefactorEmail",
      },
      {
        title: "Beneficiary Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Beneficiary Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Deal Id",
        dataIndex: "dealId",
        key: "dealId",
      },
      {
        title: "Transaction Id",
        dataIndex: "transId",
        key: "transId",
      },
      {
        title: "Invested Amount",
        dataIndex: "investedAmount",
        key: "investedAmount",
        align: "right",
      },
      // {
      //   title: "Referral Money",
      //   dataIndex: "referralMoney",
      //   key: "referralMoney",
      // },
      // {
      //   title: "Status",
      //   dataIndex: "status",
      //   key: "status",
      // },
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
              <Card title="Referrals" style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Retail Referral</Breadcrumb.Item>
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
                    onClick={() => this.exportToCSV("Retail Referral")}
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
                <Spin spinning={this.state.loading}>
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={this.state.loading}
                    bordered
                    scroll={{ x: "max-content" }}
                  />
                </Spin>
              </Card>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>
      </>
    );
  }
}
export default RetailReferral;
