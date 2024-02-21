<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kyc extends CI_Controller {

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
                'kycstatus' => 'Approved',
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
            	SELECT investor_id,kycstatus,bank_ac_no,ifsc_code,first_name,middle_name,last_name,mobile,user_profile_picture,membership_type,membership_start_date,membership_payment_status,membership_end_date FROM `users`
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

	function uploadadhar() {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$formdata = json_decode(file_get_contents('php://input'), true);

		error_reporting(E_ALL);
		ini_set('display_errors', 1);

		// var_dump($formdata);
		// var_dump($_FILES);
		// exit();
		
	    $folder =  FRONTEND_PATH."api/uploads/adhar-front/";
	    $tempname = $_FILES["images"]["tmp_name"];
	    $name = $_FILES["images"]["name"];
	    if(isset($_FILES["images"]["name"]) && !empty($_FILES["images"]["name"])) {

	    	$file = $_FILES['images']['tmp_name']; 
	        $fileNewName = time().date('d-m-Y').'-document'.rand(10,100);
	        $folderPath =  FRONTEND_PATH."api/uploads/adhar-front/";
	        $ext = pathinfo($_FILES['images']['name'], PATHINFO_EXTENSION);
        	move_uploaded_file($file, $folderPath. $fileNewName. ".". $ext);
        	
        	$id = $_GET['investor_id'];
        	$filename = $fileNewName. ".". $ext;
        	$data=[
        		'adharFront' => $filename,
        	];
        	$this->db->where('investor_id',$id);
        	$this->db->update('users',$data);

        	$html = "
        		<div className='d-block adharimg-block'>
	        		<img src='https://betag91.growth91.com/api/uploads/adhar-front/".$filename."'
	        		 />
        		</div>
        	";
        	$response =[
				'status' => '1',
				'htmldata' => $html,
				'id' => $id,
			];
			$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));	
    	}

	}


	function uploadadharback() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
	    $folder =  FRONTEND_PATH."api/uploads/adhar-back/";
	    $tempname = $_FILES["images"]["tmp_name"];
	    $name = $_FILES["images"]["name"];
	    if(isset($_FILES["images"]["name"]) && !empty($_FILES["images"]["name"])) {

	    	$file = $_FILES['images']['tmp_name']; 
	        $fileNewName = time().date('d-m-Y').'-document'.rand(10,100);
	        $folderPath =  FRONTEND_PATH."api/uploads/adhar-back/";
	        $ext = pathinfo($_FILES['images']['name'], PATHINFO_EXTENSION);
        	move_uploaded_file($file, $folderPath. $fileNewName. ".". $ext);
        	
        	$id = $_GET['investor_id'];
        	$filename = $fileNewName. ".". $ext;
        	$data=[
        		'adharBack' => $filename,
        	];
        	$this->db->where('investor_id',$id);
        	$this->db->update('users',$data);

        	$html = "
        		<div className='d-block adharimg-block'>
	        		<img src='https://betag91.growth91.com/api/uploads/adhar-back/".$filename."'
	        		 />
        		</div>
        	";
        	$response =[
				'status' => '1',
				'htmldata' => $html,
				'id' => $id,
			];
			$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));	
    	}

	}

	// check for valid pan no
	public function checkforpanno1(){
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


}