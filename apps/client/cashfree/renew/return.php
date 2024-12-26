<?php

include('../db/database.php');
include('../db/config.php');
echo "<pre>";

$Invested_dt = date('Y-m-d');
$exploded = explode("_", $_POST["orderId"]);

$investor_id = $exploded[1];
$expiry_date = $exploded[2];
$expiry_explode = explode(" ", $expiry_date);
$expiry_date=$expiry_explode[0];
if($expiry_date=='NON'){
  $end=date('Y-m-d', strtotime('+1 years'));
}else{
  $end = date('Y-m-d', strtotime($expiry_date. ' + 1 years'));
}

$orderId = $_POST["orderId"];
$orderAmount = $_POST["orderAmount"];
$referenceId = $_POST["referenceId"];
$txStatus = $_POST["txStatus"];
$paymentMode = $_POST["paymentMode"];
$txMsg = $_POST["txMsg"];
$txTime = $_POST["txTime"];
$signature = $_POST["signature"];
$data = $orderId.$orderAmount.$referenceId.$txStatus.$paymentMode.$txMsg.$txTime;
$secretKey = constant('APP_SECRET_KEY');
$hash_hmac = hash_hmac('sha256', $data, $secretKey, true);
$computedSignature = base64_encode($hash_hmac);
$BASE_URL=constant('BASE_URL');


if ($signature == $computedSignature) {

    if($txStatus=='FAILED'){
        $sql="UPDATE `users` SET membership_fees='$orderAmount' WHERE investor_id='$investor_id'";
        if ($con->query($sql) === TRUE){
          $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
          VALUES ('$investor_id','0','$Invested_dt','$orderAmount','Renew Membership','$orderId','0','$txStatus',
            '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
          if ($con->query($sql2) === TRUE) {
            // echo 'failed';
             header('Location: '.$BASE_URL.'renew-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
          }
        }
    }else if($txStatus=='SUCCESS'){

      $sql="UPDATE `users` SET membership_type='premium',membership_end_date='$end',
      membership_fees='$orderAmount' WHERE investor_id='$investor_id'";

      if ($con->query($sql) === TRUE) {

        // transaction entry
        $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
        VALUES ('$investor_id','0','$Invested_dt','$orderAmount','Renew Membership upto $end','$orderId','0','$txStatus',
          '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
        if ($con->query($sql2) === TRUE) {
          // echo 'success';
           header('Location: '.$BASE_URL.'renew-success?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
        }
      }
    } else {
      $sql="UPDATE `users` SET membership_fees='$orderAmount' WHERE investor_id='$investor_id'";
        if ($con->query($sql) === TRUE){
          $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
          VALUES ('$investor_id','0','$Invested_dt','$orderAmount','Renew Membership','$orderId','0','$txStatus',
            '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
          if ($con->query($sql2) === TRUE) {
            // echo 'failed';
             header('Location: '.$BASE_URL.'renew-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
          }
        }
    }
  
 } else {
   echo "<h1>Something went wrong</h1>";
  // Reject this call
}

 ?>
