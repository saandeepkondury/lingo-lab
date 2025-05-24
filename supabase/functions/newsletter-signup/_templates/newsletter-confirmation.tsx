
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Button,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface NewsletterConfirmationProps {
  email: string;
}

export const NewsletterConfirmation = ({ email }: NewsletterConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Welcome to LingoLab's Newsletter - You're In! 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>
            Welcome to <span style={brandGradient}>LingoLab</span>! 🎉
          </Heading>
          <Text style={subtitle}>You've successfully joined our community</Text>
        </Section>
        
        <Section style={contentSection}>
          <Text style={greeting}>Hi there!</Text>
          <Text style={text}>
            Thank you for subscribing to <strong>The Lingo Drop</strong> newsletter at <strong>{email}</strong>. 
            You're now part of a community of founders and marketers who are mastering strategic narrative.
          </Text>
          
          <Section style={benefitsSection}>
            <Heading style={h2}>What's Coming Your Way:</Heading>
            <Text style={benefitItem}>
              📚 <strong>Weekly Case Studies:</strong> Deep dives into how successful startups used strategic narrative
            </Text>
            <Text style={benefitItem}>
              💡 <strong>Strategic Insights:</strong> Language patterns that move markets and secure funding
            </Text>
            <Text style={benefitItem}>
              🎯 <strong>Positioning Frameworks:</strong> Tools to craft compelling company narratives
            </Text>
            <Text style={benefitItem}>
              🚀 <strong>Exclusive Content:</strong> Early access to new tools and founder interviews
            </Text>
          </Section>
          
          <Section style={ctaSection}>
            <Button href="https://pnwakyibtpncjosghlbh.lovable.app/case-studies" style={button}>
              Explore Case Studies →
            </Button>
          </Section>
          
          <Text style={text}>
            Your first newsletter will arrive in your inbox soon. In the meantime, feel free to explore our 
            case studies and see how the world's most successful startups mastered their narrative.
          </Text>
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            Questions? Reply to this email or visit our{' '}
            <Link href="https://pnwakyibtpncjosghlbh.lovable.app" style={link}>
              website
            </Link>
          </Text>
          <Text style={footerBrand}>
            LingoLab - Strategic Narrative for Startups
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default NewsletterConfirmation

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
}

const header = {
  textAlign: 'center' as const,
  marginBottom: '40px',
}

const h1 = {
  color: '#0f766e',
  fontSize: '32px',
  fontWeight: '600',
  margin: '0 0 10px 0',
  lineHeight: '1.2',
}

const brandGradient = {
  background: 'linear-gradient(to right, #0f766e, #f97316)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const subtitle = {
  color: '#666666',
  fontSize: '18px',
  margin: '0',
}

const h2 = {
  color: '#0f766e',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px 0',
}

const contentSection = {
  marginBottom: '30px',
}

const benefitsSection = {
  backgroundColor: '#f8fafc',
  padding: '24px',
  borderRadius: '12px',
  margin: '24px 0',
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '30px 0',
}

const greeting = {
  color: '#333333',
  fontSize: '16px',
  margin: '0 0 16px 0',
  fontWeight: '600',
}

const text = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
}

const benefitItem = {
  color: '#333333',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '12px 0',
}

const button = {
  backgroundColor: '#0f766e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
}

const footer = {
  borderTop: '1px solid #e2e8f0',
  paddingTop: '20px',
  textAlign: 'center' as const,
  marginTop: '40px',
}

const footerText = {
  color: '#666666',
  fontSize: '14px',
  margin: '0 0 10px 0',
}

const footerBrand = {
  color: '#999999',
  fontSize: '12px',
  margin: '0',
}

const link = {
  color: '#0f766e',
  textDecoration: 'underline',
}
