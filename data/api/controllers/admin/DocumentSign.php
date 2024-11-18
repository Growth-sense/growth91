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
                        'date'=>date('Y-m-d H:i:s'),
                        'investor1'=>$investor_name,
                        'founder1'=>$founder_name,
                        'amount'=>$invested_amount
                    )
                ))  
            );
            
            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://ext.digio.in:444/v2/client/template/multi_templates/create_sign_request',
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
                    'Authorization: Basic QUlDRjlGSjVCOEVNUDNDOFlXTUZKNUY2TExQQjE3TU06QjVTV09SOVhVQVg5Nlk0Vkg2NjVGSzlFNENKMUJIODQ=',
                    'Content-Type: application/json',
                ),
            ));

            $response2 = curl_exec($curl);
            curl_close($curl);

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

    function get_investment_signed_status()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        $formdata = json_decode(file_get_contents('php://input'), true);

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://ext.digio.in:444/v2/client/document/DID220828193002412PGQM41MAZIPW9T',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Authorization: Basic QUlDRjlGSjVCOEVNUDNDOFlXTUZKNUY2TExQQjE3TU06QjVTV09SOVhVQVg5Nlk0Vkg2NjVGSzlFNENKMUJIODQ='
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        echo $response;

    // $data=[
    //     'founder_document_sign_status' => 'signed',
    // ];
    // $this->db->where('investment_id', '15');
    // $this->db->update('investments',$data);

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



}