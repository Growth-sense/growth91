const URLs = {
  fundRaiseRegistration: "FundRaise/register",
  registerNewInvestor: "Investor/register",
  addInvestorViaFamily: "Investor/addInvestorViaFamily",
  //addInvestorViaFamilyWithoutEmail
  addInvestorViaFamilyWithoutEmail: "Investor/addInvestorViaFamilyWithoutEmail",
  comment: "Blog/comment",
  commentlist: "Blog/commentlist",
  getstatusdata: "Users/getstatusdata",
  invest: "Investor/invest",
  getinvestmentdetails: "Investor/getinvestmentdetails",
  get_premium_members: "admin/Investors/premium_members",
  get_invited_user_list: "Authenticate/get_invited_user_list",
  save_startup_founder2_form_self_assesment_form_advisor:
    "Authenticate/save_startup_founder2_form_self_assesment_form_advisor",
  // admin
  adminsignin: "admin/Admin/signin",
  adminbloglist: "admin/Blog/list",
  addpost: "admin/Blog/add",
  updatepost: "admin/Blog/edit",
  deletepost: "admin/Blog/delete",
  admindeallist: "admin/Deal/list",
  admindealcloselist: "admin/Deal/close_list",
  getSingleDealData: "admin/Deal/get_deal",
  adddeal: "admin/Deal/add",
  updatedeal: "admin/Deal/edit",
  deletedeal: "admin/Deal/delete",
  updatestatus: "admin/Deal/updatestatus",
  uploaddealimg: "admin/Deal/uploaddealimg",
  founderlist: "admin/Founders/list",
  addfounder: "admin/Founders/add",
  updatefounder: "admin/Founders/edit",
  deletefounder: "admin/Founders/delete",
  updatekycdetails: "admin/Kyc/updatekycdetails",
  getkycdetails: "admin/Investors/getkycdetails",
  update_non_resident_kyc_details: "admin/Kyc/update_non_resident_kyc_details",

  investorlist: "admin/Investors/list",
  getstartupinvestorlist: "admin/Investors/getstartupinvestorlist",
  addinvestor: "admin/Investors/add",
  updateinvestor: "admin/Investors/edit",
  block_disable_investor: "admin/Investors/user_disable_enable",
  documentlist: "admin/Documents/list",
  adddocument: "admin/Documents/add",
  updatedocument: "admin/Documents/edit",
  deletedocument: "admin/Documents/delete",
  getfulllistofinvestments: "admin/Investments/list",
  approveinvestment: "admin/Investments/approve",
  transferfund: "admin/Investments/transferfund",
  getdealsbystartupid: "admin/Analytics/getdealsbystartupid",
  getapprovelistofinvestors: "admin/Investors/getapprovelistofinvestors",
  getapprovelistoffounders: "admin/Investors/getapprovelistoffounders",
  approveuser: "admin/Investors/approveuser",

  getdealsettings: "admin/Settings/getdealsettings",
  get_cashfree_details: "admin/Settings/get_cashfree_details",
  update_cashfree_details: "admin/Settings/update_cashfree_details",
  updatedealsettings: "admin/Settings/updatedealsettings",
  getdashboarddetails: "admin/Dashboard/getdashboarddetails",
  startuplist: "admin/Startups/list",
  addstartup: "admin/Startups/add",
  updatestartup: "admin/Startups/edit",
  deletestartup: "admin/Startups/delete",
  transactions: "admin/Payments/list",

  get_admin_analytics: "admin/Analytics/get_analytics",
  update_admin_analytics: "admin/Analytics/update_analytics",
  delete_admin_analytics: "admin/Analytics/delete_analytics",
  //referral api
  getinstutionalreferral: "admin/InstitutionalReferral/list",
  get_institutional_referral_edit_list:
    "admin/InstitutionalReferral/get_edit_list",
  addinstutionalreferral: "admin/InstitutionalReferral/add",
  deleteinstutionalreferral: "admin/InstitutionalReferral/delete",
  updateinstutionalreferral: "admin/InstitutionalReferral/edit",
  uploadreferralimg: "admin/InstitutionalReferral/uploadreferralimg",
  sendreferralemail: "admin/InstitutionalReferral/sendreferrallink",
  update_institutional_referral_status:
    "admin/InstitutionalReferral/updatestatus",
  get_all_referral_investor_list:
    "investors/RetailReferral/get_all_referral_investor_list",
  get_details_investment_by_investors:
    "admin/InstitutionalReferral/get_details_investment_by_investors",
  //for sending signin request'
  sendsignrequest: "admin/DocumentSign/sendsignrequest",

  get_authorized_signatory: "admin/Deal/get_authorized_signatory",
  update_enable_status: "admin/Deal/update_enable_status",
  // Founder
  fsendotp: "Founders/sendotp",
  analyticslist: "founder/Analytics/get_analytics_list",
  add_analytics: "founder/Analytics/add_analytics",
  updateanalytics: "founder/Analytics/edit",
  deleteanalytics: "founder/Analytics/delete",
  deallist: "founder/Analytics/getdeallist",
  founderinvestor: "founder/Investors/list",
  roc_update: "founder/Investors/roc_update",

  // investor
  sendretailreferrallink: "investors/RetailReferral/sendretailreferrallink",
  sendotpemail: "Investor/sendotp",
  register_premium_member: "Investor/register_premium_member",
  updaterstatus: "Investor/updaterstatus",
  completekycprocess: "investors/Kyc/completekycprocess",
  uploadadhar: "investors/Kyc/uploadadhar",
  uploadadharback: "investors/Kyc/uploadadharback",
  updatebankdetails: "investors/Kyc/updatebankdetails",
  getbankdetails: "investors/Kyc/getbankdetails",
  get_kyc_details: "investors/Kyc/get_kyc_details",
  getinvestordetails: "investors/InvestorController/getinvestordetails",
  getInvestments: "investors/InvestorController/getInvestments",
  updateaccountdetails: "investors/InvestorController/updateaccountdetails",
  getanalytics: "investors/Analytics/getanalytics",
  updateprofiledetails: "investors/InvestorController/updateprofiledetails",
  update_founder_profile_details:
    "founder/FounderProfile/update_profile_details",
  get_founder_profile_details: "founder/FounderProfile/get_founder_details",
  checkforpanno: `${process.env.REACT_APP_BASE_URL}verification/verify_bank_account.php`,
  checkforadhar: "investors/Kyc/checkforadhar",

  setsignindata: "Users/setsignindata",

  getcashfreetoken: `${process.env.REACT_APP_BASE_URL}cashfree/js/fetchtoken.php`,
  getcheckstatus: `${process.env.REACT_APP_BASE_URL}cashfree/checkstatus.php`,

  payurl: `${process.env.REACT_APP_BASE_URL}cashfree/checkout.php`,

  registernewfounder: "Founders/registernewfounder",
  addnewfounder: "Founders/addnewfounder",
  registerupdatefounder: "Founders/updatefounder",
  getFounderDetails: "Founders/getFounderDetails",
  uploadpitchfile: "Founders/uploadpitchfile",
  // url
  IMAGEURL: `${process.env.REACT_APP_BASE_URL}api/uploads/`,

  get_startup_details: "founder/Startup/get_startup_details",
  update_startup_founder: "founder/Startup/update_startup_founder",
  admin_get_founder_form_details:
    "admin/Founders/admin_get_founder_form_details",

  get_deal_pitch_list: "admin/DealPitches/list",
  add_deal_pitch: "admin/DealPitches/add",
  update_deal_pitch: "admin/DealPitches/update",
  delete_deal_pitch: "admin/DealPitches/delete",

  get_image_list_of_pitch: "Deal/pitch_list",
  bulkapproveuser: "admin/Investors/bulkapproveuser",
  bulkrejectuser: "admin/Investors/bulkrejectuser",
  send_email_to_investors: "admin/Investors/send_email_to_investors",
  getsettings: "admin/Settings/getsettings",
  updatesetting: "admin/Settings/updatesetting",
  updatetaxationsetting: "admin/Settings/updatetaxationsetting",
  get_digio_setting: "admin/DigioSettings/getsettings",
  update_digio_setting: "admin/DigioSettings/updatesetting",

  upgradeplan: "Investor/upgradeplan",
  updateexpirystatus: "Investor/updateexpirystatus",
  sendregisterotp: "Users/sendregisterotp",
  loginUsingGoogle: "Users/loginUsingGoogle",
  loginUsingGoogleForFounder: "Users/loginUsingGoogleForFounder",

  add_startup_form_entry: "founder/Startup/add_startup_form_entry",
  update_startup_form_entry: "Startup/update_startup_form_entry",
  getstartupformdetails: "Startup/getstartupformdetails",
  invite_startup_form_users: "Authenticate/invite_members",
  getformstatuslist: "Startup/list",
  startupformlogin: "Authenticate/verify_user",
  add_startup_form_entry: "founder/Startup/add_startup_form_entry",

  // startup form 2 - self evaluation changes
  get_founder_sform_details: "Form/get_founder_sform_details",
  submit_founder_sform_details: "Form/submit_founder_sform_details",

  get_form_user_details: "Authenticate/get_form_user_details",
  save_startup_form_2: "Authenticate/save_startup_form_2",
  save_startup_founder2_form_self_assesment_form:
    "Authenticate/save_startup_founder2_form_self_assesment_form",
  get_startup_form2_details: "Authenticate/get_startup_form2_details",
  update_form2_last_step: "Authenticate/update_form2_last_step",
  check_validation: "Authenticate/check_validation",
  check_for_membership_type: "Investor/check_for_membership_type",
  get_signer_basic_details: "admin/Deal/getsigner",
  //for getting wallet history
  get_wallet_history: "investors/WalletHistory/getwallethistory",

  check_register_refferal_code: "Investor/check_referral_code_ins",
  get_investor_referral_code: "Investor/get_investor_referral_code",

  get_institutional_investor_list:
    "admin/InstitutionalReferral/get_institutional_investor_list",
  get_referral_investor_list:
    "investors/RetailReferral/get_referral_investor_list",
  get_investment_signed_status:
    "admin/DocumentSign/get_investment_signed_status",
  update_investment_document_id:
    "admin/DocumentSign/update_investment_document_id",
  get_deal_doucments: "Deal/get_document_list",
  confirmation_of_eligibility: "admin/Deal/confirmation_of_eligibility",
  //getting startup name by operational founder/founder id
  getstartup_by_operational_founder:
    "founder/Analytics/getstartup_by_operational_founder",
  get_founder_dashboard_details:
    "founder/FounderDashboard/get_founder_dashboard_details",
  get_startup_founder_investor:
    "founder/investors/get_startup_founder_investor",
  get_document_purchased_list: "Deal/get_document_purchased_list",
  get_document_purchased_list_admin: "Deal/get_document_purchased_list_admin",
  get_all_online_paid_document_by_admin:
    "admin/Payments/get_all_online_paid_document_by_admin",
  transaction_success: "Msg/transaction_success",
  update_document_status: "admin/DocumentSign/update_document_status",
  get_investor_by_email: "admin/Deal/get_investor_by_email",
  add_offline_data: "admin/Deal/add_offline_data",
  add_investor_offline_data: "admin/Deal/add_offline_data_by_investor",
  approve_investor_offline_data:
    "admin/Payments/post_offline_payment_status_by_admin",
  invite_investors_for_private_deal:
    "admin/Deal/invite_investors_for_private_deal",
  get_invitation_list: "admin/Deal/get_invitation_list",
  get_deal_name: "admin/Deal/get_deal_name",
  create_founder_form_pdf: "admin/Founders/create_founder_form_pdf",
  //for getting payment history by admin
  get_all_offline_payment_history:
    "admin/Payments/get_all_offline_payment_history",

  // for getting pending payment history by admin
  get_all_pending_offline_payment_history:
    "admin/Payments/get_all_pending_offline_payment_history",
  sendotptomobile: "Investor/sendotponmobile",
  get_startup_form_details: "founder/Assesmentform/get_startup_form_details",
  sendsuccessmsg: "InvestorSuccess/send_success_msg",
  get_startup_name: "Authenticate/get_startup_name",
  startupFormsSuccessEmail:
    "founder/FounderStartupform/startup_form_success_mail",
  get_assesment_form_details: "admin/Documents/get_assesment_form_details",
  delete_startup_form_document: "Founders/delete_startup_form_document",

  get_blog_category_list: "admin/Blogcategory/list",
  add_blog_category: "admin/Blogcategory/add",
  update_blog_category: "admin/Blogcategory/edit",
  delte_blog_category: "admin/Blogcategory/delete",
  delete_pitch_file: "founders/delete_pitch_file",
  get_registered_user_details: "Users/get_registered_user_details",
  getUsersDetailsByEmail: "Users/getUsersDetailsByEmail",
  change_membership_details: "Investor/change_membership_details",
  update_membership_to_premium: "Users/update_membership_to_premium",
  get_private_inivation_details:
    "investors/DealInvitationStatus/get_invitation_details",
  update_kyc_details: "investors/kyc/update_kyc_details",
  submit_non_resident_form: "investors/kyc/submit_non_resident_form",
  get_non_resident: "investors/kyc/get_non_resident_form_details",
  upload_kyc_docs: "investors/kyc/storekycdetail",
  contact_us_form:"Users/send_contact_email",
  // family
  addfamily:"investors/InvestorController/addfamilymember",
  getfamilymember:"investors/InvestorController/getfamilymember",
  creategroup:"investors/InvestorController/createGroup",
  getGroupList:"investors/InvestorController/getGroupList",
  getGroupListForInvestment: "investors/InvestorController/getGroupListForInvestment",
  checkFamilyMember:"investors/InvestorController/checkFamilyMember",
  saveInvite:"investors/InvestorController/saveInvite",
  familyInviteOTP:"investors/InvestorController/familyInviteOTP",
  verifyFamilyInvite:"investors/InvestorController/verifyFamilyInvite",
  editGroup:"investors/InvestorController/editGroup",
  deleteGroupMember:"investors/InvestorController/deleteGroupMember",
  deleteRequest:"investors/InvestorController/deleteRequest",
  getDeleteRequest:"investors/InvestorController/getDeleteRequest",
  deleteRequestApprove:"investors/InvestorController/deleteRequestApprove",
  deleteGroup:"investors/InvestorController/deleteGroup",
  
  //future unicorn
  createunicorndraft:"founder/Startup/createunicorndraft",
  unicornListByFounders:"founder/Startup/unicornListByFounders",
  editunicorndraft:"founder/Startup/editunicorndraft",
  publishunicorndeal:"founder/Startup/publishunicorndeal",
  unicorndealsByInvestors:"founder/Startup/unicorndealsByInvestors",
  getAllUnicorns:"founder/Startup/getAllUnicorns",
  getUnicornPayment:"founder/Startup/getUnicornPayment",
  uploadunicornFiles:"founder/Startup/uploadunicornFiles",
  uploadFiles:"founder/Startup/uploadFiles",
  add_unicorn_interest:"founder/Startup/add_unicorn_interest",
  unicorn_interested_list:"founder/Startup/unicorn_interested_list",
  unicorn_Publish_unpublish:"founder/Startup/unicorn_Publish_unpublish",
  get_founder_detail_for_unicorn:"founder/Startup/get_founder_detail_for_unicorn",
  get_payment_link:"founder/Startup/get_payment_link",
  adminEditUnicornPlan: "founder/Startup/update_unicorn_plan_by_admin",
  save_gst_number: "founder/Startup/update_unicorn_gst",
  addOfflinePayment: "founder/Startup/record_unicorn_payment_offline"
};

export default URLs;
