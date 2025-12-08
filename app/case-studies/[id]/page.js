'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../case-studies.css';

export default function CaseStudyDetailPage() {
    const params = useParams();
    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (params.id) {
            fetchCaseStudy();
        }
    }, [params.id]);

    const fetchCaseStudy = async () => {
        try {
            const res = await fetch(`/api/case-studies/${params.id}`);
            if (!res.ok) {
                throw new Error('Case study not found');
            }
            const data = await res.json();
            setCaseStudy(data);
        } catch (error) {
            console.error('Error fetching case study:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const formatContent = (text) => {
        if (!text) return '';
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.+?)_/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code>$1</code>')
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/\n/g, '<br/>');
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="case-studies-container">
                    <div className="case-studies-loading">Loading...</div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !caseStudy) {
        return (
            <>
                <Navbar />
                <div className="case-studies-container">
                    <div className="case-studies-error">
                        <h2>Case study not found</h2>
                        <Link href="/case-studies" className="back-link">← Back to Case Studies</Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const quickFacts = [
        { label: 'Client', value: caseStudy.client },
        { label: 'Category', value: caseStudy.category },
        { label: 'Year', value: caseStudy.year },
        { label: 'Status', value: caseStudy.status && caseStudy.status.replace(/^\w/, (c) => c.toUpperCase()) }
    ].filter(fact => fact.value);

    return (
        <>
            <Navbar />
            <section className="case-study-detail-page">
                <div className="case-study-detail-container">
                    <Link href="/case-studies" className="back-link">← Back to Case Studies</Link>

                    <article className="case-study-detail">
                        {caseStudy.hero_image && (
                            <div className="case-study-hero">
                                <Image
                                    src={caseStudy.hero_image}
                                    alt={caseStudy.title}
                                    width={1200}
                                    height={600}
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>
                        )}

                        <div className="case-study-detail-content">
                            <header className="case-study-detail-header">
                                <div className="case-study-detail-meta">
                                    <span className="case-study-category">{caseStudy.category}</span>
                                    <span className="case-study-year">{caseStudy.year}</span>
                                </div>
                                <h1 className="case-study-detail-title">{caseStudy.title}</h1>
                                <p className="case-study-client">Client: <strong>{caseStudy.client}</strong></p>
                            </header>

                            {(caseStudy.summary || quickFacts.length > 0) && (
                                <div className="case-study-overview">
                                    {caseStudy.summary && (
                                        <div
                                            className="case-study-summary-section"
                                            dangerouslySetInnerHTML={{ __html: formatContent(caseStudy.summary) }}
                                        />
                                    )}

                                    {quickFacts.length > 0 && (
                                        <aside className="case-study-quick-facts">
                                            <h3>Quick facts</h3>
                                            <dl className="quick-facts-grid">
                                                {quickFacts.map(({ label, value }) => (
                                                    <div key={label} className="quick-fact">
                                                        <dt>{label}</dt>
                                                        <dd>{value}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                            <div className="case-study-cta">
                                                <p>Planning something remarkable? Let&apos;s craft it together.</p>
                                                <Link href="/contact-us" className="case-study-cta-btn">
                                                    Plan your event
                                                </Link>
                                            </div>
                                        </aside>
                                    )}
                                </div>
                            )}

                            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                                <div className="case-study-metrics">
                                    <h2>Key Metrics</h2>
                                    <div className="metrics-grid">
                                        {caseStudy.metrics.map((metric, idx) => (
                                            <div key={idx} className="metric-card">
                                                <div className="metric-value">{metric.value}</div>
                                                <div className="metric-label">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {caseStudy.tags && caseStudy.tags.length > 0 && (
                                <div className="case-study-detail-tags">
                                    <h3>Tags</h3>
                                    <div className="tags-list">
                                        {caseStudy.tags.map((tag, idx) => (
                                            <span key={idx} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="case-study-detail-footer">
                                <Link href="/case-studies" className="back-link">
                                    ← Back to Case Studies
                                </Link>
                                <span className="detail-divider" />
                                <span className="detail-muted">Updated {new Date(caseStudy.updated_at || caseStudy.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <Footer />
        </>
    );
}
