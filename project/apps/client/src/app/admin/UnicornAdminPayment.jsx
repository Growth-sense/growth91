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
  Modal,
  DatePicker,
  Spin,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import Sidebar2 from "./common/Sidebar2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Urldata from "../investor/components/Urldata";
import moment from "moment";
import NoPermission from "./common/NoPermission";
import { loadModulePermissions } from "./common/permissions";

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
      offlinePaymentModal: false,
      founderEmail: "",
      founderDetails: null,
      paymentAmount: "",
      orderId: "",
      eventTime: "",
      selectedPlan: "",
      canExportPayments: false,
      canAddOfflinePayment: false,
    };
  }

  async componentDidMount() {
    await this.loadPermissions();
    this.getgrouplist();
  }

  loadPermissions = async () => {
    try {
      const perms = await loadModulePermissions("unicorns_payments");
      this.setState({
        canExportPayments: perms.canUnicornsPaymentsExport,
        canAddOfflinePayment: perms.canUnicornsPaymentsAddOfflinePayment,
      });
    } catch (e) {
      console.error("Error loading unicorns_payments permissions", e);
    }
  };

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
    if (!this.state.canExportPayments) {
      message.error("You do not have permission to export payments data.");
      return;
    }
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
        "Current Plan": item.unicorn_plan ? item.unicorn_plan : "---",
        "Plan Start Date": item.unicorn_start_date ? 
          moment(item.unicorn_start_date, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY") : "---",
        "GST": item.unicorn_gst ? item.unicorn_gst : "---",
        "Registered Address": item.unicorn_gst_registered_address ? item.unicorn_gst_registered_address : "---",
        "Name (As needed on the Invoice)": item.unicorn_gst_name ? item.unicorn_gst_name : "---",
        "Unicorn Name": item.unicornName ? item.unicornName : "---",
        "Purchase Plan": item.purchasePlan ? item.purchasePlan : "---",
        "Transaction Date": item.purchaseDate ? item.purchaseDate : "---",
        "Transaction Amount": item.amount ? item.amount.toString().split('.')[0] : "---",
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

  // Get founder details by email
  getFounderByEmail = () => {
    if (!this.state.founderEmail) {
      message.error("Please enter founder email");
      return;
    }
    
    this.setState({ formloader: true });
    let params = {
      email: this.state.founderEmail
    };
    
    Bridge.users.getUsersDetailsByEmail(params).then((result) => {
      if (result.status == 1 && result.data.length > 0 && result.data[0].user_type == 'founder') {
        this.setState({
          founderDetails: result.data[0],
          formloader: false
        });
      } else {
        message.error("Founder not found with this email");
        this.setState({ formloader: false });
      }
    });
  };

  // Add offline payment
  addOfflinePayment = () => {
    if (!this.state.canAddOfflinePayment) {
      message.error("You do not have permission to add offline payments.");
      return;
    }
    const { founderDetails, paymentAmount, orderId, eventTime, selectedPlan } = this.state;
    
    if (!founderDetails || !paymentAmount || !orderId || !eventTime || !selectedPlan) {
      message.error("Please fill all required fields");
      return;
    }
    
    this.setState({ formloader: true });
    let params = {
      founder_id: founderDetails.investor_id,
      amount: paymentAmount,
      order_id: orderId,
      event_time: eventTime,
      planName: selectedPlan
    };
    
    Bridge.Unicorn.addOfflinePayment(params).then((result) => {
      if (result.status == 1) {
        message.success("Offline payment added successfully");
        this.setState({
          offlinePaymentModal: false,
          founderEmail: "",
          founderDetails: null,
          paymentAmount: "",
          orderId: "",
          eventTime: "",
          selectedPlan: "",
          formloader: false
        });
        this.getgrouplist();
      } else {
        message.error(result.message);
        this.setState({ formloader: false });
      }
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
        (item.purchasePlan && item.purchasePlan.toLowerCase().includes(searchValue)) ||
        // Plan
        (item.unicornPlan && item.unicornPlan.toLowerCase().includes(searchValue)) ||
        // Plan Start Date
        (item.unicorn_start_date && 
          moment(item.unicorn_start_date, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY").toLowerCase().includes(searchValue)) ||
        // GST
        (item.unicorn_gst && item.unicorn_gst.toLowerCase().includes(searchValue)) ||
        // Registered Address
        (item.unicorn_gst_registered_address && item.unicorn_gst_registered_address.toLowerCase().includes(searchValue)) || 
        // Business Name
        (item.unicorn_gst_name && item.unicorn_gst_name.toLowerCase().includes(searchValue)) ||
        (item.unicornName && item.unicornName.toLowerCase().includes(searchValue)) ||
        (item.purchaseDate && item.purchaseDate.toLowerCase().includes(searchValue)) || 
        (item.amount && item.amount.toLowerCase().includes(searchValue))
      );
    });

    this.setState({ startups: filteredData });
  };

  render() {
    const { noPermission } = this.props;

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
          unicornBusinessName: item.unicorn_gst_name ?? "---",
          unicornName: item.startup_name ?? "---",
          purchasePlan: item.plan_name ?? "---",
          purchaseDate: item.event_time ? moment(item.event_time, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY") : "---",
          amount: item.amount ? item.amount.toString().split('.')[0] : "---"
        };
      });

    const columns = [
      {
        title: "First name",
        dataIndex: "founderFirstName",
        key: "founderFirstName",
        width: 260,
        fixed: "left",
        sorter: (a, b) => a.founderFirstName.localeCompare(b.founderFirstName),
      },
      {
        title: "Last Name",
        dataIndex: "founderLastName",
        key: "founderLastName",
        width: 280,
        sorter: (a, b) => a.founderLastName.localeCompare(b.founderLastName),
      },
      {
        title: "Email",
        dataIndex: "founderEmail",
        key: "founderEmail",
        width: 280,
        sorter: (a, b) => a.founderEmail.localeCompare(b.founderEmail),
      },

      {
        title: "Mobile",
        dataIndex: "fouderMobile",
        key: "fouderMobile",
        width: 280,
        sorter: (a, b) => a.fouderMobile.localeCompare(b.fouderMobile),
      },
      
      {
        title: "Unicorn Status",
        dataIndex: "unicornStatus",
        key: "unicornStatus",
        width: 280,
        sorter: (a, b) => a.unicornStatus.localeCompare(b.unicornStatus),
      },
      {
        title: "Current Plan",
        dataIndex: "unicornPlan",
        key: "unicornPlan",
        width: 280,
        sorter: (a, b) => a.unicornPlan.localeCompare(b.unicornPlan),
      },
      {
        title: "Plan Start Date",
        dataIndex: "unicornStartDate",
        key: "unicornStartDate",
        width: 280,
        sorter: (a, b) => a.unicornStartDate.localeCompare(b.unicornStartDate),
      },
      {
        title: "GST",
        dataIndex: "unicornGst",
        key: "unicornGst",
        width: 280,
        sorter: (a, b) => a.unicornGst.localeCompare(b.unicornGst),
      },
      {
        title: "Registered Address",
        dataIndex: "unicornRegisteredAddress",
        key: "unicornRegisteredAddress",
        width: 280,
        sorter: (a, b) => a.unicornRegisteredAddress.localeCompare(b.unicornRegisteredAddress),
      },
      {
        title: "Name (As needed on the Invoice)",
        dataIndex: "unicornBusinessName",
        key: "unicornBusinessName",
        sorter: (a, b) => a.unicornBusinessName.localeCompare(b.unicornBusinessName),
        width: 280,
      },
      {
        title: "Unicorn Name",
        dataIndex: "unicornName",
        key: "unicornName",
        width: 280,
        sorter: (a, b) => a.unicornName.localeCompare(b.unicornName),
      },
      {
        title: "Purchase Plan",
        dataIndex: "purchasePlan",
        key: "purchasePlan",
        width: 280,
        sorter: (a, b) => a.purchasePlan.localeCompare(b.purchasePlan),
      },
      {
        title: "Transaction Date",
        dataIndex: "purchaseDate",
        key: "purchaseDate",
        width: 280,
        sorter: (a, b) => a.purchaseDate.localeCompare(b.purchaseDate),
      },
      {
        title: "Transaction Amount",
        dataIndex: "amount",
        key: "amount",
        width: 280,
        sorter: (a, b) => a.amount.localeCompare(b.amount),
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

            {noPermission ? (
              <NoPermission />
            ) : (
              <>

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
                    style={{ height: 40, marginLeft: 10 }}
                    disabled={!this.state.canExportPayments}
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
                  <Button
                    type="primary"
                    onClick={() => this.setState({ offlinePaymentModal: true })}
                    style={{ marginLeft: 30, height: 40 }}
                    disabled={!this.state.canAddOfflinePayment}
                  >
                    Add Offline Payment
                  </Button>
                </div>

                

                <Table
                  dataSource={dataSource}
                  columns={columns}
                  loading={this.state.loading}
                  bordered
                />

                {/* Offline Payment Modal */}
                <Modal
                  title="Add Offline Payment"
                  visible={this.state.offlinePaymentModal}
                  onCancel={() => this.setState({ 
                    offlinePaymentModal: false,
                    founderEmail: "",
                    founderDetails: null,
                    paymentAmount: "",
                    orderId: "",
                    eventTime: "",
                    selectedPlan: ""
                  })}
                  footer={[
                    <Button key="cancel" onClick={() => this.setState({ 
                      offlinePaymentModal: false,
                      founderEmail: "",
                      founderDetails: null,
                      paymentAmount: "",
                      orderId: "",
                      eventTime: "",
                      selectedPlan: ""
                    })}>
                      Cancel
                    </Button>,
                    <Button 
                      key="submit" 
                      type="primary" 
                      loading={this.state.formloader}
                      onClick={this.addOfflinePayment}
                      disabled={!this.state.canAddOfflinePayment}
                    >
                      Add Payment
                    </Button>
                  ]}
                >
                  <Spin spinning={this.state.formloader}>
                    <div style={{ marginBottom: 16 }}>
                      <label>Founder Email *</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Input
                          placeholder="Enter founder email"
                          value={this.state.founderEmail}
                          onChange={(e) => this.setState({ founderEmail: e.target.value })}
                        />
                        <Button onClick={this.getFounderByEmail}>Search</Button>
                      </div>
                    </div>
                    
                    {this.state.founderDetails && (
                      <>
                        <div style={{ marginBottom: 16 }}>
                          <label>First Name</label>
                          <Input value={this.state.founderDetails.first_name || "---"} disabled />
                        </div>
                        
                        <div style={{ marginBottom: 16 }}>
                          <label>Last Name</label>
                          <Input value={this.state.founderDetails.last_name || "---"} disabled />
                        </div>
                        
                        <div style={{ marginBottom: 16 }}>
                          <label>Email</label>
                          <Input value={this.state.founderDetails.email || "---"} disabled />
                        </div>
                        
                        <div style={{ marginBottom: 16 }}>
                          <label>Mobile</label>
                          <Input value={this.state.founderDetails.mobile || "---"} disabled />
                        </div>
                      </>
                    )}
                    
                    <div style={{ marginBottom: 16 }}>
                      <label>Amount *</label>
                      <Input
                        placeholder="Enter payment amount"
                        value={this.state.paymentAmount}
                        onChange={(e) => this.setState({ paymentAmount: e.target.value })}
                      />
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <label>Order ID *</label>
                      <Input
                        placeholder="Enter order ID"
                        value={this.state.orderId}
                        onChange={(e) => this.setState({ orderId: e.target.value })}
                      />
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <label>Event Time *</label>
                      <DatePicker
                        showTime
                        style={{ width: '100%' }}
                        placeholder="Select date and time"
                        onChange={(date, dateString) => this.setState({ eventTime: dateString })}
                      />
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <label>Plan Name *</label>
                      <Select
                        placeholder="Select plan"
                        style={{ width: '100%' }}
                        value={this.state.selectedPlan}
                        onChange={(value) => this.setState({ selectedPlan: value })}
                      >
                        <Select.Option value="Silver">Silver</Select.Option>
                        <Select.Option value="Gold">Gold</Select.Option>
                        <Select.Option value="Platinum">Platinum</Select.Option>
                        <Select.Option value="AdditionalEdit">AdditionalEdit</Select.Option>
                      </Select>
                    </div>
                  </Spin>
                </Modal>
                
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

export default UnicornAdminPayment;
