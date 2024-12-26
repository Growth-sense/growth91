import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';

import $ from 'jquery';
class OtherImportantIndicators extends Component {

  constructor(props) {
    super(props);
    this.state = {
      what_valuation_will_safe:'',
      dependence_on_any_specific_founder:'',
      regulartory_issues:'',
      licences_and_permissions:'',
      team_size:'',
      is_company_paying_commision_above_5_per:'',
      is_company_paying_commision_above_10_per:'',
      possible_exit_opportunities:'',
      subsidiaries:'',
      sister_concerns:'',
      related_party_transactions:'',
      legal_risk_plan_to_migrate:'',
      amy_change_by_founders:'',
      demo_video_link:'',
      supported_documents:'',
      media_coverage:'',
      awards_and_recognitions:'',
      recognized_as_startup_by_dpiit:'',
      any_specific_information_to_share:'',
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
          what_valuation_will_safe: result.data[0].what_valuation_will_safe,
          dependence_on_any_specific_founder: result.data[0].dependence_on_any_specific_founder,
          regulartory_issues: result.data[0].regulartory_issues,
          licences_and_permissions: result.data[0].licences_and_permissions,
          team_size: result.data[0].team_size,
          is_company_paying_commision_above_5_per: result.data[0].is_company_paying_commision_above_5_per,
          is_company_paying_commision_above_10_per: result.data[0].is_company_paying_commision_above_10_per,
          possible_exit_opportunities: result.data[0].possible_exit_opportunities,
          subsidiaries: result.data[0].subsidiaries,
          sister_concerns: result.data[0].sister_concerns,
          related_party_transactions: result.data[0].related_party_transactions,
          legal_risk_plan_to_migrate: result.data[0].legal_risk_plan_to_migrate,
          amy_change_by_founders: result.data[0].amy_change_by_founders,
          demo_video_link: result.data[0].demo_video_link,
          supported_documents: result.data[0].supported_documents,
          media_coverage: result.data[0].media_coverage,
          awards_and_recognitions: result.data[0].awards_and_recognitions,
          recognized_as_startup_by_dpiit: result.data[0].recognized_as_startup_by_dpiit,
          any_specific_information_to_share: result.data[0].any_specific_information_to_share,
        });
        if(result.data[0].what_valuation_will_safe) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }
  
  updatefounder = () => {
  
   
    let params={
      what_valuation_will_safe:this.state.what_valuation_will_safe,
      dependence_on_any_specific_founder:this.state.dependence_on_any_specific_founder,
      regulartory_issues:this.state.regulartory_issues,
      licences_and_permissions:this.state.licences_and_permissions,
      team_size:this.state.team_size,
      is_company_paying_commision_above_5_per:this.state.is_company_paying_commision_above_5_per,
      is_company_paying_commision_above_10_per:this.state.is_company_paying_commision_above_10_per,
      possible_exit_opportunities:this.state.possible_exit_opportunities,
      subsidiaries:this.state.subsidiaries,
      sister_concerns:this.state.sister_concerns,
      related_party_transactions:this.state.related_party_transactions,
      legal_risk_plan_to_migrate:this.state.legal_risk_plan_to_migrate,
      amy_change_by_founders:this.state.amy_change_by_founders,
      demo_video_link:this.state.demo_video_link,
      supported_documents:this.state.supported_documents,
      media_coverage:this.state.media_coverage,
      awards_and_recognitions:this.state.awards_and_recognitions,
      recognized_as_startup_by_dpiit:this.state.recognized_as_startup_by_dpiit,
      any_specific_information_to_share:this.state.any_specific_information_to_share,
      founder_id: this.state.founder_id,
      no:17,
      main_founder_id:localStorage.getItem('founder_id'),
      f17_status:this.state.processtype=='saveandproceed'?'success':'new',
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
          message.success('Other important indicators details are updated successfully.',6);
        } else {
          message.success('Other important indicators details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  }

  saveandproceed=()=>{
    if(!this.state.what_valuation_will_safe) {
      message.warning('Please enter the value of field what valuation/stage; you will sale.');
      return;
    }  else if(!this.state.dependence_on_any_specific_founder) {
      message.warning('Please enter the value of field Dependence on any specific Founder/Person.');
      return;
    }  else if(!this.state.regulartory_issues) {
      message.warning('Please enter the value of field Regulatory Issues.');
      return;
    }   else if(!this.state.licences_and_permissions) {
      message.warning('Please enter the value of field Licenses and permissions required.');
      return;
    }  else if(!this.state.team_size) {
      message.warning('Please enter the value of field Team size.');
      return;
    } else if(!this.state.is_company_paying_commision_above_5_per) {
      message.warning('Please enter the value of field Is the company paying (or paid in past) commission above 5%.');
      return;
    } else if(!this.state.is_company_paying_commision_above_10_per) {
      message.warning('Please enter the value of field Is the company paying (or paid in past) commission above 10%.');
      return;
    } else if(!this.state.possible_exit_opportunities) {
      message.warning('Please enter the value of field What are possible / perceived exit opportunities.');
      return;
    }  else if(!this.state.subsidiaries) {
      message.warning('Please enter the value of field Subsidiaries.');
      return;
    }  else if(!this.state.sister_concerns) {
      message.warning('Please enter the value of field Sister Concerns.');
      return;
    } else if(!this.state.related_party_transactions) {
      message.warning('Please enter the value of field Related party transactions (existing and proposed ).');
      return;
    } else if(!this.state.legal_risk_plan_to_migrate) {
      message.warning('Please enter the value of field Legal risks? Plans to mitigate risk.');
      return;
    } else if(!this.state.amy_change_by_founders) {
      message.warning('Please enter the value of field Any change/exit by founders earlier.');
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

     let active = (this.state.what_valuation_will_safe &&
    this.state.dependence_on_any_specific_founder &&
    this.state.regulartory_issues &&
    this.state.licences_and_permissions &&
    this.state.team_size &&
    this.state.is_company_paying_commision_above_5_per &&
    this.state.is_company_paying_commision_above_10_per &&
    this.state.possible_exit_opportunities &&
    this.state.subsidiaries &&
    this.state.sister_concerns &&
    this.state.related_party_transactions &&
    this.state.legal_risk_plan_to_migrate &&
    this.state.amy_change_by_founders &&
    // this.state.demo_video_link &&
    // this.state.supported_documents &&
    // this.state.media_coverage &&
    // this.state.awards_and_recognitions &&
    // this.state.recognized_as_startup_by_dpiit &&
    // this.state.any_specific_information_to_share &&
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
                            width: 226,
                            height: 20,
                            zIndex: 4,
                            position: 'absolute',
                            paddingRight: 10,
                          }}
                          >Other Important indicators</span>
                        </div>
                        <hr/>
                      </div>

                      
{((this.props.error=='0') && (
    !this.state.what_valuation_will_safe ||
    !this.state.dependence_on_any_specific_founder ||
    !this.state.regulartory_issues ||
    !this.state.licences_and_permissions ||
    !this.state.team_size ||
    !this.state.is_company_paying_commision_above_5_per ||
    !this.state.is_company_paying_commision_above_10_per ||
    !this.state.possible_exit_opportunities ||
    !this.state.subsidiaries ||
    !this.state.sister_concerns ||
    !this.state.related_party_transactions ||
    !this.state.legal_risk_plan_to_migrate ||
    !this.state.amy_change_by_founders ||
    {/* !this.state.demo_video_link ||
    !this.state.supported_documents ||
    !this.state.media_coverage ||
    !this.state.awards_and_recognitions ||
    !this.state.recognized_as_startup_by_dpiit ||
    !this.state.any_specific_information_to_share  */}
)
  ) &&(
    <div className='error-div'>
      <div className='error-icon'>
        <i className='bx bxs-error'></i>
      </div>
      <ul>
        {!this.state.what_valuation_will_safe && (
            <li>
                <span>Please enter the value of field what valuation/stage; you will sale.</span>
            </li>
        )}
        {!this.state.dependence_on_any_specific_founder && (
            <li>
                <span>Please enter the value of field Dependence on any specific Founder/person.</span>
            </li>
        )}
        {!this.state.regulartory_issues && (
            <li>
                <span>Please enter the value of field Regulatory Issues.</span>
            </li>
        )}
        {!this.state.licences_and_permissions && (
            <li>
                <span>Please enter the value of field Licenses and permissions required.</span>
            </li>
        )}
        {!this.state.team_size && (
            <li>
                <span>Please enter the value of field Team size.</span>
            </li>
        )}
        {!this.state.is_company_paying_commision_above_5_per && (
            <li>
                <span>Please enter the value of field Is the company paying (or paid in past) commission above 5%.</span>
            </li>
        )}
        {!this.state.is_company_paying_commision_above_10_per && (
            <li>
                <span>Please enter the value of field Is the company paying (or paid in past) commission above 10%.</span>
            </li>
        )}
        {!this.state.possible_exit_opportunities && (
            <li>
                <span>Please enter the value of field What are possible / perceived exit opportunities.</span>
            </li>
        )}
        {!this.state.subsidiaries && (
            <li>
                <span>Please enter the value of field Subsidiaries.</span>
            </li>
        )}
        {!this.state.sister_concerns && (
            <li>
                <span>Please enter the value of field Sister Concerns.</span>
            </li>
        )}
        {!this.state.related_party_transactions && (
            <li>
                <span>Please enter the value of field Related party transactions (existing and proposed ).</span>
            </li>
        )}
        {!this.state.legal_risk_plan_to_migrate && (
            <li>
                <span>Please enter the value of field Legal risks? Plans to mitigate risk.</span>
            </li>
        )}
        {!this.state.amy_change_by_founders && (
            <li>
                <span>Please enter the value of field Any change/exit by founders earlier.</span>
            </li>
        )}
        {/* {!this.state.demo_video_link && (
            <li>
                <span>Please enter the value of field Demo video (Link).</span>
            </li>
        )}
        {!this.state.supported_documents && (
            <li>
                <span>Please enter the value of field Any other supported documents(links).</span>
            </li>
        )}
        {!this.state.media_coverage && (
            <li>
                <span>Please enter the value of field Media coverage (links).</span>
            </li>
        )}
        {!this.state.awards_and_recognitions && (
            <li>
                <span>Please enter the value of field Awards and Recognitions.</span>
            </li>
        )}
        {!this.state.recognized_as_startup_by_dpiit && (
            <li>
                <span>Please enter the value of field Are you recognized as Startup by DPIIT.</span>
            </li>
        )}
        {!this.state.any_specific_information_to_share && (
            <li>
                <span>Please enter the value of field Any other specific information you like to share.</span>
            </li>
        )} */}
      </ul>
    </div>
  )}


                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">At what valuation/stage; you will sale and exit the business?<span className="text-danger">*</span></label>
                              <textarea 
                                 cols="30" rows="6"
                                id="selected-field"
                                  name='tudSaleExitInfo'
                                value={this.props.unicorn.tudSaleExitInfo}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                        <div className="form-group">
                              <label for="">Dependence on any specific Founder/Person? How it will be managed?<span className="text-danger">*</span></label>
                              <textarea  
                                cols={30} rows={6}
                                name='tudDepedencyPerson'
                                value={this.props.unicorn.tudDepedencyPerson}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>                           
                            <div className="form-group">
                              <label for="">Regulatory Issues.<span className="text-danger">*</span></label>
                              <textarea  
                               cols={30} rows={6}
                                name='tudReglarityIssue'
                                value={this.props.unicorn.tudReglarityIssue}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>    
                            <div className="form-group">
                              <label for="">Licences and permissions required and status.<span className="text-danger">*</span></label>
                              <textarea  
                               cols={30} rows={6}
                                name='tudLicPermissionStatus'
                                value={this.props.unicorn.tudLicPermissionStatus}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div> 
                            <div className="form-group">
                              <label for="">Team size (past, current and immediate future).<span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='tudTeamSize'
                                value={this.props.unicorn.tudTeamSize}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>                           
                            <div className="form-group">
                              <label for=""> Is the company paying (or paid in past) commission above 5% to any investment banker or funding platform? if yes, details?<span className="text-danger">*</span></label>
                              <textarea 
                                rows={6} cols={30}
                                name='tud5perCommission'
                                value={this.props.unicorn.tud5perCommission}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div> 
                            <div className="form-group">
                              <label for=""> Is the company paying (or paid in past) commission above 10% to any investment banker or funding platform? if yes, details?<span className="text-danger">*</span></label>
                              <textarea  
                                cols={30} rows={6}
                                name='tud10perCommission'
                                value={this.props.unicorn.tud10perCommission}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>  
                            <div className="form-group">
                              <label for="">What are possible / perceived exit opportunities and time line?<span className="text-danger">*</span></label>
                              <input  
                                type="text" 
                                name='tudExitTimeline'
                                value={this.props.unicorn.tudExitTimeline}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div> 
                            <div className="form-group">
                              <label for="">Subsidiaries<span className="text-danger">*</span></label>
                              <input  
                                type="text" 
                                name='tudSubsidiries'
                                value={this.props.unicorn.tudSubsidiries}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Sister Concerns<span className="text-danger">*</span></label>
                              <input  
                                type="text" 
                                name='tudSisterConcerns'
                                value={this.props.unicorn.tudSisterConcerns}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>                   
                            <div className="form-group">
                              <label for="">Related party transactions (existing and proposed )<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudRelatedPartyTrans'
                                value={this.props.unicorn.tudRelatedPartyTrans}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>                   
                            <div className="form-group">
                              <label for="">Legal risks? Plans to mitigate risk?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudLegalRisk'
                                value={this.props.unicorn.tudLegalRisk}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>  
                            <div className="form-group">
                             
                             
                              <label for="">Any change/exit by founders earlier?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudFounderExitEarlier'
                                value={this.props.unicorn.tudFounderExitEarlier}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>  
                            <div className="form-group">
                              <label for="">Demo video (Link)</label>
                              <input  
                                type="text" 
                                name='tudDemoLink'
                                value={this.props.unicorn.tudDemoLink}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Any other supported documents(links)</label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudOtherDocsLinks'
                                value={this.props.unicorn.tudOtherDocsLinks}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Media coverage (links)</label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudMediaCoverLinks'
                                value={this.props.unicorn.tudMediaCoverLinks}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div> 
                            <div className="form-group">
                              <label for="">Awards and Recognitions</label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudAwards'
                                value={this.props.unicorn.tudAwards}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div> 
                            <div className="form-group">
                              <label for="">Are you recognized as Startup by DPIIT, Govt of India? If yes give registration number.</label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudStartupRecon'
                                value={this.props.unicorn.tudStartupRecon}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div> 
                            <div className="form-group">
                              <label for="">Any other specific information you like to share.</label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudOtherInfo'
                                value={this.props.unicorn.tudOtherInfo}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
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

export default OtherImportantIndicators;
