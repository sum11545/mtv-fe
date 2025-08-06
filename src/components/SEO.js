import Head from "next/head";
import { useRouter } from "next/router";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  videoData = null,
  sectionData = null,
}) => {
  const router = useRouter();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.moneytv.live";

  // Default SEO values
  const defaultTitle =
    "MoneyTV India: Financial Education, Investing, and Wealth Creation";
  const defaultDescription =
    "MoneyTV is your go-to source for financial education and live content on money, investing, and wealth creation in India. Tune into our live shows and podcasts for actionable insights on personal finance, stocks, mutual funds, and more. Our mission is to help you become financially literate and build a richer life.";
  const defaultKeywords =
    "Financial education, investing, personal finance, wealth creation, money management, stock market India, mutual funds India, financial literacy, business news India, entrepreneurship, live shows, podcasts, webinars, financial advice India";
  const defaultImage = `${baseUrl}/about/img/shared_image.jfif`;

  // Use provided values or defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || `${baseUrl}${router.asPath}`;

  // Generate structured data for video pages
  const generateVideoStructuredData = () => {
    if (!videoData) return null;

    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: videoData.title || seoTitle,
      description: videoData.description || seoDescription,
      thumbnailUrl: videoData.thumbnail || seoImage,
      contentUrl: videoData.video_url,
      publisher: {
        "@type": "Organization",
        name: "Money TV",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/logos/header-logo-dark.png`,
        },
      },
    };
  };

  // Generate structured data for section pages
  const generateSectionStructuredData = () => {
    if (!sectionData) return null;

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: sectionData.name || seoTitle,
      description: sectionData.description || seoDescription,
      url: seoUrl,
      publisher: {
        "@type": "Organization",
        name: "Money TV",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/logos/header-logo-dark.png`,
        },
      },
    };
  };

  const structuredData = videoData
    ? generateVideoStructuredData()
    : sectionData
    ? generateSectionStructuredData()
    : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Money TV" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Money TV" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
};

export default SEO;
