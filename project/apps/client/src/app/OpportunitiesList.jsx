import React, { useEffect, useState, useMemo } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import NewWebHeader from "./common/NewWebHeader.jsx";
import { Link, useHistory } from "react-router-dom";
import Bridge from "./constants/Bridge.js";
import { Button, Input, Modal, Form, message } from "antd";
const { TextArea } = Input;

export const OpportunitiesList = () => {
  const history = useHistory();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [form] = Form.useForm();

  const handleStartupRequest = (values) => {
    const userId = window.localStorage.getItem("investor_id") || window.localStorage.getItem("founder_id");
    const userType = window.localStorage.getItem("investor_id") ? "investor" : "founder";

    if (!userId) {
      message.error("Please login to submit a request.");
      return;
    }

    setRequestLoading(true);
    Bridge.submitStartupRequest({
      userId,
      userType,
      startupName: values.startupName,
      requirements: values.requirements,
      investmentAmount: values.investmentAmount
    })
    .then((res) => {
      setRequestLoading(false);
      if (res.status == 1) {
        message.success("Request submitted successfully! We will contact you soon.");
        setShowRequestModal(false);
        form.resetFields();
      } else {
        message.error(res.message || "Failed to submit request.");
      }
    })
    .catch((err) => {
      setRequestLoading(false);
      console.error(err);
      message.error("Error submitting request.");
    });
  };

  // Filters
  const [filters, setFilters] = useState({
    startupName: "",
    sector: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getOpportunities();
  }, []);

  const getOpportunities = () => {
    setLoading(true);
    Bridge.getPublicOpportunities({})
      .then((result) => {
        if (result.status == 1) {
          setOpportunities(result.data || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading opportunities", err);
        setLoading(false);
      });
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setFilters({ startupName: "", sector: "" });
    setShowFilterModal(false);
  };

  const filteredData = useMemo(() => {
    if (!opportunities) return [];

    let result = opportunities.filter((obj) => {
      const matchName = filters.startupName ? obj.startupName === filters.startupName : true;
      const matchSector = filters.sector ? obj.sector === filters.sector : true;
      return matchName && matchSector;
    });

    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(obj => 
        obj.startupName?.toLowerCase().includes(lowerQ)
      );
    }
    return result;
  }, [opportunities, filters, searchQuery]);

  // Unique lists for filters
  const uniqueStartupNames = [...new Set(opportunities.map(o => o.startupName).filter(Boolean))].sort();
  const uniqueSectors = [...new Set(opportunities.map(o => o.sector).filter(Boolean))].sort();

  return (
    <div>
      <div className="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>

      <style>
        {`
          /* Card banner image box */
          .img-community-box {
            width: 100%;
            height: 180px;                /* desktop default */
            overflow: hidden;
            position: relative;
            border-radius: 12px 12px 0 0;
            background: #ffffff;          /* neutral background for letterboxing */
            display: flex;
            align-items: center;          /* vertical center */
            justify-content: center;      /* horizontal center */
            padding: 0px !important;
          }

          /* Banner image: keep original aspect, never stretch (hardened) */
          .img-community-box > img {
            width: auto !important;        /* keep original aspect */
            height: auto !important;       /* keep original aspect */
            max-width: 100% !important;    /* scale down if wider than box */
            max-height: 100% !important;   /* scale down if taller than box */
            object-fit: initial !important; /* ignore any global cover/contain */
            display: block !important;      /* avoid inline gaps */
            flex: 0 0 auto !important;     /* do not stretch in flex context */
            image-rendering: auto !important;
          }

          .community-all-contents {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid #e5e7eb;
          }

          .card-container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 16px;
            box-sizing: border-box;
          }

          .cards-grid {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          @media (max-width: 1199px) { .cards-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
          @media (max-width: 991px) { .cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          @media (max-width: 575px) { .cards-grid { grid-template-columns: minmax(0, 1fr); } }

          /* Mobile heights to match other pages */
          @media (min-width: 576px) and (max-width: 767px) { .img-community-box { height: 200px; } }
          @media (max-width: 768px) { .img-community-box { height: 200px; } }
          @media (max-width: 480px) { .img-community-box { height: 200px; } }

          .search-bar-container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto 24px auto;
            padding: 0 16px;
          }

          .search-with-filter-row {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 12px;
            margin-bottom: 30px;
          }

          @media (max-width: 767px) {
            .search-with-filter-row {
              flex-direction: column;
              align-items: stretch;
            }
            .search-input-override {
              width: 100% !important;
            }
          }
        `}
      </style>

      <section className="community-sections" style={{ padding: "40px 0", minHeight: "60vh", backgroundColor: "#f9f9fc" }}>
        <div className="card-container">
          <div className="heading-title founder-text text-center mb-5">
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#100050' }}>Secondary Opportunities</h3>
            <p className="text-muted">Explore and express interest in secondary shares of leading startups.</p>
          </div>

          <div className="search-bar-container search-with-filter-row">
            <div 
              onClick={() => setShowFilterModal(true)} 
              style={{ cursor: "pointer", display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #d9d9d9' }}
            >
              <h5 className="m-0 me-2" style={{ fontSize: '16px' }}>Filters</h5>
              <i className="fa-solid fa-filter" style={{ color: '#100050' }}></i>
            </div>
            <Input
              className="search-input-override"
              placeholder="Search by opportunity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '60%', padding: '10px 15px', borderRadius: '8px' }}
            />
          </div>

          {/* Filter Modal */}
          <Modal
            visible={showFilterModal}
            onCancel={() => setShowFilterModal(false)}
            title="Filter Opportunities"
            footer={[
              <Button key="reset" onClick={resetFilters}>Reset</Button>,
              <Button key="submit" type="primary" onClick={handleApplyFilters}>Apply</Button>,
            ]}
          >
            <div className="mb-3">
              <label className="form-label">View by Opportunity Name:</label>
              <select
                value={filters.startupName}
                onChange={(e) => setFilters({ ...filters, startupName: e.target.value })}
                className="form-control"
              >
                <option value="">-- All Startups --</option>
                {uniqueStartupNames.map((name, i) => <option key={i} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">View by Sector:</label>
              <select
                value={filters.sector}
                onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
                className="form-control"
              >
                <option value="">-- All Sectors --</option>
                {uniqueSectors.map((sector, i) => <option key={i} value={sector}>{sector}</option>)}
              </select>
            </div>
          </Modal>

          <div className="cards-grid">
            {loading ? (
              <div className="col-12 text-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="grid-card-item"
                  onClick={() => history.push(`/secondary-opportunities/${item.customUrl || item.id}`)}
                >
                  <div
                    className="community-all-contents"
                    style={{ cursor: "pointer", position: 'relative' }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div className="img-community-box p-4" style={{ backgroundColor: '#fdfdfd', borderBottom: '1px solid #eee' }}>
                      {item.startupLogo ? (
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}api/uploads/opportunities/${item.startupLogo}`}
                          alt={item.startupName}
                        />
                      ) : (
                        <h3 style={{ color: '#ccc' }}>No Logo</h3>
                      )}
                    </div>
                    
                    <div className="p-4" style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 'bold', color: '#100050', marginBottom: '8px' }}>
                        {item.startupName}
                      </h4>
                      <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
                        <strong>Sector:</strong> {item.sector || 'N/A'}
                      </p>
                      <p
                        style={{
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          display: "-webkit-box",
                          color: '#444',
                          fontSize: '14px',
                          lineHeight: '1.5'
                        }}
                      >
                        {item.startupDescription || "No description available."}
                      </p>
                    </div>

                    <div className="p-3" style={{ borderTop: '1px solid #eee', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'center' }}>
                      <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>View Details <i className="fa-solid fa-arrow-right ms-2"></i></span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-4 w-100" style={{ gridColumn: '1 / -1' }}>
                <h4 style={{ color: '#888' }}>No opportunities found.</h4>
              </div>
            )}
          </div>

          {/* Startup Request CTA */}
          <div className="text-center mt-5 mb-3">
            <h5 style={{ color: '#444' }}>Didn't find the startup you were looking for?</h5>
            <Button 
              type="primary" 
              size="large"
              style={{ backgroundColor: '#100050', borderColor: '#100050', marginTop: '10px' }}
              onClick={() => setShowRequestModal(true)}
            >
              Request a Startup
            </Button>
          </div>
        </div>
      </section>

      {/* Request Modal */}
      <Modal
        title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#100050' }}>Request a Startup</span>}
        visible={showRequestModal}
        onCancel={() => setShowRequestModal(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleStartupRequest}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="startupName"
            label={<span style={{ fontWeight: 500 }}>Startup Name</span>}
            rules={[{ required: true, message: 'Please enter the startup name.' }]}
          >
            <Input size="large" placeholder="Enter the startup name you're looking for" />
          </Form.Item>
          
          <Form.Item
            name="requirements"
            label={<span style={{ fontWeight: 500 }}>Comments / Requirements</span>}
          >
            <TextArea rows={4} placeholder="Any specific requirements or comments?" />
          </Form.Item>
          
          <Form.Item
            name="investmentAmount"
            label={<span style={{ fontWeight: 500 }}>Intended Investment Amount (₹)</span>}
          >
            <Input size="large" type="number" placeholder="Enter approximate investment amount" />
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Button onClick={() => setShowRequestModal(false)} style={{ marginRight: '10px' }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={requestLoading} style={{ backgroundColor: '#100050', borderColor: '#100050' }}>
              Submit Request
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <NewWebFooter />
    </div>
  );
};

export default OpportunitiesList;
