
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-semibold mb-10">Privacy Policy</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Introduction</h2>
              <p className="mb-4">
                At Lingo Lab, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              <p>
                This website is not intended for children and we do not knowingly collect data relating to children.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">The Data We Collect</h2>
              <p className="mb-4">
                Personal data means any information about an individual from which that person can be identified. When you use Lingo Lab, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Identity Data: name, job title, company</li>
                <li>Contact Data: email address</li>
                <li>Technical Data: IP address, browser type, time zone, operating system</li>
                <li>Usage Data: information about how you use our website and services</li>
                <li>Marketing Data: preferences in receiving marketing from us</li>
              </ul>
              <p>
                We do not collect any Special Categories of Personal Data about you (this includes details about your race, ethnicity, religious beliefs, etc.).
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">How We Use Your Data</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>To provide and improve our services</li>
                <li>To manage our relationship with you</li>
                <li>To send you the newsletter you subscribed to</li>
                <li>To personalize your experience</li>
                <li>To analyze usage patterns to improve our platform</li>
                <li>For marketing purposes if you've opted in</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Data Retention</h2>
              <p>
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Your Legal Rights</h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p>
                If you wish to exercise any of these rights, please contact us at hello@lingolab.site.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
              </p>
              <p>
                This privacy policy was last updated on May 20, 2025.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at hello@lingolab.site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
