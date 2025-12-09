'use client';

import { useRef } from 'react';

export default function FormattedTextarea({ value, onChange, placeholder, rows = 6 }) {
    const ref = useRef(null);

    const applyWrap = (prefix, suffix = prefix) => {
        const el = ref.current;
        if (!el) return;
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? 0;
        const before = value.slice(0, start);
        const selected = value.slice(start, end);
        const after = value.slice(end);
        const next = `${before}${prefix}${selected || 'text'}${suffix}${after}`;
        onChange({ target: { value: next } });
        const cursor = start + prefix.length + (selected ? selected.length : 4) + suffix.length;
        requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(cursor, cursor);
        });
    };

    const insertLink = () => {
        const el = ref.current;
        if (!el) return;
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? 0;
        const before = value.slice(0, start);
        const selected = value.slice(start, end) || 'label';
        const after = value.slice(end);
        const url = 'https://';
        const next = `${before}[${selected}](${url})${after}`;
        onChange({ target: { value: next } });
        const pos = before.length + selected.length + 3;
        requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(pos, pos + url.length);
        });
    };

    return (
        <div className="fmt">
            <div className="fmt-toolbar">
                <button type="button" className="fmt-btn" onClick={() => applyWrap('**')}>Bold</button>
                <button type="button" className="fmt-btn" onClick={() => applyWrap('_')}>Italic</button>
                <button type="button" className="fmt-btn" onClick={insertLink}>Link</button>
                <button type="button" className="fmt-btn" onClick={() => applyWrap('`')}>Code</button>
            </div>
            <textarea
                ref={ref}
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="fmt-textarea"
            />
        </div>
    );
}
