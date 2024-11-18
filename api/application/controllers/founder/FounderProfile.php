<?php
defined('BASEPATH') or exit('No direct script access allowed');

class FounderProfile extends CI_Controller
{

    public function get_founder_details(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $id = $formdata['founder_id'];
            $sql="SELECT investor_id,first_name,middle_name,last_name,mobile,user_profile_picture,is_investor,membership_type,user_block_status FROM `users`
            WHERE investor_id = '$id'";
            $query=$this->db->query($sql);
            $result = $query->result();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Details are fetched successfully.',
					'data' => $result,
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

    function update_profile_details()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        $formdata = json_decode(file_get_contents('php://input'), true);

        if (!empty($_POST)) {
            $founder_id = $this->input->post('founder_id');
            $post_data = [
                'first_name' => $this->input->post('founder_first_name'),
                'middle_name' => $this->input->post('founder_middle_name'),
                'last_name' => $this->input->post('founder_last_name'),
                'mobile' => $this->input->post('founder_mobile'),
            ];
            
            $this->db->where('investor_id', $founder_id);
            $res = $this->db->update('users', $post_data);
            if ($res) {
                if (isset($_FILES['founder_user_profile_picture']['name']) && $_FILES['founder_user_profile_picture']['name'] != "") {
                    $dir = "uploads/profile/" . $founder_id . '/';

                    if (!is_dir($dir)) {
                        @mkdir($dir, 0777, true);
                    }

                    $image = $_FILES['founder_user_profile_picture']['tmp_name'];
                    $hash = $_FILES['founder_user_profile_picture']['name'];

                    if (move_uploaded_file($image, $dir . $hash)) {
                        $image_details = array(
                            "user_profile_picture" => $hash
                        );
                        $this->db->where('investor_id', $founder_id);
                        $this->db->update('users', $image_details);
                    }

                }

                $response = [
                    'status' => '1',
                    'message' => 'Profile is updated successfully.'
                ];
            }
            else {
                $response = [
                    'status' => '0',
                    'message' => 'Please try again!'
                ];
            }

        }
        else {
            $response = [
                'status' => '0',
                'message' => 'Please enter values of all fields.',
            ];
        }

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }
}