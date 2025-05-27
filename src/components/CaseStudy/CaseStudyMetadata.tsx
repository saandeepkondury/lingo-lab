
interface CaseStudyMetadataProps {
  narrative: any;
}

const CaseStudyMetadata = ({ narrative }: CaseStudyMetadataProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateReadTime = (content: string) => {
    // Estimate read time based on content length
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const readTime = calculateReadTime(
    (narrative.lingo_evolution || '') + 
    (narrative.why_it_worked || '') + 
    (narrative.tagline || '')
  );

  return (
    <div className="container max-w-4xl mx-auto px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {readTime} • Published {formatDate(narrative.created_at)}
        </div>
        <div className="flex gap-4 text-sm text-gray-500">
          {narrative.founded_year && (
            <span>Founded: {narrative.founded_year}</span>
          )}
          {narrative.funding_raised && (
            <span>Funding: {narrative.funding_raised}</span>
          )}
          {narrative.valuation && (
            <span>Valuation: {narrative.valuation}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyMetadata;
