<?php
/*
Below is an integration flow on how to use Cashfree's bank validation.
Please go through the payout docs here: https://dev.cashfree.com/payouts
The following script contains the following functionalities :
    1.getToken() -> to get auth token to be used in all following calls.
    2.verifyBankAccount() -> to verify bank account.
All the data used by the script can be found in the config.ini file. This includes the clientId, clientSecret, bankDetails section.
You can change keep changing the values in the config file and running the script.
Please enter your clientId and clientSecret, along with the appropriate enviornment and bank details
*/

error_reporting(E_ALL);
ini_set('display_errors', 1);
echo 'PHP version: ' . phpversion();
// echo '<pre>';

echo '<h1>oksdsd</h1>';

#default parameters
$clientId = 'CF177190CAM31SAANLIQN48M13V0';
$clientSecret = '0591dfc41133c03e3d82f82ae3234a9ab5d6c50b';
	//production
    $prod_clientId="CF240429CC86AJ6Q7GBOSABHJ6N0";
    $prod_clientSecret="6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0";
$env = 'prod';

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

function post_helper($action, $data, $token){
    global $baseurl, $urls;
    $finalUrl = $baseurl.$urls[$action];
    $headers = create_header($token);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_URL, $finalUrl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch,  CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    if(!is_null($data)) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); 
    
    $r = curl_exec($ch);

    var_dump($ch);
    
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

#get auth token
function getToken(){
    try{
       $response = post_helper('auth', null, null);
       return $response['data']['token'];
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

/*
The flow executed below is:
1. fetching the auth token
2. verifying bank account
*/

#main execution
$token = getToken();
var_dump($token);
$data = verifyBankAccount($token);
echo 'Response: '.$data;
$bank_response = json_decode($data);
if($bank_response->status) {
    echo '<br>Bank account verified successfully';
} else {
    echo '<br>Bank account verification failed';
}
// var_dump($token);

?>