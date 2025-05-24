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
    <Preview>Welcome to LingoLab - Where words become weapons of mass persuasion! 🚀</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Heading style={h1}>
            Welcome to <span style={brandGradient}>LingoLab</span>! 🎉
          </Heading>
          <Text style={subtitle}>
            Where words become weapons of mass persuasion 💥
          </Text>
        </Section>
        
        <Section style={contentSection}>
          <Text style={text}>
            Hey there, future lingo legend! 👋
          </Text>
          <Text style={text}>
            Welcome to the most exclusive club for word wizards and narrative ninjas! You've just joined the ranks of founders who know that the right words can move mountains (and investor wallets).
          </Text>
          
          <Text style={text}>
            {source === 'homepage' 
              ? "We saw you lurking around our homepage – smart move! You clearly recognize game-changing potential when you see it. 🕵️‍♂️"
              : "Thanks for subscribing to The Lingo Drop! You're about to become fluent in the language of legendary fundraising. 📚"
            }
          </Text>

          <Section style={benefitsSection}>
            <Heading style={h2}>What's cooking in your inbox? 🍳</Heading>
            <Text style={benefitItem}>
              🔥 <strong>Weekly Lingo Drops:</strong> Fresh insights on how companies like Notion, Figma, and ChatGPT used strategic narrative to bend reality (and secure millions)
            </Text>
            <Text style={benefitItem}>
              🎯 <strong>Founder War Stories:</strong> Exclusive tea-spilling sessions with VCs and founders who've mastered the art of persuasive storytelling
            </Text>
            <Text style={benefitItem}>
              🧠 <strong>Category Creation Secrets:</strong> Learn how to make your competition irrelevant by creating entirely new markets
            </Text>
            <Text style={benefitItem}>
              ⚡ <strong>Narrative Frameworks:</strong> Battle-tested templates that turn "meh" pitches into "take my money" moments
            </Text>
          </Section>

          <Section style={ctaSection}>
            <Text style={ctaIntro}>
              Ready to level up from word-curious to word-dangerous? 🎮
            </Text>
            <Button href="https://lingolab.site/join" style={button}>
              Create Your Account →
            </Button>
            <Text style={ctaText}>
              Join our community and unlock our full arsenal of case studies, frameworks, and insider secrets. It's like having a narrative consultant in your pocket! 📱
            </Text>
          </Section>

          <Text style={newsletterNote}>
            <strong>P.S.</strong> Every Thursday, we drop "The Lingo" – a weekly dose of the hottest trends, emerging narratives, and linguistic gold that's reshaping entire industries. Think of it as your weekly shot of strategic storytelling espresso ☕
          </Text>
        </Section>

        <Section style={footerSection}>
          <Text style={footer}>
            Keep crafting those killer narratives! 🚀<br />
            The LingoLab Team
          </Text>
          <Text style={footerLinks}>
            <Link href="https://lingolab.site" style={link}>
              LingoLab
            </Link>
            {" • "}
            <Link href="https://lingolab.site/case-studies" style={link}>
              Case Studies
            </Link>
            {" • "}
            <Link href="https://lingolab.site/newsletter" style={link}>
              Newsletter
            </Link>
          </Text>
          <Text style={unsubscribeText}>
            Not feeling the lingo love? <Link href="https://lingolab.site" style={link}>Manage preferences</Link>
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

const ctaIntro = {
  color: '#374151',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
}

const newsletterNote = {
  color: '#0f766e',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '24px 0 0 0',
  backgroundColor: '#f0fdfa',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #0f766e',
}

const unsubscribeText = {
  color: '#9ca3af',
  fontSize: '11px',
  lineHeight: '1.5',
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
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
