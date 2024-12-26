<?php

use LDAP\Result;

defined('BASEPATH') or exit('No direct script access allowed');
class DealInvitationStatus extends CI_Controller
{
    function get_invitation_details()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        // sql query
        $formdata = json_decode(file_get_contents('php://input'), true);
        if (!empty($formdata)) {
            $deal_id = $formdata["deal_id"];
            $email = $formdata["email"];
            $sql2 = "SELECT * FROM `private_deal_invities` WHERE `deal_id`='$deal_id' AND email='$email'";
            $query2 = $this->db->query($sql2);
            $data3 = $query2->result();
            if (count($data3) > 0) {
                $response = [
                    'status' => '1',
                    'message' => 'Invitation list is fetched successfully.',
                    'data' => $data3,
                ];
            } else {
                $response = [
                    'status' => '0',
                    'message' => 'You Are Not Invited on Private Deal!'
                ];
            }
        } else {
            $response = [
                'status' => '0',
                'message' => 'Unable to proceed request'

            ];
        }

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }
}
