
import React, { Component } from 'react';
import Bridge from '../../constants/Bridge';

import { message, Spin } from 'antd';
import moment from 'moment';
import $ from 'jquery';
class Salaries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      founders_current_salery:'',
      date_of_last_increase_founders_salary:'',
      core_team_current_salary:'',
      total_salary_including_core_team_salary:'', 
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
          founders_current_salery: result.data[0].founders_current_salery,
          date_of_last_increase_founders_salary: result.data[0].date_of_last_increase_founders_salary ? (result.data[0].date_of_last_increase_founders_salary) : '',
          core_team_current_salary: result.data[0].core_team_current_salary,
          total_salary_including_core_team_salary: result.data[0].total_salary_including_core_team_salary 
        });
        if(result.data[0].founders_current_salery) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }

  updatefounder = () => {

    
   
    let params={
      founders_current_salery:this.state.founders_current_salery,
      date_of_last_increase_founders_salary:this.state.date_of_last_increase_founders_salary,
      core_team_current_salary:this.state.core_team_current_salary,
      total_salary_including_core_team_salary:this.state.total_salary_including_core_team_salary,
      founder_id: this.state.founder_id,
      no:13,
      main_founder_id:localStorage.getItem('founder_id'),
      f13_status:this.state.processtype=='saveandproceed'?'success':'new',
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
          message.success('Salary details are updated successfully.',6);
        } else {
          message.success('Salary details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
 
  }

  saveandproceed=()=>{
    if(!this.state.founders_current_salery) {
      message.warning('Please enter the value of field founders current salary.');
      return;
    } else if(!this.state.date_of_last_increase_founders_salary) {
      message.warning('Please enter the value of field Founders salary');
      return;
    } else if(!this.state.core_team_current_salary) {
      message.warning('Please enter the value of field core team current salary.');
      return;
    } else if(!this.state.total_salary_including_core_team_salary) {
      message.warning('Please enter the value of field total salary including core team salary.');
      return;
    }
    // this.props.check();
    this.setState({processtype:'saveandproceed'},()=>this.updatefounder());
  }

  save=()=>{
    this.setState({processtype:'save'},this.updatefounder());
  }

  next=()=>{
    this.setState({processtype:'next'},()=>this.updatefounder());
  }
  prev=()=>{
    this.setState({processtype:'prev'},()=>this.updatefounder());
  }
  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };

  render() {

    let active = (this.state.founders_current_salery && this.state.date_of_last_increase_founders_salary && this.state.core_team_current_salary && this.state.total_salary_including_core_team_salary &&
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
                          >Salaries</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && (
                          !this.state.founders_current_salery ||
                          !this.state.date_of_last_increase_founders_salary ||
                          !this.state.core_team_current_salary ||
                          !this.state.total_salary_including_core_team_salary
                      )
                        ) &&(
                          <div className='error-div'>
                            <div className='error-icon'>
                              <i className='bx bxs-error'></i>
                            </div>
                            <ul>
                              {!this.state.founders_current_salery &&(
                                <li>
                                  <span>Please enter the value of field founders current salary.</span>
                                </li>
                              )}
                              {!this.state.date_of_last_increase_founders_salary &&(
                                <li>
                                  <span>Please enter the value of field founder's salary.</span>
                                </li>
                              )}
                              {!this.state.core_team_current_salary &&(
                                <li>
                                  <span>Please enter the value of field core team's current salary.</span>
                                </li>
                              )}
                              {!this.state.total_salary_including_core_team_salary &&(
                                <li>
                                  <span>Please enter the value of field total salary including core team salary.</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">Founders' current salary (Total Rs per month)  for all founders.<span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                id="selected-field"
                                onWheel={() => document.activeElement.blur()}
                                name='tudFounderSalary'
                                value={this.props.unicorn.tudFounderSalary}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group step-form-date-input">
                              <label for="">Founder's salary (Plans in next 12 to 24 months)- For all founders.<span className="text-danger">*</span></label>
                              {/* <DatePicker
                                value={this.props.unicorn.date_of_last_increase_founders_salary}
                                onChange={(date, dateString) => {
                                  this.setState({ date_of_last_increase_founders_salary:date }) 
                                }}
                                disabledDate={this.disabledDate}
                                format={'DD-MM-YYYY'}
                                style={{
                                  width:'100%', 
                                  marginBottom:30,
                                }}
                              /> */}
                              <input  
                                type="text" 
                                name='tudFounderSalaryPlan'
                                value={this.props.unicorn.tudFounderSalaryPlan}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Core Team's current salary (Total Rs per month) <span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='tudCoreTeamSalary'
                                value={this.props.unicorn.tudCoreTeamSalary}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                          
                            <div className="form-group">
                              <label for="">Total salary (all direct/indirect employees, Rs per month) - Including core team and all founders.<span className="text-danger">*</span></label>
                              <input  
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='tudTotalSalary'
                                value={this.props.unicorn.tudTotalSalary}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group justify-content-between d-flex">
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

export default Salaries;
