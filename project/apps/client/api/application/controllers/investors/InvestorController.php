
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InvestorController extends CI_Controller {

	function __construct() {
        parent::__construct();
        $this->check_for_db_class();
    }

    function check_for_db_class(){
    	if(!$this->load->is_loaded('database')){
		      $this->load->database();
		} 
    }

	public function getinvestordetails(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

            $id = $formdata['investor_id'];

            $sql="
            	SELECT email,first_name,last_name,kycstatus,investor_id FROM `users`
				WHERE investor_id = '$id'
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

	public function getInvestments(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $investor_id = $formdata['investor_id'];
			$payment_status = "payment_success";
            $sql="SELECT * FROM `investments`
            	LEFT JOIN deals on deals.deal_id=investments.deal_id
            	LEFT JOIN startups on startups.startupid=deals.startup_id
				WHERE investments.investor_id = '$investor_id' AND investments.payment_status = '$payment_status' ORDER BY investments.created_at DESC";
            $query=$this->db->query($sql);
            $result = $query->result();
            $num_rows=$query->num_rows();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Investments are fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '1',
					'message' => 'Investments are fetched successfully.',
					'data' => [],
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

	public function updateaccountdetails(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {
            $investor_id = $formdata['id'];
            $accountno = $formdata['accountno'];
            $ifsccode = $formdata['ifsccode'];
            $data=[
            	'bank_ac_no' => $accountno,
            	'ifsc_code' => $ifsccode,
            	'bank_kyc_status'=>'success'
            ];
            $this->db->where('investor_id',$investor_id);
            $result= $this->db->update('users',$data);
			
			if($result) {
				$this->updatebankaccountdetails($formdata);
				$this->check_for_kyc_status($formdata);
				$response = [
					'status' => '1',
					'message' => 'Bank account details are updated successfully.',
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

	function updatebankaccountdetails($formdata){
		$user_id=$formdata['id'];
		// bank details
		$sql="SELECT * FROM `user_bank_details` WHERE user_id='$user_id'";
		$query=$this->db->query($sql);
		$num_rows3=$query->num_rows();
		if(intval($num_rows3)>0){
			$post_data=[
				'account_exists' => 'YES',
				'amount_deposited' => $formdata['amount_deposited'],
				'name_at_bank' => $formdata['name_at_bank'],
				'ref_id' => $formdata['ref_id'],
			];
			// var_dump($post_data);
			$this->db->where('user_id',$user_id);
			$this->db->update('user_bank_details',$post_data);
		} else {
			$post_data=[
				'account_exists' => 'YES',
				'amount_deposited' => $formdata['amount_deposited'],
				'name_at_bank' => $formdata['name_at_bank'],
				'ref_id' => $formdata['ref_id'],
				'user_id' => $user_id,
			];
			// var_dump($post_data);
			$this->db->insert('user_bank_details',$post_data);
		}
	}

	function updateprofiledetails() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$investor_id=$this->input->post('investor_id');
			$post_data = [
				'first_name'=>$this->input->post('first_name'),
				'middle_name'=>$this->input->post('middle_name'),
				'last_name'=>$this->input->post('last_name'),
				'mobile'=>$this->input->post('mobile'),
			];
			$this->db->where('investor_id', $investor_id);
			$res = $this->db->update('users',$post_data);
			
			if($res) {

				if( isset($_FILES['user_profile_picture']['name']) && $_FILES['user_profile_picture']['name'] != "" ) {
					$dir = "uploads/profile/".$investor_id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['user_profile_picture']['tmp_name'];
					$hash = $_FILES['user_profile_picture']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"user_profile_picture" => $hash
						);
						$this->db->where('investor_id', $investor_id);
						$this->db->update('users', $image_details);
					}
					
				}

				$response = [
					'status' => '1',
					'message' => 'Profile is updated successfully.'
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
	




	// check for kyc statis
	 function check_for_kyc_status($formdata){
	 	$investor_id=$formdata['id'];
	 	$sql="SELECT * FROM `users` WHERE investor_id='$investor_id'";
		$query=$this->db->query($sql);
		$result=$query->result();
		$num_rows=$query->num_rows();
		if(intval($num_rows)>0){
			$bank_kyc_status=$result[0]->bank_kyc_status;
			$adhar_kyc_status=$result[0]->adhar_kyc_status;
			$pan_kyc_status=$result[0]->pan_kyc_status;
			if(
				$adhar_kyc_status=='success' && 
				$bank_kyc_status=='success' && 
				$pan_kyc_status=='success' 
			){
				$data=[
					'kycstatus'=>'system_approved'
				];
				$this->db->where('investor_id',$investor_id);
				$this->db->update('users',$data);
			}
		}
	 }
	/* Family account APIS
	Create group
	list group
	Check family member email/mobile
	save family member in invite table
	accept invite send otps to family member
	verify otp email
	verify otp phone
	accept in invite table and update group id, parent id in user table
	modify list member api with group id
	
	*/
public function createGroup()
	{
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Allow-Headers: access");
	   header("Content-Type: application/json; charset=UTF-8");
	   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	   $formdata = json_decode(file_get_contents('php://input'), true);
	   if(!empty($formdata)) {
		   $groupName  = $formdata['groupName'];
		   $userID  = $formdata['userID'];
		   
		   $post_data = [
			   'groupName' => $groupName,
			   'userID' => $userID,
			
		   ];
		   // check group name is exists or not in existing user
		   $sql="SELECT groupName  FROM `groups` WHERE userID='$userID' and groupName='$groupName'";
		   $query=$this->db->query($sql);
		   $result=$query->result();
		   $num_rows=$query->num_rows();
		   if(intval($num_rows)>0){
				$response =[
					'status' => '0',
					'message' => 'Group is already exist.',
					'data' => 0,
				];

		   }
		   else
		   {
				$this->db->insert('groups',$post_data);
				$id=$this->db->insert_id();
				if($id) {
					$response = [
						'status' => '1',
						'message' => 'Group created successfully.',
						'data' => $id,
					];
				}
				else
				{
					$response =[
						'status' => '0',
						'message' => 'Something went wrong, try after sometimes.',
						'data' => 0,
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
    // Group List
    public function getGroupList()
	{
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Allow-Headers: access");
	   header("Content-Type: application/json; charset=UTF-8");
	   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	   $formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $userID = $formdata['userID'];
			if($userID <> "-1") 
           	 $sql="SELECT groups.*,first_name,middle_name,last_name,email,mobile FROM `groups` inner join users on users.investor_id = groups.userID WHERE userID = '$userID' union 
SELECT groups.*,first_name,middle_name,last_name,email,mobile FROM `groups` inner join users on users.groupID = groups.groupID WHERE users.investor_id = '$userID'  ORDER BY groupName";
			else
				$sql="SELECT groups.*,first_name,middle_name,last_name,email,mobile FROM `groups` inner join users on users.investor_id = groups.userID  WHERE 1 = '1' ORDER BY groupName";
            $query=$this->db->query($sql);
            $result = $query->result();
            $num_rows=$query->num_rows();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Groups fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '1',
					'message' => 'Family members are fetched successfully.',
					'data' => [],
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


   public function getGroupListForInvestment()
	{
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Allow-Headers: access");
	   header("Content-Type: application/json; charset=UTF-8");
	   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	   $formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $userID = $formdata['userID'];
			if($userID <> "-1") 
           	 $sql="SELECT 
				g.groupID,
				g.groupName,
				u.investor_id,
				u.first_name,
				u.last_name,
				u.email,
				u.mobile,
				gi.invite_status
			FROM groups g
			LEFT JOIN group_invites gi ON g.groupID = gi.groupID
			LEFT JOIN users u ON gi.member_id = u.investor_id
			WHERE gi.invite_status = 'Accepted' AND g.userID = '$userID'
			ORDER BY g.groupName, u.first_name;";
			else
				$sql="SELECT groups.*,first_name,middle_name,last_name,email,mobile FROM `groups` inner join users on users.investor_id = groups.userID  WHERE 1 = '1' ORDER BY groupName";
            $query=$this->db->query($sql);
            $result = $query->result();
            $num_rows=$query->num_rows();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Groups fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '1',
					'message' => 'Family members are fetched successfully.',
					'data' => [],
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

   //	Check family member email/mobile
   public function checkFamilyMember()
	 {
	     	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			 
			$email = $formdata['email'];
			// $mobile = $formdata['mobile'];
		    // $sql="SELECT investor_id  FROM `users` WHERE email='$email' AND mobile='$mobile' AND user_type<>'founder'";
		    $sql="SELECT investor_id  FROM `users` WHERE email='$email'  AND user_type<>'founder'";
			$query=$this->db->query($sql);
			$result=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
			     $response = [
				'status' => '1',
				'message'=> 'Investor found with this details.',
				'data' => $result,
		    	];
			}
			else
			{
			    $response = [
				'status' => '0',
				'message'=> 'Investor is not availale with this details.',
				'query' => $sql,
				'data' => [],
			];
			}
		
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
				'data' => [],
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	 }
//	save family member in invite table

	 public function saveInvite()
	 {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$groupID = $formdata['groupID'];
			$userID = $formdata['userID'];
			$invite_email = $formdata['email'];
			$invite_mobile = $formdata['mobile'];
			 
			
			$sql="SELECT inviteID  FROM `group_invites` WHERE invite_email ='$invite_email' AND invite_mobile ='$invite_mobile' AND groupID ='$groupID'";
			$query=$this->db->query($sql);
			$result=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
			    //already invited
			    $response =[
						'status' => '0',
						'message' => 'Invitation already sent!',
						'data' => [],
					];
			}
			else
			{
				$sql0="SELECT * FROM users WHERE email='$invite_email'";
				$query0=$this->db->query($sql0);
				$result0=$query0->result();
				$investorId=$result0[0]->investor_id;

				$post_data = [
					'groupID' => $groupID,
					'userID' => $userID,
					'invite_email' => $invite_email,
					'invite_mobile' => $invite_mobile,
					'invite_status' => 'Pending',
					'invite_sent' => date('Y-m-d H-i a'),
					'member_id' => $investorId
				 
					//'email_otp' => $this->GenerateOTP(6);
					//'mobile_otp' => $this->GenerateOTP(6);
				];
				

			    $this->db->insert('group_invites',$post_data);
				$id=$this->db->insert_id();
				if($id) {
				    
				    $response = [
						'status' => '1',
						'message' => 'Invitation sent successfully.',
						'data' => $id,
					];
					//email to invite email
					$sql="SELECT * FROM users WHERE email='$invite_email'";
					$query=$this->db->query($sql);
					$result=$query->result();
					$invitedName=$result[0]->first_name.' '.$result[0]->last_name;
		
					$sql="SELECT * FROM users WHERE investor_id='$userID'";
					$query=$this->db->query($sql);
					$result1=$query->result();
					$inviteeName=$result1[0]->first_name.' '.$result1[0]->last_name;
					
					$sql="SELECT * FROM groups WHERE groupID='$groupID'";
					$query=$this->db->query($sql);
					$result2=$query->result();
					$groupName=$result2[0]->groupName;
					
					
					$link = WEB_BASE_URL.'Group-Invite?'.base64_encode('inviteID='.$id);

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
												  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear '.$invitedName.', 
													  <br>
													  <br>
													  You have been invited By '.$inviteeName.' to join the Family Group '.$groupName.'. 
													  <br>
													  <br>
													  Please click this link to complete the process '.$link.'
													  <br>
													  <br>
												  
													  Thank you, <br/>
													  Growth91 Team  <br/>
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
			$subject="Growth91 Group Investment";
			$this->load->helper('send_email');
			$res=send_email($body,$subject,$invite_email,'');



				}
				else
				{
				    $response =[
						'status' => '0',
						'message' => 'Please try again!',
						'data' => [],
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

	public function familyInviteOTP()
	 {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$inviteID  = $formdata['inviteID'];
			 
			 
			$post_data = [
				'inviteID' => $inviteID,
				'emailOTP' => $this->GenerateOTP(4),
				'mobileOTP' => $this->GenerateOTP(4),
				
			];
			
					$this->db->where('inviteID',$inviteID);
					$resp=$this->db->update('group_invites',$post_data);
				    if($resp){
				    $response = [
						'status' => '1',
						'message' => 'OTP sent successfully.',
						//'data' => $id,
					];


					//email to invite email
					$sql="SELECT * FROM group_invites WHERE inviteID='$inviteID'";
					$query=$this->db->query($sql);
					$result=$query->result();
					$invite_email =$result[0]->invite_email ;
					$invite_mobile  =$result[0]->invite_mobile  ;
					$emailOTP = $result[0]->emailOTP ;
					$mobileOTP = $result[0]->mobileOTP ;
					 

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
												  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear User, 
													  <br>
													  <br>
													  Please use this email OTP for verification of your family invite '.$emailOTP.' 
													  <br>
													  <br>
													  
												  
													  Thank you, <br/>
													  Growth91 Team  <br/>
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
			$subject="Growth91 family invite email OTP ".$emailOTP;
			$this->load->helper('send_email');
			$res=send_email($body,$subject,$invite_email,'');

			$this->load->helper('send_sms_investor');
				$resp=investor_otp_sms($mobileOTP,$invite_mobile );			  	

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
	
	public function verifyFamilyInvite()
	{
		// Verify Email & SMS otp
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$inviteID  = $formdata['inviteID'];
			$emailOTP = $formdata['emailOTP'];
			$parentID=0;
			$groupID =0;
			$invite_email  =0;
			$sql="SELECT *  FROM `group_invites` WHERE emailOTP ='$emailOTP' AND inviteID ='$inviteID'";
			$query=$this->db->query($sql);
			$result=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0)
			{
			    //OTP Mached
					$groupID = $result[0]->groupID;
					$parentID = $result[0]->userID;
					$invite_email = $result[0]->invite_email;
					
				// once verify update status in group invite table
					$post_data = [
						'emailVerified' => "Yes",
						'mobileVerified' => "Yes",
						'emailOTP' => "",
						'mobileOTP' => "",
						'invite_accepted' => date('Y-m-d H-i a'),
						'invite_status' => "Accepted",
					];
					$this->db->where('inviteID',$inviteID);
					$resp=$this->db->update('group_invites',$post_data);
				    if($resp){
				    
					}
					else
					{
						$response =[
							'status' => '0',
							'message' => 'Something went wrong!',
							'data' => [],
						];		
					}
				// update user data against the invite email and mobile with group ID and parent ID 
				$sql="SELECT *  FROM `users` WHERE email ='$invite_email' ";
				$query=$this->db->query($sql);
				$result=$query->result();
				$num_rows=$query->num_rows();
				$investor_id  = $result[0]->investor_id  ;
				$invitedName=$result[0]->first_name.' '.$result[0]->last_name;
				$post_data = [
					'parent_id' => $parentID,
					'groupID' => $groupID,
				];

				$sql="SELECT *  FROM `groups` WHERE groupID ='$groupID'  ";
				$query=$this->db->query($sql);
				$result=$query->result();
				$num_rows=$query->num_rows();
				$groupName = $result[0]->groupName;

				$this->db->where('investor_id',$investor_id);
				$resp=$this->db->update('users',$post_data);
				if($resp)
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
												  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear User, 
													  <br>
													  <br>
													  You are now a member of '.$groupName.' Family Group at Growth91. 
													  <br>
													  <br>
													  
												  
													  Thank you, <br/>
													  Growth91 Team  <br/>
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
			$subject="Growth91 family member joined ".$invitedName;
			$this->load->helper('send_email');
			$res=send_email($body,$subject,$invite_email,'');

			    $response =[
						'status' => '0',
						'message' => 'You have joined the Family!',
						'data' => [],
					];
				}
				else
				{
					$response =[
						'status' => '0',
						'message' => 'Something went wrong!',
						'data' => [], ];
				}
			}
			else
			{
				$response =[
					'status' => '0',
					'message' => 'Please enter valid OTPs!',
					'data' => [], ];
			}
		
		}
		else
		{
			$response =[
				'status' => '0',
				'message' => 'Please provide all data!',
				'data' => [], ];
		}
		// send invite accepted email to owner of the group 
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}
	
	public function getfamilymember()
	{
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Allow-Headers: access");
	   header("Content-Type: application/json; charset=UTF-8");
	   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	   $formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            // $parent_id = $formdata['parent_id'];
			$groupID = $formdata['groupID'];
			$deleteRequested="";
			
            // $sql="SELECT * FROM `users` WHERE parent_id = '$parent_id' AND groupID='$groupID' ORDER BY first_name";
			
            $sql="SELECT * FROM users WHERE investor_id IN (SELECT member_id FROM `group_invites` where groupID = '$groupID' and invite_status = 'Accepted');";
            $query=$this->db->query($sql);
            $result = $query->result();
            $num_rows=$query->num_rows();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Family members fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Family members are fetched successfully.',
					'data' => [],
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
   public function GenerateOTP($n) 
	{ 
		$generator = "135792468"; 
		$result = ""; 
		for($i = 1; $i <= $n; $i++) 
		{ 
			$result .= substr($generator, (rand()%(strlen($generator))), 1); 
		}
		//$result = "1234";
		return $result; 
	} 
	//edit group
	public function editGroup()
	{
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Allow-Headers: access");
	   header("Content-Type: application/json; charset=UTF-8");
	   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	   $formdata = json_decode(file_get_contents('php://input'), true);
	   if(!empty($formdata)) {
		   $groupName  = $formdata['groupName'];
		   $userID  = $formdata['userID'];
		   $groupID = $formdata['groupID'];
		   $post_data = [
			   'groupName' => $groupName,
			   'userID' => $userID,
			
		   ];
		   // check group name is exists or not in existing user
		   $sql="SELECT groupName  FROM `groups` WHERE userID='$userID' and groupName='$groupName' ANd groupID <> '$groupID'";
		   $query=$this->db->query($sql);
		   $result=$query->result();
		   $num_rows=$query->num_rows();
		   if(intval($num_rows)>0){
				$response =[
					'status' => '0',
					'message' => 'Group is already exist.',
					'data' => 0,
				];

		   }
		   else
		   {
				$this->db->where('groupID',$groupID);
            	$result= $this->db->update('groups',$post_data);
				//$this->db->insert('groups',$post_data);
				$id=$groupID;
				if($id) {
					$response = [
						'status' => '1',
						'message' => 'Group updated successfully.',
						'data' => $id,
					];
				}
				else
				{
					$response =[
						'status' => '0',
						'message' => 'Something went wrong, try after sometimes.',
						'data' => 0,
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

	public function deleteGroup()
	{
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Allow-Headers: access");
	   header("Content-Type: application/json; charset=UTF-8");
	   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	   $formdata = json_decode(file_get_contents('php://input'), true);
	   if(!empty($formdata)) {
		    
		   $userID  = $formdata['userID'];
		   $groupID = $formdata['groupID'];
		   $post_data = [
			   'groupID' => $groupID,
			   'userID' => $userID,
			];
		   // Check group have pending Invite/Active Users in that or 
		   $sql="SELECT inviteID  FROM `group_invites` WHERE groupID='$groupID'";
		   $query=$this->db->query($sql);
		   $result=$query->result();
		   $num_rows=$query->num_rows();
		   if(intval($num_rows)>0)
		   {

			//cant delete
			

				$response = [
					'status' => '0',
					'message' => 'You can not delete this group, you have previously invited members in that.',
					
				];
			 
				//Delete and success
		   }
		   else
		   {
				$this -> db -> where("groupID",$groupID) -> delete("groups");
				$response =[
					'status' => '1',
					'message' => 'Group deleted successfully.',
					'data' => 0,
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
	public function deleteGroupMember()
	{
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Allow-Headers: access");
	   header("Content-Type: application/json; charset=UTF-8");
	   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	   $formdata = json_decode(file_get_contents('php://input'), true);
	   if(!empty($formdata)) {
		   $invite_email  = $formdata['invite_email'];
		   $invite_mobile  = $formdata['invite_mobile'];
		   $userID  = $formdata['userID'];
		   $groupID = $formdata['groupID'];
		   $post_data = [
			   'groupID' => $groupID,
			   'userID' => $userID,
			   'invite_email' => $invite_email,
			   'invite_mobile' => $invite_mobile,
		   ];
		   // check group name is exists or not in existing user
		   $sql="SELECT inviteID  FROM `group_invites` WHERE userID='$userID' and groupID='$groupID' AND invite_mobile='$invite_mobile' AND invite_email='$invite_email' ";
		   $query=$this->db->query($sql);
		   $result=$query->result();
		   $num_rows=$query->num_rows();
		   if(intval($num_rows)>0){
			//echo $sql;
			$this -> db -> where("inviteID",$result[0]->inviteID) -> delete("group_invites");
			$inviteID = $result[0]->inviteID;
			//$this -> db -> where("inviteID",$inviteID) -> delete("group_invites");
			// once verify update status in group invite table
			$sql="SELECT *  FROM `users` WHERE email ='$invite_email' AND mobile ='$invite_mobile'  ";
			$query=$this->db->query($sql);
			$result=$query->result();
			$num_rows=$query->num_rows();
			$investor_id  = $result[0]->investor_id  ;
			$invitedName=$result[0]->first_name.' '.$result[0]->last_name;
			$post_data = [
				'parent_id' => 0,
				'groupID' => 0,
			];
			$this->db->where('investor_id',$investor_id);
			$resp=$this->db->update('users',$post_data);


				$response = [
					'status' => '1',
					'message' => 'Member deleted successfully.',
					'data' => $inviteID,
				];
			 
				//Delete and success
		   }
		   else
		   {
				$response =[
					'status' => '0',
					'message' => 'Member is not exist in this group.',
					'data' => 0,
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
	public function deleteRequest()
	{
		// Verify Email & SMS otp
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$invite_email   = $formdata['invite_email'];
			$invite_mobile  = $formdata['invite_mobile'];
			$groupID  = $formdata['groupID'];
			$userID= $formdata['userID'];
			$parentID=0;
			//$groupID =0;
			//$invite_email  =0;
			//$invite_mobile  =0;
			$sql="SELECT *  FROM `group_invites` WHERE invite_email ='$invite_email' AND invite_mobile ='$invite_mobile' AND groupID ='$groupID'";
			$query=$this->db->query($sql);
			$result=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0)
			{
			    //User found
				$inviteID =$result[0]->inviteID;
				// once verify update status in group invite table
					$post_data = [
						'deleteRequested' => "Yes",
						'deleteRequestDate' => date('Y-m-d H-i a'),
						
					];
					$this->db->where('inviteID',$inviteID);
					$resp=$this->db->update('group_invites',$post_data);
				    if(!$resp){
						$response =[
							'status' => '0',
							'message' => 'Something went wrong!',
							'data' => [],
						];	
					}
					else
					{
							
					
				// update user data against the invite email and mobile with group ID and parent ID 
				$sql="SELECT *  FROM `users` WHERE email ='$invite_email' AND mobile ='$invite_mobile'  ";
				$query=$this->db->query($sql);
				$result=$query->result();
				$num_rows=$query->num_rows();
				$investor_id  = $result[0]->investor_id  ;
				$invitedName=$result[0]->first_name.' '.$result[0]->last_name;
				 

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
												  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear User, 
													  <br>
													  <br>
													  We have recevied your request for removing from your existing group at Growth91! Our team will work on your request at earliest. 
													  <br>
													  <br>
													  
												  
													  Thank you, <br/>
													  Growth91 Team  <br/>
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
			$subject="Growth91 family member delete request ";
			$this->load->helper('send_email');
			$res=send_email($body,$subject,$invite_email,'contact@growth91.com');

			    $response =[
						'status' => '1',
						'message' => 'Your request for delete is received by us successfully.',
						'data' => [],
					];
				}
			}
			else
			{
				$response =[
					'status' => '0',
					'message' => 'Please enter valid details!',
					'data' => [], ];
			}
		
		}
		else
		{
			$response =[
				'status' => '0',
				'message' => 'Please provide all data!',
				'data' => [], ];
		}
		// send invite accepted email to owner of the group 
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}


	public function getDeleteRequest()
	{
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	   header("Access-Control-Allow-Origin: *");
	   header("Access-Control-Allow-Headers: access");
	   header("Content-Type: application/json; charset=UTF-8");
	   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	   $formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $deleteRequested = $formdata['deleteRequested'];
			 
			
            $sql=$sql="SELECT groups.groupName, group_invites.*,first_name,middle_name,last_name,email,mobile, concat(first_name,' ',middle_name,' ',last_name) as fullName FROM `group_invites` inner join users on users.investor_id = group_invites.userID inner join groups on groups.groupID = group_invites.groupID  WHERE deleteRequested = 'Yes' ORDER BY first_name";
            $query=$this->db->query($sql);
            $result = $query->result();
            $num_rows=$query->num_rows();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Family members fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Family members are fetched successfully.',
					'data' => [],
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

   public function deleteRequestApprove()
	{
		// Verify Email & SMS otp
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$invite_email   = $formdata['invite_email'];
			$invite_mobile  = $formdata['invite_mobile'];
			$groupID  = $formdata['groupID'];
			$userID= $formdata['userID'];
			$inviteID=$formdata['inviteID'];;
			//$groupID =0;
			//$invite_email  =0;
			//$invite_mobile  =0;
			$sql="SELECT *  FROM `group_invites` WHERE invite_email ='$invite_email' AND invite_mobile ='$invite_mobile' AND groupID ='$groupID'";
			$query=$this->db->query($sql);
			$result=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0)
			{
			    //User found
				// Delete from invite table
				$this -> db -> where("inviteID",$inviteID) -> delete("group_invites");
				// once verify update status in group invite table
				$sql="SELECT *  FROM `users` WHERE email ='$invite_email' AND mobile ='$invite_mobile'  ";
				$query=$this->db->query($sql);
				$result=$query->result();
				$num_rows=$query->num_rows();
				$investor_id  = $result[0]->investor_id  ;
				$invitedName=$result[0]->first_name.' '.$result[0]->last_name;
				$post_data = [
					'parent_id' => 0,
					'groupID' => 0,
				];
				$this->db->where('investor_id',$investor_id);
				$resp=$this->db->update('users',$post_data);
				 
				$investor_id  = $result[0]->investor_id  ;
				$invitedName=$result[0]->first_name.' '.$result[0]->last_name;
				 
				
					$post_data = [
						'deleteRequested' => "Yes",
						'deleteRequestDate' => date('Y-m-d H-i a'),
						
					];
					$this->db->where('inviteID',$inviteID);
					$resp=$this->db->update('group_invites',$post_data);
				    if(!$resp){
						$response =[
							'status' => '0',
							'message' => 'Something went wrong!',
							'data' => [],
						];	
					}
					else
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
												  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear User, 
													  <br>
													  <br>
													  We have processed and removed you from the requested group at Growth91! 
													  <br>
													  <br>
													  
												  
													  Thank you, <br/>
													  Growth91 Team  <br/>
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
			$subject="Growth91 removed from Group ";
			$this->load->helper('send_email');
			$res=send_email($body,$subject,$invite_email,'');

			    $response =[
						'status' => '1',
						'message' => 'Your request for delete is processed successfully.',
						'data' => [],
					];
				}
			}
			else
			{
				$response =[
					'status' => '0',
					'message' => 'Please enter valid details!',
					'data' => [], ];
			}
		
		}
		else
		{
			$response =[
				'status' => '0',
				'message' => 'Please provide all data!',
				'data' => [], ];
		}
		// send invite accepted email to owner of the group 
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}
}
