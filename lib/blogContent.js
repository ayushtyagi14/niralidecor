import DOMPurify from 'dompurify';

// New posts are saved as HTML by the rich text editor; older posts use the
// **bold** / _italic_ / [link](url) text format. Both must keep rendering.
export const isHtmlContent = (text) => /^\s*<(p|h[1-6]|ul|ol|blockquote|pre|div)[\s>]/i.test(text || '');

export const markdownToHtml = (text) => {
    if (!text) return '';

    const paragraphs = text.split(/\n{2,}/); // split on blank lines into paragraphs

    const htmlParagraphs = paragraphs.map((para) => {
        const withMarkup = para
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1<\/strong>')
            .replace(/_(.+?)_/g, '<em>$1<\/em>')
            .replace(/`(.+?)`/g, '<code>$1<\/code>')
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1<\/a>')
            .replace(/\n/g, '<br\/>'); // single newlines inside a paragraph

        return `<p>${withMarkup}<\/p>`;
    });

    return htmlParagraphs.join('');
};

// HTML ready for dangerouslySetInnerHTML (browser only)
export const renderBlogContent = (text) => {
    if (!text) return '';
    if (!isHtmlContent(text)) return markdownToHtml(text);
    if (typeof window === 'undefined') return '';
    return DOMPurify.sanitize(text, { ADD_ATTR: ['target'] });
};
