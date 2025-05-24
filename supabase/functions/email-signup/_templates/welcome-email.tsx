
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

interface WelcomeEmailProps {
  email: string;
  source: 'homepage' | 'newsletter';
}

export const WelcomeEmail = ({ email, source }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to LingoLab - Master Strategic Narrative</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Heading style={h1}>
            Welcome to <span style={brandGradient}>LingoLab</span>! 🎉
          </Heading>
          <Text style={subtitle}>
            Master strategic narrative to secure venture capital 3x faster
          </Text>
        </Section>
        
        <Section style={contentSection}>
          <Text style={text}>
            Hi there,
          </Text>
          <Text style={text}>
            Thank you for joining LingoLab! You've taken the first step toward mastering the art of strategic narrative that drives successful fundraising.
          </Text>
          
          <Text style={text}>
            {source === 'homepage' 
              ? "We noticed you're interested in learning how top founders use strategic narrative to raise millions and shape markets."
              : "Thanks for subscribing to The Lingo Drop! You'll receive weekly insights on strategic narrative breakthroughs."
            }
          </Text>

          <Section style={benefitsSection}>
            <Heading style={h2}>What's next?</Heading>
            <Text style={benefitItem}>
              ✨ <strong>Explore Case Studies:</strong> Discover how companies like Notion, Figma, and ChatGPT used strategic language to define new categories
            </Text>
            <Text style={benefitItem}>
              📚 <strong>Weekly Insights:</strong> Get "The Lingo Drop" newsletter with analysis of powerful strategic narratives
            </Text>
            <Text style={benefitItem}>
              🎯 <strong>Founder Interviews:</strong> Exclusive conversations with VCs and founders on narrative strategy
            </Text>
            <Text style={benefitItem}>
              🔧 <strong>Frameworks & Tools:</strong> Early access to our positioning frameworks and narrative tools
            </Text>
          </Section>

          <Section style={ctaSection}>
            <Button href="https://pnwakyibtpncjosghlbh.supabase.co/join" style={button}>
              Get Started →
            </Button>
            <Text style={ctaText}>
              Create your account to unlock our full library of case studies and strategic insights.
            </Text>
          </Section>
        </Section>

        <Section style={footerSection}>
          <Text style={footer}>
            Best regards,<br />
            The LingoLab Team
          </Text>
          <Text style={footerLinks}>
            <Link href="https://pnwakyibtpncjosghlbh.supabase.co" style={link}>
              LingoLab
            </Link>
            {" • "}
            <Link href="https://pnwakyibtpncjosghlbh.supabase.co/case-studies" style={link}>
              Case Studies
            </Link>
            {" • "}
            <Link href="https://pnwakyibtpncjosghlbh.supabase.co/newsletter" style={link}>
              Newsletter
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  margin: '40px auto',
  padding: '0',
  width: '600px',
  maxWidth: '100%',
}

const headerSection = {
  backgroundColor: '#0f766e',
  borderRadius: '12px 12px 0 0',
  padding: '40px 40px 30px 40px',
  textAlign: 'center' as const,
}

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '600',
  lineHeight: '1.2',
  margin: '0 0 12px 0',
}

const brandGradient = {
  background: 'linear-gradient(135deg, #ffffff 0%, #f97316 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const subtitle = {
  color: '#e6fffa',
  fontSize: '18px',
  lineHeight: '1.4',
  margin: '0',
}

const contentSection = {
  padding: '40px 40px 20px 40px',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
}

const h2 = {
  color: '#0f766e',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '32px 0 20px 0',
}

const benefitsSection = {
  backgroundColor: '#f0fdfa',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
}

const benefitItem = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
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
  margin: '0 0 16px 0',
}

const ctaText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
}

const footerSection = {
  borderTop: '1px solid #e2e8f0',
  padding: '32px 40px',
  textAlign: 'center' as const,
}

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 16px 0',
}

const footerLinks = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0',
}

const link = {
  color: '#0f766e',
  textDecoration: 'underline',
}
