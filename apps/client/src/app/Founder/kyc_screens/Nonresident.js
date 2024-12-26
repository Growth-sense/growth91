
import React, { Component } from 'react';
import Header from '../../common/Header';
import Footer from "../../common/Footer";
import { message, Spin,Button } from 'antd';
import "react-client-captcha/dist/index.css";
import Bridge from '../../constants/Bridge';
import $ from 'jquery';
class Nonresident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nationality:'',
            investor_id:'',
            loading:false,
            legal_name:'',
            bank_account_no:'',
            bank_account_swift:'',
            legal_address:'',
            verify_kyc:'',
            resident_country:'',
            remark:'',
            tax_id:'',
            national_id:'',
            passport:'',
            tax_id_file:'',
            national_id_file:'',
            passport_file:'',
            bank_statement_file:'',

        }
    }
    componentDidMount() {
        let id= localStorage.getItem('founder_id')
        this.setState({
            investor_id:id
        },()=>this.getbankdetails());
    }
    // get bank details 
    getbankdetails = () => {
        this.setState({loading:true});
        let params = {
          id: this.state.investor_id,
        }
        Bridge.investor.getbankdetails(params).then((result) => {
          if (result.status==1) {
            this.setState({loading:false});
            // check for the kyc status
            if(result.data.length>0){
                if(result.data[0].kycstatus!='Pending' || result.data[0].nationality!='Non Resident'){
                  window.location.assign('/founder-as-investor-dashboard');
                  return;
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
            });
          } else {
            this.setState({loading:false});
          }
        });
    }
    save=()=>{
        // validation
        if(!this.state.legal_name){
            message.warning('Invalid legal name');
            return;
        } else if(!this.state.bank_account_swift.length>14){
            message.warning('Invalid bank account swift value');
            return;
        } else if(!this.state.legal_address){
            message.warning('Invalid legal address value');
            return;
        } else if(this.state.bank_account_no.length>14){
            message.warning('Invalid bank account no value');
            return;
        } else if(!this.state.resident_country){
            message.warning('Invalid resident country value');
            return;
        } else if(!this.state.tax_id){
            message.warning('Invalid tax id value');
            return;
        } else if(!this.state.national_id){
            message.warning('Invalid national id value');
            return;
        } else if(!this.state.passport){
            message.warning('Invalid passport number value');
            return;
        }
        this.setState({loading:true});
        let formData = new FormData();    //formdata object
        formData.append('legal_name', this.state.legal_name);   //append the values with key, value pair
        formData.append('bank_account_no', this.state.bank_account_no);
        formData.append('bank_account_swift', this.state.bank_account_swift);
        formData.append('legal_address', this.state.legal_address);
        formData.append('verify_kyc', this.state.verify_kyc);
        formData.append('resident_country', this.state.resident_country);
        formData.append('remark', this.state.remark);
        formData.append('tax_id', this.state.tax_id);
        formData.append('national_id', this.state.national_id);
        formData.append('passport', this.state.passport);
        formData.append('tax_id_file', this.state.tax_id_file);
        formData.append('national_id_file', this.state.national_id_file);
        formData.append('passport_file', this.state.passport_file);
        formData.append('bank_statement_file', this.state.bank_statement_file);
        formData.append('investor_id', this.state.investor_id);
        const config = {
            headers: {
            'Content-Type': 'multipart/form-data',
            }
        }
        Bridge.submit_non_resident_form(formData,config).then((result) => {
            if (result.status==1) {
                console.log('result',result);
                message.success("KYC Submitted Successfully.");
                this.setState({loading: false});
                setTimeout(()=>{
                    window.location.assign('/founder-as-investor-dashboard');
                },3000);
            } else {
                message.error(result.message);
                this.setState({loading:false});
            }
        });
    }
    onselectfile=(value)=>{
        if(value=='tax_id_file'){
            $('#tax_id_file').trigger('click');
        } else if(value=='national_id_file'){
            $('#national_id_file').trigger('click');
        } else if(value=='passport_file'){
            $('#passport_file').trigger('click');
        } else if(value=='bank_statment_file'){
            $('#bank_statment_file').trigger('click');
        }
    }
    render() {
    return (
      <div>
        <Header />
            <section>
                <div className='m-5 ppnt'>
                    <div className=' m-3 py-3'>
                        <h1>Complete your KYC</h1>
                        <big className='text-secondary'><b>To ensure the secure and smooth flow of investments and returns you need to enter the details of your unique identification number and your date of birth. Rest assured, your details are safe with us.</b></big>
                    </div>
                    <hr 
                        style={{ 
                            border: '1px solid rgb(170 167 167)',
                            background: '#ddd',
                            margin: '33px 0',
                        }}
                    />
                    <div className=' my-4 py-3'>
                        <h5>Confirm Your Details</h5>
                        <p>Please ensure that the details added below  are match with your KYC. These details will be used for allocation of securities and private placement. </p>
                    </div>
                    <div className ='mx-auto'>
                        {/* End steps for kyc */}
                        <Spin spinning={this.state.loading}>
                            <div style={{maxWidth:1115,margin:'0 auto'}}>
                                <div className='row'>
                                    <div className="login mt-5 col-lg-6">
                                        <label>Legal Name <span className='text-danger'>*</span></label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            className="form-input-field mt-3 mb-4" 
                                            placeholder='Legal Name' 
                                            value={this.state.legal_name}
                                            onChange={(e)=>{this.setState({legal_name:e.target.value})}}
                                        /> 
                                    </div>
                                    <div className="login mt-5 col-lg-6">
                                        <label>Bank Account (Swift) <span className='text-danger'>*</span></label>
                                        <input 
                                            type="number" 
                                            onWheel={() => document.activeElement.blur()}
                                            name="bank_account_swift"  
                                            className="form-input-field mt-3 mb-4" 
                                            placeholder='Bank Account Swift' 
                                            value={this.state.bank_account_swift}
                                            onChange={(e)=>{this.setState({bank_account_swift:e.target.value})}}
                                        /> 
                                    </div>
                                    <div className="login mt-0 col-lg-6">
                                        <label>Legal Address <span className='text-danger'>*</span></label>
                                        <textarea 
                                            name="legal_address" 
                                            className="form-input-field mt-3" 
                                            placeholder='legal Address' 
                                            value={this.state.legal_address}
                                            onChange={(e)=>this.setState({legal_address:e.target.value,})}
                                        ></textarea>  
                                    </div>
                                    <div className="login mt-0 col-lg-6">
                                        <label>Bank Account Number <span className='text-danger'>*</span></label>
                                        <input 
                                            type="number" 
                                            name="bank_account_no"  
                                            className="form-input-field mt-3 mb-4" 
                                            onWheel={() => document.activeElement.blur()}
                                            placeholder='Bank Account Number' 
                                            value={this.state.bank_account_no.trim()}
                                            onChange={(e)=>{this.setState({bank_account_no:e.target.value})}}
                                        /> 
                                    </div>
                                    <div className="login mt-0 col-lg-6">
                                        <label>Verfiy KYC</label>
                                        <input 
                                            type="text" 
                                            name="verify_kyc" 
                                            className="form-input-field mt-3 mb-4" 
                                            placeholder='Verify KYC' 
                                            value={this.state.verify_kyc}
                                            onChange={(e)=>{this.setState({verify_kyc:e.target.value})}}
                                        /> 
                                    </div>
                                    <div className="login mt-0 col-lg-6">
                                        <label>Resident Country <span className='text-danger'>*</span></label>
                                        <input 
                                            type="text" 
                                            name="resident_country" 
                                            className="form-input-field mt-3 mb-4" 
                                            placeholder='Resident Country' 
                                            value={this.state.resident_country}
                                            onChange={(e)=>{this.setState({resident_country:e.target.value})}}
                                        /> 
                                    </div>
                                    <div className="login mt-0 col-lg-6">
                                        <label>Remark</label>
                                        <textarea 
                                            name="remark" 
                                            className="form-input-field mt-3" 
                                            placeholder='Remark'  
                                            value={this.state.remark}
                                            onChange={(e)=>this.setState({remark:e.target.value,})}
                                        ></textarea>   
                                    </div>
                                    <div className="login mt-0 col-lg-6">
                                        <label>Tax ID <span className='text-danger'>*</span></label>
                                        <input 
                                            type="text" 
                                            name="tax_id" 
                                            className="form-input-field mt-3 mb-4" 
                                            placeholder='Tax ID' 
                                            value={this.state.tax_id.trim()}
                                            onChange={(e)=>{this.setState({tax_id:e.target.value})}}
                                        />  
                                    </div>
                                    <div className="login mt-0 col-lg-6">
                                        <label>National ID <span className='text-danger'>*</span></label>
                                        <input 
                                            type="text" 
                                            name="national_id" 
                                            className="form-input-field mt-3 mb-4" 
                                            placeholder='National ID' 
                                            value={this.state.national_id.trim()}
                                            onChange={(e)=>{this.setState({national_id:e.target.value})}}
                                        />    
                                    </div>
                                    <div className="login mt-0 col-lg-6">
                                        <label>Passport Number <span className='text-danger'>*</span></label>
                                        <input 
                                            type="text" 
                                            name="passport" 
                                            className="form-input-field mt-3 mb-4" 
                                            placeholder='Passport' 
                                            value={this.state.passport.trim()}
                                            onChange={(e)=>{this.setState({passport:e.target.value})}}
                                        />    
                                    </div>
                                    <div className="login mb-4 col-lg-6">
                                        <label>Tax ID (PAN) <span className='text-danger'>*</span></label><br/>
                                        <div className='d-flex'>
                                            <Button
                                                onClick={()=>this.onselectfile('tax_id_file')}
                                            >Select Tax ID File</Button>
                                            <span style={{marginLeft:15}}>{this.state.tax_id_file ? '1 file selected' : ''}</span>
                                        </div>
                                        <input 
                                            type='file'
                                            style={{display:'none'}}
                                            id="tax_id_file"
                                            accept="image/png, image/gif, image/jpeg,application/pdf"
                                            onChange={(e) => this.setState({tax_id_file:e.target.files[0]})}
                                        />
                                    </div>
                                    <div className="login mb-4 col-lg-6">
                                        <label>National ID (Aadhar/SSN) <span className='text-danger'>*</span></label><br/>
                                        <div className='d-flex'>
                                            <Button
                                                onClick={()=>this.onselectfile('national_id_file')}
                                            >Select National ID File</Button>
                                            <span style={{marginLeft:15}}>{this.state.national_id_file ? '1 file selected' : ''}</span>
                                        </div>
                                        <input 
                                            type='file'
                                            style={{display:'none'}}
                                            id="national_id_file"
                                            accept="image/png, image/gif, image/jpeg,application/pdf"
                                            onChange={(e) => this.setState({national_id_file:e.target.files[0]})}
                                        />
                                    </div>
                                    <div className="login mb-4 col-lg-6">
                                        <label>Passport <span className='text-danger'>*</span></label><br/>
                                        <div className='d-flex'>
                                            <Button
                                                onClick={()=>this.onselectfile('passport_file')}
                                            >Select Passport File</Button>
                                            <span style={{marginLeft:15}}>{this.state.passport_file ? '1 file selected' : ''}</span>
                                        </div> 
                                        <input 
                                            type='file'
                                            style={{display:'none'}}
                                            id="passport_file"
                                            accept="image/png, image/gif, image/jpeg,application/pdf"
                                            onChange={(e) => this.setState({ passport_file: e.target.files[0] })}
                                        />                      
                                    </div>
                                    <div className="login mb-4 col-lg-6">
                                        <label>Bank Statement <span className='text-danger'>*</span></label><br/>
                                        <div className='d-flex'>
                                            <Button
                                                onClick={()=>this.onselectfile('bank_statment_file')}
                                            >Select Bank Statement File</Button>
                                            <span style={{marginLeft:15}}>{this.state.bank_statement_file ? '1 file selected' : ''}</span>
                                        </div>
                                        <input 
                                            type='file'
                                            style={{display:'none'}}
                                            id="bank_statment_file"
                                            accept="image/png, image/gif, image/jpeg,application/pdf"
                                            onChange={(e) => this.setState({ bank_statement_file: e.target.files[0] })}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="login mb-4 col-lg-6"></div>
                                    <div 
                                        className="login mb-4 col-lg-6"
                                        style={{
                                            display:'flex',
                                            justifyContent:'flex-end'
                                        }}
                                    >
                                        <button 
                                            type='button' 
                                            onClick={this.save}
                                            className='small-button-dark prime-bg mr-2'
                                            style={{marginRight:19}}
                                        >
                                            Submit
                                        </button>
                                        <button 
                                            type='button' 
                                            onClick={()=>window.location.assign('/founder-as-investor-dashboard')}
                                            className='small-button-dark prime-bg'
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </Spin>
                    </div>
                </div>
            </section>
        <Footer />
      </div>
    )
  }
}
export default Nonresident;