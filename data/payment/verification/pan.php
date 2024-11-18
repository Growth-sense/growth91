<?php  

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$formdata = json_decode(file_get_contents('php://input'), true);
	$pan = $formdata['pan_no'];
	
	$clientId = 'CF177190CAM31SAANLIQN48M13V0';
	$clientSecret = '0591dfc41133c03e3d82f82ae3234a9ab5d6c50b';
	//production
	$prod_clientId="CF240429CC86AJ6Q7GBOSABHJ6N0";
	$prod_clientSecret="6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0";

	$post = [
	//    "name"=>"ROCHAK JAITLY",
       "pan"=>$pan
	];

	$d = httpPost('https://api.cashfree.com/verification/pan', $post);
	// var_dump($d);
	echo $d;
	function httpPost($url, $data)
	{
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

?>