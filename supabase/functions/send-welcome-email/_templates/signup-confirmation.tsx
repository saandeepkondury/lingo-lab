
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

interface SignupConfirmationProps {
  email: string;
  token: string;
  token_hash: string;
  redirect_to: string;
  supabase_url: string;
}

export const SignupConfirmationEmail = ({
  email,
  token,
  token_hash,
  redirect_to,
  supabase_url,
}: SignupConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Confirm your LingoLab account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Heading style={logo}>
            <span style={lingoText}>Lingo</span>
            <span style={labText}>Lab</span>
          </Heading>
        </Section>
        
        <Heading style={h1}>Confirm Your Account</Heading>
        <Text style={subtitle}>Welcome to LingoLab! Please confirm your email address to get started.</Text>
        
        <Section style={confirmationSection}>
          <Text style={text}>
            Click the button below to confirm your email address and activate your account:
          </Text>
          
          <Section style={buttonSection}>
            <Button
              style={primaryButton}
              href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=signup&redirect_to=${redirect_to}`}
            >
              Confirm Email Address
            </Button>
          </Section>
          
          <Text style={orText}>Or copy and paste this confirmation code:</Text>
          <Text style={code}>{token}</Text>
        </Section>
        
        <Hr style={hr} />
        
        <Section style={footer}>
          <Text style={footerText}>
            If you didn't create an account with LingoLab, you can safely ignore this email.
          </Text>
          <Text style={footerSubtext}>
            LingoLab - Strategic Narrative for Startups
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default SignupConfirmationEmail

// Shared styles (same as welcome email)
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

const confirmationSection = {
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
