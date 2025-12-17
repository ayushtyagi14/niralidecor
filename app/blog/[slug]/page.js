'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../blog.css';

export default function BlogDetailPage() {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (params.slug) {
            fetchPost();
        }
    }, [params.slug]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/blogs/${params.slug}`);
            if (!res.ok) {
                throw new Error('Blog post not found');
            }
            const data = await res.json();
            setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error);
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
            <div className="blog-detail-container">
                <div className="muted">Loading…</div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <>
                <Navbar />
                <section className="blog-detail-page">
                    <div className="blog-detail-container">
                        <div className="muted">
                            <h2>Blog post not found</h2>
                            <Link href="/blog" className="back-link">← Back to Blog</Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <section className="blog-detail-page">
            <nav className="breadcrumbs">
                <Link href="/">Home</Link>
                <span>›</span>
                <Link href="/blog">Blog</Link>
                <span>›</span>
                <span>{post.title}</span>
            </nav>

            <article className="blog-article">
                <header className="blog-article-header">
                    <div className="blog-category">{post.category}</div>
                    <h1 className="blog-article-title">{post.title}</h1>
                    <div className="blog-meta">
                        <div className="blog-author-info">
                            {post.avatar_image ? (
                                <Image
                                    src={post.avatar_image}
                                    alt={post.author}
                                    width={52}
                                    height={52}
                                    className="blog-avatar"
                                    style={{ objectFit: 'cover' }}
                                />
                            ) : (
                                <div className="blog-avatar" />
                            )}
                            <div>
                                <div className="blog-author-name">{post.author}</div>
                                <div className="blog-date">
                                    {new Date(post.created_at).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* <div className="blog-share-icons">
                            <button
                                className="share-icon-btn"
                                title="Share on Twitter"
                                onClick={() => {
                                    const url = encodeURIComponent(window.location.href);
                                    const text = encodeURIComponent(post.title);
                                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=550,height=420');
                                }}
                            >
                                <span className="share-icon">𝕏</span>
                                <span className="share-label">Twitter</span>
                            </button>
                            <button
                                className="share-icon-btn"
                                title="Share on WhatsApp"
                                onClick={() => {
                                    const url = encodeURIComponent(window.location.href);
                                    const text = encodeURIComponent(`${post.title} - ${url}`);
                                    window.open(`https://wa.me/?text=${text}`, '_blank');
                                }}
                            >
                                <span className="share-icon">💬</span>
                                <span className="share-label">WhatsApp</span>
                            </button>
                        </div> */}
                    </div>
                </header>

                {post.cover_image && (
                    <div className="blog-featured-image">
                        <Image
                            src={post.cover_image}
                            alt={post.title}
                            width={1200}
                            height={500}
                            style={{ width: '100%', height: 'auto' }}
                            priority
                        />
                    </div>
                )}

                <div className="blog-article-content">
                    <div className="blog-excerpt">{post.excerpt}</div>
                    <div className="blog-body" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />

                    <div className="blog-tags-section">
                        <h4>Tags</h4>
                        <div className="tags">
                            {post.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                        </div>
                    </div>

                    <div className="blog-author-card">
                        {post.avatar_image ? (
                            <Image
                                src={post.avatar_image}
                                alt={post.author}
                                width={52}
                                height={52}
                                className="blog-avatar"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <div className="blog-avatar" />
                        )}
                        <div>
                            <h4>{post.author}</h4>
                            <p>Decor Specialist at Nirali Decor</p>
                        </div>
                    </div>
                </div>
            </article>
        </section>
        <Footer />
        </>
    );
}
