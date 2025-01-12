import React, { Component } from 'react';
import { message, Spin, Checkbox } from 'antd';
import Bridge from '../../constants/Bridge';
import $ from 'jquery';
class Declaration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      send_me_copy_of_response:'',
      founder_id:'',
      loading:false,
      valueispresent:false,
      processtype:'',
      validated:'',
      disableStatus:false,
      checkedStatus:false,
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
          send_me_copy_of_response: result.data[0].send_me_copy_of_response,
        });
        if(result.data[0].send_me_copy_of_response) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }


  // register
  updatefounder = () => {   
    let params={
      send_me_copy_of_response:this.state.checkedStatus==true ? 'agreed' : 'Not Agreed',
      founder_id: this.state.founder_id,
      no:19,
      main_founder_id:localStorage.getItem('founder_id'),
    }
    this.setState({ loading: true });
    Bridge.founder.updatefounder(params).then((result) => {
      if (result.status == 1) {
        this.setState({ loading: false,valueispresent:true },() => this.getData(this.state.founder_id));
        this.startupFormsSuccessEmail();
        this.props.fatchdata();
        // this.openNotification('topRight');
        message.success('Form is submited successfully');
        setTimeout(()=>{
          window.location.reload();
        },3000);
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    });
  }
  saveandproceed=()=>{
    if(this.state.validated==true){
      console.log('validated',this.state.validated);
      this.updatefounder();
    }else{
      message.warning('Please fill all given forms.');
      return;
    }
  }
  startupFormsSuccessEmail(){
    let params={
      founder_id:localStorage.getItem('founder_id')
    }
    Bridge.founder.startupFormsSuccessEmail(params).then((result)=>{
      if(result=='1'){
        console.log('email send');
        message.success('Email sent successfully');
      }else{
        message.warning('Something went wrong. Please try again!');
      }
    })
  }
  save=()=>{
    this.setState({processtype:'save'},()=>this.updatefounder());
  }
  checkforvalidation=()=>{
    let params = {
      founder_id:localStorage.getItem('founder_id'),
    }
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status==1) { 
        if(result.data.length>0){
          let item=result.data[0];
          console.log(item);
          if(
            item.f1_status=='success' &&
            item.f2_status=='success' &&
            item.f3_status=='success' &&
            item.f4_status=='success' &&
            item.f5_status=='success' &&
            item.f6_status=='success' &&
            item.f7_status=='success' &&
            item.f8_status=='success' &&
            item.f10_status=='success' &&
            item.f11_status=='success' &&
            item.f12_status=='success' &&
            item.f13_status=='success' &&
            item.f15_status=='success' &&
            item.f16_status=='success' &&
            item.f17_status=='success' &&
            item.f19_status=='success'
          ){
            this.setState({validated:true});
          }else{
            this.setState({validated:false});
          }
        }
      } 
    });
  }
  validate_forms=()=>{
    if(this.state.checkedStatus==false) {
      message.warning('Please agree the declaration.');
      return;
    }
    this.props.check(-1);
    this.checkforvalidation();
  }
  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({checkedStatus:e.target.checked});
  };
  render() {
    let active = (this.state.send_me_copy_of_response && 
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
                          >Declaration </span>
                        </div>
                        <hr/>
                      </div>
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            <div className="form-group">
                              <div className='d-flex'>
                                <Checkbox 
                                  onChange={this.onChange}
                                  checked={this.state.checkedStatus}
                                  style={{marginRight:13,textAlign:"justify"}}
                                >
                                  All the information provided is true and correct to the best of our knowledge.   If at any time in future, it is found that information presented was incorrect or wrongly presented with specific intentions; we shall take sole responsibility of the consequences.  If funding decisions are made based on wrong information provided by us; we shall indemnify the investors up to total invested amount.<span className="text-danger">*</span>
                                </Checkbox> 
                              </div>
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
                                onClick={this.props.prev}
                                class="submit-button"><i className='bx bx-chevron-left'></i></button>
                              </div>
                              <div>
                                <button 
                                  style={{ marginRight:13 }}
                                  class="submit-button" 
                                  onClick={() => this.validate_forms()}
                                >Validate All Sections</button>
                                {this.state.validated==true ? (
                                  <button 
                                    class="submit-button"
                                    style={{
                                      background: '#29176f',
                                      border: '1px solid #29176f',
                                      color: '#fff',
                                      width:116
                                    }}
                                    onClick={() => this.saveandproceed()}
                                  >Submit</button>
                                ):(
                                  <button 
                                    class="submit-button"
                                    disabled={true} 
                                    style={{
                                      background:'#ddd',
                                      border:'1px solid #ddd',
                                      color:'#959595',
                                      width:116
                                    }}
                                  >Submit</button>
                                )}
                              </div>
                            </div>
                            <p style={{
                              color:'#29176f',
                              position:'relative',
                              top:-81,
                            }}>
                            Instuction: Please validate all sections to enable the submit button.
                            </p>
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

export default Declaration;
