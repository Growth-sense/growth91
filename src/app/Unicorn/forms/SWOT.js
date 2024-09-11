
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';

import $ from 'jquery';
class SWOT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strength_of_your_startup:'',
      weakness_of_startup:'',
      opportunities_for_startup:'',
      threats_for_startup:'',
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
          strength_of_your_startup: result.data[0].strength_of_your_startup,
          weakness_of_startup: result.data[0].weakness_of_startup,
          opportunities_for_startup: result.data[0].opportunities_for_startup,
          threats_for_startup: result.data[0].threats_for_startup,
        });
        if(result.data[0].strength_of_your_startup) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }
  updatefounder = () => {
    let params={
      strength_of_your_startup:this.state.strength_of_your_startup,
      weakness_of_startup:this.state.weakness_of_startup,
      opportunities_for_startup:this.state.opportunities_for_startup,
      threats_for_startup:this.state.threats_for_startup,
      founder_id: this.state.founder_id,
      no:7,
      main_founder_id:localStorage.getItem('founder_id'),
      f7_status:this.state.processtype=='saveandproceed'?'success':'new',
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
          message.success('SWOT details are updated successfully.',6);
        } else {
          message.success('SWOT details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  }
  saveandproceed=()=>{
    if(!this.state.strength_of_your_startup) {
      message.warning('Please enter strengths of you startup');
      return;
    } else if(!this.state.weakness_of_startup) {
      message.warning('Please enter weakness of the startup');
      return;
    }  else if(!this.state.opportunities_for_startup) {
      message.warning('Please enter opportunities of the startup');
      return;
    }  else if(!this.state.threats_for_startup) {
      message.warning('Please enter threats of startup');
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
    let active = (this.state.strength_of_your_startup && this.state.weakness_of_startup && 
      this.state.opportunities_for_startup && this.state.threats_for_startup &&
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
                          >SWOT</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && (
                        !this.state.strength_of_your_startup
                        || !this.state.weakness_of_startup ||
                        !this.state.opportunities_for_startup || 
                        !this.state.threats_for_startup)
                      ) &&(
                        <div className='error-div'>
                          <div className='error-icon'>
                            <i className='bx bxs-error'></i>
                          </div>
                          <ul>
                            {!this.state.strength_of_your_startup &&(
                              <li>
                                <span>Please enter strengths of your startup.</span>
                              </li>
                            )}
                            {!this.state.weakness_of_startup &&(
                              <li>
                                <span>Please enter weakness of the startup.</span>
                              </li>
                            )}
                            {!this.state.opportunities_for_startup &&(
                              <li>
                                <span>Please enter opportunities of the startup.</span>
                              </li>
                            )}
                            {!this.state.threats_for_startup &&(
                              <li>
                                <span>Please enter threats of startup.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                             
                            <div className="form-group">
                              <label for="">What are the strengths of your startup?<span className="text-danger">*</span></label>
                              <textarea disabled 
                                type="text" 
                                name='tudStrength'
                                cols={30}
                                rows={6}
                                id="selected-field"
                                value={this.props.unicorn.tudStrength}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">What are the weaknesses of your startup? <span className="text-danger">*</span></label>
                              <textarea disabled 
                                type="text" 
                                name='tudWeakness'
                                cols={30}
                                rows={6}
                                value={this.props.unicorn.tudWeakness}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">What are the opportunities for your startup? <span className="text-danger">*</span></label>
                              <textarea 
                                type="text"
                                name='tudOpportunities'
                                cols={30}
                                rows={6}
                                value={this.props.unicorn.tudOpportunities}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">What are the threats for your startup? <span className="text-danger">*</span></label>
                              <textarea disabled 
                                type="text" 
                                name='threats_for_startup'
                                cols={30}
                                rows={6}
                                value={this.props.unicorn.threats_for_startup}
   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
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
export default SWOT;