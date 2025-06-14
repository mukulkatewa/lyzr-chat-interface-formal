
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReportDisplayProps {
  content: string;
}

export function ReportDisplay({ content }: ReportDisplayProps) {
  return (
    <div className="bg-card border rounded-xl p-6 animate-fade-in">
      <div className="prose prose-sm max-w-full dark:prose-invert">
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
