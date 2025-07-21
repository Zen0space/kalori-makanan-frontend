import React, { useState } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  showLineNumbers = false,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className={clsx('relative group', className)}>
      <div className="absolute top-2 right-2 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      <div className="overflow-hidden rounded-lg bg-gray-900 shadow-xl">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400">{language}</span>
        </div>

        <div className="overflow-x-auto">
          <pre className="p-4 text-sm text-gray-100">
            <code className={`language-${language}`}>
              {showLineNumbers ? (
                <div className="flex">
                  <div className="pr-4 text-gray-500 select-none">
                    {lines.map((_, index) => (
                      <div key={index} className="text-right">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">{code}</div>
                </div>
              ) : (
                code
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

// Quick examples component
interface CodeExampleProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
}

export const CodeExample: React.FC<CodeExampleProps> = ({
  title,
  description,
  code,
  language = 'bash'
}) => {
  return (
    <div className="space-y-2">
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>
      <CodeBlock code={code} language={language} />
    </div>
  );
};
