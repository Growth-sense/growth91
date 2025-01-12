<?php 
	if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	function sendSMS($otp,$mobileNo) {
        $curl = curl_init();
        $API_KEY = 'uXBLhCNkKUsPDrq62Y73c5gjtodzQabISMO10pmevw4fTE8RVlhzKG9twWyTRrjuDBv3YMkSmZNiEcpb';
        $url = "https://www.fast2sms.com/dev/bulkV2?authorization=".$API_KEY."&route=dlt&sender_id=GrowNI&message=147467&variables_values=".urlencode($otp)."%7C&flash=0&numbers=".urlencode($mobileNo);

        //  $url = "https://www.fast2sms.com/dev/bulkV2?authorization=".$API_KEY."&message=".urlencode($otp)."&language=english&route=q&numbers=".urlencode($mobileNo);
        curl_setopt_array($curl, array(
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_SSL_VERIFYHOST => 0,
          CURLOPT_SSL_VERIFYPEER => 0,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "GET",
          CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache"
          ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
        	return '0';
          // echo "cURL Error #:" . $err;
        } else {
        	return '1';
        //   echo $response;
        }
    }	

    