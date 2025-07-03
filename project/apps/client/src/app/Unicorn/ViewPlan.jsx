import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewWebFooter } from "../common/NewWebFooter";
import $ from "jquery";
import Bridge from "../constants/Bridge.js";
import { Spin, Card, Button, Modal, Input, message, Checkbox } from "antd";
import Header from "../common/Header.js";
import { 
  CheckOutlined, 
  InfoCircleOutlined} from '@ant-design/icons';


export const ViewPlan = (props) => {
  const { planName } = useParams();

  useEffect(() => {
    unicorndetails();
    window.scrollTo(0, 0);
  }, [planName]);

  
  const [loading, setloading] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const [planStartDate, setPlanStartDate] = useState(null);
  const [planEndDate, setPlanEndDate] = useState(null);
  const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
  const [isBankDetailsModalVisible, setIsBankDetailsModalVisible] = useState(false);
  const [isGSTModalVisible, setIsGSTModalVisible] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Silver",
      edits: "2",
      originalPrice: "₹6,000",
      price: "₹3,000",
      priceId: "3000",
      originalPriceId: "6000",
      features: ["2 edits per year", "1 year validity"],
    },
    {
      name: "Gold",
      edits: "12",
      originalPrice: "₹20,000",
      price: "₹10,000",
      priceId: "10000",
      originalPriceId: "20000",
      features: ["12 edits per year", "1 year validity"],
    },
    {
      name: "Platinum",
      edits: "Unlimited",
      originalPrice: "₹50,000",
      price: "₹25,000",
      priceId: "25000",
      originalPriceId: "50000",
      features: ["Unlimited edits", "1 year validity"],
    },
  ];

  const unicorndetails = async () => {
    setloading(true);
    let params = {
      founder_id: localStorage.getItem("founder_id"),
    };
    
    try {
      const result = await Bridge.Unicorn.get_founder_detail_for_unicorn(params);
      setActivePlan(result.data[0].unicorn_plan);
      setPlanStartDate(result.data[0].unicorn_start_date);
      setPlanEndDate(result.data[0].unicorn_end_date);
      
      // Auto-prefill logic
      if (result.data[0].unicorn_gst) {
        setGstNumber(result.data[0].unicorn_gst);
      }
      if (result.data[0].unicorn_gst_registered_address) {
        setRegisteredAddress(result.data[0].unicorn_gst_registered_address);
      }
      if (result.data[0].unicorn_gst_name) {
        setBusinessName(result.data[0].unicorn_gst_name);
      } else {
        // Try to prefill from Future Unicorn Form data or founder registration
        await prefillFormData(result.data[0]);
      }
      
      if(planName == "AdditionalEdit"){
        getPaymentLink(planName);
      }
    } catch (error) {
      console.error("Error fetching unicorn details:", error);
    } finally {
      setloading(false);
    }
  };

  const prefillFormData = async (founderData) => {
    try {
      const unicornParams = {
        founderID: localStorage.getItem("founder_id"),
      };
      
      const unicornResult = await Bridge.Unicorn.unicornListByFounders(unicornParams);
      if (unicornResult && unicornResult.data && unicornResult.data.length > 0) {
        const unicornData = unicornResult.data[0];
        
        // Prefill Company Legal Name from Future Unicorn Form
        if (unicornData.tudLegalname && !businessName) {
          setBusinessName(unicornData.tudLegalname);
        }
        
        // Prefill Registered Address from Future Unicorn Form
        if (unicornData.tudAddress && !registeredAddress) {
          setRegisteredAddress(unicornData.tudAddress);
        }
      } else {
        // If no Future Unicorn Form data, try founder registration data
        // Prefill company name from founder registration if available
        if (founderData.startup_name && !businessName) {
          setBusinessName(founderData.startup_name);
        } 
      }
    } catch (error) {
      console.error("Error prefilling form data:", error);
    }
  };

  const getPaymentLink = async (planName) => {
    setSelectedPlan(planName);
    setIsGSTModalVisible(true);
  };
  
  const proceedToPayment = async (planName) => {
    let params = {
      founder_id: localStorage.getItem("founder_id"),
      plan_name: planName || selectedPlan,
      is_upgrade: planName || selectedPlan != "AdditionalEdit" && !!activePlan
    };
    Bridge.Unicorn.get_payment_link(params).then((result) => {
      window.location.assign(result.data.link_url);
    });
  };
  
  const saveGSTNumber = async () => {
    if (gstNumber && gstNumber.trim()) {
      setloading(true);
      let params = {
        founder_id: localStorage.getItem("founder_id"),
        unicorn_gst: gstNumber,
        registered_address: registeredAddress,
        business_name: businessName
      };
      
      try {
        await Bridge.Unicorn.save_gst_number(params);
        message.success("GST information saved successfully");
        setIsGSTModalVisible(false);
        proceedToPayment();
      } catch (error) {
        message.error("Failed to save GST information");
        console.error("Error saving GST information:", error);
      } finally {
        setloading(false);
      }
    } else {
      message.warning("Please enter a valid GST number");
    }
  };

  const renderActionButton = (plan) => {
    const canUpgrade = 
      (!activePlan) || 
      (activePlan === "Silver" && (plan.name === "Gold" || plan.name === "Platinum")) ||
      (activePlan === "Gold" && plan.name === "Platinum");
  
    const isActive = activePlan === plan.name;
    const upgradedPrice = calculateUpgradedPrice(plan);
  
    if (isActive) {
      return (
        <Button
          type="default"
          size="large"
          disabled
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "16px",
          }}
        >
          Current Active Plan
        </Button>
      );
    }
  
    if (!canUpgrade) {
      return (
        <Button
          type="default"
          size="large"
          disabled
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "16px",
          }}
        >
          Not Available
        </Button>
      );
    }
  
    return (
      <Button
        type="primary"
        size="large"
        style={{
          width: "100%",
          height: "48px",
          borderRadius: "16px",
          border: "none",
          background:
            plan.name === "Platinum"
              ? "linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)"
              : plan.name === "Gold"
              ? "linear-gradient(135deg, #ff9800 0%, #ff7300 100%)"
              : "linear-gradient(135deg, #64748b 0%, #475569 100%)",
          fontSize: "16px",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => {
          getPaymentLink(plan.name);
        }}
      >
        {activePlan ? `Upgrade to ${plan.name} (₹${upgradedPrice})` : `Get Started as ${plan.name}`}
      </Button>
    );
  };

  const calculateUpgradedPrice = (targetPlan) => {
    if (!activePlan || !planStartDate) return targetPlan.priceId;
  
    const startDate = new Date(planStartDate);
    const currentDate = new Date();
    
    // Calculate complete months between dates
    const monthsUsed = (
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth())
    );
  
    // Find current plan details
    const currentPlanDetails = plans.find(p => p.name === activePlan);
    if (!currentPlanDetails) return targetPlan.priceId;
  
    // Calculate monthly rate for current plan
    const currentPlanMonthlyRate = currentPlanDetails.priceId / 12;
    
    // Calculate remaining months (including current incomplete month)
    const remainingMonths = 12 - monthsUsed;
  
    // Calculate refund amount for unused months
    const refundAmount = currentPlanMonthlyRate * remainingMonths;
  
    // Calculate final upgrade price
    const upgradedPrice = targetPlan.priceId - refundAmount;
  
    return Math.max(0, Math.round(upgradedPrice));
  };

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $("body").addClass("newClass");
    } else {
      $("body").removeClass("newClass");
    }
  });

  return (
    <>
      <Spin spinning={loading}>
        <div
          style={{
            background: "linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!props.hideHeader && <Header />}

          {/* Modern Pricing Section */}
          <section
            className="pricing-section"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              padding: "40px 0",
            }}
          >
            <div className="container">
              <div className="text-center mb-5">
                <h5
                  style={{
                    color: "#5469d4",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: "14px",
                    marginBottom: "16px",
                  }}
                >
                  Pricing Plans
                </h5>
                <h2
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#1a1f36",
                    marginBottom: "16px",
                  }}
                >
                  Choose the Perfect Plan
                </h2>
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "18px",
                    maxWidth: "600px",
                    margin: "0 auto",
                  }}
                >
                  Select a plan that best suits your needs.
                </p>
              </div>

              <div className="row justify-content-center">
                {plans.map((plan, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <Card
                      hoverable
                      className="text-center h-100"
                      style={{
                        borderRadius: "24px",
                        border: "none",
                        background:
                          plan.name === "Gold"
                            ? "linear-gradient(135deg, #ffffff 0%, #fff6e6 100%)"
                            : "#ffffff",
                        boxShadow:
                          plan.name === "Gold"
                            ? "0 20px 40px rgba(255, 164, 28, 0.1)"
                            : "0 20px 40px rgba(0, 0, 0, 0.05)",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {plan.name === "Gold" && (
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            background: "#ffb020",
                            color: "white",
                            padding: "4px 12px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          POPULAR
                        </div>
                      )}

                      <div style={{ padding: "32px" }}>
                        <h3
                          style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            color:
                              plan.name === "Platinum"
                                ? "#9333ea"
                                : plan.name === "Gold"
                                ? "#ff9800"
                                : "#64748b",
                            marginBottom: "24px",
                          }}
                        >
                          {plan.name}
                        </h3>

                        <div
                          style={{
                            background:
                              plan.name === "Gold"
                                ? "rgba(255, 164, 28, 0.1)"
                                : "rgba(100, 116, 139, 0.05)",
                            borderRadius: "16px",
                            padding: "24px",
                            marginBottom: "24px",
                            position: "relative",
                            textAlign: "center",
                          }}
                        >
                          {/* Discount Tag */}
                          <div
                            style={{
                              position: "absolute",
                              top: "-10px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              background: "#ff4444",
                              color: "white",
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "14px",
                              fontWeight: "600",
                              boxShadow: "0 2px 4px rgba(255, 68, 68, 0.2)",
                              zIndex: "1",
                            }}
                          >
                            50% OFF
                          </div>

                          {/* Original Price */}
                          <div
                            style={{
                              fontSize: "24px",
                              color: "#64748b",
                              textDecoration: "line-through",
                              marginBottom: "8px",
                              opacity: "0.7",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "16px",
                                marginRight: "4px",
                                textDecoration: "none",
                              }}
                            >
                              ₹
                            </span>
                            {plan.originalPriceId.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                          </div>

                          {/* Final Price */}
                          <div
                            style={{
                              fontSize: "42px",
                              fontWeight: "700",
                              color: "#1a1f36",
                              marginBottom: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "24px",
                                marginRight: "4px",
                                fontWeight: "600",
                              }}
                            >
                              ₹
                            </span>
                            {plan.priceId.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </div>

                          {/* Per Year Text */}
                          <div
                            style={{
                              color: "#64748b",
                              fontSize: "14px",
                              marginTop: "4px",
                            }}
                          >
                            + GST
                          </div>

                          {/* Save Amount */}
                          <div
                            style={{
                              marginTop: "12px",
                              fontSize: "14px",
                              color: "#22c55e",
                              fontWeight: "500",
                            }}
                          >
                            Save ₹
                            {(
                              plan.originalPriceId - plan.priceId
                            ).toLocaleString("en-IN")}
                          </div>
                        </div>

                        <div
                          className="features"
                          style={{
                            marginBottom: "32px",
                            flexDirection: "column",
                          }}
                        >
                          {plan.features.map((feature, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "12px",
                                color: "#4a5568",
                              }}
                            >
                              <CheckOutlined
                                style={{
                                  marginRight: "8px",
                                  color:
                                    plan.name === "Gold"
                                      ? "#ff9800"
                                      : "#5469d4",
                                }}
                              />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {renderActionButton(plan)}

                        {/* <Button
                          type="primary"
                          size="large"
                          style={{
                            width: "100%",
                            height: "48px",
                            borderRadius: "16px",
                            border: "none",
                            background:
                              plan.name === "Platinum"
                                ? "linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)"
                                : plan.name === "Gold"
                                ? "linear-gradient(135deg, #ff9800 0%, #ff7300 100%)"
                                : "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                            fontSize: "16px",
                            fontWeight: "600",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                          onClick={() => {
                            getPaymentLink(plan.name);
                          }}
                        >
                          Get Started as {plan.name}
                        </Button> */}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Offline Payment Option */}
              <div className="text-center mt-5">
                <p
                  style={{
                    fontSize: "16px",
                    color: "#4a5568",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  Prefer Offline Payment? You can also pay via bank transfer.
                  <span
                    onClick={() => setIsBankDetailsModalVisible(true)}
                    style={{
                      color: "#5469d4",
                      cursor: "pointer",
                      fontWeight: "600",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    👉{" "}
                    <span
                      style={{ textDecoration: "underline", marginLeft: "4px" }}
                    >
                      Click here to view bank details
                    </span>
                  </span>
                </p>
              </div>

              {/* Additional Info Section */}
            </div>
          </section>
          <section
            className="pricing-section"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column", // Add this
              alignItems: "center",
              padding: "40px 0",
            }}
          >
            {/* Policy Link and Modal - Now properly positioned at bottom */}
            <div className="text-center mt-4" style={{ marginTop: "40px" }}>
              <Button
                type="link"
                onClick={() => setIsPolicyModalVisible(true)}
                style={{
                  fontSize: "14px",
                  color: "#5469d4",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <InfoCircleOutlined /> View Pricing Plans and Upgrade Policy
              </Button>

              <Modal
                title={null}
                open={isPolicyModalVisible}
                onCancel={() => setIsPolicyModalVisible(false)}
                footer={null}
                width={800}
                centered={true}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
                zIndex={1600}
                closable={false}
              >
                <div style={{ padding: 0 }}>
                  {/* Header */}
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg,rgb(197, 204, 239) 0%,rgb(156, 169, 230) 20%)",
                      padding: "32px 24px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        marginBottom: "8px",
                        color: "white",
                      }}
                    >
                      Future Unicorns – Pricing Plans & Upgrade Policy
                    </h2>
                    <p
                      style={{
                        opacity: 0.9,
                        fontSize: "14px",
                        margin: 0,
                      }}
                    >
                      Everything you need to know about our plans and policies
                    </p>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "32px" }}>
                    {/* Pricing Plans Section */}
                    <div style={{ marginBottom: "40px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#1a1f36",
                          marginBottom: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            background: "#5469d4",
                            color: "white",
                            width: "24px",
                            height: "24px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                          }}
                        >
                          1
                        </span>
                        Pricing Plans
                      </h3>
                      <div style={{ paddingLeft: "36px" }}>
                        <p style={{ color: "#4a5568", marginBottom: "16px" }}>
                          Future Unicorns offers three subscription plans for
                          founders to list their startups. Each plan includes a
                          one-year validity and a set number of allowed edits.
                        </p>
                        <div
                          style={{
                            background: "#f8fafc",
                            padding: "24px",
                            borderRadius: "12px",
                            marginBottom: "24px",
                          }}
                        >
                          <div style={{ marginBottom: "24px" }}>
                            <h4
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                marginBottom: "12px",
                                color: "#1a1f36",
                              }}
                            >
                              Silver Plan
                            </h4>
                            <p
                              style={{ margin: "0 0 8px 0", color: "#4a5568" }}
                            >
                              Price: ₹6,000 (Discounted Price: ₹3,000)
                            </p>
                            <ul
                              style={{
                                margin: "0",
                                paddingLeft: "20px",
                                color: "#4a5568",
                              }}
                            >
                              <li>Includes 2 edits</li>
                              <li>Validity: 1 year</li>
                            </ul>
                          </div>

                          <div style={{ marginBottom: "24px" }}>
                            <h4
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                marginBottom: "12px",
                                color: "#1a1f36",
                              }}
                            >
                              Gold Plan
                            </h4>
                            <p
                              style={{ margin: "0 0 8px 0", color: "#4a5568" }}
                            >
                              Price: ₹20,000 (Discounted Price: ₹10,000)
                            </p>
                            <ul
                              style={{
                                margin: "0",
                                paddingLeft: "20px",
                                color: "#4a5568",
                              }}
                            >
                              <li>Includes 12 edits</li>
                              <li>Validity: 1 year</li>
                            </ul>
                          </div>

                          <div>
                            <h4
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                marginBottom: "12px",
                                color: "#1a1f36",
                              }}
                            >
                              Platinum Plan
                            </h4>
                            <p
                              style={{ margin: "0 0 8px 0", color: "#4a5568" }}
                            >
                              Price: ₹50,000 (Discounted Price: ₹25,000)
                            </p>
                            <ul
                              style={{
                                margin: "0",
                                paddingLeft: "20px",
                                color: "#4a5568",
                              }}
                            >
                              <li>Unlimited edits</li>
                              <li>Validity: 1 year</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Edit Purchase Section */}
                    <div style={{ marginBottom: "40px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#1a1f36",
                          marginBottom: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            background: "#5469d4",
                            color: "white",
                            width: "24px",
                            height: "24px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                          }}
                        >
                          2
                        </span>
                        Additional Edit Purchase
                      </h3>
                      <div style={{ paddingLeft: "36px" }}>
                        <div
                          style={{
                            background: "#f8fafc",
                            padding: "24px",
                            borderRadius: "12px",
                          }}
                        >
                          <p style={{ margin: "0", color: "#4a5568" }}>
                            If a user exhausts their allotted edits, they can
                            purchase additional edits at ₹1,500 per edit.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Upgrade Policy Section */}
                    <div style={{ marginBottom: "40px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#1a1f36",
                          marginBottom: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            background: "#5469d4",
                            color: "white",
                            width: "24px",
                            height: "24px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                          }}
                        >
                          3
                        </span>
                        Plan Upgrade & Refund Policy
                      </h3>
                      <div style={{ paddingLeft: "36px" }}>
                        <div
                          style={{
                            background: "#f8fafc",
                            padding: "24px",
                            borderRadius: "12px",
                          }}
                        >
                          <p style={{ margin: "0 0 16px 0", color: "#4a5568" }}>
                            Users can upgrade their plan at any time, and the
                            amount payable for the new plan will be calculated
                            as:
                          </p>
                          <div
                            style={{
                              padding: "16px",
                              background: "white",
                              borderRadius: "8px",
                              marginBottom: "16px",
                              fontWeight: "500",
                              color: "#1a1f36",
                            }}
                          >
                            New Plan Price - Unused Amount of the Remaining
                            Months of the Current Plan
                          </div>
                          <ul
                            style={{
                              margin: "0",
                              paddingLeft: "20px",
                              color: "#4a5568",
                            }}
                          >
                            <li style={{ marginBottom: "8px" }}>
                              The unused amount is calculated as (Current Plan
                              Price ÷ 12) × Remaining Months rounded to higher
                              number
                            </li>
                            <li>
                              The new plan's validity will start from the
                              upgrade date and will be valid for 1 year
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div
                    style={{
                      borderTop: "1px solid #e5e7eb",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={() => setIsPolicyModalVisible(false)}
                      size="large"
                      style={{
                        paddingLeft: "24px",
                        paddingRight: "24px",
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Modal>

              {/* GST Collection Modal */}
              <Modal
                title="GST Information"
                open={isGSTModalVisible}
                onCancel={() => setIsGSTModalVisible(false)}
                footer={null}
                width={500}
                centered={true}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "20px 0" }}>
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "24px",
                      borderRadius: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        color: "#1a1f36",
                      }}
                    >
                      Enter your GST Number
                    </h4>

                    <p style={{ color: "#4a5568" }}>
                      Please provide your GST number for billing purposes.
                    </p>

                    <div style={{ marginBottom: "10px" }}>
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGstNumber("N/A");
                          } else {
                            setGstNumber("");
                          }
                        }}
                      />{" "}
                      &nbsp;No GST{" "}
                    </div>

                    <Input
                      placeholder="Enter GST Number"
                      value={gstNumber}
                      disabled={gstNumber == "N/A"}
                      onChange={(e) => setGstNumber(e.target.value)}
                      style={{ marginBottom: "16px" }}
                    />

                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        color: "#1a1f36",
                      }}
                    >
                      Registered Address
                    </h4>

                    <div style={{ marginBottom: "24px" }}>
                      <Input.TextArea
                        placeholder="Enter Registered Address"
                        value={registeredAddress}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 250) {
                            setRegisteredAddress(value);
                          }
                        }}
                        maxLength={250}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        style={{ marginBottom: "8px" }}
                      />
                      <div
                        style={{
                          textAlign: "right",
                          fontSize: "12px",
                          color:
                            registeredAddress.length >= 200
                              ? "#ff4d4f"
                              : "#8c8c8c",
                        }}
                      >
                        {registeredAddress.length} / 250 characters
                      </div>
                    </div>

                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        color: "#1a1f36",
                      }}
                    >
                      Name (As needed on the Invoice)
                    </h4>

                    <div style={{ marginBottom: "24px" }}>
                      <Input
                        placeholder="Enter Business Name"
                        value={businessName}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 250) {
                            setBusinessName(value);
                          }
                        }}
                        maxLength={250}
                        style={{ marginBottom: "8px" }}
                      />
                      <div
                        style={{
                          textAlign: "right",
                          fontSize: "12px"
                        }}
                      >
                        {businessName.length} / 250 characters
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => {
                          if(gstNumber == "" || registeredAddress == "" || businessName == ""){
                            message.error("Please enter GST number, registered address and Business name");
                          }
                          else{
                            saveGSTNumber()
                          }
                        }}
                        size="large"
                        loading={loading}
                      >
                        Save and Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>

              {/* Bank Details Modal */}
              <Modal
                title="Bank Details"
                open={isBankDetailsModalVisible}
                onCancel={() => setIsBankDetailsModalVisible(false)}
                footer={[
                  <Button
                    key="close"
                    onClick={() => setIsBankDetailsModalVisible(false)}
                    size="large"
                    style={{
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    Close
                  </Button>,
                ]}
                width={600}
                centered={true}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "20px 0" }}>
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "24px",
                      borderRadius: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        color: "#1a1f36",
                      }}
                    >
                      Bank Details:
                    </h4>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "160px",
                            fontWeight: "500",
                            color: "#64748b",
                          }}
                        >
                          Account Name:
                        </div>
                        <div style={{ fontWeight: "500", color: "#1e293b" }}>
                          Growth91 Advisors Private Limited
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "160px",
                            fontWeight: "500",
                            color: "#64748b",
                          }}
                        >
                          Account Number:
                        </div>
                        <div style={{ fontWeight: "500", color: "#1e293b" }}>
                          50200066360849
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "160px",
                            fontWeight: "500",
                            color: "#64748b",
                          }}
                        >
                          Bank:
                        </div>
                        <div style={{ fontWeight: "500", color: "#1e293b" }}>
                          HDFC Bank
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "160px",
                            fontWeight: "500",
                            color: "#64748b",
                          }}
                        >
                          Branch:
                        </div>
                        <div style={{ fontWeight: "500", color: "#1e293b" }}>
                          Akola, Maharashtra
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "160px",
                            fontWeight: "500",
                            color: "#64748b",
                          }}
                        >
                          IFSC Code:
                        </div>
                        <div style={{ fontWeight: "500", color: "#1e293b" }}>
                          HDFC0000221
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "160px",
                            fontWeight: "500",
                            color: "#64748b",
                          }}
                        >
                          Account Type:
                        </div>
                        <div style={{ fontWeight: "500", color: "#1e293b" }}>
                          Current Account
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      background: "#f0f9ff",
                      borderRadius: "8px",
                      borderLeft: "4px solid #0ea5e9",
                      color: "#0c4a6e",
                    }}
                  >
                    <p style={{ margin: "0", fontSize: "14px" }}>
                      Please mail us the Transaction Reference Number and
                      registered email address to{" "}
                      <strong>contact@growth91.com</strong>.
                    </p>
                  </div>
                </div>
              </Modal>
            </div>
          </section>
        </div>
      </Spin>
      {!props.hideHeader && <NewWebFooter />}
    </>
  );
};
