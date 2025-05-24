
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

interface EmailChangeProps {
  email: string;
  new_email: string;
  token: string;
  token_hash: string;
  redirect_to: string;
  supabase_url: string;
}

export const EmailChangeEmail = ({
  email,
  new_email,
  token,
  token_hash,
  redirect_to,
  supabase_url,
}: EmailChangeProps) => (
  <Html>
    <Head />
    <Preview>Confirm your new email address for LingoLab</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Heading style={logo}>
            <span style={lingoText}>Lingo</span>
            <span style={labText}>Lab</span>
          </Heading>
        </Section>
        
        <Heading style={h1}>Confirm Email Change</Heading>
        <Text style={subtitle}>Please confirm your new email address</Text>
        
        <Section style={changeSection}>
          <Text style={text}>
            You requested to change your email address from <strong>{email}</strong> to <strong>{new_email}</strong>.
          </Text>
          
          <Text style={text}>
            Click the button below to confirm this change:
          </Text>
          
          <Section style={buttonSection}>
            <Button
              style={primaryButton}
              href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=email_change&redirect_to=${redirect_to}`}
            >
              Confirm Email Change
            </Button>
          </Section>
          
          <Text style={orText}>Or copy and paste this confirmation code:</Text>
          <Text style={code}>{token}</Text>
        </Section>
        
        <Section style={warningSection}>
          <Text style={warningText}>
            ⚠️ If you didn't request this email change, please ignore this email or contact support immediately.
          </Text>
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

export default EmailChangeEmail

// Shared styles (same as other templates)
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
  color: '#0f766e',
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

const changeSection = {
  backgroundColor: '#f8fafc',
  padding: '30px',
  borderRadius: '12px',
  margin: '30px 0',
}

const text = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#333333',
  margin: '0 0 20px 0',
}

const buttonSection = {
  textAlign: 'center' as const,
  margin: '20px 0',
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
}

const orText = {
  fontSize: '14px',
  color: '#666666',
  textAlign: 'center' as const,
  margin: '20px 0 10px 0',
}

const code = {
  display: 'block',
  padding: '16px',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
  fontSize: '16px',
  fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  textAlign: 'center' as const,
  margin: '10px 0 20px 0',
}

const warningSection = {
  backgroundColor: '#fef7f0',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #f97316',
  margin: '20px 0',
}

const warningText = {
  fontSize: '14px',
  color: '#ea580c',
  margin: '0',
  textAlign: 'center' as const,
}

const hr = {
  borderColor: '#e2e8f0',
  margin: '20px 0',
}

const footer = {
  textAlign: 'center' as const,
}

const footerText = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#666666',
}

const footerSubtext = {
  margin: '0',
  fontSize: '12px',
  color: '#999999',
}

const link = {
  color: '#0f766e',
  textDecoration: 'underline',
}
