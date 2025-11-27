<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Roles extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('AdminRole_model');
        header("Content-Type: application/json; charset=UTF-8");
    }

    public function getRole()
    {
        $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
        if (empty($adminId)) {
            echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
        }

        // Only super_admin can manage roles
        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if (!$admin || (int)$admin->is_super_admin !== 1) {
            echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
        }

        $roleId = $this->input->get('role_id', TRUE);
        if (empty($roleId)) {
            echo json_encode(['status' => '0', 'message' => 'role_id required']); return;
        }

        $role = $this->db->get_where('admin_roles_master', ['id' => $roleId])->row();
        if (!$role) {
            echo json_encode(['status' => '0', 'message' => 'Role not found']); return;
        }

        echo json_encode([
            'status'  => '1',
            'message' => 'Role loaded',
            'data'    => [
                'id'               => $role->id,
                'name'             => $role->name,
                'display_name'     => $role->display_name,
                'permissions_json' => $role->permissions_json,
            ],
        ]);
    }

    public function updatePermissions()
    {
        $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
        if (empty($adminId)) {
            echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
        }

        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if (!$admin || (int)$admin->is_super_admin !== 1) {
            echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        if (empty($formdata['role_id']) || !isset($formdata['permissions_json'])) {
            echo json_encode(['status' => '0', 'message' => 'role_id and permissions_json required']); return;
        }

        $roleId    = (int)$formdata['role_id'];
        $permsJson = $formdata['permissions_json'];

        json_decode($permsJson);
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(['status' => '0', 'message' => 'Invalid JSON']); return;
        }

        $this->db->where('id', $roleId);
        $ok = $this->db->update('admin_roles_master', [
            'permissions_json' => $permsJson,
        ]);

        if ($ok) {
            echo json_encode(['status' => '1', 'message' => 'Permissions updated']);
        } else {
            echo json_encode(['status' => '0', 'message' => 'Update failed']);
        }
    }

    // GET /api/admin/Roles/listRoles
    public function listRoles()
    {
        $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
        if (empty($adminId)) {
            echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
        }

        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if (!$admin || (int)$admin->is_super_admin !== 1) {
            echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
        }

        $roles = $this->db
            ->select('id, name, display_name, permissions_json')
            ->from('admin_roles_master')
            ->order_by('id', 'ASC')
            ->get()
            ->result_array();

        echo json_encode(['status' => '1', 'message' => 'Roles list', 'data' => $roles]);
    }

    // POST /api/admin/Roles/create
    public function create()
    {
        $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
        if (empty($adminId)) {
            echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
        }

        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if (!$admin || (int)$admin->is_super_admin !== 1) {
            echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $name         = isset($formdata['name']) ? trim($formdata['name']) : '';
        $display_name = isset($formdata['display_name']) ? trim($formdata['display_name']) : '';

        if ($name === '' || $display_name === '') {
            echo json_encode(['status' => '0', 'message' => 'name and display_name required']); return;
        }

        $existing = $this->db->get_where('admin_roles_master', ['name' => $name])->row();
        if ($existing) {
            echo json_encode(['status' => '0', 'message' => 'Role name already exists']); return;
        }

        $data = [
            'name'             => $name,
            'display_name'     => $display_name,
            'permissions_json' => '{}',
        ];

        $ok = $this->db->insert('admin_roles_master', $data);
        if (!$ok) {
            echo json_encode(['status' => '0', 'message' => 'Insert failed']); return;
        }

        $data['id'] = $this->db->insert_id();
        echo json_encode(['status' => '1', 'message' => 'Role created', 'data' => $data]);
    }

    // POST /api/admin/Roles/delete
    public function delete()
    {
        $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
        if (empty($adminId)) {
            echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
        }

        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if (!$admin || (int)$admin->is_super_admin !== 1) {
            echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
        }

        $formdata = json_decode(file_get_contents('php://input'), true);
        $roleId   = isset($formdata['role_id']) ? (int)$formdata['role_id'] : 0;
        if ($roleId <= 0) {
            echo json_encode(['status' => '0', 'message' => 'role_id required']); return;
        }

        $role = $this->db->get_where('admin_roles_master', ['id' => $roleId])->row();
        if (!$role) {
            echo json_encode(['status' => '0', 'message' => 'Role not found']); return;
        }
        if ($role->name === 'super_admin') {
            echo json_encode(['status' => '0', 'message' => 'Cannot delete super_admin role']); return;
        }

        $this->db->where('role_id', $roleId)->delete('admin_user_roles');
        $this->db->where('id', $roleId)->delete('admin_roles_master');

        echo json_encode(['status' => '1', 'message' => 'Role deleted']);
    }

    // GET /api/admin/Roles/listUsers
    public function listUsers()
    {
        $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
        if (empty($adminId)) {
            echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
        }

        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if (!$admin || (int)$admin->is_super_admin !== 1) {
            echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
        }

        $users = $this->db
            ->select('id, username, is_super_admin')
            ->from('admin_master')
            ->order_by('id', 'ASC')
            ->get()
            ->result_array();

        echo json_encode(['status' => '1', 'message' => 'Users list', 'data' => $users]);
    }

    // GET /api/admin/Roles/getUserRoles?admin_id=5
    public function getUserRoles()
    {
        $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
        if (empty($adminId)) {
            echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
        }

        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if (!$admin || (int)$admin->is_super_admin !== 1) {
            echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
        }

        $userId = (int)$this->input->get('admin_id', TRUE);
        if ($userId <= 0) {
            echo json_encode(['status' => '0', 'message' => 'admin_id required']); return;
        }

        $rows = $this->db
            ->select('role_id')
            ->from('admin_user_roles')
            ->where('admin_id', $userId)
            ->get()
            ->result_array();

        $roleIds = array_map(function ($r) { return (int)$r['role_id']; }, $rows);

        echo json_encode([
            'status'  => '1',
            'message' => 'User roles',
            'data'    => $roleIds,
        ]);
    }

    // POST /api/admin/Roles/updateUserRoles
   // POST /api/admin/Roles/updateUserRoles
public function updateUserRoles()
{
    // 1) Auth: only Super Admin (caller) can update user roles
    $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
    if (empty($adminId)) {
        echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
    }

    $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
    if (!$admin || (int)$admin->is_super_admin !== 1) {
        echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
    }

    // 2) Read payload
    $formdata = json_decode(file_get_contents('php://input'), true);
    $userId   = isset($formdata['admin_id']) ? (int)$formdata['admin_id'] : 0;
    $roleIds  = isset($formdata['role_ids']) && is_array($formdata['role_ids'])
        ? $formdata['role_ids']
        : [];

    if ($userId <= 0) {
        echo json_encode(['status' => '0', 'message' => 'admin_id required']); return;
    }

    // 3) Normalize role IDs to integers
    $normalizedRoleIds = [];
    foreach ($roleIds as $rid) {
        $rid = (int)$rid;
        if ($rid > 0) {
            $normalizedRoleIds[] = $rid;
        }
    }

    // 4) Replace rows in admin_user_roles
    $this->db->where('admin_id', $userId)->delete('admin_user_roles');

    foreach ($normalizedRoleIds as $rid) {
        $this->db->insert('admin_user_roles', [
            'admin_id' => $userId,
            'role_id'  => $rid,
        ]);
    }

    // 5) Sync admin_master.is_super_admin based on presence of 'super_admin' role
    //    - Look up super_admin role id
    $superRole = $this->db
        ->select('id')
        ->from('admin_roles_master')
        ->where('name', 'super_admin')
        ->get()
        ->row();

    $superId = $superRole ? (int)$superRole->id : null;
    $isSuperAdmin = 0;

    if ($superId) {
        // if submitted role_ids contain the super_admin role, set flag = 1
        $isSuperAdmin = in_array($superId, $normalizedRoleIds, true) ? 1 : 0;

        $this->db->where('id', $userId)
                 ->update('admin_master', ['is_super_admin' => $isSuperAdmin]);
    }

    echo json_encode(['status' => '1', 'message' => 'User roles updated']);
}

    // GET /api/admin/Roles/myPermissions
    public function myPermissions()
    {
        $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
        if (empty($adminId)) {
            echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
        }

        $perms = $this->AdminRole_model->getEffectivePermissions($adminId);

        echo json_encode([
            'status'  => '1',
            'message' => 'Permissions loaded',
            'data'    => $perms,
        ]);
    }


// POST /api/admin/Roles/createAdminUser
public function createAdminUser()
{
    // Only Super Admin can create admin users
    $adminId = $this->input->get_request_header('X-Admin-Id', TRUE);
    if (empty($adminId)) {
        echo json_encode(['status' => '0', 'message' => 'Admin ID required']); return;
    }

    $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
    if (!$admin || (int)$admin->is_super_admin !== 1) {
        echo json_encode(['status' => '0', 'message' => 'Unauthorized']); return;
    }

    // Read JSON body: { username, password, role_id }
    $formdata = json_decode(file_get_contents('php://input'), true);

    $username = isset($formdata['username']) ? trim($formdata['username']) : '';
    $password = isset($formdata['password']) ? $formdata['password'] : '';
    $roleId   = isset($formdata['role_id']) ? (int)$formdata['role_id'] : 0;

    if ($username === '' || $password === '') {
        echo json_encode(['status' => '0', 'message' => 'username and password are required']); return;
    }
    if ($roleId <= 0) {
        echo json_encode(['status' => '0', 'message' => 'role_id is required']); return;
    }

    // Check username uniqueness
    $exists = $this->db->get_where('admin_master', ['username' => $username])->row();
    if ($exists) {
        echo json_encode(['status' => '0', 'message' => 'Username already exists']); return;
    }

    // Verify role exists
    $role = $this->db->get_where('admin_roles_master', ['id' => $roleId])->row();
    if (!$role) {
        echo json_encode(['status' => '0', 'message' => 'Invalid role_id']); return;
    }

    // Determine super admin flag from role name
    $isSuperAdmin = ($role->name === 'super_admin') ? 1 : 0;

    // Match existing admin login hashing (Admin::signin uses md5)
    $hashedPassword = md5($password);

    // Insert into admin_master
    $adminInsert = [
        'username'        => $username,
        'password'        => $hashedPassword,
        'is_super_admin'  => $isSuperAdmin,
        'failAttempt'     => 0,
        'blocked'         => 0,
        'permissions_json'=> '',
    ];

    $this->db->insert('admin_master', $adminInsert);

    // Check insert result
    if ($this->db->affected_rows() <= 0) {
        $err = $this->db->error();
        $msg = !empty($err['message']) ? $err['message'] : 'Failed to create admin user';
        echo json_encode(['status' => '0', 'message' => $msg]);
        return;
    }

    // Always re-fetch the new admin by username to get its id
    $row = $this->db->get_where('admin_master', ['username' => $username])->row();
    if (!$row) {
        echo json_encode(['status' => '0', 'message' => 'Failed to load created admin user']); 
        return;
    }

    $newAdminId = (int)$row->id;

    // Insert into admin_user_roles
    $this->db->insert('admin_user_roles', [
        'admin_id' => $newAdminId,
        'role_id'  => $roleId,
    ]);

    echo json_encode([
        'status'  => '1',
        'message' => 'Admin user created',
        'data'    => [
            'id'            => $newAdminId,
            'username'      => $username,
            'is_super_admin'=> $isSuperAdmin,
            'role_id'       => $roleId,
        ],
    ]);
}
}