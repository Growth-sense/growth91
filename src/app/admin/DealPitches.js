import React, { Component } from 'react';
import { Table, message, Modal, Menu, Button, Card, Input, Select  } from 'antd';
import Bridge from '../constants/Bridge';
import { EditOutlined } from '@ant-design/icons';
import Apis from '../constants/Apis';

const { Option } =Select;


class DealPitches extends Component {

    constructor(props) {
      super(props);
      this.state = {
        images:[],
        cimages:[],
        loading: false,

        modalStatus: false,
        addmodalstatus:false,
        editmodalstatus:false,
        deletemodalstatus:false,
        id:0,
        pitch_id:0,
        pitch_data:'',
        pitch_img:'',

        add_pitch_file:'',
        edit_pitch_file:'',
        nums:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        add_order:'',
        edit_order:'',
      }
    }

    componentDidMount() {
      this.getpaymentlist();
      if(this.props){
        // console.log('props',this.props.data);
        this.setState({id:this.props.data.deal_id});
      }
    }
    showAddModal = () => {
      this.setState({
        addmodalstatus: true,
      });
    }
    // get post list
    getpaymentlist = () => {
      this.setState({ loading: true });
      let params={
        deal_id:this.props.data.deal_id,
      }
      Bridge.deal_pitch.list(params).then((result) => {
        if (result.status == 1) {
          this.setState({
            images:result.data,
            cimages:result.data,
            loading: false,
          });
        } else {
          this.setState({loading:false});
        }
      });
    }
    onSelectPitchImage = (e) => {
      this.setState({ add_pitch_file: e.target.files[0] });
    }
    onSelectEditPitchImage=(e)=>{
      this.setState({ edit_pitch_file: e.target.files[0] });
    }
    add_pitch=()=>{
      let formdata = new FormData();
      if(!this.state.add_pitch_file){
        message.warn('Please select the pitch image.');
        return;
      }
      if(!this.state.add_order){
        message.warn('Please select the order.');
        return;
      }
      formdata.append('pitch_files',this.state.add_pitch_file);
      formdata.append('deal_id',this.props.data.deal_id);
      formdata.append('pitch_order',this.state.add_order);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      Bridge.deal_pitch.add(formdata,config).then((result) => {
        if (result.status==1) {
          message.success(result.message);
          this.setState({
            addmodalstatus:false,
            add_pitch_file:'',
          },() =>this.getpaymentlist());
        }else{
          message.warn(result.message);
        }
      });
    }
    showdeletemodal=(item)=>{
      this.setState({deletemodalstatus:true,pitch_id:item.id});
    }
    delete=(item)=>{
      let params={
        pitch_id:this.state.pitch_id,
      }
      Bridge.deal_pitch.delete(params).then((result) => {
        if(result.status==1){
          message.success(result.message);
          this.setState({
            deletemodalstatus:false,
            pitch_id:0,
          },() =>this.getpaymentlist());
          return;
        }else{
          message.warn(result.message);
          return;
        }
      });
    }
    edit_pitch=()=>{
      let formdata = new FormData();
      if(!this.state.edit_order){
        message.warn('Please select the order number.');
        return;
      }
      formdata.append('pitch_files',this.state.edit_pitch_file);
      formdata.append('pitch_id',this.state.pitch_id);
      formdata.append('deal_id',this.props.data.deal_id);
      formdata.append('pitch_order',this.state.edit_order);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      Bridge.deal_pitch.update(formdata,config).then((result) => {
        if (result.status==1) {
          message.success(result.message);
          this.setState({
            editmodalstatus:false,
            edit_pitch_file:'',
          },() =>this.getpaymentlist());
        }else{
          message.warn(result.message);
        }
      });
    }
    showeditmodal=(item)=>{
      let pitchImg=Apis.IMAGEURL+'deal/pitch_images/'+item.deal_id+'/'+item.image;
      this.setState({
        editmodalstatus:true,
        pitch_id:item.id,
        pitch_data:item,
        pitch_img:pitchImg,
        edit_order:item.pitch_order,
      });
    }
    handleChange = (value) => {
      console.log(`selected ${value}`);
    }
    
    render() {

      const dataSource = this.state.images && this.state.images.map((item, index) => {
        return {
          key: index,
          image: item,
          action:item,
          srno:(item.id),
          order:item.pitch_order,
        }
      });

      const columns = [
        {
          title:'Pitch Id',
          dataIndex:'srno',
          key:'srno',
        },
        {
          title:'Order',
          dataIndex:'order',
          key:'order',
        },
        {
          title:'Pitch',
          dataIndex:'image',
          key:'image',
          width:250,
          render:(text)=>{
            let pitchImg=Apis.IMAGEURL+'deal/pitch_images/'+text.deal_id+'/'+text.image;
            return(
              <img 
                src={pitchImg} 
                style={{width:200}}
              />
            )
          }
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render:(text)=>{
            console.log('text',text);
            return(
              <div>
                <Button type="primary" onClick={()=>this.showeditmodal(text)} style={{marginRight:10}}>Edit</Button>
                <Button type="danger" onClick={()=>this.showdeletemodal(text)}>Delete</Button>
              </div>
            )
          }
        },
      ];
    
    return (
      <>
        <Menu.Item key={`pitch_${this.props.data.deal_id}`} icon={<EditOutlined />}>
            <a 
                href="#" 
                style={{fontSize:14}} 
                onClick={()=>this.setState({modalStatus:true})}
            >
                &nbsp;&nbsp;Pitch List
            </a>
        </Menu.Item>
        <Modal 
          title="Pitch Images" 
          visible={this.state.modalStatus}
          onCancel={()=>this.setState({modalStatus:false})}
          footer={false}
          width={700}
        >
            <Card
                title=""
                extra={<Button type="primary" onClick={()=>this.setState({addmodalstatus:true})}>Add Pitch</Button>}
                style={{width:'100%'}}
            >
                <Table 
                    
                    dataSource={dataSource} 
                    columns={columns} 
                    loading={this.state.loading}
                    bordered
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </Modal>

        {/* Add modal  */}
        <Modal 
          title="Add Pitch" 
          visible={this.state.addmodalstatus} 
          onOk={()=>this.add_pitch()} 
          onCancel={()=>this.setState({addmodalstatus:false})}
          width={450}
          okText={'Submit'}
        >
          <div className='mt-2'>
            <label className='mb-2'>Order <span className='text-danger'>*</span></label>
            <br/>
            <Select
              style={{width:'100%'}}
              onChange={(value)=>this.setState({add_order:value})}
            >
              {this.state.nums.map((item,index)=>{
                return(
                  <Option value={item} key={index}>{item}</Option>
                )
              })}
            </Select>
          </div>
          <div className='mt-2'>
            <label className='mb-2'>Select Pitch Image <span className='text-danger'>*</span></label>
            <br/>
            {this.state.pitch_data.image && (
              <img src={this.state.pitch_img} style={{width:200}}/>
            )}
            <Input 
              type='file'
              onChange={(e) => this.onSelectPitchImage(e)}
              accept=".jpg, .jpeg, .png, .webp"
            />
          </div>
        </Modal>

        {/* Edit modal  */}
        <Modal 
          okText={'Update'}
          title="Update Pitch" 
          visible={this.state.editmodalstatus} 
          onOk={()=>this.edit_pitch()}
          onCancel={()=>this.setState({editmodalstatus:false})}
          width={450}
        >
          <div className='mt-2'>
            <label className='mb-2'>Order <span className='text-danger'>*</span></label>
            <br/>
            <Select
              style={{width:'100%'}}
              onChange={(value)=>this.setState({edit_order:value})}
            >
              {this.state.nums.map((item,index)=>{
                return(
                  <Option value={item} key={index}>{item}</Option>
                )
              })}
            </Select>
          </div>
          <div className='mt-2'>
            <label className='mb-2'>Select Pitch Image <span className='text-danger'>*</span></label>
            <br/>
            {}
            <Input 
              type='file'
              onChange={(e) => this.onSelectEditPitchImage(e)}
              accept=".jpg, .jpeg, .png, .webp"
            />
          </div>
        </Modal>

        {/* Delete modal  */}
        <Modal 
          okText={'Delete'}
          title="Delete Pitch" 
          visible={this.state.deletemodalstatus} 
          onOk={()=>this.delete()} 
          onCancel={()=>this.setState({deletemodalstatus:false})}
          width={450}
        >
          <p style={{padding:'4px 10px'}}>Are you sure you want to delete pitch image?</p>
        </Modal>

      </>
    );
  }
}

export default DealPitches;