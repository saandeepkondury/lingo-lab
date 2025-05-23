
const FAQ = () => {
  return (
    <div className="bg-muted/30 rounded-xl p-8 mt-16">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <h3 className="font-medium mb-2">Can I switch plans later?</h3>
          <p className="text-muted-foreground">
            Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Do you offer refunds?</h3>
          <p className="text-muted-foreground">
            We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, just let us know.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
          <p className="text-muted-foreground">
            We accept all major credit cards, as well as PayPal for annual billing plans.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Can I request specific case studies?</h3>
          <p className="text-muted-foreground">
            Pro and Investor plan members can submit case study requests, which our team will consider for future additions.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Do you offer team discounts?</h3>
          <p className="text-muted-foreground">
            Yes, we offer special pricing for teams of 3 or more. Please contact us for details.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">How often is new content added?</h3>
          <p className="text-muted-foreground">
            We add new case studies weekly and refresh existing content with new insights regularly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
