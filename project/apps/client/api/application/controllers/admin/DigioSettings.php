<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DigioSettings extends CI_Controller {
    	// DEAL LIST
        public function getsettings() {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Headers: access");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            $formdata = json_decode(file_get_contents('php://input'), true);
            if(!empty($formdata))
             {
                $id=$formdata['id'];
                $sql = "SELECT * FROM `digio_settings` where id='$id'";
                $query=$this->db->query($sql);
                $list =$query->result();
                
                if(count($list) >= 0) {
                    $response = [
                        'status' => '1',
                        'message' => 'Setting Getted successfully.',
                        'data' => $list,
                    ];
                } else {
                    $response =[
                        'status' => '0',
                        'message' => 'Please try again!'
                    ];
                }
             }
             else {
                $response = [
                    'status' => '0',
                    'message'=> 'Please enter values of all fields.',
                ];
            }
           
            
            $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($response));	
        }

        function updatesetting() {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Headers: access");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            $formdata = json_decode(file_get_contents('php://input'), true);
            
            if(!empty($formdata)) {
                $id = $formdata['id'];
                $post_data = [
                    'id'=> $formdata['id'],
                    'test_url'=> $formdata['test_url'],
                    'prod_url'=> $formdata['prod_url'],
                    'environment'=> $formdata['environment'],
                    'test_client_id'=> $formdata['test_client_id'],
                    'test_client_secret'=> $formdata['test_client_secret'],
                    'prod_client_id'=> $formdata['prod_client_id'],
                    'prod_client_secret'=> $formdata['prod_client_secret'],

                ];
                
                $this->db->where('id', $id);
                $this->db->update('digio_settings', $post_data);
                $affected_rows= $this->db->affected_rows();
                
                if($affected_rows) {
                    $response = [
                        'status' => '1',
                        'message' => 'Digio Settings updated successfully.'
                    ];
                } else {
                    $response =[
                        'status' => '0',
                        'message' => 'Please try again!'
                    ];
                }
                
            } else {
                $response = [
                    'status' => '0',
                    'message'=> 'Please enter values of all fields.',
                ];
            }
                
            $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($response));	
        }
}