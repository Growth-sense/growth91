
import React, { Component } from 'react';
import Bridge from '../../constants/Bridge';

import { message, Spin } from 'antd';
import $ from 'jquery';
class FundRaiseRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direct_local_competition:'',
      in_direct_local_competition:'',
      direct_global_competition:'',
      indirect_global_competition:'',
      how_different_startup_from_competition:'',
      why_difficult_competition:'',
      what_are_unfair_disadvantages:'',
      most_about_your_competition:'',
      failed_venture_in_same_domain:'',
      resons_for_failure_after_analysing:'',
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
          direct_local_competition: result.data[0].direct_local_competition,
          in_direct_local_competition: result.data[0].in_direct_local_competition,
          direct_global_competition: result.data[0].direct_global_competition,
          indirect_global_competition: result.data[0].indirect_global_competition,
          how_different_startup_from_competition: result.data[0].how_different_startup_from_competition,
          why_difficult_competition: result.data[0].why_difficult_competition,
          what_are_unfair_disadvantages: result.data[0].what_are_unfair_disadvantages,
          most_about_your_competition: result.data[0].most_about_your_competition,
          failed_venture_in_same_domain: result.data[0].failed_venture_in_same_domain,
          resons_for_failure_after_analysing: result.data[0].resons_for_failure_after_analysing,
        });
        if(result.data[0].direct_local_competition) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }
  updatefounder = () => { 
    let params={
      direct_local_competition:this.state.direct_local_competition,
      in_direct_local_competition:this.state.in_direct_local_competition,
      direct_global_competition:this.state.direct_global_competition,
      indirect_global_competition:this.state.indirect_global_competition,
      how_different_startup_from_competition:this.state.how_different_startup_from_competition,
      why_difficult_competition:this.state.why_difficult_competition,
      what_are_unfair_disadvantages:this.state.what_are_unfair_disadvantages,
      most_about_your_competition:this.state.most_about_your_competition,
      failed_venture_in_same_domain:this.state.failed_venture_in_same_domain,
      resons_for_failure_after_analysing:this.state.resons_for_failure_after_analysing,
      founder_id: this.state.founder_id,
      no:6,
      main_founder_id:localStorage.getItem('founder_id'),
      f6_status:this.state.processtype=='saveandproceed'?'success':'new',
    }
    this.setState({loading:true});
    Bridge.founder.updatefounder(params).then((result) => {
      if (result.status == 1) {
        this.setState({loading:false,valueispresent:true},()=>this.getData(this.state.founder_id));
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Competition details are updated successfully.',6);
        } else {
          message.success('Competition details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({loading:false});
      }
    });
  }
  saveandproceed=()=>{
    if(!this.state.direct_local_competition) {
      message.warning('Please enter value of field local competition (direct)');
      return;
    } else if(!this.state.in_direct_local_competition) {
      message.warning('Please enter value of field local competition (indirect)');
      return;
    }  else if(!this.state.direct_global_competition) {
      message.warning('Please enter value of field global competition (direct)');
      return;
    }  else if(!this.state.indirect_global_competition) {
      message.warning('Please enter value of field global competition (indirect)');
      return;
    }  else if(!this.state.how_different_startup_from_competition) {
      message.warning('Please enter value of field different startup from competition');
      return;
    } else if(!this.state.why_difficult_competition) {
      message.warning('Please enter value of field why difficult competition to do something.');
      return;
    } else if(!this.state.what_are_unfair_disadvantages) {
      message.warning('Please enter value of field what are different unfair advantages.');
      return;
    } else if(!this.state.most_about_your_competition) {
      message.warning('Please enter value of field most about your competition.');
      return;
    } 
    // this.props.check();
    this.setState({processtype:'saveandproceed'},()=>this.updatefounder());
  }
  // save
  save=()=>{
    this.props.check();
    this.setState({processtype:'save'},()=>this.updatefounder());
  }
  next=()=>{
    this.setState({processtype:'next'},()=>this.updatefounder());
  }
  prev=()=>{
    this.setState({processtype:'prev'},()=>this.updatefounder());
  }
  render() {
    let active = (this.state.direct_local_competition && this.state.in_direct_local_competition && 
      this.state.direct_global_competition && this.state.indirect_global_competition && 
      this.state.how_different_startup_from_competition && this.state.why_difficult_competition && 
      this.state.what_are_unfair_disadvantages && this.state.most_about_your_competition && 
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
                          >Competition</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && (
                        !this.state.direct_local_competition || 
                        !this.state.in_direct_local_competition ||
                        !this.state.direct_global_competition || 
                        !this.state.indirect_global_competition ||
                        !this.state.how_different_startup_from_competition ||
                        !this.state.why_difficult_competition ||
                        !this.state.what_are_unfair_disadvantages ||
                        !this.state.most_about_your_competition
                      )) &&(
                        <div className='error-div'>
                          <div className='error-icon'>
                            <i className='bx bxs-error'></i>
                          </div>
                          <ul>
                            {!this.state.direct_local_competition &&(
                              <li>
                                <span>Please enter value of field local competition (direct).</span>
                              </li>
                            )}
                            {!this.state.in_direct_local_competition &&(
                              <li>
                                <span>Please enter value of field local competition (indirect).</span>
                              </li>
                            )}
                            {!this.state.direct_global_competition &&(
                              <li>
                                <span>Please enter value of field global competition (direct).</span>
                              </li>
                            )}
                            {!this.state.indirect_global_competition &&(
                              <li>
                                <span>Please enter value of field global competition (indirect).</span>
                              </li>
                            )}
                            {!this.state.how_different_startup_from_competition &&(
                              <li>
                                <span>Please enter value of field different startup from competition.</span>
                              </li>
                            )}
                            {!this.state.why_difficult_competition &&(
                              <li>
                                <span>Please enter value of field why difficult competition to do something.</span>
                              </li>
                            )}
                            {!this.state.what_are_unfair_disadvantages &&(
                              <li>
                                <span>Please enter value of field what are different unfair advantages.</span>
                              </li>
                            )}
                            {!this.state.most_about_your_competition &&(
                              <li>
                                <span>Please enter value of field most about your competition.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      <div className="row" style={{maxWidth:900}}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">Local Competition(direct)<span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                id="selected-field"
                                placeholder="Enter your name"
                                name='tudLocalDirectComp'
                                value={this.props.unicorn.tudLocalDirectComp}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Local Competition(indirect)<span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='tudLocalIndirectComp'
                                value={this.props.unicorn.tudLocalIndirectComp}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>                            <div className="form-group">
                              <label for="">Global Competition(direct)<span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='tudGlobalDirectComp'
                                value={this.props.unicorn.tudGlobalDirectComp}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>                            <div className="form-group">
                              <label for="">Global Competition(indirect)<span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='tudGlobalIndirectComp'
                                value={this.props.unicorn.tudGlobalIndirectComp}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">How is your startup different from the Competition?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudDiffCompetion'
                                value={this.props.unicorn.tudDiffCompetion}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Why it will be difficult for the competition to do the same thing?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudWhyCompSame'
                                value={this.props.unicorn.tudWhyCompSame}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">What is your unfair advantage?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudUnfairAdv'
                                value={this.props.unicorn.tudUnfairAdv}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">What you like the most about your competition?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudLikeCompetion'
                                value={this.props.unicorn.tudLikeCompetion}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>                            
                            <div className="form-group">
                              <label for=""> Do you know any failed venture in same domain or doing similar activities?</label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='tudFailVenture'
                                value={this.props.unicorn.tudFailVenture}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">What are the reasons for failure as analyzed by you?
                              </label>
                              <textarea 
                                cols="30" 
                                rows="6"
                                name='tudFailureReason'
                                value={this.props.unicorn.tudFailureReason}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              ></textarea>
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