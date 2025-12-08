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
  DatePicker,
  Spin,
  Dropdown,
  Menu,
  Tag,
  Input,
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import {
  WindowsOutlined,
  FundOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Userdetails from "./common/Userdetails";
import Dealflow from "./common/Dealflow";
import axios from "axios";
import $ from "jquery";
import NoPermission from "./common/NoPermission";
import { loadModulePermissions } from "./common/permissions";

const { Option } = Select;
const { Content } = Layout;
const { TextArea } = Input;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class Investments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      investments: [],
      cinvestments: [],
      approvemodalstatus: false,
      fundtransferstatus: false,
      formloader: false,
      remarks: "",
      iamount: "",
      idate: "",
      iname: "",
      deal_id: "",
      investment_id: "",
      fundremarks: "",
      referenceno: "",
      transferdate: "",
      fundtransfer: "",
      isapproved: "",
      notificationmodalstatus: false,
      invest_data: [],
      founder_details: {},
      request_loader: false,
      documents: [],
      modes:"ass",
      show_edit_commitment_modal: false,
      ac_edit_deal_id: "",
      ac_edit_investor_id: "",
      ac_edit_amount: "",
      edit_commitment_igst: 0,
      edit_commitment_igstvalue: 0,
      edit_commitment_payment_ref: "",
      ac_edit_processingfees: "",
      ac_edit_totalamount: "",
      ac_edit_deduct: "",
      ac_edit_agree: "",
      ac_edit_order_token: "",
      ac_edit_tdsstatus: "",
      ac_edit_gst: "",
      ac_edit_legalfee: "",
      ac_edit_walletDeductionMoney: "",
      ac_edit_interested_id: "",
      ac_edit_commitment_id: "",

      // permissions for master-data Investments
      canViewInvestments: false,
      canExportInvestments: false,
      canApproveInvestments: false,
      canTransferInvestments: false,
      canEditInvestments: false,
      canRequestSignInvestments: false,

    };
  }

  async componentDidMount() {
    await this.loadPermissions();
    if (this.props.noPermission) {
    return; // no view access → don't call list APIs, founder list, etc.
  }
    this.getinvestments();
    // this.get_investment_signed_status();
  }

  loadPermissions = async () => {
    const perms = await loadModulePermissions("investments");

    this.setState({
      canViewInvestments: perms.canView,
      canExportInvestments: perms.canExport,
      canApproveInvestments: perms.canApprove,
      canTransferInvestments: perms.canTransfer,
      canEditInvestments: perms.canEdit,
      canRequestSignInvestments: perms.canRequestSign,
    });
  };

  // get post list
  getinvestments = () => {
    this.setState({ loading: true });
    Bridge.admin.getinvestments().then((result) => {
      if (result.status == 1) {
        let arr = [];
        for (let item of result.data) {
          if (item.payment_status != "PENDING") {
            arr.push(item);
          }
        }
        this.setState({
          investments: result.data.filter((item,index)=>{ return item.investment_id!=null}).map((el)=>{return {...el,name: el.first_name + " " + el.last_name ,investment_id:Number(el.investment_id)}}).sort((a, b) => {
            // console.log(datas);
            return a.investment_id > b.investment_id ? -1 : 1;
          }),
          cinvestments:  arr.filter((item,index)=>{ return item.investment_id!=null}).map((el)=>{return {...el,name: el.first_name + " " + el.last_name }}).sort((a, b) => {
            // console.log(datas);
            return a.investment_id > b.investment_id ? 1 : -1;
          }),
          loading: false,
        });
        // console.log('investment',result.data);
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  searchinput = (e) => {
    let investments = this.state.cinvestments;
    let search = e.target.value;
    if (search) {
      investments = investments.filter((investment) => {
        return (
          (investment.name &&
            investment.name.toLowerCase().includes(search.toLowerCase())) ||
          (investment.first_name &&
            investment.first_name
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (investment.last_name &&
            investment.last_name
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (investment.email &&
            investment.email
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (investment.investment_id &&
            investment.investment_id
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (investment.Investment_amt &&
            investment.Investment_amt.toLowerCase().includes(
              search.toLowerCase()
            )) ||
          (investment.payment_ref &&
            investment.payment_ref.toLowerCase().includes(search.toLowerCase()))
        );
      });
    }

    this.setState({
      investments: investments,
    });
  };

  showapprovemodal = (item) => {
    if (!this.state.canApproveInvestments) {
      message.error("You do not have permission to approve investments.");
      return;
    }
    if (item.kycstatus != "Approved" && item.kycstatus != "admin_approved") {
      message.warning("KYC is pending. Please complete kyc process first.", 5);
      return;
    }
    this.setState({
      iamount: item.Investment_amt,
      idate: item.Invested_dt
        ? moment(item.Invested_dt).format("DD MMM, YYYY")
        : "",
      iname: item.first_name + " " + item.last_name,
      deal_id: item.deal_id,
      investment_id: item.investment_id,
      approvemodalstatus: true,

    });
  };
  // showEditCommitmentModal = (item, record) => {
  //   console.log(record);
  //   this.setState({
  //     ac_edit_deal_id: record.data.deal_id,
  //     ac_edit_investor_id: record.data.investor_id,
  //     ac_edit_amount: record.data.amount,
  //     ac_edit_processingfees: record.data.processingfees,
  //     ac_edit_totalamount: record.data.totalamount,
  //     ac_edit_deduct: record.data.deduct,
  //     ac_edit_agree: record.data.agree,
  //     ac_edit_order_token: record.data.order_token,
  //     ac_edit_tdsstatus: record.data.tdsstatus,
  //     ac_edit_gst: record.data.gst,
  //     ac_edit_legalfee: record.data.legalfee,
  //     ac_edit_walletDeductionMoney: record.data.walletDeductionMoney,
  //     ac_edit_interested_id: record.data.id,
  //     ac_edit_commitment_id: record.data.id,
  //     show_edit_commitment_modal: true,
  //   });
  // };
  ac_commit_update = () => {
    if (this.state.ac_edit_amount == "") {
      message.warning("Amount is required");
      return false;
    } else if (this.state.ac_edit_processingfees == "") {
      message.warning("Fee is required");
      return false;
    }
    else if (this.state.edit_commitment_payment_ref == "" || this.state.edit_commitment_payment_ref == "NA") {
      message.warning("Payment Reference is missing, cannot update Investment");
      return false;
    }

    const formData = new FormData();
    formData.append('payment_ref', this.state.edit_commitment_payment_ref);
    formData.append('amount', this.state.ac_edit_amount);
    formData.append('processingfees', this.state.ac_edit_processingfees);
    formData.append('igst', this.state.edit_commitment_igst);
    formData.append('igstvalue', this.state.edit_commitment_igstvalue);
    
    axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/Deal/edit_investment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        this.setState({
          show_edit_commitment_modal: false,
        }, () => {
          axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/Deal/display_investor_commitment_list`, {
            params: {
              deal_id: this.state.ac_deal_id,
            }
          })
            .then(response => {
              this.setState({
                commitment_investor_list: response.data.data,
                commitment_investor_listc: response.data.data,
                loading: false,
              });
            })
            .catch(error => {
              console.error(error);
            });
        });
        message.success("Investor commitment Updated successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  showeditmodal = (item,record) => {
    if (!this.state.canEditInvestments) {
      message.error("You do not have permission to edit investments.");
      return;
    }
    // console.log(record);
    this.setState({
      ac_edit_deal_id: record.dealid,
      ac_edit_investor_id: record.action.investor_id,
      ac_edit_amount: record.action.Investment_amt,
      ac_edit_processingfees: record.action.processingfees,
      ac_edit_totalamount: record.Commitment_amount,
      ac_edit_deduct: record.action.deduct,
      ac_edit_agree: record.action.agree,
      ac_edit_order_token: record.action.order_token,
      ac_edit_tdsstatus: record.action.tdsstatus,
      ac_edit_gst: record.action.gst,
      ac_edit_legalfee: record.action.legalfee,
      ac_edit_walletDeductionMoney: record.action.walletDeductionMoney,
      ac_edit_interested_id: record.action.id,
      ac_edit_commitment_id: record.action.id,
      edit_commitment_igst: record.action.igst,
      edit_commitment_igstvalue: record.action.igstvalue,
      edit_commitment_payment_ref: record.action.payment_ref,
      show_edit_commitment_modal: true,
    });
  };
  

  approve = () => {
    if (!this.state.canApproveInvestments) {
      message.error("You do not have permission to approve investments.");
      return;
    }
    if (!this.state.remarks) {
      message.warning("Please enter remarks");
      return;
    }
    this.setState({ loading: true });
    let params = {
      investment_id: this.state.investment_id,
      investment_remarks: this.state.remarks,
    };
    Bridge.admin.investment.approveinvestment(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            loading: false,
            investment_id: "",
            deal_id: "",
            remarks: "",
            approvemodalstatus: false,
          },
          () => this.getinvestments()
        );
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };
  showfundtransfermodal = (item) => {
    if (!this.state.canTransferInvestments) {
      message.error("You do not have permission to transfer funds.");
      return;
    }
    this.setState({
      fundtransferstatus: true,
      deal_id: item.deal_id,
      investment_id: item.investment_id,
      fundtransfer: item.Investment_amt,
      isapproved: item.isapproved,
      fundremarks: item.fundremarks,
      referenceno: item.referenceno,
      transferdate: item.transferdate ? moment(item.transferdate) : "",
    });
  };

  hideapprovemodal = (item) => {
    this.setState({
      approvemodalstatus: false,
    });
  };

  hidefundtransfermodal = (item) => {
    this.setState({
      fundtransferstatus: false,
    });
  };

  transfer = () => {
    if (!this.state.canTransferInvestments) {
      message.error("You do not have permission to transfer funds.");
      return;
    }
    if (this.state.isapproved == "Pending" || this.state.isapproved == "") {
      message.warning("Investment is not approved");
      return;
    }

    if (!this.state.fundtransfer) {
      message.warning("Please enter transfer fund field.");
      return;
    } else if (!this.state.referenceno) {
      message.warning("Please enter reference no");
      return;
    } else if (!this.state.transferdate) {
      message.warning("Please enter transfer date");
      return;
    } else if (!this.state.fundremarks) {
      message.warning("Please enter remarks");
      return;
    }

    this.setState({ loading: true });
    let params = {
      investment_id: this.state.investment_id,
      fundremarks: this.state.fundremarks,
      referenceno: this.state.referenceno,
      transferdate: this.state.transferdate,
      fundtransfer: this.state.fundtransfer,
    };
    Bridge.admin.investment.transferfund(params).then((result) => {
      if (result.status == 1) {
        message.success(result.message);
        this.setState(
          {
            loading: false,
            investment_id: "",
            deal_id: "",
            fundremarks: "",
            referenceno: "",
            transferdate: "",
            fundtransfer: "",
            fundtransferstatus: false,
          },
          () => this.getinvestments()
        );
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  exportToCSV = (fileName) => {
    if (!this.state.canExportInvestments) {
      message.error("You do not have permission to export investments data.");
      return;
    }
    let arr = [];
    let count = 1;
    for (let item of this.state.investments) {
      let obj = {
        "Sr No": count++,
        Name: item.first_name + " " + item.last_name,
        "Investment Amount": item.Investment_amt
          ? "₹ " + item.Investment_amt
          : "---",
        "Commitment Amount": item.totalamount
        ? "₹ " + item.totalamount
        : "---",
        "Startup Name": item.name ? item.name : "---",
        Reference: item.payment_ref,
        "Tax Type": item.payment_type,
        "KYC Status": item.isapproved,
        "Invested Email": item.email
          ? moment(item.Invested_dt).format("DD MMM, YYYY")
          : "---",
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

  openmodal = (item) => {
    if (!this.state.canRequestSignInvestments) {
      message.error("You do not have permission to request document signing.");
      return;
    }
    // console.log('item',item);
    this.setState(
      {
        notificationmodalstatus: true,
        invest_data: item,
      },
      () => this.get_signer_basic_details()
    );
  };
  get_signer_basic_details = () => {
    let params = {
      deal_id: this.state.invest_data.deal_id,
    };
    Bridge.admin.investment.get_signer_basic_details(params).then((result) => {
      if (result.status == 1) {
        if (result.data.length > 0) {
          this.setState({
            founder_details: result.data[0],
          });
        }
      } else {
        message.error(result.message);
      }
    });
  };
  closeModal = (item) => {
    this.setState({ notificationmodalstatus: false, invest_data: {} });
  };

  requesttosigndocument = () => {
    let digio_template_id = this.state.invest_data.digio_template_id;
    // investor
    let investor_email = this.state.invest_data.email;
    let investor_name =
      this.state.invest_data.first_name +
      " " +
      this.state.invest_data.last_name;
    let address = this.state.invest_data.address;
    let signer_name = this.state.founder_details.signer_name;
    let signer_email = this.state.founder_details.signer_email;
    let investor_sign_coordinate =
      this.state.invest_data.investor_sign_coordinate;
    let founder_sign_coordinate =
      this.state.invest_data.founder_sign_coordinate;
    let invested_amount = this.state.invest_data.Investment_amt;
    let r = (Math.random() + 1).toString(36).substring(7);
    let file_name = this.state.invest_data.name;
    let investment_id = this.state.invest_data.investment_id;
    //console.log('signer_name',signer_name);

    if (!investor_email) {
      message.warning("Invalid investor email address.");
      return;
    } else if (!investor_name) {
      message.warning("Invalid investor name");
      return;
    } else if (!signer_name) {
      message.warning("Invalid signer name.");
      return;
    } else if (!signer_email) {
      message.warning("Invalid signer email address.");
      return;
    } else if (!investor_sign_coordinate) {
      message.warning("Invalid sign coordinate of investor");
      return;
    } else if (!founder_sign_coordinate) {
      message.warning("Invalid Sign Coordinate of founder");
      return;
    }
    this.setState({ request_loader: true });
    let params = {
      investor_mobile: investor_email,
      founder_mobile: signer_email,
      investor_name: investor_name,
      founder_name: signer_name,
      template_id: digio_template_id,
      file_name: file_name + "_" + r + ".pdf",
      investor_sign_coordinate: investor_sign_coordinate,
      founder_sign_coordinate: founder_sign_coordinate,
      invested_amount: invested_amount,
      investment_id: investment_id,
      address: address,
    };

    Bridge.admin.sendsignrequest(params).then((response) => {
      if (response.data.status == "1") {
        let data = JSON.parse(response.data.data);
        let id = data.id;
        this.update_investment_document_id(data.id);
        message.success("Request send Successfully");
        this.setState({
          notificationmodalstatus: false,
          request_loader: false,
        });
      } else {
        message.warning(response.data.message);
        return;
      }
      // message.success("Request send Successfully")
      this.setState({ notificationmodalstatus: false, request_loader: false });
    });
  };
  update_investment_document_id = (document_signed_id) => {
    let params = {
      document_signed_id: document_signed_id,
      investment_id: this.state.invest_data.investment_id,
    };
    Bridge.update_investment_document_id(params).then((res) => {});
  };

  // refresh=()=>{
  //   Bridge.update_document_status().then((res)=>{
  //     // console.log('res',res);
  //   });
  // }

  //10-11-2022
  viewSignDocument = (docId) => {
    if (docId != "") {
      this.setState({ loading: true });
      axios({
        method: "post",
        responseType: "blob",
        url: `${process.env.REACT_APP_BASE_URL}api/admin/DocumentSign/DownloadDocument`,
        headers: {
          "Content-Type": "application/pdf",
        },
        data: {
          digioDocId: docId,
        },
      })
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {
            type: "application/pdf",
          });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          this.setState({ loading: false });
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log(error);
        });
    } else {
      message.warning(
        "Please Request to Document Signing/ Could not able to find document Id into the database"
      );
    }
  };
  render() {
    const { noPermission } = this.props;
    var nf = new Intl.NumberFormat('en-IN');
    const disdingid = (datas) => {
      if (this.state.modes=="ass") {
        const data = [...this.state.investments]
        .map((el) => {
          return { ...el, investment_id: Number(el.investment_id  ) };
        })
        .sort((a, b) => {
          // console.log(datas);
          return a.investment_id > b.investment_id ? 1 : -1;
        });
      this.setState({
        investments: data,
        modes:"dis"

      });
      } else if (this.state.modes=="dis"){
        const data = [...this.state.investments]
        .map((el) => {
          return { ...el, investment_id: Number(el.investment_id  ) };
        })
        .sort((a, b) => {
          // console.log(datas);
          return a.investment_id > b.investment_id ? -1 : 1;
        });
      this.setState({
        investments: data,
        modes:"ass"

      });
      }
       
      
    };
    const disdingname = (datas) => {
      if (this.state.modes=="ass") {
        const data = [...this.state.investments]
        .map((el) => {
          return { ...el, investment_id: Number(el.investment_id  ) };
        })
        .sort((a, b) => {
          // console.log(datas);
          return a.name > b.name ? 1 : -1;
        });
      this.setState({
        investments: data,
        modes:"dis"

      });
      } else if (this.state.modes=="dis"){
        const data = [...this.state.investments]
        .map((el) => {
          return { ...el, investment_id: Number(el.investment_id  ) };
        })
        .sort((a, b) => {
          // console.log(datas);
          return a.name > b.name ? -1 : 1;
        });
      this.setState({
        investments: data,
        modes:"ass"

      });
      }
       
      
    };
    const disdingdate = () => {
      if (this.state.modes=="ass") {
        const data = [...this.state.investments]
        .map((el) => {
          return { ...el, investment_id: Number(el.investment_id  )  };
        })
        .sort((a, b) => {
          return new Date (a.Invested_dt).toISOString() >new Date (b.Invested_dt).toISOString() ? 1 : -1;
        });
      this.setState({
        investments: data,
        modes:"dis"

      });
      } else if (this.state.modes=="dis"){
        const data = [...this.state.investments]
        .map((el) => {
          return { ...el, investment_id: Number(el.investment_id)  };
        })
        .sort((a, b) => {
          // console.log(datas);
          return new Date (a.Invested_dt).toISOString() > new Date (b.Invested_dt).toISOString()? -1 : 1;
        });
      this.setState({
        investments: data,
        modes:"ass"

      });
      }
       
      
    };
    const disdingcammitamt= (datas) => {
      // console.log(this.state.modes);
            if (this.state.modes=="ass") {

        const data = [...this.state.investments]
          .map((el) => {
            return { ...el, amount: Number(el.amount) };
          })
          .sort((a, b) => {
            // console.log(datas);
            return a.amount> b.amount ? 1 : -1;
          });
        this.setState({
          investments: data,
            modes:"dis"
        });
        // console.log(data);

      } else if (this.state.modes=="dis"){
        const data = [...this.state.investments]
        .map((el) => {
          return { ...el, amount: Number(el.amount) };
        })
        .sort((a, b) => {
          // console.log(datas);
          return a.amount> b.amount ? -1 : 1;
        });
      this.setState({
        investments: data,
          modes:"ass"
      });
      // console.log(data);
    }

    
    };
    const disdingfee= (datas) => {
      console.log(this.state.modes);
      if (this.state.modes=="ass") {
      
        const data = [...this.state.investments]
          .map((el) => {
            return { ...el, processingfees: Number(el.processingfees) };
          })
          .sort((a, b) => {
            // console.log(datas);
            return a.processingfees> b.processingfees ? 1 : -1;
          });
        this.setState({
          investments: data,
          modes:"dis"

        });
        // console.log(data);
      } else if (this.state.modes=="dis"){

        const data = [...this.state.investments]
        .map((el) => {
          return { ...el, processingfees: Number(el.processingfees) };
        })
        .sort((a, b) => {
          // console.log(datas);
          return a.processingfees> b.processingfees ? 1 : -1;
        });
      this.setState({
        investments: data,
         modes:"ass"
      });
      // console.log(data);
    }
    
    };
    const dataSource =
      this.state.investments &&
      this.state.investments.map((item, index) => {
        
        return {
          key: index,
          investmentno: item,
          name: item,
          investddate: item.Invested_dt
            ? moment(item.Invested_dt).format("DD MMM, YYYY")
            : "---",
          investmentamount: item.Investment_amt
            ? "₹ " + nf.format( item.Investment_amt)
            : "---",
            processingfees: item.processingfees
            ? "₹ " +  nf.format(item.processingfees)
            : "---",
          startupname: item.deal_name ? item.deal_name : "---",
          InvestedEmail: item.email? item.email: "---",
          panno: item.panno ? item.panno : "---",
          dealid: item.deal_id ? item.deal_id : "---",
          reference: item.Investment_amt,
          Commitment_amount: "₹ " +  nf.format(item.totalamount),
          txntype: item.payment_type,
          status: item.isapproved,
          action: item,
          kycstatus: item.kycstatus ? item.kycstatus : "Pending",
          investment_stage: item,
          gst: "₹ " + (parseInt(item.igstvalue))
        };
      });

    const columns = [
      {
        title: <span
        onClick={() => {
          disdingid();
        }}
      >Investment No</span>,
        dataIndex: "investmentno",
        key: "investmentno",
        width: 160,
        align:"right",
        render: (text) => {
          return <Dealflow data={text} />;
        },
      },
      {
        title: <span onClick={() => {
          disdingname();
        }}>Investor Name</span>,
        
        dataIndex: "name",
        key: "name",
        width: 200,
        render: (text) => {
          return <Userdetails data={text} />;
        },
      },
      {
        title: "Invester Email",
        dataIndex: "InvestedEmail",
        key: "InvestedEmail",
        width: 180,
      },
      {
        title: <span onClick={() => {
          disdingid();

        }}>Invested Date</span>,
        
        dataIndex: "investddate",
        key: "investddate",
        width: 180,
      },
      // {
      //   title: "Net Amount",
      //   dataIndex: "investmentamount",
      //   key: "investmentamount",
      //   width: 180,
      //   align: "right",
      // },
      {
        title: "Startup Name",
        dataIndex: "startupname",
        key: "startupname",
      },
      {
        title: "Pan Id",
        dataIndex: "panno",
        key: "panno",
      },
      // {
      //   title: "Deal Id",
      //   dataIndex: "dealid",
      //   key: "dealid",
      // },
      {
        title: <span
        onClick={() => {
          disdingcammitamt();
        }}
      >Commitment Amount</span>,
        dataIndex: "Commitment_amount",
        key: "Commitment_amount",
        align:"right",

      },
      // {
      //   title: "Investment Stage",
      //   dataIndex: "investment_stage",
      //   key: "investment_stage",
      //   render: (text) => {
      //     let status = "";
      //     if (text.roc_status == "fndr_roc_confirmation") {
      //       status = "Founder ROC Confirmed";
      //     }
      //     if (text.fund_raise_status == "success") {
      //       status = "Fund transffered successfully.";
      //     } else if (text.founder_document_sign_status == "fndr_sign_success") {
      //       status = "Founder Document Sign Completed";
      //     } else if (text.investor_document_sign_status == "Inv_sign_success") {
      //       status = "Investor Dcoument Sign Completed";
      //     } else if (text.admin_approval_status == "admin_approval") {
      //       status = "Admin Approved";
      //     } else if (text.payment_status == "payment_success") {
      //       status = "Payment Completed";
      //     } else if (
      //       text.kycstatus == "Approved" ||
      //       text.kycstatus == "admin_approved"
      //     ) {
      //       status = "KYC Done";
      //     } else {
      //       status = "---";
      //     }
      //     return <p>{status}</p>;
      //   },
      // },
      // {
      //   title: "Txn Reference",
      //   dataIndex: "reference",
      //   key: "reference",
      // },
      {
        title: <span
        onClick={() => {
          disdingfee();
        }}
      >Investment Amount</span>,
        dataIndex: "investmentamount",
        key: "investmentamount",
        align:"right",

      },
      {
        title: <span
        
      >GST</span>,
        dataIndex: "gst",
        key: "gst",
        align:"right",

      },
      {
        title: <span
        onClick={() => {
          disdingfee();
        }}
      >Fees</span>,
        dataIndex: "processingfees",
        key: "processingfees",
        align:"right",

      },
      // {
      //   title: "Txn Type",
      //   dataIndex: "txntype",
      //   key: "txntype",
      //   render: (text) => {
      //     // console.log('text',text);
      //     if (text == "online_payment") {
      //       return <Tag color="green">{text}</Tag>;
      //     } else {
      //       return <Tag color="blue">{text}</Tag>;
      //     }
      //   },
      // },
      // {
      //   title: "Status",
      //   dataIndex: "status",
      //   key: "status",
      //   width: 100,
      // },
      // {
      //   title: "KYC Status",
      //   dataIndex: "kycstatus",
      //   key: "kycstatus",
      //   width: 150,
      //   render: (text) => {
      //     // console.log('text',text);
      //     if (text == "Approved") {
      //       return <Tag color="yellow">System Approved</Tag>;
      //     } else if (text == "admin_approved") {
      //       return <Tag color="green">Admin Approved</Tag>;
      //     } else if (text == "Rejected") {
      //       return <Tag color="red">Admin Rejected</Tag>;
      //     } else {
      //       return <Tag color="blue">Pending</Tag>;
      //     }
      //   },
      // },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          const menu = (
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.state.path]}
              style={{ width: 240 }}
            >
              {text.admin_approval_status == "admin_approval" &&
                text.founder_document_sign_status != "fndr_sign_success" &&
                text.fund_raise_status != "success" && (
                  <Menu.Item
                    key={`send${record.key}`}
                    icon={<FundOutlined />}
                    disabled={!this.state.canRequestSignInvestments}
                  >
                    <a
                      href="#"
                      style={{ fontSize: 14 }}
                      onClick={() =>
                        this.state.canRequestSignInvestments &&
                        this.openmodal(text)
                      }
                    >
                      &nbsp;&nbsp; Request Dcoument Signing
                    </a>
                  </Menu.Item>
                )}
              {text.payment_status == "payment_success" &&
                text.fund_raise_status != "success" &&
                text.founder_document_sign_status != "fndr_sign_success" && (
                  <>
                    <Menu.Item
                      key={`Edit${record.key}`}
                      icon={<WindowsOutlined />}
                      disabled={!this.state.canApproveInvestments}
                    >
                      <a
                        href="#"
                        onClick={() =>
                          this.state.canApproveInvestments &&
                          this.showapprovemodal(text)
                        }
                        style={{ fontSize: 14 }}
                      >
                        &nbsp;&nbsp;Approve Status
                      </a>
                    </Menu.Item>
                  {JSON.parse(localStorage.getItem("super_admin")) === "1" && 
                    <Menu.Item
                      key={`Edits${record.key}`}
                      icon={<WindowsOutlined />}
                      disabled={!this.state.canEditInvestments}
                    >
                      <a
                        href="#"
                        onClick={() =>
                          this.state.canEditInvestments &&
                          this.showeditmodal(text, record)
                        }
                        style={{ fontSize: 14 }}
                      >
                        &nbsp;&nbsp;Edit
                      </a>
                    </Menu.Item>
                   } 
                  </>
                )
                }
              {text.founder_document_sign_status == "fndr_sign_success" &&
                text.fund_raise_status != "success" && (
                  <Menu.Item
                    key={`Delete${record.key}`}
                    icon={<FundOutlined />}
                    disabled={!this.state.canTransferInvestments}
                  >
                    <a
                      href="#"
                      style={{ fontSize: 14 }}
                      onClick={() =>
                        this.state.canTransferInvestments &&
                        this.showfundtransfermodal(text)
                      }
                    >
                      &nbsp;&nbsp; Transfer Funds
                    </a>
                  </Menu.Item>
                )}
              {text.founder_document_sign_status == "fndr_sign_success" &&
                text.document_signed_id != "" && (
                  <Menu.Item key="signedDoc" icon={<AuditOutlined />}>
                    <a
                      href="#"
                      style={{ fontSize: 14 }}
                      onClick={() =>
                        this.viewSignDocument(text.document_signed_id)
                      }
                    >
                      View Signed Document
                    </a>
                  </Menu.Item>
                )}
            </Menu>
          );
          return (
            <div>
              <Dropdown overlay={menu} placement="bottom">
                <a onClick={(e) => e.preventDefault()}>
                  <div className="menu-action ">
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
          <Navbar />

          <Layout className="site-layout">
            <Sidebar2 />

            {noPermission ? (
              <NoPermission />
            ) : (
              <>
                <Content className="home-section">
                  <Card title="Investments" style={{ margin: 16 }}>
                    <Breadcrumb
                      style={{
                        margin: "0",
                      }}
                    >
                      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item>Investments</Breadcrumb.Item>
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
                        style={{
                          maxWidth: 300,
                          marginBottom: 20,
                          height: 40,
                        }}
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
                        onClick={() =>
                          this.exportToCSV("Investment Details")
                        }
                        disabled={!this.state.canExportInvestments}
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
              </>
            )}
          </Layout>
        </Layout>

        {/* Start Delete modal  */}
        <Modal
          title="Request To Sign Document"
          visible={this.state.notificationmodalstatus}
          okText="Request"
          onOk={() => this.requesttosigndocument()}
          onCancel={() => this.closeModal()}
        >
          <Spin spinning={this.state.request_loader}>
            <p>Are you sure you want to send request?</p>
          </Spin>
        </Modal>
        {/* End approve modal  */}

        {/* Start approve modal  */}
        <Modal
          title="Approve"
          visible={this.state.approvemodalstatus}
          onOk={this.approve}
          okText="Approve"
          onCancel={() => this.setState({ approvemodalstatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <div className="mb-2">
              <label className="mb-2"> Investor Name: {this.state.iname}</label>
            </div>
            <div className="mb-2">
              <label className="mb-2">
                {" "}
                Investor Amount: ₹{this.state.iamount}
              </label>
            </div>
            <div className="mb-2">
              <label className="mb-2"> Investor Date: {this.state.idate}</label>
            </div>
            <div className="mt-4">
              <label className="mb-2">
                {" "}
                Remarks<span className="text-danger">*</span>
              </label>
              <TextArea
                rows={4}
                value={this.state.remarks}
                onChange={(e) => this.setState({ remarks: e.target.value })}
              />
            </div>
          </Spin>
        </Modal>
        {/* End approve modal  */}

        {/* Start approve modal  */}
        <Modal
          title="Fund Transfer"
          visible={this.state.fundtransferstatus}
          onOk={this.transfer}
          okText="Update"
          onCancel={() => this.setState({ fundtransferstatus: false })}
        >
          <Spin spinning={this.state.formloader}>
            <div className="mb-3">
              <label className="mb-2">
                {" "}
                Fund Transfer<span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.fundtransfer}
                onChange={(e) =>
                  this.setState({ fundtransfer: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="mb-2">
                {" "}
                Transfer Date<span className="text-danger">*</span>
              </label>

              <DatePicker
                value={this.state.transferdate}
                style={{
                  width: "100%",
                }}
                onChange={(date, dateString) =>
                  this.setState({ transferdate: date })
                }
              />
            </div>
            <div className="mb-3">
              <label className="mb-2">
                {" "}
                Txt Reference No<span className="text-danger">*</span>
              </label>
              <Input
                value={this.state.referenceno}
                onChange={(e) => this.setState({ referenceno: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="mb-2">
                {" "}
                Remarks<span className="text-danger">*</span>
              </label>
              <TextArea
                rows={4}
                value={this.state.fundremarks}
                onChange={(e) => this.setState({ fundremarks: e.target.value })}
              />
            </div>
          </Spin>
        </Modal>
        {/* End approve modal  */}

          {/* Start Edit modal  */}
          <Modal
          title="Update Investment"
          visible={this.state.show_edit_commitment_modal}
          onOk={this.ac_commit_update}
          okText="Update"
          onCancel={() => this.setState({ show_edit_commitment_modal: false })}
          width={550}
        >
          <div className="mt-4 editor-field">
            <label className="mb-2">
              Amount <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_amount}
              onChange={(e) =>
                this.setState({ ac_edit_amount: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="mb-2">
              Fee <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.ac_edit_processingfees}
              onChange={(e) =>
                this.setState({ ac_edit_processingfees: e.target.value })
              }
            />
          </div>
          <div className="mt-4 editor-field">
            <label className="mb-2">
              GST Percentage
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.edit_commitment_igst}
              onChange={(e) =>
                this.setState({ edit_commitment_igst: e.target.value })
              }
            />
          </div>
          <div className="mt-4 editor-field">
            <label className="mb-2">
              GST Value
            </label>
            <Input
              type="number"
              onWheel={() => document.activeElement.blur()}
              value={this.state.edit_commitment_igstvalue}
              onChange={(e) =>
                this.setState({ edit_commitment_igstvalue: e.target.value })
              }
            />
          </div>
        </Modal>
        {/* End Edit modal  */}
      </>
    );
  }
}

export default Investments;
