
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';

import $ from 'jquery';
class FundRaiseRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name_of_clients:'',
      client_retention:'',
      revenue_top_5_clients:'',
      explaination_economics_of_startup:'',
      total_capex_of_startup:'',
      total_amount_spent_of_product:'',
      major_expense_till_date:'',   
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
          name_of_clients:result.data[0].name_of_clients,
          client_retention:result.data[0].client_retention,
          revenue_top_5_clients:result.data[0].revenue_top_5_clients,
          explaination_economics_of_startup:result.data[0].explaination_economics_of_startup,
          total_capex_of_startup:result.data[0].total_capex_of_startup,
          total_amount_spent_of_product:result.data[0].total_amount_spent_of_product,
          major_expense_till_date:result.data[0].major_expense_till_date ,
        });
        if(result.data[0].name_of_clients) {
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

    
   
    let params={
      name_of_clients: this.state.name_of_clients,
      client_retention: this.state.client_retention,
      revenue_top_5_clients: this.state.revenue_top_5_clients,
      explaination_economics_of_startup: this.state.explaination_economics_of_startup,
      total_capex_of_startup: this.state.total_capex_of_startup,
      total_amount_spent_of_product: this.state.total_amount_spent_of_product,
      major_expense_till_date: this.state.major_expense_till_date ,
      founder_id: this.state.founder_id,
      no:11,
      main_founder_id:localStorage.getItem('founder_id'),
      f11_status:this.state.processtype=='saveandproceed'?'success':'new',
    }

    this.setState({ loading: true });
        Bridge.Unicorn.editunicorndraft(this.props.unicorn).then((result) => {

      if (result.status == 1) {
        this.setState({ loading: false,valueispresent:false, },);
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Financial details are updated successfully.',6);
        } else {
          message.success('Financial details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
 
  }

  saveandproceed=()=>{
    if(!this.state.name_of_clients) {
      message.warning('Please enter the number of clients');
      return;
    } else if(!this.state.client_retention) {
      message.warning('Please enter the value of field client retention.');
      return;
    } else if(!this.state.revenue_top_5_clients) {
      message.warning('Please enter the value of field revenue top 5-10% clients.');
      return;
    } else if(!this.state.explaination_economics_of_startup) {
      message.warning('Please enter the value of field economics of your startup.');
      return;
    } else if(!this.state.total_capex_of_startup){
      message.warning('Please enter what is the total CapEx of your startup till date?*');
      return;
    }
     else if(!this.state.total_amount_spent_of_product) {
      message.warning('Please enter the value of field total amount spent of product.');
      return;
    } else if(!this.state.major_expense_till_date) {
      message.warning('Please enter the value of field major expense till date.');
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

    let active = (this.state.name_of_clients && this.state.client_retention && this.state.revenue_top_5_clients && this.state.explaination_economics_of_startup && this.state.total_amount_spent_of_product && this.state.major_expense_till_date &&  this.state.valueispresent==true) ? false : true;

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
                          >Financial</span>
                        </div>
                        <hr/>
                      </div>

                      {((this.props.error=='0') && (
                        !this.state.name_of_clients ||
                        !this.state.client_retention ||
                        !this.state.total_capex_of_startup||
                        !this.state.revenue_top_5_clients ||
                        !this.state.explaination_economics_of_startup ||
                        !this.state.total_amount_spent_of_product ||
                        !this.state.major_expense_till_date
                    )
                      ) &&(
                        <div className='error-div'>
                          <div className='error-icon'>
                            <i className='bx bxs-error'></i>
                          </div>
                          <ul>
                            {!this.state.name_of_clients &&(
                              <li>
                                <span>Please enter the number of clients.</span>
                              </li>
                            )}
                            {!this.state.client_retention &&(
                              <li>
                                <span>Please enter the value of field client retention.</span>
                              </li>
                            )}
                            {!this.state.total_capex_of_startup &&(
                              <li>
                                <span>Please enter what is the total CapEx of your startup till date?*.</span>
                              </li>
                            )}
                            {!this.state.revenue_top_5_clients &&(
                              <li>
                                <span>Please enter the value of field revenue top 5-10% clients.</span>
                              </li>
                            )}
                            {!this.state.explaination_economics_of_startup &&(
                              <li>
                                <span>Please enter the value of field economics of your startup.</span>
                              </li>
                            )}
                            {!this.state.total_amount_spent_of_product &&(
                              <li>
                                <span>Please enter the value of field total amount spent of product.</span>
                              </li>
                            )}
                            {!this.state.major_expense_till_date &&(
                              <li>
                                <span>Please enter the value of field major expense till date.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">Number of clients<span className="text-danger">*</span>{" "}</label>
                              <textarea 
                                type="text" 
                                name='tudNumberofClients'
                                cols={30}
                                id="selected-field"
                                rows={6}
                                value={this.props.unicorn.tudNumberofClients}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Client retention?<span className="text-danger">*</span>{" "}</label>
                              <textarea 
                                type="text" 
                                name='tudClientRetentions'
                                cols={30}
                                rows={6}
                                value={this.props.unicorn.tudClientRetentions}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for=""> Revenue from top 5-10% clients?<span className="text-danger">*</span>{" "}</label>
                              <textarea  
                                type="text" 
                                name='tudRevenueTop10'
                                cols={30}
                                rows={6}
                                value={this.props.unicorn.tudRevenueTop10}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for=""> Explain unit economics of your startup?<span className="text-danger">*</span>{" "}</label>
                              <input  
                                type="text" 
                                name='tudUnitEconomics'
                                value={this.props.unicorn.tudUnitEconomics}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">What is the total CapEx of your startup till date?<span className="text-danger">*</span>{" "}</label>
                              <input  
                                type="text" 
                                name='tudTotalCapEx'
                                value={this.props.unicorn.tudTotalCapEx}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">What is the total amount spent in product development?<span className="text-danger">*</span>{" "}</label>
                              <textarea 
                                type="text" 
                                name='tudAmountSpentProdDev'
                                cols={30}
                                rows={6}
                                value={this.props.unicorn.tudAmountSpentProdDev}
                                   onChange={(e) =>
                            this.props.onInput(e.target.name, e.target.value)
                          }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Other major expenses/investments till date<span className="text-danger">*</span>{" "}</label>
                              <textarea  
                                type="text" 
                                name='tudMajorExpInv'
                                cols={30}
                                rows={6}
                                value={this.props.unicorn.tudMajorExpInv}
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
