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
        $userId = isset($formdata['tsdUserId']) ? $formdata['tsdUserId'] : null;

        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        $post_data = [
            'tsdUserId' => $userId,
            'tsdStatus' => 'Draft'
        ];

        $this->db->insert('temp_seller_listings', $post_data);
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
                // Update the temp_seller_listings table with the new file path
                $this->db->where('tsdTempSdID', $id);
                $this->db->update('temp_seller_listings', [$type => $new_filename]);

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
        $userId = $this->input->post('tsdUserId');
        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        $tempId = $this->input->post('tsdTempSdID');

        // Map inputs to temp_seller_listings table fields
        $post_data = [
            'tsdUserId' => $userId,
            'tsdUserName' => $this->input->post('tsdUserName'),
            'tsdUserEmail' => $this->input->post('tsdUserEmail'),
            'tsdUserMobile' => $this->input->post('tsdUserMobile'),
            'tsdInvestorName' => $this->input->post('tsdInvestorName'),
            'tsdPanNumber' => $this->input->post('tsdPanNumber'),
            'tsdPanName' => $this->input->post('tsdPanName'),
            'tsdResidentialStatus' => $this->input->post('tsdResidentialStatus'),
            'tsdLegalName' => $this->input->post('tsdLegalName'),
            'tsdStartupName' => $this->input->post('tsdStartupName'),
            'tsdYearOfInvestment' => $this->input->post('tsdYearOfInvestment'),
            'tsdInstrumentType' => $this->input->post('tsdInstrumentType'),
            'tsdInvestmentTerms' => $this->input->post('tsdInvestmentTerms'),
            'tsdQuantity' => $this->input->post('tsdQuantity'),
            'tsdLastKnownPrice' => $this->input->post('tsdLastKnownPrice'),
            'tsdAskPriceMin' => $this->input->post('tsdAskPriceMin'),
            'tsdAskPriceExpected' => $this->input->post('tsdAskPriceExpected'),
            'tsdIsDemat' => $this->input->post('tsdIsDemat') ? 1 : 0,
            'tsdDpName' => $this->input->post('tsdDpName'),
            'tsdDpId' => $this->input->post('tsdDpId'),
            'tsdClientId' => $this->input->post('tsdClientId'),
            'tsdIsinNumber' => $this->input->post('tsdIsinNumber'),
            'tsdDeclare' => $this->input->post('tsdDeclare') ? 1 : 0,
            'tsdStatus' => 'Draft' // Reset/maintain draft status
        ];

        // 1. Insert or Update Row
        if (!empty($tempId)) {
            $this->db->where('tsdTempSdID', $tempId);
            $this->db->update('temp_seller_listings', $post_data);
            $listingId = $tempId;
        } else {
            $this->db->insert('temp_seller_listings', $post_data);
            $listingId = $this->db->insert_id();
        }

        if (!$listingId) {
            return $this->_json_response(0, 'Failed to save listing draft.');
        }

        // 2. Handle File Uploads
        $uploaded_files = [];
        $file_fields = ['tsdShareCertificate', 'tsdExecutedSha', 'tsdDoa', 'tsdPoaDoc'];

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
            $this->db->where('tsdTempSdID', $listingId);
            $this->db->update('temp_seller_listings', $uploaded_files);
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
        $tempId = isset($formdata['tsdTempSdID']) ? $formdata['tsdTempSdID'] : null;

        if (empty($tempId)) {
            return $this->_json_response(0, 'Listing Temp ID is required.');
        }

        $this->db->where('tsdTempSdID', $tempId);
        $result = $this->db->update('temp_seller_listings', ['tsdStatus' => 'Published']);

        if ($result) {
            // 1. Fetch from Staging Table
            $staging = $this->db->get_where('temp_seller_listings', ['tsdTempSdID' => $tempId])->row_array();

            if ($staging) {
                // 2. Map Staging keys to Published keys using allowedKeys whitelist
                // (Same pattern as publishunicorndeal in Startup.php)
                $allowedKeys = array(
                    "tsdUserId", "tsdUserName", "tsdUserEmail", "tsdUserMobile",
                    "tsdInvestorName", "tsdPanNumber", "tsdPanName", "tsdResidentialStatus",
                    "tsdLegalName", "tsdStartupName", "tsdYearOfInvestment",
                    "tsdInstrumentType", "tsdInvestmentTerms",
                    "tsdQuantity", "tsdLastKnownPrice", "tsdAskPriceMin", "tsdAskPriceExpected",
                    "tsdShareCertificate", "tsdExecutedSha", "tsdDoa", "tsdPoaDoc",
                    "tsdIsDemat", "tsdDpName", "tsdDpId", "tsdClientId", "tsdIsinNumber",
                    "tsdDeclare", "tsdHasPoa", "tsdAdminComment"
                );

                $published_data = [];
                $published_data['tsdTempSdID'] = $staging['tsdTempSdID'];

                foreach ($staging as $key => $value) {
                    if (in_array($key, $allowedKeys)) {
                        $new_key = 'sd' . substr($key, 3);
                        $published_data[$new_key] = $value;
                    }
                }

                // 3. Set status in published row to Under Review
                $published_data['sdStatus'] = 'Under Review';

                // 4. Insert or Update Live Table
                $exists = $this->db->get_where('seller_listings', ['tsdTempSdID' => $tempId])->row_array();
                if ($exists) {
                    $this->db->where('tsdTempSdID', $tempId);
                    $this->db->update('seller_listings', $published_data);
                } else {
                    $this->db->insert('seller_listings', $published_data);
                }
            }

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
        $userId = isset($formdata['tsdUserId']) ? $formdata['tsdUserId'] : null;

        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        // Fetch draft or editable staging rows
        $this->db->order_by('tsdTempSdID', 'DESC');
        $this->db->where('tsdUserId', $userId);
        $this->db->where_in('tsdStatus', ['Draft', 'Additional Information Required']);
        $draft = $this->db->get('temp_seller_listings', 1)->row_array();

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
        $userId = isset($formdata['tsdUserId']) ? $formdata['tsdUserId'] : null;

        if (empty($userId)) {
            return $this->_json_response(0, 'User ID is required.');
        }

        // Fetch Drafts and Additional Info Required from temp table
        $this->db->where('tsdUserId', $userId);
        $this->db->where_in('tsdStatus', ['Draft', 'Additional Information Required']);
        $drafts = $this->db->get('temp_seller_listings')->result_array();

        // Fetch Published items from main table
        $this->db->where('sdUserId', $userId);
        $published = $this->db->get('seller_listings')->result_array();

        // Flag drafts that already exist in the main table
        $published_ids = array_column($published, 'tsdTempSdID');
        foreach ($drafts as &$draft) {
            $draft['tsdHasMainRecord'] = in_array($draft['tsdTempSdID'], $published_ids);
        }
        unset($draft); // Unset reference

        // Map main table keys back to tsd prefix so the frontend table works without changes
        $mapped_published = [];
        $draft_ids = array_column($drafts, 'tsdTempSdID');

        foreach ($published as $pub) {
            if (in_array($pub['tsdTempSdID'], $draft_ids)) {
                continue; // Prevent duplicate rows if there's an active draft revision
            }

            $mapped_row = [];
            foreach ($pub as $key => $val) {
                if (strpos($key, 'sd') === 0) {
                    $new_key = 'tsd' . substr($key, 2);
                    $mapped_row[$new_key] = $val;
                } else {
                    $mapped_row[$key] = $val;
                }
            }
            $mapped_published[] = $mapped_row;
        }

        // Merge both arrays
        $listings = array_merge($drafts, $mapped_published);

        // Sort by CreatedAt DESC
        usort($listings, function($a, $b) {
            $timeA = strtotime($a['tsdCreatedAt']);
            $timeB = strtotime($b['tsdCreatedAt']);
            return $timeB - $timeA;
        });

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
        $tempId = isset($formdata['tsdTempSdID']) ? $formdata['tsdTempSdID'] : null;

        if (empty($tempId)) {
            return $this->_json_response(0, 'Draft ID is required.');
        }

        // Ensure it doesn't exist in the main table before deleting
        $exists = $this->db->get_where('seller_listings', ['tsdTempSdID' => $tempId])->row_array();
        if ($exists) {
            return $this->_json_response(0, 'Cannot delete this draft because it has already been submitted to the main table.');
        }

        $this->db->where('tsdTempSdID', $tempId);
        $this->db->delete('temp_seller_listings');

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
        $tempId = isset($formdata['tsdTempSdID']) ? $formdata['tsdTempSdID'] : null;

        if (empty($tempId)) {
            return $this->_json_response(0, 'Listing Temp ID is required.');
        }

        $listing = $this->db->get_where('temp_seller_listings', ['tsdTempSdID' => $tempId])->row_array();

        if ($listing) {
            return $this->_json_response(1, 'Listing details fetched successfully.', ['data' => $listing]);
        } else {
            return $this->_json_response(0, 'Listing not found.');
        }
    }
}
