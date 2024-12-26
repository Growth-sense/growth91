import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { DatePicker, message, Spin, Upload, notification } from "antd";
import ClientCaptcha from "react-client-captcha";
import "react-client-captcha/dist/index.css";
import Bridge from "../constants/Bridge";
import moment from "moment";
import { InboxOutlined } from "@ant-design/icons";
import Apis from "../constants/Apis";
import parse from "html-react-parser";
import axios from "axios";
import $ from "jquery";

const { Dragger } = Upload; //investor-kyc

class Kycinstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen1: true,
      screen2: false,
      screen3: false,
      screen4: false,
      screen5: false,
      panno: "",
      dob: "",
      adharno: "",
      captchasvg: "",
      captchatext: "",
      captchaCode: "",
      otp: "",
      adharFront: "",
      adharBack: "",
      legalname: "",
      fathername: "",
      address: "",
      loading: false,
      investor_id: "",
      adharfronttmldata: [],
      adharbacktmldata: [],
      imgloader: false,
      imgloader2: false,
      panVerifyStatus: false,
      adharVerifyStatus: false,
      bankAcountVerifyStatus: false,
      loading: false,
      activetab: 0,
      accountno: "",
      ifsccode: "",
      pan_details: {},
      adhar_details: {},
      bank_details: {},
      kycstatus:'',
      nationality:'',   
    };
  }
  setCode = (captchaCode) => {
    this.setState({ captchaCode });
  }
  componentDidMount() {
    let id=localStorage.getItem("investor_id");
    this.setState({
      investor_id:id,
    },()=>this.getbankdetails());
  }
  // get bank details
  getbankdetails=()=>{
    this.setState({loading:true});
    let params = {
      id:this.state.investor_id,
    }
    Bridge.investor.getbankdetails(params).then((result) => {
      if (result.status==1) {
        this.setState({loading:false});
        if(result.data.length>0){
          if(result.data[0].kycstatus!='Pending' || result.data[0].nationality!='Indian Resident'){
            window.location.assign('/investor-dashboard');
            return;
          }
        }
        this.setState({
          kycstatus: result.data[0].kycstatus,
          nationality:result.data[0].nationality,
          loading:false
        });
      }else{
        this.setState({loading:false});
      }
    });
  }
  onChange = (date, dateString) => {
    let currentdate = moment();
    if (date > currentdate) {
      notification.warning({
        message: `Invalid date of birth`,
        description: "Please enter valid date of birth.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    this.setState({ dob: date });
  };

  showscreen1 = () => {
    this.setState({
      screen1: true,
      screen2: false,
      screen3: false,
      screen4: false,
      screen5: false,
    });
  };

  showscreen2 = () => {
    if (!this.state.panno || this.state.panno.length != 10) {
      notification.warning({
        message: `Invalid pan number`,
        description: "Please enter valid PAN No.",
        placement: "top",
        duration: 5,
      });
      return;
    } else if (!this.state.dob) {
      notification.warning({
        message: `Invalid date of birth`,
        description: "Please enter valid date of birth.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    let panstatus = this.checkforpanno(this.state.panno);
    if (panstatus == false) {
      notification.warning({
        message: `Invalid format of PAN No`,
        description: "Please enter valid PAN No.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    let params = {
      pan_no: this.state.panno,
    };
    this.setState({ loading: true });
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}verification/pan.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        pan_no: this.state.panno,
      },
    }).then((response) => {
      if (response.data.valid === true) {
        notification.success({
          message: `Success`,
          description: "PAN number is verified successfully.",
          placement: "top",
          duration: 5,
        });
        this.setState(
          {
            panVerifyStatus: true,
            legalname: response.data.registered_name,
            fathername: response.data.father_name,
            screen1: false,
            screen2: true,
            screen3: false,
            screen4: false,
            screen5: false,
            pan_details: response.data,
          },
          () => this.setState({ loading: false })
        );
        $("html, body").animate(
          {
            scrollTop: 280,
          },
          1000
        );
      } else {
        notification.warning({
          message: `Invalid PAN Number`,
          description: "Please enter the valid pan number.",
          placement: "top",
          duration: 5,
        });
        this.setState({ loading: false });
      }
    });
  };

  checkforpanno = (text) => {
    let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regex.test(text)) {
      return true;
    }
    return false;
  };

  showscreen3 = () => {
    if (!this.state.adharno || this.state.adharno.length != 12) {
      notification.warning({
        message: `Invalid Aadhaar number`,
        description: "Please enter the valid Aadhaar number.",
        placement: "top",
        duration: 5,
      });
      return;
    } else if (this.state.captchatext != this.state.captchaCode) {
      notification.warning({
        message: `Invalid captcha code.`,
        description: "Please enter correct captcha.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    this.setState({ loading: true });
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}verification/adhar.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        adharno: this.state.adharno,
      },
    }).then((response) => {
      if (response.data.valid === true) {
        notification.success({
          message: `Success`,
          description: "Aadhaar number is verified successfully.",
          placement: "top",
          duration: 5,
        });
        this.setState(
          {
            adharVerifyStatus: true,
            screen1: false,
            screen2: false,
            screen3: true,
            screen4: false,
            screen5: false,
            adhar_details: response.data,
          },
          () => this.setState({ loading: false })
        );
        $("html, body").animate(
          {
            scrollTop: 280,
          },
          1000
        );
      } else {
        notification.warning({
          message: `Invalid Aadhaar number.`,
          description: "Please enter valid Aadhaar number.",
          placement: "top",
          duration: 5,
        });
        this.setState({ loading: false });
      }
    });
  };

  showscreen4 = () => {
    if (!this.state.otp || this.state.otp.length != 6) {
      notification.warning({
        message: `Invalid otp no.`,
        description: "Please enter valid otp number.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    this.setState({
      screen1: false,
      screen2: false,
      screen3: false,
      screen4: true,
      screen5: false,
    });
    $("html, body").animate(
      {
        scrollTop: 280,
      },
      1000
    );
  };

  showscreen5 = () => {
    if (this.state.adharfronttmldata.length == 0) {
      notification.warning({
        message: `Invalid Aadhaar card front image.`,
        description: "Please select Aadhaar card front image.",
        placement: "top",
        duration: 5,
      });
      return;
    } else if (this.state.adharbacktmldata.length == 0) {
      notification.warning({
        message: `Invalid Aadhaar card back image.`,
        description: "Please select Aadhaar card back side image.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    this.setState({
      screen1: false,
      screen2: false,
      screen3: false,
      screen4: false,
      screen5: true,
    });
    $("html, body").animate(
      {
        scrollTop: 280,
      },
      1000
    );
  };

  completekycprocess = () => {
    let id = localStorage.getItem("investor_id");
    let params = {
      dob: this.state.dob,
      adharno: this.state.adharno,
      captchatext: this.state.captchatext,
      panno: this.state.panno,
      otp: this.state.otp,
      legalname: this.state.legalname,
      fathername: this.state.fathername,
      address: this.state.address,
      id: id,

      adhar_no: this.state.adhar_details.aadhaarNumber,
      adhar_age_band: this.state.adhar_details.ageBand,
      adhar_gender: this.state.adhar_details.gender,
      adhar_mobile_no: this.state.adhar_details.mobileNumber,
      adhar_reference_id: this.state.adhar_details.referenceId,
      adhar_state: this.state.adhar_details.state,
      adhar_valid: this.state.adhar_details.valid == true ? 1 : 0,

      pan_father_name: this.state.pan_details.father_name,
      pan_name_match_score: this.state.pan_details.name_match_score,
      pan_name_provided: this.state.pan_details.name_provided,
      pan: this.state.pan_details.pan,
      pan_reference_id: this.state.pan_details.reference_id,
      pan_registered_name: this.state.pan_details.registered_name,
      pan_type: this.state.pan_details.type,
      pan_valid: this.state.pan_details.valid == true ? 1 : 0,
    };

    if (!this.state.legalname) {
      notification.warning({
        message: `Invalid legal name.`,
        description: "Please enter the value of legal name.",
        placement: "top",
        duration: 5,
      });
      return;
    } else if (!this.state.fathername) {
      notification.warning({
        message: `Invalid father name.`,
        description: "Please enter the value of father name.",
        placement: "top",
        duration: 5,
      });
      return;
    } else if (!this.state.address) {
      notification.warning({
        message: `Invalid address`,
        description: "Please enter the value of address.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    this.setState({ loading: true });
    Bridge.investor.completekycprocess(params).then((result) => {
      if (result.status == 1) {
        notification.success({
          message: `Success`,
          description: "Aadhaar card is verified successfully",
          placement: "top",
          duration: 5,
        });
        this.setState({ loading: false, activetab: 1 });
        $("html, body").animate(
          {
            scrollTop: 280,
          },
          1000
        );
      } else {
        notification.warning({
          message: `Invalid Aadhaar card no.`,
          description: "Please enter the valid Aadhaar number.",
          placement: "top",
          duration: 5,
        });
        this.setState({ loading: false });
      }
    });
  };

  updatebankdetails = () => {
    if (
      this.state.accountno == "" ||
      this.state.accountno.length < 9 ||
      this.state.accountno.length > 18
    ) {
      notification.warning({
        message: `Invalid bank account number`,
        description: "Please enter the valid bank account number.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    if (this.state.ifsccode == "") {
      notification.warning({
        message: `Invalid IFSC code.`,
        description: "Please enter the valid IFSC Code.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    if (this.state.ifsccode.length != 11) {
      notification.warning({
        message: `Invalid IFSC code.`,
        description: "Please enter the valid IFSC Code.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    if (this.state.investor_id == "") {
      notification.warning({
        message: `Invalid request.`,
        description: "Please try to login first.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    var reg = /^[A-Za-z]{4}[0-9]{6,7}$/;
    if (this.state.ifsccode.match(reg)) {
    } else {
      notification.warning({
        message: `Invalid IFSC code.`,
        description: "Please enter the valid format of IFSC Code.",
        placement: "top",
        duration: 5,
      });
      return;
    }
    let box = {
      accountno: this.state.accountno,
      ifsccode: this.state.ifsccode,
    };
    let d = "";

    this.setState({ loading: true });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}verification/bank.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: box,
    }).then((response) => {
      //  console.log('bank verification response', response);
      if (response.data.status == "SUCCESS") {
        notification.success({
          message: `Success`,
          description: "Bank details are verified successfully.",
          placement: "top",
          duration: 5,
        });
        d = "success";
        this.updatebank(response.data.data);
        this.setState({ loading: false });
      } else {
        notification.warning({
          message: `Invalid bank account details.`,
          description: "Please enter the valid bank account no and ifsc code.",
          placement: "top",
          duration: 5,
        });
        this.setState({ loading: false });
        return;
      }
    });
  };

  updatebank(res) {
    this.setState({ loading: true });
    let params = {
      accountno: this.state.accountno,
      ifsccode: this.state.ifsccode,
      id: this.state.investor_id,

      account_exists: res.accountExists,
      amount_deposited: res.amountDeposited,
      name_at_bank: res.nameAtBank,
      ref_id: res.refId,
    };
    Bridge.investor.updateaccountdetails(params).then((result) => {
      if (result.status == 1) {
        notification.success({
          message: `Success`,
          description: "Bank details are updated successfully.",
          placement: "top",
          duration: 5,
        });
        this.setState({ loading: false });
        setTimeout(() => {
          window.location.assign("/investor-dashboard");
        }, 3000);
      } else {
        notification.warning({
          message: `Invalid bank account details.`,
          description: "Please enter the valid bank account no and ifsc code.",
          placement: "top",
          duration: 5,
        });
        this.setState({ loading: false });
      }
    });
  }

  disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  render() {
    const props1 = {
      name: "images",
      multiple: false,
      showUploadList: false,
      action:
        `${process.env.REACT_APP_BASE_URL}api/` +
        Apis.uploadadhar +
        "?investor_id=" +
        this.state.investor_id,
      accept: "image/*",
      onChange: (info) => {
        this.setState({ imgloader: true });
        const { status } = info.file;

        if (status === "done") {
          // console.log('status',status);
          let files = this.state.adharfronttmldata;
          let obj = [
            {
              uid: info.file.response.id,
              htmldata: info.file.response.htmldata,
            },
          ];
          this.setState({
            adharfronttmldata: obj,
            imgloader: false,
          });
        }
      },
      onDrop(e) {
        // console.log('Dropped files', e.dataTransfer.files);
      },
    };

    const props2 = {
      name: "images",
      multiple: false,
      showUploadList: false,
      action:
        `${process.env.REACT_APP_BASE_URL}api/` +
        Apis.uploadadharback +
        "?investor_id=" +
        this.state.investor_id,
      accept: "image/*",
      onChange: (info) => {
        this.setState({ imgloader2: true });
        const { status } = info.file;

        if (status === "done") {
          // console.log("status", status);
          let obj = [
            {
              uid: info.file.response.id,
              htmldata: info.file.response.htmldata,
            },
          ];
          this.setState({
            adharbacktmldata: obj,
            imgloader2: false,
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
            <div className="m-5 ppnt">
              <div
                className="m-3 py-3"
                style={{ paddingTop: "63px !important" }}
              >
                <h1>KYC Instructions</h1>
                <big className="text-secondary">
                  <b>
                    KYC is important step for the safety of the investor. This
                    form will take 10 minutes to complete. Please keep the
                    following documents ready :<br></br>
                    1) PAN Card <br></br>
                    2) Aadhar Card <br></br>
                    3) Bank Account Details 
                  </b>
                </big>
              </div>

              <hr
                style={{
                  border: "1px solid rgb(170 167 167)",
                  background: "#ddd",
                  margin: "33px 0",
                }}
              /> 
              
              <center >
              
                <button
                  onClick={() => window.location.assign("/investor-kyc")}
                  className="small-button-dark prime-bg  "
                  style={{
                    
                    fontsize: 18,
                    padding: "0 0",
                    marginBottom: 20,
                  }}
                >
                  Lets start
                </button>
              </center>
              
              <img
                src="./assets/images/investors/kyc-instructions.jpg"
                style={{
                  maxWidth: "50%",
                  margin: "0 auto",
                  display: "flex",
                }}
              />
                
              <center>
              <br/>
                <button
                  onClick={() => window.location.assign("/investor-kyc")}
                  className="small-button-dark prime-bg"
                  style={{
      
                    fontsize: 18,
                    padding: "0 0",
                    marginBottom: 20,
                  }}
                >
                  Lets start
                </button>
              </center>
            </div>
          </section>
        </Spin>
        <Footer />
      </div>
    );
  }
}

export default Kycinstructions;
