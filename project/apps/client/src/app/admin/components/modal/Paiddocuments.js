import React, { Component } from "react";
import { Button, Table, Card, Breadcrumb, Layout, Input, message } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import Bridge from "../../../constants/Bridge";
import Apis from "../../../constants/Apis";
import Sidebar2 from "../../common/Sidebar2";
import Navbar from "../../common/Navbar";
import BottomBar from "../../common/BottomBar";
import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import NoPermission from "../../common/NoPermission";
import { loadModulePermissions } from "../../common/permissions";
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";
const { Content } = Layout;
export default class Paiddocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentloading: false,
      listofdocumentstatus: false,
      startupid: "",
      documents: [],
      cdocuments: [],
      addmodalstatus: false,
      searchinput: "",
      canExport:false
    };
  }

  async componentDidMount() {
    try {
      const perms = await loadModulePermissions("payments_documents");
      this.setState({ canExport: perms.canExport });
    } catch (e) { }

    // If no view permission, do not call API
    if (this.props.noPermission) {
      return;
    }

    this.get_document_purchased_list();
  }

  get_document_purchased_list = () => {
    Bridge.deal.get_all_online_paid_document_by_admin().then((result) => {
      if (result.status == "1") {
        this.setState({ documents: result.data, cdocuments: result.data });
      }
    });
  };

  showdocument = (item) => {
    if (item.document) {
      let url =
        Apis.IMAGEURL + "docs/" + item.document_id + "/" + item.document;
      window.open(url, "_blank");
    }
  };
  searchinput = (e) => {
    this.setState({ searchinput: e.target.value });
    let documents = this.state.cdocuments;
    let search = e.target.value;
    let filter = "";
    if (this.state.searchinput == "") {
      this.setState({ documents: documents });
    }
    console.log(search);
    console.log(documents);
    if (search) {
      filter = documents.filter((item) => {
        return (
          (item.investor_id &&
            item.investor_id.toLowerCase().includes(search.toLowerCase())) ||
          (item.first_name &&
            item.first_name.toLowerCase().includes(search.toLowerCase())) ||
          (item.last_name &&
            item.last_name.toLowerCase().includes(search.toLowerCase())) ||
          (item.name &&
            item.name.toLowerCase().includes(search.toLowerCase())) ||
          (item.order_amount &&
            item.order_amount.toLowerCase().includes(search.toLowerCase())) ||
          (item.order_Id &&
            item.order_Id.toLowerCase().includes(search.toLowerCase())) ||
          (item.document &&
            item.document.toLowerCase().includes(search.toLowerCase()))
        );
      });
    }
    this.setState({
      documents: filter,
    });
  };
  exportToCSV = (fileName) => {
    if (this.state.canExport === false) {
      message.error("You do not have permission to export document payments.");
      return;
    }
    let arr = [];
    let count = 1;
    for (let item of this.state.documents) {
      let obj = {
        "Sr No": count,
        Date: item.created_at,
        "Investor Id": item.investor_id,
        "Investor Name": item.first_name + item.middle_name + item.last_name,
        "Startup Name": item.name,
        "Startup ID": item.startupid,
        Link: item.document,
        Amount: item.order_amount,
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
    const { noPermission } = this.props;
    const { canExport } = this.state;
    const documentdataSource =
      this.state.documents &&
      this.state.documents.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          date: item.created_at? moment(item.created_at).format("DD MMM, YYYY"): "---",
          investor_id: item.investor_id ? item.investor_id : "---",
          investor_name: item.first_name? item.first_name + " " + item.last_name: "---",
          startup_name: item.name? item.name + "  (" + item.startupid + ")": "---",
          amount: item.order_amount ? "₹ " + item.order_amount : "0.00",
          order_id: item.order_Id ? item.order_Id : "---",
          link: item,
        };
      });

    const documentcolums = [
      {
        title: "Sr No.",
        dataIndex: "srno",
        key: "srno",
        width: 100,
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Investor Id",
        dataIndex: "investor_id",
        key: "investor_id",
        width: 100,
      },
      {
        title: "Investor Name",
        dataIndex: "investor_name",
        key: "investor_name",
      },
      {
        title: "Startup Name (Startup Id)",
        dataIndex: "startup_name",
        key: "startup_name",
      },
      {
        title: "Order Id",
        dataIndex: "order_id",
        key: "order_id",
      },
      {
        title: "Link",
        dataIndex: "link",
        key: "link",
        render: (text) => (
          <a
            href="#"
            onClick={() => {
              this.showdocument(text);
            }}
          >
            {text.docname ? text.docname : "---"}
          </a>
        ),
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right",
      },
    ];
    return (
      <div>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
          <Navbar />
          <Layout className="site-layout">
            <Sidebar2 />

            {noPermission ? (
              <NoPermission />
            ) : (
              <>

            <Content className="home-section">
              <Card title="Document Payments" style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Document Payments</Breadcrumb.Item>
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
                    disabled={!canExport}
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
                  dataSource={documentdataSource}
                  columns={documentcolums}
                  loading={this.state.documentloading}
                  bordered
                  scroll={{ x: "max-content" }}
                />
              </Card>
            </Content>

            <BottomBar />
              </>
            )}
          </Layout>
        </Layout>
      </div>
    );
  }
}
