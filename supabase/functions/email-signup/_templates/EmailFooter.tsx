
import { Text, Section, Link } from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { emailStyles } from './styles.ts'

export const EmailFooter = () => (
  <Section style={emailStyles.footerSection}>
    <Text style={emailStyles.footer}>
      Keep crafting those killer narratives! 🚀<br />
      The LingoLab Team
    </Text>
    <Text style={emailStyles.footerLinks}>
      <Link href="https://lingolab.site" style={emailStyles.link}>
        LingoLab
      </Link>
      {" • "}
      <Link href="https://lingolab.site/case-studies" style={emailStyles.link}>
        Case Studies
      </Link>
      {" • "}
      <Link href="https://lingolab.site/newsletter" style={emailStyles.link}>
        Newsletter
      </Link>
    </Text>
    <Text style={emailStyles.unsubscribeText}>
      Not feeling the lingo love? <Link href="https://lingolab.site" style={emailStyles.link}>Manage preferences</Link>
    </Text>
  </Section>
)
