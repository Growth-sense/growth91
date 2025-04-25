import React, { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

const PDFJS = window.pdfjsLib;
// Set the worker source globally

export default function SinglePage(props) {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [image, setImage] = useState([]);
  const [pdfRendering, setPdfRendering] = useState(true);

  const { pdf } = props;

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
        const pages = [];
        // this.pdf = pdf;
        for (let i = 0; i < pdf.numPages; i++) {
          let img = await getPage(pdf, i + 1);
          imagesList.push(img);
        }
        console.log(imagesList);
        setImage(imagesList);
      });
      setPdfRendering(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    showPdf();
  }, []);

  let previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {!pdfRendering ? (
        <>
          <img style={{ width: "100%" }} src={image[currentPage - 1]} />

          <div>
            <p class="text-white mb-2 font-weight-bold">
              Page {currentPage || "--"} of {totalPages || "--"}
            </p>
            <button
            style={{minWidth: "25%"}}
              class="btn btn-info text-white mr-1"
              type="button"
              disabled={currentPage <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
            style={{minWidth: "25%", marginLeft:"1rem"}}
              class="btn btn-info text-white mr-1"
              type="button"
              disabled={currentPage >= totalPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </>
      ):
      <div>
        Loading PDF
      </div>
      }
    </>
  );
}
