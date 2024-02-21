<?php
include('../db/config.php');
$orderId=$_GET["order_id"];
$orderAmount=$_GET['amount'];
$membership_fees=$_GET['membership_fees'];
$registered_amt=$_GET['registered_amt'];

session_start();
echo "<pre>";

$user_id = strval($_GET['user_id']);
$amount=$_GET['amount'];
$query = "SELECT * FROM users where investor_id='$investor_id'";
$result = mysqli_query($con, $query);
$response=mysqli_fetch_array($result);

$name=$response['first_name'].' '.$response['last_name'];
$email=$response['email'];
$mobile=$response['mobile'];
$data = [
  'user_id' => $user_id,
  'amount' => $amount,
];
$_SESSION['register_data'] = $data;

$orderId . "|" . $orderAmount;
$host = constant('BASE_URL')."cashfree/investormembership/";
$notifyUrl = $host. "notify.php";
$returnUrl = $host."return.php";

$orderDetails = array();
$orderDetails["notifyUrl"] = $notifyUrl;
$orderDetails["returnUrl"] = $returnUrl;

$order_id_cr = strval(time()."_".$user_id."_".$membership_fees."_".$registered_amt);

$userDetails = getUserDetails($orderId,$investor_id,$name,$email,$mobile);
$order = getOrderDetails($order_id_cr,$orderAmount,$user_id);

$orderDetails["customerName"] = $userDetails["customerName"];
$orderDetails["customerEmail"] = $userDetails["customerEmail"];
$orderDetails["customerPhone"] = $userDetails["customerPhone"];
$orderDetails["customer_id"] = $userDetails["customer_id"];

$orderDetails["orderId"] = $order["orderId"];
$orderDetails["orderAmount"] = $order["orderAmount"];
$orderDetails["orderNote"] = $order["orderNote"];
$orderDetails["orderCurrency"] = $order["orderCurrency"];
$orderDetails["order_tags"] = $order["order_tags"];

$orderDetails["appId"] = constant('APP_ID');
$orderDetails["signature"] = generateSignature($orderDetails,constant('APP_SECRET_KEY'));

function generateSignature($postData,$secret){
  $secretKey = $secret; ksort($postData);
 $signatureData = "";
 foreach ($postData as $key => $value){
      $signatureData .= $key.$value;
 }
 $signature = hash_hmac('sha256', $signatureData, $secretKey,true);
 $signature = base64_encode($signature);
 return $signature;
}
echo constant('PAYMENT_URL');
exit();
?>
 <form id="redirectForm" method="post" action="<?php echo constant('PAYMENT_URL'); ?>">
    <input type="hidden" name="appId" value="<?php echo $orderDetails["appId"] ?>"/>
    <input type="hidden" name="orderId" value="<?php echo $orderDetails["orderId"] ?>"/>
    <input type="hidden" name="orderAmount" value="<?php echo $orderDetails["orderAmount"] ?>"/>
    <input type="hidden" name="orderCurrency" value="<?php echo $orderDetails["orderCurrency"] ?>"/>
    <input type="hidden" name="orderNote" value="<?php echo $orderDetails["orderNote"] ?>"/>
    <input type="hidden" name="customerName" value="<?php echo $orderDetails["customerName"] ?>"/>
    <input type="hidden" name="customerEmail" value="<?php echo $orderDetails["customerEmail"] ?>"/>
    <input type="hidden" name="customerPhone" value="<?php echo $orderDetails["customerPhone"] ?>"/>
    <input type="hidden" name="returnUrl" value="<?php echo $orderDetails["returnUrl"] ?>"/>
    <input type="hidden" name="notifyUrl" value="<?php echo $orderDetails["notifyUrl"] ?>"/>
    <input type="hidden" name="signature" value="<?php echo $orderDetails["signature"] ?>"/>
    <input type="hidden" name="customer_id" value="<?php echo $orderDetails["customer_id"] ?>"/>
    <input type="hidden" name="order_tags" value="<?php echo $orderDetails["order_tags"] ?>"/>
  </form>
  <script>document.getElementById("redirectForm").submit();</script>
<?php
  function getUserDetails($orderId,$inid,$name,$email,$mobile) {
      return array(
        "customerName" => $name,
        "customerEmail" => $email,
        "customerPhone" => $mobile,
        "customer_id" => $inid,
      );
  }
  function getOrderDetails($orderId,$amount,$investor_id) {
    return array(
      "orderId" => $orderId,
      "orderAmount" => $amount,
      "orderNote" => "Membership Payment",
      "orderCurrency" => "INR",
    );
  }
?>