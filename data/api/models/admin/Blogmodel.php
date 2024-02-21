<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blogmodel extends CI_Model {

    // get blog list
    public function list() {
        $sql="
            SELECT * FROM blog_post_master 
            WHERE deleted_at='0'
            ORDER BY id DESC
        ";
        $query = $this->db->query($sql);
        return $query->result();
    }

    function addpost($post_data) {
        $this->db->insert('blog_post_master', $post_data);
        return $this->db->insert_id();
    }

    function updatepost($id,$post_data) {
        $this->db->where('id', $id);
        $query = $this->db->update('blog_post_master', $post_data);
        return $query;
    }

}




?>