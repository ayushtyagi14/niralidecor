'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './blog.css';

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Helper to get normalized categories for a post
    const getPostCategories = (post) => {
        if (Array.isArray(post.categories) && post.categories.length) {
            return post.categories.filter(Boolean).map((c) => c.trim());
        }
        if (post.category) {
            return post.category
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
        }
        return [];
    };

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            if (Array.isArray(data)) {
                const published = data.filter(p => (p.status || 'published') === 'published');
                setPosts(published);
            } else {
                console.error('API did not return an array:', data);
                setPosts([]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Build category list from both legacy `category` (comma-separated) and new `categories` array
    const categories = useMemo(() => {
        const set = new Set();
        set.add('All');

        posts.forEach((p) => {
            getPostCategories(p).forEach((c) => {
                if (c) set.add(c);
            });
        });

        return Array.from(set);
    }, [posts]);

    const filtered = useMemo(() => {
        const term = q.toLowerCase();
        return posts.filter(p => {
            const postCats = getPostCategories(p);
            const inCat =
                activeCategory === 'All'
                    ? true
                    : postCats.includes(activeCategory);
            const inText = `${p.title} ${p.excerpt} ${p.content} ${p.tags?.join(' ')}`.toLowerCase().includes(term);
            return inCat && inText;
        });
    }, [posts, q, activeCategory]);

    const featured = filtered[0];
    const rest = filtered.slice(1);

    return (
        <>
            <Navbar />
            <section className="blog-layout">
                <div className="page-banner">
                    <Image
                        src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80"
                        alt="Blog Banner"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>

                <div className="page-header">
                    <h2 className="headline">Decor Blog</h2>
                    <p className="lead">Wedding, sangeet and luxury decor inspiration.</p>
                </div>

                {loading ? (
                    <div className="muted">Loading posts…</div>
                ) : (
                    <div className="layout">
                        <aside className="sidebar">
                            <div className="filter-group">
                                <div className="filter-title">Search</div>
                                <div className="search">
                                    <input
                                        value={q}
                                        onChange={e => setQ(e.target.value)}
                                        placeholder="Search articles"
                                    />
                                </div>
                            </div>
                            <div className="filter-group">
                                <div className="filter-title">Category</div>
                                <div className="select-wrapper">
                                    <select
                                        value={activeCategory}
                                        onChange={(e) => setActiveCategory(e.target.value)}
                                        className="category-select"
                                    >
                                        {categories.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </aside>
                        <div className="blog-content">
                            {featured && (
                                <div className="featured-post">
                                    <Link href={`/blog/${featured.slug}`} className="featured-card">
                                        {featured.cover_image && (
                                            <div className="featured-media">
                                                <Image
                                                    src={featured.cover_image}
                                                    alt={featured.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                                <div className="featured-badge">{featured.category}</div>
                                            </div>
                                        )}
                                        <div className="featured-body">
                                            <h3 className="featured-title">
                                                {featured.title.length > 70 ? featured.title.substring(0, 70) + '...' : featured.title}
                                            </h3>
                                            <p className="featured-excerpt">
                                                {featured.excerpt?.length > 150 ? featured.excerpt.substring(0, 150) + '...' : featured.excerpt}
                                            </p>
                                            <div className="featured-meta">
                                                <span>{featured.author}</span>
                                                <span>•</span>
                                                <span>{new Date(featured.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                            <div className="blog-grid">
                                {rest.map(post => {
                                    const truncatedTitle = post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title;
                                    const truncatedExcerpt = post.excerpt?.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt;
                                    return (
                                        <Link href={`/blog/${post.slug}`} key={post.id} className="card">
                                            {post.cover_image && (
                                                <div className="card-media">
                                                    <Image
                                                        src={post.cover_image}
                                                        alt={post.title}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                            )}
                                            <div className="card-body">
                                                <h3 className="card-title">{truncatedTitle}</h3>
                                                <div className="card-subtitle">
                                                    {post.author} • {new Date(post.created_at).toLocaleDateString()}
                                                </div>
                                                <p className="muted">{truncatedExcerpt}</p>
                                                <div className="tags">
                                                    {post.tags?.slice(0, 3).map(t => (
                                                        <span key={t} className="tag">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
}
