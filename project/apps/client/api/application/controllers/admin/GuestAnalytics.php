<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class GuestAnalytics extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        header("Content-Type: application/json; charset=UTF-8");
    }

    // GET /api/admin/GuestAnalytics/summary?from_date=YYYY-MM-DD&to_date=YYYY-MM-DD
    public function summary()
    {
        $from_date = $this->input->get('from_date', TRUE);
        $to_date   = $this->input->get('to_date', TRUE);

        if (!$from_date || !$to_date) {
            echo json_encode([
                'status'  => '0',
                'message' => 'from_date and to_date are required'
            ]);
            return;
        }

        // Normalise to full day range
        $from_dt = $from_date . ' 00:00:00';
        $to_dt   = $to_date   . ' 23:59:59';

        // Metrics
        $metrics = [];

        // guest_started
        $this->db->from('guest_analytics');
        $this->db->where('gaEventType', 'guest_started');
        $this->db->where('gaEventDate >=', $from_dt);
        $this->db->where('gaEventDate <=', $to_dt);
        $metrics['guest_started'] = (int)$this->db->count_all_results();

        // guest_attempt_gated_action
        $this->db->from('guest_analytics');
        $this->db->where('gaEventType', 'guest_attempt_gated_action');
        $this->db->where('gaEventDate >=', $from_dt);
        $this->db->where('gaEventDate <=', $to_dt);
        $metrics['guest_attempt_gated_action'] = (int)$this->db->count_all_results();

        // guest_upgraded_to_user
        $this->db->from('guest_analytics');
        $this->db->where('gaEventType', 'guest_upgraded_to_user');
        $this->db->where('gaEventDate >=', $from_dt);
        $this->db->where('gaEventDate <=', $to_dt);
        $metrics['guest_upgraded_to_user'] = (int)$this->db->count_all_results();

        // Aggregated "I'm interested" counts per unicorn
        $this->db->select('gaUnicornDealID AS unicorn_id, COUNT(*) AS interest_count');
        $this->db->from('guest_analytics');
        $this->db->where('gaEventType', 'guest_attempt_gated_action');
        $this->db->where('gaEventDate >=', $from_dt);
        $this->db->where('gaEventDate <=', $to_dt);
        $this->db->where('gaUnicornDealID IS NOT NULL', null, false);
        $this->db->group_by('gaUnicornDealID');
        $unicornInterest = $this->db->get()->result_array();

        echo json_encode([
            'status'  => '1',
            'message' => 'Guest analytics summary',
            'data'    => [
                'metrics' => $metrics,
                'unicorn_interest' => $unicornInterest,
            ],
        ]);
    }
}