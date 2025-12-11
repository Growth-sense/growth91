import React from "react";
import { Helmet } from "react-helmet-async";

export default function HelmetPageDescription({
  title,
  description,
  image,
  keywords,
}) {
  return (
    <Helmet>
      {title && <title>{title}</title>}

      {title && (
        <meta name="title" property="og:title" content={title} />
      )}
      {title && (
        <meta name="twitter:title" content={title} />
      )}

      {description && (
        <meta
          name="description"
          property="og:description"
          content={description}
        />
      )}
      {description && (
        <meta
          name="twitter:description"
          content={description}
        />
      )}

      {image && (
        <meta name="image" property="og:image" content={image} />
      )}
      {image && (
        <meta name="twitter:image" content={image} />
      )}

      {keywords && (
        <meta name="keywords" content={keywords} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Growth91" />
      <meta name="twitter:site" content="@Growth91" />
    </Helmet>
  );
}