<?php  
	include './database.php';

	// get cashfree setting details
	$query = "SELECT * FROM `cashfree_details` WHERE id='1'";
	$result = mysqli_query($con, $query);
	$response =mysqli_fetch_array($result);

	$environment=$response['env'];
	$BASE_URL='';
	$APP_ID='';
	$APP_SECRET_KEY='';
	$PAYMENT_URL='';
	if($environment=='prod'){
		$BASE_URL=$response['production_base_url'];
		$APP_ID=$response['prod_app_id'];
		$APP_SECRET_KEY=$response['prod_app_secret'];
		$PAYMENT_URL=$response['prod_payment_url'];
	} else {
		$BASE_URL=$response['test_base_url'];
		$APP_ID=$response['test_app_id'];
		$APP_SECRET_KEY=$response['test_app_secret'];
		$PAYMENT_URL=$response['test_payment_url'];
	}
	define('BASE_URL', $BASE_URL);
	define('APP_ID', $APP_ID);
	define('APP_SECRET_KEY', $APP_SECRET_KEY);
	define('PAYMENT_URL', $PAYMENT_URL);
	define('CASHFREE_ENV', $environment);
?>