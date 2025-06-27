import React from "react";
import { useState } from "react";
import _ from "lodash";
import {
  InputBase,
  styled,
  Divider,
  useTheme,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { fontStyles, fontSize } from "../theme/theme";

import { Search as SearchIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import createAxiosInstance from "@/configs/axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 15,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(30, 39, 84, 1)"
      : theme.palette.background.paper,
  border:
    theme.palette.mode === "light" && `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  // marginRight: theme.spacing(2),
  // marginLeft: theme.spacing(3),
  width: "100%",
  transition:
    "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out",

  // Light mode hover and focus states
  ...(theme.palette.mode === "light" && {
    "&:hover, &:focus-within": {
      borderColor: theme.palette.primary.main,
      "& .MuiDivider-root": {
        borderColor: theme.palette.primary.main,
      },
    },
  }),

  // Dark mode hover and focus states
  ...(theme.palette.mode === "dark" && {
    "&:hover, &:focus-within": {
      backgroundColor: "#ffffff",
      "& .MuiInputBase-input": {
        color: "#000000",
      },
      "& .MuiSvgIcon-root": {
        color: "#666666",
      },
    },
  }),

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 7,
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(30, 39, 84, 1)" : "#f8f8f8",
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? theme.palette.divider
        : theme.palette.grey[200]
    }`,

    // Light mode hover and focus states for mobile
    ...(theme.palette.mode === "light" && {
      "&:hover, &:focus-within": {
        borderColor: theme.palette.primary.main,
        "& .MuiDivider-root": {
          borderColor: theme.palette.primary.main,
        },
      },
    }),

    // Dark mode hover and focus states for mobile
    ...(theme.palette.mode === "dark" && {
      "&:hover, &:focus-within": {
        backgroundColor: "#ffffff",
        borderColor: "#e0e0e0",
        "& .MuiInputBase-input": {
          color: "#000000",
        },
        "& .MuiSvgIcon-root": {
          color: "#666666",
        },
      },
    }),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: fontSize.form.label,
    ...fontStyles.sfPro.text.regular,
    [theme.breakpoints.down("sm")]: {
      fontSize: fontSize.form.label,
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    },
  },
}));

const PostfixIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiDivider-root": {
    marginRight: theme.spacing(2),
    transition: "border-color 0.2s ease-in-out",
  },
  "& .MuiSvgIcon-root": {
    fontSize: fontSize.icon.small,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: fontSize.icon.small,
    },
  },
}));

const SearchResultWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 35,
  padding: 3,
  borderRadius: 15,
  width: "100%",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(30, 39, 84, 1)"
      : theme.palette.background.paper,
  border:
    theme.palette.mode === "light" && `1px solid ${theme.palette.divider}`,
}));

const PipeSeparator = () => {
  return (
    <Typography
      variant="body2"
      component="span"
      sx={{
        mx: 1,
        color: "#000",
      }}
    >
      |
    </Typography>
  );
};
const SearchResults = ({ searchResults, handleSearch, isMobile }) => {
  const theme = useTheme();
  const mtvCodeGroup = _.groupBy(searchResults, "mtv_code");
  return (
    <SearchResultWrapper>
      {Object.entries(mtvCodeGroup).map(([key, value]) => (
        <Box
          key={key}
          sx={{
            cursor: "pointer",
            p: 0.8,
            "&:hover": {
              background: theme.palette.background.sectionBg,
            },
          }}
          onClick={() => {
            handleSearch(key);
          }}
        >
          {value.map((search, index) => {
            return (
              <Box key={index} component={isMobile ? "div" : "span"}>
                <Typography
                  sx={{
                    ...fontStyles.montserrat,
                    fontWeight: "bold",
                    px: 0.8,
                    fontSize: {
                      xl: fontSize.typography.body1,
                      xs: fontSize.typography.body2,
                    },
                  }}
                  component={"span"}
                >
                  {search?.label} :
                </Typography>
                <Typography
                  sx={{
                    ...fontStyles.montserrat,
                    fontSize: {
                      xl: fontSize.typography.body2,
                      xs: fontSize.typography.caption,
                    },
                  }}
                  component="span"
                >
                  {search?.exchange_symbol}
                </Typography>

                <PipeSeparator />
                {search?.exchange_code && (
                  <>
                    <Typography
                      sx={{
                        ...fontStyles.montserrat,
                        fontSize: {
                          xl: fontSize.typography.body2,
                          xs: fontSize.typography.caption,
                        },
                      }}
                      component="span"
                    >
                      {search?.exchange_code}
                    </Typography>
                    <PipeSeparator />
                  </>
                )}
                <Typography
                  sx={{
                    ...fontStyles.montserrat,
                    fontSize: {
                      xl: fontSize.typography.body2,
                      xs: fontSize.typography.caption,
                    },
                  }}
                  component="span"
                >
                  {search?.exchange_name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      ))}
    </SearchResultWrapper>
  );
};

const SearchBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const axiosInstance = createAxiosInstance();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearhResults, setShowSearchResults] = useState(false);

  // Maximum character limit for search query
  const MAX_SEARCH_CHARS = 100;

  // Function to truncate text for display
  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleSearch = (mtvCode) => {
    setShowSearchResults(false);
    if (mtvCode) {
      router.push({
        pathname: "/search",
        query: {
          searchQuery,
          mtvCode,
        },
      });
    } else {
      router.push({
        pathname: "/search",
        query: {
          searchQuery,
        },
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push({
        pathname: "/search",
        query: {
          searchQuery: searchQuery,
        },
      });
      setShowSearchResults(false);
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Search>
      <StyledInputBase
        // placeholder={`Search for Videos (${searchQuery.length}/${MAX_SEARCH_CHARS})`}
        placeholder={`Search for Videos`}
        inputProps={{
          "aria-label": "search",
          maxLength: MAX_SEARCH_CHARS,
        }}
        value={searchQuery}
        onFocus={() => {
          setShowSearchResults(true);
        }}
        onBlur={() =>
          setTimeout(() => {
            setShowSearchResults(false);
          }, [50])
        }
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          e.preventDefault();
          const inputValue = e.target.value;

          // Limit input to maximum characters
          if (inputValue.length <= MAX_SEARCH_CHARS) {
            setSearchQuery(inputValue);

            // Only make API call if there's input and within character limit
            if (inputValue.trim()) {
              axiosInstance
                .get("/search/searchSuggestions", {
                  params: {
                    search_query: inputValue,
                  },
                })
                .then((res) => {
                  setSearchResults(res?.data?.response);
                })
                .catch((err) => console.log({ err }));
            } else {
              setSearchResults([]);
            }
          }
        }}
      />
      <PostfixIconWrapper>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <SearchIcon onClick={() => handleSearch()} sx={{ cursor: "pointer" }} />
      </PostfixIconWrapper>
      {showSearhResults && searchQuery && searchResults?.length ? (
        <SearchResults
          searchResults={searchResults}
          handleSearch={handleSearch}
          isMobile={isMobile}
        />
      ) : (
        <></>
      )}
    </Search>
  );
};

export default SearchBar;
