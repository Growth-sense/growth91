<?php

include('../db/database.php');
include('../db/config.php');

$payment_date = date('Y-m-d');

$orderId = $_GET["order_id"];
$PAYMENT_URL = constant('PAYMENT_URL');
$APP_SECRET_KEY = constant('APP_SECRET_KEY');
$APP_ID = constant('APP_ID');

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $PAYMENT_URL."/".$orderId,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    "x-client-id: {$APP_ID}",
  "x-client-secret: {$APP_SECRET_KEY}",
    'x-api-version: 2022-09-01'
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if(!$err)
{
    $result = json_decode($response, true); 
} 
else
{
    echo  $err;
} 

$exploded = explode("_", $orderId);
$investor_id = $exploded[1];
$deal_id = $exploded[2];
$documents = $exploded[3];
$docs=explode("-",$documents);
 
$orderAmount = $result["order_amount"];
$referenceId = $result["cf_order_id"];
$txStatus = $result["order_status"] == "PAID" ? "SUCCESS" : "FAILED";
$paymentMode = $result["order_meta"]["payment_methods"];
$txMsg = $result["order_note"];
$txTime = $result["created_at"];

$signature = "";
$data = $orderId.$orderAmount.$referenceId.$txStatus.$paymentMode.$txMsg.$txTime;
$secretKey = constant('APP_SECRET_KEY');
$hash_hmac = hash_hmac('sha256', $data, $secretKey, true);
$computedSignature = base64_encode($hash_hmac);
$BASE_URL=constant('BASE_URL'); 
  if($result["order_status"] == 'ACTIVE'){
      $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status)
    VALUES ('$investor_id','$deal_id','$payment_date','$orderAmount','Document purchased','$orderId',
    '0','$txStatus')"; 
      if ($con->query($sql2) === TRUE) {
         header('Location: '.$BASE_URL.'document-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
      }
  }else if($result["order_status"] == 'PAID'){
    $payment_date=date('Y-m-d');
    $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status)
    VALUES ('$investor_id','$deal_id','$payment_date','$orderAmount','Document purchased','$orderId',
    '0','$txStatus')"; 
      if(count($docs)>0){
          $created_at=date('Y-m-d');
          for($i=0;$i<count($docs);$i++){
           $document_id= $docs[$i]; 
            $sql="INSERT INTO `buyed_documents` (investor_id, document_id, deal_id, order_Id,pay_status,order_amount,payment_mode,created_at)
            VALUES ('$investor_id','$document_id','$deal_id','$orderId','$txStatus','$orderAmount','$paymentMode','$created_at')"; 
            $con->query($sql);
        }
      }
      if ($con->query($sql2) === TRUE){
         header('Location: '.$BASE_URL.'document-success?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
      }
  } else {
      $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status)
    VALUES ('$investor_id','$deal_id','$payment_date','$orderAmount','Document purchased','$orderId',
    '0','$txStatus')"; 
      if ($con->query($sql2) === TRUE) {
         header('Location: '.$BASE_URL.'document-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
      }
  }
   

 ?>
