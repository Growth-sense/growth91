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
    // extra optional capabilities used by Future Unicorn – Published list
    canUnicornsPublishedPreview: true,
    canUnicornsPublishedViewPlan: true,
    canUnicornsPublishedViewForm: true,
    canUnicornsPublishedViewAdditionalForm: true,
    canUnicornsPublishedViewEnquiries: true,
    canUnicornsPublishedExportEnquiries: true,
    canUnicornsPublishedEditPublish: true,
    canUnicornsPublishedToggleHighlight: true,
    // extra optional capabilities used by Future Unicorn – View All Unicorns
    canUnicornsAllView: true,
    canUnicornsAllExportList: true,
    canUnicornsAllExportSingle: true,
    canUnicornsAllDownloadProductDeck: true,
    canUnicornsAllDownloadPitchDeck: true,
    // extra optional capabilities used by Future Unicorn – Payments
    canUnicornsPaymentsExport: true,
    canUnicornsPaymentsAddOfflinePayment: true,

    // extra optional capabilities used by Deals – Open Deals
    canDealsCreate: true,
    canDealsEdit: true,
    canDealsUpdateStatus: true,
    canDealsViewCommitments: true,
    canDealsAddCommitment: true,
    canDealsInviteInvestors: true,
    canDealsOfflinePayment: true,
    canDealsExportCommitmentsList: true,
    canDealsExportCommitmentsFounder: true,
    canDealsExportCommitmentsReconciliation: true,
    canDealsCopyUrl: true,
    canDealsViewPitches: true,

    // extra optional capabilities used by Deals – Completed Deals
    canDealsCompletedExport: true,
    canDealsCompletedUpdateStatus: true,
    canDealsCompletedEditDeal: true,
    canDealsCompletedViewCommitments: true,
    canDealsCompletedManagePaymentLink: true,
    canDealsCompletedInviteInvestors: true,
    canDealsCompletedOfflinePayment: true,
    canDealsCompletedCopyUrl: true,
    canDealsCompletedViewPitches: true,
    canDealsCompletedAddCommitment: true,
    canDealsCompletedEditCommitment: true,
    canDealsCompletedExportCommitments: true,

    // extra optional capabilities used by Institutional Referral
    canInstitutionalReferralCreate: true,
    canInstitutionalReferralUpdateStatus: true,
    canInstitutionalReferralDelete: true,
    canInstitutionalReferralViewDetail: true,
    canInstitutionalReferralExport: true,
    // extra optional capabilities used by Payments
    canPaymentsOnlineExport: true,
    // NEW: Pending Offline Payments
    canPaymentsOfflinePendingExport: true,
    canPaymentsOfflinePendingApprove: true,
    // NEW: Document Payments
    canPaymentsDocumentsExport: true,
    // extra optional capabilities used by Founder Documents
    canFounderDocumentsFounder: true,
    canFounderDocumentsAssessment: true,
    // extra optional capabilities used by Admin Documents
    canAdminDocumentsAdd: true,
    canAdminDocumentsEdit: true,
    canAdminDocumentsDelete: true,
    canAdminDocumentsDownload: true,
    // extra optional capabilities used by Settings
    canSettingsDeals: true,
    canSettingsMembership: true,
    canSettingsTaxation: true,
    canSettingsCashfree: true,
    canSettingsDigio: true,
    // extra optional capabilities used by Dropoff report
    canDropoffExport: true,
    // granular startup documents permissions (used by Startups.js)
    canStartupDocsView: true,
    canStartupDocsViewFile: true,
    canStartupDocsAdd: true,
    canStartupDocsEdit: true,
    canStartupDocsDelete: true,
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
  const isDropoffModule = moduleKey === "dropoff";
  const isGuestAnalyticsModule = moduleKey === "guest_analytics";
  const isGroupsModule =
    moduleKey === "groups" || moduleKey === "group_remove_requests";
  const isFutureUnicornModule =
    moduleKey === "unicorns_published" ||
    moduleKey === "unicorns_all" ||
    moduleKey === "unicorns_payments";
  const isPremiumMembersModule = moduleKey === "premium_members";
  const isDealsModule = moduleKey === "deals" || moduleKey === "deals_completed";
  const isReferralsModule =
    moduleKey === "retail_referral" || moduleKey === "institutional_referral";
  const isPaymentsModule =
    moduleKey === "payments_online" ||
    moduleKey === "payments_offline" ||
    moduleKey === "payments_offline_pending" ||
    moduleKey === "payments_documents";
  const isFounderDocumentsModule = moduleKey === "founder_documents";
  const isDocumentsModule = moduleKey === "documents";
  const isSettingsModule = moduleKey === "settings";
  const featureEnabled =
    isAnalyticsModule || isDropoffModule || isGuestAnalyticsModule
      ? featureFlags.ENABLE_ANALYTICS_PERMISSIONS
      : isGroupsModule
        ? featureFlags.ENABLE_GROUPS_INVESTMENTS_PERMISSIONS
        : isFutureUnicornModule
          ? featureFlags.ENABLE_FUTURE_UNICORN_PERMISSIONS
          : isPremiumMembersModule
            ? featureFlags.ENABLE_PREMIUM_MEMBERS_PERMISSIONS
            : isDealsModule
              ? featureFlags.ENABLE_DEALS_PERMISSIONS
              : isReferralsModule
                ? featureFlags.ENABLE_REFERRAL_PERMISSIONS
                : isPaymentsModule
                  ? featureFlags.ENABLE_PAYMENTS_PERMISSIONS
                  : isFounderDocumentsModule
                    ? featureFlags.ENABLE_FOUNDER_DOCUMENTS_PERMISSIONS
                    : isDocumentsModule
                      ? featureFlags.ENABLE_DOCUMENTS_PERMISSIONS
                      : isSettingsModule
                        ? featureFlags.ENABLE_SETTINGS_PERMISSIONS
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
    canDocuments:
      m.documents === true ||
      m.documents_view === true ||
      m.documents_view_file === true ||
      m.documents_add === true ||
      m.documents_edit === true ||
      m.documents_delete === true,
    // granular startup documents permissions (view/add/edit/delete and per-document view)
    // remain backward compatible by also treating legacy m.documents as full access
    canStartupDocsView: m.documents_view === true || m.documents === true,
    canStartupDocsViewFile: m.documents_view_file === true || m.documents === true,
    canStartupDocsAdd: m.documents_add === true || m.documents === true,
    canStartupDocsEdit: m.documents_edit === true || m.documents === true,
    canStartupDocsDelete: m.documents_delete === true || m.documents === true,
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

    // Optional extra booleans for modules that define these actions (Future Unicorn – Published list)
    canUnicornsPublishedPreview: m.preview === true,
    canUnicornsPublishedViewPlan: m.view_plan === true,
    canUnicornsPublishedViewForm: m.view_form === true,
    canUnicornsPublishedViewAdditionalForm: m.view_additional_form === true,
    canUnicornsPublishedViewEnquiries: m.view_enquiries === true,
    canUnicornsPublishedExportEnquiries: m.export_enquiries === true,
    canUnicornsPublishedEditPublish: m.edit_publish === true,
    canUnicornsPublishedToggleHighlight: m.toggle_highlight === true,

    // Optional extra booleans for modules that define these actions (Future Unicorn – View All Unicorns)
    canUnicornsAllView: m.view === true,
    canUnicornsAllExportList: m.export === true,
    canUnicornsAllExportSingle: m.export_single === true,
    canUnicornsAllDownloadProductDeck: m.download_product_deck === true,
    canUnicornsAllDownloadPitchDeck: m.download_pitch_deck === true,

    // Optional extra booleans for modules that define these actions (Future Unicorn – Payments)
    canUnicornsPaymentsExport: m.export === true,
    canUnicornsPaymentsAddOfflinePayment: m.add_offline_payment === true,

    // Optional extra booleans for modules that define these actions (Deals – Open Deals)
    canDealsCreate: m.create === true,
    canDealsEdit: m.edit === true,
    canDealsUpdateStatus: m.update_status === true,
    canDealsViewCommitments: m.view_commitments === true,
    canDealsAddCommitment: m.add_commitment === true,
    canDealsInviteInvestors: m.invite_investors === true,
    canDealsOfflinePayment: m.offline_payment === true,
    canDealsExportCommitmentsList: m.export_commitments_list === true,
    canDealsExportCommitmentsFounder: m.export_commitments_founder === true,
    canDealsExportCommitmentsReconciliation: m.export_commitments_reconciliation === true,
    canDealsCopyUrl: m.copy_url === true,
    canDealsViewPitches: m.view_pitches === true,

    // Optional extra booleans for modules that define these actions (Deals – Completed Deals)
    canDealsCompletedExport: m.export === true,
    canDealsCompletedUpdateStatus: m.update_status === true,
    canDealsCompletedEditDeal: m.edit_deal === true,
    canDealsCompletedViewCommitments: m.view_commitments === true,
    canDealsCompletedManagePaymentLink: m.manage_payment_link === true,
    canDealsCompletedInviteInvestors: m.invite_investors === true,
    canDealsCompletedOfflinePayment: m.offline_payment === true,
    canDealsCompletedCopyUrl: m.copy_url === true,
    canDealsCompletedViewPitches: m.view_pitches === true,
    canDealsCompletedAddCommitment: m.add_commitment === true,
    canDealsCompletedEditCommitment: m.edit_commitment === true,
    canDealsCompletedExportCommitments: m.export_commitments === true,

    // Optional extra booleans for modules that define these actions (Institutional Referral)
    canInstitutionalReferralCreate: m.create === true,
    canInstitutionalReferralUpdateStatus: m.update_status === true,
    canInstitutionalReferralDelete: m.delete === true,
    canInstitutionalReferralViewDetail: m.view_detail === true,
    canInstitutionalReferralExport: m.export === true,

    // Optional extra booleans for modules that define these actions (Payments)
    canPaymentsOnlineExport: m.export === true,

    // Optional extra booleans for modules that define these actions (Payments)
    canPaymentsOfflinePendingExport: m.export === true,
    canPaymentsOfflinePendingApprove: m.approve === true,
    canPaymentsDocumentsExport: m.export === true,

    // Optional extra booleans for modules that define these actions (Founder Documents)
    canFounderDocumentsFounder: m.founder === true,
    canFounderDocumentsAssessment: m.assessment === true,

    // Optional extra booleans for modules that define these actions (Admin Documents)
    canAdminDocumentsAdd: m.add === true,
    canAdminDocumentsEdit: m.edit === true,
    canAdminDocumentsDelete: m.delete === true,
    canAdminDocumentsDownload: m.download === true,

    // Optional extra booleans for modules that define these actions (Settings)
    canSettingsDeals: m.deals === true,
    canSettingsMembership: m.membership === true,
    canSettingsTaxation: m.taxation === true,
    canSettingsCashfree: m.cashfree === true,
    canSettingsDigio: m.digio === true,

    // Optional extra booleans for modules that define these actions (Dropoff)
    canDropoffExport: m.export === true,
  };
}