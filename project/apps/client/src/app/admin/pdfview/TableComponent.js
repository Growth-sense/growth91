import React from "react";
import moment from "moment";


class TableComponent extends React.Component {
  render() {
    return (
        <div style={{padding:'20px 30px'}}>

            {/* section 1 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 1: Basic Details</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Name of Startup</td>
                        <td>{this.props.item.startup_name}</td>     
                    </tr>
         
                    <tr className='bg-light'>  
                        <td>Primary control Person (Name)</td>
                        <td>{this.props.item.primary_contact_person_name}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Primary control Person (Mobile)</td>
                        <td>{this.props.item.primary_contact_person_mobile}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Primary control Person (Email)</td>
                        <td>{this.props.item.primary_contact_person_email}</td>    
                    </tr>          
                </tbody>
            </table>   


            {/* section 2  */}
            <table 
                className="table table-hover rounded" 
                style={{width:'100% !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 2: Business Ideas</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Are you Disrupting existing market?How?</td>
                        <td>{this.props.item.is_disrupting_existing_market}</td>     
                    </tr>
         
                    <tr className='bg-light'>  
                        <td>Are you targeting new untapped market?Justify</td>
                        <td>{this.props.item.is_targeting_new_untabed_market}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>How will customers benifit?</td>
                        <td>{this.props.item.customer_benifit}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>How will you suplier benifit?</td>
                        <td>{this.props.item.suplier_benifit}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Are you focused on product or service?</td>
                        <td>{this.props.item.focused_on_product}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What are direct substitute available in market?</td>
                        <td>{this.props.item.direct_substitute_available}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What are indirect substitute available in market?</td>
                        <td>{this.props.item.indirect_substitute_available}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What are the risks perceived by you?</td>
                        <td>{this.props.item.risks_perceived}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>How roles and responsibilities distributted between team members?</td>
                        <td>{this.props.item.responsibilities_distributted_members}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What are your moats?</td>
                        <td>{this.props.item.moats}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What are the challenges for_scale up and how these will be managed?</td>
                        <td>{this.props.item.challenges_for_scale_up}</td>    
                    </tr>          
                </tbody>
            </table>   


             {/* section 3 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 3: Intellectual Property</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Trademark</td>
                        <td>{this.props.item.trademark}</td>     
                    </tr>
         
                    <tr className='bg-light'>  
                        <td>Patents</td>
                        <td>{this.props.item.patents}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Other IPs</td>
                        <td>{this.props.item.other_ips}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Other relevant details about IPs</td>
                        <td>{this.props.item.other_relevant_details}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Are all iprs registered in company</td>
                        <td>{this.props.item.all_iprs_rwgistered_in_company}</td>    
                    </tr>          
                </tbody>
            </table>    


             {/* section 4 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 4: Mobile app</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Do you have any android app?</td>
                        <td>{this.props.item.have_any_android_app_startup}</td>     
                    </tr>
         
                    <tr className='bg-light'>  
                        <td>Details</td>
                        <td>{this.props.item.app_name_details}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Do you have any IOS app?</td>
                        <td>{this.props.item.have_ios_app}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Details</td>
                        <td>{this.props.item.ios_name_details}</td>    
                    </tr>          
                              
                </tbody>
            </table>    


             {/* section 5 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 5: Industry/Market</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Which is most relevant industry classification for the startup?</td>
                        <td>{this.props.item.relevant_industry}</td>     
                    </tr>
         
                    <tr className='bg-light'>  
                        <td>Your views on industry (Past, Present and Future)</td>
                        <td>{this.props.item.views_on_industry}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Total Market size of the industry?</td>
                        <td>{this.props.item.total_market_size_of_industry}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Supporting information and the logic/rational of market size.</td>
                        <td>{this.props.item.supporting_information_of_narket_size}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Addressable Market size.</td>
                        <td>{this.props.item.supporting_information_of_demarking_addressable_market}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Supporting information and logic/rational of demarking addressable market size.</td>
                        <td>{this.props.item.supporting_information_of_narket_size}</td>    
                    </tr>          
                              
                </tbody>
            </table>    


             {/* section 6 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 6: Competition</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Local Competition(direct)</td>
                        <td>{this.props.item.direct_local_competition}</td>     
                    </tr>
         
                    <tr className='bg-light'>  
                        <td>Local Competition(indirect)</td>
                        <td>{this.props.item.in_direct_local_competition}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Global Competition(direct)</td>
                        <td>{this.props.item.direct_global_competition}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Global Competition(indirect)</td>
                        <td>{this.props.item.indirect_global_competition}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>How is your startup different from the Competition? </td>
                        <td>{this.props.item.how_different_startup_from_competition}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Why it will be difficult for the competition to do the same thing? </td>
                        <td>{this.props.item.why_difficult_competition}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What is your unfair advantage? </td>
                        <td>{this.props.item.what_are_unfair_disadvantages}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What you like the most about your competition? </td>
                        <td>{this.props.item.strength_of_your_startup}</td>    
                    </tr>          
                    {/* <tr className='bg-light'>  
                        <td>Do you know any failed venture in same domain or doing similar activities? </td>
                        <td>{this.props.item.weakness_of_startup}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What are the reasons for failure as analyzed by you? </td>
                        <td>{this.props.item.opportunities_for_startup}</td>    
                    </tr>           */}
                              
                </tbody>
            </table>    


             {/* section 7 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 7: SWOT</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'>  
                        <td>Name of the legal entity? </td>
                        <td>{this.props.item.name_of_legality_entity}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Website? </td>
                        <td>{this.props.item.website}</td>    
                    </tr>
                    <tr className='bg-light'> 
                        <td>Legal entity - CIN?</td>
                        <td>{this.props.item.cin_legality_entity}</td>     
                    </tr>         
                    <tr className='bg-light'>  
                        <td>Legal entity - PAN?</td>
                        <td>{this.props.item.pan_legality_entity}</td>    
                    </tr>  
                    <tr className='bg-light'>  
                        <td>Registered in (Country)? </td>
                        <td>{this.props.item.registered_in_country}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Formally established on(date)? </td>
                        <td>{moment(this.props.item.formality_established_date).format("DD MMM, YYYY")}</td>    
                    </tr>
                    <tr className='bg-light'> 
                        <td>Activities start date before formal establishment(if any)?</td>
                        <td>{moment(this.props.item.activities_start_date_befire_formal).format("DD MMM, YYYY")}</td>     
                    </tr>         
                    <tr className='bg-light'>  
                        <td>Address - Registered office?</td>
                        <td>{this.props.item.address_registered_office}</td>    
                    </tr>  
                    <tr className='bg-light'>  
                        <td>Address - Corporate/Working office? </td>
                        <td>{this.props.item.address_corporate_office}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Director - 1(Name)? </td>
                        <td>{this.props.item.director_1_name}</td>    
                    </tr>
                    <tr className='bg-light'>  
                        <td>Director - 1(DIN)? </td>
                        <td>{(this.props.item.director_1_din).toLocaleString()}</td>    
                    </tr>
                    <tr className='bg-light'>  
                        <td>Director - 2(Name)? </td>
                        <td>{this.props.item.director_2_name}</td>    
                    </tr>
                    <tr className='bg-light'>  
                        <td>Director - 2(DIN)? </td>
                        <td>{this.props.item.director_2_din}</td>    
                    </tr>
                    <tr className='bg-light'>  
                        <td>Director - 3(Name)? </td>
                        <td>{this.props.item.director_3_name}</td>    
                    </tr>
                    <tr className='bg-light'>  
                        <td>Director - 3(DIN)? </td>
                        <td>{this.props.item.director_3_din}</td>    
                    </tr>
                    <tr className='bg-light'>  
                        <td>Director - 4(Name)? </td>
                        <td>{this.props.item.director_4_name}</td>    
                    </tr>     
                    <tr className='bg-light'>  
                        <td>Director - 4(DIN)? </td>
                        <td>{this.props.item.director_4_din}</td>    
                    </tr>
                      
                </tbody>
            </table>
            
            {/* section 8 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 8:  Social Media Presence</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>linkdin?</td>
                        <td>{this.props.item.linkdin}</td>     
                    </tr>
         
                    <tr className='bg-light'>  
                        <td>Facebook?</td>
                        <td>{this.props.item.facebook}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Instagram?</td>
                        <td>{this.props.item.instagram}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Youtube?</td>
                        <td>{this.props.item.youtube}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Other?</td>
                        <td>{this.props.item.other}</td>    
                    </tr>          
                              
                </tbody>
            </table>


            {/* section 9 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 9:  Go to Market</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>What is your primary GTM strategy?</td>
                        <td>{this.props.item.primary_gtm_strategy}</td>     
                    </tr>
         
                    <tr className='bg-light'>  
                        <td>What is your Backup plan for GTM?</td>
                        <td>{this.props.item.backup_plan_for_strategy}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What is your existing CAC?</td>
                        <td>{(this.props.item.existing_cas).toLocaleString()}</td> 
                        {/* {console.log(this.props.item.existing_cas)}    */}
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What is your expected CAC in future?</td>
                        <td>{(this.props.item.expected_cac_in_future).toLocaleString()}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Logic/rationale behind any change in CAC in future?</td>
                        <td>{(this.props.item.rational_behinde_any_change_in_cac).toLocaleString()}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What is your LTV of a customer?</td>
                        <td>{this.props.item.ltv_of_customer}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>Logic/rationale behind LTV numbers?</td>
                        <td>{this.props.item.rational_behind_ltv_number}</td>    
                    </tr>          
                    <tr className='bg-light'>  
                        <td>What is your LTV to CAC ratio?</td>
                        <td>{this.props.item.ltv_to_cac_ratio}</td>    
                    </tr>          
                              
                </tbody>
            </table>

            {/* section 10 */}
            {/* <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 10: Financials</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Number of clients?</td>
                        <td>{this.props.item.trademark}</td>     
                    </tr>         
                              
                </tbody>
            </table>   */}

            {/* section 11 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 11: Capital</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Authorized capital of the company as on date?</td>
                        <td>{parseInt(this.props.item.authorized_captial_of_company).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Paid-up capital of the company as on date?</td>
                        <td>{parseInt(this.props.item.paid_up_capital_company).toLocaleString()}</td>     
                        {/* parseInt().toLocaleString() */}
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Percentage holding by founders?</td>
                        <td>{parseInt(this.props.item.percentage_holding_by_founders).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Percentage holding by other core team members?</td>
                        <td>{parseInt(this.props.item.percentage_holding_by_core_team).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Percentage reserved for ESOP?</td>
                        <td>{parseInt(this.props.item.reserved_for_esop).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Percentage holding of others (holding 1% and above)?</td>
                        <td>{parseInt(this.props.item.percentage_holding_of_others).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Actual amount (real cash, less salaries taken) invested by the founders?</td>
                        <td>{parseInt(this.props.item.actual_amount_real_salaries_taken).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Unsecured loans received from founders? (Amount and term of repayment)?</td>
                        <td>{parseInt(this.props.item.usecure_loans_received_from_founders).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Unsecured loans received from others? (Amount and terms of repayment)?</td>
                        <td>{parseInt(this.props.item.usecure_loans_received_from_other).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Any other secured or unsecured debt from bank or any others entity?</td>
                        <td>{parseInt(this.props.item.any_other_secured_or_ddebt_from_bank).toLocaleString()}</td>     
                    </tr>         
                              
                </tbody>
            </table> 


            {/* section 12 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 12: Salaries</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Founders' current salary (Total Rs per month) for all founders?</td>
                        <td>{parseInt(this.props.item.founders_current_salery).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Date of last increase founders salary?</td>
                        <td>{moment(this.props.item.date_of_last_increase_founders_salary).format("DD MMM, YYYY")}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Founder's salary (Plans in next 12 to 24 months)- For all founders?</td>
                        <td>Unknown</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Core Team's current salary (Total Rs per month)?</td>
                        <td>{parseInt(this.props.item.core_team_current_salary).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Total salary (all direct/indirect employees, Rs per month) - Including core team and all founders?</td>
                        <td>{parseInt(this.props.item.total_salary_including_core_team_salary).toLocaleString()}</td>     
                    </tr>      
                              
                </tbody>
            </table>  


            {/* section 13 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 13: Use of Funds </th>            
                    </tr>
                    
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Have you raised funds for your Startup previously?</td>
                        <td>{this.props.item.have_you_raised_fund_for_startup}</td>     
                    </tr>         
                              
                </tbody>
            </table>  


            {/* section 14 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 14: Use of Funds</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Funds required</td>
                        <td>{parseInt(this.props.item.funds_required).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Expected runway with current fund raise</td>
                        <td>{(this.props.item.expected_runway_with_current_fund_raise).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Desired valuation of current fund raise</td>
                        <td>{(this.props.item.desired_valuation_for_current_fund_raise).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Logic / rational for your desired valuation</td>
                        <td>{this.props.item.logic_for_desired_valuation}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Are you open to consider logical and realistic lower valuation?</td>
                        <td>{this.props.item.logical_and_realistic_lower_valuation}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>CapEx (immediately after current round )</td>
                        <td>{(this.props.item.capex_immediately).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>CapEx (future plans )</td>
                        <td>{this.props.item.capex_future_plans}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Use of funds (Product development %)</td>
                        <td>{parseInt(this.props.item.use_of_funds_product_development).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Use of funds (Marketing %)</td>
                        <td>{parseInt(this.props.item.use_of_funds_marketing).toLocaleString()  }</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Use of funds (Repayment of loans amount %)</td>
                        <td>{parseInt(this.props.item.use_of_funds_repayment).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Use of funds (Salaries %)</td>
                        <td>{parseInt(this.props.item.use_of_funds_salaries_in_per).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Use of funds (Fund raise cast and commission %)</td>
                        <td>{parseInt(this.props.item.use_of_funds_cost_and_commision).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Use of funds (Other %)</td>
                        <td>{parseInt(this.props.item.use_of_funds_other).toLocaleString()}</td>     
                    </tr>         
                              
                </tbody>
            </table>  


            {/* section 15 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 15: Compliances</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>Are you registered for GST?</td>
                        <td>{this.props.item.are_you_registered_for_gst}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Give detailed status of GST Compliance</td>
                        <td>{this.props.item.status_of_gst_compliance}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Date of audited balance sheet</td>
                        <td>{moment(this.props.item.date_of_last_audited_balance_sheet).format("DD MMM, YYYY")}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Date of filling last ITR</td>
                        <td>{moment(this.props.item.date_of_filling_last_itr).format("DD MMM, YYYY")}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Date of last AGM</td>
                        <td>{moment(this.props.item.date_of_last_agm).format("DD MMM, YYYY")}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Any pending compliance related to ROC?</td>
                        <td>{this.props.item.pending_complience_related_to_roc}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Any past delays (which are in compliance now) in compliance and reasons reason for the same )</td>
                        <td>{this.props.item.past_days}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Give list of other statutory compliance applicable</td>
                        <td>{this.props.item.list_of_other_situatory}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Name, email and mobile number of CA</td>
                        <td>{this.props.item.email_and_mobile_of_ca}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Name, email and mobile number of CS</td>
                        <td>{this.props.item.email_and_mobile_of_cs}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Name, email and mobile number of any other tax,legal or statutory consultants</td>
                        <td>{this.props.item.name_email_and_mobile_of_any_other}</td>     
                    </tr>         
                              
                </tbody>
            </table>  



            {/* section 16 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 16: Other Important Indicators</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>At what valuation/stage; you will sale and exit the business?</td>
                        <td>{this.props.item.what_valuation_will_safe}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Dependence on any specific Founder/Person? How it will be managed?</td>
                        <td>{this.props.item.dependence_on_any_specific_founder}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Regulatory Issues</td>
                        <td>{this.props.item.regulartory_issues}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Licences and permissions required and status</td>
                        <td>{this.props.item.licences_and_permissions}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Team size (past, current and immediate future)</td>
                        <td>{parseInt(this.props.item.team_size).toLocaleString()}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Is the company paying (or paid in past) commission above 5% to any investment banker or funding platform? if yes, details?</td>
                        <td>{this.props.item.is_company_paying_commision_above_5_per}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Is the company paying (or paid in past) commission above 10% to any investment banker or funding platform? if yes, details?</td>
                        <td>{this.props.item.is_company_paying_commision_above_10_per}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>What are possible / perceived exit opportunities and time line?</td>
                        <td>{this.props.item.possible_exit_opportunities}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Subsidiaries</td>
                        <td>{this.props.item.subsidiaries}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Sister concerns</td>
                        <td>{this.props.item.sister_concerns}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Related party transactions (existing and proposed )</td>
                        <td>{this.props.item.related_party_transactions}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Legal risks? Plans to mitigate risk?</td>
                        <td>{this.props.item.legal_risk_plan_to_migrate}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Any change/exit by founders earlier?</td>
                        <td>{this.props.item.amy_change_by_founders}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Demo video (Link)</td>
                        <td>{this.props.item.demo_video_link}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Any other supported documents(links)</td>
                        <td>{this.props.item.supported_documents}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Media coverage (links)</td>
                        <td>{this.props.item.media_coverage}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Awards and Recognitions</td>
                        <td>{this.props.item.awards_and_recognitions}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Are you recognized as Startup by DPIIT, Govt of India? If yes give registration number</td>
                        <td>{this.props.item.recognized_as_startup_by_dpiit}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>Any other specific information you like to share</td>
                        <td>{this.props.item.any_specific_information_to_share}</td>     
                    </tr>         
                       
                </tbody>
            </table>  


            {/* section 17 */}
            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 17: References</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>References of Customers (Name, Designation, Company, Mobile, Email, Brief about association)</td>
                        <td>{this.props.item.reference_of_customers}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>References of Vendors(Name, Designation, Company, Mobile, Email, Brief about association)</td>
                        <td>{this.props.item.reference_of_vendors}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>References of Past Employer of Founders (Name, Designation, Company, Mobile, Email, Brief about association)</td>
                        <td>{this.props.item.reference_of_past_employer}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>References of Teacher/Guide from college(Name, Designation, Company, Mobile, Email, Brief about association)</td>
                        <td>{this.props.item.reference_of_guide_from_college}</td>     
                    </tr>         
                              
                </tbody>
            </table>  


            {/* section 18 */}
            {/* <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="4" scope="col" className='prime-bg text-white rounded-top'>Section 18: Declaration</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>f1 status</td>
                        <td>f2 status</td>
                        <td>f3 status</td>
                        <td>f4 status</td>                        
                        
                    </tr>         
                    <tr className='bg-light'> 
                        
                        <td>{this.props.item.f1_status}</td>     
                        <td>{this.props.item.f2_status}</td>     
                        <td>{this.props.item.f3_status}</td>     
                        <td>{this.props.item.f4_status}</td> 
                        <br/>    
                    </tr>         
                    <tr className='bg-light'> 
                        <td>f5 status</td>
                        <td>f6 status</td>
                        <td>f7 status</td>
                        <td>f8 status</td>                        
                        
                    </tr>         
                    <tr className='bg-light'> 
                        
                        <td>{this.props.item.f5_status}</td>     
                        <td>{this.props.item.f6_status}</td>     
                        <td>{this.props.item.f7_status}</td>     
                        <td>{this.props.item.f8_status}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>f9 status</td>
                        <td>f10 status</td>
                        <td>f11 status</td>
                        <td>f12 status</td>                        
                     
                    </tr>         
                    <tr className='bg-light'> 
                        
                        <td>{this.props.item.f9_status}</td>     
                        <td>{this.props.item.f10_status}</td>     
                        <td>{this.props.item.f11_status}</td>     
                        <td>{this.props.item.f12_status}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>f13 status</td>
                        <td>f14 status</td>
                        <td>f15 status</td>
                        <td>f16 status</td>                        
                        
                    </tr>         
                    <tr className='bg-light'> 
                        
                        <td>{this.props.item.f13_status}</td>     
                        <td>{this.props.item.f14_status}</td>     
                        <td>{this.props.item.f15_status}</td>     
                        <td>{this.props.item.f16_status}</td>     
                    </tr>         
                    <tr className='bg-light'> 
                        <td>f17 status</td>
                        <td>f18 status</td>
                        <td>f19 status</td>
                        <td>f20 status</td>                        
                        
                    </tr>         
                    <tr className='bg-light'> 
                        
                        <td>{this.props.item.f17_status}</td>     
                        <td>{this.props.item.f18_status}</td>     
                        <td>{this.props.item.f19_status}</td>     
                        <td>{this.props.item.f20_status}</td>     
                    </tr>         
                              
                </tbody>
            </table>   */}


            <table 
                className="table table-hover rounded" 
                style={{width:'75vw !important'}}
            >     
                <thead>
                    <tr>
                        <th colspan="2" scope="col" className='prime-bg text-white rounded-top'>Section 18: Declaration</th>            
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-light'> 
                        <td>All the information provided is true and correct to the best of our knowledge. If at any time in future, it is found that information presented was incorrect or wrongly presented with specific intentions; we shall take sole responsibility of the consequences. If funding decisions are made based on wrong information provided by us; we shall indemnify the investors up to total invested amount.*</td>
                        {/* <td>{this.props.item.trademark}</td>      */}
                    </tr>         
                              
                </tbody>
            </table>  

        </div>
    );
  }
}

export default TableComponent