import * as XLSX from "xlsx-js-style";
import { message } from "antd";

const fileExtension = ".xlsx";

export const exportAssessmentForm = (arr, customFileName) => {
  let fileName = customFileName || "Assessment Form Details";
  const wb = XLSX.utils.book_new();
  let mergeArr = [];

  // Assessment Details Header
  let col1Head = [
    {
      v: "Name",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Email",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Role type",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
  ];
  mergeArr.push(col1Head);

  for (let i = 0; i < 3; i++) {
    let d2_spac = [{ v: "" }, { v: "" }, { v: "" }];
    mergeArr.push(d2_spac);
  }

  // Self Assesment for Founder
  let colHeadF = [
    {
      v: "Name (Founder Self Assessment)",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Mobile Number",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "LinkedIn Profile URL",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Time Commitment",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Education, Institute, Year",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Year of Experience",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Previous employment briefs",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Brief family background",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Any other specific information",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Date of Joining the business",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Your Strength",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Your Weakness",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "What are your dreams?",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "What is your long-term vision?",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "What is your short-term vision/goal?",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Leadership Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of Finance Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of HR  Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of Law and Statutory Compliances  Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Passion for business Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Passion for Current Project Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Experimental Mindset Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Out of Box Thinking Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Problem Solving Skills Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Networking - Business Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Networking - Social Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
  ];

  mergeArr.push(colHeadF);

  for (let i in arr) {
    let item = arr[i];
    if (item.role_type == "founder") {
      let da = [
        { v: item.name ? item.name : "---" },
        { v: item.mobile ? item.mobile : "---" },
        { v: item.linkedIn ? item.linkedIn : "---" },
        { v: item.timeCommitment ? item.timeCommitment : "---" },
        { v: item.educationInstitute ? item.educationInstitute : "---" },
        { v: item.yearsOfExperience ? item.yearsOfExperience : "---" },
        { v: item.previousEmployment ? item.previousEmployment : "---" },
        {
          v: item.briefFamilyBackground ? item.briefFamilyBackground : "---",
        },
        { v: item.anyOtherSpecificInfo ? item.anyOtherSpecificInfo : "---" },
        { v: item.dtOfJoinBusiness ? item.dtOfJoinBusiness : "---" },
        { v: item.strength ? item.strength : "---" },
        { v: item.weakness ? item.weakness : "---" },
        { v: item.dreams ? item.dreams : "---" },
        { v: item.longTermVision ? item.longTermVision : "---" },
        { v: item.shortTermVision ? item.shortTermVision : "---" },
        { v: item.leadership ? item.leadership : "---" },
        { v: item.leaderShipReview ? item.leaderShipReview : "---" },
        { v: item.understanding_finance ? item.understanding_finance : "--" },
        {
          v: item.understandFinanceReview
            ? item.understandFinanceReview
            : "---",
        },
        { v: item.understanding_hr ? item.understanding_hr : "---" },
        { v: item.understandHrReview ? item.understandHrReview : "---" },
        { v: item.understanding_low ? item.understanding_low : "---" },
        { v: item.understandLawReview ? item.understandLawReview : "---" },
        { v: item.passion_of_business ? item.passion_of_business : "---" },
        {
          v: item.passionBusinessReview ? item.passionBusinessReview : "---",
        },
        {
          v: item.passion_for_current_project
            ? item.passion_for_current_project
            : "---",
        },
        {
          v: item.passionCurProjectReview
            ? item.passionCurProjectReview
            : "---",
        },
        { v: item.experimental_mindset ? item.experimental_mindset : "---" },
        {
          v: item.experimentalMindsetReview
            ? item.experimentalMindsetReview
            : "---",
        },
        { v: item.out_of_box_thinking ? item.out_of_box_thinking : "---" },
        { v: item.outOfBoxReview ? item.outOfBoxReview : "---" },
        { v: item.problem_solving ? item.problem_solving : "---" },
        { v: item.problemSolvingReview ? item.problemSolvingReview : "---" },
        { v: item.network_business ? item.network_business : "---" },
        {
          v: item.networkBusinessReview ? item.networkBusinessReview : "---",
        },
        { v: item.network_social ? item.network_social : "---" },
        { v: item.networkSocialReview ? item.networkSocialReview : "---" },
      ];
      mergeArr.push(da);
    }
  }

  for (let i = 0; i < 3; i++) {
    let d2_spac = [{ v: "" }, { v: "" }, { v: "" }];
    mergeArr.push(d2_spac);
  }

  // Self Assesment for Core-Team-Member
  let colHeadC = [
    {
      v: "Name (Core-Team-Member Self Assessment)",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Mobile Number",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "LinkedIn Profile URL",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Time Commitment",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Education, Institute, Year",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Year of Experience",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Previous employment briefs",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Brief family background",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Any other specific information",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Date of Joining the business",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Your Strength",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Your Weakness",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "What are your dreams?",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "What is your long-term vision?",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "What is your short-term vision/goal?",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Leadership Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of Finance Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of HR  Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of Law and Statutory Compliances  Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Passion for business Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Passion for Current Project Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Experimental Mindset Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Out of Box Thinking Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Problem Solving Skills Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Networking - Business Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Networking - Social Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Please support your rating with some justification, examples",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
  ];

  mergeArr.push(colHeadC);

  for (let i in arr) {
    let item = arr[i];
    if (item.role_type == "core-team-member") {
      let da = [
        { v: item.name ? item.name : "---" },
        { v: item.mobile ? item.mobile : "---" },
        { v: item.linkedIn ? item.linkedIn : "---" },
        { v: item.timeCommitment ? item.timeCommitment : "---" },
        { v: item.educationInstitute ? item.educationInstitute : "---" },
        { v: item.yearsOfExperience ? item.yearsOfExperience : "---" },
        { v: item.previousEmployment ? item.previousEmployment : "---" },
        {
          v: item.briefFamilyBackground ? item.briefFamilyBackground : "---",
        },
        { v: item.anyOtherSpecificInfo ? item.anyOtherSpecificInfo : "---" },
        { v: item.dtOfJoinBusiness ? item.dtOfJoinBusiness : "---" },
        { v: item.strength ? item.strength : "---" },
        { v: item.weakness ? item.weakness : "---" },
        { v: item.dreams ? item.dreams : "---" },
        { v: item.longTermVision ? item.longTermVision : "---" },
        { v: item.shortTermVision ? item.shortTermVision : "---" },
        { v: item.leadership ? item.leadership : "---" },
        { v: item.leaderShipReview ? item.leaderShipReview : "---" },
        { v: item.understanding_finance ? item.understanding_finance : "--" },
        {
          v: item.understandFinanceReview
            ? item.understandFinanceReview
            : "---",
        },
        { v: item.understanding_hr ? item.understanding_hr : "---" },
        { v: item.understandHrReview ? item.understandHrReview : "---" },
        { v: item.understanding_low ? item.understanding_low : "---" },
        { v: item.understandLawReview ? item.understandLawReview : "---" },
        { v: item.passion_of_business ? item.passion_of_business : "---" },
        {
          v: item.passionBusinessReview ? item.passionBusinessReview : "---",
        },
        {
          v: item.passion_for_current_project
            ? item.passion_for_current_project
            : "---",
        },
        {
          v: item.passionCurProjectReview
            ? item.passionCurProjectReview
            : "---",
        },
        { v: item.experimental_mindset ? item.experimental_mindset : "---" },
        {
          v: item.experimentalMindsetReview
            ? item.experimentalMindsetReview
            : "---",
        },
        { v: item.out_of_box_thinking ? item.out_of_box_thinking : "---" },
        { v: item.outOfBoxReview ? item.outOfBoxReview : "---" },
        { v: item.problem_solving ? item.problem_solving : "---" },
        { v: item.problemSolvingReview ? item.problemSolvingReview : "---" },
        { v: item.network_business ? item.network_business : "---" },
        {
          v: item.networkBusinessReview ? item.networkBusinessReview : "---",
        },
        { v: item.network_social ? item.network_social : "---" },
        { v: item.networkSocialReview ? item.networkSocialReview : "---" },
      ];
      mergeArr.push(da);
    }
  }

  for (let i = 0; i < 3; i++) {
    let d2_spac = [{ v: "" }, { v: "" }, { v: "" }];
    mergeArr.push(d2_spac);
  }

  // Self Assesment for Advisor
  let colHeadA = [
    {
      v: "Name (Advisor Self Assessment)",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Mobile Number",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "LinkedIn Profile URL",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Credentials",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Specific responsibilities",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Commericals and other terms",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Is it a formal appointment",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Date of Joining the business",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
  ];

  mergeArr.push(colHeadA);

  for (let i in arr) {
    let item = arr[i];
    if (item.role_type == "advisor" && item.as_by_name == item.name) {
      let da = [
        { v: item.name ? item.name : "---" },
        { v: item.mobile ? item.mobile : "---" },
        { v: item.linkedIn ? item.linkedIn : "---" },
        { v: item.credentials ? item.credentials : "---" },
        {
          v: item.specific_responsibilities
            ? item.specific_responsibilities
            : "---",
        },
        { v: item.commercialsAndOthers ? item.commercialsAndOthers : "---" },
        { v: item.formalAppointment ? item.formalAppointment : "---" },
        { v: item.dtOfJoinBusiness ? item.dtOfJoinBusiness : "---" },
      ];
      mergeArr.push(da);
    }
  }

  for (let i = 0; i < 3; i++) {
    let d2_spac = [{ v: "" }, { v: "" }, { v: "" }];
    mergeArr.push(d2_spac);
  }

  // Assesment for others
  let colHead = [
    {
      v: "Assessment By",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Assessment For",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Leadership Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of Finance Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of HR  Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Understanding of Law and Statutory Compliances  Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Passion for business Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Passion for Current Project Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Experimental Mindset Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Out of Box Thinking Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Problem Solving Skills Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Networking - Business Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
    {
      v: "Networking - Social Ratings",
      m: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "0000FF" } },
      },
    },
  ];

  mergeArr.push(colHead);

  for (let i in arr) {
    let item = arr[i];
    if (
      item.role_type == "advisor" ||
      (item.role_type == "core-team-member" && item.as_by_name != item.name) ||
      item.role_type == "founder"
    ) {
      let da = [
        { v: item.as_by_name ? item.as_by_name : "---" },
        { v: item.name ? item.name : "---" },
        { v: item.leadership ? item.leadership : "---" },
        { v: item.understanding_finance ? item.understanding_finance : "--" },
        { v: item.understanding_hr ? item.understanding_hr : "---" },
        { v: item.understanding_low ? item.understanding_low : "---" },
        { v: item.passion_of_business ? item.passion_of_business : "---" },
        {
          v: item.passion_for_current_project
            ? item.passion_for_current_project
            : "---",
        },
        { v: item.experimental_mindset ? item.experimental_mindset : "---" },
        { v: item.out_of_box_thinking ? item.out_of_box_thinking : "---" },
        { v: item.problem_solving ? item.problem_solving : "---" },
        { v: item.network_business ? item.network_business : "---" },
        { v: item.network_social ? item.network_social : "---" },
      ];
      mergeArr.push(da);
    }
  }

  const ws = XLSX.utils.aoa_to_sheet(mergeArr);
  ws["!cols"] = [
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 40 },
    { wch: 30 },
    { wch: 40 },
    { wch: 30 },
    { wch: 40 },
    { wch: 40 },
    { wch: 40 },
    { wch: 40 },
    { wch: 30 },
    { wch: 40 },
    { wch: 40 },
    { wch: 40 },
    { wch: 30 },
    { wch: 40 },
    { wch: 30 },
    { wch: 40 },
    { wch: 30 },
    { wch: 40 },
    { wch: 30 },
    { wch: 30 },
    { wch: 40 },
    { wch: 30 },
    { wch: 40 },
  ];
  XLSX.utils.book_append_sheet(wb, ws, "Assessment");
  XLSX.writeFile(wb, fileName + fileExtension);
  message.success("Assessment form detail list is exported successfully.");
};
