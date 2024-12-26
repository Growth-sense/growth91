
import React, { Component } from 'react';
import { message, Spin } from 'antd';
import Bridge from '../../constants/Bridge';
import $ from 'jquery';
class IdeaBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_disrupting_existing_market: '',
      is_targeting_new_untabed_market:'',
      customer_benifit:'',
      suplier_benifit:'',
      focused_on_product:'',
      direct_substitute_available:'',
      indirect_substitute_available:'',
      risks_perceived:'',
      responsibilities_distributted_members:'',
      moats:'',
      challenges_for_scale_up:'',
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
          is_disrupting_existing_market:  result.data[0].is_disrupting_existing_market,
          is_targeting_new_untabed_market: result.data[0].is_targeting_new_untabed_market,
          customer_benifit: result.data[0].customer_benifit,
          suplier_benifit: result.data[0].suplier_benifit,
          focused_on_product: result.data[0].focused_on_product,
          direct_substitute_available: result.data[0].direct_substitute_available,
          indirect_substitute_available: result.data[0].indirect_substitute_available,
          risks_perceived: result.data[0].risks_perceived,
          responsibilities_distributted_members: result.data[0].responsibilities_distributted_members,
          moats: result.data[0].moats,
          challenges_for_scale_up: result.data[0].challenges_for_scale_up,
        });
        if(result.data[0].is_disrupting_existing_market) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }
  updatefounder=()=>{ 
    let params={
      is_disrupting_existing_market:this.state.is_disrupting_existing_market,
      is_targeting_new_untabed_market: this.state.is_targeting_new_untabed_market,
      customer_benifit: this.state.customer_benifit,
      suplier_benifit: this.state.suplier_benifit,
      focused_on_product: this.state.focused_on_product,
      direct_substitute_available: this.state.direct_substitute_available,
      indirect_substitute_available: this.state.indirect_substitute_available,
      risks_perceived: this.state.risks_perceived,
      responsibilities_distributted_members: this.state.responsibilities_distributted_members,
      moats: this.state.moats,
      challenges_for_scale_up: this.state.challenges_for_scale_up ,
      founder_id: this.state.founder_id,
      no:2,
      main_founder_id:localStorage.getItem('founder_id'),
      f2_status:this.state.processtype=='saveandproceed'?'success':'new',
    }
    this.setState({ loading: true });
    Bridge.founder.updatefounder(params).then((result) => {
      if (result.status==1) {
        this.props.check(2);
        this.setState({loading:false,valueispresent:true});
        if(this.state.processtype=='next'){
          this.props.next();
        } else if(this.state.processtype=='prev'){
          this.props.prev();
        } else if(this.state.processtype=='saveandproceed'){
          this.props.activate();
          message.success('Idea/Business details are updated successfully.',6);
        } else {
          message.success('Idea/Business details are updated successfully.',6);
        }
      } else {
        message.warning(result.message);
        this.setState({loading:false});
      }
    });
  }
  saveandproceed=()=>{
    if(!this.state.is_disrupting_existing_market) {
      message.warning('Please enter the value of field disruption of existing market.');
      return;
    } else if(!this.state.is_targeting_new_untabed_market) {
      message.warning('Please enter the value of field targeting new untapped market.');
      return;
    } else if(!this.state.customer_benifit) {
      message.warning('Please enter the value of field customer benefit.');
      return;
    } else if(!this.state.suplier_benifit) {
      message.warning('Please enter the value of field suplier benefit.');
      return;
    } else if(!this.state.focused_on_product) {
      message.warning('Please enter the value of field focused on product or service.');
      return;
    } else if(!this.state.direct_substitute_available) {
      message.warning('Please enter the value of field direct substitute available.');
      return;
    } else if(!this.state.indirect_substitute_available) {
      message.warning('Please enter the value of field indirect substitute available.');
      return;
    } else if(!this.state.risks_perceived) {
      message.warning('Please enter the value of field risks perceived.');
      return;
    } else if(!this.state.responsibilities_distributted_members) {
      message.warning('Please enter the value of field responsibilities distributed members.');
      return;
    } else if(!this.state.moats) {
      message.warning('Please enter the value of field moats.');
      return;
    } else if(!this.state.challenges_for_scale_up) {
      message.warning('Please enter the value of field challenges for scale up.');
      return;
    }
    // this.props.check(2);
    this.setState({processtype:'saveandproceed'});
    console.log(this.props);
    setTimeout(()=>{
      this.updatefounder();
    },500);
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
    let active = (this.state.is_disrupting_existing_market && this.state.is_targeting_new_untabed_market && this.state.customer_benifit && this.state.suplier_benifit && this.state.focused_on_product && this.state.direct_substitute_available && this.state.indirect_substitute_available && this.state.risks_perceived && this.state.responsibilities_distributted_members && this.state.moats && this.state.challenges_for_scale_up && this.state.valueispresent==true) ? false : true;
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
                          >Idea/business</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && (
                        !this.state.is_disrupting_existing_market || 
                          !this.state.is_targeting_new_untabed_market ||
                          !this.state.customer_benifit || 
                          !this.state.suplier_benifit ||
                          !this.state.focused_on_product ||
                          !this.state.direct_substitute_available ||
                          !this.state.indirect_substitute_available ||
                          !this.state.risks_perceived ||
                          !this.state.responsibilities_distributted_members ||
                          !this.state.moats ||
                          !this.state.challenges_for_scale_up
                          )) &&(
                            <div className='error-div'>
                              <div className='error-icon'>
                                <i className='bx bxs-error'></i>
                              </div>
                              <ul>
                                {!this.state.is_disrupting_existing_market &&(
                                  <li>
                                    <span>Please enter the value of field disruption of existing market.</span>
                                  </li>
                                )}
                                {!this.state.is_targeting_new_untabed_market &&(
                                  <li>
                                    <span>Please enter the value of field targeting new untapped market.</span>
                                  </li>
                                )}
                                {!this.state.customer_benifit &&(
                                  <li>
                                    <span>Please enter the value of field customer benefit.</span>
                                  </li>
                                )}
                                {!this.state.suplier_benifit && (
                                  <li>
                                    <span>Please enter the value of field suplier benefit.</span>
                                  </li>
                                )}
                                {!this.state.focused_on_product && (
                                  <li>
                                    <span>Please enter the value of field focused on product or service.</span>
                                  </li>
                                )}
                                {!this.state.direct_substitute_available && (
                                  <li>
                                    <span>Please enter the value of field direct substitute available.</span>
                                  </li>
                                )}
                                {!this.state.indirect_substitute_available && (
                                  <li>
                                    <span>Please enter the value of field indirect substitute available.</span>
                                  </li>
                                )}
                                {!this.state.risks_perceived && (
                                  <li>
                                    <span>Please enter the value of field risks perceived.</span>
                                  </li>
                                )}
                                {!this.state.responsibilities_distributted_members && (
                                  <li>
                                    <span>Please enter the value of field responsibilities distributed members.</span>
                                  </li>
                                )}
                                {!this.state.challenges_for_scale_up && (
                                  <li>
                                    <span>Please enter the value of field moats.</span>
                                  </li>
                                )}
                                {!this.state.challenges_for_scale_up && (
                                  <li>
                                    <span>Please enter the value of field challenges for scale up.</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                             
                            <div className="form-group">
                              <label for="">Are you Disrupting existing market?How?<span className="text-danger">*</span></label>
                              <textarea 
                                cols="30" rows="6"
                                id="selected-field"
                                name='is_disrupting_existing_market'
                                value={this.state.is_disrupting_existing_market}
                                onChange={(e) => this.setState({is_disrupting_existing_market: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">Are you targeting new untapped market?Justify?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='is_targeting_new_untabed_market'
                                value={this.state.is_targeting_new_untabed_market}
                                onChange={(e) => this.setState({is_targeting_new_untabed_market: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">How will the customer benefit?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='customer_benifit'
                                value={this.state.customer_benifit}
                                onChange={(e) => this.setState({customer_benifit: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">How will your suppliers benefit?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='suplier_benifit'
                                value={this.state.suplier_benifit}
                                onChange={(e) => this.setState({suplier_benifit: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">Are you focused on product or service?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='focused_on_product'
                                value={this.state.focused_on_product}
                                onChange={(e) => this.setState({focused_on_product: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">What are the direct substitute available in the market?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='direct_substitute_available'
                                value={this.state.direct_substitute_available}
                                onChange={(e) => this.setState({direct_substitute_available: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">What are the indirect substitute available in the market?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='indirect_substitute_available'
                                value={this.state.indirect_substitute_available}
                                onChange={(e) => this.setState({indirect_substitute_available: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">What are the risks perceived by you?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='risks_perceived'
                                value={this.state.risks_perceived}
                                onChange={(e) => this.setState({risks_perceived: e.target.value}) }
                              ></textarea>
                              </div>
  
                              <div className="form-group">
                              <label for="">How roles and responsibilities are distributed between core team members?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='responsibilities_distributted_members'
                                value={this.state.responsibilities_distributted_members}
                                onChange={(e) => this.setState({responsibilities_distributted_members: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">what are your moats?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='moats'
                                value={this.state.moats}
                                onChange={(e) => this.setState({moats: e.target.value}) }
                              ></textarea>
                              </div>
                              <div className="form-group">
                              <label for="">what are the challanges for scale up and how these will be managed?<span className="text-danger">*</span></label>
                              <textarea 
                                id="" cols="30" rows="6"
                                name='challenges_for_scale_up'
                                value={this.state.challenges_for_scale_up}
                                onChange={(e) => this.setState({challenges_for_scale_up: e.target.value}) }
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

export default IdeaBusiness;
