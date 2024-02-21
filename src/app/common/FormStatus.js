import React, { Component } from 'react';
import { 
  Layout, Table, message, Tag, Input } from 'antd';
import Bridge from '../constants/Bridge';
import moment from 'moment';

class FormStatus extends Component {

    constructor(props) {
      super(props);
      this.state = {
        posts:[],
        loading: false,
        addModalStatus:false,
        title:'',
        description:'',
        filename:'',
        formloader:false,
        editModalStatus:false,
        edittitle:'',
        editdescription:'',
        editfilename:'',
        blogid:'',
        imagename:'',
        deleteModalStatus:false,
        ctype:'',
        editctype:'',
        youtubelink:'',

        // add input states
        startupname:'',
        dealstartdate:'',
        dealenddate: '',
        targetamount:'',
        mintargetamount:'',
        maxtargetamount:'',
        multipleofdescription:'',
        backedby:'',
        category:'',
        logo:'',
        banner:'',
        

        // update input states
        editstartupname:'',
        editdealstartdate:'',
        editdealenddate: '',
        edittargetamount:'',
        editmintargetamount:'',
        editmaxtargetamount:'',
        editmultipleofdescription:'',
        editbackedby:'',
        editcategory:'',
        editlogo:'',
        editbanner:'',
        edityoutubelink:'',

        deal_id:'',

        deallist:[],
        cdeallist:[],

        // edit states
        approvestatus:'',
        dealstatus:'',
        updatemodalstatus:false,

        logourl:'',
        bannerurl:'',


        paymentlist:[],
        cpaymentlist:[],

        // add founder state list 
        first_name:'',
        last_name:'',
        mobile:'',
        email:'',
        nationality:'',
        dob:'',
        legal_name:'',
        father_name:'',
        address:'',
        bank_ac_no:'',
        ifsc_code:'',
        profile_image:'',

        founder_id:'',

        // edit founder state list 
        edit_first_name:'',
        edit_last_name:'',
        edit_mobile:'',
        edit_email:'',
        edit_nationality:'',
        edit_dob:'',
        edit_legal_name:'',
        edit_father_name:'',
        edit_address:'',
        edit_bank_ac_no:'',
        edit_ifsc_code:'',
        edit_profile_image:'',

      }
    }


    componentDidMount() {
      this.getstatuslist();
      console.log('type',this.props.type);
    }

    showAddModal = () => {
      this.setState({
        addModalStatus: true,
      });
    }
    // get post list
    getstatuslist = () => {
      this.setState({ loading: true });
      Bridge.getformstatuslist().then((result) => {
        if (result.status == 1) {
          let arr=[];
          let founder_id=localStorage.getItem('founder_id');
          if(this.props.type=='founder'){ 
            for(let item of result.data){
              if(founder_id==item.by_founder_id){
                arr.push(item);
              }
            }
          }else{
            arr=result.data;
          }
          this.setState({
            paymentlist: arr,
            cpaymentlist: arr,
            loading: false,
          });
        } else {
          message.error(result.message);
          this.setState({
            loading: false,
          });
        }
      });
    }

    // SEARCH
    searchinput = (e) => {
      let text = e.target.value;
      this.setState({ loading:true,searchinput:text });
      if(text) {
        let arr = [];
        for(let item of this.state.cpaymentlist) {
          if(
            item.name && item.name.includes(text) ||
            item.email && item.email.includes(text) ||
            item.role && item.role.includes(text) 
          ) {
            arr = [...arr, item];
          }
        }
        this.setState({
          paymentlist: arr,
          loading:false,
        });
      } else {
        this.setState({
          paymentlist: this.state.cpaymentlist,
          loading:false,
        });
      }
    }
    
    render() {

      const dataSource = this.state.paymentlist && this.state.paymentlist.map((item, index) => {
        return {
          key: index,
          srno: (index+1),
          name: item.name,
          email:item.email,
          role: item.role ? item.role :'---' ,
          survey_request_date:item.created_at ? moment(item.created_at).format('DD MMM, YYYY') : '---',
          survey_submit_date:item.survey_submit_date ? moment(item.survey_submit_date).format('DD MMM, YYYY') : '---',
        }
      });

      const columns = [
        {
          title: 'Sr No',
          dataIndex: 'srno',
          key: 'srno',
          width: 160,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 160,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 160,
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          width: 160,
        },
        {
          title: 'Information Request Date',
          dataIndex: 'survey_request_date',
          key: 'survey_request_date',
          width: 160,
        },
        {
          title: 'Information Submitted Date',
          dataIndex: 'survey_submit_date',
          key: 'survey_submit_date',
          width: 160,
        },
      ];
    
    return (
      <>
        <Input 
            value={this.state.searchinput}
            placeholder="Search" 
            onChange={(e) => this.searchinput(e)}
            style={{ maxWidth:300,marginBottom:20,height:40 }}
        />
        <Table  className='table-2'
            dataSource={dataSource} 
            columns={columns} 
            loading={this.state.loading}
            bordered
            scroll={{ x: 'max-content' }}
        />
      </>
    );
  }
}

export default FormStatus;