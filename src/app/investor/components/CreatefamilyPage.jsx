import React, { Component } from "react";
import Bridge from "../../constants/Bridge";
import { Table, message, Input, Spin, Modal, Menu, Dropdown } from "antd";
import moment from "moment";
import Apis from "../../constants/Apis";
import Documents from "../../admin/components/modal/Documents";
import { UserAddOutlined } from "@ant-design/icons";
import { redirect } from "next/dist/server/api-utils";
import { Link, Route } from "react-router-dom";

export default class CreatefamilyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchinput: "",
      sortby: "",
      investor_id: "",
      documentmodalstatus: false,
      cinvestments: [],
      loading: false,
      showHistory: false,
      showreferral: true,
      searchHistoryInput: "",
      wallet_arr: [],
      totalAmount: 0,
      referral_code: "",
      user_list: [{name:"Group1",dateofjoining:"10-May-2024",Status:"Active"},{name:"Group2",dateofjoining:"10-May-2024",Status:"Active"},{name:"Group3",dateofjoining:"10-May-2024",Status:"Active"},{name:"Group4",dateofjoining:"10-May-2024",Status:"Active"}],
      cuser_list: [],
      addModalStatus:false,
      formloader:false,
      CreateModalStatus:false,
    };
  }

  componentDidMount() {
    this.setState(
      {
        investor_id: this.props.investor_id,
      },
      () => this.getwallethistory()
    );
    // this.get_referral_code();
  }

  get_referral_code = () => {
    let params = {
      investor_id: this.props.investor_id,
    };
    Bridge.get_investor_referral_code(params).then((result) => {
      if (result.status == 1) {
        // console.log('referral_code',result.data[0].referral_code);
        this.setState(
          {
            referral_code: result.data[0].referral_code,
          },
          () => this.get_referral_investor_list()
        );
      } else {
      }
    });
  };

  get_referral_investor_list = () => {
    if (this.state.referral_code) {
      let params = {
        referral_code: this.state.referral_code,
      };
      Bridge.investor.get_referral_investor_list(params).then((result) => {
        if (result.status == 1) {
          // console.log('user_list',result);
          this.setState({
            user_list: result.data,
            cuser_list: result.data,
          });
        } else {
        }
      });
    }
  };

  getwallethistory() {
    let params = {
      investor_id: this.state.investor_id,
    };
    Bridge.investor.get_wallet_history(params).then((result) => {
      if (result.status == "1") {
        this.setState({ wallet_arr: result.data.reverse() });
        let credit_amount = 0;
        let debit_amount = 0;
        for (let item of result.data) {
          if (item.type == "credited") {
            credit_amount = parseInt(credit_amount) + parseInt(item.amount);
          }
          if (item.type == "debited") {
            debit_amount = parseInt(debit_amount) + parseInt(item.amount);
          }
        }
        let total = parseInt(credit_amount - debit_amount);
        this.setState({ totalAmount: Math.abs(total) });
      } else {
      }
    });
  }
  showModal = () => {
    this.setState({ documentmodalstatus: true });
  };

  handleOk = () => {
    this.setState({ documentmodalstatus: false });
  };

  handleCancel = () => {
    this.setState({ documentmodalstatus: false });
  };

  // search = () => {
  //     let searchval = this.state.searchinput;
  //     this.setState({ loading:true });
  //     let arr=[];
  //     if(searchval)
  //     {

  //     for(let item of this.state.cuser_list) {
  //         if(item.first_name.toLowerCase().includes(searchval.toLowerCase())||
  //         item.last_name.toLowerCase().includes(searchval.toLowerCase())||
  //         item.email.toLowerCase().includes(searchval.toLowerCase()))  {
  //             arr = [...arr, item];
  //           }
  //         }
  //         this.setState({
  //         user_list: arr,
  //         loading:false,
  //       });
  //     }else {
  //       this.setState({
  //         loading:false,
  //       });
  //     }
  // }

  // search = (e) => {
  //     let search = e.target.value;
  //     // console.log(search);
  //     this.setState({ searchinput: search });
  //     let cinvestments = this.state.cuser_list;
  //     let filtered = [];
  //     if (search == "") {
  //       filtered = cinvestments;
  //     } else {
  //       for (let i = 0; i < cinvestments.length; i++) {
  //         if (
  //           cinvestments[i].first_name &&
  //           cinvestments[i].name.toLowerCase().includes(search.toLowerCase())
  //         ) {
  //           filtered.push(cinvestments[i]);
  //         }
  //       }
  //     }
  //     // console.log('filtered',filtered);
  //     this.setState({
  //       investments: filtered,
  //     });
  //   };

  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.cuser_list) {
        if (
          item.first_name.toLowerCase().includes(text.toLowerCase()) ||
          item.last_name.toLowerCase().includes(text.toLowerCase()) ||
          item.email.toLowerCase().includes(text.toLowerCase())
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        user_list: arr,
        loading: false,
      });
    } else {
      this.setState({
        user_list: this.state.cuser_list,
        loading: false,
      });
    }
  };

  onClickInvite = () => {
    // window.location.replace("/invite");
 this.setState({ CreateModalStatus: true })
  };
  addmember  =(e)=>{
    e.preventDefault();
                     this.setState({ addModalStatus: true }) 
  }
  render() {
    //for referral
    const dataSource =
      this.state.user_list &&
      this.state.user_list.map((item, index) => {
        return {
          key: index,
          name: item.name,
          email: item.email,
          dateofjoining: item.dateofjoining
            ? (item.dateofjoining)
            : "---",
          dateofinvestment: item.dateofinvestment
            ? moment(item.dateofinvestment).format("DD MMM, YYYY")
            : "---",
          Status: item.Status,
        };
      });
    const dataSource2 =
      this.state.wallet_arr &&
      this.state.wallet_arr.map((item, index) => {
        return {
          key: index,
          wallet_id: item.wallet_id,
          investor_id: item.investor_id,
          description: item.description,
          type: item.type,
          amount: item.amount,
        };
      });
    const columns = [
      {
        title: "Group Name",
        dataIndex: "name",
        key: "name",
      },
      
      {
        title: "Date of Creation",
        dataIndex: "dateofjoining",
        key: "dateofjoining",
      },
    
      {
        title: "Status",
        dataIndex: "Status",
        key: "Status",
      },
      {
        title: "Action",
        dataIndex: "Status",
        key: "Status",
        render: (text, records) => {
            console.log(records);
            const menu = (
                <>
              <Menu
                mode="vertical"
                defaultSelectedKeys={[this.state.path]}
                style={{ width: 120 }}
              >
                <Menu.Item  icon={<UserAddOutlined />}>
                  <a
                    href="#"
                    onClick={() => this.showEditModal(text, records)}
                    style={{ fontSize: 14 }}
                    >
                    &nbsp;&nbsp; User 1
                  </a>
                </Menu.Item>
                <Menu.Item  icon={<UserAddOutlined />}>


                  <a
                    href="#"
                    onClick={() => this.showEditModal(text, records)}
                    style={{ fontSize: 14 }}
                  >
                    &nbsp;&nbsp; User 2
                  </a>
                </Menu.Item>
                <Menu.Item  icon={<UserAddOutlined />}>


                  <a
                    href="#"
                    onClick={() => this.showEditModal(text, records)}
                    style={{ fontSize: 14 }}
                    >
                    &nbsp;&nbsp; User 3
                  </a>
                </Menu.Item>
                <Menu.Item  icon={<UserAddOutlined />}>


                  <a
                    href="#"
                    onClick={() => this.showEditModal(text, records)}
                    style={{ fontSize: 14 }}
                    >
                    &nbsp;&nbsp; User 4
                  </a>
                </Menu.Item>
                {/* <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined/>}>
                    <a
                    href="#"
                    style={{ fontSize: 14 }}
                    onClick={() => this.showDeleteModal(record.key)}
                    >
                    &nbsp;&nbsp;Delete
                    </a>
                    </Menu.Item> */}
                    </Menu>
                    </>
                );
                return (
                    <div className="d-flex ">
              <div style={{marginLeft:"10px" , color:"#1890ff"}}>
                  <Link to="/View-family-list" >
                    <div className="menu-action">
                      Manage
                    </div>
                  </Link>
               

              </div>
             
              </div>
            );
          },
      },
    ];
    //for wallet history
    const columns2 = [
      {
        title: "Wallet Id",
        dataIndex: "wallet_id",
        key: "wallet_id",
      },
      {
        title: "Investor Id",
        dataIndex: "investor_id",
        key: "investor_id",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
    ];
    return (
      <div>
          <Modal
          title="Add New Member"
          visible={this.state.addModalStatus}
          onOk={() => this.setState({ addModalStatus: false })}
          okText="Submit"
          // onCancel={this.cancel_addfounder}
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Email <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.Email}
                onChange={(e) => this.setState({ Email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">Mobile</label>
              <Input
                value={this.state.mobile}
                onChange={(e) => this.setState({ mobile: e.target.value })}
              />
            </div>
          
         

           
          </Spin>
        </Modal>
          <Modal
          title="Create New Group"
          visible={this.state.CreateModalStatus}
          onOk={() => this.setState({ CreateModalStatus: false })}
          okText="Submit"
          // onCancel={this.cancel_addfounder}
          onCancel={() => this.setState({ CreateModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
           
            <div className="form-group">
              <label className="mb-2">Name</label>
              <Input
                value={this.state.mobile}
                onChange={(e) => this.setState({ mobile: e.target.value })}
              />
            </div>
          
         

           
          </Spin>
        </Modal>
        <div>
          {/* referral Table */}
          {this.state.showreferral && (
            <section id="hdii" style={{ minHeight: "70vh" }}>
              <div className="row">
                <div
                  className="col-10 my-2"
                  style={{ marginTop: 50, marginLeft: 30 }}
                >
                 
                    <h2 className="text-center mb-3">Family</h2>
                  </div>
                
              </div>

              <div className="row m-md- ms-2 p-md-3 pt-3">
                {/* <div className='col-4 '>
                            <div className="input-group ">
                                <Input
                                placeholder="Search.."
                                type={"text"}
                                style={{ width: "50%", height: 45 }}
                                onChange={(e) => this.searchinput(e)}
                                />
                            </div>
                        </div> */}
                <div className="col-6">
                  <i class="bx bx-wallet" style={{ fontSize: "23px" }}></i>
                  <input
                    className="mx-3 px-2 py-1"
                    value={this.state.totalAmount}
                    style={{ width: "60%" }}
                  ></input>
                  <a
                    href="#"
                    onClick={() => {
                      this.setState({ showHistory: true, showreferral: false });
                    }}
                  >
                    <i class="bx bx-history" style={{ fontSize: "23px" }}></i>
                  </a>
                </div>
                <div className="col offset-md-4">
                  <button
                    className="small-button-dark3"
                       onClick={this.onClickInvite}
                  >
                    Create Group
                  </button>
                </div>

                <div className="row m-3 p-3">
                  <Table
                    className="table-2"
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    loading={this.state.loading}
                  />
                </div>
              </div>
            </section>
          )}
          {/* history table */}
          {this.state.showHistory && (
            <section id="hdii">
            <div className="row m-md-0 ms-2 p-md-3 pt-3">
              <div className="col-8 mx-2 py-1">
                <h2>Wallet History </h2>
              </div>
              <div className="col offset-md-4">
                <button
                  onClick={() =>
                    this.setState({ showreferral: true, showHistory: false })
                  }
                  className="btn btn"
                  style={{
                    backgroundColor: "#29176F",
                    color: "white",
                    float: "right",
                    marginRight:"10px"
                  }}
                >
                  Back
                </button>
              </div>
            </div>
              {/* <div className='row'> */}

              {/* <div className='col-7 '>
                            <div className="input-group "> */}
              {/* <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search"
                                    value={this.state.searchHistoryInput}
                                    onChange={(e) => this.setState({searchHistoryInput:e.target.value})}
                                /> */}
              {/* <span className="input-group-text" style={{ 
                                    cursor:'pointer'
                                }} id="basic-addon1"
                                onClick={this.search}
                                >
                                    <i className='bx bx-search'></i>
                                </span>
                            </div>
                        </div> */}
              {/* <div className='col offset-md-11'>
                            <div className="">
                                <button onClick={()=>this.setState({showreferral:true,showHistory:false})} className='btn btn' style={{backgroundColor:'#29176F',color:'white'}}>Back</button>
                            </div>
                        </div> */}
              {/* </div> */}
              <div className="row m-3 p-3">
                <Table
                  className="table-2"
                  dataSource={dataSource2}
                  columns={columns2}
                  bordered
                  loading={this.state.loading}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }
}
