import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Card,
  Button,
  Modal,
  message,
  Select,
  Spin,
  Dropdown,
  Menu,
  Input,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import { EditOutlined, DeleteOutlined, ManOutlined } from "@ant-design/icons";
import Documents from "./components/modal/Documents";
import Investors from "./components/modal/Investors";
import Analytics from "./components/modal/Analytics";
import Sidebar2 from "./common/Sidebar2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import { Link } from "react-router-dom";
import Urldata from "../investor/components/Urldata";
import NoPermission from "./common/NoPermission";
import { loadModulePermissions } from "./common/permissions";

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class FamilyAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startups: [],
      cstartups: [],
      startupid: "",
      searchinput: "",

      // add
      name: "",
      status: "",
      created_at: "",

      // edit
      editname: "",
      editstatus: "",
      editModalStatus: false,

      addModalStatus: false,
      loading: false,
      formloader: false,
      founderlist: [],
      selectedfounder: [],
      editselectedfounder: [],
      authorised_founder: "",
      operational_founder: "",
      edit_authorised_founder: "",
      edit_operational_founder: "",

      // permissions for Group Investments
      canViewGroups: false,
      canExportGroups: false,
      canManageGroups: false,
    };
  }

  async componentDidMount() {
    await this.loadPermissions();
    this.getgrouplist()
    // this.getstartuplist();
    setTimeout(() => {
      // this.getfounderlist();
    }, 1000);
  }

  showAddModal = () => {
    this.setState({
      addModalStatus: true,
    });
  };

  loadPermissions = async () => {
    const perms = await loadModulePermissions("groups");

    this.setState({
      canViewGroups: perms.canView,
      canExportGroups: perms.canExport,
      canManageGroups: perms.canManage,
    });
  };

  // get post list
  getfounderlist = () => {
    this.setState({ loading: true });
    Bridge.founders.list().then((result) => {
      if (result.status == 1) {
        // console.log('result', result.data);
        // let arr=[];
        // for(let item of result.data){
        //   let status=false;
        //   for(let item2 of this.state.cstartups){
        //     if(item2.founder_id==item.investor_id){
        //       status=true;
        //     }
        //   }
        //   if(status==false){
        //     arr=[...arr,item];
        //   }
        // }
        // console.log('arr',arr);
        this.setState({
          founderlist: result.data,
          cfounderlist: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // get post list
  getgrouplist = () => {
    this.setState({ loading: true });
    Bridge.family.getGroupList({"userID":"-1"}).then((result) => {
      if (result.status == 1) {
        console.log(result);
        
        this.setState({
          startups: result.data,
          cstartups: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };
  getstartuplist = () => {
    this.setState({ loading: true });
    Bridge.family.getGroupList({"userID":"-1"}).then((result) => {
      if (result.status == 1) {
        console.log(result);
        
        this.setState({
          startups: result.data,
          cstartups: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // on change file
  onChangeEditFile = (e, type) => {
    if (type == "banner") {
      this.setState({
        editbanner: e.target.files[0],
      });
    } else {
      this.setState({
        editlogo: e.target.files[0],
      });
    }
  };

  // show edit modal
  showEditModal = (item) => {
    this.setState({
      editname: item.name,
      editstatus: item.status,
      editModalStatus: false,
      startupid: item.startupid,
      editselectedfounder:
        item.founder_id.length > 0 ? JSON.parse(item.founder_id) : [],
      edit_authorised_founder: item.authorised_founder,
      edit_operational_founder: item.operational_founder,
    });
  };

  // update post


  showDeleteModal = (item) => {
    this.setState({
      deleteModalStatus: true,
      startupid: item.startupid,
    });
  };


  // actuall functionality

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.startups) {
        if (
          (item.first_name && item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.groupName && item.groupName.toLowerCase().includes(text.toLowerCase())) ||
          (item.email && item.email.toLowerCase().includes(text.toLowerCase())) ||
          (item.status &&
            item.status.toLowerCase().includes(text.toLowerCase())) ||
          (item.groupID && item.groupID.includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        startups: arr,
        loading: false,
      });
    } else {
      this.setState({
        startups: this.state.cstartups,
        loading: false,
      });
    }
  };

  onChangeStartDate = (date, dateString) => {
    this.setState({
      dealstartdate: date,
    });
  };

  onChangeEndDate = (date, dateString) => {
    this.setState({
      dealenddate: date,
    });
  };

  onChangeStartDateEdit = (date, dateString) => {
    this.setState({
      editdealstartdate: date,
    });
  };

  onChangeDOB = (date, dateString) => {
    this.setState({
      dob: date,
    });
  };

  onChangeDOBedit = (date, dateString) => {
    this.setState({
      edit_dob: date,
    });
  };

  handleChangeSelected = (value) => {
    // console.log('value', value);
    this.setState({ category: value });
  };
  handleChangeSelectededit = (value) => {
    // console.log('value', value);
    this.setState({ editcategory: value });
  };


 

  exportToCSV = (fileName) => {
    if (!this.state.canExportGroups) {
      message.error("You do not have permission to export group investments.");
      return;
    }
    let arr = [];
    let count = 1;
    for (let item of this.state.startups) {
  
      
      let obj = {
        "Sr No": count++,
        "Group ID": item.groupID ? item.groupID : "---",
        "Group Name": item.groupName ? item.groupName : "---",
        "Email": item.email ? item.email : "---",
        "Group Status": item.groupStatus ? item.groupStatus : "---",
        "Admin Name": item.first_name ? item.first_name +""+item.last_name: "---",
        "Admin Mobile": item.mobile ? item.mobile : "---",
        "Admin Id": item.userID ? item.userID : "---",
        
        Status: item.status,
        // 'Tax Type': item.payment_type,
        // 'KYC Status': item.isapproved,
        // 'Invested date': item.Invested_dt ? moment(item.Invested_dt).format('DD MMM, YYYY') : '---',
      };
      arr = [...arr, obj];
      // count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Investment data exported successfully.");
  };

  handleChangeSelect = (e) => {
    this.setState({
      nationality: e.target.value,
    });
  };

  handleChangeSelectedit = (e) => {
    this.setState({
      edit_nationality: e.target.value,
    });
  };

  selectFounder = (value) => {
    this.setState({ selectedfounder: value });
  };

  editselectFounder = (value) => {
    this.setState({ editselectedfounder: value });
  };
  getmember = (value,id) => {
    this.setState({ ids: value });
    let params = {
      parent_id: localStorage.getItem("Parent_investor_id"),
      groupID: value,
    };
    Bridge.investor.getfamilymember(params).then((result) => {
      console.log(result);
    const data =result.data.filter((item,index)=>{
      console.log(item.investor_id );
      console.log(localStorage.getItem("investor_id") );
        return(

          item.investor_id == localStorage.getItem("investor_id")    
        )
      })
      console.log(data);
      console.log(data.length,"0");
    //   if(data.length !=0 ){
    //     localStorage.setItem(
    //       "investor_id",
    //       localStorage.getItem("Parent_investor_id")
    //     );
    //     localStorage.setItem(
    //       "investor_email",
    //       localStorage.getItem("Parent_investor_email")
    //     );
    //     localStorage.setItem(
    //       "investor_kycstatus",
    //       localStorage.getItem("Parent_investor_kycstatus")
    //     );
    //     localStorage.setItem(
    //       "investor_name",
    //       localStorage.getItem("Parent_investor_name")
    //     );
    // // window.location.reload();

    //   }
      this.setState({ memberdetail: result.data });
    });
  };
  render() {
    const { noPermission } = this.props;
    const dataSource =
      this.state.startups &&
      this.state.startups.map((item, index) => {
        console.log(item);
        return {
          key: item.groupID,
          groupName: item.groupName,
          ownernumber: item.mobile,
          email: item.email,
          status: item.groupStatus,
          mobile: item.mobile,
          action: item,
          groupCreateDate: item.groupCreateDate,
          ownername:item.first_name +" "+ item.last_name,
          userId: item.userID
        };
      });

    const columns = [
      {
        title: "Group Id",
        dataIndex: "key",
        key: "key",
        width: 260,
        fixed: "left",
      },
      {
        title: "Group Name",
        dataIndex: "groupName",
        key: "groupName",
        width: 280,
      },
   
      
      {
        title: "Admin",
        dataIndex: "ownername",
        key: "ownername",
        width: 280,
      
      },
      {
        title: "Owner Email",
        dataIndex: "email",
        key: "email",
        width: 280,

      },
      // {
      //   title: "Status",
      //   dataIndex: "status",
      //   key: "status",
      //   width: 280,

      // },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          console.log(record.userId);
          
          const menu = (
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.state.path]}
              style={{ width: 200 }}
            >
              {/* <Menu.Item key={`Edit${record.key}`} icon={<EditOutlined />}>
                <a
                  href="#"
                  onClick={() => this.showEditModal(text)}
                  style={{ fontSize: 14 }}
                >
                  &nbsp;&nbsp;Edit
                </a>
              </Menu.Item> */}
              {/* <Menu.Item key={`Delete${record.key}`} icon={<DeleteOutlined />}>
                <a
                  href="#"
                  style={{ fontSize: 14 }}
                  onClick={() => this.showDeleteModal(text)}
                >
                  &nbsp;&nbsp;Delete
                </a>
              </Menu.Item> */}
                <Menu.Item key={`Delete${record.key}`} icon={<ManOutlined/>} disabled={!this.state.canManageGroups}>
                  <Link
                    to={`/admin-family-manage?id=${record.key}&userid=${record.userId} `}
                    style={{ fontSize: 14 }}
                //   onClick={() => this.showDeleteModal(text)}
                  >
                    &nbsp;&nbsp;Manage
                  </Link>
                </Menu.Item>
            </Menu>
          );
          return (
            <div>
              <Dropdown overlay={menu} placement="bottom">
                <a onClick={(e) => e.preventDefault()}>
                  <div className="menu-action">
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </div>
                </a>
              </Dropdown>
            </div>
          );
        },
      },
    ];

    return (
      <>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
           <Urldata setid={this.getmember} />
          <Navbar />
          <Layout className="site-layout">
            <Sidebar2 />

            {noPermission ? (
              <NoPermission />
            ) : (
              <>
                <Content className="home-section">
                  <Card
                    title="Groups"
                    
                    style={{ margin: 16 }}
                  >
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Group Investments</Breadcrumb.Item>
                
                </Breadcrumb>
                <br />
                <br />
                {/* <Input 
                  value={this.state.searchinput}
                  placeholder="Search" 
                  onChange={(e) => this.searchinput(e)}
                  style={{ maxWidth:300,marginBottom:20,height:40 }}
                /> */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Input
                    value={this.state.searchinput}
                    placeholder="Search"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                  {/* <Button 
                    type='primary' 
                    onClick={()=>this.refresh()}
                  >
                    <i className='bx bxs-cloud-download' 
                      style={{ 
                      color:'#fff',
                      position:'relative',
                      top:3,
                      left:-3
                  }}
                    ></i> Refersh data
                  </Button> */}
                  <Button
                    type="primary"
                    onClick={() => this.exportToCSV("Investment Details")}
                    disabled={!this.state.canExportGroups}
                  >
                    <i
                      className="bx bxs-cloud-download"
                      style={{
                        color: "#fff",
                        position: "relative",
                        top: 3,
                        left: -3,
                      }}
                    ></i>{" "}
                    Export Data
                  </Button>
                </div>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  loading={this.state.loading}
                  bordered
                />
              </Card>
            </Content>

            <BottomBar />
              </>
            )}
          </Layout>
        </Layout>

        {/* Start Add modal  */}
        <Modal
          title="Add New Startup"
          visible={this.state.addModalStatus}
          onOk={this.addstartup}
          okText="Submit"
          onCancel={() => this.setState({ addModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Startup Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Founders <span className="text-danger">*</span>
              </label>
              <Select
                name="selectedfounder"
                className="form-input-field"
                value={this.state.selectedfounder}
                onChange={(value) => this.selectFounder(value)}
                mode="multiple"
              >
                {this.state.founderlist &&
                  this.state.founderlist.map((item, index) => {
                    return (
                      <Option key={index} value={item.investor_id}>
                        {item.first_name} {item.last_name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Operational Founder{" "}
                <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                className="form-input-field"
                value={this.state.operational_founder}
                style={{ width: "100%" }}
                onChange={(value) =>
                  this.setState({ operational_founder: value })
                }
              >
                {this.state.founderlist &&
                  this.state.founderlist.map((item, index) => {
                    if (this.state.selectedfounder.includes(item.investor_id)) {
                      return (
                        <Option key={index} value={item.investor_id}>
                          {item.first_name} {item.last_name}
                        </Option>
                      );
                    }
                  })}
              </Select>
            </div>
            <div className="form-group mt-3">
              <label className="mb-2">
                Select Authorized Signatory{" "}
                <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                className="form-input-field"
                value={this.state.authorised_founder}
                style={{ width: "100%" }}
                onChange={(value) =>
                  this.setState({ authorised_founder: value })
                }
              >
                {this.state.founderlist &&
                  this.state.founderlist.map((item, index) => {
                    if (this.state.selectedfounder.includes(item.investor_id)) {
                      return (
                        <Option key={index} value={item.investor_id}>
                          {item.first_name} {item.last_name}
                        </Option>
                      );
                    }
                  })}
              </Select>
            </div>

            <div className="form-group mt-3">
              <label className="mb-2">
                Status <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                className="form-input-field"
                value={this.state.status}
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ status: value })}
              >
                <Option value="Open">Open</Option>
                <Option value="Closed">Closed</Option>
                <Option value="Deactive">Deactive</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End Add modal  */}

        {/* Start Edit modal  */}
        <Modal
          title="Edit Group"
          visible={this.state.editModalStatus}
falsek={this.updatestartup}
          okText="Update"
          onCancel={() => this.setState({ editModalStatus: false })}
          width={550}
        >
          <Spin spinning={this.state.formloader}>
            <div className="form-group">
              <label className="mb-2">
                Group Name <span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.editname}
                onChange={(e) => this.setState({ editname: e.target.value })}
              />
            </div>
           
            <div className="form-group mt-3">
              <label className="mb-2">
                Status <span className="text-danger">*</span>
              </label>
              <Select
                name="editstatus"
                className="form-input-field"
                value={this.state.editstatus}
                onChange={(value) => this.setState({ editstatus: value })}
              >
                <Option value="Open">Open</Option>
                <Option value="Closed">Closed</Option>
                <Option value="Deactive">Deactive</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End Edit modal  */}

        {/* Start delete modal  */}
        <Modal
          title="Delete startup"
          visible={this.state.deleteModalStatus}
          onOk={this.deletestartup}
          okText="Delete"
          onCancel={() => this.setState({ deleteModalStatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <p style={{ fontSize: 16 }}>
              Are you sure you want to delete Group ?
            </p>
          </Spin>
        </Modal>
        {/* End delete modal  */}

        {/* Start update status modal  */}
        <Modal
          title="Update Status"
          visible={this.state.updatemodalstatus}
          onOk={this.updatestatus}
          okText="Update"
          onCancel={() => this.setState({ updatemodalstatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <div className="mt-4">
              <label className="mb-2">
                {" "}
                Approve / Pending Status<span className="text-danger">*</span>
              </label>

              <Select
                value={this.state.approvestatus}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ approvestatus: value });
                }}
              >
                <Option value="">--Select--</Option>
                <Option value="Approved">Approved</Option>
                <Option value="Pending">Pending</Option>
              </Select>
            </div>
            <div className="mt-4">
              <label className="mb-2">
                {" "}
                Deal Status<span className="text-danger">*</span>
              </label>

              <Select
                value={this.state.dealstatus}
                style={{ width: "100%" }}
                onChange={(value) => {
                  this.setState({ dealstatus: value });
                }}
              >
                <Option value="">--Select--</Option>
                <Option value="Public">Public</Option>
                <Option value="Private">Private</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            </div>
          </Spin>
        </Modal>
        {/* End update status modal  */}
      </>
    );
  }
}

export default FamilyAdmin;
