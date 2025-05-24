
interface InterviewTabProps {
  caseStudy: any;
}

const InterviewTab = ({ caseStudy }: InterviewTabProps) => {
  return (
    <div className="prose prose-indigo dark:prose-invert max-w-none">
      <h2 className="text-2xl font-semibold mb-6">Founder Interview</h2>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-indigo-200 dark:bg-indigo-800 overflow-hidden">
            <img 
              src={caseStudy.author?.image || "/placeholder.svg"} 
              alt="Founder" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">Patrick Collison</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">CEO & Co-founder, Stripe</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">How did you come up with the term "Financial Infrastructure"?</h3>
          <p className="mb-4">
            "We realized early on that calling ourselves a 'payments company' was limiting. When you say payments, 
            people think of credit card processing - a commodity service with thin margins. But what we were building 
            was much more fundamental. We were creating the economic plumbing for the internet."
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">What was the turning point for this narrative?</h3>
          <p className="mb-4">
            "It was around 2018 when we started consistently using 'infrastructure' in our messaging. 
            The analogy to AWS was intentional - just as they made computing resources programmable, 
            we wanted to make financial services programmable. That framing opened up entirely new product categories."
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">How did this impact your product roadmap?</h3>
          <p className="mb-4">
            "Once we positioned as infrastructure, products like Stripe Atlas, Treasury, and Issuing became 
            logical extensions rather than random diversifications. Infrastructure companies build platforms, 
            not just point solutions."
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewTab;
