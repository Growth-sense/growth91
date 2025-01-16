
import React, { Component } from 'react';
import { DatePicker, message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';

import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import $ from 'jquery';
 
class FundingDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      have_you_raised_fund_for_startup:'',
      founder_id:'',
      loading:false,
      valueispresent:false,
      processtype:'',
      round_1_date:'',
      round_1_pre_money_validation:'',
      round_1_amount_raised:'',
      round_1_name_of_investor:'',
      round_1_other_specific_details:'',

      round_2_date:'',
      round_2_pre_money_validation:'',
      round_2_amount_raised:'',
      round_2_name_of_investor:'',
      round_2_other_specific_details:'',

      round_3_date:'',
      round_3_pre_money_validation:'',
      round_3_amount_raised:'',
      round_3_name_of_investor:'',
      round_3_other_specific_details:'',

      round_4_date:'',
      round_4_pre_money_validation:'',
      round_4_amount_raised:'',
      round_4_name_of_investor:'',
      round_4_other_specific_details:'',

      any_one_of_previous_investors_during_this_round:'',
      any_one_of_previous_investors_during_this_current_round:'',

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
          have_you_raised_fund_for_startup: result.data[0].have_you_raised_fund_for_startup,
          round_1_date:result.data[0].round_1_date ? moment(result.data[0].round_1_date) : moment(),
          round_1_pre_money_validation:result.data[0].round_1_pre_money_validation,
          round_1_amount_raised:result.data[0].round_1_amount_raised,
          round_1_name_of_investor:result.data[0].round_1_name_of_investor,
          round_1_other_specific_details:result.data[0].round_1_other_specific_details,

          round_2_date:result.data[0].round_2_date ? moment(result.data[0].round_2_date): moment(),
          round_2_pre_money_validation:result.data[0].round_2_pre_money_validation,
          round_2_amount_raised:result.data[0].round_2_amount_raised,
          round_2_name_of_investor:result.data[0].round_2_name_of_investor,
          round_2_other_specific_details:result.data[0].round_2_other_specific_details,

          round_3_date:result.data[0].round_2_date ? moment(result.data[0].round_3_date):moment(),
          round_3_pre_money_validation:result.data[0].round_3_pre_money_validation,
          round_3_amount_raised:result.data[0].round_3_amount_raised,
          round_3_name_of_investor:result.data[0].round_3_name_of_investor,
          round_3_other_specific_details:result.data[0].round_3_other_specific_details,

          round_4_date:result.data[0].round_4_date ? moment(result.data[0].round_4_date) : moment(),
          round_4_pre_money_validation:result.data[0].round_4_pre_money_validation,
          round_4_amount_raised:result.data[0].round_4_amount_raised,
          round_4_name_of_investor:result.data[0].round_4_name_of_investor,
          round_4_other_specific_details:result.data[0].round_4_other_specific_details,

          any_one_of_previous_investors_during_this_round:result.data[0].any_one_of_previous_investors_during_this_round,
          any_one_of_previous_investors_during_this_current_round:result.data[0].any_one_of_previous_investors_during_this_current_round,
        });
        if(result.data[0].have_you_raised_fund_for_startup) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }


   updatefounder = () => {
 if (this.props.adminnext) {
      if (this.state.processtype == "next") {
        this.props.next();
        return;
      } else if (this.state.processtype == "prev") {
        this.props.prev();
        return;
      }
    }
    let data=this.state.have_you_raised_fund_for_startup;
    let params={
      have_you_raised_fund_for_startup:data,
      round_1_date:data=='Yes' ? this.state.round_1_date : '',
      round_1_pre_money_validation:data=='Yes' ? this.state.round_1_pre_money_validation : '',
      round_1_amount_raised:data=='Yes' ? this.state.round_1_amount_raised : '',
      round_1_name_of_investor:data=='Yes' ? this.state.round_1_name_of_investor : '',
      round_1_other_specific_details:data=='Yes' ? this.state.round_1_other_specific_details : '',
      round_2_date:data=='Yes' ? this.state.round_2_date : '',
      round_2_pre_money_validation:data=='Yes' ? this.state.round_2_pre_money_validation : '',
      round_2_amount_raised:data=='Yes' ? this.state.round_2_amount_raised : '',
      round_2_name_of_investor:data=='Yes' ? this.state.round_2_name_of_investor : '',
      round_2_other_specific_details:data=='Yes' ? this.state.round_2_other_specific_details : '',
      round_3_date:data=='Yes' ? this.state.round_3_date : '',
      round_3_pre_money_validation:data=='Yes' ? this.state.round_3_pre_money_validation : '',
      round_3_amount_raised:data=='Yes' ? this.state.round_3_amount_raised : '',
      round_3_name_of_investor:data=='Yes' ? this.state.round_3_name_of_investor : '',
      round_3_other_specific_details:data=='Yes' ? this.state.round_3_other_specific_details : '',
      round_4_date:data=='Yes' ? this.state.round_4_date : '',
      round_4_pre_money_validation:data=='Yes' ? this.state.round_4_pre_money_validation : '',
      round_4_amount_raised:data=='Yes' ? this.state.round_4_amount_raised : '',
      round_4_name_of_investor:data=='Yes' ? this.state.round_4_name_of_investor : '',
      round_4_other_specific_details:data=='Yes' ? this.state.round_4_other_specific_details : '',
      any_one_of_previous_investors_during_this_round:data=='Yes' ? this.state.any_one_of_previous_investors_during_this_round : '',
      any_one_of_previous_investors_during_this_current_round:data=='Yes' ? this.state.any_one_of_previous_investors_during_this_current_round : '',
      founder_id: this.state.founder_id,
      no:14,
      main_founder_id:localStorage.getItem('founder_id'),
      f14_status:this.state.processtype=='saveandproceed'?'success':'new',
    }
    this.setState({ loading: true });
        Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {

      if (result.status == 1) {
        this.setState({ loading: false,valueispresent:true },);
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Funding details are updated successfully.',6);
        } else {
          message.success('Funding details are updated successfully.',6);
        }
        // this.props.fatchdata();
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
 
  }

  changeStatus = (param) => {
    this.setState({
      have_you_raised_fund_for_startup: param,
    });
  }

  saveandproceed=()=>{
    if(!this.state.have_you_raised_fund_for_startup) {
      message.warning('Please enter the value of field have you raise fund of startup.');
      return;
    }
    // this.props.check();
    this.setState({processtype:'saveandproceed'},()=>this.updatefounder());
  }

  save=()=>{
    this.setState({processtype:'save'},()=>this.updatefounder());
  }
 disabledDate= current => {
  // Can not select days before today and today
  return current && current > moment().endOf('day');
};
  next=()=>{
    this.setState({processtype:'next'},()=>this.updatefounder());
  }
  prev=()=>{
    this.setState({processtype:'prev'},()=>this.updatefounder());
  }
  render() {

     let active = (this.state.have_you_raised_fund_for_startup && 
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
                          >Funding Details</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && (
                          !this.state.have_you_raised_fund_for_startup
                      )
                        ) &&(
                          <div className='error-div'>
                            <div className='error-icon'>
                              <i className='bx bxs-error'></i>
                            </div>
                            <ul>
                              {!this.state.have_you_raised_fund_for_startup &&(
                                <li>
                                  <span>Please enter the value of field have you raise fund of startup.</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                        <div className="form-group ">
                                <label for="">Have you raised funds for your Startup previously?<span className="text-danger">*</span></label>
                                <div className='button-grp'> 
                                  <button  
                                  className={this.props.unicorn.tudPreviousFundRaised=='Yes' && 'active'} 
                                  name="tudPreviousFundRaised"
                                  value="Yes"
                                  onClick={(e) =>  {this.props.onInput(e.target.name, e.target.value)}}
                                  >Yes</button>
                                  <button  
                                  name="tudPreviousFundRaised"

                                  className={this.props.unicorn.tudPreviousFundRaised=='No' && 'active'} 
                                  value="No"
                                  onClick={(e) => {this.props.onInput(e.target.name, e.target.value)}}
                                  >No</button>
                                </div>
                            </div>
                          <div>
                          
                          {this.state.tudPreviousFundRaised=='Yes' && (

                          <>
                          <div className="form-group step-form-date-input">
                               <label for="">Round-1 (Date)</label>
                                <DatePicker
                                 value={this.props.unicorn.round_1_date}
                                 onChange={(date,dateString)=>this.setState({round_1_date:date})}
                                 style={{width:'100%',marginBottom:20}}
                                 disabledDate={this.disabledDate}
                                />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 1 (Pre-money valuation)</label>
                                <input  
                                 type="text" 
                                 value={this.props.unicorn.round_1_pre_money_validation}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 1 (Amount raised)</label>
                                <input  
                                 type="number" 
                                 value={this.props.unicorn.round_1_amount_raised}
                                 onWheel={() => document.activeElement.blur()}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 min={0}
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 1 (Name of investors)</label>
                                <input  
                                 type="text" 
                                 value={this.props.unicorn.round_1_name_of_investor}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                  
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 1 (Other specific details)</label>
                                <textarea  
                                 type="text" 
                                 cols={30}
                                 rows={6}
                                 value={this.props.unicorn.round_1_other_specific_details}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group step-form-date-input">
                               <label for="">Round - 2 (Date)</label>
                                <DatePicker
                              
                              value={this.props.unicorn.round_2_date}
                                 onChange={(date,dateString)=>this.setState({round_2_date: date})}
                                  style={{width:'100%',marginBottom:20}}
                                  disabledDate={this.disabledDate}
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 2 (Pre-money valuation)</label>
                                <input  
                                 type="text" 
                                 value={this.props.unicorn.round_2_pre_money_validation}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                  
                                  
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 2 (Amount raised)</label>
                                <input  
                                 type="number" 
                                 onWheel={() => document.activeElement.blur()}
                                 value={this.props.unicorn.round_2_amount_raised}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 2 (Name of investors)</label>
                                <input  
                                 type="text" 
                                 value={this.props.unicorn.round_2_name_of_investor}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 2 (Other specific details)</label>
                                <textarea  
                                 type="text" 
                                 cols={30}
                                 rows={6}
                                 value={this.props.unicorn.round_2_other_specific_details}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group step-form-date-input">
                               <label for="">Round - 3 (Date)</label>
                                <DatePicker
                                  value={this.props.unicorn.round_3_date}
                                 onChange={(date,dateString)=>this.setState({round_3_date: date})}
                               style={{width:'100%',marginBottom:20}}
                               disabledDate={this.disabledDate}
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 3 (Pre-money valuation)</label>
                                <input  
                                 type="text" 
                                 value={this.props.unicorn.round_3_pre_money_validation}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 3 (Amount raised)</label>
                                <input  
                                 type="number" 
                                 onWheel={() => document.activeElement.blur()}
                                 value={this.props.unicorn.round_3_amount_raised}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 3 (Name of investors)</label>
                                <input  
                                 type="text" 
                                 value={this.props.unicorn.round_3_name_of_investor}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 3 (Other specific details)</label>
                                <textarea  
                                 type="text" 
                                 cols={30}
                                 rows={6}
                                 value={this.props.unicorn.round_3_other_specific_details}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group step-form-date-input">
                               <label for="">Round - 4 (Date)</label>
                                <DatePicker
                                  value={this.props.unicorn.round_4_date}
                                 onChange={(date,dateString)=>this.setState({round_4_date: date})}
                                   style={{width:'100%',marginBottom:20}}
                                   disabledDate={this.disabledDate}
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 4 (Pre-money valuation)</label>
                                <input  
                                 type="text" 
                                 value={this.props.unicorn.round_4_pre_money_validation}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                               
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 4 (Amount raised)</label>
                                <input  
                                 type="number" 
                                 onWheel={() => document.activeElement.blur()}
                                 value={this.props.unicorn.round_4_amount_raised}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 4 (Name of investors)</label>
                                <input  
                                 type="text" 
                                 value={this.props.unicorn.round_4_name_of_investor}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Round - 4 (Other specific details)</label>
                                <textarea 
                                 type="text" 
                                 cols={30}
                                 rows={6}
                                 value={this.props.unicorn.round_4_other_specific_details}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Are anyone of previous investors exiting during this round? If Yes, give details including percentage shareholding and reasons.</label>
                                <textarea 
                                 type="text" 
                                 cols={30}
                                 rows={6}
                                 value={this.props.unicorn.any_one_of_previous_investors_during_this_round}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            <div className="form-group ">
                               <label for="">Are anyone of previous investors investing in current round? If yes give details of commitments.</label>
                                <textarea  
                                 type="text" 
                                 cols={30}
                                 rows={6}
                                 value={this.props.unicorn.any_one_of_previous_investors_during_this_current_round}
                                    onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                                 />
                            </div>
                            </>
                          )}
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
                                  background: '#fff',
                                  border: '1px solid #29176f',
                                  color: '#29176f',
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

export default FundingDetails;
