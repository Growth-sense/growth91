<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Startup extends CI_Controller {

	// get startup detailss
	function get_startup_details() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$sql = "SELECT * FROM `startup_founder_form` WHERE founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$result = $query->result();
			
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Startup form details fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	// update startup form details
	function update_startup_founder() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$num=$formdata['num'];
			$founder_id=$formdata['founder_id'];
			$post_data=[];
			if($num=='1'){
				$post_data=[
					'email'=>$formdata['email'],
		            'startup_name'=>$formdata['startup_name'],
		            'your_email'=>$formdata['your_email'],
		            'your_name'=>$formdata['your_name'],
		            'designation'=>$formdata['designation'],
				];
			} else if($num=='2'){
				$post_data=[
					'mobile_number'=> $formdata['mobile_number'],
			      'founder_linkedin_url'=> $formdata['founder_linkedin_url'],
			      'founder_designation'=> $formdata['founder_designation'],
			      'founder_time_commitment'=> $formdata['founder_time_commitment'],
			      'founder_education_year'=> $formdata['founder_education_year'],
			      'founder_year_of_experience'=> $formdata['founder_year_of_experience'],
			      'founder_previour_employment_briefs'=> $formdata['founder_previour_employment_briefs'],
			      'founder_brief_familty_background'=> $formdata['founder_brief_familty_background'],
			      'founder_any_specific_info'=> $formdata['founder_any_specific_info'],
			      'founder_date_of_joining'=> $formdata['founder_date_of_joining'],
			      'founder_strength'=> $formdata['founder_strength'],
			      'founder_weakness'=> $formdata['founder_weakness'],
			      'founder_dreams'=> $formdata['founder_dreams'],
			      'founder_long_term_vision'=> $formdata['founder_long_term_vision'],
			      'founder_short_term_vision'=> $formdata['founder_short_term_vision'],
				];
			} else if($num=='3'){
				$post_data=[
					'leadership'=> $formdata['leadership'],
					'leadership_support_your_rating'=> $formdata['leadership_support_your_rating'],
					'understanding_of_finance'=> $formdata['understanding_of_finance'],
					'ufinance_support_your_rating'=> $formdata['ufinance_support_your_rating'],
					'understanding_of_hr'=> $formdata['understanding_of_hr'],
					'uhr_support_your_rating'=> $formdata['uhr_support_your_rating'],
					'understanding_of_low_and_statutory'=> $formdata['understanding_of_low_and_statutory'],
					'ulow_support_your_rating'=> $formdata['ulow_support_your_rating'],
					'passion_for_business'=> $formdata['passion_for_business'],
					'passion_for_business_support_rating'=> $formdata['passion_for_business_support_rating'],
					'passion_for_current_project'=> $formdata['passion_for_current_project'],
					'passion_for_current_project_support_rating'=> $formdata['passion_for_current_project_support_rating'],
					'experimental_mindset'=> $formdata['experimental_mindset'],
					'experimental_mindset_support_rating'=> $formdata['experimental_mindset_support_rating'],
					'out_of_box_thinking'=> $formdata['out_of_box_thinking'],
					'out_of_box_thinking_support_rating'=> $formdata['out_of_box_thinking_support_rating'],
					'problem_solving_skills'=> $formdata['problem_solving_skills'],
					'problem_solving_skills_support_rating'=> $formdata['problem_solving_skills_support_rating'],
					'networking_business'=> $formdata['networking_business'],
					'networking_business_support_rating'=> $formdata['networking_business_support_rating'],
					'networking_social'=> $formdata['networking_social'],
					'networking_social_support_rating'=> $formdata['networking_social_support_rating'],
					'other_memebers_in_founding_core_team'=> $formdata['other_memebers_in_founding_core_team'],
				];
			} else if($num=='5'){
				$post_data=[
					'send_response'=> $formdata['send_response'],
				];
			}
			$sql="SELECT * FROM `startup_founder_form` WHERE founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$count=$query->num_rows();
			$id='';
			if(intval($count)>0){
			    $this->db->where('founder_id', $founder_id);
			    $id = $this->db->update('startup_founder_form', $post_data);
			}else{
			    $post_data['founder_id']=$founder_id;
			    $this->db->insert('startup_founder_form', $post_data);
			    $id=$this->db->insert_id();
			}
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Details are updated successfully.',
					'id' => $id,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	// update startup form details
	function add_member_for_founder() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$post_data=[];
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Details are updated successfully.',
					'id' => $id,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
	}
	// add startup form
	function add_startup_form_entry(){
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$post_data=[
				'submiited_by_founder_id'=>$founder_id,
			];
			$this->db->insert('founder_startup_form',$post_data);
			$id=$this->db->insert_id();
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Details updated successfully.',
					'id' => $id,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
	
	// get startup form details
	function getstartupformdetails(){
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$sql="SELECT * FROM `founder_startup_form` WHERE submiited_by_founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$result=$query->result();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Details updated successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
	
	// add unicorn in draft / temp table
	function createunicorndraft() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			// POst data for table 1
			extract($formdata);
			$post_data=[
		//		'submiited_by_founder_id'=>$founder_id,
		
			'tudStartupName' => $tudStartupName ,
			'tudEmail' => $tudEmail,
			'tudCountryCode' => $tudCountryCode,
			'tudPrimaryContactName' => $tudPrimaryContactName,
			'tudPrimaryContactMobile' => $tudPrimaryContactMobile,
			'tudPrimaryContactEmail' => $tudPrimaryContactEmail,
			'tudDisruptingMarket' => $tudDisruptingMarket,
			'tudTappingNew' => $tudTappingNew,
			'tudCustomerBenifit' => $tudCustomerBenifit,
			'tudSuppliersBenifit' => $tudSuppliersBenifit,
			'tudDirectSubstitueAvailable' => $tudDirectSubstitueAvailable,
			'tudIndirectSubstitueAvailable' => $tudIndirectSubstitueAvailable,
			'tudRiskPerceived' => $tudRiskPerceived,
			'tudRolesCoreTeam' => $tudRolesCoreTeam,
			'tudMoats' => $tudMoats,
			'tudScaleupChallenges' => $tudScaleupChallenges,
			'tudTrademark' => $tudTrademark,
			'tudPatents' => $tudPatents,
			'tudOtherIPs' => $tudOtherIPs,
			'tudOtherDetailsIPs' => $tudOtherDetailsIPs,
			'tudIPsRegistrationInfo' => $tudIPsRegistrationInfo,
			'tudAndroidMobileApp' => $tudAndroidMobileApp,
			'tudAndroidAppDetails' => $tudAndroidAppDetails,
			'tudIphoneMobileApp' => $tudIphoneMobileApp,
			'tudIphoneAppDetails' => $tudIphoneAppDetails,
			'tudIndustryClassification' => $tudIndustryClassification,
			'tudIndustryViews' => $tudIndustryViews,
			'tudIndustryMarketSize' => $tudIndustryMarketSize,
			'tudSupportingInfoMarketSize' => $tudSupportingInfoMarketSize,
			'tudAddressableMarketSize' => $tudAddressableMarketSize,
			'tudSupportingInfoAddressableMarketSize' => $tudSupportingInfoAddressableMarketSize ,
			'tudLocalDirectComp' => $tudLocalDirectComp,
			'tudLocalIndirectComp' => $tudLocalIndirectComp,
			'tudGlobalDirectComp' => $tudGlobalDirectComp,
			'tudGlobalIndirectComp' => $tudGlobalIndirectComp,
			'tudDiffCompetion' => $tudDiffCompetion,
			'tudWhyCompSame' => $tudWhyCompSame,
			'tudUnfairAdv' => $tudUnfairAdv,
			'tudLikeCompetion' => $tudLikeCompetion,
			'tudFailVenture' => $tudFailVenture,
			'tudFailureReason' => $tudFailureReason,
			'tudStrength' => $tudStrength,
			'tudWeakness' => $tudWeakness,
			'tudOpportunities' => $tudOpportunities,
			'tudThreats' => $tudThreats,
			'tudLeagalName' => $tudLeagalName,
			'tudWebsite' => $tudWebsite,
			'tudLegalCin' => $tudLegalCin,
			'tudLegalPan'  => $tudLegalPan,
			'tudLegalCountry' => $tudLegalCountry,
			'tudEstablishedDate' => $tudEstablishedDate,
			'tudActivityStartedDate' => $tudActivityStartedDate,
			'tudRegisteredOffice' => $tudRegisteredOffice,
			'tudCorporateOffice' => $tudCorporateOffice,
			'tudDirector1' => $tudDirector1,
			'tudDin1'  => $tudDin1,
			'tudDirector2'  => $tudDirector2,
			'tudDin2'  => $tudDin2,
			'tudDirector3'  => $tudDirector3,
			'tudDin3'  => $tudDin3,
			'tudDirector4'  => $tudDirector4,
			'tudDin4'  => $tudDin4,
			'tudSocialInsta'  => $tudSocialInsta,
			'tudSocialFacebook'  => $tudSocialFacebook,
			'tudSocialLinkedIn'  => $tudSocialLinkedIn,
			'tudSocialYouTube'  => $tudSocialYouTube,
			'tudSocialOthers'  => $tudSocialOthers,
			'tudGtmStratergy' => $tudGtmStratergy,
			'tudGtmBackup' => $tudGtmBackup,
			'tudExistingCac'  => $tudExistingCac,
			'tudExpectedCac'  => $tudExpectedCac,
			'tudLogicCac'  => $tudLogicCac,
			'tudLtvCustomer'  => $tudLtvCustomer,
			'tudLogicLtvNumber'  => $tudLogicLtvNumber,
			'tudLtvCacRatio'  => $tudLtvCacRatio,
			'tudNumberofClients' => $tudNumberofClients,
			'tudClientRetentions' => $tudClientRetentions,
			'tudRevenueTop10' => $tudRevenueTop10,
			'tudUnitEconomics' => $tudUnitEconomics,
			'tudTotalCapEx' => $tudTotalCapEx,
			'tudAmountSpentProdDev' => $tudAmountSpentProdDev,
			'tudMajorExpInv' => $tudMajorExpInv,
			'tudAuthorisedCap'  => $tudAuthorisedCap,
			'tudPaidupCapi'  => $tudPaidupCapi,
			'tudFounderPer'  => $tudFounderPer,
			'tudCorePer'  => $tudCorePer,
			'tudEsopPer'  => $tudEsopPer,
			'tudOtherPer' => $tudOtherPer,
			'tudAmountByFounder'  => $tudAmountByFounder,
			'tudUnsecLoanFounder' => $tudUnsecLoanFounder,
			'tudUnsecLoanOthers' => $tudUnsecLoanOthers,
			'tudOtherLoan' => $tudOtherLoan,
			'tudFounderSalary'  => $tudFounderSalary,
			'tudFounderSalaryPlan' => $tudFounderSalaryPlan,
			'tudCoreTeamSalary'  => $tudCoreTeamSalary,
			'tudTotalSalary'  => $tudTotalSalary,
			'tudPreviousFundRaised' => $tudPreviousFundRaised,
			'tudFundRequired' => $tudFundRequired,
			'tudExpRunway' => $tudExpRunway,
			'tudValueFundRaise' => $tudValueFundRaise,
			'tudLogicFundRaise' => $tudLogicFundRaise,
			'tudOpentoLower' => $tudOpentoLower,
			'tudCapexImmidate' => $tudCapexImmidate,
			'tudCapexFuture' => $tudCapexFuture,
			'tudProductFund'  => $tudProductFund,
			'tudMarketingFund'  => $tudMarketingFund,
			'tudSalaryFund'  => $tudSalaryFund,
			'tudCastComFund'  => $tudCastComFund,
			'tudOthersFund'  => $tudOthersFund,
			'tudRepaymentFund'  => $tudRepaymentFund,
			'tudGstRegistered' => $tudGstRegistered,
			'tudGstDetails' => $tudGstDetails,
			'tudAuditedBL' => $tudAuditedBL,
			'tudItrFilling' => $tudItrFilling,
			'tudAgm' => $tudAgm,
			'tudPendingRoc' => $tudPendingRoc,
			'tudPastDelays' => $tudPastDelays,
			'tudOtherApplicableCompliance'=> $tudOtherApplicableCompliance ,
			'tudCaInfo'  => $tudCaInfo,
			'tudCsInfo'  => $tudCsInfo,
			'tudOtherLegalInfo'  => $tudOtherLegalInfo,
			'tudAcceptedDate'  => $tudAcceptedDate,
			'tudPublishedDate' => $tudPublishedDate,
			'tudExpiryDate' => $tudExpiryDate,
			'founderID' => $founderID, 
			'tudDeclare' => $tudDeclare,
			];		
			
			$this->db->insert('tempunicorndeals',$post_data);
			$id=$this->db->insert_id();
			if($id) {

				$post_data2=[
					'tudTempUdID'  => $id,
					'tudSaleExitInfo'  => $tudSaleExitInfo,
					'tudDepedencyPerson'  => $tudDepedencyPerson,
					'tudReglarityIssue'  => $tudReglarityIssue,
					'tudLicPermissionStatus'  => $tudLicPermissionStatus,
					'tudTeamSize'  => $tudTeamSize,
					'tud5perCommission'  => $tud5perCommission,
					'tud10perCommission'  => $tud10perCommission,
					'tudExitTimeline'  => $tudExitTimeline,
					'tudSubsidiries'  => $tudSubsidiries,
					'tudSisterConcerns'  => $tudSisterConcerns,
					'tudRelatedPartyTrans'  => $tudRelatedPartyTrans,
					'tudLegalRisk'  => $tudLegalRisk,
					'tudFounderExitEarlier'  => $tudFounderExitEarlier,
					'tudDemoLink'  => $tudDemoLink,
					'tudOtherDocsLinks'  => $tudOtherDocsLinks,
					'tudMediaCoverLinks'  => $tudMediaCoverLinks,
					'tudAwards'  => $tudAwards,
					'tudStartupRecon'  => $tudStartupRecon,
					'tudOtherInfo'  => $tudOtherInfo,
					'tudCustomerRef'  => $tudCustomerRef,
					'tudVendorRef'  => $tudVendorRef,
					'tudPastEmployerRef'  => $tudPastEmployerRef,
					'tudGuideRef'  => $tudGuideRef,
					'tudPitchDeck'  => $tudPitchDeck,
					'tudDoc1'  => $tudDoc1,
					'tudDoc2'  => $tudDoc2,
					'tudDoc3'   => $tudDoc3,
					'tudStartupFounderName'=> $tudStartupFounderName,
					'tudStartupFounderMobileCountryCode' => $tudStartupFounderMobileCountryCode,
					'tudStartupFounderMobileNumber'=> $tudStartupFounderMobileNumber,
					'tudStartupFounderEmail'=> $tudStartupFounderEmail,
					'tudDealShowDateForRegularMember'=> $tudDealShowDateForRegularMember,
					'tudDealShowDateForPremiumMember'=> $tudDealShowDateForPremiumMember,
					'tudDealStartDateForRegularMember'=> $tudDealStartDateForRegularMember,
					'tudDealStartDateForPremiumMember'=> $tudDealStartDateForPremiumMember,
					'tudDealEndDateForRegularMember'=> $tudDealEndDateForRegularMember,
					'tudDealEndDateForPremiumMember'=> $tudDealEndDateForPremiumMember,
					'tudTargetAmount'=> $tudTargetAmount,
					'tudMinInvestmentAmount'=> $tudMinInvestmentAmount,
					'tudCAPTableThresholdAmount'=> $tudCAPTableThresholdAmount,
					'tudMaxInvestmentAmount'=> $tudMaxInvestmentAmount,
					'tudCAPTableMultiple'=> $tudCAPTableMultiple,
					'tudMultiplesOf'=> $tudMultiplesOf,
					'tudRaiseGap'=> $tudRaiseGap,
					'tudEnableSpecialOffer'=> $tudEnableSpecialOffer,
					'tudSpecialOfferText'=> $tudSpecialOfferText,
					'tudInputDefaultText'=> $tudInputDefaultText,
					'tudDiscount'=> $tudDiscount,
					'tudEscrowAccountName'=> $tudEscrowAccountName,
					'tudEscrowAccountNumber'=> $tudEscrowAccountNumber,
					'tudEscrowAccountBank'=> $tudEscrowAccountBank,
					'tudEscrowAccountBranch'=> $tudEscrowAccountBranch,
					'tudEscrowAccountIFSC'=> $tudEscrowAccountIFSC,
					'tudDigioTemplateId'=> $tudDigioTemplateId,
					'tudDigioSignforInvestor'=> $tudDigioSignforInvestor,
					'tudDigioSignforFounder'=> $tudDigioSignforFounder,
					'tudDealDescription'=> $tudDealDescription,
					'tudBackedBy'=> $tudBackedBy,
					'tudYoutubeLink'=> $tudYoutubeLink,
					'tudCategory'=> $tudCategory,
					'tudBannerImage'=> $tudBannerImage,
					'tudSelectLogo'=> $tudSelectLogo,
					'tudPageLink'=> $tudPageLink,
					'tudVendorId'=> $tudVendorId,
					'tudStartupHighlights'=> $tudStartupHighlights,
					'tudMediaCoverages'=> $tudMediaCoverages,
					'tudMark'=> $tudMark,

					'tudValuation'=> $tudValuation,
					'tudLegalname'=> $tudLegalname,
					'tudFoundedon'=> $tudFoundedon,
					'tudAddress'=> $tudAddress,
					'tudLogoImage'=> $tudLogoImage,
					'tudMediaCoverageFiles'=> $tudMediaCoverageFiles,
					'tudEmployees'=> $tudEmployees,
					'tudFocusedOnProduct'=> $tudFocusedOnProduct,
					'tudUseofFundRepayment'=> $tudUseofFundRepayment,
				];	
			
				$this->db->insert('tempunicorndeals2',$post_data2);
				$id2=$this->db->insert_id();
				if($id2) 
				{
					$response = [
						'status' => '1',
						'message' => 'Details updated successfully.',
						'id' => $id2,
					];
				}
				else
				{
					$response = [
						'status' => '0',
						'message' => 'Please try again!',
						'id' => $id,
					];
				}
			
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
	// List Unicorn Deals founders

	 
	public function unicornListByFounders()
	{
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
			extract($formdata);
		// sql query
		$sql = "SELECT tempunicorndeals.*,tempunicorndeals2.*  FROM `tempunicorndeals` 
		LEFT JOIN tempunicorndeals2 on tempunicorndeals2.tudTempUdID = tempunicorndeals.tudTempUdID WHERE founderID='".$founderID."'
		ORDER BY tempunicorndeals.tudTempUdID DESC;";
		$query = $this->db->query($sql);
		$list = $query->result();
		for ($i = 0; $i < count($list); $i++) {
			 
			// get Published ID
			/*$sql2 = "SELECT * FROM `private_deal_invities` WHERE `deal_id`='$deal_id'";
			$query2 = $this->db->query($sql2);
			$data3=$query2->result();
			$num_rows = $query2->num_rows();
			if($list[$i] -> deal_type == "Private" || $list[$i] -> deal_type == "Public"){
				$list[$i]->total_invitions=$num_rows;
			}else{
				$list[$i]->total_invitions='0';
			}*/
			 
		}
		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'List fetched successfully.',
				'data' => $list,
			];
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	
	// Edit Unicorn temp table
	function editunicorndraft() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			// POst data for table 1
			extract($formdata);
			
			$post_data=[
		//		'submiited_by_founder_id'=>$founder_id,
		
			'tudStartupName' => $tudStartupName ,
			'tudEmail' => $tudEmail,
			'tudPrimaryContactName' => $tudPrimaryContactName,
			'tudCountryCode' => $tudCountryCode,
			'tudPrimaryContactMobile' => $tudPrimaryContactMobile,
			'tudPrimaryContactEmail' => $tudPrimaryContactEmail,
			'tudDisruptingMarket' => $tudDisruptingMarket,
			'tudTappingNew' => $tudTappingNew,
			'tudCustomerBenifit' => $tudCustomerBenifit,
			'tudSuppliersBenifit' => $tudSuppliersBenifit,
			'tudDirectSubstitueAvailable' => $tudDirectSubstitueAvailable,
			'tudIndirectSubstitueAvailable' => $tudIndirectSubstitueAvailable,
			'tudRiskPerceived' => $tudRiskPerceived,
			'tudRolesCoreTeam' => $tudRolesCoreTeam,
			'tudMoats' => $tudMoats,
			'tudScaleupChallenges' => $tudScaleupChallenges,
			'tudTrademark' => $tudTrademark,
			'tudPatents' => $tudPatents,
			'tudOtherIPs' => $tudOtherIPs,
			'tudOtherDetailsIPs' => $tudOtherDetailsIPs,
			'tudIPsRegistrationInfo' => $tudIPsRegistrationInfo,
			'tudAndroidMobileApp' => $tudAndroidMobileApp,
			'tudAndroidAppDetails' => $tudAndroidAppDetails,
			'tudIphoneMobileApp' => $tudIphoneMobileApp,
			'tudIphoneAppDetails' => $tudIphoneAppDetails,
			'tudIndustryClassification' => $tudIndustryClassification,
			'tudIndustryViews' => $tudIndustryViews,
			'tudIndustryMarketSize' => $tudIndustryMarketSize,
			'tudSupportingInfoMarketSize' => $tudSupportingInfoMarketSize,
			'tudAddressableMarketSize' => $tudAddressableMarketSize,
			'tudSupportingInfoAddressableMarketSize' => $tudSupportingInfoAddressableMarketSize ,
			'tudLocalDirectComp' => $tudLocalDirectComp,
			'tudLocalIndirectComp' => $tudLocalIndirectComp,
			'tudGlobalDirectComp' => $tudGlobalDirectComp,
			'tudGlobalIndirectComp' => $tudGlobalIndirectComp,
			'tudDiffCompetion' => $tudDiffCompetion,
			'tudWhyCompSame' => $tudWhyCompSame,
			'tudUnfairAdv' => $tudUnfairAdv,
			'tudLikeCompetion' => $tudLikeCompetion,
			'tudFailVenture' => $tudFailVenture,
			'tudFailureReason' => $tudFailureReason,
			'tudStrength' => $tudStrength,
			'tudWeakness' => $tudWeakness,
			'tudOpportunities' => $tudOpportunities,
			'tudThreats' => $tudThreats,
			'tudLeagalName' => $tudLeagalName,
			'tudWebsite' => $tudWebsite,
			'tudLegalCin' => $tudLegalCin,
			'tudLegalPan'  => $tudLegalPan,
			'tudLegalCountry' => $tudLegalCountry,
			'tudEstablishedDate' => $tudEstablishedDate,
			'tudActivityStartedDate' => $tudActivityStartedDate,
			'tudRegisteredOffice' => $tudRegisteredOffice,
			'tudCorporateOffice' => $tudCorporateOffice,
			'tudDirector1' => $tudDirector1,
			'tudDin1'  => $tudDin1,
			'tudDirector2'  => $tudDirector2,
			'tudDin2'  => $tudDin2,
			'tudDirector3'  => $tudDirector3,
			'tudDin3'  => $tudDin3,
			'tudDirector4'  => $tudDirector4,
			'tudDin4'  => $tudDin4,
			'tudSocialInsta'  => $tudSocialInsta,
			'tudSocialFacebook'  => $tudSocialFacebook,
			'tudSocialLinkedIn'  => $tudSocialLinkedIn,
			'tudSocialYouTube'  => $tudSocialYouTube,
			'tudSocialOthers'  => $tudSocialOthers,
			'tudGtmStratergy' => $tudGtmStratergy,
			'tudGtmBackup' => $tudGtmBackup,
			'tudExistingCac'  => $tudExistingCac,
			'tudExpectedCac'  => $tudExpectedCac,
			'tudLogicCac'  => $tudLogicCac,
			'tudLtvCustomer'  => $tudLtvCustomer,
			'tudLogicLtvNumber'  => $tudLogicLtvNumber,
			'tudLtvCacRatio'  => $tudLtvCacRatio,
			'tudNumberofClients' => $tudNumberofClients,
			'tudClientRetentions' => $tudClientRetentions,
			'tudRevenueTop10' => $tudRevenueTop10,
			'tudUnitEconomics' => $tudUnitEconomics,
			'tudTotalCapEx' => $tudTotalCapEx,
			'tudAmountSpentProdDev' => $tudAmountSpentProdDev,
			'tudMajorExpInv' => $tudMajorExpInv,
			'tudAuthorisedCap'  => $tudAuthorisedCap,
			'tudPaidupCapi'  => $tudPaidupCapi,
			'tudFounderPer'  => $tudFounderPer,
			'tudCorePer'  => $tudCorePer,
			'tudEsopPer'  => $tudEsopPer,
			'tudOtherPer' => $tudOtherPer,
			'tudAmountByFounder'  => $tudAmountByFounder,
			'tudUnsecLoanFounder' => $tudUnsecLoanFounder,
			'tudUnsecLoanOthers' => $tudUnsecLoanOthers,
			'tudOtherLoan' => $tudOtherLoan,
			'tudFounderSalary'  => $tudFounderSalary,
			'tudFounderSalaryPlan' => $tudFounderSalaryPlan,
			'tudCoreTeamSalary'  => $tudCoreTeamSalary,
			'tudTotalSalary'  => $tudTotalSalary,
			'tudPreviousFundRaised' => $tudPreviousFundRaised,
			'tudFundRequired' => $tudFundRequired,
			'tudExpRunway' => $tudExpRunway,
			'tudValueFundRaise' => $tudValueFundRaise,
			'tudLogicFundRaise' => $tudLogicFundRaise,
			'tudOpentoLower' => $tudOpentoLower,
			'tudCapexImmidate' => $tudCapexImmidate,
			'tudCapexFuture' => $tudCapexFuture,
			'tudProductFund'  => $tudProductFund,
			'tudMarketingFund'  => $tudMarketingFund,
			'tudSalaryFund'  => $tudSalaryFund,
			'tudCastComFund'  => $tudCastComFund,
			'tudOthersFund'  => $tudOthersFund,
			'tudRepaymentFund'  => $tudRepaymentFund,
			'tudGstRegistered' => $tudGstRegistered,
			'tudGstDetails' => $tudGstDetails,
			'tudAuditedBL' => $tudAuditedBL,
			'tudItrFilling' => $tudItrFilling,
			'tudAgm' => $tudAgm,
			'tudPendingRoc' => $tudPendingRoc,
			'tudPastDelays' => $tudPastDelays,
			'tudOtherApplicableCompliance'=> $tudOtherApplicableCompliance ,
			'tudCaInfo'  => $tudCaInfo,
			'tudCsInfo'  => $tudCsInfo,
			'tudOtherLegalInfo'  => $tudOtherLegalInfo,
			'tudAcceptedDate'  => $tudAcceptedDate,
			'tudPublishedDate' => $tudPublishedDate,
			'tudExpiryDate' => $tudExpiryDate,
			'founderID' => $founderID, 
			'tudDeclare' => $tudDeclare,

			];		
			
			//$tudTempUdID
			$this -> db -> where("tudTempUdID",$tudTempUdID);
			$status = $this -> db -> update("tempunicorndeals",$post_data);

			//if($status)
			 
			if($status) {

				$post_data2=[
					 
					'tudSaleExitInfo'  => $tudSaleExitInfo,
					'tudDepedencyPerson'  => $tudDepedencyPerson,
					'tudReglarityIssue'  => $tudReglarityIssue,
					'tudLicPermissionStatus'  => $tudLicPermissionStatus,
					'tudTeamSize'  => $tudTeamSize,
					'tud5perCommission'  => $tud5perCommission,
					'tud10perCommission'  => $tud10perCommission,
					'tudExitTimeline'  => $tudExitTimeline,
					'tudSubsidiries'  => $tudSubsidiries,
					'tudSisterConcerns'  => $tudSisterConcerns,
					'tudRelatedPartyTrans'  => $tudRelatedPartyTrans,
					'tudLegalRisk'  => $tudLegalRisk,
					'tudFounderExitEarlier'  => $tudFounderExitEarlier,
					'tudDemoLink'  => $tudDemoLink,
					'tudOtherDocsLinks'  => $tudOtherDocsLinks,
					'tudMediaCoverLinks'  => $tudMediaCoverLinks,
					'tudAwards'  => $tudAwards,
					'tudStartupRecon'  => $tudStartupRecon,
					'tudOtherInfo'  => $tudOtherInfo,
					'tudCustomerRef'  => $tudCustomerRef,
					'tudVendorRef'  => $tudVendorRef,
					'tudPastEmployerRef'  => $tudPastEmployerRef,
					'tudGuideRef'  => $tudGuideRef,
					'tudPitchDeck'  => $tudPitchDeck,
					'tudProductDeck'  => $tudProductDeck,
					'tudDoc1'  => $tudDoc1,
					'tudDoc2'  => $tudDoc2,
					'tudDoc3'   => $tudDoc3,
					'tudStartupFounderName'=> $tudStartupFounderName,
					'tudStartupFounderMobileNumber'=> $tudStartupFounderMobileNumber,
					'tudStartupFounderEmail'=> $tudStartupFounderEmail,
					'tudDealShowDateForRegularMember'=> $tudDealShowDateForRegularMember,
					'tudDealShowDateForPremiumMember'=> $tudDealShowDateForPremiumMember,
					'tudDealStartDateForRegularMember'=> $tudDealStartDateForRegularMember,
					'tudDealStartDateForPremiumMember'=> $tudDealStartDateForPremiumMember,
					'tudDealEndDateForRegularMember'=> $tudDealEndDateForRegularMember,
					'tudDealEndDateForPremiumMember'=> $tudDealEndDateForPremiumMember,
					'tudTargetAmount'=> $tudTargetAmount,
					'tudMinInvestmentAmount'=> $tudMinInvestmentAmount,
					'tudCAPTableThresholdAmount'=> $tudCAPTableThresholdAmount,
					'tudMaxInvestmentAmount'=> $tudMaxInvestmentAmount,
					'tudCAPTableMultiple'=> $tudCAPTableMultiple,
					'tudMultiplesOf'=> $tudMultiplesOf,
					'tudRaiseGap'=> $tudRaiseGap,
					'tudEnableSpecialOffer'=> $tudEnableSpecialOffer,
					'tudSpecialOfferText'=> $tudSpecialOfferText,
					'tudInputDefaultText'=> $tudInputDefaultText,
					'tudDiscount'=> $tudDiscount,
					'tudEscrowAccountName'=> $tudEscrowAccountName,
					'tudEscrowAccountNumber'=> $tudEscrowAccountNumber,
					'tudEscrowAccountBank'=> $tudEscrowAccountBank,
					'tudEscrowAccountBranch'=> $tudEscrowAccountBranch,
					'tudEscrowAccountIFSC'=> $tudEscrowAccountIFSC,
					'tudDigioTemplateId'=> $tudDigioTemplateId,
					'tudDigioSignforInvestor'=> $tudDigioSignforInvestor,
					'tudDigioSignforFounder'=> $tudDigioSignforFounder,
					'tudDealDescription'=> $tudDealDescription,
					'tudBackedBy'=> $tudBackedBy,
					'tudYoutubeLink'=> $tudYoutubeLink,
					'tudCategory'=> $tudCategory,
					'tudBannerImage'=> $tudBannerImage,
					'tudSelectLogo'=> $tudSelectLogo,
					'tudPageLink'=> $tudPageLink,
					'tudVendorId'=> $tudVendorId,
					'tudStartupHighlights'=> $tudStartupHighlights,
					'tudMediaCoverages'=> $tudMediaCoverages,
					'tudMark'=> $tudMark,
					'tudValuation'=> $tudValuation,
					'tudLegalname'=> $tudLegalname,
					'tudFoundedon'=> $tudFoundedon,
					'tudAddress'=> $tudAddress,
					'tudLogoImage'=> $tudLogoImage,
					'tudMediaCoverageFiles'=> $tudMediaCoverageFiles,
					'tudEmployees'=> $tudEmployees,
					'tudFocusedOnProduct'=> $tudFocusedOnProduct,
					'tudUseofFundRepayment'=> $tudUseofFundRepayment,
					'tpage4NA' => $tpage4NA,
					'tpage9NA' => $tpage9NA,
					'tpage10NA' => $tpage10NA,
					'tpage13NA' => $tpage13NA,
					'tpage17NA' => $tpage17NA,
					'tudTag' => $tudTag,
					'tudSponsorName' => $tudSponsorName,
					'tudSponsorImage' => $tudSponsorImage
				];	
				$this -> db -> where("tudTempUdID",$tudTempUdID);
				$status2 = $this -> db -> update("tempunicorndeals2",$post_data2);
				//$this->db->insert('tempunicorndeals2',$post_data2);
				//$id2=$this->db->insert_id();
				if($status2) 
				{
					$response = [
						'status' => '1',
						'message' => 'Details updated successfully.',
						//'id' => $id2,
					];
				}
				else
				{
					$response = [
						'status' => '0',
						'message' => 'Please try again!',
						//'id' => $id,
					];
				}
			
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
	// Publish unicorn
	function publishunicorndeal() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			// POst data for table 1
			extract($formdata);
			/* Steps
			1) Decide by selecting tempID from Published table that its create OR UPDATE and set flag accodingly
			2) based on temp unicorn ID select from temp table1 
			3) Set Post array for master unicorn table 1
			4) update/insert in master unicorn table and get ID of the master table 1
			5) based on temp unicorn ID select from temp table2 
			6) Set Post array for master unicorn table 2
			7) update/insert in master unicorn table and get ID of the master table 2
			 */

			

			$isNew= true;	


			// check if user has any left_edit if left_edit is not > 0 return error to user and if user has edit left, at the end we will reduce it by 1
			$this->db->select('left_edit, unicorn_end_date');
			$this->db->from('users');
			$this->db->where('investor_id', $founderID);
			$query = $this->db->get();
			$userData = $query->row();
			$currentDate = date('Y-m-d H:i:s');
			if ($userData->left_edit <= 0) {
				$response = [
					'status' => '0',
					'message' => "You don't have a valid plan",
				];
			}
			else if ($userData->unicorn_end_date < $currentDate){
				$response = [
					'status' => '0',
					'message' => "You don't have a valid plan",
				];
			}
			else{
				$unicornDealID = 0;
			//Step1
			$listArr = $this -> db -> select("unicornDealID") -> from("unicorndeals") -> where("udFounderID",$founderID) -> where("tudTempUdID",$tudTempUdID) -> get() -> result_array();
			if (!empty($listArr)) {
				$isNew=false;
				$unicornDealID = $listArr[0]["unicornDealID"];
			}
			//Step2 & Step3
			
			$tempunicornArr = $this -> db -> select("tempunicorndeals.*") -> from("tempunicorndeals") -> where("tempunicorndeals.tudTempUdID",$tudTempUdID) -> get() -> result_array();
			$mainunicornArr=array();
			foreach($tempunicornArr[0] as $Key => $Value)
			{
				//echo $Key;
				if($Key == "tudTempUdID")
				{
					$mainunicornArr[$Key] = $Value;
				}
				elseif($Key == "founderID")
				{
					$mainunicornArr["udFounderID"] = $Value;
				}
				else
				{
					$nKeyName = substr($Key, 1);
					$mainunicornArr[$nKeyName] = $Value;
				}

				
			}
			//Step 4

			if($isNew)
			{
				$this->db->insert('unicorndeals',$mainunicornArr);
				$unicornDealID=$this->db->insert_id();
			}
			else
			{
				$this -> db -> where("tudTempUdID",$tudTempUdID);
				$status = $this -> db -> update("unicorndeals",$mainunicornArr);
			}
			//echo $unicornDealID."<BR>".@$status;

			if($unicornDealID>0)
			{
				// Step 5 & 6
				$processDone=false;
				$tempunicorn2Arr = $this -> db -> select("tempunicorndeals2.*") -> from("tempunicorndeals2") -> where("tempunicorndeals2.tudTempUdID",$tudTempUdID) -> get() -> result_array();
				$mainunicorn2Arr=array();
				foreach($tempunicorn2Arr[0] as $Key => $Value)
				{
					//echo $Key;
					if($Key!= "tudTempUdID2")
					{
						if($Key == "tudTempUdID")
						{
							$mainunicorn2Arr["unicornDealID"] = $unicornDealID;
						}
						
						else
						{
							$nKeyName = substr($Key, 1);
							$mainunicorn2Arr[$nKeyName] = $Value;
						}
					}
				}
				//Step 7
				if($isNew)
				{
					$this->db->insert('unicorndeals2',$mainunicorn2Arr);
					$unicornDealID2=$this->db->insert_id();
					if($unicornDealID2>0)
						$processDone=true;
				}
				else
				{
					$this -> db -> where("unicornDealID",$unicornDealID);
					$status = $this -> db -> update("unicorndeals2",$mainunicorn2Arr);
					if($status)
						$processDone=true;
				}
				
				if($processDone)
				{
					// update left_edit value and set it to the current value -1 in users table
					$this->db->where('investor_id', $founderID);
					$this->db->set('left_edit', 'left_edit - 1', FALSE); // FALSE to prevent escaping
					$this->db->update('users');


					$response = [
						'status' => '1',
						'message' => 'Details updated successfully.',
						'id' => $unicornDealID,
					];

				}
				else
				{
					$response = [
						'status' => '0',
						'message' => 'Please check data.',
						'id' => @$unicornDealID,
					];

				}

			}
			else
			{
				$response = [
					'status' => '0',
					'message' => 'Please try again.',
					'id' => 0,
				];

			}

			}
				
			




			
			
			 
			
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
				'id' => 0,
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
	// Unicorn deals for Investors
	function unicorndealsByInvestors() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			// POst data for table 1
			extract($formdata);
			/* Steps
			Assume that form data have keys to filter so build SQL String

			 */
			$whereClause= " 1 = 1 ";
			foreach($formdata as $Key => $Value)
			{
				if($Key!="page" && $Key!="pagesize" )
				{
					if($Key=="udPublished")
					{
						$whereClause.= " AND ".$Key." = '".$Value."' ";
					}
					else
					{
					$whereClause.= " AND ".$Key." LIKE '%".$Value."%' ";
					}
				}
				
			}

			
			//Step1
			$sql= <<<EOT
			SELECT unicorndeals.*, unicorndeals2.* , users.unicorn_start_date, users.unicorn_end_date, users.left_edit, users.unicorn_plan, users.utrref, users.unicorn_gst, unicorn_gst_registered_address
			FROM unicorndeals 
			LEFT JOIN unicorndeals2 on unicorndeals.unicornDealID = unicorndeals2.unicornDealID
			LEFT JOIN users on unicorndeals.udFounderID = users.investor_id
			WHERE $whereClause
			EOT;
			$query = $this->db->query($sql);
			//echo $sql;die;
			$list = $query->result();
			$response = [
				'status' => '1',
				'message'=> 'Data found.',
				'data'=>$list,
			];
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	// Unicorn deals for Investors
	function getAllUnicorns() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			// POst data for table 1
			extract($formdata);
			/* Steps
			Assume that form data have keys to filter so build SQL String

			 */
			$whereClause= " 1 = 1 ";
			foreach($formdata as $Key => $Value)
			{
				if($Key!="page" && $Key!="pagesize" )
				{
					if($Key=="udPublished")
					{
						$whereClause.= " AND ".$Key." = '".$Value."' ";
					}
					else
					{
					$whereClause.= " AND ".$Key." LIKE '%".$Value."%' ";
					}
				}
				
			}
			
			//Step1
			$sql= <<<EOT
			SELECT tempunicorndeals.*,tempunicorndeals2.*, ud.udPublished as mainPublished
			FROM tempunicorndeals 
			LEFT JOIN tempunicorndeals2 on tempunicorndeals.tudTempUdID = tempunicorndeals2.tudTempUdID 
			LEFT JOIN unicorndeals ud ON tempunicorndeals.tudTempUdID = ud.unicornDealID 
			WHERE $whereClause
			EOT;
			
			$query = $this->db->query($sql);
			//echo $sql;die;
			$list = $query->result();
			$response = [
				'status' => '1',
				'message'=> 'Data found.',
				'data'=>$list,
			];
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function getUnicornPayment() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$sql = <<<EOT
			SELECT u.*, 
			CASE 
				WHEN ud.udFounderId IS NOT NULL THEN 'Published' 
				WHEN tud.founderID IS NOT NULL THEN 'Draft' 
				ELSE 'Not started' 
			END AS unicorn_form_status 
			FROM users u 
			LEFT JOIN unicorndeals ud ON u.investor_id = ud.udFounderId 
			LEFT JOIN tempunicorndeals tud ON u.investor_id = tud.founderID 
			WHERE u.unicorn_plan IS NOT NULL
			EOT;

		$query = $this->db->query($sql);
		$list = $query->result();
		$response = [
			'status' => '1',
			'message' => 'Data found.',
			'data' => $list,
		];
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function uploadunicornFiles()
	{
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($_POST)) {
			$id = $this->input->post('tudTempUdID');
			$image_details = array();
			if ($id) {
				// logo
				if (isset($_FILES['tudPitchDeck']['name']) && $_FILES['tudPitchDeck']['name'] != "") {
					$dir = FCPATH . "uploads/unicorndeals/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['tudPitchDeck']['tmp_name'];
					$temp = explode(".", $_FILES["tudPitchDeck"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['tudPitchDeck']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details["tudPitchDeck"] = $newfilename;
						
						
					}
				}
				// logo
				if (isset($_FILES['tudDoc1']['name']) && $_FILES['tudDoc1']['name'] != "") {
					$dir = FCPATH . "uploads/unicorndeals/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['tudDoc1']['tmp_name'];
					$temp = explode(".", $_FILES["tudDoc1"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['tudDoc1']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details["tudDoc1"] = $newfilename;
						 
					}
				}
				// banner
				if (isset($_FILES['tudDoc2']['name']) && $_FILES['tudDoc2']['name'] != "") {
					$dir = FCPATH . "uploads/unicorndeals/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['tudDoc2']['tmp_name'];
					$temp = explode(".", $_FILES["tudDoc2"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['tudDoc2']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details["tudDoc2"] = $newfilename;
						 
					}
				}

				// pdf
				if (isset($_FILES['tudDoc3']['name']) && $_FILES['tudDoc3']['name'] != "") {
					$dir = FCPATH . "uploads/unicorndeals/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['tudDoc3']['tmp_name'];
					$temp = explode(".", $_FILES["tudDoc3"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['tudDoc3']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details["tudDoc3"] = $newfilename;
						 
					}
				}

				$response = [
					'status' => '1',
					'message' => 'Image is uploaded successfully.',
					'data'=> $image_details
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	function uploadFiles()
	{
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($_POST)) {
			$id = $this->input->post('tudTempUdID');
			$image_details = array();
			if ($id) {
				// logo
				if (isset($_FILES['upfile']['name']) && $_FILES['upfile']['name'] != "") {
					$dir = FCPATH . "uploads/unicorndeals/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['upfile']['tmp_name'];
					$temp = explode(".", $_FILES["upfile"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['upfile']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details["upfile"] = $newfilename;
						
						
					}
				}
				

				$response = [
					'status' => '1',
					'message' => 'Image is uploaded successfully.',
					'data'=> $image_details
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	// I am interested
	function add_unicorn_interest() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		//echo $formdata;	
		//extract($formdata);
		if(!empty($formdata['unicornDealID']) && !empty($formdata['udFounderID']) && !empty($formdata['investor_id'])) {
			//Validate uniqueness of investor and deal

			$unicornDealID=$formdata['unicornDealID'];
			$sql="SELECT  * FROM `unicorninterest` WHERE unicornDealID='".$unicornDealID."' AND investor_id='".$formdata['investor_id']."'";
			$query=$this->db->query($sql);
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0)
			{
				$response = [
					'status' => '0',
					'message' => 'You already have shown interest to this Startup.',
					'id' => 0,
				];
			}
			else
				{
				//$unicornDealID=$formdata['unicornDealID'];
				$post_data=[
					'unicornDealID'=>$formdata['unicornDealID'],
					'udFounderID'=>$formdata['udFounderID'],
					'investor_id'=>$formdata['investor_id'],
					'interestKnowMore'=>$formdata['interestKnowMore'],
					'interestWorkwithYou'=>$formdata['interestWorkwithYou'],
					'interestInvestinStartup'=>$formdata['interestInvestinStartup'],
					'interestMessage'=> isset($formdata['interestMessage']) ? $formdata['interestMessage'] : '',
				];
				$this->db->insert('unicorninterest', $post_data);
				$id=$this->db->insert_id();
				
				if($id) {
					$response = [
						'status' => '1',
						'message' => 'Details are updated successfully.',
						'id' => $id,
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}
	// List of I am interested
	function unicorn_interested_list() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			// POst data for table 1
			extract($formdata);
			/* Steps
			Assume that form data have keys to filter so build SQL String

			 */
			$whereClause= " 1 = 1 ";
			foreach($formdata as $Key => $Value)
			{
				if($Key!="page" && $Key!="pagesize" && $Key!="udFounderID" && $Key!="investor_id")
				{
					$whereClause.= " AND ".$Key." LIKE '%".$Value."%' ";
				}
				if($Key=="udFounderID")
				{
					$whereClause.= " AND unicorninterest.udFounderID LIKE '%".$Value."%' ";
				}
				if($Key=="investor_id")
				{
					$whereClause.= " AND unicorninterest.investor_id LIKE '%".$Value."%' ";
				}
			}

			
			//Step1
			$sql= "SELECT unicorninterest.*,unicorndeals.udStartupName,unicorndeals.udPrimaryContactName, Investors.first_name,Investors.middle_name,Investors.last_name, Investors.email, Investors.mobile FROM `unicorninterest` 
			LEFT JOIN unicorndeals on unicorndeals.unicornDealID = unicorninterest.unicornDealID
			LEFT JOIN users as Investors ON Investors.investor_id = unicorninterest.investor_id WHERE ".$whereClause;	
			$query = $this->db->query($sql);
			$list = $query->result();
			$response = [
				'status' => '1',
				'message'=> 'Data found.',
				'data'=>$list,
			];
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	// List of I am interested
	function unicorn_Publish_unpublish() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			// POst data for table 1
			extract($formdata);
			$unicornDealID =$formdata['unicornDealID'];
			$udPublished=$formdata['udPublished'];
			$post_data=[
				'udPublished'=>$formdata['udPublished'],
				
			];
			$this->db->where('unicornDealID', $unicornDealID);
			$id = $this->db->update('unicorndeals', $post_data);
			$response = [
				'status' => '1',
				'message' => 'Deal '.$udPublished.' successfully.',
				'id' => $id,
			];
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function get_founder_detail_for_unicorn() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		// Add logic to get founder id from formdata and get that details from db and return as response
		if(!empty($formdata)) {
			// POst data for table 1
			
			$sql= "SELECT * FROM `users` WHERE investor_id='".$formdata['founder_id']."'";
			$query = $this->db->query($sql);
			$list = $query->result();
			$response = [
				'status' => '1',
				'message'=> 'Data found.',
				'data'=>$list,
			];
		} else {
			$response = [
				'status' => '0',
				'message'=> 'No data found.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function get_payment_link() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		// Add logic to get founder id from formdata and get that details from db and return as response
		if(!empty($formdata)) {
			// POst data for table 1

			$founder_id=$formdata['founder_id'];
			$plan_name=$formdata['plan_name'];
			$is_upgrade = isset($formdata['is_upgrade']) ? $formdata['is_upgrade'] : false;
		
			$plans = [
				'Silver' => [
					'price' => 3000,
					'editLeft' => 2
				],
				'Gold' => [
					'price' => 10000,
					'editLeft' => 12
				],
				'Platinum' => [
					'price' => 25000,
					'editLeft' => 999
				],
				'AdditionalEdit' => [
					'price' => 1500,
					'editLeft' => 1
				]
			];

			$amount = $plans[$plan_name]['price'];

			if ($is_upgrade) {
				// First get current subscription details if it's an upgrade
				$current_user = $this->db
					->select('unicorn_plan, unicorn_start_date, left_edit')
					->where('investor_id', $founder_id)
					->get('users')
					->row();

				if ($current_user && $current_user->unicorn_plan && $current_user->unicorn_start_date) {
					$start_date = new DateTime($current_user->unicorn_start_date);
					$current_date = new DateTime();
					
					// Calculate the year and month difference
					$year_diff = $current_date->format('Y') - $start_date->format('Y');
					$month_diff = $current_date->format('n') - $start_date->format('n');
					
					// Calculate base months between dates
					$months_used = ($year_diff * 12) + $month_diff;
					
					// Adjust for incomplete month
					if ($current_date->format('j') < $start_date->format('j')) {
						$months_used -= 1;
					}
	
					// Calculate monthly rate for current plan
					$current_plan_price = $plans[$current_user->unicorn_plan]['price'];
					$current_plan_monthly_rate = $current_plan_price / 12;
					
					// Calculate remaining months
					$remaining_months = 12 - $months_used;
	
					// Calculate refund amount for unused months
					$refund_amount = $current_plan_monthly_rate * $remaining_months;
	
					// Calculate final upgrade price
					$amount = max(0, $plans[$plan_name]['price'] - $refund_amount);
				}
			}

			// Generate unique link ID
			$link_id = $is_upgrade ? 
            "upgrade_{$founder_id}_{$plan_name}_" . time() : 
            "{$founder_id}_{$plan_name}_" . time();
			

			$curl = curl_init();

			// Get current time and add 10 minutes
			$expiryTime = date('Y-m-d\TH:i:sP', strtotime('+10 minutes'));

			$roundAmount = round($amount);
			$gstTwice = ceil($roundAmount * 0.09) * 2;
			$finalAmount = $roundAmount + $gstTwice;

			// Prepare the request payload
			$payload = [
				'customer_details' => [
					'customer_phone' => '1111111111'
				],
				'link_amount' => $finalAmount, // Using the amount variable
				'link_auto_reminders' => true,
				'link_currency' => 'INR',
				'link_expiry_time' => $expiryTime,
				'link_id' => $link_id,
				'link_meta' => [
					'notify_url' => CASHFREE_RESPONSE_DOMAIN_URL.'/api/founder/Startup/handle_payment_link',
					'return_url' => CASHFREE_RESPONSE_DOMAIN_URL.'/MyUnicornPlan',
					'upi_intent' => false
				],
				'link_notify' => [
					'send_email' => false,
					'send_sms' => false
				],
				'link_purpose' => 'Growth91',
			];

			curl_setopt_array($curl, [
				CURLOPT_URL => CASHFREE_BASE_URL,
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => "",
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 30,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => "POST",
				CURLOPT_POSTFIELDS => json_encode($payload),
				CURLOPT_HTTPHEADER => [
					"Content-Type: application/json",
					"x-api-version: 2023-08-01",
					"x-client-id: ".CASHFREE_CLIENT_ID,
					"x-client-secret: ".CASHFREE_CLIENT_SECRET
				],
			]);


			$response = curl_exec($curl);
			$err = curl_error($curl);
			$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

			curl_close($curl);

			if ($err) {
				$response = [
					'status' => '0',
					'message'=> 'Something went wrong. Please try again later.',
					'error_details' => $err
				];
			} else {
				$decoded_response = json_decode($response, true);
				if ($http_code >= 200 && $http_code < 300) {
					$response = [
						'status' => '1', // Changed to '1' for success
						'message' => 'Payment link created successfully',
						'data' => $decoded_response
					];
				} else {
					$response = [
						'status' => '0',
						'message' => 'API error: ' . ($decoded_response['message'] ?? 'Unknown error'),
						'http_code' => $http_code,
						'error_details' => $decoded_response
					];
				}
				// $response = [
				// 	'status' => '0',
				// 	'data'=> $response,
				// ];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Something went wrong. Please try again later.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function update_unicorn_plan_by_admin() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if (!empty($formdata)) {
			extract($formdata);
			$post_data = [
				'unicorn_plan' => $planName,
				'unicorn_start_date' => $startDate,
				'unicorn_end_date' => $endDate,
				'left_edit' => $leftEdit,
				'utrref' => $utrref,
				'unicorn_gst' => $unicorn_gst,
				'unicorn_gst_registered_address' => $registered_address
			];
			$this->db->where('investor_id', $founder_id);
			$id = $this->db->update('users', $post_data);
			$response = [
				'status' => '1',
				'message' => 'Plan updated successfully.',
			];
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function update_unicorn_gst() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if (!empty($formdata)) {
			extract($formdata);
			$post_data = [
				'unicorn_gst' => $unicorn_gst,
				'unicorn_gst_registered_address' => $registered_address
			];
			$this->db->where('investor_id', $founder_id);
			$id = $this->db->update('users', $post_data);
			$response = [
				'status' => '1',
				'message' => 'Plan updated successfully.',
			];
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function handle_payment_link() {
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		$type=$formdata['type'];

		if($type=='PAYMENT_LINK_EVENT'){
			$link_id = $formdata['data']['link_id'];
			$status = $formdata['data']['link_status'];

			if($status != "PAID"){
				return;
			}

			// Parse link_id to get founder_id and plan_name
			$link_parts = explode('_', $link_id);
			$is_upgrade = ($link_parts[0] === 'upgrade');

			$index_offset = $is_upgrade ? 1 : 0;
			$founderId = explode('_', $link_id)[$index_offset];
			$planName = explode('_', $link_id)[$index_offset + 1];

			// Define plan editLeft values
			$plans = [
				'Silver' => 2,
				'Gold' => 12,
				'Platinum' => 999,
				'AdditionalEdit' => 1
			];

			if($planName=='AdditionalEdit'){
				$post_data=[
					'left_edit'=>1
				];
				$this->db->where('investor_id', $founderId);
				$this->db->update('users', $post_data);
			}

			else{
				if ($is_upgrade) {
					$current_user = $this->db
						->select('unicorn_plan, left_edit')
						->where('investor_id', $founderId)
						->get('users')
						->row();

					if ($current_user->unicorn_plan === $planName) {
						// Skip processing as it's the same plan
						return;
					}
					$new_edit_left = $current_user->left_edit + $plans[$planName];
				} else {
					// For new subscriptions, just use the plan's edit count
					$new_edit_left = $plans[$planName];
				}

				$planStartDate=date('Y-m-d');
				$planEndDate=date('Y-m-d', strtotime('+1 year'));

				// Update users table with plan name start and end date
				$post_data=[
					'unicorn_plan'=>$planName,
					'unicorn_start_date'=>$planStartDate,
					'unicorn_end_date'=>$planEndDate,
					// set if silver then 2, if gold then 10 else 999
					'left_edit'=> $new_edit_left
				];
				$this->db->where('investor_id', $founderId);
				$this->db->update('users', $post_data);
			}
		}
		
	}
}