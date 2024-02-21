import React, { Component } from "react";
import {
  Menu,
  Modal,
  Dropdown,
  Tooltip,
  Table,
  Button,
  Card,
  Input,
  message,
  Spin,
  Collapse,
  Select,
  DatePicker,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Bridge from "../../../constants/Bridge";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import Chart from "react-apexcharts";
import { tuple } from "antd/es/_util/type";

const { Panel } = Collapse;
const { Option } = Select;

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentloading: false,
      loading:false,
    
      listofdocumentstatus: false,
      startup_list: [],
      cstartup_list: [],
      analyticslist: [],
      canalyticslist: [],
      startup_id: "",
      startup_name: "",
      addModalStatus: false,
      month_year: "",
      showtablestatus: false,
      startup_id:'',
      show_analytics_view_modal:false,
      //for view
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
      view_analytics_id:"",
      deleteModal:false,
      delete_analytics_id:'',
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({
        startup_id: this.props.id,
      });
    }
  }

  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  };

  // get analytics by startup id
  getanalyticlist = () => {
    this.setState({ loading: true });
    let params={
      startup_id:this.props.id,
    }
    this.setState({loading:true})
    Bridge.admin.analytics.get_analytics(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          analyticslist: result.data,
          loading: false,
        });
      } else {
        console.log(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  show_analytics_view(item) {
    let i = item;
    this.setState({
      show_analytics_view_modal: true,
      view_analytics_id:i.analytic_id,
      view_gross_monetary_value: i.gross_monetary_value,
      view_gross_revenue: i.gross_revenue,
      view_net_revenue: i.net_revenue,
      view_revenue_remarks: i.net_revenue_remarks,
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
      view_expenses_remarks: i.expenses_remarks,
      view_customer_acquisition: i.customer_acquisition,
      view_life_time_value: i.life_time_value,
      view_customer_value_remarks: i.customer_acquisition,
      month_year:moment(i.month_year),
    });
  }

  updateAnalytics(){

    let params= {
      analytics_id:this.state.view_analytics_id,
      month_year: this.state.month_year,
      gross_monetary_value: this.state.view_gross_monetary_value,
      gross_revenue: this.state.view_gross_revenue,
      net_revenue: this.state.view_net_revenue,
      net_revenue_remarks: this.state.view_revenue_remarks,
      users: this.state.view_users,
      total_active: this.state.view_total_active,
      user_remarks: this.state.view_users,
      android: this.state.view_android,
      ios: this.state.view_ios,
      play_store_rating: this.state.view_play_store_rating,
      app_store_rating: this.state.view_app_store_rating,
      fixed_expenses: this.state.view_fixed_expenses,
      variable_expenses: this.state.view_variable_expenses,
      one_time_expenses: this.state.view_one_time_expenses,
      total_expenses: this.state.view_total_expenses,
      expenses_remarks: this.state.view_expenses_remarks,
      customer_acquisition: this.state.view_customer_acquisition,
      life_time_value: this.state.view_life_time_value,
      customer_value_remarks: this.state.view_customer_value_remarks,
    }
    // console.log("data_id",params)
    this.setState({loading:true})
    Bridge.admin.analytics.update_analytics(params).then((result)=>{
      if(result.status=='1'){
        message.success("Analytics has been successfully updated");
        this.setState({
          loading:false,
          show_analytics_view_modal:false,
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
          view_analytics_id:"",
        },this.getanalyticlist())
      }
      else{
        message.error(result.message);
        this.setState({loading:false})
      }
    });
  }

  showDeleteModal(item){
    this.setState({delete_analytics_id:item.analytic_id,deleteModal:true})
  }

  delete_analytics(){
    let params={
      analytics_id:this.state.delete_analytics_id,
    }
    this.setState({loading:true})
    Bridge.admin.analytics.delete_analytics(params).then((result)=>{
      if(result.status=='1'){
        message.success("Successfuly Deleted Analytics")
        this.setState({loading:false,delete_analytics_id:'',deleteModal:false},this.getanalyticlist())
      }
      else{
        message.warning("Error, Can't Able to delete");
        this.setState({loading:false})
      }
    })
  }
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
        width:80
      },
      {
        title: "Month",
        dataIndex: "month",
        key: "month",
        width:80
      },
      {
        title: "Updated Date",
        dataIndex: "updated_date",
        key: "updated_date",
        width:80
      },
      {
        title: "Update By",
        dataIndex: "updated_by",
        key: "updated_by",
        width:90,
      },
      { 
        title:"Action",
        dataIndex:'action',
        key:'action',
        width:30,
        fixed:'right',
        render: (text,record) => {
          const menu = (
            <Menu mode="vertical" defaultSelectedKeys={[this.state.path]}
            style={{ width:240 }}
            >
                <Menu.Item key={`update${record.key}`} icon={<EditOutlined />}>
                  <a href="#" style={{ fontSize:14 }}  onClick={() => {this.show_analytics_view(text)}}>
                    &nbsp;&nbsp; Update/VIEW
                  </a>
                </Menu.Item>
                <Menu.Item key={`delete${record.key}`} icon={<DeleteOutlined />}>
                  <a href="#" onClick={() => {this.showDeleteModal(text)}} style={{ fontSize:14 }}>
                     &nbsp;&nbsp;Delete
                  </a>
                </Menu.Item>
            </Menu>
          )
          return (
            <div>
              <Dropdown overlay={menu} placement="bottom">
                <a onClick={e => e.preventDefault()}>
                  <div className='menu-action '>
                    <i className='bx bx-dots-vertical-rounded'></i>
                  </div>
                </a>
              </Dropdown>
            </div>
          )
        }
      },
    ];
    return (
      <div>
        <a href="#!" onClick={()=>this.setState({showtablestatus:true},()=>this.getanalyticlist())}>
          <Tooltip title="View Analytics">
            <EyeOutlined /> &nbsp;
            <span
              style={{
                position: "relative",
                top: 3,
              }}
            >
              Analytics
            </span>
          </Tooltip>
        </a>
        <Modal
          title="Startup Analytics"
          visible={this.state.showtablestatus}
          onOk={() => this.setState({ showtablestatus: false })}
          okText="Ok"
          onCancel={() => this.setState({ showtablestatus: false })}
          width={800}
        >
          <Table
            className="table-2"
            dataSource={dataSource}
            columns={columns}
            loading={this.state.loading}
            bordered
            scroll={{ x: 1400 }}
          />
        </Modal>

        {/* Start analytics view */}
        <Modal
          title="View Analytics"
          visible={this.state.show_analytics_view_modal}
          onOk={()=>{this.updateAnalytics()}}
          onCancel={() => this.setState({ show_analytics_view_modal: false })}
          okText="Update"
          width={550}
        >
          <Spin spinning={this.state.loading}>
            {/* revenue */}
            <div className="form-group mt-3">
              <label className="mb-2">Select Analytics Months</label>
              <DatePicker
                value={this.state.month_year}
                picker="month" 
                onChange={(date,dateString) =>
                  this.setState({ month_year: date })
                }
                style={{ width: "100%" }}
              />
            </div>
            {/* {console.log(this.state.month_year)} */}
            <h4>Revenue</h4>

            <div className="form-group mt-3">
              <label className="mb-2">Gross Monetary Value</label>
              <Input
                type="number"
                value={this.state.view_gross_monetary_value}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_gross_revenue}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_net_revenue}
                onWheel={() => document.activeElement.blur()}
                onChange={(e) =>
                  this.setState({ view_net_revenue: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Remarks</label>
              <Input
                type="text"
                value={this.state.view_revenue_remarks}
              
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
                value={this.state.view_users}
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => this.setState({ view_users: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">Total Active</label>
              <Input
                type="number"
                value={this.state.view_total_active}
              
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
                value={this.state.view_android}
                onWheel={() => document.activeElement.blur()}
                onChange={(e) =>
                  this.setState({ view_android: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">IOS</label>
              <Input
                type="number"
                value={this.state.view_ios}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_app_store_rating}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_fixed_expenses}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_variable_expenses}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_one_time_expenses}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_total_expenses}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_customer_acquisition}
                onWheel={() => document.activeElement.blur()}
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
                value={this.state.view_life_time_value}
                onWheel={() => document.activeElement.blur()}
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
               
                onChange={(e) =>
                  this.setState({ view_customer_value_remarks: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
          </Spin>
        </Modal>

        <Modal
          title="Delete Analytics Analytics"
          visible={this.state.deleteModal}
          onOk={() => this.delete_analytics()}
          okText="Delete"
          onCancel={() => this.setState({ deleteModal: false })}
          width={800}
        >
          <div><h4>Are You Sure to Want to Delete This Analytics?</h4></div>
        </Modal>
      </div>
    );
  }
}
