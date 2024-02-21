import React, { Component } from 'react';
import { Menu, Button, Card, Modal, Table, Tooltip, message } from 'antd';
import { LinkOutlined, FundOutlined } from '@ant-design/icons';
import Bridge from '../../../constants/Bridge';
import Apis from '../../../constants/Apis';

export default class Paiddocuments2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      documentloading: false,
      listofdocumentstatus: false,
      startupid: '',
      documents: [],
      investor_id: 0,
      deal_id: 0,
    }
  }

  showdocumentmodal = () => {
    this.setState({
      listofdocumentstatus: true,
      startupid: this.props.data.startupid,
    });
    if (this.props.data.startupid) {
      this.setState({
        startupid: this.props.data.startupid,
        investor_id: this.props.data.investor_id,
        deal_id: this.props.data.deal_id,
      }, () => this.getdocuments());
    }
  }

  closedocumentmodal = () => {
    this.setState({
      listofdocumentstatus: false,
      startupid: '',
    });
  }
  getdocuments = () => {
    this.setState({
      documentloading: true
    });
    let params = {
      startupid: this.props.data.startupid,
    }
    Bridge.admin.document.list(params).then((result) => {
      if (result.status == 1) {
        this.setState({
          documentloading: false,
          documents: result.data,
        }, () => this.get_document_purchased_list());
      } else {
        this.setState({
          documentloading: false,
        });
      }
    });
  }
  get_document_purchased_list = () => {
    if (this.props.data.investor_id) {
      let params = {
        investor_id: this.props.data.investor_id,
        deal_id: this.props.data.deal_id,
      }
      Bridge.deal.get_document_purchased_list_admin(params).then((result) => {
        if (result.status == 1) {
          let arr = [];
          let documents = this.state.documents;
          if (this.state.documents.length > 0) {
            for (let item of documents) {
              item.amount = '';
              item.user_paid = false;
              if (result.data.length > 0) {
                for (let item2 of result.data) {
                  if (item2.document_id == item.documentid || item.paid == 'Free') {
                    item.user_paid = true;
                  }
                }
              }
              if (item.membership_type == 'premium') {
                item.amount = item.premium_price;
              } else {
                item.amount = item.regular_price;
              }
              arr = [...arr, item];
            }
          }
          this.setState({ documents: arr });
        }
      });
    }
  }

  showdocument = (item) => {
    if (item.document) {
      let url = Apis.IMAGEURL + 'docs/' + item.documentid + '/' + item.document;
      window.open(url, '_blank');
    }
  }

  documentPay = (item) => {
    if (!this.props.data.investor_id) {
      message.warning("Please login first to invest.", 5);
      return;
    }
    let order_id = "order-01";
    let user_id = this.props.data.investor_id;
    let amount = Number(item.amount);
    let docs = item.documentid;
    let deal_id = this.state.deal_id;
    let url = `${process.env.REACT_APP_BASE_URL}cashfree/buy_documents/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&docs=${docs}&deal_id=${deal_id}`;

    window.location.href = url;
  };

  render() {

    const documentdataSource = this.state.documents && this.state.documents.map((item, index) => {
      return {
        key: index,
        documentid: item.documentid,
        documentname: item.docname ? item.docname : '---',
        paid: item.paid ? item.paid : '---',
        price: item.amount ? '₹ ' + item.amount : '0.00',
        link: item,
        view: item,
        pay_status: item.user_paid == true ? 'Paid' : 'Not Paid',
      }
    });

    const documentcolums = [
      {
        title: 'Name',
        dataIndex: 'documentname',
        key: 'documentname',
        // width: 180,
      },
      {
        title: 'View',
        dataIndex: 'view',
        key: 'view',
        render: (text) => {
          return (
            <Button type='primary'>Download</Button>
          )
        }
      },
      // {
      //   title: 'Type',
      //   dataIndex: 'paid',
      //   key: 'paid',
      //   width: 100,
      // },
      // {
      //   title: 'Price',
      //   dataIndex: 'price',
      //   key: 'price',
      //   width: 100,
      // },
      // {
      //   title: 'Paid/Not Paid',
      //   dataIndex: 'pay_status',
      //   key: 'pay_status',
      // },
      // {
      //   title: 'Link',
      //   dataIndex: 'link',
      //   key: 'link',
      //   render:(text)=>{

      //     if(text.paid=="Free"){
      //       return(
      //         <Button type='primary' icon={<LinkOutlined />}onClick={()=>this.showdocument(text)}>Open</Button>
      //       )
      //     }else if(text.paid=="Paid" && text.user_paid==true) {
      //       return(
      //         <Button type='primary' icon={<LinkOutlined />}onClick={()=>this.showdocument(text)}>Open</Button>
      //       )
      //     }else{
      //       return(<Button className='btn btn-primary' onClick={()=>this.documentPay(text)}>Buy this Document</Button>)
      //     }
      //   }
      // },
    ];
    return (
      <div>
        <a
          href='#!'
          onClick={this.showdocumentmodal}
        >
          <Tooltip title='View Documents'>
            <i className='bx bx-bookmarks' style={{
              position: 'relative', top: 5
            }}></i>  &nbsp;<span style={{
              position: 'relative',
              top: 3
            }}>Documents</span>
          </Tooltip>
        </a>

        {/* Start document modal  */}
        <Modal
          title="Documents"
          visible={this.state.listofdocumentstatus}
          onOk={this.closedocumentmodal}
          footer={false}
          onCancel={() => this.setState({ listofdocumentstatus: false })}
          width={700}
        >
          <Card
            size="small"
            title=""
          >
            <Table
              dataSource={documentdataSource}
              columns={documentcolums}
              loading={this.state.documentloading}
              bordered
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Modal>
        {/* End document modal  */}
      </div>
    )
  }
}
