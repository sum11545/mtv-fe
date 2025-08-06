import {
  CardContent,
  CardMedia,
  Typography,
  Button,
  useTheme,
  Box,
  useMediaQuery,
} from "@mui/material";
import { fontStyles, fontSize } from "@/theme/theme";

const AdCard = ({ ad }) => {
  const theme = useTheme();
  let adType = ad.content_details[0].content_type_id;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const adRedirection = (url) => {
    window.open(url, "_blank");
  };

  switch (adType) {
    case "ATV":
      // Ad type is ad-video
      return (
        <CardMedia
          sx={{
            background: "green",
            height: "100%",
            width: "100%",
          }}
          component="img"
          image={ad.content_details[0].thumbnail_url}
          alt="Ad image"
        />
      );
    case "ATI":
      // Ad type is ad-image
      return (
        <CardMedia
          sx={{
            background: "blue",
            height: "100%",
            width: "100%",
          }}
          component="img"
          image={ad.content_details[0].thumbnail_url}
          poster={ad.content_details[0].thumbnail_url}
          controls
          alt="Ad image"
        />
      );
    case "ATT":
      // Ad type is ad-text
      return (
        <CardContent
          sx={{
            background: "#FFDA93",
            height: "100%",
            width: "100%",
            padding: "1.2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "&:last-child": {
              paddingBottom: "1.2rem",
            },
          }}
        >
          <Typography
            variant="adDescription"
            sx={{
              lineHeight: 1.1,
              color: theme.palette.custom.adText,
              ...fontStyles.montserrat.bold,
            }}
          >
            {ad.content_details[0].description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: !isMobile ? "row" : "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* not showing sponsor name inside card in mobile device */}
            {!isMobile && (
              <Typography
                variant="adSponsored"
                sx={{
                  lineHeight: 1.1,
                  color: theme.palette.custom.adText,
                  ...fontStyles.montserrat.regular,
                  fontStyle: "italic",
                }}
              >
                {ad.content_details[0].sponsor_name}
              </Typography>
            )}
            <Button
              variant={isMobile ? "text" : "outlined"}
              color="primary"
              size="medium"
              onClick={() => adRedirection(ad.content_details[0]?.cta_url)}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.common.black,
                  color: theme.palette.common.white,
                  borderColor: theme.palette.common.black,
                },
                textTransform: "none",
                color: theme.palette.common.black,
                borderColor: theme.palette.custom.adText,
                ...fontStyles.sfPro.display.bold,
                width: {
                  xl: "226px",
                  lg: "180px",
                },
                typography: "adLearnMoreLabel",
              }}
            >
              {ad.content_details[0]?.cta_label}
            </Button>
          </Box>
        </CardContent>
      );
    default:
      return <></>;
  }
};

export default AdCard;
