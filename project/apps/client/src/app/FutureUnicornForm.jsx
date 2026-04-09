import { useState, useEffect } from 'react'
import './FutureUnicornForm.css'
import { NewWebFooter } from './common/NewWebFooter'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import Founderadmindashboard from "./Unicorn/forms/Founderadmindashboard";
import FounderadmindashboardAdditional from './Unicorn/forms/FounderadmindashboardAdditional.js';
import { Modal, Button, message } from "antd";
import axios from "axios";

export const FutureUnicornForm = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const [showSecondComponent, setShowSecondComponent] = useState(false);
    const [showUnpublishWarningModal, setShowUnpublishWarningModal] = useState(false);
    const [showUnpublishEmailModal, setShowUnpublishEmailModal] = useState(false);
    const [unicornData, setUnicornData] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Fetch unicorn data
        const fetchUnicornData = async () => {
            try {
                const params = {
                    founderID: localStorage.getItem("founder_id"),
                };
                const headers = {
                    "content-type": "application/json",
                };
                const response = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}api/founder/Startup/unicornListByFounders`,
                    params,
                    { headers }
                );
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setUnicornData(response.data.data[0]);
                }
            } catch (error) {
                console.error("Error fetching unicorn data:", error);
            }
        };
        
        fetchUnicornData();
    }, [])

    $(window).scroll(function () {
        if ($(this).scrollTop() > 30) {
            $('body').addClass('newClass');
        } else {
            $('body').removeClass('newClass');
        }
    });

    const handleUnpublishClick = () => {
        setShowUnpublishWarningModal(true);
    };

    const handleUnpublishWarningContinue = () => {
        setShowUnpublishWarningModal(false);
        setShowUnpublishEmailModal(true);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('contact@growth91.com');
        message.success('Email copied to clipboard');
    };

    const handleCopySubject = () => {
        const startupName = unicornData?.tudStartupName || '[Startup Name]';
        const subject = `Unpublish Request – ${startupName}`;
        navigator.clipboard.writeText(subject);
        message.success('Subject copied to clipboard');
    };

    function SimpleNextArrow(props) {
        const { onClick } = props;
        return (
            <>
                <div className="nextArrow" onClick={onClick}>
                    <span class="next-arrows slick-arrow">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </span>
                </div>
            </>
        );
    }

    function SimplePrevArrow(props) {
        const { onClick } = props;
        return (
            <>
                <div className="prevArrow" onClick={onClick}>
                    <span class="prev-arrows slick-arrow">
                        {" "}
                        <i class="fa fa-angle-left" aria-hidden="true"></i>{" "}
                    </span>
                </div>
            </>
        );
    }
    const sliderSettings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,

        prevArrow: <SimplePrevArrow />,
        nextArrow: <SimpleNextArrow />,


        responsive: [{
            breakpoint: 1200,
            settings: {
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 993,
            settings: {
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 600,
            settings: {
                autoplay: false,
                speed: 100,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 400,
            settings: {
                arrows: false,
                speed: 100,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
            }
        }]
    }
    return (
        <div>
            <div classname="newabout">
                <NewWebHeader newabout={"newabout"} />
            </div>
            <div className="future-unicorn-stepper">
                <div class="container">
                {isDesktop ? (
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center" style={{ pointerEvents: "none" }}>
                            <div class="heading-title m-sm-0">
                                <p>
                                    <span></span>{" "}
                                </p>
                                <h2>List your future unicorn
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-12 main-tabing-unicorn">
                            <div class="tab_container">
                                <input id="tab1" type="radio" name="tabs" className='input-uni' checked />
                                <section id="content1" class="tab-content mt-0">
                                    <Founderadmindashboard view={0} />                                  
                                </section>
                            </div>
                            
                            <div className="additional-info-section">
                                <div className="info-box">
                                    <h4>Additional Information for Better Evaluation</h4>
                                    <p>Note: This section is for internal evaluation by Growth91 and will not be
                                    published on the Future Unicorn page. This may also be used to provide
                                    additional information to your prospective investors, partners, or
                                    associates, and to train our AI module on your behalf. Therefore, please
                                    provide as much detailed information as possible.</p>
                                    
                                    <div className="button-container">
                                        <button 
                                            className="action-button ok-button" 
                                            onClick={() => {
                                                setShowSecondComponent(true);
                                                // Scroll to content2 section
                                                setTimeout(() => {
                                                    const content2 = document.getElementById('content2');
                                                    if (content2) {
                                                        content2.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                    }
                                                }, 100);
                                            }}
                                        >
                                            Ok
                                        </button>
                                        <button 
                                            className="action-button skip-button"
                                            onClick={() => setShowSecondComponent(false)}
                                        >
                                            Skip
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Unpublish Section */}
                            <div className="text-center">
                                <a
                                    onClick={handleUnpublishClick}
                                        style={{
                                            fontSize: '14px',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            color: 'red',
                                        }}
                                >
                                    Unpublish My Startup Profile
                                </a>
                            </div>
                            
                            {showSecondComponent && (
                                <div class="tab_container">
                                    <input id="tab2" type="radio" name="tabs2" className='input-uni' checked />
                                    <section id="content2" class="tab-content mt-0">
                                        <FounderadmindashboardAdditional view={0} />                                  
                                    </section>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div class="row">
                        <div className="mobile-message text-center">
                            <p>Content is not available on mobile. Please visit on a larger screen.</p>
                        </div>
                    </div>
                ) }
                </div>
            </div>

            {/* Unpublish Warning Modal */}
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: '#ff4d4f', fontSize: '24px' }}></i>
                        <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1f36' }}>Confirm Unpublish Request</span>
                    </div>
                }
                open={showUnpublishWarningModal}
                onCancel={() => setShowUnpublishWarningModal(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShowUnpublishWarningModal(false)}>
                        Cancel
                    </Button>,
                    <Button key="continue" type="primary" danger onClick={handleUnpublishWarningContinue}>
                        Continue to Unpublish
                    </Button>,
                ]}
                width={600}
                centered={true}
                style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    top: '20px'
                }}
                headStyle={{
                    padding: '10px 24px',
                    borderBottom: 'none'
                }}
                bodyStyle={{
                    padding: '10px 24px 24px 24px'
                }}
            >
                <div style={{ padding: '0' }}>
                    <div style={{
                        background: '#f8fafc',
                        padding: '24px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                    }}>
                        <p style={{ fontSize: '16px', marginBottom: '16px', fontWeight: '600', color: '#1a1f36' }}>
                            By unpublishing your startup profile:
                        </p>
                        <ul style={{ 
                            margin: '0',
                            paddingLeft: '20px', 
                            lineHeight: '1.8',
                            color: '#4a5568',
                            listStyleType: 'none'
                        }}>
                            <li style={{ marginBottom: '8px' }}>1. Your startup will no longer be visible to investors.</li>
                            <li style={{ marginBottom: '8px' }}>2. You will lose ongoing visibility on the platform.</li>
                            <li style={{ marginBottom: '8px' }}>3. Your deal may be removed from active consideration, as the public link will no longer remain accessible.</li>
                            <li>4. Investor engagement history may be paused.</li>
                        </ul>
                    </div>
                    <p style={{ marginTop: '16px', color: '#ff4d4f', fontWeight: '600', fontSize: '16px' }}>
                        Are you sure you want to proceed?
                    </p>
                </div>
            </Modal>

            {/* Unpublish Email Instruction Modal */}
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fa-solid fa-envelope" style={{ color: '#1890ff', fontSize: '24px' }}></i>
                        <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1f36' }}>Email Confirmation Required</span>
                    </div>
                }
                open={showUnpublishEmailModal}
                onCancel={() => setShowUnpublishEmailModal(false)}
                footer={[
                    <Button key="close" type="primary" onClick={() => setShowUnpublishEmailModal(false)}>
                        Close
                    </Button>,
                ]}
                width={650}
                centered={true}
                style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    top: '20px'
                }}
                headStyle={{
                    padding: '10px 24px',
                    borderBottom: 'none'
                }}
                bodyStyle={{
                    padding: '0px 24px'
                }}
            >
                <div style={{ padding: '0' }}>
                    <p style={{ fontSize: '16px', marginBottom: '20px', color: '#4a5568' }}>
                        To proceed with unpublishing your startup profile, please send an email to:
                    </p>
                    
                    <div style={{ 
                        background: '#f8fafc', 
                        padding: '24px', 
                        borderRadius: '12px', 
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <strong style={{ fontSize: '16px', fontWeight: '600', color: '#1a1f36' }}>Email:</strong>
                            <div style={{ fontSize: '18px', color: '#1890ff', marginTop: '8px' }}>
                                contact@growth91.com
                            </div>
                        </div>
                        <Button 
                            icon={<i className="fa-solid fa-copy"></i>} 
                            onClick={handleCopyEmail}
                            size="small"
                        >
                            Copy
                        </Button>
                    </div>

                    <div style={{ 
                        background: '#fff7e6', 
                        padding: '24px', 
                        borderRadius: '12px', 
                        border: '1px solid #ffd591',
                        marginBottom: '20px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <strong style={{ fontSize: '16px', fontWeight: '600', color: '#d46b08' }}>Subject Line (Mandatory Format):</strong>
                                <div style={{ fontSize: '14px', marginTop: '8px', wordBreak: 'break-word', color: '#4a5568', lineHeight: '1.6' }}>
                                    Unpublish Request – {unicornData?.tudStartupName || '[Startup Name]'}
                                </div>
                            </div>
                            <Button 
                                icon={<i className="fa-solid fa-copy"></i>} 
                                onClick={handleCopySubject}
                                size="small"
                                style={{ marginLeft: '10px', flexShrink: 0 }}
                            >
                                Copy
                            </Button>
                        </div>
                    </div>

                    <div style={{ 
                        background: '#e6f7ff', 
                        padding: '24px', 
                        borderRadius: '12px',
                        border: '1px solid #91d5ff'
                    }}>
                        <p style={{ margin: 0, color: '#0050b3', fontSize: '14px' }}>
                            <i className="fa-solid fa-info-circle" style={{ marginRight: '8px' }}></i>
                            Our team will review and process the request.
                        </p>
                    </div>
                </div>
            </Modal>

            <NewWebFooter />
        </div>
    )
}
