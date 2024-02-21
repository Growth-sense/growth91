
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';
import $ from 'jquery';
class FundRaiseRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relevant_industry:'',
      views_on_industry:'',
      total_market_size_of_industry:'',
      supporting_information_of_narket_size:'',
      addressale_market_size:'',
      supporting_information_of_demarking_addressable_market:'',
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
      this.getData(id);
    }
    $('#selected-field').focus();
    this.props.check();
  }
  getData = (id) => {
    let params = {
      founder_id: id
    }
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          relevant_industry:result.data[0].relevant_industry,
          views_on_industry:result.data[0].views_on_industry,
          total_market_size_of_industry:result.data[0].total_market_size_of_industry,
          supporting_information_of_narket_size:result.data[0].supporting_information_of_narket_size,
          addressale_market_size:result.data[0].addressale_market_size,
          supporting_information_of_demarking_addressable_market:result.data[0].supporting_information_of_demarking_addressable_market,
        });
        if(result.data[0].relevant_industry) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }
  updatefounder = () => {
    let params={
      relevant_industry:this.state.relevant_industry,
      views_on_industry:this.state.views_on_industry,
      total_market_size_of_industry:this.state.total_market_size_of_industry,
      supporting_information_of_narket_size:this.state.supporting_information_of_narket_size,
      addressale_market_size:this.state.addressale_market_size,
      supporting_information_of_demarking_addressable_market:this.state.supporting_information_of_demarking_addressable_market,
      founder_id: this.state.founder_id,
      no:5,
      main_founder_id:localStorage.getItem('founder_id'),
      f5_status:this.state.processtype=='saveandproceed'?'success':'new',
    }
    this.setState({loading:true});
    Bridge.founder.updatefounder(params).then((result)=>{
      if(result.status==1){
        this.setState({loading:false,valueispresent:true},()=>this.getData(this.state.founder_id));
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Industry market details are updated successfully.',6);
        } else {
          message.success('Industry market details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  }
  saveandproceed=()=>{
    if(!this.state.relevant_industry) {
      message.warning('Please enter the relevant industry');
      return;
    } else if(!this.state.views_on_industry) {
      message.warning('Please enter the view on industry');
      return;
    }  else if(!this.state.total_market_size_of_industry) {
      message.warning('Please enter the total market size of industry');
      return;
    }  else if(!this.state.supporting_information_of_narket_size) {
      message.warning('Please enter the supporting information of the market size.');
      return;
    }  else if(!this.state.addressale_market_size) {
      message.warning('Please enter the addressable market size.');
      return;
    } else if(!this.state.supporting_information_of_demarking_addressable_market) {
      message.warning('Please enter supporting information of demarking addressable market.');
      return;
    } 
    this.props.check();
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
    let active = (this.state.relevant_industry && this.state.views_on_industry 
    && this.state.total_market_size_of_industry && this.state.supporting_information_of_narket_size && this.state.addressale_market_size && 
    this.state.supporting_information_of_demarking_addressable_market && 
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
                            position: 'relative',
                            paddingRight: 10,
                          }}
                          >Industry/Market</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && (
                        !this.state.relevant_industry || 
                        !this.state.views_on_industry ||
                        !this.state.total_market_size_of_industry || 
                        !this.state.supporting_information_of_narket_size ||
                        !this.state.addressale_market_size ||
                        !this.state.supporting_information_of_demarking_addressable_market
                        )) && (
                        <div className='error-div'>
                          <div className='error-icon'>
                            <i className='bx bxs-error'></i>
                          </div>
                          <ul>
                            {!this.state.relevant_industry &&(
                              <li>
                                <span>Please enter the relevant industry.</span>
                              </li>
                            )}
                            {!this.state.views_on_industry &&(
                              <li>
                                <span>Please enter the view on industry.</span>
                              </li>
                            )}
                            {!this.state.total_market_size_of_industry &&(
                              <li>
                                <span>Please enter the total market size of industry.</span>
                              </li>
                            )}
                            {!this.state.supporting_information_of_narket_size &&(
                              <li>
                                <span>Please enter the supporting information of the market size.</span>
                              </li>
                            )}
                            {!this.state.addressale_market_size &&(
                              <li>
                                <span>Please enter the addressable market size.</span>
                              </li>
                            )}
                            {!this.state.supporting_information_of_demarking_addressable_market &&(
                              <li>
                                <span>Please enter supporting information of demarking addressable market.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                        )}
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <label for="">Which is most relevant industry classification for the startup?
                              <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='relevant_industry'
                                id="selected-field"
                                value={this.state.relevant_industry}
                                onChange={(e) => this.setState({relevant_industry: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Your views on industry (Past, Present and Future) <span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='views_on_industry'
                                value={this.state.views_on_industry}
                                onChange={(e) => this.setState({views_on_industry: e.target.value}) }
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label for="">Total Market size of the industry.
                              <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='total_market_size_of_industry'
                                value={this.state.total_market_size_of_industry}
                                onChange={(e) => this.setState({total_market_size_of_industry: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Supporting information and the logic/rational of market size.
                              <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='supporting_information_of_narket_size'
                                value={this.state.supporting_information_of_narket_size}
                                onChange={(e) => this.setState({supporting_information_of_narket_size: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Addressable Market size.
                              <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='addressale_market_size'
                                value={this.state.addressale_market_size}
                                onChange={(e) => this.setState({addressale_market_size: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Supporting information and logic/rational of demarking addressable market size.
                              <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                                name='supporting_information_of_demarking_addressable_market'
                                value={this.state.supporting_information_of_demarking_addressable_market}
                                onChange={(e) => this.setState({supporting_information_of_demarking_addressable_market: e.target.value}) }
                              />
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
                                <button 
                                  style={{width:116,marginRight:13}}
                                  class="submit-button" 
                                  onClick={() => this.save()}
                                >Save</button>
                                <button 
                                  style={{width:190}}
                                  class="submit-button" 
                                  onClick={() => this.saveandproceed()}
                                >Validate & Proceed</button>
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