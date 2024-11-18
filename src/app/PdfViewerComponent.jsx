import { useEffect, useRef, useState } from 'react';

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit, instance;

    // Extract the file extension from either a URL or a local path
    const fileType = props.document.split('.').pop().toLowerCase();

    if (fileType === 'pdf') {
      // Load PSPDFKit for PDF documents
      (async function () {
        try {
          PSPDFKit = await import('pspdfkit');

          PSPDFKit.unload(container); // Unload any previous instance

          instance = await PSPDFKit.load({
            container,
            document: props.document, // This could be a URL or a local file path
            baseUrl: `${window.location.protocol}//${window.location.host}/`,
          });
        } catch (e) {
          setError('Failed to load PDF document.');
        }
      })();
    }

    return () => {
      PSPDFKit && PSPDFKit.unload(container);
    };
  }, [props.document]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {props.document.split('.').pop().toLowerCase() === 'pdf' ? (
        <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
      ) : (
       ""
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
