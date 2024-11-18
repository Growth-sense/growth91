import React, { Component } from 'react';
import {Modal} from 'antd';
import moment from 'moment';

class Dealflow extends Component {

  constructor(props){
    super(props);
    this.state={
      modal_status:false,
    }
  }
    
    componentDidMount(){
        // console.log('props data',this.props.data);
    }
    showdetailsmodal=()=>{
      this.setState({modal_status:true});
    }
    handleOk=()=>{
      this.setState({modal_status:false});
    }
    handleCancel=()=>{
      this.setState({modal_status:false});
    }

    render() {
      return (
        <>
          <a href="#" onClick={()=>this.showdetailsmodal()} style={{textTransform:'capitalize'}}>
            {(this.props.data.investment_id ? this.props.data.investment_id :'---')}
          </a>
          <Modal 
            title="Investment Flow" 
            visible={this.state.modal_status} 
            onOk={false} 
            onCancel={this.handleCancel}
            width={800}
          >
          {(this.props.data.payment_status=='payment_success' ||
            this.props.data.kycstatus=="Approved" ||
            this.props.data.admin_approval_status=='admin_approval' ||
            this.props.data.investor_document_sign_status=='Inv_sign_success' ||
            this.props.data.founder_document_sign_status=='fndr_sign_success' ||
            this.props.data.fund_raise_status=='success' ||
            this.props.data.roc_status=='fndr_roc_confirmation'
          ) ? (
            <div className='deal_flow_block'>
                  <div class="bg-gradient_solid">
                    <div class="container">
                      <div class="steps">
                        {this.props.data.kycstatus=="Approved" && (
                          <div class="steps-container">
                            <div class="content">
                              <h2>KYC Done</h2>
                              <p>{this.props.data.kyc_date ? moment(this.props.data.kyc_date).format('DD MMM, YYYY') : ''}</p>
                            </div>
                            <i class="step-line"></i>
                            <div class="date">{this.props.data.kyc_date ? moment(this.props.data.kyc_date).format('DD MMM'):''}</div>
                          </div>
                       )}   
                        {this.props.data.payment_status=='payment_success' && (
                          <div class="steps-container">
                            <div class="content">
                              <h2>Payment Done</h2>
                              <p>{this.props.data.payment_status_date ? moment(this.props.data.payment_status_date).format('DD MMM, YYYY') : ''}</p>
                            </div>
                            <i class="step-line"></i>
                            <div class="date">
                            {this.props.data.payment_status_date ? moment(this.props.data.payment_status_date).format('DD MMM') : ''}
                            </div>
                          </div>
                        )}
                        
                        {this.props.data.admin_approval_status=='admin_approval' && (
                          <div class="steps-container">
                            <div class="content">
                              <h2>Growth91 Admin Approved</h2>
                              <p>{this.props.data.admin_approval_status_date ? moment(this.props.data.admin_approval_status_date).format('DD MMM, YYYY') : ''}</p>
                            </div>
                            <i class="step-line"></i>
                            <div class="date">
                              {this.props.data.admin_approval_status_date ? moment(this.props.data.admin_approval_status_date).format('DD MMM') : ''}
                            </div>
                          </div>
                        )} 
                        {this.props.data.investor_document_sign_status=='Inv_sign_success' && (
                          <div class="steps-container">
                            <div class="content">
                              <h2>Investor Document Signed</h2>
                              <p>
                                {this.props.data.investor_document_sign_status_date ? moment(this.props.data.investor_document_sign_status_date).format('DD MMM, YYYY HH:mm:ss') : ''}
                              </p>
                            </div>
                            <i class="step-line"></i>
                            <div class="date">
                            {this.props.data.investor_document_sign_status_date ? moment(this.props.data.investor_document_sign_status_date).format('DD MMM') : ''}
                            </div>
                          </div>
                        )} 
                         {this.props.data.founder_document_sign_status=='fndr_sign_success' && (
                          <div class="steps-container">
                            <div class="content">
                              <h2>Founder Document Signed</h2>
                              <p>
                                {this.props.data.founder_document_sign_status_date ? moment(this.props.data.founder_document_sign_status_date).format('DD MMM, YYYY hh:mm:ss') : ''}
                              </p>
                            </div>
                            <i class="step-line"></i>
                            <div class="date">
                            {this.props.data.founder_document_sign_status_date ? moment(this.props.data.founder_document_sign_status_date).format('DD MMM') : ''}
                            </div>
                          </div>
                      )}
                      {this.props.data.fund_raise_status=='success' && (
                        <div class="steps-container">
                          <div class="content">
                            <h2>Growth91 Admin Fund Transffered</h2>
                            <p>
                            {this.props.data.fund_raise_status_date ? moment(this.props.data.fund_raise_status_date).format('DD MMM, YYYY') : ''}
                            </p>
                          </div>
                          <i class="step-line"></i>
                          <div class="date">
                            {this.props.data.fund_raise_status_date ? moment(this.props.data.fund_raise_status_date).format('DD MMM') : ''}
                          </div>
                        </div>
                        )}
                        {this.props.data.roc_status=='fndr_roc_confirmation' && (
                          <div class="steps-container">
                            <div class="content">
                              <h2>Startup/ROC Confirmation </h2>
                              <p>
                                {this.props.data.roc_status_date ? moment(this.props.data.roc_status_date).format('DD MMM, YYYY') : ''}
                              </p>
                            </div>
                            <i class="step-line"></i>
                            <div class="date">
                            {this.props.data.roc_status_date ? moment(this.props.data.roc_status_date).format('DD MMM') : ''}
                            </div>
                          </div>
                          )}
                      </div>
                    </div>
                  </div>
            </div>
            ): (
              <p style={{textAlign:'center',fontSize:19}}>No data available..</p>
            )}
          </Modal>
        </>
      );
    }

}

export default Dealflow;

