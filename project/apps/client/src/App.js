import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "react-image-lightbox/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactGA from "react-ga4";
import SEO from "./app/components/SEO";

import Home from "./app/Home";
import Homenew from "./app/Homenew.jsx";
import { Aboutnew } from "./app/Aboutnew.jsx";
import { FamilyDashboard } from "./app/FamilyDashboard.jsx"
import { InformationList } from "./app/InformationList.jsx"
import { LoginInvestor } from './app/LoginInvestor.jsx'
import { LoginFounder } from './app/LoginFounder.jsx'
import { MemberShip } from './app/MemberShip.jsx'
import NewHome from "./app/admin/NewHome.js";
import NewHome2 from "./app/admin/NewHome2.js";
import NewHome3 from "./app/admin/NewHome3.js";
import Newunicorninvestor from "./app/Newunicorninvestor.jsx";
import Newunicornfounder from "./app/Newunicornfounder.jsx";




import { FutureUnicornDescription } from './app/FutureUnicornDescription.jsx'
import { FutureUnicornDescriptiondesgin } from './app/FutureUnicornDescriptiondesgin.jsx'
import { Thankyou } from './app/Thankyou.jsx';
import { CheckboxThank } from './app/CheckboxThank.jsx';
import { FounderTransactionHistory } from './app/FounderTransactionHistory.jsx';
import { FounderDashboardType } from './app/FounderDashboardType.jsx';
import { FounderMyListing } from './app/FounderMyListing.jsx';
import { MyUnicornPlan } from './app/Unicorn/MyUnicornPlan.jsx';
import { ViewPlan } from './app/Unicorn/ViewPlan.jsx';
import { FounderDraftList } from './app/FounderDraftList.jsx';
import { FinishedEditPopup } from './app/FinishedEditPopup.jsx';
import { RemainingEditPopup } from './app/RemainingEditPopup.jsx';
import { FounderMyPlan } from './app/FounderMyPlan.jsx';
import { FutureUnicornFormEdits } from './app/FutureUnicornFormEdits.jsx';

import { FounderInterest } from './app/FounderInterest.jsx';

import { DashboardType } from './app/DashboardType.jsx'
import { FutureUnicornForm } from './app/FutureUnicornForm.jsx'
import { FounderEdit } from './app/FounderEdit.jsx'
import { WaitApproval } from './app/WaitApproval.jsx';
import { FutureUnicornList } from './app/FutureUnicornList.jsx';
import { PaymentMethods } from './app/PaymentMethods.jsx'

import Content from "./Content/Content";
import Deals from "./app/Deals";
import Refer from "./app/ReferLogin";
import error from "./app/404";

// import DealDetailsInvidata from "./app/DealDetailsInvidata";
import DealDetails from "./app/DealDetails";
import DealDetailsInstapay from "./app/DealDetailsInstapay";
import DealDetailsAutorobot from "./app/DealDetailsAutorobot";
import Founders from "./app/Founders";
import Investors from "./app/Investors";
import Learn from "./app/Learn";
import { Contact } from "./app/Contact_us.jsx";
import Login from "./app/Founder/Login";
import Signup from "./app/Signup";
import Howitworks from "./app/Howitworks";
import Howitworks2 from "./app/Howitworks2";
import Howitworks3 from "./app/Howitworks3";
import Howitworks4 from "./app/Howitworks4";
import Registration from "./app/Founder/Registration";
import PrivacyPolicy from "./app/PrivacyPolicy";
import TermsConditions from "./app/TermsConditions";
import ClosedDeals from "./app/ClosedDeals";
import inviteReferral from "./app/investor/InviteReferral";
import AccountDetails from "./app/investor/AccountDetails";
import BankDetails from "./app/investor/BankDetails";
import MembershipPlan from "./app/investor/register/MembershipPlan";
import Paiddocuments from "./app/admin/components/modal/Paiddocuments";
import FounderDashboard from "./app/Founder/FounderDashboard";
import FounderInvestors from "./app/Founder/FounderInvestors";
import FounderAnalytics from "./app/Founder/FounderAnalytics";
import ReferLogin from "./app/ReferLogin";
import InvestorKYCScreen from "./app/investor/KYCScreen";
import Investordashbord from "./app/investor/Dashboard";
import InvestorPortfolio from "./app/investor/Portfolio";
import InvestorAnalytics from "./app/investor/Analytics";
import Referral from "./app/investor/Referral";
import Blog from "./app/Blog";
import BlogDetails from "./app/BlogDetails";
import Register from "./app/Register";
import Payment from "./app/Payment";

import adminlogin from "./app/admin/Login";
import admindashboard from "./app/admin/Dashboard";
import adminblog from "./app/admin/Blog";
import admindeals from "./app/admin/Deals";
import opendeals from "./app/admin/OpenDeals";
import analyticinterest from "./app/admin/AnalyticInterest";
import adminfounders from "./app/admin/Founders";
import admininvestors from "./app/admin/Investors";
import admininvestments from "./app/admin/Investments";
import adminstartups from "./app/admin/Startups";
import adminpayments from "./app/admin/Payments";
import InstitutionalReferral from "./app/admin/InstitutionalReferral";
import InstitutionalReferralView from "./app/admin/InstitutionalReferralView";
import GuestAnalytics from "./app/admin/GuestAnalytics";
import RetailReferral from "./app/admin/RetailReferral";
import admindealsettings from "./app/admin/Settings";
import Payments from "./app/investor/Payments";
import Commitment from "./app/investor/Commitment";
import Documents from "./app/investor/Documents";
import FounderDocuments from "./app/Founder/FounderDocuments";
import BasicDetails from "./app/Founder/forms/BasicDetails";
import FounderNewRegister from "./app/Founder/FormFounder";
import Startup from "./app/Founder/startup/Startup";
import BlogCategory from "./app/BlogCategory";
import BlogSearch from "./app/BlogSearch";
import FounderformdetailsPdf from "./app/admin/FounderformdetailsPdf";
import Founderformdetails from "./app/admin/Founderformdetails";
import PremiumMembers from "./app/admin/PremiumMembers";
import FounderFormStatus from "./app/Founder/FounderFormStatus";

import AdminFormStatus from "./app/admin/AdminFormStatus";
import Authenticate from "./app/startup/Login";
import Form from "./app/startup/Form";
import Nonresidentform from "./app/investor/Nonresidentform";

import Success from "./app/Success";
import Registersuccess from "./app/components/Alerts/register/Success";
import Registererror from "./app/components/Alerts/register/Error";
import Kycinstructions from "./app/investor/Kycinstructions";
import investmenterror from "./app/components/Alerts/investment/Error";
import investmentsuccess from "./app/components/Alerts/investment/Success";
import documenterror from "./app/components/Alerts/document/Error";
import documentsuccess from "./app/components/Alerts/document/Success";
import renewsuccess from "./app/components/Alerts/renew/Success";
import renewerror from "./app/components/Alerts/renew/Error";

// deal pages
import Instapay from "./app/deal-pages/Instapay";
import Autorobot from "./app/deal-pages/Autorobot";
import Fashiondeal from "./app/deal-pages/Fashiondeal";
import InvidataPublic from "./app/deal-pages/InvidataPublic";
import TransBankPrivate from "./app/deal-pages/TransBankPrivate";
import TransBankPublic from "./app/deal-pages/TransBankPublic";

import Test from "./app/components/Alerts/investment/Test";
import Step1 from "./app/investor/register/Step1";
import FounderRegistration from "./app/Founder/FounderRegistration";
import OfflinePayments from "./app/admin/OfflinePayment";
import covertfoundertoinvestor from "./app/Founder/NationalityDetails";
// foudner as investor
import fdashboard from "./app/Founder/investorside/Dashboard";
import fanalytics from "./app/Founder/investorside/Analytics";
import fportfolio from "./app/Founder/investorside/Portfolio";
import freferral from "./app/Founder/investorside/Referral";
import ftransactions from "./app/Founder/investorside/Transactions";

// investor as founder
import covertinvestortofounder from "./app/investor/NationalityDetails";
import InvidataPrivate from "./app/deal-pages/InvidataPrivate";
import AdminBlogCategory from "./app/admin/AdminBlogCategory";
import TemplatePublic from "./app/deal-pages/Template";
import ISkillBoxPublic2 from "./app/deal-pages/ISkillboxPublic2";

// import Petmojo from "./app/deal-pages/Petmojo";
import Targetpeak from "./app/deal-pages/Targetpeak";
import TransBnkCCPS from "./app/deal-pages/TransBnkCCPS";
import TransBnkCCD from "./app/deal-pages/TransBnkCCD";
// import TransBnkCCD_demo from "./app/deal-pages/TransBankCCD_demo";
import founderDeals from "./app/Founder/Deals";

import founderkycinst from "./app/Founder/kyc_screens/Instructions";
import founderkycscreen from "./app/Founder/kyc_screens/VerifyKyc";
import founderkycNonRes from "./app/Founder/kyc_screens/Nonresident";
import Footrax from "./app/deal-pages/Footrax";
import RouteChangeTracker from "./app/RouteChangeTracker";
import { TRACKING_ID } from "./app/constants/data";
import Yolo from "./app/deal-pages/Yolo";
import EventBeep from "./app/deal-pages/EventBeep";
import Homversity from "./app/deal-pages/Homversity";
import Tulua from "./app/deal-pages/Tulua.jsx";
import HumSafer from "./app/deal-pages/HumSafer";
import IndianStartupNews from "./app/deal-pages/IndianStartupNews";
import IndusUno from "./app/deal-pages/IndusUno";
import AtreyaTranche1 from "./app/deal-pages/AtreyaTranche1";
import AtreyaTranche2 from "./app/deal-pages/AtreyaTranche2";
import DcodeCare from "./app/deal-pages/DcodeCare";
import BizPay from "./app/deal-pages/BizPay";
import BizPayTranche2 from "./app/deal-pages/BizpayTranche2";
import Bulkpe from "./app/deal-pages/Bulkpe";
import Invidata from "./app/deal-pages/Invidata";
import TestDeal1 from "./app/deal-pages/TestDeal1";
import TestDeal2 from "./app/deal-pages/TestDeal2";
import ProtectDeals from "./app/ProtectDeals";
import ProtectUnicorn from "./app/ProtectUnicorn.js";
import PendingOfflinePayments from "./app/admin/PendingOfflinePayments";
import UnderMaintenance from "./app/UnderMaintenance";
import AdminDocuments from "./app/admin/AdminDocuments";
import Newboo from "./app/deal-pages/Newboo";
import ORAI from "./app/deal-pages/ORAI.jsx";
import LiaPlus from "./app/deal-pages/LiaPlus.jsx";
import EleFant from "./app/deal-pages/EleFant.jsx";
import EcoRatings from "./app/deal-pages/EcoRatings.jsx";
import Stroom from "./app/deal-pages/Stroom.jsx";
import Nymbleup from "./app/deal-pages/Nymbleup.jsx";
import IndusUnoTranche2 from "./app/deal-pages/IndusUnoTranche2";
import { Newdeals } from "./app/Newdeals.jsx";
import jqeryscript from "./jq.js"
import FamilyAdmin from "./app/admin/FamilyAdmin.jsx";
import UnicornAdmin from "./app/admin/UnicornAdmin.jsx";
import familyRemoveRequest from "./app/admin/familyRemoveRequest.jsx";
import Familymanage from "./app/admin/Familymanage.jsx";
import FutureUnicorn from "./app/admin/FutureUnicorn.jsx";
import FUnicornStartup from "./app/admin/FUnicornStartup.js";
import FUnicornInvestors from "./app/admin/FUnicornInvestors.js";
import FUnicornFounders from "./app/admin/FUnicornFounders.js";
import TableComponent from "./app/admin/pdfview/TableComponent.js";
import { Synergy } from "./app/Synergy.jsx";
import { Synergypartner } from "./app/Synergy-partner.jsx";


import Createfamily from "./app/investor/Create-Family.jsx";
import InvestorFutureunicorn from "./app/investor/InvestorFutureunicorn.jsx";
import Viewfamilylist from "./app/investor/View-family-list.jsx";
import familyinvite from "./app/investor/family-invite.jsx";



import Mindler from "./app/deal-pages/Mindler.jsx";
import CUR8 from "./app/deal-pages/CUR8.jsx";
import Edept from "./app/deal-pages/Edept.jsx";
import VsnapU from "./app/deal-pages/vsnapU.jsx";
import uknowva from "./app/deal-pages/uknowva.jsx";
import Innoserv from "./app/deal-pages/Innoserv.jsx";
import Petmojo from "./app/deal-pages/Petmojo(Pre Series A).jsx";
import LVLAlpha from "./app/deal-pages/LVLAlpha.jsx";
import  {Preview} from "./app/Unicorn/forms/Preview.jsx";
import UnicornEnquiryFutureUnicorn from "./app/Founder/UnicornEnquiryFutureunicorn.js";
import EleFant2 from "./app/deal-pages/EleFant2.jsx";
import Mannlich from "./app/deal-pages/Mannlich.jsx";
import Retnerai from "./app/deal-pages/Retnerai.jsx";
import CareerCompany from "./app/deal-pages/CareerCompany.jsx";
import Garudaaerospace from "./app/deal-pages/Garudaaerospace.jsx";
import CombinedRegistration from "./app/investor/register/CombinedRegistration.js";
import UnicornAdminAll from "./app/admin/UnicornAdminAll.jsx";
import UnicornAdminPayment from "./app/admin/UnicornAdminPayment.jsx";
import ExtraMile from "./app/deal-pages/ExtraMile.jsx";
import Goodmelts from "./app/deal-pages/Goodmelts.jsx";
import Stroom2 from "./app/deal-pages/Stroom2.jsx";
import Tulua2 from './app/deal-pages/Tulua2.jsx'
import RolesPermissions from "./app/admin/RolesPermissions";
import UserRoleAssign from "./app/admin/UserRoleAssign";
import ProtectedAdminRoute from "./app/admin/common/ProtectedAdminRoute";
import TargetPeak2 from "./app/deal-pages/TargetPeak2.jsx";

ReactGA.initialize(TRACKING_ID);

function App() {

  // GOOGLE ANALYTICS

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
        <Switch>
          <Route exact path="/the EleFant">
            <Redirect to="/theEleFant" />
          </Route>

          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact component={Homenew} />
          <Route path="/NewHome" exact component = {NewHome} />
          <Route path="/NewHome2" exact component = {NewHome2} />
          <Route path="/NewHome3" exact component = {NewHome3} />
       
          <Route path="/unicornfounder" exact component = {Newunicornfounder} />
          <Route path="/unicorninvestor" exact component = {Newunicorninvestor} />




          <Route path="/about" exact component={Aboutnew} />
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
          <Route path="/ViewUnicornPlan/:planName?" exact component={ViewPlan} />
          <Route path="/FounderMyPlan" exact component={FounderMyPlan} />
          <Route path="/FounderInterest" exact component={FounderInterest} />
          <Route path="/FounderDraftList" exact component={FounderDraftList} />
          <Route path="/FinishedEditPopup" exact component={FinishedEditPopup} />
          <Route path="/RemainingEditPopup" exact component={RemainingEditPopup} />
          {/* <Route path="/FutureUnicornFormEdits" exact component={FutureUnicornFormEdits} /> */}
          {/* <Route path="/FutureUnicornList" exact component={FutureUnicornList} /> */}
          <Route path="/WaitApproval" exact component={WaitApproval} />
          <Route path="/CheckboxThank" exact component={CheckboxThank} />

          <Route path="/FamilyDashboard" exact component={FamilyDashboard} />
          <Route path="/Preview" exact component={Preview} />
          <Route path="/FutureUnicornList" exact component={FutureUnicornList} />
          {/* <Route path="/FutureUnicornDescription/:urlName" exact  component={FutureUnicornDescription} /> */}
          <Route path="/FutureUnicornForm" exact  component={FutureUnicornForm} >
            <ProtectUnicorn Component2={FutureUnicornForm}   Conditon={true} />
            </Route>
          <Route path="/InformationList" exact  >
            <ProtectUnicorn Component2={InformationList}   Conditon={true} />
            </Route>
          {/* <Route path="/FutureUnicornDescription" exact component={FutureUnicornDescription} /> */}
          <Route path="/FutureUnicornDescriptiondesgin" exact component={FutureUnicornDescriptiondesgin} />
          {/* <Route path="/FutureUnicornForm" exact component={FutureUnicornForm} /> */}
          {/* <Route path="/InformationList" exact component={InformationList} /> */}
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
          <Route
            path="/DealDetailsAutorobot"
            component={DealDetailsAutorobot}
          />
          <Route path="/Founders" exact component={Founders} />
          <Route path="/Investors" exact component={Investors} />
          <Route path="/Learn" exact component={Learn} />
          <Route path="/Contact-us" exact component={Contact} />
          <Route path="/Login" exact component={Login} />
          <Route path="/founder-login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
          <Route path="/Signup" exact component={CombinedRegistration} />
          <Route path="/resources" exact component={Howitworks} />
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
          <Route
            path="/Investor-founder-registration"
            exact
            component={CombinedRegistration}
          />
          <Route
            path="/investor-dashboard"
            exact
            component={Investordashbord}
          />
          <Route path="/investor-kyc" exact>
            <ProtectDeals Component2={InvestorKYCScreen} Conditon={true} />
          </Route>
          <Route
            path="/investor-registration"
            exact
            component={CombinedRegistration}
          />
          <Route
            path="/investor-portfolio"
            exact
            component={InvestorPortfolio}
          />
          <Route
            path="/investor-analytics"
            exact
            component={InvestorAnalytics}
          />
          <Route path="/investor-transactions" exact component={Payments} />
          <Route path="/investor-commitment" exact component={Commitment} />
          <Route path="/investor-documents" exact component={Documents} />
          <Route
            path="/founderdash-documents"
            exact
            component={FounderDocuments}
          />

          {/* <Route path="/Blog" exact component={Blog} /> */}
          <Route path="/details" component={BlogDetails} />
          <Route path="/pay" component={Payment} />

          <Route path="/admin" exact component={adminlogin} />
          <Route path="/admin-dashboard" exact component={admindashboard} />
          <Route path="/admin-blog" exact component={adminblog} />
          <ProtectedAdminRoute
            exact
            path="/admin-deals"
            component={admindeals}
            requiredModule="deals_completed"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            exact
            path="/open-deals"
            component={opendeals}
            requiredModule="deals"
            requiredAction="view_open"
          />
          <ProtectedAdminRoute
            path="/analytic-interest"
            exact
            component={analyticinterest}
            requiredModule="dropoff"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            exact
            path="/guest-analytics"
            component={GuestAnalytics}
            requiredModule="guest_analytics"
            requiredAction="view"
          />
          <Route path="/admin/roles-permissions" component={RolesPermissions} />
          <Route exact path="/admin/user-roles" component={UserRoleAssign} />
          <ProtectedAdminRoute
            exact
            path="/admin-founders"
            component={adminfounders}
            requiredModule="founders"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            exact
            path="/admin-investors"
            component={admininvestors}
            requiredModule="investors"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            exact
            path="/admin-startups"
            component={adminstartups}
            requiredModule="startups"
            requiredAction="view"
          />
          <ProtectedAdminRoute 
            exact 
            path="/admin-family"          
            component={FamilyAdmin}
            requiredModule="groups"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            exact
            path="/admin-unicorn"
            component={UnicornAdmin}
            requiredModule="unicorns_published"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            exact
            path="/admin-all-unicorn"
            component={UnicornAdminAll}
            requiredModule="unicorns_all"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            exact
            path="/admin-unicorn-payments"
            component={UnicornAdminPayment}
            requiredModule="unicorns_payments"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            exact
            path="/family-Remove-Request"
            component={familyRemoveRequest}
            requiredModule="group_remove_requests"
            requiredAction="view"
          />
          <Route path="/admin-family-manage" exact component={Familymanage} />
          <Route path="/future-unicorn-startups" exact component={FUnicornStartup} />
          <Route path="/FutureUnicorn" exact component={FutureUnicorn}  />
          <Route path="/FutureUnicorn/:urlName" component={FutureUnicornDescription} />
            {/* <ProtectUnicorn Component2={FutureUnicorn}   Conditon={true} />
            </Route> */}
          <Route path="/future-unicorn-investors" exact component={FUnicornInvestors} />
          <Route path="/future-unicorn-founders" exact component={FUnicornFounders} />





          <ProtectedAdminRoute
            exact
            path="/admin-investments"
            component={admininvestments}
            requiredModule="investments"
            requiredAction="view"
          />
          <ProtectedAdminRoute path="/admin-payments"
            exact
            component={adminpayments}
            requiredModule="payments_online"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            path="/admin-institutional-referral"
            exact
            component={InstitutionalReferral}
            requiredModule="institutional_referral"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            path="/online-document-payments"
            exact
            component={Paiddocuments}
            requiredModule="payments_documents"
            requiredAction="view"
          />
          <Route
            path="/admin-referral-view"
            exact
            component={InstitutionalReferralView}
          />
          <ProtectedAdminRoute
            path="/admin-retail-referral"
            exact
            component={RetailReferral}
            requiredModule="retail_referral"
            requiredAction="view"
          />
          <ProtectedAdminRoute 
          path="/admin-settings" 
          exact 
          component={admindealsettings}
          requiredModule="settings"
          requiredAction="view"
           />
          <Route path="/test" exact component={Test} />
          <Route path="/success" exact component={Success} />
          <Route path="/basic-details" exact component={BasicDetails} />

          <Route path="/startup-form" exact component={FounderNewRegister} />
          <Route path="/assessment-form" exact component={Startup} />
          <ProtectedAdminRoute
            path="/founder-documents"
            exact
            component={Founderformdetails}
            requiredModule="founder_documents"
            requiredAction="view"
          />
          <Route
            path="/admin-founder-dashboard"
            exact
            component={TableComponent}
          />
          <ProtectedAdminRoute
            path="/documents"
            exact
            component={AdminDocuments}
            requiredModule="documents"
            requiredAction="view"
          />
          <Route
            path="/founder-documentsPdf"
            exact
            component={FounderformdetailsPdf}
          />
          <ProtectedAdminRoute
            exact
            path="/premium-members"
            component={PremiumMembers}
            requiredModule="premium_members"
            requiredAction="view"
          />
          <Route path="/register-success" exact component={Registersuccess} />
          <Route path="/register-error" exact component={Registererror} />
          <Route
            path="/founder-survey-result"
            expact
            component={FounderFormStatus}
          />
          <Route
            path="/admin-survey-result"
            exact
            component={AdminFormStatus}
          />
          <Route path="/authenticate" exact component={Authenticate} />
          <Route path="/information-form" exact component={Form} />
          <Route path="/kyc-instructions" exact component={Kycinstructions} />
          <Route
            path="/transaction-success"
            exact
            component={investmentsuccess}
          />
          <Route path="/transaction-error" exact component={investmenterror} />

          <Route path="/Instapay" exact component={Instapay} />
          <Route path="/Autorobot" exact component={Autorobot} />
          <Route path="/invidata-public" exact component={InvidataPublic} />
          <Route path="/referral-login" exact component={ReferLogin} />
          <Route path="/document-error" exact component={documenterror} />
          <Route path="/document-success" exact component={documentsuccess} />
          <Route path="/fashiondeal" exact component={Fashiondeal} />
          <ProtectedAdminRoute
            path="/admin-payments-offline"
            exact
            component={OfflinePayments}
            requiredModule="payments_offline"
            requiredAction="view"
          />
          <ProtectedAdminRoute
            path="/pending-offline-payments"
            exact
            component={PendingOfflinePayments}
            requiredModule="payments_offline_pending"
            requiredAction="view"
          />
          <Route
            path="/founder-as-investor"
            exact
            component={covertfoundertoinvestor}
          />
          {/* founder as investor */}
          <Route
            path="/founder-as-investor-dashboard"
            exact
            component={fdashboard}
          />
          <Route
            path="/founder-as-investor-analytics"
            exact
            component={fanalytics}
          />
          <Route
            path="/founder-as-investor-portfolio"
            exact
            component={fportfolio}
          />
          <Route
            path="/founder-as-investor-referral"
            exact
            component={freferral}
          />
          <Route
            path="/founder-as-investor-transactions"
            exact
            component={ftransactions}
          />
          {/* // investor-as-founder */}
          <Route
            path="/investor-as-founder"
            exact
            component={covertinvestortofounder}
          />
          <Route
            path="/investor-as-founder-dashboard"
            exact
            component={FounderDashboard}
          />
          <Route
            path="/investor-as-founder-investors"
            exact
            component={FounderInvestors}
          />
          <Route
            path="/investor-as-founder-analytics"
            exact
            component={FounderAnalytics}
          />
          <Route
            path="/investor-as-founder-startup-form"
            exact
            component={FounderNewRegister}
          />
          <Route
            path="/investor-as-founder-assessment-form"
            exact
            component={Startup}
          />
          <Route
            path="/investor-as-founder-founder-deals"
            exact
            component={founderDeals}
          />

          <Route path="/invidata-private" exact component={InvidataPrivate} />
          <Route path="/renew-success" exact component={renewsuccess} />
          <Route path="/renew-error" exact component={renewerror} />
          <Route
            path="/admin-blog-category"
            exact
            component={AdminBlogCategory}
          />

          <Route path="/iSkillBox" exact>
            <ProtectDeals Component={ISkillBoxPublic2} />
          </Route>
          {/* <Route path="/petmojo" exact>
            <ProtectDeals Component={Petmojo} />
          </Route> */}
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
          <Route path="/EcoRatings" >
            <ProtectDeals Component={EcoRatings} />
          </Route>
          <Route path="/TuluaRound1" >
            <ProtectDeals Component={Tulua} />
          </Route>
          <Route path="/StroomRound1" >
            <ProtectDeals Component={Stroom} />
          </Route>
          <Route path="/Stroom" >
            <ProtectDeals Component={Stroom2} />
          </Route>
          <Route path="/Liaplus" >
            <ProtectDeals Component={LiaPlus} />
          </Route>
          <Route path="/Mindler" >
            <ProtectDeals Component={Mindler} />
          </Route>
          <Route path="/CUR8" >
            <ProtectDeals Component={CUR8} />
          </Route>
          <Route path="/Nymbleup" >
            <ProtectDeals Component={Nymbleup} />
          </Route>
          <Route path="/Mindler" >
            <ProtectDeals Component={Mindler} />
          </Route>
          <Route path="/CUR8" >
            <ProtectDeals Component={CUR8} />
          </Route>
          <Route path="/Edept" >
            <ProtectDeals Component={Edept} />
          </Route>
          <Route path="/VsnapU" >
            <ProtectDeals Component={VsnapU} />
          </Route>
          <Route path="/uknowva" >
            <ProtectDeals Component={uknowva} />
          </Route>

          <Route path="/Petmojo" >
            <ProtectDeals Component={Petmojo} />
          </Route>
          <Route path="/Innoserv" >
            <ProtectDeals Component={Innoserv} />
          </Route>
          <Route path="/LVLAlpha" >
            <ProtectDeals Component={LVLAlpha} />
          </Route>
          <Route path="/TestDeal2" exact>
            <ProtectDeals Component={TestDeal2} />
          </Route>

          <Route path="/Footrax" exact>
            <ProtectDeals Component={Footrax} />
          </Route>
          {/* <Route path='/TransBankPrivate' exact component={TransBankPrivate}/>           */}
          <Route path="/TransbnkCCD-Public" exact>
            <ProtectDeals Component={TransBankPublic} />
          </Route>
          <Route path="/TransBnkCCD" exact>
            <ProtectDeals Component={TransBnkCCD} />
          </Route>
          {/* <Route path="/TransBnkCCD_demo" exact component={TransBnkCCD_demo} />   */}
          <Route path="/TransBnkCCPS" exact>
            <ProtectDeals Component={TransBnkCCPS} />
          </Route>

          <Route path="/Template" exact component={TemplatePublic} />
          <Route path="/founder-deals" exact component={founderDeals} />
          <Route path="/non-resident-form" exact component={Nonresidentform} />
          <Route
            path="/founder-non-resident-form"
            exact
            component={founderkycNonRes}
          />
          <Route
            path="/founder-kyc-instructions"
            exact
            component={founderkycinst}
          />
          <Route
            path="/founder-verify-kyc"
            exact
            component={founderkycscreen}
          />
          <Route path="/Group-Investments" exact component={Createfamily} />
          <Route path="/View-Group-list" exact component={Viewfamilylist} />
          <Route path="/Group-Invite"  component={familyinvite} />
          <Route path="/My-Future-unicorn" exact component={InvestorFutureunicorn} />
          <Route path="/UnicornEnquiryList" exact component={UnicornEnquiryFutureUnicorn} />

          

          <Route path="*" exact component={error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
