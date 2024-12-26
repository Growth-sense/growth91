import React, { Component } from 'react';
import { 
  Layout, Breadcrumb, Card,Table,message,Button,
Input } from 'antd';
import Sidebar2 from './common/Sidebar2';
import Navbar from './common/Navbar';
import BottomBar from './common/BottomBar';
import moment from 'moment';
import Bridge from '../constants/Bridge';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const { Content } = Layout;
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class FounderformdetailsPdf extends Component {

  constructor(props){
    super(props);
    this.state={
      searchinput:'',
      loading:false,
      list:[],
      clist:[],
    }
  }

  componentDidMount() {
    this.getformdetails();
  }

  // get post list
  getformdetails = () => {
    this.setState({ loading: true });
    Bridge.admin.admin_get_founder_form_details().then((result) => {
      if (result.status == 1) {
        console.log('result',result.data);
        this.setState({
          list: result.data,
          clist: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({loading: false,});
      }
    });
  }

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading:true,searchinput:text });
    if(text) {
      let arr = [];
      for(let item of this.state.clist) {
        if(
          item.name && item.name.includes(text) ||
          item.first_name && item.first_name.includes(text) ||
          item.last_name && item.last_name.includes(text) ||
          item.payment_date && item.payment_date.includes(text) ||
          item.payment_amount && item.payment_amount.includes(text) ||
          item.description && item.description.includes(text) ||
          item.payment_ref && item.payment_ref.includes(text)
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        list: arr,
        loading:false,
      });
    } else {
      this.setState({
        list: this.state.clist,
        loading:false,
      });
    }
  }

  exportToCSVF = (fileName,item) => {
    // console.log('item',item);
    let arr = [];
    let obj = {
      'Founder Id':item.founder_id,
      'Main Founder Id':item.main_founder_id,
      'Register Date':item.registered_dt,
      'Email':item.email,
      'Name Of Startup':item.startup_name,
      'Primary Contact Person(Name)':item.primary_contact_person_name,
      'Primary Contact Person (Mobile)':item.primary_contact_person_mobile,
      'Primary Contact Person (Email)':item.primary_contact_person_email,
      'Are you Disrupting existing market?How?':item.is_disrupting_existing_market,
      'Are you targeting new untapped market?Justify':item.is_targeting_new_untabed_market,
      'customer_benifit':item.customer_benifit,
      'suplier_benifit ':item.suplier_benifit ,
      'focused_on_product ':item.focused_on_product,
      'direct_substitute_available':item.direct_substitute_available,
      'indirect_substitute_available':item.indirect_substitute_available,
      'risks_perceived':item.risks_perceived,
      'responsibilities_distributted_members':item.responsibilities_distributted_members,
      'moats':item.moats,
      'challenges_for_scale_up':item.challenges_for_scale_up,
      'trademark':item.trademark,
      'patents':item.patents,
      'other_ips':item.other_ips,
      'other_relevant_details':item.other_relevant_details,
      'all_iprs_rwgistered_in_company':item.all_iprs_rwgistered_in_company,
      'have_any_android_app_startup':item.have_any_android_app_startup,
      'app_name_details':item.app_name_details,
      'have_ios_app':item.have_ios_app,
      'ios_name_details':item.ios_name_details,
      'relevant_industry':item.relevant_industry,
      'views_on_industry':item.views_on_industry,
      'total_market_size_of_industry':item.total_market_size_of_industry,
      'supporting_information_of_narket_size':item.supporting_information_of_narket_size,
      'addressale_market_size':item.addressale_market_size,
      'supporting_information_of_demarking_addressable_market':item.supporting_information_of_demarking_addressable_market,
      'direct_local_competition':item.direct_local_competition,
      'in_direct_local_competition':item.in_direct_local_competition,
      'direct_global_competition':item.direct_global_competition,
      'indirect_global_competition':item.indirect_global_competition,
      'how_different_startup_from_competition':item.how_different_startup_from_competition,
      'why_difficult_competition':item.why_difficult_competition,
      'what_are_unfair_disadvantages':item.what_are_unfair_disadvantages,
      'strength_of_your_startup':item.strength_of_your_startup,
      'weakness_of_startup':item.weakness_of_startup,
      'opportunities_for_startup':item.opportunities_for_startup,
      'threats_for_startup':item.threats_for_startup,
      'name_of_legality_entity':item.name_of_legality_entity,
      'website':item.website,
      'cin_legality_entity':item.cin_legality_entity,
      'pan_legality_entity':item.pan_legality_entity,
      'registered_in_country':item.registered_in_country,
      'formality_established_date':item.formality_established_date,
      'activities_start_date_befire_formal':item.activities_start_date_befire_formal,
      'address_registered_office':item.address_registered_office,
      'address_corporate_office':item.address_corporate_office,
      'director_1_name':item.director_1_name,
      'director_1_din':item.director_1_din,
      'director_2_name':item.director_2_name,
      'director_2_din':item.director_2_din,
      'director_3_name':item.director_3_name,
      'director_3_din':item.director_3_din,
      'director_4_name':item.director_4_name,
      'director_4_din':item.director_4_din,
      'linkdin':item.linkdin,
      'facebook':item.facebook,
      'instagram':item.instagram,
      'youtube':item.youtube,
      'other':item.other,
      'primary_gtm_strategy':item.primary_gtm_strategy,
      'backup_plan_for_strategy':item.backup_plan_for_strategy,
      'existing_cas':item.existing_cas,
      'expected_cac_in_future':item.expected_cac_in_future,
      'rational_behinde_any_change_in_cac':item.rational_behinde_any_change_in_cac,
      'ltv_of_customer':item.ltv_of_customer,
      'rational_behind_ltv_number':item.rational_behind_ltv_number,
      'ltv_to_cac_ratio':item.ltv_to_cac_ratio,
      'authorized_captial_of_company':item.authorized_captial_of_company,
      'paid_up_capital_company':item.paid_up_capital_company,
      'percentage_holding_by_founders':item.percentage_holding_by_founders,
      'percentage_holding_by_core_team':item.percentage_holding_by_core_team,
      'reserved_for_esop':item.reserved_for_esop,
      'percentage_holding_of_others':item.percentage_holding_of_others,
      'actual_amount_real_salaries_taken':item.actual_amount_real_salaries_taken,
      'usecure_loans_received_from_founders':item.moats,
      'usecure_loans_received_from_other':item.usecure_loans_received_from_other,
      'any_other_secured_or_ddebt_from_bank':item.any_other_secured_or_ddebt_from_bank,
      'founders_current_salery':item.founders_current_salery,
      'date_of_last_increase_founders_salary':item.date_of_last_increase_founders_salary,
      'core_team_current_salary':item.core_team_current_salary,
      'total_salary_including_core_team_salary':item.total_salary_including_core_team_salary,
      'have_you_raised_fund_for_startup':item.have_you_raised_fund_for_startup,
      'most_about_your_competition':item.most_about_your_competition,
      'failed_venture_in_same_domain':item.failed_venture_in_same_domain,
      'resons_for_failure_after_analysing':item.resons_for_failure_after_analysing,
      'name_of_clients':item.name_of_clients,
      'client_retention':item.client_retention,
      'revenue_top_5_clients':item.revenue_top_5_clients,
      'explaination_economics_of_startup':item.explaination_economics_of_startup,
      'total_capex_of_startup':item.total_capex_of_startup,
      'total_amount_spent_of_product':item.total_amount_spent_of_product,
      'major_expense_till_date':item.major_expense_till_date,
      'funds_required':item.funds_required,
      'expected_runway_with_current_fund_raise':item.expected_runway_with_current_fund_raise,
      'desired_valuation_for_current_fund_raise':item.desired_valuation_for_current_fund_raise,
      'logic_for_desired_valuation':item.logic_for_desired_valuation,
      'logical_and_realistic_lower_valuation':item.logical_and_realistic_lower_valuation,
      'capex_immediately':item.capex_immediately,
      'capex_future_plans':item.capex_future_plans,
      'use_of_funds_product_development':item.use_of_funds_product_development,
      'use_of_funds_marketing':item.use_of_funds_marketing,
      'use_of_funds_repayment':item.use_of_funds_repayment,
      'use_of_funds_salaries_in_per':item.use_of_funds_salaries_in_per,
      'use_of_funds_cost_and_commision':item.use_of_funds_cost_and_commision,
      'use_of_funds_other':item.use_of_funds_other,
      'are_you_open_to_consider_logical_lower_valuation':item.are_you_open_to_consider_logical_lower_valuation,
      'are_you_registered_for_gst':item.are_you_registered_for_gst,
      'status_of_gst_compliance':item.status_of_gst_compliance,
      'date_of_last_audited_balance_sheet':item.date_of_last_audited_balance_sheet,
      'date_of_filling_last_itr':item.date_of_filling_last_itr,
      'date_of_last_agm':item.date_of_last_agm,
      'pending_complience_related_to_roc':item.pending_complience_related_to_roc,
      'past_days':item.past_days,
      'list_of_other_situatory':item.list_of_other_situatory,
      'email_and_mobile_of_ca':item.email_and_mobile_of_ca,
      'email_and_mobile_of_cs':item.email_and_mobile_of_cs,
      'name_email_and_mobile_of_any_other':item.name_email_and_mobile_of_any_other,
      'reference_of_customers':item.reference_of_customers,
      'reference_of_vendors':item.reference_of_vendors,
      'reference_of_past_employer':item.reference_of_past_employer,
      'reference_of_guide_from_college':item.reference_of_guide_from_college,
      'send_me_copy_of_response':item.send_me_copy_of_response,
      'what_valuation_will_safe':item.what_valuation_will_safe,
      'dependence_on_any_specific_founder':item.dependence_on_any_specific_founder,
      'regulartory_issues':item.regulartory_issues,
      'licences_and_permissions':item.licences_and_permissions,
      'team_size':item.team_size,
      'is_company_paying_commision_above_5_per':item.is_company_paying_commision_above_5_per,
      'is_company_paying_commision_above_10_per':item.is_company_paying_commision_above_10_per,
      'possible_exit_opportunities':item.possible_exit_opportunities,
      'subsidiaries':item.subsidiaries,
      'sister_concerns':item.sister_concerns,
      'related_party_transactions':item.related_party_transactions,
      'legal_risk_plan_to_migrate':item.legal_risk_plan_to_migrate,
      'amy_change_by_founders':item.amy_change_by_founders,
      'demo_video_link':item.demo_video_link,
      'supported_documents':item.supported_documents,
      'media_coverage':item.media_coverage,
      'awards_and_recognitions':item.awards_and_recognitions,
      'recognized_as_startup_by_dpiit':item.recognized_as_startup_by_dpiit,
      'any_specific_information_to_share':item.any_specific_information_to_share,
      'pitch':item.pitch,
      'documents':item.documents,
      'round_1_date':item.round_1_date,
      'round_1_pre_money_validation':item.round_1_pre_money_validation,
      'round_1_amount_raised':item.round_1_amount_raised,
      'round_1_name_of_investor':item.round_1_name_of_investor,
      'round_1_other_specific_details':item.round_1_other_specific_details,
      'round_2_date':item.round_2_date,
      'moround_2_pre_money_validationats':item.moround_2_pre_money_validationats,
      'round_2_amount_raised':item.round_2_amount_raised,
      'round_2_name_of_investor':item.round_2_name_of_investor,
      'round_2_other_specific_details':item.round_2_other_specific_details,
      'round_3_date':item.round_3_date,
      'round_3_pre_money_validation':item.round_3_pre_money_validation,
      'round_3_amount_raised':item.round_3_amount_raised,
      'round_3_name_of_investor':item.round_3_name_of_investor,
      'round_3_other_specific_details':item.round_3_other_specific_details,
      'round_4_date':item.round_4_date,
      'round_4_pre_money_validation':item.round_4_pre_money_validation,
      'round_4_amount_raised':item.round_4_amount_raised,
      'round_4_name_of_investor':item.round_4_name_of_investor,
      'round_4_other_specific_details':item.round_4_other_specific_details,
      'f1_status':item.f1_status,
      'f2_status':item.f2_status,
      'f3_status':item.f3_status,
      'f4_status':item.f4_status,
      'f5_status':item.f5_status,
      'f6_status':item.f6_status,
      'f7_status':item.f7_status,
      'f8_status':item.f8_status,
      'f9_status':item.f9_status,
      'f10_status':item.f10_status,
      'f11_status':item.f11_status,
      'f12_status':item.f12_status,
      'f13_status':item.f13_status,
      'f14_status':item.f14_status,
      'f15_status':item.f15_status,
      'f16_status':item.f16_status,
      'f17_status':item.f17_status,
      'f18_status':item.f18_status,
      'f19_status':item.f19_status,
      'f20_status':item.f20_status,
      'f12_status':item.f12_status,
      'any_one_of_previous_investors_during_this_round':item.any_one_of_previous_investors_during_this_round,
      'any_one_of_previous_investors_during_this_current_round':item.any_one_of_previous_investors_during_this_current_round,
      
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

  exportToCSVA = (fileName,item) => {
    // console.log('item',item);
    let arr = [];
    let obj = {
      'Founder Id':item.founder_id, 
      'Main Founder Id':item.main_founder_id,
      // 'By Founder Id':item.submitted_by_user_id,    
      'Primary Contact Person(Name)':item.primary_contact_person_name,
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

  openpitchfile=(pitchfile,founder_id)=>{
    let link = `${process.env.REACT_APP_BASE_URL}api/uploads/founders/pitch/${founder_id}/${pitchfile}`;
    window.open(link,'_blank');
  }

  opendocumentfile=(document,founder_id)=>{
    let link = `${process.env.REACT_APP_BASE_URL}api/uploads/founders/documents/${founder_id}/${document}`;
    window.open(link,'_blank');
  }

  xportToCSV = (fileName) => {
    let arr = [];
    let count=1;
    for (let item of this.state.investors) {
      let status='';
      if(item.kycstatus=='Approved'){
        status='Approved';
      } else if(item.kycstatus=='Rejected'){
        status='Rejected';
      } else if(item.kycstatus=='Pending' || item.kycstatus==''){
        status='Pending';
      }
      let obj = {
        "Sr No": count++,
        "Investor Id":item.investor_id,
        "Name": item.first_name +' '+item.last_name,
        "Contact No": item.mobile,
        "Email": item.email,
        "kyc":status,
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
    
  render() {

  const dataSource = this.state.list && this.state.list.map((item, index) => {
    return {
      key: index, 
      srno:index+1,
      founder_id:item.main_founder_id,
      Name: item.primary_contact_person_name,
      pitch:item,
      document:item, 
    }
  });

  // const dataSource2 = this.state.investors && this.state.investors.map((item, index) => {
  //   return {
  //     key: index,
  //     investorid: item.investor_id,
  //     name: item.first_name +' '+item.last_name,
  //     contactno: item.mobile ? item.mobile :'---',
  //     email: item.email ? item.email : '---',
  //     action: item,
  //     kyc:item,
  //   }
  // });
  
  const columns = [
    {
      title: 'Sr No.',
      dataIndex: 'srno',
      key: 'srno',
      width: 160,
      fixed: 'left',
    },
    {
      title: 'Founder Id',
      dataIndex: 'founder_id',
      key: 'founder_id',
      width: 160,
      fixed: 'left',
    },
    {
      title: 'Founder Name',
      dataIndex: 'Name',
      key: 'Name',
      width: 160,
      fixed: 'left',
    },
    {
      title: 'Pitch',
      dataIndex: 'pitch',
      key: 'pitch',
      width: 180,
      render:(text)=>{
        let pitchfile=text.pitch;
        let founder_id=text.main_founder_id;
        return(
          <div>
            {pitchfile ? (
              <Button type="primary" onClick={()=>this.openpitchfile(pitchfile,founder_id)}>
                Open Link
              </Button>
            ):(
              <p>Not Available.</p>
            )}
          </div>
        )
      }
    },
    {
      title: 'Document',
      dataIndex: 'document',
      key: 'document',
      width: 180,
      render:(text)=>{
        let documents=text.documents;
        let founder_id=text.main_founder_id;
        return(
          <div>
            {documents ? (
              <Button type="primary" onClick={()=>this.opendocumentfile(documents,founder_id)}>
                Open Link
              </Button>
            ):(
              <p>Not Available.</p>
            )}
          </div>
        )
      }
    },
    {
      title: 'Founder',
      dataIndex: 'document',
      key: 'document',
      width: 180,
      render:(text)=>{
        let documents=text.documents;
        let founder_id=text.main_founder_id;
        return(
          <div>
            
          <Button type="primary" onClick={()=>this.exportToCSVF('Founders list',text)}>
            Export <i class='bx bx-cloud-download ps-2 pt-1' style={{fontSize: "1rem"}}></i>
          </Button>
          
            <a href='#'> View <i class='bx bx-window-open px-2' style={{fontSize: "1rem"}}></i></a>
          
        
          {/* <p>Not Available.</p> */}
        
      </div>
        )
      }
    },
    {
      title: 'Assessment', 
      dataIndex: 'document',
      key: 'document',
      width: 180,
      render:(text)=>{
        let documents=text.documents;
        let founder_id=text.main_founder_id;
        return(
          <div>
             <Button type="primary" onClick={()=>this.exportToCSVA('Assesment list',text)}>
            Open Link
          </Button>
          </div>
        )
      }
    },
  ];
    
  return (
    <>
     <Layout
        style={{ minHeight: '100vh',marginTop:0 }}
         className='main-dashboard-container '
      >
 
{/* <table className='fdtable'>
  <tr>
    <th colspan="2">Company</th>
    
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>

  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>

  </tr>
</table> */}

{/* Section 1: */}
      <table class="table table-hover my-4 mx-5 rounded  w-75" >     
        <thead>
          <tr>
            <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 1: Basic Details</th>            
          </tr>
        </thead>
        <tbody>
          <tr className='bg-light'> 
            <td>Name of Startup</td>
            <td>{this.state.startup_name}Name of Startup (Name)</td>     
          </tr>
          <tr className='bg-light'>  
            <td>Primary control Person</td>
            <td>Primary control Person (Name)</td>    
          </tr>          
        </tbody>
      </table>

      {/* Section 2: */}
      <table class="table table-hover my-4 mx-5 rounded  w-75" >     
        <thead>
          <tr>
            <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 2: Idea Business</th>            
          </tr>
        </thead>
        <tbody>
          <tr className='bg-light'> 
            <td>Name of Startup</td>
            <td>{this.state.startup_name}Name of Startup (Name)</td>     
          </tr>
          <tr className='bg-light'>  
            <td>Primary control Person</td>
            <td>Primary control Person (Name)</td>    
          </tr>          
        </tbody>
      </table>
      

    </Layout>

    </>
  );
  }
}

export default FounderformdetailsPdf;