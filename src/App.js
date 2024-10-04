import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "react-image-lightbox/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactGA from "react-ga4";

import Home from "./app/Home";
import Homenew from "./app/Homenew.jsx";
import { Aboutnew } from "./app/Aboutnew.jsx";
import { FamilyDashboard } from "./app/FamilyDashboard.jsx"
import { InformationList } from "./app/InformationList.jsx"
import { LoginInvestor } from './app/LoginInvestor.jsx'
import { LoginFounder } from './app/LoginFounder.jsx'
import { MemberShip } from './app/MemberShip.jsx'
import NewHome from "./app/admin/NewHome.js";

import { FutureUnicornDescription } from './app/FutureUnicornDescription.jsx'
import { DashboardType } from './app/DashboardType.jsx'
import { FutureUnicornForm } from './app/FutureUnicornForm.jsx'
import { FounderEdit } from './app/FounderEdit.jsx'
import { WaitApproval } from './app/WaitApproval.jsx';
import { FutureUnicornList } from './app/FutureUnicornList.jsx';
import {PaymentMethods} from './app/PaymentMethods.jsx'
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
import FounderLogin from "./app/Founder/FounderLogin";
import ReferLogin from "./app/ReferLogin";
import InvestorKYCScreen from "./app/investor/KYCScreen";
import InvestorRegistration from "./app/investor/register/Step2";
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
import InvestorFounderRegistration from "./app/Founder/InvestorFounderRegistration.jsx";
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

import Petmojo from "./app/deal-pages/Petmojo";
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
import PendingOfflinePayments from "./app/admin/PendingOfflinePayments";
import UnderMaintenance from "./app/UnderMaintenance";
import AdminDocuments from "./app/admin/AdminDocuments";
import Newboo from "./app/deal-pages/Newboo";
// import ORAI from "./app/deal-pages/ORAI.jsx";
import ORAI from "./app/deal-pages/ORAI1.jsx";
import EleFant from "./app/deal-pages/EleFant.jsx";
import EcoRatings from "./app/deal-pages/EcoRatings.jsx";
import Stroom from "./app/deal-pages/Stroom.jsx";
import Nymbleup from "./app/deal-pages/Nymbleup.jsx";
import IndusUnoTranche2 from "./app/deal-pages/IndusUnoTranche2";
import { Newdeals } from "./app/Newdeals.jsx";
import jqeryscript from "./jq.js"
import FUnicornStartup from "./app/admin/FUnicornStartup.js";
import FUnicornInvestors from "./app/admin/FUnicornInvestors.js";
import FUnicornFounders from "./app/admin/FUnicornFounders.js";
import TableComponent from "./app/admin/pdfview/TableComponent.js";



ReactGA.initialize(TRACKING_ID);

function App() {

  // GOOGLE ANALYTICS

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <RouteChangeTracker />
        <Switch>
          <Route exact path="/the EleFant">
            <Redirect to="/theEleFant" />
          </Route>

          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact component={Homenew} />
          <Route path="/NewHome" exact component = {NewHome} />

          <Route path="/about" exact component={Aboutnew} />
          <Route path="/LoginInvestor" exact component={LoginInvestor} />
          <Route path="/LoginFounder" exact component={LoginFounder} />
          <Route path="/MemberShip" exact component={MemberShip} />
          <Route path="/DashboardType" exact component={DashboardType} />
          <Route path="/FounderEdit" exact component={FounderEdit} />
          <Route path="/PaymentMethods" exact component={PaymentMethods} />

          <Route path="/FutureUnicornList" exact component={FutureUnicornList} />
          <Route path="/FutureUnicornDescription" exact component={FutureUnicornDescription} />
          <Route path="/WaitApproval" exact component={WaitApproval} />

          <Route path="/FamilyDashboard" exact component={FamilyDashboard} />
          <Route path="/FutureUnicornForm" exact component={FutureUnicornForm} />
          <Route path="/InformationList" exact component={InformationList} />
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
          <Route path="/founder-login" exact component={FounderLogin} />
          <Route path="/Register" exact component={Register} />
          <Route path="/Signup" exact component={Step1} />
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
            path="/founder-registration"
            exact
            component={FounderRegistration}
          />
          <Route
            path="/Investor-founder-registration"
            exact
            component={InvestorFounderRegistration}
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
            component={InvestorRegistration}
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
          <Route path="/admin-deals" exact component={admindeals} />
          <Route path="/open-deals" exact component={opendeals} />
          <Route path="/analytic-interest" exact component={analyticinterest} />
          <Route path="/admin-founders" exact component={adminfounders} />
          <Route path="/admin-investors" exact component={admininvestors} />
          <Route path="/admin-startups" exact component={adminstartups} />
          <Route path="/future-unicorn-startups" exact component={FUnicornStartup} />
          <Route path="/future-unicorn-investors" exact component={FUnicornInvestors} />
          <Route path="/future-unicorn-founders" exact component={FUnicornFounders} />




         
          <Route path="/admin-investments" exact component={admininvestments} />
          <Route path="/admin-payments" exact component={adminpayments} />
          <Route
            path="/online-document-payments"
            exact
            component={Paiddocuments}
          />
          <Route
            path="/admin-institutional-referral"
            exact
            component={InstitutionalReferral}
          />
          <Route
            path="/admin-referral-view"
            exact
            component={InstitutionalReferralView}
          />
          <Route
            path="/admin-retail-referral"
            exact
            component={RetailReferral}
          />
          <Route path="/admin-settings" exact component={admindealsettings} />
          <Route path="/test" exact component={Test} />
          <Route path="/success" exact component={Success} />
          <Route path="/basic-details" exact component={BasicDetails} />

          <Route path="/startup-form" exact component={FounderNewRegister} />
          <Route path="/assessment-form" exact component={Startup} />
          <Route
            path="/founder-documents"
            exact
            component={Founderformdetails}
          />
          <Route
            path="/admin-founder-dashboard"
            exact
            component={TableComponent}
          />
          <Route path="/documents" exact component={AdminDocuments} />
          <Route
            path="/founder-documentsPdf"
            exact
            component={FounderformdetailsPdf}
          />
          <Route path="/premium-members" exact component={PremiumMembers} />
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
          <Route
            path="/admin-payments-offline"
            exact
            component={OfflinePayments}
          />
          <Route
            path="/pending-offline-payments"
            exact
            component={PendingOfflinePayments}
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
          <Route path="/petmojo" exact>
            <ProtectDeals Component={Petmojo} />
          </Route>
          <Route path="/Targetpeak" exact>
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
          <Route path="/theEleFant" exact>
            <ProtectDeals Component={EleFant} />
          </Route>
          <Route path="/EcoRatings" >
            <ProtectDeals Component={EcoRatings} />
          </Route>
          <Route path="/Tulua" >
            <ProtectDeals Component={Tulua} />
          </Route>
          <Route path="/Stroom" >
            <ProtectDeals Component={Stroom} />
          </Route>
          <Route path="/Nymbleup" >
            <ProtectDeals Component={Nymbleup} />
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

          <Route path="*" exact component={error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
