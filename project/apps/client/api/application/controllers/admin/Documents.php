<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Documents extends CI_Controller {

	public function __construct() {
		parent::__construct();
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
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$startupid=$formdata['startupid'];
			$sql = "SELECT * FROM `startupdocuments` where startupid='$startupid' ORDER BY documentid DESC";
			$query=$this->db->query($sql);
			$list =$query->result();
			
			if(isset($list)) {
				$response = [
					'status' => '1',
					'message' => 'Document list is fetched successfully.',
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
			$startupid=$_POST['startupid'];
			$post_data = [
	            'docname' => $_POST['docname'],
	            'paid' => $_POST['paid'],
	            'startupid' => $_POST['startupid'],
	            'premium_price' => $_POST['premium_price'],
	            'regular_price' => $_POST['regular_price'],
			];
			
			$this->db->insert('startupdocuments', $post_data);
        	$id =  $this->db->insert_id();
			
			if($id) {

				if( isset($_FILES['document']['name']) && $_FILES['document']['name'] != "" ) {
					$dir = "uploads/docs/".$id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['document']['tmp_name'];
					$hash = $_FILES['document']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"document" => $hash
						);
						$this->db->where('documentid', $id);
						$this->db->update('startupdocuments', $image_details);
					}
					
				}
				$d=[
					'documentsid' => $id,
				];
				$this->db->where('startupid', $_POST['startupid']);
				$this->db->update('startups', $d);

				$response = [
					'status' => '1',
					'message' => 'Document is added successfully.',
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
			$documentid = $_POST['documentid'];
			$post_data = [
				'docname' => $_POST['docname'],
	            'paid' => $_POST['paid'],
	            'premium_price' => $_POST['premium_price'],
	            'regular_price' => $_POST['regular_price'],
			];
			
			$this->db->where('documentid', $documentid);
	        $res = $this->db->update('startupdocuments', $post_data);
	        
			if($res) {

				if( isset($_FILES['document']['name']) && $_FILES['document']['name'] != "" ) {
					$dir = "uploads/docs/".$documentid.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['document']['tmp_name'];
					$hash = $_FILES['document']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"document" => $hash
						);
						$this->db->where('documentid', $documentid);
						$this->db->update('startupdocuments', $image_details);
					}
					
				}

				$response = [
					'status' => '1',
					'message' => 'Document details are updated successfully.'
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
			$documentid = $_POST['documentid'];
		
			$this->db->where('documentid', $documentid);
			$res = $this->db->delete('startupdocuments');
			
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Document is deleted successfully.'
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
	// get assesment form details
	function get_assesment_form_details(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$sql="SELECT * FROM `users_selected_by_founder`
			LEFT JOIN founder_startup_form_by_users on founder_startup_form_by_users.form_id=users_selected_by_founder.id
			WHERE users_selected_by_founder.by_founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$list=$query->result();
			if(isset($list)) {
				$response = [
					'status' => '1',
					'message' => 'Assesment form details are fetched successfully.',
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
				'message' => 'Please try again! 1'
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	// get list of founders who have assessment form entries
	function get_assessment_founders_list(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$sql = "SELECT DISTINCT 
			users_selected_by_founder.by_founder_id AS founder_id,
			CONCAT_WS(' ', users.first_name, users.last_name) AS founder_name
		FROM users_selected_by_founder
		LEFT JOIN users ON users.investor_id = users_selected_by_founder.by_founder_id
		WHERE users_selected_by_founder.form_status = 'submitted'
		  AND users_selected_by_founder.by_founder_id IS NOT NULL 
		  AND users_selected_by_founder.by_founder_id != ''
		ORDER BY CAST(users_selected_by_founder.by_founder_id AS UNSIGNED) DESC";

		$query = $this->db->query($sql);
		$list = $query ? $query->result() : [];

		$response = [
			'status' => '1',
			'message' => 'Assessment founders list fetched successfully.',
			'data' => $list
		];

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	// add new documents
    function addadmindocs() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
        $forDeal = "No"    ;
        $forInvestor="No";
        $forFounder="No";
        $forAlll = "Yes";
		
		if(!empty($_POST)) {
			
            if(!empty($_POST["deal_id"]))
                $forDeal= "Yes";
            if(!empty($_POST["investor_id"]))
                $forInvestor= "Yes";    
            if(!empty($_POST["founder_id"]))
                $forFounder= "Yes";        
            if($forDeal=="Yes" || $forInvestor=="Yes" || $forFounder=="Yes")    
            {
                $forAlll="No";
            }


			$post_data = [
	            'admindocName' => $_POST['admindocName'],
	            'admindocForDeal' => $forDeal,
	            'admindocForInvestor' => $forInvestor,
	            'admindocForFounder' => $forFounder,
	            'admindocForAll' => $forAlll,
                'admindocActive' => $_POST['admindocActive'],
                'admindocDescription' => $_POST['admindocDescription'],
                //'admindocFile' => $_POST['admindocFile'],
			];
			
			$this->db->insert('admin_documents', $post_data);
        	$id =  $this->db->insert_id();
			
			/*Based on Investor/founder etc.. option insert repsective data in document for table
			when all investors - investorID = -1, rest is 0
			when all founders - founderID = -1 rest is 0
			when for all user - all will be 0
			when for specific deal & all investor - dealID = selected deal ID , investor id = -1, rest is 0
			when it is for specific founders, founderID = selected founderIDs, rest is 0 multiple rows
			when it is for specific founder, investorID = selected investorIDs, rest is 0 multiple rows
			*/
			//admin_documents_for
			$insArray = array();
			/*all user*/
			if($forAlll=="Yes")
			{
				$insArray = [
	            'admindocID' => $id,
	            'deal_id' => 0,
	            'investor_id' => 0,
	            'founder_id' => 0,	             
				];
				$this->db->insert('admin_documents_for', $insArray);
				//$id =  $this->db->insert_id();
			}
			else
			{
				if(!empty($_POST["deal_id"]) && empty($_POST["investor_id"])) // Specific Deal , All investors
				{
					$insArray = [
					'admindocID' => $id,
					'deal_id' => $_POST["deal_id"],
					'investor_id' => 0,
					'founder_id' => 0,	             
					];
					$this->db->insert('admin_documents_for', $insArray);
					//$id =  $this->db->insert_id();
				}
				else if(!empty($_POST["deal_id"]) && !empty($_POST["investor_id"]) && $_POST["investor_id"]!="-1" ) // Specific investors, specific deal
				{
					$invArray = explode(",",$_POST["investor_id"]);
					for($c=0;$c<count($invArray);$c++)
					{	
						$insArray = [
						'admindocID' => $id,
						'deal_id' => $_POST["deal_id"],
						'investor_id' => $invArray[$c],
						'founder_id' => 0,	             
						];
						$this->db->insert('admin_documents_for', $insArray);
						
					}
				}				 
				else if(empty($_POST["deal_id"]) && $_POST["investor_id"]=="-1") // all investors
				{
					$insArray = [
					'admindocID' => $id,
					'deal_id' => 0,
					'investor_id' => -1,
					'founder_id' => 0,	             
					];
					$this->db->insert('admin_documents_for', $insArray);
					//$id =  $this->db->insert_id();
				}
				else if($_POST["founder_id"]=="-1") // all foundeers
				{
					$insArray = [
					'admindocID' => $id,
					'deal_id' => 0,
					'investor_id' => 0,
					'founder_id' => -1,	             
					];
					$this->db->insert('admin_documents_for', $insArray);
					//$id =  $this->db->insert_id();
				}
				else if($_POST["founder_id"]!="-1") // all foundeers
				{
					
					$founderArray = explode(",",$_POST["founder_id"]);
					for($c=0;$c<count($founderArray);$c++)
					{
					$insArray = [
					'admindocID' => $id,
					'deal_id' => 0,
					'investor_id' => 0,
					'founder_id' => $founderArray[$c],	             
					];
						$this->db->insert('admin_documents_for', $insArray);
					}
					//$id =  $this->db->insert_id();
				}
				
			}
				
			
			if($id) {

				if( isset($_FILES['document']['name']) && $_FILES['document']['name'] != "" ) {
					$dir = "uploads/admindocs/".$id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['document']['tmp_name'];
					$hash = $_FILES['document']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"admindocFile" => $hash
						);
					$this->db->where('admindocID ', $id);
					$this->db->update('admin_documents', $image_details);
					
					 
					
					}
					
				}
				 

				$response = [
					'status' => '1',
					'message' => 'Document is added successfully.',
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
	
	// add new documents
    function editadmindocs() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
        $forDeal = "No"    ;
        $forInvestor="No";
        $forFounder="No";
        $forAlll = "Yes";
		
		if(!empty($_POST)) {
			
            if(!empty($_POST["deal_id"]))
                $forDeal= "Yes";
            if(!empty($_POST["investor_id"]))
                $forInvestor= "Yes";    
            if(!empty($_POST["founder_id"]))
                $forFounder= "Yes";        
            if($forDeal=="Yes" || $forInvestor=="Yes" || $forFounder=="Yes")    
            {
                $forAlll="No";
            }


			$post_data = [
	            'admindocName' => $_POST['admindocName'],
	            'admindocForDeal' => $forDeal,
	            'admindocForInvestor' => $forInvestor,
	            'admindocForFounder' => $forFounder,
	            'admindocForAll' => $forAlll,
                'admindocActive' => $_POST['admindocActive'],
                'admindocDescription' => $_POST['admindocDescription'],
                 
			];
			
			//$this->db->insert('admin_documents', $post_data);
        	//$id =  $this->db->insert_id();
			$this->db->where('admindocID', $_POST['admindocID']);
	        $res = $this->db->update('admin_documents', $post_data);
			//var_dump(
			/*Based on Investor/founder etc.. option insert repsective data in document for table
			when all investors - investorID = -1, rest is 0
			when all founders - founderID = -1 rest is 0
			when for all user - all will be 0
			when for specific deal & all investor - dealID = selected deal ID , investor id = -1, rest is 0
			when it is for specific founders, founderID = selected founderIDs, rest is 0 multiple rows
			when it is for specific founder, investorID = selected investorIDs, rest is 0 multiple rows
			*/
			//admin_documents_for
			$this->db->where('admindocID', $_POST['admindocID']);
			$res2 = $this->db->delete('admin_documents_for');
			
			$insArray = array();
			$id =$_POST['admindocID'];
			/*all user*/
			if($forAlll=="Yes")
			{
				$insArray = [
	            'admindocID' => $id,
	            'deal_id' => 0,
	            'investor_id' => 0,
	            'founder_id' => 0,	             
				];
				$this->db->insert('admin_documents_for', $insArray);
				$id =  $this->db->insert_id();
			}
			else
			{
				if(!empty($_POST["deal_id"]) && empty($_POST["investor_id"])) // Specific Deal , All investors
				{
					$insArray = [
					'admindocID' => $id,
					'deal_id' => $_POST["deal_id"],
					'investor_id' => 0,
					'founder_id' => 0,	             
					];
					$this->db->insert('admin_documents_for', $insArray);
					//$id =  $this->db->insert_id();
				}
				else if(!empty($_POST["deal_id"]) && !empty($_POST["investor_id"]) && $_POST["investor_id"]!="-1" ) // Specific investors, specific deal
				{
					$invArray = explode(",",$_POST["investor_id"]);
					for($c=0;$c<count($invArray);$c++)
					{	
						$insArray = [
						'admindocID' => $id,
						'deal_id' => $_POST["deal_id"],
						'investor_id' => $invArray[$c],
						'founder_id' => 0,	             
						];
						$this->db->insert('admin_documents_for', $insArray);
						
					}
				}				 
				else if(empty($_POST["deal_id"]) && $_POST["investor_id"]=="-1") // all investors
				{
					$insArray = [
					'admindocID' => $id,
					'deal_id' => 0,
					'investor_id' => -1,
					'founder_id' => 0,	             
					];
					$this->db->insert('admin_documents_for', $insArray);
					//$id =  $this->db->insert_id();
				}
				else if($_POST["founder_id"]=="-1") // all foundeers
				{
					$insArray = [
					'admindocID' => $id,
					'deal_id' => 0,
					'investor_id' => 0,
					'founder_id' => -1,	             
					];
					$this->db->insert('admin_documents_for', $insArray);
					//$id =  $this->db->insert_id();
				}
				else if($_POST["founder_id"]!="-1") // all foundeers
				{
					
					$founderArray = explode(",",$_POST["founder_id"]);
					for($c=0;$c<count($founderArray);$c++)
					{
					$insArray = [
					'admindocID' => $id,
					'deal_id' => 0,
					'investor_id' => 0,
					'founder_id' => $founderArray[$c],	             
					];
						$this->db->insert('admin_documents_for', $insArray);
					}
					//$id =  $this->db->insert_id();
				}
				
			}
				
			
			if($id) {

				if( isset($_FILES['document']['name']) && $_FILES['document']['name'] != "" ) {
					$dir = "uploads/admindocs/".$id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['document']['tmp_name'];
					$hash = $_FILES['document']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"admindocFile" => $hash
						);
					$this->db->where('admindocID ', $id);
					$this->db->update('admin_documents', $image_details);
					
					 
					
					}
					
				}
				 

				$response = [
					'status' => '1',
					'message' => 'Document is updated successfully.',
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
	function deleteadmindocs() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$admindocID = $_POST['admindocID'];
		
			$this->db->where('admindocID', $admindocID);
			$res = $this->db->delete('admin_documents');
			
			$this->db->where('admindocID', $admindocID);
			$res = $this->db->delete('admin_documents_for');
			
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Document is deleted successfully.'
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

	public function listadmindocs() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * from admin_documents ORDER BY admindocID DESC;";
		$query = $this->db->query($sql);
		$list = $query->result();
		for ($i = 0; $i < count($list); $i++) {
			$admindocID=$list[$i]->admindocID;
			

			// get document for list list
			$sql2 = "SELECT * FROM `admin_documents_for` WHERE `admindocID`='$admindocID'";
			$query2 = $this->db->query($sql2);
			$data3=$query2->result();
			/*$num_rows = $query2->num_rows();
			if($list[$i] -> deal_type == "Private" || $list[$i] -> deal_type == "Public"){
				$list[$i]->total_invitions=$num_rows;
			}else{
				$list[$i]->total_invitions='0';
			}*/
			$arr=[];
			for($c=0;$c<count($data3);$c++){
				//if($data3[$c]->investor_id!="0"){
					array_push($arr, $data3[$c]);
				//}
			}
			$list[$i]->documentFor=$arr;
		}
		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Document list is fetched successfully.',
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

    public function listinvestordocs() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT admin_documents.* FROM admin_documents LEFT join admin_documents_for on admin_documents_for.admindocID = admin_documents.admindocID   WHERE (deal_id=0 AND investor_id=0 AND founder_id=0) OR (investor_id='".$_POST["investor_id"]."') OR (deal_id > 0 AND investor_id = '-1') ORDER BY admin_documents.admindocID DESC";
		//echo $sql;die;
		$query = $this->db->query($sql);
		$list = $query->result();
		for ($i = 0; $i < count($list); $i++) {
			$admindocID=$list[$i]->admindocID;
			

			// get document for list list
			$sql2 = "SELECT * FROM `admin_documents_for` WHERE `admindocID`='$admindocID'";
			$query2 = $this->db->query($sql2);
			$data3=$query2->result();
			/*$num_rows = $query2->num_rows();
			if($list[$i] -> deal_type == "Private" || $list[$i] -> deal_type == "Public"){
				$list[$i]->total_invitions=$num_rows;
			}else{
				$list[$i]->total_invitions='0';
			}*/
			$arr=[];
			/*for($c=0;$c<count($data3);$c++){
				//if($data3[$c]->investor_id!="0"){
					array_push($arr, $data3[$c]);
				//}
			}
			$list[$i]->documentFor=$arr;*/
		}
		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Document list is fetched successfully.',
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
	 public function listfounderdocs() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT admin_documents.* FROM admin_documents LEFT join admin_documents_for on admin_documents_for.admindocID = admin_documents.admindocID   WHERE (deal_id=0 AND investor_id=0 AND founder_id=0) OR (founder_id='".$_POST["founder_id"]."') OR (founder_id = '-1') ORDER BY admin_documents.admindocID DESC";
		//echo $sql;die;
		$query = $this->db->query($sql);
		$list = $query->result();
		for ($i = 0; $i < count($list); $i++) {
			$admindocID=$list[$i]->admindocID;
			

			// get document for list list
			$sql2 = "SELECT * FROM `admin_documents_for` WHERE `admindocID`='$admindocID'";
			$query2 = $this->db->query($sql2);
			$data3=$query2->result();
			/*$num_rows = $query2->num_rows();
			if($list[$i] -> deal_type == "Private" || $list[$i] -> deal_type == "Public"){
				$list[$i]->total_invitions=$num_rows;
			}else{
				$list[$i]->total_invitions='0';
			}*/
			$arr=[];
			/*for($c=0;$c<count($data3);$c++){
				//if($data3[$c]->investor_id!="0"){
					array_push($arr, $data3[$c]);
				//}
			}
			$list[$i]->documentFor=$arr;*/
		}
		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Document list is fetched successfully.',
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
    
}