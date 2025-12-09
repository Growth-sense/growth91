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
  Input,
  Alert,
  notification,
  Popconfirm,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import Sidebar2 from "./common/Sidebar2";
import NoPermission from "./common/NoPermission";
import { loadModulePermissions } from "./common/permissions";
import moment from "moment";
import Apis from "../constants/Apis";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const { Option } = Select;
const { Content } = Layout;

class PendingOfflinePayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offline_list: [],
      visible: false,
      canExport: false,
      canApprove: false,
    };
  }

  async componentDidMount() {
    // load permissions for payments_offline_pending
    try {
      const perms = await loadModulePermissions("payments_offline_pending");
      this.setState({
        canExport: perms.canExport,
        canApprove: perms.canApprove,
      });
    } catch (e) {}

    // If no view permission, do not call API
    if (this.props.noPermission) {
      return;
    }


    // existing data load
    Bridge.admin.get_all_pending_offline_payment_history().then((result) => {
      if (result.status == "1") {
        this.setState({
          offline_list: result.data,
          coffline_list: result.data,
        });
      }
    });
  }

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.coffline_list) {
        if (
          (item.deal_id && item.deal_id.includes(text)) ||
          (item.startup_id && item.startup_id.includes(text)) ||
          (item.investor_name && item.investor_name.toLowerCase().includes(text.toLowerCase())) ||
          ( moment(item.payment_dt).format("DD MMM, YYYY") &&  moment(item.payment_dt).format("DD MMM, YYYY").toLowerCase().includes(text.toLowerCase())) ||
          (item.payment_type && item.payment_type.toLowerCase().includes(text.toLowerCase())) ||
          (item.payment_date && item.payment_date.includes(text)) ||
          (item.investment_amt && item.investment_amt.includes(text)) ||
          (item.investor_id && item.investor_id.includes(text)) ||
          (item.investor_email && item.investor_email.includes(text)) ||
          (item.reference_id && item.reference_id.includes(text))
          // item.payment_ref && item.payment_ref.includes(text)
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        offline_list: arr,
        loading: false,
      });
      // if(arr.length==0){
      //   this.setState({paymentlist:this.state.cpaymentlist});
      // }
    } else {
      this.setState({
        offline_list: this.state.coffline_list,
        loading: false,
      });
    }
  };

  approveOfflinePayment = (item) => {
    if (this.state.canApprove === false) {
      message.error("You do not have permission to approve pending offline payments.");
      return;
    }

    const newFormData = new FormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    newFormData.append("id", item.reference_id);
    Bridge.admin.approve
      .approve_investor_offline_data(newFormData, config)
      .then((result) => {
        if (result.status == "1") {
          notification.success({
            message: "Success",
            description: "Payment approved successfully.",
            placement: "top",
            duration: 5,
          });
        }

        Bridge.admin
          .get_all_pending_offline_payment_history()
          .then((result) => {
            this.setState({
              offline_list: result.data,
              coffline_list: result.data,
            });
          });
      });
  };

  exportToCSV = (fileName) => {
    if (this.state.canExport === false) {
      message.error("You do not have permission to export pending offline payments.");
      return;
    }

    let arr = [];
    let count = 1;
    for (let item of this.state.offline_list) {
      let obj = {
        "Sr No": count,
        "Investor id": item.investor_id,
        "Deal ID": item.deal_id,
        "Startup ID": item.startup_id,
        "Investor Email": item.investor_email,
        "Investor Name": item.investor_name,
        "Payment Type": item.payment_type,
        "	Investment Amount": item.investment_amt,
        "Convenience Fees": item.processing_fees,
        "Reference Id": item.reference_id,
        "Payment Date": item.payment_dt,
        Attachment: item.attach_copy,
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
    const { canExport, canApprove } = this.state;

    const dataSource =
      this.state.offline_list &&
      this.state.offline_list.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          investor_id: item.investor_id,
          deal_id: item.deal_id,
          startup_id: item.startup_id,
          investor_email: item.investor_email,
          investor_name: item.investor_name ? item.investor_name : "---",
          payment_type: item.payment_type ? item.payment_type : "",
          investment_amt: item.investment_amt ? item.investment_amt : "---",
          reference_id: item.reference_id ? item.reference_id : "---",
          ref_id: item.reference_id,
          payment_dt: item.payment_dt
            ? moment(item.payment_dt).format("DD MMM, YYYY")
            : "---",
          processing_fees: item.processing_fees ? item.processing_fees : "---",
          attach_copy: item,
          remarks: "",
        };
      });

    const columns = [
      {
        title: "Sr No",
        dataIndex: "srno",
        key: "srno",
      },
      {
        title: "Investor id",
        dataIndex: "investor_id",
        key: "investor_id",
      },
      {
        title: "Deal Id",
        dataIndex: "deal_id",
        key: "deal_id",
      },
      {
        title: "Startup Id",
        dataIndex: "startup_id",
        key: "startup_id",
      },
      {
        title: "Investor Email",
        dataIndex: "investor_email",
        key: "investor_email",
      },
      {
        title: "Investor Name",
        dataIndex: "investor_name",
        key: "investor_name",
      },
      {
        title: "Payment Type",
        dataIndex: "payment_type",
        key: "payment_type",
      },
      {
        title: "Investment Amount",
        dataIndex: "investment_amt",
        key: "investment_amt",
        align: "right",
      },
      {
        title: "Convenience Fees",
        dataIndex: "processing_fees",
        key: "processing_fees",
        align: "right",
      },
      {
        title: "Order Id / Reference Id",
        dataIndex: "reference_id",
        key: "reference_id",
      },
      {
        title: "Payment Date",
        dataIndex: "payment_dt",
        key: "payment_dt",
      },
      {
        title: "Attachment",
        dataIndex: "attach_copy",
        key: "attach_copy",
        render: (text, record) => (
          <a
            href={
              Apis.IMAGEURL +
              "deal/offline_payment/attachment/" +
              text.offline_payment_id +
              "/" +
              text.attach_copy
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {text.attach_copy ? (
              <img
                src={
                  Apis.IMAGEURL +
                  "deal/offline_payment/attachment/" +
                  text.offline_payment_id +
                  "/" +
                  text.attach_copy
                }
                alt="click here"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: "8%",
                }}
              />
            ) : (
              "---"
            )}
          </a>
        ),
      },
      {
        title: "Approve",
        dataIndex: "ref_id",
        key: "ref_id",
        render: (text, record) => {
          return (
            <>
          <Popconfirm
            title={"Are you sure to approve this payment?"}
            description={"This action cannot be undone."}
            onConfirm={() => {
              this.approveOfflinePayment(record);
            }}
            okText="Yes"
            cancelText="No"
          >
                <Button disabled={canApprove === false}>Approve</Button>
          </Popconfirm>
            </>
          );
        },
      },
    ];

    return (
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
                <Card title="Pending Offline Payments" style={{ margin: 16 }}>
                  <Breadcrumb
                    style={{
                      margin: "0",
                    }}
                  >
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Pending Offline Payments</Breadcrumb.Item>
                  </Breadcrumb>
                  <br />

                  <Alert
                    style={{ maxWidth: 500 }}
                    message="Note:"
                    description="After Approving the payment will added to offline payment list."
                    type="success"
                  />
                  <br />

                  <Input
                    value={this.state.searchinput}
                    placeholder="Search"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      float: "right",
                      paddingBottom: "10px",
                    }}
                  >
                    <Button
                      type="primary"
                  onClick={() => this.exportToCSV("Premium Membership")}
                  disabled={canExport === false}
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
            </>
          )}
        </Layout>
      </Layout>
    );
  }
}

export default PendingOfflinePayments;
