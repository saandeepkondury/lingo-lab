
import { Heading, Text, Section } from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { emailStyles } from './styles.ts'

export const BenefitsSection = () => (
  <Section style={emailStyles.benefitsSection}>
    <Heading style={emailStyles.h2}>What's cooking in your inbox? 🍳</Heading>
    <Text style={emailStyles.benefitItem}>
      🔥 <strong>Weekly Lingo Drops:</strong> Fresh insights on how companies like Notion, Figma, and ChatGPT used strategic narrative to bend reality (and secure millions)
    </Text>
    <Text style={emailStyles.benefitItem}>
      🎯 <strong>Founder War Stories:</strong> Exclusive tea-spilling sessions with VCs and founders who've mastered the art of persuasive storytelling
    </Text>
    <Text style={emailStyles.benefitItem}>
      🧠 <strong>Category Creation Secrets:</strong> Learn how to make your competition irrelevant by creating entirely new markets
    </Text>
    <Text style={emailStyles.benefitItem}>
      ⚡ <strong>Narrative Frameworks:</strong> Battle-tested templates that turn "meh" pitches into "take my money" moments
    </Text>
  </Section>
)
