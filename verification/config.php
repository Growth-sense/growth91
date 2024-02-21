<?php  
	include('../cashfree/db/database.php');
	// VERIFICATION CODE
	// ACCOUNT OF growth91web@gmail.com
	$query = "SELECT * FROM `cashfree_details` where `id`='1'";
	$result = mysqli_query($con, $query);
	$response =mysqli_fetch_array($result);


	$environment=$response['env'];
	$CLIENT_ID='';
	$CLIENT_SECRET='';
	$PAN_URL='';
	$ADHAR_URL='';
	$BANK_URL='';
	$URL_TYPE='';
	if($environment=='prod'){
		$CLIENT_ID=$response['prod_client_id'];
		$CLIENT_SECRET=$response['prod_client_secret'];
		$PAN_URL=$response['prod_pan_url'];
		$ADHAR_URL=$response['prod_adhar_url'];
		$BANK_URL=$response['prod_bank_url'];
		$URL_TYPE=$environment;
		$BASE_URL=$response['production_base_url'];
	} else {
		$CLIENT_ID=$response['test_client_id'];
		$CLIENT_SECRET=$response['test_client_secret'];
		$PAN_URL=$response['test_pan_url'];
		$ADHAR_URL=$response['test_adhar_url'];
		$BANK_URL=$response['test_bank_url'];
		$URL_TYPE=$environment;
		$BASE_URL=$response['test_base_url'];
	}

	define('CLIENT_ID', $CLIENT_ID);
	define('CLIENT_SECRET', $CLIENT_SECRET);

	define('PAN_URL', $PAN_URL);
	define('ADHAR_URL', $ADHAR_URL);
	define('BANK_URL', $BANK_URL);
	define('BANK_URL_TYPE', $URL_TYPE);
	define('BASE_URL', $BASE_URL);

	// define('BANK_CLIENT_ID', $TEST_BANK_CLIENT_ID);
	// define('BANK_CLIENT_SECRET_ID', $TEST_BANK_CLIENT_SECRET_ID);
?>