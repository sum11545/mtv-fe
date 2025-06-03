import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { Reply, WhatsApp } from "@mui/icons-material";
import { useRouter } from "next/router";
import ShareDialog from "../ShareDialog";
import CopyButton from "../CopyButton";
import { useMain } from "@/context/MainContext";
import AdCard from "./AdCard";
import { fontStyles, fontSize } from "../../theme/theme";

const ActionButton = ({ icon, label, onClick, isReversed = false }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0,
      borderRadius: 1,
      cursor: "pointer",
      padding: "4px 8px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        // backgroundColor: "rgba(0, 0, 0, 0.04)",
        "& .MuiTypography-root, & .MuiSvgIcon-root": {
          color: "grey.700",
        },
      },
    }}
    onClick={onClick}
  >
    {isReversed ? (
      <>
        <Typography
          variant="caption"
          sx={{
            color: "grey.500",
            fontSize: fontSize.typography.caption,
            userSelect: "none",
            mr: 0.5,
            transition: "color 0.2s ease-in-out",
            ...fontStyles.sfPro.condensed.regular,
          }}
        >
          {label}
        </Typography>
        {React.cloneElement(icon, {
          sx: {
            ...icon.props.sx,
            color: "grey.500",
            transition: "color 0.2s ease-in-out",
          },
        })}
      </>
    ) : (
      <>
        {React.cloneElement(icon, {
          sx: {
            ...icon.props.sx,
            color: "grey.500",
            transition: "color 0.2s ease-in-out",
          },
        })}
        <Typography
          variant="caption"
          sx={{
            color: "grey.500",
            fontSize: fontSize.typography.caption,
            userSelect: "none",
            ml: 0.5,
            transition: "color 0.2s ease-in-out",
            ...fontStyles.sfPro.condensed.regular,
          }}
        >
          {label}
        </Typography>
      </>
    )}
  </Box>
);

const GridCard = ({ video, id, sectionData, section, styles }) => {
  const router = useRouter();
  const [shareUrl, setShareUrl] = useState("");
  const { contentConfigurations } = useMain();
  let isAd = [10, 21, 22].includes(video?.content_details[0]?.content_type_id);

  // Finding the content type id and then applying height and width according to configuration
  const layout = contentConfigurations?.find(
    (item) => item.content_type_id == video?.content_details[0]?.content_type_id
  );

  // let height = layout?.layout?.height;
  // let width = layout?.layout?.width;

  const height = styles.height;
  const width = styles.width;

  useEffect(() => {
    // Set share URL only after component mounts on client side
    setShareUrl(window.location.href);
  }, []);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation(); // Prevent card click event
    setShareDialogOpen(true);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation(); // Prevent card click event
    const text = encodeURIComponent(
      `${video.content_details[0].url}\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCardClick = () => {
    // Find the section this video belongs to
    console.log(section?.slug);
    // If we're in a section list page, use the section prop directly
    if (section?.slug) {
      router.push(`/${section.slug}/${video.id}`);
      return;
    }

    // If we're in the home page, find the section from sectionData
    const foundSection = sectionData.find((s, index) => {
      if (typeof id === "number") {
        return index === id;
      }
      return s.contents?.some((v) => v.id === video.id);
    });

    if (foundSection) {
      router.push(`/${foundSection.slug}/${video.id}`);
    }
  };

  return (
    <>
      <Card
        sx={{
          // width: "100%",
          // height: "100%",

          display: "flex",
          flexDirection: "column",
          "&:hover": {
            cursor: "pointer",
          },
          border: "none",
          boxShadow: "none",
          borderRadius: 0,
          background: "none",
        }}
        onClick={handleCardClick}
      >
        <Box
          sx={{
            // position: "relative",
            // paddingTop: "56.25%",
            // overflow: "hidden",
            width: width && {
              lg: width?.lg,
              md: width?.md,
              sm: width?.sm,
              xs: width?.xs,
            },
            height: height && {
              lg: height?.lg,
              md: height?.md,
              sm: height?.sm,
              xs: height?.xs,
            },
          }}
        >
          {/* if my content is ad then i am showing ad card */}
          {isAd ? (
            <AdCard ad={video} />
          ) : (
            <CardMedia
              component="img"
              image={video.content_details[0].thumbnail_url} // currently we don't have to show carousel in each content that's why mapping 0th element
              alt={video.name}
              sx={{
                // position: "absolute",
                // top: 0,
                // left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 2,
              }}
            />
          )}
        </Box>

        {/* Not showing send, copy and share buttons for ad */}
        {!isAd && (
          <CardContent
            sx={{
              flexGrow: 1,
              py: 1,
              px: 0,
              display: "flex",
              flexDirection: "column",
              height: "90px",
              "&:last-child": {
                paddingBottom: 1.5,
              },
            }}
          >
            <Typography
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.2,
                minHeight: "2.5em",
                maxHeight: "2.5em",
                fontSize: fontSize.typography.body2,
                ...fontStyles.openSans.bold,
              }}
            >
              {video.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // gap: 2,
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 0.5,
                  marginLeft: "-5px",
                }}
              >
                <ActionButton
                  icon={<WhatsApp sx={{ fontSize: fontSize.icon.small }} />}
                  label="Send"
                  onClick={handleWhatsApp}
                />
                <CopyButton text={video?.content_details[0]?.url} />
              </Box>
              <ActionButton
                icon={
                  <Reply
                    sx={{
                      fontSize: fontSize.icon.small,
                      transform: "rotate(180deg) scaleY(-1)",
                    }}
                  />
                }
                label="Share"
                onClick={handleShare}
                isReversed={true}
              />
            </Box>
          </CardContent>
        )}
      </Card>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={video.name}
      />
    </>
  );
};

export default GridCard;
