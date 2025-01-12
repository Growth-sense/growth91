<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kyc extends CI_Controller {

	public function storekycdetail()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true); 

		$investor_id = $_POST["investor_id"];

		if(!is_numeric($investor_id) || empty($investor_id) || $investor_id == "")
		{
			$response = [
				"status" => 0,
				"message" => "Investor Id Missing Updated"
			];

			$this -> output -> set_content_type("application/json") -> set_output(json_encode($response));
		}

		if($_POST["form-type"] == "admin_access")
		{
			if(isset($_POST["panno"]))
			{
				$this -> db -> where("investor_id",$investor_id) -> update("users",[
					"panno" => strtoupper($_POST["panno"])
				]);

				$this -> db -> where("user_id",$investor_id) -> update("user_pan_details",[
					"pan" => strtoupper($_POST["panno"])
				]);
			}

			if(isset($_POST["adharno"]))
			{
				$this -> db -> where("investor_id",$investor_id) -> update("users",[
					"adharno" => $_POST["adharno"]
				]);

				$this -> db -> where("user_id",$investor_id) -> update("user_adhar_details",[
					"adhar_no" => $_POST["adharno"]
				]);
			}

			if(isset($_POST["bank_ac_no"]))
			{
				$this -> db -> where("investor_id",$investor_id) -> update("users",[
					"bank_ac_no" => strtoupper($_POST["bank_ac_no"])
				]); 
			}

			if(isset($_POST["ifsc_code"]))
			{
				$this -> db -> where("investor_id",$investor_id) -> update("users",[
					"ifsc_code" => strtoupper($_POST["ifsc_code"])
				]); 
			}

			$response = [
				"status" => 1,
				"message" => "Details Updated"
			];

			$this -> output -> set_content_type("application/json") -> set_output(json_encode($response));
		}
		
		if($_POST["form-type"] == "legal_details")
		{
			if(isset($_POST["legal_name"]) && !empty($_POST["legal_name"]))
			{
				$this -> db -> where("investor_id",$investor_id);
				$this -> db -> update("users",[
					"investor_id" => $investor_id,
					"legal_name" => $_POST["legal_name"]
				]);
			}
			
			if(isset($_POST["fathers_name"]) && !empty($_POST["fathers_name"]))
			{
				$this -> db -> where("investor_id",$investor_id);
				$this -> db -> update("users",[
					"investor_id" => $investor_id,
					"fathers_name" => $_POST["fathers_name"]
				]);
			}
			
			if(isset($_POST["address"]) && !empty($_POST["address"]))
			{
				$this -> db -> where("investor_id",$investor_id);
				$this -> db -> update("users",[
					"investor_id" => $investor_id,
					"address" => $_POST["address"]
				]);
			}
			
			$response = [
					'status' => '1',
					'message' => 'Details Updated'

				];
			
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
		}
		
		if($_POST["form-type"] == "cheque")
		{
			if(isset($_FILES["cheque_image"]["name"]) && $_FILES["cheque_image"]["name"] != "")
			{
				$dir = FCPATH."uploads/cheque_image/".$investor_id."/";
				if(!is_dir($dir))
				{
					@mkdir($dir,0777,true);
				}
				
				$image = $_FILES['cheque_image']['tmp_name'];
				$temp = explode(".", $_FILES["cheque_image"]["name"]);
				$newfilename = round(microtime(true)) . '.' . end($temp);
				

				if(move_uploaded_file($image, $dir.$newfilename)) 
				{
					$this -> db -> where("investor_id",$investor_id);
					$this -> db -> update("users",[
						"investor_id" => $investor_id,
						"cheque_image" => $newfilename
					]);
				}
				
				$response = [
					'status' => '1',
					'message' => 'Cheque Uploaded'

				];
			
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
			}
			else{
				$response = [
					'status' => '0',
					'message' => 'No CHEQUE Image Found.'
					
				];
			
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
			}	
			
		}

		if($_POST["form-type"] == "pan")
		{
			if(isset($_POST["pan_name"]) && $_POST["pan_name"] != "")
			{
				$this -> db -> where("investor_id",$investor_id);
				$this -> db -> update("users",[
					"pan_name" => $_POST["pan_name"], 
				]);
			}
			
			if(isset($_FILES["pan_image"]["name"]) && $_FILES["pan_image"]["name"] != "")
			{
				$dir = FCPATH."uploads/pan/".$investor_id."/";
				if(!is_dir($dir))
				{
					@mkdir($dir,0777,true);
				}
				
				$image = $_FILES['pan_image']['tmp_name'];
				$temp = explode(".", $_FILES["pan_image"]["name"]);
				$newfilename = round(microtime(true)) . '.' . end($temp);
				

				if(move_uploaded_file($image, $dir.$newfilename)) 
				{
					$this -> db -> where("investor_id",$investor_id);
					$this -> db -> update("users",[
						"investor_id" => $investor_id,
						"pan_image" => $newfilename
					]);
				}
				
				$response = [
					'status' => '1',
					'message' => 'Pan Uploaded'

				];
			
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
			}
			else{
				$response = [
					'status' => '0',
					'message' => 'No PAN Image Found.'
					
				];
			
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
			}	
			
		}

		if($_POST["form-type"] == "aadhaar")
		{
			if(isset($_POST["adhaar_name"]) && $_POST["adhaar_name"] != "")
			{
				$this -> db -> where("investor_id",$investor_id);
				$this -> db -> update("users",[
					"adhaar_name" => $_POST["adhaar_name"], 
				]);
			}
			
			if(isset($_POST["adhaar_address"]) && $_POST["adhaar_address"] != "")
			{
				$this -> db -> where("investor_id",$investor_id);
				$this -> db -> update("users",[
					"adhaar_address" => $_POST["adhaar_address"], 
				]);
			}
			
			if(isset($_FILES["aadhaar_front"]["name"]) && $_FILES["aadhaar_front"]["name"] != "")
			{
				$dir = FCPATH."uploads/adhar-front/".$investor_id."/";
				if(!is_dir($dir))
				{
					@mkdir($dir,0777,true);
				}
				
				$image = $_FILES['aadhaar_front']['tmp_name'];
				$temp = explode(".", $_FILES["aadhaar_front"]["name"]);
				$newfilename = round(microtime(true)) . '.' . end($temp);

				if(move_uploaded_file($image, $dir.$newfilename)) 
				{
					$this -> db -> where("investor_id",$investor_id);
					$this -> db -> update("users",[
						"investor_id" => $investor_id,
						"adharFront" => $newfilename
					]);
				}
				
				$response = [
					'status' => '1',
					'message' => 'Aadhaar Front Uploaded'
				];
			
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
			}
			
			if(isset($_FILES["aadhaar_back"]["name"]) && $_FILES["aadhaar_back"]["name"] != "")
			{
				$dir = FCPATH."uploads/adhar-back/".$investor_id."/";
				if(!is_dir($dir))
				{
					@mkdir($dir,0777,true);
				}
				
				$image = $_FILES['aadhaar_back']['tmp_name'];
				$temp = explode(".", $_FILES["aadhaar_back"]["name"]);
				$newfilename = round(microtime(true)) . '.' . end($temp);

				if(move_uploaded_file($image, $dir.$newfilename)) 
				{
					$this -> db -> where("investor_id",$investor_id);
					$this -> db -> update("users",[
						"investor_id" => $investor_id,
						"adharBack" => $newfilename
					]);
				}
				
				$response = [
					'status' => '1',
					'message' => 'Aadhaar Back Uploaded'
				];
			
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
			}
			else{

				$response = [
						'status' => '0',
						'message' => 'No Image Found.'
					];
				
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
			}
			
			
		}


	}

	public function completekycprocess(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

            $dob = $formdata['dob'];
            $adharno = $formdata['adharno'];
            $captchatext = $formdata['captchatext'];
            $panno = $formdata['panno'];
            $otp = $formdata['otp'];
            $legalname = $formdata['legalname'];
            $fathername = $formdata['fathername'];
            $address = $formdata['address'];
            $id = $formdata['id'];

			$post_data = [
				'date_of_birth' => $dob,
				'adharno' => $adharno,
				'panno' => $panno,
                'legal_name' => $legalname,
                'fathers_name' => $fathername,
                'address' => $address,
                'kycstatus' => 'system_approved',
			];
            $this->db->where('investor_id', $id);
            $d = $this->db->update('users', $post_data);
			
			if($d) {
				$this->update_doc_details($formdata);
				$response = [
					'status' => '1',
					'message' => 'KYC process is completed successfully.'
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

	function update_doc_details($formdata){
		$user_id=$formdata['id'];
		// adhar details
		$sql="SELECT * FROM `user_adhar_details` WHERE user_id='$user_id'";
		$query=$this->db->query($sql);
		$num_rows=$query->num_rows();

		if(intval($num_rows)>0){
			$post_data=[
				'adhar_no' => $formdata['adhar_no'],
				'age_band' => $formdata['adhar_age_band'],
				'gender' => $formdata['adhar_gender'],
				'mobile_no' => $formdata['adhar_mobile_no'],
				'reference_id' => $formdata['adhar_reference_id'],
				'state' => $formdata['adhar_state'],
				'valid' => $formdata['adhar_valid'],
			];
			$this->db->where('user_id',$user_id);
			$this->db->update('user_adhar_details',$post_data);
		} else {
			$post_data=[
				'adhar_no' => $formdata['adhar_no'],
				'age_band' => $formdata['adhar_age_band'],
				'gender' => $formdata['adhar_gender'],
				'mobile_no' => $formdata['adhar_mobile_no'],
				'reference_id' => $formdata['adhar_reference_id'],
				'state' => $formdata['adhar_state'],
				'valid' => $formdata['adhar_valid'],
				'user_id' => $user_id,
			];
			$this->db->insert('user_adhar_details',$post_data);
		}

		// pan details
		$sql="SELECT * FROM `user_pan_details` WHERE user_id='$user_id'";
		$query=$this->db->query($sql);
		$num_rows2=$query->num_rows();
		if(intval($num_rows2)>0){
			$post_data=[		
				'father_name' => $formdata['pan_father_name'] ? $formdata['pan_father_name'] :'',
				'name_match_score' => $formdata['pan_name_match_score'] ? $formdata['pan_name_match_score'] :'',
				'name_provided' => $formdata['pan_name_provided'] ? $formdata['pan_name_provided'] : '',
				'pan' => $formdata['pan'] ? $formdata['pan'] : '',
				'reference_id' => $formdata['pan_reference_id'] ? $formdata['pan_reference_id'] : '',
				'registered_name' => $formdata['pan_registered_name'] ? $formdata['pan_registered_name'] : '',
				'type' => $formdata['pan_type'] ? $formdata['pan_type'] : '',
				'valid' => $formdata['pan_valid'] ? $formdata['pan_valid'] : '',
			];
			$this->db->where('user_id',$user_id);
			$this->db->update('user_pan_details',$post_data);
		} else {
			$post_data=[
				'father_name' => $formdata['pan_father_name'],
				'name_match_score' => $formdata['pan_name_match_score'],
				'name_provided' => $formdata['pan_name_provided'],
				'pan' => $formdata['pan'],
				'reference_id' => $formdata['pan_reference_id'],
				'registered_name' => $formdata['pan_registered_name'],
				'type' => $formdata['pan_type'],
				'valid' => $formdata['pan_valid'],
				'user_id' => $user_id,
			];
			$this->db->insert('user_pan_details',$post_data);
		}
	}

	public function updatebankdetails(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

            $accountno = $formdata['accountno'];
            $ifsccode = $formdata['ifsccode'];
            $intrestedin = $formdata['intrestedin'];
            $id = $formdata['id'];

			$post_data = [
				'bank_ac_no' => $accountno,
				'ifsc_code' => $ifsccode,
				'intrest' => json_encode($intrestedin),
			];
            $this->db->where('investor_id', $id);
            $d = $this->db->update('users', $post_data);
			
			if($d) {
				$response = [
					'status' => '1',
					'message' => 'Bank details is updated successfully.'
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

	public function getbankdetails(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $id = $formdata['id'];
            $sql="
            	SELECT investor_id,kycstatus,bank_ac_no,ifsc_code,first_name,middle_name,last_name,mobile,user_profile_picture,membership_type,membership_start_date,membership_payment_status,membership_end_date,pan_kyc_status,bank_kyc_status,adhar_kyc_status,nationality,user_block_status FROM `users`
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

	public function get_kyc_details(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $id = $formdata['id'];
            $sql="
            	SELECT investor_id,panno,adharno,bank_ac_no,ifsc_code,adharFront,adharBack,adhar_otp,adhar_ref_id,pan_image,cheque_image FROM `users`
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
	// check for valid pan no 
	public function checkforpanno1(){ // NOT IN USE RIGHT NOW
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

            $pan_no = $formdata['pan_no'];
            $name = 'Test';

            $client_id= "CF175269CAMVC72ANLIQN48M1490";
            $client_secret= "bb09829d4c32a31a82350e6818401ca96f975800";
           
			$curl = curl_init();
	        curl_setopt_array($curl, [
		        CURLOPT_RETURNTRANSFER => 1,
		        CURLOPT_URL => "https://sandbox.cashfree.com/verification/pan",
		        CURLOPT_POST => 1,
		        CURLOPT_HTTPHEADER => [
		        	"x-client-id: $client_id",
		            "x-client-secret: $client_secret",
		            "x-api-version"=> "v1",
		            "Content-Type:application/json",
		            "Accept: */*",
		            "Accept-Encoding: gzip, deflate, br",
		            "Connection: keep-alive",
		            "User-Agent: PostmanRuntime/7.29.0",
		            "Cache-Control: no-cache",
		        ],
		        CURLOPT_POSTFIELDS => http_build_query([
		            'name' => $name,
			    	'pan' => $pan_no,
		        ])
	        ]);
	        $resp = curl_exec($curl);
	        curl_close($curl);
	        $response = json_decode($resp);
	        var_dump($response);
	        exit();
			
			// if($result) {
			// 	$response = [
			// 		'status' => '1',
			// 		'message' => 'Details are fetched successfully.',
			// 		'data' => $result,
			// 	];
			// } else {
			// 	$response =[
			// 		'status' => '0',
			// 		'message' => 'Please try again!'
			// 	];
			// }
			
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

	public function checkforpanno(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		// if(!empty($formdata)) {
		// }

		$clientId = 'CF175269CAMVC72ANLIQN48M1490';
		$clientSecret = 'bb09829d4c32a31a82350e6818401ca96f975800';
		$env = 'test';

		#config objs
		$baseUrls = array(
		    'prod' => 'https://payout-api.cashfree.com',
		    'test' => 'https://payout-gamma.cashfree.com',
		);
		$urls = array(
		    'auth' => '/payout/v1/authorize',
		    'bankValidation' => '/payout/v1/validation/bankDetails',
		);
		$bankDetails = array(
		    'name' => 'sameera',
		    'phone' => '9000000000',
		    'bankAccount' => '026291800001191',
		    'ifsc' => 'YESB0000262',
		);
		$header = array(
		    'X-Client-Id: '.$clientId,
		    'X-Client-Secret: '.$clientSecret, 
		    'Content-Type: application/json',
		);

		$baseurl = $baseUrls[$env];

		$token = $this->getToken($baseurl,$urls);
		$data = $this->verifyBankAccount($token);
		var_dump($data);

	}


	function create_header($token){
	    global $header;
	    $clientId = 'CF175269CAMVC72ANLIQN48M1490';
		$clientSecret = 'bb09829d4c32a31a82350e6818401ca96f975800';
	    $header = array(
		    'x-client-id: '.$clientId,
		    'x-client-secret: '.$clientSecret, 
		    'Content-Type: application/json',
		);
		$headers = $header;

	    if(!is_null($token)){
	        array_push($headers, 'Authorization: Bearer '.$token);
	    }
	    return $headers;
	}

	function post_helper($action, $data, $token,$baseurl,$urls){

	    // global $baseurl, $urls;

	    $finalUrl = $baseurl.$urls[$action];
	    $headers = $this->create_header($token);

	    $ch = curl_init();
	    curl_setopt($ch, CURLOPT_POST, 1);
	    curl_setopt($ch, CURLOPT_URL, $finalUrl);
	    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	    curl_setopt($ch,  CURLOPT_RETURNTRANSFER, true);
	    if(!is_null($data)) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); 
	    
	    $r = curl_exec($ch);
	    
	    if(curl_errno($ch)){
	        print('error in posting');
	        print(curl_error($ch));
	        // die();
	    }
	    curl_close($ch);
	    $rObj = json_decode($r, true);    
	    var_dump($rObj);
	    if($rObj['status'] != 'SUCCESS' || $rObj['subCode'] != '200') throw new Exception('incorrect response: '.$rObj['message']);
	    return $rObj;
	}

	function get_helper($finalUrl, $token){
	    $headers = $this->create_header($token);

	    $ch = curl_init();
	    curl_setopt($ch, CURLOPT_URL, $finalUrl);
	    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	    curl_setopt($ch,  CURLOPT_RETURNTRANSFER, true);
	    
	    $r = curl_exec($ch);
	    
	    if(curl_errno($ch)){
	        print('error in posting');
	        print(curl_error($ch));
	        die();
	    }
	    curl_close($ch);

	    $rObj = json_decode($r, true);    
	    if($rObj['status'] != 'SUCCESS' || $rObj['subCode'] != '200') throw new Exception('incorrect response: '.$rObj['message']);
	    return $rObj;
	}

	#get auth token
	function getToken($baseurl,$urls){
	    try{
	       $response = $this->post_helper('auth', null, null,$baseurl,$urls);
	       echo $response['data']['token'];
	    }
	    catch(Exception $ex){
	        error_log('error in getting token');
	        error_log($ex->getMessage());
	        die();
	    }

	}

	function verifyBankAccount($token){
	    try{
	        global $bankDetails, $baseurl, $urls;
	        $query_string = "?";

	        foreach($bankDetails as $key => $value){
	            $query_string = $query_string.$key.'='.$value.'&';
	        }

	        $finalUrl = $baseurl.$urls['bankValidation'].substr($query_string, 0, -1);
	        $response = $this->get_helper($finalUrl, $token);
	        // var_dump($response);
	        return json_encode($response);
	        // error_log(json_encode($response));
	    }
	    catch(Exception $ex){
	        error_log('error in verifying bank account');
	        error_log($ex->getMessage());
	        die();
	    }
	}

	public function upload_img() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		var_dump($_FILES);
	}
	// update kyc details 
	function update_kyc_details(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $investor_id = $formdata['investor_id'];
            if(!empty($investor_id)){
            	//  $res='';
            	/// pan no update
            	if(!empty($formdata['pan_no'])){
            		$pan_no = $formdata['pan_no'];
            		$data=[
	            		'panno'=>$pan_no,
	            		'pan_kyc_status'=>'success',
	            	];
	            	$this->db->where('investor_id',$investor_id);
	            	$res= $this->db->update('users',$data);	
            	}    
            	// adhar no update
            	if(!empty($formdata['adharno'])){
            		$data=[
	            		'adharno' =>$formdata['adharno'],
	            		'adhar_kyc_status'=>'success',
	            		'adhar_otp'=>$formdata['otp'],
	            	];
	            	$this->db->where('investor_id',$investor_id);
	            	$res= $this->db->update('users',$data);	
            	}          
            	
            	if(isset($res)){
            		$this->check_for_kyc_status($formdata);
            		if(!empty($formdata['pan_no'])){
	            		$this->update_pan_details($formdata);
	            	}
            		if(!empty($formdata['adharno'])){
	            		$this->update_adhar_details($formdata);
	            	}
	            	if(isset($formdata['adharno'])){
	            		$response = [
							'status' => '1',
							'message' => 'Adhar no is updated successfully.',
						];
	            	}else if(isset($formdata['pan_no'])){
            			$response = [
							'status' => '1',
							'message' => 'Pan no is updated successfully.',
						];
            		}					 
            	} else{
            		$response = [
						'status' => '0',
						'message' => 'Something went wrong. Please try again.',
					];
            	}
            } else{
            	$response = [
					'status' => '0',
					'message' => 'Please enter valid details.',
				];
            }
        } else{
        	$response = [
				'status' => '0',
				'message' => 'Something went wrong. Please try again.',
			];
        }
        $this->output->set_content_type('application/json')->set_output(json_encode($response));	
	}
	// update pan veriables
	public function update_pan_details($formdata){
		$user_id=$formdata['investor_id'];
		// pan details
		$sql="SELECT * FROM `user_pan_details` WHERE user_id='$user_id'";
		$query=$this->db->query($sql);
		$num_rows2=$query->num_rows();
		if(intval($num_rows2)>0){
			$post_data=[		
				'father_name' => $formdata['pan_father_name'] ? $formdata['pan_father_name'] :'',
				'name_match_score' => $formdata['pan_name_match_score'] ? $formdata['pan_name_match_score'] :'',
				'name_provided' => $formdata['pan_name_provided'] ? $formdata['pan_name_provided'] : '',
				'pan' => $formdata['pan'] ? $formdata['pan'] : '',
				'reference_id' => $formdata['pan_reference_id'] ? $formdata['pan_reference_id'] : '',
				'registered_name' => $formdata['pan_registered_name'] ? $formdata['pan_registered_name'] : '',
				'type' => $formdata['pan_type'] ? $formdata['pan_type'] : '',
				'valid' => $formdata['pan_valid'] ? $formdata['pan_valid'] : '',
			];
			$this->db->where('user_id',$user_id);
			$this->db->update('user_pan_details',$post_data);
		} else {
			$post_data=[
				'father_name' => $formdata['pan_father_name'],
				'name_match_score' => $formdata['pan_name_match_score'],
				'name_provided' => $formdata['pan_name_provided'],
				'pan' => $formdata['pan'],
				'reference_id' => $formdata['pan_reference_id'],
				'registered_name' => $formdata['pan_registered_name'],
				'type' => $formdata['pan_type'],
				'valid' => $formdata['pan_valid'],
				'user_id' => $user_id,
			];
			$this->db->insert('user_pan_details',$post_data);
		}
	}
	// update adhar veriables
	public function update_adhar_details($formdata){
		$user_id=$formdata['investor_id'];
		// adhar details
		$sql="SELECT * FROM `user_adhar_details` WHERE user_id='$user_id'";
		$query=$this->db->query($sql);
		$num_rows=$query->num_rows();
		if(intval($num_rows)>0){
			$post_data=[
				'user_id' => $user_id,
				'adhar_no' => $formdata['adharno'],
				'dob' => $formdata['dob'],
				'mobile_no' => $formdata['adhar_mobile_no'],
				'reference_id' => $formdata['adhar_reference_id'],
				'address' => $formdata['address'],
				'gender' => $formdata['adhar_gender'],
				'care_of' => $formdata['fathername'],
				'email' => $formdata['email'],
				'name' => $formdata['legalname'],
				'photolink' => $formdata['image_link'],
			];
			$this->db->where('user_id',$user_id);
			$this->db->update('user_adhar_details',$post_data);
		} else {
			$post_data=[
				'user_id' => $user_id,
				'adhar_no' => $formdata['adharno'],
				'dob' => $formdata['dob'],
				'mobile_no' => $formdata['adhar_mobile_no'],
				'reference_id' => $formdata['adhar_reference_id'],
				'address' => $formdata['address'],
				'gender' => $formdata['adhar_gender'],
				'care_of' => $formdata['fathername'],
				'email' => $formdata['email'],
				'name' => $formdata['legalname'],
				'photolink' => $formdata['image_link'],
			];
			$this->db->insert('user_adhar_details',$post_data);
		}
	}
	// check for kyc statis
	function check_for_kyc_status($formdata){
	 	$investor_id=$formdata['investor_id'];
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
	 // submit form 
	 function submit_non_resident_form(){
	 	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($_POST)) {
            $investor_id = $_POST['investor_id'];
            $legal_name = $_POST['legal_name'];
            $bank_account_no = $_POST['bank_account_no'];
            $bank_account_swift = $_POST['bank_account_swift'];
            $legal_address = $_POST['legal_address'];
            $verify_kyc = $_POST['verify_kyc'];
            $resident_country = $_POST['resident_country'];
            $remark = $_POST['remark'];
            $tax_id = $_POST['tax_id'];
            $national_id = $_POST['national_id'];
            $passport = $_POST['passport'];

           	$sql="SELECT * FROM `non_resident_investors` WHERE investor_id='$investor_id'";
			$query=$this->db->query($sql);
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
				$post_data=[
					'legal_name'=>$legal_name,
					'bank_account_no'=>$bank_account_no,
					'bank_account_swift'=>$bank_account_swift,
					'legal_address'=>$legal_address,
					'verify_kyc'=>$verify_kyc,
					'resident_country'=>$resident_country,
					'remark'=>$remark,
					'tax_id'=>$tax_id,
					'national_id'=>$national_id,
					'passport'=>$passport,
					'created_date'=>date('Y-m-d')
				];
				$this->db->where('investor_id',$investor_id);
				$res=$this->db->update('non_resident_investors',$post_data);
				if(!empty($res)){
					// updating kyc status of investor
					$this->db->where('investor_id',$investor_id);
					$kyc_data=[
						'kycstatus'=>'system_approved',
						'adhar_kyc_status'=>'success',
						'bank_kyc_status'=>'success',
						'pan_kyc_status'=>'success',
						'address'=>$legal_address,
						'legal_name'=>$legal_name,
					];
					$res=$this->db->update('users',$kyc_data);
					$this->upload_form_data($_FILES,$investor_id);
					$response = [
						'status' => '1',
						'message' => 'Form is saved successfully.',
					];
				} else{
					$response = [
						'status' => '0',
						'message' => 'Something went wrong. Please try again.',
					];
				}
			} else{
				$post_data=[
					'investor_id'=>$investor_id,
					'legal_name'=>$legal_name,
					'bank_account_no'=>$bank_account_no,
					'bank_account_swift'=>$bank_account_swift,
					'legal_address'=>$legal_address,
					'verify_kyc'=>$verify_kyc,
					'resident_country'=>$resident_country,
					'remark'=>$remark,
					'tax_id'=>$tax_id,
					'national_id'=>$national_id,
					'passport'=>$passport,
					'created_date'=>date('Y-m-d')
				];
				$this->db->insert('non_resident_investors',$post_data);
				$id=$this->db->insert_id();
				if(!empty($id)){
					$this->upload_form_data($_FILES,$investor_id);
					$response = [
						'status' => '1',
						'message' => 'Form is saved successfully.',
					];
				} else{
					$response = [
						'status' => '0',
						'message' => 'Something went wrong. Please try again.',
					];
				}
			}
       	} else{
        	$response = [
				'status' => '0',
				'message' => 'Something went wrong. Please try again.',
			];
        }
        $this->output->set_content_type('application/json')->set_output(json_encode($response));	
	 }
	 // upload form data
	 function upload_form_data($files,$investor_id){
	 	// tax file
	 	if(isset($files['tax_id_file']['name']) && $files['tax_id_file']['name'] != "" ) {
			$dir =  FRONTEND_PATH."api/uploads/non_resident/tax_id/".$investor_id.'/';
			if(!is_dir($dir)) {
				@mkdir($dir, 0777,true);
			}
			$image = $files['tax_id_file']['tmp_name'];
			$hash = $files['tax_id_file']['name'];
			if(move_uploaded_file($image, $dir.$hash)) {
				 $image_details = array(
					"tax_id_file" => $hash
				);
				$this->db->where('investor_id',$investor_id);
				$this->db->update('non_resident_investors', $image_details);
			}
		}

		// national file
	 	if(isset($files['national_id_file']['name']) && $files['national_id_file']['name'] != "" ) {
			$dir =  FRONTEND_PATH."api/uploads/non_resident/national_id/".$investor_id.'/';
			if(!is_dir($dir)) {
				@mkdir($dir, 0777,true);
			}
			$image = $files['national_id_file']['tmp_name'];
			$hash = $files['national_id_file']['name'];
			if(move_uploaded_file($image, $dir.$hash)) {
				 $image_details = array(
					"national_id_file" => $hash
				);
				$this->db->where('investor_id',$investor_id);
				$this->db->update('non_resident_investors', $image_details);
			}
		}
		// passport file
	 	if(isset($files['passport_file']['name']) && $files['passport_file']['name'] != "" ) {
			$dir =  FRONTEND_PATH."api/uploads/non_resident/passport/".$investor_id.'/';
			if(!is_dir($dir)) {
				@mkdir($dir, 0777,true);
			}
			$image = $files['passport_file']['tmp_name'];
			$hash = $files['passport_file']['name'];
			if(move_uploaded_file($image, $dir.$hash)) {
				 $image_details = array(
					"passport_file" => $hash
				);
				$this->db->where('investor_id',$investor_id);
				$this->db->update('non_resident_investors', $image_details);
			}
		}
		// passport file
	 	if(isset($files['bank_statement_file']['name']) && $files['bank_statement_file']['name'] != "" ) {
			$dir =  FRONTEND_PATH."api/uploads/non_resident/bank_statement/".$investor_id.'/';
			if(!is_dir($dir)) {
				@mkdir($dir, 0777,true);
			}
			$image = $files['bank_statement_file']['tmp_name'];
			$hash = $files['bank_statement_file']['name'];
			if(move_uploaded_file($image, $dir.$hash)) {
				 $image_details = array(
					"bank_statement_file" => $hash
				);
				$this->db->where('investor_id',$investor_id);
				$this->db->update('non_resident_investors', $image_details);
			}
		}

	 }
	 // get non resident form detail
	 function get_non_resident_form_details(){
	 	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
        $formdata = json_decode(file_get_contents('php://input'), true);
        if(!empty($formdata)){
	        $investor_id=$formdata['investor_id'];
	        $sql = "SELECT * FROM `non_resident_investors` WHERE investor_id='$investor_id'"; 
			$query = $this->db->query($sql);
			$list = $query->result();

			if (isset($list)) {
				$response = [
					'status' => '1',
					'message' => 'List is fetched successfully.',
					'data' => $list,
				];
			} else{
				$response = [
					'status' => '0',
					'message' => 'Data is not available.'
				];
			}
        } else{
            $response=[
                'status'=>'0',
                'message'=>'Something went wrong. Please try again.'
            ];
        }
		$this->output->set_content_type('application/json')->set_output(json_encode($response));
	 }
}
