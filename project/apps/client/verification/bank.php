<?php  
	include('./config.php');
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$formdata = json_decode(file_get_contents('php://input'), true);
	$accountno = $formdata['accountno'];
	$ifsccode = $formdata['ifsccode'];
	$mobile = $formdata['mobile'];
	$name = $formdata['name'];

	// get token
	$post = [];
	$d = httpPost(constant('BANK_URL'), $post);
	// echo $d;
	$token_response = json_decode($d);
	$token = $token_response->data->token;

	$bankDetails = [	
	    'name' => 'sushil',
	    'phone' => $mobile,
	    'bankAccount' => $accountno,
	    'ifsc' => $ifsccode,
	];
	// $url2 = 'https://payout-gamma.cashfree.com/payout/v1/validation/bankDetails';
	// get token
	function httpPost($url, $data)
	{
		$headers = array(
		    'X-Client-Id: '.constant('CLIENT_ID'),
		    'X-Client-Secret: '.constant('CLIENT_SECRET'), 
		    'Content-Type: application/json',
		);
	   	$curl = curl_init($url);
	    curl_setopt($curl, CURLOPT_POST, true);
	    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	    $response = curl_exec($curl);
	    curl_close($curl);
	    return $response;
	}

	$baseUrls = array(
		'prod' => 'https://payout-api.cashfree.com',
		'test' => 'https://payout-gamma.cashfree.com',
	);

	$env=constant('BANK_URL_TYPE');
	$baseurl = $baseUrls[$env];
	$urls = array(
		'auth' => '/payout/v1/authorize',
		'bankValidation' => '/payout/v1/validation/bankDetails',
	);
	$header = array(
		'X-Client-Id: '.constant('CLIENT_ID'),
		'X-Client-Secret: '.constant('CLIENT_SECRET'), 
		'Content-Type: application/json',
	);

	function create_header($token){
		global $header;
		$headers = $header;
		if(!is_null($token)){
			array_push($headers, 'Authorization: Bearer '.$token);
		}
		return $headers;
	}	
	function get_helper($finalUrl, $token){
		$headers = create_header($token);
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
	
	
	function verifyBankAccount($token){
		try{
			global $bankDetails, $baseurl, $urls;
			$query_string = "?";
	
			foreach($bankDetails as $key => $value){
				$query_string = $query_string.$key.'='.$value.'&';
			}
	
			$finalUrl = $baseurl.$urls['bankValidation'].substr($query_string, 0, -1);
			$response = get_helper($finalUrl, $token);
			return json_encode($response);
			// error_log(json_encode($response));
		}
		catch(Exception $ex){
			error_log('error in verifying bank account');
			error_log($ex->getMessage());
			die();
		}
	}	



	$data = verifyBankAccount($token);
	// var_dump($data);
	// echo json_decode($data);
	echo $data;
?>