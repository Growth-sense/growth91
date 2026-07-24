import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "react-image-lightbox/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactGA from "react-ga4";
import SEO from "./app/components/SEO";
import RouteChangeTracker from "./app/RouteChangeTracker";
import { TRACKING_ID } from "./app/constants/data";
import "./app/200.css";

// Preloader fallback component for Suspense
const PageLoader = () => (
  <div id="loading" style={{ display: "block" }}>
    <div id="loading-center">
      <div className="preloader"></div>
    </div>
  </div>
);

// Helper for named exports (React.lazy only supports default exports)
const lazyNamed = (importFn, exportName) =>
  React.lazy(() => importFn().then((module) => ({ default: module[exportName] })));

// --- Lazy loaded page components ---

// Home & general pages
const Homenew = React.lazy(() => import("./app/Homenew.jsx"));
const Aboutnew = lazyNamed(() => import("./app/Aboutnew.jsx"), "Aboutnew");
const SecondarySharesHome = lazyNamed(() => import("./app/SecondarySharesHome.jsx"), "SecondarySharesHome");
const FamilyDashboard = lazyNamed(() => import("./app/FamilyDashboard.jsx"), "FamilyDashboard");
const InformationList = lazyNamed(() => import("./app/InformationList.jsx"), "InformationList");
const LoginInvestor = lazyNamed(() => import("./app/LoginInvestor.jsx"), "LoginInvestor");
const LoginFounder = lazyNamed(() => import("./app/LoginFounder.jsx"), "LoginFounder");
const MemberShip = lazyNamed(() => import("./app/MemberShip.jsx"), "MemberShip");
const FutureUnicornDescription = lazyNamed(() => import("./app/FutureUnicornDescription.jsx"), "FutureUnicornDescription");
const FutureUnicornDescriptiondesgin = lazyNamed(() => import("./app/FutureUnicornDescriptiondesgin.jsx"), "FutureUnicornDescriptiondesgin");
const Thankyou = lazyNamed(() => import("./app/Thankyou.jsx"), "Thankyou");
const CheckboxThank = lazyNamed(() => import("./app/CheckboxThank.jsx"), "CheckboxThank");
const FounderTransactionHistory = lazyNamed(() => import("./app/FounderTransactionHistory.jsx"), "FounderTransactionHistory");
const FounderDashboardType = lazyNamed(() => import("./app/FounderDashboardType.jsx"), "FounderDashboardType");
const FounderMyListing = lazyNamed(() => import("./app/FounderMyListing.jsx"), "FounderMyListing");
const MyUnicornPlan = lazyNamed(() => import("./app/Unicorn/MyUnicornPlan.jsx"), "MyUnicornPlan");
const ViewPlan = lazyNamed(() => import("./app/Unicorn/ViewPlan.jsx"), "ViewPlan");
const FounderDraftList = lazyNamed(() => import("./app/FounderDraftList.jsx"), "FounderDraftList");
const FinishedEditPopup = lazyNamed(() => import("./app/FinishedEditPopup.jsx"), "FinishedEditPopup");
const RemainingEditPopup = lazyNamed(() => import("./app/RemainingEditPopup.jsx"), "RemainingEditPopup");
const FounderMyPlan = lazyNamed(() => import("./app/FounderMyPlan.jsx"), "FounderMyPlan");
const FutureUnicornFormEdits = lazyNamed(() => import("./app/FutureUnicornFormEdits.jsx"), "FutureUnicornFormEdits");
const FounderInterest = lazyNamed(() => import("./app/FounderInterest.jsx"), "FounderInterest");
const DashboardType = lazyNamed(() => import("./app/DashboardType.jsx"), "DashboardType");
const FutureUnicornForm = lazyNamed(() => import("./app/FutureUnicornForm.jsx"), "FutureUnicornForm");
const FounderEdit = lazyNamed(() => import("./app/FounderEdit.jsx"), "FounderEdit");
const WaitApproval = lazyNamed(() => import("./app/WaitApproval.jsx"), "WaitApproval");
const FutureUnicornList = lazyNamed(() => import("./app/FutureUnicornList.jsx"), "FutureUnicornList");
const OpportunitiesList = lazyNamed(() => import("./app/OpportunitiesList.jsx"), "OpportunitiesList");
const OpportunityDescription = lazyNamed(() => import("./app/OpportunityDescription.jsx"), "OpportunityDescription");
const PaymentMethods = lazyNamed(() => import("./app/PaymentMethods.jsx"), "PaymentMethods");
const Contact = lazyNamed(() => import("./app/Contact_us.jsx"), "Contact");
const Newdeals = lazyNamed(() => import("./app/Newdeals.jsx"), "Newdeals");
const Synergy = lazyNamed(() => import("./app/Synergy.jsx"), "Synergy");
const Synergypartner = lazyNamed(() => import("./app/Synergy-partner.jsx"), "Synergypartner");
const SellerListingForm = lazyNamed(() => import("./app/investor/SellerListing/SellerListingForm.jsx"), "SellerListingForm");
const Preview = lazyNamed(() => import("./app/Unicorn/forms/Preview.jsx"), "Preview");

// Default export pages
const NewHome = React.lazy(() => import("./app/admin/NewHome.js"));
const NewHome2 = React.lazy(() => import("./app/admin/NewHome2.js"));
const NewHome3 = React.lazy(() => import("./app/admin/NewHome3.js"));
const Newunicorninvestor = React.lazy(() => import("./app/Newunicorninvestor.jsx"));
const Newunicornfounder = React.lazy(() => import("./app/Newunicornfounder.jsx"));
const Content = React.lazy(() => import("./Content/Content"));
const Deals = React.lazy(() => import("./app/Deals"));
const Refer = React.lazy(() => import("./app/ReferLogin"));
const error = React.lazy(() => import("./app/404"));
const DealDetails = React.lazy(() => import("./app/DealDetails"));
const DealDetailsInstapay = React.lazy(() => import("./app/DealDetailsInstapay"));
const DealDetailsAutorobot = React.lazy(() => import("./app/DealDetailsAutorobot"));
const Founders = React.lazy(() => import("./app/Founders"));
const Investors = React.lazy(() => import("./app/Investors"));
const Learn = React.lazy(() => import("./app/Learn"));
const Login = React.lazy(() => import("./app/Founder/Login"));
const Signup = React.lazy(() => import("./app/Signup"));
const Howitworks = React.lazy(() => import("./app/Howitworks"));
const Howitworks2 = React.lazy(() => import("./app/Howitworks2"));
const Howitworks3 = React.lazy(() => import("./app/Howitworks3"));
const Howitworks4 = React.lazy(() => import("./app/Howitworks4"));
const Registration = React.lazy(() => import("./app/Founder/Registration"));
const PrivacyPolicy = React.lazy(() => import("./app/PrivacyPolicy"));
const TermsConditions = React.lazy(() => import("./app/TermsConditions"));
const ClosedDeals = React.lazy(() => import("./app/ClosedDeals"));
const inviteReferral = React.lazy(() => import("./app/investor/InviteReferral"));
const AccountDetails = React.lazy(() => import("./app/investor/AccountDetails"));
const BankDetails = React.lazy(() => import("./app/investor/BankDetails"));
const MembershipPlan = React.lazy(() => import("./app/investor/register/MembershipPlan"));
const Paiddocuments = React.lazy(() => import("./app/admin/components/modal/Paiddocuments"));
const FounderDashboard = React.lazy(() => import("./app/Founder/FounderDashboard"));
const FounderInvestors = React.lazy(() => import("./app/Founder/FounderInvestors"));
const FounderAnalytics = React.lazy(() => import("./app/Founder/FounderAnalytics"));
const ReferLogin = React.lazy(() => import("./app/ReferLogin"));
const InvestorKYCScreen = React.lazy(() => import("./app/investor/KYCScreen"));
const Investordashbord = React.lazy(() => import("./app/investor/Dashboard"));
const InvestorPortfolio = React.lazy(() => import("./app/investor/Portfolio"));
const InvestorAnalytics = React.lazy(() => import("./app/investor/Analytics"));
const Referral = React.lazy(() => import("./app/investor/Referral"));
const Blog = React.lazy(() => import("./app/Blog"));
const BlogDetails = React.lazy(() => import("./app/BlogDetails"));
const Register = React.lazy(() => import("./app/Register"));
const Payment = React.lazy(() => import("./app/Payment"));
const MyBuyerInterests = React.lazy(() => import("./app/MyBuyerInterests.jsx"));
const InvestorStep2 =   React.lazy(() => import("./app/investor/register/Step2"));

// Admin pages
const adminlogin = React.lazy(() => import("./app/admin/Login"));
const admindashboard = React.lazy(() => import("./app/admin/Dashboard"));
const adminblog = React.lazy(() => import("./app/admin/Blog"));
const admindeals = React.lazy(() => import("./app/admin/Deals"));
const opendeals = React.lazy(() => import("./app/admin/OpenDeals"));
const analyticinterest = React.lazy(() => import("./app/admin/AnalyticInterest"));
const adminfounders = React.lazy(() => import("./app/admin/Founders"));
const admininvestors = React.lazy(() => import("./app/admin/Investors"));
const admininvestments = React.lazy(() => import("./app/admin/Investments"));
const adminstartups = React.lazy(() => import("./app/admin/Startups"));
const adminpayments = React.lazy(() => import("./app/admin/Payments"));
const InstitutionalReferral = React.lazy(() => import("./app/admin/InstitutionalReferral"));
const InstitutionalReferralView = React.lazy(() => import("./app/admin/InstitutionalReferralView"));
const GuestAnalytics = React.lazy(() => import("./app/admin/GuestAnalytics"));
const RetailReferral = React.lazy(() => import("./app/admin/RetailReferral"));
const admindealsettings = React.lazy(() => import("./app/admin/Settings"));
const Payments = React.lazy(() => import("./app/investor/Payments"));
const Commitment = React.lazy(() => import("./app/investor/Commitment"));
const Documents = React.lazy(() => import("./app/investor/Documents"));
const FounderDocuments = React.lazy(() => import("./app/Founder/FounderDocuments"));
const BasicDetails = React.lazy(() => import("./app/Founder/forms/BasicDetails"));
const FounderNewRegister = React.lazy(() => import("./app/Founder/FormFounder"));
const Startup = React.lazy(() => import("./app/Founder/startup/Startup"));
const BlogCategory = React.lazy(() => import("./app/BlogCategory"));
const BlogSearch = React.lazy(() => import("./app/BlogSearch"));
const FounderformdetailsPdf = React.lazy(() => import("./app/admin/FounderformdetailsPdf"));
const Founderformdetails = React.lazy(() => import("./app/admin/Founderformdetails"));
const PremiumMembers = React.lazy(() => import("./app/admin/PremiumMembers"));
const FounderFormStatus = React.lazy(() => import("./app/Founder/FounderFormStatus"));
const AdminFormStatus = React.lazy(() => import("./app/admin/AdminFormStatus"));
const Authenticate = React.lazy(() => import("./app/startup/Login"));
const Form = React.lazy(() => import("./app/startup/Form"));
const Nonresidentform = React.lazy(() => import("./app/investor/Nonresidentform"));
const Success = React.lazy(() => import("./app/Success"));
const Registersuccess = React.lazy(() => import("./app/components/Alerts/register/Success"));
const Registererror = React.lazy(() => import("./app/components/Alerts/register/Error"));
const Kycinstructions = React.lazy(() => import("./app/investor/Kycinstructions"));
const investmenterror = React.lazy(() => import("./app/components/Alerts/investment/Error"));
const investmentsuccess = React.lazy(() => import("./app/components/Alerts/investment/Success"));
const documenterror = React.lazy(() => import("./app/components/Alerts/document/Error"));
const documentsuccess = React.lazy(() => import("./app/components/Alerts/document/Success"));
const renewsuccess = React.lazy(() => import("./app/components/Alerts/renew/Success"));
const renewerror = React.lazy(() => import("./app/components/Alerts/renew/Error"));

// Deal pages
const Instapay = React.lazy(() => import("./app/deal-pages/Instapay"));
const Autorobot = React.lazy(() => import("./app/deal-pages/Autorobot"));
const Fashiondeal = React.lazy(() => import("./app/deal-pages/Fashiondeal"));
const InvidataPublic = React.lazy(() => import("./app/deal-pages/InvidataPublic"));
const TransBankPrivate = React.lazy(() => import("./app/deal-pages/TransBankPrivate"));
const TransBankPublic = React.lazy(() => import("./app/deal-pages/TransBankPublic"));
const Test = React.lazy(() => import("./app/components/Alerts/investment/Test"));
const Step1 = React.lazy(() => import("./app/investor/register/Step1"));
const FounderRegistration = React.lazy(() => import("./app/Founder/FounderRegistration"));
const OfflinePayments = React.lazy(() => import("./app/admin/OfflinePayment"));
const covertfoundertoinvestor = React.lazy(() => import("./app/Founder/NationalityDetails"));
const fdashboard = React.lazy(() => import("./app/Founder/investorside/Dashboard"));
const fanalytics = React.lazy(() => import("./app/Founder/investorside/Analytics"));
const fportfolio = React.lazy(() => import("./app/Founder/investorside/Portfolio"));
const freferral = React.lazy(() => import("./app/Founder/investorside/Referral"));
const ftransactions = React.lazy(() => import("./app/Founder/investorside/Transactions"));
const covertinvestortofounder = React.lazy(() => import("./app/investor/NationalityDetails"));
const InvidataPrivate = React.lazy(() => import("./app/deal-pages/InvidataPrivate"));
const AdminBlogCategory = React.lazy(() => import("./app/admin/AdminBlogCategory"));
const TemplatePublic = React.lazy(() => import("./app/deal-pages/Template"));
const ISkillBoxPublic2 = React.lazy(() => import("./app/deal-pages/ISkillboxPublic2"));
const Targetpeak = React.lazy(() => import("./app/deal-pages/Targetpeak"));
const TransBnkCCPS = React.lazy(() => import("./app/deal-pages/TransBnkCCPS"));
const TransBnkCCD = React.lazy(() => import("./app/deal-pages/TransBnkCCD"));
const founderDeals = React.lazy(() => import("./app/Founder/Deals"));
const founderkycinst = React.lazy(() => import("./app/Founder/kyc_screens/Instructions"));
const founderkycscreen = React.lazy(() => import("./app/Founder/kyc_screens/VerifyKyc"));
const founderkycNonRes = React.lazy(() => import("./app/Founder/kyc_screens/Nonresident"));
const Footrax = React.lazy(() => import("./app/deal-pages/Footrax"));
const Yolo = React.lazy(() => import("./app/deal-pages/Yolo"));
const EventBeep = React.lazy(() => import("./app/deal-pages/EventBeep"));
const Homversity = React.lazy(() => import("./app/deal-pages/Homversity"));
const Tulua = React.lazy(() => import("./app/deal-pages/Tulua.jsx"));
const HumSafer = React.lazy(() => import("./app/deal-pages/HumSafer"));
const IndianStartupNews = React.lazy(() => import("./app/deal-pages/IndianStartupNews"));
const IndusUno = React.lazy(() => import("./app/deal-pages/IndusUno"));
const AtreyaTranche1 = React.lazy(() => import("./app/deal-pages/AtreyaTranche1"));
const AtreyaTranche2 = React.lazy(() => import("./app/deal-pages/AtreyaTranche2"));
const DcodeCare = React.lazy(() => import("./app/deal-pages/DcodeCare"));
const BizPay = React.lazy(() => import("./app/deal-pages/BizPay"));
const BizPayTranche2 = React.lazy(() => import("./app/deal-pages/BizpayTranche2"));
const Bulkpe = React.lazy(() => import("./app/deal-pages/Bulkpe"));
const Invidata = React.lazy(() => import("./app/deal-pages/Invidata"));
const TestDeal1 = React.lazy(() => import("./app/deal-pages/TestDeal1"));
const TestDeal2 = React.lazy(() => import("./app/deal-pages/TestDeal2"));
const ProtectDeals = React.lazy(() => import("./app/ProtectDeals"));
const ProtectUnicorn = React.lazy(() => import("./app/ProtectUnicorn.js"));
const PendingOfflinePayments = React.lazy(() => import("./app/admin/PendingOfflinePayments"));
const UnderMaintenance = React.lazy(() => import("./app/UnderMaintenance"));
const AdminDocuments = React.lazy(() => import("./app/admin/AdminDocuments"));
const Newboo = React.lazy(() => import("./app/deal-pages/Newboo"));
const ORAI = React.lazy(() => import("./app/deal-pages/ORAI.jsx"));
const LiaPlus = React.lazy(() => import("./app/deal-pages/LiaPlus.jsx"));
const EleFant = React.lazy(() => import("./app/deal-pages/EleFant.jsx"));
const EcoRatings = React.lazy(() => import("./app/deal-pages/EcoRatings.jsx"));
const Stroom = React.lazy(() => import("./app/deal-pages/Stroom.jsx"));
const Nymbleup = React.lazy(() => import("./app/deal-pages/Nymbleup.jsx"));
const IndusUnoTranche2 = React.lazy(() => import("./app/deal-pages/IndusUnoTranche2"));
const FamilyAdmin = React.lazy(() => import("./app/admin/FamilyAdmin.jsx"));
const UnicornAdmin = React.lazy(() => import("./app/admin/UnicornAdmin.jsx"));
const familyRemoveRequest = React.lazy(() => import("./app/admin/familyRemoveRequest.jsx"));
const Familymanage = React.lazy(() => import("./app/admin/Familymanage.jsx"));
const FutureUnicorn = React.lazy(() => import("./app/admin/FutureUnicorn.jsx"));
const FUnicornStartup = React.lazy(() => import("./app/admin/FUnicornStartup.js"));
const FUnicornInvestors = React.lazy(() => import("./app/admin/FUnicornInvestors.js"));
const FUnicornFounders = React.lazy(() => import("./app/admin/FUnicornFounders.js"));
const TableComponent = React.lazy(() => import("./app/admin/pdfview/TableComponent.js"));
const Createfamily = React.lazy(() => import("./app/investor/Create-Family.jsx"));
const InvestorFutureunicorn = React.lazy(() => import("./app/investor/InvestorFutureunicorn.jsx"));
const Viewfamilylist = React.lazy(() => import("./app/investor/View-family-list.jsx"));
const familyinvite = React.lazy(() => import("./app/investor/family-invite.jsx"));
const Mindler = React.lazy(() => import("./app/deal-pages/Mindler.jsx"));
const CUR8 = React.lazy(() => import("./app/deal-pages/CUR8.jsx"));
const Edept = React.lazy(() => import("./app/deal-pages/Edept.jsx"));
const VsnapU = React.lazy(() => import("./app/deal-pages/vsnapU.jsx"));
const uknowva = React.lazy(() => import("./app/deal-pages/uknowva.jsx"));
const Innoserv = React.lazy(() => import("./app/deal-pages/Innoserv.jsx"));
const Petmojo = React.lazy(() => import("./app/deal-pages/Petmojo(Pre Series A).jsx"));
const LVLAlpha = React.lazy(() => import("./app/deal-pages/LVLAlpha.jsx"));
const UnicornEnquiryFutureUnicorn = React.lazy(() => import("./app/Founder/UnicornEnquiryFutureunicorn.js"));
const EleFant2 = React.lazy(() => import("./app/deal-pages/EleFant2.jsx"));
const Mannlich = React.lazy(() => import("./app/deal-pages/Mannlich.jsx"));
const Retnerai = React.lazy(() => import("./app/deal-pages/Retnerai.jsx"));
const Rezlytix = React.lazy(() => import("./app/deal-pages/Rezlytix.jsx"));
const Freshleaf = React.lazy(() => import("./app/deal-pages/Freshleaf.jsx"));
const Zwilling = React.lazy(() => import("./app/deal-pages/Zwilling.jsx"));
const Scrapify = React.lazy(() => import("./app/deal-pages/Scrapify.jsx"));

const CareerCompany = React.lazy(() => import("./app/deal-pages/CareerCompany.jsx"));
const Garudaaerospace = React.lazy(() => import("./app/deal-pages/Garudaaerospace.jsx"));
const CombinedRegistration = React.lazy(() => import("./app/investor/register/CombinedRegistration.js"));
const UnicornAdminAll = React.lazy(() => import("./app/admin/UnicornAdminAll.jsx"));
const UnicornAdminPayment = React.lazy(() => import("./app/admin/UnicornAdminPayment.jsx"));
const ExtraMile = React.lazy(() => import("./app/deal-pages/ExtraMile.jsx"));
const Goodmelts = React.lazy(() => import("./app/deal-pages/Goodmelts.jsx"));
const Stroom2 = React.lazy(() => import("./app/deal-pages/Stroom2.jsx"));
const Tulua2 = React.lazy(() => import("./app/deal-pages/Tulua2.jsx"));
const RolesPermissions = React.lazy(() => import("./app/admin/RolesPermissions"));
const UserRoleAssign = React.lazy(() => import("./app/admin/UserRoleAssign"));
const ProtectedAdminRoute = React.lazy(() => import("./app/admin/common/ProtectedAdminRoute"));
const TargetPeak2 = React.lazy(() => import("./app/deal-pages/TargetPeak2.jsx"));
const AdminSellerListings = React.lazy(() => import("./app/admin/SellerListings/AdminSellerListings.jsx"));
const AdminOpportunities = React.lazy(() => import("./app/admin/Opportunities/AdminOpportunities.jsx"));
const AdminBuyerInterests = React.lazy(() => import("./app/admin/Opportunities/AdminBuyerInterests.jsx"));
const AdminStartupRequests = React.lazy(() => import("./app/admin/Opportunities/AdminStartupRequests.jsx"));


ReactGA.initialize(TRACKING_ID);

function App() {

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
    if(localStorage.getItem("admin_user")||localStorage.getItem("admin_user")){
      localStorage.removeItem('admin_user');
      localStorage.removeItem('id');
    }
  }, []);


  return (
    <div className="App">
      <Router>
        <SEO />
        <RouteChangeTracker />
        <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path="/the EleFant">
            <Redirect to="/theEleFant" />
          </Route>

          <Route path="/" exact component={Homenew} />
          <Route path="/NewHome" exact component={NewHome} />
          <Route path="/NewHome2" exact component={NewHome2} />
          <Route path="/NewHome3" exact component={NewHome3} />
          <Route path="/unicornfounder" exact component={Newunicornfounder} />
          <Route path="/unicorninvestor" exact component={Newunicorninvestor} />

          <Route path="/about" exact component={Aboutnew} />
          <Route path="/secondary-shares" exact component={SecondarySharesHome} />
          <Route path="/synergy-partner" exact component={Synergy} />
          <Route path="/synergy-form" exact component={Synergypartner} />

          <Route path="/LoginInvestor" exact component={LoginInvestor} />
          <Route path="/LoginFounder" exact component={LoginFounder} />
          <Route path="/MemberShip" exact component={MemberShip} />
          <Route path="/DashboardType" exact component={DashboardType} />
          <Route path="/FounderEdit" exact component={FounderEdit} />
          <Route path="/PaymentMethods" exact component={PaymentMethods} />
          <Route path="/Thankyou" exact component={Thankyou} />
          <Route path="/FounderTransactionHistory" exact component={FounderTransactionHistory} />
          <Route path="/FounderDashboardType" exact component={FounderDashboardType} />
          <Route path="/FounderMyListing" exact component={FounderMyListing} />
          <Route path="/MyUnicornPlan" exact component={MyUnicornPlan} />
          <Route path="/my-buyer-interests" exact component={MyBuyerInterests} />
          <Route path="/ViewUnicornPlan/:planName?" exact component={ViewPlan} />
          <Route path="/FounderMyPlan" exact component={FounderMyPlan} />
          <Route path="/FounderInterest" exact component={FounderInterest} />
          <Route path="/FounderDraftList" exact component={FounderDraftList} />
          <Route path="/FinishedEditPopup" exact component={FinishedEditPopup} />
          <Route path="/RemainingEditPopup" exact component={RemainingEditPopup} />
          <Route path="/WaitApproval" exact component={WaitApproval} />
          <Route path="/CheckboxThank" exact component={CheckboxThank} />
           <Route path="/investor-agreement" exact component={InvestorStep2} />

          <Route path="/FamilyDashboard" exact component={FamilyDashboard} />
          <Route path="/Preview" exact component={Preview} />
          <Route path="/FutureUnicornList" exact component={FutureUnicornList} />
          <Route path="/secondary-opportunities" exact component={OpportunitiesList} />
          <Route path="/secondary-opportunities/:id" component={OpportunityDescription} />
          <Route path="/FutureUnicornForm" exact component={FutureUnicornForm}>
            <ProtectUnicorn Component2={FutureUnicornForm} Conditon={true} />
          </Route>
          <Route path="/InformationList" exact>
            <ProtectUnicorn Component2={InformationList} Conditon={true} />
          </Route>
          <Route path="/FutureUnicornDescriptiondesgin" exact component={FutureUnicornDescriptiondesgin} />
          <Route path="/UnderMaintenance" exact component={UnderMaintenance} />
          <Route path="/StartInvestment" exact component={Content} />
          <Route path="/deals" exact>
            <ProtectDeals Component2={Newdeals} Conditon={true} />
          </Route>
          <Route path="/Refer" exact component={Refer} />
          <Route path="/Referral" exact component={Referral} />
          <Route path="/invite" exact component={inviteReferral} />
          <Route path="/closeddeals" exact component={ClosedDeals} />
          <Route path="/DealDetails" component={DealDetails} />
          <Route path="/DealDetailsInstapay" component={DealDetailsInstapay} />
          <Route path="/DealDetailsAutorobot" component={DealDetailsAutorobot} />
          <Route path="/Founders" exact component={Founders} />
          <Route path="/Investors" exact component={Investors} />
          <Route path="/Learn" exact component={Learn} />
          <Route path="/Contact-us" exact component={Contact} />
          <Route path="/Login" exact component={Login} />
          <Route path="/founder-login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
          <Route path="/Signup" exact component={CombinedRegistration} />
          <Route path="/resources" exact component={Howitworks} />
          <Route path="/How-it-works2" exact component={Howitworks2} />
          <Route path="/How-it-works3" exact component={Howitworks3} />
          <Route path="/How-it-works4" exact component={Howitworks4} />
          <Route path="/TermsConditions" exact component={TermsConditions} />
          <Route path="/PrivacyPolicy" exact component={PrivacyPolicy} />
          <Route path="/membership-plan" exact component={MembershipPlan} />

          <Route path="/bank-details" exact component={AccountDetails} />
          <Route path="/blog-category" exact component={BlogCategory} />
          <Route path="/search" exact component={BlogSearch} />

          <Route path="/founder-dashboard" exact component={FounderDashboard} />
          <Route path="/founder-investors" exact component={FounderInvestors} />
          <Route path="/founder-analytics" exact component={FounderAnalytics} />
          <Route path="/Investor-founder-registration" exact component={CombinedRegistration} />
          <Route path="/investor-dashboard" exact={true} component={Investordashbord} />
          <Route path="/investor-seller-listing-form" exact={true} component={SellerListingForm} />
          <Route path="/investor-kyc" exact>
            <ProtectDeals Component2={InvestorKYCScreen} Conditon={true} />
          </Route>
          <Route path="/investor-registration" exact component={CombinedRegistration} />
          <Route path="/investor-portfolio" exact component={InvestorPortfolio} />
          <Route path="/investor-analytics" exact component={InvestorAnalytics} />
          <Route path="/investor-transactions" exact component={Payments} />
          <Route path="/investor-commitment" exact component={Commitment} />
          <Route path="/investor-documents" exact component={Documents} />
          <Route path="/founderdash-documents" exact component={FounderDocuments} />

          <Route path="/details" component={BlogDetails} />
          <Route path="/pay" component={Payment} />

          <Route path="/admin" exact component={adminlogin} />
          <Route path="/admin-dashboard" exact component={admindashboard} />
          <Route path="/admin-blog" exact component={adminblog} />
          <ProtectedAdminRoute exact path="/admin-deals" component={admindeals} requiredModule="deals_completed" requiredAction="view" />
          <ProtectedAdminRoute exact path="/open-deals" component={opendeals} requiredModule="deals" requiredAction="view_open" />
          <ProtectedAdminRoute path="/analytic-interest" exact component={analyticinterest} requiredModule="dropoff" requiredAction="view" />
          <ProtectedAdminRoute exact path="/guest-analytics" component={GuestAnalytics} requiredModule="guest_analytics" requiredAction="view" />
          <Route path="/admin/roles-permissions" component={RolesPermissions} />
          <Route exact path="/admin/user-roles" component={UserRoleAssign} />
          <ProtectedAdminRoute exact path="/admin-founders" component={adminfounders} requiredModule="founders" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-investors" component={admininvestors} requiredModule="investors" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-startups" component={adminstartups} requiredModule="startups" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-family" component={FamilyAdmin} requiredModule="groups" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-unicorn" component={UnicornAdmin} requiredModule="unicorns_published" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-seller-listings" component={AdminSellerListings} requiredModule="seller_listings" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-opportunities" component={AdminOpportunities} requiredModule="opportunities" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-buyer-interests" component={AdminBuyerInterests} requiredModule="opportunities" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-startup-requests" component={AdminStartupRequests} requiredModule="opportunities" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-all-unicorn" component={UnicornAdminAll} requiredModule="unicorns_all" requiredAction="view" />
          <ProtectedAdminRoute exact path="/admin-unicorn-payments" component={UnicornAdminPayment} requiredModule="unicorns_payments" requiredAction="view" />
          <ProtectedAdminRoute exact path="/family-Remove-Request" component={familyRemoveRequest} requiredModule="group_remove_requests" requiredAction="view" />
          <Route path="/admin-family-manage" exact component={Familymanage} />
          <Route path="/future-unicorn-startups" exact component={FUnicornStartup} />
          <Route path="/FutureUnicorn" exact component={FutureUnicorn} />
          <Route path="/FutureUnicorn/:urlName" component={FutureUnicornDescription} />
          <Route path="/future-unicorn-investors" exact component={FUnicornInvestors} />
          <Route path="/future-unicorn-founders" exact component={FUnicornFounders} />

          <ProtectedAdminRoute exact path="/admin-investments" component={admininvestments} requiredModule="investments" requiredAction="view" />
          <ProtectedAdminRoute path="/admin-payments" exact component={adminpayments} requiredModule="payments_online" requiredAction="view" />
          <ProtectedAdminRoute path="/admin-institutional-referral" exact component={InstitutionalReferral} requiredModule="institutional_referral" requiredAction="view" />
          <ProtectedAdminRoute path="/online-document-payments" exact component={Paiddocuments} requiredModule="payments_documents" requiredAction="view" />
          <Route path="/admin-referral-view" exact component={InstitutionalReferralView} />
          <ProtectedAdminRoute path="/admin-retail-referral" exact component={RetailReferral} requiredModule="retail_referral" requiredAction="view" />
          <ProtectedAdminRoute path="/admin-settings" exact component={admindealsettings} requiredModule="settings" requiredAction="view" />
          <Route path="/test" exact component={Test} />
          <Route path="/success" exact component={Success} />
          <Route path="/basic-details" exact component={BasicDetails} />

          <Route path="/startup-form" exact component={FounderNewRegister} />
          <Route path="/assessment-form" exact component={Startup} />
          <ProtectedAdminRoute path="/founder-documents" exact component={Founderformdetails} requiredModule="founder_documents" requiredAction="view" />
          <Route path="/admin-founder-dashboard" exact component={TableComponent} />
          <ProtectedAdminRoute path="/documents" exact component={AdminDocuments} requiredModule="documents" requiredAction="view" />
          <Route path="/founder-documentsPdf" exact component={FounderformdetailsPdf} />
          <ProtectedAdminRoute exact path="/premium-members" component={PremiumMembers} requiredModule="premium_members" requiredAction="view" />
          <Route path="/register-success" exact component={Registersuccess} />
          <Route path="/register-error" exact component={Registererror} />
          <Route path="/founder-survey-result" exact component={FounderFormStatus} />
          <Route path="/admin-survey-result" exact component={AdminFormStatus} />
          <Route path="/authenticate" exact component={Authenticate} />
          <Route path="/information-form" exact component={Form} />
          <Route path="/kyc-instructions" exact component={Kycinstructions} />
          <Route path="/transaction-success" exact component={investmentsuccess} />
          <Route path="/transaction-error" exact component={investmenterror} />

          <Route path="/Instapay" exact component={Instapay} />
          <Route path="/Autorobot" exact component={Autorobot} />
          <Route path="/invidata-public" exact component={InvidataPublic} />
          <Route path="/referral-login" exact component={ReferLogin} />
          <Route path="/document-error" exact component={documenterror} />
          <Route path="/document-success" exact component={documentsuccess} />
          <Route path="/fashiondeal" exact component={Fashiondeal} />
          <ProtectedAdminRoute path="/admin-payments-offline" exact component={OfflinePayments} requiredModule="payments_offline" requiredAction="view" />
          <ProtectedAdminRoute path="/pending-offline-payments" exact component={PendingOfflinePayments} requiredModule="payments_offline_pending" requiredAction="view" />
          <Route path="/founder-as-investor" exact component={covertfoundertoinvestor} />
          <Route path="/founder-as-investor-dashboard" exact component={fdashboard} />
          <Route path="/founder-as-investor-analytics" exact component={fanalytics} />
          <Route path="/founder-as-investor-portfolio" exact component={fportfolio} />
          <Route path="/founder-as-investor-referral" exact component={freferral} />
          <Route path="/founder-as-investor-transactions" exact component={ftransactions} />
          <Route path="/investor-as-founder" exact component={covertinvestortofounder} />
          <Route path="/investor-as-founder-dashboard" exact component={FounderDashboard} />
          <Route path="/investor-as-founder-investors" exact component={FounderInvestors} />
          <Route path="/investor-as-founder-analytics" exact component={FounderAnalytics} />
          <Route path="/investor-as-founder-startup-form" exact component={FounderNewRegister} />
          <Route path="/investor-as-founder-assessment-form" exact component={Startup} />
          <Route path="/investor-as-founder-founder-deals" exact component={founderDeals} />

          <Route path="/invidata-private" exact component={InvidataPrivate} />
          <Route path="/renew-success" exact component={renewsuccess} />
          <Route path="/renew-error" exact component={renewerror} />
          <Route path="/admin-blog-category" exact component={AdminBlogCategory} />

          <Route path="/iSkillBox" exact>
            <ProtectDeals Component={ISkillBoxPublic2} />
          </Route>
          <Route path="/Targetpeak-0" exact>
            <ProtectDeals Component={Targetpeak} />
          </Route>
          <Route path="/Yolo" exact>
            <ProtectDeals Component={Yolo} />
          </Route>
          <Route path="/EventBeep" exact>
            <ProtectDeals Component={EventBeep} />
          </Route>
          <Route path="/Homversity" exact>
            <ProtectDeals Component={Homversity} />
          </Route>
          <Route path="/Tulua" exact>
            <ProtectDeals Component={Tulua2} />
          </Route>
          <Route path="/TargetPeak" exact>
            <ProtectDeals Component={TargetPeak2} />
          </Route>
          <Route path="/TuluaRound1" exact>
            <ProtectDeals Component={Tulua} />
          </Route>
          <Route path="/HumSafer" exact>
            <ProtectDeals Component={HumSafer} />
          </Route>
          <Route path="/IndianStartupNews" exact>
            <ProtectDeals Component={IndianStartupNews} />
          </Route>
          <Route path="/IndusUno" exact>
            <ProtectDeals Component={IndusUno} />
          </Route>
          <Route path="/IndusUnoTranche2" exact>
            <ProtectDeals Component={IndusUnoTranche2} />
          </Route>
          <Route path="/AtreyaTranche1" exact>
            <ProtectDeals Component={AtreyaTranche1} />
          </Route>
          <Route path="/AtreyaTranche2" exact>
            <ProtectDeals Component={AtreyaTranche2} />
          </Route>
          <Route path="/DcodeCare" exact>
            <ProtectDeals Component={DcodeCare} />
          </Route>
          <Route path="/BizPay" exact>
            <ProtectDeals Component={BizPay} />
          </Route>
          <Route path="/BizPayTranche2" exact>
            <ProtectDeals Component={BizPayTranche2} />
          </Route>
          <Route path="/Bulkpe" exact>
            <ProtectDeals Component={Bulkpe} />
          </Route>
          <Route path="/Invidata" exact>
            <ProtectDeals Component={Invidata} />
          </Route>
          <Route path="/Newboo" exact>
            <ProtectDeals Component={Newboo} />
          </Route>
          <Route path="/ORAI" exact>
            <ProtectDeals Component={ORAI} />
          </Route>
          <Route path="/LiaPlus" exact>
            <ProtectDeals Component={LiaPlus} />
          </Route>
          <Route path="/elefant" exact>
            <ProtectDeals Component={EleFant} />
          </Route>
          <Route path="/theEleFant" exact>
            <ProtectDeals Component={EleFant2} />
          </Route>
          <Route path="/Mannlich" exact>
            <ProtectDeals Component={Mannlich} />
          </Route>
          <Route path="/Retner-ai" exact>
            <ProtectDeals Component={Retnerai} />
          </Route>
          <Route path="/Rezlytix" exact>
            <ProtectDeals Component={Rezlytix} />
          </Route>
          <Route path="/Freshleaf" exact>
            <ProtectDeals Component={Freshleaf} />
          </Route>
          <Route path="/Zwilling" exact>
            <ProtectDeals Component={Zwilling} />
          </Route>
          <Route path="/Scrapify" exact>
            <ProtectDeals Component={Scrapify} />
          </Route>
          <Route path="/extramile" exact>
            <ProtectDeals Component={ExtraMile} />
          </Route>
          <Route path="/goodmelts" exact>
            <ProtectDeals Component={Goodmelts} />
          </Route>
          <Route path="/garudaaerospace" exact>
            <ProtectDeals Component={Garudaaerospace} />
          </Route>
          <Route path="/theCareerCompany" exact>
            <ProtectDeals Component={CareerCompany} />
          </Route>
          <Route path="/EcoRatings">
            <ProtectDeals Component={EcoRatings} />
          </Route>
          <Route path="/StroomRound1">
            <ProtectDeals Component={Stroom} />
          </Route>
          <Route path="/Stroom">
            <ProtectDeals Component={Stroom2} />
          </Route>
          <Route path="/Liaplus">
            <ProtectDeals Component={LiaPlus} />
          </Route>
          <Route path="/Mindler">
            <ProtectDeals Component={Mindler} />
          </Route>
          <Route path="/CUR8">
            <ProtectDeals Component={CUR8} />
          </Route>
          <Route path="/Nymbleup">
            <ProtectDeals Component={Nymbleup} />
          </Route>
          <Route path="/Edept">
            <ProtectDeals Component={Edept} />
          </Route>
          <Route path="/VsnapU">
            <ProtectDeals Component={VsnapU} />
          </Route>
          <Route path="/uknowva">
            <ProtectDeals Component={uknowva} />
          </Route>
          <Route path="/Petmojo">
            <ProtectDeals Component={Petmojo} />
          </Route>
          <Route path="/Innoserv">
            <ProtectDeals Component={Innoserv} />
          </Route>
          <Route path="/LVLAlpha">
            <ProtectDeals Component={LVLAlpha} />
          </Route>
          <Route path="/TestDeal2" exact>
            <ProtectDeals Component={TestDeal2} />
          </Route>
          <Route path="/Footrax" exact>
            <ProtectDeals Component={Footrax} />
          </Route>
          <Route path="/TransbnkCCD-Public" exact>
            <ProtectDeals Component={TransBankPublic} />
          </Route>
          <Route path="/TransBnkCCD" exact>
            <ProtectDeals Component={TransBnkCCD} />
          </Route>
          <Route path="/TransBnkCCPS" exact>
            <ProtectDeals Component={TransBnkCCPS} />
          </Route>

          <Route path="/Template" exact component={TemplatePublic} />
          <Route path="/founder-deals" exact component={founderDeals} />
          <Route path="/non-resident-form" exact component={Nonresidentform} />
          <Route path="/founder-non-resident-form" exact component={founderkycNonRes} />
          <Route path="/founder-kyc-instructions" exact component={founderkycinst} />
          <Route path="/founder-verify-kyc" exact component={founderkycscreen} />
          <Route path="/Group-Investments" exact component={Createfamily} />
          <Route path="/View-Group-list" exact component={Viewfamilylist} />
          <Route path="/Group-Invite" component={familyinvite} />
          <Route path="/My-Future-unicorn" exact component={InvestorFutureunicorn} />
          <Route path="/UnicornEnquiryList" exact component={UnicornEnquiryFutureUnicorn} />

          <Route path="*" exact component={error} />
        </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
