import React, { Component } from 'react';
import { Menu, Dropdown, Modal,message, Spin, Button } from 'antd';
import { UserOutlined,ReloadOutlined,BankOutlined,PieChartOutlined } from '@ant-design/icons';
import Bridge from '../constants/Bridge';
import Apis from '../constants/Apis';
import axios from 'axios';
import moment from 'moment';

class HeaderForAssement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      loggedinstatus:false,
      modalVisible: false,
      bankdetailsmodal:false,
      profiledetailsmodal:false,
      accountno:'',
      ifsccode:'',
      investor_id:'',
      formloader:false,
      loggedinuser:'',
      profile:'',
      firstname:'',
      middlename:'',
      lastname:'',
      contactno:'',
      profileimagetoshow:'',
      communitylink:'/Login',
      membership_type:'',
      membership_start_date:'',
      membership_end_date:'',
      show_member_ship_alert:0,
      membership_expired_status:false,
      expiry_date:'',
      membership_amount:0,
      //for founder profile 
      founder_profileimagetoshow:'',
      founder_profile:'',
      founder_contactno:'',
      founder_lastname:'',
      founder_middlename:'',
      founder_firstname:'',
      profile_founder_detailsmodal:false,
    }
  }

  componentDidMount() {
    if(localStorage.getItem('investor_id')) {
      this.setState({
        name: localStorage.getItem('investor_name'),
        loggedinstatus:true,
        loggedinuser:'investor',
        investor_id: localStorage.getItem('investor_id'),
    }, () => this.getbankdetails());
    } else if(localStorage.getItem('founder_id')) {
      this.setState({
        loggedinstatus:true,
        loggedinuser:'founder',
        name: localStorage.getItem('founder_name'),
      },()=>this.get_founder_details())
    } else {
      this.setState({
        name: '',
        loggedinstatus:false
      });
    }
    this.getsettings();
  }
  getsettings = () => {
        this.setState({amountloader:true});
        Bridge.admin.settings.getsettings().then((result) => {
          if (result.status==1) {
            this.setState({
                membership_amount:result.data[0].amount,
            });
          }else{}
        });
    }

  getbankdetails = () => {
    let params= {
      id: this.state.investor_id
    }
    Bridge.investor.getbankdetails(params).then((result) => {
      if (result.status == 1) {
        let url = Apis.IMAGEURL +'profile/'+result.data[0].investor_id+'/'+
        result.data[0].user_profile_picture;
        // console.log('result',result);
        this.setState({
          accountno: result.data[0].bank_ac_no,
          ifsccode: result.data[0].ifsc_code,
          firstname: result.data[0].first_name,
          middlename: result.data[0].middle_name,
          lastname: result.data[0].last_name,
          contactno: result.data[0].mobile,
          profileimagetoshow: result.data[0].user_profile_picture ? url : '',
          membership_type:result.data[0].membership_type,
        });
        let exploded_start_date='';
        let exploded_end_date='';
        let start_date=result.data[0].membership_start_date;
        if(start_date!=''){
          let explodeddate = start_date.split(' ')[0];
          exploded_start_date=explodeddate;
          start_date=moment(explodeddate).format('DD MMM, YYYY');
          this.setState({membership_start_date:start_date});
        }
        let end_date=result.data[0].membership_end_date;
        if(end_date!=''){
          let explodeddate = end_date.split(' ')[0];
          exploded_end_date=explodeddate;
          end_date=moment(explodeddate).format('DD MMM, YYYY');
          this.setState({membership_end_date:end_date,expiry_date:exploded_end_date});
        }
        if(exploded_start_date&&exploded_end_date){
          let current_date=moment();
          let ending_date=moment(exploded_end_date);
          let starting_date=moment(exploded_start_date).add(11, 'M');
          let d = new Date(exploded_start_date);
          var newDate = new Date(d.setMonth(d.getMonth()+11));
          let s_d=moment(newDate);
          if(current_date>=s_d && current_date<=ending_date){
            // console.log('expired');
            this.setState({membership_expired_status:true});
          }
          // console.log('current_date',current_date);
          // console.log('ending_date',ending_date);
          // console.log('starting_date',s_d);
        }
      } else {
        this.setState({formloader:false});
      }
    });
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }

  showbankingdetails = () => {
    this.setState({
      bankdetailsmodal:true
    });
  }

  handleCancelbankdetails = () => {
    this.setState({
      bankdetailsmodal: false,
    });
  };

  updatebankdetails = () => {
    if(this.state.accountno == '' || (this.state.accountno.length < 9 || this.state.accountno.length > 18)) {
      message.warning('Please enter Account number');
      return;
    }
    if(this.state.ifsccode == '') {
      message.warning('Please enter IFSC Code');
      return;
    }
    if(this.state.ifsccode.length != 11) {
      message.warning('Please enter valid IFSC Code');
      return;
    }

    if(this.state.investor_id == '') {
      message.warning('Invalid Request');
      return;
    }
    var reg = /^[A-Za-z]{4}[0-9]{6,7}$/;
    if (this.state.ifsccode.match(reg)) {
    } else {
      message.warning('Invalid IFSC code.');
      return;
    }
    let box = {
      accountno: this.state.accountno,
      ifsccode: this.state.ifsccode,
    }
    let d='';

    this.setState({ formloader:true });
    axios({
      method: 'post',
      url: '${process.env.REACT_APP_BASE_URL}verification/bank.php',
      headers: {
        'Content-Type': 'application/json'
      }, 
      data:box,
    }).then((response) => {
      if(response.data.status == 'SUCCESS') {
        message.success(response.data.message);
        d='success';
        this.updatebank();
        this.setState({ formloader:false });
      } else {
        message.warning('Invalid bank account details.');
        this.setState({ formloader:false });
        return;
      }
    });
  }

  updatebank() {
    this.setState({ formloader:true });

      let params = {
        accountno: this.state.accountno,
        ifsccode: this.state.ifsccode,
        id: this.state.investor_id,
      }

      Bridge.investor.updateaccountdetails(params).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState({
            formloader:false,
            bankdetailsmodal:false,
          });
        } else {
          message.warning(result.message);
          this.setState({
            formloader:false,
          });
        }
      });
  }
  
  // show profile details
  showprofiledetailspopup = () => {
    this.setState({
      profiledetailsmodal:true
    });
  }

  // hide profile details
  hideprofiledetailspopup = () => {
    this.setState({
      profiledetailsmodal:false,
    });
  }

  updateprofiledetails = () => {
    if (this.state.firstname == ''){
      message.warning('First name is required');
      return false;
    } else if(this.state.lastname == ''){
      message.warning('Last name is required');
      return false;
    }else if(this.state.contactno == '' || 
    (this.state.contactno.length != 10)){
      message.warning('Contact number is required');
      return false;
    }
    this.setState({ formloader: true });

    let formData = new FormData();    //formdata object

    formData.append('first_name', this.state.firstname);   //append the values with key, value pair
    formData.append('middle_name', this.state.middlename);
    formData.append('last_name', this.state.lastname);
    formData.append('mobile', this.state.contactno);
    formData.append('user_profile_picture', this.state.profile);
    formData.append('investor_id', this.state.investor_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }

    if(localStorage.getItem('investor_id')) {
      Bridge.investor.updateprofiledetails(formData,config).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState({ 
            formloader: false ,
            profiledetailsmodal: false,
            firstname:'',
            lastname:'',
            contactno:'',
            profile:'',
          },() => this.getbankdetails());
        } else {
          message.error(result.message);
          this.setState({ 
            formloader: false ,
          });
        }
      });
    } 
    
  }

  checkforlogin = () => {
    if(localStorage.getItem('investor_id')) {
      let name=this.state.firstname+' '+this.state.lastname;
      let img = this.state.profileimagetoshow;
      let investor_id= localStorage.getItem('investor_id');
      let investor_email= localStorage.getItem('investor_email');
      // let loc = `http://growth91.myakola.com/api/Users/setsignindata?email=${investor_email}&user_id=${investor_id}`;
      let loc = `${process.env.REACT_APP_BASE_URL}community/test.php?email=${investor_email}&user_id=${investor_id}&name=${name}&img=${img}`;
      window.location.assign(loc);
    }else if(localStorage.getItem('founder_id')){
      let name=this.state.founder_firstname+' '+this.state.founder_lastname;
      let img = this.state.founder_profileimagetoshow
      let investor_id= localStorage.getItem('founder_id');
      let investor_email= localStorage.getItem('founder_email');
      // let loc = `http://growth91.myakola.com/api/Users/setsignindata?email=${investor_email}&user_id=${investor_id}`;
      let loc = `${process.env.REACT_APP_BASE_URL}community/test.php?email=${investor_email}&user_id=${investor_id}&name=${name}&img=${img}`;
      window.location.assign(loc);

    }  else {
      window.location.assign('/Login');
    }
  }
  renew_membership=()=>{
    let order_id='order-01';
    let user_id=localStorage.getItem('investor_id');
    let amount=this.state.membership_amount;
    let expiry_date=this.state.expiry_date;
    let url=`${process.env.REACT_APP_BASE_URL}cashfree/renew/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&expiry_date=${expiry_date}`;
    // alert(url);
    window.location.assign(url);
  }

  //for update founder profile
  update_founder_profiledetails = () => {
    if (this.state.founder_firstname == ''){
      message.warning('First name is required');
      return false;
    } else if(this.state.founder_lastname == ''){
      message.warning('Last name is required');
      return false;
    }else if(!(this.state.founder_contactno.length ==10)){
      message.warning('Contact number is required');
      return false;
    }
    this.setState({ formloader: true });

    let formData = new FormData();    //formdata object

    formData.append('first_name', this.state.founder_firstname);   //append the values with key, value pair
    formData.append('middle_name', this.state.founder_middlename);
    formData.append('last_name', this.state.founder_lastname);
    formData.append('mobile', this.state.founder_contactno);
    formData.append('user_profile_picture', this.state.founder_profile);
    formData.append('founder_id', localStorage.getItem('founder_id'));
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }

    if(localStorage.getItem('founder_id')) {
      Bridge.founder.update_founder_profile_details(formData,config).then((result) => {
        if (result.status == 1) {
          message.success(result.message);
          this.setState({ 
            formloader: false ,
            profile_founder_detailsmodal:false,
            contactno:'',
            profile:'',
          },()=>this.get_founder_details());
        } else {
          message.error(result.message);
          this.setState({ 
            formloader: false ,
          });
        }
      });
    }     
  }

  get_founder_details=()=>{
    let params={
      founder_id:localStorage.getItem('founder_id'),
    }
    Bridge.founder.get_founder_profile_details(params).then((result)=>{
      if(result.status=='1'){
        let url = Apis.IMAGEURL +'profile/'+result.data[0].investor_id+'/'+
        result.data[0].user_profile_picture;
        // console.log('result',result);
        this.setState({
          founder_firstname: result.data[0].first_name,
          founder_middlename: result.data[0].middle_name,
          founder_lastname: result.data[0].last_name,
          founder_contactno: result.data[0].mobile,
          founder_profileimagetoshow: result.data[0].user_profile_picture ? url : '',
        });
      }
      else{
        this.setState({formloader:false});
      }
    })

  }
  render() {

    const menu = (
      <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
        <Menu.Item key="two" icon={<PieChartOutlined />}>
          <a href="/investor-dashboard" style={{ fontSize:14 }}>
            Dashboard
          </a>
        </Menu.Item>
        <Menu.Item key="four" icon={<UserOutlined />}>
          <a href="#" onClick={this.showprofiledetailspopup} style={{ fontSize:14 }}>
            Edit Profile
          </a>
        </Menu.Item>
        {/* <Menu.Item key="five" icon={<BankOutlined />}>
          <a href="#" onClick={this.showbankingdetails} style={{ fontSize:14 }}>
            Bank Details
          </a>
        </Menu.Item> */}
        {/* <Menu.Item key="three" icon={<ReloadOutlined />}
        style={{ width:160 }}>
          <a href='/MembershipPlan' style={{ fontSize:14 }}>
            Membership 
          </a>
        </Menu.Item> */}
        <Menu.Item key="six" icon={<ReloadOutlined />}
        style={{ width:160 }}>
          <a href='#' style={{ fontSize:14 }} onClick={() => this.setState({ modalVisible:true })}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    const menu2 = (
      <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
        <Menu.Item key="two" icon={<PieChartOutlined />}>
          <a href="/founder-dashboard" style={{ fontSize:14 }}>
            Dashboard
          </a>
        </Menu.Item>
       
        <Menu.Item key="four" icon={<UserOutlined />}>
          <a href="#" style={{ fontSize:14 }} onClick={()=>{this.setState({profile_founder_detailsmodal:true})}}>
            Edit Profile
          </a>          
        </Menu.Item>
       
        <Menu.Item key="five" icon={<ReloadOutlined />}
        style={{ width:160 }}>
          <a href='#' style={{ fontSize:14 }} onClick={() => this.setState({ modalVisible:true })}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src="/web/growth91LOGO (4).png" width="120"
              style={{
                position:'relative',
                top:-8,
              }}    
              className="d-inline-block align-top" alt="Growth91" />
            </a>
            <div className='d-lg-block d-none' >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a className="nav-link" href="/deals">Deals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Founders">Founder</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Investors">Investor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Learn">Learn</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.checkforlogin}>Community</a>
              </li>
            </ul>     
            </div>
            <div className="ms-sm-5  mt-2 me-0 ps-5 py-auto" 
            style={{ 
              width:'fit-content',
              display: 'flex',
              alignTtems: 'center',
            }}>
              <div className="d-flex header-right-col" style={{alignItems:'center'}}>
              </div>
            </div>
            <button className="navbar-toggler  me-2  ms-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    )
  }
}

export default HeaderForAssement;