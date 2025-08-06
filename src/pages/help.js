import React from "react";
import { Container, Typography, Box, Paper, useTheme } from "@mui/material";
import { fontSize, fontStyles } from "../theme/theme";
import SEO from "../components/SEO";

const Help = () => {
  const theme = useTheme();
  
  return (
    <>
      <SEO
        title="Help & Support - MoneyTV | User Guide & FAQ"
        description="Get help and support for using Money TV. Find answers to frequently asked questions, user guides, and contact information for technical support."
        keywords="help, support, FAQ, user guide, money tv help, technical support, customer service, user assistance"
        type="website"
      />

    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, backgroundColor: 'background.paper' }}>
        {/* Page Title */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: fontSize.typography.h3,
            ...fontStyles.montserrat.bold,
            color: 'primary.main',
            mb: 4,
            textAlign: 'center',
          }}
        >
          Help
        </Typography>

        {/* Content Sections */}
        <Box sx={{ '& > *': { mb: 3 }, height: '80vh' }}>
          {/* <Section
            title="Getting Started"
            content="Welcome to Money TV! Here you'll find everything you need to know about using our platform to access financial videos, market analysis, and investment insights."
          />

        

          <Section
            title="Frequently Asked Questions"
            content="Q: Is Money TV free to use?
            A: Yes, our platform provides free access to financial educational content.

            Q: Can I download videos?
            A: Currently, videos are available for streaming only.

            Q: How often is content updated?
            A: We regularly update our content with the latest financial news and analysis.

            Q: Can I suggest content topics?
            A: Absolutely! Send us your suggestions via our contact email."
          /> */}
        </Box>
      </Paper>
    </Container>
    </>
  );
};

// Helper component for sections
const Section = ({ title, content }) => (
  <Box>
    <Typography
      variant="h2"
      component="h2"
      sx={{
        fontSize: fontSize.typography.h6,
        ...fontStyles.montserrat.bold,
        color: 'text.primary',
        mb: 2,
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        fontSize: fontSize.typography.body1,
        ...fontStyles.openSans.regular,
        color: 'text.primary',
        lineHeight: 1.6,
        whiteSpace: 'pre-line', // Preserves line breaks in content
      }}
    >
      {content}
    </Typography>
  </Box>
);

export default Help; 