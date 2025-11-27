<?php
class AdminRole_model extends CI_Model
{
    public function getEffectivePermissions($adminId)
    {
        // 1) Get roles for this admin
        $roles = $this->db
            ->select('arm.permissions_json')
            ->from('admin_user_roles aur')
            ->join('admin_roles_master arm', 'arm.id = aur.role_id')
            ->where('aur.admin_id', $adminId)
            ->get()
            ->result();

        $merged = [];

        foreach ($roles as $role) {
            $perm = json_decode($role->permissions_json, true) ?: [];
            $merged = array_replace_recursive($merged, $perm);
        }

        // 2) Optional: per-admin overrides from admin_master.permissions_json
        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if ($admin && !empty($admin->permissions_json)) {
            $over = json_decode($admin->permissions_json, true) ?: [];
            $merged = array_replace_recursive($merged, $over);
        }

        return $merged;
    }

    public function hasPermission($adminId, $module, $action)
    {
        // Super admin shortcut
        $admin = $this->db->get_where('admin_master', ['id' => $adminId])->row();
        if ($admin && (int)$admin->is_super_admin === 1) {
            return true;
        }

        $perms = $this->getEffectivePermissions($adminId);
        return !empty($perms[$module][$action]) && $perms[$module][$action] === true;
    }
}
