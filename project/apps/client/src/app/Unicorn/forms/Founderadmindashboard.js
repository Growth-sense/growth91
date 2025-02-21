import React, { Component } from "react";
import { Modal, Spin, Steps, message } from "antd";
import BasicDetails from "./BasicDetails";
import Step2 from "./IdeaBusiness";
import Step3 from "./IntellectualProperty";
import Step4 from "./MobileApp";
import Step5 from "./IndustryMarket";
import Step6 from "./Competition";
import Step7 from "./SWOT";
import Step8 from "./CompanyLegalEntity";
import Step9 from "./SocialMediaPresence";
import Step10 from "./GoToMarket";
import Step11 from "./Financials";
import Step12 from "./Capital";
import Step13 from "./Salaries";
import Step14 from "./FundingDetails";
import Step15 from "./UseOfFunds";
import Step16 from "./Compliances";
import Step17 from "./OtherImportantIndicators";
import Step18 from "./Refrences";
import Step19 from "./Declaration";
import Dellistinicorn from "./Deallist.js";
import Mediacoverager from "./Mediacoverager.js";
import Step20 from "./SupportingDocuments";
import { Preview } from "./Preview.jsx";
import { Previewbutton } from "./Previewbutton.jsx";

import ReactGA from "react-ga4";

import Bridge from "../../constants/Bridge";

import $ from "jquery";
import { Link } from "react-router-dom";
import axios from "axios";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { toast, ToastContainer } from "react-toastify";

const { Step } = Steps;

class Founderadmindashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,

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
        tudDoc1: "",
        tudDoc2: "",
        tudDoc3: "",
        tudStartupFounderName: "",
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
        unicornid: "",
        tudDeclare: 0,

        founderID: localStorage.getItem("founder_id"),
      },
    };
  }

  componentDidMount() {
    this.setState({ activeform: 0 });
    // if(localStorage.getItem("founder_id")){
    if (this.props.adminview !== "") {
      this.getData();
    }
    this.getData();
    if (this.props.id) {
      let id = this.props.id;
    }
    // this.getData(this.props.id);

    // this.checkforvalidation()

    // localStorage.removeItem('register_id');
  }

  getData = async (id) => {
    console.log(this.props.adminview, "hello");

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
        console.log(result);

        if (result.data.data.length == 0) {
          const datas = await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/founder/Startup/createunicorndraft`,
            this.state.unicorn
          );
          this.setState({ tudTempUdID: datas.data.id });
          // console.log(datas.data.id);
        } else {
          console.log(result.data.data[0]);

          const data = Object.keys(result.data.data[0]).reduce(
            (acc, key, index) => {
              // Collect the values from the object
              acc[key] = Object.values(result.data.data[0])[index];
              return acc;
            },
            {}
          );

          this.setState({ unicorn: { ...this.state.unicorn, ...data } });
        }

        if (result.status == 1) {
          /// showing for done
          if (result.data[0].send_me_copy_of_response) {
            // this.setState({class18:' success-tab'});
          }
          if (
            result.data[0].what_valuation_will_safe &&
            result.data[0].dependence_on_any_specific_founder &&
            result.data[0].regulartory_issues &&
            result.data[0].licences_and_permissions &&
            result.data[0].team_size &&
            result.data[0].is_company_paying_commision_above_5_per &&
            result.data[0].is_company_paying_commision_above_10_per &&
            result.data[0].possible_exit_opportunities &&
            result.data[0].subsidiaries &&
            result.data[0].sister_concerns &&
            result.data[0].related_party_transactions &&
            result.data[0].legal_risk_plan_to_migrate &&
            result.data[0].amy_change_by_founders &&
            result.data[0].demo_video_link &&
            result.data[0].supported_documents &&
            result.data[0].media_coverage &&
            result.data[0].awards_and_recognitions &&
            result.data[0].recognized_as_startup_by_dpiit &&
            result.data[0].any_specific_information_to_share
          ) {
            // this.setState({class16:' success-tab'});
          }
          if (
            result.data[0].are_you_registered_for_gst &&
            result.data[0].status_of_gst_compliance &&
            result.data[0].date_of_last_audited_balance_sheet &&
            result.data[0].date_of_filling_last_itr &&
            result.data[0].date_of_last_agm &&
            result.data[0].pending_complience_related_to_roc &&
            result.data[0].past_days &&
            result.data[0].list_of_other_situatory
          ) {
            // this.setState({class15:' success-tab'});
          }
          if (
            result.data[0].funds_required &&
            result.data[0].expected_runway_with_current_fund_raise &&
            result.data[0].desired_valuation_for_current_fund_raise &&
            result.data[0].logic_for_desired_valuation &&
            result.data[0].are_you_open_to_consider_logical_lower_valuation &&
            result.data[0].capex_immediately &&
            result.data[0].capex_future_plans &&
            result.data[0].use_of_funds_product_development &&
            result.data[0].use_of_funds_marketing &&
            result.data[0].use_of_funds_repayment &&
            result.data[0].use_of_funds_salaries_in_per &&
            result.data[0].use_of_funds_cost_and_commision &&
            result.data[0].use_of_funds_other &&
            result.data[0].are_you_open_to_consider_logical_lower_valuation
          ) {
            // this.setState({class14:' success-tab'});
          }
          if (result.data[0].have_you_raised_fund_for_startup) {
            // this.setState({class13:' success-tab'});
          }
          if (
            result.data[0].founders_current_salery &&
            result.data[0].date_of_last_increase_founders_salary &&
            result.data[0].core_team_current_salary &&
            result.data[0].total_salary_including_core_team_salary
          ) {
            // this.setState({class12:' success-tab'});
          }
          if (
            result.data[0].authorized_captial_of_company &&
            result.data[0].paid_up_capital_company &&
            result.data[0].percentage_holding_by_core_team &&
            result.data[0].reserved_for_esop &&
            result.data[0].percentage_holding_of_others &&
            result.data[0].actual_amount_real_salaries_taken &&
            result.data[0].usecure_loans_received_from_founders &&
            result.data[0].usecure_loans_received_from_other &&
            result.data[0].any_other_secured_or_ddebt_from_bank
          ) {
            // this.setState({class11:' success-tab'});
          }
          if (
            result.data[0].name_of_clients &&
            result.data[0].client_retention &&
            result.data[0].revenue_top_5_clients &&
            result.data[0].explaination_economics_of_startup &&
            result.data[0].total_amount_spent_of_product &&
            result.data[0].major_expense_till_date
          ) {
            // this.setState({class10:' success-tab'});
          }
          if (
            result.data[0].primary_gtm_strategy &&
            result.data[0].backup_plan_for_strategy &&
            result.data[0].existing_cas &&
            result.data[0].expected_cac_in_future &&
            result.data[0].rational_behinde_any_change_in_cac &&
            result.data[0].ltv_of_customer &&
            result.data[0].rational_behind_ltv_number &&
            result.data[0].ltv_to_cac_ratio
          ) {
            // this.setState({class9:' success-tab'});
          }
          if (
            result.data[0].linkdin ||
            result.data[0].facebook ||
            result.data[0].instagram ||
            result.data[0].youtube ||
            result.data[0].others
          ) {
            // this.setState({class8:' success-tab'});
          }
          if (
            result.data[0].name_of_legality_entity &&
            result.data[0].website &&
            result.data[0].cin_legality_entity &&
            result.data[0].pan_legality_entity &&
            result.data[0].registered_in_country &&
            result.data[0].formality_established_date &&
            result.data[0].activities_start_date_befire_formal &&
            result.data[0].address_registered_office &&
            result.data[0].address_corporate_office &&
            result.data[0].director_1_name &&
            result.data[0].director_1_din &&
            result.data[0].director_2_name &&
            result.data[0].director_2_din &&
            result.data[0].director_3_name &&
            result.data[0].director_3_din &&
            result.data[0].director_4_name &&
            result.data[0].director_4_din
          ) {
            // this.setState({class7:' success-tab'});
          }
          if (
            result.data[0].strength_of_your_startup &&
            result.data[0].weakness_of_startup &&
            result.data[0].opportunities_for_startup &&
            result.data[0].threats_for_startup
          ) {
            // this.setState({class6:' success-tab'});
          }
          if (
            result.data[0].direct_local_competition &&
            result.data[0].in_direct_local_competition &&
            result.data[0].direct_global_competition &&
            result.data[0].indirect_global_competition &&
            result.data[0].how_different_startup_from_competition &&
            result.data[0].why_difficult_competition &&
            result.data[0].what_are_unfair_disadvantages &&
            result.data[0].most_about_your_competition
          ) {
            // this.setState({class5:' success-tab'});
          }
          if (
            result.data[0].relevant_industry &&
            result.data[0].views_on_industry &&
            result.data[0].total_market_size_of_industry &&
            result.data[0].supporting_information_of_narket_size &&
            result.data[0].addressale_market_size &&
            result.data[0]
              .supporting_information_of_demarking_addressable_market
          ) {
            // this.setState({class4:' success-tab'});
          }
          if (
            result.data[0].have_any_android_app_startup &&
            result.data[0].have_ios_app
          ) {
            // this.setState({class3:' success-tab'});
          }
          if (
            result.data[0].trademark &&
            result.data[0].patents &&
            result.data[0].other_ips &&
            result.data[0].all_iprs_rwgistered_in_company
          ) {
            // this.setState({class2:' success-tab'});
          }
          if (
            result.data[0].is_disrupting_existing_market &&
            result.data[0].is_targeting_new_untabed_market &&
            result.data[0].customer_benifit &&
            result.data[0].suplier_benifit &&
            result.data[0].focused_on_product &&
            result.data[0].direct_substitute_available &&
            result.data[0].indirect_substitute_available &&
            result.data[0].risks_perceived &&
            result.data[0].responsibilities_distributted_members &&
            result.data[0].moats &&
            result.data[0].challenges_for_scale_up
          ) {
            // this.setState({class1:' success-tab'});
          }
          if (
            result.data[0].email &&
            result.data[0].startup_name &&
            result.data[0].primary_contact_person_name &&
            result.data[0].primary_contact_person_mobile
          ) {
            // this.setState({class0:' success-tab'});
          }
        }
      });
  };

  activeform = (value) => {
    console.log(value);

    this.setState({ activeform: value });
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  };

  onChange = (value) => {
    this.setState({ activeform: value });
  };

  activethistab = (num) => {
    this.setState({ activeform: num });
    $("html, body").animate({ scrollTop: 0 }, 1000);
    // this.checkforvalidation();
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
    console.log(names, value);

    this.setState({
      unicorn: {
        ...this.state.unicorn,
        [names]: value,
      },
    });
  };


  publishunicorn = () => {
    this.setState({ loading: true });
    console.log(this.state.unicorn);
    if (
      !this.state.unicorn.tudEmail ||
      this.state.unicorn.tudEmail == "" ||
      !this.state.unicorn.tudStartupName ||
      this.state.unicorn.tudStartupName == "" ||
      !this.state.unicorn.tudPrimaryContactName ||
      this.state.unicorn.tudPrimaryContactName == "" ||
      !this.state.unicorn.tudCountryCode ||
      this.state.unicorn.tudCountryCode == "" ||
      !this.state.unicorn.tudPrimaryContactMobile ||
      this.state.unicorn.tudPrimaryContactMobile == "" ||
      !this.state.unicorn.tudPrimaryContactEmail ||
      this.state.unicorn.tudPrimaryContactEmail == ""
    ) {
      this.setState({ loading: false });
      this.activeform(0);
      toast.error("Please fill Basic Details Section");
      return;
    }

    if (
      !this.state.unicorn.tudDisruptingMarket ||
      this.state.unicorn.tudDisruptingMarket == "" ||
      !this.state.unicorn.tudTappingNew ||
      this.state.unicorn.tudTappingNew == "" ||
      !this.state.unicorn.tudCustomerBenifit ||
      this.state.unicorn.tudCustomerBenifit == "" ||
      !this.state.unicorn.tudSuppliersBenifit ||
      this.state.unicorn.tudSuppliersBenifit == "" ||
      !this.state.unicorn.tudFocusedOnProduct ||
      this.state.unicorn.tudFocusedOnProduct == "" ||
      !this.state.unicorn.tudUseofFundRepayment ||
      this.state.unicorn.tudUseofFundRepayment == "" ||
      !this.state.unicorn.tudFocusedOnProduct ||
      this.state.unicorn.tudFocusedOnProduct == "" ||
      !this.state.unicorn.tudDirectSubstitueAvailable ||
      this.state.unicorn.tudDirectSubstitueAvailable == "" ||
      !this.state.unicorn.tudIndirectSubstitueAvailable ||
      this.state.unicorn.tudIndirectSubstitueAvailable == "" ||
      !this.state.unicorn.tudRiskPerceived ||
      this.state.unicorn.tudRiskPerceived == "" ||
      !this.state.unicorn.tudMoats ||
      this.state.unicorn.tudMoats == "" ||
      !this.state.unicorn.tudScaleupChallenges ||
      this.state.unicorn.tudScaleupChallenges == ""
    ) {
      this.setState({ loading: false });
      this.activeform(1);
      toast.error("Please fill Idea/Business Section");
      return;
    }
    if (
      !this.state.unicorn.tudAndroidMobileApp ||
      this.state.unicorn.tudAndroidMobileApp == "" ||
      (this.state.unicorn.tudAndroidMobileApp == "Yes" && (
      !this.state.unicorn.tudAndroidAppDetails ||
      this.state.unicorn.tudAndroidAppDetails == "" ))||
      !this.state.unicorn.tudIphoneMobileApp ||
      this.state.unicorn.tudIphoneMobileApp == "" ||
      (this.state.unicorn.tudIphoneMobileApp == "Yes" && (
      !this.state.unicorn.tudIphoneAppDetails ||
      this.state.unicorn.tudIphoneAppDetails == "" ))
    ) {
      this.setState({ loading: false });
      this.activeform(3);

      toast.error("Please fill Mobile App Section");
      return;
    }
    if (
      !this.state.unicorn.tudIndustryClassification ||
      this.state.unicorn.tudIndustryClassification == "" ||
      !this.state.unicorn.tudIndustryViews ||
      this.state.unicorn.tudIndustryViews == "" ||
      !this.state.unicorn.tudIndustryMarketSize ||
      this.state.unicorn.tudIndustryMarketSize == "" ||
      !this.state.unicorn.tudSupportingInfoMarketSize ||
      this.state.unicorn.tudSupportingInfoMarketSize == "" ||
      !this.state.unicorn.tudAddressableMarketSize ||
      this.state.unicorn.tudAddressableMarketSize == "" ||
      !this.state.unicorn.tudSupportingInfoAddressableMarketSize ||
      this.state.unicorn.tudSupportingInfoAddressableMarketSize == ""
    ) {
      this.setState({ loading: false });
      this.activeform(4);

      toast.error("Please fill Industry Market Section");
      return;
    }
    if (
      !this.state.unicorn.tudLocalDirectComp ||
      this.state.unicorn.tudLocalDirectComp == "" ||
      !this.state.unicorn.tudLocalIndirectComp ||
      this.state.unicorn.tudLocalIndirectComp == "" ||
      !this.state.unicorn.tudGlobalDirectComp ||
      this.state.unicorn.tudGlobalDirectComp == "" ||
      !this.state.unicorn.tudGlobalIndirectComp ||
      this.state.unicorn.tudGlobalIndirectComp == "" ||
      !this.state.unicorn.tudDiffCompetion ||
      this.state.unicorn.tudDiffCompetion == "" ||
      !this.state.unicorn.tudWhyCompSame ||
      this.state.unicorn.tudWhyCompSame == "" ||
      !this.state.unicorn.tudUnfairAdv ||
      this.state.unicorn.tudUnfairAdv == "" ||
      !this.state.unicorn.tudLikeCompetion ||
      this.state.unicorn.tudLikeCompetion == "" ||
      !this.state.unicorn.tudFailVenture ||
      this.state.unicorn.tudFailVenture == "" ||
      !this.state.unicorn.tudFailureReason ||
      this.state.unicorn.tudFailureReason == ""
    ) {
      this.setState({ loading: false });
      this.activeform(5);

      toast.error("Please fill Comepetition Section");
      return;
    }
    if (
      !this.state.unicorn.tudStrength ||
      this.state.unicorn.tudStrength == "" ||
      !this.state.unicorn.tudWeakness ||
      this.state.unicorn.tudWeakness == "" ||
      !this.state.unicorn.tudOpportunities ||
      this.state.unicorn.tudOpportunities == "" ||
      !this.state.unicorn.tudThreats ||
      this.state.unicorn.tudThreats == ""
    ) {
      this.setState({ loading: false });
      this.activeform(6);
      toast.error("Please fill SWOT Section");
      return;
    }
    if (
      !this.state.unicorn.tudGtmStratergy ||
      this.state.unicorn.tudGtmStratergy == "" ||
      !this.state.unicorn.tudGtmBackup ||
      this.state.unicorn.tudGtmBackup == "" ||
      !this.state.unicorn.tudExistingCac ||
      this.state.unicorn.tudExistingCac == "" ||
      !this.state.unicorn.tudExpectedCac ||
      this.state.unicorn.tudExpectedCac == "" ||
      !this.state.unicorn.tudLogicCac ||
      this.state.unicorn.tudLogicCac == "" ||
      !this.state.unicorn.tudLtvCustomer ||
      this.state.unicorn.tudLtvCustomer == "" ||
      !this.state.unicorn.tudLogicLtvNumber ||
      this.state.unicorn.tudLogicLtvNumber == "" ||
      !this.state.unicorn.tudLtvCacRatio ||
      this.state.unicorn.tudLtvCacRatio == ""
    ) {
      this.setState({ loading: false });
      this.activeform(9);
      toast.error("Please fill Go to market Section");
      return;
    }
    if (!this.state.unicorn.tudPreviousFundRaised) {
      !this.state.unicorn.tudPreviousFundRaised == "" ||
        this.setState({ loading: false });
      this.activeform(13);
      toast.error("Please fill Go to Funding Detail Section");
      return;
    }
    if (
      !this.state.unicorn.tudFundRequired ||
      this.state.unicorn.tudFundRequired == "" ||
      !this.state.unicorn.tudExpRunway ||
      this.state.unicorn.tudExpRunway == "" ||
      !this.state.unicorn.tudValueFundRaise ||
      this.state.unicorn.tudValueFundRaise == "" ||
      !this.state.unicorn.tudLogicFundRaise ||
      this.state.unicorn.tudLogicFundRaise == "" ||
      !this.state.unicorn.tudOpentoLower ||
      this.state.unicorn.tudOpentoLower == "" ||
      !this.state.unicorn.tudCapexImmidate ||
      this.state.unicorn.tudCapexImmidate == "" ||
      !this.state.unicorn.tudCapexFuture ||
      this.state.unicorn.tudCapexFuture == "" ||
      !this.state.unicorn.tudProductFund ||
      this.state.unicorn.tudProductFund == "" ||
      !this.state.unicorn.tudMarketingFund ||
      this.state.unicorn.tudMarketingFund == "" ||
      !this.state.unicorn.tudUseofFundRepayment ||
      this.state.unicorn.tudUseofFundRepayment == "" ||
      !this.state.unicorn.tudSalaryFund ||
      this.state.unicorn.tudSalaryFund == "" ||
      !this.state.unicorn.tudCastComFund ||
      this.state.unicorn.tudCastComFund == "" ||
      !this.state.unicorn.tudOthersFund ||
      this.state.unicorn.tudOthersFund == ""
    ) {
      this.setState({ loading: false });
      this.activeform(14);
      toast.error("Please fill Use of funds Section");
      return;
    }
    if (
      !this.state.unicorn.tudSaleExitInfo ||
      this.state.unicorn.tudSaleExitInfo == "" ||
      !this.state.unicorn.tudDepedencyPerson ||
      this.state.unicorn.tudDepedencyPerson == "" ||
      !this.state.unicorn.tudReglarityIssue ||
      this.state.unicorn.tudReglarityIssue == "" ||
      !this.state.unicorn.tudLicPermissionStatus ||
      this.state.unicorn.tudLicPermissionStatus == "" ||
      !this.state.unicorn.tudTeamSize ||
      this.state.unicorn.tudTeamSize == "" ||
      !this.state.unicorn.tud5perCommission ||
      this.state.unicorn.tud5perCommission == "" ||
      !this.state.unicorn.tud10perCommission ||
      this.state.unicorn.tud10perCommission == "" ||
      !this.state.unicorn.tudExitTimeline ||
      this.state.unicorn.tudExitTimeline == "" ||
      !this.state.unicorn.tudSubsidiries ||
      this.state.unicorn.tudSubsidiries == "" ||
      !this.state.unicorn.tudSisterConcerns ||
      this.state.unicorn.tudSisterConcerns == "" ||
      !this.state.unicorn.tudRelatedPartyTrans ||
      this.state.unicorn.tudRelatedPartyTrans == "" ||
      !this.state.unicorn.tudLegalRisk ||
      this.state.unicorn.tudLegalRisk == "" ||
      !this.state.unicorn.tudFounderExitEarlier ||
      this.state.unicorn.tudFounderExitEarlier == "" ||
      !this.state.unicorn.tudDemoLink ||
      this.state.unicorn.tudDemoLink == "" ||
      !this.state.unicorn.tudOtherDocsLinks ||
      this.state.unicorn.tudOtherDocsLinks == "" ||
      !this.state.unicorn.tudMediaCoverLinks ||
      this.state.unicorn.tudMediaCoverLinks == "" ||
      !this.state.unicorn.tudAwards ||
      this.state.unicorn.tudAwards == "" ||
      !this.state.unicorn.tudStartupRecon ||
      this.state.unicorn.tudStartupRecon == "" ||
      !this.state.unicorn.tudOtherInfo ||
      this.state.unicorn.tudOtherInfo == ""
    ) {
      this.setState({ loading: false });
      this.activeform(16);
      toast.error("Please fill Other Important indicators Section");
      return;
    }
    if (
      !this.state.unicorn.tudMark ||
      this.state.unicorn.tudMark == "" ||
      !this.state.unicorn.tudStartupHighlights ||
      this.state.unicorn.tudStartupHighlights == "" ||
      !this.state.unicorn.tudLogoImage ||
      this.state.unicorn.tudLogoImage == "" ||
      !this.state.unicorn.tudBannerImage ||
      this.state.unicorn.tudBannerImage == "" ||
      !this.state.unicorn.tudPitchDeck ||
      this.state.unicorn.tudPitchDeck == ""
    ) {
      this.setState({ loading: false });
      this.activeform(2);
      toast.error("Please fill Supporting Documents Section");
      return;
    }

    if (
      !this.state.unicorn.tudStartupFounderName ||
      this.state.unicorn.tudStartupFounderName == "" ||
      !this.state.unicorn.tudLegalname ||
      this.state.unicorn.tudLegalname == "" ||
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
      !this.state.unicorn.tudYoutubeLink ||
      this.state.unicorn.tudYoutubeLink == "" ||
      !this.state.unicorn.tudCategory ||
      this.state.unicorn.tudCategory == ""
    ) {
      this.setState({ loading: false });
      this.activeform(19);
      toast.error("Please fill Deals Section");
      return;
    }
    let mediaValidation = true;
    let mediaData = JSON.parse(this.state.unicorn.tudMediaCoverageFiles);
    console.log(mediaData);
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
    console.log(teamData);
    if(teamData.length < 1){
      mediaValidation = false;
    }

    teamData.forEach((a) => {
      if(a.name == "" || a.img == "" || a.description1 == "" || a.description2 == "" || a.imgname == "" || a.Role == ""){
        mediaValidation = false;
      }
    })

    if(!mediaValidation){
      this.setState({ loading: false });
        this.activeform(20);
        toast.error("Please fill Media Coverages");
        return;

    }


    if (!this.state.unicorn.tudDeclare || this.state.unicorn.tudDeclare == 0) {
      this.setState({ loading: false });
      this.activeform(21);
      toast.error("Please fill Declaration Section");
      return;
    }


    if (!this.state.unicorn.tudDeclare || this.state.unicorn.tudDeclare == 0) {
      this.setState({ loading: false });
      this.activeform(21);
      toast.error("Please fill Declaration Section");
      return;
    }
    let params = {
      tudTempUdID: this.state.unicorn.tudTempUdID,
      founderID: this.state.unicorn.founderID,
    };
    Bridge.Unicorn.publishunicorndeal(params).then((result) => {
      console.log(result);
      this.setState({
        loading: false,
        show_thankyou_modal: true,
        unicornid: result.id,
      });
      toast.success("Unicorn Publish Success fully");
    });
  };
  updatefounder = async (data) => {
    console.log(data);
    console.log('Calling updatefounder function');
  
    this.setState({ loading: true });
  
    // Removed the setTimeout as it's generally not necessary unless specifically required
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
          this.publishunicorn();
        }
      } else {
        message.warning(result.message);
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error updating founder:", error);
      message.error("An unexpected error occurred.");
      this.setState({ loading: false });
    }
  };
  
  validatePreview = () => {
    const { unicorn } = this.state;

    // Check if required fields in step 1 (Basic Details) are filled
    const step1Valid = unicorn.tudEmail && unicorn.tudStartupName && unicorn.tudPrimaryContactName && unicorn.tudCountryCode && unicorn.tudPrimaryContactMobile && unicorn.tudPrimaryContactEmail;

    // Check if required fields in step 2 (Idea/Business) are filled
    const step2Valid = unicorn.tudDisruptingMarket && unicorn.tudTappingNew && unicorn.tudCustomerBenifit && unicorn.tudSuppliersBenifit && unicorn.tudFocusedOnProduct;

    // Check if required fields in step 3 (Intellectual Property) are filled
    const step3Valid = unicorn.tudTrademark && unicorn.tudPatents && unicorn.tudOtherIPs;

    return step1Valid && step2Valid && step3Valid;
  };

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
            
            `}
        </style>
        <Spin spinning={this.state.loading}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                {/* <h1>Information about Startup</h1> */}
                <br />
                <p style={{ fontSize: "1.7em" }}>
                  Tell us about your startup
                  <br />
                  {/* <span style={{ color: "red" }}>
                      ( Instruction: Startup form and Assessment Forms are best
                      viewed on PC/Laptop. )
                    </span> */}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="multistep-form-icons">
                  <ul>
                    <li onClick={() => this.activethistab(0)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 0
                              ? "circle active-tab"
                              : "circle " + this.state.class0
                          }
                        >
                          {(this.state.activeform == 0 ||
                            this.state.class0 == "") &&
                            "1"}
                          {this.state.activeform != 0 &&
                            this.state.class0 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 0 &&
                            this.state.class0 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Basic Details</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li
                      onClick={() => {
                        this.activethistab(1);
                        this.checkforvalidation();
                      }}
                    >
                      <div>
                        <div
                          className={
                            this.state.activeform == 1
                              ? "circle active-tab"
                              : "circle " + this.state.class1
                          }
                        >
                          {(this.state.activeform == 1 ||
                            this.state.class1 == "") &&
                            "2"}
                          {this.state.activeform != 1 &&
                            this.state.class1 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 1 &&
                            this.state.class1 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Idea/Business</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li
                      onClick={() => {
                        this.activethistab(2);
                        this.checkforvalidation();
                      }}
                    >
                    
                      <div>
                        <div
                          className={
                            this.state.activeform == 2
                              ? "circle active-tab"
                              : "circle" + this.state.class2
                          }
                        >
                          {(this.state.activeform == 2 ||
                            this.state.class2 == "") &&
                            "3"}
                          {this.state.activeform != 2 &&
                            this.state.class2 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 2 &&
                            this.state.class2 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Supporting Documents</span>
                        <div className="line"></div>
                      </div>
                    </li>

                    <li
                      onClick={() => {
                        this.activethistab(3);
                        this.checkforvalidation();
                      }}
                    >
                      <div>
                        <div
                          className={
                            this.state.activeform == 3
                              ? "circle active-tab"
                              : "circle " + this.state.class3
                          }
                        >
                          {(this.state.activeform == 3 ||
                            this.state.class3 == "") &&
                            "4"}
                          {this.state.activeform != 3 &&
                            this.state.class3 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 3 &&
                            this.state.class3 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Intellectual Property</span>
                        <div className="line"></div>
                      </div>
                    </li>

                    <li
                      onClick={() => {
                        this.activethistab(4);
                        this.checkforvalidation();
                      }}
                    >
                      <div>
                        <div
                          className={
                            this.state.activeform == 4
                              ? "circle active-tab"
                              : "circle" + this.state.class4
                          }
                        >
                          {(this.state.activeform == 4 ||
                            this.state.class4 == "") &&
                            "5"}
                          {this.state.activeform != 4 &&
                            this.state.class4 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 4 &&
                            this.state.class4 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Mobile App</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li
                      onClick={() => {
                        this.activethistab(5);
                        this.checkforvalidation();
                      }}
                    >
                      <div>
                        <div
                          className={
                            this.state.activeform == 5
                              ? "circle active-tab"
                              : "circle" + this.state.class5
                          }
                        >
                          {(this.state.activeform == 5 ||
                            this.state.class5 == "") &&
                            "6"}
                          {this.state.activeform != 5 &&
                            this.state.class5 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 5 &&
                            this.state.class5 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Industry Market</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(6)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 6
                              ? "circle active-tab"
                              : "circle" + this.state.class6
                          }
                        >
                          {(this.state.activeform == 6 ||
                            this.state.class6 == "") &&
                            "7"}
                          {this.state.activeform != 6 &&
                            this.state.class6 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 6 &&
                            this.state.class6 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Competition</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(7)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 7
                              ? "circle active-tab"
                              : "circle" + this.state.class7
                          }
                        >
                          {(this.state.activeform == 7 ||
                            this.state.class7 == "") &&
                            "8"}
                          {this.state.activeform != 7 &&
                            this.state.class7 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 7 &&
                            this.state.class7 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>SWOT</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(8)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 8
                              ? "circle active-tab"
                              : "circle" + this.state.class8
                          }
                        >
                          {(this.state.activeform == 8 ||
                            this.state.class8 == "") &&
                            "9"}
                          {this.state.activeform != 8 &&
                            this.state.class8 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 8 &&
                            this.state.class8 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Company Legal Entity</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(9)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 9
                              ? "circle active-tab"
                              : "circle" + this.state.class9
                          }
                        >
                          {(this.state.activeform == 9 ||
                            this.state.class9 == "") &&
                            "10"}
                          {this.state.activeform != 9 &&
                            this.state.class9 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 9 &&
                            this.state.class9 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Social Media Presence</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(10)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 10
                              ? "circle active-tab"
                              : "circle" + this.state.class10
                          }
                        >
                          {(this.state.activeform == 10 ||
                            this.state.class10 == "") &&
                            "11"}
                          {this.state.activeform != 10 &&
                            this.state.class10 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 10 &&
                            this.state.class10 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Go To Market</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(11)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 11
                              ? "circle active-tab"
                              : "circle" + this.state.class11
                          }
                        >
                          {(this.state.activeform == 11 ||
                            this.state.class11 == "") &&
                            "12"}
                          {this.state.activeform != 11 &&
                            this.state.class11 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 11 &&
                            this.state.class11 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Financials</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(12)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 12
                              ? "circle active-tab"
                              : "circle" + this.state.class12
                          }
                        >
                          {(this.state.activeform == 12 ||
                            this.state.class12 == "") &&
                            "13"}
                          {this.state.activeform != 12 &&
                            this.state.class12 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 12 &&
                            this.state.class12 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Capital</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(13)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 13
                              ? "circle active-tab"
                              : "circle" + this.state.class13
                          }
                        >
                          {(this.state.activeform == 13 ||
                            this.state.class13 == "") &&
                            "14"}
                          {this.state.activeform != 13 &&
                            this.state.class13 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 13 &&
                            this.state.class13 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Salaries</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(14)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 14
                              ? "circle active-tab"
                              : "circle" + this.state.class14
                          }
                        >
                          {(this.state.activeform == 14 ||
                            this.state.class14 == "") &&
                            "15"}
                          {this.state.activeform != 14 &&
                            this.state.class14 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 14 &&
                            this.state.class14 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Funding Details</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(15)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 15
                              ? "circle active-tab"
                              : "circle" + this.state.class15
                          }
                        >
                          {(this.state.activeform == 15 ||
                            this.state.class15 == "") &&
                            "16"}
                          {this.state.activeform != 15 &&
                            this.state.class15 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 15 &&
                            this.state.class15 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Use Of Funds</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(16)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 16
                              ? "circle active-tab"
                              : "circle" + this.state.class16
                          }
                        >
                          {(this.state.activeform == 16 ||
                            this.state.class16 == "") &&
                            "17"}
                          {this.state.activeform != 16 &&
                            this.state.class16 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 16 &&
                            this.state.class16 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Compliances</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(17)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 17
                              ? "circle active-tab"
                              : "circle" + this.state.class17
                          }
                        >
                          {(this.state.activeform == 17 ||
                            this.state.class17 == "") &&
                            "18"}
                          {this.state.activeform != 17 &&
                            this.state.class17 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 17 &&
                            this.state.class17 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Other Important Indicators</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(18)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 18
                              ? "circle active-tab"
                              : "circle" + this.state.class18
                          }
                        >
                          {(this.state.activeform == 18 ||
                            this.state.class18 == "") &&
                            "19"}
                          {this.state.activeform != 18 &&
                            this.state.class18 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 18 &&
                            this.state.class18 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>References</span>
                        <div className="line"></div>
                      </div>
                    </li>
                   
                    <li onClick={() => this.activethistab(19)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 19
                              ? "circle active-tab"
                              : "circle" + this.state.class19
                          }
                        >
                          {(this.state.activeform == 19 ||
                            this.state.class19 == "") &&
                            "20"}
                          {this.state.activeform != 19 &&
                            this.state.class19 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 19 &&
                            this.state.class19 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Other info</span>
                        <div className="line"></div>
                      </div>
                    </li>

                    <li onClick={() => this.activethistab(20)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 20
                              ? "circle active-tab"
                              : "circle" + this.state.class20
                          }
                        >
                          {(this.state.activeform == 20 ||
                            this.state.class20 == "") &&
                            "21"}
                          {this.state.activeform != 20 &&
                            this.state.class20 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 20 &&
                            this.state.class20 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Media Coverages</span>
                        <div className="line"></div>
                      </div>
                    </li>
                    <li onClick={() => this.activethistab(21)}>
                      <div>
                        <div
                          className={
                            this.state.activeform == 21
                              ? "circle active-tab"
                              : "circle" + this.state.class21
                          }
                        >
                          {(this.state.activeform == 21 ||
                            this.state.class21 == "") &&
                            "22"}
                          {this.state.activeform != 21 &&
                            this.state.class21 == " success-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-check"
                              ></i>
                            )}
                          {this.state.activeform != 21 &&
                            this.state.class21 == " error-tab" && (
                              <i
                                style={{ fontSize: 28 }}
                                className="bx bx-x"
                              ></i>
                            )}
                        </div>
                        <span>Declaration</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-8">
                {this.state.activeform == "0" && (
                  <BasicDetails
                    activate={() => this.activeform(1)}
                    next={() => this.activeform(1)}
                    adminnext={this.props.adminview}
                    data={this.props.tab}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    error={this.state.error_status_0}
                    check={(ind) => this.checkforvalidation(ind)}
                  />
                )}
                {this.state.activeform == "1" && (
                  <Step2
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(2)}
                    prev={() => this.activeform(0)}
                    next={() => this.activeform(2)}
                    onClick={() => this.activatethisform(1)}
                    id={this.props.id}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    error={this.state.error_status_1}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "2" && (
                  <Step20
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(3)}
                    prev={() => this.activeform(1)}
                    next={() => this.activeform(3)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_2}
                    check={() => this.checkforvalidation()}
                  />
                )}
                
                {this.state.activeform == "3" && (
                  <Step3
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(4)}
                    prev={() => this.activeform(2)}
                    next={() => this.activeform(4)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_3}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "4" && (
                  <Step4
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(5)}
                    prev={() => this.activeform(3)}
                    next={() => this.activeform(5)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_4}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "5" && (
                  <Step5
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(6)}
                    prev={() => this.activeform(4)}
                    next={() => this.activeform(6)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_5}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "6" && (
                  <Step6
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(7)}
                    prev={() => this.activeform(5)}
                    next={() => this.activeform(7)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_6}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "7" && (
                  <Step7
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(8)}
                    prev={() => this.activeform(6)}
                    next={() => this.activeform(8)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_7}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "8" && (
                  <Step8
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(9)}
                    prev={() => this.activeform(7)}
                    next={() => this.activeform(9)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_8}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "9" && (
                  <Step9
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(10)}
                    prev={() => this.activeform(8)}
                    next={() => this.activeform(10)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_9}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "10" && (
                  <Step10
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(11)}
                    prev={() => this.activeform(9)}
                    next={() => this.activeform(11)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_10}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "11" && (
                  <Step11
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(12)}
                    prev={() => this.activeform(10)}
                    next={() => this.activeform(12)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_11}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "12" && (
                  <Step12
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(13)}
                    prev={() => this.activeform(11)}
                    next={() => this.activeform(13)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_12}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "13" && (
                  <Step13
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(14)}
                    prev={() => this.activeform(12)}
                    next={() => this.activeform(14)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_13}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "14" && (
                  <Step14
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(15)}
                    prev={() => this.activeform(13)}
                    next={() => this.activeform(15)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_14}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "15" && (
                  <Step15
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(16)}
                    prev={() => this.activeform(14)}
                    next={() => this.activeform(16)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_15}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "16" && (
                  <Step16
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(17)}
                    prev={() => this.activeform(16)}
                    next={() => this.activeform(17)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_16}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "17" && (
                  <Step17
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(18)}
                    prev={() => this.activeform(17)}
                    next={() => this.activeform(18)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_17}
                    check={() => this.checkforvalidation()}
                  />
                )}
                {this.state.activeform == "18" && (
                  <Step18
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(19)}
                    prev={() => this.activeform(17)}
                    next={() => this.activeform(19)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_18}
                    check={() => this.checkforvalidation()}
                  />
                )}
                
                {this.state.activeform == "19" && (
                  <Dellistinicorn
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(19)}
                    prev={() => this.activeform(18)}
                    next={() => this.activeform(20)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_19}
                    validated={this.state.validated}
                    check={(ind) => this.checkforvalidation(ind)}
                  />
                )}
                {this.state.activeform == "20" && (
                  <Mediacoverager
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(20)}
                    prev={() => this.activeform(19)}
                    next={() => this.activeform(21)}
                    setMultiple={(data) => {
                        this.setState({
                          unicorn: {
                            ...this.state.unicorn,
                            ...data
                          },
                        });
                      }
                    }
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_19}
                    validated={this.state.validated}
                    check={(ind) => this.checkforvalidation(ind)}
                  />
                )}
                {this.state.activeform == "21" && (
                  <Step19
                    adminnext={this.props.adminview}
                    activate={() => this.activeform(21)}
                    prev={() => this.activeform(20)}
                    next={() => this.activeform(21)}
                    onInput={(name, value) => this.onInput(name, value)}
                    unicorn={this.state.unicorn}
                    id={this.props.id}
                    error={this.state.error_status_20}
                    validated={this.state.validated}
                    check={(ind) => this.checkforvalidation(ind)}
                  />
                )}
              </div>
            </div>
            {!this.props.adminview && (
              <div className="col-12 col-md-12 col-lg-12 col-xl-12 mx-auto mt-3">
                <div className="submit-draft-publish d-flex justify-content-center">

                  <a
                    onClick={() => {
                      if (this.validatePreview()) {
                        this.setState({ showPreview: true });
                        <Previewbutton unicorn={this.state.unicorn} />
                      } else {
                        message.error("Please tell us more about your Unicorn for preview.");
                      }
                    }}
                    className="submit-future"
                  >
                    
                    Preview
                  </a>
                         
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
        </Spin>
        <ToastContainer />
      </div>
    );
  }
}

export default Founderadmindashboard;


