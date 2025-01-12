import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from './common/Sidebar';
import Sidebar2 from './common/Sidebar2';

import { 
  Layout, Breadcrumb, Table, 
  Card, Button, Modal, message,Select ,
  Spin,DatePicker,Dropdown,Menu,
Input } from 'antd';
import Bridge from '../constants/Bridge';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import Apis from '../constants/Apis';
import WebFooter from '../common/WebFooter';

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

class FounderApprovals extends Component {

    constructor(props) {
        super(props);
        this.state = {
          posts:[],
          loading: false,
          addModalStatus:false,
          title:'',
          description:'',
          filename:'',
          formloader:false,
          editModalStatus:false,
          edittitle:'',
          editdescription:'',
          editfilename:'',
          blogid:'',
          imagename:'',
          deleteModalStatus:false,
          ctype:'',
          editctype:'',
          youtubelink:'',
  
          // add input states
          startupname:'',
          dealstartdate:'',
          dealenddate: '',
          targetamount:'',
          mintargetamount:'',
          maxtargetamount:'',
          multipleofdescription:'',
          backedby:'',
          category:'',
          logo:'',
          banner:'',
          
  
          // update input states
          editstartupname:'',
          editdealstartdate:'',
          editdealenddate: '',
          edittargetamount:'',
          editmintargetamount:'',
          editmaxtargetamount:'',
          editmultipleofdescription:'',
          editbackedby:'',
          editcategory:'',
          editlogo:'',
          editbanner:'',
          edityoutubelink:'',
  
          deal_id:'',
  
          deallist:[],
          cdeallist:[],
  
          // edit states
          approvestatus:'',
          dealstatus:'',
          updatemodalstatus:false,
  
          logourl:'',
          bannerurl:'',

          analyticslist:[],
          canalyticslist:[],

            monthyear:'',
            revenue:'',
            grossprofitmargin:'',
            customerchurnrate:'',
            monthlyactiveusers:'',
            ration:'',

            editmonthyear:'',
            editrevenue:'',
            editgrossprofitmargin:'',
            editcustomerchurnrate:'',
            editmonthlyactiveusers:'',
            editration:'',
        }
      }
  
  
      componentDidMount() {
        this.getanalyticlist();
      }
  
      showAddModal = () => {
        this.setState({
          addModalStatus: true,
        });
      }
  
      // get post list
      getanalyticlist = () => {
        this.setState({ loading: true });
        Bridge.founder.list().then((result) => {
          if (result.status == 1) {
            this.setState({
            //     analyticslist: result.data,
            //   canalyticslist: result.data,
              loading: false,
            });
          } else {
            message.error(result.message);
            this.setState({
              loading: false,
            });
          }
        });
      }
  
      // on change file
      onChangeEditFile = (e,type) => {
        if(type=='banner') {
          this.setState({
            editbanner: e.target.files[0],
          });
        } else {
          this.setState({
            editlogo: e.target.files[0],
          });
        } 
      }
  
      // show edit modal
      showEditModal = (item) => {
        this.setState({
            deal_id: item.analytic_id,
            editmonthyear:item.month_year ? moment(item.month_year) : '',
            editrevenue:item.Revenue,
            editgrossprofitmargin:item.Gross_Profit_Margin,
            editcustomerchurnrate:item.Customer_churn_rate,
            editmonthlyactiveusers:item.Mthly_active_users,
            editration:item.Ltv_cac_ratio,
            editModalStatus:true,
        });
      }
  
      showupdatemodal = (item) => {
        this.setState({
          deal_id: item.deal_id,
          approvestatus: item.user_status,
          dealstatus: item.deal_status,
          updatemodalstatus:true,
        });
      }
  
      // update post
      updateanalytics = () => {
            if (this.state.editmonthyear == ''){
            message.warning('Month year is required');
            return false;
          } else if(this.state.editrevenue == ''){
            message.warning('Revenue is required');
            return false;
          }else if(this.state.editgrossprofitmargin == ''){
            message.warning('Gross profit margin is required.');
            return false;
          }else if(this.state.editcustomerchurnrate == ''){
            message.warning('Customer churn rate is required.');
            return false;
          }else if(this.state.editmonthlyactiveusers == ''){
            message.warning('Monthly active users fieled is required.');
            return false;
          }else if(this.state.editration == ''){
            message.warning('LTC/CAC ration value is required.');
            return false;
          }
        this.setState({ formloader: true });
  
        let params = {
            id: this.state.deal_id,
            monthyear: this.state.editmonthyear,
            revenue: this.state.editrevenue,
            grossprofitmargin:  this.state.editgrossprofitmargin,
            customerchurnrate: this.state.editcustomerchurnrate,
            monthlyactiveusers: this.state.editmonthlyactiveusers,
            ration: this.state.editration,
        }
  
        Bridge.founder.edit(params).then((result) => {
          if (result.status == 1) {
            message.success(result.message);
            this.setState({ 
              formloader: false ,
              editModalStatus: false,
              formloader: false ,
              editmonthyear:'',
              editrevenue:'',
              editgrossprofitmargin: '',
              editcustomerchurnrate:'',
              editmonthlyactiveusers:'',
              editration:'',
              deal_id:'',
            },() =>this.getanalyticlist());
          } else {
            message.error(result.message);
            this.setState({ 
              formloader: false ,
            });
          }
        });
      }
  
      showDeleteModal = (item) => {
        this.setState({
          deleteModalStatus: true,
          deal_id: item.analytic_id,
        });
      }
  
      deletedeal = () => {
        if (this.state.deal_id == ''){
          message.warning('Please select the deal first.');
          return false;
        }
  
        this.setState({ formloader: true });
        let formData = new FormData();    //formdata object
        formData.append('id', this.state.deal_id);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
        Bridge.founder.delete(formData,config).then((result) => {
          if (result.status == 1) {
            message.success(result.message);
            this.setState({
              formloader: false,
              deleteModalStatus: false,
              deal_id:'',
            },() =>this.getanalyticlist());
          } else {
            message.error(result.message);
            this.setState({
              formloader: false,
            });
          }
        });
      }
  
      // on change select
      handleChangeSelect = (value) => {
        this.setState({ ctype: value });
      }
      
  
      // actuall functionality
  
      // SEARCH
      searchinput = (e) => {
        let text = e.target.value;
        this.setState({ loading:true });
        if(text) {
          let arr = [];
          for(let item of this.state.cdeallist) {
            if(
              item.deal_name.includes(text) ||
              item.deal_fund_requested.includes(text) ||
              item.Min_inv_amt.includes(text) ||
              item.Max_inv_amt.includes(text) ||
              item.Muliples_of.includes(text) ||
              item.backed_by.includes(text) ||
              item.deal_category.includes(text)
            ) {
              arr = [...arr, item];
            }
          }
          this.setState({
            deallist: arr,
            loading:false,
          });
        } else {
          this.setState({
            loading:false,
          });
        }
      }
  
      onChangeStartDate = (date, dateString) => {
        this.setState({
          dealstartdate: date,
        });
      }
  
      onChangeEndDate = (date, dateString) => {
        this.setState({
          dealenddate: date,
        });
      }
  
      onChangeStartDateEdit = (date, dateString) => {
        this.setState({
          editdealstartdate: date,
        });
      }
  
      onChangeEndDateEdit = (date, dateString) => {
        this.setState({
          editdealenddate: date,
        });
      }
  
      handleChangeSelected = (value) => {
        console.log('value', value);
        this.setState({ category: value });
      }
      handleChangeSelectededit = (value) => {
        console.log('value', value);
        this.setState({ editcategory: value });
      }
  
      // on change file
      onChangeFile = (e, type) => {
        if(type=='banner') {
          this.setState({
            banner: e.target.files[0],
          });
        } else {
          this.setState({
            logo: e.target.files[0],
          });
        } 
      }
  
      // add new deal
      addanalytics = () => {
        if (this.state.monthyear == ''){
          message.warning('Month year is required');
          return false;
        } else if(this.state.revenue == ''){
          message.warning('Revenue is required');
          return false;
        }else if(this.state.grossprofitmargin == ''){
          message.warning('Gross profit margin is required.');
          return false;
        }else if(this.state.customerchurnrate == ''){
          message.warning('Customer churn rate is required.');
          return false;
        }else if(this.state.monthlyactiveusers == ''){
          message.warning('Monthly active users fieled is required.');
          return false;
        }else if(this.state.ration == ''){
          message.warning('LTC/CAC ration value is required.');
          return false;
        }
        this.setState({ formloader: true });
  
        let params = {
            monthyear: this.state.monthyear,
            revenue: this.state.revenue,
            grossprofitmargin:  this.state.grossprofitmargin,
            customerchurnrate: this.state.customerchurnrate,
            monthlyactiveusers: this.state.monthlyactiveusers,
            ration: this.state.ration,
        }
  
        Bridge.founder.add(params).then((result) => {
          if (result.status == 1) {
            message.success(result.message);
            this.setState({ 
              formloader: false ,
              addModalStatus: false,
              monthyear:'',
              revenue:'',
              grossprofitmargin: '',
              customerchurnrate:'',
              monthlyactiveusers:'',
              ration:'',
            },() =>this.getanalyticlist());
          } else {
            message.error(result.message);
            this.setState({ 
              formloader: false ,
            });
          }
        });
      }

      onChangemonthyear = (date, dateString) => {
        this.setState({
            monthyear: date,
        });
      }
      onChangemonthyearedit = (date, dateString) => {
        this.setState({
            editmonthyear: date,
        });
      }
  render() {

    const dataSource = this.state.analyticslist && this.state.analyticslist.map((item, index) => {
        return {
          key: index,
          srno: (index+1),
          investmentamount: item.month_year ? moment(item.month_year).format('MMM-YYYY') : '---',
          investmentdate: item.Gross_Profit_Margin ? item.Gross_Profit_Margin+'%' : '---',
          approveddate:'',
          remarks:'',
          action: item,
        }
      });

      const columns = [
        {
          title: 'Sr No',
          dataIndex: 'srno',
          key: 'srno',
          width: 100,
          fixed: 'left',
        },
        {
          title: 'Investors Name',
          dataIndex: 'name',
          key: 'name',
          width: 100,
          fixed: 'left',
        },
        {
          title: 'Investment Amount',
          dataIndex: 'investmentamount',
          key: 'investmentamount',
          width: 180,
        },
        {
          title: 'Investment Date',
          dataIndex: 'investmentdate',
          key: 'investmentdate',
          width: 180,
        },
        {
            title: 'Approved Date',
            dataIndex: 'approveddate',
            key: 'approveddate',
            width: 180,
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            width: 180,
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          width: 100,
          fixed: 'right',
          render: (text, record) => {
            const menu = (
              <Menu mode="vertical" defaultSelectedKeys={[this.state.path]}
              style={{ width:200 }}
              >
                <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                  <a href="#" onClick={() => this.showEditModal(text)} style={{ fontSize:14 }}>
                     &nbsp;&nbsp;Edit
                  </a>
                </Menu.Item>
                <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined />}>
                  <a href="#" style={{ fontSize:14 }}  onClick={() => this.showDeleteModal(text)}>
                    &nbsp;&nbsp;Delete
                  </a>
                </Menu.Item>
              </Menu>
            )
            return (
              <div>
                <Dropdown overlay={menu} placement="bottom">
                  <a onClick={e => e.preventDefault()}>
                    <div className='menu-action'>
                      <i className='bx bx-dots-vertical-rounded'></i>
                    </div>
                  </a>
                </Dropdown>
              </div>
            )
          },
        },
      ];

    return (
      <div>
      <Header />
  
      <div className='row'>
      

      <div className='hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse' id="navbarSupportedContent">
            <section></section>
            <Sidebar/>
        </div>
      <div className='hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ' >
            <section></section>
            <Sidebar  /> 
        </div>

          <div className='  col col-md-8 pb-4'>
              <div style={{ marginTop:130}}>
                <Card 
                title="Approvals" 
                extra={
                <Button className='pb-3 pt-1 my-md-2' 
                    type='primary' 
                    onClick={this.showAddModal}
                >
                    <i className='bx bxs-plus-circle' 
                    style={{  
                    color:'#fff',
                    position:'relative',
                    top:3,
                    left:-3
                }}
                    ></i> Add Approval
                </Button>
                } style={{ margin: 16 }}>
                <Breadcrumb
                    style={{
                    margin: '0',
                    }}
                >
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Approvals</Breadcrumb.Item>
                </Breadcrumb>
                <br/><br/>
                <Input 
                    value={this.state.searchinput}
                    placeholder="Search" 
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth:300,marginBottom:20,height:40 }}
                />
                <Table  className='table-2'
                    dataSource={dataSource} 
                    columns={columns} 
                    loading={this.state.loading}
                    bordered
                    scroll={{ x: 1600 }}
                />
                </Card>
            </div>

                {/* How do i invest? */}
                <section id='hdii'>
                    
                </section>
          </div>

          <div className='col-md-2 col-0 '></div>
          
      </div>


      {/* Start Add modal  */}
      <Modal 
        title="Add New Analytics" 
        visible={this.state.addModalStatus} 
        onOk={this.addanalytics} 
        okText="Submit"
        onCancel={() => this.setState({ addModalStatus:false })}
        width={550}
      >
        <Spin spinning={this.state.formloader}>
          <div className='form-group'>
            <label className='mb-2'>Month Year <span className='text-danger'>*</span></label>
            <DatePicker 
                onChange={this.onChangemonthyear} 
                picker="month" 
                value={this.state.monthyear}
                style={{ width:'100%' }}
            />
          </div>
          <div className='form-group mt-3'>
            <label className='mb-2'>Revenue <span className='text-danger'>*</span></label>
            <Input 
                type='number'
              onChange={(e) => this.setState({ revenue:e.target.value })}
              value={this.state.revenue}
              style={{ width:'100%' }}
            />
          </div>
          <div className='form-group mt-3'>
            <label className='mb-2'>Gross Profit Margin <span className='text-danger'>*</span></label>
            <Input 
                type='number'
                onChange={(e) => this.setState({ grossprofitmargin:e.target.value })}
                value={this.state.grossprofitmargin}
                style={{ width:'100%' }}
            />
          </div>
          <div className='mt-4 editor-field'>
            <label className='mb-2'>Customer Churn Rate <span className='text-danger'>*</span></label>
            <Input 
              type='number'
              onChange={(e) => this.setState({ customerchurnrate:e.target.value })}
              value={this.state.customerchurnrate}
              style={{ width:'100%' }}
            />
          </div>
          <div className='mt-4'>
            <label className='mb-2'>Monthly Active Users <span className='text-danger'>*</span></label>
            <Input 
              type='number'
              onChange={(e) => this.setState({ monthlyactiveusers:e.target.value })}
              value={this.state.monthlyactiveusers}
              style={{ width:'100%' }}
            />
          </div>
          <div className='mt-4'>
            <label className='mb-2'>LTC/CAC Ration <span className='text-danger'>*</span></label>
            <Input 
              type='number'
              onChange={(e) => this.setState({ ration:e.target.value })}
              value={this.state.ration}
              style={{ width:'100%' }}
            />
          </div>
        </Spin>
      </Modal>
      {/* End Add modal  */}

      {/* Start Edit modal  */}
      <Modal 
        title="Update Analytics" 
        visible={this.state.editModalStatus} 
        onOk={this.updateanalytics} 
        okText="Update"
        onCancel={() => this.setState({ editModalStatus:false })}
        width={550}
      >
        <Spin spinning={this.state.formloader}>
        <div className='form-group'>
            <label className='mb-2'>Month Year <span className='text-danger'>*</span></label>
            <DatePicker 
                onChange={this.onChangemonthyearedit} 
                picker="month" 
                value={this.state.editmonthyear}
                style={{ width:'100%' }}
            />
          </div>
          <div className='form-group mt-3'>
            <label className='mb-2'>Revenue <span className='text-danger'>*</span></label>
            <Input 
                type='number'
              onChange={(e) => this.setState({ editrevenue:e.target.value })}
              value={this.state.editrevenue}
              style={{ width:'100%' }}
            />
          </div>
          <div className='form-group mt-3'>
            <label className='mb-2'>Gross Profile Margin <span className='text-danger'>*</span></label>
            <Input 
                type='number'
                onChange={(e) => this.setState({ editgrossprofitmargin:e.target.value })}
                value={this.state.editgrossprofitmargin}
                style={{ width:'100%' }}
            />
          </div>
          <div className='mt-4 editor-field'>
            <label className='mb-2'>Customer Churn Rate <span className='text-danger'>*</span></label>
            <Input 
              type='number'
              onChange={(e) => this.setState({ editcustomerchurnrate:e.target.value })}
              value={this.state.editcustomerchurnrate}
              style={{ width:'100%' }}
            />
          </div>
          <div className='mt-4'>
            <label className='mb-2'>Monthly Activ Users <span className='text-danger'>*</span></label>
            <Input 
              type='number'
              onChange={(e) => this.setState({ editmonthlyactiveusers:e.target.value })}
              value={this.state.editmonthlyactiveusers}
              style={{ width:'100%' }}
            />
          </div>
          <div className='mt-4'>
            <label className='mb-2'>LTC/CAC Ration <span className='text-danger'>*</span></label>
            <Input 
              type='number'
              onChange={(e) => this.setState({ editration:e.target.value })}
              value={this.state.editration}
              style={{ width:'100%' }}
            />
          </div>
        </Spin>
      </Modal>
      {/* End Edit modal  */}

      
      {/* Start delete modal  */}
      <Modal 
        title="Delete Analytics Record" 
        visible={this.state.deleteModalStatus} 
        onOk={this.deletedeal} 
        okText="Delete"
        onCancel={() => this.setState({ deleteModalStatus:false })}
      >
        <Spin spinning={this.state.formloader}>
          <p style={{ fontSize:16 }}>Are you sure you want to delete te analytics record?</p>
        </Spin>
      </Modal>
      {/* End delete modal  */}
  
      <Footer />
  
  </div>
    )
  }
}
export default FounderApprovals;
