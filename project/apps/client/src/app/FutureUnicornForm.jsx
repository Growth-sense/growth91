import { useState, useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import Founderadmindashboard from "./Unicorn/forms/Founderadmindashboard";

export const FutureUnicornForm = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    $(window).scroll(function () {
        if ($(this).scrollTop() > 30) {
            $('body').addClass('newClass');
        } else {
            $('body').removeClass('newClass');
        }
    });
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
            <NewWebFooter />
        </div>
    )
}
