
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';

import $ from 'jquery';
class FundRaiseRegistration extends Component {

constructor(props) {
  super(props);
  this.state = {
    primary_gtm_strategy:'',
    backup_plan_for_strategy:'',
    existing_cas:'',
    expected_cac_in_future:'',
    rational_behinde_any_change_in_cac:'',
    ltv_of_customer:'',
    rational_behind_ltv_number:'',
    ltv_to_cac_ratio:'',
    founder_id:'',
    loading:false,
    valueispresent:false,
    processtype:'',
  }
}

componentDidMount() {
  if(localStorage.getItem('founder_id')) {
    this.setState({founder_id:localStorage.getItem('founder_id')});
    let id = localStorage.getItem('founder_id');
     
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
          primary_gtm_strategy: result.data[0].primary_gtm_strategy,
          backup_plan_for_strategy: result.data[0].backup_plan_for_strategy,
          existing_cas: result.data[0].existing_cas,
          expected_cac_in_future: result.data[0].expected_cac_in_future,
          rational_behinde_any_change_in_cac: result.data[0].rational_behinde_any_change_in_cac,
          ltv_of_customer: result.data[0].ltv_of_customer,
          rational_behind_ltv_number: result.data[0].rational_behind_ltv_number,
          ltv_to_cac_ratio: result.data[0].ltv_to_cac_ratio,
        });
        if(result.data[0].primary_gtm_strategy) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }


updatefounder = () => {

  
  let params={
    primary_gtm_strategy:this.state.primary_gtm_strategy,
    backup_plan_for_strategy:this.state.backup_plan_for_strategy,
    existing_cas:this.state.existing_cas,
    expected_cac_in_future:this.state.expected_cac_in_future,
    rational_behinde_any_change_in_cac:this.state.rational_behinde_any_change_in_cac,
    ltv_of_customer:this.state.ltv_of_customer,
    rational_behind_ltv_number:this.state.rational_behind_ltv_number,
    ltv_to_cac_ratio:this.state.ltv_to_cac_ratio,
    founder_id: this.state.founder_id,
    no:10,
    main_founder_id:localStorage.getItem('founder_id'),
    f10_status:this.state.processtype=='saveandproceed'?'success':'new',
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
        message.success('Go to market details are updated successfully.',6);
      } else {
        message.success('Go to market details are updated successfully.',6);
      }
      // this.props.fatchdata();
    } else {
      message.warning(result.message);
      this.setState({ loading: false });
    }
  });

}

saveandproceed=()=>{
  if(!this.state.primary_gtm_strategy) {
    message.warning('Please enter the value of field primary gtm strategy');
    return;
  } else if(!this.state.backup_plan_for_strategy) {
    message.warning('Please enter the value of field backup plane for strategy.');
    return;
  } else if(!this.state.existing_cas) {
    message.warning('Please enter the value of field existing CAC.');
    return;
  } else if(!this.state.expected_cac_in_future) {
    message.warning('Please enter the value of field expected CAC in future.');
    return;
  } else if(!this.state.rational_behinde_any_change_in_cac) {
    message.warning('Please enter the value of field rational behind any change in CAC');
    return;
  } else if(!this.state.ltv_of_customer) {
    message.warning('Please enter the value of field LTV of customer');
    return;
  } else if(!this.state.rational_behind_ltv_number) {
    message.warning('Please enter the value of field rational behind LTV Number');
    return;
  } else if(!this.state.ltv_to_cac_ratio) {
    message.warning('Please enter the value of field LTV to CAC Ratio');
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

  let active = (this.state.primary_gtm_strategy && this.state.backup_plan_for_strategy && this.state.existing_cas && this.state.expected_cac_in_future && this.state.rational_behinde_any_change_in_cac && this.state.ltv_of_customer && this.state.rational_behind_ltv_number && this.state.ltv_to_cac_ratio && 
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
                        >Go To market</span>
                      </div>
                      <hr/>
                    </div>

                    {((this.props.error=='0') && (
                      !this.state.primary_gtm_strategy ||
                      !this.state.backup_plan_for_strategy ||
                      !this.state.existing_cas ||
                      !this.state.expected_cac_in_future ||
                      !this.state.rational_behinde_any_change_in_cac ||
                      !this.state.ltv_of_customer ||
                      !this.state.rational_behind_ltv_number ||
                      !this.state.ltv_to_cac_ratio
                  )
                    ) &&(
                      <div className='error-div'>
                        <div className='error-icon'>
                          <i className='bx bxs-error'></i>
                        </div>
                        <ul>
                          {!this.state.primary_gtm_strategy &&(
                            <li>
                              <span>Please enter the value of field primary gtm strategy.</span>
                            </li>
                          )}
                          {!this.state.backup_plan_for_strategy &&(
                            <li>
                              <span>Please enter the value of field backup plane for strategy.</span>
                            </li>
                          )}
                          {!this.state.existing_cas &&(
                            <li>
                              <span>Please enter the value of field existing CAC.</span>
                            </li>
                          )}
                          {!this.state.expected_cac_in_future &&(
                            <li>
                              <span>Please enter the value of field expected CAC in future.</span>
                            </li>
                          )}
                          {!this.state.rational_behinde_any_change_in_cac &&(
                            <li>
                              <span>Please enter the value of field rational behind any change in CAC.</span>
                            </li>
                          )}
                          {!this.state.ltv_of_customer &&(
                            <li>
                              <span>Please enter the value of field LTV of customer.</span>
                            </li>
                          )}
                          {!this.state.rational_behind_ltv_number &&(
                            <li>
                              <span>Please enter the value of field rational behind LTV Number.</span>
                            </li>
                          )}
                          {!this.state.ltv_to_cac_ratio &&(
                            <li>
                              <span>Please enter the value of field LTV to CAC Ratio.</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="row" style={{ maxWidth: 900 }}>
                      <div className="col-lg-12">
                          <div className="form-group">
                            <label for="">What is your primary GTM strategy?<span className="text-danger">*</span></label>
                            <textarea 
                              type="text" 
                              id="selected-field"
                              name='tudGtmStratergy'
                              value={this.props.unicorn.tudGtmStratergy}
                              cols={30}
                              rows={6}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                            />
                          </div>
                          <div className="form-group">
                            <label for="">What is your Backup plan for GTM?<span className="text-danger">*</span></label>
                            <textarea 
                              type="text" 
                              name='tudGtmBackup'
                              value={this.props.unicorn.tudGtmBackup}
                              cols={30}
                              rows={6}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                            />
                          </div>
                          <div className="form-group">
                            <label for="">What is your existing CAC?<span className="text-danger">*</span></label>
                            <input  
                              type="text" 
                              name='tudExistingCac'
                              value={this.props.unicorn.tudExistingCac}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                            />
                          </div>
                          <div className="form-group">
                            <label for="">What is your expected CAC in future?<span className="text-danger">*</span></label>
                            <input  
                              type="text" 
                              name='tudExpectedCac'
                              value={this.props.unicorn.tudExpectedCac}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Logic/rationale behind any change in CAC in future?<span className="text-danger">*</span></label>
                            <input  
                              type="text" 
                              name='tudLogicCac'
                              value={this.props.unicorn.tudLogicCac}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                            />
                          </div>
                          <div className="form-group">
                            <label for="">What is your LTV of a customer?<span className="text-danger">*</span></label>
                            <input  
                              type="text" 
                              name='tudLtvCustomer'
                              value={this.props.unicorn.tudLtvCustomer}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                            />
                          </div>
                          <div className="form-group">
                            <label for="">Logic/rationale behind LTV numbers?<span className="text-danger">*</span></label>
                            <input  
                              type="text" 
                              name='tudLogicLtvNumber'
                              value={this.props.unicorn.tudLogicLtvNumber}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                            />
                          </div>
                          <div className="form-group">
                            <label for="">What is your LTV to CAC ratio?<span className="text-danger">*</span></label>
                            <input  
                              type="text" 
                              name='tudLtvCacRatio'
                              value={this.props.unicorn.tudLtvCacRatio}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                            />
                          </div>
                          <div className="form-group  justify-content-between" style={{display:"none !important"}}>
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
