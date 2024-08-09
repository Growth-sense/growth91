
import React, { Component } from 'react';
import { message, Spin, Button, notification  } from 'antd';
import Bridge from '../../constants/Bridge';
import ProgressBar from "@ramonak/react-progress-bar";
import { DownloadOutlined,DeleteOutlined } from '@ant-design/icons';
import $ from 'jquery';
class SupportingDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      have_you_raised_fund_for_startup:'',
      pitch:'',
      documents:[],
      pitchpdffile:'',
      documentfile:'',
      founder_id:'',
      loading:false,
      valueispresent:false,
      processtype:'',
      upload_progres1:false,
      upload_progres2:false,
      upload_progres3:false,
      show_progress_bar:false,
      upload_progres1_no:0,
      upload_progres2_no:0,
      upload_progres3_no:0,
      formloader:false,
      formloader2:false,
      uploaded_document_list:[],
    }
  }
  componentDidMount() {
   if (this.props.id) {
      let id = this.props.id;
     
    }
    $('#selected-field').focus();
    this.props.check();
    // console.log('validated', this.props.validated);
  }
  getData = (id) => {
   let params = {
      founder_id: this.props.id
    }
    Bridge.founder.getFounderDetails(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          pitchpdffile: result.data[0].pitch,
          uploaded_document_list: result.data[0].documents ? JSON.parse(result.data[0].documents) : [] ,
        });
        if(result.data[0].pitch) {
          this.setState({ valueispresent:true });
        }
      } 
    });
  }
  saveandproceed=()=>{
    // if(this.state.pitchpdffile){
    //   message.warning('Please delete the existing, if you want to upload file');
    //   return;
    // }
    if(!this.state.pitch) {
      message.warning('Please select pitch file.');
      return;
    }
    if(this.state.pitch.size>=10000000){
      message.warning('File size of pitch file should less than 10mb.');
      return;
    }
    if(this.state.documents.length>0){
      if(this.state.documents.length>3){
        message.warning('You can upload maximum 3 files.');
        return;  
      } else {
        let status=true;
        for(let item of this.state.documents){
          if(item.size>=10000000){
            message.warning('File size of document should less than 10mb.');
            return;
          }
        }
      }
    }
    // this.props.check();
    this.setState({processtype:'saveandproceed'},()=>this.updateimg());
  }
  save=()=>{
    // if(this.state.pitchpdffile){
    //   message.warning('Please delete the existing, if you want to upload file');
    //   return;
    // }
    this.setState({processtype:'save'},()=>this.updateimg());
  }
  onChangeFile = (e, type) => { 
    if(type=='pdf') {
      this.setState({
        pitch: e.target.files[0],
      });
    } 
  }
  onChangeMultipleFile = (e) => { 
    let arr=[]
    for(let file of e.target.files){
      arr.push(file);
    }
    this.setState({
      documents:arr,
    });
  }
  updateimg = () => {
    let i=0;
    if(this.state.documents.length>0){
      this.setState({formloader:true,formloader2:true});
      this.state.documents.map((item, index) => {
        this.setState({show_progress_bar:true});
        if(index=='0'){
          this.setState({upload_progres1_no:0});
        } else if(index=='1'){
          this.setState({upload_progres2_no:10});
        } else if(index=='2'){
          this.setState({upload_progres3_no:10}); 
        }
        let formdata = new FormData();
        formdata.append('pitch', this.state.pitch);
        formdata.append('documents', item);
        formdata.append('founder_id', localStorage.getItem('founder_id'));
        formdata.append('f19_status', this.state.processtype=='saveandproceed'?'success':'new');
        formdata.append('status', this.state.processtype);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
        Bridge.founders.uploadpitchfile(formdata, config).then((result) => {
          if (result.status==1) {
            if(index=='0'){
              this.setState({upload_progres1:true,upload_progres1_no:100});
            } else if(index=='1'){
              this.setState({upload_progres2:true,upload_progres2_no:100});
            } else if(index=='2'){
              this.setState({upload_progres3:true,upload_progres3_no:100}); 
            }
            if((index+1)==this.state.documents.length){
              this.getData(localStorage.getItem('founder_id'));   
              this.setState({
                formloader:false,
                formloader2:false,
                pitch:'',
                documents:[],
              });
              if(this.state.processtype=='next'){
                this.props.next();
              } else if(this.state.processtype=='prev'){
                this.props.prev();
              } else if(this.state.processtype=='saveandproceed'){
                this.props.activate();
                message.success('Documents are updated successfully.',6);
              } else {
                message.success('Documents are updated successfully.',6);
              }
            }
          } else {
            this.setState({formloader:false,formloader2:false});
            message.error(result.msg);
          }
        });
        i++;
      }); 
    } else{
      this.setState({formloader:true,show_progress_bar:false});
      let formdata = new FormData();
      formdata.append('pitch', this.state.pitch);
      formdata.append('documents', '');
      formdata.append('founder_id', localStorage.getItem('founder_id'));
      formdata.append('f19_status', this.state.processtype=='saveandproceed'?'success':'new');
      formdata.append('status', this.state.processtype);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      Bridge.founders.uploadpitchfile(formdata, config).then((result) => {
        if (result.status==1) {
          this.getData(localStorage.getItem('founder_id'));   
          this.setState({formloader:false,pitch:'',documents:[]});
          if(this.state.processtype=='next'){
            this.props.next();
          } else if(this.state.processtype=='prev'){
            this.props.prev();
          } else if(this.state.processtype=='saveandproceed'){
            this.props.activate();
            message.success('Data is uploaded successfully.',6);
          } else {
            message.success('Data is uploaded successfully.',6);
          }
        } else {
          this.setState({formloader:false});
        }
      });
    }
  }
  openpitchfile=()=>{
    let link = `${process.env.REACT_APP_BASE_URL}api/uploads/founders/pitch/${localStorage.getItem('founder_id')}/${this.state.pitchpdffile}`;
    window.open(link,'_blank');
  }
  opendocumentfile=(docname)=>{
    let link = `${process.env.REACT_APP_BASE_URL}api/uploads/founders/documents/${localStorage.getItem('founder_id')}/${docname}`;
    window.open(link,'_blank');
  }
  openNotification = (placement) => {
    notification.success({
      message: `Founder form is submitted successfully.`,
      description:
        'Thank you for completing founder form.',
      placement,
    });
    setTimeout(() => {
      localStorage.removeItem('register_id');
      window.location.reload();
    }, 3000);
  }
  next=()=>{
    // if(this.state.pitchpdffile){
    //   message.warning('Please delete the existing, if you want to upload file');
    //   return;
    // }
    this.setState({processtype:'next'},()=>this.updateimg());
  }
  prev=()=>{
    // if(this.state.pitchpdffile){
    //   message.warning('Please delete the existing, if you want to upload file');
    //   return;
    // }
    this.setState({processtype:'prev'},()=>this.updateimg());
  }
  deletedocument=(item)=>{
    let arr=[];
    this.setState({show_progress_bar:false});
    for(let single of this.state.uploaded_document_list){
      if(single!=item){
        arr=[...arr, single];
      }
    }
    let params={
      founder_id:localStorage.getItem('founder_id'),
      documents:arr,
      removed_document:item,
    }
    Bridge.founders.delete_startup_form_document(params).then((result) => {
      if (result.status==1) {
        message.success(result.message);
        this.getData(localStorage.getItem('founder_id'));
        this.setState({show_progress_bar:false});  
      } else {}
    });
  }
  delete_pitch_file=()=>{
    let params={
      founder_id:localStorage.getItem('founder_id'),
      pitch:this.state.pitchpdffile,
    }
    Bridge.delete_pitch_file(params).then((result) => {
      if (result.status==1) {
        message.success(result.message);
        this.getData(localStorage.getItem('founder_id'));  
      } else {
        message.warning('Please try again!');
        return;
      }
    });
  }
  openInputTypefile=()=>{
    $('#pitch_input_type_file').trigger('click'); 
  }
  triggerDocumentInputFile=()=>{
    $('#document_input_type_file').trigger('click'); 
  }
  render() {
     let active = (this.state.have_you_raised_fund_for_startup && 
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
                          >Supporting Documents</span>
                        </div>
                        <hr/>
                      </div>
                      {((this.props.error=='0') && (
                        (!this.state.pitchpdffile || !this.state.pitch) ||
                        (!this.state.documentfile || !this.state.documents)
                      )
                        ) &&(
                          <div className='error-div'>
                            <div className='error-icon'>
                              <i className='bx bxs-error'></i>
                            </div>
                            <ul>
                              {(!this.state.pitchpdffile || !this.state.pitch) &&(
                                <li>
                                  <span>Please select pitch file.</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      <div className="row" style={{ maxWidth: 900 }}>
                        <div className="col-lg-12">
                          <Spin spinning={this.state.formloader}>
                            <div className="form-group ">
                              <div className='mt-4'>
                                <label className='mb-2'>Select Pitch PDF (Max file size should be 10MB)<span className='text-danger'>*</span></label>
                                
                                {this.state.pitchpdffile && (  
                                  <div>                              
                                    <Button disabled type="primary" onClick={()=>this.openpitchfile()}>
                                      Open Pitch File
                                    </Button>
                                    <Button disabled 
                                      icon={<DeleteOutlined />}
                                      style={{marginBottom:10}} type="danger"
                                      onClick={()=>this.delete_pitch_file()}>
                                    </Button>
                                  </div>
                                )}          
                                <div className='d-flex'>
                                  <Button disabled 
                                    onClick={()=>this.openInputTypefile()}
                                    disabled={this.state.pitchpdffile ? true : false}
                                  >
                                    Select Pitch file
                                  </Button> 
                                  &nbsp;&nbsp;{this.state.pitch ? '(1 file is selected)' : ''}
                                </div>                      
                                <input  disabled
                                  type='file'
                                  id="pitch_input_type_file"
                                  onChange={(e) => this.onChangeFile(e,'pdf')}
                                  accept=".pdf,.docx"
                                  style={{display:'none'}}
                                />
                              </div>  
                            </div>
                          </Spin>
                          <div className="form-group ">
                            <div className='mt-4'>
                              <Spin spinning={this.state.formloader2}>
                                <div className='d-flex flex-wrap justify-content-start align-items-center'>
                                  <label className='mb-2'>Please select document.(Maximum of 3 documents, 10MB each can be uploaded)</label>
                                  {this.state.uploaded_document_list && this.state.uploaded_document_list.map((item,index)=>{
                                    return(
                                      <div style={{marginRight:10}}>
                                        <Button disabled 
                                        icon={<DownloadOutlined />}
                                        style={{marginBottom:10}} type="primary" key={index} onClick={()=>this.opendocumentfile(item)}>
                                          {item}
                                        </Button> 
                                        <Button disabled 
                                        icon={<DeleteOutlined />}
                                        style={{marginBottom:10}} type="danger" key={index} 
                                        onClick={()=>this.deletedocument(item)}
                                        >
                                        </Button> 
                                      </div>
                                    )
                                  })}
                                  <input  disabled
                                    type='file'
                                    multiple={true}
                                    id="document_input_type_file"
                                    onChange={(e) => this.onChangeMultipleFile(e)}
                                    accept=".pdf,.docx"
                                    style={{display:'none'}}
                                  />
                                </div>
                                <div className='d-flex'>
                                  <Button disabled onClick={()=>this.triggerDocumentInputFile()}>
                                    Select Documents file 
                                  </Button>
                                  &nbsp;&nbsp;{this.state.documents.length>0 ? `(${this.state.documents.length} file is selected)` : ''}
                                </div>
                              </Spin>
                              {this.state.show_progress_bar==true && (
                                <>
                                {this.state.documents.map((item, index)=>{
                                  return(
                                    <div style={{marginBottom:16}} key={index}>
                                      <p style={{marginBottom:4}}>File name: {item.name}</p>
                                      {index=='0' && (
                                        <>
                                          <ProgressBar 
                                            completed={this.state.upload_progres1_no} 
                                            maxCompleted={100} 
                                          />
                                        </>
                                      )}
                                      {index=='1' && (
                                        <>
                                          <ProgressBar 
                                          completed={this.state.upload_progres2_no} 
                                            maxCompleted={100} 
                                          />
                                        </>
                                      )}
                                      {index=='2' && (
                                        <>
                                          <ProgressBar 
                                            completed={this.state.upload_progres3_no}  
                                            maxCompleted={100} 
                                          />
                                        </>
                                      )}
                                    </div>
                                  )
                                  })}
                                </>
                              )}
                              <br/>
                            </div>  
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

export default SupportingDocuments;
