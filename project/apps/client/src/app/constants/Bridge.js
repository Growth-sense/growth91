import URLs from "./Apis";
import api from "../api/api";
import Urldata from "../startup/Urldata";
import encryptionHelper from "../helper/encryptionHelper";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fundRaiseRegistration: (data) =>
    api.post(URLs.fundRaiseRegistration, data).then((response) => {
      return response.data;
    }),
  get_registered_user_details: (data) =>
    api.post(URLs.get_registered_user_details, data).then((response) => {
      return response.data;
    }),

  


  update_kyc_details: (data) =>
    api.post(URLs.update_kyc_details, data).then((response) => {
      return response.data;
    }),
  get_non_resident: (data) =>
    api.post(URLs.get_non_resident, data).then((response) => {
      return response.data;
    }),
  submit_non_resident_form: (data, config) =>
    api.post(URLs.submit_non_resident_form, data, config).then((response) => {
      return response.data;
    }),
  users: {
    getstatusdata: (data) =>
      api.post(URLs.getstatusdata, data).then((response) => {
        return response.data;
      }),

        // getUsersDetailsByEmail
  getUsersDetailsByEmail: (data) =>
    api.post(URLs.getUsersDetailsByEmail, data).then((response) => {
      return response.data;
    }),

    // addInvestor
    addInvestorViaFamily: (data) => 
    api.post(URLs.addInvestorViaFamily, data).then((response) => {
      return response.data;
    }),

    //addInvestorViaFamilyWithoutEmailCheck
    addInvestorViaFamilyWithoutEmail: (data) => 
      api.post(URLs.addInvestorViaFamilyWithoutEmail, data).then((response) => {
        return response.data;
      }),
  },
  update_investment_document_id: (data) =>
    api.post(URLs.update_investment_document_id, data).then((response) => {
      return response.data;
    }),
  get_invitation_list: (data) =>
    api.post(URLs.get_invitation_list, data).then((response) => {
      return response.data;
    }),
  get_deal_name: (data) =>
    api.post(URLs.get_deal_name, data).then((response) => {
      return response.data;
    }),
  update_document_status: () =>
    api.get(URLs.update_document_status).then((response) => {
      return response.data;
    }),
  get_deal_doucments: (data) =>
    api.post(URLs.get_deal_doucments, data).then((response) => {
      return response.data;
    }),
  transaction_success: (data) =>
    api.post(URLs.transaction_success, data).then((response) => {
      return response.data;
    }),
  get_invited_user_list: (data) =>
    api.post(URLs.get_invited_user_list, data).then((response) => {
      return response.data;
    }),
  get_investor_referral_code: (data) =>
    api.post(URLs.get_investor_referral_code, data).then((response) => {
      return response.data;
    }),
  update_form2_last_step: (data) =>
    api.post(URLs.update_form2_last_step, data).then((response) => {
      return response.data;
    }),
  check_validation: (data) =>
    api.post(URLs.check_validation, data).then((response) => {
      return response.data;
    }),
  get_form_user_details: (data) =>
    api.post(URLs.get_form_user_details, data).then((response) => {
      return response.data;
    }),
  get_startup_form2_details: (data) =>
    api.post(URLs.get_startup_form2_details, data).then((response) => {
      return response.data;
    }),

  save_startup_form_2: (data) =>
    api.post(URLs.save_startup_form_2, data).then((response) => {
      return response.data;
    }),
  save_startup_founder2_form_self_assesment_form: (data) =>
    api
      .post(URLs.save_startup_founder2_form_self_assesment_form, data)
      .then((response) => {
        return response.data;
      }),
  getformstatuslist: (data) =>
    api.post(URLs.getformstatuslist, data).then((response) => {
      return response.data;
    }),
  save_startup_founder2_form_self_assesment_form_advisor: (data) =>
    api
      .post(URLs.save_startup_founder2_form_self_assesment_form_advisor, data)
      .then((response) => {
        return response.data;
      }),
  upgradeplan: (data) =>
    api.post(URLs.upgradeplan, data).then((response) => {
      return response.data;
    }),
  sendregisterotp: async function(data){
    data['otp'] = encryptionHelper.encrypt(data['otp']);
    const response = await api.post(URLs.sendregisterotp, data);
    return response.data;
  },
  loginUsingGoogle: (data) =>
    api.post(URLs.loginUsingGoogle, data).then((response) => {
      return response.data;
    }),
  loginUsingGoogleForFounder: (data) =>
    api.post(URLs.loginUsingGoogleForFounder, data).then((response) => {
      return response.data;
    }),

  startupformlogin: (data) =>
    api.post(URLs.startupformlogin, data).then((response) => {
      return response.data;
    }),

  deal_pitch: {
    list: (data) =>
      api.post(URLs.get_deal_pitch_list, data).then((response) => {
        return response.data;
      }),
    add: (data, config) =>
      api.post(URLs.add_deal_pitch, data, config).then((response) => {
        return response.data;
      }),
    update: (data, config) =>
      api.post(URLs.update_deal_pitch, data, config).then((response) => {
        return response.data;
      }),
    delete: (data) =>
      api.post(URLs.delete_deal_pitch, data).then((response) => {
        return response.data;
      }),
  },

  startup_form: {
    get_startup_details: (data) =>
      api.post(URLs.get_startup_details, data).then((response) => {
        return response.data;
      }),
    update_startup_founder: (data) =>
      api.post(URLs.update_startup_founder, data).then((response) => {
        return response.data;
      }),
  },

  community: {
    setsignindata: (data) =>
      api.post(URLs.setsignindata, data).then((response) => {
        return response.data;
      }),
  },

  deal: {
    addAIF: (data) =>
      api.post(URLs.addAIF, data).then((response) => {
        return response.data;
      }),
    list: () =>
      api.get(URLs.admindeallist).then((response) => {
        return response.data;
      }),
    get_deal: (data) =>
      api.post(URLs.getSingleDealData, data).then((response) => {
        return response.data;
      }),
    closelist: () =>
      api.get(URLs.admindealcloselist).then((response) => {
        return response.data;
      }),
    add: (data) =>
      api.post(URLs.adddeal, data).then((response) => {
        return response.data;
      }),
    edit: (data) =>
      api.post(URLs.updatedeal, data).then((response) => {
        return response.data;
      }),
    delete: (data, config) =>
      api.post(URLs.deletedeal, data, config).then((response) => {
        return response.data;
      }),
    updatestatus: (data, config) =>
      api.post(URLs.updatestatus, data, config).then((response) => {
        return response.data;
      }),
    uploaddealimg: (data, config) =>
      api.post(URLs.uploaddealimg, data, config).then((response) => {
        return response.data;
      }),
    invest: (data) =>
      api.post(URLs.invest, data).then((response) => {
        return response.data;
      }),
    get_image_list_of_pitch: (data) =>
      api.post(URLs.get_image_list_of_pitch, data).then((response) => {
        return response.data;
      }),
    addeligibility: (data) =>
      api.post(URLs.confirmation_of_eligibility, data).then((response) => {
        return response.data;
      }),
    get_document_purchased_list: (data) =>
      api.post(URLs.get_document_purchased_list, data).then((response) => {
        return response.data;
      }),
    get_all_online_paid_document_by_admin: () =>
      api.get(URLs.get_all_online_paid_document_by_admin).then((response) => {
        return response.data;
      }),
    get_document_purchased_list_admin: (data) =>
      api
        .post(URLs.get_document_purchased_list_admin, data)
        .then((response) => {
          return response.data;
        }),
    get_investor_by_email: (data) =>
      api.post(URLs.get_investor_by_email, data).then((response) => {
        return response.data;
      }),
    add_offline_data: (data, config) =>
      api.post(URLs.add_offline_data, data, config).then((response) => {
        return response.data;
      }),
    add_investor_offline_data: (data, config) =>
      api
        .post(URLs.add_investor_offline_data, data, config)
        .then((response) => {
          return response.data;
        }),

    invite_investors_for_private_deal: (data) =>
      api
        .post(URLs.invite_investors_for_private_deal, data)
        .then((response) => {
          return response.data;
        }),
    //for private deal invitation
    get_private_inivation_details: (data) =>
      api.post(URLs.get_private_inivation_details, data).then((response) => {
        return response.data;
      }),
  },

  founders: {
    list: () =>
      api.get(URLs.founderlist).then((response) => {
        return response.data;
      }),
    add: (data) =>
      api.post(URLs.addfounder, data).then((response) => {
        return response.data;
      }),
    edit: (data) =>
      api.post(URLs.updatefounder, data).then((response) => {
        return response.data;
      }),
    delete: (data, config) =>
      api.post(URLs.deletefounder, data, config).then((response) => {
        return response.data;
      }),
    uploadpitchfile: (data, config) =>
      api.post(URLs.uploadpitchfile, data, config).then((response) => {
        return response.data;
      }),
    addnewfounder: (data) =>
      api.post(URLs.addnewfounder, data).then((response) => {
        return response.data;
      }),
    delete_startup_form_document: (data) =>
      api.post(URLs.delete_startup_form_document, data).then((response) => {
        return response.data;
      }),
  },

  adminsignin: (data) =>
    api.post(URLs.adminsignin, data).then((response) => {
      return response.data;
    }),

  // Blog
  blog: {
    list: () =>
      api.get(URLs.adminbloglist).then((response) => {
        return response.data;
      }),
    add: (data, config) =>
      api.post(URLs.addpost, data, config).then((response) => {
        return response.data;
      }),
    update: (data, config) =>
      api.post(URLs.updatepost, data, config).then((response) => {
        return response.data;
      }),
    delete: (data, config) =>
      api.post(URLs.deletepost, data, config).then((response) => {
        return response.data;
      }),
    comment: (data) =>
      api.post(URLs.comment, data).then((response) => {
        return response.data;
      }),
    commentlist: (data) =>
      api.post(URLs.commentlist, data).then((response) => {
        return response.data;
      }),
  },

  investor: {
    change_membership_details: (data) =>
      api.post(URLs.change_membership_details, data).then((response) => {
        return response.data;
      }),
    update_membership_to_premium: (data) =>
      api.post(URLs.update_membership_to_premium, data).then((response) => {
        return response.data;
      }),
    sendotptomobile: async function(data){
      data['otp'] = encryptionHelper.encrypt(data['otp']);
      const response = await api.post(URLs.sendotptomobile, data);
      return response.data;
    },
    sendotp: (data) =>
      api.post(URLs.sendotpemail, data).then((response) => {
        return response.data;
      }),
    get_referral_investor_list: (data) =>
      api.post(URLs.get_referral_investor_list, data).then((response) => {
        return response.data;
      }),
    check_referral_code_ins: (data) =>
      api.post(URLs.check_register_refferal_code, data).then((response) => {
        return response.data;
      }),
    register: (data) =>
      api.post(URLs.registerNewInvestor, data).then((response) => {
        return response.data;
      }),
    updaterstatus: (data) =>
      api.post(URLs.updaterstatus, data).then((response) => {
        return response.data;
      }),
    completekycprocess: (data) =>
      api.post(URLs.completekycprocess, data).then((response) => {
        return response.data;
      }),
    uploadadhar: (data, config, url) =>
      api.post(url, data, config).then((response) => {
        return response.data;
      }),
    updatebankdetails: (data) =>
      api.post(URLs.updatebankdetails, data).then((response) => {
        return response.data;
      }),
    getbankdetails: (data) =>
      api.post(URLs.getbankdetails, data).then((response) => {
        return response.data;
      }),
    get_kyc_details: (data) =>
      api.post(URLs.get_kyc_details, data).then((response) => {
        return response.data;
      }),
    getinvestordetails: (data) =>
      api.post(URLs.getinvestordetails, data).then((response) => {
        return response.data;
      }),
    register_premium_member: (data) =>
      api.post(URLs.register_premium_member, data).then((response) => {
        return response.data;
      }),
    getinvestmentdetails: (data) =>
      api.post(URLs.getinvestmentdetails, data).then((response) => {
        return response.data;
      }),
    getInvestments: (data) =>
      api.post(URLs.getInvestments, data).then((response) => {
        return response.data;
      }),
    updateaccountdetails: (data) =>
      api.post(URLs.updateaccountdetails, data).then((response) => {
        return response.data;
      }),
    getanalytics: () =>
      api.get(URLs.getanalytics).then((response) => {
        return response.data;
      }),
    updateprofiledetails: (data, config) =>
      api.post(URLs.updateprofiledetails, data, config).then((response) => {
        return response.data;
      }),
    // for generating referral
    sendretailreferrallink: (data) =>
      api.post(URLs.sendretailreferrallink, data).then((response) => {
        return response.data;
      }),
    get_wallet_history: (data) =>
      api.post(URLs.get_wallet_history, data).then((response) => {
        return response.data;
      }),
    fsendsuccessmail: (data) =>
      api.post(URLs.sendsuccessmsg, data).then((response) => {
        return response.data;
      }),
    addfamily: (data) =>
      api.post(URLs.addfamily, data).then((res) => {
        return res.data;
      }),
    getfamilymember: (data) =>
      api.post(URLs.getfamilymember, data).then((res) => {
        return res.data;
      }),
  },

  kyc: {
    checkforpanno: (data) =>
      api.post(URLs.checkforpanno, data).then((response) => {
        return response;
      }),
    checkforadhar: (data) =>
      api.post(URLs.checkforadhar, data).then((response) => {
        return response.data;
      }),
    verfiy_pan_no: (data, link, config) =>
      api.post(link, data, config).then((response) => {
        return response;
      }),

    update_kyc_docs: (formData) =>
      api.post(URLs.upload_kyc_docs, formData).then((response) => {
        return response.data;
      }),
  },

  founder: {
    get_startup_name: (data) =>
      api.post(URLs.get_startup_name, data).then((response) => {
        return response.data;
      }),
    get_startup_form_details: (data) =>
      api.post(URLs.get_startup_form_details, data).then((response) => {
        return response.data;
      }),

    startupFormsSuccessEmail: (data) =>
      api.post(URLs.startupFormsSuccessEmail, data).then((response) => {
        return response.data;
      }),

    fsendotp: async function(data){
      data['otp'] = encryptionHelper.encrypt(data['otp']);
      const response = await api.post(URLs.fsendotp, data);
      return response.data;
    },
    add_startup_form_entry: (data) =>
      api.post(URLs.add_startup_form_entry, data).then((response) => {
        return response.data;
      }),

    list: (data) =>
      api.post(URLs.analyticslist, data).then((response) => {
        return response.data;
      }),
    add_analytics: (data) =>
      api.post(URLs.add_analytics, data).then((response) => {
        return response.data;
      }),
    edit: (data) =>
      api.post(URLs.updateanalytics, data).then((response) => {
        return response.data;
      }),
    delete: (data, config) =>
      api.post(URLs.deleteanalytics, data, config).then((response) => {
        return response.data;
      }),
    getdeallist: (data, config) =>
      api.post(URLs.deallist, data, config).then((response) => {
        return response.data;
      }),
    registernewfounder: (data) =>
      api.post(URLs.registernewfounder, data).then((response) => {
        return response.data;
      }),
    updatefounder: (data) =>
      api.post(URLs.registerupdatefounder, data).then((response) => {
        return response.data;
      }),
    getFounderDetails: (data) =>
      api.post(URLs.getFounderDetails, data).then((response) => {
        console.log(response.data);
        return response.data;
      }),
    getstartupformdetails: (data) =>
      api.post(URLs.getstartupformdetails, data).then((response) => {
        return response.data;
      }),
    update_startup_form_entry: (data) =>
      api.post(URLs.update_startup_form_entry, data).then((response) => {
        return response.data;
      }),
    invite_startup_form_users: (data) =>
      api.post(URLs.invite_startup_form_users, data).then((response) => {
        return response.data;
      }),
    roc_update: (data) =>
      api.post(URLs.roc_update, data).then((response) => {
        return response.data;
      }),
    //for getting startup name and id 06-09-22
    getstartup_by_operational_founder: (data) =>
      api
        .post(URLs.getstartup_by_operational_founder, data)
        .then((response) => {
          return response.data;
        }),
    update_founder_profile_details: (data, config) =>
      api
        .post(URLs.update_founder_profile_details, data, config)
        .then((response) => {
          return response.data;
        }),
    get_founder_profile_details: (data) =>
      api.post(URLs.get_founder_profile_details, data).then((response) => {
        return response.data;
      }),
    get_founder_dashboard_details: (data) =>
      api.post(URLs.get_founder_dashboard_details, data).then((response) => {
        return response.data;
      }),
    get_startup_founder_investor: (data) =>
      api.post(URLs.get_startup_founder_investor, data).then((response) => {
        return response.data;
      }),
  },
  check_for_membership_type: (data) =>
    api.post(URLs.check_for_membership_type, data).then((response) => {
      return response.data;
    }),
  admin: {
    get_assesment_form_details: (params) =>
      api.post(URLs.get_assesment_form_details, params).then((response) => {
        return response.data;
      }),
    create_founder_form_pdf: () =>
      api.get(URLs.create_founder_form_pdf).then((response) => {
        return response.data;
      }),
    get_institutional_investor_list: (data) =>
      api.post(URLs.get_institutional_investor_list, data).then((response) => {
        return response;
      }),
    get_investment_signed_status: (data) =>
      api.post(URLs.get_investment_signed_status, data).then((response) => {
        return response;
      }),
    sendsignrequest: (data) =>
      api.post(URLs.sendsignrequest, data).then((response) => {
        return response;
      }),
    get_premium_members: (data) =>
      api.get(URLs.get_premium_members, data).then((response) => {
        return response.data;
      }),
    admin_get_founder_form_details: (data) =>
      api.get(URLs.admin_get_founder_form_details, data).then((response) => {
        return response.data;
      }),

    getinvestments: () =>
      api.get(URLs.getfulllistofinvestments).then((response) => {
        return response.data;
      }),
    updatekycdetails: (data) =>
      api.post(URLs.updatekycdetails, data).then((response) => {
        return response.data;
      }),
    update_non_resident_kyc_details: (data) =>
      api.post(URLs.update_non_resident_kyc_details, data).then((response) => {
        return response.data;
      }),
    getkycdetails: (data) =>
      api.post(URLs.getkycdetails, data).then((response) => {
        return response.data;
      }),

    transactions: () =>
      api.get(URLs.transactions).then((response) => {
        return response.data;
      }),

    founderinvestor: () =>
      api.get(URLs.founderinvestor).then((response) => {
        return response.data;
      }),

    get_details_investment_by_investors: (data) =>
      api
        .post(URLs.get_details_investment_by_investors, data)
        .then((response) => {
          return response.data;
        }),
    get_all_offline_payment_history: () =>
      api.get(URLs.get_all_offline_payment_history).then((response) => {
        return response.data;
      }),
    get_all_pending_offline_payment_history: () =>
      api.get(URLs.get_all_pending_offline_payment_history).then((response) => {
        return response.data;
      }),

    approve: {
      approve_investor_offline_data: (data, config) =>
        api
          .post(URLs.approve_investor_offline_data, data, config)
          .then((response) => {
            return response.data;
          }),

      getapprovelistofinvestors: () =>
        api.get(URLs.getapprovelistofinvestors).then((response) => {
          return response.data;
        }),
      getapprovelistoffounders: () =>
        api.get(URLs.getapprovelistoffounders).then((response) => {
          return response.data;
        }),
      approveuser: (data) =>
        api.post(URLs.approveuser, data).then((response) => {
          return response.data;
        }),
      bulkapproveuser: (data) =>
        api.post(URLs.bulkapproveuser, data).then((response) => {
          return response.data;
        }),
      bulkrejectuser: (data) =>
        api.post(URLs.bulkrejectuser, data).then((response) => {
          return response.data;
        }),
    },
    settings: {
      getdealsettings: () =>
        api.get(URLs.getdealsettings).then((response) => {
          return response.data;
        }),
      get_cashfree_details: () =>
        api.get(URLs.get_cashfree_details).then((response) => {
          return response.data;
        }),
      update_cashfree_details: (data) =>
        api.post(URLs.update_cashfree_details, data).then((response) => {
          return response.data;
        }),
      updatedealsettings: (data) =>
        api.post(URLs.updatedealsettings, data).then((response) => {
          return response.data;
        }),
      getsettings: () =>
        api.get(URLs.getsettings).then((response) => {
          return response.data;
        }),
      updatesetting: (data) =>
        api.post(URLs.updatesetting, data).then((response) => {
          return response.data;
        }),
      updatetaxationsetting: (data) =>
        api.post(URLs.updatetaxationsetting, data).then((response) => {
          return response.data;
        }),
      get_digio_setting: (data) =>
        api.post(URLs.get_digio_setting, data).then((response) => {
          return response.data;
        }),
      update_digio_setting: (data) =>
        api.post(URLs.update_digio_setting, data).then((response) => {
          return response.data;
        }),
    },
    getdashboarddetails: () =>
      api.get(URLs.getdashboarddetails).then((response) => {
        return response.data;
      }),

    investor: {
      list: () =>
        api.get(URLs.investorlist).then((response) => {
          return response.data;
        }),
      add: (data, config) =>
        api.post(URLs.addinvestor, data, config).then((response) => {
          return response.data;
        }),
      edit: (data, config) =>
        api.post(URLs.updateinvestor, data, config).then((response) => {
          return response.data;
        }),
      delete: (data, config) =>
        api.post(URLs.deleteinvestor, data, config).then((response) => {
          return response.data;
        }),
      update_enable_status: (data) =>
        api.post(URLs.update_enable_status, data).then((response) => {
          return response.data;
        }),
      getstartupinvestorlist: (data) =>
        api.post(URLs.getstartupinvestorlist, data).then((response) => {
          return response.data;
        }),
      send_email_to_investors: (data) =>
        api.post(URLs.send_email_to_investors, data).then((response) => {
          return response.data;
        }),
    },

    document: {
      list: (data) =>
        api.post(URLs.documentlist, data).then((response) => {
          return response.data;
        }),
      add: (data, config) =>
        api.post(URLs.adddocument, data, config).then((response) => {
          return response.data;
        }),
      edit: (data, config) =>
        api.post(URLs.updatedocument, data, config).then((response) => {
          return response.data;
        }),
      delete: (data, config) =>
        api.post(URLs.deletedocument, data, config).then((response) => {
          return response.data;
        }),
    },

    analytics: {
      getdealsbystartupid: (data) =>
        api.post(URLs.getdealsbystartupid, data).then((response) => {
          return response.data;
        }),
      get_analytics: (data) =>
        api.post(URLs.get_admin_analytics, data).then((response) => {
          return response.data;
        }),
      update_analytics: (data) =>
        api.post(URLs.update_admin_analytics, data).then((response) => {
          return response.data;
        }),
      delete_analytics: (data) =>
        api.post(URLs.delete_admin_analytics, data).then((response) => {
          return response.data;
        }),
    },

    investment: {
      approveinvestment: (data) =>
        api.post(URLs.approveinvestment, data).then((response) => {
          return response.data;
        }),
      transferfund: (data) =>
        api.post(URLs.transferfund, data).then((response) => {
          return response.data;
        }),
      get_signer_basic_details: (data) =>
        api.post(URLs.get_signer_basic_details, data).then((response) => {
          return response.data;
        }),
    },

    get_authorized_signatory_details: (data) =>
      api.post(URLs.get_authorized_signatory, data).then((response) => {
        return response.data;
      }),
    block_disable_investor: (data) =>
      api.post(URLs.block_disable_investor, data).then((response) => {
        return response.data;
      }),
  },

  startups: {
    list: () =>
      api.get(URLs.startuplist).then((response) => {
        return response.data;
      }),
    add: (data) =>
      api.post(URLs.addstartup, data).then((response) => {
        return response.data;
      }),
    edit: (data) =>
      api.post(URLs.updatestartup, data).then((response) => {
        return response.data;
      }),
    delete: (data, config) =>
      api.post(URLs.deletestartup, data, config).then((response) => {
        return response.data;
      }),
  },

  getcashfreetoken: () =>
    api.get(URLs.getcashfreetoken).then((response) => {
      return response.data;
    }),

  getcheckstatus: () =>
    api.get(URLs.getcheckstatus).then((response) => {
      return response.data;
    }),

  //for admin institutional referral
  institutionalReferral: {
    list: () =>
      api.get(URLs.getinstutionalreferral).then((response) => {
        return response.data;
      }),
    get_edit_list: (data) =>
      api
        .post(URLs.get_institutional_referral_edit_list, data)
        .then((response) => {
          return response.data;
        }),
    add: (data) =>
      api.post(URLs.addinstutionalreferral, data).then((response) => {
        return response.data;
      }),
    update: (data) =>
      api.post(URLs.updateinstutionalreferral, data).then((response) => {
        return response.data;
      }),
    delete: (data, config) =>
      api
        .post(URLs.deleteinstutionalreferral, data, config)
        .then((response) => {
          return response.data;
        }),
    uploadreferralimg: (data, config) =>
      api.post(URLs.uploadreferralimg, data, config).then((response) => {
        return response.data;
      }),
    updatestatus: (data) =>
      api
        .post(URLs.update_institutional_referral_status, data)
        .then((response) => {
          return response.data;
        }),
    sendemail: (data) =>
      api.post(URLs.sendreferralemail, data).then((response) => {
        return response.data;
      }),
  },
  adminretailReferral: {
    list: () =>
      api.get(URLs.get_all_referral_investor_list).then((response) => {
        return response.data;
      }),
  },
  blog_category: {
    list: () =>
      api.get(URLs.get_blog_category_list).then((response) => {
        return response.data;
      }),
    add: (data) =>
      api.post(URLs.add_blog_category, data).then((response) => {
        return response.data;
      }),
    update: (data) =>
      api.post(URLs.update_blog_category, data).then((response) => {
        return response.data;
      }),
    delete: (data) =>
      api.post(URLs.delte_blog_category, data).then((response) => {
        return response.data;
      }),
  },
  delete_pitch_file: (data) =>
    api.post(URLs.delete_pitch_file, data).then((response) => {
      return response.data;
    }),
  contact_us_form: (data) => {
    let res = api.post(URLs.contact_us_form, data);
    return res;
  },
  family: {
    creategroup: (data) =>
      api.post(URLs.creategroup, data).then((response) => {
        return response.data;
      }),
    getGroupList: (data) =>
      api.post(URLs.getGroupList, data).then((response) => {
        return response.data;
      }),
    getGroupListForInvestment: (data) =>
      api.post(URLs.getGroupListForInvestment, data).then((response) => {
        return response.data;
      }),
    checkFamilyMember: (data) =>
      api.post(URLs.checkFamilyMember, data).then((response) => {
        return response.data;
      }),
    saveInvite: (data) =>
      api.post(URLs.saveInvite, data).then((response) => {
        return response.data;
      }),
    familyInviteOTP: (data) =>
      api.post(URLs.familyInviteOTP, data).then((response) => {
        return response.data;
      }),
    verifyFamilyInvite: (data) =>
      api.post(URLs.verifyFamilyInvite, data).then((response) => {
        return response.data;
      }),
    editGroup: (data) =>
      api.post(URLs.editGroup, data).then((response) => {
        return response.data;
      }),
    deleteGroupMember: (data) =>
      api.post(URLs.deleteGroupMember, data).then((response) => {
        return response.data;
      }),
    deleteRequest: (data) =>
      api.post(URLs.deleteRequest, data).then((response) => {
        return response.data;
      }),
    getDeleteRequest: (data) =>
      api.post(URLs.getDeleteRequest, data).then((response) => {
        return response.data;
      }),
    deleteRequestApprove: (data) =>
      api.post(URLs.deleteRequestApprove, data).then((response) => {
        return response.data;
      }),
    deleteGroup: (data) =>
      api.post(URLs.deleteGroup, data).then((response) => {
        return response.data;
      }),

    addInvestor: (data) =>
      api.post(URLs.addInvestor, data).then((response) => {
        return response.data;
      }),
  },
  Unicorn: {
    adminEditUnicornPlan: (data) => 
      api.post(URLs.adminEditUnicornPlan, data).then((response) => {
        return response.data;
      }),
    createunicorndraft: (data) =>
      api.post(URLs.createunicorndraft, data).then((response) => {
        return response.data;
      }),
    unicornListByFounders: (data) =>
      api.post(URLs.unicornListByFounders, data).then((response) => {
        return response.data;
      }),
    editunicorndraft: (data) =>
      api.post(URLs.editunicorndraft, data).then((response) => {
        return response.data;
      }),
    publishunicorndeal: (data) =>
      api.post(URLs.publishunicorndeal, data).then((response) => {
        return response.data;
      }),
    editunicorndraftAdditional: (data) =>
      api.post(URLs.editunicorndraftadditional, data).then((response) => {
        return response.data;
      }),
    publishunicorndealAdditional: (data) =>
      api.post(URLs.publishunicorndealadditional, data).then((response) => {
        return response.data;
      }),
    unicorndealsByInvestors: (data) =>
      api.post(URLs.unicorndealsByInvestors, data).then((response) => {
        return response.data;
      }),
    getAllUnicorns: (data) =>
      api.post(URLs.getAllUnicorns, data).then((response) => {
        return response.data;
      }),
    getUnicornPayment: (data) =>
      api.post(URLs.getUnicornPayment, data).then((response) => {
        return response.data;
      }),
    uploadunicornFiles: (data) =>
      api.post(URLs.uploadunicornFiles, data).then((response) => {
        return response.data;
      }),
    uploadFiles: (data) =>
      api.post(URLs.uploadFiles, data).then((response) => {
        return response.data;
      }),
    uploadCoverImages: (data) =>
      api.post(URLs.uploadCoverImages, data).then((response) => {
        return response.data;
      }),
    getCoverImages: (data) =>
      api.post(URLs.getCoverImages, data).then((response) => {
        return response.data;
      }),
    reorderCoverImages: (data) =>
      api.post(URLs.reorderCoverImages, data).then((response) => {
        return response.data;
      }),
    add_unicorn_interest: (data) =>
      api.post(URLs.add_unicorn_interest, data).then((response) => {
        return response.data;
      }),
    unicorn_interested_list: (data) =>
      api.post(URLs.unicorn_interested_list, data).then((response) => {
        return response.data;
      }),
    unicorn_Publish_unpublish: (data) =>
      api.post(URLs.unicorn_Publish_unpublish, data).then((response) => {
        return response.data;
      }),
    get_founder_detail_for_unicorn: (data) =>
      api.post(URLs.get_founder_detail_for_unicorn, data).then((response) => {
        return response.data;
      }),
    get_payment_link: (data) =>
      api.post(URLs.get_payment_link, data).then((response) => {
        return response.data;
      }),
    save_gst_number: (data) =>
      api.post(URLs.save_gst_number, data).then((response) => {
        return response.data;
      }),
    addOfflinePayment: (data) =>
      api.post(URLs.addOfflinePayment, data).then((response) => {
        return response.data;
      }),
    toggle_unicorn_highlight: (data) =>
      api.post(URLs.toggle_unicorn_highlight, data).then((response) => {
        return response.data;
      }),
    getUnicornTheme: (data) =>
      api.post(URLs.getUnicornTheme, data).then((response) => {
        return response.data;
      }),
    updateUnicornTheme: (data) =>
      api.post(URLs.updateUnicornTheme, data).then((response) => {
        return response.data;
      }),
    GuestAnalytics: {
      addEvent: (data) =>
        api.post(URLs.guestAnalyticsAddEvent, data).then((response) => {
          return response.data;
        }),
    },
  },
};
