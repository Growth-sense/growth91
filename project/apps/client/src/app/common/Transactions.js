import React, { Component } from 'react';
import {
  Layout, Table, message, Tag, Input, Button, Spin
} from 'antd';
import Bridge from '../constants/Bridge';
import moment from 'moment';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";


class Transactions extends Component {


  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      addModalStatus: false,
      title: '',
      description: '',
      filename: '',
      formloader: false,
      editModalStatus: false,
      edittitle: '',
      editdescription: '',
      editfilename: '',
      blogid: '',
      imagename: '',
      deleteModalStatus: false,
      ctype: '',
      editctype: '',
      youtubelink: '',

      // add input states
      startupname: '',
      dealstartdate: '',
      dealenddate: '',
      targetamount: '',
      mintargetamount: '',
      maxtargetamount: '',
      multipleofdescription: '',
      backedby: '',
      category: '',
      logo: '',
      banner: '',


      // update input states
      editstartupname: '',
      editdealstartdate: '',
      editdealenddate: '',
      edittargetamount: '',
      editmintargetamount: '',
      editmaxtargetamount: '',
      editmultipleofdescription: '',
      editbackedby: '',
      editcategory: '',
      editlogo: '',
      editbanner: '',
      edityoutubelink: '',

      deal_id: '',
      searchinput: '',

      deallist: [],
      cdeallist: [],

      // edit states
      approvestatus: '',
      dealstatus: '',
      updatemodalstatus: false,

      logourl: '',
      bannerurl: '',


      paymentlist: [],
      cpaymentlist: [],

      // add founder state list 
      first_name: '',
      last_name: '',
      mobile: '',
      email: '',
      nationality: '',
      dob: '',
      legal_name: '',
      father_name: '',
      address: '',
      bank_ac_no: '',
      ifsc_code: '',
      profile_image: '',

      founder_id: '',

      // edit founder state list 
      edit_first_name: '',
      edit_last_name: '',
      edit_mobile: '',
      edit_email: '',
      edit_nationality: '',
      edit_dob: '',
      edit_legal_name: '',
      edit_father_name: '',
      edit_address: '',
      edit_bank_ac_no: '',
      edit_ifsc_code: '',
      edit_profile_image: '',

    }
  }


  componentDidMount() {
    this.getpaymentlist();
    // console.log('type',this.props.type);
  }

  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  }

  // get post list
  getpaymentlist = () => {
    this.setState({ loading: true });
    Bridge.admin.transactions().then((result) => {
      if (result.status == 1) {
        let arr = [];
        if (this.props.type == 'admin') {
          for (let item of result.data) {
            if (item.payment_type == 'online payment') {
              arr.push(item);
            }
          }
        } else {
          for (let item of result.data) {
            if (item.investor_id == this.props.investor_id) {
              arr.push(item);
            }
          }
        }
        this.setState({
          paymentlist: arr,
          cpaymentlist: arr,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  // on change file
  onChangeEditFile = (e, type) => {
    if (type == 'banner') {
      this.setState({
        editbanner: e.target.files[0],
      });
    } else {
      this.setState({
        editlogo: e.target.files[0],
      });
    }
  }

  // show edit modal
  showEditModal = (item) => {
    // console.log('item',item);

    this.setState({

      edit_first_name: item.first_name,
      edit_last_name: item.last_name,
      edit_mobile: item.mobile,
      edit_email: item.email,
      edit_nationality: item.nationality,
      edit_dob: item.date_of_birth ? moment(item.date_of_birth) : '',
      edit_legal_name: item.legal_name,
      edit_father_name: item.fathers_name,
      edit_address: item.address,
      edit_bank_ac_no: item.bank_ac_no,
      edit_ifsc_code: item.ifsc_code,
      editModalStatus: true,
      founder_id: item.investor_id,
    });
  }

  showupdatemodal = (item) => {
    this.setState({
      deal_id: item.deal_id,
      approvestatus: item.user_status,
      dealstatus: item.deal_status,
      updatemodalstatus: true,
    });
  }

  // update post
  updatedeal = () => {
    if (this.state.edit_first_name == '') {
      message.warning('First name is required');
      return false;
    } else if (this.state.edit_last_name == '') {
      message.warning('Last name is required');
      return false;
    } else if (this.state.edit_email == '') {
      message.warning('Email is required.');
      return false;
    } else if (this.state.edit_mobile == '') {
      message.warning('Contact no is required.');
      return false;
    } else if (this.state.edit_nationality == '') {
      message.warning('Please select the nationality option.');
      return false;
    } else if (this.state.edit_dob == '') {
      message.warning('Date of birth is required.');
      return false;
    } else if (this.state.edit_legal_name == '') {
      message.warning('Legal name is required.');
      return false;
    } else if (this.state.edit_father_name == '') {
      message.warning('Father name is required.');
      return false;
    } else if (this.state.edit_address == '') {
      message.warning('Address is required.');
      return false;
    } else if (this.state.edit_bank_ac_no == '') {
      message.warning('Bank account no is required.');
      return false;
    } else if (this.state.edit_ifsc_code == '') {
      message.warning('IFSC code is required.');
      return false;
    }

    this.setState({ formloader: true });

    let params = {
      first_name: this.state.edit_first_name,
      last_name: this.state.edit_last_name,
      mobile: this.state.edit_mobile,
      email: this.state.edit_email,
      nationality: this.state.edit_nationality,
      dob: this.state.edit_dob,
      legal_name: this.state.edit_legal_name,
      father_name: this.state.edit_father_name,
      address: this.state.edit_address,
      bank_ac_no: this.state.edit_bank_ac_no,
      ifsc_code: this.state.edit_ifsc_code,
      founder_id: this.state.founder_id,
    }


    Bridge.founders.edit(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          formloader: false,
          editModalStatus: false,
          edit_first_name: '',
          edit_last_name: '',
          edit_mobile: '',
          edit_email: '',
          edit_nationality: '',
          edit_dob: '',
          edit_legal_name: '',
          edit_father_name: '',
          edit_address: '',
          edit_bank_ac_no: '',
          edit_ifsc_code: '',
          founder_id: '',
        }, () => this.getpaymentlist());
        // if(this.state.editlogo || this.state.editbanner) {
        //   this.updateimg(this.state.deal_id, 'edit');
        // }
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  }

  showDeleteModal = (item) => {
    this.setState({
      deleteModalStatus: true,
      deal_id: item.deal_id,
    });
  }

  deletedeal = () => {
    if (this.state.deal_id == '') {
      message.warning('Please select the deal first.');
      return false;
    }

    this.setState({ formloader: true });
    let formData = new FormData();    //formdata object
    formData.append('id', this.state.deal_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    Bridge.deal.delete(formData, config).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          formloader: false,
          deleteModalStatus: false,
          deal_id: '',
        }, () => this.getpaymentlist());
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  }

  // on change select
  handleChangeSelect = (value) => {
    this.setState({ ctype: value });
  }


  // actuall functionality

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    console.log(text);
    if (text) {
      let arr = [];
      for (let item of this.state.cpaymentlist) {
        if (
          (item.deal_name && item.deal_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.first_name && item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.last_name && item.last_name.toLowerCase().includes(text.toLowerCase())) ||
          item.payment_date &&  moment(item.payment_date).format('DD MMM, YYYY').includes(text) ||
          item.paymentid && item.paymentid.includes(text) ||
          item.payment_amount && item.payment_amount.includes(text) ||
          item.total_paid_amount && item.total_paid_amount.includes(text) ||
          item.payment_ref && item.payment_ref.includes(text)
          // item.description && item.description.includes(text) ||
          // item.payment_ref && item.payment_ref.includes(text)
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        paymentlist: arr,
        loading: false,
      });
      // if(arr.length==0){
      //   this.setState({paymentlist:this.state.cpaymentlist});
      // }
    } else {
      this.setState({
        paymentlist: this.state.cpaymentlist,
        loading: false,
      });
    }
  }

  onChangeStartDate = (date, dateString) => {
    this.setState({
      dealstartdate: date,
    });
  }

  onChangeEndDate = (date, dateString) => {
    this.setState({
      dealenddate: date,
    });
  }

  onChangeStartDateEdit = (date, dateString) => {
    this.setState({
      editdealstartdate: date,
    });
  }

  onChangeDOB = (date, dateString) => {
    this.setState({
      dob: date,
    });
  }

  onChangeDOBedit = (date, dateString) => {
    this.setState({
      edit_dob: date,
    });
  }

  handleChangeSelected = (value) => {
    // console.log('value', value);
    this.setState({ category: value });
  }
  handleChangeSelectededit = (value) => {
    // console.log('value', value);
    this.setState({ editcategory: value });
  }

  // on change file
  onChangeFile = (e,) => {
    this.setState({
      profile_image: e.target.files[0],
    });
  }

  // add new deal
  addfounder = () => {
    if (this.state.first_name == '') {
      message.warning('First name is required');
      return false;
    } else if (this.state.last_name == '') {
      message.warning('Last name is required');
      return false;
    } else if (this.state.email == '') {
      message.warning('Email is required.');
      return false;
    } else if (this.state.mobile == '') {
      message.warning('Contact no is required.');
      return false;
    } else if (this.state.nationality == '') {
      message.warning('Please select the nationality option.');
      return false;
    } else if (this.state.dob == '') {
      message.warning('Date of birth is required.');
      return false;
    } else if (this.state.legal_name == '') {
      message.warning('Legal name is required.');
      return false;
    } else if (this.state.father_name == '') {
      message.warning('Father name is required.');
      return false;
    } else if (this.state.address == '') {
      message.warning('Address is required.');
      return false;
    } else if (this.state.bank_ac_no == '') {
      message.warning('Bank account no is required.');
      return false;
    } else if (this.state.ifsc_code == '') {
      message.warning('IFSC code is required.');
      return false;
    } else if (this.state.profile_image == '') {
      message.warning('Please select the image first');
      return false;
    }

    this.setState({ formloader: true });

    let params = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      mobile: this.state.mobile,
      email: this.state.email,
      nationality: this.state.nationality,
      dob: this.state.dob,
      legal_name: this.state.legal_name,
      father_name: this.state.father_name,
      address: this.state.address,
      bank_ac_no: this.state.bank_ac_no,
      ifsc_code: this.state.ifsc_code,
    }

    Bridge.founders.add(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          formloader: false,
          addModalStatus: false,
          first_name: '',
          last_name: '',
          mobile: '',
          email: '',
          nationality: '',
          dob: '',
          legal_name: '',
          father_name: '',
          address: '',
          bank_ac_no: '',
          ifsc_code: '',
        });
        // ,() =>this.updateimg(result.data, 'add')
      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  }
  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.paymentlist) {
      let obj = {
        "Sr No": count,
        "Payment Id": item.paymentid,
        "Investor Name": item.first_name + item.last_name,
        "Deal Name": item.name,
        "Payment Status": item.payment_status,
        "Payment Order Id": item.payment_ref,
        "Payment Date": item.payment_date,
        "Investment": item.payment_amount,
        "Convenience Fees": item.processing_fees,
        "Wallet Amount": item.wallet,
        "Payable Amount": item.total_paid_amount,
        "Payment Type": item.payment_type,
        "Payment Description": item.description,
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Founders data exported successfully.");
  };
  updateimg = (id, type) => {
    let formdata = new FormData();
    if (type == 'add') {
      formdata.append('banner', this.state.banner);
      formdata.append('logo', this.state.logo);
    } else {
      formdata.append('banner', this.state.editbanner);
      formdata.append('logo', this.state.editlogo);
    }

    formdata.append('deal_id', id);


    // console.log('formdata',formdata);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    Bridge.deal.uploaddealimg(formdata, config).then((result) => {
      if (result.status == 1) {
        this.setState({
        }, () => this.getpaymentlist());
      } else {
      }
    });
  }

  updatestatus = () => {
    let params = {
      dealstatus: this.state.dealstatus,
      approvestatus: this.state.approvestatus,
      id: this.state.deal_id,
    }
    this.setState({ formloader: true });
    Bridge.deal.updatestatus(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState({
          formloader: false,
          dealstatus: '',
          approvestatus: '',
          updatemodalstatus: false,
        }, () => this.getpaymentlist());

      } else {
        message.error(result.message);
        this.setState({
          formloader: false,
        });
      }
    });
  }

  handleChangeSelect = (e) => {
    this.setState({
      nationality: e.target.value,
    });
  }

  handleChangeSelectedit = (e) => {
    this.setState({
      edit_nationality: e.target.value,
    });
  }

  render() {

    const dataSource = this.state.paymentlist && this.state.paymentlist.map((item, index) => {
      return {
        key: index,
        payment: item.paymentid,
        name: item.first_name + ' ' + item.last_name,
        dealname: item.deal_name ? item.deal_name : '---',
        paymentdate: item.payment_date ? moment(item.payment_date).format('DD MMM, YYYY') : '',
        amount: '₹' + item.payment_amount,
        description: item.description,
        payment_ref: item.payment_ref ? item.payment_ref : '---',
        paymentstatus: item,
        payment_type: item.payment_type ? item.payment_type : '---',
        c_fees: item.processing_fees ? '₹' + item.processing_fees : '₹0',
        wallet: item.wallet ? '₹' + item.wallet : '₹0',
        totalamount: item.total_paid_amount ? '₹' + item.total_paid_amount : "---",
        gst: item.igstvalue ? "₹" + (parseInt(item.igstvalue)) : "---"
      }
    });

    const columns = [
      {
        title: 'Payment Id',
        dataIndex: 'payment',
        key: 'payment',
        width: 160,
        // fixed: 'left',
      },
      {
        title: 'Investor Name',
        dataIndex: 'name',
        key: 'name',
        width: 160,
        // fixed: 'left',
      },
      {
        title: 'Deal Name',
        dataIndex: 'dealname',
        key: 'dealname',
        width: 180,
      },
      {
        title: 'Payment Status',
        dataIndex: 'paymentstatus',
        key: 'paymentstatus',
        width: 180,
        render: (text) => {
          // console.log('text',text);
          if (text.payment_status == 'SUCCESS') {
            return (
              <Tag color="green">{text.payment_status}</Tag>
            )
          } else {
            return (
              <Tag color="red">{text.payment_status}</Tag>
            )
          }
        }
      },
      {
        title: 'Payment Order Id',
        dataIndex: 'payment_ref',
        key: 'payment_ref',
        width: 180,
      },
      {
        title: 'Payment Date',
        dataIndex: 'paymentdate',
        key: 'paymentdate',
        width: 180,
      },
      {
        title: 'Investment',
        dataIndex: 'amount',
        key: 'amount',
        align: "right",
      },
      {
        title: 'Convenience Fees',
        dataIndex: 'c_fees',
        key: 'c_fees',
        align: "right",
      },
      {
        title: 'GST',
        dataIndex: 'gst',
        key: 'gst',
        align: "right",
      },
      {
        title: 'Wallet Amount',
        dataIndex: 'wallet',
        key: 'wallet',
        align: "right",
      },
      {
        title: 'Payable Amount',
        dataIndex: 'totalamount',
        key: 'totalamount',
        align: "right",
      },
      {
        title: 'Payment Type',
        dataIndex: 'payment_type',
        key: 'payment_type',
        render: (text) => {
          // console.log('text',text);
          if (text == 'online payment') {
            return (
              <Tag color="green">{text}</Tag>
            )
          } else {
            return (
              <Tag color="blue">{text}</Tag>
            )
          }
        }
      },
      {
        title: 'Payment Description',
        dataIndex: 'description',
        key: 'description',
      },
    ];


    return (
      <div className='mt-5'>
        {this.state.loading ? (
          <div className="text-center mt-5">
            <h4>Loading data...</h4>
            <Spin size="large" />
          </div>
        ) : (this.state.cpaymentlist.length) > 0 ?
          <>
            <Input
              value={this.state.searchinput}
              // .trim().split(/ +/)
              placeholder="Search"
              type={"text"}
              onChange={(e) => this.searchinput(e)}
              style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              float: 'right',
              paddingBottom: '10px'
            }}>

              <Button
                type='primary'
                onClick={() => this.exportToCSV('Premium Membership')}
              >
                <i className='bx bxs-cloud-download'
                  style={{
                    color: '#fff',
                    position: 'relative',
                    top: 3,
                    left: -3
                  }}
                ></i> Export Data
              </Button>

            </div>
            <Table className='table-2'
              dataSource={dataSource}
              columns={columns}
              loading={this.state.loading}
              bordered
              scroll={{ x: 'max-content' }}
            />
          </>

          : <>

            <div className='text-center mt-5'>
              <h4>You have not made any investment on Growth91 Platform.<br></br>
                <a href='/deals' style={{ fontSize: '1.5rem' }}>Start Today </a>
              </h4>
              <img src='No_data_rafiki.png' width={200} />
            </div>
          </>
        }
      </div>
    );
  }
}

export default Transactions;