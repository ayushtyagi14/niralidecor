'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
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
    const chipsetRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

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
            setPosts(data || []);
        } catch (err) {
            console.error('Failed to fetch posts', err);
        } finally {
            setLoading(false);
        }
    };

    const updateScrollState = () => {
        const el = chipsetRef.current;
        if (!el) return;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
    };

    const handleScroll = (direction) => {
        const el = chipsetRef.current;
        if (!el) return;
        const scrollAmount = Math.max(220, el.clientWidth * 0.6);
        el.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
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

    useEffect(() => {
        const el = chipsetRef.current;
        if (!el) return;
        updateScrollState();
        const handleResize = () => updateScrollState();
        el.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', handleResize);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', handleResize);
        };
    }, [categories.length]);

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

    // Calculate pagination
    const totalPosts = filtered.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [q, activeCategory]);

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
                    <div className="blog-page-inner">
                        <div className="blog-filters-bar">
                            <div className="chipset-wrap">
                                <button
                                    type="button"
                                    className={`scroll-arrow left ${!canScrollLeft ? 'disabled' : ''}`}
                                    onClick={() => handleScroll(-1)}
                                    disabled={!canScrollLeft}
                                    aria-label="Scroll categories left"
                                >
                                    ‹
                                </button>
                                <div className="chipset-scroll" ref={chipsetRef}>
                                    {categories.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            className={`chip ${activeCategory === c ? 'active' : ''}`}
                                            onClick={() => setActiveCategory(c)}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className={`scroll-arrow right ${!canScrollRight ? 'disabled' : ''}`}
                                    onClick={() => handleScroll(1)}
                                    disabled={!canScrollRight}
                                    aria-label="Scroll categories right"
                                >
                                    ›
                                </button>
                            </div>
                            <div className="search-inline">
                                <div className="search">
                                    <input
                                        value={q}
                                        onChange={e => setQ(e.target.value)}
                                        placeholder="Search articles"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="blog-grid">
                            {currentPosts.length > 0 ? (
                                currentPosts.map(post => {
                                const truncatedTitle = post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title;
                                const truncatedExcerpt = post.excerpt?.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt;
                                const postCats = getPostCategories(post);
                                const primaryCategory = postCats[0] || '';
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
                                            <div className="card-meta-line">
                                                {primaryCategory && (
                                                    <span className="card-category">{primaryCategory}</span>
                                                )}
                                            </div>
                                            <h3 className="card-title">{truncatedTitle}</h3>
                                            <p className="muted">{truncatedExcerpt}</p>
                                        </div>
                                    </Link>
                                );
                                })
                            ) : (
                                <div className="no-results">
                                    <p>No blog posts found matching your criteria.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button 
                                    onClick={() => paginate(1)} 
                                    disabled={currentPage === 1}
                                    className="pagination-arrow"
                                    aria-label="First page"
                                >
                                    «
                                </button>
                                <button 
                                    onClick={() => paginate(currentPage - 1)} 
                                    disabled={currentPage === 1}
                                    className="pagination-arrow"
                                    aria-label="Previous page"
                                >
                                    ‹
                                </button>
                                
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Show current page in the middle when possible
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => paginate(pageNum)}
                                            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                                            aria-label={`Page ${pageNum}`}
                                            aria-current={currentPage === pageNum ? 'page' : undefined}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
                                <button 
                                    onClick={() => paginate(currentPage + 1)} 
                                    disabled={currentPage === totalPages}
                                    className="pagination-arrow"
                                    aria-label="Next page"
                                >
                                    ›
                                </button>
                                <button 
                                    onClick={() => paginate(totalPages)} 
                                    disabled={currentPage === totalPages}
                                    className="pagination-arrow"
                                    aria-label="Last page"
                                >
                                    »
                                </button>
                                
                                <div className="pagination-info">
                                    Page {currentPage} of {totalPages}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
}
