import React, { useEffect, useState } from "react";
import { NewWebFooter } from "./common/NewWebFooter";
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import Bridge from "./constants/Bridge.js";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Modal, message as mess, Tooltip } from "antd";
import SinglePagePDFViewer from "./components/PdfViewer/single-page";
import { extractVideoIDFromYoutubeUrl, getAbsoluteUrl } from "./helper/utilHelper.js";
import moment from "moment";
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaLock } from 'react-icons/fa';
import { LastUpdatedBadge } from "./components/LastUpdatedBadge";
import CoverImageCarousel from "./components/CoverImageCarousel";
import ImageLightbox from "./components/ImageLightbox";
import { applyTheme, GROWTH91_THEMES } from "./helper/themes";
// ONLY IMPORT THEME CSS ON INVESTOR VIEW PAGE - NOT IN FORMS
import "./styles/unicorn-theme.css";
import GuestAccessModal from "./components/GuestAccessModal.jsx";
import LoginRequiredModal from "./components/LoginRequiredModal.jsx";

export const FutureUnicornDescription = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { urlName: urlNameParam } = useParams();
  const search = useLocation().search;
  const urlName = props.urlName || urlNameParam || new URLSearchParams(search).get("urlName");
  const history = useHistory();
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);
  const [showUpgradeNudge, setShowUpgradeNudge] = useState(false);

  const handleSponsorClick = (sponsorName) => {
    // Navigate to FutureUnicornList with sponsor filter
    history.push(`/FutureUnicornList?sponsorFilter=${encodeURIComponent(sponsorName)}`);
  };
useEffect(() => {
  const investor = localStorage.getItem("investor_id");
  const founder = localStorage.getItem("founder_id");
  const isLoggedIn = investor || founder;

  const guestUntil = localStorage.getItem("unicorn_guest_until");
  const now = Date.now();
  const shouldShowModal = !isLoggedIn && (!guestUntil || now > Number(guestUntil));

  if (shouldShowModal) {
    // show guest modal, do NOT call API yet
    setShowGuestModal(true);
  } else {
    // logged in or valid guest session → load data immediately
    getuniondata();
    window.scrollTo(0, 0);
  }
}, []);

const getOrCreateGuestId = () => {
  let guestId = localStorage.getItem("unicorn_guest_id");
  if (!guestId) {
    guestId =
      "g91_guest_" +
      Date.now() +
      "_" +
      Math.random().toString(36).substr(2, 9);
    localStorage.setItem("unicorn_guest_id", guestId);
  }
  return guestId;
};

  const [showModal, setShowModal] = useState(false);
  const investorIdLS = localStorage.getItem("investor_id");
  const founderIdLS = localStorage.getItem("founder_id");
  const isLoggedInUser = investorIdLS || founderIdLS;
  const guestUntilLS = localStorage.getItem("unicorn_guest_until");
  const nowTs = Date.now();
  const hasActiveGuestSession = !isLoggedInUser && guestUntilLS && nowTs <= Number(guestUntilLS);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [unicorn, setUnicorn] = useState();
  const [memberdata, setmemberdata] = useState();
  const [message, setmessage] = useState();
  const [loadedTheme, setLoadedTheme] = useState('default');
  const [iamintrestmodal, setiamintrestmodal] = useState(false);
  const [currentUnicornId, setCurrentUnicornId] = useState(null);
  const [data, setdata] = useState({
    "I Want to know more about it": false,
    "I want to work with you": false,
    "I am excited to invest in your startups": false,
    message: "",
  });

  // Load and apply theme for the unicorn page - MUST BE BEFORE getuniondata
  const loadAndApplyTheme = async (unicornDealID, tudTempUdID = null) => {
    try {
      console.log('Loading theme for unicorn:', unicornDealID, tudTempUdID);
      // Try to load theme from published unicorn first
      let result = await Bridge.Unicorn.getUnicornTheme({ unicornDealID });
      console.log('Theme API response (published):', result);

      // If no theme found and we have draft ID, try draft
      if ((!result || result.status !== '1' || !result.data?.theme) && tudTempUdID) {
        console.log('No theme in published, checking draft...');
        result = await Bridge.Unicorn.getUnicornTheme({ tudTempUdID });
        console.log('Theme API response (draft):', result);
      }

      if (result && result.status === '1' && result.data && result.data.theme) {
        const theme = result.data.theme;
        console.log('FutureUnicorn - Applying theme:', theme);
        applyTheme(theme);
        setLoadedTheme(theme);
      } else {
        // Apply default theme
        console.log('No theme found, using default');
        applyTheme('default');
        setLoadedTheme('default');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Apply default theme on error
      applyTheme('default');
      setLoadedTheme('default');
    }
  };

  function getuniondata() {
    let params = {
      page: 0,
      pagesize: 10,
    };
    Bridge.Unicorn.unicorndealsByInvestors(params).then((result) => {
      console.log('Unicorn data loaded:', result);
      setUnicorn(result.data);

      // Load and apply theme for this unicorn
      if (result.data && result.data.length > 0 && urlName) {
        const currentUnicorn = result.data.find(item => item.udUrlName == urlName);
        if (currentUnicorn) {
          console.log('Found unicorn by urlName, loading theme...');
          loadAndApplyTheme(currentUnicorn.unicornDealID, currentUnicorn.tudTempUdID);
          setCurrentUnicornId(currentUnicorn.unicornDealID); 
        } else {
          console.log('Unicorn not found with urlName:', urlName);
        }
      }
    });
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $("body").addClass("newClass");
    } else {
      $("body").removeClass("newClass");
    }
  });
  const openiamintrest = () => {
  const investor = localStorage.getItem("investor_id");
  const founder = localStorage.getItem("founder_id");
  const isLoggedIn = investor || founder;

  const guestUntil = localStorage.getItem("unicorn_guest_until");
  const now = Date.now();
  const isGuest = !isLoggedIn && guestUntil && now <= Number(guestUntil);

  if (isLoggedIn) {
    // normal behavior
    setiamintrestmodal(true);
  } else if (isGuest) {
    // analytics for gated click
    try {
      const guestID = getOrCreateGuestId();
      Bridge.Unicorn.GuestAnalytics.addEvent({
        guestID,
        unicornDealID: currentUnicornId, // numeric unicornDealID resolved from urlName
        eventType: "guest_attempt_gated_action",
      });
    } catch (e) {
      console.error("guest analytics error", e);
    }

    // guest: block action, show login required modal
    setShowLoginRequired(true);

    // progressive upgrade counter
    const attempts =
      Number(localStorage.getItem("unicorn_guest_gated_attempts") || "0") + 1;
    localStorage.setItem("unicorn_guest_gated_attempts", String(attempts));

    if (attempts >= 2) {
      setShowUpgradeNudge(true);
      console.log("guest attempts", attempts);
console.log("isGuest", isGuest);
    }
  } else {
    // fully anonymous (should already see GuestAccessModal on page load),
    // but if they reach here, also show login required
    setShowLoginRequired(true);
  }
};


  const adddata = (e) => {
    if (e.target.name == "message") {
      // setdata({ ...data, [e.target.name]: [e.target.value] });
    } else {
      setdata({ [e.target.name]: true });
    }
  };
  const submitintrest = () => {
    // console.log(unicorn);
    let datas = unicorn.filter((item) => item.udUrlName == urlName);
    console.log(data);

    let params = {
      unicornDealID: datas[0].unicornDealID,
      udFounderID: datas[0].udFounderID,
      investor_id: localStorage.getItem("Parent_investor_id") || localStorage.getItem("founder_id"),
      interestKnowMore: data["I Want to know more about it"] == true || false,
      interestWorkwithYou: data["I want to work with you"] == true || false,
      interestInvestinStartup:
        data["I am excited to invest in your startups"] == true || false,
      interestMessage: message,
    };
    Bridge.Unicorn.add_unicorn_interest(params).then((result) => {
      console.log(result);
      if (
        data["I Want to know more about it"] == false ||
        data["I want to work with you"] == false ||
        data["I am excited to invest in your startups"] == false
      ) {
        mess.error("Please Select any one option ");
        return;
      }
      if (result.message == "Details are updated successfully.") {
        toast.success("Details shared with Founder");
        setiamintrestmodal(false);
        setdata({
          "I Want to know more about it": false,
          "I want to work with you": false,
          "I am excited to invest in your startups": false,
          message: "",
        });
        setmessage("");
      } else if (
        result.message == "You already have shown interest to this Startup."
      ) {
        mess.warning("You already have shown interest to this Startup.");
      }
    });
  };
  const dat = JSON.stringify(localStorage.getItem("investor_id"));

  // Helper function to get correct image URL (localhost for new uploads, production for existing)
  const getImageUrl = (filename, tudTempUdID) => {
    if (!filename) return '';

    let parsedFilename = filename;
    try {
      const parsed = JSON.parse(filename);
      if (Array.isArray(parsed)) {
        parsedFilename = parsed[0] || '';
      } else {
        parsedFilename = parsed;
      }
    } catch (e) {
      // Already a plain string or not JSON, no parsing needed
    }

    if (!parsedFilename) return '';

    // Simple URL construction
    const baseUrl = process.env.REACT_APP_BASE_URL;
    return `${baseUrl}api/uploads/unicorndeals/${tudTempUdID}/${parsedFilename}`;
  };

  // Helper to get full URLs for carousel images (handles mixed old/new images)
  const getCarouselImageUrls = (images, tudTempUdID) => {
    return images.map(image => {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      return `${baseUrl}api/uploads/unicorndeals/${tudTempUdID}/${image}`;
    });
  };

  // Helper function to parse banner images into array for carousel
  const parseBannerImages = (bannerImage) => {
    if (!bannerImage) return [];
    try {
      const parsed = JSON.parse(bannerImage);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      return [bannerImage];
    }
  };

  // Helper to parse pitch deck field (new image-array format only)
  const parsePitchDeckField = (pitchDeckValue) => {
    if (!pitchDeckValue) {
      return { type: 'none', pages: [], file: '' };
    }

    // If API already returns an array (not a JSON string), handle directly
    if (Array.isArray(pitchDeckValue)) {
      const pageFiles = pitchDeckValue.filter(
        (name) => typeof name === 'string' && name.trim() !== ''
      );
      if (!pageFiles.length) {
        return { type: 'none', pages: [], file: '' };
      }

      return { type: 'images', pages: pageFiles, file: '' };
    }

    // If it's a string, normalize HTML encoding and parse
    if (typeof pitchDeckValue === 'string') {
      let str = pitchDeckValue.trim();
      if (!str) {
        return { type: 'none', pages: [], file: '' };
      }

      // Decode HTML "&quot;" entities to real quotes
      str = str.replace(/&quot;/g, '"');

      const isValidName = (name) =>
        typeof name === 'string' && name.trim() !== '';

      try {
        const parsed = JSON.parse(str);

        // New format: JSON array of image filenames
        if (Array.isArray(parsed)) {
          const pageFiles = parsed.filter(isValidName);
          if (pageFiles.length) {
            return { type: 'images', pages: pageFiles, file: '' };
          }
        }

        // Double-encoded array: parsed is a string that itself looks like ["pitchdeck_0.png", ...]
        if (typeof parsed === 'string') {
          let inner = parsed.trim().replace(/&quot;/g, '"');
          if (inner.startsWith('[') && inner.endsWith(']')) {
            try {
              const innerArr = JSON.parse(inner);
              if (Array.isArray(innerArr)) {
                const pageFiles = innerArr.filter(isValidName);
                if (pageFiles.length) {
                  return { type: 'images', pages: pageFiles, file: '' };
                }
              }
            } catch (err) {
              // ignore and fall back to regex
            }
          }
        }
      } catch (e) {
        // JSON.parse failed, fall through to regex below
      }

      // Regex fallback: extract ALL pitchdeck_* image filenames from the string
      const regexMatches = str.match(/pitchdeck_[^",\]]+\.(png|jpg|jpeg|webp)/gi);
      if (regexMatches && regexMatches.length) {
        const pageFiles = regexMatches
          .map((name) => name && name.trim())
          .filter(isValidName);
        if (pageFiles.length) {
          return { type: 'images', pages: pageFiles, file: '' };
        }
      }

      // As a last resort, treat as a single filename if it's not a PDF
      const lower = str.toLowerCase();
      if (lower.endsWith('.pdf')) {
        return { type: 'none', pages: [], file: '' };
      }
      return { type: 'images', pages: [str], file: '' };
    }

    return { type: 'none', pages: [], file: '' };
  };

  // Helper to build full URLs for pitch deck page images
  const getPitchDeckImageUrls = (pages, tudTempUdID) => {
    if (!pages || !pages.length || !tudTempUdID) return [];

    return pages
      .map((filename) => {
        if (!filename) return '';

        let effective = filename;

        // If this "filename" is actually a JSON array string like
        // "[\"pitchdeck_0.png\", ...]", try to extract the first entry.
        if (typeof effective === 'string') {
          const trimmed = effective.trim();
          if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
              const nested = JSON.parse(trimmed);
              if (Array.isArray(nested) && nested[0]) {
                effective = nested[0];
              }
            } catch (err) {
              // fall through, we'll just use a regex fallback below
            }
          }

          // Extra safety: if anything went wrong above or the string still
          // contains a JSON-ish value, pull out the first pitchdeck_* image
          // filename using a regex. This guarantees we never keep the whole
          // JSON array in the URL.
          if (effective && typeof effective === 'string' && effective.includes('pitchdeck_')) {
            const match = effective.match(/pitchdeck_[^",\]]+\.(png|jpg|jpeg|webp)/i);
            if (match && match[0]) {
              effective = match[0];
            }
          }
        }

        if (!effective || typeof effective !== 'string') return '';

        // New locally-generated pitch deck images (from Imagick)
        // should always be loaded from the local API base URL.
        const isNewPitchImage = effective.startsWith('pitchdeck_');
        

        const baseUrl = isNewPitchImage
          ? process.env.REACT_APP_BASE_URL
          : process.env.REACT_APP_BASE_URL;

        return `${baseUrl}api/uploads/unicorndeals/${tudTempUdID}/${effective}`;
      })
      .filter((url) => !!url);
  };

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  const onImageClick = (index, imageUrls) => {
    // imageUrls should be the full URLs array from getCarouselImageUrls
    setLightboxImages(imageUrls);
    setLightboxInitialIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
    <GuestAccessModal
      visible={showGuestModal}
      onClose={() => {
        setShowGuestModal(false);
        getuniondata();           // load data after guest continues
        window.scrollTo(0, 0);
      }}
    />

    <LoginRequiredModal
      visible={showLoginRequired}
      onClose={() => setShowLoginRequired(false)}
    />
   <div
      className="unicorn-themed-page"
      style={{
        backgroundColor: "#F8F9FA",
        filter: showGuestModal ? "blur(4px)" : "none",
        pointerEvents: showGuestModal ? "none" : "auto",
        transition: "filter 0.2s ease",
      }}
    >
      <style>
        {`
        .para-proceed label{
          text-transform: none;
        }
      
        .image-section {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          display: block;
          position: relative;
          margin-top: -1px;
        }
        .image-section img {
        object-fit:contain;
        }
        .logo-section {
          width: 150px;
          height: 150px;
          min-width: 150px;
          
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          margin-top:-75px;
          padding: 0;
          z-index:999
        }
          /* XL screens – bigger logo */
@media (min-width: 1800px) {
  .logo-section {
    width: 200px;
    height: 200px;
    min-width: 200px;
  }
  .logo-section img {
    max-width: 200px;
    max-height: 200px;
  }
}
  /* Tablet – medium logo */
@media (min-width: 577px) and (max-width: 992px) {
  .logo-section {
    width: 110px;
    height: 110px;
    min-width: 110px;
  }
  .logo-section img {
    max-width: 110px;
    max-height: 110px;
  }
}
  /* Mobile – smaller logo */
@media (max-width: 576px) {
  .logo-section {
    width: 70px;
    height: 70px;
    min-width: 70px;
  }
  .logo-section img {
    max-width: 70px;
    max-height: 70px;
  }
}
        .logo-section img {
          max-width: 150px;
          max-height: 150px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          z-index:1
        }
        
        .text-section h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #29176f !important;
        }
        .text-section p {
          font-size: 1rem;
          color: #555555;
          margin-bottom: 2rem;
        }
        .text-section button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          color: #000000;
          background-color: transparent;    
          border: 1px solid #000000;
          border-radius: 50px;
          cursor: pointer;
        }

                   
                    .hero {
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        background-image: url('background-image.jpg'); /* Add the background image here */
                        background-size: cover;
                        background-position: center;
                            background-color: #100050;
                    }
                    .hero h1 {
                        font-size: 4em;
                        margin-bottom: 20px;
                        color: white !important;

                    }
                    .hero p {
                        font-size: 1.5em;
                        margin-bottom: 30px;
                        color: white;
                    }
                    .buttons {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                    }
                    .buttons a {
                        text-decoration: none;
                        color: white;
                        background-color: #6c63ff;
                        padding: 15px 30px;
                        border-radius: 5px;
                        font-size: 1.3em;
                        transition: background-color 0.3s;
                    }
                    .buttons a:hover {
                        background-color: #574bda;
                    }

                    /* Why to list section */
                    .why-to-list {
                        padding: 50px 20px;
                        text-align: center;
                        background-color: white;
                    }
                    .why-to-list h2 {
                        font-size: 2.5em;
                        margin-bottom: 40px;
                        color: white;
                    }
                    .features {
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                    }
                    .feature-box {
                        background-color: #f5f5f5;
                        padding: 20px;
                        border-radius: 10px;
                        width: 400px;
                    }
                    .feature-box h3 {
                        font-size: 1.5em;
                        margin-bottom: 10px;
                        color: #333;
                    }
                    .feature-box p {
                        font-size: 1.3em;
                        color: #666;
                    }

                    /* Key Features Section */
                    .key-features {
                        padding: 50px 20px;
                        background-color: white;
                        color: black;
                        text-align: left;
                        display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
                    }
                    .key-features h2 {
                        font-size: 2.5em;
                        text-align: center;
                        margin-bottom: 40px;
                        color: #333;
                    }
                    .features-list {
                    
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        grid-gap: 30px;
                        margin : 20px 90px;
                    }
                    .feature-item {
                        display: flex;
                        // align-items: center;
                    }
                    .feature-item-number {
                        width: 30px;
                        height: 30px;
                        background-color: #d8d8f8;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.5em;
                        margin-right: 20px;
                        color: #333;
                    }
                    .feature-description {
                        max-width: 700px;
                    }
                    .feature-description h3 {
                        font-size: 1.5em;
                        margin-bottom: 10px;
                        color: #333;
                    }
                    .feature-description p {
                        font-size: 1.3em;
                        color: #666;
                    }
                        .investor-benifit{
                        background : #ffffff;

                        }
                           .investor-benifit h2{
    color: #333;


                           }
                        /* Benefits for Founders Section */
.founder-benefit {
    background: #ffffff;
    padding: 50px 20px;
    text-align: center;
}

.founder-benefit h2 {
    // color: #ffffff !important;
    font-size: 2.5em;
    margin-bottom: 40px;
}

.founder-benefit .features {
    display: flex;
    justify-content: center;
    gap: 30px;
}

.founder-benefit .feature-box {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
}

.founder-benefit .feature-box h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
                        color: ##100050 !important;

}

.founder-benefit .feature-box p {
    font-size: 1.3em;
    color: #666;
}
.theme-btn{
 justify-content  : center !important;
}
 /* Section Styling */
.market-overview-section {
  background-color: #f8f9fa;
}

/* Card Styling */
.market-overview-card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%; /* Ensures cards have the same height */
  text-align: justify;
}

/* Typography */
.market-overview-section h2 {
  color: #333;
  font-weight: bold;
}

.media-coverage-section {
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
}

.media-card-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  object-position: center;
  display: block;
}
.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-4 {
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

.media-card-date {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.read-more-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.read-more-link:hover {
  text-decoration: underline;
}

/* Load More Button */
.load-more-btn {
  background-color: #ffffff;
  border: 2px solid #333;
  border-radius: 25px;
  padding: 10px 30px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.load-more-btn:hover {
  background-color: #333;
  color: #ffffff;
}


.videos-section {
  padding: 50px 0;
}

.video-slide {
  padding: 10px;
}

.video-slide iframe {
  border-radius: 10px;
}

.slick-prev, .slick-next {
  font-size: 30px;
  z-index: 1;
}

.slick-prev:hover, .slick-next:hover {
  
}

.slick-dots li button:before {
  
}

.slick-dots li.slick-active button:before {
 
}

.contact-us-section {
}

.contact-info-card {
  background: linear-gradient(90deg, #191964, #222276);
  color: white;
  border-radius: 15px;
  padding: 30px;
  z-index: 999;
}

.contact-info-card h2 {
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: 900;
  color: white !important;
}

.contact-info-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.contact-info-list li {
  margin-bottom: 35px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.contact-info-list i {
  font-size: 18px;
  margin-right: 26px;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  background-color: white;
  color: #191964;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center !important;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background-color: #fff;
  color: #7d56d9;
}

.company-info-list {
  list-style: none;
  padding: 0;
}

.company-info-list li {
  margin-bottom: 20px;
}

.company-info-list span {
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.company-info-list p {
  margin: 5px 0 0;
  color: #777;
  font-size: 15px;
}

.company-info-list a {
  color: #191964;
  text-decoration: none;
}

.company-info-list a:hover {
  text-decoration: underline;
}
.center-class{
align-content:center;
background-color: white;
box-shadow: 0px 3px 6px #000;
border-radius: 15px;
}

.about-text {
color: #fff;
text-align: justify;  
}

/* Responsive Styling */

@media only screen and (max-width: 600px) {

.text-section button {
    width: 200px;
    font-size: 1rem;
    color: #000000;
    background-color: transparent;
    border: 1px solid #000000;
    border-radius: 50px;
    cursor: pointer;
}

.content-section-banner {
  display: block !important;

}

.text-section {
  text-align: center;
  }
.text-section h1 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #29176f !important;
}

.design-space {
margin-top: 100px;

}

.about-img{
 margin-bottom: 20px;

}

.about-all {
  padding: 30px !important;


}

.about-text {
color: #fff;
text-align: justify;  
}

}

/* Responsive for Pitch Deck Slider */
@media only screen and (max-width: 768px) {
  #pitchDeck h1, #productDeck h2 {
    font-size: 24px !important;
    margin-bottom: 20px !important;
  }
  
  #pitchDeck .p-5, #productDeck .p-5 {
    padding: 2rem !important;
  }
}

@media only screen and (max-width: 480px) {
  #pitchDeck h1, #productDeck h2 {
    font-size: 20px !important;
    margin-bottom: 15px !important;
  }
  
  #pitchDeck .p-5, #productDeck .p-5 {
    padding: 1.5rem !important;
  }
}

/* Responsive media query for image-section on tablets */
@media only screen and (max-width: 768px) {
  .image-section {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 1.5rem;
    display: block;
    position: relative;
    margin-top: 100px !important;
  }
  .image-section img {
    object-fit: contain;
  }
}

/* Mobile specific - smaller margin */
@media only screen and (max-width: 576px) {
  .image-section {
    margin-top: -26px !important;
  }
}

`}
      </style>

      <div className="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>
      {unicorn &&
        unicorn
          .filter((item) => item.udUrlName == urlName)
          .map((item, index) => {
            return (
              <>
                {/* loop through items and print all for debugging */}
                {/* {Object.keys(item).map((key) => {
                return (
                  <div>
                    <p>{key}</p>
                    <p>{item[key]}</p>
                    <br />
                  </div>
                );
              })} */}

                <section className="design-space">
                  <div className="container">
                    {/* Cover Image Section with Carousel */}
                    <div
                      className="image-section"
                      style={{
                        borderRadius: "15px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <CoverImageCarousel
                        images={parseBannerImages(item.udBannerImage)}
                        imageUrls={getCarouselImageUrls(
                          parseBannerImages(item.udBannerImage),
                          item.tudTempUdID
                        )}
                        altText={item.udStartupName || "Startup Cover"}
                        autoPlayInterval={6500}
                        showControls={true}
                        onImageClick={onImageClick}
                        isPaused={isLightboxOpen}
                      />
                    </div>

                    <div className="content-section-banner d-flex ps-4 gap-5">
                      {/* Logo Section */}
                      <div className="logo-section">
                        {/* Replace with your logo */}
                        <img
                          src={getImageUrl(item.udLogoImage, item.tudTempUdID)}
                          alt="Logo"
                          style={{
                            objectFit: "contain",
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "auto",
                            height: "auto",
                            boxShadow: "0px 3px 6px #000",
                          }}
                        />
                      </div>

                      <div className="text-section d-flex justify-content-between align-items-start w-100">
                        <div>
                          <h1>{item.udStartupName}</h1>

                          {/* Profile Badges - Stage + Sector + All Visibility Tags */}
                          <div
                            style={{
                              marginTop: "12px",
                              marginBottom: "12px",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {/* Stage Badge */}
                            {(item.udStage || item.tudStage) && (
                              <Tooltip
                                title={`Funding Stage: ${
                                  item.udStage || item.tudStage
                                }`}
                              >
                                <span
                                  style={{
                                    backgroundColor:
                                      "var(--custom-theme-color, #191964)",
                                    color: "#ffffff",
                                    padding: "3px 8px",
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    border:
                                      "1px solid rgba(255, 255, 255, 0.3)",
                                  }}
                                >
                                  {item.udStage || item.tudStage}
                                </span>
                              </Tooltip>
                            )}

                            {/* Sector Badge */}
                            {(item.udCategory || item.tudCategory) && (
                              <Tooltip
                                title={`Industry Sector: ${
                                  item.udCategory || item.tudCategory
                                }`}
                              >
                                <span
                                  style={{
                                    backgroundColor:
                                      "var(--custom-theme-color, #191964)",
                                    color: "#ffffff",
                                    padding: "3px 8px",
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    border:
                                      "1px solid rgba(255, 255, 255, 0.3)",
                                  }}
                                >
                                  {item.udCategory || item.tudCategory}
                                </span>
                              </Tooltip>
                            )}

                            {/* Visibility Tags */}
                            {((item.udTag && item.udTag !== "None") ||
                              (item.tudTag && item.tudTag !== "None")) && (
                              <>
                                {/* Show first 3 visibility tags */}
                                {(item.udTag || item.tudTag)
                                  .split(",")
                                  .slice(0, 3)
                                  .map((tag, tagIndex) => (
                                    <Tooltip
                                      title={`Visibility Tag: ${tag.trim()}`}
                                    >
                                      <span
                                        key={tagIndex}
                                        style={{
                                          backgroundColor:
                                            "var(--custom-theme-color, #191964)",
                                          color: "#ffffff",
                                          padding: "3px 8px",
                                          borderRadius: "20px",
                                          fontSize: "14px",
                                          fontWeight: "600",
                                          border:
                                            "1px solid rgba(255, 255, 255, 0.3)",
                                        }}
                                      >
                                        {tag.trim()}
                                      </span>
                                    </Tooltip>
                                  ))}

                                {/* Show "+X more" if there are more than 3 tags */}
                                {(item.udTag || item.tudTag).split(",").length >
                                  3 && (
                                  <Tooltip
                                    title={`Additional tags: ${(
                                      item.udTag || item.tudTag
                                    )
                                      .split(",")
                                      .slice(3)
                                      .map((t) => t.trim())
                                      .join(", ")}`}
                                  >
                                    <span
                                      style={{
                                        backgroundColor:
                                          "var(--custom-theme-color, #191964)",
                                        color: "#ffffff",
                                        padding: "3px 8px",
                                        borderRadius: "20px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        border:
                                          "1px solid rgba(255, 255, 255, 0.3)",
                                        opacity: "0.6",
                                      }}
                                    >
                                      +
                                      {(item.udTag || item.tudTag).split(",")
                                        .length - 3}{" "}
                                      more
                                    </span>
                                  </Tooltip>
                                )}
                              </>
                            )}
                          </div>

                          {/* Last Updated Badge */}
                          <div style={{ marginBottom: "8px" }}>
                            <LastUpdatedBadge
                              udPublishedDate={item.udPublishedDate}
                            />
                          </div>

                          <div>
                            {hasActiveGuestSession ? (
                              <Tooltip title="Sign in to do this">
                                <button
                                  onClick={openiamintrest}
                                  className="primaryInterested"
                                  style={{
                                    backgroundColor: "#191964",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    boxShadow: "0px 3px 6px #000",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                  }}
                                >
                                  <FaLock style={{ fontSize: 10 }} />I am
                                  Interested
                                </button>
                              </Tooltip>
                            ) : (
                              <button
                                onClick={openiamintrest}
                                className="primaryInterested"
                                style={{
                                  backgroundColor: "#191964",
                                  color: "white",
                                  border: "none",
                                  cursor: "pointer",
                                  boxShadow: "0px 3px 6px #000",
                                }}
                              >
                                I am Interested
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Sponsor section - only show if tudSponsorName exists */}
                        {item.udSponsorName &&
                          item.udSponsorName.trim() !== "" &&
                          item.udSponsorImage &&
                          item.udSponsorImage != "" && (
                            <div
                              style={{
                                textAlign: "center",
                                marginLeft: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleSponsorClick(item.udSponsorName)
                              }
                            >
                              {item.udSponsorImage && (
                                <img
                                  src={getImageUrl(
                                    item.udSponsorImage,
                                    item.tudTempUdID
                                  )}
                                  alt="Sponsor"
                                  style={{
                                    maxWidth: "120px",
                                    maxHeight: "60px",
                                    marginBottom: "5px",
                                    objectFit: "fill",
                                    transition: "opacity 0.3s ease",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.target.style.opacity = "0.8")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.target.style.opacity = "1")
                                  }
                                />
                              )}
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: "#666",
                                  marginBottom: "0",
                                }}
                              >
                                Incubated / Supported By
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#191964",
                                  textDecoration: "underline",
                                }}
                              >
                                {item.udSponsorName}
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </section>
                <section className="container my-5">
                  <div
                    className="about-all shadow-lg p-5"
                    style={{
                      color: "white",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="row">
                      {/* Left Image Section */}
                      <div className="about-img col-md-4 d-flex justify-content-center align-items-center">
                        <div
                          className="bg-white"
                          style={{ borderRadius: "15px" }}
                        >
                          <img
                            // assets/images/unicorn-about-us
                            src="/assets/images/unicorn-about-us.png"
                            alt="Growth Illustration"
                            style={{
                              maxWidth: "100%",
                              borderRadius: "15px",
                              boxShadow: "0px 3px 6px #000",
                            }}
                          />
                        </div>
                      </div>

                      {/* Right Text Section */}
                      <div className="col-md-8 d-flex flex-column justify-content-center">
                        <p
                          className="about-text"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {item.udDealDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section
                  id="marketOverviewSection"
                  className="container my-5 market-overview-section alternate-section"
                  style={{ padding: "40px 20px", borderRadius: "12px" }}
                >
                  <h2 className="text-center mb-5">Market Overview</h2>
                  <div className="row market-overreview-row">
                    {item.udMark &&
                      JSON.parse(item.udMark).map((itemudMark, index) => (
                        <div
                          className="col-12 col-md-12 col-lg-4 col-xl-4 mb-4"
                          key={index}
                        >
                          <div className="market-overview-card">
                            <p>
                              {itemudMark.content1 || "Content not available"}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>

                <section id="highlightSection" className="container my-5">
                  <h2 className="text-center mb-4">Highlights</h2>
                  <div className="row">
                    {/* Highlight 1 */}

                    {item.udStartupHighlights &&
                      JSON.parse(item.udStartupHighlights).map(
                        (itemstartuphighlight, indexstartuphighlight) => {
                          console.log(itemstartuphighlight);

                          return (
                            <div className="col-md-6 mb-4">
                              <div
                                className="startup-highlight-card card p-4 shadow-sm h-100"
                                style={{
                                  backgroundColor: "#fff",
                                  borderRadius: "15px",
                                }}
                              >
                                <div
                                  className="d-flex"
                                  style={{ textAlign: "justify" }}
                                >
                                  <img
                                    src={`${process.env.PUBLIC_URL}/assets/images/deals-details/highlight2.jfif`}
                                    alt="Highlight Icon"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      borderRadius: "50%",
                                      marginRight: "15px",
                                      boxShadow: "0px 3px 6px #000",
                                    }}
                                  />
                                  <p>{itemstartuphighlight.content1}</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                </section>

                <section
                  id="mediaCoverageSection"
                  className="container my-5 media-coverage-section"
                >
                  {item.udMediaCoverageFiles &&
                    JSON.parse(item.udMediaCoverageFiles).length > 0 && (
                      <>
                        <h2 className="text-center mb-4">Media Coverage</h2>
                        <div className="row">
                          {JSON.parse(item.udMediaCoverageFiles).map(
                            (
                              itemudMediaCoverageFiles,
                              indexudMediaCoverageFiles
                            ) => (
                              <div
                                className="col-md-4 mb-4"
                                style={{ display: "flex" }}
                                key={indexudMediaCoverageFiles}
                              >
                                <div className="media-card">
                                  <img
                                    src={getImageUrl(
                                      itemudMediaCoverageFiles.imgname,
                                      item.tudTempUdID
                                    )}
                                    alt=""
                                    className="media-card-image"
                                  />
                                  <div className="media-card-content">
                                    <h5>{itemudMediaCoverageFiles.title}</h5>
                                    <p>
                                      {itemudMediaCoverageFiles.content}{" "}
                                      <a
                                        href={itemudMediaCoverageFiles.content}
                                        className="read-more-link"
                                      >
                                        Read More
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        {/* <div className="text-center mt-4">
                      <button className="load-more-btn">Load more</button>
                    </div> */}
                      </>
                    )}
                </section>

                <section className="container my-5">
                  <h2 className="text-center mb-3">Team</h2>
                  <div className="row row-box-linse Grid-team px-1 justify-content-center">
                    {item.udVendorId &&
                      JSON.parse(item.udVendorId).map(
                        (itemudVendorId, indexudVendorId) => (
                          <div className="col-md-6 mb-4" key={index}>
                            <div
                              className="shadow-lg"
                              style={{
                                borderRadius: "15px",
                                overflow: "hidden",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              {/* Header with Gradient Background */}
                              <div
                                className="team-member-header"
                                style={{
                                  color: "white",
                                  padding: "20px",
                                }}
                              >
                                <div className="d-flex align-items-center">
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}api/uploads/unicorndeals/${item.tudTempUdID}/${itemudVendorId.imgname}`}
                                    alt=""
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      marginRight: "15px",
                                      boxShadow: "0px 3px 6px #000",
                                    }}
                                  />
                                  <div>
                                    <h5 className="mb-0 text-white">
                                      {itemudVendorId.name ||
                                        "Name not provided"}
                                    </h5>
                                    <p className="mb-0 text-white">
                                      {itemudVendorId.Role ||
                                        "Role not specified"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Description Section */}
                              <div
                                className="p-3"
                                style={{
                                  height: "210px",
                                  textAlign: "justify",
                                }}
                              >
                                <p>
                                  {itemudVendorId.description1
                                    ? itemudVendorId.description1
                                    : "Description not available for this team member."}
                                </p>
                                <p>
                                  {itemudVendorId.description2
                                    ? itemudVendorId.description2
                                    : ""}
                                </p>
                                <div className="mt-3">
                                  <a
                                    href={itemudVendorId.linkedinUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icons__item"
                                    style={{ color: "#0A66C2" }}
                                  >
                                    <i className="bx bxl-linkedin fs-19"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </section>

                <section id="pitchDeck" className="container my-5">
                  {(() => {
                    // 1) Prefer new image-array field from backend (udPitchDeckImages)
                    const imagesField = item.udPitchDeckImages || "";
                    const pitchDeckImagesInfo = parsePitchDeckField(imagesField);

                    if (
                      pitchDeckImagesInfo.type === "images" &&
                      Array.isArray(pitchDeckImagesInfo.pages) &&
                      pitchDeckImagesInfo.pages.length
                    ) {
                      const imageUrls = getPitchDeckImageUrls(
                        pitchDeckImagesInfo.pages,
                        item.tudTempUdID
                      );

                      if (imageUrls.length) {
                        return (
                          <>
                            <h1
                              style={{
                                fontSize: 32,
                                marginBottom: 30,
                                textAlign: "center",
                                color: "#000",
                              }}
                            >
                              Investor Presentation
                            </h1>
                            <SinglePagePDFViewer imageUrls={imageUrls} />
                          </>
                        );
                      }
                    }

                    // 2) Fallback: if no converted images yet, use original PDF from udPitchDeck
                    if (
                      item.udPitchDeck &&
                      typeof item.udPitchDeck === "string" &&
                      item.udPitchDeck.trim() !== ""
                    ) {
                      return (
                        <>
                          <h1
                            style={{
                              fontSize: 32,
                              marginBottom: 30,
                              textAlign: "center",
                              color: "#000",
                            }}
                          >
                            Investor Presentation
                          </h1>
                          <SinglePagePDFViewer
                            pdf={getImageUrl(item.udPitchDeck, item.tudTempUdID)}
                          />
                        </>
                      );
                    }

                    // Nothing to show
                    return null;
                  })()}
                </section>

                <section id="productDeck" className="container my-5">
                  {(() => {
                    const imagesField = item.udProductDeckImages || "";
                    const productDeckImagesInfo = parsePitchDeckField(imagesField);

                    if (
                      productDeckImagesInfo.type === "images" &&
                      Array.isArray(productDeckImagesInfo.pages) &&
                      productDeckImagesInfo.pages.length
                    ) {
                      const imageUrls = getPitchDeckImageUrls(
                        productDeckImagesInfo.pages,
                        item.tudTempUdID
                      );
                      return (
                        <>
                          <h1
                            style={{
                              fontSize: 32,
                              marginBottom: 30,
                              textAlign: "center",
                              color: "#000",
                            }}
                          >
                            Product Presentation
                          </h1>
                          <SinglePagePDFViewer imageUrls={imageUrls} />
                        </>
                      );
                    }

                    if (
                      item.udProductDeck &&
                      typeof item.udProductDeck === "string" &&
                      item.udProductDeck.trim() !== ""
                    ) {
                      return (
                        <>
                          <h1
                            style={{
                              fontSize: 32,
                              marginBottom: 30,
                              textAlign: "center",
                              color: "#000",
                            }}
                          >
                            Product Presentation
                          </h1>
                          <SinglePagePDFViewer
                            pdf={getImageUrl(item.udProductDeck, item.tudTempUdID)}
                          />
                        </>
                      );
                    }

                    return null;
                  })()}
                </section>

                {item.udYoutubeLink && item.udYoutubeLink != "" && (
                  <section
                    id="videoSection"
                    className="container my-5 videos-section alternate-section"
                    style={{ padding: "40px 20px", borderRadius: "12px" }}
                  >
                    <h2 className="text-center mb-5">Videos</h2>
                    <div className="video-slide">
                      <iframe
                        style={{
                          boxShadow: "0px 3px 6px #000",
                          borderRadius: 3,
                        }}
                        width="100%"
                        height="435"
                        src={`https://www.youtube.com/embed/${extractVideoIDFromYoutubeUrl(
                          item.udYoutubeLink
                        )}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </section>
                )}

                <section
                  id="contactUsSection"
                  className="container my-5 contact-us-section"
                >
                  <h2 className="text-center mb-5">Contact Us</h2>
                  <div className="row mx-0">
                    {/* Contact Information Card */}
                    <div className="col-md-4 my-2">
                      <div className="contact-info-card">
                        <h2>Contact Information</h2>
                        <ul className="contact-info-list">
                          <li>
                            <i className="fas fa-phone"></i>
                            {/* udStartupFounderMobileNumber */}
                            {(item.udStartupFounderMobileCountryCode || "") +
                              item.udStartupFounderMobileNumber &&
                            item.udStartupFounderMobileNumber.length > 8
                              ? item.udStartupFounderMobileNumber.substring(
                                  0,
                                  2
                                ) +
                                "XXXXX" +
                                item.udStartupFounderMobileNumber.substring(7)
                              : item.udStartupFounderMobileNumber}
                          </li>
                          <li>
                            <i className="fas fa-envelope"></i>
                            {item.udStartupFounderEmail &&
                            item.udStartupFounderEmail.includes("@")
                              ? item.udStartupFounderEmail.substring(
                                  0,
                                  item.udStartupFounderEmail.indexOf("@") - 3
                                ) +
                                "***" +
                                "@" +
                                item.udStartupFounderEmail
                                  .substring(
                                    item.udStartupFounderEmail.indexOf("@") + 1
                                  )
                                  .replace(/[^.]+/, "***")
                              : item.udStartupFounderEmail}
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i>
                            {/* udAddress */}
                            {item.udAddress}
                          </li>
                        </ul>
                        <div className="social-icons d-flex justify-content-center">
                          {item.udSocialYouTube &&
                            item.udSocialYouTube != "" && (
                              <a
                                href={getAbsoluteUrl(item.udSocialYouTube)}
                                target="_blank"
                                className="social-icon"
                              >
                                <img
                                  src="/assets/logo/youtube.png"
                                  alt="YouTube"
                                  width="24"
                                  height="24"
                                />
                              </a>
                            )}
                          {item.udSocialInsta && item.udSocialInsta != "" && (
                            <a
                              href={getAbsoluteUrl(item.udSocialInsta)}
                              target="_blank"
                              className="social-icon"
                            >
                              <img
                                src="/assets/logo/instagram.png"
                                alt="Instagram"
                                width="24"
                                height="24"
                              />
                            </a>
                          )}
                          {item.udSocialFacebook &&
                            item.udSocialFacebook != "" && (
                              <a
                                href={getAbsoluteUrl(item.udSocialFacebook)}
                                target="_blank"
                                className="social-icon"
                              >
                                <img
                                  src="/assets/logo/facebook.png"
                                  alt="Facebook"
                                  width="24"
                                  height="24"
                                />
                              </a>
                            )}
                          {item.udSocialLinkedIn &&
                            item.udSocialLinkedIn != "" && (
                              <a
                                href={getAbsoluteUrl(item.udSocialLinkedIn)}
                                target="_blank"
                                className="social-icon"
                              >
                                <img
                                  src="/assets/logo/linkedin.png"
                                  alt="Linkedin"
                                  width="24"
                                  height="24"
                                />
                              </a>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="col-md-8 center-class my-2  ">
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="company-info-list">
                            <li>
                              <span>Legal Name</span>
                              <p>{item.udLegalname}</p>
                            </li>

                            <li>
                              <span>Website</span>
                              <p>
                                <a
                                  href={
                                    item.udWebsite
                                      ? getAbsoluteUrl(item.udWebsite)
                                      : "#"
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {/* udWebsite */}
                                  {item.udWebsite}
                                </a>
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="company-info-list">
                            <li>
                              <span>Founded</span>
                              <p>
                                {item.udFoundedon
                                  ? moment(item.udFoundedon).format(
                                      "DD-MM-YYYY"
                                    )
                                  : ""}
                              </p>
                            </li>

                            <li>
                              <span>Employees</span>
                              <p>{item.udEmployees}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="container text-section">
                  <div className="row">
                    <div className="col-md-12 text-center my-5">
                      {hasActiveGuestSession ? (
                        <Tooltip title="Sign in to do this">
                          <button
                            onClick={openiamintrest}
                            className="primaryInterested"
                            style={{
                              backgroundColor: "#191964",
                              color: "white",
                              border: "none",
                              cursor: "pointer",
                              boxShadow: "0px 3px 6px #000",
                              display: "inline-flex", // keep button itself inline for centering
                              alignItems: "center", // center icon + text vertically
                              justifyContent: "center",
                              gap: "6px",
                            }}
                          >
                            <FaLock style={{ fontSize: 10 }} />I am Interested
                          </button>
                        </Tooltip>
                      ) : (
                        <button
                          onClick={openiamintrest}
                          className="primaryInterested"
                          style={{
                            // height: "100%",
                            backgroundColor: "#191964",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0px 3px 6px #000",
                          }}
                        >
                          I am Interested
                        </button>
                      )}
                    </div>
                  </div>
                </section>
              </>
            );
          })}
      {isLightboxOpen && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxInitialIndex}
          isOpen={isLightboxOpen}
          onClose={handleLightboxClose}
        />
      )}
      <Modal
        // title={`Invest in ${this.state.deal_name}`}
        visible={iamintrestmodal}
        onOk={() => {
          setiamintrestmodal(false);
        }}
        onCancel={() => {
          setiamintrestmodal(false);
          setdata({
            "I Want to know more about it": false,
            "I want to work with you": false,
            "I am excited to invest in your startups": false,
            message: "",
          });
          setmessage("");
        }}
        width={900}
        footer={false}
      >
        {/* <section
          class="about-page-section blog-section payment-sec pb-0"
          style={{ paddingBottom: "0px !important" }}
        > */}
        {/* <div class="container"> */}
        <div class="row">
          <div
            class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center"
            style={{ pointerEvents: "none" }}
          ></div>
        </div>
        <div className="row  justify-content-center ">
          <div className="col-md-8 col-12 col-sm-8 col-xl-8 col-xxl-8">
            <div className="card-payment-methods">
              <div class="heading-title m-sm-0">
                <p>
                  <span></span>{" "}
                </p>
                <h2>Type of Interest</h2>
              </div>
              <div className="para-proceed">
                <form action="" className="form-checkbox">
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                      <input
                        type="radio"
                        name="I Want to know more about it"
                        value={data["I Want to know more about it"]}
                        checked={data["I Want to know more about it"] == true}
                        onClick={adddata}
                      />
                      <label style={{ cursor: "pointer" }} onClick={() => { setdata({ "I Want to know more about it": true }) }} htmlFor="">
                        I want to know more about your startup
                      </label>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                      <input
                        type="radio"
                        name="I want to work with you"
                        value={data["I want to work with you"]}
                        checked={data["I want to work with you"] == true}
                        onClick={adddata}
                      />
                      <label style={{ cursor: "pointer" }} onClick={() => { setdata({ "I want to work with you": true }) }} htmlFor="">I want to explore collaboration </label>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-2">
                      <input
                        type="radio"
                        name="I am excited to invest in your startups"
                        value={data["I am excited to invest in your startups"]}
                        checked={
                          data["I am excited to invest in your startups"] ==
                          true
                        }
                        onClick={adddata}
                      />
                      <label style={{ cursor: "pointer" }} htmlFor="" onClick={() => { setdata({ "I am excited to invest in your startups": true }) }} >
                        I am interested to invest in your startup
                      </label>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mt-2">
                      <textarea
                        value={message}
                        name="message"
                        onChange={(e) => {
                          setmessage(e.target.value);
                        }}
                        id="w3review"
                        rows="4"
                        className="w100"
                        placeholder="Message"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="button-proceed-online">
                <a style={{ color: "white" }} onClick={submitintrest}>
                  Submit
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </section> */}
      </Modal>
      <ToastContainer />
      <NewWebFooter />
    </div>
    </>
  );
};
