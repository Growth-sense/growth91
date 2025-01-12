<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Digio extends CI_Controller {
	function document_signed(){
		$data = file_get_contents("php://input");
		$events = json_decode($data, true);
		// echo 'sdsd';
		
		$post_data=[
			'data'=>json_encode($events),
			'type'=>'digio',
		];
		$this->db->insert('test', $post_data);
	}
}