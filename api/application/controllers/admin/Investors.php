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
			LEFT JOIN startups on startups.startupid = deals.deal_name
			left join users on users.investor_id = investments.investor_id
	        WHERE startups.startupid='$startupid'
			ORDER BY investments.investment_id  DESC;
			";
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
	



}
