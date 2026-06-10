<?php
defined('BASEPATH') or exit('No direct script access allowed');

class PublicOpportunities extends CI_Controller
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
     * Get all published opportunities for the public listing page
     * URL: /api/founder/PublicOpportunities/get_published_opportunities
     */
    public function get_published_opportunities()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        // Only fetch published opportunities
        $this->db->where('opStatus', 'Publish');
        $this->db->order_by('opUpdatedAt', 'DESC');
        $listings = $this->db->get('opportunities')->result_array();

        $result = [];
        foreach ($listings as $main) {
            $result[] = [
                'id' => $main['opId'],
                'customUrl' => $main['opCustomUrl'],
                'startupName' => $main['opStartupName'],
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
                'updatedAt' => $main['opUpdatedAt']
            ];
        }

        return $this->_json_response(1, 'Opportunities fetched successfully.', $result);
    }

    /**
     * Get details for a specific published opportunity
     * URL: /api/founder/PublicOpportunities/get_opportunity_details
     */
    public function get_opportunity_details()
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

        if (!$id) {
            return $this->_json_response(0, 'Opportunity ID is required.');
        }

        if (is_numeric($id)) {
            $this->db->where('opId', $id);
        } else {
            $this->db->where('opCustomUrl', $id);
        }
        $this->db->where('opStatus', 'Publish');
        $main = $this->db->get('opportunities')->row_array();

        if (!$main) {
            return $this->_json_response(0, 'Opportunity not found or not published.');
        }

        $result = [
            'id' => $main['opId'],
            'customUrl' => $main['opCustomUrl'],
            'startupName' => $main['opStartupName'],
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
            'updatedAt' => $main['opUpdatedAt']
        ];

        return $this->_json_response(1, 'Opportunity details fetched successfully.', $result);
    }

    /**
     * Submit buyer interest for an opportunity
     * URL: /api/founder/PublicOpportunities/submit_interest
     */
    public function submit_interest()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        
        $opportunityId = isset($formdata['opportunityId']) ? $formdata['opportunityId'] : null;
        $investorId = isset($formdata['investorId']) ? $formdata['investorId'] : null;
        $interestType = isset($formdata['interestType']) ? $formdata['interestType'] : null;
        $interestValue = isset($formdata['interestValue']) ? $formdata['interestValue'] : null;

        if (!$opportunityId || !$investorId || !$interestType || !$interestValue) {
            return $this->_json_response(0, 'Missing required fields.');
        }

        // Fetch user details from users table
        $this->db->where('investor_id', $investorId);
        $user = $this->db->get('users')->row_array();

        if (!$user) {
            return $this->_json_response(0, 'User not found. Please log in.');
        }

        // Construct name
        $name = trim(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? ''));

        $insertData = [
            'user_id' => $investorId,
            'opportunity_id' => $opportunityId,
            'buyer_name' => $name,
            'buyer_email' => $user['email'] ?? null,
            'buyer_mobile' => $user['mobile'] ?? null,
            'buyer_pan' => $user['panno'] ?? null,
            'residential_status' => $user['nationality'] ?? null,
            'interest_type' => $interestType,
            'interest_value' => $interestValue,
            'status' => 'Under Review',
            'submitted_on' => date('Y-m-d H:i:s')
        ];

        $this->db->insert('buyer_interests', $insertData);
        if ($this->db->insert_id()) {
            return $this->_json_response(1, 'Interest submitted successfully.');
        } else {
            return $this->_json_response(0, 'Failed to submit interest.');
        }
    }

    /**
     * Check if user has already submitted interest for an opportunity
     * URL: /api/founder/PublicOpportunities/check_user_interest
     */
    public function check_user_interest()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $opportunityId = isset($formdata['opportunityId']) ? $formdata['opportunityId'] : null;
        $investorId = isset($formdata['investorId']) ? $formdata['investorId'] : null;

        if (!$opportunityId || !$investorId) {
            return $this->_json_response(0, 'Missing required fields.');
        }

        $this->db->where('opportunity_id', $opportunityId);
        $this->db->where('user_id', $investorId);
        $interest = $this->db->get('buyer_interests')->row_array();

        if ($interest) {
            return $this->_json_response(1, 'Interest already submitted.', ['submitted' => true, 'status' => $interest['status']]);
        } else {
            return $this->_json_response(1, 'No interest submitted yet.', ['submitted' => false]);
        }
    }

    /**
     * Get user's submitted interests
     * URL: /api/founder/PublicOpportunities/get_my_interests
     */
    public function get_my_interests()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $investorId = isset($formdata['investorId']) ? $formdata['investorId'] : null;

        if (!$investorId) {
            return $this->_json_response(0, 'User ID is required.');
        }

        $this->db->select('buyer_interests.*, opportunities.opStartupName as opportunityName, opportunities.opStatus');
        $this->db->from('buyer_interests');
        $this->db->join('opportunities', 'opportunities.opId = buyer_interests.opportunity_id', 'left');
        $this->db->where('buyer_interests.user_id', $investorId);
        $this->db->order_by('buyer_interests.submitted_on', 'DESC');
        
        $interests = $this->db->get()->result_array();

        $result = [];
        foreach ($interests as $interest) {
            $result[] = [
                'id' => $interest['id'],
                'opportunityName' => $interest['opportunityName'] ?: 'Unknown Opportunity',
                'opStatus' => $interest['opStatus'],
                'interestType' => $interest['interest_type'],
                'interestValue' => $interest['interest_value'],
                'status' => $interest['status'],
                'submittedOn' => $interest['submitted_on']
            ];
        }

        return $this->_json_response(1, 'My interests fetched successfully.', $result);
    }
}
