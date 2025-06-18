import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
} from '@mui/material';
import { fontSize, fontStyles } from '../theme/theme';

const PrivacyPolicy = () => {
  const theme = useTheme();
  
  return (
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
          Privacy Policy
        </Typography>

        {/* Last Updated */}
        {/* <Typography
          variant="body2"
          sx={{
            fontSize: fontSize.typography.caption,
            ...fontStyles.openSans.regular,
            color: 'text.secondary',
            mb: 4,
            textAlign: 'center',
          }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </Typography> */}

        {/* Content Sections */}
        <Box sx={{ '& > *': { mb: 3 }, height: '80vh' }}>
          {/* <Section
            title="Introduction"
            content="Welcome to Money TV. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
          />

         

          <Section
            title="Your Rights"
            content="Under certain circumstances, you have rights under data protection laws in relation to your personal data:
            • Request access to your personal data
            • Request correction of your personal data
            • Request erasure of your personal data
            • Object to processing of your personal data
            • Request restriction of processing your personal data
            • Request transfer of your personal data"
          />

          <Section
            title="Contact Us"
            content="If you have any questions about this Privacy Policy, please contact us at: grow@moneytv.live"
          /> */}
        </Box>
      </Paper>
    </Container>
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

export default PrivacyPolicy; 