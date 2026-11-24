'use client';

import { imagePosition } from '@/lib/imagePosition';

const clamp = (n) => Math.min(100, Math.max(0, Math.round(n)));

// Click (or use arrow keys) on the full image to choose the point that stays visible
// when the image is cropped; the preview shows the real crop at the page's aspect ratio.
export default function CoverPositionPicker({ src, label, hint, aspectRatio, value, onChange }) {
    const [x, y] = imagePosition(value).split(' ').map(parseFloat);
    const set = (nx, ny) => onChange(`${clamp(nx)}% ${clamp(ny)}%`);

    const pick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        set(((e.clientX - rect.left) / rect.width) * 100, ((e.clientY - rect.top) / rect.height) * 100);
    };

    const nudge = (e) => {
        const step = e.shiftKey ? 10 : 2;
        const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
        const move = moves[e.key];
        if (!move) return;
        e.preventDefault();
        set(x + move[0], y + move[1]);
    };

    return (
        <div className="position-picker">
            <div className="position-picker-head">
                <span className="form-label">{label}</span>
                <span className="position-value">{value ? `${x}% ${y}%` : 'Centered'}</span>
                {value && (
                    <button type="button" className="position-reset" onClick={() => onChange('')}>
                        Reset to center
                    </button>
                )}
            </div>
            {hint && <p className="position-hint">{hint}</p>}
            <div className="position-picker-body">
                <button
                    type="button"
                    className="position-source"
                    onClick={pick}
                    onKeyDown={nudge}
                    aria-label={`${label}: choose which part of the image stays visible. Currently ${x}% across, ${y}% down. Arrow keys move it.`}
                >
                    <img src={src} alt="" draggable={false} />
                    <span className="position-marker" style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true" />
                </button>
                <div className="position-preview-wrap">
                    <div className="position-preview" style={{ aspectRatio }}>
                        <img src={src} alt="" style={{ objectPosition: `${x}% ${y}%` }} />
                    </div>
                    <span className="position-preview-label">Preview ({aspectRatio.replace(/\s/g, '')})</span>
                </div>
            </div>
        </div>
    );
}
