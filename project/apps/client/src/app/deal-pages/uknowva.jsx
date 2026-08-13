import React, { Component } from "react";
import WebHeader from "../common/WebHeader";
import WebFooter from "../common/WebFooter";
import "./newboo.css";
import {
    Table,
    Tabs,
    Collapse,
    message,
    Modal,
    Spin,
    Checkbox,
    Progress,
    Alert,
    notification
} from "antd";
import axios from "axios";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import Apis from "../constants/Apis";
import moment from "moment";
import Bridge from "../constants/Bridge";
import InvestmentMembershipmodal from "../components/membership/InvestmentMembershipmodal";
import NewWebHeader from "../common/NewWebHeader";
import { NewWebFooter } from "../common/NewWebFooter";

const { Panel } = Collapse;
const { TabPane } = Tabs;
class uknowaHRMS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            igst: 0,
            igstvalue: 0,
            selectedInvestorId: null,
            selectInvestorModal: false,
            group_list: [],
            deal_id: "",
            investor_id: "",
            interested_id: "",
            deal_name: "",
            created_at: "",
            deal_description: "",
            isPrivate: false,
            isFunded: false,
            isBlank: false,
            tags: [],
            logo: "",
            youtube_url: "",
            dealenddays: 0,
            kycstatus: false,
            bankstatus: false,
            commaAmount: 0,
            amount: 0,
            minamount: 0,
            captable_threshold_amount: 0,
            maxamount: 0,
            captable_multiple_amount: 0,
            investmentmodal: false,
            confirmmodalstatus: false,
            deduct: false,
            agree: "",
            isInvested: false,
            name: "",
            email: "",
            mobile: "",
            conveniencefees: 100,
            gst: 0,
            amountplusgst: 0,
            processingfees: 0.0,
            totalamount: 0.0,
            tdsstatus: false,
            legalfee: 0.0,
            legalplusprocessing: 0.0,
            label: "",
            percentage: 0,
            check_membership_type: "",
            member_detail: "",
            tdsdeductedamount: 0,
            order_token: "",
            pdffile: "",
            pitch_files: "",
            pitch_list: [],
            walletMoney: 0,
            gstValue: 0,
            walletDeductionMoney: 0,
            checkWallet: false,
            percentage_raised: 0,
            documents: [],
            button_status: true,
            show_data: "none",
            button_show_status: true,
            amount_error: "",
            amount_error_status: false,
            multiples_of: 0,
            founder_is_investor: 0,
            user_type: "",
            coming_soon_days: "",
            deal_regular_end_date: "",
            is_deal_visible: true,
            deal_regular_end_date_status: 0,
            invest_amt: "",
            escrowact: "",
            escrow_account_ifsc: "",
            agreeCheck: false,
            Convenience: "",
            gstBusinessName: "",
            gstNo: "",
            gstmodal: false,
            deal_service: "",
            images: [

                "./assets/images/deals-details/uknowva/Pitch/new-01.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-02.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-03.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-04.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-05.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-06.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-07.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-08.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-09.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-10.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-11.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-12.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-13.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-14.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-15.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-16.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-17.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-18.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-19.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-20.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-21.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-22.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-23.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-24.jpg",
                "./assets/images/deals-details/uknowva/Pitch/new-25.jpg",



            ],
            current: "",
        };
    }
    callback1 = (key) => { };
    callback2 = (key) => { };
    callback3 = (key) => { };

    componentWillMount() {
        document.title = "uKnowva HRMS - Growth91 - Startup Marketplace ";
    }
    componentDidMount() {
        let deal_id = "41";
        // let deal_id = process.env.ENVIRONMENT === "production" ? "41" : "133";

        this.setState({ deal_id: deal_id }, () => {
            this.get_pitch_list();
        });

        if (
            localStorage.getItem("investor_id") ||
            localStorage.getItem("founder_id")
        ) {
            if (localStorage.getItem("investor_id")) {
                let investor_id = localStorage.getItem("investor_id");
                this.setState(
                    { investor_id: investor_id, user_type: "investor" },
                    () => {
                        this.getstatusdata();
                        this.getinvestmentdetails();
                        this.check_for_membership_type();
                        this.getwallethistory();
                        this.get_invest_amt();
                    }
                );
            } else if (localStorage.getItem("founder_id")) {
                this.get_founder_details();
                this.setState({ user_type: "founder" });
            }
        } else {
            this.getDeals();
        }
        this.getordertoken();
        this.getGst();
        this.get_deal_doucments(deal_id);
        // console.log("hello");

        this.setState(
            {
              investor_id: localStorage.getItem("Parent_investor_id"),
            },
      
            () => this.viewgroupall(),
            
          );
    }

    viewgroupall = () => {
           let params = {
             userID:!this.props.adminview?localStorage.getItem("Parent_investor_id"):this.props.investor_id,
           }
       
           Bridge.family.getGroupListForInvestment(params).then((result) => {
                let youAsMember = [{
                    investor_id: localStorage.getItem("Parent_investor_id"),
                    first_name: "You",
                    last_name:"",
                    groupName: "N/A"
                }]
             this.setState({ group_list: youAsMember.concat(result.data) });
           });
         };

    get_founder_details = () => {
        let params = {
            founder_id: localStorage.getItem("founder_id"),
        };
        Bridge.founder.get_founder_profile_details(params).then((result) => {
            if (result.status == "1") {
                if (result.data.length > 0) {
                    let investor_id = localStorage.getItem("founder_id");
                    this.setState({ investor_id: investor_id }, () =>
                        this.getwallethistory()
                    );
                    setTimeout(() => {
                        if (result.data[0].is_investor == "1") {
                            this.getstatusdata();
                            this.getinvestmentdetails();
                            this.check_for_membership_type();
                            this.setState({ founder_is_investor: "1" });
                        } else {
                            this.check_for_membership_type();
                            this.setState({ founder_is_investor: "0" });
                        }
                    }, 200);
                }
            } else {
                this.setState({ formloader: false });
            }
        });
    };
    get_deal_doucments = (deal_id) => {
        let params = {
            deal_id: deal_id,
        };
        Bridge.get_deal_doucments(params).then((result) => {
            if (result.status == "1") {
                let arr = [];
                for (let item of result.data) {
                    item.selected = false;
                    arr = [...arr, item];
                }
                this.setState({ documents: arr }, () =>
                    this.get_document_purchased_list()
                );
            }
        });
    };
    show_selected_checkbox = (single) => {
        let arr = [];
        let docuemnts = this.state.documents;
        for (let item of docuemnts) {
            if (item.documentid == single.documentid) {
                item.selected = item.selected == true ? false : true;
            }
            arr = [...arr, item];
        }
        this.setState({ docuemnts: arr });
        let data = [];
        for (let item2 of arr) {
            data = [...data, item2.selected];
        }
        let status = data.includes(true);
        this.setState({ button_status: !status });
    };

    getwallethistory() {
        if (this.state.investor_id) {
            let params = {
                investor_id: this.state.investor_id,
            };
            Bridge.investor.get_wallet_history(params).then((result) => {
                if (result.status == "1") {
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
                    this.setState({ walletMoney: Math.abs(total) });
                } else {
                }
            });
        }
    }
    //for getting gst from admin page
    getGst = () => {
        Bridge.admin.settings.getsettings().then((result) => {
            if (result.status == "1") {
                console.log(result.data[0]);
                if (this.state.member_detail.state == "Maharashtra") {
                    console.log(result.data[0]);

                    this.setState({
                        gst:
                            result.data[0].taxation_percentage_cgst +
                            result.data[0].taxation_percentage_sgst,
                        igst: 18,
                    });
                } else if (this.state.member_detail.nationality == "Non Resident") {
                    console.log(result.data[0]);
                    this.setState({ 
                        gst: result.data[0].taxation_percentage,
                        igst: 18,
                     });
                } else {
                    console.log(result.data[0], "asa");
                    this.setState({ 
                        gst: result.data[0].taxation_percentage,
                        igst: 18,
                     });
                    // console.log("gst can not be able to fetch")
                }
            }
        });
    };
    check_for_membership_type = () => {
        this.setState({ formloader: true });
        let params = {
            investor_id: this.state.investor_id,
        };
        Bridge.check_for_membership_type(params).then((result) => {
            if (result.status == 1) {
                if (result.data.length > 0) {
                    this.setState({
                        member_detail: result.data[0],
                        check_membership_type: result.data[0].membership_type,
                    });
                    setTimeout(() => {
                        this.getDeals();
                    }, 500);
                }
            } else {
                this.setState({ formloader: false });
            }
        });
        setTimeout(() => {
            this.getdealsettings();
        }, 500);
    };
    getordertoken = () => {
        Bridge.getcashfreetoken().then((result) => {
            let orderToken = result.order_token;
            // console.log(orderToken , "Order Token")
            this.setState({ order_token: orderToken });
        });
    };
    // get post list
    getdealsettings = () => {
        this.setState({ formloader: true });
        Bridge.admin.settings.getdealsettings().then((result) => {
            if (result.status == 1) {
                // console.log('result',result.data);
                this.setState({
                    label: result.data[0].label,
                });
                if (this.state.check_membership_type == "premium") {
                    this.setState({
                        percentage: result.data[0].premium_member_deal_percentage,
                    });
                } else {
                    this.setState({
                        percentage: result.data[0].regular_member_deal_percentage,
                    });
                }
            } else {
                // message.error(result.message);
                this.setState({
                    formloader: false,
                });
            }
        });
    };

    get_pitch_list = () => {
        this.setState({ loading: true });
        let params = {
            deal_id: this.state.deal_id,
        };
        Bridge.deal.get_image_list_of_pitch(params).then((result) => {
            if (result.status == 1) {
                let arr = [];
                for (let data of result.data) {
                    let pitchImg =
                        Apis.IMAGEURL +
                        "deal/pitch_images/" +
                        data.deal_id +
                        "/" +
                        data.image;
                    data.img = pitchImg;
                    arr = [...arr, data];
                }
                arr.sort((a, b) =>
                    a.pitch_order > b.pitch_order
                        ? 1
                        : b.pitch_order > a.pitch_order
                            ? -1
                            : 0
                );
                // console.log('arr',arr);
                this.setState({ pitch_list: arr, loading: false });
            } else {
                this.setState({
                    loading: false,
                });
            }
        });
    };

    getinvestmentdetails = () => {
        this.setState({ loading: true });
        let params = {
            investor_id: this.state.investor_id,
            deal_id: this.state.deal_id,
        };
        Bridge.investor.getinvestmentdetails(params).then((result) => {
            if (result.status == 1) {
                if (result.data != "") {
                    this.setState({ isInvested: true });
                }
            } else {
                this.setState({
                    loading: false,
                });
            }
        });
    };

    // get deal list
    getstatusdata = () => {
        this.setState({ loading: true });
        let params = {
            id: this.state.investor_id,
        };
        Bridge.users.getstatusdata(params).then((result) => {
            if (result.status == 1) {
                this.setState({
                    kycstatus: result.data[0].kycstatus,
                    bankstatus: result.data[0].ifsc_code ? true : false,
                    loading: false,
                    name: result.data[0].first_name + " " + result.data[0].last_name,
                    email: result.data[0].email,
                    mobile: result.data[0].mobile,
                });
            } else {
                message.error(result.message);
                this.setState({
                    loading: false,
                });
            }
        });
    };

    // get deal list
    getDeals = () => {
        this.setState({ loading: true });
        let param = {
              deal_id: this.state.deal_id
            }
        Bridge.deal.get_deal(param).then((result) => {
            // console.log(result.data, "data");
            if (result.status == 1) {
                this.setState({
                    deals: result.data,
                    loading: false,
                });
                let current_date = moment();
                for (let d of result.data) {
                    // console.log(d.deal_id , "id")
                    // console.log(this.state.deal_id , "sid")
                    if (d.deal_id == this.state.deal_id) {
                        //  console.log(d.deal_status)
                        let deal_regular_show_date = moment(d.regular_show_date);
                        let deal_premium_show_date = moment(d.premium_show_date);
                        let deal_start_dt_rg = moment(d.deal_st_date);
                        let deal_start_dt_prem = moment(d.deal_start_dt_prem);
                        if (this.state.check_membership_type == "premium") {
                            if (
                                moment(current_date).format("YYYY-MM-DD") ==
                                moment(deal_premium_show_date).format("YYYY-MM-DD")
                            ) {
                                this.setState({ show_data: "block" });
                            } else if (current_date > deal_premium_show_date) {
                                this.setState({ show_data: "block" });
                            } else {
                                this.setState({ show_data: "none" });
                                window.location.assign("/deals");
                                return;
                            }
                        } else if (this.state.check_membership_type == "regular") {
                            if (
                                moment(current_date).format("YYYY-MM-DD") ==
                                moment(deal_regular_show_date).format("YYYY-MM-DD")
                            ) {
                                this.setState({ show_data: "block" });
                            } else if (current_date > deal_regular_show_date) {
                                this.setState({ show_data: "block" });
                            } else {
                                this.setState({ show_data: "none" });
                                window.location.assign("/deals");
                                return;
                            }
                        }
                    }
                    // else{
                    //   // window.location.href = ("/deals")
                    //   // return;
                    //   console.log(d.deal_id , this.state.deal_id);
                    // }
                }
                for (let d of result.data) {
                    if (d.deal_id == this.state.deal_id) {
                        if (d.show_status == "0") {
                            this.setState({ is_deal_visible: false });
                            // window.location.assign("/deals")
                        } else {
                            this.setState({ is_deal_visible: true });
                        }
                        let investor_id = this.state.investor_id;
                        if (d.deal_t_type == "Private") {
                            if (
                                investor_id &&
                                d.invitations.length > 0 &&
                                d.invitations.includes(investor_id)
                            ) {
                            } else {
                                window.location.assign("/deals");
                                return;
                            }
                        }
                        let logourl =
                            Apis.IMAGEURL + "deal/logo/" + d.deal_id + "/" + d.logo;

                        let pdffile = `${process.env.REACT_APP_BASE_URL}api/uploads/deal/pitch/${d.deal_id}/${d.pitch_file}`;
                        let pitchImg =
                            Apis.IMAGEURL +
                            "deal/pitch_images/" +
                            d.deal_id +
                            "/" +
                            d.pitch_files;
                        let percetage_raised = parseFloat(
                            (d.total_invested_amount / d.deal_fund_requested) * 100 +
                            parseInt(d.raiegap)
                        ).toFixed(0);
                        let deal_premium_start_date = moment(d.deal_start_dt_prem);
                        let deal_regular_start_date = moment(d.deal_st_date);
                        let deal_premium_end_date = moment(d.deal_end_dt_prem);
                        let deal_regular_end_date = moment(d.deal_deal_end_date);
                        this.setState({ deal_regular_end_date: deal_regular_end_date });
                        let button_show_status = false;

                        // console.log('this.state.check_membership_type',this.state.check_membership_type);
                        // console.log('deal_regular_start_date',deal_regular_start_date);
                        // console.log('deal_regular_end_date',deal_regular_end_date);
                        // console.log('current_date',current_date);
                        // deal changes
                        let differece = "";
                        let dealEndDate = "";
                        let currentDate = "";
                        this.setState({ coming_soon_days: "" });
                        if (this.state.check_membership_type == "premium") {
                            dealEndDate = moment(d.deal_end_dt_prem).format("YYYY-MM-DD");
                            currentDate = moment().format("YYYY-MM-DD");
                            let days = this.getDifferenceInDays(currentDate, dealEndDate);
                            differece = days;
                            if (
                                moment(current_date).format("YYYY-MM-DD") ==
                                moment(deal_premium_start_date).format("YYYY-MM-DD")
                            ) {
                                button_show_status = true;
                            } else if (
                                moment(current_date).format("YYYY-MM-DD") >
                                deal_premium_start_date.format("YYYY-MM-DD") &&
                                moment(current_date).format("YYYY-MM-DD") <
                                moment(deal_premium_end_date).format("YYYY-MM-DD")
                            ) {
                                button_show_status = true;
                            } else if (
                                moment(current_date).format("YYYY-MM-DD") ==
                                moment(deal_premium_end_date).format("YYYY-MM-DD")
                            ) {
                                button_show_status = true;
                            } else {
                                button_show_status = false;
                            }
                            //for deal start date
                            if (
                                moment(current_date).format("YYYY-MM-DD") <=
                                moment(deal_premium_start_date).format("YYYY-MM-DD")
                            ) {
                                this.setState({
                                    coming_soon_days: this.getDifferenceInDays(
                                        moment(current_date).format("YYYY-MM-DD"),
                                        moment(deal_premium_start_date).format("YYYY-MM-DD")
                                    ),
                                });
                            }
                        } else if (
                            this.state.check_membership_type == "regular" ||
                            this.state.check_membership_type == ""
                        ) {
                            dealEndDate = moment(d.deal_end_date).format("YYYY-MM-DD");
                            currentDate = moment().format("YYYY-MM-DD");
                            let days = this.getDifferenceInDays(currentDate, dealEndDate);
                            differece = days;
                            if (
                                moment(current_date).format("YYYY-MM-DD") ==
                                moment(deal_regular_start_date).format("YYYY-MM-DD")
                            ) {
                                button_show_status = true;
                            } else if (
                                moment(current_date).format("YYYY-MM-DD") >
                                deal_regular_start_date.format("YYYY-MM-DD") &&
                                moment(current_date).format("YYYY-MM-DD") <
                                moment(deal_regular_end_date).format("YYYY-MM-DD")
                            ) {
                                button_show_status = true;
                            } else if (
                                moment(current_date).format("YYYY-MM-DD") ==
                                moment(deal_regular_end_date).format("YYYY-MM-DD")
                            ) {
                                button_show_status = true;
                            } else {
                                button_show_status = false;
                            }
                            //for deal start date
                            if (
                                moment(current_date).format("YYYY-MM-DD") <=
                                moment(deal_regular_start_date).format("YYYY-MM-DD")
                            ) {
                                this.setState({
                                    coming_soon_days: this.getDifferenceInDays(
                                        moment(current_date).format("YYYY-MM-DD"),
                                        moment(deal_regular_start_date).format("YYYY-MM-DD")
                                    ),
                                });
                            }
                        }
                        // console.log('button_show_status',this.state.button_show_status);
                        this.setState(
                            {
                                deal_name: d.name,
                                deal_description: d.Muliples_of,
                                // isBlank:d.deal_status == "Closed" ? window.location.href = "/" : "/",
                                isPrivate: d.deal_t_type == "Private" ? true : false,
                                isFunded: d.deal_status == "Closed" ? true : false,
                                tags: d.deal_category ? JSON.parse(d.deal_category) : [],
                                logo: logourl,
                                youtube_url: d.youtubelink,
                                dealenddays: differece > 0 ? differece : 0,
                                minamount: Number(d.Min_inv_amt),
                                captable_threshold_amount: parseInt(
                                    parseFloat(d.captable_threshold_amount).toFixed(2),
                                    10
                                ),
                                maxamount: d.Max_inv_amt,
                                captable_multiple_amount: parseInt(
                                    parseFloat(d.captable_multiple_amount).toFixed(2),
                                    10
                                ),
                                amount: "", //d.Min_inv_amt
                                commaAmount: "", //d.Min_inv_amt
                                pdffile: pdffile,
                                pitch_files: pitchImg,
                                percentage_raised: percetage_raised,
                                button_show_status: button_show_status,
                                show_data: "block",
                                multiples_of: d.multiples_of,
                                deal_service: d.deal_service,
                            },
                            () => this.calculategst()
                        );
                    }
                }
            } else {
                message.error(result.message);
                this.setState({
                    loading: false,
                });
            }
        });
    };

    getDifferenceInDays = (date1, date2) => {
        let diff = Math.floor((Date.parse(date2) - Date.parse(date1)) / 86400000);
        let final = 0;
        if (diff < 0) {
            final = 0;
            this.setState({
                deal_regular_end_date_status: 1,
            });
        } else {
            final = diff;
            this.setState({
                deal_regular_end_date_status: 0,
            });
        }
        return final;
    };

    showalertmessage = () => {
        // message.warning('Please complete your KYC process or bank details to access this deal.');
    };

    showModal1 = () => {
        if (this.state.kycstatus == "admin_rejected") {
            message.warning(
                "Your KYC is Rejected, Please Contact to contact@Growth91<sup>TM</sup>.com"
            );
            return;
        }

        this.setState(
            {
                selectInvestorModal: false,
                investmentmodal: true,
            },
            () => {
                this.calculategst();
            }
        );
    };

    // post api hit on express
    getpostData = () => {
        const formData = new FormData();
        formData.append("deal_id", this.state.deal_id);
        formData.append("investor_id", this.state.investor_id);
        axios
            .post(
                `${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/save_investor_interest_deal`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                this.setState({
                    interested_id: response.data.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleOk1 = () => {
        this.setState({
            investmentmodal: false,
        });
    };

    handleCancel1 = () => {
        this.setState({
            investmentmodal: false,
        });
    };
    handleCancelgstmodal = () => {
        this.setState({
            gstmodal: false,
        });
    };
    founder_updateprofiledetails = () => {
        if (this.state.gstBusinessName == "") {
            message.warning("Gst business nameis required");
            return false;
        } else if (this.state.gstNo == "") {
            message.warning("gst no is required");
            return false;
        }
        this.setState({ formloader: true });

        let formData = new FormData(); //formdata object
        console.log(this.state.gstBusinessName, this.state.gstNo);

        formData.append("gstBusinessName", this.state.gstBusinessName); //append the values with key, value pair
        formData.append("gstNo", this.state.gstNo);
        formData.append("first_name", this.state.member_detail.firstname); //append the values with key, value pair
        formData.append("middle_name", this.state.member_detail.middlename);
        formData.append("last_name", this.state.member_detail.lastname);
        formData.append("mobile", this.state.member_detail.contactno);
        formData.append(
            "membership_type",
            this.state.member_detail.membership_type
        );
        formData.append("user_profile_picture", this.state.member_detail.profile);
        formData.append("investor_id", this.state.member_detail.investor_id);
        formData.append("investor_id", localStorage.getItem("investor_id"));
        console.log(formData.getAll);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        if (localStorage.getItem("investor_id")) {
            Bridge.investor.updateprofiledetails(formData, config).then((result) => {
                if (result.status == 1) {
                    message.success(result.message);
                    this.setState(
                        {
                            formloader: false,
                            gstmodal: false,
                        },
                        () => this.check_for_membership_type()
                    );
                } else {
                    message.error(result.message);
                    this.setState({
                        formloader: false,
                    });
                }
            });
        }
    };

    showModal2 = () => {
        this.setState({
            confirmmodalstatus: true,
        });
    };

    handleOk2 = () => {
        this.setState({
            confirmmodalstatus: false,
        });
    };

    handleCancel2 = () => {
        this.setState({
            confirmmodalstatus: false,
        });
    };
    onChangeConvenience = (e) => {
        this.setState({
            [e.target.name]: e.target.checked,
            Convenience: e.target.checked,
        });
    };
    onChangeCheckbox = (e) => {
        console.log(this.state.member_detail.gstBusinessName);
        console.log(this.state.member_detail.gstNo);

        this.setState({
            [e.target.name]: e.target.checked,
            agreeCheck: e.target.checked,
        });
        // logic for update gst no and gst bussiness name
        // if (e.target.name === "agree") {
        //   if(e.target.checked == true){

        //   console.log(e.target.name);
        //   if (
        //     this.state.member_detail.gstBusinessName == null ||
        //     this.state.member_detail.gstNo == null
        //   ) {
        //     this.setState({
        //       gstmodal: true,
        //       formloader: false,
        //     });
        //     // return
        //   }
        // }
        // }

        if (e.target.name == "deduct") {
            if (e.target.checked == true) {


                let processingfees = parseFloat(
                    (this.state.amount / 100) * parseFloat(this.state.percentage)
                );

                // Adjust processingFees based on the fractional part
                processingfees = Math.floor(processingfees) +
                    (processingfees % 1 > 0.5 ? 1 : 0);



                let tdsamount = parseFloat(processingfees / 100) * 10;
                let minusamt = parseFloat(processingfees - tdsamount);

                this.setState({
                    tdsstatus: true,
                    processingfees: minusamt,
                    tdsdeductedamount: tdsamount,
                    totalamount:
                        Number(this.state.amountplusgst) +
                        Number(this.state.gstValue) +
                        Number(minusamt),
                });
            } else {
                console.log(e.target.name);

                let processingfees = parseFloat(
                    (this.state.amount / 100) * parseFloat(this.state.percentage)
                );
                this.setState({
                    tdsstatus: false,
                    processingfees: processingfees,
                    tdsdeductedamount: 0,
                    totalamount:
                        Number(this.state.amountplusgst) +
                        Number(this.state.gstValue) +
                        Number(processingfees),
                });
            }
        }
    };

    // investing your money
    invest = () => {
        let investor_id = this.state.investor_id;
        let deal_id = this.state.deal_id;
        let Investment_amt = this.state.totalamount;
        let deductstatus = this.state.deduct == true ? "1" : "0";
        let agreestatus = this.state.agree == true ? "1" : "0";
        let payment_ref = this.state.order_token;
        let tdsstatus = this.state.tdsstatus == true ? "1" : "0";
        let processingfees = this.state.processingfees;
        let gst = this.state.gst;
        let legalfees = this.state.legalfee;
        let order_id = "order-01";
        let walletamt = this.state.walletDeductionMoney
            ? this.state.walletDeductionMoney
            : 0;

        let url = `${process.env.REACT_APP_BASE_URL}cashfree/checkout.php?investor_id=${investor_id}&deal_id=${deal_id}&deductstatus=${deductstatus}&agreestatus=${agreestatus}&payment_ref=${payment_ref}&tdsstatus=${tdsstatus}&processingfees=${processingfees}&gst=${gst}&legalfees=${legalfees}&Investment_amt=${Investment_amt}&order_id=${order_id}&wallet=${walletamt}`;
        // console.log('url',url);
        window.location.assign(url);
    };

    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    calculategst = () => {
        let legalfee = parseFloat(
            (this.state.amount / 100) * parseFloat(this.state.percentage)
        ).toFixed(0);
        let minusamt = 0;
        let gst = this.state.gst;
        let amt = parseFloat(this.state.amount);
        let walletDeductionMoney = 0;

        let igstvalue = Math.ceil(((legalfee) * 9) / 100) * 2;

        let gstValue = ((legalfee - walletDeductionMoney) * gst) / 100;
        // ceil gst value
        gstValue = Math.ceil(gstValue);
        // console.log(gst);
        // console.log(legalfee);
        // console.log(gstValue);
        let tdsamount = 0;
        if (this.state.tdsstatus === true) {
            tdsamount = parseFloat(legalfee / 100) * 10;
            minusamt = parseFloat(legalfee - tdsamount);
        }

        console.log(legalfee);
        console.log(tdsamount);
        console.log(minusamt);

        this.setState({
            gst: gst,
            legalfee: this.state.amount ? legalfee : 0,
            amountplusgst: this.state.amount ? amt.toFixed(0) : 0,
            processingfees: this.state.amount
                ? legalfee - Number(tdsamount)
                : 0,
            totalamount: this.state.amount
                ? (amt + parseFloat(legalfee - Number(tdsamount))).toFixed(
                    0
                ) -
                walletDeductionMoney +
                igstvalue
                : 0,
            walletDeductionMoney: walletDeductionMoney,
            gstValue: Number(gstValue).toFixed(0),
            igstvalue: igstvalue,
        });
        return gst;
    };
    documentPay = () => {
        if (!this.state.investor_id) {
            message.warning("Please login first to invest.", 5);
            return;
        }
        let documents = this.state.documents;
        let paying_for_documents = [];
        let totalamt = 0;
        for (let item of documents) {
            if (item.selected == true) {
                totalamt +=
                    this.state.check_membership_type == "premium"
                        ? Number(item.premium_price)
                        : Number(item.regular_price);
                paying_for_documents = [...paying_for_documents, item.documentid];
            }
        }
        let order_id = "order-01";
        let user_id = this.state.investor_id;
        let amount = totalamt;
        let docs = paying_for_documents.join("-").toString();
        let deal_id = this.state.deal_id;
        let url = `${process.env.REACT_APP_BASE_URL}cashfree/buy_documents/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&docs=${docs}&deal_id=${deal_id}`;

        window.location.href = url;
    };
    get_document_purchased_list = () => {
        if (this.state.investor_id) {
            let params = {
                investor_id: this.state.investor_id,
                deal_id: this.state.deal_id,
            };
            Bridge.deal.get_document_purchased_list(params).then((result) => {
                if (result.status == 1) {
                    let arr = [];
                    let documents = this.state.documents;
                    for (let item of documents) {
                        let status = false;
                        item.user_paid = false;
                        for (let item2 of result.data) {
                            if (item2.document_id == item.documentid || item.paid == "Free") {
                                item.user_paid = true;
                            }
                        }
                        arr = [...arr, item];
                    }
                    this.setState({ documents: arr });
                }
            });
        }
    };
    check_for_error = () => {
        let error = "";
        let multiple_of =
            parseFloat(this.state.amount) / parseFloat(this.state.multiples_of);
        if (Number(this.state.amount) < Number(this.state.minamount)) {
            error = `Minimum investment amount is Rs. ${this.state.minamount}`;
            this.setState({ amount_error: error, amount_error_status: true });
        } else if (Number(this.state.amount) > Number(this.state.maxamount)) {
            error = `Maximum investment amount is Rs. ${this.state.maxamount}`;
            this.setState({ amount_error: error, amount_error_status: true });
        } else if (
            Number(this.state.amount) <
            Number(this.state.captable_threshold_amount) &&
            Number(this.state.amount) % Number(this.state.multiples_of) != 0
        ) {
            const roundedLowerAmount =
                Math.floor(
                    Number(this.state.amount) / Number(this.state.multiples_of)
                ) * Number(this.state.multiples_of);
            const roundedHigherAmount =
                Math.ceil(Number(this.state.amount) / Number(this.state.multiples_of)) *
                Number(this.state.multiples_of);

            error = `Please enter an amount in multiples of ${this.state.multiples_of}. You may choose Rs ${roundedLowerAmount}
      or Rs ${roundedHigherAmount}.`;
            // If you would like to enter the Captable, commit an amount of Rs. ${this.state.captable_threshold_amount} or more.`;

            this.setState({ amount_error: error, amount_error_status: true });
        } else if (
            Number(this.state.amount) >
            Number(this.state.captable_threshold_amount) &&
            Number(this.state.amount) % Number(this.state.captable_multiple_amount) !=
            0
        ) {
            const roundedLowerAmount =
                Math.floor(
                    Number(this.state.amount) /
                    Number(this.state.captable_multiple_amount)
                ) * Number(this.state.captable_multiple_amount);
            const roundedHigherAmount =
                Math.ceil(
                    Number(this.state.amount) /
                    Number(this.state.captable_multiple_amount)
                ) * Number(this.state.captable_multiple_amount);

            error = `Please enter an amount in multiples of ${this.state.captable_multiple_amount}. You may choose Rs ${roundedLowerAmount}
      or Rs ${roundedHigherAmount}.`;
            // If you would like to enter the Captable, commit an amount of Rs. ${this.state.captable_threshold_amount} or more.`;

            this.setState({ amount_error: error, amount_error_status: true });
        } else {
            this.setState({ amount_error: "", amount_error_status: false });
        }
    };
    get_invest_amt = () => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}api/investors/InvestorCommitment/get_investor_investment_for_deal`,
                {
                    params: {
                        deal_id: this.state.deal_id,
                        investor_id: this.state.investor_id,
                    },
                }
            )
            .then((response) => {
                // console.log("invest_amt : ", response.data.data[0].totalamount);
                this.setState({ invest_amt: response.data.data[0].totalamount });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    increase_commit = () => {
        const {
            amount,
            captable_threshold_amount,
            multiples_of,
            maxamount,
            captable_multiple_amount,
            minamount,
        } = this.state;

        let newAmount = Number(amount);
        let changeAmount;

        if (
            newAmount < captable_threshold_amount &&
            newAmount % multiples_of != 0
        ) {
            const roundedHigherAmount =
                Math.ceil(newAmount / Number(multiples_of)) * Number(multiples_of);
            newAmount = roundedHigherAmount;
            changeAmount = 0;
        } else if (
            newAmount > captable_threshold_amount &&
            newAmount % captable_multiple_amount != 0
        ) {
            const roundedHigherAmount =
                Math.ceil(newAmount / Number(captable_multiple_amount)) *
                Number(captable_multiple_amount);
            newAmount = roundedHigherAmount;
            changeAmount = 0;
        } else if (newAmount < Number(captable_threshold_amount)) {
            changeAmount = Number(multiples_of);
        } else {
            changeAmount = Number(captable_multiple_amount);
        }

        newAmount += changeAmount;

        if (newAmount > maxamount) {
            newAmount = maxamount;
        } else if (newAmount < minamount) {
            newAmount = Number(minamount);
        }

        this.setState(
            {
                amount: newAmount,
                commaAmount: this.formatNumberWithCommas(newAmount),
            },
            () => {
                this.calculategst();
                this.check_for_error();
            }
        );
        console.log(newAmount);
    };

    decrease_commit = () => {
        const {
            amount,
            captable_threshold_amount,
            multiples_of,
            minamount,
            captable_multiple_amount,
        } = this.state;

        let newAmount = Number(amount);
        let changeAmount;

        if (
            newAmount == captable_threshold_amount &&
            newAmount % multiples_of != 0
        ) {
            const roundedHigherAmount =
                Math.ceil(newAmount / Number(multiples_of)) * Number(multiples_of);
            newAmount = roundedHigherAmount;
            changeAmount = 0;
        } else if (
            newAmount < captable_threshold_amount &&
            newAmount % multiples_of != 0
        ) {
            const roundedLowerAmount =
                Math.floor(newAmount / Number(multiples_of)) * Number(multiples_of);
            newAmount = roundedLowerAmount;
            changeAmount = 0;
        } else if (
            newAmount > captable_threshold_amount &&
            newAmount % captable_multiple_amount != 0
        ) {
            const roundedLowerAmount =
                Math.floor(newAmount / Number(captable_multiple_amount)) *
                Number(captable_multiple_amount);
            newAmount = roundedLowerAmount;
            changeAmount = 0;
        } else if (newAmount <= Number(captable_threshold_amount)) {
            changeAmount = Number(multiples_of);
        } else {
            changeAmount = Number(captable_multiple_amount);
        }

        newAmount -= changeAmount;

        if (newAmount < minamount) {
            newAmount = minamount;
        }

        this.setState(
            {
                amount: newAmount,
                commaAmount: this.formatNumberWithCommas(newAmount),
            },
            () => {
                this.calculategst();
                this.check_for_error();
            }
        );
    };

    handleCommitAmount = (value) => {
        this.setState(
            {
                amount: value.replace(/,/g, ""),
                commaAmount: this.formatNumberWithCommas(value),
            },
            () => {
                this.calculategst();
                this.check_for_error();
            }
        );
    };

    formatNumberWithCommas = (number) => {
        return number.toLocaleString("en-IN");
    };

    getSliderSettings() {
        return {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
    }

    handleClickImage = (image) => {
        this.setState({
            current: image,
        });
    };

    handleCloseModal = () => {
        this.setState({
            current: "",
        });
    };

    render() {
        const dataSource2 =
            this.state.group_list &&
            this.state.group_list
                // .filter(
                //     (item) => {
                //         console.log(item);
                //         return item.userID != (this.props.adminview ? this.props.investor_id : localStorage.getItem("Parent_investor_id"))
                //     }
                // )
                .map((item, index) => {
                    return {
                        key: item.investor_id,
                        investorName: item.first_name + " " + item.last_name,
                        groupName: item.groupName,
                        action: item,
                    };
                });


                
                  const columns2 = [
                    // {
                    //     title: "Investor Name",
                    //     dataIndex: "name",
                    //     key: "name",  
                    // },
                    {
                        title: "Investor Name",
                        dataIndex: "investorName",
                        key: "investorName",
                      },
                    {
                      title: "Group Name",
                      dataIndex: "groupName",
                      key: "groupName",
                    }
                  ];

        const myStyle = {
            color: "white",
            fontSize: "17px",
            padding: "50px",
            // justifyItem:"center"1
        };
        const genExtra = () => (
            <>
                {/* <PlusOutlined
        onClick={event => {
          If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      /> */}
            </>
        );
        const settings = this.getSliderSettings();
        const { images, current } = this.state;

        return (
            <>
                {this.state.is_deal_visible == true ? (
                    <div style={{ display: this.state.show_data }}>
                        <NewWebHeader newabout={"newabout"} />
                        <section
                            className="deals-details-page"
                            style={{ marginBottom: "-50px" }}
                        >
                            <div className="container main-section">
                                <div className="row">
                                    <div className="col-lg-5 col-md-5 col-sm-5">
                                        <Spin spinning={this.state.loading}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    {/* Image is static */}
                                                    <img
                                                        src="./assets/images/deals-details/uknowva/Uknowva-logo.jpeg"
                                                        alt=""
                                                        className="img-fluid"
                                                        style={{
                                                            marginRight: "20px",
                                                            width: "50%",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                    <h5 className="ml-5 mt-4">uKnowva</h5>
                                                    {/* <h5>{this.state.logo}</h5> */}
                                                </div>
                                                {this.state.isPrivate == true && (
                                                    <div
                                                        className="private-tag"
                                                        style={{
                                                            height: 38,
                                                        }}
                                                    >
                                                        <span style={{ fontSize: 12 }}>Private</span>{" "}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="d-flex tags">
                                                {/* {this.state.tags.length > 0 &&
                          this.state.tags.map((tag, index) => (
                            <div
                              className="hero-tag"
                              key={index}
                              style={{
                                background: "rgb(41 23 111)",
                                color: "#fff",
                              }}
                            >
                              {tag}
                            </div>
                          ))} */}


                                                <div
                                                    className="hero-tag"

                                                    style={{
                                                        background: "rgb(41 23 111)",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    HR Tech Industry
                                                </div>
                                            </div>
                                            <p style={{ textAlign: "justify" }}>
                                                uKnowva is an AI-enabled HR Tech platform tailored for mid-sized companies (200–2,000 employees), offering a full-stack solution for payroll, recruitment, onboarding, performance management, and employee engagement. Combining Artificial Intelligence (AI) and Emotional Intelligence (EI),  it enhances productivity and well-being with features like stress detection, sentiment analysis, and attrition prediction. With 300,000+ active users, 120+ paying customers, and a 93% retention rate, uKnowva demonstrates strong product-market fit. Financially robust, the company has achieved positive PAT, repaid its venture debt, and projects revenue growth from INR 9.2 Cr to INR 74 Cr in five years. Backed by an experienced leadership team, uKnowva is recognized for its customizability, affordability, and ease of use, making it a scalable and globally competitive HR solution.
                                            </p>{" "}
                                            <div className=" percentage-container">
                                                <div className="percentage-values">
                                                    {this.state.coming_soon_days ? (
                                                        <>
                                                            <div>
                                                                <h3>{this.state.percentage_raised}%</h3>
                                                                <span>RAISED</span>
                                                            </div>
                                                            <div style={{ textAlign: "right" }}>
                                                                <h3>{this.state.coming_soon_days} Days</h3>
                                                                <span>CAMPAIGN START IN</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div>
                                                                <h3>{this.state.percentage_raised}%</h3>
                                                                <span>RAISED</span>
                                                            </div>
                                                            <div style={{ textAlign: "right" }}>
                                                                <h3>{this.state.dealenddays} Days</h3>
                                                                <span>CAMPAIGN ENDS IN</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <Progress
                                                    percent={this.state.percentage_raised}
                                                    strokeColor={{
                                                        "0%": "rgb(255 156 26)",
                                                        "100%": "rgb(255 156 26)",
                                                    }}
                                                    showInfo={false}
                                                />
                                            </div>
                                            {!this.state.investor_id ? (
                                                <div className="button-group text-center">
                                                    <a className="prime-bg" href="/Login">
                                                        Login
                                                    </a>
                                                    {/* <button className='share-button'>
                        <i className='bx bxs-share'></i>
                      </button> */}
                                                </div>
                                            ) : (
                                                <>
                                                    {this.state.button_show_status == true ? (
                                                        <>
                                                            <div className="button-group">
                                                                {this.state.isFunded == true ? (
                                                                    <a
                                                                        href="#"
                                                                        className="black-button prime-bg text-center"
                                                                    >
                                                                        Deal is closed
                                                                    </a>
                                                                ) : this.state.user_type != "founder" &&
                                                                    this.state.invest_amt !== null 
                                                                    && dataSource2.length <= 1 ? (
                                                                    <div className="button-group">
                                                                        <p>{`You have committed Rs. ${this.state.invest_amt} to this deal so far. (Including platform fees)`}</p>
                                                                        <a
                                                                            href="#!"
                                                                            style={{ padding: "13px 0" }}
                                                                            onClick={() => {
                                                                                this.setState({selectedInvestorId: dataSource2[0].key});
                                                                                this.getpostData();
                                                                                this.showModal1();
                                                                            }}
                                                                            className="black-button prime-bg text-center"
                                                                            id="btn-invest"
                                                                        >
                                                                            Add more
                                                                        </a>
                                                                    </div>
                                                                ) : this.state.isPrivate == true &&
                                                                    this.state.user_type != "founder" ? (
                                                                    <a
                                                                        style={{ padding: "13px 0" }}
                                                                        href="#"
                                                                        onClick={() => {
                                                                            this.getpostData();
                                                                            this.showModal1();
                                                                        }}
                                                                        className="black-button prime-bg text-center"
                                                                    >
                                                                        I Agree to Terms and ss Your Interest
                                                                    </a>
                                                                ) : this.state.user_type == "founder" ? (
                                                                    <div>
                                                                        {this.state.user_type == "founder" &&
                                                                            this.state.founder_is_investor == "1" ? (
                                                                            <a
                                                                                href="#"
                                                                                style={{ padding: "15px 0" }}
                                                                                className="black-button prime-bg text-center"
                                                                                onClick={() => {
                                                                                    this.getpostData();
                                                                                    if(dataSource2.length > 1){
                                                                                        this.setState({selectInvestorModal: true});
                                                                                    }
                                                                                    else{
                                                                                        this.setState({selectedInvestorId: dataSource2[0].key});
                                                                                        this.showModal1();
                                                                                    }
                                                                                }}
                                                                            >
                                                                                Express Your Interest
                                                                            </a>
                                                                            
                                                                        ) : (
                                                                            <a
                                                                                href="/founder-as-investor"
                                                                                className="black-button prime-bg text-center"
                                                                            >
                                                                                Apply as investor
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        {this.state.user_type == "investor" &&
                                                                            this.state.invest_amt === null ? (
                                                                            <a
                                                                                href="#"
                                                                                className="black-button prime-bg text-center"
                                                                                onClick={() => {
                                                                                    this.getpostData();
                                                                                    if(dataSource2.length > 1){
                                                                                        this.setState({selectInvestorModal: true});
                                                                                    }
                                                                                    else{
                                                                                        this.setState({selectedInvestorId: dataSource2[0].key});
                                                                                        this.showModal1();
                                                                                    }
                                                                                }}
                                                                                style={{ padding: "13px 0" }}
                                                                            >
                                                                                Express Your Interest
                                                                            </a>
                                                                        ) : null}
                                                                        {this.state.user_type == "investor" &&
                                                                            this.state.invest_amt != null && 
                                                                            dataSource2.length > 1
                                                                            ? (
                                                                            <a
                                                                                href="#"
                                                                                className="black-button prime-bg text-center"
                                                                                onClick={() => {
                                                                                    this.getpostData();
                                                                                    this.setState({selectInvestorModal: true});
                                                                                }}
                                                                                style={{ padding: "13px 0" }}
                                                                            >
                                                                                Express Your Interest
                                                                            </a>
                                                                        ) : null}
                                                                    </div>
                                                                )}
                                                                {/* <button className='share-button'>
                              <i className='bx bxs-share'></i>
                            </button> */}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        // <div className='button-group'>
                                                        //   <a href="#" className="black-button prime-bg" style={{cursor:'default'}} >Coming soon..</a>
                                                        // </div>
                                                        <>
                                                            {this.state.deal_regular_end_date_status == 0 ? (
                                                                <div className="button-group">
                                                                    <a
                                                                        href="#"
                                                                        className="black-button prime-bg"
                                                                        style={{ cursor: "default" }}
                                                                    >
                                                                        Coming soon..
                                                                    </a>
                                                                </div>
                                                            ) : (
                                                                <div className="button-group">
                                                                    <a
                                                                        href="#"
                                                                        className="black-button prime-bg"
                                                                        style={{ cursor: "default" }}
                                                                    >
                                                                        Deal is closed
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </Spin>
                                    </div>
                                    <Modal
                                        title={`Select Investor`}
                                        okText={"Select"}
                                        visible={this.state.selectInvestorModal}
                                        onCancel={() => {this.setState({selectInvestorModal: false})} }
                                        
                                        cancelText="Cancel"
                                        width={600}
                                        footer={false}
                                    >
                                            <Table
                                            rowSelection={{
                                            type: "radio",
                                            onSelect: (x) => {
                                                this.setState({selectedInvestorId: x.key})
                                            }
                                            // selectedRowKeys: this.state.selectedRowKeys,
                                            // onChange: (x,y) => {
                                            //     console.log(x);
                                            //     console.log(y);
                                            // }
                                        }}

                                            className="table-2"
                                            dataSource={dataSource2}
                                            columns={columns2}
                                            bordered
                                            loading={this.state.loading}
                                        />
                                        
                                            <button
                                                type="button"
                                                className="login-button prime-bg d-md-block mx-auto w-50 mt-1"
                                                onClick={() => {
                                                    if(this.state.selectedInvestorId == null){
                                                        notification.warning({
                                                            message: `Please Select an Investor`,
                                                            placement: "top",
                                                            duration: 5,
                                                            });
                                                        
                                                    }else{
                                                        this.showModal1();
                                                    }
                                                }}
                                            >
                                                Invest as Selected User
                                            </button>
                                            
                                            
                                        
                                    </Modal>
                                    <Modal
                                        title={`Invest in ${this.state.deal_name}`}
                                        visible={this.state.investmentmodal}
                                        onOk={this.handleOk1}
                                        onCancel={this.handleCancel1}
                                        width={600}
                                        footer={false}
                                    >
                                        <div className="row modal-body">
                                            <div className="login mt-3">
                                                <label>
                                                    <b>
                                                        Amount: <br />
                                                        Minimum investment Rs.{" "}
                                                        {this.formatNumberWithCommas(
                                                            this.state.minamount
                                                        )}{" "}
                                                        <br />
                                                        Cap Table entry is Rs.
                                                        {this.formatNumberWithCommas(
                                                            this.state.captable_threshold_amount
                                                        )}
                                                    </b>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="amount"
                                                    className="form-input-field mt-4"
                                                    autofocus={true}
                                                    placeholder="amount"
                                                    style={{
                                                        border:
                                                            this.state.amount_error_status == true &&
                                                                this.state.amount
                                                                ? "1px solid red"
                                                                : "1px solid transparent",
                                                    }}
                                                    id="selected-field"
                                                    value={this.state.commaAmount}
                                                    onChange={(e) => {
                                                        this.handleCommitAmount(e.target.value);
                                                    }}
                                                />
                                                <div className="d-flex justify-content-between mb-3">
                                                    <button
                                                        className="commit-plus"
                                                        onClick={this.decrease_commit}
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        className="commit-minus"
                                                        onClick={this.increase_commit}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                {this.state.amount_error_status == true && (
                                                    <p
                                                        className="text-danger pb-0"
                                                        style={{ position: "relative", top: -19 }}
                                                    >
                                                        {this.state.amount_error}
                                                    </p>
                                                )}
                                            </div>

                                            <div class="form-group form-check d-flex">
                                                <Checkbox
                                                    checked={this.state.checkWallet}
                                                    onChange={(e) => {
                                                        this.setState(
                                                            { checkWallet: e.target.checked },
                                                            () => this.calculategst()
                                                        );
                                                    }}
                                                >
                                                    {" "}
                                                </Checkbox>
                                                <label className="form-check-label">
                                                    Use Your ₹ {this.state.walletMoney} Growth91
                                                    <sup style={{ fontSize: "0.6rem" }}>
                                                        TM
                                                    </sup> Money{" "}
                                                </label>
                                            </div>
                                            <div className=" d-flex justify-content-center modal-table">
                                                <table
                                                    className="col-12 m-5 investment-charge-table"
                                                    cellPadding={4}
                                                >
                                                    <tr>
                                                        <th>
                                                            <strong>Particulars</strong>
                                                        </th>
                                                        <th>
                                                            <strong>Amount</strong>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td>Investment Amount</td>
                                                        <td
                                                            className="text-end"
                                                            style={{ textAlign: "right!important" }}
                                                        >
                                                            ₹{" "}
                                                            {this.state.amountplusgst
                                                                ? this.formatNumberWithCommas(
                                                                    Number(this.state.amountplusgst)
                                                                )
                                                                : "0"}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            Convenience Fees
                                                            <br />
                                                            <span>{this.state.label}</span>
                                                        </td>
                                                        <td
                                                            className="text-end"
                                                            style={{ textAlign: "right!important" }}
                                                        >
                                                            ₹{" "}
                                                            {this.formatNumberWithCommas(
                                                                Number(this.state.processingfees)
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Wallet Money</td>
                                                        <td
                                                            className="text-end"
                                                            style={{ textAlign: "right!important" }}
                                                        >
                                                            - ₹ {this.state.walletDeductionMoney}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>GST</td>
                                                        <td
                                                            className="text-end"
                                                            style={{ textAlign: "right!important" }}
                                                        >
                                                            ₹{" "}
                                                            {this.formatNumberWithCommas(
                                                                Number(this.state.igstvalue).toFixed(0)
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td className="text-end">
                                                            ₹{" "}
                                                            {this.formatNumberWithCommas(
                                                                Number(
                                                                    parseFloat(this.state.totalamount).toFixed(0)
                                                                )
                                                            )}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            {this.state.invest_amt !== null && this.state.selectedInvestorId == localStorage.getItem("Parent_investor_id")? (
                                                <div className="">
                                                    <Alert
                                                        message={`You have committed Rs. ${this.state.invest_amt} to this deal so far. (Including platform fees)`}
                                                        type="info"
                                                    />
                                                </div>
                                            ) : null}
                                            <div className="m-3">
                                                <label className="container-check">
                                                    I Agree to Terms and Conditions and have read the
                                                    Privacy Policy. And, I understand that I will be
                                                    required to pay the full amount committed after the
                                                    deal is closed.
                                                    <input
                                                        type="checkbox"
                                                        name="agree"
                                                        onChange={this.onChangeCheckbox}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>

                                                {/* <label className="container-check">
                          I will deduct TDS on service charges and deposit to
                          Income tax on time
                          <input
                            type="checkbox"
                            name="deduct"
                            onChange={this.onChangeCheckbox}
                          />
                          <span className="checkmark"></span>
                        </label> */}

                                                <label
                                                    className="container-check"
                                                    style={{ fontSize: "10px" }}
                                                >
                                                    Convenience Fee of 2% on the investment amount at the
                                                    time of investment and 2% on the sale proceeds at the
                                                    time of exit is applicable.
                                                </label>
                                            </div>

                                            <div className="col-12">
                                                {this.state.amount_error_status == true ? (
                                                    <button
                                                        type="button"
                                                        className="login-button text-center"
                                                        style={{
                                                            border: "1px solid #9a9a9a",
                                                            backgroundColor: "#9a9a9a",
                                                            cursor: "not-allowed",
                                                            padding: "0.9em 0 ",
                                                        }}
                                                    >
                                                        Express Your Interest
                                                    </button>
                                                ) : (
                                                    <InvestmentMembershipmodal
                                                        processingfees={this.state.processingfees}
                                                        deal_id={this.state.deal_id}
                                                        membership_type={this.state.check_membership_type}
                                                        invest={this.invest}
                                                        amount={this.state.amount}
                                                        agreecheck={this.state.agreeCheck}
                                                        totalamount={this.state.totalamount}
                                                        fee={this.state.legalfee}
                                                        minamount={this.state.minamount}
                                                        maxamount={this.state.maxamount}
                                                        agree={this.state.agree}
                                                        error_status={this.state.amount_error_status}
                                                        investor_id={this.state.selectedInvestorId}
                                                        deduct={this.state.deduct}
                                                        tdsstatus={this.state.tdsstatus}
                                                        gst={this.state.gst}
                                                        gstvalue={this.state.gstValue}
                                                        igst={this.state.igst}
                                                        igstvalue={this.state.igstvalue}
                                                        order_token={this.state.order_token}
                                                        legalfee={this.state.legalfee}
                                                        walletDeductionMoney={
                                                            this.state.walletDeductionMoney
                                                        }
                                                        user_id={this.state.investor_id}
                                                        escrow_account_ifsc={this.state.escrow_account_ifsc}
                                                        escrowact={this.state.escrowact}
                                                        interested_id={this.state.interested_id}
                                                        invest_amt={this.state.invest_amt}
                                                    />
                                                )}
                                                <button
                                                    type="button"
                                                    className="login-button text-center  btn-secondary"
                                                    style={{
                                                        border: "1px solid #f3f3f",
                                                        padding: "0.9em 0 ",
                                                        marginTop: "10px",
                                                    }}
                                                    value=""
                                                    onClick={(e) => {
                                                        this.handleCommitAmount(e.target.value);
                                                    }}
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal
                                        title={`Edit Gst`}
                                        okText={"Update"}
                                        visible={this.state.gstmodal}
                                        onOk={this.founder_updateprofiledetails}
                                        onCancel={this.handleCancelgstmodal}
                                        cancelText="Cancel"
                                        width={600}
                                        footer={false}
                                    >
                                        <Spin spinning={this.state.formloader}>
                                            <div className="form-group">
                                                <label>Gst Business Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Gst Business Name"
                                                    value={this.state.gstBusinessName}
                                                    onChange={(e) =>
                                                        this.setState({ gstBusinessName: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <br />

                                            <div className="form-group">
                                                <label>Gst NO</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="GST No"
                                                    value={this.state.gstNo}
                                                    onChange={(e) =>
                                                        this.setState({ gstNo: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                className="login-button prime-bg d-md-block mx-auto w-100 mt-1"
                                                onClick={() => this.founder_updateprofiledetails()}
                                            >
                                                Update
                                            </button>
                                        </Spin>
                                    </Modal>
                                    <Modal
                                        title="Deduct TDS"
                                        visible={this.state.confirmmodalstatus}
                                        onOk={this.handleOk2}
                                        onCancel={this.handleCancel2}
                                        okText="Update"
                                        cancelText="Cancel"
                                        width={700}
                                        footer={false}
                                    >
                                        <div className="row">
                                            <div style={{ width: "100%" }}>
                                                <p style={{ margin: "10px", maxWidth: "100%" }}>
                                                    TDS is applicable according to Section-194j of the
                                                    income Tex act, 1961.
                                                </p>
                                                <p style={{ margin: "10px", maxWidth: "100%" }}>
                                                    Rate: 10%
                                                </p>{" "}
                                                <br />
                                                <p style={{ margin: "10px", maxWidth: "100%" }}>
                                                    <b>Do you want to Deduct TDS?</b>
                                                </p>
                                            </div>

                                            <div className="col-11">
                                                <button
                                                    type="button"
                                                    className="login-button bg-primary mt-4 mx-4"
                                                    onClick={() => this.invest()}
                                                >
                                                    Yes
                                                </button>
                                                <input
                                                    type="button"
                                                    value="No Thanks"
                                                    onClick={() => this.invest()}
                                                    className="login-button mx-4 my-3"
                                                ></input>
                                            </div>
                                        </div>
                                    </Modal>
                                    {/* <div className="col-lg-7 deal-banner deals-video-banner liaplus ">
                                        <iframe width="" height="315"
                                            style={{
                                                boxShadow: "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                                                borderRadius: 3,
                                                // marginLeft: 65,
                                            }} src="https://www.youtube.com/embed/5TkGBxxAG4Y?si=83FF3G4dUKfH_vEy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>




                                    </div> */}
                                    <div className="col-lg-7 deal-banner deals-video-banner">
                                        <iframe
                                            style={{
                                                boxShadow: "0px 0px 2rem -0.5rem rgb(0 0 0 / 40%)",
                                                borderRadius: 3,
                                                // marginLeft: 65,
                                            }}
                                            width="100%"
                                            height="335"
                                            src="https://www.youtube.com/embed/5TkGBxxAG4Y?si=83FF3G4dUKfH_vEy"
                                            frameborder="10"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen
                                        ></iframe>
                                    </div>

                                    <div
                                        className="container home-decor-section mt-0"
                                        style={{ marginTop: "3px !important" }}
                                    >
                                        <h1
                                            className="text-center"
                                            style={{
                                                marginBottom: "20px",
                                                marginTop: "0px !important",
                                            }}
                                        >
                                            Market Overview
                                        </h1>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="single text-center h-lg market-boxes">
                                                    {/* <h2 style={{paddingBottom:"20px"}}>$1 Tn </h2> */}
                                                    <p
                                                        style={{
                                                            color: "white",
                                                            fontSize: "21px",
                                                            padding: "2px",
                                                            margin: "48px 0px",
                                                            opacity: "1",
                                                            lineHeight: "1.5",
                                                        }}
                                                    >
                                                        {/* <span
                              style={{
                                color: "white",
                                fontSize: "21px",
                                padding: "2px",
                                margin: "48px 0px",
                                opacity: "1",
                                lineHeight: "1.5",
                                fontWeight: "800",
                              }}
                            >
                              India's Higher Education Market:
                            </span>{" "} */}
                                                        The global HR Tech market, valued at $23 billion in 2023, is projected to reach $91.8 billion by 2032, growing at a CAGR of 10%. This expansion is fueled by the increasing adoption of AI-powered tools and cloud-based solutions that streamline payroll, recruitment, and workforce management. Emerging markets in Asia-Pacific, the Middle East, and Africa are driving growth as businesses in these regions prioritize digital transformation and scalable, cost-effective HR systems.                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="single text-center h-lg market-boxes">
                                                    {/* <h2 style={{paddingBottom:"20px"}}>$200 Bn</h2> */}
                                                    <p
                                                        style={{
                                                            color: "white",
                                                            fontSize: "21px",
                                                            padding: "2px",
                                                            margin: "48px 0px",
                                                            opacity: "1",
                                                            lineHeight: "1.5",
                                                        }}
                                                    >
                                                        {/* <span
                              style={{
                                color: "white",
                                fontSize: "21px",
                                padding: "2px",
                                margin: "48px 0px",
                                opacity: "1",
                                lineHeight: "1.5",
                                fontWeight: "800",
                              }}
                            >
                              International Education and Skill Shortages:
                            </span>{" "} */}
                                                        Key trends include the rise of AI and predictive analytics for employee retention and performance, along with a focus on enhancing the employee experience through tools like mood trackers and engagement platforms. Hybrid work models and gig economy management are also shaping demand for flexible HR solutions. Cloud-based platforms dominate due to their affordability and scalability, with additional opportunities emerging in DE&I analytics and tools designed for workforce upskilling.                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div className="single text-center h-lg market-boxes">
                                                    {/* <h2 style={{paddingBottom:"20px"}}>$200 Bn</h2> */}
                                                    <p
                                                        style={{
                                                            color: "white",
                                                            fontSize: "21px",
                                                            padding: "2px",
                                                            margin: "48px 0px",
                                                            opacity: "1",
                                                            lineHeight: "1.5",
                                                        }}
                                                    >
                                                        {/* <span
                              style={{
                                color: "white",
                                fontSize: "21px",
                                padding: "2px",
                                margin: "48px 0px",
                                opacity: "1",
                                lineHeight: "1.5",
                                fontWeight: "800",
                              }}
                            >
                              Government Focus on Upskilling:
                            </span>{" "} */}
                                                        The competitive landscape features global players like SAP SuccessFactors and Workday, alongside regional providers such as Darwinbox and Keka HR. To stand out, modern HR platforms emphasize user-friendly design, customization, and employee-centric features like emotional intelligence tools. The future of HR Tech lies in targeting underserved SME markets, leveraging AI-driven innovation, and offering integrated ecosystems that balance operational efficiency with employee well-being.                                                    </p>{" "}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center fs-4">
                                            <span style={{ color: "#000" }}>Source: </span>
                                            <span style={{ color: "rgb(127, 119, 118)" }}>
                                                Multiple publicly available research and survey reports
                                            </span>
                                        </div>
                                        <p className=""> </p>
                                        <div className="text-center fluid-container"></div>
                                    </div>
                                    <div
                                        className="container highlight-section"
                                        style={{
                                            marginBottom: "-80px !important",
                                            padding: "0px !important",
                                        }}
                                    >
                                        <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>
                                            Highlights
                                        </h1>

                                        <div className="row highlight-rows">
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                                                <div
                                                    className="single  mindlerhighlight text-left"
                                                    style={{}}
                                                >
                                                    <div className="hightlights-images">
                                                        <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" />
                                                    </div>
                                                    <p style={{ paddingLeft: "0px !important" }}>
                                                        uKnowva provides AI-enabled HR solutions for mid-sized and growing organizations (200–5,000 employees), covering payroll, recruitment, onboarding, performance management, and employee engagement. With a 350,000+ user base, 150+ paying customers, and a 93% retention rate, it delivers strong product-market fit.                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                                                <div
                                                    className="single mindlerhighlight text-left"
                                                    style={{}}
                                                >
                                                    <div className="hightlights-images">
                                                        <img src="./assets/images/deals-details/Petmojo/highlight01.jpg" />
                                                    </div>
                                                    <p style={{ padding: "1px !important" }}>
                                                        uKnowva stands out with AI and Emotional Intelligence (EI) features like sentiment analysis, stress detection, and attrition prediction, fostering employee well-being alongside productivity. Customizable and user-friendly, it surpasses competitors like Darwinbox and SAP SuccessFactors.                                                    </p>{" "}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                                                <div
                                                    className="single mindlerhighlight text-left"
                                                    style={{}}
                                                >
                                                    <div className="hightlights-images">
                                                        <img src="./assets/images/deals-details/highlight2.jfif" />
                                                    </div>
                                                    <p style={{ padding: "0px !important" }}>
                                                        uKnowva projects revenue growth from INR 9.2 Cr to INR 74 Cr in five years, with an 85% gross margin. Its affordable subscription model ensures accessibility for businesses of all sizes.                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xl-6">
                                                <div
                                                    className="single mindlerhighlight text-left"
                                                    style={{}}
                                                >
                                                    <div className="hightlights-images">
                                                        <img src="./assets/images/deals-details/highlight3.jpg" />
                                                    </div>
                                                    <p style={{ paddingLeft: "0px !important" }}>
                                                        uKnowva has improved HR processes for companies like Kotak Mahindra group, Reliance retail,IDFC Bank, Delhivery and Indostar, showcasing results in onboarding efficiency, engagement, and performance management. Its tailored solutions drive measurable value for clients.
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* media */}
                                </div>
                            </div>

                        </section>
                        <div className="deals-page">
                            <div className="tab-wrapper">
                                <div className="container">
                                    <div className="row">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12"
                                            style={{
                                                marginTop: 110,
                                            }}
                                        >
                                            <div className="deal-terms-section">
                                                {/* Investor Presentation */}
                                                <div
                                                    className=""
                                                    style={{
                                                        backgroundColor: "white",
                                                        marginTop: "1px !important",
                                                    }}
                                                >
                                                    <h1
                                                        style={{
                                                            fontSize: 32,
                                                            marginBottom: 30,
                                                            textAlign: "center",
                                                            marginTop: "-10px !important",
                                                        }}
                                                    >
                                                        Investor Presentation
                                                    </h1>
                                                    <Slider {...settings} className="mb-5 pitch-slider">
                                                        {images.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={image}
                                                                onClick={() => this.handleClickImage(image)}
                                                            />
                                                        ))}
                                                    </Slider>
                                                    {current && (
                                                        <Lightbox
                                                            mainSrc={current}
                                                            onCloseRequest={this.handleCloseModal}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="deals-page">
                            <div className="tab-wrapper">
                                <div className="container">
                                    <div className="row">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12"
                                            style={{
                                                marginTop: 110,
                                            }}
                                        >
                                            <Tabs
                                                defaultActiveKey="1"
                                                centered
                                                style={{ marginBottom: "30px !important" }}
                                            >
                                                <TabPane tab="Details" key="2">
                                                    <div className="deal-terms-section">
                                                        <div
                                                            className="container"
                                                            style={{ marginTop: "1px !important" }}
                                                        >
                                                            <div className="row">
                                                                <div className="col-lg-10 m-auto">
                                                                    <h1
                                                                        style={{
                                                                            paddingBottom: "-30px !important",
                                                                            marginTop: "30px",
                                                                        }}
                                                                    >
                                                                        Deal Terms
                                                                    </h1>
                                                                    <div
                                                                        className=""
                                                                        style={{ marginTop: "0px !important" }}
                                                                    >
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <div className="info">
                                                                                        <span>End Date</span>
                                                                                        <h4
                                                                                            style={{
                                                                                                textTransform: "Capitalize",
                                                                                            }}
                                                                                        >
                                                                                            {this.state.deal_regular_end_date
                                                                                                ? moment(
                                                                                                    this.state
                                                                                                        .deal_regular_end_date
                                                                                                ).format("MMM DD, YYYY")
                                                                                                : ""}
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <span> Min Investment</span>
                                                                                        <h4>
                                                                                            ₹{" "}
                                                                                            {this.formatNumberWithCommas(
                                                                                                this.state.minamount
                                                                                            )}{" "}
                                                                                            for {this.state.deal_service}
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <span>Valuation</span>
                                                                                        <h4>36 Cr Pre Money</h4>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <h1
                                                                        style={{
                                                                            paddingBottom: "0px",
                                                                            marginTop: "20px",
                                                                        }}
                                                                    >
                                                                        Company Details
                                                                    </h1>
                                                                    <section
                                                                        className="deal-about-artment-section"
                                                                        style={{ marginTop: "50px" }}
                                                                    >
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <div className="info">
                                                                                        <span>Legal Name</span>
                                                                                        <h4>CONVERGENCE IT SERVICES PVT LTD</h4>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <span>Founded</span>
                                                                                        <h4>16-08-2010</h4>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <span>Status</span>
                                                                                        <h4>Private Limited Company</h4>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <span>Employees</span>
                                                                                        <h4>75</h4>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <span>Website</span>
                                                                                        <h4>
                                                                                            <a
                                                                                                style={{
                                                                                                    color: "rgb(7, 211, 252)",
                                                                                                }}
                                                                                                href="https://www.uknowva.com/"
                                                                                                target="_blank"
                                                                                            >
                                                                                                www.uknowva.com
                                                                                            </a>
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <span>Social Links</span>
                                                                                        <div className="social-icons">
                                                                                            <a href="https://www.facebook.com/uknowva">
                                                                                                <i className="bx bxl-facebook fs-19"></i>
                                                                                            </a>
                                                                                            <a href="https://www.linkedin.com/company/uknowvaplatform">
                                                                                                <i className="bx bxl-linkedin fs-19"></i>
                                                                                            </a>
                                                                                            <a href="https://www.instagram.com/uknowva/">
                                                                                                <i className="bx bxl-instagram fs-19"></i>
                                                                                            </a>

                                                                                            <a href="https://www.youtube.com/@uknowva">
                                                                                                <i className="bx bxl-youtube fs-19"></i>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="info">
                                                                                        <span>Address</span>
                                                                                        <h4>
                                                                                            316 Neelkanth Corporate Park, Kirol Village, Vidya Vihar West Mumbai - 400086
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Investor Presentation */}
                                                    </div>
                                                    {/* start */}

                                                    <div
                                                        className="deals-page"
                                                        style={{
                                                            marginTop: "50px !important",
                                                        }}
                                                    >
                                                        <div className="deal-terms-section">
                                                            <div
                                                                className="container"
                                                                style={{ marginTop: "1px !important" }}
                                                            >
                                                                <div className="row">
                                                                    <div className="col-lg-10 m-auto">
                                                                        <h1>Documents</h1>
                                                                        <div className="row document-section">
                                                                            <div className="col-lg-2"></div>
                                                                            <div className="col-lg-8">
                                                                                <div
                                                                                    className="download-section"
                                                                                    style={{
                                                                                        backgroundColor: "white",
                                                                                        padding: "4rem 19px",
                                                                                    }}
                                                                                >
                                                                                    <>
                                                                                        <div>
                                                                                            <table
                                                                                                className="download-document-table"
                                                                                                style={{ width: "100%" }}
                                                                                            >
                                                                                                <tr
                                                                                                    style={{
                                                                                                        background: "#29176f",
                                                                                                        color: "#fff",
                                                                                                    }}
                                                                                                >
                                                                                                    <th>Sr no</th>
                                                                                                    <th>Document</th>
                                                                                                    <th>Type</th>
                                                                                                    <th>Download</th>
                                                                                                </tr>
                                                                                                {this.state.documents.length >
                                                                                                    0 &&
                                                                                                    this.state.documents.map(
                                                                                                        (item, index) => {
                                                                                                            // console.log(
                                                                                                            //   this.state.documents
                                                                                                            //     .length
                                                                                                            // );
                                                                                                            let documentlink = `${process.env.REACT_APP_BASE_URL}api/uploads/docs/${item.documentid}/${item.document}`;
                                                                                                            return (
                                                                                                                <tr
                                                                                                                    key={index}
                                                                                                                    style={{ height: 70 }}
                                                                                                                >
                                                                                                                    {/* <td
                                                          style={{ width: 40 }}
                                                        >
                                                          {item.paid ==
                                                            "Paid" && (
                                                            <>
                                                              {this.state
                                                                .check_membership_type ==
                                                                "premium" &&
                                                              item.premium_price !=
                                                                "0" &&
                                                              item.premium_price !=
                                                                "" ? (
                                                                <>
                                                                  {item.user_paid ==
                                                                  false ? (
                                                                    <Checkbox
                                                                      onChange={() =>
                                                                        this.show_selected_checkbox(
                                                                          item
                                                                        )
                                                                      }
                                                                      value={
                                                                        item.selected
                                                                      }
                                                                    ></Checkbox>
                                                                  ) : (
                                                                    <>
                                                                      {item.user_paid ==
                                                                        true && (
                                                                        <img
                                                                          src="./paid.png"
                                                                          style={{
                                                                            maxWidth: 20,
                                                                          }}
                                                                        />
                                                                      )}
                                                                    </>
                                                                  )}
                                                                </>
                                                              ) : (
                                                                <>
                                                                  {this.state
                                                                    .check_membership_type ==
                                                                    "regular" &&
                                                                    item.regular_price !=
                                                                      "0" &&
                                                                    item.regular_price !=
                                                                      "" &&
                                                                    item.user_paid ==
                                                                      false && (
                                                                      <Checkbox
                                                                        onChange={() =>
                                                                          this.show_selected_checkbox(
                                                                            item
                                                                          )
                                                                        }
                                                                        value={
                                                                          item.selected
                                                                        }
                                                                      ></Checkbox>
                                                                    )}
                                                                </>
                                                              )}
                                                            </>
                                                          )}
                                                        </td> */}
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            width: 40,
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {index + 1}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            width: 140,
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {item.docname}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            width: 40,
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {item.paid == "Paid"
                                                                                                                            ? this.state
                                                                                                                                .check_membership_type ==
                                                                                                                                "premium"
                                                                                                                                ? item.premium_price ==
                                                                                                                                    "0"
                                                                                                                                    ? "Free"
                                                                                                                                    : "₹" +
                                                                                                                                    item.premium_price
                                                                                                                                : item.regular_price ==
                                                                                                                                    "0"
                                                                                                                                    ? "Free"
                                                                                                                                    : "₹" +
                                                                                                                                    item.regular_price
                                                                                                                            : "Free"}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            width: 50,
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {this.state
                                                                                                                            .investor_id && (
                                                                                                                                <center>
                                                                                                                                    {(item.user_paid ==
                                                                                                                                        true ||
                                                                                                                                        item.paid ==
                                                                                                                                        "Free") && (
                                                                                                                                            <a
                                                                                                                                                href={
                                                                                                                                                    documentlink
                                                                                                                                                }
                                                                                                                                                target="_blank"
                                                                                                                                                style={{
                                                                                                                                                    width: 80,
                                                                                                                                                }}
                                                                                                                                            >
                                                                                                                                                <img
                                                                                                                                                    src="./download.ico"
                                                                                                                                                    style={{
                                                                                                                                                        maxWidth: 50,
                                                                                                                                                    }}
                                                                                                                                                />
                                                                                                                                            </a>
                                                                                                                                        )}
                                                                                                                                    {item.paid ==
                                                                                                                                        "Paid" &&
                                                                                                                                        this.state
                                                                                                                                            .check_membership_type ==
                                                                                                                                        "premium" &&
                                                                                                                                        (item.premium_price ==
                                                                                                                                            "0" ? (
                                                                                                                                            <a
                                                                                                                                                href={
                                                                                                                                                    documentlink
                                                                                                                                                }
                                                                                                                                                target="_blank"
                                                                                                                                                style={{
                                                                                                                                                    width: 80,
                                                                                                                                                }}
                                                                                                                                            >
                                                                                                                                                <img
                                                                                                                                                    src="./download.ico"
                                                                                                                                                    style={{
                                                                                                                                                        maxWidth: 50,
                                                                                                                                                    }}
                                                                                                                                                />
                                                                                                                                            </a>
                                                                                                                                        ) : (
                                                                                                                                            ""
                                                                                                                                        ))}
                                                                                                                                </center>
                                                                                                                            )}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            );
                                                                                                        }
                                                                                                    )}
                                                                                            </table>
                                                                                        </div>
                                                                                    </>
                                                                                    {this.state.button_status ==
                                                                                        false && (
                                                                                            <button
                                                                                                className="download-button"
                                                                                                onClick={() => this.documentPay()}
                                                                                            >
                                                                                                Pay
                                                                                            </button>
                                                                                        )}
                                                                                    {!this.state.investor_id && (
                                                                                        <>
                                                                                            <button
                                                                                                className="download-button"
                                                                                                style={{
                                                                                                    background: "rgb(41 23 111)",
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    window.location.assign(
                                                                                                        "/login"
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                Login to View
                                                                                            </button>
                                                                                            {/* <em
                                            style={{
                                              fontSize: 14,
                                              fontWeight: "700",
                                            }}
                                          >
                                            Become Growth91
                                            <sup style={{ fontSize: "0.6rem" }}>
                                              TM
                                            </sup>{" "}
                                            member to access the document{" "}
                                          </em> */}
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-2"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-wrapper">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <Tabs defaultActiveKey="1" centered>
                                                                            <TabPane tab="FAQ" key="1">
                                                                                <section
                                                                                    className="faq-section"
                                                                                    style={{
                                                                                        margin: "0px",
                                                                                        padding: "0px",
                                                                                        background: "none",
                                                                                    }}
                                                                                >
                                                                                    <div className="">
                                                                                        <div className="row">
                                                                                            <div className="col-lg-12 col-md-12 col-sm-12 m-auto">
                                                                                                <h1 className="text-center mb-4">
                                                                                                    About uknowaHRMS
                                                                                                </h1>
                                                                                                <Collapse
                                                                                                    // defaultActiveKey={['1']}
                                                                                                    onChange={this.callback1}
                                                                                                    expandIconPosition="left"
                                                                                                    accordion
                                                                                                >
                                                                                                    <Panel
                                                                                                        header="Are you focused on product or service?"
                                                                                                        key="1"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            <p
                                                                                                                style={{
                                                                                                                    color: "#7f7776",
                                                                                                                    textAlign: "justify",
                                                                                                                }}
                                                                                                            >
                                                                                                                uKnowva combines a product-focused strategy with a service-oriented approach to deliver maximum value to clients. At its core is a robust, scalable platform, continuously enhanced with upgrades and innovative features. This is complemented by exceptional customer support, comprehensive training, and tailored customization services, ensuring businesses can fully leverage the platform to meet their unique needs.
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </Panel>
                                                                                                    <Panel
                                                                                                        header="what are the challenges for scale up and how these will be managed?"
                                                                                                        key="2"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            <p
                                                                                                                style={{
                                                                                                                    color: "#7f7776",
                                                                                                                    textAlign: "justify",
                                                                                                                }}
                                                                                                            >
                                                                                                                The primary challenges for scaling uKnowva  include: Global Expansion: Penetrating international markets requires adapting to region-specific compliance, cultural nuances, and competition. Support Scalability: As our client base grows, ensuring consistent, high-quality support across regions is critical. R&D Investment: To stay ahead, continuous investment in AI and product innovation is necessary.
                                                                                                                {/* br */}
                                                                                                                <br />
                                                                                                                To manage these challenges: They plan to establish regional partnerships for localized support and market entry. Our automation-driven customer service tools, such as chatbots and self-service portals, will ensure scalable and efficient support. Increased investment in our research and development teams will drive innovation to address market-specific challenges effectively
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </Panel>

                                                                                                    <Panel
                                                                                                        header="Are you targeting new untapped market? Justify"
                                                                                                        key="7"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            <p
                                                                                                                style={{
                                                                                                                    color: "#7f7776",
                                                                                                                    textAlign: "justify",
                                                                                                                }}
                                                                                                            >
                                                                                                                Yes, uKnowva  is disrupting the HRMS market by:
                                                                                                                <br />
                                                                                                                Offering affordable, flexible, and scalable solutions that cater to both SMEs and large enterprises across 10+ industries in 5+ countries and serving 300K active users daily in 150+ business organizations.
                                                                                                                <br />

                                                                                                                Introducing EI-driven features like mood meters, happiness tracking, and AI-driven analytics that focus on people rather than processes.
                                                                                                                <br />

                                                                                                                Building a strong community ecosystem with our Partner Portal and Extension Store, allowing stakeholders to collaborate and innovate.
                                                                                                                <br />

                                                                                                                These disruptions challenge traditional HRMS platforms that focus on operational efficiency rather than holistic employee engagement and well-being.

                                                                                                            </p><p
                                                                                                                style={{
                                                                                                                    color: "#7f7776",
                                                                                                                    textAlign: "justify",
                                                                                                                    marginTop: "10px"
                                                                                                                }}
                                                                                                            >
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </Panel>
                                                                                                    <Panel
                                                                                                        header="What are your moats?"
                                                                                                        key="4"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            <p
                                                                                                                style={{
                                                                                                                    color: "#7f7776",
                                                                                                                    textAlign: "justify",
                                                                                                                }}
                                                                                                            >
                                                                                                                primary moats include:
                                                                                                                Extension Store: Over 100+ customizable apps integrated within our ecosystem, offering unmatched flexibility.
                                                                                                                Emotional Intelligence (EI) & AI-driven Tools: Features like the Happiness Meter and AI chatbots enhance engagement uniquely.
                                                                                                                Partner Portal: A community-driven model fosters collaboration and expands our ecosystem organically.
                                                                                                                Affordability and Flexibility: A scalable pricing model accessible to SMEs and enterprises alike.
                                                                                                                Customer-Centric Approach: With intuitive UI/UX, compared to "Amul Butter," and people-focused tools, our retention rates remain high.
                                                                                                            </p>{" "}
                                                                                                        </div>
                                                                                                    </Panel>
                                                                                                </Collapse>
                                                                                                <h1 className="text-center mb-2 mt-4">
                                                                                                    Growth91 Investment FAQ
                                                                                                </h1>
                                                                                                <Collapse
                                                                                                    // defaultActiveKey={['10']}
                                                                                                    onChange={this.callback3}
                                                                                                    expandIconPosition="left"
                                                                                                    accordion
                                                                                                >
                                                                                                    <Panel
                                                                                                        header="What is the due diligence process followed by Growth91"
                                                                                                        key="11"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            At Growth91, we follow
                                                                                                            stringent due-diligence
                                                                                                            process. We ask for
                                                                                                            detailed information about
                                                                                                            start-up and their team.
                                                                                                            After the scrutiny and if
                                                                                                            deemed fit, start-up would
                                                                                                            be listed on Growth91
                                                                                                            platform. Independent
                                                                                                            investment opinion and
                                                                                                            due-diligence report
                                                                                                            prepared by external
                                                                                                            qualified experts are made
                                                                                                            available for investors.
                                                                                                        </div>
                                                                                                    </Panel>
                                                                                                    <Panel
                                                                                                        header="Do you offer any guarantee on returns?"
                                                                                                        key="12"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            No, we do not guarantee
                                                                                                            any returns. The startup
                                                                                                            which is raising the money
                                                                                                            is also not guaranteeing
                                                                                                            any specific returns. In
                                                                                                            principle, it is not
                                                                                                            legally correct for the
                                                                                                            company to provide any
                                                                                                            guarantee about returns on
                                                                                                            equity linked securities.
                                                                                                        </div>
                                                                                                    </Panel>
                                                                                                    <Panel
                                                                                                        header="What is the refund process in case I don’t receive any allocation?"
                                                                                                        key="13"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            If an investor doesn’t
                                                                                                            receive the allocation,
                                                                                                            the investment amount will
                                                                                                            be refunded to the bank
                                                                                                            account from which the
                                                                                                            investment has been made.
                                                                                                            As per Growth91 policy,
                                                                                                            there will be no interest
                                                                                                            or compensation on these
                                                                                                            returned funds.
                                                                                                        </div>
                                                                                                    </Panel>
                                                                                                    <Panel
                                                                                                        header="What is the exit mechanism available for the investors"
                                                                                                        key="14"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            The Company and the
                                                                                                            Promoters shall make all
                                                                                                            reasonable endeavours to
                                                                                                            provide exit to the
                                                                                                            Investors by any of the
                                                                                                            following ways: 1. Initial
                                                                                                            Public Offer (IPO) 2.
                                                                                                            Merger or Acquisition
                                                                                                            Event 3. Buyout Event 3.
                                                                                                            Compulsory Call Option
                                                                                                            with minimum assured
                                                                                                            returns. (Please refer to
                                                                                                            investor agreement for
                                                                                                            more details)
                                                                                                        </div>
                                                                                                    </Panel>

                                                                                                    <Panel
                                                                                                        header="In which account Investor’s money are transferred"
                                                                                                        key="15"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            After all the required fund raising formalities are completed by the Startup,
                                                                                                            we advise investors to directly transfer funds to the account of respective
                                                                                                            Startup, dedicated for receiving Securities Application Money
                                                                                                        </div>
                                                                                                    </Panel>

                                                                                                    <Panel
                                                                                                        header="I have more questions; how do I contact Growth91?"
                                                                                                        key="16"
                                                                                                        extra={genExtra()}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                color: "#7f7776",
                                                                                                            }}
                                                                                                        >
                                                                                                            You can always send your
                                                                                                            queries to{" "}
                                                                                                            <a href="mailto:contact@growth91.com">
                                                                                                                contact@growth91.com
                                                                                                            </a>
                                                                                                            , we will respond to your
                                                                                                            queries in shortest
                                                                                                            possible time.
                                                                                                        </div>
                                                                                                    </Panel>
                                                                                                </Collapse>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </section>
                                                                            </TabPane>
                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* stop */}
                                                </TabPane>
                                                <TabPane tab="Team" key="3">
                                                    <div
                                                        className="container meet-the-team-section"
                                                        style={{ maxWidth: 921 }}
                                                    >
                                                        <h2 className="text-center">Meet the Team</h2>
                                                        <div className="row elefantteam">
                                                            <div className="col-lg-6">
                                                                <div
                                                                    className="single"
                                                                    style={{ paddingBottom: "0px !important" }}
                                                                // style={{  marginBottom: 0px !important}}
                                                                >
                                                                    <div className="d-flex">
                                                                        <img
                                                                            src="./assets/images/deals-details/uknowva/Team/Vicky-Jain.jpeg"
                                                                            alt=""
                                                                        />
                                                                        <div className="intro">
                                                                            <h3>Vicky Jain</h3>
                                                                            <span>
                                                                                Co-founder & CEO/CTO
                                                                            </span>
                                                                            <div
                                                                                className="social-icons"
                                                                                style={{
                                                                                    marginTop: 4,
                                                                                    marginLeft: -6,
                                                                                }}
                                                                            >
                                                                                <a
                                                                                    href="https://www.linkedin.com/in/vicky-jain-09062227?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className="bx bxl-linkedin"></i>
                                                                                </a>
                                                                                {/* <a href="mailto:vaibhav.tambe@transbnk.co.in">
                                        <i className="bx bxl-gmail"></i>
                                        </a> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <ul>
                                                                        <li>
                                                                            <a>
                                                                                Vicky drives uKnowva’s technology vision, overseeing product
                                                                                development and strategy. He holds a BE from Mumbai University
                                                                                and an MBA from IBS.  </a>
                                                                        </li>
                                                                        <li>
                                                                            <a>
                                                                            A recipient of the prestigious Bharat Gaurav Award (2009) by IEDRA,
he has been recognized for his significant contributions to innovation
and technology.
                                                                            </a>

                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div
                                                                    className="single"
                                                                    style={{ paddingBottom: "0px !important" }}
                                                                // style={{  marginBottom: 0px !important}}
                                                                >
                                                                    <div className="d-flex">
                                                                        <img
                                                                            src="./assets/images/deals-details/uknowva/Team/Abhay-Talekar .jpeg"
                                                                            alt=""
                                                                        />
                                                                        <div className="intro">
                                                                            <h3>Abhay Talekar </h3>
                                                                            <span>Co-founder & CBO</span>
                                                                            <div
                                                                                className="social-icons"
                                                                                style={{
                                                                                    marginTop: 4,
                                                                                    marginLeft: -6,
                                                                                }}
                                                                            >
                                                                                <a
                                                                                    href="https://www.linkedin.com/in/abhay-talekar-9a038126/"
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className="bx bxl-linkedin"></i>
                                                                                </a>
                                                                                {/* <a href="mailto:vaibhav.tambe@transbnk.co.in">
                                        <i className="bx bxl-gmail"></i>
                                        </a> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <ul>
                                                                        <li>
                                                                            <a>
                                                                                Abhay focuses on scaling uKnowva’s market presence and driving
                                                                                business growth. </a>
                                                                        </li>
                                                                        <li>
                                                                            <a>He holds an MBA from ITM and has extensive experience in business
                                                                                development and strategic partnerships.</a>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div
                                                                    className="single"
                                                                    style={{ paddingBottom: "0px !important" }}
                                                                // style={{  marginBottom: 0px !important}}
                                                                >
                                                                    <div className="d-flex">
                                                                        <img
                                                                            src="./assets/images/deals-details/uknowva/Team/Priyanka-bhor.jpeg"
                                                                            alt=""
                                                                        />
                                                                        <div className="intro">
                                                                            <h3>Priyanka Bhor </h3>
                                                                            <span>Co-founder & Head of Product</span>
                                                                            <div
                                                                                className="social-icons"
                                                                                style={{
                                                                                    marginTop: 4,
                                                                                    marginLeft: -6,
                                                                                }}
                                                                            >
                                                                                <a
                                                                                    href="https://www.linkedin.com/in/priyanka-bhor-01906225/"
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className="bx bxl-linkedin"></i>
                                                                                </a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <ul>
                                                                        <li>
                                                                            <a>
                                                                                Priyanka brings extensive expertise in product design. She holds a
                                                                                BE from Mumbai University and an MBA from Welingkar Institute.
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a>
                                                                                Priyanka was featured among the "50 Most Empowering Women in Business 2016" by
                                                                                Insights Success and named one of the "Top 50 Women HR Tech Influencers 2023".
                                                                            </a>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NewWebFooter />
                    </div>
                ) : (
                    window.location.assign("/Deals")
                )}
            </>
        );
    }
}

export default uknowaHRMS;
