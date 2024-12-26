import React, { Component } from 'react';
import Basic from './core-member-tab/Basic';
import Designation from './core-member-tab/Designation';
import SelfEvaluation from './core-member-tab/SelfEvaluation';
import MemberDetails from './core-member-tab/MemberDetails';
import Submission from './core-member-tab/Submission';

import Bridge from '../../constants/Bridge';
import $ from 'jquery';

class CoreTeamMember extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeform:0,
            class0:'',
            class1:'',
            class2:'',
            class3:'',
            class4:'',
            class5:'',
            class6:'',
            class7:'',
            class8:'',
            class9:'',
            class10:'',
            class11:'',
            class12:'',
            class13:'',
            class14:'',
            class15:'',
            class16:'',
            class17:'',
            class18:'',
            class19:'',
    
            error_status_0:'',
            error_status_1:'',
            error_status_2:'',
            error_status_3:'',
            error_status_4:'',
            error_status_5:'',
            error_status_6:'',
            error_status_7:'',
            error_status_8:'',
            error_status_9:'',
            error_status_10:'',
            error_status_11:'',
            error_status_12:'',
            error_status_13:'',
            error_status_14:'',
            error_status_15:'',
            error_status_16:'',
            error_status_17:'',
            error_status_18:'',
            error_status_19:'',
    
            validated:false,
        }
      }
    
      componentDidMount() {
         if(!localStorage.getItem('startup_id'))  {
          window.location.assign('/authenticate');
        }
        if(localStorage.getItem('startup_id'))  {
          this.getData();
        }
      }
    
      getData = () => {
        let params = {
          founder_id:localStorage.getItem('founder_id')
        }
        Bridge.startup_form.get_startup_details(params).then((result) => {
          if (result.status==1) { 
    
            // show for active
    //         if(result.data[0].pitch && result.data[0].documents) {
    //           this.setState({activeform:19});
    //         } else 
    //         if(result.data[0].send_me_copy_of_response) {
    //           this.setState({activeform:18});
    //         } else
    //         if(result.data[0].what_valuation_will_safe &&
    // result.data[0].dependence_on_any_specific_founder &&
    // result.data[0].regulartory_issues &&
    // result.data[0].licences_and_permissions &&
    // result.data[0].team_size &&
    // result.data[0].is_company_paying_commision_above_5_per &&
    // result.data[0].is_company_paying_commision_above_10_per &&
    // result.data[0].possible_exit_opportunities &&
    // result.data[0].subsidiaries &&
    // result.data[0].sister_concerns &&
    // result.data[0].related_party_transactions &&
    // result.data[0].legal_risk_plan_to_migrate &&
    // result.data[0].amy_change_by_founders &&
    // result.data[0].demo_video_link &&
    // result.data[0].supported_documents &&
    // result.data[0].media_coverage &&
    // result.data[0].awards_and_recognitions &&
    // result.data[0].recognized_as_startup_by_dpiit &&
    // result.data[0].any_specific_information_to_share) {
    //           this.setState({activeform:17});
    //         } else
    //         if(result.data[0].are_you_registered_for_gst &&
    // result.data[0].status_of_gst_compliance &&
    // result.data[0].date_of_last_audited_balance_sheet &&
    // result.data[0].date_of_filling_last_itr &&
    // result.data[0].date_of_last_agm &&
    // result.data[0].pending_complience_related_to_roc &&
    // result.data[0].past_days &&
    // result.data[0].list_of_other_situatory) {
    //           this.setState({activeform:16});
    //         }   else
    //         if(result.data[0].funds_required &&
    // result.data[0].expected_runway_with_current_fund_raise &&
    // result.data[0].desired_valuation_for_current_fund_raise &&
    // result.data[0].logic_for_desired_valuation &&
    // result.data[0].are_you_open_to_consider_logical_lower_valuation &&
    // result.data[0].capex_immediately &&
    // result.data[0].capex_future_plans &&
    // result.data[0].use_of_funds_product_development &&
    // result.data[0].use_of_funds_marketing &&
    // result.data[0].use_of_funds_repayment &&
    // result.data[0].use_of_funds_salaries_in_per &&
    // result.data[0].use_of_funds_cost_and_commision &&
    // result.data[0].use_of_funds_other &&
    // result.data[0].are_you_open_to_consider_logical_lower_valuation) {
    //           this.setState({activeform:15});
    //         }   else
    //         if(result.data[0].have_you_raised_fund_for_startup) {
    //           this.setState({activeform:14});
    //         }  else
    //         if(result.data[0].founders_current_salery &&
    // result.data[0].date_of_last_increase_founders_salary &&
    // result.data[0].core_team_current_salary &&
    // result.data[0].total_salary_including_core_team_salary) {
    //           this.setState({activeform:13});
    //         }   else
    //         if(result.data[0].authorized_captial_of_company &&
    // result.data[0].paid_up_capital_company &&
    // result.data[0].percentage_holding_by_core_team &&
    // result.data[0].reserved_for_esop &&
    // result.data[0].percentage_holding_of_others &&
    // result.data[0].actual_amount_real_salaries_taken &&
    // result.data[0].usecure_loans_received_from_founders &&
    // result.data[0].usecure_loans_received_from_other &&
    // result.data[0].any_other_secured_or_ddebt_from_bank ) {
    //           this.setState({activeform:12});
    //         }   else
    //         if(result.data[0].name_of_clients &&
    //           result.data[0].client_retention &&
    //           result.data[0].revenue_top_5_clients &&
    //           result.data[0].explaination_economics_of_startup &&
    //           result.data[0].total_amount_spent_of_product &&
    //           result.data[0].major_expense_till_date) {
    //           this.setState({activeform:11});
    //         }   else
    //         if(result.data[0].primary_gtm_strategy &&
    //           result.data[0].backup_plan_for_strategy &&
    //           result.data[0].existing_cas &&
    //           result.data[0].expected_cac_in_future &&
    //           result.data[0].rational_behinde_any_change_in_cac &&
    //           result.data[0].ltv_of_customer &&
    //           result.data[0].rational_behind_ltv_number &&
    //           result.data[0].ltv_to_cac_ratio ) {
    //           this.setState({activeform:10});
    //         }  else
    //         if(result.data[0].linkdin || 
    //           result.data[0].facebook  ||
    //           result.data[0].instagram ||
    //           result.data[0].youtube ||
    //           result.data[0].others
    //         ) {
    //           this.setState({activeform:9});
    //         }  else
    //         if(result.data[0].name_of_legality_entity &&
    //           result.data[0].website &&
    //           result.data[0].cin_legality_entity &&
    //           result.data[0].pan_legality_entity &&
    //           result.data[0].registered_in_country &&
    //           result.data[0].formality_established_date &&
    //           result.data[0].activities_start_date_befire_formal &&
    //           result.data[0].address_registered_office &&
    //           result.data[0].address_corporate_office &&
    //           result.data[0].director_1_name &&
    //           result.data[0].director_1_din &&
    //           result.data[0].director_2_name &&
    //           result.data[0].director_2_din &&
    //           result.data[0].director_3_name &&
    //           result.data[0].director_3_din &&
    //           result.data[0].director_4_name &&
    //           result.data[0].director_4_din ) {
    //           this.setState({activeform:8});
    //         } else
    //         if(result.data[0].strength_of_your_startup &&
    //           result.data[0].weakness_of_startup &&
    //           result.data[0].opportunities_for_startup &&
    //           result.data[0].threats_for_startup) {
    //           this.setState({activeform:7});
    //         }  else
    //         if(result.data[0].direct_local_competition &&
    //           result.data[0].in_direct_local_competition &&
    //           result.data[0].direct_global_competition &&
    //           result.data[0].indirect_global_competition &&
    //           result.data[0].how_different_startup_from_competition &&
    //           result.data[0].why_difficult_competition &&
    //           result.data[0].what_are_unfair_disadvantages &&
    //           result.data[0].most_about_your_competition) {
    //           this.setState({activeform:6});
    //         }  else
    //         if(result.data[0].relevant_industry &&
    //           result.data[0].views_on_industry &&
    //           result.data[0].total_market_size_of_industry &&
    //           result.data[0].supporting_information_of_narket_size &&
    //           result.data[0].addressale_market_size &&
    //           result.data[0].supporting_information_of_demarking_addressable_market) {
    //           this.setState({activeform:5});
    //         }  else
    //         if(result.data[0].have_any_android_app_startup &&
    //           result.data[0].have_ios_app) {
    //           this.setState({activeform:4});
    //         }  else
    //         if(result.data[0].trademark&&result.data[0].patents&&
    //         result.data[0].other_ips&&result.data[0].all_iprs_rwgistered_in_company) {
    //           this.setState({activeform:3});
    //         } else 
    //         if(result.data[0].is_disrupting_existing_market &&
    //           result.data[0].is_targeting_new_untabed_market &&
    //           result.data[0].customer_benifit &&
    //           result.data[0].suplier_benifit &&
    //           result.data[0].focused_on_product &&
    //           result.data[0].direct_substitute_available &&
    //           result.data[0].indirect_substitute_available &&
    //           result.data[0].risks_perceived &&
    //           result.data[0].responsibilities_distributted_members &&
    //           result.data[0].moats &&
    //           result.data[0].challenges_for_scale_up) {
    //           this.setState({activeform:2});
    //         }  else 
    //         if(result.data[0].email && result.data[0].startup_name && result.data[0].primary_contact_person_name
    //         && result.data[0].primary_contact_person_mobile){
    //           this.setState({activeform:1});
    //         } 
    
    //         /// showing for done
    //         if(result.data[0].send_me_copy_of_response) {
    //           this.setState({class18:' success-tab'});
    //         }
    //         if(result.data[0].what_valuation_will_safe &&
    // result.data[0].dependence_on_any_specific_founder &&
    // result.data[0].regulartory_issues &&
    // result.data[0].licences_and_permissions &&
    // result.data[0].team_size &&
    // result.data[0].is_company_paying_commision_above_5_per &&
    // result.data[0].is_company_paying_commision_above_10_per &&
    // result.data[0].possible_exit_opportunities &&
    // result.data[0].subsidiaries &&
    // result.data[0].sister_concerns &&
    // result.data[0].related_party_transactions &&
    // result.data[0].legal_risk_plan_to_migrate &&
    // result.data[0].amy_change_by_founders &&
    // result.data[0].demo_video_link &&
    // result.data[0].supported_documents &&
    // result.data[0].media_coverage &&
    // result.data[0].awards_and_recognitions &&
    // result.data[0].recognized_as_startup_by_dpiit &&
    // result.data[0].any_specific_information_to_share) {
    //           this.setState({class16:' success-tab'});
    //         }
    //         if(result.data[0].are_you_registered_for_gst &&
    // result.data[0].status_of_gst_compliance &&
    // result.data[0].date_of_last_audited_balance_sheet &&
    // result.data[0].date_of_filling_last_itr &&
    // result.data[0].date_of_last_agm &&
    // result.data[0].pending_complience_related_to_roc &&
    // result.data[0].past_days &&
    // result.data[0].list_of_other_situatory) {
    //           this.setState({class15:' success-tab'});
    //         } 
    //         if(result.data[0].funds_required &&
    // result.data[0].expected_runway_with_current_fund_raise &&
    // result.data[0].desired_valuation_for_current_fund_raise &&
    // result.data[0].logic_for_desired_valuation &&
    // result.data[0].are_you_open_to_consider_logical_lower_valuation &&
    // result.data[0].capex_immediately &&
    // result.data[0].capex_future_plans &&
    // result.data[0].use_of_funds_product_development &&
    // result.data[0].use_of_funds_marketing &&
    // result.data[0].use_of_funds_repayment &&
    // result.data[0].use_of_funds_salaries_in_per &&
    // result.data[0].use_of_funds_cost_and_commision &&
    // result.data[0].use_of_funds_other &&
    // result.data[0].are_you_open_to_consider_logical_lower_valuation) {
    //           this.setState({class14:' success-tab'});
    //         }  
    //         if(result.data[0].have_you_raised_fund_for_startup) {
    //           this.setState({class13:' success-tab'});
    //         } 
    //         if(result.data[0].founders_current_salery &&
    // result.data[0].date_of_last_increase_founders_salary &&
    // result.data[0].core_team_current_salary &&
    // result.data[0].total_salary_including_core_team_salary) {
    //           this.setState({class12:' success-tab'});
    //         }  
    //         if(result.data[0].authorized_captial_of_company &&
    // result.data[0].paid_up_capital_company &&
    // result.data[0].percentage_holding_by_core_team &&
    // result.data[0].reserved_for_esop &&
    // result.data[0].percentage_holding_of_others &&
    // result.data[0].actual_amount_real_salaries_taken &&
    // result.data[0].usecure_loans_received_from_founders &&
    // result.data[0].usecure_loans_received_from_other &&
    // result.data[0].any_other_secured_or_ddebt_from_bank ) {
    //           this.setState({class11:' success-tab'});
    //         }  
    //         if(result.data[0].name_of_clients &&
    //           result.data[0].client_retention &&
    //           result.data[0].revenue_top_5_clients &&
    //           result.data[0].explaination_economics_of_startup &&
    //           result.data[0].total_amount_spent_of_product &&
    //           result.data[0].major_expense_till_date) {
    //           this.setState({class10:' success-tab'});
    //         }  
    //         if(result.data[0].primary_gtm_strategy &&
    //           result.data[0].backup_plan_for_strategy &&
    //           result.data[0].existing_cas &&
    //           result.data[0].expected_cac_in_future &&
    //           result.data[0].rational_behinde_any_change_in_cac &&
    //           result.data[0].ltv_of_customer &&
    //           result.data[0].rational_behind_ltv_number &&
    //           result.data[0].ltv_to_cac_ratio ) {
    //           this.setState({class9:' success-tab'});
    //         } 
    //         if(result.data[0].linkdin || 
    //           result.data[0].facebook  ||
    //           result.data[0].instagram ||
    //           result.data[0].youtube ||
    //           result.data[0].others
    //         ) {
    //           this.setState({class8:' success-tab'});
    //         } 
    //         if(result.data[0].name_of_legality_entity &&
    //           result.data[0].website &&
    //           result.data[0].cin_legality_entity &&
    //           result.data[0].pan_legality_entity &&
    //           result.data[0].registered_in_country &&
    //           result.data[0].formality_established_date &&
    //           result.data[0].activities_start_date_befire_formal &&
    //           result.data[0].address_registered_office &&
    //           result.data[0].address_corporate_office &&
    //           result.data[0].director_1_name &&
    //           result.data[0].director_1_din &&
    //           result.data[0].director_2_name &&
    //           result.data[0].director_2_din &&
    //           result.data[0].director_3_name &&
    //           result.data[0].director_3_din &&
    //           result.data[0].director_4_name &&
    //           result.data[0].director_4_din ) {
    //           this.setState({class7:' success-tab'});
    //         }
    //         if(result.data[0].strength_of_your_startup &&
    //           result.data[0].weakness_of_startup &&
    //           result.data[0].opportunities_for_startup &&
    //           result.data[0].threats_for_startup) {
    //           this.setState({class6:' success-tab'});
    //         } 
    //         if(result.data[0].direct_local_competition &&
    //           result.data[0].in_direct_local_competition &&
    //           result.data[0].direct_global_competition &&
    //           result.data[0].indirect_global_competition &&
    //           result.data[0].how_different_startup_from_competition &&
    //           result.data[0].why_difficult_competition &&
    //           result.data[0].what_are_unfair_disadvantages &&
    //           result.data[0].most_about_your_competition) {
    //           this.setState({class5:' success-tab'});
    //         } 
    //         if(result.data[0].relevant_industry &&
    //           result.data[0].views_on_industry &&
    //           result.data[0].total_market_size_of_industry &&
    //           result.data[0].supporting_information_of_narket_size &&
    //           result.data[0].addressale_market_size &&
    //           result.data[0].supporting_information_of_demarking_addressable_market) {
    //           this.setState({class4:' success-tab'});
    //         } 
    //         if(result.data[0].have_any_android_app_startup &&
    //           result.data[0].have_ios_app) {
    //           this.setState({class3:' success-tab'});
    //         } 
    //         if(result.data[0].trademark && result.data[0].patents&&
    //         result.data[0].other_ips&&result.data[0].all_iprs_rwgistered_in_company) {
    //           this.setState({class2:' success-tab'});
    //         }
    //         if(result.data[0].is_disrupting_existing_market &&
    //           result.data[0].is_targeting_new_untabed_market &&
    //           result.data[0].customer_benifit &&
    //           result.data[0].suplier_benifit &&
    //           result.data[0].focused_on_product &&
    //           result.data[0].direct_substitute_available &&
    //           result.data[0].indirect_substitute_available &&
    //           result.data[0].risks_perceived &&
    //           result.data[0].responsibilities_distributted_members &&
    //           result.data[0].moats &&
    //           result.data[0].challenges_for_scale_up) {
    //           this.setState({class1:' success-tab'});
    //         }
    
            if(
              result.data[0].mobile_number &&
              result.data[0].founder_linkedin_url &&
              result.data[0].founder_designation &&
              result.data[0].founder_time_commitment &&
              result.data[0].founder_education_year &&
              result.data[0].founder_year_of_experience &&
              result.data[0].founder_previour_employment_briefs &&
              result.data[0].founder_brief_familty_background &&
              result.data[0].founder_any_specific_info &&
              result.data[0].founder_date_of_joining &&
              result.data[0].founder_strength &&
              result.data[0].founder_weakness &&
              result.data[0].founder_dreams &&
              result.data[0].founder_long_term_vision &&
              result.data[0].founder_short_term_vision
              ){
              this.setState({class1:' success-tab'});
            }
            if(
                result.data[0].email && 
                result.data[0].startup_name && 
                result.data[0].your_email && 
                result.data[0].you_name &&
                result.data[0].designation
            ){
              this.setState({class0:' success-tab'});
            } 
          } 
          
        });
      }
    
      activeform = (value) => {
        this.setState({activeform:value});
        $("html, body").animate({
          scrollTop:0
        }, 1000);
      }
    
      onChange = (value) => {
        this.setState({activeform:value});
      }
    
      activethistab=(num)=>{
        this.setState({activeform:num});
        $("html, body").animate({scrollTop:0},1000);
        this.checkforvalidation();
      }
    
      checkforvalidation=()=>{
        let params = {
          founder_id:localStorage.getItem('founder_id'),
        }
        Bridge.startup_form.get_startup_details(params).then((result) => {
          if (result.status==1) { 
    
            let validate=false;
    
    //         if(result.data[0].pitch && result.data[0].documents) {
    //           this.setState({class19:' success-tab',error_status_19:'1'});
    //           validate=true;
    //         }
    //         else{
    //           this.setState({class19:' error-tab',error_status_19:'0'});
    //           validate=false;
    //         }
            
    //         /// showing for done
    //         if(result.data[0].send_me_copy_of_response) {
    //           this.setState({class18:' success-tab',error_status_18:'1'});
    //           validate=true;
    //         }
    //         else{
    //           this.setState({class18:' error-tab',error_status_18:'0'});
    //           validate=false;
    //         }
    
    //         if(result.data[0].what_valuation_will_safe &&
    // result.data[0].dependence_on_any_specific_founder &&
    // result.data[0].regulartory_issues &&
    // result.data[0].licences_and_permissions &&
    // result.data[0].team_size &&
    // result.data[0].is_company_paying_commision_above_5_per &&
    // result.data[0].is_company_paying_commision_above_10_per &&
    // result.data[0].possible_exit_opportunities &&
    // result.data[0].subsidiaries &&
    // result.data[0].sister_concerns &&
    // result.data[0].related_party_transactions &&
    // result.data[0].legal_risk_plan_to_migrate &&
    // result.data[0].amy_change_by_founders &&
    // result.data[0].demo_video_link &&
    // result.data[0].supported_documents &&
    // result.data[0].media_coverage &&
    // result.data[0].awards_and_recognitions &&
    // result.data[0].recognized_as_startup_by_dpiit &&
    // result.data[0].any_specific_information_to_share) {
    //           this.setState({class16:' success-tab',error_status_16:'1',});
    //           validate=true;
    //         }
    //          else{
    //           this.setState({class16:' error-tab',error_status_16:'0',});
    //           validate=false;
    //         }
    
    //         if(result.data[0].are_you_registered_for_gst &&
    // result.data[0].status_of_gst_compliance &&
    // result.data[0].date_of_last_audited_balance_sheet &&
    // result.data[0].date_of_filling_last_itr &&
    // result.data[0].date_of_last_agm &&
    // result.data[0].pending_complience_related_to_roc &&
    // result.data[0].past_days &&
    // result.data[0].list_of_other_situatory) {
    //           this.setState({class15:' success-tab',error_status_15:'1'});
    //           validate=true;
    //         }  
    //         else{
    //           this.setState({class15:' error-tab',error_status_15:'0'});
    //           validate=false;
    //         }
    
    //         if(result.data[0].funds_required &&
    // result.data[0].expected_runway_with_current_fund_raise &&
    // result.data[0].desired_valuation_for_current_fund_raise &&
    // result.data[0].logic_for_desired_valuation &&
    // result.data[0].are_you_open_to_consider_logical_lower_valuation &&
    // result.data[0].capex_immediately &&
    // result.data[0].capex_future_plans &&
    // result.data[0].use_of_funds_product_development &&
    // result.data[0].use_of_funds_marketing &&
    // result.data[0].use_of_funds_repayment &&
    // result.data[0].use_of_funds_salaries_in_per &&
    // result.data[0].use_of_funds_cost_and_commision &&
    // result.data[0].use_of_funds_other &&
    // result.data[0].are_you_open_to_consider_logical_lower_valuation) {
    //           this.setState({class14:' success-tab',error_status_14:'1'});
    //           validate=true;
    //         }  
    //         else{
    //           this.setState({class14:' error-tab',error_status_14:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].have_you_raised_fund_for_startup) {
    //           this.setState({class13:' success-tab',error_status_13:'1'});
    //           validate=true;
    //         } 
    //          else{
    //           this.setState({class13:' error-tab',error_status_13:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].founders_current_salery &&
    // result.data[0].date_of_last_increase_founders_salary &&
    // result.data[0].core_team_current_salary &&
    // result.data[0].total_salary_including_core_team_salary) {
    //           this.setState({class12:' success-tab',error_status_12:'1'});
    //           validate=true;
    //         }  
    //         else{
    //           this.setState({class12:' error-tab',error_status_12:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].authorized_captial_of_company &&
    // result.data[0].paid_up_capital_company &&
    // result.data[0].percentage_holding_by_core_team &&
    // result.data[0].reserved_for_esop &&
    // result.data[0].percentage_holding_of_others &&
    // result.data[0].actual_amount_real_salaries_taken &&
    // result.data[0].usecure_loans_received_from_founders &&
    // result.data[0].usecure_loans_received_from_other &&
    // result.data[0].any_other_secured_or_ddebt_from_bank ) {
    //           this.setState({class11:' success-tab',error_status_11:'1'});
    //           validate=true;
    //         }  
    //         else{
    //           this.setState({class11:' error-tab',error_status_11:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].name_of_clients &&
    //           result.data[0].client_retention &&
    //           result.data[0].revenue_top_5_clients &&
    //           result.data[0].explaination_economics_of_startup &&
    //           result.data[0].total_amount_spent_of_product &&
    //           result.data[0].major_expense_till_date) {
    //           this.setState({class10:' success-tab',error_status_10:'1'});
    //           validate=true;
    //         }  
    //         else{
    //           this.setState({class10:' error-tab',error_status_10:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].primary_gtm_strategy &&
    //           result.data[0].backup_plan_for_strategy &&
    //           result.data[0].existing_cas &&
    //           result.data[0].expected_cac_in_future &&
    //           result.data[0].rational_behinde_any_change_in_cac &&
    //           result.data[0].ltv_of_customer &&
    //           result.data[0].rational_behind_ltv_number &&
    //           result.data[0].ltv_to_cac_ratio ) {
    //           this.setState({class9:' success-tab',error_status_9:'1'});
    //           validate=true;
    //         } 
    //          else{
    //           this.setState({class9:' error-tab',error_status_9:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].linkdin || 
    //           result.data[0].facebook  ||
    //           result.data[0].instagram ||
    //           result.data[0].youtube ||
    //           result.data[0].others
    //         ) {
    //           this.setState({class8:' success-tab',error_status_8:'1'});
    //         } 
    //         else{
    //           this.setState({class8:' error-tab',error_status_8:'0'});
    //         }
    //         if(result.data[0].name_of_legality_entity &&
    //           result.data[0].website &&
    //           result.data[0].cin_legality_entity &&
    //           result.data[0].pan_legality_entity &&
    //           result.data[0].registered_in_country &&
    //           result.data[0].formality_established_date &&
    //           result.data[0].activities_start_date_befire_formal &&
    //           result.data[0].address_registered_office &&
    //           result.data[0].address_corporate_office &&
    //           result.data[0].director_1_name &&
    //           result.data[0].director_1_din &&
    //           result.data[0].director_2_name &&
    //           result.data[0].director_2_din &&
    //           result.data[0].director_3_name &&
    //           result.data[0].director_3_din &&
    //           result.data[0].director_4_name &&
    //           result.data[0].director_4_din ) {
    //           this.setState({class7:' success-tab',error_status_7:'1'});
    //           validate=true;
    //         }
    //          else{
    //           this.setState({class7:' error-tab',error_status_7:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].strength_of_your_startup &&
    //           result.data[0].weakness_of_startup &&
    //           result.data[0].opportunities_for_startup &&
    //           result.data[0].threats_for_startup) {
    //           this.setState({class6:' success-tab',error_status_6:'1'});
    //           validate=true;
    //         } 
    //          else{
    //           this.setState({class6:' error-tab',error_status_6:'0'});
    //           validate=false;
    //         }
            
    //         if(result.data[0].direct_local_competition &&
    //           result.data[0].in_direct_local_competition &&
    //           result.data[0].direct_global_competition &&
    //           result.data[0].indirect_global_competition &&
    //           result.data[0].how_different_startup_from_competition &&
    //           result.data[0].why_difficult_competition &&
    //           result.data[0].what_are_unfair_disadvantages &&
    //           result.data[0].most_about_your_competition) {
    //           this.setState({class5:' success-tab',error_status_5:'1'});
    //           validate=true;
    //         } 
    //          else{
    //           this.setState({class5:' error-tab',error_status_5:'0'});
    //           validate=false;
    //         }
            
    //         if(result.data[0].relevant_industry &&
    //           result.data[0].views_on_industry &&
    //           result.data[0].total_market_size_of_industry &&
    //           result.data[0].supporting_information_of_narket_size &&
    //           result.data[0].addressale_market_size &&
    //           result.data[0].supporting_information_of_demarking_addressable_market) {
    //           this.setState({class4:' success-tab',error_status_4:'1'});
    //           validate=true;
    //         } 
    //          else{
    //           this.setState({class4:' error-tab',error_status_4:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].have_any_android_app_startup &&
    //           result.data[0].have_ios_app) {
    //           this.setState({class3:' success-tab',error_status_3:'1'});
    //           validate=true;
    //         } 
    //          else{
    //           this.setState({class3:' error-tab',error_status_3:'0'});
    //           validate=false;
    //         }
    //         if(result.data[0].trademark &&
    //           result.data[0].patents &&
    //           result.data[0].other_ips &&
    //           result.data[0].all_iprs_rwgistered_in_company) {
    //           this.setState({class2:' success-tab',error_status_2:'1'});
    //           validate=true;
    //         }
    //         else{
    //           this.setState({class2:' error-tab',error_status_2:'0'});
    //           validate=false;
    //         }
    
    //         if(result.data[0].is_disrupting_existing_market &&
    //           result.data[0].is_targeting_new_untabed_market &&
    //           result.data[0].customer_benifit &&
    //           result.data[0].suplier_benifit &&
    //           result.data[0].focused_on_product &&
    //           result.data[0].direct_substitute_available &&
    //           result.data[0].indirect_substitute_available &&
    //           result.data[0].risks_perceived &&
    //           result.data[0].responsibilities_distributted_members &&
    //           result.data[0].moats &&
    //           result.data[0].challenges_for_scale_up) {
    //           this.setState({class1:' success-tab',error_status_1:'1'});
    //           validate=true;
    //         }  
    //         else{
    //           this.setState({class1:' error-tab',error_status_1:'0'});
    //           validate=false;
    //         }
            // basic details
    
            if(
              result.data[0].mobile_number &&
              result.data[0].founder_linkedin_url &&
              result.data[0].founder_designation &&
              result.data[0].founder_time_commitment &&
              result.data[0].founder_education_year &&
              result.data[0].founder_year_of_experience &&
              result.data[0].founder_previour_employment_briefs &&
              result.data[0].founder_brief_familty_background &&
              result.data[0].founder_any_specific_info &&
              result.data[0].founder_date_of_joining &&
              result.data[0].founder_strength &&
              result.data[0].founder_weakness &&
              result.data[0].founder_dreams &&
              result.data[0].founder_long_term_vision &&
              result.data[0].founder_short_term_vision
              ){
              this.setState({class1:' success-tab',error_status_1:'1'});
              validate=true;
            } else {
              this.setState({class1:' error-tab',error_status_1:'0'});
              validate=false;
            }
    
            console.log('result',result);
            if(
              result.data[0].email && 
              result.data[0].startup_name && 
              result.data[0].your_email && 
              result.data[0].your_name &&
              result.data[0].designation
            ){
              this.setState({class0:' success-tab',error_status_0:'1'});
              validate=true;
            } else{
              this.setState({class0:' error-tab',error_status_0:'0'});
              validate=false;
            }
    
            this.setState({validated:validate});
          } 
        });
      }

  render() {
    return (
        <div className='row'>
        <div className="col-lg-4">
          <div className='multistep-form-icons'>
            <ul>
              <li onClick={()=>this.activethistab(0)}>
                <div>
                  <div 
                  className={this.state.activeform==0?'circle active-tab':'circle '+this.state.class0}
                  >
                    {(this.state.activeform==0 || this.state.class0=='') && '1'}
                    {this.state.activeform!=0 && this.state.class0==' success-tab' && <i style={{fontSize:28}} className='bx bx-check'></i>}
                    {this.state.activeform!=0 && this.state.class0==' error-tab' && <i style={{fontSize:28}} className='bx bx-x'></i>}
                  </div>
                  <span>Basic Details</span>
                  <div className='line'></div>
                </div>
              </li>
              <li onClick={()=>this.activethistab(1)}>
                <div>
                  <div 
                  className={this.state.activeform==1?'circle active-tab':'circle '+this.state.class1}
                  >
                    {(this.state.activeform==1 || this.state.class1=='') && '2'}
                    {this.state.activeform!=1 && this.state.class1==' success-tab' && <i style={{fontSize:28}} className='bx bx-check'></i>}
                    {this.state.activeform!=1 && this.state.class1==' error-tab' && <i style={{fontSize:28}} className='bx bx-x'></i>}
                  </div>
                  <span>Designation Profile Details</span>
                  <div className='line'></div>
                </div>
              </li>
              <li onClick={()=>this.activethistab(2)}>
                <div>
                  <div 
                  className={this.state.activeform==2?'circle active-tab':'circle '+this.state.class2}
                  >
                    {(this.state.activeform==2 || this.state.class2=='') && '3'}
                    {this.state.activeform!=2 && this.state.class2==' success-tab' && <i style={{fontSize:28}} className='bx bx-check'></i>}
                    {this.state.activeform!=2 && this.state.class2==' error-tab' && <i style={{fontSize:28}} className='bx bx-x'></i>}
                  </div>
                  <span>Self Evaluation</span>
                  <div className='line'></div>
                </div>
              </li>
              <li onClick={()=>this.activethistab(3)}>
                <div>
                  <div 
                  className={this.state.activeform==3?'circle active-tab':'circle'+this.state.class3}
                  >
                    {(this.state.activeform==3 || this.state.class3=='') && '4'}
                    {this.state.activeform!=3 && this.state.class3==' success-tab' && <i style={{fontSize:28}} className='bx bx-check'></i>}
                    {this.state.activeform!=3 && this.state.class3==' error-tab' && <i style={{fontSize:28}} className='bx bx-x'></i>}
                  </div>
                  <span>Member Details</span>
                  <div className='line'></div>
                </div>
              </li>
              <li onClick={()=>this.activethistab(4)}>
                <div>
                <div 
                  className={this.state.activeform==4?'circle active-tab':'circle'+this.state.class4}
                  >
                    {(this.state.activeform==4 || this.state.class4=='') && '5'}
                    {this.state.activeform!=4 && this.state.class4==' success-tab' && <i style={{fontSize:28}} className='bx bx-check'></i>}
                    {this.state.activeform!=4 && this.state.class4==' error-tab' && <i style={{fontSize:28}} className='bx bx-x'></i>}
                  </div>
                  <span>Submission</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-8">
          {this.state.activeform=='0' && (
            <Basic 
              activate={() => this.activeform(1)} 
              next={() => this.activeform(1)} 
              fatchdata={()=>this.getData()}
              error={this.state.error_status_0}
            />
          )}
          {this.state.activeform=='1' && (
            <Designation 
              activate={() => this.activeform(2)} 
              prev={() => this.activeform(0)}  
              next={() => this.activeform(2)}  
              onClick={() => this.activatethisform(1)}
              fatchdata={()=>this.getData()}
              error={this.state.error_status_1}
            />
          )}
          {this.state.activeform=='2' && (
            <SelfEvaluation 
              activate={() => this.activeform(3)} 
              prev={() => this.activeform(1)}  
              next={() => this.activeform(3)} 
              fatchdata={()=>this.getData()}
              error={this.state.error_status_2}
            />
          )}                    
          {this.state.activeform=='3' && (
            <MemberDetails 
              activate={() => this.activeform(4)}
              prev={() => this.activeform(2)}  
              next={() => this.activeform(4)} 
              fatchdata={()=>this.getData()}
              error={this.state.error_status_3}
            />
          )}                    
          {this.state.activeform=='4' && (
            <Submission 
              activate={() => this.activeform(5)}
              prev={() => this.activeform(3)}  
              next={() => this.activeform(5)}  
              fatchdata={()=>this.getData()}
              error={this.state.error_status_4}
            />
          )}  
        </div>
      </div>
    )
  }
}

export default CoreTeamMember;
