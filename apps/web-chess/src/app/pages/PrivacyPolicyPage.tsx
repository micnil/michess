import { Box, Card, Heading, Text } from '@radix-ui/themes';
import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <Box width="100%" px={{ initial: '2', lg: '0' }}>
      <Card size="3">
        <Box p="4">
          <Heading size="8" mb="4">
            Privacy Policy
          </Heading>

          <Text as="p" mb="4" size="2" color="gray">
            Effective Date: {new Date().toLocaleDateString()}
          </Text>

          <Box mb="6">
            <Heading size="5" mb="3">
              1. Information We Collect
            </Heading>
            <Text as="p" mb="3">
              We collect information you provide directly to us, such as when
              you create an account, play games, or contact us for support.
            </Text>
            <Text as="p" mb="3">
              <strong>Account Information:</strong> Email address, username, and
              password.
            </Text>
            <Text as="p" mb="3">
              <strong>Game Data:</strong> Game moves, match results, and
              gameplay statistics.
            </Text>
            <Text as="p" mb="3">
              <strong>Usage Information:</strong> How you interact with our
              chess platform, including pages visited and features used.
            </Text>
          </Box>

          <Box mb="6">
            <Heading size="5" mb="3">
              2. How We Use Your Information
            </Heading>
            <Text as="p" mb="3">
              We use the information we collect to:
            </Text>
            <Text as="p" mb="2">
              • Provide, maintain, and improve our chess gaming services
            </Text>
            <Text as="p" mb="2">
              • Process transactions and send related information
            </Text>
            <Text as="p" mb="2">
              • Send technical notices, updates, and administrative messages
            </Text>
            <Text as="p" mb="2">
              • Respond to your comments and questions
            </Text>
            <Text as="p" mb="3">
              • Monitor and analyze trends and usage
            </Text>
          </Box>

          <Box mb="6">
            <Heading size="5" mb="3">
              3. Information Sharing
            </Heading>
            <Text as="p" mb="3">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy.
            </Text>
            <Text as="p" mb="3">
              We may share your information in the following situations:
            </Text>
            <Text as="p" mb="2">
              • With your consent
            </Text>
            <Text as="p" mb="2">
              • To comply with legal obligations
            </Text>
            <Text as="p" mb="3">
              • To protect our rights and safety
            </Text>
          </Box>

          <Box mb="6">
            <Heading size="5" mb="3">
              4. Data Security
            </Heading>
            <Text as="p" mb="3">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </Text>
          </Box>

          <Box mb="6">
            <Heading size="5" mb="3">
              5. Data Retention
            </Heading>
            <Text as="p" mb="3">
              We retain your information for as long as your account is active
              or as needed to provide you services. You may request deletion of
              your account and associated data at any time.
            </Text>
          </Box>

          <Box mb="6">
            <Heading size="5" mb="3">
              6. Your Rights
            </Heading>
            <Text as="p" mb="3">
              You have the right to:
            </Text>
            <Text as="p" mb="2">
              • Access your personal information
            </Text>
            <Text as="p" mb="2">
              • Correct inaccurate information
            </Text>
            <Text as="p" mb="2">
              • Request deletion of your information
            </Text>
            <Text as="p" mb="3">
              • Opt out of certain communications
            </Text>
          </Box>

          <Box mb="6">
            <Heading size="5" mb="3">
              7. Session Management and Analytics
            </Heading>
            <Text as="p" mb="3">
              We use session cookies solely for authentication purposes to keep
              you logged in during your visit. These cookies are essential for
              the functioning of our service and are automatically deleted when
              you close your browser or log out.
            </Text>
            <Text as="p" mb="3">
              We also use browser local storage to collect anonymous usage
              analytics and performance monitoring data to help us improve our
              service. This data does not identify you personally and is used
              only for technical improvements.
            </Text>
          </Box>

          <Box mb="6">
            <Heading size="5" mb="3">
              8. Children's Privacy
            </Heading>
            <Text as="p" mb="3">
              Our service is not intended for children under 13. We do not
              knowingly collect personal information from children under 13.
            </Text>
          </Box>

          <Box mb="6">
            <Heading size="5" mb="3">
              9. Changes to This Policy
            </Heading>
            <Text as="p" mb="3">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              with an updated effective date.
            </Text>
          </Box>

          <Box>
            <Heading size="5" mb="3">
              10. Contact Us
            </Heading>
            <Text as="p">
              If you have any questions about this privacy policy, please
              contact us through our support channels or at the contact
              information provided on our website.
            </Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
