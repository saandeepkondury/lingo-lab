
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-semibold mb-10">Terms of Service</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Agreement to Terms</h2>
              <p>
                By accessing or using the Lingo Lab website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Intellectual Property</h2>
              <p className="mb-4">
                The Lingo Lab service and its original content, features, and functionality are and will remain the exclusive property of Lingo Lab and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Lingo Lab.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">User Content</h2>
              <p className="mb-4">
                When you submit content to Lingo Lab, including case studies, strategic narratives, or other materials ("User Content"), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute it in any media.
              </p>
              <p className="mb-4">
                You represent and warrant that you own or have the necessary rights to the User Content you submit and that the User Content does not infringe upon the rights of any third party.
              </p>
              <p>
                We reserve the right to remove any User Content at our sole discretion.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Subscriptions</h2>
              <p className="mb-4">
                Some parts of the service may be billed on a subscription basis. You will be billed in advance on a recurring and periodic basis, depending on the type of subscription plan you select.
              </p>
              <p className="mb-4">
                At the end of each period, your subscription will automatically renew under the same conditions unless you cancel it or Lingo Lab cancels it.
              </p>
              <p>
                You may cancel your subscription at any time. Refunds are provided in accordance with our refund policy.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Limitation of Liability</h2>
              <p>
                In no event shall Lingo Lab, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Disclaimer</h2>
              <p>
                Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p>
                By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-3">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at hello@lingolab.site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
