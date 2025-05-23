
const ValueProposition = () => {
  return (
    <section className="bg-muted py-20">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">Why Lingo Lab?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto dark:text-zinc-200">
            The smartest founders know language shapes markets. We've decoded their playbooks.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 dark:bg-teal-900/20 dark:border-teal-700/30">
            <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4 dark:bg-teal-700/40 dark:text-teal-300">
              1
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Deep Case Studies</h3>
            <p className="text-muted-foreground dark:text-zinc-300">
              Get inside successful narrative strategies with detailed breakdowns of what worked, why, and how.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 dark:bg-teal-900/20 dark:border-teal-700/30">
            <div className="h-12 w-12 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center mb-4 dark:bg-coral-700/30 dark:text-coral-200">
              2
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">VC Insights</h3>
            <p className="text-muted-foreground dark:text-zinc-300">
              Every case study includes expert commentary from venture capitalists on why the narrative worked.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 dark:bg-teal-900/20 dark:border-teal-700/30">
            <div className="h-12 w-12 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mb-4 dark:bg-gold-700/30 dark:text-gold-200">
              3
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Actionable Templates</h3>
            <p className="text-muted-foreground dark:text-zinc-300">
              Apply these frameworks to your own company with templates and step-by-step guides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
