import React, { Component } from "react";
import { Layout, Breadcrumb, Card, Select, message, Button, Input } from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import NoPermission from "./common/NoPermission";
import { loadModulePermissions } from "./common/permissions";

import Transactions from "../common/Transactions";
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";
// const fileType =
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// const fileExtension = ".xlsx";

const { Content } = Layout;

class Payments extends Component {
  state = {
    canExport: false,
  };

  async componentDidMount() {
    try {
      const perms = await loadModulePermissions("payments_online");
      this.setState({ canExport: perms.canPaymentsOnlineExport });
    } catch (e) {}
  }

  // exportToCSV = (fileName) => {
  //   let arr = [];
  //   let count=1;
  //   for (let item of this.state.deallist) {
  //     let obj = {
  //       "Sr No": count,
  //       "Payment Id":item.paymentid,
  //       "Investor Name": item.first_name + item.last_name,
  //       "Deal Name": item.name,
  //       "Payment Status":item.payment_status,
  //       "Payment Order Id":item.payment_ref,
  //       "Payment Date":item.payment_date,
  //       "Investment":item.payment_amount,
  //       "Convenience Fees":item.processing_fees,
  //       "Wallet Amount":item.multiples_of,
  //       "Payable Amount":item.total_invitions,
  //       "Payment Type":item.payment_type,
  //       "Payment Description":item.description,
  //     };
  //     arr = [...arr, obj];
  //     count++;
  //   }
  //   const ws = XLSX.utils.json_to_sheet(arr);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  //   message.success("Founders data exported successfully.");
  // };

  render() {
    const { noPermission } = this.props;
    const { canExport } = this.state;
    return (
      <>
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
                  <Card title="Online Payments" style={{ margin: 16 }}>
                    <Breadcrumb
                      style={{
                        margin: "0",
                      }}
                    >
                      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item>Online Payments</Breadcrumb.Item>
                    </Breadcrumb>
                    <br />
                    <br />

                    <Transactions type="admin" canExport={canExport} />
                  </Card>
                </Content>

                <BottomBar />
              </>
            )}
          </Layout>
        </Layout>
      </>
    );
  }
}

export default Payments;
