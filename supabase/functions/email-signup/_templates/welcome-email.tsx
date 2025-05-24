
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Section,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { emailStyles } from './styles.ts'
import { EmailHeader } from './EmailHeader.tsx'
import { BenefitsSection } from './BenefitsSection.tsx'
import { CTASection } from './CTASection.tsx'
import { EmailFooter } from './EmailFooter.tsx'

interface WelcomeEmailProps {
  email: string;
  source: 'homepage' | 'newsletter';
}

export const WelcomeEmail = ({ email, source }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to LingoLab - Where words become weapons of mass persuasion! 🚀</Preview>
    <Body style={emailStyles.main}>
      <Container style={emailStyles.container}>
        <EmailHeader />
        
        <Section style={emailStyles.contentSection}>
          <Text style={emailStyles.text}>
            Hey there, future lingo legend! 👋
          </Text>
          <Text style={emailStyles.text}>
            Welcome to the most exclusive club for word wizards and narrative ninjas! You've just joined the ranks of founders who know that the right words can move mountains (and investor wallets).
          </Text>
          
          <Text style={emailStyles.text}>
            {source === 'homepage' 
              ? "We saw you lurking around our homepage – smart move! You clearly recognize game-changing potential when you see it. 🕵️‍♂️"
              : "Thanks for subscribing to The Lingo Drop! You're about to become fluent in the language of legendary fundraising. 📚"
            }
          </Text>

          <BenefitsSection />

          <CTASection />

          <Text style={emailStyles.newsletterNote}>
            <strong>P.S.</strong> Every Thursday, we drop "The Lingo" – a weekly dose of the hottest trends, emerging narratives, and linguistic gold that's reshaping entire industries. Think of it as your weekly shot of strategic storytelling espresso ☕
          </Text>
        </Section>

        <EmailFooter />
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail
