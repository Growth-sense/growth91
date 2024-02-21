import React, { Component } from "react";
import { Layout, Breadcrumb, Card, Table, message, Button, Input } from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import moment from "moment";
import Bridge from "../constants/Bridge";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const { Content } = Layout;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class PremiumMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchinput: "",
      loading: false,
      list: [],
      clist: [],
    };
  }

  componentDidMount() {
    this.getformdetails();
  }

  // get post list
  getformdetails = () => {
    this.setState({ loading: true });
    Bridge.admin.get_premium_members().then((result) => {
      if (result.status == 1) {
        this.setState({
          list: result.data,
          clist: result.data,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.clist) {
        if (
          (item.first_name && item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.last_name && item.last_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.email && item.email.includes(text)) ||
          (item.investor_id && item.investor_id.includes(text))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        list: arr,
        loading: false,
      });
    } else {
      this.setState({
        list: this.state.clist,
        loading: false,
      });
    }
  };

  openpitchfile = (pitchfile, founder_id) => {
    let link = `${process.env.REACT_APP_BASE_URL}api/uploads/founders/pitch/${founder_id}/${pitchfile}`;
    window.open(link, "_blank");
  };

  opendocumentfile = (document, founder_id) => {
    let link = `${process.env.REACT_APP_BASE_URL}api/uploads/founders/documents/${founder_id}/${document}`;
    window.open(link, "_blank");
  };

  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.list) {
      let obj = {
        "Sr No": count,
        "Investor Id": item.investor_id,
        "Investor Name": item.first_name + " " + item.last_name,
        Email: item.email,
        "Expiry Date": item.declaration_timestamp,
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
    const dataSource =
      this.state.list &&
      this.state.list.map((item, index) => {
        return {
          key: index,
          id: item.investor_id,
          name: item.first_name + " " + item.last_name,
          email: item.email,
          expirydate: item,
        };
      });

    const columns = [
      {
        title: "Investor Id",
        dataIndex: "id",
        key: "id",
        width: 160,
      },
      {
        title: "Investor Name",
        dataIndex: "name",
        key: "name",
        width: 160,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 160,
      },
      {
        title: "Expiry Date",
        dataIndex: "expirydate",
        key: "expirydate",
        width: 160,
        render: (text, record) => {
          let mdate = "---";
          if (text.membership_end_date) {
            let splitted = text.membership_end_date.split(" ")[0];
            mdate = splitted ? moment(splitted).format("DD MMM, YYYY") : "---";
          }
          return <p>{mdate}</p>;
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
              <Card title="Premium Members" style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Premium Members</Breadcrumb.Item>
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
                    onClick={() => this.exportToCSV("Premium Membership")}
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
                  scroll={{ x: "max-content" }}
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

export default PremiumMembers;
