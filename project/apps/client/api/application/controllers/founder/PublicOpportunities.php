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
        if (empty($json))
            return [];
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
                'founderImage' => $main['opFounderImage'],
                'founderName' => $main['opFounderName'],
                'founderLinkedIn' => $main['opFounderLinkedIn'],
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
            'founderImage' => $main['opFounderImage'],
            'founderName' => $main['opFounderName'],
            'founderLinkedIn' => $main['opFounderLinkedIn'],
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

        // The 'users' table only has an 'investor_id' column.
        $this->db->where('investor_id', $investorId);
        $user = $this->db->get('users')->row_array();

        if (!$user) {
            return $this->_json_response(0, 'User not found. Please log in.');
        }

        // Construct name
        $name = trim(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? ''));

        $this->db->where('user_id', $investorId);
        $this->db->where('opportunity_id', $opportunityId);
        $existing = $this->db->get('buyer_interests')->row_array();

        $historyEntry = [
            'type' => $interestType,
            'value' => $interestValue,
            'date' => date('Y-m-d H:i:s'),
            'action' => $existing ? ($existing['is_deleted'] == 1 ? 'Re-submitted' : 'Edited') : 'Submitted'
        ];

        if ($existing) {
            $history = !empty($existing['interest_history']) ? json_decode($existing['interest_history'], true) : [];
            if (!is_array($history)) {
                // Migrate old data if history was somehow broken/empty but old columns exist
                $history = [];
            }
            $history[] = $historyEntry;

            $updateData = [
                'interest_history' => json_encode($history),
                'is_deleted' => 0,
                'status' => 'Under Review'
            ];
            $this->db->where('id', $existing['id']);
            $this->db->update('buyer_interests', $updateData);
            $interestId = $existing['id'];
        } else {
            $insertData = [
                'user_id' => $investorId,
                'opportunity_id' => $opportunityId,
                'buyer_name' => $name,
                'buyer_email' => $user['email'] ?? null,
                'buyer_mobile' => $user['mobile'] ?? null,
                'buyer_pan' => $user['panno'] ?? null,
                'residential_status' => $user['nationality'] ?? null,
                'interest_history' => json_encode([$historyEntry]),
                'is_deleted' => 0,
                'status' => 'Under Review',
                'submitted_on' => date('Y-m-d H:i:s')
            ];
            $this->db->insert('buyer_interests', $insertData);
            $interestId = $this->db->insert_id();
        }

        if ($interestId) {
            // Trigger Admin Notification
            $this->load->helper('notification_email');
            $opportunity = $this->db->get_where('opportunities', ['opId' => $opportunityId])->row_array();
            $opportunityName = $opportunity ? $opportunity['opStartupName'] : 'Unknown Opportunity';

            // Re-fetch the updated/inserted data for email templates
            $emailData = $this->db->get_where('buyer_interests', ['id' => $interestId])->row_array();

            if ($existing) {
                notify_admin_buyer_interest_edited($emailData, $opportunityName, $interestType, $interestValue);
                notify_buyer_interest_edited($emailData, $opportunityName, $interestType, $interestValue);
            } else {
                notify_admin_buyer_interest($emailData, $opportunityName, $interestType, $interestValue);
                notify_buyer_interest_submitted($emailData, $opportunityName, $interestType, $interestValue);
            }

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

        $this->db->select('buyer_interests.*, opportunities.opStatus');
        $this->db->from('buyer_interests');
        $this->db->join('opportunities', 'opportunities.opId = buyer_interests.opportunity_id', 'left');
        $this->db->where('buyer_interests.opportunity_id', $opportunityId);
        $this->db->where('buyer_interests.user_id', $investorId);
        $interest = $this->db->get()->row_array();

        if ($interest) {
            $isDeleted = isset($interest['is_deleted']) && $interest['is_deleted'] == 1;

            // Extract the latest interest details from interest_history
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

            if ($isDeleted) {
                return $this->_json_response(1, 'No interest submitted yet (previously withdrawn).', [
                    'submitted' => false,
                    'interestType' => $currentType,
                    'interestValue' => $currentValue
                ]);
            }

            return $this->_json_response(1, 'Interest already submitted.', [
                'submitted' => true,
                'opStatus' => $interest['opStatus'],
                'interestType' => $currentType,
                'interestValue' => $currentValue,
                'status' => $interest['status']
            ]);
        } else {
            return $this->_json_response(1, 'No interest submitted yet.', ['submitted' => false]);
        }
    }

    /**
     * Withdraw/Delete a user's interest from an opportunity
     * URL: /api/founder/PublicOpportunities/withdraw_interest
     */
    public function withdraw_interest()
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
        $existing = $this->db->get('buyer_interests')->row_array();

        if ($existing) {
            $history = !empty($existing['interest_history']) ? json_decode($existing['interest_history'], true) : [];
            if (!is_array($history)) $history = [];
            
            $lastType = null;
            $lastValue = null;
            if (count($history) > 0) {
                $lastObj = end($history);
                $lastType = $lastObj['type'] ?? null;
                $lastValue = $lastObj['value'] ?? null;
            }

            $historyEntry = [
                'type' => $lastType,
                'value' => $lastValue,
                'date' => date('Y-m-d H:i:s'),
                'action' => 'Deleted'
            ];
            if (!is_array($history))
                $history = [];
            $history[] = $historyEntry;

            $updateData = [
                'is_deleted' => 1,
                'interest_history' => json_encode($history)
            ];

            $this->db->where('id', $existing['id']);
            if ($this->db->update('buyer_interests', $updateData)) {

                // Trigger Admin Notification
                $this->load->helper('notification_email');
                $opportunity = $this->db->get_where('opportunities', ['opId' => $opportunityId])->row_array();
                $opportunityName = $opportunity ? $opportunity['opStartupName'] : 'Unknown Opportunity';

                notify_admin_buyer_interest_withdrawn($existing, $opportunityName);
                notify_buyer_interest_withdrawn($existing, $opportunityName);

                return $this->_json_response(1, 'Interest successfully withdrawn.');
            } else {
                return $this->_json_response(0, 'Failed to withdraw interest.');
            }
        }

        return $this->_json_response(0, 'Interest not found.');
    }

    /**
     * Submit a request for a startup not listed
     * URL: /api/founder/PublicOpportunities/submit_startup_request
     */
    public function submit_startup_request()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Headers: access, Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }

        $formdata = json_decode(file_get_contents('php://input'), true);

        $userId = isset($formdata['userId']) ? $formdata['userId'] : null;
        $userType = isset($formdata['userType']) ? $formdata['userType'] : null;
        $startupName = isset($formdata['startupName']) ? $formdata['startupName'] : null;
        $requirements = isset($formdata['requirements']) ? $formdata['requirements'] : null;
        $investmentAmount = isset($formdata['investmentAmount']) ? $formdata['investmentAmount'] : null;

        if (!$userId || !$startupName) {
            return $this->_json_response(0, 'Missing required fields.');
        }

        $insertData = [
            'startup_name' => $startupName,
            'requirements' => $requirements,
            'investment_amount' => $investmentAmount,
            'created_at' => date('Y-m-d H:i:s')
        ];

        if ($userType === 'founder') {
            $insertData['founder_id'] = $userId;
        } else {
            $insertData['investor_id'] = $userId;
        }

        $this->db->insert('investor_startup_requests', $insertData);
        if ($this->db->insert_id()) {
            $this->load->helper('notification_email');

            // The 'users' table only has an 'investor_id' column, which acts as the universal user ID.
            $user = $this->db->get_where('users', ['investor_id' => $userId])->row_array();
            $userName = trim(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? ''));

            notify_admin_startup_request($insertData, $userName, $user['email'] ?? 'N/A');

            return $this->_json_response(1, 'Startup request submitted successfully.');
        } else {
            return $this->_json_response(0, 'Failed to submit request.');
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
            
            $isDeleted = isset($interest['is_deleted']) && $interest['is_deleted'] == 1;
            $isEdited = (count($history) > 1);

            $result[] = [
                'id' => $interest['id'],
                'opportunityName' => $interest['opportunityName'] ?: 'Unknown Opportunity',
                'opStatus' => $interest['opStatus'],
                'interestType' => $currentType,
                'interestValue' => $currentValue,
                'status' => $interest['status'],
                'submittedOn' => $interest['submitted_on'],
                'isDeleted' => $isDeleted,
                'isEdited' => $isEdited,
                'interestHistory' => $history
            ];
        }

        return $this->_json_response(1, 'My interests fetched successfully.', $result);
    }
}
