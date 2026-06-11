<?php
defined('BASEPATH') or exit('No direct script access allowed');

class OpportunitiesAdmin extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->helper('url');
    }

    private function _json_response($status, $message, $data = [])
    {
        if ($status == 1) {
            $this->output->set_status_header(200);
        } else {
            $this->output->set_status_header(400);
        }

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'status' => $status,
                'message' => $message,
                'data' => $data
            ]));
    }

    /**
     * Helper to decode JSON safely
     */
    private function _safe_json_decode($json)
    {
        if (empty($json)) return [];
        $decoded = json_decode($json, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Get all opportunities (merging Drafts and Published)
     * URL: /api/admin/OpportunitiesAdmin/get_opportunities
     */
    public function get_opportunities()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $mainListings = $this->db->order_by('opUpdatedAt', 'DESC')->get('opportunities')->result_array();
        $drafts = $this->db->order_by('topUpdatedAt', 'DESC')->get('temp_opportunities')->result_array();

        // Fetch admin names for mapping
        $admins = $this->db->get('admin_master')->result_array();
        $adminMap = [];
        foreach ($admins as $admin) {
            $adminMap[$admin['id']] = $admin['name'] ?? $admin['username'];
        }

        $merged = [];
        $draftMap = [];
        
        foreach ($drafts as $draft) {
            if (!empty($draft['topMainId'])) {
                $draftMap[$draft['topMainId']] = $draft;
            } else {
                // Brand new draft
                $merged[] = [
                    'id' => 'TEMP-' . $draft['topId'],
                    'mainId' => null,
                    'tempId' => $draft['topId'],
                    'startupName' => $draft['topStartupName'],
                    'customUrl' => $draft['topCustomUrl'],
                    'startupLogo' => $draft['topStartupLogo'],
                    'startupDescription' => $draft['topStartupDescription'],
                    'founderInformation' => $draft['topFounderInformation'],
                    'sector' => $draft['topSector'],
                    'stage' => $draft['topStage'],
                    'indicativePriceRange' => $draft['topIndicativePriceRange'],
                    'instrumentType' => $draft['topInstrumentType'],
                    'website' => $draft['topWebsite'],
                    'linkedIn' => $draft['topLinkedIn'],
                    'newsArticles' => $this->_safe_json_decode($draft['topNewsArticles']),
                    'socialMediaLinks' => $this->_safe_json_decode($draft['topSocialMediaLinks']),
                    'status' => 'Draft',
                    'liveStatus' => null, // Not live yet
                    'createdBy' => isset($adminMap[$draft['topCreatedBy']]) ? $adminMap[$draft['topCreatedBy']] : $draft['topCreatedBy'],
                    'updatedAt' => $draft['topUpdatedAt']
                ];
            }
        }

        foreach ($mainListings as $main) {
            if (isset($draftMap[$main['opId']])) {
                // Edit of a live listing
                $draft = $draftMap[$main['opId']];
                $merged[] = [
                    'id' => $main['opId'],
                    'mainId' => $main['opId'],
                    'tempId' => $draft['topId'],
                    'startupName' => $draft['topStartupName'],
                    'customUrl' => $draft['topCustomUrl'],
                    'startupLogo' => $draft['topStartupLogo'],
                    'startupDescription' => $draft['topStartupDescription'],
                    'founderInformation' => $draft['topFounderInformation'],
                    'sector' => $draft['topSector'],
                    'stage' => $draft['topStage'],
                    'indicativePriceRange' => $draft['topIndicativePriceRange'],
                    'instrumentType' => $draft['topInstrumentType'],
                    'website' => $draft['topWebsite'],
                    'linkedIn' => $draft['topLinkedIn'],
                    'newsArticles' => $this->_safe_json_decode($draft['topNewsArticles']),
                    'socialMediaLinks' => $this->_safe_json_decode($draft['topSocialMediaLinks']),
                    'status' => 'Draft', // Currently being edited
                    'liveStatus' => $main['opStatus'], // Usually 'Publish'
                    'createdBy' => isset($adminMap[$draft['topCreatedBy'] ?: $main['opCreatedBy']]) ? $adminMap[$draft['topCreatedBy'] ?: $main['opCreatedBy']] : ($draft['topCreatedBy'] ?: $main['opCreatedBy']),
                    'updatedAt' => $draft['topUpdatedAt'],
                    'mainData' => [
                        'startupName' => $main['opStartupName'],
                        'customUrl' => $main['opCustomUrl'],
                        'startupLogo' => $main['opStartupLogo'],
                        'startupDescription' => $main['opStartupDescription'],
                        'founderInformation' => $main['opFounderInformation'],
                        'sector' => $main['opSector'],
                        'stage' => $main['opStage'],
                        'indicativePriceRange' => $main['opIndicativePriceRange'],
                        'instrumentType' => $main['opInstrumentType'],
                        'website' => $main['opWebsite'],
                        'linkedIn' => $main['opLinkedIn'],
                        'newsArticles' => $this->_safe_json_decode($main['opNewsArticles']),
                        'socialMediaLinks' => $this->_safe_json_decode($main['opSocialMediaLinks'])
                    ]
                ];
            } else {
                // Live listing with no active draft
                $merged[] = [
                    'id' => $main['opId'],
                    'mainId' => $main['opId'],
                    'tempId' => null,
                    'startupName' => $main['opStartupName'],
                    'customUrl' => $main['opCustomUrl'],
                    'startupLogo' => $main['opStartupLogo'],
                    'startupDescription' => $main['opStartupDescription'],
                    'founderInformation' => $main['opFounderInformation'],
                    'sector' => $main['opSector'],
                    'stage' => $main['opStage'],
                    'indicativePriceRange' => $main['opIndicativePriceRange'],
                    'instrumentType' => $main['opInstrumentType'],
                    'website' => $main['opWebsite'],
                    'linkedIn' => $main['opLinkedIn'],
                    'newsArticles' => $this->_safe_json_decode($main['opNewsArticles']),
                    'socialMediaLinks' => $this->_safe_json_decode($main['opSocialMediaLinks']),
                    'status' => $main['opStatus'],
                    'liveStatus' => $main['opStatus'],
                    'createdBy' => isset($adminMap[$main['opCreatedBy']]) ? $adminMap[$main['opCreatedBy']] : $main['opCreatedBy'],
                    'updatedAt' => $main['opUpdatedAt']
                ];
            }
        }

        // Sort merged array by updatedAt desc
        usort($merged, function($a, $b) {
            return strtotime($b['updatedAt']) - strtotime($a['updatedAt']);
        });

        return $this->_json_response(1, 'Opportunities fetched successfully.', $merged);
    }

    /**
     * Save Draft
     * URL: /api/admin/OpportunitiesAdmin/save_draft
     */
    public function save_draft()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);

        $tempId = isset($formdata['tempId']) ? $formdata['tempId'] : null;
        $mainId = isset($formdata['mainId']) ? $formdata['mainId'] : null;

        $data = [
            'topStartupName' => isset($formdata['startupName']) ? $formdata['startupName'] : '',
            'topCustomUrl' => isset($formdata['customUrl']) ? $formdata['customUrl'] : '',
            'topStartupLogo' => isset($formdata['startupLogo']) ? $formdata['startupLogo'] : null,
            'topStartupDescription' => isset($formdata['startupDescription']) ? $formdata['startupDescription'] : null,
            'topFounderInformation' => isset($formdata['founderInformation']) ? $formdata['founderInformation'] : null,
            'topSector' => isset($formdata['sector']) ? $formdata['sector'] : null,
            'topStage' => isset($formdata['stage']) ? $formdata['stage'] : null,
            'topIndicativePriceRange' => isset($formdata['indicativePriceRange']) ? $formdata['indicativePriceRange'] : null,
            'topInstrumentType' => isset($formdata['instrumentType']) ? $formdata['instrumentType'] : null,
            'topWebsite' => isset($formdata['website']) ? $formdata['website'] : null,
            'topLinkedIn' => isset($formdata['linkedIn']) ? $formdata['linkedIn'] : null,
            'topNewsArticles' => isset($formdata['newsArticles']) ? json_encode($formdata['newsArticles']) : null,
            'topSocialMediaLinks' => isset($formdata['socialMediaLinks']) ? json_encode($formdata['socialMediaLinks']) : null,
            'topStatus' => 'Draft',
        ];

        if (empty($data['topStartupName'])) {
            return $this->_json_response(0, 'Startup Name is required.');
        }

        if ($tempId) {
            // Update existing draft
            $this->db->where('topId', $tempId);
            $this->db->update('temp_opportunities', $data);
            $finalTempId = $tempId;
        } else {
            // Create new draft
            $data['topMainId'] = $mainId;
            $data['topCreatedBy'] = isset($formdata['adminId']) ? $formdata['adminId'] : null;
            $this->db->insert('temp_opportunities', $data);
            $finalTempId = $this->db->insert_id();
        }

        return $this->_json_response(1, 'Draft saved successfully.', ['tempId' => $finalTempId]);
    }

    /**
     * Publish Opportunity
     * URL: /api/admin/OpportunitiesAdmin/publish_opportunity
     */
    public function publish_opportunity()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $tempId = isset($formdata['tempId']) ? $formdata['tempId'] : null;
        $adminId = isset($formdata['adminId']) ? $formdata['adminId'] : null;

        if (!$tempId) {
            return $this->_json_response(0, 'Draft ID (tempId) is required to publish.');
        }

        // Fetch draft
        $draft = $this->db->get_where('temp_opportunities', ['topId' => $tempId])->row_array();
        if (!$draft) {
            return $this->_json_response(0, 'Draft not found.');
        }

        $mainData = [
            'opStartupName' => $draft['topStartupName'],
            'opCustomUrl' => $draft['topCustomUrl'],
            'opStartupLogo' => $draft['topStartupLogo'],
            'opStartupDescription' => $draft['topStartupDescription'],
            'opFounderInformation' => $draft['topFounderInformation'],
            'opSector' => $draft['topSector'],
            'opStage' => $draft['topStage'],
            'opIndicativePriceRange' => $draft['topIndicativePriceRange'],
            'opInstrumentType' => $draft['topInstrumentType'],
            'opWebsite' => $draft['topWebsite'],
            'opLinkedIn' => $draft['topLinkedIn'],
            'opNewsArticles' => $draft['topNewsArticles'],
            'opSocialMediaLinks' => $draft['topSocialMediaLinks'],
            'opStatus' => 'Publish'
        ];

        $mainId = $draft['topMainId'];

        if ($mainId) {
            // Update existing main listing
            $this->db->where('opId', $mainId);
            $this->db->update('opportunities', $mainData);
        } else {
            // Insert new main listing
            $mainData['opCreatedBy'] = $draft['topCreatedBy'] ?: $adminId;
            $this->db->insert('opportunities', $mainData);
            $mainId = $this->db->insert_id();
        }

        // Delete draft after publishing
        $this->db->where('topId', $tempId);
        $this->db->delete('temp_opportunities');

        return $this->_json_response(1, 'Opportunity published successfully.', ['mainId' => $mainId]);
    }

    /**
     * Update Status (Publish <-> Disable)
     * URL: /api/admin/OpportunitiesAdmin/update_status
     */
    public function update_status()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $mainId = isset($formdata['mainId']) ? $formdata['mainId'] : null;
        $status = isset($formdata['status']) ? $formdata['status'] : null;

        if (!$mainId || !in_array($status, ['Publish', 'Disable'])) {
            return $this->_json_response(0, 'Valid Main ID and Status are required.');
        }

        $this->db->where('opId', $mainId);
        $result = $this->db->update('opportunities', ['opStatus' => $status]);

        if ($result) {
            return $this->_json_response(1, 'Status updated successfully.');
        } else {
            return $this->_json_response(0, 'Failed to update status.');
        }
    }

    /**
     * Upload Logo
     * URL: /api/admin/OpportunitiesAdmin/upload_logo
     */
    public function upload_logo()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        if (isset($_FILES['file']['name']) && !empty($_FILES['file']['name'])) {
            $dir = FCPATH . "uploads/opportunities/";
            if (!is_dir($dir)) {
                @mkdir($dir, 0777, true);
            }

            $tmp_name = $_FILES['file']['tmp_name'];
            $temp_ext = explode(".", $_FILES['file']['name']);
            $new_filename = round(microtime(true)) . '.' . end($temp_ext);

            if (move_uploaded_file($tmp_name, $dir . $new_filename)) {
                return $this->_json_response(1, 'Logo uploaded successfully.', [
                    'filename' => $new_filename
                ]);
            } else {
                return $this->_json_response(0, 'Failed to move uploaded file.');
            }
        } else {
            return $this->_json_response(0, 'No file uploaded.');
        }
    }

    /**
     * Check if Custom URL is available
     * URL: /api/admin/OpportunitiesAdmin/check_url
     */
    public function check_url()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $url = isset($formdata['url']) ? trim($formdata['url']) : null;
        $tempIdToExclude = isset($formdata['tempId']) ? $formdata['tempId'] : null;
        $mainIdToExclude = isset($formdata['mainId']) ? $formdata['mainId'] : null;

        if (empty($url)) {
            return $this->_json_response(0, 'URL is required.');
        }

        // Check main opportunities table
        $this->db->where('opCustomUrl', $url);
        if ($mainIdToExclude) {
            $this->db->where('opId !=', $mainIdToExclude);
        }
        $mainCount = $this->db->count_all_results('opportunities');

        // Check temp opportunities table
        $this->db->where('topCustomUrl', $url);
        if ($tempIdToExclude) {
            $this->db->where('topId !=', $tempIdToExclude);
        }
        $tempCount = $this->db->count_all_results('temp_opportunities');

        if ($mainCount > 0 || $tempCount > 0) {
            return $this->_json_response(0, 'URL is already taken.');
        } else {
            return $this->_json_response(1, 'URL is available.');
        }
    }

    /**
     * Get Buyer Interests
     * URL: /api/admin/OpportunitiesAdmin/get_buyer_interests
     */
    public function get_buyer_interests()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        // Fetch buyer interests with join on opportunities
        $this->db->select('buyer_interests.*, opportunities.opStartupName as opportunityName');
        $this->db->from('buyer_interests');
        $this->db->join('opportunities', 'opportunities.opId = buyer_interests.opportunity_id', 'left');
        $this->db->order_by('buyer_interests.submitted_on', 'DESC');
        
        $interests = $this->db->get()->result_array();

        $result = [];
        foreach ($interests as $interest) {
            $result[] = [
                'id' => $interest['id'],
                'userId' => $interest['user_id'],
                'buyerName' => $interest['buyer_name'],
                'buyerEmail' => $interest['buyer_email'],
                'buyerMobile' => $interest['buyer_mobile'],
                'buyerPan' => $interest['buyer_pan'],
                'residentialStatus' => $interest['residential_status'],
                'opportunityName' => $interest['opportunityName'] ?: 'Unknown Opportunity',
                'interestType' => $interest['interest_type'],
                'interestValue' => $interest['interest_value'],
                'status' => $interest['status'],
                'submittedOn' => $interest['submitted_on']
            ];
        }

        return $this->_json_response(1, 'Buyer interests fetched successfully.', $result);
    }

    /**
     * Update Buyer Interest Status
     * URL: /api/admin/OpportunitiesAdmin/update_buyer_interest_status
     */
    public function update_buyer_interest_status()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $id = isset($formdata['id']) ? $formdata['id'] : null;
        $status = isset($formdata['status']) ? $formdata['status'] : null;

        if (!$id || !$status) {
            return $this->_json_response(0, 'ID and Status are required.');
        }

        $interest = $this->db->get_where('buyer_interests', ['id' => $id])->row_array();
        if (!$interest) {
            return $this->_json_response(0, 'Interest not found.');
        }
        $oldStatus = $interest['status'];

        $this->db->where('id', $id);
        $this->db->update('buyer_interests', ['status' => $status]);

        if ($this->db->affected_rows() >= 0) {
            $this->load->helper('notification_email');
            $opportunity = $this->db->get_where('opportunities', ['opId' => $interest['opportunity_id']])->row_array();
            $opportunityName = $opportunity ? $opportunity['opStartupName'] : 'Unknown Opportunity';
            
            $allowedStatuses = ['KYC Pending', 'Discussion Initiated', 'Cancelled'];
            if ($oldStatus !== $status && in_array($status, $allowedStatuses)) {
                notify_buyer_status_update($interest, $opportunityName, $oldStatus, $status);
            }

            return $this->_json_response(1, 'Status updated successfully.');
        } else {
            return $this->_json_response(0, 'Failed to update status.');
        }
    }
}
