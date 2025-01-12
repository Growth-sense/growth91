
import React, { Component } from 'react';
import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { message, Spin, Upload,notification,Steps } from 'antd';
import "react-client-captcha/dist/index.css";
import Bridge from '../../constants/Bridge';
import moment from 'moment';
import Apis from '../../constants/Apis';
import axios from 'axios';
import $ from 'jquery';

const { Step } = Steps;
const { Dragger } = Upload;

class VerifyKyc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            screen1:true,
            screen2:false,
            screen3:false,
            screen4:false,
            screen5:false,
            panno:'',
            adharno:'',
            captchasvg:'',
            captchatext:'',
            captchaCode: '',
            otp:'',
            adharFront:'',
            adharBack:'',
            legalname:'',
            fathername:'',
            address:'',
            loading:false,
            investor_id: '',
            adharfronttmldata:[],
            adharbacktmldata:[],
            imgloader:false,
            imgloader2: false,
            panVerifyStatus: false,
            adharVerifyStatus: false,
            bankAcountVerifyStatus: false,
            loading:false,
            activetab:0,
            accountno:'',
            ifsccode:'',
            pan_details:{},
            adhar_details:{},
            bank_details:{},
            mobile:'',
            selectedTab:'0',
            adhar_kyc_status:false,
            pan_kyc_status:false,
            bank_kyc_status:false,
            adharscreen:0,
            nationality:'',
            ref_id:'',
            pan_submit:false,
            adhar_submit:false,
            bank_submit:false,
            adhar_front_image:'',
            adhar_back_image:'',
            showInputOTP:false,
            aadhar_valid:'',
            gender:'',
            careof:'',
            email:'',
            name:'',
            image_link:'',
            dob:'',
        }
    }
    setCode = captchaCode => {
        this.setState({ captchaCode })
    }
    componentDidMount() {
        let id= localStorage.getItem('founder_id')
        this.setState({
            investor_id: id
        },()=>this.getbankdetails());
    }
    get_kyc_details=()=>{
        let params = {
          id: this.state.investor_id,
        }
        Bridge.investor.get_kyc_details(params).then((result) => {
          if (result.status==1) {
            this.setState({loading:false});
            if(result.data.length>0){
                this.setState({
                    panno:result.data[0].panno,
                    adharno:result.data[0].adharno,
                    accountno:result.data[0].bank_ac_no,
                    ifsccode:result.data[0].ifsc_code,
                    bank_submit:(result.data[0].bank_ac_no && result.data[0].ifsc_code)? true : false,
                    adhar_submit:result.data[0].adharno ? true :false,
                    pan_submit:result.data[0].panno ? true :false,
                    adhar_front_image:result.data[0].adharFront,
                    adhar_back_image:result.data[0].adharBack,
                    otp:result.data[0].adhar_otp,
                });
            }    
          }
        });
    }
    getbankdetails = () => {
        this.setState({loading:true});
        let params = {
          id: this.state.investor_id,
        }
        Bridge.investor.getbankdetails(params).then((result) => {
          if (result.status==1) {
            this.setState({loading:false});            // check for the kyc status
            if(result.data.length>0){
                if(result.data[0].kycstatus!='Pending' || result.data[0].nationality!='Indian Resident'){
                    setTimeout(()=>{
                        window.location.assign('/founder-as-investor-dashboard');
                        return;
                    },3000);
                }
              }
            let astatus=false
            let pstatus=false
            let bstatus=false
            if(result.data[0].adhar_kyc_status=='success' || 
            result.data[0].adhar_kyc_status=='Admin_Approved'
            ){
                astatus=true
            }
            if(result.data[0].pan_kyc_status=='success' || 
            result.data[0].pan_kyc_status=='Admin_Approved'
            ){
                pstatus=true
            }
            if(result.data[0].bank_kyc_status=='success' || 
            result.data[0].bank_kyc_status=='Admin_Approved'
            ){
                bstatus=true
            }
            this.setState({
                mobile: result.data[0].mobile,
                loading:false,
                adhar_kyc_status:astatus,
                pan_kyc_status:pstatus,
                bank_kyc_status:bstatus,
                nationality:result.data[0].nationality
            },()=>this.get_kyc_details());
          } else {
            this.setState({loading:false});
          }
        });
    }
    onChange = (date, dateString) => {
        let currentdate = moment();
        if(date > currentdate) {
            notification.warning({
                message: `Invalid date of birth`,
                description:'Please enter valid date of birth.',
                placement:'top',
                duration:5,
            });
            return;
        }
        this.setState({ dob:date });
    }

    showscreen1 = () => {
        this.setState({ screen1:true, screen2:false, screen3:false, screen4:false, screen5:false });
    }

    verify_pan_no = () => {
        if(!this.state.panno || this.state.panno.length!=10){
            notification.warning({
                message: `Invalid PAN number`,
                description:'Please enter the valid PAN number',
                placement:'top',
                duration:5,
            });
            return;
        } 
        let panstatus = this.checkforpanno(this.state.panno);
        if(panstatus==false){
            notification.warning({
                message: `Invalid format of PAN No`,
                description:'Please enter valid PAN No.',
                placement:'top',
                duration:5,
            });
            return;
        }
        this.setState({ loading:true });
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}verification/pan.php`,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: {
                pan_no: this.state.panno,
            },
        }).then((response) => {
            if(response.data.valid === true) {
                notification.success({
                    message: `Success`,
                    description:'PAN is verified successfully.',
                    placement:'top',
                    duration:5,
                });
                this.setState({
                    panVerifyStatus: true,
                    legalname:response.data.registered_name,
                    fathername:'',
                    screen1:false, 
                    screen2:true, 
                    screen3:false, 
                    screen4:false, 
                    screen5:false,
                    pan_details:response.data,
                    selectedTab:'1',
                    adharscreen:'0',
                    pan_submit:true,
                },() =>{
                    this.update_pan_no();
                    this.setState({loading:false});
                });
                $("html, body").animate({
                    scrollTop: 280
                }, 1000);
            } else {
                notification.warning({
                    message: `Invalid PAN Number`,
                    description:'Please enter the valid pan number.',
                    placement:'top',
                    duration:5,
                });
                this.setState({ loading:false });
            }
        });
    }

    checkforpanno = (text) => {
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if(regex.test(text)) {
             return true;
        }
        return false;
    }
    save_otp=()=>{
      
        this.setState({loading:true});
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}api/Adharverification/verify_adhar_otp`,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: {
                otp: this.state.otp,
                ref_id: this.state.ref_id,
                investor_id:this.state.investor_id,
            },
        }).then((response) => {
            // console.log('otp response',response)
            if(response.data.status=='1'){
                if(response.data.data.status=='VALID'){
                    message.success('Aadhaar is verified successfully.');
                    this.setState({
                        email:response.data.data.email,
                        name:response.data.data.name,
                        careof:response.data.data.care_of,
                        address:response.data.data.address,
                        gender:response.data.data.gender,
                        mobile:response.data.data.mobile_hash,
                        ref_id:response.data.data.ref_id,
                        dob:response.data.data.dob,
                        image_link:response.data.data.photo_link,
                        // aadhar_state:response.data.data.state,
                        // aadhar_valid:response.data.data.mobile,
                // adharno:this.state.adharno,
                // captchatext:this.state.captchatext,
                // otp:this.state.otp,
                // legalname:this.state.legalname,
                // fathername:'',
                // address:this.state.address,
                // investor_id: this.state.investor_id,
                // adhar_age_band:this.state.adhar_details.ageBand,	
                // adhar_gender:this.state.adhar_details.gender,
                // adhar_mobile_no:this.state.adhar_details.mobileNumber,	
                // adhar_reference_id:this.state.adhar_details.referenceId,	
                // adhar_state:this.state.adhar_details.state,
                        loading:false,
                        selectedTab:'2',
                        showInputOTP: false,
                        adhar_submit:true
                    },() =>this.update_adhar_details())
                } else{
                    message.warning('Please enter the valid OTP and try again');
                    this.setState({loading:false});
                }
            } else{
                this.setState({loading:false});
            }
        });        
    }
    // update adhar details
    verify_adhar = () => {
        
        if(!this.state.adharno || this.state.adharno.length!=12){
            notification.warning({
                message: `Invalid Aadhaar number`,
                description:'Please enter a valid Aadhaar number.',
                placement:'top',
                duration:5,
            });
            return;
        }
      
      
        this.setState({ loading:true });
        // let otheradharurl='${process.env.REACT_APP_BASE_URL}verification/adhar.php';
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}api/Adharverification/verify_adhar`,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: {
                adharno: this.state.adharno,
            },
        }).then((response) => {
            // console.log('adhar response',response)
            // return;
            if(response.data.status==1 && response.data.data){
                let res=JSON.parse(response.data.data);
                // console.log(res);
                if(res.status=='SUCCESS') {
                    notification.success({
                        message: `Success`,
                        description:'OTP is sent to your Aadhaar registered mobile number.',
                        placement:'top',
                        duration:5,
                    });
                    this.setState({
                        adharVerifyStatus: true,
                        screen1:false, 
                        screen2:false, 
                        screen3:false, 
                        screen4:true, 
                        screen5:false,
                        adhar_details:response.data,
                        loading:false,
                       showInputOTP:true,
                        ref_id:res.ref_id,
                    });
                    $("html, body").animate({
                        scrollTop: 280
                    }, 1000);
                }else{
                    this.setState({loading:false});
                    notification.warning({
                        message: `Invalid Aadhaar number.`,
                        description:'Please enter a valid Aadhaar number.',
                        placement:'top',
                        duration:5,
                    });
                } 
            } else{
                this.setState({loading:false});
                notification.warning({
                    message: `Invalid Aadhaar number.`,
                    description:'Please enter a valid Aadhaar number.',
                    placement:'top',
                    duration:5,
                });
                
            }            
        });
    }
    showscreen4 = () => {
        if(!this.state.otp || this.state.otp.length!=6){
            notification.warning({
                message: `Invalid otp no.`,
                description:'Please enter valid otp number.',
                placement:'top',
                duration:5,
            });
            return;
        }
        this.setState({ 
            screen1:false, 
            screen2:false, 
            screen3:false, 
            screen4:true, 
            screen5:false,
        });
        $("html, body").animate({
            scrollTop: 280
        }, 1000);
    }

    completekycprocess = () => {
        let id = this.state.investor_id;
        let params = {
            dob:this.state.dob ? this.state.dob : "0000-00-00",
            adharno:this.state.adharno,
            captchatext:this.state.captchatext,
            panno:this.state.panno,
            otp:this.state.otp,
            legalname:this.state.legalname,
            fathername:'',
            address:this.state.address,
            id: id,

            adhar_no:this.state.adhar_details.aadhaarNumber,	
            adhar_age_band:this.state.adhar_details.ageBand,	
            adhar_gender:this.state.adhar_details.gender,
            adhar_mobile_no:this.state.adhar_details.mobileNumber,	
            adhar_reference_id:this.state.adhar_details.referenceId,	
            adhar_state:this.state.adhar_details.state,	
            adhar_valid:this.state.adhar_details.valid==true?1:0,
            
            
        };

        // if(!this.state.legalname) {
        //     notification.warning({
        //         message: `Invalid legal name.`,
        //         description:'Please enter the value of legal name.',
        //         placement:'top',
        //         duration:5,
        //     });
        //     return;
        // } else if(!this.state.address) {
        //     notification.warning({
        //         message: `Invalid address`,
        //         description:'Please enter the value of address.',
        //         placement:'top',
        //         duration:5,
        //     });
        //     return;
        // }
        // else if(!this.state.fathername) {
        //     notification.warning({
        //         message: `Invalid father name.`,
        //         description:'Please enter the value of father name.',
        //         placement:'top',
        //         duration:5,
        //     });
        //     return;
        // } 
        
        this.setState({loading:true})
        Bridge.investor.completekycprocess(params).then((result) => {
            // console.log('result',result);
            if (result.status == 1) {
                notification.success({
                    message: `Success`,
                    description:'Aadhaar card is verified successfully',
                    placement:'top',
                    duration:5,
                });
                this.setState({loading:false,activetab:1});
                $("html, body").animate({
                    scrollTop: 280
                }, 1000);
            } else {
                notification.warning({
                    message: `Invalid Aadhaar card no.`,
                    description:'Please enter a valid Aadhaar number.',
                    placement:'top',
                    duration:5,
                });
                this.setState({loading:false});
            }
        });

    }

    updatebankdetails = () => {
        if(this.state.accountno == '' || (this.state.accountno.length < 9 || this.state.accountno.length > 18)) {
            notification.warning({
                message: `Invalid bank account number`,
                description:'Please enter a valid bank account number.',
                placement:'top',
                duration:5,
            });
          return;
        }
        if(this.state.ifsccode == '') {
            notification.warning({
                message: `Invalid IFSC code.`,
                description:'Please enter a valid IFSC code.',
                placement:'top',
                duration:5,
            });
          return;
        }
        if(this.state.ifsccode.length != 11) {
            notification.warning({
                message: `Invalid IFSC code.`,
                description:'Please enter a valid IFSC code.',
                placement:'top',
                duration:5,
            });
            return;
        }
        if(this.state.investor_id == '') {
            notification.warning({
                message: `Invalid request.`,
                description:'Please try to login first.',
                placement:'top',
                duration:5,
            });
          return;
        }
        var reg = /^[A-Za-z]{4}[0-9]{6,7}$/;
        if (this.state.ifsccode.match(reg)) {
        } else {
            notification.warning({
                message: `Invalid IFSC code.`,
                description:'Please enter the valid format of IFSC Code.',
                placement:'top',
                duration:5,
            });
          return;
        }
        let name='';
        let mobile='';
        if(localStorage.getItem('founder_name')){
            name=localStorage.getItem('founder_name');
            mobile='9888855555';
        } else if(localStorage.getItem('investor_name')){
            name=localStorage.getItem('investor_name');
            mobile=this.state.mobile;
        } else {
            name='user';
        }
        
        let box = {
          accountno: this.state.accountno,
          ifsccode: this.state.ifsccode,
          name:name,
          mobile:mobile
        }
        this.setState({ loading:true });
        axios({
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}verification/bank.php`,
          headers: {
            'Content-Type': 'application/json'
          }, 
          data:box,
        }).then((response) => {
          if(response.data.status=='SUCCESS') {
            this.updatebank(response.data.data);
            this.setState({loading:false,bank_submit:true});
          } else {
            notification.warning({
                message:`Invalid bank account details.`,
                description:'Please enter the valid bank account no and ifsc code.',
                placement:'top',
                duration:5,
            });
            this.setState({loading:false});
            return;
          }
        });        
      }
    // update bank details
    updatebank(res) {
        this.setState({ loading:true });
        let params = {
            accountno: this.state.accountno,
            ifsccode: this.state.ifsccode,
            id: this.state.investor_id,
            account_exists:res.accountExists,
            amount_deposited:res.amountDeposited ? res.amountDeposited: '',	
            name_at_bank:res.nameAtBank,	
            ref_id:res.refId,
        }
        Bridge.investor.updateaccountdetails(params).then((result) => {
            if (result.status == 1) {
                notification.success({
                    message: `Success`,
                    description:'Bank Account is verified successfully.',
                    placement:'top',
                    duration:5,
                });
                this.setState({loading:false},()=>this.getbankdetails());
                // setTimeout(() => {
                //     window.location.assign('/founder-as-investor-dashboard');
                // },3000);
            } else {
                notification.warning({
                    message: `Invalid bank account details.`,
                    description:'Please enter the valid bank account no and ifsc code.',
                    placement:'top',
                    duration:5,
                });
                this.setState({loading:false});
            }
        });
    }

    // Back button redirect to dashboard
    redirectDashboard =() => {
        window.location.href = "/founder-as-investor-dashboard";
    }

    disabledDate = (current) => {
        return current && current > moment().endOf('day');
    }
    onChangetab = (value) => {
        this.setState({selectedTab:value});
        if(value=='1'){
            this.setState({adharscreen:'0'});
        }
    }
    // update pan no
    update_pan_no=()=>{
        let params = {
            pan_no: this.state.panno,
            investor_id: this.state.investor_id,
            pan_father_name:this.state.pan_details.father_name ? this.state.pan_details.father_name : '',		
            pan_name_match_score:this.state.pan_details.name_match_score ? this.state.pan_details.name_match_score :'',
            pan_name_provided:this.state.pan_details.name_provided ? this.state.pan_details.name_provided : '',	
            pan:this.state.pan_details.pan ? this.state.pan_details.pan : '',		
            pan_reference_id:this.state.pan_details.reference_id ? this.state.pan_details.reference_id : '',		
            pan_registered_name:this.state.pan_details.registered_name ? this.state.pan_details.registered_name : '',		
            pan_type:this.state.pan_details.type ? this.state.pan_details.type : '',		
            pan_valid:this.state.pan_details.valid==true?1:0,	
        }
        Bridge.update_kyc_details(params).then((result) => {
            if (result.status == 1) {
                this.setState({loading:false},()=>this.getbankdetails());
            } else {
                this.setState({loading:false});
            }
        });
    }

    // update adhar details
    update_adhar_details=()=>{
        this.setState({ loading:true });
        // console.log("adhar data :",this.state.adhar_details);
        let params = {
            dob:this.state.dob,
            email:this.state.email,
            adharno:this.state.adharno,
            otp:this.state.otp,
            legalname:this.state.name,
            fathername:this.state.careof,
            address:this.state.address,
            investor_id: this.state.investor_id,
            adhar_gender:this.state.gender,
            adhar_mobile_no:this.state.mobile,	
            adhar_reference_id:this.state.ref_id,	
            dob:this.state.dob,
            image_link: this.state.image_link,	
        }
        // console.log(params);
        Bridge.update_kyc_details(params).then((result) => {
            if(result.status==1){
                this.setState({loading:false,adharscreen:'0'},()=>this.getbankdetails());
            } else {
                message.warning(result.message);
                this.setState({loading:false});
            }
        });
    }
    //save adhar legal details
    // save_adhar_legal_details=()=>{
    //     let params = {
    //         legalname:this.state.legalname,
    //         fathername:'',
    //         address:this.state.address,
    //         investor_id: this.state.investor_id,	
    //     }
    //     Bridge.update_kyc_details(params).then((result) => {
    //         if(result.status==1){
    //             this.setState({loading:false},()=>this.getbankdetails());
    //         } else {
    //             message.warning(result.message);
    //         }
    //     });
    // }
  render() {
  
    const props1 = {
        name: 'images',
        multiple: false,
        showUploadList: false,
        action: `${process.env.REACT_APP_BASE_URL}api/`+Apis.uploadadhar+"?investor_id=" + this.state.investor_id,
        accept: "image/*",
        onChange: (info) => {
            this.setState({ imgloader:true });
            const { status } = info.file;
            // console.log('front file',info.file);
            // if file size is greater than 5mb need to convert 5mb in bytes then compare
            if (status === "done") {
                // console.log('status',status);
                let files = this.state.adharfronttmldata;
                let obj = [{
                    uid: info.file.response.id,
                    htmldata: info.file.response.htmldata,
                }];
                this.setState({
                    adharfronttmldata: obj,
                    imgloader:false,
                });
            }
        },
        onDrop(e) {
        },
    };
    const props2 = {
        name: 'images',
        multiple: false,
        showUploadList: false,
        action: `${process.env.REACT_APP_BASE_URL}api/`+Apis.uploadadharback+"?investor_id=" + this.state.investor_id,
        accept: "image/*",
        onChange: (info) => {
            this.setState({ imgloader2:true });
            const { status } = info.file;
            // console.log('file',info.file);
        
            if (status === "done") {
                // console.log('status',status);
                let obj = [{
                    uid: info.file.response.id,
                    htmldata: info.file.response.htmldata,
                }];
                this.setState({
                    adharbacktmldata: obj,
                    imgloader2:false,
                });
            }
        },
        onDrop(e) {
            // console.log('Dropped files', e.dataTransfer.files);
        },
    };

    // bank details  
    
    return (
      <div>
        <Header />
        <Spin spinning={this.state.loading}>
        <section>
            <div className='m-5 ppnt'>
                <div className=' m-3 py-3'>
                    <h1>Complete your KYC</h1>
                    <big className='text-secondary'><b>To ensure the secure and smooth flow of investments and returns you need to enter the details of your unique identification number and your date of birth. Rest assured, your details are safe with us.</b></big>
                </div>

                <hr style={{ 
                    border: '1px solid rgb(170 167 167)',
                    background: '#ddd',
                    margin: '33px 0',
                  }}/>

                <div className=' my-4 py-3'>
                    <h5>Confirm Your Details</h5>
                    <p>Please ensure that the details added below  are match with your KYC. These details will be used for allocation of securities and private placement. </p>
                </div>
                <div className ='mx-auto'>
                    
                    {/* Start Steps for kyc  */}
                    <div style={{maxWidth:680,margin:'0 auto'}}>
                        <div className='kyc-back-button'>
                            {/* <a href="/founder-as-investor-dashboard">
                                <i className="fas fa-backward"></i> Back
                            </a> */}
                            {/* <button 
                                type='button' 
                                className='small-button-dark prime-bg'
                                onClick={this.redirectDashboard}
                                >
                                 <i className="fas fa-backward"></i> Back
                            </button> */}
                        </div>
                        <Steps current={Number(this.state.selectedTab)} onChange={this.onChangetab}>
                            <Step title="PAN Verification" key={'pan'} />
                            <Step title="Aadhaar Verification" key={'adhar'} />
                            <Step title="Bank Account Verification" key={'bank'} />
                        </Steps>
                    </div>

                    {/* End steps for kyc */}
                    <Spin spinning={this.state.loading}>
                    <form>
                        <div className="container">
                            <div className="row">
                                {/* Start 1 */}
                            {(this.state.selectedTab=='0' || this.state.selectedTab=='1') && (
                                <div className="col-lg-8 col-12 m-auto">
                                    {this.state.selectedTab=='0' && (                                        
                                        <div>
                                            <div className="login mt-5" >
                                                <label>
                                                    Permanant Account Number (PAN) 
                                                     <span className='text-danger'>*</span>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    name="name" className="form-input-field mt-3 mb-5" placeholder='Eg. ABCDEF1234F' 
                                                    value={this.state.panno}
                                                    onChange={(e)=>{this.setState({panno:e.target.value})}}
                                                    disabled={this.state.pan_submit==true ? true : false}
                                                />
                                            </div>
                                            {(this.state.pan_submit==true)?(
                                                <div className='d-flex justify-content-end'>
                                                <button type='button' onClick={()=>{this.setState({selectedTab:'1'})}} className='small-button-dark-okyc'
                                                style={{width:'100px', fontSize:'17px',marginTop: '0px', }}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                            ):(<div className='d-flex justify-content-end'>
                                                <button type='button' onClick={this.verify_pan_no} className='small-button-dark-okyc'
                                                style={{width:'100px', fontSize:'17px',marginTop: '0px', }}
                                                >
                                                    Submit
                                                </button>
                                            </div>)}
                                            
                                        </div>                                        
                                    )}
                                    {this.state.selectedTab=='1' && (
                                        <div>
                                            {this.state.adharscreen=='0' && (
                                                <>
                                                    <div className="login mt-5" >
                                                        <label><b>Aadhaar Number <span className='text-danger'>*</span></b></label>
                                                        <input 
                                                            type="text" 
                                                            name="name" className="form-input-field mt-3 mb-5" 
                                                            placeholder='12 Digit UID (1234/1234/1234)' 
                                                            value={this.state.adharno}
                                                            onChange={(e)=>{this.setState({adharno:e.target.value})}}
                                                            disabled={this.state.adhar_submit==true ? true : false}
                                                        /> 
                                                    </div>
                                                    {(this.state.adhar_submit!=true)?(
                                                    <div className='d-flex justify-content-end'>
                                                        <button 
                                                            type='button' 
                                                            onClick={this.verify_adhar}
                                                            className='small-button-dark-okyc'
                                                            style={{width:'100px', fontSize:'17px',marginTop: '0px', }}
                                                            disabled={this.state.showInputOTP==true ? true : false}
                                                        >
                                                            Send OTP
                                                        </button>
                                                        </div>):( 
                                                        <div className='d-flex justify-content-end'>
                                                
                                                            <button type='button' 
                                                            onClick={()=>{this.setState({selectedTab:'2'})}}
                                                            className='small-button-dark-okyc'
                                                            style={{width:'100px', fontSize:'17px',marginTop: '0px', }}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                          )
                                                        }
                                                    
                                                    {(this.state.showInputOTP == true && this.state.adhar_submit!=true) ? (
                                                        <div className="login mt-5" >
                                                        <label ><b>OTP <span className='text-danger'>*</span></b></label>
                                                        <input 
                                                            type="text" 
                                                            name="name" 
                                                            className="form-input-field mb-5" 
                                                            placeholder='OTP' 
                                                            onChange={(e)=>{this.setState({otp:e.target.value})}}
                                                            value={this.state.otp}
                                                            // disabled={this.state.adhar_submit==true ? true : false}
                                                        /> 
                                                    </div>) : (<div></div>)}

                                                <div className='d-flex justify-content-end'>
                                                {(this.state.showInputOTP==true) && (
                                                    <button type='button' 
                                                    onClick={this.save_otp}
                                                    className='small-button-dark-okyc'
                                                    style={{width:'100px', fontSize:'17px',marginTop: '0px', }}
                                                    >
                                                        Submit
                                                    </button>
                                                )}
                                                </div>
                                                    


                                                    {/* <div className="login">
                                                        <label className='mb-3'><b>Aadhaar card front <span className='text-danger'>*</span></b></label>
                                                        <Spin spinning={this.state.imgloader}>   
                                                            <div style={{pointerEvents:(this.state.adhar_submit==true?'none' :'auto')}}>
                                                                <Dragger {...props1}>
                                                                    <p className="ant-upload-drag-icon text-center">
                                                                        <InboxOutlined />
                                                                    </p>
                                                                    <p className="ant-upload-text text-center">Click or drag file to this area to upload</p>
                                                                    <p className="ant-upload-hint text-center" style={{maxWidth:400,margin:'0 auto'}}>
                                                                    Please upload front of your own Aadhar Card.You can upload image or PDF file.
                                                                    </p>
                                                                </Dragger>
                                                            </div>                                                        
                                                            {this.state.adharfronttmldata && this.state.adharfronttmldata.map((item,index) => {
                                                                return(
                                                                    <div key={index}>
                                                                        {parse(item.htmldata)}
                                                                    </div>
                                                                )
                                                            })}
                                                        </Spin>
                                                        <br/>  
                                                        <Spin spinning={this.state.imgloader2}>        
                                                        <label className='mb-3'><b>Aadhaar card Back <span className='text-danger'>*</span></b></label>
                                                        <div style={{pointerEvents:(this.state.adhar_submit==true?'none' :'auto')}}>
                                                            <Dragger {...props2}>
                                                                <p className="ant-upload-drag-icon text-center">
                                                                    <InboxOutlined />
                                                                </p>
                                                                <p className="ant-upload-text text-center">Click or drag file to this area to upload</p>
                                                                <p className="ant-upload-hint text-center"
                                                                style={{ maxWidth: 400,margin:'0 auto' }}>
                                                                    Please upload back of your own Aadhar Card.You can upload image or PDF file.
                                                                </p>
                                                            </Dragger>
                                                        </div>
                                                        {this.state.adharbacktmldata && this.state.adharbacktmldata.map((item,index) => {
                                                            return(
                                                                <div key={index}>
                                                                    {parse(item.htmldata)}
                                                                </div>
                                                            )
                                                        })}
                                                        </Spin>
                                                    </div> */}
                                                </>
                                            )}
                                            {/* {this.state.adharscreen=='1' && (
                                                <div>
                                                    <div className="login mt-5" >
                                                        <label ><b>OTP <span className='text-danger'>*</span></b></label>
                                                        <input 
                                                            type="text" 
                                                            name="name" 
                                                            className="form-input-field mt-3 mb-5" 
                                                            placeholder='OTP' 
                                                            onChange={(e)=>{this.setState({otp:e.target.value})}}
                                                            value={this.state.otp}
                                                            // disabled={this.state.adhar_submit==true ? true : false}
                                                        /> 
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <button 
                                                            type='button' 
                                                            onClick={this.verify_adhar}
                                                            className='small-button-dark prime-bg'
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            )} */}

                                            
                                        </div>
                                    )}                                    
                                </div>
                            )}
                            {/* End 1 */}
                            {this.state.selectedTab=='2' && (
                                <div className="col-lg-8 col-12 m-auto">
                                    <div className="login mt-5">
                                        <label><b>Bank Account Number:</b></label>
                                        <input 
                                            type="text" 
                                            name="account" 
                                            className="form-input-field mt-4 mb-5" 
                                            placeholder='Account Number' 
                                            value={this.state.accountno}
                                            onChange={(e) => this.setState({ accountno:e.target.value })}
                                            disabled={this.state.bank_submit==true ? true : false}
                                        /> 
                                        <label><b>IFSC Code:</b></label>
                                        <input 
                                            type="text" 
                                            name="ifsc" 
                                            className="form-input-field mt-3" 
                                            placeholder='IFSC Code' 
                                            onChange={(e) => this.setState({ ifsccode:e.target.value })}
                                            value={this.state.ifsccode}
                                            disabled={this.state.bank_submit==true ? true : false}
                                        />  
                                    </div>   
                                    {/* {(this.state.bank_submit==true)?
                                    (<div className='d-flex justify-content-end'>
                                        <button 
                                            type="button" 
                                            className="small-button-dark prime-bg " 
                                            onClick={()=>{window.assign("/investor-dashboard")}}
                                        >
                                        Submit
                                        </button>
                                    </div> ):(<div className='d-flex justify-content-end'>
                                        <button 
                                            type="button" 
                                            className="small-button-dark prime-bg " 
                                            onClick={this.updatebankdetails}
                                        >
                                        Submit
                                        </button>
                                    </div> )} */}

                                    <div className='d-flex justify-content-end'>
                                        <button 
                                            type="button" 
                                            className="small-button-dark-okyc"
                                            onClick={this.updatebankdetails}
                                            style={{width:'100px', fontSize:'17px',marginTop: '0px', }}
                                        >
                                        Submit
                                        </button>
                                    </div> 
                                    
                                </div>
                            )}
                            </div>
                        </div>
                    </form>
                    </Spin>
                </div>
            </div>
            
        </section>
        </Spin>
        <Footer />
      </div>
    )
  }
}

export default VerifyKyc;
