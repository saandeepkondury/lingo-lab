
const VCFilterSection = () => {
  const features = [
    "Scored for narrative resonance",
    "Tracked in our dealflow + publishing pipeline", 
    "Considered for warm VC introductions and customer discovery help"
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-8">
            <span className="text-2xl">📈</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Built-in VC + Market Filter</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Every Lingo Sprint™ is also a discovery engine:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                ✅
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <p className="text-xl font-semibold">
            This is where investable stories get discovered and shared — before they trend.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VCFilterSection;
