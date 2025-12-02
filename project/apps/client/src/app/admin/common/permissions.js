import axios from "axios";
import featureFlags from "../../../config/featureFlags";

let cachedPerms = null;
let permsPromise = null;

async function fetchAllPermissions(adminId) {
  if (cachedPerms) return cachedPerms;
  if (permsPromise) return permsPromise;

  permsPromise = (async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/myPermissions`,
        {
          headers: { "X-Admin-Id": adminId },
        }
      );

      if (res.data && res.data.status === "1") {
        cachedPerms = res.data.data || {};
      } else {
        cachedPerms = {};
      }
    } catch (e) {
      console.error("Error loading myPermissions in permissions.js", e);
      cachedPerms = {};
    }

    return cachedPerms;
  })();

  return permsPromise;
}

function fullAccessPermissions() {
  return {
    canView: true,
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
    canDocuments: true,
    canAnalytics: true,
    // extra optional capabilities used by some modules (e.g. investors)
    canApprove: true,
    canDashboard: true,
    canG91Money: true,
    // extra optional capabilities used by some modules (e.g. founders) 
    canUnicornPlan: true,
    // extra optional capabilities used by some modules (e.g. investments)
    canTransfer: true,
    canRequestSign: true,
    // extra optional capabilities used by some modules (e.g. groups)
    canManage: true,
  };
}

export async function loadModulePermissions(moduleKey) {
  // Read admin id from localStorage
  let adminId = null;
  const raw = localStorage.getItem("admin_login");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      adminId = parsed.value;
    } catch (e) {
      adminId = null;
    }
  }
  if (!adminId) {
    // If we can't find admin ID, just give full access (same as Startups now)
    return fullAccessPermissions();
  }

  // SUPER ADMIN override
  let isSuperAdmin = false;
  try {
    const rawSuper = localStorage.getItem("super_admin");
    if (rawSuper !== null) {
      const parsed = JSON.parse(rawSuper);
      isSuperAdmin =
        parsed === 1 ||
        parsed === "1" ||
        parsed === true ||
        parsed === "true";
    }
  } catch (e) {
    isSuperAdmin = false;
  }

  // Module-specific feature flags – match ProtectedAdminRoute behaviour
  const isAnalyticsModule = moduleKey === "analytics";
  const isGroupsModule =
    moduleKey === "groups" || moduleKey === "group_remove_requests";
  const featureEnabled = isAnalyticsModule
    ? featureFlags.ENABLE_ANALYTICS_PERMISSIONS
    : isGroupsModule
    ? featureFlags.ENABLE_GROUPS_INVESTMENTS_PERMISSIONS
    : featureFlags.ENABLE_MASTERDATA_PERMISSIONS;

  // When the relevant feature flag is OFF OR super admin => full access, no API
  if (!featureEnabled || isSuperAdmin) {
    return fullAccessPermissions();
  }

  // Normal role-based permissions
  const allPerms = await fetchAllPermissions(adminId);
  const m = allPerms[moduleKey] || {};

  return {
    canView: m.view === true,
    canAdd: m.add === true,
    canEdit: m.edit === true,
    // For investors/founders, "block" permission is treated like delete for canDelete
    canDelete:
      m.delete === true ||
      (moduleKey === "investors" && m.block === true) ||
      (moduleKey === "founders" && m.block === true),
    canExport: m.export === true,
    canDocuments: m.documents === true,
    canAnalytics: m.analytics === true,

    // Optional extra booleans for modules that define these actions (investors)
    canApprove: m.approve === true,
    canDashboard: m.dashboard === true,
    canG91Money: m.g91_money === true,

    // Optional extra booleans for modules that define these actions (founders)
    canUnicornPlan: m.unicorn_plan === true,

    // Optional extra booleans for modules that define these actions (investments)
    canTransfer: m.transfer === true,
    canRequestSign: m.request_sign === true,

    // Optional extra booleans for modules that define these actions (groups)
    canManage: m.manage === true,
  };
}