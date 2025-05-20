
import React from 'react';

const SubmitBenefits = () => {
  return (
    <div className="space-y-6">
      <div className="apple-card p-6">
        <h3 className="text-lg font-medium mb-4">Why Request a Feature?</h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
              1
            </div>
            <span>Get featured in our library and newsletter</span>
          </li>
          <li className="flex gap-3">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
              2
            </div>
            <span>Share your strategic communication wins</span>
          </li>
          <li className="flex gap-3">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
              3
            </div>
            <span>Connect with other narrative-minded founders</span>
          </li>
          <li className="flex gap-3">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
              4
            </div>
            <span>Receive expert analysis on your messaging</span>
          </li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Our Interview Process</h3>
        <p className="text-muted-foreground">
          We carefully review all submissions and select the most compelling strategic narratives for a featured interview.
        </p>
        <p className="text-muted-foreground">
          If selected, our team will reach out to schedule a 30-minute interview to dive deeper into your lingo story, discussing the strategy behind it and measuring its impact.
        </p>
        <p className="text-muted-foreground">
          After the interview, we'll create a professionally written case study that highlights your company's strategic narrative success.
        </p>
      </div>
    </div>
  );
};

export default SubmitBenefits;
