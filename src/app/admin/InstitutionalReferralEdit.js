import React, { Component } from "react";
import { Input,message,Spin } from "antd";
import Bridge from "../constants/Bridge";
import Apis from '../constants/Apis';
import { CopyOutlined }  from '@ant-design/icons';
import moment from 'moment';

class ReferralViewEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profileImg:'',
      name: "",
      email: "",
      mobile: "",
      accordance: "",
      facebook: "",
      instagram: "",
      linkedIn: "",
      twitter: "",
      accountNo: "",
      ifsc_code: "",
      bankname: "",
      profileImgUrl: "",
      accordanceUrl:"",
      accordanceShow:"",
      referralCode: "",
      referralLink: "",
      totalInvestedAmount: "",
      amountPending: "",
    };
  }

  componentDidMount() {
    this.getlist();
  }

  // get  list
  getlist = () => {
    this.setState({ loading: true });
    let params={
      referral_id:localStorage.getItem('referral_id')
    }
    console.log(params);
    Bridge.institutionalReferral.get_edit_list(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          loading: false,
        });
        let item=result.data[0];
        if(item)
        {
            let profileUrl = Apis.IMAGEURL+'institutional_referral/profile_img/'+item.referral_id+'/'+item.profile_img;
            let accordanceUrl = Apis.IMAGEURL+'institutional_referral/accordance/'+item.referral_id+'/'+item.accordance;
            this.setState({
              name: item.name,
              email: item.email,
              mobile: item.mobile,
              accordanceShow:item.accordance,
              facebook: item.facebook,
              instagram: item.instagram,
              linkedIn: item.linkedin,
              twitter: item.twitter,
              accountNo: item.bank_account_no,
              ifsc_code: item.ifsc_code,
              bankname: item.bank_name,
              profileImgUrl: profileUrl,
              accordanceUrl:accordanceUrl,
              referralCode: item.referral_code,
              referralLink: item.referral_link,
            });
          }
      
      } else {
        message.error(result.message);
        this.setState({ loading: false });
      }
    });
  };

  // for updating institutional referral
  updateReferral(){
    if (this.state.name == "") {
      message.warning("name is required");
      return false;
    }
    if (this.state.email == "") {
      message.warning("Email is required");
      return false;
    }
    if (this.state.mobile == "") {
      message.warning("Mobile Number is required");
      return false;
    }
   
    if (this.state.accountNo == "") {
      message.warning("Account No is required");
      return false;
    }
    if (this.state.ifsc_code == "") {
      message.warning("IFSC Code is required");
      return false;
    }
    if (this.state.bankname == "") {
      message.warning("Bank name is required");
      return false;
    }
    let params = {
      referral_id:localStorage.getItem('referral_id'),
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedIn: this.state.linkedIn,
      twitter: this.state.twitter,
      bankAccountNo: this.state.accountNo,
      ifscCode: this.state.ifsc_code,
      bankName: this.state.bankname,
    };
    this.setState({ loading: true});
  Bridge.institutionalReferral.update(params).then((result) => {
    if(result.status=='1'){
      this.setState({
      },this.props.updateEditModal,this.updateProfilePdf(localStorage.getItem('referral_id')))
      message.success("Successfully Updated");
    }
    else{
      this.setState({
        loading: false,
      },this.props.hideEditModel);
      message.error(result.message);
    }
  });
  }
  updateProfilePdf(id){
    if(this.state.accordance|| this.state.profileImg){
      let formData = new FormData();
      formData.append('referral_id', id);
      formData.append('profile_img',this.state.profileImg);
      formData.append('accordance',this.state.accordance);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      Bridge.institutionalReferral.uploadreferralimg(formData, config).then((result) => {
        if (result.status == 1) {
          this.setState({
              loading:false
          });
        } else {
          message.error('failed to update accordance and profile image');
          this.setState({
            loading:false
        });
        }
      });
  
    }
  }
  copyReferralLink(value){
    /* Copy the text inside the text field */
navigator.clipboard.writeText(value);
message.success("Copied");
}
copyReferralCode(code){
  navigator.clipboard.writeText(code);
message.success("Copied");
}
  render() {
    return (
      <div className="container">
      <Spin spinning={this.state.loading}>
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="text-center">
                    <img
                      src={this.state.profileImgUrl}
                      className="rounded-circle mb-2"
                      height='120'
                      width='120'
                      alt="Avatar"
                    />
                    <h5 className="text-center">{this.state.name}</h5><br/>
                    <h6>Referral Code<br/></h6>
                    <p className="color-primary">{this.state.referralCode}&nbsp;&nbsp;&nbsp;<a href="#" onClick={()=>this.copyReferralCode(this.state.referralCode)}><CopyOutlined /></a></p><br/>
                    <h6 >
                      Referral Link <br/>
                      <a href={this.state.referralLink}>
                        {this.state.referralLink}
                      </a>&nbsp;&nbsp;&nbsp;<a href="#" onClick={()=>this.copyReferralLink(this.state.referralLink)}><CopyOutlined /></a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 className="mb-2">Basic Details</h4>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label  className="mt-2">Name</label>
                      <Input
                        type="text"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label  className="mt-2">Email</label>
                      <Input
                        type="email"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label  className="mt-2">Mobile Number</label>
                      <Input
                        type="number"
                        onWheel={() => document.activeElement.blur()}
                        value={this.state.mobile}
                        onChange={(e) =>
                          this.setState({ mobile: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label  className="mt-2">Profile Image</label>&nbsp;
                     
                      <Input
                type="file"
                onChange={(e) =>
                  this.setState({profileImg: e.target.files[0] ,
                  profileImgUrl: URL.createObjectURL(e.target.files[0])})
                }
                accept=".jpg, .jpeg, .png"
              />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label  className="mt-2">Accordance</label>&nbsp;
                      <a href={this.state.accordanceUrl} target='true'>{this.state.accordance?'':this.state.accordanceShow}</a>
                      <Input type="file" onChange={(e) =>this.setState({accordance: e.target.files[0]})} accept=".pdf"/>
                    </div>
                  </div>
    
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 className="mt-3 mb-2 ">Social Links</h4>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mt-2">Facebook</label>
                      <Input
                        type="text"
                        value={this.state.facebook}
                        onChange={(e) =>
                          this.setState({ facebook: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mt-2">Instagram</label>
                      <Input
                        type="text"
                        value={this.state.instagram}
                        onChange={(e) =>
                          this.setState({ instagram: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mt-2">LinkedIn</label>
                      <Input
                        type="text"
                        value={this.state.linkedIn}
                        onChange={(e) =>
                          this.setState({ linkedIn: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mt-2">Twitter</label>
                      <Input
                        type="text"
                        value={this.state.twitter}
                        onChange={(e) =>
                          this.setState({ twitter: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 className="mt-3 mb-2 ">Bank Account Details</h4>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mt-2">Bank Account No.</label>
                      <Input
                        type="number"
                        onWheel={() => document.activeElement.blur()}
                        value={this.state.accountNo}
                        onChange={(e) =>{this.setState({ accountNo: e.target.value })}}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mt-2">IFSC Code</label>
                      <Input
                        type="text"
                        value={this.state.ifsc_code}
                        onChange={(e) =>
                          this.setState({ ifsc_code: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="mt-2">Bank Name</label>
                      <Input
                        type="text"
                        value={this.state.bankname}
                        onChange={(e) => {this.setState({bankname:e.target.value})}}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div style={{ textAlign: "end" }}>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-secondary"
                        onClick={this.props.hideEditModal}
                      >
                        Cancel
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        style={{color:'white'}}
                        className="btn prime-bg"
                        onClick={()=>{this.updateReferral()}}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
      </div>
    );
  }
}
export default ReferralViewEdit;
