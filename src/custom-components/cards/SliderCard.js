import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMain } from "@/context/MainContext";
import { fontSize, fontStyles } from "@/theme/theme";

const SliderCard = ({ short, sectionIndex, id, sectionData }) => {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("recently");
  const [mounted, setMounted] = useState(false);

  let isShort = short?.content_details[0]?.content_type_id == "CTSR"; // CTSR  is for shorts.

  const getThumbnailUrl = () => {
    const details = short?.content_details?.[0];
    if (!details || details.platform !== "PY")
      return "/images/404-not-found.jpg";

    const url = details.url;
    let videoId = "";

    try {
      const youtubeRegex =
        /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
      const match = url.match(youtubeRegex);
      const videoId = match?.[1] ?? "";
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : "/images/404-not-found.jpg";
    } catch (err) {
      return "/images/404-not-found.jpg";
    }
  };
  useEffect(() => {
    setMounted(true);
    try {
      const date = formatDistanceToNow(new Date(short.uploadDate), {
        addSuffix: true,
      });
      setFormattedDate(date);
    } catch (error) {
      setFormattedDate("recently");
    }
  }, [short.uploadDate]);

  const handleCardClick = () => {
    // if video type is ad then don't redirect it to any ad url
    if (short?.type == "ad_content") {
      window.open(short.content_details[0]?.cta_url, "_blank");
    } else {
      // If content type is short then i am redirecting it to static shorts/id page i.e. short detail page
      if (isShort) {
        let shortId = short?.id;
        router.push(`/shorts/${shortId}`);
      } else {
        // If content type is not short then i am redirecting it to dynamic section/contentId page i.e. video detail page

        // Find the section this short belongs to
        const section = sectionData?.sections?.find((s, index) => {
          if (typeof sectionIndex === "number") {
            return index === sectionIndex;
          }
          return s.type === "shorts";
        });

        if (section) {
          router.push(`/${section.slug}/${short.id}`);
        }
      }
    }
  };

  return (
    <>
      <Card
        sx={{
          width: {
            xl: "326px",
            lg: "210px",
            md: "230px",
            sm: "194px",
            xs: "194px",
          },
          height: {
            xl: "580px",
            lg: "380px",
            md: "380px",
            sm: "345px",
            xs: "345px",
          },
          borderRadius: 3,
          "&:hover": {
            cursor: "pointer",
            // transform: "scale(1.02)",
            // transition: "transform 0.2s ease-in-out",
          },
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          <CardMedia
            component="img"
            image={getThumbnailUrl()}
            alt={short.title}
            sx={{
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Card>
    </>
  );
};

export default SliderCard;
