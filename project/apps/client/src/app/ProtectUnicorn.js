import React, { Component } from "react";
import Apis from "./constants/Apis";
import moment from "moment";
import Bridge from "./constants/Bridge";
import {
    Tabs,
    Collapse,
    message,
    Modal,
    Spin,
    Checkbox,
    Progress,
    Alert,
} from "antd";
import ModalLogin from "./ModalLogin";

class ProtectUnicorn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deal_id: "",
            investor_id: "",
            deal_name: "",
            deal_description: "",
            isPrivate: false,
            isFunded: false,
            tags: [],
            logo: "",
            youtube_url: "",
            dealenddays: 0,
            kycstatus: false,
            bankstatus: false,
            amount: 0,
            minamount: 0,
            maxamount: 0,
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
        };
    }
    componentWillMount() {
        document.title = "Growth91 - Startup Marketplace ";
    }
    componentDidMount() {
        let deal_id = "11";
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
    }
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
                this.setState({ gst: result.data[0].taxation_percentage });
            } else {
                // console.log("gst can not be able to fetch")
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
        Bridge.deal.list().then((result) => {
            if (result.status == 1) {
                this.setState({
                    deals: result.data,
                    loading: false,
                });
                let current_date = moment();
                for (let d of result.data) {
                    if (d.deal_id == this.state.deal_id) {
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
                }
                for (let d of result.data) {
                    if (d.deal_id == this.state.deal_id) {
                        if (d.show_status == "0") {
                            this.setState({ is_deal_visible: false });
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

                                isPrivate: d.deal_t_type == "Private" ? true : false,
                                isFunded: d.deal_status == "Closed" ? true : false,
                                tags: d.deal_category ? JSON.parse(d.deal_category) : [],
                                logo: logourl,
                                youtube_url: d.youtubelink,
                                dealenddays: differece > 0 ? differece : 0,
                                minamount: d.Min_inv_amt,
                                maxamount: d.Max_inv_amt,
                                amount: "", //d.Min_inv_amt
                                pdffile: pdffile,
                                pitch_files: pitchImg,
                                percentage_raised: percetage_raised,
                                button_show_status: button_show_status,
                                show_data: "block",
                                multiples_of: d.multiples_of,
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
                investmentmodal: true,
            },
            () => {
                this.calculategst();
            }
        );
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
    onChangeCheckbox = (e) => {
        this.setState({
            [e.target.name]: e.target.checked,
        });

        if (e.target.name == "deduct") {
            if (e.target.checked == true) {
                let processingfees = parseFloat(
                    (this.state.amount / 100) * parseFloat(this.state.percentage)
                );
                let tdsamount = parseFloat(processingfees / 100) * 10;
                let minusamt = parseFloat(processingfees - tdsamount);

                this.setState({
                    processingfees: minusamt,
                    tdsdeductedamount: tdsamount,
                });
            } else {
                let processingfees = parseFloat(
                    (this.state.amount / 100) * parseFloat(this.state.percentage)
                );
                this.setState({
                    processingfees: processingfees,
                    tdsdeductedamount: 0,
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
        );
        let gst = this.state.gst;
        let amt = parseFloat(this.state.amount);
        let walletDeductionMoney;
        if (this.state.checkWallet == false) {
            walletDeductionMoney = 0;
        } else {
            walletDeductionMoney =
                legalfee.toFixed(0) <= this.state.walletMoney
                    ? legalfee.toFixed(0)
                    : this.state.walletMoney;
        }
        let gstValue = ((legalfee.toFixed(0) - walletDeductionMoney) * gst) / 100;
        this.setState({
            gst: gst,
            legalfee: this.state.amount ? legalfee.toFixed(0) : 0,
            amountplusgst: this.state.amount ? amt.toFixed(0) : 0,
            processingfees: this.state.amount ? legalfee.toFixed(0) : 0,
            totalamount: this.state.amount
                ? (amt + parseFloat(legalfee)).toFixed(0) -
                walletDeductionMoney +
                gstValue
                : 0,
            walletDeductionMoney: walletDeductionMoney,
            gstValue: gstValue,
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
        } else if (Number.isInteger(multiple_of) == false) {
            error = `Amount should be in multiple of Rs. ${this.state.multiples_of}`;
            this.setState({ amount_error: error, amount_error_status: true });
        } else {
            this.setState({ amount_error: "", amount_error_status: false });
        }
    };
    render() {
        const customModalStyle = {
            backdropFilter: "blur(5px)",
            backgroundImage: "url(./assets/images/blurdealbg.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          };
        const customModalStyle2 = {
            backdropFilter: "blur(5px)",
            backgroundImage: "url(./assets/images/blurdealbg2.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          };
        return (
            <>
                {
                    !this.props.Conditon ?
                    !this.state.investor_id ? <ModalLogin customMaskStyle={customModalStyle} /> : <this.props.Component />
                    :
                    !this.state.investor_id ? <ModalLogin customMaskStyle={customModalStyle2} /> : <this.props.Component2 />
                }
            </>
        )
    }
}

export default ProtectUnicorn;