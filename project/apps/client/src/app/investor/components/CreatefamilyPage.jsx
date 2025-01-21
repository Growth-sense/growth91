import React, { Component } from "react";
import Bridge from "../../constants/Bridge";
import { Table, message, Input, Spin, Modal, Menu, Dropdown } from "antd";
import moment from "moment";
import Apis from "../../constants/Apis";
import Documents from "../../admin/components/modal/Documents";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { redirect } from "next/dist/server/api-utils";
import { Link, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
      group_list: [],
      cuser_list: [],
      addModalStatus: false,
      formloader: false,
      CreateModalStatus: false,
      newgroupName: "",
      memberlist: false,
      memberlistloader: false,
      change_group_name: "",
      view_change_group_name_modal: false,
      view_delete_group_modal: false,
      chggroupID: "",
    };
  }

  componentDidMount() {
    this.setState(
      {
        investor_id: this.props.investor_id,
      },

      () => this.viewgroupall(),
      
    );
    // this.get_referral_code();
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
    this.setState({ CreateModalStatus: true });
  };
  addmember = (e) => {
    e.preventDefault();
    this.setState({ addModalStatus: true });
  };
  Creategroup = () => {
    let params = {
      userID: localStorage.getItem("Parent_investor_id"),
      groupName: this.state.newgroupName,
    };

    if (params.groupName.length == 0) {
      toast.error("plz fill all fiels");
    } else {
      Bridge.family.creategroup(params).then((result) => {
        this.setState({ CreateModalStatus: false });
        this.viewgroupall();
      });
    }
  };
  viewgroupall = () => {
    let values
    let params = {
      userID:!this.props.adminview?localStorage.getItem("Parent_investor_id"):this.props.investor_id,
    }

    Bridge.family.getGroupList(params).then((result) => {
      this.setState({ group_list: result.data });
    });
  };

  getmember = (value) => {
    if (localStorage.getItem("Parent_investor_id"))
      this.setState({ memberdetail: "", memberlistloader: true });
    this.setState({ ids: value });
    let params = {
      parent_id: !this.props.adminview?localStorage.getItem("Parent_investor_id"):this.props.investor_id,
      groupID: value,
    };
    this.setState({ chggroupID: value });

    Bridge.investor.getfamilymember(params).then((result) => {
      const data = result.data.filter((item, index) => {
        return item.investor_id == !this.props.adminview?localStorage.getItem("Parent_investor_id"):this.props.investor_id
      });
     

      this.setState({ memberdetail: result.data, memberlistloader: false });
    });
  };
  deleteGroup = () => {
    let param = {
      userID: localStorage.getItem("Parent_investor_id"),
      groupID: this.state.chggroupID,
    };
    Bridge.family.deleteGroup(param).then((result) => {
      this.setState({
        view_delete_group_modal: false,
      });
      if (result.message == "Group deleted successfully.") {
        toast.success("Group delete Successfully");
      this.viewgroupall()

      } else if (
        result.message ==
        "You can not delete this group, you have previously invited members in that."
      ) {
        toast.error(
          "You can not delete this group, you have previously invited members in that."
        );
      } else {
        toast.error("Error");
      }
    });
  };
  changegroupname = () => {
    let params = {
      userID: localStorage.getItem("Parent_investor_id"),
      groupID: this.state.chggroupID,
      groupName: this.state.change_group_name,
    };

    Bridge.family.editGroup(params).then((result) => {
      if (result.message == "Group updated successfully.") {
        this.setState({ view_change_group_name_modal: false });
        this.viewgroupall();
        
        toast.success("Group Name Change Successfully");
      } else if (result.message == "Group is already exist.") {
        toast.error("Plz Use another name");
      } else {
        toast.error("Error");
      }
    });
  };
  groupn_name_edit_modal = (records) => {
    this.setState({
      change_group_name: records.name,
      view_change_group_name_modal: true,
      chggroupID: records.key,
    });
  };
  deletefamilymeber = (value) => {
    
    let params = {
      memberId:value.data.investor_id,
      groupID: this.state.chggroupID,
    };

    Bridge.family.deleteGroupMember(params).then((result) => {
      
      if (result.message == "Member deleted successfully.") {
        this.setState({ view_change_group_name_modal: false });
        this.viewgroupall();
        
        this.getmember(this.state.chggroupID);

        toast.success("Member deleted successfully.");
      } else {
        toast.error(result.message);
      }
    });
  };
  removerequest = (value) => {

    let params = {
      userID: localStorage.getItem("Parent_investor_id"),
      groupID: value.groupID,
      invite_email: value.email,
      invite_mobile: value.mobile,
    };

    Bridge.family.deleteRequest(params).then((result) => {
      if (
        result.message ==
        "Your request for delete is received by us successfully."
      ) {
        toast.success(
          "Your request for delete is received by us successfully."
        );
      } else {
        toast.error("Error");
      }
    });
  };
  showDeleteModal = (value) => {


    this.setState({
      view_delete_group_modal: true,
      chggroupID: value.key,
    });
  };

  render() {
    //for referral

    const dataSource =
      this.state.group_list &&
      this.state.group_list
        .filter(
          (item) => item.userID == !this.props.adminview?localStorage.getItem("Parent_investor_id"):this.props.investor_id,
        )
        .map((item, index) => {


          
          return {
            key: item.groupID,
            name: item.groupName,
            groupCreateDate: item.groupCreateDate
              ? moment(item.groupCreateDate).format("DD MMM, YYYY")
              : "---",
            Status: item.groupStatus,
          };
        });
    const dataSource2 =
      this.state.group_list &&
      this.state.group_list
        .filter(
          (item) => item.userID != (this.props.adminview?this.props.investor_id:localStorage.getItem("Parent_investor_id")),
        )
        .map((item, index) => {


          return {
            key: item.groupID,
            name: item.groupName,
            groupCreateDate: item.groupCreateDate
              ? moment(item.groupCreateDate).format("DD MMM, YYYY")
              : "---",
            Status: item.groupStatus,
            action: item,
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
        dataIndex: "groupCreateDate",
        key: "groupCreateDate",
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
          const menu = (
            <>
              <Menu
                mode="vertical"
                defaultSelectedKeys={[this.state.path]}
                style={{ width: 120 }}
              >
                <Menu.Item icon={<UserAddOutlined />}>
                  <Link to={!this.props.adminview?(`/View-Group-list?id=${records.key}`):("#")}>
                  
                    <div className="menu-action">Manage</div>
                  </Link>
                </Menu.Item>
                <Menu.Item icon={<UserAddOutlined />}>
                  <>
                    <div
                      className="menu-action"
                      
                      onClick={() => {
                        this.getmember(records.key);
                        this.setState({ memberlist: true });
                      }}
                    >
                      View Member
                    </div>
                  </>
                </Menu.Item>
               
                <Menu.Item icon={<EditOutlined />}>
                  <>
                    <div
                      className="menu-action"
                  onClick={() => {!this.props.adminview?(this.groupn_name_edit_modal(records)):(console.log(""))}}
                      
                    
                    >
                      Edit
                    </div>
                  </>
                </Menu.Item>

                <Menu.Item
                  key={`Delete${records.key}`}
                  icon={<DeleteOutlined />}
                >
                  <a
                    href="#"
                    style={{ fontSize: 14 }}
                  onClick={() => {!this.props.adminview?(this.showDeleteModal(records)):(console.log(""))}}

                  >
                                        <div className="menu-action">Delete</div>

                  </a>
                </Menu.Item>
              </Menu>
            </>
          );
          return (
            <div className="d-flex ">
              <div style={{ marginLeft: "10px", color: "#1890ff" }}>
                <Dropdown overlay={menu} placement="bottom">
                  <a onClick={(e) => e.preventDefault()}>
                    <div className="menu-action">
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </div>
                  </a>
                </Dropdown>
              </div>
            </div>
          );
        },
      },
    ];
    const columns2 = [
      {
        title: "Group Name",
        dataIndex: "name",
        key: "name",
      },

      {
        title: "Date of Creation",
        dataIndex: "groupCreateDate",
        key: "groupCreateDate",
      },

      {
        title: "Status",
        dataIndex: "Status",
        key: "Status",
      },
      {
        title: "Actions",
        dataIndex: "action",
        key: "action",
        render: (text, records) => {

          const menu = (
            <>
              <Menu
                mode="vertical"
                defaultSelectedKeys={[this.state.path]}
                style={{ width: 120 }}
              >
                <Menu.Item icon={<UserAddOutlined />}>
                  <Link to={`#`} onClick={() => this.removerequest(text)}>
                    <div className="menu-action">Remove Request</div>
                  </Link>
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
              <div style={{ marginLeft: "10px", color: "#1890ff" }}>
                <Dropdown overlay={menu} placement="bottom">
                  <a onClick={(e) => e.preventDefault()}>
                    <div className="menu-action">
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </div>
                  </a>
                </Dropdown>
              </div>
            </div>
          );
        },
      },
    ];
    const MembersourceSource =
      this.state.memberdetail &&
      this.state.memberdetail.map((item, index) => {
        return {
          key: item.groupID,
          name: item.first_name + " " + item.last_name,
          groupCreateDate: item.groupCreateDate
            ? moment(item.groupCreateDate).format("DD MMM, YYYY")
            : "---",
          Status: item.groupStatus,
          data: item,
        };
      });
    const Membercolumns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },

      {
        title: "Action",
        dataIndex: "data",
        key: "data",
        render: (text, records) => {
          const menu = (
            <>
              <Menu
                mode="vertical"
                defaultSelectedKeys={[this.state.path]}
                style={{ width: 120 }}
              >
                <Menu.Item icon={<DeleteOutlined />}>
                  <>
                    <div
                      className="menu-action"
                      onClick={() => {
                        this.deletefamilymeber(records);
                      }}
                    >
                      Delete
                    </div>
                  </>
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
              <div style={{ marginLeft: "10px", color: "#1890ff" }}>
                <Dropdown overlay={menu} placement="bottom">
                  <a onClick={(e) => e.preventDefault()}>
                    <div className="menu-action">
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </div>
                  </a>
                </Dropdown>
              </div>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <Modal
          title="List of Group Member"
          visible={this.state.memberlist}
          onOk={() => this.setState({ memberlist: false })}
          okText="Submit"
          // onCancel={this.cancel_addfounder}
          onCancel={() => this.setState({ memberlist: false })}
          width={550}
        >
          <Spin spinning={this.state.memberlistloader}>
            <Table
              className="table-2"
              dataSource={MembersourceSource}
              columns={Membercolumns}
              bordered
              loading={this.state.loading}
            />
          </Spin>
        </Modal>
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
          onOk={() => this.Creategroup()}
          okText="Submit"
          // onCancel={this.cancel_addfounder}
          onCancel={() => this.setState({ CreateModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">Name</label>
              <Input
                value={this.state.newgroupName}
                required
                onChange={(e) =>
                  this.setState({ newgroupName: e.target.value })
                }
              />
            </div>
          </Spin>
        </Modal>
        <Modal
          title="Change Group Name"
          visible={this.state.view_change_group_name_modal}
          onOk={() => this.changegroupname()}
          okText="Submit"
          // onCancel={this.cancel_addfounder}
          onCancel={() =>
            this.setState({ view_change_group_name_modal: false })
          }
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">Name</label>
              <Input
                value={this.state.change_group_name}
                required
                onChange={(e) =>
                  this.setState({ change_group_name: e.target.value })
                }
              />
            </div>
          </Spin>
        </Modal>
        <Modal
          title="Delete Group"
          visible={this.state.view_delete_group_modal}
          onOk={() => this.deleteGroup()}
          okText="Submit"
          onCancel={() => this.setState({ view_delete_group_modal: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <h6>Are you sure you want to Delete Group?</h6>
          </Spin>
        </Modal>
        <div>
          {/* referral Table */}
          {this.state.showreferral && (
            <>
              <section id="hdii" style={{ minHeight: "10vh" }}>
                <div className="row">
                  <div
                    className="col-10 my-2"
                    style={{ marginTop: 50, marginLeft: 30 }}
                  >
                    <h2 className="text-center mb-3">Group Admin</h2>
                  </div>
                </div>

                <div className="row m-md- ms-2 p-md-3 pt-3">
                  <div className="col-4 "></div>

                  <div className="col offset-md-10">
                    <button
                      className="small-button-dark3"
                  onClick={() => {!this.props.adminview?(this.onClickInvite()):(console.log(""))}}

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
              {dataSource2.length != 0 && (
                <section id="hdii" style={{ minHeight: "10vh", marginTop: 0 }}>
                  <div className="row">
                    <div
                      className="col-10 my-2"
                      style={{ marginTop: 50, marginLeft: 30 }}
                    >
                      <h2 className="text-center mb-3">Group Member</h2>
                    </div>
                  </div>

                  <div className="row m-md- ms-2 p-md-3 pt-3">
                    <div className="col-4 "></div>

                    <div className="col offset-md-4"></div>

                    <div className="row m-3 p-3">
                      <Table
                        className="table-2"
                        dataSource={dataSource2}
                        columns={columns2}
                        bordered
                        loading={this.state.loading}
                      />
                    </div>
                  </div>
                </section>
              )}
            </>
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
                      marginRight: "10px",
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
              <div className="row m-3 p-3"></div>
            </section>
          )}

          <ToastContainer />
        </div>
      </div>
    );
  }
}
