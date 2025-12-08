'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './case-studies.css';

export default function CaseStudiesPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetch('/api/case-studies')
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const published = data.filter(i => (i.status || 'published') === 'published');
                    setItems(published);
                } else {
                    console.error('API did not return an array:', data);
                    setItems([]);
                }
            })
            .catch((err) => console.error('Error fetching case studies:', err))
            .finally(() => setLoading(false));
    }, []);

    const cats = useMemo(() => ['All', ...Array.from(new Set(items.map(i => i.category)))], [items]);

    const filtered = useMemo(() => {
        const term = q.toLowerCase();
        return items.filter(i => {
            const inCat = activeCategory === 'All' || i.category === activeCategory;
            const inText = `${i.title} ${i.summary} ${i.tags?.join(' ')}`.toLowerCase().includes(term);
            return inCat && inText;
        });
    }, [items, q, activeCategory]);

    return (
        <>
            <Navbar />
        <section className="case-layout">
            <div className="page-banner">
                <Image
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"
                    alt="Case Studies Banner"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            <div className="page-header">
                <h2 className="headline">Case Studies</h2>
                <p className="lead">Weddings, sangeets, and corporate events with measurable outcomes.</p>
            </div>

            {loading ? (
                <div className="muted">Loading case studies…</div>
            ) : (
                <div className="layout">
                    <aside className="sidebar">
                        <div className="filter-group">
                            <div className="filter-title">Search</div>
                            <div className="search">
                                <input
                                    value={q}
                                    onChange={e => setQ(e.target.value)}
                                    placeholder="Search case studies"
                                />
                            </div>
                        </div>
                        <div className="filter-group">
                            <div className="filter-title">Category</div>
                            <div className="chipset">
                                {cats.map(c => {
                                    const displayCategory = c.length > 12 ? c.substring(0, 12) + '...' : c;
                                    return (
                                        <button
                                            key={c}
                                            className={`chip ${activeCategory === c ? 'active' : ''}`}
                                            onClick={() => setActiveCategory(c)}
                                            title={c}
                                        >
                                            {displayCategory}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                    <div className="case-grid">
                        {filtered.map(cs => {
                            const truncatedTitle = cs.title.length > 50 ? cs.title.substring(0, 50) + '...' : cs.title;
                            const truncatedSummary = cs.summary?.length > 100 ? cs.summary.substring(0, 100) + '...' : cs.summary;
                            const truncatedClient = cs.client.length > 25 ? cs.client.substring(0, 25) + '...' : cs.client;
                            return (
                                <Link key={cs.id} href={`/case-studies/${cs.id}`} className="case-card">
                                    {cs.hero_image && (
                                        <div className="case-media">
                                            <Image
                                                src={cs.hero_image}
                                                alt={cs.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <div className="case-year">{cs.year}</div>
                                        </div>
                                    )}
                                    <div className="case-body">
                                        <div className="case-category">
                                            {cs.category.length > 15 ? cs.category.substring(0, 15) + '...' : cs.category}
                                        </div>
                                        <h3 className="case-title">{truncatedTitle}</h3>
                                        <p className="case-client">{truncatedClient}</p>
                                        <p className="case-summary">{truncatedSummary}</p>
                                        <div className="case-metrics">
                                            {cs.metrics?.slice(0, 2).map(m => (
                                                <div key={m.label} className="case-metric">
                                                    <div className="case-metric-value">{m.value || '—'}</div>
                                                    <div className="case-metric-label">
                                                        {m.label.length > 15 ? m.label.substring(0, 15) + '...' : m.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="tags">
                                            {cs.tags?.slice(0, 3).map(t => (
                                                <span key={t} className="tag">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
            <Footer />
        </>
    );
}
