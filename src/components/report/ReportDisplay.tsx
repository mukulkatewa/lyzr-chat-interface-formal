
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReportDisplayProps {
  content: string;
}

export function ReportDisplay({ content }: ReportDisplayProps) {
  return (
    <div className="bg-card/50 border border-white/10 rounded-xl p-6 animate-fade-in">
      <div className="prose prose-sm max-w-full dark:prose-invert prose-headings:text-primary prose-a:text-primary">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80" />,
            p: ({ node, ...props }) => <p {...props} className="my-2" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
