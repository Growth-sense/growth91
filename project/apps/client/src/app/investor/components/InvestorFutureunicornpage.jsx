import React, { Component } from "react";
import Bridge from "../../constants/Bridge";
import {
  Table,
  message,
  Input,
  Spin,
  Modal,
  Menu,
  Dropdown,
  Button,
} from "antd";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";
export default class InvestorFutureunicornpage extends Component {
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
      showintrestedlist: "",
      cshowintrestedlist: "",
    };
  }

  componentDidMount() {
    this.intrestedlist();
    // this.get_referral_code();
  }
  intrestedlist = async () => {
    let params = {
      investor_id:this.props.investor_id|| localStorage.getItem("investor_id"),
    };
    Bridge.Unicorn.unicorn_interested_list(params).then((result) => {
      this.setState({ showintrestedlist: result.data ,cshowintrestedlist: result.data });
      console.log(result.data);
    });
  };

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
        console.log(this.state.showintrestedlist);
        
      let arr = [];
      for (let item of this.state.showintrestedlist) {
        if (
         ( item.udStartupName&&item.udStartupName.toLowerCase().includes(text.toLowerCase()) )||
         ( item.interestDate&&item.interestDate.toLowerCase().includes(text.toLowerCase()) )||
         ( item.interestMessage&&item.interestMessage.toLowerCase().includes(text.toLowerCase()) )||
         ( item.udPrimaryContactName&&item.udPrimaryContactName.toLowerCase().includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        showintrestedlist: arr,
        loading: false,
      });
    } else {
      this.setState({
        showintrestedlist: this.state.cshowintrestedlist,
        loading: false,
      });
    }
  };

  exportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.showintrestedlist) {
      let obj = {
        "Sr No": count++,
        Unicorn: item.udStartupName,
        name: item.udPrimaryContactName,
        //   email: item.email,
        //   mobile: item.mobile,
        Message: item.interestMessage ? item.interestMessage : "---",
        Intrested:
          (item.interestKnowMore == 1 && "I Want to know more about it") ||
          (item.interestWorkwithYou == 1 && "I want to work with you") ||
          (item.interestInvestinStartup == 1 &&
            "I am excited to invest in your startups"),
        interestDate: item.interestDate,

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
  render() {
    //for referral
    const dataSource =
      this.state.showintrestedlist &&
      this.state.showintrestedlist.map((item, index) => {
        return {
          key: index,
          Unicorn: item.udStartupName,
          name: item.udPrimaryContactName,
          //   email: item.email,
          //   mobile: item.mobile,
          Message: item.interestMessage ? item.interestMessage : "---",
          Intrested:
            (item.interestKnowMore == 1 && "I Want to know more about it") ||
            (item.interestWorkwithYou == 1 && "I want to work with you") ||
            (item.interestInvestinStartup == 1 &&
              "I am excited to invest in your startups"),
          interestDate: item.interestDate,
        };
      });

    const columns = [
      {
        title: "Unicorn Name",
        dataIndex: "Unicorn",
        key: "Unicorn",
        width: 280,
      },
      {
        title: "Founder Name",
        dataIndex: "name",
        key: "name",
        width: 280,
      },
      // {
      //           title: "Founder Email ID",
      //           dataIndex: "email",
      //           key: "email",
      //           width: 280,
      //         },
      //         {
      //           title: "Founder Mobile No.",
      //           dataIndex: "mobile",
      //           key: "mobile",
      //           width: 280,
      //         },

      {
        title: "Comment",
        dataIndex: "Message",
        key: "Message",
        width: 280,
      },
      {
        title: "Interest",
        dataIndex: "Intrested",
        key: "Intrested",
        width: 280,
      },
      {
        title: "Interest Date",
        dataIndex: "interestDate",
        key: "interestDate",
        width: 280,
      },
    ];

    return (
      <div className="mt-5">
        {this.state.loading ? (
          <div className="text-center mt-5">
            <h4>Loading data...</h4>
            <Spin size="large" />
          </div>
        ) : this.state.cshowintrestedlist.length > 0 ? (
          <>
            <Input
              value={this.state.searchinput}
              // .trim().split(/ +/)
              placeholder="Search"
              type={"text"}
              onChange={(e) => this.searchinput(e)}
              style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                float: "right",
                paddingBottom: "10px",
              }}
            >
              <Button
                type="primary"
                onClick={() => this.exportToCSV("Show intrest unicorn list")}
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
              className="table-2"
              dataSource={dataSource}
              columns={columns}
              loading={this.state.loading}
              bordered
              scroll={{ x: "max-content" }}
            />
          </>
        ) : (
          <>
            <div className="text-center mt-5">
              <h4>
              You have not shown any interest in Future Unicorns.
                <br></br>
              <a href={"/FutureUnicornList"}style={{ fontSize: "1.5rem" }}>
                  Start Today{" "}
                </a>
              </h4>
              <img src="No_data_rafiki.png" width={200} />
            </div>
          </>
        )}
      </div>
    );
  }
}
