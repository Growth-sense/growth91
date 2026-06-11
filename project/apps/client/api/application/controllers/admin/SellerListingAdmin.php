<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SellerListingAdmin extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        date_default_timezone_set('Asia/Kolkata');
    }

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
     * Get all seller listings for admin
     */
    public function get_listings()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $this->db->where('sdStatus !=', 'Draft');
        $this->db->order_by('sdPublishedAt', 'DESC');
        $listings = $this->db->get('seller_listings')->result_array();

        // Also fetch admins for assignment mapping (assuming you have an admin table, if not we just return names)
        // Here we just return listings. We can add a list of admins if needed.

        return $this->_json_response(1, 'Listings fetched successfully.', ['data' => $listings]);
    }

    /**
     * Update listing status
     */
    public function update_status()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $sdId = isset($formdata['sdSdID']) ? $formdata['sdSdID'] : null;
        $status = isset($formdata['sdStatus']) ? $formdata['sdStatus'] : null;
        $adminId = isset($formdata['adminId']) ? $formdata['adminId'] : null;
        $additionalInfo = isset($formdata['sdAdditionalInfoReqText']) ? $formdata['sdAdditionalInfoReqText'] : null;

        if (empty($sdId) || empty($status)) {
            return $this->_json_response(0, 'Listing ID and Status are required.');
        }

        $updateData = [
            'sdStatus' => $status
        ];

        if ($status === 'Additional Information Required' && $additionalInfo !== null) {
            $updateData['sdAdditionalInfoReqText'] = $additionalInfo;
        }

        // Capture admin who changed status
        if (!empty($adminId)) {
            $adminRow = $this->db->get_where('admin_master', ['id' => $adminId])->row_array();
            if ($adminRow && isset($adminRow['username'])) {
                $updateData['sdAssignedToName'] = $adminRow['username'];
            }
        }

        $this->db->where('sdSdID', $sdId);
        $result = $this->db->update('seller_listings', $updateData);
        
        if ($result) {
            $this->load->helper('notification_email');
            $listing = $this->db->get_where('seller_listings', ['sdSdID' => $sdId])->row_array();
            if ($listing) {
                $adminName = isset($updateData['sdAssignedToName']) ? $updateData['sdAssignedToName'] : 'Admin';
                
                // Admin ALWAYS gets notified of status escalation
                notify_admin_status_escalation($listing, $status, $additionalInfo, $adminName);
                
                // Seller only gets notified if status is NOT On Hold
                if ($status !== 'On Hold') {
                    notify_seller_status_update($listing, $status, $additionalInfo);
                }
            }
            return $this->_json_response(1, 'Status updated successfully.');
        } else {
            return $this->_json_response(0, 'Failed to update status.');
        }
    }

    /**
     * Update admin comment
     */
    public function update_comment()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $sdID = isset($formdata['sdSdID']) ? $formdata['sdSdID'] : null;
        $comment = isset($formdata['sdAdminComment']) ? $formdata['sdAdminComment'] : '';
        $adminId = isset($formdata['adminId']) ? $formdata['adminId'] : null;

        if (empty($sdID)) {
            return $this->_json_response(0, 'Listing ID is required.');
        }

        $updateData = ['sdAdminComment' => $comment];
        
        // Capture admin who commented
        if (!empty($adminId)) {
            $adminRow = $this->db->get_where('admin_master', ['id' => $adminId])->row_array();
            if ($adminRow && isset($adminRow['username'])) {
                $updateData['sdAssignedToName'] = $adminRow['username'];
            }
        }

        $this->db->where('sdSdID', $sdID);
        $result = $this->db->update('seller_listings', $updateData);

        if ($result) {
            return $this->_json_response(1, 'Comment updated successfully.');
        } else {
            return $this->_json_response(0, 'Failed to update comment.');
        }
    }

    /**
     * Assign admin
     */
    public function assign_admin()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $formdata = json_decode(file_get_contents('php://input'), true);
        $sdID = isset($formdata['sdSdID']) ? $formdata['sdSdID'] : null;
        $assignedTo = isset($formdata['sdAssignedTo']) ? $formdata['sdAssignedTo'] : null;
        $assignedToName = isset($formdata['sdAssignedToName']) ? $formdata['sdAssignedToName'] : null;

        if (empty($sdID)) {
            return $this->_json_response(0, 'Listing ID is required.');
        }

        $this->db->where('sdSdID', $sdID);
        $result = $this->db->update('seller_listings', [
            'sdAssignedTo' => $assignedTo,
            'sdAssignedToName' => $assignedToName
        ]);

        if ($result) {
            return $this->_json_response(1, 'Admin assigned successfully.');
        } else {
            return $this->_json_response(0, 'Failed to assign admin.');
        }
    }
}
