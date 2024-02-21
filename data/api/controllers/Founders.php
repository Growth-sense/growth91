<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Founders extends CI_Controller {

	public function sendotp() {

		// error_reporting(E_ALL);
		// ini_set('display_errors', 1);

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$email = $formdata['email'];
			$otp = $formdata['otp'];
			
			$sql ="SELECT * FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$res =$query->result();

			

			$num_rows =$query->num_rows();
			if(intval($num_rows) > 0) {

				// send email
				$config = Array(
				    'protocol'  => 'smtp',
				    'smtp_host' => SMTP_HOST,
				    'smtp_port' => SMTP_PORT,
				    'smtp_user' => SMTP_USER,
				    'smtp_pass' => SMTP_PASS,
				    'mailtype'  => 'text/html',
				    'starttls'  => true,
				    'newline'   => "\r\n",
				    'smtp_crypto' => 'ssl',
				    'charset' => 'utf-8',
				);

				$msg="OTP for login is $otp.";

				$this->load->library("email", $config);
            
				$result = $this->email
				->from(SMTP_FROM_EMAIL,SMTP_FROM_NAME)
				->subject("OTP Notification")
				->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
				->message($msg)->set_mailtype('html');
	
				$result = $this->email->to($email)->send();
				
				if($num_rows) {
					$response = [
						'status' => '1',
						'message' => 'Otp is sent successfully. Please check once you email address',
						'data' => $res,
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Please try again!'
					];
				}	
			}else {
				$response =[
					'status' => '0',
					'message' => 'Invalid email or not approved by system.We will get back to you soon'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
//13-08-2022 for adding new founder
function addnewfounder() {
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	$formdata = json_decode(file_get_contents('php://input'), true);
	if(!empty($formdata)) {
		    $first_name = $formdata['first_name'];
			$middle_name = $formdata['middle_name'];
			$last_name = $formdata['last_name'];
			$email = $formdata['email'];
			$mobile=$formdata['mobile'];
			$companyname = $formdata['startup_name'];
			$post_data = [
				'first_name' => $first_name,
				'middle_name' => $middle_name,
				'last_name' => $last_name,
				'email' => $email,
				'startup_name' => $companyname,
				'mobile' => $mobile,
				'user_type' => 'founder',
				'user_registered_dt' => date('Y-m-d'),
			];
			$sql="SELECT  * FROM `users` WHERE email='$email'";
			$query=$this->db->query($sql);
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
				$response=[
					'status'=>'0',
					'message'=>'You have been already registered',
				];
			}else{
				
				$this->db->insert('users', $post_data);
        	    $id =  $this->db->insert_id();
			
			    if($id) {
				// $this->uploaddealimg();
				   $response = [
					  'status' => '1',
					  'message' => 'Registration successfully.',
					  'data' => $id,
				    ];
				} 
			else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

			}
			
			
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	

}
//end founder

	function registernewfounder() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$email = $formdata['email'];
			$startup_name = $formdata['startup_name'];
			$primary_contact_person_name = $formdata['primary_contact_person_name'];
			$primary_contact_person_mobile = $formdata['primary_contact_person_mobile'];
			$primary_contact_person_email = $formdata['primary_contact_person_email'];
			$main_founder_id = $formdata['main_founder_id'];
			$post_data = [
				'email' => $email,
				'startup_name' => $startup_name,
				'primary_contact_person_name' => $primary_contact_person_name,
				'primary_contact_person_mobile' => $primary_contact_person_mobile,
				'primary_contact_person_email' => $primary_contact_person_email,
				'registered_dt' => date('Y-m-d'),
				'f1_status'=>$formdata['f1_status'],
			];
			$sql="SELECT * FROM `founders` WHERE main_founder_id='$main_founder_id'";
			$query=$this->db->query($sql);
			$count=$query->num_rows();
			$id='';
			if(intval($count)>0){
			    $this->db->where('main_founder_id', $main_founder_id);
			    $id = $this->db->update('founders', $post_data);
			}else{
			    $post_data['main_founder_id']=$main_founder_id;
			    $this->db->insert('founders', $post_data);
			    $id=$this->db->insert_id();
			}
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Registration is done successfully.',
					'id' => $id,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	

	}

	function updatefounder() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$no = $formdata['no'];
			$founder_id = $formdata['founder_id'];
			$post_data=[];

			if($no=='2') {
				$post_data = [
					'is_disrupting_existing_market' => $formdata['is_disrupting_existing_market'],
					'is_targeting_new_untabed_market' => $formdata['is_targeting_new_untabed_market'],
					'customer_benifit' => $formdata['customer_benifit'],
					'suplier_benifit' => $formdata['suplier_benifit'],
					'focused_on_product' => $formdata['focused_on_product'],
					'direct_substitute_available' => $formdata['direct_substitute_available'],
					'indirect_substitute_available' => $formdata['indirect_substitute_available'],
					'risks_perceived' => $formdata['risks_perceived'],
					'responsibilities_distributted_members' => $formdata['responsibilities_distributted_members'],
					'moats' => $formdata['moats'],
					'challenges_for_scale_up' => $formdata['challenges_for_scale_up'],
					'f2_status'=>$formdata['f2_status'],
				];
			} else if($no=='3') {
				$post_data = [
					'trademark' => $formdata['trademark'],
					'patents' => $formdata['patents'],
					'other_ips' => $formdata['other_ips'],
					'other_relevant_details' => $formdata['other_relevant_details'],
					'all_iprs_rwgistered_in_company' => $formdata['all_iprs_rwgistered_in_company'],
					'f3_status'=>$formdata['f3_status'],
				];
			}else if($no=='4') {
				$post_data = [
					'have_any_android_app_startup' => $formdata['have_any_android_app_startup'],
					'app_name_details' => $formdata['app_name_details'],
					'have_ios_app' => $formdata['have_ios_app'],
					'ios_name_details' => $formdata['ios_name_details'],
					'f4_status'=>$formdata['f4_status'],
				];
			} else if($no=='5') {
				$post_data = [
					'relevant_industry' => $formdata['relevant_industry'],
					'views_on_industry' => $formdata['views_on_industry'],
					'total_market_size_of_industry' => $formdata['total_market_size_of_industry'],
					'supporting_information_of_narket_size' => $formdata['supporting_information_of_narket_size'],
					'addressale_market_size' => $formdata['addressale_market_size'],
					'supporting_information_of_demarking_addressable_market' => $formdata['supporting_information_of_demarking_addressable_market'],
					'f5_status'=>$formdata['f5_status'],
				];
			} else if($no=='6') {
				$post_data = [
					'direct_local_competition' => $formdata['direct_local_competition'],
					'in_direct_local_competition' => $formdata['in_direct_local_competition'],
					'direct_global_competition' => $formdata['direct_global_competition'],
					'indirect_global_competition' =>$formdata['indirect_global_competition'],
					'how_different_startup_from_competition' => $formdata['how_different_startup_from_competition'],
					'why_difficult_competition' => $formdata['why_difficult_competition'],
					'what_are_unfair_disadvantages' => $formdata['what_are_unfair_disadvantages'],
					'most_about_your_competition' => $formdata['most_about_your_competition'],
					'failed_venture_in_same_domain' =>  $formdata['failed_venture_in_same_domain'],
					'resons_for_failure_after_analysing' => $formdata['resons_for_failure_after_analysing'],
					'f6_status'=>$formdata['f6_status'],
				];
			} else if($no=='7') {
				$post_data = [
					'strength_of_your_startup' => $formdata['strength_of_your_startup'],
					'weakness_of_startup' => $formdata['weakness_of_startup'],
					'opportunities_for_startup' => $formdata['opportunities_for_startup'],
					'threats_for_startup' =>$formdata['threats_for_startup'],
					'f7_status'=>$formdata['f7_status'],
				];
			} else if($no=='8') {
				$post_data = [
					'name_of_legality_entity'=> $formdata['name_of_legality_entity'],
					'website'=> $formdata['website'],
					'cin_legality_entity'=> $formdata['cin_legality_entity'],
					'pan_legality_entity'=> $formdata['pan_legality_entity'],
					'registered_in_country'=> $formdata['registered_in_country'],
					'formality_established_date'=> $formdata['formality_established_date'],
					'activities_start_date_befire_formal'=> $formdata['activities_start_date_befire_formal'],
					'address_registered_office'=> $formdata['address_registered_office'],
					'address_corporate_office'=> $formdata['address_corporate_office'],
					'director_1_name'=> $formdata['director_1_name'],
					'director_1_din'=> $formdata['director_1_din'],
					'director_2_name'=> $formdata['director_2_name'],
					'director_2_din'=> $formdata['director_2_din'],
					'director_3_name'=> $formdata['director_3_name'],
					'director_3_din'=> $formdata['director_3_din'],
					'director_4_name'=> $formdata['director_4_name'],
					'director_4_din'=> $formdata['director_4_din'],
					'f8_status'=>$formdata['f8_status'],
				];
			} else if($no=='9') {
				$post_data = [
					'linkdin' => $formdata['linkdin'],
					'facebook' => $formdata['facebook'],
					'instagram' => $formdata['instagram'],
					'youtube' => $formdata['youtube'],
					'others' => $formdata['others'],
					'f9_status'=>$formdata['f9_status'],
				];
			} else if($no=='10') {
				$post_data = [
					'primary_gtm_strategy' => $formdata['primary_gtm_strategy'],
					'backup_plan_for_strategy' => $formdata['backup_plan_for_strategy'],
					'existing_cas' => $formdata['existing_cas'],
					'expected_cac_in_future' => $formdata['expected_cac_in_future'],
					'rational_behinde_any_change_in_cac' => $formdata['rational_behinde_any_change_in_cac'],
					'ltv_of_customer' => $formdata['ltv_of_customer'],
					'rational_behind_ltv_number' => $formdata['rational_behind_ltv_number'],
					'ltv_to_cac_ratio' => $formdata['ltv_to_cac_ratio'],
					'f10_status'=>$formdata['f10_status'],
				];
			} else if($no=='11') {
				$post_data = [
					'name_of_clients' => $formdata['name_of_clients'],
					'client_retention' => $formdata['client_retention'],
					'revenue_top_5_clients' => $formdata['revenue_top_5_clients'],
					'explaination_economics_of_startup' => $formdata['explaination_economics_of_startup'],
					'total_capex_of_startup' => $formdata['total_capex_of_startup'],
					'total_amount_spent_of_product' => $formdata['total_amount_spent_of_product'],
					'major_expense_till_date' => $formdata['major_expense_till_date'],
					'f11_status'=>$formdata['f11_status'],
				];
			} else if($no=='12') {
				$post_data = [
					'authorized_captial_of_company' => $formdata['authorized_captial_of_company'],
					'paid_up_capital_company' => $formdata['paid_up_capital_company'],
					'percentage_holding_by_founders'=>$formdata['percentage_holding_by_founders'],
					'percentage_holding_by_core_team' => $formdata['percentage_holding_by_core_team'],
					'reserved_for_esop' => $formdata['reserved_for_esop'],
					'percentage_holding_of_others' => $formdata['percentage_holding_of_others'],
					'actual_amount_real_salaries_taken' => $formdata['actual_amount_real_salaries_taken'],
					'usecure_loans_received_from_founders' => $formdata['usecure_loans_received_from_founders'],
					'usecure_loans_received_from_other' => $formdata['usecure_loans_received_from_other'],
					'any_other_secured_or_ddebt_from_bank' => $formdata['any_other_secured_or_ddebt_from_bank'],
					'f12_status'=>$formdata['f12_status'],
				];
			} else if($no=='13') {
				$post_data = [
					'founders_current_salery' => $formdata['founders_current_salery'],
					'date_of_last_increase_founders_salary' => $formdata['date_of_last_increase_founders_salary'],
					'core_team_current_salary' => $formdata['core_team_current_salary'],
					'total_salary_including_core_team_salary' => $formdata['total_salary_including_core_team_salary'],
					'f13_status'=>$formdata['f13_status'],
				];
			} else if($no=='14') {
				$post_data = [
					'have_you_raised_fund_for_startup' => $formdata['have_you_raised_fund_for_startup'],
						'round_1_date'=>$formdata['round_1_date'],
				      'round_1_pre_money_validation'=>$formdata['round_1_pre_money_validation'],
				      'round_1_amount_raised'=>$formdata['round_1_amount_raised'],
				      'round_1_name_of_investor'=>$formdata['round_1_name_of_investor'],
				      'round_1_other_specific_details'=>$formdata['round_1_other_specific_details'],

				      'round_2_date'=>$formdata['round_2_date'],
				      'round_2_pre_money_validation'=>$formdata['round_2_pre_money_validation'],
				      'round_2_amount_raised'=>$formdata['round_2_amount_raised'],
				      'round_2_name_of_investor'=>$formdata['round_2_name_of_investor'],
				      'round_2_other_specific_details'=>$formdata['round_2_other_specific_details'],

				      'round_3_date'=>$formdata['round_3_date'],
				      'round_3_pre_money_validation'=>$formdata['round_3_pre_money_validation'],
				      'round_3_amount_raised'=>$formdata['round_3_amount_raised'],
				      'round_3_name_of_investor'=>$formdata['round_3_name_of_investor'],
				      'round_3_other_specific_details'=>$formdata['round_3_other_specific_details'],

				      'round_4_date'=>$formdata['round_4_date'],
				      'round_4_pre_money_validation'=>$formdata['round_4_pre_money_validation'],
				      'round_4_amount_raised'=>$formdata['round_4_amount_raised'],
				      'round_4_name_of_investor'=>$formdata['round_4_name_of_investor'],
				      'round_4_other_specific_details'=>$formdata['round_4_other_specific_details'],

				      'any_one_of_previous_investors_during_this_round'=>$formdata['any_one_of_previous_investors_during_this_round'],
				      'any_one_of_previous_investors_during_this_current_round'=>$formdata['any_one_of_previous_investors_during_this_current_round'],
				      'f14_status'=>$formdata['f14_status'],
				];
			} else if($no=='15') {
				$post_data = [
					'funds_required' => $formdata['funds_required'],
					'expected_runway_with_current_fund_raise' => $formdata['expected_runway_with_current_fund_raise'],
					'desired_valuation_for_current_fund_raise' => $formdata['desired_valuation_for_current_fund_raise'],
					'logic_for_desired_valuation' => $formdata['logic_for_desired_valuation'],
					'logical_and_realistic_lower_valuation' => $formdata['logical_and_realistic_lower_valuation'],
					'capex_immediately' => $formdata['capex_immediately'],
					'capex_future_plans' => $formdata['capex_future_plans'],
					'use_of_funds_product_development' => $formdata['use_of_funds_product_development'],
					'use_of_funds_marketing' => $formdata['use_of_funds_marketing'],
					'use_of_funds_repayment' => $formdata['use_of_funds_repayment'],
					'use_of_funds_salaries_in_per' => $formdata['use_of_funds_salaries_in_per'],
					'use_of_funds_cost_and_commision' => $formdata['use_of_funds_cost_and_commision'],
					'use_of_funds_other' => $formdata['use_of_funds_other'],
					'are_you_open_to_consider_logical_lower_valuation' => $formdata['are_you_open_to_consider_logical_lower_valuation'],
					'f15_status' => $formdata['f15_status'],
				];
			} else if($no=='16') {
				$post_data = [
					'are_you_registered_for_gst' => $formdata['are_you_registered_for_gst'],
					'status_of_gst_compliance' => $formdata['status_of_gst_compliance'],
					'date_of_last_audited_balance_sheet' => $formdata['date_of_last_audited_balance_sheet'],
					'date_of_filling_last_itr' => $formdata['date_of_filling_last_itr'],
					'date_of_last_agm' => $formdata['date_of_last_agm'],
					'pending_complience_related_to_roc' => $formdata['pending_complience_related_to_roc'],
					'past_days' => $formdata['past_days'],
					'list_of_other_situatory' => $formdata['list_of_other_situatory'],
					'email_and_mobile_of_ca' => $formdata['email_and_mobile_of_ca'],
					'email_and_mobile_of_cs' => $formdata['email_and_mobile_of_cs'],
					'name_email_and_mobile_of_any_other' => $formdata['name_email_and_mobile_of_any_other'],
					'f16_status'=>$formdata['f16_status'],
				];
			} else if($no=='17') {
				$post_data = [
					  'what_valuation_will_safe'=>$formdata['what_valuation_will_safe'],
				      'dependence_on_any_specific_founder'=>$formdata['dependence_on_any_specific_founder'],
				      'regulartory_issues'=>$formdata['regulartory_issues'],
				      'licences_and_permissions'=>$formdata['licences_and_permissions'],
				      'team_size'=>$formdata['team_size'],
				      'is_company_paying_commision_above_5_per'=>$formdata['is_company_paying_commision_above_5_per'],
				      'is_company_paying_commision_above_10_per'=>$formdata['is_company_paying_commision_above_10_per'],
				      'possible_exit_opportunities'=>$formdata['possible_exit_opportunities'],
				      'subsidiaries'=>$formdata['subsidiaries'],
				      'sister_concerns'=>$formdata['sister_concerns'],
				      'related_party_transactions'=>$formdata['related_party_transactions'],
				      'legal_risk_plan_to_migrate'=>$formdata['legal_risk_plan_to_migrate'],
				      'amy_change_by_founders'=>$formdata['amy_change_by_founders'],
				      'demo_video_link'=>$formdata['demo_video_link'],
				      'supported_documents'=>$formdata['supported_documents'],
				      'media_coverage'=>$formdata['media_coverage'],
				      'awards_and_recognitions'=>$formdata['awards_and_recognitions'],
				      'recognized_as_startup_by_dpiit'=>$formdata['recognized_as_startup_by_dpiit'],
				      'any_specific_information_to_share'=> $formdata['any_specific_information_to_share'],
				      'f17_status'=>$formdata['f17_status'],
				];
			} else if($no=='18') {
				$post_data = [
					'reference_of_customers' => $formdata['reference_of_customers'],
					'reference_of_vendors' => $formdata['reference_of_vendors'],
					'reference_of_past_employer' => $formdata['reference_of_past_employer'],
					'reference_of_guide_from_college' => $formdata['reference_of_guide_from_college'],
					'f18_status'=>$formdata['f18_status'],
				];
			}else if($no=='19') {
				$post_data = [
					'send_me_copy_of_response' => $formdata['send_me_copy_of_response'],
				];
			}
			$main_founder_id=$formdata['main_founder_id'];
			$sql="SELECT * FROM `founders` WHERE main_founder_id='$main_founder_id'";
			$query=$this->db->query($sql);
			$count=$query->num_rows();
			$res ='';
			if(intval($count)>0){
				$this->db->where('main_founder_id', $main_founder_id);
	        	$res = $this->db->update('founders', $post_data);
			}else{
				$post_data['main_founder_id']=$main_founder_id;
	        	$res = $this->db->insert('founders', $post_data);
			}
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Updated successfully.',
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function getFounderDetails() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$founder_id = $formdata['founder_id'];

			$sql = "SELECT * FROM `founders` WHERE main_founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$result = $query->result();
			
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Founder details fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	

	}

	function uploadpitchfile(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$id=$this->input->post('founder_id');

			if($id) {


		        // pdf
		        if( isset($_FILES['pitch']['name']) && $_FILES['pitch']['name'] != "") {
		            $dir = FCPATH . "uploads/founders/pitch/" . $id ."/";

		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }

		            $image = $_FILES['pitch']['tmp_name'];
		            $temp = explode(".", $_FILES["pitch"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

		            $hash = $_FILES['pitch']['name'];

		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "pitch" => $newfilename,
		                );
		                $this->db->where('main_founder_id', $id);
		                $this->db->update('founders', $image_details);
		            }
		        }

		         if(isset($_FILES['documents']['name']) && $_FILES['documents']['name'] != "") {
		            $dir = FCPATH . "uploads/founders/documents/" . $id ."/";

		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }

		            $image = $_FILES['documents']['tmp_name'];
		            $temp = explode(".", $_FILES["documents"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

		            $hash = $_FILES['documents']['name'];

		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "documents" => $newfilename,
		                );
		                $this->db->where('main_founder_id', $id);
		                $this->db->update('founders', $image_details);
		            }
		        }
		        // var_dump($this->input->post('f19_status'));
		        $sql="select * from `founders` where main_founder_id='$id'";
		        $query=$this->db->query($sql);
		        $result=$query->result();
		        if(count($result)>0){
		        	if($result[0]->pitch!='' && $result[0]->documents!=''){
		        		$image_details = array(
		                    "f19_status" => $this->input->post('f19_status'),
		                );
		                $this->db->where('main_founder_id', $id);
		                $this->db->update('founders', $image_details);
		        	}else{
		        		if((isset($_FILES['documents']['name']) && $_FILES['documents']['name'] != "")
				    	&& (isset($_FILES['pitch']['name']) && $_FILES['pitch']['name'] != "")) {
				    		 $image_details = array(
			                    "f19_status" => $this->input->post('f19_status'),
			                );
			                $this->db->where('main_founder_id', $id);
			                $this->db->update('founders', $image_details);
				        }	
		        	}
		        }

		        

				$response = [
					'status' => '1',
					'message' => 'Image is uploaded successfully.'
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
			
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}


	
}