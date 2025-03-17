<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Investors extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['admin/Blogmodel']);
	}

	// DEAL LIST
    public function list() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		if(!empty($_REQUEST["deal_id"]))
			$sql = "SELECT * FROM `users` inner join investor_commitment on investor_commitment.investor_id = users.investor_id  WHERE (user_type='investor' || is_investor='1') AND deal_id IN (".$_REQUEST["deal_id"].") ORDER BY first_name DESC";
		else
			$sql = "SELECT * FROM `users` WHERE (user_type='investor' || is_investor='1') ORDER BY first_name DESC";	
		//echo $sql;
		//die;
		$query=$this->db->query($sql);
		$list =$query->result();
		for ($i = 0; $i < count($list); $i++) {
			$investor_id=$list[$i]->investor_id;
			$totalSql="SELECT SUM(investments.Investment_amt) AS total_investment FROM `users` LEFT JOIN `investments` ON investments.investor_id=users.investor_id WHERE users.investor_id='$investor_id'";
			$query1 = $this->db->query($totalSql);
			$data2=$query1->result();
			$list[$i]->total_invested_amount=$data2[0]->total_investment;
		}
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Investor list is fetched successfully.',
				'data' => $list,
			];
		} else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

    // DEAL LIST
    public function premium_members() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `users` WHERE user_type='investor' and membership_type='premium' and approvestatus='Approve' ORDER BY investor_id DESC";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if($list) {
			$response = [
				'status' => '1',
				'message' => 'Investor list is fetched successfully.',
				'data' => $list,
			];
		} else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

    // getstartupinvestorlist LIST
    public function getstartupinvestorlist() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			// sql query
			$startupid = $formdata['startupid'];
			$sql = "
			SELECT * FROM `investments`
			LEFT JOIN deals on deals.deal_id = investments.deal_id
			LEFT JOIN startups on startups.startupid = deals.startup_id
			left join users on users.investor_id = investments.investor_id
	        WHERE startups.startupid='$startupid'
			ORDER BY investments.investment_id  DESC;
			";
//			echo $sql;
			$query=$this->db->query($sql);
			$list =$query->result();
			
			if(($list)) {
				$response = [
					'status' => '1',
					'message' => 'Investor list is fetched successfully.',
					'data' => $list,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}	
		} else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

    // add new deal
	function add() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			
			$post_data = [
	            'first_name' => $this->input->post('first_name'),
	            'last_name' => $this->input->post('last_name'),
	            'mobile' => $this->input->post('mobile'),
	            'email' => $this->input->post('email'),
	            'nationality' => $this->input->post('nationality'),
	            'date_of_birth' => $this->input->post('dob'),
	            'legal_name' => $this->input->post('legal_name'),
	            'fathers_name' => $this->input->post('father_name'),
	            'address' => $this->input->post('address'),
	            'bank_ac_no' => $this->input->post('bank_ac_no'),
	            'ifsc_code'=> $this->input->post('ifsc_code'),
	            'user_type' => 'investor',
	            'user_registered_dt' => date('Y-m-d H:i:s a'),
			];
			
			$this->db->insert('users', $post_data);
        	$id =  $this->db->insert_id();
			
			if($id) {

				sendRegistrationEmail($post_data['first_name'], $post_data['last_name'], $post_data['nationality'], $post_data['mobile'], $post_data['email'], "Investor");

				if( isset($_FILES['profile_image']['name']) && $_FILES['profile_image']['name'] != "" ) {
					$dir = "uploads/profile/".$id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['profile_image']['tmp_name'];
					$hash = $_FILES['profile_image']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"user_profile_picture" => $hash
						);
						$this->db->where('investor_id', $id);
						$this->db->update('users', $image_details);
					}
					
				}

				$response = [
					'status' => '1',
					'message' => 'New investor is added successfully.',
					'data' => $id,
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

	function edit() {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$investor_id = $this->input->post('investor_id');
			$post_data = [
				'first_name' => $this->input->post('first_name'),
	            'last_name' => $this->input->post('last_name'),
	            'mobile' => $this->input->post('mobile'),
	            'email' => $this->input->post('email'),
	            'nationality' => $this->input->post('nationality'),
	            'date_of_birth' => $this->input->post('dob'),
	            'legal_name' => $this->input->post('legal_name'),
	            'fathers_name' => $this->input->post('father_name'),
	            'address' => $this->input->post('address'),
	            'bank_ac_no' => $this->input->post('bank_ac_no'),
	            'ifsc_code'=> $this->input->post('ifsc_code'),
			];
			
			$this->db->where('investor_id', $investor_id);
	        $res = $this->db->update('users', $post_data);
	        
			if($res) {

				if(isset($_FILES['profile_image']['name']) && $_FILES['profile_image']['name'] != "") {
					$dir = "uploads/profile/".$investor_id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['profile_image']['tmp_name'];
					$hash = $_FILES['profile_image']['name'];
		
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
					'message' => 'Investor details are updated successfully.',
					'post_data' => $post_data,
					// '_FILES' => $_FILES['profile_image'],
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

	function updatestatus() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$id = $formdata['id'];
		
			$post_data = [
				'deal_status'=> $formdata['dealstatus'],
	            'user_status'=> $formdata['approvestatus'],
			];
			
			$this->db->where('deal_id', $id);
	        $this->db->update('deals', $post_data);
	        $affected_rows= $this->db->affected_rows();
			
			if($affected_rows) {
				$response = [
					'status' => '1',
					'message' => 'Deal status is updated successfully.'
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

	function uploaddealimg(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$id=$this->input->post('deal_id');
			if($id) {
				// logo
				if( isset($_FILES['logo']['name']) && $_FILES['logo']['name'] != "") {
		            $dir = FCPATH . "uploads/deal/logo/" . $id ."/";

		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }

		            $image = $_FILES['logo']['tmp_name'];
		            $temp = explode(".", $_FILES["logo"]["name"]);
	                    $newfilename = round(microtime(true)) . '.' . end($temp);

		            $hash = $_FILES['logo']['name'];

		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "logo" => $newfilename,
		                );
		                $this->db->where('deal_id', $id);
		                $this->db->update('deals', $image_details);
		            }
		        }
		        // banner
		        if( isset($_FILES['banner']['name']) && $_FILES['banner']['name'] != "") {
		            $dir = FCPATH . "uploads/deal/banner/" . $id ."/";

		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }

		            $image = $_FILES['banner']['tmp_name'];
		            $temp = explode(".", $_FILES["banner"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

		            $hash = $_FILES['banner']['name'];

		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "banner_img" => $newfilename,
		                );
		                $this->db->where('deal_id', $id);
		                $this->db->update('deals', $image_details);
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

	function delete() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$id = $this->input->post('investor_id');
		
			$this->db->where('investor_id', $id);
			$res = $this->db->delete('users');
			
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Investor is deleted successfully.'
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


	// get approve list of investors

    public function getapprovelistofinvestors() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `users` WHERE user_type='investor' AND approvestatus='Pending' ORDER BY investor_id DESC";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Investor list is fetched successfully.',
				'data' => $list,
			];
		} else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
    }

	// get approve list of fonunders
    function getapprovelistoffounders() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `users` WHERE user_type='founder' AND approvestatus='Pending' ORDER BY investor_id DESC";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Founder list is fetched successfully.',
				'data' => $list,
			];
		} else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
    }

    function approveuser() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		date_default_timezone_set("Asia/Kolkata");
		if(!empty($formdata)) {
			$investor_id = $formdata['investor_id'];
			$status = $formdata['approvestatus'];
			$type = $formdata['type'];
			$membership_type = $formdata['membership_type'];
			$end_date = date('Y-m-d H-i a', strtotime('+1 years'));
			if($membership_type=='premium'){
				$post_data =[
					'approvestatus' => $status,
					'membership_start_date' => date('Y-m-d H-i a'),
					'membership_end_date' => $end_date,
					'membership_duration'=>'1',
				];
			}else{
				$post_data =[
					'approvestatus'=>$status,
					'membership_start_date'=>'',
					'membership_end_date'=>'',
					'membership_duration'=>'0',
				];
			}
			$this->db->where('investor_id', $investor_id);
			$res = $this->db->update('users',$post_data);
			if($res) {
				if($type=='investor')  {
					$response = [
						'status' => '1',
						'message' => 'Investor is approved successfully.'
					];
				} else {
					$response = [
						'status' => '1',
						'message' => 'Founder is approved successfully.'
					];	
				}
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
    function bulkapproveuser(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$list=json_decode($formdata['data']);
			$arrcount=count($list);
			$c=0;
			foreach ($list as $key => $value) {
				$post_data=[];
				$membership_type=$value->membership_type;
				$end_date = date('Y-m-d H-i a', strtotime('+1 years'));
				if($membership_type=='premium'){
					$post_data =[
						'approvestatus' => 'Approve',
						'membership_start_date' => date('Y-m-d H-i a'),
						'membership_end_date' => $end_date,
						'membership_duration'=>'1',
					];
				}else{
					$post_data =[
						'approvestatus'=>'Approve',
						'membership_start_date'=>'',
						'membership_end_date'=>'',
						'membership_duration'=>'0',
					];
				}
				$investor_id=$value->investor_id;
				$this->db->where('investor_id', $investor_id);
				$this->db->update('users',$post_data);
				$c++;
				if($c==$arrcount){
					$response = [
						'status' => '1',
						'message' => 'Investors are approved successfully.'
					];
				}
			}
		}else{
			$response = [
				'status' => '1',
				'message' => 'Please try again!!'
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
    }
    function bulkrejectuser(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$list=json_decode($formdata['data']);
			$arrcount=count($list);
			$c=0;
			foreach ($list as $key => $value) {
				$post_data=[];
				$membership_type=$value->membership_type;
				$end_date = date('Y-m-d H-i a', strtotime('+1 years'));
				if($membership_type=='premium'){
					$post_data =[
						'approvestatus' => 'Reject',
						'membership_start_date' => date('Y-m-d H-i a'),
						'membership_end_date' => $end_date,
						'membership_duration'=>'1',
					];
				}else{
					$post_data =[
						'approvestatus'=>'Reject',
						'membership_start_date'=>'',
						'membership_end_date'=>'',
						'membership_duration'=>'0',
					];
				}
				$investor_id=$value->investor_id;
				$this->db->where('investor_id', $investor_id);
				$this->db->update('users',$post_data);
				$c++;
				if($c==$arrcount){
					$response = [
						'status' => '1',
						'message' => 'Investors are rejected successfully.'
					];
				}
			}
		}else{
			$response = [
				'status' => '1',
				'message' => 'Please try again!!'
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
    }
    function getkycdetails(){
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$investor_id = $formdata['investor_id'];
			$sql="SELECT * FROM `user_adhar_details` WHERE user_id='$investor_id'";
			$query=$this->db->query($sql);
			$result1=$query->result();

			$sql="SELECT * FROM `user_bank_details` WHERE user_id='$investor_id'";
			$query=$this->db->query($sql);
			$result2=$query->result();

			$sql="SELECT * FROM `user_pan_details` WHERE user_id='$investor_id'";
			$query=$this->db->query($sql);
			$result3=$query->result();
			
			if($result3 || $result2 || $result1) {
				$response = [
					'status' => '1',
					'message' => 'Details are fetched successfully.',
					'pan_details'=>$result3,
					'bank_details'=>$result2,
					'adhar_details'=>$result1,
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

	//17-11-2022 for disable and enable user status
	function user_disable_enable() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$id = $formdata['investor_id'];
			$userId = $formdata['user_id'];

			if (!empty($userId)) {
				$sql="SELECT * FROM `admin_master` WHERE id='$userId' LIMIT 1";
				$query=$this->db->query($sql);
				$result=$query->result();

				if ($result[0]->is_super_admin == 0) {
					$response = [
						'status' => '0',
						'message' => 'You have no rights.'
					];
					return $this->output
					->set_content_type('application/json')
					->set_output(json_encode($response));
				}
			}
		
			$post_data = [
				'user_block_status'=> $formdata['user_block_status'],
			];
			
			$this->db->where('investor_id', $id);
	        $this->db->update('users', $post_data);
	        $affected_rows= $this->db->affected_rows();
			
			if($affected_rows) {
				$response = [
					'status' => '1',
					'message' => 'status is updated successfully.'
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
				'message'=> 'Please select any User.',
			];
		}
			
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
	
	public function send_email_to_investors()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		$investor_commitment = $this->db->select("users.investor_id, users.first_name, users.last_name, users.email, investor_commitment.amount, investor_commitment.processingfees, deals.deal_name, users.startup_name, deals.bank_acc_name, deals.bank_acc_num, deals.bank_name, deals.bank_acc_type, deals.bank_acc_ifsc, deals.bank_branch")->from("users")->join("investor_commitment", "users.investor_id = investor_commitment.investor_id", "left")->join("deals", "deals.deal_id = investor_commitment.deal_id")->where("investor_commitment.parent_id", 0)->where("investor_commitment.isCommitmentEnabled", 'Enabled')->where('investor_commitment.deal_id', $formdata['deal_id'])->where_in('users.investor_id', $formdata['investor_ids'])->order_by('users.investor_id')->get()->result_array();
		
		$this->load->helper('send_email');
		foreach ($investor_commitment as $key => $value) {
			$query = "SELECT admin_documents.* FROM admin_documents LEFT join admin_documents_for on admin_documents_for.admindocID = admin_documents.admindocID WHERE (deal_id=0 AND investor_id=0 AND founder_id=0) OR (investor_id='".$value["investor_id"]."') OR (deal_id > 0 AND investor_id = '-1') ORDER BY admin_documents.admindocID DESC";
			$attachmentsData = $this->db->query($query)->result();
			$attachments = [];
			if (!empty($attachmentsData)) {
				foreach ($attachmentsData as $attachment) {
					array_push($attachments, 'uploads/admindocs/' . $attachment->admindocID . '/' . $attachment->admindocFile);
				}
			}
			$body = '
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
																<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'. $value['first_name'] .'</strong>, 
																	<br>
																	<br>
																	Thank you for committing your interest in the '. $value['deal_name'] .' Deal. We are pleased to inform you that we have initiated the Call for Money.
																	<br>
																	<br>
																	The investment amount is ₹ '. $value['amount'] .'. Please find the bank details for transferring the funds below:
																	<br>
																	<br>
																	'. $value['deal_name'] .' Bank Details:
																	<br>
																	Account Name: '. $value['bank_acc_name'] .'.
																	<br>
																	Account Number: '. $value['bank_acc_num'] .'
																	<br>
																	Bank: '. $value['bank_name'] .'
																	<br>
																	Account Type: '. $value['bank_acc_type'] .'
																	<br>
																	IFSC Code: '. $value['bank_acc_ifsc'] .'
																	<br>
																	Branch: '. $value['bank_branch'] .'
																	<br>
																	<br><br>
																	Also, we request you to pay investment facilitation charges of ₹ '. $value['processingfees'] .'. Kindly transfer this amount to the following account:
																	<br>
																	<br><br>
																	Growth91 Advisors Private Limited Bank Details:
																	<br>
																	Account Name: Growth91 Advisors Private Limited
																	<br>
																	Account Number: 50200066360849
																	<br>
																	Bank: HDFC Bank
																	<br>
																	Branch: Akola, Maharashtra
																	<br>
																	IFSC Code: HDFC0000221
																	<br>
																	Account Type: Current Account
																	<br><br>
																	You can transfer the amounts either by adding the bank details as a beneficiary in your bank and sending the payment directly, or alternatively, we will send you a follow-up email containing a payment link, so you can transfer the amount
																	<br><br>
																	We have attached required documents for your reference.
																	<br><br>
																	Feel free to reach out if you have any questions.
																	<br><br>
																	Best regards,
																	<br>
																	Team Growth91
																	<br>
																	Growth91 Advisors Private Limited
																	<br><br>
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
														Powered by <a href="' . WEB_BASE_URL . '" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
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
			$subject = 'Growth91 - Requesting Payment for Investments and the Applicable Convenience Fees';
			$cc = '';
			$to = $value['email'];
			send_email($body, $subject, $to, $cc, $attachments);
		}

		$response = [
			'status' => '1',
			'message' => 'Email sent successfully'
		];

		return $this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
}
