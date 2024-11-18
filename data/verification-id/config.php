<?php  
	include('../cashfree/db/database.php');
	// VERIFICATION CODE
	// ACCOUNT OF growth91web@gmail.com
	$query = "SELECT * FROM `cashfree_details` where `id`='1'";
	$result = mysqli_query($con, $query3);
	$response =mysqli_fetch_array($result3);

	$environment=$response['env'];
	$CLIENT_ID='';
	$CLIENT_SECRET='';
	$PAN_URL='';
	$ADHAR_URL='';
	$BANK_URL='';
	$BANK_URL_TYPE='';
	if($environment=='prod'){
		$CLIENT_ID=$response['prod_client_id'];
		$CLIENT_SECRET=$response['prod_client_secret'];
		$PAN_URL=$response['prod_pan_url'];
		$ADHAR_URL=$response['prod_adhar_url'];
		$BANK_URL=$response['prod_bank_url'];
		$BANK_URL_TYPE=$environment;
	} else {
		$CLIENT_ID=$response['test_client_id'];
		$CLIENT_SECRET=$response['test_client_secret'];
		$PAN_URL=$response['test_pan_url'];
		$ADHAR_URL=$response['test_adhar_url'];
		$BANK_URL=$response['test_bank_url'];
		$BANK_URL_TYPE=$environment;
	}

	$TEST_CLIENT_ID = 'CF175269CD0EF8584OK74C7OSI10'; 
	$TEST_CLIENT_SECRET = '9bf6a258d33b99ac5d9e336bffa252f4a4d6b733'; 
	//production credential
	$PROD_CLIENT_ID="CF240429CC86AJ6Q7GBOSABHJ6N0";
	$PROD_CLIENT_SECRET="6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0";

	// PAN URL
	$TEST_PAN_URL='https://sandbox.cashfree.com/verification/pan';
	$PROD_PAN_URL='https://api.cashfree.com/verification/pan';
	// ADHAR URL
	$TEST_ADHAR_URL='https://sandbox.cashfree.com/verification/aadhaar';
	$PROD_ADHAR_URL='https://api.cashfree.com/verification/aadhaar';
	// // BANK URL
	$TEST_BANK_URL='https://payout-gamma.cashfree.com/payout/v1/authorize';
	$PROD_BANK_URL='https://payout-api.cashfree.com/payout/v1/authorize';

	// test 
	$TEST_BANK_CLIENT_ID='CF175269CCVH3CD84OK74C7OSHR0';
	$TEST_BANK_CLIENT_SECRET_ID='5eca9a9fc75d49a1615d362a61cd8b091d4aa6ff'; // ACCOUNT OF growth91web@gmail.com
	$TEST_URL_TYPE='test';
	$PROD_URL_TYPE='prod';

	define('CLIENT_ID', $TEST_CLIENT_ID);
	define('CLIENT_SECRET', $TEST_CLIENT_SECRET);

	define('PAN_URL', $TEST_PAN_URL);
	define('ADHAR_URL', $TEST_ADHAR_URL);
	define('BANK_URL', $TEST_BANK_URL);
	define('BANK_URL_TYPE', $TEST_URL_TYPE);

	// define('BANK_CLIENT_ID', $TEST_BANK_CLIENT_ID);
	// define('BANK_CLIENT_SECRET_ID', $TEST_BANK_CLIENT_SECRET_ID);

?>