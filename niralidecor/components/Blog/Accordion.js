'use client';

import { useState } from 'react';

export default function Accordion({ items }) {
    const [openId, setOpenId] = useState(items.length > 0 ? items[0].id : null);

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`accordion-item ${openId === item.id ? 'active' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <button
                        className="accordion-trigger"
                        onClick={() => setOpenId(openId === item.id ? null : item.id)}
                        aria-expanded={openId === item.id}
                    >
                        <span className="accordion-question">{item.question}</span>
                        <span className="chevron" aria-hidden>▾</span>
                    </button>
                    <div className={`accordion-panel-wrapper ${openId === item.id ? 'open' : ''}`}>
                        <div className="accordion-panel">
                            <p dangerouslySetInnerHTML={{ __html: formatText(item.answer) }}></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Helper function to format markdown-like text
function formatText(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}
