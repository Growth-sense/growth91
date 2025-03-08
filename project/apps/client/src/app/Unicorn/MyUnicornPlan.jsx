import React, { useEffect, useState } from "react";
import { NewWebFooter } from "../common/NewWebFooter";
import $ from "jquery";
import { Link } from "react-router-dom";
import Bridge from "../constants/Bridge.js";
import { Spin } from "antd";
import Header from "../common/Header.js";
import Sidebar from "../Founder/common/Sidebar.js";
import { format } from 'date-fns';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';

export const MyUnicornPlan = () => {
  const styles = {
    mainContainer: {
      background: "#f8fafc",
      minHeight: "100vh"
    },
    contentSection: {
      padding: "2rem"
    },
    planDashboard: {
      background: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      padding: "2rem"
    },
    dashboardHeader: {
      textAlign: "center",
      marginBottom: "3rem"
    },
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem"
    },
    headerUnderline: {
      width: "60px",
      height: "4px",
      background: "linear-gradient(90deg, #6366f1, #4f46e5)",
      margin: "0 auto",
      borderRadius: "2px"
    },
    activePlanContainer: {
      padding: "1rem"
    },
    planInfoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.5rem",
      marginTop: "1rem"
    },
    planInfoCard: {
      background: "#f8fafc",
      borderRadius: "12px",
      padding: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },
    cardIcon: {
      width: "48px",
      height: "48px",
      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "1.25rem"
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem"
    },
    cardLabel: {
      color: "#64748b",
      fontSize: "0.875rem",
      fontWeight: "500"
    },
    cardValue: {
      color: "#1e293b",
      fontSize: "1.125rem",
      fontWeight: "600"
    },
    dateContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    calendarIcon: {
      fontSize: "16px",
      color: "#6366f1",
      marginRight: "4px"
    },
    dateValue: {
      display: "flex",
      alignItems: "center",
      color: "#1e293b",
      fontSize: "1.125rem",
      fontWeight: "600"
    },
    noPlanContainer: {
      minHeight: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    noPlanContent: {
      textAlign: "center",
      maxWidth: "400px",
      margin: "0 auto"
    },
    emptyStateIcon: {
      width: "80px",
      height: "80px",
      background: "#f1f5f9",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem",
      fontSize: "2rem",
      color: "#64748b"
    },
    noPlanTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem"
    },
    noPlanText: {
      color: "#64748b",
      marginBottom: "2rem"
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.875rem 1.75rem",
      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
      color: "white",
      borderRadius: "8px",
      fontWeight: "500",
      textDecoration: "none",
      transition: "all 0.3s ease",
      border: "none",
      cursor: "pointer"
    },
    daysRemaining: {
      fontSize: '0.75rem',
      fontWeight: '500',
      padding: '2px 8px',
      borderRadius: '4px',
      display: 'inline-block'
    },
    daysRemainingWarning: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444'
    },
    daysRemainingHealthy: {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      color: '#10b981'
    }
  };

  useEffect(() => {
    unicorndetails();
    window.scrollTo(0, 0);
  }, []);

  const [founderDetails, setFounderDetails] = useState();
  const [loading, setloading] = useState(false);

  const unicorndetails = async () => {
    setloading(true);
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    try {
      const result = await Bridge.Unicorn.get_founder_detail_for_unicorn(params);
      setFounderDetails(result.data[0]);
    } catch (error) {
      console.error("Error fetching unicorn details:", error);
    } finally {
      setloading(false);
    }
  };

  // Function to check if plan is active and not expired
  const isPlanActive = () => {
    if (!founderDetails?.unicorn_end_date) return false;
    
    const endDate = new Date(founderDetails.unicorn_end_date);
    const currentDate = new Date();
    
    return endDate > currentDate;
  };

  // Function to get days remaining
  const getDaysRemaining = () => {
    const endDate = new Date(founderDetails.unicorn_end_date);
    const currentDate = new Date();
    const diffTime = endDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // PlanInfoCard component
  const PlanInfoCard = ({ icon, label, value, isDate = false }) => (
    <div 
      style={styles.planInfoCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={styles.cardIcon}>{icon}</div>
      <div style={styles.cardContent}>
        <span style={styles.cardLabel}>{label}</span>
        {isDate ? (
          <div style={styles.dateValue}>
            <CalendarOutlined style={styles.calendarIcon} />
            {value}
          </div>
        ) : (
          <span style={styles.cardValue}>{value}</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Spin spinning={loading}>
        <div style={styles.mainContainer}>
          <Header />
          <section></section>

          <div className="row">
            <div
              className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <Sidebar />
            </div>
            <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none">
              <Sidebar />
            </div>

            <div style={styles.contentSection} className="col col-lg-16 pb-4">
              <div style={styles.planDashboard}>
                <div style={styles.dashboardHeader}>
                  <h1 style={styles.headerTitle}>My Unicorn Plan</h1>
                  <div style={styles.headerUnderline}></div>
                </div>

                {founderDetails?.unicorn_end_date && isPlanActive() ? (
                  <div style={styles.activePlanContainer}>
                    <div style={styles.planInfoGrid}>
                      <PlanInfoCard
                        icon={<CalendarOutlined />}
                        label="Plan Start Date"
                        value={format(new Date(founderDetails.unicorn_start_date), 'dd MMM yyyy')}
                        isDate={true}
                      />
                      <PlanInfoCard
                        icon={<CalendarOutlined />}
                        label="Plan End Date"
                        value={
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span>{format(new Date(founderDetails.unicorn_end_date), 'dd MMM yyyy')}</span>
                          </div>
                        }
                        isDate={true}
                      />
                      <PlanInfoCard
                        icon={<EditOutlined />}
                        label="Remaining Edits"
                        value={founderDetails.left_edit}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={styles.noPlanContainer}>
                    <div style={styles.noPlanContent}>
                      <h2 style={styles.noPlanTitle}>
                        {founderDetails?.unicorn_end_date ? 'Plan Expired' : 'No Active Plan'}
                      </h2>
                      <p style={styles.noPlanText}>
                        {founderDetails?.unicorn_end_date 
                          ? 'Your unicorn plan has expired. Please renew to continue accessing the features.'
                          : "You currently don't have any active unicorn plan."}
                      </p>
                      <Link 
                        to="ViewUnicornPlan" 
                        style={{
                          ...styles.ctaButton,
                          background: founderDetails?.unicorn_end_date 
                            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                            : 'linear-gradient(135deg, #6366f1, #4f46e5)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = founderDetails?.unicorn_end_date 
                            ? "0 4px 12px rgba(239, 68, 68, 0.3)"
                            : "0 4px 12px rgba(99, 102, 241, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <i className={founderDetails?.unicorn_end_date ? "fas fa-sync" : "fas fa-arrow-right"}></i>
                        {founderDetails?.unicorn_end_date ? 'Renew Plan' : 'View Available Plans'}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Spin>
      <NewWebFooter />
    </>
  );
};

export default MyUnicornPlan;
