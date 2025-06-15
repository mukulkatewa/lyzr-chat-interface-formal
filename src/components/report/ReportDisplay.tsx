
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReportDisplayProps {
  content: string;
}

export function ReportDisplay({ content }: ReportDisplayProps) {
  return (
    <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
      <div className="prose prose-lg max-w-full dark:prose-invert prose-headings:text-cyan-400 prose-a:text-purple-400 prose-strong:text-gray-200 prose-p:text-gray-300 prose-li:text-gray-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <a 
                {...props} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-400 underline hover:text-purple-300 transition-colors" 
              />
            ),
            p: ({ node, ...props }) => <p {...props} className="my-4 leading-relaxed" />,
            h1: ({ node, ...props }) => <h1 {...props} className="text-2xl font-bold text-cyan-400 mb-4" />,
            h2: ({ node, ...props }) => <h2 {...props} className="text-xl font-semibold text-cyan-400 mb-3" />,
            h3: ({ node, ...props }) => <h3 {...props} className="text-lg font-medium text-cyan-400 mb-2" />,
            ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-6 space-y-2" />,
            ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-6 space-y-2" />,
            blockquote: ({ node, ...props }) => (
              <blockquote 
                {...props} 
                className="border-l-4 border-purple-400 pl-4 italic text-gray-400 my-4" 
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
