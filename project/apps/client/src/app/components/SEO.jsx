import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = () => {
  const { pathname } = useLocation();
  const baseUrl = "https://growth91.com";
  
  // Clean URL - remove trailing slash except for homepage
  const canonicalUrl = `${baseUrl}${pathname === '/' ? '' : pathname}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
