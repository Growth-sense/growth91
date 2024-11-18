
import React, { Component } from 'react';
import { message, Spin, DatePicker } from 'antd';
import Bridge from '../../constants/Bridge';

import moment from 'moment';
import $ from 'jquery';
class FundRaiseRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name_of_legality_entity:'',
      website:'',
      cin_legality_entity:'',
      pan_legality_entity:'',
      registered_in_country:'',
      formality_established_date:'',
      activities_start_date_befire_formal:'',
      address_registered_office:'',
      address_corporate_office:'',
      director_1_name:'',
      director_1_din:'',
      director_2_name:'',
      director_2_din:'',
      director_3_name:'',
      director_3_din:'',
      director_4_name:'',
      director_4_din:'',
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
          name_of_legality_entity:  result.data[0].name_of_legality_entity,
          website:  result.data[0].website,
          cin_legality_entity:  result.data[0].cin_legality_entity,
          pan_legality_entity:  result.data[0].pan_legality_entity,
          registered_in_country:  result.data[0].registered_in_country,
          formality_established_date:  result.data[0].formality_established_date ? moment(result.data[0].formality_established_date) : '',
          activities_start_date_befire_formal: result.data[0].activities_start_date_befire_formal ? moment(result.data[0].activities_start_date_befire_formal) : '',
          address_registered_office:  result.data[0].address_registered_office,
          address_corporate_office:  result.data[0].address_corporate_office,
          director_1_name:  result.data[0].director_1_name,
          director_1_din:  result.data[0].director_1_din,
          director_2_name:  result.data[0].director_2_name,
          director_2_din:  result.data[0].director_2_din,
          director_3_name:  result.data[0].director_3_name,
          director_3_din:  result.data[0].director_3_din,
          director_4_name:  result.data[0].director_4_name,
          director_4_din:  result.data[0].director_4_din,
        });
        if(result.data[0].name_of_legality_entity) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }

  updatefounder = () => {
    let params={
      name_of_legality_entity: this.state.name_of_legality_entity,
      website: this.state.website,
      cin_legality_entity: this.state.cin_legality_entity,
      pan_legality_entity: this.state.pan_legality_entity,
      registered_in_country: this.state.registered_in_country,
      formality_established_date: this.state.formality_established_date,
      activities_start_date_befire_formal: this.state.activities_start_date_befire_formal,
      address_registered_office: this.state.address_registered_office,
      address_corporate_office: this.state.address_corporate_office,
      director_1_name: this.state.director_1_name,
      director_1_din: this.state.director_1_din,
      director_2_name: this.state.director_2_name,
      director_2_din: this.state.director_2_din,
      director_3_name: this.state.director_3_name,
      director_3_din: this.state.director_3_din,
      director_4_name: this.state.director_4_name,
      director_4_din: this.state.director_4_din,
      founder_id: this.state.founder_id,
      no:8,
      main_founder_id:localStorage.getItem('founder_id'),
      f8_status:this.state.processtype=='saveandproceed'?'success':'new',
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
          message.success('Company legality entity details are updated successfully.',6);
        } else {
          message.success('Company legality entity details are updated successfully.',6);
        }
        if(this.props.error=='0'){
          this.props.check();
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  }
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }
  validateName(x)
  {
    var nameVal = x;
    if(/^[A-Za-z\s]+$/.test(x))
      return true;
    else
      return false;
  }

  checkforpan=(e)=>{
    var panVal = e;
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if(regpan.test(panVal)){
    // valid pan card number
        return true;
    } else {
        // invalid pan card number
        message.warning('Invalid pan card no.');
        return false;
    }
}
saveandproceed=()=>{
  if(!this.state.name_of_legality_entity) {
    message.warning('Please enter name of legality entity');
    return;
  } 
    let status=this.checkforpan(this.state.pan_legality_entity);
    if(status==false){
      return;
    }
   else if(!this.state.cin_legality_entity) {
    message.warning('Please enter cin legality entity');
    return;
  } else if(!this.state.pan_legality_entity) {
    message.warning('Please enter pan of legality entity');
    return;
  } else if(!this.state.registered_in_country) {
    message.warning('Please enter registered country name');
    return;
  } else if(!this.state.formality_established_date) {
    message.warning('Please enter value of formally established date');
    return;
  } 
   else if(!this.state.address_registered_office) {
    message.warning('Please enter address registered office');
    return;
  } else if(!this.state.address_corporate_office) {
    message.warning('Please enter address corporate office');
    return;
  } else if(!this.state.director_1_name) {
    message.warning('Please enter director name 1');
    return;
  } else if(!this.state.director_1_din) {
    message.warning('Please enter din of director name 1');
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

    let active = (this.state.name_of_legality_entity && 
          // this.state.website && 
          this.state.cin_legality_entity && 
          this.state.pan_legality_entity && 
          this.state.registered_in_country && 
          this.state.formality_established_date && 
          // this.state.activities_start_date_befire_formal && 
          this.state.address_registered_office && 
          this.state.address_corporate_office && 
          this.state.director_1_name && 
          this.state.director_1_din && 
          // this.state.director_2_name && 
          // this.state.director_2_din && 
          // this.state.director_3_name && 
          // this.state.director_3_din && 
          // this.state.director_4_name && 
          // this.state.director_4_din && 
        this.state.valueispresent==true) ? false : true;

    return (
      <div>
         <section className="StepForm-section" style={{display:"block"}}>
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      {console.log('props error', this.props.error)}
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
                          >Company Legal Entity</span>
                        </div>
                        <hr/>
                      </div>

                      {((this.props.error=='0') && (
                        !this.state.name_of_legality_entity ||
                    
                        !this.state.cin_legality_entity ||
                        !this.state.pan_legality_entity ||
                        !this.state.registered_in_country ||
                        !this.state.formality_established_date ||
                      
                        !this.state.address_registered_office ||
                        !this.state.address_corporate_office ||
                        !this.state.director_1_name ||
                        !this.state.director_1_din ||
                        {/* !this.state.director_2_name ||
                        !this.state.director_2_din ||
                        !this.state.director_3_name ||
                        !this.state.director_3_din ||
                        !this.state.director_4_name ||
                        !this.state.director_4_din    */}
                    )) &&(
                        <div className='error-div'>
                          <div className='error-icon'>
                            <i className='bx bxs-error'></i>
                          </div>
                          <ul>
                            {!this.state.name_of_legality_entity &&(
                              <li>
                                <span>Please enter name of legality entity.</span>
                              </li>
                            )}
                            {/* {!this.state.website &&(
                              <li>
                                <span>Please enter website name.</span>
                              </li>
                            )} */}
                            {!this.state.cin_legality_entity &&(
                              <li>
                                <span>Please enter cin legality entity.</span>
                              </li>
                            )}
                            {!this.state.pan_legality_entity &&(
                              <li>
                                <span>Please enter pan of legality entity</span>
                              </li>
                            )}
                            {!this.state.registered_in_country &&(
                              <li>
                                <span>Please enter registered country name.</span>
                              </li>
                            )}
                            {!this.state.formality_established_date &&(
                              <li>
                                <span>Please enter value of formally established date.</span>
                              </li>
                            )}
                            {/* {!this.state.activities_start_date_befire_formal &&(
                              <li>
                                <span>Please enter value of activities start date before formal</span>
                              </li>
                            )} */}
                            {!this.state.address_registered_office &&(
                              <li>
                                <span>Please enter address registered office</span>
                              </li>
                            )}
                            {!this.state.director_1_name &&(
                              <li>
                                <span>Please enter director name 1.</span>
                              </li>
                            )}
                            {!this.state.director_1_din &&(
                              <li>
                                <span>Please enter din of director name 1.</span>
                              </li>
                            )}
                            {/* {!this.state.director_2_name &&(
                              <li>
                                <span>Please enter director name 2.</span>
                              </li>
                            )}
                            {!this.state.director_2_din &&(
                              <li>
                                <span>Please enter din of director name 2.</span>
                              </li>
                            )}
                            {!this.state.director_3_name &&(
                              <li>
                                <span>Please enter director name 1.</span>
                              </li>
                            )}
                            {!this.state.director_3_din &&(
                              <li>
                                <span>Please enter din of director name 3.</span>
                              </li>
                            )}
                            {!this.state.director_4_name &&(
                              <li>
                                <span>Please enter director name 4.</span>
                              </li>
                            )}
                            {!this.state.director_4_din &&(
                              <li>
                                <span>Please enter din of director name 4.</span>
                              </li>
                            )} */}
                          </ul>
                        </div>
                      )}
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">

                        <div className="form-group">
                              <label for="">Name of the legal entity. <span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='name_of_legality_entity'
                                id="selected-field"
                                value={this.state.name_of_legality_entity}
                                onChange={(e) => this.setState({name_of_legality_entity: e.target.value}) }
                              />
                            </div>         
                            
                            <div className="form-group">
                              <label for="">Website </label>
                              <input  disabled
                                type="url" 
                                name='website'
                                value={this.state.website}
                                onChange={(e) => this.setState({website: e.target.value}) }
                              />
                            </div>
                            
                            <div className="form-group">
                              <label for="">Legal entity - CIN <span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='cin_legality_entity'
                                value={this.state.cin_legality_entity}
                                onChange={(e) => this.setState({cin_legality_entity: e.target.value}) }
                              />
                            </div>        
                            
                            <div className="form-group">
                              <label for="">Legal entity - PAN <span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='pan_legality_entity'
                                value={this.state.pan_legality_entity}
                                onChange={(e) => this.setState({pan_legality_entity: e.target.value}) }
                              />
                            </div>      
                            
                            <div className="form-group">
                              <label for="">Registered in (Country) <span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='registered_in_country'
                                value={this.state.registered_in_country}
                                onChange={(e) => this.setState({registered_in_country: e.target.value}) }
                              />
                            </div>    
                            
                            <div className="form-group step-form-date-input">
                              <label for="">Formally established on(date) <span className="text-danger">*</span></label>
                              
                              <DatePicker
                                value={this.state.formality_established_date}
                                onChange={(date, dateString) => {
                                  this.setState({ formality_established_date:date }) 
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
                              <label for="">Activities start date before formal establishment(if any)</label>
                              <DatePicker
                                value={this.state.activities_start_date_befire_formal}
                                onChange={(date, dateString) => {
                                  this.setState({ activities_start_date_befire_formal:date }) 
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
                              <label for="">Address - Registered office<span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='address_registered_office'
                                value={this.state.address_registered_office}
                                onChange={(e) => this.setState({address_registered_office: e.target.value}) }
                              />
                            </div>
                            
                            <div className="form-group">
                              <label for="">Address - Corporate/Working office <span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='address_corporate_office'
                                value={this.state.address_corporate_office}
                                onChange={(e) => this.setState({address_corporate_office: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Director - 1(Name) <span className="text-danger">*</span></label>
                              <input  disabled
                                type="text" 
                                name='director_1_name'
                                value={this.state.director_1_name}
                                onChange={(e) => this.setState({director_1_name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Director - 1 (DIN) <span className="text-danger">*</span></label>
                              <input  disabled
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='director_1_din'
                                value={this.state.director_1_din}
                                onChange={(e) => this.setState({director_1_din: e.target.value}) }
                              />
                            </div>                            <div className="form-group">
                              <label for="">Director - 2(Name) </label>
                              <input  disabled
                                type="text" 
                                name='director_2_name'
                                value={this.state.director_2_name}
                                onChange={(e) => this.setState({director_2_name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Director - 2(DIN) </label>
                              <input  disabled
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='director_2_din'
                                value={this.state.director_2_din}
                                onChange={(e) => this.setState({director_2_din: e.target.value}) }
                              />
                            </div>                            <div className="form-group">
                              <label for="">Director - 3(Name)</label>
                              <input  disabled
                                type="text" 
                                name='director_3_name'
                                value={this.state.director_3_name}
                                onChange={(e) => this.setState({director_3_name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Director - 3 (DIN) </label>
                              <input  disabled
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='director_3_din'
                                value={this.state.director_3_din}
                                onChange={(e) => this.setState({director_3_din: e.target.value}) }
                              />
                            </div>                            <div className="form-group">
                              <label for="">Director - 4(Name)</label>
                              <input  disabled
                                type="text" 
                                name='director_4_name'
                                value={this.state.director_4_name}
                                onChange={(e) => this.setState({director_4_name: e.target.value}) }
                              />
                            </div>
                            <div className="form-group">
                              <label for="">Director - 4 (DIN)</label>
                              <input  disabled
                                type="number" 
                                onWheel={() => document.activeElement.blur()}
                                name='director_4_din'
                                value={this.state.director_4_din}
                                onChange={(e) => this.setState({director_4_din: e.target.value}) }
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

export default FundRaiseRegistration
