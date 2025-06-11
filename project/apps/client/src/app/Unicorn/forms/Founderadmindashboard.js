import React, { Component } from "react";
import { Modal, Spin, Steps, message } from "antd";

// Mandatory Forms
import BasicDetails from "./BasicDetails";
import Step20 from "./SupportingDocuments";
import Step8 from "./CompanyLegalEntity";
import Step9 from "./SocialMediaPresence";
import Dellistinicorn from "./Deallist.js";
import Mediacoverager from "./Mediacoverager.js";
import Step19 from "./Declaration";

// Additional Information Forms
import Step2 from "./IdeaBusiness";
import Step3 from "./IntellectualProperty";
import Step4 from "./MobileApp";
import Step5 from "./IndustryMarket";
import Step6 from "./Competition";
import Step7 from "./SWOT";
import Step10 from "./GoToMarket";
import Step11 from "./Financials";
import Step12 from "./Capital";
import Step13 from "./Salaries";
import Step14 from "./FundingDetails";
import Step15 from "./UseOfFunds";
import Step16 from "./Compliances";
import Step17 from "./OtherImportantIndicators";
import Step18 from "./Refrences";



import { Previewbutton } from "./Previewbutton.jsx";
import Bridge from "../../constants/Bridge";
import $ from "jquery";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

class Founderadmindashboard extends Component {
  constructor(props) {
    super(props);
    
    this.additionalSteps = [
      "Basic Details",
      "Supporting Documents",
      "Social Media Presence",
      "Other info",
      "Media Coverage",
      "Declaration",
      "Company Legality Entity",
      "Idea/Business", 
      "Intellectual Property",
      "Mobile App",
      "Industry Market",
      "Competition",
      "SWOT",
      "Go To Market",
      "Financials",
      "Capital",
      "Salaries",
      "Funding Details",
      "Use Of Funds",
      "Compliances",
      "Other Important Indicators",
      "References",
    ];

    this.formConfig = [
      BasicDetails, 
      Step20,
      Step9,
      Dellistinicorn,
      Mediacoverager,
      Step19,
      Step8,
      Step2,
      Step3,
      Step4,
      Step5,
      Step6,
      Step7,
      Step10,
      Step11,
      Step12,
      Step13,
      Step14,
      Step15,
      Step16,
      Step17,
      Step18
    ]

    this.state = {
      activeform: "0",
      class0: "",
      class1: "",
      class2: "",
      class3: "",
      class4: "",
      class5: "",
      class6: "",
      class7: "",
      class8: "",
      class9: "",
      class10: "",
      class11: "",
      class12: "",
      class13: "",
      class14: "",
      class15: "",
      class16: "",
      class17: "",
      class18: "",
      class19: "",
      class20: "",
      class21: "",

      error_status_0: "",
      error_status_1: "",
      error_status_2: "",
      error_status_3: "",
      error_status_4: "",
      error_status_5: "",
      error_status_6: "",
      error_status_7: "",
      error_status_8: "",
      error_status_9: "",
      error_status_10: "",
      error_status_11: "",
      error_status_12: "",
      error_status_13: "",
      error_status_14: "",
      error_status_15: "",
      error_status_16: "",
      error_status_17: "",
      error_status_18: "",
      error_status_19: "",
      error_status_20: "",
      error_status_21: "",

      validated: false,
      f1_status: "",
      f2_status: "",
      f3_status: "",
      f4_status: "",
      f5_status: "",
      f6_status: "",
      f7_status: "",
      f8_status: "",
      f9_status: "",
      f10_status: "",
      f11_status: "",
      f12_status: "",
      f13_status: "",
      f14_status: "",
      f15_status: "",
      f16_status: "",
      f17_status: "",
      f18_status: "",
      f19_status: "",
      f20_status: "",
      showInstruction: false,
      i: 5,
      loading: false,
      unicorn: {
        tudStartupName: "",
        tudEmail: "",
        tudPrimaryContactName: "",
        tudCountryCode: "",
        tudPrimaryContactMobile: "",
        tudPrimaryContactEmail: "",
        tudDisruptingMarket: "",
        tudTappingNew: "",
        tudCustomerBenifit: "",
        tudSuppliersBenifit: "",
        tudDirectSubstitueAvailable: "",
        tudIndirectSubstitueAvailable: "",
        tudRiskPerceived: "",
        tudRolesCoreTeam: "",
        tudMoats: "",
        tudScaleupChallenges: "",
        tudTrademark: "",
        tudPatents: "",
        tudOtherIPs: "",
        tudOtherDetailsIPs: "",
        tudIPsRegistrationInfo: "",
        tudAndroidMobileApp: "",
        tudAndroidAppDetails: "",
        tudIphoneMobileApp: "",
        tudIphoneAppDetails: "",
        tudIndustryClassification: "",
        tudIndustryViews: "",
        tudIndustryMarketSize: "",
        tudSupportingInfoMarketSize: "",
        tudAddressableMarketSize: "",
        tudSupportingInfoAddressableMarketSize: "",
        tudLocalDirectComp: "",
        tudLocalIndirectComp: "",
        tudGlobalDirectComp: "",
        tudGlobalIndirectComp: "",
        tudDiffCompetion: "",
        tudWhyCompSame: "",
        tudUnfairAdv: "",
        tudLikeCompetion: "",
        tudFailVenture: "",
        tudFailureReason: "",
        tudStrength: "",
        tudWeakness: "",
        tudOpportunities: "",
        tudThreats: "",
        tudLeagalName: "",
        tudWebsite: "",
        tudLegalCin: "",
        tudLegalPan: "",
        tudLegalCountry: "",
        tudEstablishedDate: "",
        tudActivityStartedDate: "",
        tudRegisteredOffice: "",
        tudCorporateOffice: "",
        tudDirector1: "",
        tudDin1: "",
        tudDirector2: "",
        tudDin2: "",
        tudDirector3: "",
        tudDin3: "",
        tudDirector4: "",
        tudDin4: "",
        tudSocialInsta: "",
        tudSocialFacebook: "",
        tudSocialLinkedIn: "",
        tudSocialYouTube: "",
        tudSocialOthers: "",
        tudGtmStratergy: "",
        tudGtmBackup: "",
        tudExistingCac: "",
        tudExpectedCac: "",
        tudLogicCac: "",
        tudLtvCustomer: "",
        tudLogicLtvNumber: "",
        tudLtvCacRatio: "",
        tudNumberofClients: "",
        tudClientRetentions: "",
        tudRevenueTop10: "",
        tudUnitEconomics: "",
        tudTotalCapEx: "",
        tudAmountSpentProdDev: "",
        tudMajorExpInv: "",
        tudAuthorisedCap: "",
        tudPaidupCapi: "",
        tudFounderPer: "",
        tudCorePer: "",
        tudEsopPer: "",
        tudOtherPer: "",
        tudAmountByFounder: "",
        tudUnsecLoanFounder: "",
        tudUnsecLoanOthers: "",
        tudOtherLoan: "",
        tudFounderSalary: "",
        tudFounderSalaryPlan: "",
        tudCoreTeamSalary: "",
        tudTotalSalary: "",
        tudPreviousFundRaised: "",
        tudFundRequired: "",
        tudExpRunway: "",
        tudValueFundRaise: "",
        tudLogicFundRaise: "",
        tudOpentoLower: "",
        tudCapexImmidate: "",
        tudCapexFuture: "",
        tudProductFund: "",
        tudMarketingFund: "",
        tudSalaryFund: "",
        tudCastComFund: "",
        tudOthersFund: "",
        tudRepaymentFund: "",
        tudGstRegistered: "",
        tudGstDetails: "",
        tudAuditedBL: "",
        tudItrFilling: "",
        tudAgm: "",
        tudPendingRoc: "",
        tudPastDelays: "",
        tudOtherApplicableCompliance: "",
        tudCaInfo: "",
        tudCsInfo: "",
        tudOtherLegalInfo: "",
        tudAcceptedDate: "",
        tudPublishedDate: "",
        tudExpiryDate: "",

        tudSaleExitInfo: "",
        tudDepedencyPerson: "",
        tudReglarityIssue: "",
        tudLicPermissionStatus: "",
        tudTeamSize: "",
        tud5perCommission: "",
        tud10perCommission: "",
        tudExitTimeline: "",
        tudSubsidiries: "",
        tudSisterConcerns: "",
        tudRelatedPartyTrans: "",
        tudLegalRisk: "",
        tudFounderExitEarlier: "",
        tudDemoLink: "",
        tudOtherDocsLinks: "",
        tudMediaCoverLinks: "",
        tudAwards: "",
        tudStartupRecon: "",
        tudOtherInfo: "",
        tudCustomerRef: "",
        tudVendorRef: "",
        tudPastEmployerRef: "",
        tudGuideRef: "",
        tudPitchDeck: "",
        tudProductDeck: "",
        tudDoc1: "",
        tudDoc2: "",
        tudDoc3: "",
        tudStartupFounderName: "",
        tudStartupFounderMobileCountryCode: "91",
        tudStartupFounderMobileNumber: "",
        tudStartupFounderEmail: "",
        tudDealShowDateForRegularMember: "",
        tudDealShowDateForPremiumMember: "",
        tudDealStartDateForRegularMember: "",
        tudDealStartDateForPremiumMember: "",
        tudDealEndDateForRegularMember: "",
        tudDealEndDateForPremiumMember: "",
        tudTargetAmount: "",
        tudMinInvestmentAmount: "",
        tudCAPTableThresholdAmount: "",
        tudMaxInvestmentAmount: "",
        tudCAPTableMultiple: "",
        tudMultiplesOf: "",
        tudRaiseGap: "",
        tudEnableSpecialOffer: "",
        tudSpecialOfferText: "",
        tudInputDefaultText: "",
        tudDiscount: "",
        tudEscrowAccountName: "",
        tudEscrowAccountNumber: "",
        tudEscrowAccountBank: "",
        tudEscrowAccountBranch: "",
        tudEscrowAccountIFSC: "",
        tudDigioTemplateId: "",
        tudDigioSignforInvestor: "",
        tudDigioSignforFounder: "",
        tudDealDescription: "",
        tudBackedBy: "",
        tudYoutubeLink: "",
        tudCategory: "",
        tudBannerImage: "",
        tudSelectLogo: "",
        tudPageLink: "",
        tudVendorId: "",
        tudStartupHighlights: "",
        tudMediaCoverages: "",
        tudMark: "",
        tudMediaCoverageFiles: "",
        tudValuation: "",
        tudLegalname: "",
        tudFoundedon: "",
        tudLogoImage: "",
        tudAddress: "",
        tudEmployees: "",
        tudFocusedOnProduct: "",
        tudUseofFundRepayment: "",
        tudTempUdID: "",
        show_thankyou_modal: "",
        show_error_modal: false,
        show_confirmation_modal: false,
        show_additional_info_modal: false,
        unicornid: "",
        tudDeclare: 0,
        tudSponsorName: "",
        tudSponsorImage: "",

        founderID: localStorage.getItem("founder_id"),
        tpage4NA: false,
        tpage9NA: false,
        tpage10NA: false,
        tpage13NA: false,
        tpage17NA: false,
        tudTag: "None"
      },
    };
  }

  componentDidMount() {
    this.setState({ activeform: 0 });
    this.getData();
  }

  getData = async (id) => {
    let params = {
      founderID: localStorage.getItem("founder_id") || this.props.adminview,
    };
    let headers = {
      "content-type": "application/json",
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/founder/Startup/unicornListByFounders`,
        params,
        { headers }
      )
      .then(async (result) => {
        if (result.data.data.length == 0) {
          const datas = await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/founder/Startup/createunicorndraft`,
            this.state.unicorn
          );
          this.setState({ tudTempUdID: datas.data.id });
        } else {
          const data = Object.keys(result.data.data[0]).reduce(
            (acc, key, index) => {
              acc[key] = Object.values(result.data.data[0])[index];
              return acc;
            },
            {}
          );
          this.setState({ unicorn: { ...this.state.unicorn, ...data } });
        }

        // if (result.status == 1) {
        //   /// showing for done
        //   if (result.data[0].send_me_copy_of_response) {
        //     // this.setState({class18:' success-tab'});
        //   }
        //   if (
        //     result.data[0].what_valuation_will_safe &&
        //     result.data[0].dependence_on_any_specific_founder &&
        //     result.data[0].regulartory_issues &&
        //     result.data[0].licences_and_permissions &&
        //     result.data[0].team_size &&
        //     result.data[0].is_company_paying_commision_above_5_per &&
        //     result.data[0].is_company_paying_commision_above_10_per &&
        //     result.data[0].possible_exit_opportunities &&
        //     result.data[0].subsidiaries &&
        //     result.data[0].sister_concerns &&
        //     result.data[0].related_party_transactions &&
        //     result.data[0].legal_risk_plan_to_migrate &&
        //     result.data[0].amy_change_by_founders &&
        //     result.data[0].demo_video_link &&
        //     result.data[0].supported_documents &&
        //     result.data[0].media_coverage &&
        //     result.data[0].awards_and_recognitions &&
        //     result.data[0].recognized_as_startup_by_dpiit &&
        //     result.data[0].any_specific_information_to_share
        //   ) {
        //     // this.setState({class16:' success-tab'});
        //   }
        //   if (
        //     result.data[0].are_you_registered_for_gst &&
        //     result.data[0].status_of_gst_compliance &&
        //     result.data[0].date_of_last_audited_balance_sheet &&
        //     result.data[0].date_of_filling_last_itr &&
        //     result.data[0].date_of_last_agm &&
        //     result.data[0].pending_complience_related_to_roc &&
        //     result.data[0].past_days &&
        //     result.data[0].list_of_other_situatory
        //   ) {
        //     // this.setState({class15:' success-tab'});
        //   }
        //   if (
        //     result.data[0].funds_required &&
        //     result.data[0].expected_runway_with_current_fund_raise &&
        //     result.data[0].desired_valuation_for_current_fund_raise &&
        //     result.data[0].logic_for_desired_valuation &&
        //     result.data[0].are_you_open_to_consider_logical_lower_valuation &&
        //     result.data[0].capex_immediately &&
        //     result.data[0].capex_future_plans &&
        //     result.data[0].use_of_funds_product_development &&
        //     result.data[0].use_of_funds_marketing &&
        //     result.data[0].use_of_funds_repayment &&
        //     result.data[0].use_of_funds_salaries_in_per &&
        //     result.data[0].use_of_funds_cost_and_commision &&
        //     result.data[0].use_of_funds_other &&
        //     result.data[0].are_you_open_to_consider_logical_lower_valuation
        //   ) {
        //     // this.setState({class14:' success-tab'});
        //   }
        //   if (result.data[0].have_you_raised_fund_for_startup) {
        //     // this.setState({class13:' success-tab'});
        //   }
        //   if (
        //     result.data[0].founders_current_salery &&
        //     result.data[0].date_of_last_increase_founders_salary &&
        //     result.data[0].core_team_current_salary &&
        //     result.data[0].total_salary_including_core_team_salary
        //   ) {
        //     // this.setState({class12:' success-tab'});
        //   }
        //   if (
        //     result.data[0].authorized_captial_of_company &&
        //     result.data[0].paid_up_capital_company &&
        //     result.data[0].percentage_holding_by_core_team &&
        //     result.data[0].reserved_for_esop &&
        //     result.data[0].percentage_holding_of_others &&
        //     result.data[0].actual_amount_real_salaries_taken &&
        //     result.data[0].usecure_loans_received_from_founders &&
        //     result.data[0].usecure_loans_received_from_other &&
        //     result.data[0].any_other_secured_or_ddebt_from_bank
        //   ) {
        //     // this.setState({class11:' success-tab'});
        //   }
        //   if (
        //     result.data[0].name_of_clients &&
        //     result.data[0].client_retention &&
        //     result.data[0].revenue_top_5_clients &&
        //     result.data[0].explaination_economics_of_startup &&
        //     result.data[0].total_amount_spent_of_product &&
        //     result.data[0].major_expense_till_date
        //   ) {
        //     // this.setState({class10:' success-tab'});
        //   }
        //   if (
        //     result.data[0].primary_gtm_strategy &&
        //     result.data[0].backup_plan_for_strategy &&
        //     result.data[0].existing_cas &&
        //     result.data[0].expected_cac_in_future &&
        //     result.data[0].rational_behinde_any_change_in_cac &&
        //     result.data[0].ltv_of_customer &&
        //     result.data[0].rational_behind_ltv_number &&
        //     result.data[0].ltv_to_cac_ratio
        //   ) {
        //     // this.setState({class9:' success-tab'});
        //   }
        //   if (
        //     result.data[0].linkdin ||
        //     result.data[0].facebook ||
        //     result.data[0].instagram ||
        //     result.data[0].youtube ||
        //     result.data[0].others
        //   ) {
        //     // this.setState({class8:' success-tab'});
        //   }
        //   if (
        //     result.data[0].name_of_legality_entity &&
        //     result.data[0].website &&
        //     result.data[0].cin_legality_entity &&
        //     result.data[0].pan_legality_entity &&
        //     result.data[0].registered_in_country &&
        //     result.data[0].formality_established_date &&
        //     result.data[0].activities_start_date_befire_formal &&
        //     result.data[0].address_registered_office &&
        //     result.data[0].address_corporate_office &&
        //     result.data[0].director_1_name &&
        //     result.data[0].director_1_din &&
        //     result.data[0].director_2_name &&
        //     result.data[0].director_2_din &&
        //     result.data[0].director_3_name &&
        //     result.data[0].director_3_din &&
        //     result.data[0].director_4_name &&
        //     result.data[0].director_4_din
        //   ) {
        //     // this.setState({class7:' success-tab'});
        //   }
        //   if (
        //     result.data[0].strength_of_your_startup &&
        //     result.data[0].weakness_of_startup &&
        //     result.data[0].opportunities_for_startup &&
        //     result.data[0].threats_for_startup
        //   ) {
        //     // this.setState({class6:' success-tab'});
        //   }
        //   if (
        //     result.data[0].direct_local_competition &&
        //     result.data[0].in_direct_local_competition &&
        //     result.data[0].direct_global_competition &&
        //     result.data[0].indirect_global_competition &&
        //     result.data[0].how_different_startup_from_competition &&
        //     result.data[0].why_difficult_competition &&
        //     result.data[0].what_are_unfair_disadvantages &&
        //     result.data[0].most_about_your_competition
        //   ) {
        //     // this.setState({class5:' success-tab'});
        //   }
        //   if (
        //     result.data[0].relevant_industry &&
        //     result.data[0].views_on_industry &&
        //     result.data[0].total_market_size_of_industry &&
        //     result.data[0].supporting_information_of_narket_size &&
        //     result.data[0].addressale_market_size &&
        //     result.data[0]
        //       .supporting_information_of_demarking_addressable_market
        //   ) {
        //     // this.setState({class4:' success-tab'});
        //   }
        //   if (
        //     result.data[0].have_any_android_app_startup &&
        //     result.data[0].have_ios_app
        //   ) {
        //     // this.setState({class3:' success-tab'});
        //   }
        //   if (
        //     result.data[0].trademark &&
        //     result.data[0].patents &&
        //     result.data[0].other_ips &&
        //     result.data[0].all_iprs_rwgistered_in_company
        //   ) {
        //     // this.setState({class2:' success-tab'});
        //   }
        //   if (
        //     result.data[0].is_disrupting_existing_market &&
        //     result.data[0].is_targeting_new_untabed_market &&
        //     result.data[0].customer_benifit &&
        //     result.data[0].suplier_benifit &&
        //     result.data[0].focused_on_product &&
        //     result.data[0].direct_substitute_available &&
        //     result.data[0].indirect_substitute_available &&
        //     result.data[0].risks_perceived &&
        //     result.data[0].responsibilities_distributted_members &&
        //     result.data[0].moats &&
        //     result.data[0].challenges_for_scale_up
        //   ) {
        //     // this.setState({class1:' success-tab'});
        //   }
        //   if (
        //     result.data[0].email &&
        //     result.data[0].startup_name &&
        //     result.data[0].primary_contact_person_name &&
        //     result.data[0].primary_contact_person_mobile
        //   ) {
        //     // this.setState({class0:' success-tab'});
        //   }
        // }
      });
  };

  activeform = (value) => {
    this.setState({ activeform: value });
    $("html, body").animate({ scrollTop: 0 }, 1000);
  };

  onChange = (value) => {
    this.setState({ activeform: value });
  };

  activethistab = (num) => {
    this.setState({ activeform: num });
    $("html, body").animate({ scrollTop: 0 }, 1000);
  };

  checkforvalidation = (ind) => {
    let params = {
      founderID: localStorage.getItem("founder_id"),
    };
  
    // if (result.status == 1) {
    //   let validate = false;

    //   /// showing for done
    //   // if (result.data[0].pitch && result.data[0].f19_status == "success") {
    //   //   this.setState({ class18: " success-tab", error_status_18: "1" });
    //   //   validate = true;
    //   // } else if(ind==-1) {
    //   //   this.setState({ class18: " error-tab", error_status_18: "0" });
    //   //   validate = false;
    //   // }

    //   // this.setState({ class17: " success-tab", error_status_17: "1" });
    //   // validate = true;

    //   if (
    //     result.data[0].f17_status == "success" &&
    //     result.data[0].what_valuation_will_safe &&
    //     result.data[0].dependence_on_any_specific_founder &&
    //     result.data[0].regulartory_issues &&
    //     result.data[0].licences_and_permissions &&
    //     result.data[0].team_size &&
    //     result.data[0].is_company_paying_commision_above_5_per &&
    //     result.data[0].is_company_paying_commision_above_10_per &&
    //     result.data[0].possible_exit_opportunities &&
    //     result.data[0].subsidiaries &&
    //     result.data[0].sister_concerns &&
    //     result.data[0].related_party_transactions &&
    //     result.data[0].legal_risk_plan_to_migrate &&
    //     result.data[0].amy_change_by_founders
    //     // result.data[0].demo_video_link &&
    //     // result.data[0].supported_documents &&
    //     // result.data[0].media_coverage &&
    //     // result.data[0].awards_and_recognitions &&
    //     // result.data[0].recognized_as_startup_by_dpiit &&
    //     // result.data[0].any_specific_information_to_share
    //   ) {
    //     this.setState({ class16: " success-tab", error_status_16: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class16: " error-tab", error_status_16: "0" });
    //     validate = false;
    //   }

    //   if (
    //     result.data[0].f16_status == "success" &&
    //     result.data[0].are_you_registered_for_gst &&
    //     result.data[0].status_of_gst_compliance &&
    //     result.data[0].date_of_last_audited_balance_sheet &&
    //     result.data[0].date_of_filling_last_itr &&
    //     result.data[0].date_of_last_agm &&
    //     result.data[0].pending_complience_related_to_roc &&
    //     result.data[0].past_days &&
    //     result.data[0].list_of_other_situatory
    //   ) {
    //     this.setState({ class15: " success-tab", error_status_15: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class15: " error-tab", error_status_15: "0" });
    //     validate = false;
    //   }

    //   if (
    //     result.data[0].f15_status == "success" &&
    //     result.data[0].funds_required &&
    //     result.data[0].expected_runway_with_current_fund_raise &&
    //     result.data[0].desired_valuation_for_current_fund_raise &&
    //     result.data[0].logic_for_desired_valuation &&
    //     result.data[0].are_you_open_to_consider_logical_lower_valuation &&
    //     result.data[0].capex_immediately &&
    //     result.data[0].capex_future_plans &&
    //     result.data[0].use_of_funds_product_development &&
    //     result.data[0].use_of_funds_marketing &&
    //     result.data[0].use_of_funds_repayment &&
    //     result.data[0].use_of_funds_salaries_in_per &&
    //     result.data[0].use_of_funds_cost_and_commision &&
    //     result.data[0].use_of_funds_other &&
    //     result.data[0].are_you_open_to_consider_logical_lower_valuation
    //   ) {
    //     this.setState({ class14: " success-tab", error_status_14: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class14: " error-tab", error_status_14: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].have_you_raised_fund_for_startup &&
    //     result.data[0].f14_status == "success"
    //   ) {
    //     this.setState({ class13: " success-tab", error_status_13: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class13: " error-tab", error_status_13: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].founders_current_salery &&
    //     result.data[0].date_of_last_increase_founders_salary &&
    //     result.data[0].core_team_current_salary &&
    //     result.data[0].total_salary_including_core_team_salary &&
    //     result.data[0].f13_status == "success"
    //   ) {
    //     this.setState({ class12: " success-tab", error_status_12: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class12: " error-tab", error_status_12: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].authorized_captial_of_company &&
    //     result.data[0].paid_up_capital_company &&
    //     result.data[0].percentage_holding_by_founders &&
    //     result.data[0].percentage_holding_by_core_team &&
    //     result.data[0].reserved_for_esop &&
    //     result.data[0].percentage_holding_of_others &&
    //     result.data[0].actual_amount_real_salaries_taken &&
    //     result.data[0].usecure_loans_received_from_founders &&
    //     result.data[0].usecure_loans_received_from_other &&
    //     result.data[0].any_other_secured_or_ddebt_from_bank &&
    //     result.data[0].f12_status == "success"
    //   ) {
    //     this.setState({ class11: " success-tab", error_status_11: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class11: " error-tab", error_status_11: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].name_of_clients &&
    //     result.data[0].client_retention &&
    //     result.data[0].revenue_top_5_clients &&
    //     result.data[0].explaination_economics_of_startup &&
    //     result.data[0].total_amount_spent_of_product &&
    //     result.data[0].total_capex_of_startup &&
    //     result.data[0].major_expense_till_date &&
    //     result.data[0].f11_status == "success"
    //   ) {
    //     this.setState({ class10: " success-tab", error_status_10: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class10: " error-tab", error_status_10: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].primary_gtm_strategy &&
    //     result.data[0].backup_plan_for_strategy &&
    //     result.data[0].existing_cas &&
    //     result.data[0].expected_cac_in_future &&
    //     result.data[0].rational_behinde_any_change_in_cac &&
    //     result.data[0].ltv_of_customer &&
    //     result.data[0].rational_behind_ltv_number &&
    //     result.data[0].ltv_to_cac_ratio &&
    //     result.data[0].f10_status == "success"
    //   ) {
    //     this.setState({ class9: " success-tab", error_status_9: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class9: " error-tab", error_status_9: "0" });
    //     validate = false;
    //   }
    //   // this.setState({ class8: " success-tab", error_status_8: "1" });

    //   if (
    //     result.data[0].name_of_legality_entity &&
    //     // result.data[0].website &&
    //     result.data[0].cin_legality_entity &&
    //     result.data[0].pan_legality_entity &&
    //     result.data[0].registered_in_country &&
    //     result.data[0].formality_established_date &&
    //     // result.data[0].activities_start_date_befire_formal &&
    //     result.data[0].address_registered_office &&
    //     result.data[0].address_corporate_office &&
    //     result.data[0].director_1_name &&
    //     result.data[0].director_1_din &&
    //     result.data[0].f8_status == "success"
    //     // result.data[0].director_2_name &&
    //     // result.data[0].director_2_din &&
    //     // result.data[0].director_3_name &&
    //     // result.data[0].director_3_din &&
    //     // result.data[0].director_4_name &&
    //     // result.data[0].director_4_din
    //   ) {
    //     this.setState({ class7: " success-tab", error_status_7: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class7: " error-tab", error_status_7: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].f7_status == "success" &&
    //     result.data[0].strength_of_your_startup &&
    //     result.data[0].weakness_of_startup &&
    //     result.data[0].opportunities_for_startup &&
    //     result.data[0].threats_for_startup
    //   ) {
    //     this.setState({ class6: " success-tab", error_status_6: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class6: " error-tab", error_status_6: "0" });
    //     validate = false;
    //   }

    //   if (
    //     result.data[0].f6_status == "success" &&
    //     result.data[0].direct_local_competition &&
    //     result.data[0].in_direct_local_competition &&
    //     result.data[0].direct_global_competition &&
    //     result.data[0].indirect_global_competition &&
    //     result.data[0].how_different_startup_from_competition &&
    //     result.data[0].why_difficult_competition &&
    //     result.data[0].what_are_unfair_disadvantages &&
    //     result.data[0].most_about_your_competition
    //   ) {
    //     this.setState({ class5: " success-tab", error_status_5: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class5: " error-tab", error_status_5: "0" });
    //     validate = false;
    //   }

    //   if (
    //     result.data[0].f5_status == "success" &&
    //     result.data[0].relevant_industry &&
    //     result.data[0].views_on_industry &&
    //     result.data[0].total_market_size_of_industry &&
    //     result.data[0].supporting_information_of_narket_size &&
    //     result.data[0].addressale_market_size &&
    //     result.data[0].supporting_information_of_demarking_addressable_market
    //   ) {
    //     this.setState({ class4: " success-tab", error_status_4: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class4: " error-tab", error_status_4: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].have_any_android_app_startup &&
    //     result.data[0].f4_status == "success" &&
    //     result.data[0].have_ios_app
    //   ) {
    //     this.setState({ class3: " success-tab", error_status_3: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class3: " error-tab", error_status_3: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].f3_status == "success" &&
    //     result.data[0].trademark &&
    //     result.data[0].patents &&
    //     result.data[0].other_ips &&
    //     result.data[0].all_iprs_rwgistered_in_company
    //   ) {
    //     this.setState({ class2: " success-tab", error_status_2: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class2: " error-tab", error_status_2: "0" });
    //     validate = false;
    //   }
    //   if (result.data[0].f9_status == "success") {
    //     this.setState({ class8: " success-tab", error_status_8: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class8: " error-tab", error_status_8: "0" });
    //     validate = false;
    //   }
    //   if (result.data[0].f18_status == "success") {
    //     this.setState({ class17: " success-tab", error_status_17: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class17: " error-tab", error_status_17: "0" });
    //     validate = false;
    //   }
    //   if (result.data[0].f19_status == "success") {
    //     this.setState({ class18: " success-tab", error_status_18: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class18: " error-tab", error_status_18: "0" });
    //     validate = false;
    //   }
    //   if (
    //     result.data[0].f2_status == "success" &&
    //     result.data[0].is_disrupting_existing_market &&
    //     result.data[0].is_targeting_new_untabed_market &&
    //     result.data[0].customer_benifit &&
    //     result.data[0].suplier_benifit &&
    //     result.data[0].focused_on_product &&
    //     result.data[0].direct_substitute_available &&
    //     result.data[0].indirect_substitute_available &&
    //     result.data[0].risks_perceived &&
    //     result.data[0].responsibilities_distributted_members &&
    //     result.data[0].moats &&
    //     result.data[0].challenges_for_scale_up
    //   ) {
    //     this.setState({ class1: " success-tab", error_status_1: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class1: " error-tab", error_status_1: "0" });
    //     validate = false;
    //   }
    //   // basic details
    //   if (
    //     result.data[0].email &&
    //     result.data[0].startup_name &&
    //     result.data[0].primary_contact_person_name &&
    //     result.data[0].primary_contact_person_mobile &&
    //     result.data[0].f1_status == "success"
    //   ) {
    //     this.setState({ class0: " success-tab", error_status_0: "1" });
    //     validate = true;
    //   } else if (ind == -1) {
    //     this.setState({ class0: " error-tab", error_status_0: "0" });
    //     validate = false;
    //   }

    //   this.setState({ validated: validate });
    // }
    // }
    // );
  };

  onInput = (names, value) => {
    this.setState({
      unicorn: {
        ...this.state.unicorn,
        [names]: value,
      },
    });
  };

  setMultiple = (data) => {
    this.setState({
      unicorn: {
        ...this.state.unicorn,
        ...data
      },
    });
  };


  publishunicorn = () => {
    this.setState({ loading: true });
    
    const page1requiredFields = [
      'tudStartupName'
    ];

    const isPage1FormInvalid = page1requiredFields.some(field => 
      !this.state.unicorn[field] || this.state.unicorn[field].trim() === ''
    );
    
    if (isPage1FormInvalid) {
      this.setState({ loading: false });
      this.activeform(0);
      toast.error("Please fill Basic Details Section");
      return;
    }

    if (
      !this.state.unicorn.tudMark ||
      this.state.unicorn.tudMark == "" ||
      (() => {
        try {
          const tudMarkArray = JSON.parse(this.state.unicorn.tudMark);
          // Check if it's an array with exactly 3 members
          if (!Array.isArray(tudMarkArray) || tudMarkArray.length !== 3) {
            return true; // validation failed
          }
          // Check if each member has content1 key and non-empty value
          return tudMarkArray.some(item => !item.content1 || item.content1.trim() === "");
        } catch (e) {
          return true; // JSON parse failed, validation failed
        }
      })() ||
      !this.state.unicorn.tudStartupHighlights ||
      this.state.unicorn.tudStartupHighlights == "" ||
      (() => {
        try {
          const tudStartupHighlightArray = JSON.parse(this.state.unicorn.tudStartupHighlights);
          // Check if it's an array with exactly 3 members
          if (!Array.isArray(tudStartupHighlightArray) || tudStartupHighlightArray.length !== 4) {
            return true; // validation failed
          }
          // Check if each member has content1 key and non-empty value
          return tudStartupHighlightArray.some(item => !item.content1 || item.content1.trim() === "");
        } catch (e) {
          return true; // JSON parse failed, validation failed
        }
      })() ||
      !this.state.unicorn.tudLogoImage ||
      this.state.unicorn.tudLogoImage == "" ||
      !this.state.unicorn.tudBannerImage ||
      this.state.unicorn.tudBannerImage == "" ||
      !this.state.unicorn.tudPitchDeck ||
      this.state.unicorn.tudPitchDeck == "" ||
      (this.state.unicorn.tudSponsorName != "" && this.state.unicorn.tudSponsorImage == "") || 
      (this.state.unicorn.tudSponsorName == "" && this.state.unicorn.tudSponsorImage != "")
    ) {
      this.setState({ loading: false });
      this.activeform(1);
      toast.error("Please fill Supporting Documents Section");
      return;
    }

    const page9requiredFields = [
      'tudLeagalName',
      'tudWebsite',
      'tudLegalCin',
      'tudLegalPan',
      'tudLegalCountry',
      'tudEstablishedDate',
      'tudActivityStartedDate',
      'tudRegisteredOffice',
      'tudCorporateOffice',
      'tudDirector1',
      'tudDin1',
      'tudDirector2',
      'tudDin2',
      'tudDirector3',
      'tudDin3',
      'tudDirector4',
      'tudDin4'
    ];

    // const isPage9FormInvalid = page9requiredFields.some(field => 
    //   !this.state.unicorn[field] || this.state.unicorn[field].trim() === ''
    // );
    
    // if (this.state.unicorn.tpage9NA == "0" && isPage9FormInvalid) {
    //   this.setState({ loading: false });
    //   this.activeform(2);
    //   toast.error("Please fill Company Legal Entity Section");
    //   return;
    // }

    if (
      !this.state.unicorn.tudStartupFounderName ||
      this.state.unicorn.tudStartupFounderName == "" ||
      !this.state.unicorn.tudLegalname ||
      this.state.unicorn.tudLegalname == "" ||
      !this.state.unicorn.tudStartupFounderMobileCountryCode ||
      this.state.unicorn.tudStartupFounderMobileCountryCode == "" ||
      !this.state.unicorn.tudStartupFounderMobileNumber ||
      this.state.unicorn.tudStartupFounderMobileNumber == "" ||
      !this.state.unicorn.tudStartupFounderEmail ||
      this.state.unicorn.tudStartupFounderEmail == "" ||
      !this.state.unicorn.tudFoundedon ||
      this.state.unicorn.tudFoundedon == "" ||
      !this.state.unicorn.tudAddress ||
      this.state.unicorn.tudAddress == "" ||
      !this.state.unicorn.tudEmployees ||
      this.state.unicorn.tudEmployees == "" ||
      !this.state.unicorn.tudDealDescription ||
      this.state.unicorn.tudDealDescription == "" ||
      !this.state.unicorn.tudCategory ||
      this.state.unicorn.tudCategory == ""
    ) {
      this.setState({ loading: false });
      this.activeform(4);
      toast.error("Please fill Other Info Section");
      return;
    }
    let mediaValidation = true;
    let mediaData = JSON.parse(this.state.unicorn.tudMediaCoverageFiles);
    if(mediaData.mediaData > 0){
      mediaData.forEach(element => {
        if(element.title != ""){
          if(element.img == "" || element.content == "" || element.imgname == ""){
            mediaValidation = false;
          }
        }
      });
    }

    let teamData = JSON.parse(this.state.unicorn.tudVendorId);
    if(teamData.length < 1){
      mediaValidation = false;
    }

    teamData.forEach((a) => {
      if(a.name == "" || a.img == "" || a.description1 == "" || a.description2 == "" || a.imgname == "" || a.Role == "" || a.linkedinUrl == null || a.linkedinUrl == ""){
        mediaValidation = false;
      }
    })

    if(!mediaValidation){
      this.setState({ loading: false });
        this.activeform(5);
        toast.error("Please fill Media Coverages");
        return;
    }

    if (!this.state.unicorn.tudDeclare || this.state.unicorn.tudDeclare == 0) {
      this.setState({ loading: false });
      this.activeform(6);
      toast.error("Please fill Declaration Section");
      return;
    }
    
    let params = {
      tudTempUdID: this.state.unicorn.tudTempUdID,
      founderID: this.state.unicorn.founderID,
    };
    Bridge.Unicorn.publishunicorndeal(params).then((result) => {
      if(result.status == 1){
        this.setState({
          loading: false,
          show_thankyou_modal: true,
          unicornid: result.id,
        });
        toast.success("Unicorn Publish Successfully");
      }
      else{
        if(result.message == "You don't have a valid plan"){
          this.setState({
            loading: false,
            show_error_modal: true
          });
        }
        else{
          this.setState({
            loading: false
          });
          toast.error(result.message);
        }  
      }
    });
  };

  updatefounder = async (data) => {
    this.setState({ loading: true });
    try {
      const result = await Bridge.Unicorn.editunicorndraft(this.state.unicorn);
      if (result.status == 1) {
        this.setState({ loading: false });
        if (data === "save as draft") {
          toast.success("Unicorn saved as draft");
          setTimeout(() => {
            window.location.assign("/FounderMyListing");
          }, 1000);
        } else {
          this.setState({show_confirmation_modal: true});
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    } catch (error) {
      message.error("An unexpected error occurred.");
      this.setState({ loading: false });
    }
  };
  
  validatePreview = () => {
    const { unicorn } = this.state;
    // Check if required fields in step 1 (Basic Details) are filled
    const step1Valid = unicorn.tudStartupName;

    const step3Valid = unicorn.tudMark && unicorn.tudStartupHighlights && unicorn.tudLogoImage && unicorn.tudBannerImage && unicorn.tudPitchDeck;

    const overviewInvalid = (() => {
      try {
        const tudMarkArray = JSON.parse(this.state.unicorn.tudMark);
        // Check if it's an array with exactly 3 members
        if (!Array.isArray(tudMarkArray) || tudMarkArray.length !== 3) {
          return true; // validation failed
        }
        // Check if each member has content1 key and non-empty value
        return tudMarkArray.some(item => !item.content1 || item.content1.trim() === "");
      } catch (e) {
        return true; // JSON parse failed, validation failed
      }
    })();

    const highlightInvalid = (() => {
      try {
        const tudStartupHighlightArray = JSON.parse(this.state.unicorn.tudStartupHighlights);
        // Check if it's an array with exactly 3 members
        if (!Array.isArray(tudStartupHighlightArray) || tudStartupHighlightArray.length !== 4) {
          return true; // validation failed
        }
        // Check if each member has content1 key and non-empty value
        return tudStartupHighlightArray.some(item => !item.content1 || item.content1.trim() === "");
      } catch (e) {
        return true; // JSON parse failed, validation failed
      }
    })();

    return step1Valid && step3Valid && !highlightInvalid && !overviewInvalid;
  };

  renderActiveForm = () => {
    const activeForm = parseInt(this.state.activeform);
    const nextForm = activeForm + 1;
    const prevForm = activeForm - 1;
    const ActiveComponent = this.formConfig[activeForm];
    return (
      <ActiveComponent
        activate={() => this.activeform(nextForm)}
        next={() => this.activeform(nextForm)}
        prev={() => this.activeform(prevForm)}
        adminnext={this.props.adminview}
        data={this.props.tab}
        onInput={this.onInput}
        unicorn={this.state.unicorn}
        setMultiple={this.setMultiple}
        error={this.state.error_status_0}
        check={this.checkforvalidation}
        id={this.props.id}
      />
    )
  }

  render() {
    return (
      <div>
        <style>
          {`
            .multistep-form-icons span{
                color: black;
                font-size: 1.3em !important;
            }
            .line-seperator span{
                color: black;
                // font-size: 1.2em;
            }
            .form-group label{
                color: black;
                // font-size: 1.2em;
            }
            .form-group input{
                color: black;
                // font-size: 1.2em;
            }
            
            /* Grey out non-active tabs */
            .multistep-form-icons li .circle:not(.active-tab) {
                opacity: 0.2;
            }
            .multistep-form-icons li:not(:has(.active-tab)) span {
                opacity: 0.2;
            }
            .multistep-form-icons li:not(:has(.active-tab)) .line {
                opacity: 0.2;
            }
            
            `}
        </style>
        <Spin spinning={this.state.unicorn.tudTempUdID == ""}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                {/* <h1>Information about Startup</h1> */}
                <br />
                <p style={{ fontSize: "1.7em" }}>
                  Tell us about your startup
                  <br />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="multistep-form-icons">
                  <ul>
                    {this.additionalSteps.map((step, index) => {
                      const stepIndex = index;
                      const formIndex = index;
                      const classKey = `class${formIndex}`;
                      
                      return (
                        <li key={stepIndex} onClick={() => this.activethistab(formIndex)}>
                          <div>
                            <div
                              className={
                                this.state.activeform == formIndex
                                  ? "circle active-tab"
                                  : "circle" + this.state[classKey]
                              }
                            >
                              {(this.state.activeform == formIndex ||
                                this.state[classKey] == "") &&
                                (stepIndex + 1)}
                              {this.state.activeform != formIndex &&
                                this.state[classKey] == " success-tab" && (
                                  <i
                                    style={{ fontSize: 28 }}
                                    className="bx bx-check"
                                  ></i>
                                )}
                              {this.state.activeform != formIndex &&
                                this.state[classKey] == " error-tab" && (
                                  <i
                                    style={{ fontSize: 28 }}
                                    className="bx bx-x"
                                  ></i>
                                )}
                            </div>
                            <span>{step}</span>
                            {
                              step != "References" && <div className="line"></div>
                            }
                          </div>
                        </li>
                      );
                    })}

                  </ul>
                </div>
              </div>
              <div className="col-lg-8">
                {
                  this.renderActiveForm()
                }
              </div>
            </div>
            {!this.props.adminview && (
              <div className="col-12 col-md-12 col-lg-12 col-xl-12 mx-auto mt-3">
                <div className="submit-draft-publish d-flex justify-content-center">
                  <Previewbutton unicorn={this.state.unicorn} validatePreview={this.validatePreview}/>
                  <a
                    onClick={() => {
                      this.updatefounder("save as draft");
                    }}
                    className="submit-future"
                  >
                    Save as Draft
                  </a>
                  <a
                    onClick={() => {
                      this.updatefounder();
                    }}
                    // to="MemberShip"
                    className="submit-future"
                  >
                    Publish
                  </a>
                </div>
              </div>
            )}
          </div>
          <Modal
            // title="Thank You"
            centered
            open={this.state.show_thankyou_modal}
            className="thankumodal"
            // onCancel={this.cancelThankyou}
            iconType="SmileOutlined"
            maskClosable={false}
            cancelText={"Cancel"}
            footer={[
              <>
                <Link
                  to={`/FutureUnicornDescription?id=${this.state.unicornid}`}
                >
                  <button className="btn btn-block">View Startup</button>
                </Link>
                <Link to="/founder-dashboard">
                  <button className="btn btn-block">Go to Dashboard</button>
                </Link>
              </>,
            ]}
          >
            <div className="modal-confirm">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="icon-box">
                    <i class="far fa-check-circle"></i>
                  </div>
                  <div className="modal-title">
                    <h4>Thankyou</h4>
                  </div>
                </div>
                <div className="modal-body">
                  <p className="text-center">
                    Future Unicorn is published successfully.
                  </p>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            // title="Thank You"
            centered
            open={this.state.show_error_modal}
            className="thankumodal"
            // onCancel={this.cancelThankyou}
            iconType="SmileOutlined"
            maskClosable={false}
            cancelText={"Cancel"}
            footer={[
              <>
                <Link
                  to={`/MyUnicornPlan`}
                >
                  <button className="btn btn-block">View Plans</button>
                </Link>
                <Link to="/founder-dashboard">
                  <button className="btn btn-block">Go to Dashboard</button>
                </Link>
              </>,
            ]}
          >
            <div className="modal-confirm">
              <div className="modal-content">
                <div className="modal-body">
                  <p className="text-center">
                    You don't have a valid plan. However we have saved your unicorn as draft.
                  </p>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            // title="Thank You"
            centered
            open={this.state.show_confirmation_modal}
            className="thankumodal"
            // onCancel={this.cancelThankyou}
            iconType="SmileOutlined"
            maskClosable={false}
            cancelText={"Cancel"}
            footer={[
              <>
                <Link
                  // to={`/MyUnicornPlan`}
                >
                  <button onClick={() => this.setState({ show_confirmation_modal: false })} 
                  className="btn btn-block">Cancel</button>
                </Link>
                <Link 
                // to="/founder-dashboard"
                >
                  <button onClick={() => {
                    this.setState({ show_confirmation_modal: false });
                    this.publishunicorn();
                  }} className="btn btn-block">Publish</button>
                </Link>
              </>,
            ]}
          >
            <div className="modal-confirm">
              <div className="modal-content">
                <div className="modal-body">
                  <p className="text-center">
                  Clicking on 'Publish' will use your edit access. Close this box if you haven't made any edits, and proceed with publishing only if you have made changes to the Unicorn page.
                  </p>
                </div>
              </div>
            </div>
          </Modal>
          
        </Spin>
        <ToastContainer />
      </div>
    );
  }
}

export default Founderadmindashboard;
