<?php  
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$formdata = json_decode(file_get_contents('php://input'), true);
	$accountno = $formdata['accountno'];
	$ifsccode = $formdata['ifsccode'];

	// error_reporting(E_ALL);
	// ini_set('display_errors', 1);

	// get token
	$post = [];
	// $d = httpPost('https://payout-gamma.cashfree.com/payout/v1/authorize', $post);
	$d = httpPost('https://payout-api.cashfree.com/payout/v1/authorize', $post);
	// echo $d;
	$token_response = json_decode($d);
	$token = $token_response->data->token;

	$bankDetails = [
	    'name' => 'sameera',
	    'phone' => '9000000000',
	    'bankAccount' => $accountno,
	    'ifsc' => $ifsccode,
	];
	$url2 = 'https://payout-gamma.cashfree.com/payout/v1/validation/bankDetails';
	

	// get token
	function httpPost($url, $data)
	{
		//test
		$clientId = 'CF177190CAM31SAANLIQN48M13V0';
		$clientSecret = '0591dfc41133c03e3d82f82ae3234a9ab5d6c50b';
		//production
		$prod_clientId="CF240429CC86AJ6Q7GBOSABHJ6N0";
		$prod_clientSecret="6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0";
		$headers = array(
		    'X-Client-Id: '.$prod_clientId,
		    'X-Client-Secret: '.$prod_clientSecret, 
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
	//test
	$clientId = 'CF175269CAMVC72ANLIQN48M1490';
	$clientSecret = 'bb09829d4c32a31a82350e6818401ca96f975800';
		//production
	$prod_clientId="CF240429CC86AJ6Q7GBOSABHJ6N0";
	$prod_clientSecret="6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0";
	$env='prod';
	$baseurl = $baseUrls[$env];
	$urls = array(
		'auth' => '/payout/v1/authorize',
		'bankValidation' => '/payout/v1/validation/bankDetails',
	);
	$header = array(
		'X-Client-Id: '.$prod_clientId,
		'X-Client-Secret: '.$prod_clientSecret, 
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



	$data = verifyBankAccount($token);
	// var_dump($data);
	// echo json_decode($data);
	echo $data;

?>