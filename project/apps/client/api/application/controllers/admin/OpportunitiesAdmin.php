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
                    'founderImage' => $draft['topFounderImage'],
                    'founderLinkedIn' => $draft['topFounderLinkedIn'],
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
                    'founderImage' => $draft['topFounderImage'],
                    'founderLinkedIn' => $draft['topFounderLinkedIn'],
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
                        'founderImage' => $main['opFounderImage'],
                        'founderLinkedIn' => $main['opFounderLinkedIn'],
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
                    'founderImage' => $main['opFounderImage'],
                    'founderLinkedIn' => $main['opFounderLinkedIn'],
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
            'topFounderImage' => isset($formdata['founderImage']) ? $formdata['founderImage'] : null,
            'topFounderLinkedIn' => isset($formdata['founderLinkedIn']) ? $formdata['founderLinkedIn'] : null,
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
            'opFounderImage' => $draft['topFounderImage'],
            'opFounderLinkedIn' => $draft['topFounderLinkedIn'],
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
            $history = [];
            $currentType = null;
            $currentValue = null;

            if (!empty($interest['interest_history'])) {
                $history = json_decode($interest['interest_history'], true);
                if (is_array($history) && count($history) > 0) {
                    $latest = end($history);
                    $currentType = $latest['type'];
                    $currentValue = $latest['value'];
                }
            }

            $isDeleted = isset($interest['is_deleted']) && $interest['is_deleted'] == 1;
            
            // Determine display status based on Event Sourcing rules
            $isDeleted = isset($interest['is_deleted']) && $interest['is_deleted'] == 1;
            $isEdited = (count($history) > 1);

            $result[] = [
                'id' => $interest['id'],
                'userId' => $interest['user_id'],
                'buyerName' => $interest['buyer_name'],
                'buyerEmail' => $interest['buyer_email'],
                'buyerMobile' => $interest['buyer_mobile'],
                'buyerPan' => $interest['buyer_pan'],
                'residentialStatus' => $interest['residential_status'],
                'opportunityName' => $interest['opportunityName'] ?: 'Unknown Opportunity',
                'interestType' => $currentType,
                'interestValue' => $currentValue,
                'status' => $interest['status'], // True status
                'submittedOn' => $interest['submitted_on'],
                'isDeleted' => $isDeleted,
                'isEdited' => $isEdited,
                'interestHistory' => $history
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
    /**
     * Get Startup Discovery Requests
     * URL: /api/admin/OpportunitiesAdmin/get_startup_requests
     */
    public function get_startup_requests()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        // Fetch requests and join with users to get name and email
        $this->db->select('investor_startup_requests.*, 
            u1.first_name as inv_first_name, u1.last_name as inv_last_name, u1.email as inv_email, u1.mobile as inv_mobile,
            u2.first_name as fou_first_name, u2.last_name as fou_last_name, u2.email as fou_email, u2.mobile as fou_mobile');
        $this->db->from('investor_startup_requests');
        $this->db->join('users u1', 'u1.investor_id = investor_startup_requests.investor_id', 'left');
        $this->db->join('users u2', 'u2.investor_id = investor_startup_requests.founder_id', 'left');
        $this->db->order_by('investor_startup_requests.created_at', 'DESC');
        
        $requests = $this->db->get()->result_array();

        $result = [];
        foreach ($requests as $req) {
            $userRole = 'Unknown';
            $userName = 'Unknown';
            $userEmail = '';
            $userMobile = '';

            if (!empty($req['investor_id'])) {
                $userRole = 'Investor';
                $userName = trim(($req['inv_first_name'] ?? '') . ' ' . ($req['inv_last_name'] ?? ''));
                $userEmail = $req['inv_email'];
                $userMobile = $req['inv_mobile'];
            } elseif (!empty($req['founder_id'])) {
                $userRole = 'Founder';
                $userName = trim(($req['fou_first_name'] ?? '') . ' ' . ($req['fou_last_name'] ?? ''));
                $userEmail = $req['fou_email'];
                $userMobile = $req['fou_mobile'];
            }

            $result[] = [
                'id' => $req['id'],
                'userRole' => $userRole,
                'userName' => $userName,
                'userEmail' => $userEmail,
                'userMobile' => $userMobile,
                'startupName' => $req['startup_name'],
                'requirements' => $req['requirements'],
                'investmentAmount' => $req['investment_amount'],
                'createdAt' => $req['created_at']
            ];
        }

        return $this->_json_response(1, 'Requests fetched successfully.', $result);
    }

    /**
     * Get System Settings
     * URL: /api/admin/OpportunitiesAdmin/get_system_settings
     */
    public function get_system_settings()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $settings = $this->db->get('system_settings')->result_array();
        $result = [];
        foreach ($settings as $setting) {
            $result[$setting['setting_key']] = json_decode($setting['setting_value'], true);
        }

        return $this->_json_response(1, 'Settings fetched successfully.', $result);
    }

    /**
     * Update System Setting
     * URL: /api/admin/OpportunitiesAdmin/update_system_setting
     */
    public function update_system_setting()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $key = isset($formdata['setting_key']) ? $formdata['setting_key'] : null;
        $value = isset($formdata['setting_value']) ? $formdata['setting_value'] : null;

        if (!$key || !is_array($value)) {
            return $this->_json_response(0, 'Valid Setting Key and JSON array Value are required.');
        }

        $jsonValue = json_encode($value);

        // Check if exists
        $exists = $this->db->get_where('system_settings', ['setting_key' => $key])->row_array();

        if ($exists) {
            // Find if any items are being deleted
            $oldValue = json_decode($exists['setting_value'], true);
            $deletedItems = array_diff($oldValue, $value);

            if (!empty($deletedItems)) {
                foreach ($deletedItems as $item) {
                    if ($key === 'opportunity_sectors') {
                        $this->db->where('opSector', $item);
                        $count = $this->db->count_all_results('opportunities');
                        if ($count > 0) {
                            return $this->_json_response(0, "Cannot remove '$item' because it is currently assigned to one or more active opportunities.");
                        }
                    } else if ($key === 'opportunity_instruments') {
                        $this->db->where('opInstrumentType', $item);
                        $count = $this->db->count_all_results('opportunities');
                        if ($count > 0) {
                            return $this->_json_response(0, "Cannot remove '$item' because it is currently assigned to one or more active opportunities.");
                        }
                    }
                }
            }

            $this->db->where('setting_key', $key);
            $this->db->update('system_settings', ['setting_value' => $jsonValue]);
        } else {
            $this->db->insert('system_settings', ['setting_key' => $key, 'setting_value' => $jsonValue]);
        }

        return $this->_json_response(1, 'Setting updated successfully.');
    }
}
