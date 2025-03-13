import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './modal.css'
import {
  Modal,
  message,
  Spin,
  Input,
  DatePicker,
  Select,
  Typography,
} from "antd";
import Bridge from "../../constants/Bridge";
import CheckableTag from "antd/lib/tag/CheckableTag";
import axios from "axios";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "../../constants/data";
ReactGA.initialize(TRACKING_ID);
const { Option } = Select;
const { Paragraph } = Typography;
const refresh = () => window.location.reload(true)


export default class EditInvestmentMembershipmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalstatus: false,
      discounted_amount: 0,
      amount: 0,
      discount: 0,
      modalResult:false,
      getModalData:false,
      
      show_thankyou_modal : false,
      show_offline_payment_modal: false,
      offline_deal_id: "",
      offline_startup_id: "",
      investor_email: localStorage.getItem("investor_email"),
      investor_name: localStorage.getItem("investor_name"),
      investor_payment_date: "",
      investor_investment_amount: "",
      investor_payment_remarks: "",
      investor_payment_type: "",
      attach_file: "",
      utr_no_reference_id: "",
      formloader: false,
      processing_fees: "",
      membership_type: "",
      premium_percentage: "",
      regular_percentage: "",
      escrowAccount: "",
      escrowIfsc: "",
      startup_id: "",
      invest_amt:""
    };
  }

  componentDidMount() {
    this.getsettings();
    this.getList();
  }

  getList = () => {
    const dealId = this.props.deal_id;
    this.setState({ formloader: true });
    Bridge.deal.list().then((result) => {
      if (result.status == 1) {
        let deal = {};

        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].deal_id == dealId) {
            deal = result.data[i];
          }
        }
        console.log(this.props.invest_amt)
        console.log(deal, dealId);
        console.log(this.props.interested_id)
        console.log(deal.escrowact, "account number")
        console.log(deal.escrow_account_ifsc , "IFSC code")

        this.setState({
          escrowAccount: deal.escrowact,
          escrowIfsc: deal.escrow_account_ifsc,
          formloader: false,
          startup_id: deal.startup_id,
        });
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  };

  getsettings = () => {
    this.setState({ amountloader: true });
    Bridge.admin.settings.getsettings().then((result) => {
      if (result.status == 1) {
        let amount =
          Number(result.data[0].amount / 100) * Number(result.data[0].discount);
        amount = Number(result.data[0].amount) - Number(amount);
        this.setState({
          amount: result.data[0].amount,
          discount: result.data[0].discount,
          discounted_amount: amount,
        });
      } else {
      }
    });
  };
  showModal = () => {
    if (this.props.investor_id) {
      if (Number(this.props.amount) < Number(this.props.minamount)) {
        message.warning("Minimum investment amount is " + this.props.minamount);
        return;
      }
      if (Number(this.props.amount) > Number(this.props.maxamount)) {
        message.warning(
          "Maximum investment amount is " + this.props.maxamount,
          5
        );
        return;
      }
      if (this.props.agree != true) {
        message.warning("Please agree to terms and conditions");
        return;
      }
      // if(this.props.membership_type=='regular'){
      //     this.setState({modalstatus:true});
      // }else{
      this.props.invest();
      // }
    }
  };

  showPopUpModel = () =>{

  }
  cancelOffline = () => {
    this.setState({ show_offline_payment_modal: false });
  };
  cancelThankyou = () => {
    this.setState({ show_thankyou_modal: false });
  };

  getpostData = () => {
    const formData = new FormData();
    formData.append('deal_id', this.props.deal_id);
    formData.append('investor_id', this.props.investor_id);
    formData.append('amount', this.props.amount);
    formData.append('processingfees', this.props.processingfees);
    formData.append('totalamount', this.props.totalamount);
    formData.append('deduct', this.props.deduct);
    formData.append('agree', this.props.agree);
    formData.append('order_token', this.props.order_token);
    formData.append('tdsstatus', this.props.tdsstatus);
    formData.append('gst', this.props.gst);
    formData.append('gstvalue', this.props.gstvalue);
    formData.append('igst', this.props.igst);
    formData.append('igstvalue', this.props.igstvalue);
    formData.append('legalfee', this.props.legalfee);
    formData.append('interested_id', this.props.interested_id);
    formData.append('walletDeductionMoney', this.props.walletDeductionMoney);
    axios.post(`${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/save_investor_commitment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      ReactGA.event({
        category: "Deal Item Page",
        action: `DealId:${this.props.deal_id} InvestorId:${this.props.investor_id}, Error Displayed. Message: ${error}.`,
      });
      console.log(error);
      this.setState({getModalData:false})
    });
  };

  render() {
    return (
      <div>
        <div className="payment-btn-container">
          <button
            type="button"
            className="login-button prime-bg d-md-block mx-auto w-100"
            // onClick={this.showModal}
            //  onClick={this.showPopUpModel}
            onClick={ 
 
            () => {
              ReactGA.event({
                category: "Deal Item Page",
                action: `DealId:${this.props.deal_id} InvestorId:${this.props.investor_id}, Commit button clicked.`,
              });
              if (Number(this.props.amount) < Number(this.props.minamount)) {
                message.warning(
                  "Minimum investment amount is " + this.props.minamount
                  );
                  return;
                }
                if (Number(this.props.amount) > Number(this.props.maxamount)) {
                  message.warning(
                    "Maximum investment amount is " + this.props.maxamount,
                    5
                  );
                  return;
                }
                if (this.props.agree != true) {
                  message.warning("Please agree to terms and conditions");
                  return;
                }
              if(this.props.amount && this.props.agreecheck){
                this.setState({getModalData:true});
                this.getpostData();
                this.setState({
                  show_thankyou_modal: true,
                });
              }
              
            }}
          >
            Commit My Interest
          </button>
          {/* <button
            type="button"
            className="login-button prime-bg"
            onClick={() => {
              if (Number(this.props.amount) < Number(this.props.minamount)) {
                message.warning(
                  "Minimum investment amount is " + this.props.minamount
                );
                return;
              }
              if (Number(this.props.amount) > Number(this.props.maxamount)) {
                message.warning(
                  "Maximum investment amount is " + this.props.maxamount,
                  5
                );
                return;
              }
              if (this.props.agree != true) {
                message.warning("Please agree to terms and conditions");
                return;
              }
              this.setState({
                show_offline_payment_modal: true,
              });
            }}
          >
            Offline
          </button> */}
        </div>

        <Modal
        // title="Thank You"
        centered
        open={this.state.show_thankyou_modal}
        className="thankumodal"
        // onCancel={this.cancelThankyou}
        iconType="SmileOutlined"
        maskClosable={false}
        cancelText={"Cancel"}
        footer={[
          <button className="btn btn-block" onClick={refresh}>Ok</button>,
          <Link to="/investor-commitment">
            <button className="btn btn-block">Go to Dashboard</button>
          </Link>
        ]}
        >
          <div className="modal-confirm">
          <div className="modal-content">
			<div className="modal-header">
				<div className="icon-box">
          <i class="far fa-check-circle"></i>
				</div>		
        <div className="modal-title">
				  <h4>Thankyou</h4>	
        </div>		
			</div>
			<div className="modal-body">
				<p className="text-center">We received your commitment. Payment link will be activated once deal is closed.</p>
			</div>
		</div>
    </div>
        </Modal>
      </div>
    );
  }
}
