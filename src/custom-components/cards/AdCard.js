import {
  CardContent,
  CardMedia,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";

const AdCard = ({ ad }) => {
  const theme = useTheme();
  let adType = ad.content_details[0].content_type_id;

  const adRedirection = (url) => {
    window.open(url, "_blank");
  };

  switch (adType) {
    case 21:
      // Ad type is ad-video
      return (
        <CardMedia
          sx={{ background: "green", height: "100%", width: "100%" }}
          component="img"
          image={ad.content_details[0].thumbnail_url}
          alt="Ad image"
        />
      );
    case 22:
      // Ad type is ad-image
      return (
        <CardMedia
          sx={{ background: "blue", height: "100%", width: "100%" }}
          component="img"
          image={ad.content_details[0].thumbnail_url}
          poster={ad.content_details[0].thumbnail_url}
          controls
        />
      );
    case 10:
      // Ad type is ad-text
      return (
        <CardContent
          sx={{
            background: "#FFDA93",
            height: "100%",
            width: "100%",
            display: "flex",
            gap: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.1,
              color: theme.palette.custom.adText,
              fontSize: "0.875rem",
            }}
          >
            {ad.content_details[0].description}
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            size="small"
            endIcon={<ChevronRightIcon />}
            onClick={() => adRedirection(ad.content_details[0]?.url)}
            sx={{
              width: "fit-content",
              textTransform: "none",
              px: 2,
              borderRadius: 2,
              fontSize: "0.9rem",
              color: theme.palette.custom.adText,
              borderColor: theme.palette.custom.adText,
              "&:hover": {
                borderColor: theme.palette.custom.adText,
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Learn More
          </Button>
        </CardContent>
      );
    default:
      return <></>;
  }
};

export default AdCard;
