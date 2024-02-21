import React, { Component } from 'react';
import { 
  Layout, Breadcrumb, Table, 
  Card, Button, Modal, message,Select ,
  Spin,DatePicker,Dropdown,Menu,
Input } from 'antd';
import Sidebar from './common/Sidebar';
import Navbar from './common/Navbar';
import BottomBar from './common/BottomBar';
import Bridge from '../constants/Bridge';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';


const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;


class ApproveFounders extends Component {
    

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        investorlist: [],
        cinvestorlist: [],
        searchinput: [],
        formloader:false,
        status:'',
        investor_id:'',
      }
    }

    componentDidMount() {
      this.getinvestorlist();
    }

    // get post list
    getinvestorlist = () => {
      this.setState({ loading: true });
      Bridge.admin.approve.getapprovelistoffounders().then((result) => {
        if (result.status == 1) {
          this.setState({
            investorlist: result.data,
            cinvestorlist: result.data,
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

    // show edit modal
    showEditModal = (item) => {
      this.setState({
        editModalStatus:true,
        investor_id: item.investor_id,
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


    // SEARCH
    searchinput = (e) => {
      let text = e.target.value;
      this.setState({ loading:true,searchinput:text });
      if(text) {
        let arr = [];
        for(let item of this.state.cinvestorlist) {
          if(
            item.startup_name && item.startup_name.includes(text) ||
            item.first_name && item.first_name.includes(text) ||
            item.last_name && item.last_name.includes(text) ||
            item.email && item.email.includes(text) ||
            item.mobile && item.mobile.includes(text)
          ) {
            arr = [...arr, item];
          }
        }
        this.setState({
          investorlist: arr,
          loading:false,
        });
      } else {
        this.setState({
          loading:false,
        });
      }
    }

    // approve investor
    approve = () => {
      let params = {
        approvestatus: this.state.status,
        investor_id: this.state.investor_id,
        type:'founder',
      }   
      this.setState({ formloader:true});
      Bridge.admin.approve.approveuser(params).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState({ 
            formloader: false ,
            status: '',
            investor_id:'',
            editModalStatus: false,
          },() =>this.getinvestorlist());
        } else {
          message.error(result.message);
          this.setState({ 
            formloader: false,
          });
        }
      });
    }
    
    render() {

      const dataSource = this.state.investorlist && this.state.investorlist.map((item, index) => {
        return {
          key: index,
          investorid: item.investor_id,
          name: item.first_name +' '+item.last_name,
          company: item.startup_name ? item.startup_name : '-',
          contactno: item.mobile ? item.mobile :'---',
          email: item.email ? item.email : '---',
          subdate: item.user_registered_dt ? moment(item.user_registered_dt).format('DD MMM, YYYY') : '---',
          action: item,
        }
      });

      const columns = [
        {
          title: 'Investor Id',
          dataIndex: 'investorid',
          key: 'investorid',
          width: 160,
          fixed: 'left',
        },
        {
          title: 'Investor Name',
          dataIndex: 'name',
          key: 'name',
          width: 180,
          fixed: 'left',
        },
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
          width: 180,
        },
        {
          title: 'Contact No',
          dataIndex: 'contactno',
          key: 'contactno',
          width: 180,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Submitted Date',
          dataIndex: 'subdate',
          key: 'subdate',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          fixed: 'right',
          width: 100,
          render: (text, record) => {
            const menu = (
              <Menu mode="vertical" defaultSelectedKeys={[this.state.path]}
              style={{ width:150 }}
              >
                <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                  <a href="#" onClick={() => this.showEditModal(text)} style={{ fontSize:14 }}>
                     &nbsp;&nbsp;Approval
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
      <>
      <Layout
        style={{ minHeight:'100vh',marginTop:0 }}
         className='main-dashboard-container'
      >
        <Sidebar />
        <Layout className="site-layout">
            <Navbar />
            <Content style={{ margin: 16 }}>
              <Card title="Pending For Approval" 
                style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: '0',
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Approval</Breadcrumb.Item>
                  <Breadcrumb.Item>Pending For Approval Founders</Breadcrumb.Item>
                </Breadcrumb>
                <br/><br/>
                <Input 
                  value={this.state.searchinput}
                  placeholder="Search" 
                  onChange={(e) => this.searchinput(e)}
                  style={{ maxWidth:300,marginBottom:20,height:40 }}
                />
                <Table 
                
                  dataSource={dataSource} 
                  columns={columns} 
                  loading={this.state.loading}
                  bordered
                  scroll={{ x: 'max-content' }}
                />
              </Card>
            </Content>
          
          <BottomBar />
        </Layout>

      </Layout>
      
      {/* Start Add modal  */}
      <Modal 
        title="Add New Founder" 
        visible={this.state.addModalStatus} 
        onOk={this.addfounder} 
        okText="Submit"
        onCancel={() => this.setState({ addModalStatus:false })}
        width={550}
      >
        <Spin spinning={this.state.formloader}>
          <div className='form-group'>
            <label className='mb-2'>First Name <span className='text-danger'>*</span></label>
            <Input 
              value={this.state.first_name}
              onChange={(e) => this.setState({ first_name: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label className='mb-2'>Last Name <span className='text-danger'>*</span></label>
            <Input 
              value={this.state.last_name}
              onChange={(e) => this.setState({ last_name: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label className='mb-2'>Email <span className='text-danger'>*</span></label>
            <Input
              type='email' 
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label className='mb-2'>Contact No <span className='text-danger'>*</span></label>
            <Input 
              value={this.state.mobile}
              onChange={(e) => this.setState({ mobile: e.target.value })}
            />
          </div>
          <div className='form-group mt-3'>
            <label className='mb-2'>Nationality <span className='text-danger'>*</span></label>
            <select 
              name="nationality" 
              className="form-input-field"
              value={this.state.nationality} 
              onChange={this.handleChangeSelect} 
            >
              <option value=''>Select Nationality</option>
              <option value='Indian Citizen'>Indian Citizen</option>
              <option value='International'>International</option>
              <option value='NRI With NIRO'>NRI With NIRO</option>
            </select>
          </div>
          <div className='form-group mt-3'>
            <label className='mb-2'>Date of birth <span className='text-danger'>*</span></label>
            <DatePicker 
              onChange={this.onChangeDOB} 
              value={this.state.dob}
              style={{ width:'100%' }}
            />
          </div>
          <div className='form-group mt-3'>
            <label className='mb-2'>Legal Name <span className='text-danger'>*</span></label>
            <Input 
              type='text'
              value={this.state.legal_name}
              onChange={(e) => this.setState({ legal_name: e.target.value })}
            />
          </div>
          <div className='mt-4 editor-field'>
            <label className='mb-2'>Father Name <span className='text-danger'>*</span></label>
            <Input 
              type='text'
              value={this.state.father_name}
              onChange={(e) => this.setState({ father_name: e.target.value })}
            />
          </div>
          <div className='mt-4'>
            <label className='mb-2'>Address <span className='text-danger'>*</span></label>
            <TextArea 
              rows={4} 
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
            />
          </div>
          <div className='mt-4'>
            <label className='mb-2'>Bank Account No. <span className='text-danger'>*</span></label>
            <Input 
              type='number'
              value={this.state.bank_ac_no}
              onChange={(e) => this.setState({ bank_ac_no: e.target.value })}
            />
          </div>
          <div className='mt-4'>
            <label className='mb-2'>IFSC Code <span className='text-danger'>*</span></label>
            <Input 
              type='number'
              value={this.state.ifsc_code}
              onChange={(e) => this.setState({ ifsc_code: e.target.value })}
            />
          </div>
          <div className='mt-4'>
            <label className='mb-2'>Profile Image <span className='text-danger'>*</span></label>
            <Input 
              type='file'
              onChange={(e) => this.onChangeFile(e)}
              accept=".jpg, .jpeg, .png, .webp"
            />
          </div>
        </Spin>
      </Modal>
      {/* End Add modal  */}

      {/* Start status modal  */}
      <Modal 
        title="Approve Investor" 
        visible={this.state.editModalStatus} 
        onOk={this.approve} 
        okText="Ok"
        onCancel={() => this.setState({ editModalStatus:false })}
        width={450}
      >
        <Spin spinning={this.state.formloader}>
          <div className='form-group mt-3'>
            <label className='mb-2'>Status <span className='text-danger'>*</span></label>
            <Select 
              name="status" 
              className="form-input-field"
              value={this.state.status} 
              onChange={(value) => this.setState({ status:value })}
            >
              <Option value=''>Select</Option>
              <Option value='Approve'>Approve</Option>
              <Option value='Reject'>Reject</Option>
            </Select>
          </div>
        </Spin>
      </Modal>
      {/* End status modal  */}

      </>
    );
  }
}

export default ApproveFounders;