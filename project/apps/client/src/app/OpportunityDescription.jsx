import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NewWebFooter } from "./common/NewWebFooter";
import NewWebHeader from "./common/NewWebHeader.jsx";
import Bridge from "./constants/Bridge.js";
import { message, Spin, Typography, Modal, Radio, Input, Checkbox, Button } from "antd";
import { ArrowLeftOutlined, GlobalOutlined, LinkedinOutlined, LinkOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const OpportunityDescription = () => {
  const { id } = useParams();
  const history = useHistory();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Interest Modal State
  const [isInterestModalVisible, setIsInterestModalVisible] = useState(false);
  const [interestType, setInterestType] = useState('securities');
  const [interestValue, setInterestValue] = useState('');
  const [declarationsAccepted, setDeclarationsAccepted] = useState(false);
  const [declarationsModalVisible, setDeclarationsModalVisible] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleInterestSubmit = () => {
    if (!interestValue || interestValue.trim() === '') {
      message.error(`Please provide your ${interestType === 'securities' ? 'Number of Securities' : 'Investment Amount'}.`);
      return;
    }
    if (!declarationsAccepted) {
      message.error('Please accept the Buyer Declarations to proceed.');
      return;
    }
    
    const investorId = window.localStorage.getItem("investor_id") || window.localStorage.getItem("founder_id");
    if (!investorId) {
      message.error("Please login to submit your interest.");
      return;
    }

    const payload = {
      opportunityId: opportunity.id,
      investorId: investorId,
      interestType: interestType,
      interestValue: interestValue
    };

    setLoading(true);
    Bridge.submitOpportunityInterest(payload)
      .then((res) => {
        setLoading(false);
        if (String(res.status) === "1") {
          message.success("Interest submitted successfully! We will contact you soon.");
          setIsInterestModalVisible(false);
          setInterestValue('');
          setDeclarationsAccepted(false);
          setAlreadySubmitted(true);
          setSubmissionStatus("Under Review");
        } else {
          message.error(res.message || "Failed to submit interest.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        message.error("Error submitting interest.");
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDetails();
  }, [id]);

  const fetchDetails = () => {
    setLoading(true);
    Bridge.getPublicOpportunityDetails({ id })
      .then((res) => {
        if (res.status == 1) {
          setOpportunity(res.data);
          
          // Check if user already submitted interest
          const investorId = window.localStorage.getItem("investor_id") || window.localStorage.getItem("founder_id");
          if (investorId && res.data.id) {
            Bridge.checkUserInterest({ opportunityId: res.data.id, investorId })
              .then(checkRes => {
                if (checkRes.data && checkRes.data.submitted) {
                  setAlreadySubmitted(true);
                  setSubmissionStatus(checkRes.data.status);
                }
              });
          }
        } else {
          message.error("Opportunity not found.");
          history.push("/secondary-opportunities");
        }
        setLoading(false);
      })
        .catch((err) => {
          console.error(err);
          message.error("Opportunity not found or currently disabled.");
          history.push("/secondary-opportunities");
          setLoading(false);
        });
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: '#fff' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!opportunity) return null;

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          .campaign-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px 80px 20px;
          }

          .back-nav {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #666;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 30px;
            font-size: 14px;
            transition: color 0.2s;
          }
          .back-nav:hover {
            color: #100050;
          }

          /* Top Campaign Split */
          .hero-split {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 50px;
            align-items: start;
            margin-bottom: 60px;
          }

          /* Left Hero Image Area */
          .hero-image-box {
            background-color: #f8f9fc;
            border: 1px solid #eaeaea;
            border-radius: 12px;
            height: 480px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            position: relative;
            overflow: hidden;
          }
          .hero-image-box img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            mix-blend-mode: multiply; /* Removes white background from logos if background is light grey */
          }

          /* Right Hero Content Area */
          .hero-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-top: 10px;
          }

          .startup-title {
            font-size: 42px;
            font-weight: 800;
            color: #100050;
            margin: 0 0 10px 0;
            line-height: 1.1;
            letter-spacing: -0.5px;
          }
          
          .startup-sector {
            font-size: 18px;
            color: #666;
            font-weight: 500;
            margin-bottom: 30px;
          }

          .stats-box {
            display: flex;
            background: #f8f9fc;
            border: 1px solid #eaeaea;
            border-radius: 12px;
            margin: 25px 0 35px 0;
            padding: 25px;
            align-items: center;
          }

          .stat-divider {
            width: 1px;
            background-color: #ddd;
            height: 40px;
          }

          /* Card Styling */
          .media-card {
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            width: 100%;
            border: 1px solid #eaeaea;
          }
          
          .media-card-image {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            object-fit: contain;
            object-position: center;
            display: block;
            border-bottom: 1px solid #eee;
            padding: 10px;
            background: #f8f9fc;
          }
            
          .media-card-content {
            padding: 20px;
            flex-grow: 1;
          }
          
          .media-card-content h5 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
          }

          .media-card-content p {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
          }
          
          .read-more-link {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            margin-top: 10px;
          }
          
          .read-more-link:hover {
            text-decoration: underline;
          }

          .stat-item {
            flex: 1;
          }

          .stat-label {
            font-size: 13px;
            color: #666;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }

          .stat-value {
            font-size: 24px;
            font-weight: 800;
            color: #100050;
            line-height: 1.2;
          }

          .stat-value.primary {
            color: #ff6b00;
            font-size: 28px;
          }

          .invest-btn {
            background-color: #100050;
            color: #fff;
            border: none;
            width: 100%;
            height: 60px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(16,0,80,0.15);
          }
          .invest-btn:hover {
            background-color: #0c003e;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16,0,80,0.25);
          }

          .social-row {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          .social-link {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            color: #100050;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            transition: color 0.2s;
            padding-bottom: 12px;
            border-bottom: 1px solid #f4f5f7;
            line-height: 1.4;
          }
          .social-link:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .social-link:hover {
            color: #ff6b00;
          }

          /* Content Split Below */
          .content-split {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 60px;
            align-items: start;
          }

          .section-block {
            margin-bottom: 50px;
          }
          .section-header {
            font-size: 24px;
            font-weight: 800;
            color: #100050;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f4f5f7;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .section-body {
            font-size: 17px;
            line-height: 1.8;
            color: #444;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-wrap: break-word;
            word-break: break-word;
          }

          /* Sidebar Cards */
          .sidebar-card {
            background: #fff;
            border: 1px solid #eaeaea;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
            margin-bottom: 30px;
          }
          .sidebar-title {
            font-size: 18px;
            font-weight: 700;
            color: #111;
            margin-bottom: 20px;
          }

          .news-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .news-list li {
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f4f5f7;
          }
          .news-list li:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }
          .news-link {
            color: #0d6efd;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            line-height: 1.5;
          }
          .news-link:hover {
            text-decoration: underline;
          }

          .disclaimer-text {
            background-color: #fdfaf0;
            border-left: 4px solid #ffcc00;
            padding: 15px;
            color: #8a6d3b;
            font-size: 13px;
            line-height: 1.6;
            margin-top: 20px;
            border-radius: 0 4px 4px 0;
          }

          @media (max-width: 991px) {
            .hero-split, .content-split {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .hero-image-box {
              height: 350px;
            }
          }
          @media (max-width: 768px) {
            .sector-separator {
              display: none;
            }
            .stage-block {
              display: block;
              margin-top: 5px;
            }
          }
        `}
      </style>

      <div className="campaign-container">
        
        <div className="back-nav" onClick={() => history.push("/secondary-opportunities")}>
          <ArrowLeftOutlined /> Back to Opportunities
        </div>

        {/* 1. Hero Campaign Section */}
        <div className="hero-split">
          
          {/* Huge Image Box */}
          <div className="hero-image-box" style={{ borderRadius: "15px", border: "1px solid #ddd", overflow: 'hidden' }}>
            {opportunity.startupLogo ? (
              <img 
                src={`${process.env.REACT_APP_BASE_URL}api/uploads/opportunities/${opportunity.startupLogo}`} 
                alt="Startup Logo" 
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  boxShadow: "0px 3px 6px #000"
                }}
              />
            ) : (
              <span style={{ color: '#ccc', fontSize: '20px', fontWeight: 600 }}>No Logo Provided</span>
            )}
          </div>

          {/* Key Deal Terms & CTA */}
          <div className="hero-content">
            <h1 className="startup-title">{opportunity.startupName}</h1>
            <div className="startup-sector">
              Sector: {opportunity.sector || "N/A"} 
              <span className="sector-separator">&nbsp;|&nbsp;</span> 
              <span className="stage-block">Stage: {opportunity.stage || "N/A"}</span>
            </div>

            <div className="stats-box">
              <div className="stat-item">
                <div className="stat-label">Indicative Price Range</div>
                <div className="stat-value primary">{opportunity.indicativePriceRange || "TBD"}</div>
              </div>

              <div className="stat-item">
                <div className="stat-label">Instrument Type</div>
                <div className="stat-value">{opportunity.instrumentType || "N/A"}</div>
              </div>
            </div>

            <button 
              className="invest-btn"
              onClick={() => setIsInterestModalVisible(true)}
              disabled={alreadySubmitted}
              style={alreadySubmitted ? { backgroundColor: '#6c757d', cursor: 'not-allowed' } : {}}
            >
              {alreadySubmitted ? `Interest Submitted (${submissionStatus})` : "Express Interest"}
            </button>

            <div className="disclaimer-text">
              <strong>Disclaimer:</strong> Indicative pricing is for informational purposes only and does not constitute a binding offer,
              valuation, recommendation, or investment advice.
            </div>

          </div>
        </div>

        {/* 2. Content Sections Below */}
        <div className="content-split">
          
          {/* Main Story (Left) */}
          <div>
            <div className="section-block">
              <div className="section-header">
                <InfoCircleOutlined /> About the Company
              </div>
              <div className="section-body">
                {opportunity.startupDescription || "No detailed description available at this time."}
              </div>
            </div>

            <div className="section-block">
              <div className="section-header">
                <UserOutlined /> Founder Information
              </div>
              <div className="section-body" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {opportunity.founderImage && (
                  <img 
                    src={`${process.env.REACT_APP_BASE_URL}api/uploads/opportunities/${opportunity.founderImage}`} 
                    alt="Founder" 
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      objectFit: 'cover', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
                      flexShrink: 0 
                    }}
                  />
                )}
                <div style={{ flex: '1 1 300px' }}>
                  {opportunity.founderInformation || "No founder information available."}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Updates (Right) */}
          <div>
            <div className="sidebar-card">
              <div className="sidebar-title">Social Media Links</div>
              <div className="social-row">
                {opportunity.website && (
                  <a href={opportunity.website} target="_blank" rel="noreferrer" className="social-link">
                    <GlobalOutlined style={{ marginTop: '2px' }} /> Website
                  </a>
                )}
                {opportunity.linkedIn && (
                  <a href={opportunity.linkedIn} target="_blank" rel="noreferrer" className="social-link">
                    <LinkedinOutlined style={{ marginTop: '2px' }} /> LinkedIn
                  </a>
                )}
                {opportunity.socialMediaLinks && opportunity.socialMediaLinks.length > 0 && opportunity.socialMediaLinks.map((link, idx) => {
                  if(!link || link.trim() === '') return null;
                  return (
                    <a key={idx} href={link} target="_blank" rel="noreferrer" className="social-link">
                      <LinkOutlined style={{ marginTop: '3px', color: '#888', flexShrink: 0 }} />
                      <span style={{ wordBreak: 'break-all' }}>{link}</span>
                    </a>
                  )
                })}
                {!opportunity.website && !opportunity.linkedIn && (!opportunity.socialMediaLinks || opportunity.socialMediaLinks.length === 0 || opportunity.socialMediaLinks.every(l => !l || l.trim() === '')) && (
                   <Text type="secondary">No social media links available.</Text>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Media Coverage Section */}
        {opportunity.newsArticles && opportunity.newsArticles.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#100050' }}>Public News</h2>
            <div className="row">
              {opportunity.newsArticles.map((article, index) => (
                <div
                  className="col-md-4 mb-4"
                  style={{ display: "flex" }}
                  key={index}
                >
                  <div className="media-card">
                    {article.imgname && (
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}api/uploads/opportunities/${article.imgname}`}
                        alt={article.title}
                        className="media-card-image"
                      />
                    )}
                    <div className="media-card-content">
                      <h5>{article.title || 'Untitled Article'}</h5>
                      {article.description && (
                        <p>
                          {article.description}
                        </p>
                      )}
                      {article.url && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noreferrer"
                          className="read-more-link"
                        >
                          Read More <i className="fa-solid fa-arrow-right ms-1" style={{ fontSize: '12px' }}></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <Modal
        title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#100050' }}>Interest Information</span>}
        visible={isInterestModalVisible}
        onCancel={() => setIsInterestModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setIsInterestModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            style={{ backgroundColor: '#100050', borderColor: '#100050' }}
            disabled={!declarationsAccepted || !interestValue}
            onClick={handleInterestSubmit}
          >
            Submit Interest
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 600, marginBottom: '10px' }}>Please specify your interest:</p>
          <Radio.Group 
            onChange={(e) => {
              setInterestType(e.target.value);
              setInterestValue('');
            }} 
            value={interestType}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <Radio value="securities">Number of Securities Interested</Radio>
            <Radio value="amount">Approximate Investment Amount</Radio>
          </Radio.Group>
          
          <div style={{ marginTop: '15px' }}>
            <Input 
              type="number"
              placeholder={interestType === 'securities' ? "Enter number of securities" : "Enter approximate amount (₹)"}
              value={interestValue}
              onChange={(e) => setInterestValue(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Checkbox 
            checked={declarationsAccepted} 
            onChange={(e) => setDeclarationsAccepted(e.target.checked)}
            style={{ fontWeight: 500 }}
          >
            I have read and agree to the <a onClick={(e) => { e.preventDefault(); setDeclarationsModalVisible(true); }} style={{ color: '#0d6efd' }}>Buyer Declarations</a>
          </Checkbox>
        </div>
      </Modal>

      <Modal
        title={<span style={{ fontSize: '18px', fontWeight: 'bold', color: '#100050' }}>Buyer Declarations</span>}
        visible={declarationsModalVisible}
        width={800}
        onCancel={() => setDeclarationsModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setDeclarationsModalVisible(false)} style={{ backgroundColor: '#100050', borderColor: '#100050' }}>
            Close
          </Button>
        ]}
      >
        <div className="declaration-list" style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #dee2e6" }}>
          <ul style={{ paddingLeft: "20px", marginLeft: "20px", marginBottom: "0", fontSize: "15px", lineHeight: "1.6", color: "#333" }}>
            <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I confirm that I am legally eligible to acquire securities of private companies under applicable laws. Specifically for this company, I am not restricted to acquire shares.</li>
            <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I understand that acquisition of private company securities may be subject to company approvals, transfer restrictions, regulatory requirements, and contractual obligations.</li>
            <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I agree to provide all KYC, AML, FEMA, taxation, and compliance-related documents as may be required.</li>
            <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I understand that submission of interest does not guarantee allotment or transfer of securities.</li>
            <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I agree to pay applicable fees, charges, and taxes communicated by Growth91.</li>
            <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I acknowledge that Growth91 acts solely as a facilitation platform and does not guarantee investment returns, liquidity, or transaction completion.</li>
            <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "0" }}>I agree to maintain confidentiality of all non-public information shared during the process.</li>
          </ul>
        </div>
      </Modal>

      <NewWebFooter />
    </div>
  );
};

export default OpportunityDescription;
