import React, { Component } from 'react';
import { 
  Layout, Breadcrumb, 
  Card, Button, message,
  Spin, Select,
Input } from 'antd';
import Sidebar2 from './common/Sidebar2';
import Navbar from './common/Navbar';
import BottomBar from './common/BottomBar';
import Bridge from '../constants/Bridge';
import { removeSubsets } from 'domutils';
const { Content } = Layout;
const { Option } = Select;
class Settings extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formloader:'',
        label:'',
        percentage:'',
        id:'',
        ramount:'',
        setting_id:0,
        amountloader:false,
        taxation_percentage:'',
        taxationLoader:false,
        regular_member_deal_percentage:0,
        premium_member_deal_percentage:0,
        fee:0,
        register_discount:0,
        discount_for_old_member:0,

        env:"",
        test_base_url:"",
        production_base_url:"",
        prod_app_id:"",
        prod_app_secret:"",
        prod_payment_url:"",
        test_app_id:"",
        test_app_secret:"",
        test_payment_url:"",
        cashfree_id:'',
        cashfree_loader:false,
        test_client_id:"",
        test_client_secret:"",
        prod_client_id:"",
        prod_client_secret:"",
        test_pan_url:"",
        prod_pan_url:"",
        test_adhar_url:"",
        prod_adhar_url:"",
        test_bank_url:"",
        prod_bank_url:"",
        test_bank_client_id:"",
        test_bank_client_secret:"",
        digio_id:'',
        digio_test_url:'',
        digio_prod_url:'',
        digio_test_client_id:'',
        digio_test_client_scret:'',
        digio_prod_client_id:'',
        digio_prod_client_secret:'',
        digio_environment:'',
        digio_modal_loader:false
      }
    }
    componentDidMount() {
      this.getdealsettings();
      this.getsettings();
      this.get_cashfree_details();
      this.getDigioSettings();
    }
    get_cashfree_details = () => {
      this.setState({ formloader: true });
      Bridge.admin.settings.get_cashfree_details().then((result) => {
        if (result.status == 1) {
          
          this.setState({
            settings: result.data,
            env:result.data[0].env,
            production_base_url: result.data[0].production_base_url,
            test_base_url:result.data[0].test_base_url,
            prod_app_id:result.data[0].prod_app_id,
            prod_app_secret:result.data[0].prod_app_secret,
            prod_payment_url:result.data[0].prod_payment_url,
            test_app_id:result.data[0].test_app_id,
            test_app_secret:result.data[0].test_app_secret,
            test_payment_url:result.data[0].test_payment_url,
            cashfree_id:result.data[0].id,
            test_client_id:result.data[0].test_client_id,
            test_client_secret:result.data[0].test_client_secret,
            prod_client_id:result.data[0].prod_client_id,
            prod_client_secret:result.data[0].prod_client_secret,
            test_pan_url:result.data[0].test_pan_url,
            prod_pan_url:result.data[0].prod_pan_url,
            test_adhar_url:result.data[0].test_adhar_url,
            prod_adhar_url:result.data[0].prod_adhar_url,
            test_bank_url:result.data[0].test_bank_url,
            prod_bank_url:result.data[0].prod_bank_url,
            test_bank_client_id:result.data[0].test_bank_client_id,
            test_bank_client_secret:result.data[0].test_bank_client_secret,
            formloader: false,
          });
        } else {
          message.error(result.message);
          this.setState({formloader:false});
        }
      });
    }
    // get post list
    getdealsettings = () => {
      this.setState({ formloader: true });
      Bridge.admin.settings.getdealsettings().then((result) => {
        if (result.status == 1) {
          this.setState({
            settings: result.data,
            label: result.data[0].label,
            regular_member_deal_percentage: result.data[0].regular_member_deal_percentage,
            premium_member_deal_percentage: result.data[0].premium_member_deal_percentage,
            id: result.data[0].id,
            formloader: false,
          });
        } else {
          message.error(result.message);
          this.setState({
            formloader: false,
          });
        }
      });
    }
    getsettings = () => {
      this.setState({ amountloader: true });
      Bridge.admin.settings.getsettings().then((result) => {
        // console.log('result',result);
        if (result.status == 1) {
          this.setState({
            ramount: result.data[0].amount,
            setting_id: result.data[0].setting_id ,
            taxation_percentage:result.data[0].taxation_percentage,
            amountloader: false,
            register_discount:result.data[0].discount,
            discount_for_old_member: result.data[0].discount_for_old_member ,
          });
        } else {
          message.error(result.message);
        }
      });
    }

    //get digio settings
    getDigioSettings=()=>{
      this.setState({digio_modal_loader:true})
      let params={
        id:1,
      }
      Bridge.admin.settings.get_digio_setting(params).then((result)=>{
        if(result.status=='1'){
          // console.log("digo setings ",result.data[0].id)
          this.setState({
            digio_id:result.data[0].id,
            digio_environment:result.data[0].environment,
            digio_test_url:result.data[0].test_url,
            digio_prod_url:result.data[0].prod_url,
            digio_test_client_id:result.data[0].test_client_id,
            digio_test_client_scret:result.data[0].test_client_secret,
            digio_prod_client_id:result.data[0].prod_client_id,
            digio_prod_client_secret:result.data[0].prod_client_secret,
            digio_modal_loader:false,
          })
        }else{
          message.error("Unable to fetch Digio Settings");
          this.setState({
            digio_modal_loader:false,
            digio_id:'',
            digio_environment:'',
            digio_test_url:'',
            digio_prod_url:'',
            digio_test_client_id:'',
            digio_test_client_scret:'',
            digio_prod_client_id:'',
            digio_prod_client_secret:''
          })
        }
      })
    }

    //update digio settings
    updateDigioSetting=()=>{
      if(this.state.digio_id=='1'){
        if(this.state.digio_test_url==''){
          message.warn("Digio test Url Required!",5);
          return false
        }else if(this.state.digio_prod_url==''){
          message.warn("Digio production Url Required!",5)
          return false;
        }else if(this.state.digio_environment==''){
          message.warn("Please Select Digio Environment",5);
          return false;
        }else if(this.state.digio_test_client_id==''){
          message.warning("Digio Test Client Id is Requreid!")
          return false;
        }else if(this.state.digio_test_client_scret==''){
          message.warn("Digio Test Client Secret is Required!")
          return false;
        }else if(this.state.digio_prod_client_id==''){
          message.warn("Digio production Client id is Requried!")
          return false;
        }else if(this.state.digio_prod_client_secret==''){
          message.warn("Digio Prod Client Secret is Required")
        }
        this.setState({digio_modal_loader:true});
        let params={
          id:this.state.digio_id,
          test_url:this.state.digio_test_url,
          prod_url:this.state.digio_prod_url,
          environment:this.state.digio_environment,
          test_client_id:this.state.digio_test_client_id,
          test_client_secret:this.state.digio_test_client_scret,
          prod_client_id:this.state.digio_prod_client_id,
          prod_client_secret:this.state.digio_prod_client_secret
        }
        Bridge.admin.settings.update_digio_setting(params).then((result)=>{
          if(result.status=='1'){
            this.setState({digio_modal_loader:false},()=>this.getDigioSettings())
            message.success("Digio Settting Saved Successfully")
            
          }else{
            this.setState({digio_modal_loader:false})
            message.warn("Failed To Save Digio Settings");
          }
        })


      }else{
        message.warning("Make Sure Data is properly Fetched /Try to Refresh the Page")
      }
    }

    // update post
    updatesettings = () => {
      if (this.state.label == ''){
        message.warning('Invalid label');
        return false;
      } else if(this.state.regular_member_deal_percentage == '' && this.state.regular_member_deal_percentage>100){
        message.warning('Invalid Regular member deal percentage.');
        return false;
      } else if(this.state.premium_member_deal_percentage == '' && this.state.premium_member_deal_percentage>100){
        message.warning('Invalid Premium member deal percentage.');
        return false;
      }else if(this.state.edit_email == ''){
        message.warning('Please try to refresh the page.');
        return false;
      }
      this.setState({formloader:true});
      let params = {
        label:this.state.label,
        regular_member_deal_percentage:this.state.regular_member_deal_percentage,
        premium_member_deal_percentage:this.state.premium_member_deal_percentage,
        id: this.state.id,
      }
      Bridge.admin.settings.updatedealsettings(params).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState({ 
            formloader: false ,
          },() =>this.getdealsettings());
        } else {
          message.error(result.message);
          this.setState({ 
            formloader: false ,
          });
        }
      });
    }
    updateramount=()=>{
      if(!this.state.ramount){
        message.warning('Registration amount is required.');
        return;
      }
      if(!this.state.register_discount){
        message.warning('Discount for new member is required');
        return;
      }
      if(!this.state.discount_for_old_member){
        message.warning('Discount for old member is required');
        return;
      }
      this.setState({amountloader:true});
      let params = {
        amount:this.state.ramount,
        id: this.state.setting_id,
        discount:this.state.register_discount,
        discount_for_old_member:this.state.discount_for_old_member
      }
      Bridge.admin.settings.updatesetting(params).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState({ 
            amountloader: false ,
          },() =>this.getdealsettings());
        } else {
          message.error(result.message);
          this.setState({ 
            amountloader:false ,
          });
        }
      });
    }

    updateTaxation=()=>{
      if(!this.state.taxation_percentage){
        message.warning('Taxation percentage is required.');
        return;
      }
      this.setState({taxationLoader:true})
      let params = {
        taxation_percentage:this.state.taxation_percentage,
        id: this.state.setting_id,
      }
     Bridge.admin.settings.updatetaxationsetting(params).then((result)=>{
      if(result.status=='1'){
        this.setState({taxationLoader:false},()=>this.getsettings);
        message.success("taxation percentage successfully updated ");
      }
      else{
        this.setState({taxationLoader:false});
        message.warning("Failed to update taxation percentage");
      }
     })
    }
    // UPDATE CASHFREE DETAILS
    update_cashfree_details=()=>{
      if(!this.state.test_base_url){
        message.warning('Invalid Test Base url value');
        return;
      } else if(!this.state.prod_app_id){
        message.warning('Invalid Production app id');
        return;
      } else if(!this.state.prod_app_secret){
        message.warning('Invalid Prodcution app secret');
        return;
      } else if(!this.state.prod_payment_url){
        message.warning('Invalid Production payment url.');
        return;
      } else if(!this.state.test_app_id){
        message.warning('Invalid Test app id.');
        return;
      } else if(!this.state.test_app_secret){
        message.warning('Invalid Test app secret.');
        return;
      } else if(!this.state.test_payment_url){
        message.warning('Invalid Test payment url.');
        return;
      } else if(!this.state.env){
        message.warning('Invalid Environment value.');
        return;
      }
      this.setState({cashfree_loader:true})
      let params = {
        test_base_url:this.state.test_base_url,
        production_base_url: this.state.production_base_url,
        prod_app_id:this.state.prod_app_id,
        prod_app_secret:this.state.prod_app_secret,
        prod_payment_url:this.state.prod_payment_url,
        test_app_id:this.state.test_app_id,
        test_app_secret:this.state.test_app_secret,
        test_payment_url:this.state.test_payment_url,
        env:this.state.env,
        id: this.state.cashfree_id,
        test_client_id:this.state.test_client_id,
        test_client_secret:this.state.test_client_secret,
        prod_client_id:this.state.prod_client_id,
        prod_client_secret:this.state.prod_client_secret,
        test_pan_url:this.state.test_pan_url,
        prod_pan_url:this.state.prod_pan_url,
        test_adhar_url:this.state.test_adhar_url,
        prod_adhar_url:this.state.prod_adhar_url,
        test_bank_url:this.state.test_bank_url,
        prod_bank_url:this.state.prod_bank_url,
        test_bank_client_id:this.state.test_bank_client_id,
        test_bank_client_secret:this.state.test_bank_client_secret
      }
     Bridge.admin.settings.update_cashfree_details(params).then((result)=>{
      if(result.status=='1'){
        this.setState({cashfree_loader:false},()=>this.get_cashfree_details());
        message.success("Cashfree details are updated successfully.");
      }
      else{
        this.setState({cashfree_loader:false});
        message.warning("Failed to update cashfree enviroment details.");
      }
     })
    }
    
    render() {
    
    return (
      <>
       <Layout
        style={{ minHeight: '100vh',marginTop:0 }}
         className='main-dashboard-container'
      ><Navbar />
        <Layout className="site-layout">
        <Sidebar2 />
          <Content className='home-section'
            style={{  }}
          >
              <div className='row'>
                <div className='col-lg-4'>
                  <Card title="Settings / Deals" 
                    style={{ margin: 16 }}>
                    <Spin spinning={this.state.formloader}>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Processing Fee Label <span className='text-danger'>*</span></label>
                            <Input 
                              value={this.state.label}
                              onChange={(e) => this.setState({ label: e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Regular Member Deal Percentage <span className='text-danger'>*</span></label>
                            <Input 
                              value={this.state.regular_member_deal_percentage}
                              type='number'
                              onChange={(e) => this.setState({ regular_member_deal_percentage: e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Premium Member Deal Percentage <span className='text-danger'>*</span></label>
                            <Input 
                              value={this.state.premium_member_deal_percentage}
                              type='number'
                              onChange={(e) => this.setState({ premium_member_deal_percentage: e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <Button type="primary" onClick={this.updatesettings}>Update</Button>
                        </div>
                      </div>
                    </Spin>
                  </Card>
                </div>
                <div className='col-lg-4'>
                  <Card title="Settings / Membership amount" 
                    style={{ marginTop: 16}}>
                    <Spin spinning={this.state.formloader}>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Registration amount <span className='text-danger'>*</span></label>
                            <Input 
                              type="number"
                              onWheel={() => document.activeElement.blur()}
                              value={this.state.ramount}
                              onChange={(e) => this.setState({ ramount:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Discount For New Member <span className='text-danger'>*</span></label>
                            <Input 
                              type="number"
                              onWheel={() => document.activeElement.blur()}
                              value={this.state.register_discount}
                              onChange={(e) => this.setState({ register_discount:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Discount For Old Member <span className='text-danger'>*</span></label>
                            <Input 
                              type="number"
                              onWheel={() => document.activeElement.blur()}
                              value={this.state.discount_for_old_member}
                              onChange={(e) => this.setState({ discount_for_old_member:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <Button type="primary" onClick={this.updateramount}>Update</Button>
                        </div>
                      </div>
                    </Spin>
                  </Card>
                </div>
                <div className='col-lg-4'>
                  <Card title="Settings / Taxation" 
                    style={{ margin: 16 }}>
                    <Spin spinning={this.state.formloader}>
                    <Spin spinning={this.state.taxationLoader}>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Percentage <span className='text-danger'>*</span></label>
                            <Input 
                              type="number"
                              onWheel={() => document.activeElement.blur()}
                              value={this.state.taxation_percentage}
                              onChange={(e) => this.setState({taxation_percentage: e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <Button type="primary" onClick={this.updateTaxation}>Update</Button>
                        </div>
                      </div>
                      </Spin>
                    </Spin>
                  </Card>
                </div>   
                </div>   
               <div className='row'>
                <div className='col-lg-6' >
                  <Card title="Cashfree Environment Details" 
                    style={{ margin: 16 }}>
                    <Spin spinning={this.state.cashfree_loader}>
                      <h3>Payment Gateway Details</h3>
                      <hr />
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Base Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.production_base_url}
                              onChange={(e) => this.setState({ production_base_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test Base Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_base_url}
                              onChange={(e) => this.setState({ test_base_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test App ID <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_app_id}
                              onChange={(e) => this.setState({ test_app_id:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test Secret ID <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_app_secret}
                              onChange={(e) => this.setState({ test_app_secret:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test Payment Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_payment_url}
                              onChange={(e) => this.setState({ test_payment_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production App ID <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.prod_app_id}
                              onChange={(e) => this.setState({ prod_app_id:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Secret ID <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.prod_app_secret}
                              onChange={(e) => this.setState({ prod_app_secret:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Payment Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.prod_payment_url}
                              onChange={(e) => this.setState({ prod_payment_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Environment <span className='text-danger'>*</span></label>
                            <Select 
                              value={this.state.env}
                              style={{width:350}} 
                              onChange={(value) => this.setState({ env:value })}
                              placeholder='Please select kyc status'
                            >
                              <Option value="test">Test</Option>
                              <Option value="prod">Production</Option>
                            </Select>
                          </div>  
                          <hr />
                          <h3>Verification Details</h3>
                          <hr />
                          <div className='form-group mt-3'>
                            <label className='mb-2 w-100'>Test Client Id <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_client_id}
                              onChange={(e) => this.setState({ test_client_id:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>  
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test Client Secret <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_client_secret}
                              onChange={(e) => this.setState({ test_client_secret:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>  
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Client ID <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.prod_client_id}
                              onChange={(e) => this.setState({ prod_client_id:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div> 
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Client Secret <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.prod_client_secret}
                              onChange={(e) => this.setState({ prod_client_secret:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>  
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test PAN Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_pan_url}
                              onChange={(e) => this.setState({ test_pan_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>  
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production PAN Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.prod_pan_url}
                              onChange={(e) => this.setState({ prod_pan_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div> 
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test Adhar Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_adhar_url}
                              onChange={(e) => this.setState({ test_adhar_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>  
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Adhar Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.prod_adhar_url}
                              onChange={(e) => this.setState({ prod_adhar_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div> 
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test Bank Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_bank_url}
                              onChange={(e) => this.setState({ test_bank_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div> 
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Bank Url <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.prod_bank_url}
                              onChange={(e) => this.setState({ prod_bank_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test Bank Client Id <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_bank_client_id}
                              onChange={(e) => this.setState({ test_bank_client_id:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div> 
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Test Bank Client Secret <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.test_bank_client_secret}
                              onChange={(e) => this.setState({ test_bank_client_secret:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div> 
                          <br/>                      
                          <Button
                            type="primary" 
                            onClick={this.update_cashfree_details}
                          >Update</Button>
                        </div>
                      </div>
                    </Spin>
                  </Card>
                </div>  
                 <div className='col-lg-6' >
                  <Card title="Digio Environment Details" 
                    style={{ margin: 16 }}>
                    <Spin spinning={this.state.digio_modal_loader}>
                      <div className='row'>
                        <div className='col-md-12'>
                        <div className='form-group'>
                            <label className='mb-2 w-100'>Digio Environment <span className='text-danger'>*</span></label>
                            <Select 
                              value={this.state.digio_environment}
                              style={{width:350}} 
                              onChange={(value) => this.setState({ digio_environment:value })}
                            >
                              <Option value="test">Test</Option>
                              <Option value="prod">Production</Option>
                            </Select>
                          </div>  
                          <div className='form-group'>
                            <label className='mb-2 w-100'> Test URL <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              
                              value={this.state.digio_test_url}
                              onChange={(e) => this.setState({ digio_test_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'> Production URL <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.digio_prod_url}
                              onChange={(e) => this.setState({ digio_prod_url:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Digio Test client Id <span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.digio_test_client_id}
                              onChange={(e) => this.setState({ digio_test_client_id:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Digio Test client Secret Key<span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.digio_test_client_scret}
                              onChange={(e) => this.setState({ digio_test_client_scret:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Client Id<span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.digio_prod_client_id}
                              onChange={(e) => this.setState({ digio_prod_client_id:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <div className='form-group'>
                            <label className='mb-2 w-100'>Production Client Secret Key<span className='text-danger'>*</span></label>
                            <Input 
                              type="text"
                              value={this.state.digio_prod_client_secret}
                              onChange={(e) => this.setState({ digio_prod_client_secret:e.target.value })}
                              style={{ maxWidth:'100%',marginBottom:20,height:40 }}
                            />
                          </div>
                          <Button type="primary" onClick={this.updateDigioSetting}>Save</Button>
                        </div>
                      </div>
                    </Spin>
                  </Card>
                </div>        
              </div>
            </Content>
          <BottomBar />
        </Layout>

      </Layout>

      </>
    );
  }
}

export default Settings;