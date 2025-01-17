import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set the worker source globally
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.279/pdf.worker.min.js`;

export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Handler for successful document load
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Change page based on offset
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  // Go to the previous page
  function previousPage() {
    changePage(-1);
  }

  // Go to the next page
  function nextPage() {
    changePage(1);
  }

  const { pdf } = props;

  return (
    <>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
