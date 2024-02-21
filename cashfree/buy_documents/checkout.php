<?php
include('../db/database.php');
include('../db/config.php');

$orderId = $_GET["order_id"];

session_start();
$investor_id = strval($_GET['user_id']);
$deal_id = strval($_GET['deal_id']);
$docs = strval($_GET['docs']);
$orderAmount = strval($_GET["amount"]);

$orderId . "|" . $orderAmount;
$host = constant('BASE_URL')."cashfree/buy_documents/";
$notifyUrl = $host. "notify.php";
$returnUrl = $host."return.php";

$orderDetails = array();
$orderDetails["notifyUrl"] = $notifyUrl;
$orderDetails["returnUrl"] = $returnUrl;

$order_id_cr = strval(time()."_".$investor_id."_".$deal_id."_".$docs);

$query = "SELECT * FROM users where investor_id='$investor_id'";
$result = mysqli_query($con, $query);
$response=mysqli_fetch_array($result);

$name=$response['first_name'].' '.$response['last_name']; 
 
$order = getOrderDetails($order_id_cr,$orderAmount,$investor_id,$deal_id);

$orderDetails["customerName"] = $name;
$orderDetails["customerEmail"] = $response["email"];
$orderDetails["customerPhone"] = $response["mobile"];
$orderDetails["customer_id"] = $response["investor_id"];

$orderDetails["orderId"] = $order["orderId"];
$orderDetails["orderAmount"] = $order["orderAmount"];
$orderDetails["orderNote"] = $order["orderNote"];
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
    "return_url" => $orderDetails["returnUrl"]."?order_id={order_id}"
  ]
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

function getUserDetails($orderId,$inid) {
    return array(
      "customerName" => "sushil",
      "customerEmail" => "sushil@cashfree.com",
      "customerPhone" => "812341231",
      "customer_id" => $inid,
    );
}

function getOrderDetails($orderId,$amount,$investor_id,$deal_id) {
  $object = new stdClass();
  $object->vendor_id = "autorobot";
  $object->percentage= 100;
  $object->amount= $amount;
  $myArray = array($object);
  return array(
    "orderId" => $orderId,
    "orderAmount" => $amount,
    "orderNote" => "Paid Document",
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
