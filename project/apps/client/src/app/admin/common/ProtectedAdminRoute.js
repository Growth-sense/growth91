import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import featureFlags from "../../../config/featureFlags";

// Simple in-memory cache so we only hit myPermissions once per reload
let cachedPerms = null;
let permsPromise = null;

async function fetchPermissions() {
  if (cachedPerms) return cachedPerms;
  if (permsPromise) return permsPromise;

  permsPromise = (async () => {
    const adminLoginRaw = localStorage.getItem("admin_login");
    let adminId = null;

    if (adminLoginRaw) {
      try {
        const adminLogin = JSON.parse(adminLoginRaw);
        adminId = adminLogin.value;
      } catch (e) {
        adminId = null;
      }
    }

    if (!adminId) {
      console.error("Admin ID not found in local storage");
      cachedPerms = {};
      return cachedPerms;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/myPermissions`,
        {
          headers: {
            "X-Admin-Id": adminId,
          },
        }
      );

      if (res.data && res.data.status === "1") {
        cachedPerms = res.data.data || {};
      } else {
        cachedPerms = {};
      }
    } catch (e) {
      console.error("Error loading permissions in ProtectedAdminRoute", e);
      cachedPerms = {};
    }

    return cachedPerms;
  })();

  return permsPromise;
}

class ProtectedAdminRouteInner extends Component {
  state = {
    loading: true,
    allowed: false,
  };

  async componentDidMount() {
    const { requiredModule, requiredAction } = this.props;

    // SUPER ADMIN SHORTCUT – if super_admin == 1, always allow
    let isSuperAdmin = false;
    try {
      const raw = localStorage.getItem("super_admin");
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        isSuperAdmin =
          parsed === 1 || parsed === "1" || parsed === true || parsed === "true";
      }
    } catch (e) {
      isSuperAdmin = false;
    }

    if (isSuperAdmin) {
      this.setState({ loading: false, allowed: true });
      return;
    }

    // Feature flag shortcuts:
    // - Analytics routes (requiredModule === "analytics") use ENABLE_ANALYTICS_PERMISSIONS
    // - Group Investments routes (requiredModule === "groups" or "group_remove_requests") use ENABLE_GROUPS_INVESTMENTS_PERMISSIONS
    // - All other routes (master-data etc.) use ENABLE_MASTERDATA_PERMISSIONS
    const isAnalyticsRoute = requiredModule === "analytics";
    const isGroupsRoute =
      requiredModule === "groups" || requiredModule === "group_remove_requests";
    const isFutureUnicornRoute =
      requiredModule === "unicorns_published" ||
      requiredModule === "unicorns_all" ||
      requiredModule === "unicorns_payments";
    const isPremiumMembersRoute = requiredModule === "premium_members";
    const isDealsRoute =
      requiredModule === "deals" || requiredModule === "deals_completed";
    const isReferralsRoute =
      requiredModule === "retail_referral" ||
      requiredModule === "institutional_referral";
    const isPaymentsRoute =
      requiredModule === "payments_online" ||
      requiredModule === "payments_offline" ||
      requiredModule === "payments_offline_pending" ||
      requiredModule === "payments_documents";
    const featureEnabled = isAnalyticsRoute
      ? featureFlags.ENABLE_ANALYTICS_PERMISSIONS
      : isGroupsRoute
        ? featureFlags.ENABLE_GROUPS_INVESTMENTS_PERMISSIONS
        : isFutureUnicornRoute
          ? featureFlags.ENABLE_FUTURE_UNICORN_PERMISSIONS
          : isPremiumMembersRoute
            ? featureFlags.ENABLE_PREMIUM_MEMBERS_PERMISSIONS
            : isDealsRoute
              ? featureFlags.ENABLE_DEALS_PERMISSIONS
              : isReferralsRoute
                ? featureFlags.ENABLE_REFERRAL_PERMISSIONS
                : isPaymentsRoute
                  ? featureFlags.ENABLE_PAYMENTS_PERMISSIONS
                  : featureFlags.ENABLE_MASTERDATA_PERMISSIONS;

    // When the relevant permissions feature flag is OFF, skip myPermissions API
    // and allow all routes handled by this wrapper.
    if (!featureEnabled) {
      this.setState({ loading: false, allowed: true });
      return;
    }

    const perms = await fetchPermissions();

    let allowed = true;
    if (requiredModule && requiredAction) {
      allowed =
        perms[requiredModule] && perms[requiredModule][requiredAction] === true;
    }

    this.setState({ loading: false, allowed });
  }

  render() {
    const { loading, allowed } = this.state;
    const { Component, routeProps } = this.props;

    if (loading) {
      // Small center spinner while we resolve permissions
      return (
        <div style={{ padding: 24, textAlign: "center" }}>
          <Spin />
        </div>
      );
    }

    // Always render the page component, but pass noPermission flag
    return <Component {...routeProps} noPermission={!allowed} />;
  }
}

// usage wrapper with react-router Route
const ProtectedAdminRoute = ({
  component: WrappedComponent,
  requiredModule,
  requiredAction,
  ...rest
}) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <ProtectedAdminRouteInner
        Component={WrappedComponent}
        routeProps={routeProps}
        requiredModule={requiredModule}
        requiredAction={requiredAction}
      />
    )}
  />
);

export default ProtectedAdminRoute;