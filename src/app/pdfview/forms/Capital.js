
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';

import $ from 'jquery';
class FundRaiseRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorized_captial_of_company:'',
      paid_up_capital_company:'',
      percentage_holding_by_founders:'',
      percentage_holding_by_core_team:'',
      reserved_for_esop:'',
      percentage_holding_of_others:'',
      actual_amount_real_salaries_taken:'',
      usecure_loans_received_from_founders:'',
      usecure_loans_received_from_other:'',
      any_other_secured_or_ddebt_from_bank:'',  
      founder_id:'',
      loading:false,
      valueispresent:false,
      processtype:'',
    }
  }

  componentDidMount() {
    if (this.props.id) {
      let id = this.props.id;
     
    }
    $('#selected-field').focus();
    this.props.check();
  }

  getData = (id) => {
   let params = {
      founder_id: this.props.id
    }
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          authorized_captial_of_company: result.data[0].authorized_captial_of_company,
          paid_up_capital_company: result.data[0].paid_up_capital_company,
          percentage_holding_by_founders: result.data[0].percentage_holding_by_founders,
          percentage_holding_by_core_team: result.data[0].percentage_holding_by_core_team,
          reserved_for_esop: result.data[0].reserved_for_esop,
          percentage_holding_of_others: result.data[0].percentage_holding_of_others,
          actual_amount_real_salaries_taken: result.data[0].actual_amount_real_salaries_taken,
          usecure_loans_received_from_founders: result.data[0].usecure_loans_received_from_founders,
          usecure_loans_received_from_other: result.data[0].usecure_loans_received_from_other,
          any_other_secured_or_ddebt_from_bank: result.data[0]. any_other_secured_or_ddebt_from_bank,
        });
        if(result.data[0].authorized_captial_of_company) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }

  updatefounder = () => {
    let params={
      authorized_captial_of_company: this.state.authorized_captial_of_company,
      paid_up_capital_company: this.state.paid_up_capital_company,
      percentage_holding_by_core_team: this.state.percentage_holding_by_core_team,
      percentage_holding_by_founders:this.state.percentage_holding_by_founders,
      reserved_for_esop: this.state.reserved_for_esop,
      percentage_holding_of_others: this.state.percentage_holding_of_others,
      actual_amount_real_salaries_taken: this.state.actual_amount_real_salaries_taken,
      usecure_loans_received_from_founders: this.state.usecure_loans_received_from_founders,
      usecure_loans_received_from_other: this.state.usecure_loans_received_from_other,
      any_other_secured_or_ddebt_from_bank: this.state.any_other_secured_or_ddebt_from_bank,
      founder_id: this.state.founder_id,
      no:12,
      main_founder_id:localStorage.getItem('founder_id'),
      f12_status:this.state.processtype=='saveandproceed'?'success':'new',
    }
    this.setState({ loading: true });
    Bridge.founder.updatefounder(params).then((result) => {
      if (result.status == 1) {
        this.setState({ loading: false,valueispresent:true },() => this.getData(this.state.founder_id));
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Capital details are updated successfully.',6);
        } else {
          message.success('Capital details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
 
  }

  saveandproceed=()=>{
    if(!this.state.authorized_captial_of_company) {
      message.warning('Please enter the value of field authorized capital of company.');
      return;
    } else if(!this.state.paid_up_capital_company) {
      message.warning('Please enter the value of field paid up capital of company.');
      return;
    } else if(!this.state.percentage_holding_by_core_team) {
      message.warning('Please enter the value of field Percentage holding by Core Team Member');
      return;
    } 
    else if(!this.state.percentage_holding_by_founders) {
      message.warning('Please enter the value of field Percentage holding by founders.');
      return;
    }
    else if(!this.state.reserved_for_esop) {
      message.warning('Please enter the value of field Percentage reserved for ESOP.');
      return;
    } else if(!this.state.percentage_holding_of_others) {
      message.warning('Please enter the value of field Percentage holding of others.');
      return;
    } else if(!this.state.actual_amount_real_salaries_taken) {
      message.warning('Please enter the value of field Actual amount (real cash, less salaries taken).');
      return;
    }else if(!this.state.usecure_loans_received_from_founders) {
      message.warning('Please enter the value of field Unsecured loans received from founders.');
      return;
    }else if(!this.state.usecure_loans_received_from_other) {
      message.warning('Please enter the value of field Unsecured loans received from others.');
      return;
    }else if(!this.state.any_other_secured_or_ddebt_from_bank) {
      message.warning('Please enter the value of field Any other secured or unsecured debt from bank.');
      return;
    }
    // this.props.check();
    this.setState({processtype:'saveandproceed'},()=>this.updatefounder());    
  }

  save=()=>{
    this.setState({processtype:'save'},()=>this.updatefounder());
  }
  next=()=>{
    this.setState({processtype:'next'},()=>this.updatefounder());
  }
  prev=()=>{
    this.setState({processtype:'prev'},()=>this.updatefounder());
  }
  render() {

    let active = (this.state.authorized_captial_of_company && this.state.paid_up_capital_company && this.state.percentage_holding_by_founders && this.state.percentage_holding_by_core_team && this.state.reserved_for_esop && this.state.percentage_holding_of_others && this.state.actual_amount_real_salaries_taken && this.state.usecure_loans_received_from_founders && this.state.usecure_loans_received_from_other && this.state.any_other_secured_or_ddebt_from_bank && 
        this.state.valueispresent==true) ? false : true;
   
    return (
      <div>
         <section className="StepForm-section" style={{display:"block"}}>
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      
                      <div className="line-seperator">
                        <div style={{
                          position: 'absolute',
                          top: -10,
                          background: '#fff',
                          paddingRight: 16,
                        }}>
                          <span
                          style={{
                            background: '#fff',
                            width: 119,
                            height: 20,
                            zIndex: 4,
                            position: 'relative',
                            paddingRight: 10,
                          }}
                          >Capital</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && (
                        !this.state.authorized_captial_of_company ||
                        !this.state.paid_up_capital_company ||
                        !this.state.percentage_holding_by_founders||
                        !this.state.percentage_holding_by_core_team ||
                        !this.state.reserved_for_esop ||
                        !this.state.percentage_holding_of_others ||
                        !this.state.actual_amount_real_salaries_taken ||
                        !this.state.usecure_loans_received_from_founders ||
                        !this.state.usecure_loans_received_from_other ||
                        !this.state.any_other_secured_or_ddebt_from_bank
                    )
                      ) &&(
                        <div className='error-div'>
                          <div className='error-icon'>
                            <i className='bx bxs-error'></i>
                          </div>
                          <ul>
                            {!this.state.authorized_captial_of_company &&(
                              <li>
                                <span>Please enter the value of field authorized capital of company.</span>
                              </li>
                            )}
                            {!this.state.paid_up_capital_company &&(
                              <li>
                                <span>Please enter the value of field paid up capital of company.</span>
                              </li>
                            )}
                            {!this.state.percentage_holding_by_core_team &&(
                              <li>
                                <span>Please enter the value of field Percentage holding by Core Team Member.</span>
                              </li>
                            )}
                            {!this.state.percentage_holding_by_founders&&(
                              <li>
                                <span>Please enter the value of field Percentage holding by Founders.</span>
                              </li>
                            )}
                            {!this.state.reserved_for_esop &&(
                              <li>
                                <span>Please enter the value of field Percentage reserved for ESOP.</span>
                              </li>
                            )}
                            {!this.state.percentage_holding_of_others &&(
                              <li>
                                <span>Please enter the value of field Percentage holding of others.</span>
                              </li>
                            )}
                            {!this.state.actual_amount_real_salaries_taken &&(
                              <li>
                                <span>Please enter the value of field Actual amount (real cash, less salaries taken).</span>
                              </li>
                            )}
                            {!this.state.usecure_loans_received_from_founders &&(
                              <li>
                                <span>Please enter the value of field Unsecured loans received from founders.</span>
                              </li>
                            )}
                            {!this.state.usecure_loans_received_from_other &&(
                              <li>
                                <span>Please enter the value of field Unsecured loans received from others.</span>
                              </li>
                            )}
                            {!this.state.any_other_secured_or_ddebt_from_bank &&(
                              <li>
                                <span>Please enter the value of field Any other secured or unsecured debt from bank.</span>
                              </li>
                            )}

                          </ul>
                        </div>
                      )}

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">Authorized capital of the company as on date<span className="text-danger">*</span></label>
                              <input  
                                type="text" 
                                id="selected-field"
                                name='authorized_captial_of_company'
                                value={this.state.authorized_captial_of_company}
                                onChange={(e) => this.setState({authorized_captial_of_company: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Paid-up capital of the company as on date<span className="text-danger">*</span></label>
                              <input  
                                type="text" 
                                name='paid_up_capital_company'
                                value={this.state.paid_up_capital_company}
                                onChange={(e) => this.setState({paid_up_capital_company: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Percentage holding by founders.<span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                name='percentage_holding_by_founders'
                                value={this.state.percentage_holding_by_founders}
                                onChange={(e) => this.setState({percentage_holding_by_founders: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Percentage holding by other core team members.<span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                name='percentage_holding_by_core_team'
                                onWheel={() => document.activeElement.blur()}
                                value={this.state.percentage_holding_by_core_team}
                                onChange={(e) => this.setState({percentage_holding_by_core_team: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Percentage reserved for ESOP.<span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='reserved_for_esop'
                                value={this.state.reserved_for_esop}
                                onChange={(e) => this.setState({reserved_for_esop: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Percentage holding of others (holding 1% and above)<span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='percentage_holding_of_others'
                                value={this.state.percentage_holding_of_others}
                                onChange={(e) => this.setState({percentage_holding_of_others: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Actual amount (real cash, less salaries taken) invested by the founders?<span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='actual_amount_real_salaries_taken'
                                value={this.state.actual_amount_real_salaries_taken}
                                onChange={(e) => this.setState({actual_amount_real_salaries_taken: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Unsecured loans received from founders? (Amount and term of repayment)<span className="text-danger">*</span></label>
                              <input  
                                type="text" 
                                name='usecure_loans_received_from_founders'
                                value={this.state.usecure_loans_received_from_founders}
                                onChange={(e) => this.setState({usecure_loans_received_from_founders: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Unsecured loans received from others? (Amount and terms of repayment)<span className="text-danger">*</span></label>
                              <input  
                                type="text" 
                                name='usecure_loans_received_from_other'
                                value={this.state.usecure_loans_received_from_other}
                                onChange={(e) => this.setState({usecure_loans_received_from_other: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Any other secured or unsecured debt from bank or any others entity.<span className="text-danger">*</span></label>
                              <input  
                                type="text" 
                                name='any_other_secured_or_ddebt_from_bank'
                                value={this.state.any_other_secured_or_ddebt_from_bank}
                                onChange={(e) => this.setState({any_other_secured_or_ddebt_from_bank: e.target.value}) }
                              />
                            </div>
 
                            <div className="form-group d-none justify-content-between" style={{display:"none !important"}}>
                              <div className='arrow-buttons'>
                                <button 
                                style={{ 
                                  position:'relative',
                                  left:-20,
                                  background: '#fff',
                                  border: '1px solid #29176f',
                                  color: '#29176f',
                                }} 
                                onClick={this.prev}
                                class="submit-button"><i className='bx bx-chevron-left'></i></button>
                                <button 
                                style={{ 
                                  position:'relative',
                                  left:-20,
                                  background: active==false ? '#fff' : '#fff',
                                  border: active==false ? '1px solid #29176f' : '1px solid #29176f',
                                  color: active==false ? '#29176f' : '#29176f',
                                }} 
                                // ={active}
                                onClick={this.next}
                                class="submit-button">
                                  <i className='bx bx-chevron-right'></i>
                                </button>
                              </div>
                              <div>
                              
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </Spin>
          </section>
       </div>
    )
  }
}

export default FundRaiseRegistration;
