<?php
class DocumentSign extends CI_Controller
{

    public function sendsignrequest()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        $formdata = json_decode(file_get_contents('php://input'), true);


        if (!empty($formdata)) {
            $investor_mobile = $formdata['investor_mobile'];
            $founder_mobile = $formdata['founder_mobile'];
            $investor_name = $formdata['investor_name'];
            $founder_name = $formdata['founder_name'];
            $template_id = $formdata['template_id'];
            $file_name = $formdata['file_name'];
            $investor_sign_coordinate=$formdata['investor_sign_coordinate'];
            $founder_sign_coordinate=$formdata['founder_sign_coordinate'];
            $invested_amount=$formdata['invested_amount'];
            $investment_id=$formdata['investment_id'];
            $investor_address=$formdata['address'];

            //for digio document environment settings
            $sql = "SELECT * FROM `digio_settings` where id='1'";
            $query=$this->db->query($sql);
            $list =$query->result();
            $env=$list[0]->environment;
            if($env=='prod'){
                $user=$list[0]->prod_client_id;
                $password=$list[0]->prod_client_secret;
                $url=$list[0]->prod_url;
            }else{
                $user=$list[0]->test_client_id;
                $password=$list[0]->test_client_secret;
                $url=$list[0]->test_url;
            }

            $curl = curl_init();
            $arr1 = array(
                'signers' => array(array(
                    'identifier' => $investor_mobile,
                    'name' => $investor_name,
                    'sign_type' => 'aadhaar'
                ),
                array(
                    'identifier' => $founder_mobile,
                    'name' => $founder_name,
                    'sign_type' => 'aadhaar'
                )),
                'expire_in_days' => 10,
                'send_sign_link' => true,
                'notify_signers' => true,
                'sequential' => true,
                // 'comment'=>'For Deal investement',
                'display_on_page' => 'custom',
                'sign_coordinates' => array(
                    $investor_mobile => json_decode($investor_sign_coordinate),
                    $founder_mobile => json_decode($founder_sign_coordinate),
                ),
                'file_name' => $file_name,
                'templates' => array(array(
                    'template_key' => $template_id,
                    'template_values'=> array(
                        'investor'=> $investor_name,
                        'founder'=> $founder_name,
                        'date'=>date('Y-m-d'),
                        // 'investor1'=>$investor_name,
                        // 'founder1'=>$founder_name,
                        'amount'=>$invested_amount,
                        'email'=>$investor_mobile,
                        'address'=>$investor_address,
                    )
                ))  
            );
            
            curl_setopt_array($curl, array(
                CURLOPT_URL => $url.'v2/client/template/multi_templates/create_sign_request',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => json_encode($arr1), /* set the content type json */
                curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json')),

                /* set return type json */
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true),
                CURLOPT_HTTPHEADER => array(
                    'Content-Type:application/json',
                    'Authorization: Basic '. base64_encode($user.":".$password)
                ),
            ));

            $response2 = curl_exec($curl);
            curl_close($curl);
            // $data=[
            //     'founder_document_sign_status'=>'fndr_sign_success'
            // ];
            // $this->db->where('investment_id',$investment_id);
            // $this->db->update('investments',$data);

            $response = [
                'status' => '1',
                'message' => 'Request sent successfully.',
                'data' => $response2,
            ];
        }
        else {
            $response = [
                'status' => '0',
                'message' => 'Please try again',
            ];
        }
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }


    function update_investment_document_id()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        $formdata = json_decode(file_get_contents('php://input'), true);
        if (!empty($formdata)) {
            $investment_id = $formdata['investment_id'];
            $document_signed_id = $formdata['document_signed_id'];
            $data = [
                'document_signed_id' => $document_signed_id,
            ];
            $this->db->where('investment_id', $investment_id);
            $resp = $this->db->update('investments', $data);
            if ($resp) {
                $response = [
                    'status' => '1',
                    'message' => 'Data is updated successfully.',
                    'data' => $resp,
                ];
            }
            else {
                $response = [
                    'status' => '0',
                    'message' => 'Please try again',
                ];
            }
        }
        else {
            $response = [
                'status' => '0',
                'message' => 'Please try again',
            ];
        }
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }

    //for downloading sign document
    function downloadDocument(){
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Content-Type: application/pdf; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        $formdata = json_decode(file_get_contents('php://input'), true);
        $docId=$formdata['digioDocId'];

        //for digio document environment settings
        $sql = "SELECT * FROM `digio_settings` where id='1'";
        $query=$this->db->query($sql);
        $list =$query->result();
        $env=$list[0]->environment;
        if($env=='prod'){
            $user=$list[0]->prod_client_id;
            $password=$list[0]->prod_client_secret;
            $url=$list[0]->prod_url;
        }else{
            $user=$list[0]->test_client_id;
            $password=$list[0]->test_client_secret;
            $url=$list[0]->test_url;
        }

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => $url.'v2/client/document/download?document_id='.$docId,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Content-Type:application/json',
            'Authorization: Basic '. base64_encode($user.":".$password)
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;

    }



    function update_document_status(){
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        
        $sql = "SELECT * FROM `investments`
        LEFT JOIN deals on deals.deal_id = investments.deal_id
        LEFT JOIN startups on startups.startupid = deals.deal_name
        left join users on users.investor_id = investments.investor_id
        GROUP BY investments.investment_id
        ORDER BY investments.investment_id DESC;
        ";
        $query=$this->db->query($sql);
        $row =$query->result();
        echo '<pre>';

        //for digio document environment settings
        $dg_sql = "SELECT * FROM `digio_settings` where id='1'";
        $dg_query=$this->db->query($dg_sql);
        $dg_list =$dg_query->result();
        $env=$dg_list[0]->environment;
        if($env=='prod'){
            $user=$dg_list[0]->prod_client_id;
            $password=$dg_list[0]->prod_client_secret;
            $dg_url=$dg_list[0]->prod_url;
        }else{
            $user=$dg_list[0]->test_client_id;
            $password=$dg_list[0]->test_client_secret;
            $dg_url=$dg_list[0]->test_url;
        }

        for($c=0;$c< count($row);$c++){
            $document_signed_id=$row[$c]->document_signed_id;
            $investor_document_sign_status=$row[$c]->investor_document_sign_status;
            $founder_document_sign_status=$row[$c]->founder_document_sign_status;
            $investment_id=$row[$c]->investment_id;
            
            if(!empty($document_signed_id) && ($investor_document_sign_status!='Inv_sign_success'|| $founder_document_sign_status!='fndr_sign_success')){
                
                $curl = curl_init();
                $url=$dg_url.'v2/client/document/'.$document_signed_id;
                curl_setopt_array($curl, array(
                    CURLOPT_URL => $url,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'GET',
                    CURLOPT_HTTPHEADER => array(
                        'Content-Type:application/json',
                        'Authorization: Basic '. base64_encode($user.":".$password)
                    ),
                ));
                $response = curl_exec($curl);
                curl_close($curl);
                
                $resp=$response;
                $resp = json_decode($response);
                $signing_parties=$resp->signing_parties;
                // var_dump($signing_parties);
                // var_export($signing_parties);

                $role1='';
                $role2='';
                if(count($signing_parties)>0){
                    $first=$signing_parties[0];
                    $second=$signing_parties[1];
                    if($first->status=='signed'){
                        $email=$first->identifier;
                        $sql2="select * from users where email='$email'";
                        $query2=$this->db->query($sql2);
                        $row2 =$query2->result();
                        if(count($row2)>0){
                            
                            if($row2[0]->user_type=='investor'){
                                $data=[
                                    'investor_document_sign_status'=>'Inv_sign_success',
                                    'investor_document_sign_status_date'=>date('Y-m-d'),
                                ];
                                $this->db->where('investment_id',$investment_id);
                                $this->db->update('investments',$data);
                            }
                            if($row2[0]->user_type=='founder'){
                                $data=[
                                    'founder_document_sign_status'=>'fndr_sign_success',
                                    'founder_document_sign_status_date'=>date('Y-m-d'),
                                ];
                                $this->db->where('investment_id',$investment_id);
                                $this->db->update('investments',$data);
                            }
                        }
                    }
                    if($second->status=='signed'){
                        $email=$second->identifier;
                        $sql2="select * from users where email='$email'";
                        $query2=$this->db->query($sql2);
                        $row2 =$query2->result();
                        if(count($row2)>0){
                            
                            if($row2[0]->user_type=='investor'){
                                $data=[
                                    'investor_document_sign_status'=>'Inv_sign_success',
                                    'investor_document_sign_status_date'=>date('Y-m-d'),
                                ];
                                $this->db->where('investment_id',$investment_id);
                                $this->db->update('investments',$data);
                            }
                            if($row2[0]->user_type=='founder'){
                                $data=[
                                    'founder_document_sign_status'=>'fndr_sign_success',
                                    'founder_document_sign_status_date'=>date('Y-m-d'),
                                ];
                                $this->db->where('investment_id',$investment_id);
                                $this->db->update('investments',$data);
                            }
                        }
                    }


                }

            }
        }
        exit();
            
        //     if ($resp) {
        //         $response = [
        //             'status' => '1',
        //             'message' => 'Data is updated successfully.',
        //             // 'data' => $resp,
        //         ];
        //     }
        //     else {
        //         $response = [
        //             'status' => '0',
        //             'message' => 'Please try again',
        //         ];
        //     }
        // $this->output
        //     ->set_content_type('application/json')
        //     ->set_output(json_encode($response));
    }

}