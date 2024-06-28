import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';


export const FutureUnicornDescription = () => {
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
                autoplay: true,
                speed: 100,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 400,
            settings: {
                arrows: true,
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


            <section class="futureunicorn-slider-sections">
                <div class="container-flex">

                    <div class="row">
                        <div class="futureslider-card">
                            <Slider {...sliderSettings}>



                                <div class="img-future">
                                    <img src="https://cms.ezylegal.in/wp-content/uploads/2022/12/Business-Management-Consultant-.jpg" alt="" />
                                    <div className="content-img-futureunicorn">
                                        <h3>
                                            Business Management consultant
                                        </h3>
                                    </div>
                                </div>

                                <div class="img-future">
                                    <img src="https://hoa.org.uk/wp-content/uploads/2021/10/estate-agent-in-house-services-scaled.jpg" alt="" />
                                    <div className="content-img-futureunicorn">
                                        <h3>
                                            Strategic Avisor
                                        </h3>
                                    </div>

                                </div>
                                <div class="img-future">
                                    <img src="https://suzanneinfrance.com/wp-content/uploads/AdobeStock_127036101.jpeg" alt="" />
                                    <div className="content-img-futureunicorn">
                                        <h3>
                                            Certified Corporate Director
                                        </h3>
                                    </div>
                                </div>


                            </Slider>



                        </div>

                    </div>
                    <div className="row row-imgdirects">
                        <div className="row-img-direct">
                            <div className="img-certified-directors">
                                <img src="https://www.theidy.com/img/SanjaySarda/profile-pic/sanjay.jpg" alt="" />
                            </div>
                            <div className="content-certify-directors">
                                <h3>Sanjay Sarda</h3>
                                <p>
                                    <span></span>
                                    Certified Corporate Director - Business Management Consultant
                                </p>
                            </div>
                            {/* <div className="meet-icon-future">
                                <ul>
                                    <li className='img-handshake'>
                                        <span><img src="./assets/images/hand-shake.png" alt="" /></span>
                                        <span>Meet Me</span>
                                    </li>
                                    <li>
                                        <span><img src="./assets/images/add-user.png" alt="" /></span>
                                        <span>Add Contact</span>
                                    </li>
                                    <li>
                                        <span><img src="./assets/images/share1.png" alt="" /></span>
                                        <span>Share</span>
                                    </li>
                                </ul>
                            </div> */}
                        </div>

                    </div>
                    <div className="row row-imgdirects bg-box-futures">
                        <ul className='grid-box-futures'>
                            <li>
                                <span><img src="./assets/images/telephone.png" alt="" /></span>
                                <span>Call</span>
                            </li>
                            <li>
                                <span><img src="./assets/images/chat.png" alt="" /></span>
                                <span>Message</span>
                            </li>
                            <li>
                                <span><img src="./assets/images/email.png" alt="" /></span>
                                <span>Email</span>
                            </li>
                            <li>
                                <span><img src="./assets/images/phone.png" alt="" /></span>
                                <span>Whatsapp</span>
                            </li>
                            <li>
                                <span><img src="./assets/images/messenger.png" alt="" /></span>
                                <span>Messanger</span>
                            </li>
                            <li>
                                <span><img src="./assets/images/location.png" alt="" /></span>
                                <span>Navigate</span>
                            </li>
                            <li>
                                <span><img src="./assets/images/web.png" alt="" /></span>
                                <span>Website</span>
                            </li>
                            <li>
                                <span><img src="./assets/images/thumb-up.png" alt="" /></span>
                                <span>Social</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </section>
            {/* <section className="services-section-future">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="services-futures-card">
                                <div className="img-card-service-future">
                                    <img src="./assets/images/help.png" alt="" />
                                </div>
                                <div className="para-future-service">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section class="faq-sections future-main-accordians ">
                <div class="container">
                    <div class="row">
                        <div class="main-accordain-all">

                            <div
                                class="accordion accordion-flush"
                                id="accordionFlushExample"
                            >
                                {/* <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingOness">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOness"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOness"
                                        >
                                            <span><img src="./assets/images/repair-tool.png" alt="" /></span>
                                            Service
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-collapseOness"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOness"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body acc-services-ul">
                                            <ul className=''>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                                <li>khush</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingOne">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOne"
                                        >
                                            <span><img src="./assets/images/information.png" alt="" /></span>
                                            About Us
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-collapseOne"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOne"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body about-us-p">
                                            <p>
                                                Tulua Foods Pvt Ltd, established in 2020, specializes in providing high-quality, clean-label spice and masala products. With a mission to spotlight authentic Indian flavours, Tulua offers a diverse range of over 50 SKUs, including whole spices, powdered spices, and ready-to-cook (RTC) pastes. Their commitment to quality, transparency, and authenticity sets them apart in the market. Operating in both B2B and B2C segments, Tulua supplies branded spices to hospitality businesses and caters directly to individual consumers through various sales channels. Achieving rapid growth and significant milestones, Tulua has secured funding to support its expansion plans, including venturing into export markets and introducing new product lines.

                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingThree">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseThree"
                                        >
                                            <span><img src="./assets/images/market-research.png" alt="" /></span>

                                            Market Overview
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-collapseThree"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingThree"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body">
                                            <div className="row market-overreview-row">
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="membership-accordian">
                                                        {/* <div className="img-member-accordian">
                                                            <img src="https://www.trumanlittlewhitehouse.org/wp-content/uploads/2019/11/81DpN-lrJvL._SL1350.jpg" alt="" />
                                                        </div> */}
                                                        <div className="para-member-accordian">
                                                            {/* <h3>
                                                                charter president
                                                            </h3> */}
                                                            <p>
                                                                The Indian spice market is experiencing robust growth, with a projected CAGR of 11.29% during 2021-2027, reaching INR 142,569.3 Crores in 2021 and expected to reach INR 270,928.4 Crores by 2027. This growth is driven by India's status as the largest producer, consumer, and exporter of spices globally, alongside increasing demand fueled by changing consumer preferences.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="membership-accordian">

                                                        <div className="para-member-accordian">
                                                            <p>
                                                                The total addressable market for spices in India was $42 billion in 2022, with an anticipated growth rate of 15.7% between 2021-2031. Similarly, the total addressable market for Ready-To-Cook (RTC) products in India was $460 million in 2022, forecasted to grow at a rate of 16.3% between 2021-2031, highlighting significant opportunities in both segments.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="membership-accordian">
                                                        {/* <div className="img-member-accordian">
                                                            <img src="https://www.trumanlittlewhitehouse.org/wp-content/uploads/2019/11/81DpN-lrJvL._SL1350.jpg" alt="" />
                                                        </div> */}
                                                        <div className="para-member-accordian">
                                                            {/* <h3>
                                                                Member
                                                            </h3> */}
                                                            <p>
                                                                The Ready to Cook market, valued at $18 billion, is witnessing rapid growth due to shifting consumer habits, increased health awareness, and the convenience of pre-packaged meal kits. This trend presents ample opportunities for smaller companies to enter the market and innovate with new product offerings, catering to the needs of busy individuals seeking healthy and convenient meal solutions.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingsixx">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingsixxnew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingsixx"
                                        >
                                            <span><img src="./assets/images/highluights.png" alt="" /></span>

                                            Highlights
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingsixxnew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingsixx"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body">
                                            <div className="row row-bg-highlights" >
                                                <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                                    <div className="highlights-accordian">
                                                        <div className="para-highlights-accordian">
                                                            <div className="img-highlights">
                                                                <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" alt="" />

                                                            </div>
                                                            <div className="para-p-highlight">
                                                                <p>
                                                                    Tulua Foods Pvt Ltd has experienced exceptional revenue growth, with a 941% increase in the first three quarters, reaching Rs. 1.79 crore. Despite being a young startup, Tulua has shown financial stability, surpassing milestones from Rs. 8 lakhs in FY20-21 to Rs. 1.79 crore in FY23-24. Projections indicate further growth, aiming for Rs. 2.8 crore in FY23-24 and Rs. 10.9 crore in FY24-25, highlighting their confidence in future success.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                                    <div className="highlights-accordian">
                                                        <div className="para-highlights-accordian">
                                                            <div className="img-highlights">
                                                                <img src="./assets/images/deals-details/Petmojo/highlight01.jpg" alt="" />

                                                            </div>
                                                            <div className="para-p-highlight">
                                                                <p>
                                                                    Tulua operates in the spice and grocery sector, capitalizing on the growing demand for high-quality, clean-label spice and masala products in India. With a focus on authenticity and convenience, Tulua targets both domestic and international markets, leveraging an omnichannel approach catering to HoReCa, exports, and retail. This positions Tulua well to capture a significant share of the expanding market for branded spices and convenience foods.                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                                    <div className="highlights-accordian">
                                                        <div className="para-highlights-accordian">
                                                            <div className="img-highlights">
                                                                <img src="./assets/images/deals-details/highlight2.jfif" alt="" />

                                                            </div>
                                                            <div className="para-p-highlight">
                                                                <p>
                                                                    Tulua's product packaging sets it apart from competitors, boasting premium designs that appeal to the millennial and GenZ demographic Despite the premium packaging, Tulua ensures affordability with competitive pricing across its product range. For instance, spice prices range from Rs 40 to Rs 115, while ready-to-cook pastes are priced at Rs 150 for 100g and Rs 225 for 200g. This combination of attractive packaging and reasonable pricing enhances Tulua's appeal to modern consumers seeking both quality and aesthetic appeal in their culinary products.                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                                    <div className="highlights-accordian">
                                                        <div className="para-highlights-accordian">
                                                            <div className="img-highlights">
                                                                <img src="./assets/images/deals-details/highlight3.jpg" alt="" />

                                                            </div>
                                                            <div className="para-p-highlight">
                                                                <p>
                                                                    Tulua's consumer retail segment has experienced significant growth, with over 1,400 active customers and a notable 18% repeat rate without targeted retention marketing. Sales have surged by 400% compared to the previous quarter, showcasing strong demand and consumer satisfaction with Tulua's clean-label products, including ready-to-cook pastes and single-origin spices.                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                                    <div className="highlights-accordian">
                                                        <div className="para-highlights-accordian">
                                                            <div className="img-highlights">
                                                                <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" alt="" />

                                                            </div>
                                                            <div className="para-p-highlight">
                                                                <p>
                                                                    Tulua's enterprise products consist of a wide selection of high-quality spices, including 15 single spice powders, 8 blended spice powders, and 22 whole spices. Sourced directly from farms and mandis, these products ensure superior taste and freshness, making them the preferred choice for hotels, restaurants, cafes, and airlines.                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                                    <div className="highlights-accordian">
                                                        <div className="para-highlights-accordian">
                                                            <div className="img-highlights">
                                                                <img src="./assets/images/deals-details/Petmojo/highlight4.jpg" alt="" />

                                                            </div>
                                                            <div className="para-p-highlight">
                                                                <p>
                                                                    Tulua prioritizes rigorous quality control measures and uses single-origin ingredients and chef-made recipes to ensure authentic Indian flavors in their products. Tulua's products are 100% natural with no added flavors or additives, appealing to health-conscious consumers. Additionally, the company operates as a plastic-neutral brand and sources locally to reduce environmental impact.                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingfourees">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingfoureesnew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingfourees"
                                        >
                                            <span><img src="./assets/images/live-streaming.png" alt="" /></span>

                                            Media Coverage
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingfoureesnew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingfourees"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body">
                                            <div className="row row-bg-media-coverage" >
                                                <div className="col-md-4 col-lg-4 col-xxl-4  col-12 col-sm-12 col-xxl-4">
                                                    <div className="para-media-coverage-accordian">
                                                        <div className="img-media-coverage">
                                                            <img src="./assets/images/deals-details/Tulua new/Articles/1.png" alt="" />

                                                        </div>
                                                        <div className="para-p-media-coverage">
                                                            <p>
                                                                Tulua Simplifying Indian Cooking With Foray Into India Spice Market
                                                            </p>

                                                        </div>
                                                        <div className="button-media-coverage">
                                                            <a href="">View More</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4 col-lg-4 col-xxl-4  col-12 col-sm-12 col-xxl-4">
                                                    <div className="para-media-coverage-accordian">
                                                        <div className="img-media-coverage">
                                                            <img src="./assets/images/deals-details/Tulua new/Articles/2.jpg" alt="" />

                                                        </div>
                                                        <div className="para-p-media-coverage">
                                                            <p>
                                                                Tulua launches aromatic line of spices highlighting the true Indian flavour
                                                            </p>

                                                        </div>
                                                        <div className="button-media-coverage">
                                                            <a href="">View More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4  col-12 col-sm-12 col-xxl-4">
                                                    <div className="para-media-coverage-accordian">
                                                        <div className="img-media-coverage">
                                                            <img src="./assets/images/deals-details/Tulua new/Articles/1.png" alt="" />

                                                        </div>
                                                        <div className="para-p-media-coverage">
                                                            <p>
                                                                Tulua Simplifying Indian Cooking With Foray Into India Spice Market
                                                            </p>

                                                        </div>
                                                        <div className="button-media-coverage">
                                                            <a href="">View More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4  col-12 col-sm-12 col-xxl-4">
                                                    <div className="para-media-coverage-accordian">
                                                        <div className="img-media-coverage">
                                                            <img src="./assets/images/deals-details/Tulua new/Articles/1.png" alt="" />

                                                        </div>
                                                        <div className="para-p-media-coverage">
                                                            <p>
                                                                Tulua Simplifying Indian Cooking With Foray Into India Spice Market
                                                            </p>

                                                        </div>
                                                        <div className="button-media-coverage">
                                                            <a href="">View More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4  col-12 col-sm-12 col-xxl-4">
                                                    <div className="para-media-coverage-accordian">
                                                        <div className="img-media-coverage">
                                                            <img src="./assets/images/deals-details/Tulua new/Articles/4.jpg" alt="" />

                                                        </div>
                                                        <div className="para-p-media-coverage">
                                                            <p>
                                                                Raksha Bandhan 2023: What to buy for someone who cannot think beyond                                                             </p>

                                                        </div>
                                                        <div className="button-media-coverage">
                                                            <a href="">View More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4  col-12 col-sm-12 col-xxl-4">
                                                    <div className="para-media-coverage-accordian">
                                                        <div className="img-media-coverage">
                                                            <img src="./assets/images/deals-details/Tulua new/Articles/6.jpg" alt="" />

                                                        </div>
                                                        <div className="para-p-media-coverage">
                                                            <p>
                                                                Tulua to work in tandem with chefs to create customised blended spices
                                                            </p>

                                                        </div>
                                                        <div className="button-media-coverage">
                                                            <a href="">View More</a>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingtearm">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingtearmnew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingtearm"
                                        >
                                            <span><img src="./assets/images/contract-negotiation.png" alt="" /></span>
                                            Deal Term
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingtearmnew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingtearm"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body connect-acc-us">
                                            <div className="row row-box-line">
                                                <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            End Date


                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    Jun 24, 2024
                                                                </span>

                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            Min Investment



                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    ₹ 500960 for CCPS
                                                                </span>

                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            Valuation



                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    ₹ 17 Cr
                                                                </span>

                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingdetails">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingdetailsnew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingdetails"
                                        >
                                            <span><img src="./assets/images/group-chat.png" alt="" /></span>
                                            Team
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingdetailsnew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingdetails"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body ">
                                            <div className="row row-box-linse">
                                                <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-12 col-sm-12 col-xs-12">
                                                    <div className="main-card-of-teams">
                                                        <div className="img-teams-of-cards">
                                                            <img src="./assets/images/deals-details/Tulua new/Team/Richy.jpg" alt="" />
                                                          
                                                        </div>
                                                        <div className="name-of-teams-card">
                                                        <div className="head-deals-team">
                                                                <h3>Richy Dave
                                                                </h3>
                                                                <p>Founder and CEO</p>
                                                            </div>
                                                            <ul>
                                                                <li>
                                                                    10+ years of experience in Marketing and Brand-building.
                                                                </li>
                                                                <li>
                                                                    Ex-founder of Surge Digital, a boutique creative marketing agency.
                                                                </li>
                                                                <li>
                                                                    looks after Marketing & Brand building, Supply chain.
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-12 col-sm-12 col-xs-12">
                                                    <div className="main-card-of-teams">
                                                        <div className="img-teams-of-cards">
                                                            <img src="./assets/images/deals-details/Tulua new/Team/hitesh.jpg" alt="" />
                                                    
                                                        </div>
                                                        <div className="name-of-teams-card">
                                                        <div className="head-deals-team">
                                                                <h3>Hitesh Dave
                                                               
                                                                </h3>
                                                                <p> Director of Sales</p>
                                                            </div>
                                                            <ul>
                                                                <li>
                                                                35+ yrs experience in sales & distribution in markets across India and China.
                                                                
                                                                </li>
                                                                <li>
                                                                Formerly setup food service network for brands such as Sankalp.
                                                                </li>
                                                                
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-12 col-sm-12 col-xs-12">
                                                    <div className="main-card-of-teams">
                                                        <div className="img-teams-of-cards">
                                                            <img src="./assets/images/deals-details/Tulua new/Team/arjunvaidya.jpg" alt="" />
                                                            
                                                        </div>
                                                        <div className="name-of-teams-card">
                                                        <div className="head-deals-team">
                                                                <h3>Arjun Vaidya
                                                             
                                                                </h3>
                                                                <p>   D2C founder & Investor.</p>
                                                            </div>
                                                            <ul>
                                                              
                                                                <li>
                                                                With vast experience in sales and marketing,           
                                                                                                                     </li>
                                                                <li>
                                                               
                                                                She has a deep network and has closed strategic alliances worth US$ 200 million as part of Brand Capital, the strategic investment arm of Times Group.
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingTwo">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            <span><img src="./assets/images/trophy.png" alt="" /></span>

                                            Awards & Achivements
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-collapseTwo"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingTwo"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body">
                                            <div className="img-awards">
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                                <img src="./assets/images/certifieds.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingfour">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingfournew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingfour"
                                        >
                                            <span><img src="./assets/images/gallery.png" alt="" /></span>

                                           Investor Presentation
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingfournew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingfour"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body">
                                            <div className="row justify-content-center">
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="img-future-gallery">
                                                        <img src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="img-future-gallery">
                                                        <img src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="img-future-gallery">
                                                        <img src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="img-future-gallery">
                                                        <img src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="img-future-gallery">
                                                        <img src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="img-future-gallery">
                                                        <img src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="img-future-gallery">
                                                        <img src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xxl-4 col-12 col-sm-12 col-xxl-4">
                                                    <div className="img-future-gallery">
                                                        <img src="https://wallpapers.com/images/hd/certificate-background-1920-x-1358-ytgp20iwjhgm112h.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingfive">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingfivenew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingfive"
                                        >
                                            <span><img src="./assets/images/mobile.png" alt="" /></span>

                                            Connect Us
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingfivenew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingfive"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body connect-acc-us">
                                            <div className="row row-box-line">
                                                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            Legal Name

                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    Tulua Foods Pvt Ltd
                                                                </span>

                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            Founded



                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    14-01-2020
                                                                </span>

                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            Let's Meet


                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    Corporate Office  :
                                                                </span>
                                                                <span>
                                                                    407, Neo Corporate Plaza, Extd Ramchandra Lane, Kanchpada, Malad West, Mumbai 400064
                                                                </span>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            Employees

                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    12
                                                                </span>

                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            Visit Us



                                                        </h3>
                                                        <ul>
                                                            <li>

                                                                <span>
                                                                    www.tulua.shop
                                                                </span>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-12 col-sm-12 col-xs-12">
                                                    <div className="lets-talks-div">
                                                        <h3>
                                                            Follow Us
                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                <i class="fa-brands fa-instagram"></i>
                                                            </li>
                                                            <li>
                                                                <i class="fa-brands fa-twitter"></i>
                                                            </li>

                                                            <li>
                                                                <i class="fa-brands fa-linkedin-in"></i>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingWait">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingWaitnew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingWait"
                                        >
                                            <span><img src="./assets/images/mobile.png" alt="" /></span>

                                            Videos
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingWaitnew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingWait"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body connect-acc-us">
                                            <div className="row justify-content-center">
                                                <div className="col-md-12 col-lg-12 col-xxl-12 col-12 col-sm-12 col-xxl-12">
                                                    <div className="img-future-gallery">
                                                        <video controls>
                                                            <source src="/media/cc0-videos/flower.webm" type="video/webm" />

                                                            <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />

                                                            Download the
                                                            <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                                            or
                                                            <a href="/media/cc0-videos/flower.mp4">MP4</a>
                                                            video.
                                                        </video>
                                                    </div>
                                                </div>
                                       
                                             
                                            </div>
                                        </div>
                                    </div>
                                </div>

{/* 
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="flush-headingseven">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-headingsevensnew"
                                            aria-expanded="false"
                                            aria-controls="flush-headingseven"
                                        >
                                            <span><img src="./assets/images/help.png" alt="" /></span>

                                            Help Center
                                        </button>
                                    </h3>
                                    <div
                                        id="flush-headingsevensnew"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingsevensnew"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div class="accordion-body">
                                            <div className="row need-help-accrow">
                                                <div className="need-help-acc">
                                                    <p>
                                                        Need help? Drop down and find what you're looking for here & send us a message
                                                    </p>
                                                    <p>
                                                        <span className='ouat-spans'>
                                                            Quotation
                                                        </span>
                                                        <span>Post your requirement to serve your better</span>
                                                    </p>
                                                </div>
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Enquiry for</label>
                                                            <select name="" id="" className='form-control'>
                                                                <option value="">quotation</option>
                                                                <option value="">Appoinment</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Requirement</label>
                                                            <input type="text" className='form-control' />
                                                        </div>
                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Name</label>
                                                            <input type="text" className='form-control' />

                                                        </div>
                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Company Name</label>
                                                            <input type="text" className='form-control' />

                                                        </div>
                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Email</label>
                                                            <input type="text" className='form-control' />

                                                        </div>
                                                        <div className="col-md-6 col-12 col-sm-12 col-lg-6 col-xxl-6 col-12">
                                                            <label htmlFor="">Mobile</label>
                                                            <input type="text" className='form-control' />

                                                        </div>
                                                        <div className="col-md-12 col-sm-12 col-md-12 col-xl-12 col-lg-12 col-xxl-12">
                                                            <label htmlFor="">Message</label>
                                                            <textarea name="" id="" cols="30" rows="10"></textarea>

                                                        </div>
                                                        <div className="col-md-12 col-sm-12 col-md-12 col-xl-12 col-lg-12 col-xxl-12">

                                                            <div className="button-quote">
                                                                <a href="">Request Quote</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="investor-amounts">
                                <Link to="/PaymentMethods">I am Interested</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <NewWebFooter />

        </div>
    )
}
