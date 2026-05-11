import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PDFJS = window.pdfjsLib;
// Set the worker source globally

export default function SinglePage(props) {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [image, setImage] = useState([]);
  const [pdfRendering, setPdfRendering] = useState(true);

  const { pdf, useOldStyle, imageUrls } = props;

  // Slider settings matching Deal pages
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  let getPage = (pdf, num) => {
    return new Promise((resolve, reject) => {
      pdf.getPage(num).then((page) => {
        const scale = "1.5";
        const viewport = page.getViewport({
          scale: scale,
        });
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");
        canvas.height =
          viewport.height || viewport.viewBox[3]; /* viewport.height is NaN */
        canvas.width =
          viewport.width ||
          viewport.viewBox[2]; /* viewport.width is also NaN */
        page
          .render({
            canvasContext,
            viewport,
          })
          .promise.then((res) => {
            resolve(canvas.toDataURL());
          });
      });
    });
  };

  async function showPdf(event) {
    try {
      const imagesList = [];
      PDFJS.getDocument(pdf).promise.then(async (pdf) => {
        console.log(pdf);
        setTotalPages(pdf.numPages);
        for (let i = 0; i < pdf.numPages; i++) {
          let img = await getPage(pdf, i + 1);
          imagesList.push(img);
        }
        console.log(imagesList);
        setImage(imagesList);
        setPdfRendering(false);
      });
    } catch (error) {
      console.log(error);
      setPdfRendering(false);
    }
  }

  useEffect(() => {
    // If imageUrls are provided explicitly, use them instead of rendering from PDF
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      setImage(imageUrls);
      setTotalPages(imageUrls.length);
      setPdfRendering(false);
      return;
    }

    // Fallback: original behavior, render images from PDF
    if (pdf) {
      showPdf();
    }
  }, [pdf, imageUrls]);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <style>
        {`
          .pitch-slider .slick-prev,
          .pitch-slider .slick-next {
            width: 40px;
            height: 40px;
            z-index: 1;
          }
          
          .pitch-slider .slick-prev {
            padding-left: 10px;
          }
          
          .pitch-slider .slick-next {
            padding-left: 20px;
          }
          
          .pitch-slider .slick-prev:before,
          .pitch-slider .slick-next:before {
            font-size: 40px;
            opacity: 0.75;
            color: #333;
          }
          
          .pitch-slider .slick-prev:hover:before,
          .pitch-slider .slick-next:hover:before {
            opacity: 1;
          }
          
          .pitch-slider .slick-disabled {
            cursor: not-allowed !important;
          }
          
          .pitch-slider .slick-disabled:before {
            opacity: 0.5 !important;
            color: #ccc !important;
          }
          
          .pitch-slider .slick-disabled:hover:before {
            opacity: 0.5 !important;
          }
          
          .pitch-slider {
            background: transparent !important;
          }
          
          .pitch-slider .slick-list,
          .pitch-slider .slick-track {
            background: transparent !important;
          }
          
          .pitch-slider img {
            display: block;
            margin: 0 auto;
            background: transparent !important;
            width: 100%;
            height: auto;
          }
          
          /* Tablet responsive styles */
          @media (max-width: 992px) {
            .pitch-slider .slick-prev,
            .pitch-slider .slick-next {
              width: 35px;
              height: 35px;
            }
            
            .pitch-slider .slick-prev {
              left: -40px;
              padding-left: 5px;
            }
            
            .pitch-slider .slick-next {
              right: -24px;
              padding-left: 15px;
            }
            
            .pitch-slider .slick-prev:before,
            .pitch-slider .slick-next:before {
              font-size: 35px;
            }
          }
          
          /* Mobile responsive styles */
          @media (max-width: 768px) {
            .pitch-slider .slick-prev,
            .pitch-slider .slick-next {
              width: 30px;
              height: 30px;
            }
            
            .pitch-slider .slick-prev {
              left: -32px;
              padding-left: 0;
            }
            
            .pitch-slider .slick-next {
              right: -32px;
              padding-left: 0;
            }
            
            .pitch-slider .slick-prev:before,
            .pitch-slider .slick-next:before {
              font-size: 30px;
            }
            
            .pitch-slider img {
              max-width: 100%;
              object-fit: contain;
            }
          }
          
          /* Extra small mobile screens */
          @media (max-width: 480px) {
            .pitch-slider .slick-prev,
            .pitch-slider .slick-next {
              width: 25px;
              height: 25px;
            }
            
            .pitch-slider .slick-prev {
              left: -40px;
            }
            
            .pitch-slider .slick-next {
              right: -40px;
            }
            
            .pitch-slider .slick-prev:before,
            .pitch-slider .slick-next:before {
              font-size: 25px;
            }
          }
        `}
      </style>
      {!pdfRendering ? (
        <>
          {useOldStyle ? (
            <>
              <img style={{ width: "100%" }} src={image[currentPage - 1]} />
              <div>
                <p className="text-white mb-2 font-weight-bold">
                  Page {currentPage || "--"} of {totalPages || "--"}
                </p>
                <button
                  style={{ minWidth: "25%" }}
                  className="btn btn-info text-white mr-1"
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={previousPage}
                >
                  Previous
                </button>
                <button
                  style={{ minWidth: "25%", marginLeft: "1rem" }}
                  className="btn btn-info text-white mr-1"
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <Slider {...sliderSettings} className="mb-5 pitch-slider">
              {image.map((img, index) => (
                <div key={index}>
                  <img
                    style={{ width: "100%" }}
                    src={img}
                    alt={`Page ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <div className={`spinner-border ${useOldStyle ? 'text-light' : 'text-primary'}`} role="status">
            <span className="sr-only">Loading PDF...</span>
          </div>
          <p className="mt-3" style={{ color: useOldStyle ? "#fff" : "#000" }}>Loading Presentation...</p>
        </div>
      )}
    </>
  );
}
