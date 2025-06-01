
const IntroSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-6 py-3 rounded-full mb-8">
            <span className="text-2xl">🔥</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lingo Sprint™</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            A 1-week productized workshop to crystallize your startup's strategic narrative using the Lingo Leverage™ methodology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              We help venture-scale founders:
            </h3>
            <ul className="space-y-4">
              {[
                "Codify their market-defining language",
                "Tell stories that stick with investors, customers, and the press", 
                "Move from \"just another startup\" to category-defining leader"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Most importantly:</h4>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              The strongest narratives get featured, followed — and funded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
