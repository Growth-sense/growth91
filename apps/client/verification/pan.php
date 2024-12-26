<?php  
	include('./config.php');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$formdata = json_decode(file_get_contents('php://input'), true);
	$pan = $formdata['pan_no'];
	
	$post = [
	//    "name"=>"ROCHAK JAITLY",
       "pan"=>$pan
	];
	$d = httpPost(constant('PAN_URL'), $post);
	// var_dump($d);
	echo $d;
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

?>