<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SellerListing extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        // Load database library if not already loaded
        if (!$this->load->is_loaded('database')) {
            $this->load->database();
        }
    }

    /**
     * Helper to output JSON response
     */
    private function _json_response($status, $message, $extra = [])
    {
        $response = array_merge([
            'status' => (string) $status,
            'message' => $message
        ], $extra);

        if ($status == 1) {
            $this->output->set_status_header(200);
        } else {
            $this->output->set_status_header(400);
        }

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }

    /**
     * Endpoint: Initialize an empty draft and return the ID
     * URL: /api/investors/SellerListing/init_draft
     */
    public function init_draft()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $userId = isset($formdata['sdUserId']) ? $formdata['sdUserId'] : null;

        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        $post_data = [
            'sdUserId' => $userId,
            'sdUserName' => '',
            'sdUserEmail' => '',
            'sdUserMobile' => '',
            'sdResidentialStatus' => '',
            'sdLegalName' => '',
            'sdStartupName' => '',
            'sdInstrumentType' => '',
            'sdAskPriceMin' => 0,
            'sdAskPriceExpected' => 0,
            'sdStatus' => 'Draft'
        ];

        $this->db->insert('seller_listings', $post_data);
        $listingId = $this->db->insert_id();

        if ($listingId) {
            return $this->_json_response(1, 'Draft initialized successfully.', ['id' => $listingId]);
        } else {
            return $this->_json_response(0, 'Failed to initialize draft.');
        }
    }

    /**
     * Endpoint: Upload single document instantly
     * URL: /api/investors/SellerListing/upload_document
     */
    public function upload_document()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $id = $this->input->get('id');
        $type = $this->input->get('type');

        if (empty($id) || empty($type)) {
            return $this->_json_response(0, 'Listing ID and Document Type are required.');
        }

        if (isset($_FILES['file']['name']) && !empty($_FILES['file']['name'])) {
            $dir = FCPATH . "uploads/seller_listings/" . $id . "/";
            if (!is_dir($dir)) {
                @mkdir($dir, 0777, true);
            }

            $tmp_name = $_FILES['file']['tmp_name'];
            $temp_ext = explode(".", $_FILES['file']['name']);
            $new_filename = round(microtime(true)) . '.' . end($temp_ext);

            if (move_uploaded_file($tmp_name, $dir . $new_filename)) {
                // Return the filename to the frontend. The DB update is deferred until explicit save/submit.

                return $this->_json_response(1, 'File uploaded successfully.', [
                    'filename' => $new_filename,
                    'type' => $type
                ]);
            } else {
                return $this->_json_response(0, 'Failed to move uploaded file.');
            }
        }

        return $this->_json_response(0, 'No file found in request.');
    }

    /**
     * Endpoint 1: Save or Update Draft (Multipart Form-Data)
     * URL: /api/investors/SellerListing/save_draft
     */
    public function save_draft()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        // Since it's a multipart form upload, values are populated in $_POST
        $userId = $this->input->post('sdUserId');
        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        $sdId = $this->input->post('sdSdID');

        // Map inputs to seller_listings table fields
        $post_data = [
            'sdUserId' => $userId,
            'sdUserName' => $this->input->post('sdUserName'),
            'sdUserEmail' => $this->input->post('sdUserEmail'),
            'sdUserMobile' => $this->input->post('sdUserMobile'),
            'sdInvestorName' => $this->input->post('sdInvestorName'),
            'sdPanNumber' => $this->input->post('sdPanNumber'),
            'sdPanName' => $this->input->post('sdPanName'),
            'sdResidentialStatus' => $this->input->post('sdResidentialStatus'),
            'sdLegalName' => $this->input->post('sdLegalName'),
            'sdStartupName' => $this->input->post('sdStartupName'),
            'sdYearOfInvestment' => $this->input->post('sdYearOfInvestment') !== "" ? $this->input->post('sdYearOfInvestment') : 0,
            'sdInstrumentType' => $this->input->post('sdInstrumentType'),
            'sdInvestmentTerms' => $this->input->post('sdInvestmentTerms'),
            'sdQuantity' => $this->input->post('sdQuantity') !== "" ? $this->input->post('sdQuantity') : 0,
            'sdLastKnownPrice' => $this->input->post('sdLastKnownPrice') !== "" ? $this->input->post('sdLastKnownPrice') : null,
            'sdAskPriceMin' => $this->input->post('sdAskPriceMin') !== "" ? $this->input->post('sdAskPriceMin') : 0,
            'sdAskPriceExpected' => $this->input->post('sdAskPriceExpected') !== "" ? $this->input->post('sdAskPriceExpected') : 0,
            'sdIsDemat' => $this->input->post('sdIsDemat') ? 1 : 0,
            'sdDpName' => $this->input->post('sdIsDemat') ? $this->input->post('sdDpName') : null,
            'sdDpId' => $this->input->post('sdIsDemat') ? $this->input->post('sdDpId') : null,
            'sdClientId' => $this->input->post('sdIsDemat') ? $this->input->post('sdClientId') : null,
            'sdIsinNumber' => $this->input->post('sdIsDemat') ? $this->input->post('sdIsinNumber') : null,
            'sdDeclare' => $this->input->post('sdDeclare') ? 1 : 0,
            'sdHasPoa' => $this->input->post('sdHasPoa') ? 1 : 0
        ];

        // Process deferred file saves if present
        $docTypes = ['sdShareCertificate', 'sdExecutedSha', 'sdDoa', 'sdPoaDoc', 'sdAdditionalDoc'];
        foreach ($docTypes as $doc) {
            if (array_key_exists($doc, $_POST)) {
                $post_data[$doc] = $this->input->post($doc);
            }
        }

        // Sanitize POA if HasPoa is 0
        if ($post_data['sdHasPoa'] == 0) {
            $post_data['sdPoaDoc'] = null;
        }

        // Notice: sdStatus is intentionally NOT updated here. 
        // Save draft is only allowed by UI when it's already 'Draft'. 

        // 1. Insert or Update Row
        if (!empty($sdId)) {
            $this->db->where('sdSdID', $sdId);
            $this->db->update('seller_listings', $post_data);
            $listingId = $sdId;
        } else {
            $post_data['sdStatus'] = 'Draft';
            $this->db->insert('seller_listings', $post_data);
            $listingId = $this->db->insert_id();
        }

        if (!$listingId) {
            return $this->_json_response(0, 'Failed to save listing draft.');
        }

        // 2. Handle File Uploads
        $uploaded_files = [];
        $file_fields = ['sdShareCertificate', 'sdExecutedSha', 'sdDoa', 'sdPoaDoc', 'sdAdditionalDoc'];

        foreach ($file_fields as $field) {
            if (isset($_FILES[$field]['name']) && $_FILES[$field]['name'] != "") {
                $dir = FCPATH . "uploads/seller_listings/" . $listingId . "/";
                if (!is_dir($dir)) {
                    @mkdir($dir, 0777, true);
                }

                $tmp_name = $_FILES[$field]['tmp_name'];
                $temp_ext = explode(".", $_FILES[$field]["name"]);
                $new_filename = round(microtime(true)) . '.' . end($temp_ext);

                if (move_uploaded_file($tmp_name, $dir . $new_filename)) {
                    $uploaded_files[$field] = $new_filename;
                }
            }
        }

        // 3. Update paths in DB if files were uploaded
        if (!empty($uploaded_files)) {
            $this->db->where('sdSdID', $listingId);
            $this->db->update('seller_listings', $uploaded_files);
        }

        return $this->_json_response(1, 'Draft saved successfully.', ['id' => $listingId]);
    }

    /**
     * Submit listing for review (User Action)
     * URL: /api/investors/SellerListing/submit_for_review
     */
    public function submit_for_review()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $sdId = isset($formdata['sdSdID']) ? $formdata['sdSdID'] : null;

        if (empty($sdId)) {
            return $this->_json_response(0, 'Listing ID is required.');
        }

        $this->db->where('sdSdID', $sdId);
        $result = $this->db->update('seller_listings', [
            'sdStatus' => 'Under Review',
            'sdPublishedAt' => date('Y-m-d H:i:s')
        ]);

        if ($result) {
            return $this->_json_response(1, 'Listing submitted for review.');
        } else {
            return $this->_json_response(0, 'Failed to submit listing.');
        }
    }

    /**
     * Get active draft for logged in user
     * URL: /api/investors/SellerListing/get_draft_by_user
     */
    public function get_draft_by_user()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $userId = isset($formdata['sdUserId']) ? $formdata['sdUserId'] : null;

        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        // Fetch draft or editable staging rows
        $this->db->order_by('sdSdID', 'DESC');
        $this->db->where('sdUserId', $userId);
        $this->db->where('sdStatus', 'Draft');
        $draft = $this->db->get('seller_listings', 1)->row_array();

        if ($draft) {
            return $this->_json_response(1, 'Draft fetched successfully.', ['data' => $draft]);
        } else {
            return $this->_json_response(1, 'No active draft found.', ['data' => null]);
        }
    }

    /**
     * Get ALL listings for logged in user (Dashboard View)
     * URL: /api/investors/SellerListing/get_my_listings
     */
    public function get_my_listings()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $userId = isset($formdata['sdUserId']) ? $formdata['sdUserId'] : null;

        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        $this->db->where('sdUserId', $userId);
        $this->db->order_by('sdSdID', 'DESC');
        $listings = $this->db->get('seller_listings')->result_array();

        return $this->_json_response(1, 'Listings fetched successfully.', ['data' => $listings]);
    }

    /**
     * Delete Draft Listing
     * URL: /api/investors/SellerListing/delete_draft
     */
    public function delete_draft()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $sdId = isset($formdata['sdSdID']) ? $formdata['sdSdID'] : null;

        if (empty($sdId)) {
            return $this->_json_response(0, 'Draft ID is required.');
        }

        // Ensure it is still a draft before deleting
        $exists = $this->db->get_where('seller_listings', ['sdSdID' => $sdId, 'sdStatus' => 'Draft'])->row_array();
        if (!$exists) {
            return $this->_json_response(0, 'Cannot delete this listing because it has already been submitted.');
        }

        $this->db->where('sdSdID', $sdId);
        $this->db->delete('seller_listings');

        return $this->_json_response(1, 'Draft deleted successfully.');
    }

    /**
     * Get specific listing details by ID
     * URL: /api/investors/SellerListing/get_details
     */
    public function get_details()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $sdId = isset($formdata['sdSdID']) ? $formdata['sdSdID'] : null;

        if (empty($sdId)) {
            return $this->_json_response(0, 'Listing ID is required.');
        }

        $listing = $this->db->get_where('seller_listings', ['sdSdID' => $sdId])->row_array();

        if ($listing) {
            return $this->_json_response(1, 'Listing details fetched successfully.', ['data' => $listing]);
        } else {
            return $this->_json_response(0, 'Listing not found.');
        }
    }

    /**
     * Get investor profile data securely (Mobile, PAN)
     * URL: /api/investors/SellerListing/get_investor_profile
     */
    public function get_investor_profile()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $userId = isset($formdata['sdUserId']) ? $formdata['sdUserId'] : null;

        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        $user = $this->db->get_where('users', ['investor_id' => $userId])->row_array();
        if ($user) {
            return $this->_json_response(1, 'Success', [
                'mobile' => $user['mobile'],
                'pan' => $user['panno'],
                'pan_name' => $user['pan_name']
            ]);
        }
        return $this->_json_response(0, 'User not found.');
    }
}
