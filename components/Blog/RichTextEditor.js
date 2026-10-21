'use client';

import { useEffect, useRef } from 'react';
import { useEditor, useEditorState, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { isHtmlContent, markdownToHtml } from '@/lib/blogContent';

const toEditorHtml = (value) => (isHtmlContent(value) ? value : markdownToHtml(value || ''));

// Pasted Google Docs images point to temporary Google URLs, so drop them;
// demote H1 because the post title is already the page's H1.
const cleanPastedHtml = (html) =>
    html
        .replace(/<img[^>]*>/gi, '')
        .replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2');

export default function RichTextEditor({ value, onChange, placeholder }) {
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    });

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
                underline: false,
                link: {
                    openOnClick: false,
                    autolink: true,
                    HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
                },
            }),
            Placeholder.configure({ placeholder }),
        ],
        content: toEditorHtml(value),
        editorProps: {
            attributes: { class: 'rte-content' },
            transformPastedHTML: cleanPastedHtml,
        },
        onUpdate: ({ editor }) => {
            onChangeRef.current({ target: { value: editor.isEmpty ? '' : editor.getHTML() } });
        },
    });

    // Load a different post (Edit / Cancel / after save) into the editor
    useEffect(() => {
        if (!editor) return;
        const current = editor.isEmpty ? '' : editor.getHTML();
        if (value !== current) {
            editor.commands.setContent(toEditorHtml(value), { emitUpdate: false });
        }
    }, [editor, value]);

    const active = useEditorState({
        editor,
        selector: ({ editor }) =>
            editor
                ? {
                      bold: editor.isActive('bold'),
                      italic: editor.isActive('italic'),
                      h2: editor.isActive('heading', { level: 2 }),
                      h3: editor.isActive('heading', { level: 3 }),
                      bulletList: editor.isActive('bulletList'),
                      orderedList: editor.isActive('orderedList'),
                      link: editor.isActive('link'),
                  }
                : {},
    }) || {};

    const setLink = () => {
        const previous = editor.getAttributes('link').href || 'https://';
        const url = window.prompt('Link URL (leave empty to remove the link)', previous);
        if (url === null) return;
        const chain = editor.chain().focus().extendMarkRange('link');
        if (url.trim() === '') chain.unsetLink().run();
        else chain.setLink({ href: url.trim() }).run();
    };

    const btn = (label, isActive, onClick) => (
        <button
            type="button"
            className={`fmt-btn ${isActive ? 'is-active' : ''}`}
            onClick={onClick}
            disabled={!editor}
        >
            {label}
        </button>
    );

    return (
        <div className="fmt rte">
            <div className="fmt-toolbar">
                {btn('Bold', active.bold, () => editor.chain().focus().toggleBold().run())}
                {btn('Italic', active.italic, () => editor.chain().focus().toggleItalic().run())}
                {btn('Heading', active.h2, () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
                {btn('Subheading', active.h3, () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
                {btn('• List', active.bulletList, () => editor.chain().focus().toggleBulletList().run())}
                {btn('1. List', active.orderedList, () => editor.chain().focus().toggleOrderedList().run())}
                {btn('Link', active.link, setLink)}
                {btn('Undo', false, () => editor.chain().focus().undo().run())}
                {btn('Redo', false, () => editor.chain().focus().redo().run())}
            </div>
            <EditorContent editor={editor} />
            <p className="rte-hint">
                Paste straight from Google Docs: headings, bold, italic, lists and links are kept. Upload images separately.
            </p>
        </div>
    );
}
