import React, { Component } from "react";
import axios from "axios";
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
  DatePicker,
  Dropdown,
  Menu,
  Switch,
  Checkbox,
  Input,
  Tooltip,
  Tag,
} from "antd";
import moment from 'moment';
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class Deals extends Component {
  constructor(props) {
    super(props);
    this.state = {
        analytic_interest_list: [],
        canalytic_interest_list: [],
        searchinput: "",
        loading:false,
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/InterestAnalytics/display_deal_interested_investor`)
      .then(response => {
        if (response.status != 1) {
        this.setState({
            analytic_interest_list: response.data.data,
            canalytic_interest_list: response.data.data,
            loading: false,
        });
      }else{
        this.setState({
          loading:false
        })
      }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: false , searchinput: text });
    if (text) {
      let arr = [];
      for (let item of this.state.canalytic_interest_list) {
        if (
          (item.deal_name && item.deal_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.email.toLowerCase().includes(text.toLowerCase())) ||
          (item.mobile.toLowerCase().includes(text.toLowerCase())) ||
          ( moment(item.created_at).format('D-MMM-YYYY h:mm A').toLowerCase().includes(text.toLowerCase())) ||
          (item.last_name.toLowerCase().includes(text.toLowerCase())) 
        
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        analytic_interest_list: arr,
        loading: false,
      });
    } else {
      this.setState({
        analytic_interest_list:this.state.canalytic_interest_list,
        loading: false,
      });
    }
  };
  handleChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) this.handleFile(files[0]);
  };
  handleFile = (file) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.dataTrigger(data, file);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };
  dataTrigger = (data, file) => {
    const invite_data = data.shift();
    this.setState({ input_status: true });
    let arr = [];
    let index = 0;
    for (let item of data) {
      let name = item[0];
      let email = item[1];
      let mobile = item[2];
      if (item.length > 0 && email && name && mobile) {
        let obj = {
          id: index++,
          name: name,
          email: email,
          mobile: mobile,
          selected: false,
        };
        arr = [...arr, obj];
      }
    }
    this.setState({ invited_user_list: arr }, () =>
      this.get_invitation_list(arr)
    );
  };
  get_invitation_list = (exellist) => {
    let deal_id = this.state.invite_deal_id;
    let params = {
      deal_id,
    };
    if (deal_id) {
      Bridge.get_invitation_list(params).then((result) => {
        if (result.status == "1") {
          let invited_list = result.data;
          if (invited_list.length > 0) {
            let arr = [];
            let emaillist = [];
            for (let item of invited_list) {
              emaillist.push(item.email);
            }
            for (let item of exellist) {
              item.isExists = false;
              if (emaillist.includes(item.email)) {
                item.isExists = true;
              }
              arr.push(item);
            }
            // console.log('arr',arr);
            this.setState({ invited_user_list: arr });
          } else {
            let arr = [];
            for (let item of exellist) {
              item.isExists = false;
              arr.push(item);
            }
            // console.log('arr',arr);
            this.setState({ invited_user_list: arr });
          }
        }
      });
    }
  };
  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.deallist) {
      let obj = {
        "Sr No": count,
        "Deal ID": item.deal_id,
        "Startup Name": item.name,
        "Startup ID": item.startup_id,
        "Deal Name": item.deal_name,
        "Deal Type": item.deal_type,
        "Deal Service": item.deal_service,
        "Deal Show Date(Regular)": item.regular_show_date,
        "Deal Show Date(Premium)": item.premium_show_date,
        "Deal Start Date(Regular)": item.deal_st_date,
        "Deal Start Date(Premium)": item.deal_start_dt_prem,
        "Deal End Date(Regular)": item.deal_end_date,
        "Deal End Date(Premium)": item.deal_end_dt_prem,
        "Target Amount": item.deal_fund_requested,
        "Min Investment Amount": item.Min_inv_amt,
        "Max Investment Amount": item.Max_inv_amt,
        "Multiples Of": item.multiples_of,
        "Number Of Invitations": item.total_invitions,
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

  render() {
    const dataSource =
      this.state.analytic_interest_list &&
      this.state.analytic_interest_list.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          first_name: item.first_name,
          last_name: item.last_name,
          deal_name: item.deal_name,
          mobile: item.mobile,
          email: item.email,
          created_at: item.created_at ? moment(item.created_at).format('D-MMM-YYYY h:mm A') : '',
        };
      });
   
    const columns = [
      {
        title: "SR NO",
        dataIndex: "srno",
        key: "srno",
        width: 100,
      },
      {
        title: "First Name",
        dataIndex: "first_name",
        key: "first_name",
        width: 100,
      },
      {
        title: "Last Name",
        dataIndex: "last_name",
        key: "last_name",
        width: 100,
      },
      {
        title: "Deal Name",
        dataIndex: "deal_name",
        key: "deal_name",
        width: 100,
      },
      {
        title: "Mobile No.",
        dataIndex: "mobile",
        key: "mobile",
        width: 100,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 100,
      },
      {
        title: "Created on",
        dataIndex: "created_at",
        key: "created_at",
        width: 100,
      },
    ];

    return (
      <>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
          <Navbar />

          <Layout className="site-layout">
            <Sidebar2 />

            <Content className="home-section">
              <Card
                title="Dropoff"
                style={{ margin: 16 }}
              >
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Dropoff</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
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
                  <Button
                    type="primary"
                    onClick={() => this.exportToCSV("Premium Membership")}
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
                  scroll={{ x: "max-content" }}
                />
              </Card>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>
      </>
    );
  }
}

export default Deals;

class SheetJSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cols: [],
    };
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        cellDates: true,
      });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      this.props.dataTrigger(data, file);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <>
        <DataInput handleFile={this.handleFile} />
      </>
    );
  }
}

const SheetJSFT = ["csv", "xlsx"]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <input
        style={{ paddingTop: 21 }}
        type="file"
        placeholder="default size"
        id="file"
        accept={SheetJSFT}
        onChange={this.handleChange}
      />
    );
  }
}
