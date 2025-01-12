<?php
include('./db/database.php');
include('./db/config.php');


$orderId = $_GET["order_id"];
$orderAmount = strval($_GET["Investment_amt"]);

session_start();

$investor_id = strval($_GET['investor_id']);
$deal_id = strval($_GET['deal_id']);
$deductstatus = strval($_GET['deductstatus']);
$agreestatus = strval($_GET['agreestatus']);
$payment_ref = $_GET['payment_ref'];
$tdsstatus = $_GET['tdsstatus'];
$processingfees = strval($_GET['processingfees']);
$gst = strval($_GET['gst']);
$legalfees = strval($_GET['legalfees']);
$Investment_amt = $_GET['Investment_amt'];
$wallet = $_GET['wallet'];
$commitment_id = $_GET['commitment_id'];

$query = "SELECT * FROM users where investor_id='$investor_id'";
$result = mysqli_query($con, $query);
$response=mysqli_fetch_array($result);
// echo '<pre>';
$isinvested=$response['isinvested'];
$referred_by=$response['referred_by'];
$name=$response['first_name'].' '.$response['last_name'];
$email=$response['email'];
$mobile=$response['mobile'];

$registration_date= !empty($response['registration_date']) ? date('Y-m-d', strtotime($response['registration_date'])) : '';
$current_date=date('Y-m-d');
$six_month_date = date('Y-m-d', strtotime("+6 months", strtotime($registration_date)));
$invest_status=0;

$person_from='';
$person_id='';
if($isinvested=='0' && ($current_date>=$registration_date || $current_date<=$six_month_date)){

  $query2 = "SELECT * FROM users where referral_code='$referred_by'";
  $result2 = mysqli_query($con, $query2);
  $response2=mysqli_fetch_array($result2);
  $num_rows=mysqli_num_rows($result2); 

  $query3 = "SELECT * FROM `institutional_referral_master` where `referral_code`='$referred_by'";
  $result3 = mysqli_query($con, $query3);
  $response3 =mysqli_fetch_array($result3);
  $num_rows2=mysqli_num_rows($result3); 
  // var_dump($response3);

  if(intval($num_rows)>0){
    $person_from='0';
    $person_id=$response2['investor_id'];
  }else if(intval($num_rows2)>0){
    $person_from='1';
    $person_id=$response3['referral_id'];
  }
  $invest_status=1;
}

$data = [
  'investor_id' => $investor_id,
  'deal_id' => $deal_id,
  'deductstatus' => $deductstatus,
  'agreestatus' => $agreestatus,
  'payment_ref' => $payment_ref,
  'tdsstatus' => $tdsstatus,
  'processingfees' => $processingfees,
  'gst' => $gst,
  'legalfees' => $legalfees,
  'Investment_amt' => $Investment_amt,
];

$_SESSION['invest_data'] = $data;
$orderId . "|" . $orderAmount;
$host = constant('BASE_URL')."cashfree/";
// $notifyUrl = constant('BASE_URL').'api/Webhook/vendor_split';
$returnUrl = $host."return.php?processingfees=".$processingfees.'&gst='.$gst;

$orderDetails = array();//$notifyUrl
$orderDetails["notifyUrl"] = constant('BASE_URL').'api/Webhook/vendor_split';
$orderDetails["returnUrl"] = $returnUrl;

$order_id_cr = strval(time()."_".$investor_id."_".$deal_id."_".$legalfees."_".$wallet."_".
$person_from."_".$person_id."_".$invest_status."_".$commitment_id);

$userDetails = getUserDetails($orderId,$investor_id,$name,$email,$mobile);

$order = getOrderDetails($order_id_cr,$orderAmount,$investor_id,$deal_id,$con);
//deal_name 
$Query1 = "SELECT * FROM `deals` where `deal_id`='$deal_id'";
$result1=mysqli_query($con,$Query1);
$result1A= mysqli_fetch_array($result1);
$orderDetails["customerName"] = $userDetails["customerName"];
$orderDetails["customerEmail"] = $userDetails["customerEmail"];
$orderDetails["customerPhone"] = $userDetails["customerPhone"];
$orderDetails["customer_id"] = $userDetails["customer_id"];

$orderDetails["orderId"] = $order["orderId"];
$orderDetails["orderAmount"] = $order["orderAmount"];
$orderDetails["orderNote"] =  $result1A["deal_name"]."_".$investor_id;
$orderDetails["orderCurrency"] = $order["orderCurrency"];
$orderDetails["order_tags"] = $order["order_tags"];

$orderDetails["appId"] = constant('APP_ID');
$orderDetails["signature"] = generateSignature($orderDetails,constant('APP_SECRET_KEY'));

function generateSignature($postData,$secret){
  $secretKey = $secret;
 ksort($postData);
 $signatureData = "";
 foreach ($postData as $key => $value){
      $signatureData .= $key.$value;
 }
 $signature = hash_hmac('sha256', $signatureData, $secretKey,true);
 $signature = base64_encode($signature);
 return $signature;
}

// INSERT TRANSACTIONS
$Invested_dt = date('Y-m-d');
$amount=intval($orderAmount)-(intval($processingfees)-intval($wallet));
$sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,processing_fees,total_paid_amount,wallet)
    VALUES ('$investor_id','$deal_id','$Invested_dt','$amount','User invested in deal','".$order['orderId']."',
    '0','PENDING','$processingfees','$orderAmount','$wallet')"; 
if ($con->query($sql2) === TRUE) {
  $transaction_id = $con->insert_id;
  // Insert 
  $payment_date=date('Y-m-d');
  // $sql="INSERT INTO investments (investor_id, deal_id, Investment_amt, deductstatus, agreestatus, Invested_dt,payment_ref,tdsstatus,processingfees,gst,legalfees,payment_status,payment_status_date,vendor_split_status,transaction_id) VALUES ('$investor_id','$deal_id','$amount','$deductstatus','$agreestatus','$Invested_dt','$order_id_cr','PENDING', '$processingfees','$gst','$legalfees','PENDING','$payment_date','pending','$transaction_id')"; 
  // if ($con->query($sql) === TRUE) {
  //   $last_id = $con->insert_id;
  // }
}

$PAYMENT_URL = constant('PAYMENT_URL');
$APP_SECRET_KEY = constant('APP_SECRET_KEY');

$curl_data = [
  "order_id" => $orderDetails["orderId"],
  "order_amount" => $orderDetails["orderAmount"],
  "order_currency" => $orderDetails["orderCurrency"],
  "order_note" => $orderDetails["orderNote"],
  "customer_details" => [
   "customer_id" => $orderDetails["customer_id"],
    "customer_name" => $orderDetails["customerName"],
    "customer_email" => $orderDetails["customerEmail"],
    "customer_phone" => $orderDetails["customerPhone"]
  ],
  "order_meta" => [
    "notify_url" => $orderDetails["notifyUrl"],
    "return_url" => $orderDetails["returnUrl"]."&order_id={order_id}"
  ],
  //"order_splits" => $order["order_splits"]
];
 

$header = [
  "Content-Type: application/json",
  "x-api-version: 2022-09-01",
  "x-client-id: {$orderDetails['appId']}",
  "x-client-secret: {$APP_SECRET_KEY}"
];


$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $PAYMENT_URL,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode($curl_data),
  CURLOPT_HTTPHEADER => $header,
));

$curl_response = curl_exec($curl);

curl_close($curl);

$curl_decode = json_decode($curl_response,true);

?>
<body></body>
<?php

if(constant("CASHFREE_ENV") == "prod")
{
  ?>
  <script src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js"></script>
  <?php
}
else
{
  ?> 
  <script src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"></script>
  <?php
} 

function getUserDetails($orderId,$inid,$name,$email,$mobile) {
    return array(
      "customerName" => $name,
      "customerEmail" => $email,
      "customerPhone" => $mobile,
      "customer_id" => $inid,
    );
}

function getOrderDetails($orderId,$amount,$investor_id,$deal_id,$con) {
  // get vendor id
  $query="SELECT * FROM `deals` where `deal_id`='$deal_id'";
  $result=mysqli_query($con,$query);
  $response=mysqli_fetch_array($result);
  $vendor_id=$response['vendor_id'];
  $deal_name=$response['deal_name'];
  $order_note =  $deal_name."_".$investor_id;

  $object=new stdClass();
  $object->vendor_id=$vendor_id;
  $object->percentage= 100;
  $object->amount= $amount;
  $myArray = array($object);
  return array(
    "orderId" => $orderId,
    "orderAmount" => $amount,
    "orderNote" => $order_note,
    "orderCurrency" => "INR",
    "order_splits"=> $myArray,
  );
}

if($curl_decode["payment_session_id"])
{
  ?>
    <script> 
      const paymentSessionId = "<?php echo $curl_decode['payment_session_id'] ?>"; 
      const cf = new Cashfree(paymentSessionId); 
      cf.redirect(); 
    </script> 
  <?php
}
 ?>
