
import { Text, Section, Button } from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { emailStyles } from './styles.ts'

export const CTASection = () => (
  <Section style={emailStyles.ctaSection}>
    <Text style={emailStyles.ctaIntro}>
      Ready to level up from word-curious to word-dangerous? 🎮
    </Text>
    <Button href="https://lingolab.site/join" style={emailStyles.button}>
      Create Your Account →
    </Button>
    <Text style={emailStyles.ctaText}>
      Join our community and unlock our full arsenal of case studies, frameworks, and insider secrets. It's like having a narrative consultant in your pocket! 📱
    </Text>
  </Section>
)
