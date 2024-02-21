
import React, { Component } from 'react';
import { message, Spin, Switch, notification } from 'antd';
import Bridge from '../../../constants/Bridge';
import Header from '../custom/Header';
 
class Submission extends Component {

  constructor(props) {
    super(props);
    this.state = {

      loading: false,
      valueispresent:false,
      processtype:'',

      send_response:false,
      validated:false,
    }
  }
  componentDidMount() {
    if(localStorage.getItem('founder_id'))  {
    this.setState({
        valueispresent:true,
        validated:this.props.validated,
    });
    }
  }
  // update
  save=()=>{
    let params={
      send_response:'not sent',
      form_id:localStorage.getItem('form_id'),
      email:this.state.send_response==true ? localStorage.getItem('form_email') : '',
    }
    // console.log('params',params);

    this.setState({ loading: true });
    Bridge.update_form2_last_step(params).then((result) => {
      if(result.status==1) {
        // console.log('form status', result.data);
        message.success('Assessment form successfully submitted.',6);
        this.setState({loading:false});
        window.location.reload();
      } else {
        message.warning(result.message,6);
        this.setState({ loading: false });
      }
    });
  }
  onChange=(checked)=>{
    this.setState({send_response:checked});
  }
  openNotification = (placement, message) => {
    notification.warning({
      message: `Warning!!`,
      description:message,
      placement,
      duration:8,
    });
  };
  check=()=>{
    this.props.check();

    if(this.props.error0=='0'||this.props.error0==''){
      this.openNotification('top','Please fill all mandatory fields of Self Evaluation form.');
      return;
    }
    if(this.props.is_founder_available==true){
      if(this.props.error1=='0'||this.props.error1==''){
        this.openNotification('top','Please fill all mandatory fields of founders tab form.');
        return;
      }
    }
    if(this.props.is_core_team_available==true){
      if(this.props.error2=='0'||this.props.error2==''){
        this.openNotification('top','Please fill all mandatory fields of core team member tab.');
        return;
      }
    }
    if(this.props.is_advisor_available==true){
      if(this.props.error3=='0'||this.props.error3==''){
        this.openNotification('top','Please fill all mandatory fields of advisor tab.');
        return;
      }
    }
    if(this.props.validated==true){
      this.save();
    }else{
    }
  }

  render() {
    return (
      <div>
         <section className="StepForm-section"
         style={{
              marginTop:0,
              padding:0,
              border:'none',
              borderRadius:0, 
              boxShadow:'none',
         }}
         >
            <Spin spinning={this.state.loading}>
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                       <Header title='Submission' />
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                            {/* <div className="form-group">
                              <label for="">Send me a copy of my responses.</label>
                              <Switch 
                                checked={this.state.send_response} 
                                onChange={this.onChange} 
                              />
                            </div> */}
                            <div className="form-group">
                                <div className='arrow-buttons'>
                                </div>
                                <p className='text-center' style={{color:'#29176f'}}>
                                  Please complete all sections on left for successful submission.
                                </p>
                                <div className='d-flex justify-content-center m-auto'>
                                  <button 
                                    style={{width:116}}
                                    class="submit-button" 
                                    // disabled={this.state.validated==false ? true : false}
                                    // style={{
                                    //   cursor:this.state.validated==false ? 'not-allowed': 'pointer',
                                    //   color:this.state.validated==false ? '#000' : '#fff',
                                    //   background:this.state.validated==false ? '#ddd' :'#29176f', 
                                    // }}
                                    onClick={this.check}
                                  >Submit</button>
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

export default Submission;
