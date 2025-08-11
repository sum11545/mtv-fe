const Sitemap = () => {
  return null;
};

// Helper function to HTML-escape special characters
const escapeHtml = (str) => {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

// Helper function to retry API calls
const retryApiCall = async (apiCall, maxRetries = 2, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.warn(
        `API call failed, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export const getServerSideProps = async ({ res }) => {
  // Use the correct website URL for the sitemap
  const baseUrl = "https://www.moneytv.live";

  // Static URLs array
  const staticUrls = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "1.0",
      images: [],
    },
    {
      loc: `${baseUrl}/search`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "0.8",
      images: [],
    },
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.3",
      images: [],
    },
    {
      loc: `${baseUrl}/terms-of-use`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.3",
      images: [],
    },
    {
      loc: `${baseUrl}/help`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.5",
      images: [],
    },
  ];

  // Fetch dynamic data for sitemap
  const fetchDynamicData = async () => {
    try {
      const axiosInstance = (await import("axios")).default.create({
        baseURL:
          process.env.NEXT_PUBLIC_API_BASE_URL || "https://moneytv.live/api/v1",
        timeout: 5000, // 5 seconds for faster response
      });

      // Use Set to avoid duplicate URLs
      const urlSet = new Set();

      // Fetch home page data to get all sections
      const homeResponse = await retryApiCall(() =>
        axiosInstance.get("/homePageContents")
      );
      const sections = homeResponse?.data?.response?.sections || [];

      const dynamicUrls = [];

      // Process each section
      for (const section of sections) {
        if (section.slug && section.type !== "ads") {
          // Add section page URL
          const sectionUrl = `${baseUrl}/${section.slug}`;
          if (!urlSet.has(sectionUrl)) {
            urlSet.add(sectionUrl);
            dynamicUrls.push({
              loc: sectionUrl,
              lastmod: new Date().toISOString(),
              changefreq: "daily",
              priority: "0.8",
              images: [],
            });
          }

          try {
            // Fetch detailed data for each section to get all videos
            const sectionResponse = await retryApiCall(() =>
              axiosInstance.get(`/sectionPage/${section.slug}`)
            );
            const sectionData = sectionResponse?.data?.response?.sections || [];

            // Process all sections from the section page response
            for (const sectionItem of sectionData) {
              if (sectionItem.contents && Array.isArray(sectionItem.contents)) {
                for (const video of sectionItem.contents) {
                  try {
                    if (video.id) {
                      const videoImages = [];

                      // Add video thumbnail if available
                      if (video.thumbnailUrl) {
                        videoImages.push({
                          loc: video.thumbnailUrl,
                          title: escapeHtml(
                            video.name || video.title || "Video Thumbnail"
                          ),
                          caption: escapeHtml(
                            video.description ||
                              video.name ||
                              video.title ||
                              "Video Thumbnail"
                          ),
                        });
                      }

                      // Get the org_guest_url path
                      const orgGuestPath =
                        video.org_guest_url && video.org_guest_url !== "/"
                          ? video.org_guest_url.replace(/^\/|\/$/g, "")
                          : "";

                      // Check if it's a short video using content_type_id
                      const isShortVideo =
                        video.content_details &&
                        video.content_details.length > 0 &&
                        video.content_details[0].content_type_id === "CTSR";

                      if (isShortVideo) {
                        // For shorts, include guest name and organization in the URL path
                        let shortUrl = `${baseUrl}/shorts/${section.slug}`;

                        // Add org_guest_path if it exists
                        if (orgGuestPath) {
                          shortUrl += `/${orgGuestPath}`;
                        }

                        // Add video ID
                        shortUrl += `/${video.id}`;

                        if (!urlSet.has(shortUrl)) {
                          urlSet.add(shortUrl);
                          dynamicUrls.push({
                            loc: shortUrl,
                            lastmod: new Date().toISOString(),
                            changefreq: "weekly",
                            priority: "0.7",
                            images: videoImages,
                          });
                        }
                      } else {
                        // For regular videos, create URLs for each language version
                        if (
                          video.content_details &&
                          video.content_details.length > 0
                        ) {
                          for (const contentDetail of video.content_details) {
                            try {
                              if (
                                contentDetail.language &&
                                contentDetail.language.id
                              ) {
                                let videoUrl = `${baseUrl}/${section.slug}`;

                                // Add org_guest_path if it exists
                                if (orgGuestPath) {
                                  videoUrl += `/${orgGuestPath}`;
                                }

                                // Add video ID
                                videoUrl += `/${video.id}`;

                                // Add language parameter
                                videoUrl += `?language=${contentDetail.language.id}`;

                                if (!urlSet.has(videoUrl)) {
                                  urlSet.add(videoUrl);
                                  dynamicUrls.push({
                                    loc: videoUrl,
                                    lastmod: new Date().toISOString(),
                                    changefreq: "weekly",
                                    priority: "0.7",
                                    images: videoImages,
                                  });
                                }
                              }
                            } catch (contentError) {
                              console.error(
                                `Error processing content detail for video ${video.id}:`,
                                contentError
                              );
                              // Continue with next content detail
                            }
                          }
                        } else {
                          // Fallback if no content_details available
                          let videoUrl = `${baseUrl}/${section.slug}`;

                          if (orgGuestPath) {
                            videoUrl += `/${orgGuestPath}`;
                          }

                          videoUrl += `/${video.id}`;
                          videoUrl += `?language=LEN`; // Default to English

                          if (!urlSet.has(videoUrl)) {
                            urlSet.add(videoUrl);
                            dynamicUrls.push({
                              loc: videoUrl,
                              lastmod: new Date().toISOString(),
                              changefreq: "weekly",
                              priority: "0.7",
                              images: videoImages,
                            });
                          }
                        }
                      }
                    }
                  } catch (videoError) {
                    console.error(
                      `Error processing video ${video?.id || "unknown"}:`,
                      videoError
                    );
                    // Continue with next video
                  }
                }
              }
            }
          } catch (sectionError) {
            console.error(
              `Error fetching section data for ${section.slug}:`,
              sectionError
            );
            // Continue with other sections even if one fails
          }
        }
      }

      return dynamicUrls;
    } catch (error) {
      console.error("Error fetching dynamic data for sitemap:", error);
      return [];
    }
  };

  // Get dynamic URLs and merge with static URLs
  const dynamicUrls = await fetchDynamicData();
  const allUrls = [...staticUrls, ...dynamicUrls];

  // Generate sitemap XML by mapping over the combined array
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${allUrls
          .map(
            (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.images
              .map(
                (image) => `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
    </image:image>`
              )
              .join("")}
  </url>`
          )
          .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
