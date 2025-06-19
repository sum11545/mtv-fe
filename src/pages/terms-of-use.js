import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
} from '@mui/material';
import { fontSize, fontStyles } from '../theme/theme';

const TermsOfService = () => {
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
          Terms of Use
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
            title="Agreement to Terms"
            content="By accessing and using Money TV, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service apply to all visitors, users and others who access or use the service."
          />

          <Section
            title="Use License"
            content="Permission is granted to temporarily download one copy of the materials on Money TV's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            • modify or copy the materials
            • use the materials for any commercial purpose or for any public display
            • attempt to reverse engineer any software contained on the website
            • remove any copyright or other proprietary notations from the materials"
          />

       
          <Section
            title="Contact Information"
            content="If you have any questions about these Terms of Service, please contact us at: grow@moneytv.live"
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

export default TermsOfService; 