
import { Heading, Text, Section } from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { emailStyles } from './styles.ts'

export const EmailHeader = () => (
  <Section style={emailStyles.headerSection}>
    <Heading style={emailStyles.h1}>
      Welcome to <span style={emailStyles.brandGradient}>LingoLab</span>! 🎉
    </Heading>
    <Text style={emailStyles.subtitle}>
      Where words become weapons of mass persuasion 💥
    </Text>
  </Section>
)
