import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Loader2, AlertCircle } from 'lucide-react';

interface NotebookViewerProps {
    url: string;
}

interface NbCell {
    cell_type: 'markdown' | 'code';
    source: string[];
    execution_count?: number | null;
    outputs?: any[];
}

interface NbRoot {
    cells: NbCell[];
}

const NotebookViewer: React.FC<NotebookViewerProps> = ({ url }) => {
    const [data, setData] = useState<NbRoot | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotebook = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to load notebook: ${response.statusText}`);
                }
                const json = await response.json();
                setData(json);
            } catch (err) {
                console.error("Notebook load error:", err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchNotebook();
    }, [url]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-64 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
                <p>Loading Notebook...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-64 text-red-400 bg-red-900/10 rounded-lg border border-red-500/20">
                <AlertCircle className="w-8 h-8 mb-4" />
                <p>Error loading notebook</p>
                <p className="text-sm text-red-300/70 mt-2">{error}</p>
            </div>
        );
    }

    if (!data || !data.cells) {
        return (
            <div className="p-8 text-center text-slate-400">
                Invalid notebook format.
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto bg-white text-slate-900 p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">
                {data.cells.map((cell, index) => {
                    const sourceText = Array.isArray(cell.source)
                        ? cell.source.join('')
                        : cell.source || '';

                    if (cell.cell_type === 'markdown') {
                        return (
                            <div key={index} className="prose prose-slate max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        a: ({ node, ...props }) => <a {...props} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" />
                                    }}
                                >
                                    {sourceText}
                                </ReactMarkdown>
                            </div>
                        );
                    } else if (cell.cell_type === 'code') {
                        return (
                            <div key={index} className="mb-6 group">
                                {/* Input Area */}
                                <div className="flex gap-2">
                                    <div className="w-16 flex-shrink-0 text-right pt-2 font-mono text-xs text-slate-400 select-none">
                                        In [{cell.execution_count || ' '}]:
                                    </div>
                                    <div className="flex-1 overflow-hidden rounded-md border border-slate-200">
                                        <SyntaxHighlighter
                                            language="python"
                                            style={vscDarkPlus}
                                            customStyle={{ margin: 0, borderRadius: 0 }}
                                            showLineNumbers={false}
                                        >
                                            {sourceText}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>

                                {/* Output Area */}
                                {cell.outputs && cell.outputs.length > 0 && (
                                    <div className="flex gap-2 mt-2">
                                        <div className="w-16 flex-shrink-0 text-right pt-2 font-mono text-xs text-red-400 select-none">
                                            {cell.outputs[0]?.execution_count ? `Out[${cell.outputs[0].execution_count}]:` : ''}
                                        </div>
                                        <div className="flex-1 overflow-x-auto">
                                            {cell.outputs.map((out: any, i: number) => {
                                                if (out.text) {
                                                    // Standard output (stream)
                                                    const text = Array.isArray(out.text) ? out.text.join('') : out.text;
                                                    return (
                                                        <pre key={i} className="font-mono text-sm text-slate-600 whitespace-pre-wrap">
                                                            {text}
                                                        </pre>
                                                    );
                                                } else if (out.data && out.data['text/plain']) {
                                                    // Execute result
                                                    const text = Array.isArray(out.data['text/plain']) ? out.data['text/plain'].join('') : out.data['text/plain'];
                                                    return (
                                                        <pre key={i} className="font-mono text-sm text-slate-600 whitespace-pre-wrap">
                                                            {text}
                                                        </pre>
                                                    );
                                                }
                                                // TODO: processing images (image/png)
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default NotebookViewer;
