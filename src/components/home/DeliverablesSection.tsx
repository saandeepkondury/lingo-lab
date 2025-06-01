
const DeliverablesSection = () => {
  const deliverables = [
    { name: "Lingo Diagnostic", format: "Pre-form quiz", creator: "You" },
    { name: "90-min Lingo Workshop", format: "Live or async session", creator: "Us" },
    { name: "Narrative Deck", format: "VC-ready (10–12 slides)", creator: "Us + AI" },
    { name: "Lingo Map", format: "Market-shifting language visualized", creator: "Us" },
    { name: "VC Market Fit Score", format: "How investable is your narrative?", creator: "Us" },
    { name: "Featured Case Study", format: "Published on Lingo Lab", creator: "Us" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-950">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-6 py-3 rounded-full mb-8">
            <span className="text-2xl">🎁</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What You Get</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-white">Deliverable</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-white">Format</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-white">Created By</th>
                </tr>
              </thead>
              <tbody>
                {deliverables.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{item.name}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.format}</td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                        {item.creator}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
