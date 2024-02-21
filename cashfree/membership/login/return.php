<?php

include('../../db/database.php');
include('../../db/config.php');
$Invested_dt = date('Y-m-d');

$exploded = explode("_", $_POST["orderId"]);

$investor_id = $exploded[1];
$membership_fees=$exploded[2];
$registered_amt=$exploded[3];


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
        $sql="UPDATE `users` SET registered_amt='$orderAmount',membership_payment_status='$txStatus',
        membership_type='regular' WHERE investor_id='$investor_id'";
        if ($con->query($sql) === TRUE) {
          $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
          VALUES ('$investor_id','0','$Invested_dt','$orderAmount','New registration','$orderId','0','$txStatus',
            '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
          if ($con->query($sql2) === TRUE) {
             header('Location: '.$BASE_URL.'register-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
          }
        }
    }else if($txStatus=='SUCCESS'){
      $end_date = date('Y-m-d H-i a', strtotime('+1 years'));
      $start_date=date('Y-m-d H-i a');
      $membership_duration='1';
      $sql="UPDATE `users` SET registered_amt='$orderAmount',membership_payment_status='$txStatus',
        membership_type='premium',membership_duration='$membership_duration',
        membership_start_date='$start_date',membership_end_date='$end_date',
        membership_fees='$membership_fees' WHERE investor_id='$investor_id'";
      if ($con->query($sql) === TRUE) {
        $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
        VALUES ('$investor_id','0','$Invested_dt','$orderAmount','Membership Upgrade','$orderId','0','$txStatus',
          '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
        if ($con->query($sql2) === TRUE) {
           header('Location: '.$BASE_URL.'register-success?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
        }
      }
    } else {
      $sql="UPDATE `users` SET registered_amt='$orderAmount',membership_payment_status='$txStatus',
        membership_type='regular' WHERE investor_id='$investor_id'";
        if ($con->query($sql) === TRUE) {
          $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
          VALUES ('$investor_id','0','$Invested_dt','$orderAmount','New registration','$orderId','0','$txStatus',
            '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
          if ($con->query($sql2) === TRUE) {
             header('Location: '.$BASE_URL.'register-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId);
          }
        }
    }
 } else {
   echo "<h1>Something went wrong</h1>";
  // Reject this call
}
 ?>
