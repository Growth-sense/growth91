 
import React, { Component } from 'react';
import { message, Spin, DatePicker } from 'antd';
import Bridge from '../../../constants/Bridge';

import moment from 'moment';
import $ from 'jquery';
class Compliances extends Component {

  constructor(props) {
    super(props);
    this.state = {
      are_you_registered_for_gst:'',
      status_of_gst_compliance:'',
      date_of_last_audited_balance_sheet:'',
      date_of_filling_last_itr:'',
      date_of_last_agm:'',
      pending_complience_related_to_roc:'',
      past_days:'',
      list_of_other_situatory:'',
      email_and_mobile_of_ca:'',
      email_and_mobile_of_cs:'',
      name_email_and_mobile_of_any_other:'',
      founder_id:'',
      loading:false,
      valueispresent:false,
      processtype:'',
    }
  }

  componentDidMount() {
   if (this.props.id) {
      let id = this.props.id;
      this.getData(id);
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
          are_you_registered_for_gst: result.data[0].are_you_registered_for_gst,
          status_of_gst_compliance: result.data[0].status_of_gst_compliance,
          date_of_last_audited_balance_sheet: result.data[0].date_of_last_audited_balance_sheet ? moment(result.data[0].date_of_last_audited_balance_sheet) : '',
          date_of_filling_last_itr: result.data[0].date_of_filling_last_itr ? moment(result.data[0].date_of_filling_last_itr) : '',
          date_of_last_agm: result.data[0].date_of_last_agm ? moment(result.data[0].date_of_last_agm) : '',
          pending_complience_related_to_roc: result.data[0].pending_complience_related_to_roc,
          past_days: result.data[0].past_days,
          list_of_other_situatory: result.data[0].list_of_other_situatory,
          email_and_mobile_of_ca: result.data[0].email_and_mobile_of_ca,
          email_and_mobile_of_cs: result.data[0].email_and_mobile_of_cs,
          name_email_and_mobile_of_any_other: result.data[0].name_email_and_mobile_of_any_other,
        });
        if(result.data[0].are_you_registered_for_gst) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }

  updatefounder = () => {
    let {
      are_you_registered_for_gst,
      status_of_gst_compliance,
      date_of_last_audited_balance_sheet,
      date_of_filling_last_itr,
      date_of_last_agm,
      pending_complience_related_to_roc,
      past_days,
      list_of_other_situatory,
      email_and_mobile_of_ca,
      email_and_mobile_of_cs,
      name_email_and_mobile_of_any_other,
    } = this.state;

    
    let params={
      are_you_registered_for_gst:this.state.are_you_registered_for_gst,
      status_of_gst_compliance:this.state.status_of_gst_compliance,
      date_of_last_audited_balance_sheet:this.state.date_of_last_audited_balance_sheet,
      date_of_filling_last_itr:this.state.date_of_filling_last_itr,
      date_of_last_agm:this.state.date_of_last_agm,
      pending_complience_related_to_roc:this.state.pending_complience_related_to_roc,
      past_days:this.state.past_days,
      list_of_other_situatory:this.state.list_of_other_situatory,
      email_and_mobile_of_ca:this.state.email_and_mobile_of_ca,
      email_and_mobile_of_cs:this.state.email_and_mobile_of_cs,
      name_email_and_mobile_of_any_other:this.state.name_email_and_mobile_of_any_other,
      founder_id: this.state.founder_id,
      no:16,
      main_founder_id:localStorage.getItem('founder_id'),
      f16_status:this.state.processtype=='saveandproceed'?'success':'new',
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
          message.success('Compliences details are updated successfully.',6);
        } else {
          message.success('Compliences details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
 
  }

  changeStatus = (params) => {
    this.setState({
      are_you_registered_for_gst:params
    });
  }

  saveandproceed=()=>{
    if(!this.state.are_you_registered_for_gst) {
      message.warning('Please enter value of field Are you registered for GST');
      return;
    } else if(!this.state.status_of_gst_compliance) {
      message.warning('Please enter value of field Give detailed status of GST Compliance');
      return;
    }  else if(!this.state.date_of_last_audited_balance_sheet) {
      message.warning('Please enter value of field Date of audited balance sheet');
      return;
    }  else if(!this.state.date_of_filling_last_itr) {
      message.warning('Please enter value of field Date of filling last ITR');
      return;
    }  else if(!this.state.date_of_last_agm) {
      message.warning('Please enter value of field Date of last AGM');
      return;
    } else if(!this.state.pending_complience_related_to_roc) {
      message.warning('Please enter value of field Any pending compliance related to ROC..');
      return;
    } else if(!this.state.past_days) {
      message.warning('Please enter value of field Any past delays.');
      return;
    } else if(!this.state.list_of_other_situatory) {
      message.warning('Please enter value of field Give list of other statutory compliance applicable.');
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

        let active = (this.state.are_you_registered_for_gst &&
      this.state.status_of_gst_compliance &&
      this.state.date_of_last_audited_balance_sheet &&
      this.state.date_of_filling_last_itr &&
      this.state.date_of_last_agm &&
      this.state.pending_complience_related_to_roc &&
      this.state.past_days &&
      this.state.list_of_other_situatory &&
      this.state.email_and_mobile_of_ca &&
      this.state.email_and_mobile_of_cs &&
      this.state.name_email_and_mobile_of_any_other &&
        this.state.valueispresent==true) ? false : true;

    return (
      <div>
         <section className="StepForm-section">
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
                            position: 'absolute',
                            paddingRight: 10,
                          }}
                          >Compliances</span>
                        </div>
                        <hr/>
                      </div>

                      {((this.props.error=='0') && (
    !this.state.are_you_registered_for_gst ||
    !this.state.status_of_gst_compliance ||
    !this.state.date_of_last_audited_balance_sheet ||
    !this.state.date_of_filling_last_itr ||
    !this.state.date_of_last_agm ||
    !this.state.pending_complience_related_to_roc ||
    !this.state.past_days ||
    !this.state.list_of_other_situatory
)
  ) &&(
    <div className='error-div'>
      <div className='error-icon'>
        <i className='bx bxs-error'></i>
      </div>
      <ul>
        {!this.state.are_you_registered_for_gst &&(
          <li>
            <span>Please enter value of field Are you registered for GST.</span>
          </li>
        )}
        {!this.state.status_of_gst_compliance && (
            <li>
                <span>Please enter value of field Give detailed status of GST Compliance.</span>
            </li>
        )}
        {!this.state.date_of_last_audited_balance_sheet && (
            <li>
                <span>Please enter value of field Date of audited balance sheet.</span>
            </li>
        )}
        {!this.state.date_of_filling_last_itr && (
            <li>
                <span>Please enter value of field Date of filling last ITR.</span>
            </li>
        )}
        {!this.state.date_of_last_agm && (
            <li>
                <span>Please enter value of field Date of last AGM.</span>
            </li>
        )}
        {!this.state.pending_complience_related_to_roc && (
            <li>
                <span>Please enter value of field Any pending compliance related to ROC.</span>
            </li>
        )}
        {!this.state.past_days && (
            <li>
                <span>Please enter value of field Any past delays.</span>
            </li>
        )}
        {!this.state.list_of_other_situatory && (
            <li>
                <span>Please enter value of field Give list of other statutory compliance applicable.</span>
            </li>
        )}
      </ul>
    </div>
  )}

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                          
                      <div className="form-group ">
                                <label for="">Are you registered for GST?<span className="text-danger">*</span></label>
                                <div className='button-grp'> 
                                  <button disabled 
                                  className={this.state.are_you_registered_for_gst=='Yes' && 'active'} 
                                  onClick={() => this.changeStatus('Yes')}
                                  >Yes</button>
                                  <button disabled 
                                  className={this.state.are_you_registered_for_gst=='No' && 'active'} 
                                  onClick={() => this.changeStatus('No')}
                                  >No</button>
                                </div>
                            </div>
                            
                            <div className="form-group">
                              <label for="">Give detailed status of GST Compliance<span className="text-danger">*</span></label>
                              <textarea disabled  
                                id="" cols="30" rows="6"
                                name='status_of_gst_compliance'
                                value={this.state.status_of_gst_compliance}
                                onChange={(e) => this.setState({status_of_gst_compliance: e.target.value}) }
                              ></textarea>
                            </div>
                        <div className="form-group step-form-date-input">
                              <label for="">Date of audited balance sheet<span className="text-danger">*</span></label>
                             
                              <DatePicker
                                value={this.state.date_of_last_audited_balance_sheet}
                                onChange={(date, dateString) => {
                                  this.setState({ date_of_last_audited_balance_sheet:date }) 
                                }}
                                disabledDate={this.disabledDate}
                                format={'DD-MM-YYYY'}
                                style={{
                                  width:'100%', 
                                  marginBottom:30,
                                }}
                              />
                            </div>                           
                            <div className="form-group step-form-date-input">
                              <label for="">Date of filling last ITR<span className="text-danger">*</span></label>
                              
                              <DatePicker
                                value={this.state.date_of_filling_last_itr}
                                onChange={(date, dateString) => {
                                  this.setState({ date_of_filling_last_itr:date }) 
                                }}
                                disabledDate={this.disabledDate}
                                format={'DD-MM-YYYY'}
                                style={{
                                  width:'100%', 
                                  marginBottom:30,
                                }}
                              />
                            </div>    
                            <div className="form-group step-form-date-input">
                              <label for="">Date of last AGM<span className="text-danger">*</span></label>
                             
                              <DatePicker
                                value={this.state.date_of_last_agm}
                                onChange={(date, dateString) => {
                                  this.setState({ date_of_last_agm:date }) 
                                }}
                                disabledDate={this.disabledDate}
                                format={'DD-MM-YYYY'}
                                style={{
                                  width:'100%', 
                                  marginBottom:30,
                                }}
                              />
                            </div> 
                            <div className="form-group">
                              <label for="">Any pending compliance related to ROC.<span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='pending_complience_related_to_roc'
                                value={this.state.pending_complience_related_to_roc}
                                onChange={(e) => this.setState({pending_complience_related_to_roc: e.target.value}) }
                              />
                            </div>                           
                            <div className="form-group">
                              <label for="">Any past delays (which are in compliance now) in compliance and reasons reason for the same )<span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='past_days'
                                value={this.state.past_days}
                                onChange={(e) => this.setState({past_days: e.target.value}) }
                              />
                            </div>       
                            <div className="form-group">
                              <label for="">Give list of other statutory compliance applicable<span className="text-danger">*</span></label>
                              <textarea disabled  
                                id="" cols="30" rows="6"
                                name='list_of_other_situatory'
                                value={this.state.list_of_other_situatory}
                                onChange={(e) => this.setState({list_of_other_situatory: e.target.value}) }
                              ></textarea>
                            </div>                   
                            <div className="form-group">
                              <label for="">Name, email and mobile number of CA </label>
                              <textarea disabled  
                                id="" cols="30" rows="6"
                                name='email_and_mobile_of_ca'
                                value={this.state.email_and_mobile_of_ca}
                                onChange={(e) => this.setState({email_and_mobile_of_ca: e.target.value}) }
                              ></textarea>
                            </div>  
                            <div className="form-group">
                              <label for="">Name, email and mobile number of CS </label>
                              <textarea disabled  
                                id="" cols="30" rows="6"
                                name='email_and_mobile_of_cs'
                                value={this.state.email_and_mobile_of_cs}
                                onChange={(e) => this.setState({email_and_mobile_of_cs: e.target.value}) }
                              ></textarea>
                            </div>  
                            <div className="form-group">
                              <label for="">Name, email and mobile number of any other tax,legal or statutory consultants.</label>
                              <textarea disabled  
                                id="" cols="30" rows="6"
                                name='name_email_and_mobile_of_any_other'
                                value={this.state.name_email_and_mobile_of_any_other}
                                onChange={(e) => this.setState({name_email_and_mobile_of_any_other: e.target.value}) }
                              ></textarea>
                            </div>  

                           <div className="form-group d-flex justify-content-between">
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

export default Compliances;
