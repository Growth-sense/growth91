import React, { Component } from 'react';
import { Modal,Button,Table, Input } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import Bridge from '../../constants/Bridge';
import moment from 'moment';

export default class Invitation_list extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invitation_list_modal:false,
            list:[],
            clist:[],
            deal_name:[],
            deal_name_title:'',
            loading:false,
            // deallist:[],
        }
    }
    componentDidMount(){
    }
    show_total_invitations=()=>{
        this.setState({invitation_list_modal:true},()=>this.get_invitation_list());
    }
    get_invitation_list=()=>{
        let deal_id=this.props.deal_id;
        let params={
            deal_id,
        }
        if(deal_id){
            Bridge.get_invitation_list(params).then((result) => {
                console.log('result',result);
                if(result.status=='1'){
                    this.setState({
                      list:result.data,
                      clist:result.data,
                    });
                    // alert(this.state.list);
                    // console.log(this.state.list.deal_name);
                }
            });
        }
      this.get_deal_name();
    }

    get_deal_name=()=>{
        let deal_id=this.props.deal_id;
        let params={
            deal_id,
        }
        if(deal_id){
            Bridge.get_deal_name(params).then((result) => {
                console.log('result1 :',result);
                if(result.status=='1'){
                    this.setState({deal_name:result.data[0].deal_name});
                    // console.log(this.state.deal_name[0]);
                }
                
            });
          }
        }
        

// SEARCH
searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true });
    if (text) {
      let arr = [];
      for (let item of this.state.clist) {    
        if (
          item.email.includes(text) ||
          item.mobile.includes(text) ||   
          item.name.includes(text)
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        list: arr,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const dataSource =this.state.list &&
      this.state.list.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          name:item.name,
          email:item.email ? item.email : '',
          mobile:item.mobile ? item.mobile : '',
        //   deal_name : item.deal_name ? item.deal_name : '',
          invite_date:item.joining_date ? moment(item.joining_date).format('DD MMM, YYYY'): '---',
          status:Number(item.total_amount)>0 ? 'Invested' : 'Not invested',
          amount:item.total_amount ? '₹ '+item.total_amount : '₹ 0',
        }
      });
    const columns =  [
        {
            title: "Sr No",
            dataIndex: "srno",
            key: "srno",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: "Invitation Date",
            dataIndex: "invite_date",
            key: "invite_date",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Investment Amount",
            dataIndex: "amount",
            key: "amount",
        },
    ];
    return (
      <div>

          
        <Button type="primary" onClick={()=>this.show_total_invitations()}>
            <EyeOutlined /> {this.props.total_invitions} Invitations
        </Button>
        {/* Start invitation list modal  */}
        <Modal 
          title={"Invitation List ("+ this.state.deal_name+")"} 
          visible={this.state.invitation_list_modal} 
          onOk={()=> this.setState({invitation_list_modal:false})} 
          onCancel={()=> this.setState({invitation_list_modal:false})} 
          okText='ok'
          width={800}
        >

          {/* {this.state.deal_name &&
          this.state.deal_name.map((item, index) => {
            this.setState({
              deal_name_title: item.deal_name
            })
          })} */}

        

            

                <div style={{
                      display: 'flex',
                    justifyContent: 'space-between',
                    }}>
                  <Input 
                    value={this.state.searchinput}
                    placeholder="Search" 
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth:300,marginBottom:20,height:40 }}
                  />
                </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                loading={this.state.loading}
                bordered
                scroll={{ x: "max-content" }}
            />
        </Modal>
        {/* End invitation list modal  */}
      </div>
    )
  }
}
