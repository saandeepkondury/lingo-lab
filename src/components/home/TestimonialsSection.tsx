
const TestimonialsSection = () => {
  const testimonials = [
    "This gave me the perfect positioning for our Seed deck.",
    "We stopped sounding like a feature and started sounding like a category.",
    "Investors started repeating our lingo back to us."
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 px-6 py-3 rounded-full mb-8">
            <span className="text-2xl">🧠</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Founders Love It</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((quote, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium italic">
                "{quote}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">You don't just get a deck —</h3>
          <p className="text-xl opacity-90">
            You get language that spreads across your entire go-to-market engine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
