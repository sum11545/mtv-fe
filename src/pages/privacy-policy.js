import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Box,
} from "@mui/material";
import { fontStyles } from "@/theme/theme";

const PrivacyPolicy = () => {
  return (
    <Container
      sx={{
        py: 4,
        width: "800px",
        maxWidth: "100%",
        textAlign: "justify",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        textAlign={"center"}
        color="primary.main"
        gutterBottom
        sx={{
          ...fontStyles.openSans.bold,
          fontWeight: 700,
        }}
        mb={4}
      >
        PRIVACY POLICY
      </Typography>
      <Typography
        sx={{
          ...fontStyles.openSans.regular,
        }}
        variant="privacyPolicyText"
        gutterBottom
      >
        Last updated on: 11th July, 2025
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{ ...fontStyles.openSans.regular }}
        mt={4}
        paragraph
      >
        Thank you for choosing to be part of our community at Aidia
        Technovations Private Limited, doing business as Money TV (“MoneyTV”,{" "}
        <Typography component="span" sx={{ ...fontStyles.openSans.regular }}>
          “Company”
        </Typography>
        ,{" "}
        <Typography
          component="span"
          sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          “we”
        </Typography>
        ,{" "}
        <Typography
          component="span"
          sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          “us”
        </Typography>
        , or{" "}
        <Typography
          component="span"
          sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          “our”
        </Typography>
        ). We are committed to protecting your personal information and your
        right to privacy and security of your personal data, your privacy is
        important to us. This Privacy Policy (
        <Typography
          component="span"
          sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          “Policy”
        </Typography>
        ) applies to all products and/or services offered by us to all
        individuals (
        <Typography
          component="span"
          sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          “you”
        </Typography>
        ,{" "}
        <Typography
          component="span"
          sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          “your”
        </Typography>
        ,{" "}
        <Typography
          component="span"
          sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          “user”
        </Typography>
        ).
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        paragraph
      >
        When you visit our website
        <Link
          href="https://www.moneytv.live"
          color="primary.main"
          sx={{ textDecoration: "underline", mx: "0.35rem" }}
        >
          www.moneytv.live
        </Link>
        and use our products and/or services, you trust us with your personal
        information. We take your privacy very seriously. In this privacy
        notice, we seek to explain to you in the clearest way possible what
        information we collect, how we collect, receive, store, disclose, share,
        and use your personal data for the purpose of your participation and
        consumption of our products and/or services offered by us through our
        website and/or software application (“Platform”) or during any
        interaction with us, and how you can exercise your privacy rights you
        have in relation to it.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        paragraph
      >
        We hope you take some time to read through our Privacy Policy carefully,
        as it is important. If there are any terms in this privacy policy that
        you do not agree with, please discontinue use of our products and/or our
        services.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        paragraph
      >
        This Policy applies to all information collected through our website
        (such as{" "}
        <Link
          href="https://www.moneytv.live"
          color="primary.main"
          // underline="hover"
          sx={{ textDecoration: "underline" }}
        >
          www.moneytv.live
        </Link>
        ), and/or any related services, sales, marketing or events. By visiting
        and/or using our Platform, you are consenting to process your personal
        data in the manner as set forth in this Policy.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
      >
        1. Data Privacy Disclaimer
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        ml={4}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        mt={2}
        paragraph
      >
        The scope of this policy is limited to the product and/or services
        provided by us within the territory of India and applies to users who
        request for these products and/or services within the Indian territory.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
      >
        2. What personal data do we collect about you?
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        ml={4}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        mt={2}
        paragraph
      >
        When you interact with us, we collect different types of information
        from you based on the type of interaction.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        ml={4}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        paragraph
      >
        “Personal Data” means any data about an individual who is identifiable
        by or in relation to such data.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        ml={4}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        paragraph
      >
        “Processing”, “Processed”, “Process” in relation to personal data, means
        a wholly or partly automated operation or set of operations performed on
        digital personal data, and includes operations such as collection,
        recording, organization, structuring, storage, adaptation, retrieval,
        use, alignment, or combination, indexing, sharing, disclosure by
        transmission, dissemination or otherwise making available, restriction,
        erasure, or destruction.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        ml={4}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        paragraph
      >
        We endeavour to collect only such personal data that is reasonably
        necessary to perform our services for you. When you interact with our
        Platform or otherwise with us, we may collect the following personal
        data from you directly:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Box ml={6} sx={{ mt: "-10px", textAlign: "justify" }}>
                <Typography
                  variant="privacyPolicyText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  <Typography
                    component="span"
                    sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
                  >
                    General Data
                  </Typography>
                  - your first name, last name, email, mobile number, address,
                  country, state, gender, age or date of birth, application
                  history and installation data
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Box ml={6} sx={{ mt: "-10px", textAlign: "justify" }}>
                <Typography
                  variant="privacyPolicyText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  <Typography
                    component="span"
                    sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
                  >
                    Identification Data
                  </Typography>
                  - data that enables us to identify you
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Box ml={6} sx={{ mt: "-10px", textAlign: "justify" }}>
                <Typography
                  variant="privacyPolicyText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  <Typography
                    component="span"
                    sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
                  >
                    Technical and Network Activity Data
                  </Typography>
                  - data about your device and your usage of our Platform,
                  including your IP address, device ID, user ID, hardware model
                  and version, mobile network information, operating system and
                  other online identifiers, type of browser, browsing history,
                  search history, access time, pages viewed, URLs clicked on,
                  forms submitted, and physical location
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Box ml={6} sx={{ mt: "-10px", textAlign: "justify" }}>
                <Typography
                  variant="privacyPolicyText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  <Typography
                    component="span"
                    sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
                  >
                    Authentication
                  </Typography>
                  - data required for authentication, such as username, OTP,
                  Captcha and password
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Box ml={6} sx={{ mt: "-10px", textAlign: "justify" }}>
                <Typography
                  variant="privacyPolicyText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  <Typography
                    component="span"
                    sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
                  >
                    Employment Data
                  </Typography>
                  - data about education qualification, occupation, designation,
                  company name, resume.
                </Typography>
              </Box>
            }
          />
        </ListItem>
      </List>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
          textAlign: "justify",
        }}
        ml={4}
        paragraph
      >
        You can choose not to give us personal data when we ask you for it. If
        you decide not to give us your personal data, it may restrict our
        relationship with you.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        3. How do we collect your personal data?
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={2}
        mt={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        a. Information you directly provide to us:
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        You may choose to provide us with the data, which is essential for us to
        deliver the products and/or services you request. Without this data, we
        may not be able to provide you with all the requested products and/or
        services. We may collect the data when you do any of the following:
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Use our Platform
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        When you register on our Platform
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Share or use your social media profile to contact us
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Engage with one of our representatives
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Subscribe to our services or updates
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Get in touch with us for support or to provide feedback/queries
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        When you subscribe for market news and latest updates
      </Typography>
      <Typography
        mb={2}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Apply for job opportunities on our Platform
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        b. Information you provide to us voluntarily:
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We may collect additional data at other times, when you provide
        feedback(s), modify your content or email preferences, respond to
        surveys, or communicate with us. This data may include your name, e-mail
        id, mobile number, etc.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        c. Information we collect automatically:
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We collect data about you, your interactions with us, as well as data
        regarding your computer or other devices used to access our Platform.
        This source may include, but is not limited to:
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
          textAlign: "justify",
        }}
      >
        Activities on the Platform such as type of pages viewed, time spent on
        pages, search queries etc.
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
          textAlign: "justify",
        }}
      >
        Your interactions with our email, customer care and contact us Platform
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
          textAlign: "justify",
        }}
      >
        Geo-location data through IP addresses
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
          textAlign: "justify",
        }}
      >
        Device information like device id, device model etc. and other unique
        identifiers
      </Typography>
      <Typography
        mb={2}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
          textAlign: "justify",
        }}
      >
        Data collected via the use of cookies.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        d. Information we collect from other sources:
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
          textAlign: "justify",
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We may collect or receive data about you from third-party sources and
        process this data in accordance with this policy. The sources may
        include, but is not limited to:
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Publicly accessible sources
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Marketing & Advertising vendors
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Analytics Providers
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Event management agencies
      </Typography>
      <Typography
        mb={1}
        ml={6}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        Social media Platforms
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
          textAlign: "justify",
        }}
        ml={4}
        paragraph
      >
        If you connect your social media account to our Platform, you will share
        certain personal data from your social media account with us. This may
        include your name, email address, photo, list of social media contacts,
        and any other data you make accessible to us.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        4. Lawful basis for processing your personal data
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We will collect personal data by lawful and fair means and, where
        appropriate, with the knowledge of the individual concerned. We only
        collect and process personal data about you where we have a lawful
        basis. Lawful basis on which we would process data from you includes:
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        Obtaining explicit consent from you,
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        Processing for legitimate uses where processing is necessary in order to
        provide you with our products and/or services, such as:
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        i. To enforce our terms and conditions
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        ii. To ensure compliance with our legal obligations and to also comply
        with our obligations towards public authorities
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        iii. To enforce any legal right or claim
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        iv. For responding to a medical emergency involving a threat to your
        health or life or that of any other individual
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        v. For taking measures to ensure safety of, or provide assistance or
        services to any individual during any disaster, or any breakdown of
        public order
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        vi. For legal and compliance reasons, such as the prevention, detection,
        or investigation of a crime, loss prevention or prevention of fraud
      </Typography>
      <Typography
        mb={1}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        vii. As otherwise described to you at the time of collection of your
        personal data
      </Typography>
      <Typography
        mb={2}
        ml={10}
        variant="privacyPolicyText"
        display="block"
        sx={{ ...fontStyles.openSans.regular }}
      >
        viii. To improve services, optimize platform performance, and support
        research and data analysis
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        5. How do we use your personal data?
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We use your personal data for the purposes we have described below in
        this policy, or for purposes which are reasonably compatible to the ones
        described.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={6}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        To manage our relationship with you.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        paragraph
        mt={2}
        ml={6}
      >
        We will use your personal data to:
      </Typography>
      <Box ml={6}>
        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            i.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            Verify your identity; to help provide our products and/or services
            and to administer those products and/or services
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            ii.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To register you on our Platform and/or for the events, seminars,
            etc.
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            iii.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            Provision for you to subscribe the premium features of our Platform
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            iv.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            Communicate with you concerning our service (for example by email,
            push notifications text messaging, and online messaging channels),
            so that we communicate news regarding the Platform to you, details
            about new features and content available on our Platform
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            v.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To provide multiple rewards & offers to you for our products and/or
            services
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            vi.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            For marketing (where you have agreed to this) and for market
            research purposes, including internal demographic studies, to
            provide, optimize and personalize our products and/or services and
            data (where you have agreed to this) about our products and/or
            services
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            vii.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            Provide online or offline products and/or services such as contests
            and employment opportunities
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            viii.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            Identify you and authenticate your access rights access to our
            Platform
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            ix.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            Invite you to provide feedback or surveys or attend events
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            x.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To enhance personalized services
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            xi.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To send you communication, including through WhatsApp business
            messages, in relation to your use of the Platform and/or Services
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            xii.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To respond to your queries and provide you with data when you
            request it or when we believe our products and/or services may be of
            interest to you. If we intend to share electronic marketing with
            you, we will ask for your consent where required and you can opt out
            at any time
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            xiii.
          </Typography>
          <Typography
            sx={{
              flex: 1,
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            variant="privacyPolicyText"
          >
            Perform analytics, market research and segmentation to understand
            your preferences, improve our products and/or services and our
            communications to you
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            xiv.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To make platform and its content available and to further optimize &
            develop it
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={8}
        mt={4}
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        To manage and improve our processes and our business operations.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={8}
        mt={2}
        paragraph
      >
        We will use your personal data to:
      </Typography>
      <Box display="flex" mb={1} ml={8}>
        <Typography
          sx={{
            minWidth: "2rem",
            fontWeight: 700,
            ...fontStyles.openSans.regular,
          }}
        >
          i.
        </Typography>
        <Typography
          sx={{ flex: 1, ...fontStyles.openSans.regular }}
          variant="privacyPolicyText"
        >
          Manage our network and information systems security
        </Typography>
      </Box>
      <Box display="flex" mb={1} ml={8}>
        <Typography
          sx={{
            minWidth: "2rem",
            fontWeight: 700,
            ...fontStyles.openSans.regular,
          }}
        >
          ii.
        </Typography>
        <Typography
          sx={{ flex: 1, ...fontStyles.openSans.regular }}
          variant="privacyPolicyText"
        >
          Manage our workforce effectively
        </Typography>
      </Box>
      <Box display="flex" mb={1} ml={8}>
        <Typography
          sx={{
            minWidth: "2rem",
            fontWeight: 700,
            ...fontStyles.openSans.regular,
          }}
        >
          iii.
        </Typography>
        <Typography
          sx={{ flex: 1, ...fontStyles.openSans.regular }}
          variant="privacyPolicyText"
        >
          Perform data analyses, auditing and research to help us deliver and
          improve our digital Platform, content and products and/or services
        </Typography>
      </Box>
      <Box display="flex" mb={3} ml={8}>
        <Typography
          sx={{
            minWidth: "2rem",
            fontWeight: 700,
            ...fontStyles.openSans.regular,
          }}
        >
          iv.
        </Typography>
        <Typography
          sx={{ flex: 1, ...fontStyles.openSans.regular }}
          variant="privacyPolicyText"
        >
          Monitor and analyse trends, usage and activities in connection with
          our products and/or services to understand which parts of our products
          and/or services are of the most interest and to improve them
          accordingly
        </Typography>
      </Box>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
      >
        6. How do we protect your personal data
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We implement reasonable technical and organizational measures in
        relation to the data and personal data that is processed by us. We take
        reasonable measures to protect all personal data from unauthorized
        processing or accidental disclosure, alteration, misuse, destruction or
        loss or unauthorized access and modification that compromises the
        confidentiality, integrity, and availability of such data.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        paragraph
      >
        While we endeavour to always protect our Platform, operations and data
        against unauthorized access, use, modification, and disclosure, due to
        the inherent nature of the Internet, we cannot guarantee that any data,
        during transmission or while stored on our systems, will be safe and
        secure from intrusion by others. Although we will do our best to protect
        your personal information, transmission of personal information to and
        from our Sites is at your own risk. You should only access the services
        within a secure environment.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
      >
        7. Your rights in connection with your personal data
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We respect your right to access and control your personal data, and we
        will respond to requests to exercise your rights under applicable laws
        and, where applicable, will correct, update, or erase your personal
        data.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
        ml={4}
        paragraph
      >
        You have the following rights:
      </Typography>
      <Box mb={2} ml={4}>
        <Typography
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
          variant="privacyPolicyText"
          display="block"
        >
          Right to rectification or update User Information:-
        </Typography>
        <Typography
          variant="privacyPolicyText"
          sx={{
            ...fontStyles.openSans.regular,
          }}
        >
          If You would like to correct or update personal information that You
          have provided to us, please contact us at Email ID to receive
          instructions to update your profile.
        </Typography>
      </Box>
      <Box mb={2} ml={4}>
        <Typography
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
          variant="privacyPolicyText"
          display="block"
        >
          Right not to provide consent or withdraw consent
        </Typography>
        <Typography
          variant="privacyPolicyText"
          sx={{ ...fontStyles.openSans.regular }}
        >
          We may seek to rely on Your consent to process certain personal data.
          Where we do so, You have the right not to provide Your consent or to
          withdraw Your consent at any time. This does not affect the lawfulness
          of the processing based on consent before its withdrawal.
        </Typography>
      </Box>
      <Box mb={2} ml={4}>
        <Typography
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
          variant="privacyPolicyText"
          display="block"
        >
          Right to access
        </Typography>
        <Typography
          variant="privacyPolicyText"
          sx={{ ...fontStyles.openSans.regular }}
        >
          You may have the right to access the User Information that we hold
          about You.
        </Typography>
      </Box>
      <Box mb={2} ml={4}>
        <Typography
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
          variant="privacyPolicyText"
          display="block"
        >
          Right of erasure
        </Typography>
        <Typography
          variant="privacyPolicyText"
          sx={{ ...fontStyles.openSans.regular }}
        >
          In certain circumstances, You may have the right to the erasure of
          User Information that we hold about You (for example if it is no
          longer necessary for the purposes for which it was originally
          collected).
        </Typography>
      </Box>
      <Box mb={2} ml={4}>
        <Typography
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
          variant="privacyPolicyText"
          display="block"
        >
          Right to object to or restrict processing
        </Typography>
        <Typography
          variant="privacyPolicyText"
          sx={{ ...fontStyles.openSans.regular }}
        >
          You may have the right to request that we restrict processing of Your
          User Information in certain circumstances (for example, where You
          believe that the User Information we hold about You is not accurate).
        </Typography>
      </Box>
      <Box mb={2} ml={4}>
        <Typography
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
          variant="privacyPolicyText"
          display="block"
        >
          Right to opt out
        </Typography>
        <Typography
          variant="privacyPolicyText"
          sx={{ ...fontStyles.openSans.regular }}
        >
          You may have the right to opt out from the promotional email/SMS/call
          services, upon which all communications pertaining to new products,
          features, launches and other materials will not be sent to You.
        </Typography>
      </Box>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        paragraph
      >
        For exercising any of your rights, you can contact us using{" "}
        grow@moneytv.live . We will need you to furnish proof of your identity
        before you can exercise these rights. We may not be able to process any
        requests made in the event you fail to establish your identity, or if we
        are unable to authenticate your identity.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        paragraph
      >
        Please note for all the information and data sought by the Company, in
        case you do not wish provide certain such data or seek to withdraw Your
        consent or information/data already provided, or wish to opt out from a
        particular service or wish to erase certain information / data or seek
        restriction in processing of certain such information / data, in such
        cases, the Company may not be in a position to continue provisioning of
        its services and shall have the right to de-register / debar You from
        the use of the Platform, until such time the requisite data/information
        and the consents are provided.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
      >
        8. Will your information be shared with anyone
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        As far as this is necessary for the purposes set out above, we will
        share your personal data in the following situations and recipients who
        either have a need to know and who will process it for us based on our
        instructions and for no other purpose:
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={4}
        gutterBottom
        sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
      >
        Compliance with Laws.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={1}
        paragraph
      >
        We will share personal data when required for the following purposes:
      </Typography>
      <Box ml={4}>
        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            i.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To comply with legal obligations and respond to requests from
            government agencies, including law enforcement agencies and other
            public authorities
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            ii.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To prevent or detect or investigate offences or cyber incidents or
            for the prosecution or punishment of offences
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            iii.
          </Typography>
          <Typography sx={{ flex: 1 }} variant="privacyPolicyText">
            To raise or defend against legal claims
          </Typography>
        </Box>

        <Box display="flex" mb={1}>
          <Typography
            sx={{
              minWidth: "2rem",
              fontWeight: 700,
              ...fontStyles.openSans.regular,
            }}
          >
            iv.
          </Typography>
          <Typography
            sx={{ flex: 1, ...fontStyles.openSans.regular }}
            variant="privacyPolicyText"
          >
            To protect our users, systems, and products and/or services.
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We may disclose your information where we are legally required to do so
        in order to comply with applicable law, governmental requests, a
        judicial proceeding, court order, or legal process, such as in response
        to a court order or a subpoena (including in response to public
        authorities to meet national security or law enforcement requirements).
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={4}
        gutterBottom
        fontWeight={"normal"}
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        <Typography
          component={"span"}
          mr={1}
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
        >
          Vital Interests and Legal Rights.
        </Typography>
        We may disclose your information where we believe it is necessary to
        investigate, prevent, or take action regarding potential violations of
        our policies, suspected fraud, situations involving potential threats to
        the safety of any person and illegal activities, or as evidence in
        litigation in which we are involved.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={4}
        mt={2}
        gutterBottom
        fontWeight={"normal"}
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        <Typography
          component={"span"}
          mr={1}
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
        >
          Vendors, Consultants and Other Third-Party Service Providers.
        </Typography>
        We may share your data with third party vendors, service providers,
        advertisers, contractors or agents who perform services for us or on our
        behalf and require access to such information to do that work. For eg.
        data analysis, email delivery, hosting services, customer service and
        marketing newsletters, promotions and offers. We may allow selected
        third parties to use tracking technology on the Platform, which will
        enable them to collect data about how you interact with the Platform
        over time. This information may be used to, among other things, analyse
        and track data, determine the popularity of certain content and better
        understand online activity. These external service providers shall
        process your personal data on our behalf subject to appropriate
        safeguards only insofar as it is necessary for them to provide their
        products and/or services to us. Our prior authorization is required
        before they are permitted to transfer responsibility for processing
        personal data to a third party. Unless described in this Policy, we do
        not share, sell, rent or trade any of your information with third
        parties for their promotional purposes.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={4}
        mt={2}
        gutterBottom
        fontWeight={"normal"}
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        <Typography
          component={"span"}
          mr={1}
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
        >
          Business Transfers.
        </Typography>
        We may share or transfer your information in connection with, or during
        negotiations of, any merger, sale of company assets, financing,
        restructure, joint venture, assignment, transfer acquisition or other
        disposition of all or any portion of our business, assets, or stock
        (including in connection with any bankruptcy or similar proceedings). We
        provide personal data to our affiliates and other trusted businesses or
        persons to process it for us, based on our instructions and in
        compliance with our Privacy Policy and any other appropriate
        confidentiality and security measures. In the event if we merge with or
        acquired by another company or in case of re-organization or
        re-structuring of business, we and our affiliates may share your
        personal data, wholly or in part, with another business entity.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        component="h3"
        ml={4}
        mt={2}
        mb={3}
        gutterBottom
        fontWeight={"normal"}
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        <Typography
          component={"span"}
          mr={1}
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
        >
          With your Consent.
        </Typography>
        We may disclose your personal information for any other purpose with
        your consent.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        9. Personal data transfer, storage and processing
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We may transfer your personal data to our affiliates or third parties in
        territories outside India for the purposes described in this Policy in
        accordance with applicable data protection laws, provided that no such
        restriction is notified by the Government/ appropriate authority.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        10. How long do we keep your information
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We will retain your personal data which we have collected for as long as
        we reasonably consider it necessary for achieving the abovementioned
        purposes and as is permissible under applicable law (such as tax,
        accounting or other legal requirements). This is determined on a
        case-to-case basis.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        paragraph
      >
        When we have no ongoing legitimate business need to process your
        personal information, we will either delete or anonymize it, or, if this
        is not possible (for example, because your personal information has been
        stored in backup archives), then we will securely store your personal
        information and isolate it from any further processing until deletion is
        possible.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        paragraph
      >
        We will delete your personal data whenever you request us to do so.
        However, we may archive and/or retain your personal data for as long as
        there are statutory retention obligations or potential legal claims are
        not, yet time barred.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        11. How to delete your account
      </Typography>
      <Typography
        mb={1}
        ml={4}
        mt={2}
        variant="privacyPolicyText"
        display="block"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        You may choose to delete Your account at any point of time by making
        such choice through Site/Platform or you can send an email to{" "}
        <Link
          href="mailto:grow@moneytv.live"
          color="primary.main"
          sx={{ textDecoration: "underline", mr: "0.35rem" }}
        >
          grow@moneytv.live
        </Link>
        from your verified email id.
      </Typography>
      <Typography
        mb={1}
        ml={4}
        variant="privacyPolicyText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
        display="block"
      >
        The account shall not be deleted till the time any transactions are open
        on the platform.
      </Typography>
      <Typography
        mb={1}
        ml={4}
        variant="privacyPolicyText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
        display="block"
      >
        We may retain Your certain Data in accordance with applicable laws and
        regulations post the deletion of your account.
      </Typography>
      <Typography
        mb={1}
        ml={4}
        variant="privacyPolicyText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
        display="block"
      >
        In the event of the pendency of any legal, regulatory and/or statutory
        proceeding or receipt of any legal and / or regulatory direction to that
        effect, we may be required by the law to retain your Personal Data for
        longer periods.
      </Typography>
      <Typography
        mb={2}
        ml={4}
        variant="privacyPolicyText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
        display="block"
      >
        Subject to above, all your personal details submitted, financial data
        submitted etc. shall be deleted or de-identified so that it is anonymous
        and not attributable to You, within reasonable time, not exceeding 90
        days.
      </Typography>
      <Typography
        mb={2}
        ml={4}
        variant="privacyPolicyText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
        display="block"
      >
        You will not be able to retrieve / access the account and related data
        in future once the account is deleted basis your request.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        12. Do we collect information from minors
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We do not knowingly collect or solicit personal data from minors. Our
        products and/or services are not designed for any person who is under 18
        years of age, and we do not knowingly permit such persons to register
        for products and/ or services or share data through any of the web forms
        without verifiable consent from minors’ parents or lawful guardians. If
        we learn that personal information from users less than 18 years of age
        has been collected, we will take reasonable measures to promptly delete
        such data from our records. Further, we do not undertake tracking or
        behavioural monitoring of children or targeted advertising directed at
        children.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        paragraph
      >
        If you believe that a child under 18 years may have provided us their
        personal data, please contact us on grow@moneytv.live
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        13. Do we make updates to this Policy
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        We reserve the right to change this Policy at our sole discretion at any
        time. The updated version will be indicated by an updated “Revised” date
        and the updated version will be effective as soon as it is accessible.
        If we make material changes to this Policy, we may notify you either by
        prominently posting a notice of such changes or by directly sending you
        a notification. We encourage you to review this Policy frequently to be
        informed of how we are protecting your information.
      </Typography>
      <Typography
        variant="privacyPolicyText"
        mb={2}
        gutterBottom
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        14. Contact information
      </Typography>
      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        mt={2}
        paragraph
      >
        If you have questions or comments regarding this Policy or want to
        exercise any of your rights or express your grievances regarding the
        processing of your personal data, please contact us using the contact
        details given below:
      </Typography>
      <Typography
        variant="privacyPolicyText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
        ml={4}
        mb={1}
        paragraph
      >
        Aidia Technovations Private Limited
      </Typography>

      <Typography
        variant="privacyPolicyText"
        sx={{
          ...fontStyles.openSans.regular,
          fontStyle: "italic",
          fontWeight: 700,
        }}
        ml={4}
        mb={1}
        paragraph
      >
        Jigish Sonagara
      </Typography>

      <Typography
        variant="privacyPolicyText"
        sx={{
          ...fontStyles.openSans.regular,
          fontStyle: "italic",
          fontWeight: 700,
        }}
        ml={4}
        mb={3}
        paragraph
      >
        <a href="mailto:grow@moneytv.live" style={{ textDecoration: "none" }}>
          grow@moneytv.live
        </a>
      </Typography>

      <Typography
        variant="privacyPolicyText"
        lineHeight={1.8}
        sx={{
          ...fontStyles.openSans.regular,
        }}
        ml={4}
        paragraph
      >
        If you are not satisfied with the resolution provided you may log your
        complaint with the Data Protection Board of India following the
        procedure prescribed by them.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
