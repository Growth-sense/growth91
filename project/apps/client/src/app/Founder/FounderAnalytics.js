import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Sidebar from "./common/Sidebar";

import Sidebar2 from "./common/Sidebar2";

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
  DatePicker,
  Dropdown,
  Menu,
  Checkbox,
  Input,
} from "antd";
import Bridge from "../constants/Bridge";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import Apis from "../constants/Apis";
import WebFooter from "../common/WebFooter";
import { alignBox } from "@nivo/core";

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

class FounderAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      addModalStatus: false,
      formloader: false,
      startup_list: [],
      cstartup_list: [],
      analyticslist: [],
      canalyticslist: [],
      startup_id: "",
      gross_monetary_value: "",
      gross_revenue: "",
      net_revenue: "",
      revenue_remarks: "",
      users: "",
      total_active: "",
      users_remarks: "",
      android: "",
      ios: "",
      play_store_rating: "",
      app_store_rating: "",
      fixed_expenses: "",
      variable_expenses: "",
      one_time_expenses: "",
      total_expenses: "",
      expenses_remarks: "",
      customer_acquisition: "",
      life_time_value: "",
      customer_value_remarks: "",
      select_month_year:'',

      //for view modal
      view_gross_monetary_value: "",
      view_gross_revenue: "",
      view_net_revenue: "",
      view_revenue_remarks: "",
      view_users: "",
      view_total_active: "",
      view_users_remarks: "",
      view_android: "",
      view_ios: "",
      view_play_store_rating: "",
      view_app_store_rating: "",
      view_fixed_expenses: "",
      view_variable_expenses: "",
      view_one_time_expenses: "",
      view_total_expenses: "",
      view_expenses_remarks: "",
      view_customer_acquisition: "",
      view_life_time_value: "",
      view_customer_value_remarks: "",
      view_founder_id: "",
      updated_by: "",
      startup_name: "",
      show_analytics_view_modal: false,
      check_month_update:false,
      disable_add_btn:false,
    };
  }

  componentDidMount() {
    this.setState(
      { founder_id: localStorage.getItem("founder_id") },
      this.getstartup_by_operational_founder()
    );
    this.setState({ updated_by: localStorage.getItem("founder_name") });
    this.getanalyticlist();
  }

  showAddModal = () => {
    this.setState({
      addModalStatus: true,
      startup_name: this.state.startup_list[0].name,
    });
  };

  // get post list
  getanalyticlist = () => {
    this.setState({ loading: true });
    let params={
      founder_id:localStorage.getItem("founder_id")
    }
    Bridge.founder.list(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          analyticslist: result.data,
           canalyticslist: result.data,
           founder_id:localStorage.getItem("founder_id"),
          loading: false,
        });
        for(let item of result.data){
          if(moment(item.month_year).format('MMM-YYYY')==moment().subtract(1, 'months').format('MMM-YYYY')){
              this.setState({check_month_update:false})
              return;
          }
          else{
            this.setState({check_month_update:true})
          }
        }
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get
  getstartup_by_operational_founder = () => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    this.setState({ loading: true });
    Bridge.founder.getstartup_by_operational_founder(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          startup_list: result.data,
          // cstartup_list:result.data,
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
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      for (let item of this.state.cstartup_list) {
        if (
          item.month_year.includes(text) ||
          item.name.includes(text) ||
          item.submitted_by.includes(text) ||
          item.updated_date.includes(text)
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        startup_list: arr,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };
  // add new analytics
  addanalytics = () => {
    if (this.state.startup_name == "") {
      message.warning(
        "You can't add Analytics, Please Contact to Administrator"
      );
      return false;
    }else if (this.state.founder_id == "") {
      message.warning("Please login as a Founder");
      return false;
    } else if(this.state.select_month_year==''){
      message.warning("Month is required");
      return false;
    }
    else if(this.state.gross_monetary_value==''){
      message.warning("Gross Monetary Value is required");
      return false;
    }else if(this.state.gross_revenue==''){
      message.warning("Gross Revenue is required");
      return false;
    }else if(this.state.net_revenue==''){
      message.warning("Net Revenue is required");
      return false;
    }
    else if(this.state.users==''){
      message.warning("Users is required");
      return false;
    }else if(this.state.total_active==''){
      message.warning("Total Active Users is required");
      return false;
    }else if(this.state.fixed_expenses==''){
      message.warning("Fixed Expenses is required");
      return false;
    }else if(this.state.variable_expenses==''){
      message.warning("Variable Expenses is required");
      return false;
    }else if(this.state.one_time_expenses==''){
      message.warning("One Time Expenses is required");
      return false;
    }else if(this.state.total_expenses==''){
      message.warning("Total Expenses is required");
      return false;
    }else if(this.state.customer_acquisition==''){
      message.warning("Customer Acquisition is required");
      return false;
    } else if( this.state.life_time_value==''){
      message.warning("Customer Acquisition is required");
      return false;
    }else if(moment(this.state.select_month_year).format('MMM-YYYY')==moment().format('MMM-YYYY')){
      message.warning("You can't add Analytics for current month",4);
      return false;
    }
    for(let item of this.state.analyticslist){
    if(moment(item.month_year).format('MMM-YYYY')==moment(this.state.select_month_year).format('MMM-YYYY')){
        message.warning('You have already added analytics for'+moment(this.state.select_month_year).format('MMM-YYYY') +'month',4);
        return;
    }
  }
    this.setState({ formloader: true });
    let params = {
      startup_id: this.state.startup_list[0].startupid,
      month_year: moment(this.state.select_month_year).format("MMM-YYYY"),
      gross_monetary_value: this.state.gross_monetary_value,
      gross_revenue: this.state.gross_revenue,
      net_revenue: this.state.net_revenue,
      net_revenue_remarks: this.state.revenue_remarks,
      users: this.state.users,
      total_active: this.state.total_active,
      user_remarks: this.state.users_remarks,
      android: this.state.android,
      ios: this.state.ios,
      play_store_rating: this.state.play_store_rating,
      app_store_rating: this.state.app_store_rating,
      fixed_expenses: this.state.fixed_expenses,
      variable_expenses: this.state.variable_expenses,
      one_time_expenses: this.state.one_time_expenses,
      total_expenses: this.state.total_expenses,
      expenses_remarks: this.state.expenses_remarks,
      customer_acquisition: this.state.customer_acquisition,
      life_time_value: this.state.life_time_value,
      customer_value_remarks: this.state.customer_value_remarks,
      founder_id: this.state.founder_id,
      updated_by: this.state.updated_by,
    };

    Bridge.founder.add_analytics(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            formloader: false,
            addModalStatus: false,
            startup_id: "",
            gross_monetary_value: "",
            gross_revenue: "",
            net_revenue: "",
            revenue_remarks: "",
            users: "",
            total_active: "",
            users_remarks: "",
            android: "",
            ios: "",
            play_store_rating: "",
            app_store_rating: "",
            fixed_expenses: "",
            variable_expenses: "",
            one_time_expenses: "",
            total_expenses: "",
            expenses_remarks: "",
            customer_acquisition: "",
            life_time_value: "",
            customer_value_remarks: "",
            founder_id: "",
            updated_by: "",
          },
          () => this.getanalyticlist()
        );
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  show_analytics_view(item){
    let i=item;
    this.setState({
      show_analytics_view_modal:true,
      view_gross_monetary_value: i.gross_monetary_value,
      view_gross_revenue: i.gross_revenue,
      view_net_revenue: i.net_revenue,
      view_revenue_remarks:i.revenue_remarks,
      view_users: i.users,
      view_total_active: i.total_active,
      view_users_remarks: i.user_remarks,
      view_android: i.android,
      view_ios: i.ios,
      view_play_store_rating: i.play_store_rating,
      view_app_store_rating: i.app_store_rating,
      view_fixed_expenses: i.fixed_expenses,
      view_variable_expenses: i.variable_expenses,
      view_one_time_expenses: i.one_time_expenses,
      view_total_expenses: i.total_expenses,
      view_expenses_remarks: i.total_expenses_remarks,
      view_customer_acquisition: i.customer_acquisition,
      view_life_time_value: i.life_time_value,
      view_customer_value_remarks: i.customer_acquisition,
      startup_name: this.state.startup_list[0].name,
    });
    
  };

  render() {
    const dataSource =
      this.state.analyticslist &&
      this.state.analyticslist.map((item, index) => {
        return {
          key: index,
          sr_no: index + 1,
          month: item.month_year
            ? moment(item.month_year).format("MMM-YYYY")
            : "---",
          updated_date: item.updated_date ? item.updated_date : "---",
          updated_by: item ? item.updated_by : "---",
          action: item,
        };
      });

    const columns = [
      {
        title: "Sr No",
        dataIndex: "sr_no",
        key: "sr_no",
      },
      {
        title: "Month",
        dataIndex: "month",
        key: "month",
      },
      {
        title: "Updated Date",
        dataIndex: "updated_date",
        key: "updated_date",
      },
      {
        title: "Update By",
        dataIndex: "action",
        key: "action",
        render: (text) => (
          <a href="#" onClick={()=>{this.show_analytics_view(text)}}>
            {text.updated_by}
          </a>
        ),
      },
    ];
    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current >moment().endOf('day');
    };

    return (
      <div>
        <Header />
        {this.state.check_month_update?(
        <div style={{color: 'white',
    backgroundColor: 'red',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '80px',
    padding: '8px 0px'}}>Please add Your Analytics of {moment().subtract(1, 'months').format('MMM-YYYY')}</div>):(<div></div>)}
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

          <div className="  col col-md-8 pb-4">
            <div style={{ marginTop: 130 }}>
              <Card
                title="Analytics"
                extra={
                  <Button
                    className="pb-3 pt-1 my-md-2"
                    type="primary"
                    disabled={this.state.disable_add_btn}
                    onClick={this.showAddModal}
                  >
                    <i
                      className="bx bxs-plus-circle"
                      style={{
                        color: "#fff",
                        position: "relative",
                        top: 3,
                        left: -3,
                      }}
                    ></i>{" "}
                    Add Analytics
                  </Button>
                }
                style={{ margin: 16 }}
              >
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Analytics</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                <Input
                  value={this.state.searchinput}
                  placeholder="Search"
                  onChange={(e) => this.searchinput(e)}
                  style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                />
                <Table
                  className="table-2"
                  dataSource={dataSource}
                  columns={columns}
                  loading={this.state.loading}
                  bordered
                  scroll={{ x: 1400 }}
                />
              </Card>
            </div>

            {/* How do i invest? */}
            <section id="hdii"></section>
          </div>

          <div className="col-2"></div>
        </div>

        {/* Start Add modal  */}
        <Modal
          title="Add New Analytics"
          visible={this.state.addModalStatus}
          onOk={this.addanalytics}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            {/* revenue */}
            <div className="form-group">
              <h4 className="mb-2">Startup Name: {this.state.startup_name} </h4>
              <br />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Select Month<span className="text-danger">*</span></label>
              <DatePicker
                picker="month" 
                disabledDate={disabledDate}
                value={this.state.select_month_year}
                onChange={(date,dateString) =>
                  this.setState({select_month_year:date })
                }
                style={{ width: "100%" }}
              />
            </div><br/>
            <h4>Revenue</h4>

            <div className="form-group mt-3">
              <label className="mb-2">Gross Monetary Value<span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.gross_monetary_value}
                onChange={(e) =>
                  this.setState({ gross_monetary_value: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Gross Revenue <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.gross_revenue}
                onChange={(e) =>
                  this.setState({ gross_revenue: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Net Revenue <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.net_revenue}
                onChange={(e) => this.setState({ net_revenue: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.revenue_remarks}
                onChange={(e) =>
                  this.setState({ revenue_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* for users/customers */}
            <h4>Users / Customers</h4>
            <div className="form-group mt-3">
              <label className="mb-2">New Users / Customers <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.users}
                onChange={(e) => this.setState({ users: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Total Active <span className="text-danger">*</span></label>
              <Input
                type="number"
                value={this.state.total_active}
                onChange={(e) =>
                  this.setState({ total_active: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.users_remarks}
                onChange={(e) =>
                  this.setState({ users_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* app download */}
            <br />
            <h4>App Download</h4>
            <div className="form-group mt-3">
              <label className="mb-2">Android</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.android}
                onChange={(e) => this.setState({ android: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">IOS</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.ios}
                onChange={(e) => this.setState({ ios: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Play Store Rating</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.play_store_rating}
                onChange={(e) =>
                  this.setState({ play_store_rating: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">App Store Rating</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.app_store_rating}
                onChange={(e) =>
                  this.setState({ app_store_rating: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* expenses */}
            <br />
            <h4>Expenses</h4>
            <div className="form-group mt-3">
              <label className="mb-2">Fixed Expenses <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.fixed_expenses}
                onChange={(e) =>
                  this.setState({ fixed_expenses: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Variable Expenses <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.variable_expenses}
                onChange={(e) =>
                  this.setState({ variable_expenses: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">One Time Expenses <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.one_time_expenses}
                onChange={(e) =>
                  this.setState({ one_time_expenses: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Total Expenses <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.total_expenses}
                onChange={(e) =>
                  this.setState({ total_expenses: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.expenses_remarks}
                onChange={(e) =>
                  this.setState({ expenses_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* customer Acquistion */}
            <br />
            <h4>Customer Acquistion</h4>
            <div className="form-group mt-3">
              <label className="mb-2">Customer Acquisition <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.customer_acquisition}
                onChange={(e) =>
                  this.setState({ customer_acquisition: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Life Time Value of a Customer <span className="text-danger">*</span></label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.life_time_value}
                onChange={(e) =>
                  this.setState({ life_time_value: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.customer_value_remarks}
                onChange={(e) =>
                  this.setState({ customer_value_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}
        {/* Start analytics view */}
        <Modal
          title="View Analytics"
          visible={this.state.show_analytics_view_modal}
          onOk={() => this.setState({ show_analytics_view_modal: false })}
          onCancel={() => this.setState({show_analytics_view_modal: false })}
          okText="OK"
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            {/* revenue */}
            <div className="form-group">
              <h4 className="mb-2">Startup Name: {this.state.startup_name} </h4>
              <br />
            </div>
            <h4>Revenue</h4>

            <div className="form-group mt-3">
              <label className="mb-2">Gross Monetary Value</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_gross_monetary_value}
                readOnly
                onChange={(e) =>
                  this.setState({ view_gross_monetary_value: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Gross Revenue</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_gross_revenue}
                readOnly
                onChange={(e) =>
                  this.setState({ view_gross_revenue: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Net Revenue</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_net_revenue}
                readOnly
                onChange={(e) => this.setState({ view_net_revenue: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.view_revenue_remarks}
                readOnly
                onChange={(e) =>
                  this.setState({ view_revenue_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* for users/customers */}
            <h4>Users / Customers</h4>
            <div className="form-group mt-3">
              <label className="mb-2">New Users / Customers</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_users}
                readOnly
                onChange={(e) => this.setState({ view_users: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Total Active</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_total_active}
                readOnly
                onChange={(e) =>
                  this.setState({ view_total_active: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.view_users_remarks}
                readOnly
                onChange={(e) =>
                  this.setState({ view_users_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* app download */}
            <br />
            <h4>App Download</h4>
            <div className="form-group mt-3">
              <label className="mb-2">Android</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_android}
                readOnly
                onChange={(e) => this.setState({ view_android: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">IOS</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_ios}
                readOnly
                onChange={(e) => this.setState({ view_ios: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Play Store Rating</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_play_store_rating}
                readOnly
                onChange={(e) =>
                  this.setState({ view_play_store_rating: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">App Store Rating</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_app_store_rating}
                readOnly
                onChange={(e) =>
                  this.setState({ view_app_store_rating: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* expenses */}
            <br />
            <h4>Expenses</h4>
            <div className="form-group mt-3">
              <label className="mb-2">Fixed Expenses</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_fixed_expenses}
                readOnly
                onChange={(e) =>
                  this.setState({ view_fixed_expenses: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Variable Expenses</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_variable_expenses}
                readOnly
                onChange={(e) =>
                  this.setState({ view_variable_expenses: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">One Time Expenses</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_one_time_expenses}
                readOnly
                onChange={(e) =>
                  this.setState({ view_one_time_expenses: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Total Expenses</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_total_expenses}
                readOnly
                onChange={(e) =>
                  this.setState({ view_total_expenses: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.view_expenses_remarks}
                readOnly
                onChange={(e) =>
                  this.setState({ view_expenses_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* customer Acquistion */}
            <br />
            <h4>Customer Acquistion</h4>
            <div className="form-group mt-3">
              <label className="mb-2">Customer Acquistion</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_customer_acquisition}
                readOnly
                onChange={(e) =>
                  this.setState({ view_customer_acquisition: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Life Time Value of a Customer</label>
              <Input
                type="number"
                onWheel={() => document.activeElement.blur()}
                value={this.state.view_life_time_value}
                readOnly
                onChange={(e) =>
                  this.setState({ view_life_time_value: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.view_customer_value_remarks}
                readOnly
                onChange={(e) =>
                  this.setState({ view_customer_value_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}
        <Footer />
      </div>
    );
  }
}
export default FounderAnalytics;
