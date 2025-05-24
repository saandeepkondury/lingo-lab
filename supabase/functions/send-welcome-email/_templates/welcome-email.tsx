
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface WelcomeEmailProps {
  email: string;
  subscriber_id: string;
}

export const WelcomeEmail = ({ email, subscriber_id }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to LingoLab! 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Heading style={logo}>
            <span style={lingoText}>Lingo</span>
            <span style={labText}>Lab</span>
          </Heading>
        </Section>
        
        <Heading style={h1}>Welcome to LingoLab! 🎉</Heading>
        <Text style={subtitle}>Thank you for joining our community</Text>
        
        <Section style={benefitsSection}>
          <Heading style={h2}>What's Next?</Heading>
          <Text style={benefitItem}>
            <strong>🔍 Explore Case Studies:</strong> Discover how the world's most successful startups used strategic narrative to drive growth
          </Text>
          <Text style={benefitItem}>
            <strong>📧 Get Weekly Insights:</strong> You'll receive our newsletter "The Lingo Drop" with strategic narrative breakthroughs
          </Text>
          <Text style={benefitItem}>
            <strong>🎯 Access Premium Content:</strong> Unlock our full library of case studies and exclusive interviews
          </Text>
        </Section>
        
        <Section style={buttonSection}>
          <Button
            style={primaryButton}
            href="https://pnwakyibtpncjosghlbh.lovable.app/join"
          >
            Get Started →
          </Button>
          <Button
            style={secondaryButton}
            href="https://pnwakyibtpncjosghlbh.lovable.app/case-studies"
          >
            Browse Case Studies
          </Button>
        </Section>
        
        <Hr style={hr} />
        
        <Section style={footer}>
          <Text style={footerText}>
            Questions? Reply to this email or visit our{' '}
            <Link href="https://pnwakyibtpncjosghlbh.lovable.app" style={link}>
              website
            </Link>
          </Text>
          <Text style={footerSubtext}>
            LingoLab - Strategic Narrative for Startups
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

// Lingo Lab Brand Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
}

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '40px',
}

const logo = {
  margin: '0',
  fontSize: '32px',
  fontWeight: 'bold',
}

const lingoText = {
  color: '#0f766e', // Teal
}

const labText = {
  background: 'linear-gradient(to right, #0f766e, #f97316)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const h1 = {
  color: '#0f766e',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  textAlign: 'center' as const,
}

const subtitle = {
  fontSize: '18px',
  color: '#666666',
  margin: '0 0 40px 0',
  textAlign: 'center' as const,
}

const benefitsSection = {
  backgroundColor: '#f8fafc',
  padding: '30px',
  borderRadius: '12px',
  margin: '30px 0',
}

const h2 = {
  color: '#0f766e',
  margin: '0 0 20px 0',
  fontSize: '24px',
}

const benefitItem = {
  margin: '0 0 12px 0',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#333333',
}

const buttonSection = {
  textAlign: 'center' as const,
  margin: '30px 0',
}

const primaryButton = {
  backgroundColor: '#0f766e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  margin: '0 6px 12px 6px',
}

const secondaryButton = {
  border: '2px solid #0f766e',
  borderRadius: '8px',
  color: '#0f766e',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 26px',
  margin: '0 6px',
  backgroundColor: 'transparent',
}

const hr = {
  borderColor: '#e2e8f0',
  margin: '20px 0',
}

const footer = {
  textAlign: 'center' as const,
}

const footerText = {
  margin: '0',
  fontSize: '14px',
  color: '#666666',
}

const footerSubtext = {
  margin: '10px 0 0 0',
  fontSize: '12px',
  color: '#999999',
}

const link = {
  color: '#0f766e',
  textDecoration: 'underline',
}
