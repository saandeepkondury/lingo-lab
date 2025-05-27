
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';

const Privacy = () => {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy | LingoLab"
        description="Privacy Policy for LingoLab - Learn how we collect, use, and protect your personal information on our strategic narrative platform."
        keywords="privacy policy, data protection, GDPR, personal information, LingoLab"
        canonicalUrl={`${window.location.origin}/privacy`}
      />
      
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-semibold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: December 2024</p>
          
          <div className="space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">1. Introduction</h2>
              <p className="mb-4">
                At LingoLab ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="mb-4">
                This website is not intended for children under 16 years of age, and we do not knowingly collect data relating to children.
              </p>
              <p>
                It is important that you read this privacy policy together with any other privacy policy or fair processing policy we may provide on specific occasions when we are collecting or processing personal data about you so that you are fully aware of how and why we are using your data.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">2. Data We Collect</h2>
              <p className="mb-4">
                Personal data means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Identity Data</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>First name and last name</li>
                    <li>Job title and company name</li>
                    <li>Professional role and industry</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Contact Data</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Email address</li>
                    <li>Company address (if provided)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Technical Data</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Internet protocol (IP) address</li>
                    <li>Browser type and version</li>
                    <li>Time zone setting and location</li>
                    <li>Operating system and platform</li>
                    <li>Device information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Usage Data</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Information about how you use our website and services</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Case studies viewed and saved</li>
                    <li>Search queries and filters used</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Marketing and Communications Data</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your preferences in receiving marketing from us</li>
                    <li>Newsletter subscription status</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Financial Data</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Bank account and payment card details (processed securely by third-party payment processors)</li>
                    <li>Billing address and transaction history</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4">
                We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data).
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">3. How We Collect Your Data</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Direct interactions</h3>
                  <p className="mb-2">You may give us your data by filling in forms or by corresponding with us by email or otherwise. This includes personal data you provide when you:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Create an account on our website</li>
                    <li>Subscribe to our service or publications</li>
                    <li>Request marketing to be sent to you</li>
                    <li>Submit case studies or strategic narratives</li>
                    <li>Enter a competition, promotion or survey</li>
                    <li>Give us feedback or contact us</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Automated technologies or interactions</h3>
                  <p className="mb-2">As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, server logs and other similar technologies.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Third parties or publicly available sources</h3>
                  <p>We may receive personal data about you from various third parties including analytics providers such as Google, payment providers, and social media platforms when you interact with our content.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">4. How We Use Your Data</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you</li>
                <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests</li>
                <li>Where we need to comply with a legal obligation</li>
                <li>Where you have given us your explicit consent</li>
              </ul>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Purposes for which we will use your personal data:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To register you as a new customer and manage your account</li>
                    <li>To process and deliver your subscription services including managing payments and collecting money owed to us</li>
                    <li>To manage our relationship with you including notifying you about changes to our terms or privacy policy</li>
                    <li>To enable you to partake in our services and complete surveys</li>
                    <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data)</li>
                    <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you</li>
                    <li>To use data analytics to improve our website, services, marketing, customer relationships and experiences</li>
                    <li>To make suggestions and recommendations to you about goods or services that may be of interest to you</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">5. Marketing Communications</h2>
              <p className="mb-4">
                We strive to provide you with choices regarding certain personal data uses, particularly around marketing and advertising. You can opt out of marketing communications at any time by:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Clicking the unsubscribe link in any marketing email we send you</li>
                <li>Updating your preferences in your account settings</li>
                <li>Contacting us directly at hello@lingolab.site</li>
              </ul>
              <p>
                Where you opt out of receiving these marketing messages, this will not apply to personal data provided to us as a result of a service purchase, service experience or other transactions.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">6. Cookies and Similar Technologies</h2>
              <p className="mb-4">
                Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
              </p>
              <p className="mb-4">
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Strictly necessary cookies:</strong> Required for the operation of our website</li>
                <li><strong>Analytical/performance cookies:</strong> Allow us to recognize and count visitors and see how they move around our website</li>
                <li><strong>Functionality cookies:</strong> Used to recognize you when you return to our website</li>
                <li><strong>Targeting cookies:</strong> Record your visit to our website and the pages you have visited</li>
              </ul>
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. Please note that if you disable or refuse cookies, some parts of this website may become inaccessible or not function properly.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">7. Data Sharing and Disclosure</h2>
              <p className="mb-4">
                We may share your personal data with third parties in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Service providers who perform services on our behalf (e.g., payment processors, email service providers, analytics providers)</li>
                <li>Professional advisers including lawyers, bankers, auditors and insurers</li>
                <li>Government bodies that require us to report processing activities</li>
                <li>In the event of a merger, acquisition, or sale of all or a portion of our assets</li>
                <li>To comply with legal obligations or protect our rights</li>
              </ul>
              <p>
                We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">8. Data Security</h2>
              <p className="mb-4">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
              <p className="mb-4">
                We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
              </p>
              <p>
                However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">9. Data Retention</h2>
              <p className="mb-4">
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
              </p>
              <p className="mb-4">
                To determine the appropriate retention period for personal data, we consider the amount, nature and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal, regulatory, tax, accounting or other requirements.
              </p>
              <p>
                In some circumstances you can ask us to delete your data: see your legal rights below for further information.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">10. Your Legal Rights</h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Request access</strong> to your personal data</li>
                <li><strong>Request correction</strong> of your personal data</li>
                <li><strong>Request erasure</strong> of your personal data</li>
                <li><strong>Object to processing</strong> of your personal data</li>
                <li><strong>Request restriction of processing</strong> your personal data</li>
                <li><strong>Request transfer</strong> of your personal data</li>
                <li><strong>Right to withdraw consent</strong> at any time where we are relying on consent to process your personal data</li>
              </ul>
              <p className="mb-4">
                If you wish to exercise any of these rights, please contact us at hello@lingolab.site.
              </p>
              <p className="mb-4">
                You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive.
              </p>
              <p>
                We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data (or to exercise any of your other rights). This is a security measure to ensure that personal data is not disclosed to any person who has no right to receive it.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">11. Third-Party Links</h2>
              <p>
                This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">12. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date.
              </p>
              <p className="mb-4">
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
              </p>
              <p>
                If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page or by email to the primary email address specified in your account.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">13. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p className="mb-2">Email: hello@lingolab.site</p>
              <p className="mb-4">Website: lingolab.site</p>
              <p>
                You also have the right to make a complaint at any time to your local supervisory authority for data protection issues. We would, however, appreciate the chance to deal with your concerns before you approach the supervisory authority so please contact us in the first instance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
