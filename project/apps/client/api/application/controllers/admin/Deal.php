<?php
use LDAP\Result;
defined('BASEPATH') or exit('No direct script access allowed');

class Deal extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model(['admin/Blogmodel']);
	}
	// DEAL LIST
	public function list()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT *,deals.deal_type,startups.name as deal_t_type,deals.deal_end_date as deal_deal_end_date FROM `deals` 
		LEFT JOIN startups on startups.startupid = deals.startup_id
		ORDER BY deal_id DESC;";
		$query = $this->db->query($sql);
		$list = $query->result();
		for ($i = 0; $i < count($list); $i++) {
			$deal_id=$list[$i]->deal_id;
			$totalSql="SELECT SUM(amount) As total_investment FROM `investor_commitment` WHERE `parent_id`=0 AND`deal_id`='$deal_id'";
			$query1 = $this->db->query($totalSql);
			$data2=$query1->result();
			$list[$i]->total_invested_amount=$data2[0]->total_investment;

			// get invitation list
			$sql2 = "SELECT * FROM `private_deal_invities` WHERE `deal_id`='$deal_id'";
			$query2 = $this->db->query($sql2);
			$data3=$query2->result();
			$num_rows = $query2->num_rows();
			if($list[$i] -> deal_type == "Private" || $list[$i] -> deal_type == "Public"){
				$list[$i]->total_invitions=$num_rows;
			}else{
				$list[$i]->total_invitions='0';
			}
			$arr=[];
			for($c=0;$c<count($data3);$c++){
				if($data3[$c]->investor_id!="0"){
					array_push($arr, $data3[$c]->investor_id);
				}
			}
			$list[$i]->invitations=$arr;
		}
		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Deal list is fetched successfully.',
				'data' => $list,
			];
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	
	public function close_list()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT *,deals.deal_type,startups.name as deal_t_type,deals.deal_end_date as deal_deal_end_date FROM `deals` 
		LEFT JOIN startups on startups.startupid = deals.startup_id
		WHERE deals.deal_status = 'Closed'
		ORDER BY deal_id DESC;";

		$query = $this->db->query($sql);
		$list = $query->result();
		for ($i = 0; $i < count($list); $i++) {
			$deal_id=$list[$i]->deal_id;
			$totalSql="SELECT SUM(Investment_amt) As total_investment FROM `investments` WHERE `deal_id`='$deal_id'";
			$query1 = $this->db->query($totalSql);
			$data2=$query1->result();
			$list[$i]->total_invested_amount=$data2[0]->total_investment;

			// get invitation list
			$sql2 = "SELECT * FROM `private_deal_invities` WHERE `deal_id`='$deal_id'";
			$query2 = $this->db->query($sql2);
			$data3=$query2->result();
			$num_rows = $query2->num_rows();
			if($list[$i] -> deal_type == "Private" || $list[$i] -> deal_type == "Public"){
				$list[$i]->total_invitions=$num_rows;
			}else{
				$list[$i]->total_invitions='0';
			}
			$arr=[];
			for($c=0;$c<count($data3);$c++){
				if($data3[$c]->investor_id!="0"){
					array_push($arr, $data3[$c]->investor_id);
				}
			}
			$list[$i]->invitations=$arr;
		}
		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Deal list is fetched successfully.',
				'data' => $list,
			];
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function display_investor_commitment_list()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		
		$deal_id = $this -> input -> get("deal_id");

		if(empty($deal_id))
		{
			$response = [
				'status' => '0',
				'message' => 'All Field Data Required'
			];
		}
		else
		{
			/*$this -> db -> select("investor_commitment.*,users.first_name, users.last_name, deals.deal_name");
			$this -> db -> from("investor_commitment");
			$this -> db -> join("deals","deals.deal_id = investor_commitment.deal_id");
			$this -> db -> join("users","users.investor_id = investor_commitment.investor_id");
			$this -> db -> where("investor_commitment.parent_id",0);
			$this -> db -> where("investor_commitment.deal_id",$deal_id);*/
			
			 
			$this -> db -> select("investor_commitment.*,users.kycstatus,users.email,users.first_name,users.last_name,deals.deal_name, user_pan_details.pan as kyc_pan, user_adhar_details.address as kyc_address, user_adhar_details.care_of as kyc_fathername,mobile,user_pan_details.father_name as pan_fathername,user_pan_details.registered_name as pan_registered_name,user_pan_details.name_provided as pan_name_provided");
			$this -> db -> from("investor_commitment");
			$this -> db -> join("deals","deals.deal_id = investor_commitment.deal_id");
			$this -> db -> join("users","users.investor_id = investor_commitment.investor_id");
			$this -> db -> join("user_adhar_details","user_adhar_details.user_id = users.investor_id","left");
			$this -> db -> join("user_pan_details","user_pan_details.user_id = users.investor_id","left");
			
			$this -> db -> where("investor_commitment.parent_id",0);
			$this -> db -> where("investor_commitment.deal_id",$deal_id);

			$status = $this -> db -> get() -> result_array();

			if($status)
			{
				foreach($status as $Key => $Value)
				{
					$this -> db -> select("investor_commitment.*,users.kycstatus,users.email,users.first_name,users.last_name,deals.deal_name, user_pan_details.pan as kyc_pan, user_adhar_details.address as kyc_address, user_adhar_details.care_of as kyc_fathername, mobile,user_pan_details.father_name as pan_fathername,user_pan_details.registered_name as pan_registered_name,user_pan_details.name_provided as pan_name_provided");
					$this -> db -> from("investor_commitment");
					$this -> db -> join("deals","deals.deal_id = investor_commitment.deal_id");
					$this -> db -> join("users","users.investor_id = investor_commitment.investor_id");
					$this -> db -> join("user_adhar_details","user_adhar_details.user_id = users.investor_id","left");
					$this -> db -> join("user_pan_details","user_pan_details.user_id = users.investor_id","left");
					$this -> db -> where("investor_commitment.parent_id",$Value['id']);
					$this -> db -> where("investor_commitment.deal_id",$deal_id);
					$status[$Key][] = $this -> db -> get() -> result_array();
				}
 
				$response = [
					'status' => '1',
					'message' => 'Investor Commitment List Fetch Successfully.',
					'data' => $status,
				];
			}
			else
			{
				$response =[
					'status' => '0',
					'message' => 'Investor Commitment List Is Empty, Please try again!'
				];
			}
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}

	function accept_payment_for_deal()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		
		$deal_id = $this -> input -> post("deal_id");

		if(empty($deal_id))
		{
			$response = [
				'status' => '0',
				'message' => 'Deal Id Required'
			];
		}
		else
		{
			$investor_commitment = $this -> db -> select("users.kycstatus,users.email,users.first_name,users.last_name,deals.deal_name,investor_commitment.amount,investor_commitment.processingfees") -> from("investor_commitment") -> join("deals","deals.deal_id = investor_commitment.deal_id","left") -> join("users","users.investor_id = investor_commitment.investor_id","left") -> where("investor_commitment.parent_id",0) -> where("investor_commitment.deal_id",$deal_id) -> get() -> result_array();
			
				
			
			$this -> db -> where("deal_id",$deal_id);
			$status = $this -> db -> update("deals",["accept_payment" => "yes"]);

			if($status)
			{
				$this->load->helper('send_email');
				$body='';
				
				
				foreach($investor_commitment as $Key => $Value)
				{
				$body='<!doctype html>
					      <html>
					              <head>
					                <meta name="viewport" content="width=device-width, initial-scale=1.0">
					                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
					                <title> Deal Payment Success</title>
					                <style>
					            @media only screen and (max-width: 620px) {
					              table.body h1 {
					                font-size: 28px !important;
					                margin-bottom: 10px !important;
					              }
					            
					              table.body p,
					            table.body ul,
					            table.body ol,
					            table.body td,
					            table.body span,
					            table.body a {
					                font-size: 16px !important;
					              }
					            
					              table.body .wrapper,
					            table.body .article {
					                padding: 10px !important;
					              }
					            
					              table.body .content {
					                padding: 0 !important;
					              }
					            
					              table.body .container {
					                padding: 0 !important;
					                width: 100% !important;
					              }
					            
					              table.body .main {
					                border-left-width: 0 !important;
					                border-radius: 0 !important;
					                border-right-width: 0 !important;
					              }
					            
					              table.body .btn table {
					                width: 100% !important;
					              }
					            
					              table.body .btn a {
					                width: 100% !important;
					              }
					            
					              table.body .img-responsive {
					                height: auto !important;
					                max-width: 100% !important;
					                width: auto !important;
					              }
					            }
					            @media all {
					              .ExternalClass {
					                width: 100%;
					              }
					            
					              .ExternalClass,
					            .ExternalClass p,
					            .ExternalClass span,
					            .ExternalClass font,
					            .ExternalClass td,
					            .ExternalClass div {
					                line-height: 100%;
					              }
					            
					              .apple-link a {
					                color: inherit !important;
					                font-family: inherit !important;
					                font-size: inherit !important;
					                font-weight: inherit !important;
					                line-height: inherit !important;
					                text-decoration: none !important;
					              }
					            
					              #MessageViewBody a {
					                color: inherit;
					                text-decoration: none;
					                font-size: inherit;
					                font-family: inherit;
					                font-weight: inherit;
					                line-height: inherit;
					              }
					            
					              .btn-primary table td:hover {
					                background-color: #34495e !important;
					              }
					            
					              .btn-primary a:hover {
					                background-color: #34495e !important;
					                border-color: #34495e !important;
					              }
					            }
					            </style>
					              </head>
					              <body style="color: black !important; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
					                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
					                  <tr>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
					                      <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
					            
					                        <!-- START CENTERED WHITE CONTAINER -->
					                        <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
					            
					                          <!-- START MAIN CONTENT AREA -->
					                          <tr>
					                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
					                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                                <tr>
					                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
					                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
					                                      <tbody>
					                                        <tr>
					                                          <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
					                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
					                                              
					                                            </table>
					                                          </td>
					                                        </tr>
					                                      </tbody>
					                                    </table>
					                                    <div">
					                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$Value["first_name"].'</strong>, 
					                                        
					                                        <br>
					                                      <br>
					                                      Total Amount Committed in '.$Value["deal_name"].': Rs.'.$Value["amount"].'
					                                       <br>
					                                       
                                                          Total convenience fee: Rs '.$Value["processingfees"].'
                                                          
                                                            <br>
					                                      <br>
					                                      
					                                      
                                                          '.($Value["kycstatus"]=="Pending" ? "<br> <br> Your KYC is pending. Please complete the KYC on the investor dashboard by clicking 
                                      <a href='".WEB_BASE_URL."kyc-instructions'>here</a>." : "").'
                                                          
					                                      
					                                     Payment link has been enabled on your dashboard: <a href='.WEB_BASE_URL.'investor-commitment>Pay Now</a>
					                                      <br>
					                                      <br>
					                                      After your payment, you would receive an email to digitally sign the investment agreement. Video showing the Steps for digitally signing the agreement can be found in the link here 

					                                      <a href=https://youtu.be/3k0N3MwmRkU> Document Signing Instruction</a>
					                                      
					                                      <br><br>
                        					              View your dashboard here : <a href='.WEB_BASE_URL.'investor-dashboard> Dashboard </a>
					                                        
					                                      <br>
					                                      <br>
					                                      <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
					                                      <br>
					                                      <br>
					                                    </br>
					                                    Thank you,
					                                    <br>
					                                    Growth91 Team <br><br>
					                                    PS: This is an automated email. Please do not reply.
					                                    
					                                    <br>
					                                    <div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
					                                      <img src="https://growth91.com/web/growth91LOGO%20(4).png" alt="logo" style="width:120px;height:auto;">
					                                    </div>
					                                  </td>
					                                </tr>
					                              </table>
					                            </td>
					                          </tr>
					            
					                        <!-- END MAIN CONTENT AREA -->
					                        </table>
					                        <!-- END CENTERED WHITE CONTAINER -->
					            
					                        <!-- START FOOTER -->
					                        <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
					                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                            <tr>
					                              <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
					                              </td>
					                            </tr>
					                            <tr>
					                              <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
					                              </td>
					                            </tr>
					                          </table>
					                        </div>
					                        <!-- END FOOTER -->
					            
					                      </div>
					                    </td>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                  </tr>
					                </table>
					              </body>
					      </html>';  

			          	$subject="Payment link has been enabled for ".$Value["deal_name"];
				        $cc='contact@growth91.com';
				        send_email($body,$subject,$Value["email"],$cc);
				        
				        }
				
				$response = [
					'status' => '1',
					'message' => 'Accept Payment Status Updated.',
					'data' => $status,
				];
			}
			else
			{
				$response =[
					'status' => '0',
					'message' => 'Accept Payment Status Changes Unsuccessfull, Please try again!'
				];
			}
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}

	function get_invitation_list(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			$deal_id=$formdata['deal_id'];
			// $sql = "SELECT name,email,mobile,joining_date,investor_id FROM `private_deal_invities` 
			// WHERE deal_id='$deal_id' ORDER BY private_deal_invities.invite_id DESC";

			$sql = "SELECT *, deals.deal_name FROM `private_deal_invities` LEFT JOIN deals ON  private_deal_invities.deal_id = deals.deal_id
			WHERE deals.deal_id='$deal_id' ORDER BY private_deal_invities.invite_id DESC";
			$query = $this->db->query($sql);
			$list = $query->result();

			// $sql6 = "SELECT deal_name from deals where deal_id='$deal_id";
			// $query6 = $this->db->query($query6);
			// $list = $query->result();

			for($c=0;$c<count($list);$c++){
				$investor_id=$list[$c]->investor_id;
				$sql2 = "SELECT SUM(Investment_amt) as TOTAL_AMOUNT FROM `investments` 
				WHERE deal_id='$deal_id' and investor_id='$investor_id'";
				$query2 = $this->db->query($sql2);
				$resp = $query2->result();
				$list[$c]->total_amount=$resp[0]->TOTAL_AMOUNT;
			}

			if (isset($list)) {
				$response = [
					'status' => '1',
					'message' => 'Invitation list is fetched successfully.',
					'data' => $list,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		}else{
			$response = [
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}


	//get signer(founder) details from the deal table
	// DEAL LIST
	public function getsigner()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			$deal_id = $formdata['deal_id'];
			// sql query
			$sql = "SELECT  `signer_name`,`signer_email`,`signer_mobile` FROM `deals` WHERE `deal_id`=$deal_id";
			$query = $this->db->query($sql);
			$list = $query->result();

			if (count($list) >= 0) {
				$response = [
					'status' => '1',
					'message' => 'Deal list is fetched successfully.',
					'data' => $list,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else{
			$response=[
				'status'=>'0',
				'message'=>'deal is required'
			];
		}


		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}


	// Get deal name
	public function get_deal_name()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			$deal_id = $formdata['deal_id'];
			// sql query
			$sql = "SELECT  deal_name FROM `deals` WHERE `deal_id`=$deal_id";
			$query = $this->db->query($sql);
			$list = $query->result();

			if (count($list) >= 0) {
				$response = [
					'status' => '1',
					'message' => 'Deal list is fetched successfully.',
					'data' => $list,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else{
			$response=[
				'status'=>'0',
				'message'=>'deal is required'
			];
		}


		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	
	// add new deal
	function add()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {

			$post_data = [
				'startup_id' => $formdata['startupname'],
				'deal_name' => $formdata['deal_name'],
				'deal_st_date' => $formdata['dealstartdate'],
				'deal_start_dt_prem' => $formdata['dealStartDtPrem'],
				'deal_end_date' => $formdata['dealenddate'],
				'deal_end_dt_prem' => $formdata['dealEndDtPrem'],
				'deal_fund_requested' => $formdata['targetamount'],
				'Min_inv_amt' => $formdata['mintargetamount'],
				'Max_inv_amt' => $formdata['maxtargetamount'],
				'Muliples_of' => $formdata['multipleofdescription'],
				'backed_by' => $formdata['backedby'],
				'deal_category' => json_encode($formdata['category']),
				'youtubelink' => $formdata['youtubelink'],
				'multiples_of' => $formdata['multiples_of'],
				'regular_show_date' => $formdata['regular_show_date'],
				'premium_show_date' => $formdata['premium_show_date'],
				'escrow_account_bank' => $formdata['escrow_account_bank'],
				'escrow_account_branch' => $formdata['escrow_account_branch'],
				'escrow_account_name' => $formdata['escrow_account_name'],
				'escrowact' => $formdata['escrowAct'],
				'escrow_account_ifsc' => $formdata['escrow_account_ifsc'],
				'raiegap' => $formdata['raiseGap'],
				'digio_template_id' => $formdata['digioTemplateId'],
				'investor_sign_coordinate'=>$formdata['investor_sign_coordinate'] ? $formdata['investor_sign_coordinate'] : '',
				'founder_sign_coordinate'=>$formdata['founder_sign_coordinate'] ? $formdata['founder_sign_coordinate'] : '',
				'page_link' => $formdata['page_link'],
				'signer_mobile' => $formdata['signer_mobile'],
				'signer_name' => $formdata['signer_name'],
				'signer_email' => $formdata['signer_email'],
				'eligibility_id'=>$formdata['eligibility_id'],
				'deal_type'=>$formdata['deal_type'],
				'vendor_id'=>$formdata['vendor_id'],
				'captable_threshold_amount'=>$formdata['captable_threshold_amount'],
				'captable_multiple_amount'=>$formdata['captable_multiple_amount'],
				'enable_special_offer'=>$formdata['enable_special_offer'],
				'special_offer_text'=>$formdata['special_offer_text'],
				'default_special_offer_text'=>$formdata['default_special_offer_text'],
				'offer_discount'=>$formdata['offer_discount'],
			];

			$this->db->insert('deals', $post_data);
			$id = $this->db->insert_id();

			if ($id) {
				// $this->uploaddealimg();
				$response = [
					'status' => '1',
					'message' => 'New deal is added successfully.',
					'data' => $id,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function edit()
	{

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			$id = $formdata['id'];

			$post_data = [
				'startup_id' => $formdata['startupname'],
				'deal_name' => $formdata['deal_name'],
				'deal_st_date' => $formdata['dealstartdate'],
				'deal_start_dt_prem' => $formdata['dealStartDtPrem'],
				'deal_end_date' => $formdata['dealenddate'],
				'deal_end_dt_prem' => $formdata['dealEndDtPrem'],
				'deal_fund_requested' => $formdata['targetamount'],
				'Min_inv_amt' => $formdata['mintargetamount'],
				'Max_inv_amt' => $formdata['maxtargetamount'],
				'Muliples_of' => $formdata['multipleofdescription'],
				'backed_by' => $formdata['backedby'],
				'deal_category' => json_encode($formdata['category']),
				'youtubelink' => $formdata['youtubelink'],
				'multiples_of' => $formdata['multiples_of'],
				'regular_show_date' => $formdata['regular_show_date'],
				'premium_show_date' => $formdata['premium_show_date'],
				'escrow_account_bank' => $formdata['escrow_account_bank'],
				'escrow_account_branch' => $formdata['escrow_account_branch'],
				'escrow_account_name' => $formdata['escrow_account_name'],
				'escrowact' => $formdata['escrowAct'],
				'escrow_account_ifsc' => $formdata['escrow_account_ifsc'],
				'raiegap' => $formdata['raiseGap'],
				'digio_template_id' => $formdata['digioTemplateId'],
				'investor_sign_coordinate'=>$formdata['investor_sign_coordinate'] ? $formdata['investor_sign_coordinate'] : '',
				'founder_sign_coordinate'=>$formdata['founder_sign_coordinate'] ? $formdata['founder_sign_coordinate'] : '',
				'page_link' => $formdata['page_link'],
				'signer_mobile' => $formdata['signer_mobile'],
				'signer_name' => $formdata['signer_name'],
				'signer_email' => $formdata['signer_email'],
				'vendor_id'=>$formdata['vendor_id'],
				'captable_threshold_amount'=>$formdata['captable_threshold_amount'],
				'captable_multiple_amount'=>$formdata['captable_multiple_amount'],
				'enable_special_offer'=>$formdata['enable_special_offer'],
				'special_offer_text'=>$formdata['special_offer_text'],
				'default_special_offer_text'=>$formdata['default_special_offer_text'],
				'offer_discount'=>$formdata['offer_discount'],
			];

			$this->db->where('deal_id', $id);
			$res = $this->db->update('deals', $post_data);

			if ($res) {
				// $this->uploaddealimg();
				$response = [
					'status' => '1',
					'message' => 'Deal details is updated successfully.'
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function delete()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		if (!empty($_POST)) {
			$id = $this->input->post('id');

			$this->db->where('deal_id', $id);
			$res = $this->db->delete('deals');

			if ($res) {
				$response = [
					'status' => '1',
					'message' => 'Deal is deleted successfully.'
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function updatestatus()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		if (!empty($formdata)) {
			$id = $formdata['id'];
			$post_data = [
				'deal_status' => $formdata['dealstatus'],
				'user_status' => $formdata['approvestatus'],
				'deal_type' => $formdata['dealtype'],
				'show_status' => $formdata['show_status'],
			];
			$this->db->where('deal_id', $id);
			$this->db->update('deals', $post_data);
			$affected_rows = $this->db->affected_rows();
			if ($affected_rows) {
				$response = [
					'status' => '1',
					'message' => 'Deal status is updated successfully.'
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function uploaddealimg()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($_POST)) {
			$id = $this->input->post('deal_id');
			if ($id) {
				// logo
				if (isset($_FILES['pitch_files']['name']) && $_FILES['pitch_files']['name'] != "") {
					$dir = FCPATH . "uploads/deal/pitch_images/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['pitch_files']['tmp_name'];
					$temp = explode(".", $_FILES["pitch_files"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['pitch_files']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details = array(
							"pitch_files" => $newfilename,
						);
						$this->db->where('deal_id', $id);
						$this->db->update('deals', $image_details);
					}
				}
				// logo
				if (isset($_FILES['logo']['name']) && $_FILES['logo']['name'] != "") {
					$dir = FCPATH . "uploads/deal/logo/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['logo']['tmp_name'];
					$temp = explode(".", $_FILES["logo"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['logo']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details = array(
							"logo" => $newfilename,
						);
						$this->db->where('deal_id', $id);
						$this->db->update('deals', $image_details);
					}
				}
				// banner
				if (isset($_FILES['banner']['name']) && $_FILES['banner']['name'] != "") {
					$dir = FCPATH . "uploads/deal/banner/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['banner']['tmp_name'];
					$temp = explode(".", $_FILES["banner"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['banner']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details = array(
							"banner_img" => $newfilename,
						);
						$this->db->where('deal_id', $id);
						$this->db->update('deals', $image_details);
					}
				}

				// pdf
				if (isset($_FILES['pdffile']['name']) && $_FILES['pdffile']['name'] != "") {
					$dir = FCPATH . "uploads/deal/pitch/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['pdffile']['tmp_name'];
					$temp = explode(".", $_FILES["pdffile"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['pdffile']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details = array(
							"pitch_file" => $newfilename,
						);
						$this->db->where('deal_id', $id);
						$this->db->update('deals', $image_details);
					}
				}

				$response = [
					'status' => '1',
					'message' => 'Image is uploaded successfully.'
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	//for confirmation of creating new deal
	function confirmation_of_eligibility()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			if(empty($formdata['confirmation'])){
				$response=[
					'status'=>'0',
					'message'=>'Please tick the Checkbox to create new Deal'
				];
			}
			$post_data = [
				'confirmation' => $formdata['confirmation'],
				'date' => $formdata['date'],
				'remarks' => $formdata['remarks'],
			];

			$this->db->insert('fund_raise_eligibility', $post_data);
			$id = $this->db->insert_id();

			if ($id) {
				// $this->uploaddealimg();
				$response = [
					'status' => '1',
					'message' => 'Eligibility Added successfully.',
					'data' => $id,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function invite_investors_for_private_deal(){
	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$invite_type=$formdata['invite_type'];
			if($invite_type=='1'){
				$name=$formdata['name'];
				$deal_name=$formdata['deal_name'];
				$email=$formdata['email'];
				$bannerimg=$formdata['bannerimg'];
				$fun_founder_id=$formdata['fun_founder_id'];
				$deal_id=$formdata['deal_id'];
				// $page_link=$formdatap['page_link'];

				// check for investor is present pr not present
				$sql3="select * from private_deal_invities where email='$email' and deal_id='$deal_id'";
				$query3=$this->db->query($sql3);
				$num_rows=$query3->num_rows();
				$status='0';
				if(intval($num_rows)>0){
					$status='1';
					$response =[
						'status' => '0',
						'message' => 'This email already exist.'
					];
				} else{
					$status='0';
				}

				// check for deals details
				$sql5="select companyemail from deals where deal_id='$deal_id'";
				$query5=$this->db->query($sql5);
				$result5=$query5->result();
				$deal_email=''; 
				if(count($result5)>0){
				
					$deal_email=$result5[0]->companyemail;
				}

				// 
				$sql2="select * from users where investor_id='$fun_founder_id'";
				$query2=$this->db->query($sql2);
				$result2=$query2->result();
				$founder_name='';
				$company_name='';
				$fun_founder_mail='';
				 
				if(count($result2)>0){
					$founder_name=$result2[0]->first_name.' '.$result2[0]->last_name;
					$company_name=$result2[0]->startup_name;
					$fun_founder_mail=$result2[0]->email;
				}

				$sql4="select page_link from deals where deal_id='$deal_id'";
				// $sql4="select * from deals where founder_email_id='$founder_mail'";
				$query4=$this->db->query($sql4);
				$result4=$query4->result();
				$page_link='';
				// $page_link= preg_replace('///','',$page_link);
				// $page_link = str_replace(array('/'), ' ', $page_link);
				// $page_link = str_replace(array('/'), ' ', $page_link);
				if(count($result4)>0){
					$page_link=$result4[0]->page_link;
					$page_link= ltrim($page_link, '/');
				}
				// $page_link= preg_replace('///','',$page_link);

				$sql="select * from users where email='$email'";
				$query=$this->db->query($sql);
				$result=$query->result();
				$user_registered=count($result)>0 ? true : false;
				$link='';
				$investor_id='0';
				if($user_registered==true){
					$link= WEB_BASE_URL.'Login';
					$investor_id=$result[0]->investor_id;
				}else{
					$link=WEB_BASE_URL.'Signup';
					$investor_id='0';
				}
				
				$body='<!doctype html>
						<html>
							<head>
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
							<title> Deal Payment Success</title>
							<style>
								@media only screen and (max-width: 620px) {
									table.body h1 {
									font-size: 28px !important;
									margin-bottom: 10px !important;
									}
								
									table.body p,
								table.body ul,
								table.body ol,
								table.body td,
								table.body span,
								table.body a {
									font-size: 16px !important;
									}
								
									table.body .wrapper,
								table.body .article {
									padding: 10px !important;
									}
								
									table.body .content {
									padding: 0 !important;
									}
								
									table.body .container {
									padding: 0 !important;
									width: 100% !important;
									}
								
									table.body .main {
									border-left-width: 0 !important;
									border-radius: 0 !important;
									border-right-width: 0 !important;
									}
								
									table.body .btn table {
									width: 100% !important;
									}
								
									table.body .btn a {
									width: 100% !important;
									}
								
									table.body .img-responsive {
									height: auto !important;
									max-width: 100% !important;
									width: auto !important;
									}
								}
								@media all {
									.ExternalClass {
									width: 100%;
									}
								
									.ExternalClass,
								.ExternalClass p,
								.ExternalClass span,
								.ExternalClass font,
								.ExternalClass td,
								.ExternalClass div {
									line-height: 100%;
									}
								
									.apple-link a {
									color: inherit !important;
									font-family: inherit !important;
									font-size: inherit !important;
									font-weight: inherit !important;
									line-height: inherit !important;
									text-decoration: none !important;
									}
								
									#MessageViewBody a {
									color: inherit;
									text-decoration: none;
									font-size: inherit;
									font-family: inherit;
									font-weight: inherit;
									line-height: inherit;
									}
								
									.btn-primary table td:hover {
									background-color: #34495e !important;
									}
								
									.btn-primary a:hover {
									background-color: #34495e !important;
									border-color: #34495e !important;
									}
								}
								</style>
									</head>
									<body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
									<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
										<tr>
										<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
										<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
											<div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
								
											<!-- START CENTERED WHITE CONTAINER -->
											<table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
								
												<!-- START MAIN CONTENT AREA -->
												<tr>
												<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
													<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
													<tr>
														<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
														<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$name.'</strong>, 
															<br>
															<br>
															We are running an exclusive fundraise for '.$deal_name.' on the Growth91 platform.
															<br>
															<br>
															We would like to invite you to invest in our Start-up. 
															<br>
															<a href="'.WEB_BASE_URL.''.$page_link.'"
																target="_blank"
																style="background:#29176F;
																color: #fff;
																padding: 13px 33px;
																text-decoration: none;
																border-radius: 7px; 
																display: flex;
																justify-content: center;
																width: fit-content;
																margin: 23px auto 23px auto;
																cursor: pointer;"> Invest Now</a>
															
															<i>If you face any difficulty, please feel free to contact us '.$deal_email.' or contact@growth91.com</i>
															<br>
															<br>
															Thank you, <br/><br/>
															  '.$founder_name.',<br/>
															Co-founder <br>
															  '.$deal_name.'<br/>
															<br>
															PS: This is system generated email. Please do not reply.
														</br>
														<div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
															<img src="'.WEB_BASE_URL.'web/glogo.png" alt="logo" style="width:120px;height:auto;">
														</div>
														</td>
													</tr>
													</table>
												</td>
												</tr>
								
											<!-- END MAIN CONTENT AREA -->
											</table>
											<!-- END CENTERED WHITE CONTAINER -->
								
											<!-- START FOOTER -->
											<div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
												<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
												<tr>
													<td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
													<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
													</td>
												</tr>
												<tr>
													<td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
													Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
													</td>
												</tr>
												</table>
											</div>
											<!-- END FOOTER -->
								
											</div>
										</td>
										<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
										</tr>
									</table>
									</body>
						</html>';
					$bcc='contact@growth91.com';
					$cc=$fun_founder_mail;
							// $subject="$founder_name is inviting you to invest in $deal_name.";
							// $resp = $this->send_invitation($formdata['email'],"$founder_name is inviting you to invest in $deal_name .",$body,$cc);	
							$resp = $this->send_invitation($formdata['email'],"Invitation by $founder_name: Growth91 Investment Opportunity - $deal_name (Transaction Banking Platform)",$body,$cc,$bcc);
				if($resp=='1'){
					$data=[
						'name'=>$formdata['name'],
						'email'=>$formdata['email'],
						'mobile'=>$formdata['mobile'],
						'deal_id'=>$formdata['deal_id'],
						'startup_id' => $formdata['startup_id'],
						'invited_by' => $formdata['invited_by'],
						'founder_id'=>$formdata['fun_founder_id'],
						'investor_id'=> $investor_id,
					];
					if($status=='0'){
						$this->db->insert('private_deal_invities',$data);
						$id=$this->db->insert_id();
					}
					$response = [
						'status' => '1',
						'message' => 'Invitation is sent successfully.',
					];
				}else{
					$response = [
						'status' => '0',
						'message' => 'Please try again!',
					];	
				}
			} else if($invite_type=='2'){
				// $invited_users=$formdata['invited_users'];
				$invite_type=$formdata['invite_type'];
				$deal_id=$formdata['deal_id'];
				$startup_id=$formdata['startup_id'];
				$invited_by=$formdata['invited_by'];
				$fun_founder_id=$formdata['fun_founder_id'];
				$bannerimg=$formdata['bannerimg'];
				$deal_name=$formdata['deal_name'];

				// for($c=0;$c<count($invited_users);$c++){
					$name=$formdata['name'];
					$email=$formdata['email'];
					$mobile=$formdata['mobile'];
					$sql3="select * from private_deal_invities where email='$email' and deal_id='$deal_id'";
					$query3=$this->db->query($sql3);
					$num_rows=$query3->num_rows();
					$status='0';
					if(intval($num_rows)>0){
						$status='1';
					} else{
						$status='0';
					}
					
					// get founder name
					$sql2="select * from users where investor_id='$fun_founder_id'";
					$query2=$this->db->query($sql2);
					$result2=$query2->result();
					$founder_name='';
					$company_name='';
					$fun_founder_mail='';
					if(count($result2)>0){
						$founder_name=$result2[0]->first_name.' '.$result2[0]->last_name;
						$company_name=$result2[0]->startup_name;
						$fun_founder_mail=$result2[0]->email;
					}

					// check for deals details
					$sql5="select companyemail from deals where deal_id='$deal_id'";
					$query5=$this->db->query($sql5);
					$result5=$query5->result();
					$deal_email=''; 
					if(count($result5)>0){
					
						$deal_email=$result5[0]->companyemail;
					}

					$sql4="select page_link from deals where deal_id='$deal_id'";
				// $sql4="select * from deals where founder_email_id='$founder_mail'";
				$query4=$this->db->query($sql4);
				$result4=$query4->result();
				$page_link='';
				// $page_link= preg_replace('///','',$page_link);
				// $page_link = str_replace(array('/'), ' ', $page_link);
				// $page_link = str_replace(array('/'), ' ', $page_link);
				if(count($result4)>0){
					$page_link=$result4[0]->page_link;
					$page_link= ltrim($page_link, '/');
				}

					// check user registered or not
					$sql="select * from users where email='$email'";
					$query=$this->db->query($sql);
					$result=$query->result();
					$user_registered=count($result)>0 ? true : false;
					$link='';
					$investor_id='0';
					if($user_registered==true){
						$link=WEB_BASE_URL.'Login';
						$investor_id=$result[0]->investor_id;
					}else{
						$link=WEB_BASE_URL.'Signup';
						$investor_id='0';
					}
					$message='


						<!doctype html>
						<html>
							<head>
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
							<title> Deal Payment Success</title>
							<style>
								@media only screen and (max-width: 620px) {
									table.body h1 {
									font-size: 28px !important;
									margin-bottom: 10px !important;
									}
								
									table.body p,
								table.body ul,
								table.body ol,
								table.body td,
								table.body span,
								table.body a {
									font-size: 16px !important;
									}
								
									table.body .wrapper,
								table.body .article {
									padding: 10px !important;
									}
								
									table.body .content {
									padding: 0 !important;
									}
								
									table.body .container {
									padding: 0 !important;
									width: 100% !important;
									}
								
									table.body .main {
									border-left-width: 0 !important;
									border-radius: 0 !important;
									border-right-width: 0 !important;
									}
								
									table.body .btn table {
									width: 100% !important;
									}
								
									table.body .btn a {
									width: 100% !important;
									}
								
									table.body .img-responsive {
									height: auto !important;
									max-width: 100% !important;
									width: auto !important;
									}
								}
								@media all {
									.ExternalClass {
									width: 100%;
									}
								
									.ExternalClass,
								.ExternalClass p,
								.ExternalClass span,
								.ExternalClass font,
								.ExternalClass td,
								.ExternalClass div {
									line-height: 100%;
									}
								
									.apple-link a {
									color: inherit !important;
									font-family: inherit !important;
									font-size: inherit !important;
									font-weight: inherit !important;
									line-height: inherit !important;
									text-decoration: none !important;
									}
								
									#MessageViewBody a {
									color: inherit;
									text-decoration: none;
									font-size: inherit;
									font-family: inherit;
									font-weight: inherit;
									line-height: inherit;
									}
								
									.btn-primary table td:hover {
									background-color: #34495e !important;
									}
								
									.btn-primary a:hover {
									background-color: #34495e !important;
									border-color: #34495e !important;
									}
								}
								</style>
									</head>
									<body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
									<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
										<tr>
										<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
										<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
											<div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
								
											<!-- START CENTERED WHITE CONTAINER -->
											<table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
								
												<!-- START MAIN CONTENT AREA -->
												<tr>
												<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
													<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
													<tr>
														<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
														<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$name.'</strong>, 
															<br>
															<br>
															We are running an exclusive fundraise for '.$deal_name.' on the Growth91 platform.
															<br>
															<br>
															We would like to invite you to invest in our Start-up. 
															<br>
															<a href="'.WEB_BASE_URL.''.$page_link.'"
																target="_blank"
																style="background:#29176F;
																color: #fff;
																padding: 13px 33px;
																text-decoration: none;
																border-radius: 7px; 
																display: flex;
																justify-content: center;
																width: fit-content;
																margin: 23px auto 23px auto;
																cursor: pointer;"> Invest Now</a>
															
															<i>If you face any difficulty, please feel free to contact us '.$deal_email.' or contact@growth91.com</i>
															<br>
															<br>
															Thank you, <br/><br/>
															  '.$founder_name.',<br/>
															Co-founder <br>
															  '.$deal_name.'<br/>
															<br>
															PS: This is system generated email. Please do not reply.
														</br>
														<div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
															<img src="'.WEB_BASE_URL.'web/glogo.png" alt="logo" style="width:120px;height:auto;">
														</div>
														</td>
													</tr>
													</table>
												</td>
												</tr>
								
											<!-- END MAIN CONTENT AREA -->
											</table>
											<!-- END CENTERED WHITE CONTAINER -->
								
											<!-- START FOOTER -->
											<div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
												<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
												<tr>
													<td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
													<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
													</td>
												</tr>
												<tr>
													<td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
													Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
													</td>
												</tr>
												</table>
											</div>
											<!-- END FOOTER -->
								
											</div>
										</td>
										<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
										</tr>
									</table>
									</body>
						</html>
					';
					$bcc='contact@growth91.com';
					$cc=$fun_founder_mail;
					$resp = $this->send_invitation($email,"Invitation by $founder_name: Growth91 Investment Opportunity - $deal_name (Transaction Banking Platform)",$message,$cc,$bcc);

					if($resp=='1'){
						$data=[
							'name'=>$name,
							'email'=>$email,
							'mobile'=>$mobile,
							'deal_id'=>$deal_id,
							'startup_id' => $startup_id,
							'invited_by' => $invited_by,
							'founder_id'=>$fun_founder_id,
							'investor_id'=> $investor_id,
						];
						if($status=='0'){
							$this->db->insert('private_deal_invities',$data);
							$id=$this->db->insert_id();	
						}
						$response = [
							'status' => '1',
							'message' => 'Invitation is sent successfully.',
						];
					}else{
						$response = [
							'status' => '0',
							'message' => 'Please try again!',
						];	
					}

				}
			// }
		}else{
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output->set_content_type('application/json')->set_output(json_encode($response));
	}

	function send_invitation($to,$subject,$message,$cc,$bcc){
			$this->load->helper('send_email_invite');
			$res=send_email_invite($message,$subject,$to,$cc,$bcc);
			if($res=='1') {
				return '1';
			} else {
				return '0';
			}	
	}

	//get investor detail  by email
	function get_investor_by_email()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
			if (!empty($formdata)) {
				$email = $formdata['email'];
				// sql query
				$sql = "SELECT * FROM `users` WHERE `email`='$email' AND `user_type`='investor'";
				$query = $this->db->query($sql);
				$list = $query->result();
				// sql query
				$sql1 = "SELECT * FROM `dealsettings`";
				$query1 = $this->db->query($sql1);
				$list1 = $query1->result();
	
				if (count($list) >= 0) {
					$response = [
						'status' => '1',
						'message' => 'investor Details is fetched successfully.',
						'data' => $list,
						'data1' =>$list1,
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			} else{
				$response=[
					'status'=>'0',
					'message'=>'email is required'
				];
			}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	//get investor detail  by email
	function add_offline_data()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
			if (!empty($_POST)) {
				$post_data = [
					'investor_id' => $this->input->post('investor_id'),
					'deal_id' => $this->input->post('deal_id'),
					'startup_id' => $this->input->post('startup_id'),
					'investor_email' =>$this->input->post('investor_email'),
					'investor_name' => $this->input->post('investor_name'),
					'payment_type' =>$this->input->post('payment_type'),
					'investment_amt' => $this->input->post('investment_amt'),
					'reference_id' =>$this->input->post('reference_id'),
					'payment_dt' => $this->input->post('payment_dt'),
					'remarks' =>$this->input->post('remarks'),
					'processing_fees'=>$this->input->post('processing_fees'),
				];
	
				$this->db->insert('offline_payment', $post_data);
				$id = $this->db->insert_id();
				if (!empty($id)) {
					if ($id) {
						// logo
						if (isset($_FILES['attach_copy']['name']) && $_FILES['attach_copy']['name'] != "") {
							$dir = FCPATH . "uploads/deal/offline_payment/attachment/" . $id . "/";
		
							if (!is_dir($dir)) {
								@mkdir($dir, 0777, true);
							}
		
							$image = $_FILES['attach_copy']['tmp_name'];
							$temp = explode(".", $_FILES["attach_copy"]["name"]);
							$newfilename = round(microtime(true)) . '.' . end($temp);
		
							$hash = $_FILES['attach_copy']['name'];
		
							if (move_uploaded_file($image, $dir . $newfilename)) {
								$image_details = array(
									"attach_copy" => $newfilename,
								);
								$this->db->where('offline_payment_id', $id);
								$this->db->update('offline_payment', $image_details);
							}
						}
						$response = [
							'status' => '1',
							'message' => 'file is uploaded successfully.',
						];
					}
					else {
						$response = [
							'status' => '0',
							'message' => 'Failed To upload!'
						];
					}
		
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Please enter values of all fields.',
					];
				}
	
				$post_data1 = [
					'investor_id' => $this->input->post('investor_id'),
					'deal_id' => $this->input->post('deal_id'),
					'Investment_amt' => $this->input->post('investment_amt'),
					'payment_ref' =>$this->input->post('reference_id'),
					'Invested_dt' => $this->input->post('payment_dt'),
					'payment_status_date' => $this->input->post('payment_dt'),
					'payment_status' =>'payment_success',
					'payment_type'=>'offline_payment',
					'processingfees'=>$this->input->post('processing_fees'),
				];
				$this->db->insert('investments', $post_data1);
				$di2=$this->db->insert_id();
				//for payment table
				$post_data2 = [
					'investor_id' => $this->input->post('investor_id'),
					'deal_id' => $this->input->post('deal_id'),
					'payment_amount' => $this->input->post('investment_amt'),
					'payment_ref' =>$this->input->post('reference_id'),
					'payment_date' => $this->input->post('payment_dt'),
					'payment_status' =>'SUCCESS',
					'payment_type'=>'offline_payment',
					'description'=>'User invested in deal',
					'investment_id'=>$di2,
					'total_paid_amount'=>(intval($this->input->post('investment_amt'))+intval($this->input->post('processing_fees'))),
					'processing_fees'=>$this->input->post('processing_fees'),
				];
				$this->db->insert('payments', $post_data2);
				$di3=$this->db->insert_id();
				
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please enter values of all fields.',
				];
			}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function add_offline_data_by_investor()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
			if (!empty($_POST)) {
				$post_data = [
				    'commitment_id' => $this->input->post('commitment_id'),
					'investor_id' => $this->input->post('investor_id'),
					'deal_id' => $this->input->post('deal_id'),
					'startup_id' => $this->input->post('startup_id'),
					'investor_email' =>$this->input->post('investor_email'),
					'investor_name' => $this->input->post('investor_name'),
					'payment_type' =>$this->input->post('payment_type'),
					'investment_amt' => $this->input->post('investment_amt'),
					'reference_id' =>$this->input->post('reference_id'),
					'payment_dt' => $this->input->post('payment_dt'),
					'remarks' =>$this->input->post('remarks'),
					'processing_fees'=>$this->input->post('processing_fees'),
				];
	
				$this->db->insert('offline_payment', $post_data);
				$id = $this->db->insert_id();
				if (!empty($id)) {
					if ($id) {
						// logo
						if (isset($_FILES['attach_copy']['name']) && $_FILES['attach_copy']['name'] != "") {
							$dir = FCPATH . "uploads/deal/offline_payment/attachment/" . $id . "/";
		
							if (!is_dir($dir)) {
								@mkdir($dir, 0777, true);
							}
		
							$image = $_FILES['attach_copy']['tmp_name'];
							$temp = explode(".", $_FILES["attach_copy"]["name"]);
							$newfilename = round(microtime(true)) . '.' . end($temp);
		
							$hash = $_FILES['attach_copy']['name'];
		
							if (move_uploaded_file($image, $dir . $newfilename)) {
								$image_details = array(
									"attach_copy" => $newfilename,
								);
								$this->db->where('offline_payment_id', $id);
								$this->db->update('offline_payment', $image_details);
							}
						}
						$response = [
							'status' => '1',
							'message' => 'file is uploaded successfully.',
						];
					}
					else {
						$response = [
							'status' => '0',
							'message' => 'Failed To upload!'
						];
					}
		
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Please enter values of all fields.',
					];
				}
	
				$post_data1 = [
					'investor_id' => $this->input->post('investor_id'),
					'deal_id' => $this->input->post('deal_id'),
					'Investment_amt' => $this->input->post('investment_amt'),
					'payment_ref' =>$this->input->post('reference_id'),
					'Invested_dt' => $this->input->post('payment_dt'),
					'payment_status_date' => $this->input->post('payment_dt'),
					'payment_status' =>'PENDING',
					'payment_type'=>'offline_payment',
					'processingfees'=>$this->input->post('processing_fees'),
				];
				$this->db->insert('investments', $post_data1);
				$di2=$this->db->insert_id();
				//for payment table
				$post_data2 = [
					'investor_id' => $this->input->post('investor_id'),
					'deal_id' => $this->input->post('deal_id'),
					'payment_amount' => $this->input->post('investment_amt'),
					'payment_ref' =>$this->input->post('reference_id'),
					'payment_date' => $this->input->post('payment_dt'),
					'payment_status' =>'PENDING',
					'payment_type'=>'offline_payment',
					'description'=>'User invested in deal',
					'investment_id'=>$di2,
					'total_paid_amount'=>(intval($this->input->post('investment_amt'))+intval($this->input->post('processing_fees'))),
					'processing_fees'=>$this->input->post('processing_fees'),
				];
				$this->db->insert('payments', $post_data2);
				$di3=$this->db->insert_id();
				
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please enter values of all fields.',
				];
			}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}


	//15-10-2022 for getting authorzied signatory email and name
	public function  get_authorized_signatory(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

            $id = $formdata['startup_id'];

            $sql="
            	SELECT users.email,users.first_name,users.last_name,users.mobile FROM startups,users WHERE startups.operational_founder=users.investor_id AND startupid = '$id'
            ";
            $query=$this->db->query($sql);
            $result = $query->result();
			
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Details are fetched successfully.',
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
	public function edit_investor_commitment()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$delete_log["interested_id"] = $this -> input -> post("interested_id");

		$commitment["deal_id"] = $this -> input -> post("deal_id");
		$commitment["investor_id"] = $this -> input -> post("investor_id");
		$commitment["amount"] = $this -> input -> post("amount");
		$commitment["processingfees"] = $this -> input -> post("processingfees");
		$commitment["totalamount"] = $this -> input -> post("totalamount");
		$commitment["deduct"] = $this -> input -> post("deduct");
		$commitment["agree"] = $this -> input -> post("agree");
		$commitment["order_token"] = $this -> input -> post("order_token");
		$commitment["tdsstatus"] = $this -> input -> post("tdsstatus");
		$commitment["gst"] = $this -> input -> post("gst");
		$commitment["legalfee"] = $this -> input -> post("legalfee");
		$commitment["id"] = $this -> input -> post("commitment_id");
		$commitment["parent_id"] = $this -> input -> post("parent_id");
		$commitment["walletDeductionMoney"] = $this -> input -> post("walletDeductionMoney");
		//print_r($commitment);
		$affected_rows=false;

		if(empty($commitment["totalamount"]) || empty($commitment["deal_id"]) || empty($commitment["investor_id"]) || empty($commitment["amount"]) || empty($commitment["processingfees"]) || empty($delete_log["interested_id"]))
		{
		 	$response = [
		 		'status' => '0',
		 		'message' => 'All Field Data Required'
		 	];
		}
		else {

			$investor_details = $this -> db -> where("investor_id",$commitment["investor_id"]) -> get("users") -> result_array(); 
			$deal_details = $this -> db -> select("deals.*,startups.name") -> from("deals") -> join("startups","startups.startupid = deals.startup_id","left") -> where("deals.deal_id",$commitment["deal_id"]) -> get() -> result_array();
			//echo "1st else";
			

			$this->load->helper('send_email');
			$body='';		

			$already_committed = $this -> db -> where("deal_id",$commitment["deal_id"]) -> where("investor_id",$commitment["investor_id"]) -> where("parent_id",0) -> order_by("id","ASC") -> get("investor_commitment") -> result_array();
			
			$committed_idwise = $this -> db -> where('id', $commitment["id"]) -> order_by("id","ASC") -> get("investor_commitment") -> result_array();
			
			/*Need to check 
			usecase 1 where commitment is more then 2 time so parent ID will have more then 1 record parent ID = 26,19  Working fine
			usecase 2 where commitment is more then 1 time so parent ID will have 1 record parentid 6,8
			*/
			
			//print_r($total)
			//echo $already_committed[0]["total"]."<BR>".$committed_idwise[0]["total"];
		//	die;
			if(count($already_committed) > 0)
			{
				$total["totalamount"] =	($already_committed[0]["totalamount"] + $commitment["totalamount"]) - $committed_idwise[0]["totalamount"];	
				$total["amount"] =	($already_committed[0]["amount"] + $commitment["amount"]) - $committed_idwise[0]["amount"];	
				$total["processingfees"] =	($already_committed[0]["processingfees"] + $commitment["processingfees"]) - $committed_idwise[0]["processingfees"];	
				//print_r($total);
				//die;
				$this -> db -> where("deal_id",$commitment["deal_id"]) -> where("investor_id",$commitment["investor_id"]) -> where("parent_id",0)  -> update("investor_commitment",$total);
				
				$child_commitment["parent_id"] = $already_committed[0]["id"];
				$child_commitment["deal_id"] = $commitment["deal_id"];
				$child_commitment["investor_id"] = $commitment["investor_id"];
				$child_commitment["amount"] = $commitment["amount"];
				$child_commitment["processingfees"] = $commitment["processingfees"];
				$child_commitment["totalamount"] = $commitment["totalamount"];
				$child_commitment["created_at"] = date("Y-m-d H:i:s");

				//$status = $this -> db -> insert("investor_commitment",$child_commitment);
				$this->db->where('id', $commitment["id"]);
				$this->db->update('investor_commitment', $child_commitment);
				$affected_rows= $this->db->affected_rows();	

				if($affected_rows) {
					$response = [
						'status' => '1',
						'message' => 'Committment is updated successfully.'
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			}
			else
			{
				$parent_commitment["amount"] = $commitment["amount"];
				$parent_commitment["processingfees"] = $commitment["processingfees"];
				$parent_commitment["deal_id"] = $commitment["deal_id"];
				$parent_commitment["investor_id"] = $commitment["investor_id"];
				$parent_commitment["totalamount"] = $commitment["totalamount"];
				$parent_commitment["deduct"] = $commitment["deduct"];
				$parent_commitment["agree"] = $commitment["agree"];
				$parent_commitment["order_token"] = $commitment["order_token"];
				$parent_commitment["tdsstatus"] = $commitment["tdsstatus"];
				$parent_commitment["gst"] = $commitment["gst"];
				$parent_commitment["legalfee"] = $commitment["legalfee"];
				$parent_commitment["walletDeductionMoney"] = $commitment["walletDeductionMoney"];
				$parent_commitment["created_at"] = date("Y-m-d H:i:s");

				
				$status = $this -> db -> insert("investor_commitment",$parent_commitment);
				$parent_committ_id = $this -> db -> insert_id();

				if($status) {
					
					$child_commitment["parent_id"] = $parent_committ_id;
					$child_commitment["deal_id"] = $commitment["deal_id"];
					$child_commitment["investor_id"] = $commitment["investor_id"];
					$child_commitment["amount"] = $commitment["amount"];
					$child_commitment["processingfees"] = $commitment["processingfees"];
					$child_commitment["totalamount"] = $commitment["totalamount"];
					$child_commitment["created_at"] = date("Y-m-d H:i:s");
					
					//$this -> db -> insert("investor_commitment",$child_commitment);
					$this->db->where('id', $commitment["id"]);
					$this->db->update('investor_commitment', $child_commitment);
					$affected_rows= $this->db->affected_rows();
					if($affected_rows) {
						$response = [
							'status' => '1',
							'message' => 'Committment is updated successfully.'
						];
					} else {
						$response =[
							'status' => '0',
							'message' => 'Please try again!'
						];
					}
				}
			}
			

		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));

	}
	/* Add commitments */
	public function save_investor_commitment()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$delete_log["interested_id"] = $this -> input -> post("interested_id");

		$commitment["deal_id"] = $this -> input -> post("deal_id");
		$commitment["investor_id"] = $this -> input -> post("investor_id");
		$commitment["amount"] = $this -> input -> post("amount");
		$commitment["processingfees"] = $this -> input -> post("processingfees");
		$commitment["totalamount"] = $this -> input -> post("totalamount");
		$commitment["deduct"] = $this -> input -> post("deduct");
		$commitment["agree"] = $this -> input -> post("agree");
		$commitment["order_token"] = $this -> input -> post("order_token");
		$commitment["tdsstatus"] = $this -> input -> post("tdsstatus");
		$commitment["gst"] = $this -> input -> post("gst");
		$commitment["legalfee"] = $this -> input -> post("legalfee");
		$commitment["walletDeductionMoney"] = $this -> input -> post("walletDeductionMoney");
		

		if(empty($commitment["totalamount"]) || empty($commitment["deal_id"]) || empty($commitment["investor_id"]) || empty($commitment["amount"])  || empty($delete_log["interested_id"]))
		{
		 	$response = [
		 		'status' => '0',
		 		'message' => 'All Field Data Required'
		 	];
		}
		else
		{

			$investor_details = $this -> db -> where("investor_id",$commitment["investor_id"]) -> get("users") -> result_array(); 
			$deal_details = $this -> db -> select("deals.*,startups.name") -> from("deals") -> join("startups","startups.startupid = deals.startup_id","left") -> where("deals.deal_id",$commitment["deal_id"]) -> get() -> result_array();

			$this->load->helper('send_email');
			$body='';		

			$already_committed = $this -> db -> where("deal_id",$commitment["deal_id"]) -> where("investor_id",$commitment["investor_id"]) -> where("parent_id",0) -> order_by("id","ASC") -> get("investor_commitment") -> result_array();
		
			if(count($already_committed) > 0)
			{
				$total["totalamount"] =	$already_committed[0]["totalamount"] + $commitment["totalamount"];	
				$total["amount"] =	$already_committed[0]["amount"] + $commitment["amount"];	
				$total["processingfees"] =	$already_committed[0]["processingfees"] + $commitment["processingfees"];	
				
				$this -> db -> where("deal_id",$commitment["deal_id"]) -> where("investor_id",$commitment["investor_id"]) -> where("parent_id",0)  -> update("investor_commitment",$total);
				
				$child_commitment["parent_id"] = $already_committed[0]["id"];
				$child_commitment["deal_id"] = $commitment["deal_id"];
				$child_commitment["investor_id"] = $commitment["investor_id"];
				$child_commitment["amount"] = $commitment["amount"];
				$child_commitment["processingfees"] = $commitment["processingfees"];
				$child_commitment["totalamount"] = $commitment["totalamount"];
				$child_commitment["created_at"] = date("Y-m-d H:i:s");

				$status = $this -> db -> insert("investor_commitment",$child_commitment);

				if($status) {

					// mail refernece : 033
			          $body='<!doctype html>
					      <html>
					              <head>
					                <meta name="viewport" content="width=device-width, initial-scale=1.0">
					                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
					                <title> Deal Payment Success</title>
					                <style>
					            @media only screen and (max-width: 620px) {
					              table.body h1 {
					                font-size: 28px !important;
					                margin-bottom: 10px !important;
					              }
					            
					              table.body p,
					            table.body ul,
					            table.body ol,
					            table.body td,
					            table.body span,
					            table.body a {
					                font-size: 16px !important;
					              }
					            
					              table.body .wrapper,
					            table.body .article {
					                padding: 10px !important;
					              }
					            
					              table.body .content {
					                padding: 0 !important;
					              }
					            
					              table.body .container {
					                padding: 0 !important;
					                width: 100% !important;
					              }
					            
					              table.body .main {
					                border-left-width: 0 !important;
					                border-radius: 0 !important;
					                border-right-width: 0 !important;
					              }
					            
					              table.body .btn table {
					                width: 100% !important;
					              }
					            
					              table.body .btn a {
					                width: 100% !important;
					              }
					            
					              table.body .img-responsive {
					                height: auto !important;
					                max-width: 100% !important;
					                width: auto !important;
					              }
					            }
					            @media all {
					              .ExternalClass {
					                width: 100%;
					              }
					            
					              .ExternalClass,
					            .ExternalClass p,
					            .ExternalClass span,
					            .ExternalClass font,
					            .ExternalClass td,
					            .ExternalClass div {
					                line-height: 100%;
					              }
					            
					              .apple-link a {
					                color: inherit !important;
					                font-family: inherit !important;
					                font-size: inherit !important;
					                font-weight: inherit !important;
					                line-height: inherit !important;
					                text-decoration: none !important;
					              }
					            
					              #MessageViewBody a {
					                color: inherit;
					                text-decoration: none;
					                font-size: inherit;
					                font-family: inherit;
					                font-weight: inherit;
					                line-height: inherit;
					              }
					            
					              .btn-primary table td:hover {
					                background-color: #34495e !important;
					              }
					            
					              .btn-primary a:hover {
					                background-color: #34495e !important;
					                border-color: #34495e !important;
					              }
					            }
					            </style>
					              </head>
					              <body style="color: black !important; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
					                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
					                  <tr>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
					                      <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
					            
					                        <!-- START CENTERED WHITE CONTAINER -->
					                        <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
					            
					                          <!-- START MAIN CONTENT AREA -->
					                          <tr>
					                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
					                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                                <tr>
					                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
					                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
					                                      <tbody>
					                                        <tr>
					                                          <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
					                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
					                                              
					                                            </table>
					                                          </td>
					                                        </tr>
					                                      </tbody>
					                                    </table>
					                                    <div">
					                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$investor_details[0]["first_name"].'</strong>, 
					                                        <br>
					                                        <br>
					                                        Your commitment in '.$deal_details[0]["deal_name"].' on Growth91 has been received for Rs. '.$commitment["amount"].' on '.date("d/m/Y").'
					                                        <br>
					                                      <br>
					                                      Total Amount Committed in '.$deal_details[0]["deal_name"].': Rs.'.$total["amount"].'
					                                       <br>
					                                       
                                                          Total convenience fee: Rs '.$total["processingfees"].'
                                                          <br>
					                                      <br>
                                                          Your commitment history can be found here: <a href='.WEB_BASE_URL.'investor-commitment>History</a>
                                                            <br>
					                                      <br>
					                                      
					                                     Payment link will be enabled on your dashboard once the deal is completed and your investment is approved. Please note that this is a hard commitment and you will be required to process the payment upon deal completion.

                                                           
					                                     '.
					                                    ($investor_details[0]["kycstatus"]=="Pending" ? "<br> <br> Please complete your KYC in the meantime. Complete your KYC here : 
					                                      <a href='".WEB_BASE_URL."kyc-instructions'>here</a>."
					                                       : "")
					                                    .'
                        					              <br><br>
                        					              View your dashboard here : <a href='.WEB_BASE_URL.'investor-dashboard> Dashboard </a>
					                                      
					                                        
					                                      <br>
					                                      <br>
					                                      <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
					                                      <br>
					                                      <br>
					                                    </br>
					                                    Thank you,
					                                    <br>
					                                    Growth91 Team <br><br>
					                                    PS: This is an automated email. Please do not reply.
					                                    
					                                    <br>
					                                    <div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
					                                      <img src="https://growth91.com/web/growth91LOGO%20(4).png" alt="logo" style="width:120px;height:auto;">
					                                    </div>
					                                  </td>
					                                </tr>
					                              </table>
					                            </td>
					                          </tr>
					            
					                        <!-- END MAIN CONTENT AREA -->
					                        </table>
					                        <!-- END CENTERED WHITE CONTAINER -->
					            
					                        <!-- START FOOTER -->
					                        <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
					                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                            <tr>
					                              <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
					                              </td>
					                            </tr>
					                            <tr>
					                              <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
					                              </td>
					                            </tr>
					                          </table>
					                        </div>
					                        <!-- END FOOTER -->
					            
					                      </div>
					                    </td>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                  </tr>
					                </table>
					              </body>
					      </html>';  

			          	$subject="Commitment of Rs. ".$commitment["amount"]." received for ".$deal_details[0]["deal_name"];
				        $cc='contact@growth91.com';
				       // send_email($body,$subject,$investor_details[0]["email"],$cc);

					$response = [
						'status' => '1',
						'message' => 'Investor Child Committment saved successfully.',
						'data' => $status,
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Investor Child Committment Saved Failed, Please try again!'
					];
				}
			}
			else
			{
				$parent_commitment["amount"] = $commitment["amount"];
				$parent_commitment["processingfees"] = $commitment["processingfees"];
				$parent_commitment["deal_id"] = $commitment["deal_id"];
				$parent_commitment["investor_id"] = $commitment["investor_id"];
				$parent_commitment["totalamount"] = $commitment["totalamount"];
				$parent_commitment["deduct"] = $commitment["deduct"];
				$parent_commitment["agree"] = $commitment["agree"];
				$parent_commitment["order_token"] = $commitment["order_token"];
				$parent_commitment["tdsstatus"] = $commitment["tdsstatus"];
				$parent_commitment["gst"] = $commitment["gst"];
				$parent_commitment["legalfee"] = $commitment["legalfee"];
				$parent_commitment["walletDeductionMoney"] = $commitment["walletDeductionMoney"];
				$parent_commitment["created_at"] = date("Y-m-d H:i:s");

				
				$status = $this -> db -> insert("investor_commitment",$parent_commitment);
				$parent_committ_id = $this -> db -> insert_id();

				if($status) {
					
					$child_commitment["parent_id"] = $parent_committ_id;
					$child_commitment["deal_id"] = $commitment["deal_id"];
					$child_commitment["investor_id"] = $commitment["investor_id"];
					$child_commitment["amount"] = $commitment["amount"];
					$child_commitment["processingfees"] = $commitment["processingfees"];
					$child_commitment["totalamount"] = $commitment["totalamount"];
					$child_commitment["created_at"] = date("Y-m-d H:i:s");
					
					$this -> db -> insert("investor_commitment",$child_commitment);
// echo"<pre>";print_r($deal_details);exit();
					
				
					// mail refernece : 033
			          $body='<!doctype html>
					      <html>
					              <head>
					                <meta name="viewport" content="width=device-width, initial-scale=1.0">
					                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
					                <title> Deal Payment Success</title>
					                <style>
					            @media only screen and (max-width: 620px) {
					              table.body h1 {
					                font-size: 28px !important;
					                margin-bottom: 10px !important;
					              }
					            
					              table.body p,
					            table.body ul,
					            table.body ol,
					            table.body td,
					            table.body span,
					            table.body a {
					                font-size: 16px !important;
					              }
					            
					              table.body .wrapper,
					            table.body .article {
					                padding: 10px !important;
					              }
					            
					              table.body .content {
					                padding: 0 !important;
					              }
					            
					              table.body .container {
					                padding: 0 !important;
					                width: 100% !important;
					              }
					            
					              table.body .main {
					                border-left-width: 0 !important;
					                border-radius: 0 !important;
					                border-right-width: 0 !important;
					              }
					            
					              table.body .btn table {
					                width: 100% !important;
					              }
					            
					              table.body .btn a {
					                width: 100% !important;
					              }
					            
					              table.body .img-responsive {
					                height: auto !important;
					                max-width: 100% !important;
					                width: auto !important;
					              }
					            }
					            @media all {
					              .ExternalClass {
					                width: 100%;
					              }
					            
					              .ExternalClass,
					            .ExternalClass p,
					            .ExternalClass span,
					            .ExternalClass font,
					            .ExternalClass td,
					            .ExternalClass div {
					                line-height: 100%;
					              }
					            
					              .apple-link a {
					                color: inherit !important;
					                font-family: inherit !important;
					                font-size: inherit !important;
					                font-weight: inherit !important;
					                line-height: inherit !important;
					                text-decoration: none !important;
					              }
					            
					              #MessageViewBody a {
					                color: inherit;
					                text-decoration: none;
					                font-size: inherit;
					                font-family: inherit;
					                font-weight: inherit;
					                line-height: inherit;
					              }
					            
					              .btn-primary table td:hover {
					                background-color: #34495e !important;
					              }
					            
					              .btn-primary a:hover {
					                background-color: #34495e !important;
					                border-color: #34495e !important;
					              }
					            }
					            </style>
					              </head>
					              <body style="color: black !important; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
					                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
					                  <tr>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
					                      <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
					            
					                        <!-- START CENTERED WHITE CONTAINER -->
					                        <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
					            
					                          <!-- START MAIN CONTENT AREA -->
					                          <tr>
					                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
					                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                                <tr>
					                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
					                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
					                                      <tbody>
					                                        <tr>
					                                          <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
					                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
					                                              
					                                            </table>
					                                          </td>
					                                        </tr>
					                                      </tbody>
					                                    </table>
					                                    <div">
					                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$investor_details[0]["first_name"].'</strong>, 
					                                        <br>
					                                        <br>
					                                        Your commitment in '.$deal_details[0]["deal_name"].' on Growth91 has been received for Rs. '.$commitment["amount"].' on '.date("d/m/Y").'.
					                                        <br>
					                                      <br>
					                                      Total Amount Committed in '.$deal_details[0]["deal_name"].': Rs.'.$commitment["amount"].'
					                                       <br>
					                                       
                                                          Total convenience fee: Rs '.$commitment["processingfees"].'
                                                          <br>
					                                      <br>
                                                          Your commitment history can be found here: <a href='.WEB_BASE_URL.'investor-commitment>History</a>
                                                            <br>
					                                      <br>
					                                      
					                                     Payment link will be enabled on your dashboard once the deal is completed and your investment is approved. Please note that this is a hard commitment and you will be required to process the payment upon deal completion.
                                                           
					                                     '.
					                                    ($investor_details[0]["kycstatus"]=="Pending" ? "<br> <br> Please complete your KYC in the meantime. Complete your KYC here : 
					                                      <a href='".WEB_BASE_URL."kyc-instructions'>here</a>."
					                                       : "")
					                                    .'
                        					              <br><br>
                        					              View your dashboard here : <a href='.WEB_BASE_URL.'investor-dashboard> Dashboard </a>
					                                      
					                                        
					                                      <br>
					                                      <br>
					                                      <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
					                                      <br>
					                                      <br>
					                                    </br>
					                                    Thank you,
					                                    <br>
					                                    Growth91 Team <br><br>
					                                    PS: This is an automated email. Please do not reply.
					                                    
					                                    <br>
					                                    <div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
					                                      <img src="https://growth91.com/web/growth91LOGO%20(4).png" alt="logo" style="width:120px;height:auto;">
					                                    </div>
					                                  </td>
					                                </tr>
					                              </table>
					                            </td>
					                          </tr>
					            
					                        <!-- END MAIN CONTENT AREA -->
					                        </table>
					                        <!-- END CENTERED WHITE CONTAINER -->
					            
					                        <!-- START FOOTER -->
					                        <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
					                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                            <tr>
					                              <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
					                              </td>
					                            </tr>
					                            <tr>
					                              <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
					                              </td>
					                            </tr>
					                          </table>
					                        </div>
					                        <!-- END FOOTER -->
					            
					                      </div>
					                    </td>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                  </tr>
					                </table>
					              </body>
					      </html>';  

			          	$subject="Commitment of Rs. ".$commitment["amount"]." received for ".$deal_details[0]["deal_name"];
				        $cc='contact@growth91.com';
				       // send_email($body,$subject,$investor_details[0]["email"],$cc);
					
					$response = [
						'status' => '1',
						'message' => 'Investor Committment saved successfully.',
						'data' => $status,
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Investor Committment Saved Failed, Please try again!'
					];
				}
			}	
		}

		$this -> db -> where("id",$delete_log["interested_id"]) -> delete("deals_interested_log");

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
	
	/* edit commitments */

}
