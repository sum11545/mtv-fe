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
import { mainArr } from "../../data/homeData";
import { useMain } from "@/context/MainContext";

const SliderCard = ({ short, sectionIndex, id, sectionData, styles }) => {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("recently");
  const [mounted, setMounted] = useState(false);
  // const height = styles.height;
  // const width = styles.width;

  const { contentConfigurations } = useMain();

  // Finding the content type and then applying height and width according to configuration
  const layout = contentConfigurations?.find(
    (item) => item.label == short?.content_details[0]?.content_type
  );

  let height = layout?.layout?.height;
  let width = layout?.layout?.width;

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
    // Find the section this short belongs to
    const section = sectionData.find((s, index) => {
      if (typeof sectionIndex === "number") {
        return index === sectionIndex;
      }
      return s.type === "shorts";
    });

    if (section) {
      router.push(`/${section.slug}/${short.id}`);
    }
  };

  return (
    <Card
      sx={{
        // width: 250,
        // height: height && {
        //   lg: height.lg,
        //   md: height.md,
        //   xl: height.xl,
        //   xs: height.xs,
        // },
        // width: width && {
        //   lg: width.lg,
        //   md: width.md,
        //   xl: width.xl,
        //   xs: width.xs,
        // },
        // height: 400,
        // aspectRatio: 9 / 16,
        // display: "flex",
        // flexDirection: "column",

        width: width && {
          lg: width.lg,
          md: width.md,
          sm: width.sm,
          xs: width.xs,
        },
        height: height && {
          lg: height.lg,
          md: height.md,
          sm: height.sm,
          xs: height.xs,
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
          image={short?.content_details[0]?.thumbnail_url}
          alt={short.title}
          sx={{
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
            p: 1.5,
            color: "white",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              mb: 0.5,
            }}
          >
            {/* {short.title} */}
          </Typography>
          {/* <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption">
              {new Intl.NumberFormat("en-US", { notation: "compact" }).format(
                short.views
              )}{" "}
              views
            </Typography>
            <Typography variant="caption">•</Typography>
            <Typography variant="caption">{formattedDate}</Typography>
          </Stack> */}
        </Box>
      </Box>
    </Card>
  );
};

export default SliderCard;
