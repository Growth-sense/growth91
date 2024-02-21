import React, { Component } from 'react';
import { Modal,Tooltip,Table,Card } from 'antd';
import { EyeOutlined }  from '@ant-design/icons';
import Bridge from '../../../constants/Bridge';
import moment from 'moment';
export default class Investors extends Component {

    constructor(props) {
      super(props);
      this.state = {
        documentloading:false,
        listofdocumentstatus:false,
        invested_dt:[],
        startupid:'',
        loading:false,
        visible:true,
        Investors:[],
      }
    }

    componentDidMount() {
      if(this.props.id) {
        this.setState({
          startupid: this.props.id,
        },() => this.getinvestors());
      }
    }

    getinvestors = () => {
      this.setState({ loading:true });
      let params ={
        startupid: this.props.id,
      }
      Bridge.admin.investor.getstartupinvestorlist(params).then((result) => {
        if (result.status == 1) {
          this.setState({ 
            loading:false,
            Investors: result.data,
          });
        } else {
          this.setState({ 
            loading:false,
          });
        }
      });
    }

    showdocumentmodal = () => {
      this.setState({
        listofdocumentstatus:true,
      });
    }
    
// patrakar coloni khakra wala 720 = 180 
    render() {

        const documentdataSource = this.state.Investors && this.state.Investors.map((item, index) => {
            return {
              key: index,
              srno: (index + 1),
              deal_name:item.deal_name?item.deal_name+" ("+item.deal_id+")":'---',
              investorname: item.first_name?item.first_name+' '+item.last_name+" ("+item.investor_id+")":'---' ,
              investedamt: item.Investment_amt ? '₹ '+item.Investment_amt : '---',
              dateofinvest: item.Invested_dt ? moment(item.Invested_dt).format('DD MMM, YYYY') : '---',
            }
          });
    
          const documentcolums = [
          {
            title: 'Sr No',
            dataIndex: 'srno',
            key: 'srno',
            width: 160,
            fixed: 'left',
          },
          {
            title: 'Deal Name (ID)',
            dataIndex: 'deal_name',
            key: 'deal_name',
            width: 180,
          },
          {
            title: 'Investor Name (ID)',
            dataIndex: 'investorname',
            key: 'investorname',
            width: 180,
          },
          {
            title: 'Invested Amount',
            dataIndex: 'investedamt',
            key: 'investedamt',
            width: 180,
            align: "right",
          },
          {
            title: 'Date Of Investment',
            dataIndex: 'dateofinvest',
            key: 'dateofinvest',
          },
        ];

        return (
            <div>
                <a 
                    href='#!'
                    onClick={this.showdocumentmodal}
                >
                    <Tooltip title='View Investors'>
                    <EyeOutlined />  &nbsp;<span style={{ 
                        position:'relative',
                        top:3
                    }}>Investors</span>
                    </Tooltip>
                </a>
                
                {/* Start document modal  */}
                <Modal 
                    title="Investors" 
                    visible={this.state.listofdocumentstatus} 
                    onOk={this.closedocumentmodal} 
                    okText="ok"
                    onCancel={() => this.setState({ listofdocumentstatus:false })}
                    width={900}
                >
                    <Card 
                        size="small" 
                        title="" 
                    >
                        <Table 
                            dataSource={documentdataSource} 
                            columns={documentcolums} 
                            loading={this.state.loading}
                            bordered
                        />
                    </Card>
                    
                </Modal>

                
            </div>
        )
    }
}
