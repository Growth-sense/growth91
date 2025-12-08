/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Card,
  Button,
  message,
  Select,
  Input,
  Dropdown,
  Menu,
} from "antd";
import Navbar from "./common/Navbar";
import BottomBar from "./common/BottomBar";
import Bridge from "../constants/Bridge";
import Sidebar2 from "./common/Sidebar2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Urldata from "../investor/components/Urldata";
import { DownloadOutlined } from "@ant-design/icons";
import URLs from "../constants/Apis";
import NoPermission from "./common/NoPermission";
import { loadModulePermissions } from "./common/permissions";

const { Content } = Layout;

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

class UnicornAdminAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startups: [],
      cstartups: [],
      startupid: "",
      unicornDealID: "",
      searchinput: "",

      // add
      name: "",
      status: "",
      created_at: "",

      // edit
      editname: "",
      editstatus: "",
      editModalStatus: false,

      addModalStatus: false,
      loading: false,
      formloader: false,
      founderlist: [],
      selectedfounder: [],
      editselectedfounder: [],
      authorised_founder: "",
      operational_founder: "",
      edit_authorised_founder: "",
      edit_operational_founder: "",
      enquireModalStatus: false,
      publishModalStatus: false,
      commitexport: "",
      unicornstatus: "",
      intrestedlist: "",
      show_investor_presentation_modal: false,
      previewid: "",
      formpreviewid: "",
      previewmodal: false,
      formpreviewmodal: false,
      downloadingFile: false,

      // permissions for Future Unicorn – View All Unicorns
      canExportAllList: false,
      canExportSingle: false,
      canDownloadProductDeck: false,
      canDownloadPitchDeck: false,
    };
  }

  async componentDidMount() {
    await this.loadPermissions();
    if (this.props.noPermission) {
    return; // no view access → don't call list APIs, founder list, etc.
  }
    this.getgrouplist();
    // this.getstartuplist();
    setTimeout(() => {
    }, 1000);
  }

  loadPermissions = async () => {
    try {
      const perms = await loadModulePermissions("unicorns_all");
      this.setState({
        canExportAllList: perms.canUnicornsAllExportList,
        canExportSingle: perms.canUnicornsAllExportSingle,
        canDownloadProductDeck: perms.canUnicornsAllDownloadProductDeck,
        canDownloadPitchDeck: perms.canUnicornsAllDownloadPitchDeck,
      });
    } catch (e) {
      // if permissions fail to load, keep defaults (no change)
    }
  };

  // get post list
  getgrouplist = () => {
    this.setState({ loading: true });
    let params = {
      page: 0,
      pagesize: 10,
    };
    Bridge.Unicorn.getAllUnicorns(params).then((result) => {
      if (result.status == 1) {
        // console.log(result);

        this.setState({
          startups: result.data,
          cstartups: result.data,
          loading: false,
        });
      } else {
        message.error(result.message);
        this.setState({
          loading: false,
        });
      }
    });
  };

  // SEARCH
  searchinput = (e) => {
    let text = e.target.value;
    this.setState({ loading: true, searchinput: text });
    if (text) {
      let arr = [];

      for (let item of this.state.startups) {
        if (
          (item.tudStartupFounderName &&
            item.tudStartupFounderName
              .toLowerCase()
              .includes(text.toLowerCase())) ||
          (item.tudStartupName &&
            item.tudStartupName.toLowerCase().includes(text.toLowerCase())) ||
          (item.tudStartupFounderEmail &&
            item.tudStartupFounderEmail.toLowerCase().includes(text.toLowerCase())) ||
          // (item.status &&
          //   item.status.toLowerCase().includes(text.toLowerCase())) ||
          (item.tudTempUdID &&
            item.tudTempUdID.includes(text.toLowerCase()))
        ) {
          arr = [...arr, item];
        }
      }
      this.setState({
        startups: arr,
        loading: false,
      });
    } else {
      this.setState({
        startups: this.state.cstartups,
        loading: false,
      });
    }
  };

  exportToCSV = (fileName) => {
    if (!this.state.canExportAllList) {
      message.error("You do not have permission to export all unicorns list.");
      return;
    }
    let arr = [];
    let count = 1;
    for (let item of this.state.startups) {
      let obj = {
        "Sr No": count++,
        "Unicorn ID": item.tudTempUdID ? item.tudTempUdID : "---",
        "Unicorn Name": item.tudStartupName ? item.tudStartupName : "---",
        "Unicorn Status": item.mainPublished == "Published"? "Published" : "Draft",
        "Founder Id": item.founderID ? item.founderID : "---",
        Email: item.tudStartupFounderEmail ? item.tudStartupFounderEmail : "---",
        "Founder Name": item.tudStartupFounderName
          ? item.tudStartupFounderName
          : "---",
        "Founder Mobile": item.tudStartupFounderMobileNumber
          ? item.tudStartupFounderMobileNumber
          : "---",
      };
      arr = [...arr, obj];
    }
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    message.success("Unicorns data exported successfully.");
  };

  exportToExcel = (item) => {
  if (!this.state.canExportSingle) {
    message.error("You do not have permission to export single unicorn data.");
    return;
  }
  this.setState({ loading: true });
  try {
    let obj = {
      // BasicDetails Form
      "Startup Name": item.tudStartupName || "---",

      // Supporting Documents (Step20)
      "Pitch Deck": item.tudPitchDeck ? "Available" : "Not Available",
      "Product Deck": item.tudProductDeck ? "Available" : "Not Available",
      "Banner Image": item.tudBannerImage ? "Available" : "Not Available",
      "Logo Image": item.tudLogoImage ? "Available" : "Not Available",
      "Sponsor Name": item.tudSponsorName || "---",
      "Sponsor Image": item.tudSponsorImage ? "Available" : "Not Available",
      
      // Social Media Presence (Step9)
      "Website": item.tudWebsite || "---",
      "LinkedIn": item.tudSocialLinkedIn || "---",
      "Facebook": item.tudSocialFacebook || "---",
      "Instagram": item.tudSocialInsta || "---",
      "YouTube": item.tudSocialYouTube || "---",
      "Other Social Media": item.tudSocialOthers || "---",
      
      // Other Info (Dellistinicorn)
      "Startup Founder Name": item.tudStartupFounderName || "---",
      "Company Legal Name": item.tudLegalname || "---",
      "Founder Mobile Country Code": item.tudStartupFounderMobileCountryCode || "---",
      "Founder Mobile Number": item.tudStartupFounderMobileNumber || "---",
      "Founder Email": item.tudStartupFounderEmail || "---",
      "Date of Incorporation": item.tudFoundedon || "---",
      "Registered Address": item.tudAddress || "---",
      "Team Size": item.tudEmployees || "---",
      "Elevator Pitch": item.tudDealDescription || "---",
      "Video Link": item.tudYoutubeLink || "---",
      "Startup Sector": item.tudCategory || "---",
      "Visibility Tags": item.tudTag || "---",
      
      // Declaration (Step19)
      "Declaration": item.tudDeclare ? "Accepted" : "Not Accepted",
      
      // Additional Information Forms (if available)
      
      // Company Legal Entity (Step8)
      "Legal Name (Entity)": item.tudLeagalName || "---",
      "Legal CIN": item.tudLegalCin || "---",
      "Legal PAN": item.tudLegalPan || "---",
      "Legal Country": item.tudLegalCountry || "---",
      "Established Date": item.tudEstablishedDate || "---",
      "Activity Started Date": item.tudActivityStartedDate || "---",
      "Registered Office": item.tudRegisteredOffice || "---",
      "Corporate Office": item.tudCorporateOffice || "---",
      "Director 1": item.tudDirector1 || "---",
      "DIN 1": item.tudDin1 || "---",
      "Director 2": item.tudDirector2 || "---",
      "DIN 2": item.tudDin2 || "---",
      "Director 3": item.tudDirector3 || "---",
      "DIN 3": item.tudDin3 || "---",
      "Director 4": item.tudDirector4 || "---",
      "DIN 4": item.tudDin4 || "---",
      
      // Idea/Business (Step2)
      "Disrupting Market": item.tudDisruptingMarket || "---",
      "Tapping New Market": item.tudTappingNew || "---",
      "Customer Benefit": item.tudCustomerBenifit || "---",
      "Suppliers Benefit": item.tudSuppliersBenifit || "---",
      "Direct Substitute Available": item.tudDirectSubstitueAvailable || "---",
      "Indirect Substitute Available": item.tudIndirectSubstitueAvailable || "---",
      "Risk Perceived": item.tudRiskPerceived || "---",
      "Roles Core Team": item.tudRolesCoreTeam || "---",
      "Moats": item.tudMoats || "---",
      "Scaleup Challenges": item.tudScaleupChallenges || "---",
      "Focused On Product": item.tudFocusedOnProduct || "---",
      
      // Intellectual Property (Step3)
      "Trademark": item.tudTrademark || "---",
      "Patents": item.tudPatents || "---",
      "Other IPs": item.tudOtherIPs || "---",
      "Other Details IPs": item.tudOtherDetailsIPs || "---",
      "IPs Registration Info": item.tudIPsRegistrationInfo || "---",
      
      // Mobile App (Step4)
      "Android Mobile App": item.tudAndroidMobileApp || "---",
      "Android App Details": item.tudAndroidAppDetails || "---",
      "iPhone Mobile App": item.tudIphoneMobileApp || "---",
      "iPhone App Details": item.tudIphoneAppDetails || "---",
      
      // Industry Market (Step5)
      "Industry Classification": item.tudIndustryClassification || "---",
      "Industry Views": item.tudIndustryViews || "---",
      "Industry Market Size": item.tudIndustryMarketSize || "---",
      "Supporting Info Market Size": item.tudSupportingInfoMarketSize || "---",
      "Addressable Market Size": item.tudAddressableMarketSize || "---",
      "Supporting Info Addressable Market Size": item.tudSupportingInfoAddressableMarketSize || "---",
      
      // Competition (Step6)
      "Local Direct Competition": item.tudLocalDirectComp || "---",
      "Local Indirect Competition": item.tudLocalIndirectComp || "---",
      "Global Direct Competition": item.tudGlobalDirectComp || "---",
      "Global Indirect Competition": item.tudGlobalIndirectComp || "---",
      "Difference from Competition": item.tudDiffCompetion || "---",
      "Why Competition Same": item.tudWhyCompSame || "---",
      "Unfair Advantage": item.tudUnfairAdv || "---",
      "Like Competition": item.tudLikeCompetion || "---",
      "Failed Venture": item.tudFailVenture || "---",
      "Failure Reason": item.tudFailureReason || "---",
      
      // SWOT (Step7)
      "Strength": item.tudStrength || "---",
      "Weakness": item.tudWeakness || "---",
      "Opportunities": item.tudOpportunities || "---",
      "Threats": item.tudThreats || "---",
      
      // Go To Market (Step10)
      "GTM Strategy": item.tudGtmStratergy || "---",
      "GTM Backup": item.tudGtmBackup || "---",
      "Existing CAC": item.tudExistingCac || "---",
      "Expected CAC": item.tudExpectedCac || "---",
      "Logic CAC": item.tudLogicCac || "---",
      "LTV Customer": item.tudLtvCustomer || "---",
      "Logic LTV Number": item.tudLogicLtvNumber || "---",
      "LTV CAC Ratio": item.tudLtvCacRatio || "---",
      
      // Financials (Step11)
      "Number of Clients": item.tudNumberofClients || "---",
      "Client Retentions": item.tudClientRetentions || "---",
      "Revenue Top 10": item.tudRevenueTop10 || "---",
      "Unit Economics": item.tudUnitEconomics || "---",
      "Total CapEx": item.tudTotalCapEx || "---",
      "Amount Spent Product Development": item.tudAmountSpentProdDev || "---",
      "Major Expense Investment": item.tudMajorExpInv || "---",
      
      // Capital (Step12)
      "Authorised Capital": item.tudAuthorisedCap || "---",
      "Paid-up Capital": item.tudPaidupCapi || "---",
      "Founder Percentage": item.tudFounderPer || "---",
      "Core Team Percentage": item.tudCorePer || "---",
      "ESOP Percentage": item.tudEsopPer || "---",
      "Other Percentage": item.tudOtherPer || "---",
      "Amount by Founder": item.tudAmountByFounder || "---",
      "Unsecured Loan Founder": item.tudUnsecLoanFounder || "---",
      "Unsecured Loan Others": item.tudUnsecLoanOthers || "---",
      "Other Loan": item.tudOtherLoan || "---",
      
      // Salaries (Step13)
      "Founder Salary": item.tudFounderSalary || "---",
      "Founder Salary Plan": item.tudFounderSalaryPlan || "---",
      "Core Team Salary": item.tudCoreTeamSalary || "---",
      "Total Salary": item.tudTotalSalary || "---",
      
      // Funding Details (Step14)
      "Previous Fund Raised": item.tudPreviousFundRaised || "---",
      "Fund Required": item.tudFundRequired || "---",
      "Expected Runway": item.tudExpRunway || "---",
      "Value Fund Raise": item.tudValueFundRaise || "---",
      "Logic Fund Raise": item.tudLogicFundRaise || "---",
      "Open to Lower": item.tudOpentoLower || "---",
      
      // Use Of Funds (Step15)
      "CapEx Immediate": item.tudCapexImmidate || "---",
      "CapEx Future": item.tudCapexFuture || "---",
      "Product Fund": item.tudProductFund || "---",
      "Marketing Fund": item.tudMarketingFund || "---",
      "Salary Fund": item.tudSalaryFund || "---",
      "Cost Commission Fund": item.tudCastComFund || "---",
      "Others Fund": item.tudOthersFund || "---",
      "Repayment Fund": item.tudRepaymentFund || "---",
      "Use of Fund Repayment": item.tudUseofFundRepayment || "---",
      
      // Compliances (Step16)
      "GST Registered": item.tudGstRegistered || "---",
      "GST Details": item.tudGstDetails || "---",
      "Audited Balance Sheet": item.tudAuditedBL || "---",
      "ITR Filling": item.tudItrFilling || "---",
      "AGM": item.tudAgm || "---",
      "Pending ROC": item.tudPendingRoc || "---",
      "Past Delays": item.tudPastDelays || "---",
      "Other Applicable Compliance": item.tudOtherApplicableCompliance || "---",
      "CA Info": item.tudCaInfo || "---",
      "CS Info": item.tudCsInfo || "---",
      "Other Legal Info": item.tudOtherLegalInfo || "---",
      
      // Other Important Indicators (Step17)
      "Sale Exit Info": item.tudSaleExitInfo || "---",
      "Dependency Person": item.tudDepedencyPerson || "---",
      "Regularity Issue": item.tudReglarityIssue || "---",
      "License Permission Status": item.tudLicPermissionStatus || "---",
      "5% Commission": item.tud5perCommission || "---",
      "10% Commission": item.tud10perCommission || "---",
      "Exit Timeline": item.tudExitTimeline || "---",
      "Subsidiaries": item.tudSubsidiries || "---",
      "Sister Concerns": item.tudSisterConcerns || "---",
      "Related Party Transactions": item.tudRelatedPartyTrans || "---",
      "Legal Risk": item.tudLegalRisk || "---",
      "Founder Exit Earlier": item.tudFounderExitEarlier || "---",
      "Demo Link": item.tudDemoLink || "---",
      "Other Docs Links": item.tudOtherDocsLinks || "---",
      "Media Cover Links": item.tudMediaCoverLinks || "---",
      "Awards": item.tudAwards || "---",
      "Startup Recognition": item.tudStartupRecon || "---",
      "Other Info": item.tudOtherInfo || "---",
      
      // References (Step18)
      "Customer Reference": item.tudCustomerRef || "---",
      "Vendor Reference": item.tudVendorRef || "---",
      "Past Employer Reference": item.tudPastEmployerRef || "---",
      "Guide Reference": item.tudGuideRef || "---",
      
      // // Deal Information
      // "Deal Show Date Regular Member": item.tudDealShowDateForRegularMember || "---",
      // "Deal Show Date Premium Member": item.tudDealShowDateForPremiumMember || "---",
      // "Deal Start Date Regular Member": item.tudDealStartDateForRegularMember || "---",
      // "Deal Start Date Premium Member": item.tudDealStartDateForPremiumMember || "---",
      // "Deal End Date Regular Member": item.tudDealEndDateForRegularMember || "---",
      // "Deal End Date Premium Member": item.tudDealEndDateForPremiumMember || "---",
      // "Target Amount": item.tudTargetAmount || "---",
      // "Min Investment Amount": item.tudMinInvestmentAmount || "---",
      // "CAP Table Threshold Amount": item.tudCAPTableThresholdAmount || "---",
      // "Max Investment Amount": item.tudMaxInvestmentAmount || "---",
      // "CAP Table Multiple": item.tudCAPTableMultiple || "---",
      // "Multiples Of": item.tudMultiplesOf || "---",
      // "Raise Gap": item.tudRaiseGap || "---",
      // "Enable Special Offer": item.tudEnableSpecialOffer || "---",
      // "Special Offer Text": item.tudSpecialOfferText || "---",
      // "Input Default Text": item.tudInputDefaultText || "---",
      // "Discount": item.tudDiscount || "---",
      
      // // Escrow Account Details
      // "Escrow Account Name": item.tudEscrowAccountName || "---",
      // "Escrow Account Number": item.tudEscrowAccountNumber || "---",
      // "Escrow Account Bank": item.tudEscrowAccountBank || "---",
      // "Escrow Account Branch": item.tudEscrowAccountBranch || "---",
      // "Escrow Account IFSC": item.tudEscrowAccountIFSC || "---",
      
      // // Digital Signature
      // "Digio Template ID": item.tudDigioTemplateId || "---",
      // "Digio Sign for Investor": item.tudDigioSignforInvestor || "---",
      // "Digio Sign for Founder": item.tudDigioSignforFounder || "---",
      
      // Additional Fields
      // "Page Link": item.tudPageLink || "---",
      // "Tag": item.tudTag || "---",
      // "Accepted Date": item.tudAcceptedDate || "---",
      // "Published Date": item.tudPublishedDate || "---",
      // "Expiry Date": item.tudExpiryDate || "---",
      
      // Status Information
      "Status": item.mainPublished === "Published" ? "Published" : "Draft",
      "Founder ID": item.founderID || "---"
    };
    
    // Parse and add Market Insights (from Supporting Documents)
    if (item.tudMark) {
      try {
        const marketInsights = JSON.parse(item.tudMark);
        marketInsights.forEach((insight, index) => {
          obj[`Market Insight ${index + 1}`] = insight.content1 || "---";
        });
      } catch (e) {
        console.error("Error parsing market insights:", e);
        // Add default entries if parsing fails
        obj["Market Insight 1"] = "---";
        obj["Market Insight 2"] = "---";
        obj["Market Insight 3"] = "---";
      }
    } else {
      // Add default entries if no data
      obj["Market Insight 1"] = "---";
      obj["Market Insight 2"] = "---";
      obj["Market Insight 3"] = "---";
    }
    
    // Parse and add Startup Highlights (from Supporting Documents)
    if (item.tudStartupHighlights) {
      try {
        const highlights = JSON.parse(item.tudStartupHighlights);
        const highlightTitles = ["Revenue Growth", "Ops & Efficiency", "Traction", "Fundraising"];
        highlights.forEach((highlight, index) => {
          const title = highlightTitles[index] || `Highlight ${index + 1}`;
          obj[`${title}`] = highlight.content1 || "---";
        });
      } catch (e) {
        console.error("Error parsing startup highlights:", e);
        // Add default entries if parsing fails
        obj["Revenue Growth"] = "---";
        obj["Ops & Efficiency"] = "---";
        obj["Traction"] = "---";
        obj["Fundraising"] = "---";
      }
    } else {
      // Add default entries if no data
      obj["Revenue Growth"] = "---";
      obj["Ops & Efficiency"] = "---";
      obj["Traction"] = "---";
      obj["Fundraising"] = "---";
    }
    
    // Parse and add Team Members
    if (item.tudVendorId) {
      try {
        const teamMembers = JSON.parse(item.tudVendorId);
        teamMembers.forEach((member, index) => {
          obj[`Team Member ${index + 1} Name`] = member.name || "---";
          obj[`Team Member ${index + 1} Role`] = member.Role || "---";
          obj[`Team Member ${index + 1} Experience`] = member.description1 || "---";
          obj[`Team Member ${index + 1} Contribution`] = member.description2 || "---";
          obj[`Team Member ${index + 1} LinkedIn`] = member.linkedinUrl || "---";
          obj[`Team Member ${index + 1} Image`] = member.img ? "Available" : "Not Available";
        });
      } catch (e) {
        console.error("Error parsing team data:", e);
      }
    }
    
    // Parse and add Media Coverage
    if (item.tudMediaCoverageFiles) {
      try {
        const mediaCoverage = JSON.parse(item.tudMediaCoverageFiles);
        mediaCoverage.forEach((media, index) => {
          obj[`Media Coverage ${index + 1} Title`] = media.title || "---";
          obj[`Media Coverage ${index + 1} Content`] = media.content || "---";
          obj[`Media Coverage ${index + 1} Image`] = media.img ? "Available" : "Not Available";
        });
      } catch (e) {
        console.error("Error parsing media coverage:", e);
      }
    }
    
    let arr = [obj];
    const transposedData = Object.keys(obj).map(key => ({
    'Field': key,
    'Value': obj[key]
}));
    const ws = XLSX.utils.json_to_sheet(transposedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Unicorn_${item.tudTempUdID}${fileExtension}`);
    message.success("Unicorn data exported successfully.");
  } catch (error) {
    console.error("Error exporting data:", error);
    message.error("Failed to export data. Please try again.");
  } finally {
    this.setState({ loading: false });
  }
};


  
  downloadFile = (unicornId, url, fileName) => {
    if (!url) {
      message.error("File not available for download");
      return;
    }

    // Permission checks based on file type inferred from fileName
    if (fileName.includes("_Product_Deck")) {
      if (!this.state.canDownloadProductDeck) {
        message.error("You do not have permission to download product deck.");
        return;
      }
    } else if (fileName.includes("_Pitch_Deck")) {
      if (!this.state.canDownloadPitchDeck) {
        message.error("You do not have permission to download pitch deck.");
        return;
      }
    }
    
    this.setState({ downloadingFile: true });
    
    // Construct the full URL
    const fileUrl = `${URLs.IMAGEURL}unicorndeals/${unicornId}/${url}`;
    
    fetch(fileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        message.success(`${fileName} downloaded successfully`);
      })
      .catch(error => {
        message.error("Error downloading file");
        console.error("Error downloading file:", error);
      })
      .finally(() => {
        this.setState({ downloadingFile: false });
      });
  };
        
  

  
  
   
  


  getmember = (value, id) => {
    this.setState({ ids: value });
    let params = {
      parent_id: localStorage.getItem("Parent_investor_id"),
      groupID: value,
    };
    Bridge.investor.getfamilymember(params).then((result) => {
      // console.log(result);
      const data = result.data.filter((item, index) => {
        // console.log(item.investor_id);
        // console.log(localStorage.getItem("investor_id"));
        return item.investor_id == localStorage.getItem("investor_id");
      });
      // console.log(data);
      // console.log(data.length, "0");
      //   if(data.length !=0 ){
      //     localStorage.setItem(
      //       "investor_id",
      //       localStorage.getItem("Parent_investor_id")
      //     );
      //     localStorage.setItem(
      //       "investor_email",
      //       localStorage.getItem("Parent_investor_email")
      //     );
      //     localStorage.setItem(
      //       "investor_kycstatus",
      //       localStorage.getItem("Parent_investor_kycstatus")
      //     );
      //     localStorage.setItem(
      //       "investor_name",
      //       localStorage.getItem("Parent_investor_name")
      //     );
      // // window.location.reload();

      //   }
      this.setState({ memberdetail: result.data });
    });
  };

  render() {
    
    const { noPermission } = this.props;

    const dataSource =
      this.state.startups &&
      this.state.startups.map((item, index) => {
        // Parse product deck and pitch deck URLs if they exist
        let productDeckUrl = null;
        let pitchDeckUrl = null;
        
        try {
          if (item.tudProductDeck && item.tudProductDeck !== "") {
            productDeckUrl = JSON.parse(item.tudProductDeck);
          }
        } catch (e) {
          console.error("Error parsing product deck URL:", e);
        }
        
        try {
          if (item.tudPitchDeck && item.tudPitchDeck !== "") {
            pitchDeckUrl = JSON.parse(item.tudPitchDeck);
          }
        } catch (e) {
          console.error("Error parsing pitch deck URL:", e);
        }
        
        return {
          UnicornID: item.tudTempUdID ? item.tudTempUdID : "---",
          "Unicorn Name": item.tudStartupName ? item.tudStartupName : "---",
          Email: item.tudStartupFounderEmail ? item.tudStartupFounderEmail : "---",
          "Unicorn Status": item.mainPublished =="Published"? "Published":"Draft",
          "Admin Name": item.tudStartupFounderName
            ? item.tudStartupFounderName
            : "---",
          "Admin Mobile": item.tudStartupFounderMobileNumber
            ? item.tudStartupFounderMobileNumber
            : "---",
          AdminId: item.founderID ? item.founderID : "---",
          productDeckUrl: productDeckUrl,
          pitchDeckUrl: pitchDeckUrl,
          action: item,
        };
      });

    const columns = [
      {
        title: "Unicorn ID",
        dataIndex: "UnicornID",
        key: "UnicornID",
        width: 260,
        fixed: "left",
      },
      {
        title: "Unicorn Name",
        dataIndex: "Unicorn Name",
        key: "Unicorn Name",
        width: 280,
      },
      {
        title: "Unicorn Status",
        dataIndex: "Unicorn Status",
        key: "Unicorn Status",
        width: 280,
      },

      {
        title: "Founder ID",
        dataIndex: "AdminId",
        key: "AdminId",
        width: 280,
      },
      {
        title: "Founder Name",
        dataIndex: "Admin Name",
        key: "Admin Name",
        width: 280,
      },

      {
        title: "Founder Email ID",
        dataIndex: "Email",
        key: "Email",
        width: 280,
      },

      {
        title: "Founder Mobile No.",
        dataIndex: "Admin Mobile",
        key: "Admin Mobile",
        width: 280,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          const menu = (
            <Menu mode="vertical" style={{ width: 250 }}>
              <Menu.Item
                key="export"
                icon={<DownloadOutlined />}
                disabled={!this.state.canExportSingle}
              >
                <a
                  href="#"
                  onClick={() => this.exportToExcel(text)}
                  style={{ fontSize: 14, color: this.state.canExportSingle ? 'inherit' : '#d9d9d9' }}
                >
                  &nbsp;&nbsp;Export Data
                </a>
              </Menu.Item>
              <Menu.Item
                key="productDeck"
                icon={<DownloadOutlined />}
                disabled={!record.productDeckUrl || !this.state.canDownloadProductDeck}
              >
                <a
                  href="#"
                  onClick={() => this.downloadFile(record.UnicornID, record.productDeckUrl, `${record["Unicorn Name"]}_Product_Deck.pdf`)}
                  style={{ fontSize: 14, color: record.productDeckUrl ? 'inherit' : '#d9d9d9' }}
                >
                  &nbsp;&nbsp;Download Product Deck
                </a>
              </Menu.Item>
              <Menu.Item
                key="pitchDeck"
                icon={<DownloadOutlined />}
                disabled={!record.pitchDeckUrl || !this.state.canDownloadPitchDeck}
              >
                <a
                  href="#"
                  onClick={() => this.downloadFile(record.UnicornID, record.pitchDeckUrl, `${record["Unicorn Name"]}_Pitch_Deck.pdf`)}
                  style={{ fontSize: 14, color: record.pitchDeckUrl ? 'inherit' : '#d9d9d9' }}
                >
                  &nbsp;&nbsp;Download Pitch Deck
                </a>
              </Menu.Item>
            </Menu>
          );
          
          return (
            <div>
              <Dropdown overlay={menu} placement="bottomRight">
                <a onClick={(e) => e.preventDefault()}>
                  <div className="menu-action">
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </div>
                </a>
              </Dropdown>
            </div>
          );
        },
      },
    ];

    return (
      <>
        <Layout
          style={{ minHeight: "100vh", marginTop: 0 }}
          className="main-dashboard-container"
        >
          <Urldata setid={this.getmember} />
          <Navbar />
          <Layout className="site-layout">
            <Sidebar2 />

            {noPermission ? (
              <NoPermission />
            ) : (
            <>

            <Content className="home-section">
              <Card title="Future Unicorn" style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: "0",
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>All Unicorns</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Input
                    value={this.state.searchinput}
                    placeholder="Search"
                    onChange={(e) => this.searchinput(e)}
                    style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                  />
                  <Button
                    type="primary"
                    onClick={() => this.exportToCSV("Unicorn_Details_All")}
                    disabled={!this.state.canExportAllList}
                  >
                    <i
                      className="bx bxs-cloud-download"
                      style={{
                        color: "#fff",
                        position: "relative",
                        top: 3,
                        left: -3,
                      }}
                    ></i>{" "}
                    Export Data
                  </Button>
                </div>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  loading={this.state.loading || this.state.downloadingFile}
                  bordered
                />
              </Card>
            </Content>

            <BottomBar />
            </>
            )}
          </Layout>
        </Layout>
      </>
    );
  }
}

export default UnicornAdminAll;
