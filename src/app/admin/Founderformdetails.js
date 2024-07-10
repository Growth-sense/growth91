import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Card,
  Table,
  message,
  Button,
  Modal,
  Input,
} from "antd";
import Sidebar2 from "./common/Sidebar2";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import moment from "moment";
import Bridge from "../constants/Bridge";
import * as FileSaver from "file-saver";

import * as XLSX from "xlsx-js-style";
import ReactToPrint from "react-to-print";
import TableComponent from "./pdfview/TableComponent";
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";
import Founderadmindashboard from "./pdfview/forms/Founderadmindashboard";

const { Content } = Layout;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class Founderformdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchinput: "",
      loading: false,
      list: [],
      clist: [],
      modalstatus: false,
      item: [],
    };
  }

  componentDidMount() {
    console.log(this.props.item);
    this.getformdetails();
  }

  // get post list
  getformdetails = () => {
    this.setState({ loading: true });
    Bridge.admin.admin_get_founder_form_details().then((result) => {
      if (result.status == 1) {
        console.log(result.data);
        this.setState({
          list: result.data,
          clist: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({ loading: false });
      }
    });
  };

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    console.log(text);
    if (text) {
      let arr = [];
      for (let item of this.state.clist) {
        if (
          (item.main_founder_id && item.main_founder_id.includes(text)) ||
          (item.first_name && item.first_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.primary_contact_person_name && item.primary_contact_person_name.toLowerCase().includes(text.toLowerCase())) ||
          (item.startup_name && item.startup_name.toLowerCase().includes(text.toLowerCase()))         ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        list: arr,
        loading: false,
      });
    } else {
      this.setState({
        list: this.state.clist,
        loading: false,
      });
    }
  };

  exportToCSVF = (fileName, item) => {
    let arr = [];
    let obj = {
      "Main Founder Id": item.main_founder_id,
      "Register Date": item.registered_dt,
      Email: item.email,
      "Name Of Startup": item.startup_name,
      "Primary Contact Person(Name)": item.primary_contact_person_name,
      "Primary Contact Person (Mobile)": item.primary_contact_person_mobile,
      "Primary Contact Person (Email)": item.primary_contact_person_email,
      "Are you Disrupting existing market?How?":
        item.is_disrupting_existing_market,
      "Are you targeting new untapped market?Justify":
        item.is_targeting_new_untabed_market,
      "How will the customer benefit?": item.customer_benifit,
      "How will your suppliers benefit? ": item.suplier_benifit,
      "Are you focused on product or service? ": item.focused_on_product,
      "What are the direct substitute available in the market?":
        item.direct_substitute_available,
      "What are the indirect subsitute available in the market?":
        item.indirect_substitute_available,
      "What are the risks perceived by you?": item.risks_perceived,
      "How roles and responsibilities are distributed between core team members?":
        item.responsibilities_distributted_members,
      "what are your moats?": item.moats,
      "what are the challanges for scale up and how these will be managed?":
        item.challenges_for_scale_up,
      Trademark: item.trademark,
      Patents: item.patents,
      "Other IPs": item.other_ips,
      "Other relevant details about IPs": item.other_relevant_details,
      "All IPRS registered in company": item.all_iprs_rwgistered_in_company,
      "Do you have an android app for your Startup?":
        item.have_any_android_app_startup,
      "Android App Name": item.app_name_details,
      "Do you have an IOS app for your Startup?": item.have_ios_app,
      "IOS App Name": item.ios_name_details,
      "Which is most relevant industry classification for the startup?":
        item.relevant_industry,
      "Your views on industry": item.views_on_industry,
      total_market_size_of_industry: item.total_market_size_of_industry,
      supporting_information_of_narket_size:
        item.supporting_information_of_narket_size,
      addressale_market_size: item.addressale_market_size,
      supporting_information_of_demarking_addressable_market:
        item.supporting_information_of_demarking_addressable_market,
      direct_local_competition: item.direct_local_competition,
      in_direct_local_competition: item.in_direct_local_competition,
      direct_global_competition: item.direct_global_competition,
      indirect_global_competition: item.indirect_global_competition,
      how_different_startup_from_competition:
        item.how_different_startup_from_competition,
      why_difficult_competition: item.why_difficult_competition,
      what_are_unfair_disadvantages: item.what_are_unfair_disadvantages,
      strength_of_your_startup: item.strength_of_your_startup,
      weakness_of_startup: item.weakness_of_startup,
      opportunities_for_startup: item.opportunities_for_startup,
      threats_for_startup: item.threats_for_startup,
      name_of_legality_entity: item.name_of_legality_entity,
      website: item.website,
      cin_legality_entity: item.cin_legality_entity,
      pan_legality_entity: item.pan_legality_entity,
      registered_in_country: item.registered_in_country,
      formality_established_date: item.formality_established_date,
      activities_start_date_befire_formal:
        item.activities_start_date_befire_formal,
      address_registered_office: item.address_registered_office,
      address_corporate_office: item.address_corporate_office,
      director_1_name: item.director_1_name,
      director_1_din: item.director_1_din,
      director_2_name: item.director_2_name,
      director_2_din: item.director_2_din,
      director_3_name: item.director_3_name,
      director_3_din: item.director_3_din,
      director_4_name: item.director_4_name,
      director_4_din: item.director_4_din,
      linkdin: item.linkdin,
      facebook: item.facebook,
      instagram: item.instagram,
      youtube: item.youtube,
      other: item.other,
      primary_gtm_strategy: item.primary_gtm_strategy,
      backup_plan_for_strategy: item.backup_plan_for_strategy,
      existing_cas: item.existing_cas,
      expected_cac_in_future: item.expected_cac_in_future,
      rational_behinde_any_change_in_cac:
        item.rational_behinde_any_change_in_cac,
      ltv_of_customer: item.ltv_of_customer,
      rational_behind_ltv_number: item.rational_behind_ltv_number,
      ltv_to_cac_ratio: item.ltv_to_cac_ratio,
      authorized_captial_of_company: item.authorized_captial_of_company,
      paid_up_capital_company: item.paid_up_capital_company,
      percentage_holding_by_founders: item.percentage_holding_by_founders,
      percentage_holding_by_core_team: item.percentage_holding_by_core_team,
      reserved_for_esop: item.reserved_for_esop,
      percentage_holding_of_others: item.percentage_holding_of_others,
      actual_amount_real_salaries_taken: item.actual_amount_real_salaries_taken,
      usecure_loans_received_from_founders: item.moats,
      usecure_loans_received_from_other: item.usecure_loans_received_from_other,
      any_other_secured_or_ddebt_from_bank:
        item.any_other_secured_or_ddebt_from_bank,
      founders_current_salery: item.founders_current_salery,
      date_of_last_increase_founders_salary:
        item.date_of_last_increase_founders_salary,
      core_team_current_salary: item.core_team_current_salary,
      total_salary_including_core_team_salary:
        item.total_salary_including_core_team_salary,
      have_you_raised_fund_for_startup: item.have_you_raised_fund_for_startup,
      most_about_your_competition: item.most_about_your_competition,
      failed_venture_in_same_domain: item.failed_venture_in_same_domain,
      resons_for_failure_after_analysing:
        item.resons_for_failure_after_analysing,
      name_of_clients: item.name_of_clients,
      client_retention: item.client_retention,
      revenue_top_5_clients: item.revenue_top_5_clients,
      explaination_economics_of_startup: item.explaination_economics_of_startup,
      total_capex_of_startup: item.total_capex_of_startup,
      total_amount_spent_of_product: item.total_amount_spent_of_product,
      major_expense_till_date: item.major_expense_till_date,
      funds_required: item.funds_required,
      expected_runway_with_current_fund_raise:
        item.expected_runway_with_current_fund_raise,
      desired_valuation_for_current_fund_raise:
        item.desired_valuation_for_current_fund_raise,
      logic_for_desired_valuation: item.logic_for_desired_valuation,
      logical_and_realistic_lower_valuation:
        item.logical_and_realistic_lower_valuation,
      capex_immediately: item.capex_immediately,
      capex_future_plans: item.capex_future_plans,
      use_of_funds_product_development: item.use_of_funds_product_development,
      use_of_funds_marketing: item.use_of_funds_marketing,
      use_of_funds_repayment: item.use_of_funds_repayment,
      use_of_funds_salaries_in_per: item.use_of_funds_salaries_in_per,
      use_of_funds_cost_and_commision: item.use_of_funds_cost_and_commision,
      use_of_funds_other: item.use_of_funds_other,
      are_you_open_to_consider_logical_lower_valuation:
        item.are_you_open_to_consider_logical_lower_valuation,
      are_you_registered_for_gst: item.are_you_registered_for_gst,
      status_of_gst_compliance: item.status_of_gst_compliance,
      date_of_last_audited_balance_sheet:
        item.date_of_last_audited_balance_sheet,
      date_of_filling_last_itr: item.date_of_filling_last_itr,
      date_of_last_agm: item.date_of_last_agm,
      pending_complience_related_to_roc: item.pending_complience_related_to_roc,
      past_days: item.past_days,
      list_of_other_situatory: item.list_of_other_situatory,
      email_and_mobile_of_ca: item.email_and_mobile_of_ca,
      email_and_mobile_of_cs: item.email_and_mobile_of_cs,
      name_email_and_mobile_of_any_other:
        item.name_email_and_mobile_of_any_other,
      reference_of_customers: item.reference_of_customers,
      reference_of_vendors: item.reference_of_vendors,
      reference_of_past_employer: item.reference_of_past_employer,
      reference_of_guide_from_college: item.reference_of_guide_from_college,
      send_me_copy_of_response: item.send_me_copy_of_response,
      what_valuation_will_safe: item.what_valuation_will_safe,
      dependence_on_any_specific_founder:
        item.dependence_on_any_specific_founder,
      regulartory_issues: item.regulartory_issues,
      licences_and_permissions: item.licences_and_permissions,
      team_size: item.team_size,
      is_company_paying_commision_above_5_per:
        item.is_company_paying_commision_above_5_per,
      is_company_paying_commision_above_10_per:
        item.is_company_paying_commision_above_10_per,
      possible_exit_opportunities: item.possible_exit_opportunities,
      subsidiaries: item.subsidiaries,
      sister_concerns: item.sister_concerns,
      related_party_transactions: item.related_party_transactions,
      legal_risk_plan_to_migrate: item.legal_risk_plan_to_migrate,
      amy_change_by_founders: item.amy_change_by_founders,
      demo_video_link: item.demo_video_link,
      supported_documents: item.supported_documents,
      media_coverage: item.media_coverage,
      awards_and_recognitions: item.awards_and_recognitions,
      recognized_as_startup_by_dpiit: item.recognized_as_startup_by_dpiit,
      any_specific_information_to_share: item.any_specific_information_to_share,
      pitch: item.pitch,
      documents: item.documents,
      round_1_date: item.round_1_date,
      round_1_pre_money_validation: item.round_1_pre_money_validation,
      round_1_amount_raised: item.round_1_amount_raised,
      round_1_name_of_investor: item.round_1_name_of_investor,
      round_1_other_specific_details: item.round_1_other_specific_details,
      round_2_date: item.round_2_date,
      moround_2_pre_money_validationats: item.moround_2_pre_money_validationats,
      round_2_amount_raised: item.round_2_amount_raised,
      round_2_name_of_investor: item.round_2_name_of_investor,
      round_2_other_specific_details: item.round_2_other_specific_details,
      round_3_date: item.round_3_date,
      round_3_pre_money_validation: item.round_3_pre_money_validation,
      round_3_amount_raised: item.round_3_amount_raised,
      round_3_name_of_investor: item.round_3_name_of_investor,
      round_3_other_specific_details: item.round_3_other_specific_details,
      round_4_date: item.round_4_date,
      round_4_pre_money_validation: item.round_4_pre_money_validation,
      round_4_amount_raised: item.round_4_amount_raised,
      round_4_name_of_investor: item.round_4_name_of_investor,
      round_4_other_specific_details: item.round_4_other_specific_details,
      f1_status: item.f1_status,
      f2_status: item.f2_status,
      f3_status: item.f3_status,
      f4_status: item.f4_status,
      f5_status: item.f5_status,
      f6_status: item.f6_status,
      f7_status: item.f7_status,
      f8_status: item.f8_status,
      f9_status: item.f9_status,
      f10_status: item.f10_status,
      f11_status: item.f11_status,
      f12_status: item.f12_status,
      f13_status: item.f13_status,
      f14_status: item.f14_status,
      f15_status: item.f15_status,
      f16_status: item.f16_status,
      f17_status: item.f17_status,
      f18_status: item.f18_status,
      f19_status: item.f19_status,
      f20_status: item.f20_status,

      any_one_of_previous_investors_during_this_round:
        item.any_one_of_previous_investors_during_this_round,
      any_one_of_previous_investors_during_this_current_round:
        item.any_one_of_previous_investors_during_this_current_round,
    };
    arr.push(obj);
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Founder data exported successfully.");
  };

  exportToCSVA = (fileName, item) => {
    let arr = [];
    let obj = {
      "Founder Id": item.founder_id,
      "Main Founder Id": item.main_founder_id,
      // 'By Founder Id':item.submitted_by_user_id,
      "Primary Contact Person(Name)": item.primary_contact_person_name,
    };
    arr.push(obj);
    // console.log('arr',arr);

    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Founder data exported successfully.");
  };

  openpitchfile = (pitchfile, founder_id) => {
    let link = `${process.env.REACT_APP_BASE_URL}api/uploads/founders/pitch/${founder_id}/${pitchfile}`;
    window.open(link, "_blank");
  };

  opendocumentfile = (document, founder_id) => {
    let link = `${process.env.REACT_APP_BASE_URL}api/uploads/founders/documents/${founder_id}/${document}`;
    window.open(link, "_blank");
  };

  xportToCSV = (fileName) => {
    let arr = [];
    let count = 1;
    for (let item of this.state.investors) {
      let status = "";
      if (item.kycstatus == "Approved") {
        status = "Approved";
      } else if (item.kycstatus == "Rejected") {
        status = "Rejected";
      } else if (item.kycstatus == "Pending" || item.kycstatus == "") {
        status = "Pending";
      }
      let obj = {
        "Sr No": count++,
        "Investor Id": item.investor_id,
        Name: item.first_name + " " + item.last_name,
        "Contact No": item.mobile,
        Email: item.email,
        kyc: status,
      };
      arr = [...arr, obj];
      count++;
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Investor data exported successfully.");
  };
  downloadpdf = (item) => {
    this.setState({ modalstatus: true, item: item });
    console.log(item);

  };
  get_assesment_form_details = (item) => {
    console.log(item.main_founder_id,);
    let params = {
      founder_id: item.main_founder_id,
    };
    Bridge.admin.get_assesment_form_details(params).then((result) => {
      if (result.status == 1) {
       
        if ([result.data].length > 0 && [result.data1].length > 0) {
          // console.log('arr',arr);
          this.export_assesment_form(
            result.data,
          
          );
        } else {
          message.warn("Data is not available.");
          return;
        }
      } else {
      }
    });
  };
  export_assesment_form = (arr) => {
    let fileName = "Assessment Form Details";
    const wb = XLSX.utils.book_new();
    let mergeArr = [];
    console.log("before",arr);

    // Assesment Details
    let col1Head = [
      {
        v: "Name",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Email",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Role type",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
    ];
    mergeArr.push(col1Head);
    console.log(mergeArr);
    // for (let i in arr1) {
    //   let item = arr1[i];
    //   var da1 = [
    //     { v: item.as_by_name ? item.as_by_name : "---" },
    //     { v: item.as_by_email ? item.as_by_email : "---" },
    //     { v: item.role_type ? item.role_type : "---" },
    //   ];
    //   mergeArr.push(da1);
    // }
    for (let i = 0; i < 3; i++) {
      let d2_spac = [{ v: "" }, { v: "" }, { v: "" }];
      mergeArr.push(d2_spac);
    }

    // Self Assesment for Founder
    let colHeadF = [
      {
        v: "Name (Founder Self Assessment)",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Mobile Number",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "LinkedIn Profile URL",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Time Commitment",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Education, Institute, Year",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Year of Experience",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Previous employment briefs",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Brief family background",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Any other specific information",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Date of Joining the business",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Your Strength",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Your Weakness",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "What are your dreams?",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "What is your long-term vision?",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "What is your short-term vision/goal?",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Leadership Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Understanding of Finance Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Understanding of HR  Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Understanding of Law and Statutory Compliances  Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Passion for business Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Passion for Current Project Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Experimental Mindset Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Out of Box Thinking Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Problem Solving Skills Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Networking - Business Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Networking - Social Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
    ];

    mergeArr.push(colHeadF);

    for (var i in arr) {
      let item = arr[i];
      if (item.role_type == "founder" ) {
        var da = [
          { v: item.name ? item.name : "---" },
          //  {"v":item.name?item.name:'---'},
          { v: item.mobile ? item.mobile : "---" },
          { v: item.linkedIn ? item.linkedIn : "---" },
          { v: item.timeCommitment ? item.timeCommitment : "---" },
          { v: item.educationInstitute ? item.educationInstitute : "---" },
          { v: item.yearsOfExperience ? item.yearsOfExperience : "---" },
          { v: item.previousEmployment ? item.previousEmployment : "---" },
          {
            v: item.briefFamilyBackground ? item.briefFamilyBackground : "---",
          },
          { v: item.anyOtherSpecificInfo ? item.anyOtherSpecificInfo : "---" },
          { v: item.dtOfJoinBusiness ? item.dtOfJoinBusiness : "---" },
          { v: item.strength ? item.strength : "---" },
          { v: item.weakness ? item.weakness : "---" },
          { v: item.dreams ? item.dreams : "---" },
          { v: item.longTermVision ? item.longTermVision : "---" },
          { v: item.shortTermVision ? item.shortTermVision : "---" },
          { v: item.leadership ? item.leadership : "---" },
          { v: item.leaderShipReview ? item.leaderShipReview : "---" },
          { v: item.understanding_finance ? item.understanding_finance : "--" },
          {
            v: item.understandFinanceReview
              ? item.understandFinanceReview
              : "---",
          },
          { v: item.understanding_hr ? item.understanding_hr : "---" },
          { v: item.understandHrReview ? item.understandHrReview : "---" },
          { v: item.understanding_low ? item.understanding_low : "---" },
          { v: item.understandLawReview ? item.understandLawReview : "---" },
          { v: item.passion_of_business ? item.passion_of_business : "---" },
          {
            v: item.passionBusinessReview ? item.passionBusinessReview : "---",
          },
          {
            v: item.passion_for_current_project
              ? item.passion_for_current_project
              : "---",
          },
          {
            v: item.passionCurProjectReview
              ? item.passionCurProjectReview
              : "---",
          },
          { v: item.experimental_mindset ? item.experimental_mindset : "---" },
          {
            v: item.experimentalMindsetReview
              ? item.experimentalMindsetReview
              : "---",
          },
          { v: item.out_of_box_thinking ? item.out_of_box_thinking : "---" },
          { v: item.outOfBoxReview ? item.outOfBoxReview : "---" },
          { v: item.problem_solving ? item.problem_solving : "---" },
          { v: item.problemSolvingReview ? item.problemSolvingReview : "---" },
          { v: item.network_business ? item.network_business : "---" },
          {
            v: item.networkBusinessReview ? item.networkBusinessReview : "---",
          },
          { v: item.network_social ? item.network_social : "---" },
          { v: item.networkSocialReview ? item.networkSocialReview : "---" },
        ];
        mergeArr.push(da);
      }
    }

    for (let i = 0; i < 3; i++) {
      let d2_spac = [{ v: "" }, { v: "" }, { v: "" }];
      mergeArr.push(d2_spac);
    }

    // Self Assesment for Core-Team-Member
    let colHeadC = [
      {
        v: "Name (Core-Team-Member Self Assessment)",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Mobile Number",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "LinkedIn Profile URL",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Time Commitment",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Education, Institute, Year",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Year of Experience",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Previous employment briefs",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Brief family background",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Any other specific information",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Date of Joining the business",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Your Strength",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Your Weakness",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "What are your dreams?",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "What is your long-term vision?",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "What is your short-term vision/goal?",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Leadership Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Understanding of Finance Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Understanding of HR  Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Understanding of Law and Statutory Compliances  Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Passion for business Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Passion for Current Project Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Experimental Mindset Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Out of Box Thinking Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Problem Solving Skills Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Networking - Business Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Networking - Social Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Please support your rating with some justification, examples",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
    ];
    mergeArr.push(colHeadC);

    for (var i in arr) {
      let item = arr[i];
      if (
        item.role_type == "core-team-member" ) {
       
        var da = [
          { v: item.name ? item.name : "---" },
          { v: item.mobile ? item.mobile : "---" },
          { v: item.linkedIn ? item.linkedIn : "---" },
          { v: item.timeCommitment ? item.timeCommitment : "---" },
          { v: item.educationInstitute ? item.educationInstitute : "---" },
          { v: item.yearsOfExperience ? item.yearsOfExperience : "---" },
          { v: item.previousEmployment ? item.previousEmployment : "---" },
          {
            v: item.briefFamilyBackground ? item.briefFamilyBackground : "---",
          },
          { v: item.anyOtherSpecificInfo ? item.anyOtherSpecificInfo : "---" },
          { v: item.dtOfJoinBusiness ? item.dtOfJoinBusiness : "---" },
          { v: item.strength ? item.strength : "---" },
          { v: item.weakness ? item.weakness : "---" },
          { v: item.dreams ? item.dreams : "---" },
          { v: item.longTermVision ? item.longTermVision : "---" },
          { v: item.shortTermVision ? item.shortTermVision : "---" },
          { v: item.leadership ? item.leadership : "---" },
          { v: item.leaderShipReview ? item.leaderShipReview : "---" },
          { v: item.understanding_finance ? item.understanding_finance : "--" },
          {
            v: item.understandFinanceReview
              ? item.understandFinanceReview
              : "---",
          },
          { v: item.understanding_hr ? item.understanding_hr : "---" },
          { v: item.understandHrReview ? item.understandHrReview : "---" },
          { v: item.understanding_low ? item.understanding_low : "---" },
          { v: item.understandLawReview ? item.understandLawReview : "---" },
          { v: item.passion_of_business ? item.passion_of_business : "---" },
          {
            v: item.passionBusinessReview ? item.passionBusinessReview : "---",
          },
          {
            v: item.passion_for_current_project
              ? item.passion_for_current_project
              : "---",
          },
          {
            v: item.passionCurProjectReview
              ? item.passionCurProjectReview
              : "---",
          },
          { v: item.experimental_mindset ? item.experimental_mindset : "---" },
          {
            v: item.experimentalMindsetReview
              ? item.experimentalMindsetReview
              : "---",
          },
          { v: item.out_of_box_thinking ? item.out_of_box_thinking : "---" },
          { v: item.outOfBoxReview ? item.outOfBoxReview : "---" },
          { v: item.problem_solving ? item.problem_solving : "---" },
          { v: item.problemSolvingReview ? item.problemSolvingReview : "---" },
          { v: item.network_business ? item.network_business : "---" },
          {
            v: item.networkBusinessReview ? item.networkBusinessReview : "---",
          },
          { v: item.network_social ? item.network_social : "---" },
          { v: item.networkSocialReview ? item.networkSocialReview : "---" },
        ];
        mergeArr.push(da);
      }
    }

    for (let i = 0; i < 3; i++) {
      let d2_spac = [{ v: "" }, { v: "" }, { v: "" }];
      mergeArr.push(d2_spac);
    }

    // Self Assesment for Advisor
    let colHeadA = [
      {
        v: "Name (Advisor Self Assessment)",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Mobile Number",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "LinkedIn Profile URL",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Credentials",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Specific responsibilities",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Commericals and other terms",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Is it a formal appointment",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Date of Joining the business",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
    ];

    mergeArr.push(colHeadA);

    for (var i in arr) {
      let item = arr[i];
      if (item.role_type == "advisor" && item.as_by_name == item.name) {
        var da = [
          { v: item.name ? item.name : "---" },
          { v: item.mobile ? item.mobile : "---" },
          { v: item.linkedIn ? item.linkedIn : "---" },
          { v: item.credentials ? item.credentials : "---" },
          {
            v: item.specific_responsibilities
              ? item.specific_responsibilities
              : "---",
          },
          { v: item.commercialsAndOthers ? item.commercialsAndOthers : "---" },
          { v: item.formalAppointment ? item.formalAppointment : "---" },
          { v: item.dtOfJoinBusiness ? item.dtOfJoinBusiness : "---" },
        ];
        mergeArr.push(da);
      }
    }
    for (let i = 0; i < 3; i++) {
      let d2_spac = [{ v: "" }, { v: "" }, { v: "" }];
      mergeArr.push(d2_spac);
    }

    // Assesment for others

    let colHead = [
      {
        v: "Assessment By",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      {
        v: "Assessment For",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Mobile Number", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      // { v:"LinkedIn Profile URL", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      // { v:"Time Commitment", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      // { v:"Education, Institute, Year", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      // { v:"Year of Experience", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      // { v:"Previous employment briefs", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      // { v:"Brief family background", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      // { v:"Any other specific information", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      // { v:"Date of Joining the business", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      // { v:"Your Strength", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      // { v:"Your Weakness", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      // { v:"What are your dreams?", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      // { v:"What is your long-term vision?", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      // { v:"What is your short-term vision/goal?", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      {
        v: "Leadership Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      {
        v: "Understanding of Finance Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      {
        v: "Understanding of HR  Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      {
        v: "Understanding of Law and Statutory Compliances  Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      {
        v: "Passion for business Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      {
        v: "Passion for Current Project Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      {
        v: "Experimental Mindset Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      {
        v: "Out of Box Thinking Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} },
      {
        v: "Problem Solving Skills Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      {
        v: "Networking - Business Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } },fill: { fgColor: { rgb: "0000FF" } } } },
      {
        v: "Networking - Social Ratings",
        m: "s",
        s: {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0000FF" } },
        },
      },
      // { v:"Please support your rating with some justification, examples", m: "s", s: { font: { bold: true, color: { rgb: "FFFFFF" } } ,fill: { fgColor: { rgb: "0000FF" } }} }
    ];

    mergeArr.push(colHead);

    for (var i in arr) {
      let item = arr[i];
      console.log("cvxvcfg",item);
      if (
        (item.role_type == "advisor" ) ||
        (item.role_type == "core-team-member" &&
          item.as_by_name != item.name) ||
        (item.role_type == "founder" )
      ) {
        var da = [
          { v: item.as_by_name ? item.as_by_name : "---" },
          { v: item.name ? item.name : "---" },
          // {"v":item.mobile?item.mobile:'---'},
          // {"v":item.linkedIn?item.linkedIn:'---'},
          // {"v":item.timeCommitment?item.timeCommitment:'---'},
          // {"v":item.educationInstitute?item.educationInstitute:'---'},
          // {"v":item.yearsOfExperience?item.yearsOfExperience:'---'},
          // {"v":item.previousEmployment?item.previousEmployment:'---'},
          // {"v":item.briefFamilyBackground?item.briefFamilyBackground:'---'},
          // {"v":item.anyOtherSpecificInfo?item.anyOtherSpecificInfo:'---'},
          // {"v":item.dtOfJoinBusiness?item.dtOfJoinBusiness:'---'},
          // {"v":item.strength?item.strength:'---'},
          // {"v":item.weakness?item.weakness:'---'},
          // {"v":item.dreams?item.dreams:'---'},
          // {"v":item.longTermVision?item.longTermVision:'---'},
          // {"v":item.shortTermVision?item.shortTermVision:'---'},
          { v: item.leadership ? item.leadership : "---" },
          // {"v":item.leaderShipReview?item.leaderShipReview:'---'},
          { v: item.understanding_finance ? item.understanding_finance : "--" },
          // {"v":item.understandFinanceReview?item.understandFinanceReview:'---'},
          { v: item.understanding_hr ? item.understanding_hr : "---" },
          // {"v":item.understandHrReview?item.understandHrReview:'---'},
          { v: item.understanding_low ? item.understanding_low : "---" },
          // {"v":item.understandLawReview?item.understandLawReview:'---'},
          { v: item.passion_of_business ? item.passion_of_business : "---" },
          // {"v":item.passionBusinessReview?item.passionBusinessReview:'---'},
          {
            v: item.passion_for_current_project
              ? item.passion_for_current_project
              : "---",
          },
          // {"v":item.passionCurProjectReview?item.passionCurProjectReview:'---'},
          { v: item.experimental_mindset ? item.experimental_mindset : "---" },
          // {"v":item.experimentalMindsetReview?item.experimentalMindsetReview:'---'},
          { v: item.out_of_box_thinking ? item.out_of_box_thinking : "---" },
          // {"v":item.outOfBoxReview?item.outOfBoxReview:'---'},
          { v: item.problem_solving ? item.problem_solving : "---" },
          // {"v":item.problemSolvingReview?item.problemSolvingReview:'---'},
          { v: item.network_business ? item.network_business : "---" },
          // {"v":item.networkBusinessReview?item.networkBusinessReview:'---'},
          { v: item.network_social ? item.network_social : "---" },
          // {"v":item.networkSocialReview?item.networkSocialReview:'---'},
        ];
        mergeArr.push(da);
      }
    }

    console.log(mergeArr);

    const ws = XLSX.utils.aoa_to_sheet(mergeArr);
    ws["!cols"] = [
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
      { wch: 30 },
      { wch: 30 },
      { wch: 40 },
      { wch: 30 },
      { wch: 40 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, "Assessment");
    XLSX.writeFile(wb, fileName + fileExtension);
    message.success("Assessment form detail list is exported successfully.");
  };
  
  render() {
    const disdingname= (datas) => {
      const data = [...this.state.list]
        .map((el) => {
          return { ...el, main_founder_id: Number(el.main_founder_id  ) };
        })
        .sort((a, b) => {
          console.log(datas);
          return a.datas> b.datas ? 1 : -1;
        });
      this.setState({
        list: data,
      });
      console.log(data);
    
  };
    const dataSource =
      this.state.list &&
      this.state.list.map((item, index) => {
        return {
          key: index,
          srno: index + 1,
          founder_id: item.main_founder_id,
          startup:item.startup_name,
          Name: item.primary_contact_person_name
            ? item.primary_contact_person_name
            : "---",
          pitch: item,
          document: item,
        };
      });
    const columns = [
      {
        title: "Sr No.",
        dataIndex: "srno",
        key: "srno",
        width: 160,
        fixed: "left",
      },
      {
        title: <span
        onClick={() => {
          disdingname("main_founder_id")
        }}
      >Founder Id</span>,
        dataIndex: "founder_id",
        key: "founder_id",
        width: 160,
        fixed: "left",
      },
      {
        title: "Founder Name",
        dataIndex: "Name",
        key: "Name",
        width: 160,
        fixed: "left",
      },
      {
        title: "Startup",
        dataIndex: "startup",
        key: "startup",
        width: 160,
        fixed: "left",
      },
      {
        title: "Pitch",
        dataIndex: "pitch",
        key: "pitch",
        width: 180,
        render: (text) => {
          let pitchfile = text.pitch;
          let founder_id = text.main_founder_id;
          return (
            <div>
              {pitchfile ? (
                <Button
                  type="primary"
                  onClick={() => this.openpitchfile(pitchfile, founder_id)}
                >
                  Open Link
                </Button>
              ) : (
                <p>Not Available.</p>
              )}
            </div>
          );
        },
      },
      {
        title: "Document",
        dataIndex: "document",
        key: "document",
        width: 180,
        render: (text) => {
          let documents = text.documents;
          // documents = JSON.parse(documents);
          let founder_id = text.main_founder_id;
          return (
            <div>
              {documents ? (
                <Button
                  type="primary"
                  onClick={() => this.opendocumentfile(documents, founder_id)}
                >
                  Open Link
                </Button>
              ) : (
                <p>Not Available.</p>
              )}
            </div>
          );
        },
      },
      {
        title: "Founder",
        dataIndex: "document",
        key: "document",
        width: 340,
        render: (text) => {
          let filename = "Startup Form Details";
          return (
            <div>
              {/* <Link  to={{
            pathname: "/admin-founder-dashboard",
            state: { item:text}
          }} > */}
              <Button type="primary" onClick={() => this.downloadpdf(text)}>
                View Details{" "}
                <i
                  className="bx bx-cloud-download ps-2"
                  style={{ fontSize: "1rem" }}
                  ></i>
              </Button>{" "}
                  {/* </Link> */}
              &nbsp;&nbsp;
              <Button
                type="primary"
                onClick={() => this.exportToCSVF(filename, text)}
              >
                Download Xlsx{" "}
                <i
                  className="bx bx-cloud-download ps-2"
                  style={{ fontSize: "1rem" }}
                ></i>
              </Button>
            </div>
          );
        },
      },
      {
        title: "Assessment",
        dataIndex: "document",
        key: "document",
        width: 180,
        render: (text) => {
          let documents = text.documents;
          let founder_id = text.main_founder_id;
          return (
            <div>
              <Button
                type="primary"
                onClick={() => this.get_assesment_form_details(text)}
              >
                Download Xlsx{" "}
                <i
                  className="bx bx-cloud-download ps-2"
                  style={{ fontSize: "1rem" }}
                ></i>
              </Button>
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

            <Content className="home-section">
              <Card title="Founder Documents" style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Founder Documents</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />

                <div>
                  <Input
                    value={this.state.searchinput}
                    placeholder="Search"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                  {/* <Button 
                type='primary' 
                onClick={()=>this.exportToCSV('Form Founder list')}
              >
                <i className='bx bxs-cloud-download' 
                style={{ 
                  color:'#fff',
                  position:'relative',
                  top:3,
                  left:-3
              }}
                ></i> Export Data
              </Button> */}
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={this.state.loading}
                    bordered
                    scroll={{ x: "max-content" }}
                  />
                </div>
              </Card>
            </Content>

            <BottomBar />
          </Layout>
        </Layout>

        <Modal
          title="View Form"
          visible={this.state.modalstatus}
          onOk={this.handleok}
          onCancel={() => this.setState({ modalstatus: false, item: [] })}
          width={1000}
          footer={false}
        >
          <div>
            <div style={{ padding: "20px 30px" }}>
              {/* <ReactToPrint
                content={() => this.componentRef}
                trigger={() => (
                  <Button
                    type="primary"
                    style={{ width: 80, float: "right", marginBottom: "15px" }}
                  >
                    Print
                  </Button>
                )}
              /> */}
            </div>
            {/* {this.state.item &&this.state.item ?  <TableComponent
              ref={(response) => (this.componentRef = response)}
              item={this.state.item}
            />
            :""} */}
          
            
          
          </div>
        {this.state.item &&this.state.item ? <Founderadmindashboard id={this.state.item.main_founder_id} tab={this.state.item} view={0}/>
            :""}
            </Modal>
      </>
    );
  }
}

export default Founderformdetails;
