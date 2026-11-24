// Cover-image crop focus, stored as a CSS object-position "X% Y%" (e.g. "50% 20%").
// Anything that isn't two percentages in 0–100 is rejected, so stored values are always safe to put in a style.
const POSITION_RE = /^(\d{1,3}(?:\.\d+)?)% (\d{1,3}(?:\.\d+)?)%$/;

export const DEFAULT_IMAGE_POSITION = '50% 50%';

export function sanitizeImagePosition(value) {
    const match = typeof value === 'string' && value.trim().match(POSITION_RE);
    if (!match || Number(match[1]) > 100 || Number(match[2]) > 100) return null;
    return `${match[1]}% ${match[2]}%`;
}

export function imagePosition(value) {
    return sanitizeImagePosition(value) || DEFAULT_IMAGE_POSITION;
}
