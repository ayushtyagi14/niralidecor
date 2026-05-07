'use client';

import { useEffect, useState, useCallback } from 'react';
import FormattedTextarea from '@/components/Blog/FormattedTextarea';
import './admin.css';

export default function AdminPage() {
    const [tab, setTab] = useState('blog');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const loginSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok || !data?.token) {
                setError(data?.error || 'Invalid credentials');
                return;
            }

            localStorage.setItem('adminToken', data.token);
            setToken(data.token);
            setIsAuthenticated(true);
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken('');
        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="admin-container">
            {!isAuthenticated ? (
                <div className="admin-login-card">
                    <h2 className="login-title">Admin Panel</h2>
                    <p className="login-subtitle">Manage your blog posts, case studies, and FAQs</p>
                    <form className="login-form" onSubmit={loginSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                        />
                        <div style={{ position: 'relative', width: '100%' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                                style={{ paddingRight: '50px', width: '100%' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#96034f',
                                    transition: 'opacity 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                            >
                                {showPassword ? (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button className="login-button" type="submit">
                            Login
                        </button>
                        {error && <span className="login-error">{error}</span>}
                    </form>
                </div>
            ) : (
                <div className="admin-content">
                    <div className="admin-tabs">
                        <button
                            className={`tab-btn ${tab === 'blog' ? 'active' : ''}`}
                            onClick={() => setTab('blog')}
                        >
                            Blog Posts
                        </button>
                        <button
                            className={`tab-btn ${tab === 'case' ? 'active' : ''}`}
                            onClick={() => setTab('case')}
                        >
                            Case Studies
                        </button>
                        <button
                            className={`tab-btn ${tab === 'faq' ? 'active' : ''}`}
                            onClick={() => setTab('faq')}
                        >
                            FAQs
                        </button>
                        <button
                            className={`tab-btn ${tab === 'couples' ? 'active' : ''}`}
                            onClick={() => setTab('couples')}
                        >
                            Real Weddings
                        </button>
                        <button
                            className={`tab-btn ${tab === 'inquiries' ? 'active' : ''}`}
                            onClick={() => setTab('inquiries')}
                        >
                            Inquiries
                        </button>
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </div>

                    <div className="tab-content">
                        {tab === 'blog' && <BlogSection token={token} />}
                        {tab === 'case' && <CaseSection token={token} />}
                        {tab === 'faq' && <FaqSection token={token} />}
                        {tab === 'couples' && <CouplesSection token={token} />}
                        {tab === 'inquiries' && <ConsultationsSection token={token} />}
                    </div>
                </div>
            )}
        </div>
    );
}

function BlogSection({ token }) {
    const [list, setList] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        slug: '',
        title: '',
        excerpt: '',
        content: '',
        author: '',
        coverImage: '',
        avatarImage: '',
        tags: '',
        categories: '',
        status: 'published',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
    });
    const [status, setStatus] = useState('');
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    const normalizeSlug = (value) => {
        if (!value) return '';
        return value
            .toString()
            .trim()
            .replace(/^\/+/, '')
            .replace(/\s+/g, '-')
            .toLowerCase();
    };

    const refresh = useCallback(() => {
        fetch('/api/blogs', { headers: { 'x-admin-token': token } })
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setList(data);
                } else {
                    console.error('API did not return an array:', data);
                    setList([]);
                }
            })
            .catch((err) => {
                console.error('Error fetching blogs:', err);
                setList([]);
            });
    }, [token]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handleImageUpload = async (file, type) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        if (type === 'cover') {
            setUploadingCover(true);
        } else {
            setUploadingAvatar(true);
        }

        try {
            const res = await fetch('/api/upload/image', {
                method: 'POST',
                headers: { 'x-admin-token': token },
                body: formData,
            });
            const data = await res.json();
            console.log('Upload response:', data);

            if (res.ok) {
                const imageUrl = data.url;
                if (type === 'cover') {
                    setForm({ ...form, coverImage: imageUrl });
                } else {
                    setForm({ ...form, avatarImage: imageUrl });
                }
                alert('Image uploaded successfully!');
            } else {
                const errorMsg = data.error || data.message || 'Unknown error';
                console.error('Upload error:', errorMsg);
                alert('Upload failed: ' + errorMsg);
            }
        } catch (err) {
            console.error('Upload exception:', err);
            alert('Upload failed: ' + err.message);
        } finally {
            setUploadingCover(false);
            setUploadingAvatar(false);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setStatus('');
        const payload = {
            ...form,
            tags: form.tags ? form.tags.split(',').map((s) => s.trim()).filter(Boolean) : [],
            categories: form.categories ? form.categories.split(',').map((s) => s.trim()).filter(Boolean) : [],
            status: form.status || 'published',
        };
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/blogs/${editing.slug}` : '/api/blogs';
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
                body: JSON.stringify(payload),
            });
            const contentType = res.headers.get('content-type') || '';
            let data;

            if (contentType.includes('application/json')) {
                data = await res.json();
            } else {
                const text = await res.text();
                throw new Error(`Server returned ${res.status} ${res.statusText} instead of JSON: ${text.slice(0, 200)}`);
            }
            if (res.ok) {
                setStatus('Saved!');
                setForm({
                    slug: '',
                    title: '',
                    excerpt: '',
                    content: '',
                    author: '',
                    coverImage: '',
                    avatarImage: '',
                    tags: '',
                    categories: '',
                    status: 'published',
                    seoTitle: '',
                    seoDescription: '',
                    seoKeywords: '',
                });
                setEditing(null);
                refresh();
            } else {
                console.error('Error response:', data);
                setStatus(`Error: ${data?.error || `${res.status} ${res.statusText}` || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Submit error:', err);
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <div className="items-grid">
                {list.map((item) => (
                    <div key={item.id} className="item-card">
                        <div className="item-title">{item.title}</div>
                        <div className="item-meta">
                            {(item.categories || []).join(', ')} • {item.author}
                        </div>
                        <div className="item-status">
                            <span className={`status-badge ${item.status === 'published' ? 'published' : 'draft'}`}>
                                {item.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                        </div>
                        <div className="item-actions">
                            <button
                                className="btn-edit"
                                onClick={() => {
                                    setEditing(item);
                                    setForm({
                                        ...item,
                                        slug: item.slug || '',
                                        tags: (item.tags || []).join(', '),
                                        categories:
                                            Array.isArray(item.categories) && item.categories.length
                                                ? item.categories.join(', ')
                                                : item.category || '',
                                        status: item.status || 'published',
                                        coverImage: item.cover_image || '',
                                        avatarImage: item.avatar_image || '',
                                        seoTitle: item.seo_title || '',
                                        seoDescription: item.seo_description || '',
                                        seoKeywords: item.seo_keywords || '',
                                    });
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn-delete"
                                onClick={async () => {
                                    if (confirm('Are you sure you want to delete this blog post?')) {
                                        await fetch(`/api/blogs/${item.slug}`, {
                                            method: 'DELETE',
                                            headers: { 'x-admin-token': token },
                                        });
                                        refresh();
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <form className="admin-form" onSubmit={submit}>
                <div className="form-header">
                    <div>
                        <p className="form-eyebrow">{editing ? 'Update existing article' : 'Create a fresh story'}</p>
                        <h3 className="form-title">{editing ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
                        <p className="form-subtitle">Fill in the essentials, upload assets, and get the story ready to publish.</p>
                    </div>
                    {editing && <span className="form-badge">Editing mode</span>}
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip">Basics</span>
                        <p className="section-description">Give the post a name, attribute an author, and drop it into a category.</p>
                    </div>
                    <div className="form-grid-3 form-grid-tight">
                        <input
                            type="text"
                            placeholder="Title *"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="form-input"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Slug (used in URL, e.g. my-blog-post) *"
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className="form-input"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Author"
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Categories (comma separated)"
                            value={form.categories}
                            onChange={(e) => setForm({ ...form, categories: e.target.value })}
                            className="form-input"
                        />
                    </div>
                    <div className="status-row">
                        <label className="form-label">Status</label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="form-select pill-select"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip accent">Media</span>
                        <p className="section-description">Share a bold cover image and a friendly author avatar.</p>
                    </div>

                    <div className="media-field">
                        <label className="form-label">Cover Image</label>
                        {!form.coverImage ? (
                            <div className="media-input">
                                <input
                                    type="text"
                                    placeholder="Cover Image URL"
                                    value={form.coverImage}
                                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                                    className="form-input"
                                />
                                <label className={`upload-btn ${uploadingCover ? 'uploading' : ''}`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageUpload(e.target.files[0], 'cover')}
                                        disabled={uploadingCover}
                                    />
                                    {uploadingCover ? 'Uploading...' : 'Upload Cover'}
                                </label>
                            </div>
                        ) : (
                            <div className="media-preview">
                                <img
                                    src={form.coverImage}
                                    alt="Cover preview"
                                    className="media-preview-img"
                                />
                                <div className="media-preview-copy">
                                    <strong>Cover image uploaded</strong>
                                    <span>Ready for feature cards & detail pages.</span>
                                </div>
                                <button
                                    type="button"
                                    className="btn-danger-outline"
                                    onClick={() => setForm({ ...form, coverImage: '' })}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="media-field">
                        <label className="form-label">Author Avatar</label>
                        {!form.avatarImage ? (
                            <div className="media-input">
                                <input
                                    type="text"
                                    placeholder="Author Avatar URL"
                                    value={form.avatarImage}
                                    onChange={(e) => setForm({ ...form, avatarImage: e.target.value })}
                                    className="form-input"
                                />
                                <label className={`upload-btn ${uploadingAvatar ? 'uploading' : ''}`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageUpload(e.target.files[0], 'avatar')}
                                        disabled={uploadingAvatar}
                                    />
                                    {uploadingAvatar ? 'Uploading...' : 'Upload Avatar'}
                                </label>
                            </div>
                        ) : (
                            <div className="media-preview">
                                <img
                                    src={form.avatarImage}
                                    alt="Avatar preview"
                                    className="media-preview-img avatar"
                                />
                                <div className="media-preview-copy">
                                    <strong>Avatar image uploaded</strong>
                                    <span>Looks great beside the author credit.</span>
                                </div>
                                <button
                                    type="button"
                                    className="btn-danger-outline"
                                    onClick={() => setForm({ ...form, avatarImage: '' })}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip soft">Content</span>
                        <p className="section-description">Add SEO-friendly tags, a teaser excerpt, and the full story.</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={form.tags}
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        className="form-input"
                    />

                    <input
                        type="text"
                        placeholder="Excerpt"
                        value={form.excerpt}
                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        className="form-input"
                    />

                    <FormattedTextarea
                        placeholder="Content (supports **bold**, _italic_, [link](https://)) *"
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        rows={8}
                    />
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip">SEO</span>
                        <p className="section-description">Optimize for search engines with meta tags and keywords.</p>
                    </div>
                    <input
                        type="text"
                        placeholder="SEO Title"
                        value={form.seoTitle}
                        onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="SEO Description (meta description)"
                        value={form.seoDescription}
                        onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="SEO Keywords (comma separated)"
                        value={form.seoKeywords}
                        onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
                        className="form-input"
                    />
                </div>

                <div className="form-actions">
                    <button className="btn-submit" type="submit">
                        {editing ? 'Update Blog Post' : 'Add Blog Post'}
                    </button>
                    {editing && (
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => {
                                setEditing(null);
                                setForm({
                                    slug: '',
                                    title: '',
                                    excerpt: '',
                                    content: '',
                                    author: '',
                                    coverImage: '',
                                    avatarImage: '',
                                    tags: '',
                                    categories: '',
                                    status: 'published',
                                    seoTitle: '',
                                    seoDescription: '',
                                    seoKeywords: '',
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                    {status && <span className="form-status">{status}</span>}
                </div>
            </form>
        </>
    );
}

function CaseSection({ token }) {
    const [list, setList] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        title: '',
        client: '',
        year: '',
        heroImage: '',
        summary: '',
        metrics: '',
        tags: '',
        categories: '',
        status: 'published',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
    });
    const [status, setStatus] = useState('');
    const [uploadingHero, setUploadingHero] = useState(false);

    const refresh = useCallback(() => {
        fetch('/api/case-studies', { headers: { 'x-admin-token': token } })
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setList(data);
                } else {
                    console.error('API did not return an array:', data);
                    setList([]);
                }
            })
            .catch((err) => {
                console.error('Error fetching case studies:', err);
                setList([]);
            });
    }, [token]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handleImageUpload = async (file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        setUploadingHero(true);

        try {
            const res = await fetch('/api/upload/image', {
                method: 'POST',
                headers: { 'x-admin-token': token },
                body: formData,
            });
            const data = await res.json();
            console.log('Upload response:', data);

            if (res.ok) {
                setForm({ ...form, heroImage: data.url });
                alert('Image uploaded successfully!');
            } else {
                const errorMsg = data.error || data.message || 'Unknown error';
                console.error('Upload error:', errorMsg);
                alert('Upload failed: ' + errorMsg);
            }
        } catch (err) {
            console.error('Upload exception:', err);
            alert('Upload failed: ' + err.message);
        } finally {
            setUploadingHero(false);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setStatus('');
        const metrics = form.metrics
            ? form.metrics.split(',').map((s) => {
                const trimmed = s.trim();
                if (trimmed.includes(':')) {
                    const [label, ...valueParts] = trimmed.split(':');
                    return { label: label.trim(), value: valueParts.join(':').trim() };
                }
                return { label: trimmed, value: '' };
            })
            : [];
        const payload = {
            ...form,
            year: form.year ? Number(form.year) : undefined,
            metrics,
            tags: form.tags ? form.tags.split(',').map((s) => s.trim()).filter(Boolean) : [],
            categories: form.categories ? form.categories.split(',').map((s) => s.trim()).filter(Boolean) : [],
            status: form.status || 'published',
        };
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/case-studies/${editing.id}` : '/api/case-studies';
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('Saved!');
                setForm({
                    title: '',
                    client: '',
                    year: '',
                    heroImage: '',
                    summary: '',
                    metrics: '',
                    tags: '',
                    categories: '',
                    status: 'published',
                    seoTitle: '',
                    seoDescription: '',
                    seoKeywords: '',
                });
                setEditing(null);
                refresh();
            } else {
                console.error('Error response:', data);
                setStatus(`Error: ${data.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Submit error:', err);
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <div className="items-grid">
                {list.map((item) => (
                    <div key={item.id} className="item-card">
                        <div className="item-title">{item.title}</div>
                        <div className="item-meta">
                            {item.client} • {item.year}
                        </div>
                        <div className="item-status">
                            <span className={`status-badge ${item.status === 'published' ? 'published' : 'draft'}`}>
                                {item.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                        </div>
                        <div className="item-actions">
                            <button
                                className="btn-edit"
                                onClick={() => {
                                    setEditing(item);
                                    setForm({
                                        ...item,
                                        categories:
                                            Array.isArray(item.categories) && item.categories.length
                                                ? item.categories.join(', ')
                                                : item.category || '',
                                        tags: (item.tags || []).join(', '),
                                        metrics: (item.metrics || [])
                                            .map((m) => (m.value ? `${m.label}: ${m.value}` : m.label))
                                            .join(', '),
                                        status: item.status || 'published',
                                        heroImage: item.hero_image || '',
                                        seoTitle: item.seo_title || '',
                                        seoDescription: item.seo_description || '',
                                        seoKeywords: item.seo_keywords || '',
                                    });
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn-delete"
                                onClick={async () => {
                                    if (confirm('Are you sure you want to delete this case study?')) {
                                        await fetch(`/api/case-studies/${item.id}`, {
                                            method: 'DELETE',
                                            headers: { 'x-admin-token': token },
                                        });
                                        refresh();
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <form className="admin-form" onSubmit={submit}>
                <div className="form-header">
                    <div>
                        <p className="form-eyebrow">{editing ? 'Refresh a published success' : 'Document a new win'}</p>
                        <h3 className="form-title">{editing ? 'Edit Case Study' : 'Add New Case Study'}</h3>
                        <p className="form-subtitle">Capture the client, highlight the impact, and drop in the visuals that sell the story.</p>
                    </div>
                    {editing && <span className="form-badge">Editing mode</span>}
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip">Case basics</span>
                        <p className="section-description">Who is the client, when did it happen, and what should readers remember?</p>
                    </div>
                    <div className="form-grid-3 form-grid-tight">
                        <input
                            type="text"
                            placeholder="Title *"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="form-input"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Client *"
                            value={form.client}
                            onChange={(e) => setForm({ ...form, client: e.target.value })}
                            className="form-input"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Year"
                            value={form.year}
                            onChange={(e) => setForm({ ...form, year: e.target.value })}
                            className="form-input"
                        />
                    </div>
                    <div className="status-row">
                        <label className="form-label">Status</label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="form-select pill-select"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip accent">Visuals</span>
                        <p className="section-description">Add a cinematic hero shot so the case study instantly feels premium.</p>
                    </div>
                    <div className="media-field">
                        <label className="form-label">Hero Image</label>
                        {!form.heroImage ? (
                            <div className="media-input">
                                <input
                                    type="text"
                                    placeholder="Hero Image URL"
                                    value={form.heroImage}
                                    onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                                    className="form-input"
                                />
                                <label className={`upload-btn ${uploadingHero ? 'uploading' : ''}`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageUpload(e.target.files[0])}
                                        disabled={uploadingHero}
                                    />
                                    {uploadingHero ? 'Uploading...' : 'Upload Hero'}
                                </label>
                            </div>
                        ) : (
                            <div className="media-preview">
                                <img
                                    src={form.heroImage}
                                    alt="Hero preview"
                                    className="media-preview-img hero"
                                />
                                <div className="media-preview-copy">
                                    <strong>Hero image uploaded</strong>
                                    <span>Looks great across highlight cards and the detail hero.</span>
                                </div>
                                <button
                                    type="button"
                                    className="btn-danger-outline"
                                    onClick={() => setForm({ ...form, heroImage: '' })}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip soft">Highlights</span>
                        <p className="section-description">Tag the work, list the hero metrics, and give editors context for cards.</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Categories (comma separated)"
                        value={form.categories}
                        onChange={(e) => setForm({ ...form, categories: e.target.value })}
                        className="form-input"
                    />

                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={form.tags}
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        className="form-input"
                    />

                    <div className="metrics-field">
                        <input
                            type="text"
                            placeholder="Metrics (Format: Label: Value, e.g., Guest Count: 800, Setup Time: 18 hours)"
                            value={form.metrics}
                            onChange={(e) => setForm({ ...form, metrics: e.target.value })}
                            className="form-input"
                        />
                        <p className="input-hint">Use commas to separate each metric. Each metric can include an optional “Label: Value”.</p>
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip">Story</span>
                        <p className="section-description">Write the summary readers see on the detail page.</p>
                    </div>
                    <FormattedTextarea
                        placeholder="Summary (supports **bold**, _italic_)"
                        value={form.summary}
                        onChange={(e) => setForm({ ...form, summary: e.target.value })}
                        rows={6}
                    />
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip">SEO</span>
                        <p className="section-description">Optimize for search engines with meta tags and keywords.</p>
                    </div>
                    <input
                        type="text"
                        placeholder="SEO Title"
                        value={form.seoTitle}
                        onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="SEO Description (meta description)"
                        value={form.seoDescription}
                        onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="SEO Keywords (comma separated)"
                        value={form.seoKeywords}
                        onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
                        className="form-input"
                    />
                </div>

                <div className="form-actions">
                    <button className="btn-submit" type="submit">
                        {editing ? 'Update Case Study' : 'Add Case Study'}
                    </button>
                    {editing && (
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => {
                                setEditing(null);
                                setForm({
                                    title: '',
                                    client: '',
                                    year: '',
                                    heroImage: '',
                                    summary: '',
                                    metrics: '',
                                    tags: '',
                                    categories: '',
                                    status: 'published',
                                    seoTitle: '',
                                    seoDescription: '',
                                    seoKeywords: '',
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                    {status && <span className="form-status">{status}</span>}
                </div>
            </form>
        </>
    );
}

function FaqSection({ token }) {
    const [list, setList] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ 
        question: '', 
        answer: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
    });
    const [status, setStatus] = useState('');

    const refresh = () =>
        fetch('/api/faqs')
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setList(data);
                } else {
                    console.error('API did not return an array:', data);
                    setList([]);
                }
            })
            .catch((err) => {
                console.error('Error fetching FAQs:', err);
                setList([]);
            });

    useEffect(() => {
        refresh();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setStatus('');
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/faqs/${editing.id}` : '/api/faqs';
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('Saved!');
                setForm({ 
                    question: '', 
                    answer: '',
                    seoTitle: '',
                    seoDescription: '',
                    seoKeywords: '',
                });
                setEditing(null);
                refresh();
            } else {
                console.error('Error response:', data);
                setStatus(`Error: ${data.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Submit error:', err);
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <div className="items-grid">
                {list.map((item) => (
                    <div key={item.id} className="item-card">
                        <div className="item-title">{item.question}</div>
                        <div className="item-actions">
                            <button
                                className="btn-edit"
                                onClick={() => {
                                    setEditing(item);
                                    setForm({ 
                                        question: item.question, 
                                        answer: item.answer,
                                        seoTitle: item.seo_title || '',
                                        seoDescription: item.seo_description || '',
                                        seoKeywords: item.seo_keywords || '',
                                    });
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn-delete"
                                onClick={async () => {
                                    if (confirm('Are you sure you want to delete this FAQ?')) {
                                        await fetch(`/api/faqs/${item.id}`, {
                                            method: 'DELETE',
                                            headers: { 'x-admin-token': token },
                                        });
                                        refresh();
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <form className="admin-form" onSubmit={submit}>
                <h3 className="form-title">{editing ? 'Edit FAQ' : 'Add New FAQ'}</h3>

                <input
                    type="text"
                    placeholder="Question *"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    className="form-input"
                    required
                />

                <FormattedTextarea
                    placeholder="Answer (supports **bold**, _italic_) *"
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    rows={4}
                />

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip">SEO</span>
                        <p className="section-description">Optimize for search engines with meta tags and keywords.</p>
                    </div>
                    <input
                        type="text"
                        placeholder="SEO Title"
                        value={form.seoTitle}
                        onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="SEO Description (meta description)"
                        value={form.seoDescription}
                        onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="SEO Keywords (comma separated)"
                        value={form.seoKeywords}
                        onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
                        className="form-input"
                    />
                </div>

                <div className="form-actions">
                    <button className="btn-submit" type="submit">
                        {editing ? 'Update FAQ' : 'Add FAQ'}
                    </button>
                    {editing && (
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => {
                                setEditing(null);
                                setForm({ 
                                    question: '', 
                                    answer: '',
                                    seoTitle: '',
                                    seoDescription: '',
                                    seoKeywords: '',
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                    {status && <span className="form-status">{status}</span>}
                </div>
            </form>
        </>
    );
}

function CouplesSection({ token }) {
    const [list, setList] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        slug: '',
        name: '',
        location: '',
        date: '',
        description: '',
        coverImage: '',
        bannerImage: '',
        isFeatured: false,
        status: 'published'
    });
    const [status, setStatus] = useState('');
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [categoryImages, setCategoryImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('wedding');
    const [uploadingGallery, setUploadingGallery] = useState(false);

    const refreshGallery = useCallback((slug) => {
        if (!slug) return;
        fetch(`/api/couples/${slug}/images`, { headers: { 'x-admin-token': token } })
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) setCategoryImages(data);
                else setCategoryImages([]);
            });
    }, [token]);

    const refresh = useCallback(() => {
        fetch('/api/couples', { headers: { 'x-admin-token': token } })
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) setList(data);
                else setList([]);
            })
            .catch((err) => {
                console.error('Error fetching couples:', err);
                setList([]);
            });
    }, [token]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    useEffect(() => {
        if (editing) {
            refreshGallery(editing.slug);
        } else {
            setCategoryImages([]);
        }
    }, [editing, refreshGallery]);

    const handleImageUpload = async (file, type) => {
        if (!file) return;
        
        if (type === 'gallery') {
            setUploadingGallery(true);
            const formData = new FormData();
            formData.append('image', file);
            try {
                const res = await fetch('/api/upload/image', {
                    method: 'POST',
                    headers: { 'x-admin-token': token },
                    body: formData,
                });
                const data = await res.json();
                if (res.ok) {
                    // Add to DB
                    await fetch(`/api/couples/${editing.slug}/images`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
                        body: JSON.stringify({ category: selectedCategory, mediaUrl: data.url })
                    });
                    refreshGallery(editing.slug);
                }
            } catch (err) {
                alert('Gallery upload failed: ' + err.message);
            } finally {
                setUploadingGallery(false);
            }
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        
        if (type === 'cover') setUploadingCover(true);
        else if (type === 'banner') setUploadingBanner(true);

        try {
            const res = await fetch('/api/upload/image', {
                method: 'POST',
                headers: { 'x-admin-token': token },
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                if (type === 'cover') setForm({ ...form, coverImage: data.url });
                else setForm({ ...form, bannerImage: data.url });
                alert('Image uploaded successfully!');
            } else {
                alert('Upload failed: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            alert('Upload failed: ' + err.message);
        } finally {
            if (type === 'cover') setUploadingCover(false);
            else if (type === 'banner') setUploadingBanner(false);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setStatus('');
        const payload = { ...form };
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `/api/couples/${editing.slug}` : '/api/couples';
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('Saved!');
                setForm({
                    slug: '', name: '', location: '', date: '', description: '', coverImage: '', bannerImage: '', isFeatured: false, status: 'published'
                });
                setEditing(null);
                refresh();
            } else {
                setStatus(`Error: ${data.error}`);
            }
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <div className="items-grid">
                {list.map((item) => (
                    <div key={item.slug} className="item-card">
                        <div className="item-title">{item.name}</div>
                        <div className="item-meta">
                            {item.location} • {item.date}
                        </div>
                        <div className="item-status">
                            <span className={`status-badge ${item.is_featured ? 'published' : 'draft'}`}>
                                {item.is_featured ? 'Featured' : 'Standard'}
                            </span>
                        </div>
                        <div className="item-actions">
                            <button
                                className="btn-edit"
                                onClick={() => {
                                    setEditing(item);
                                    setForm({
                                        slug: item.slug || '',
                                        name: item.name || '',
                                        location: item.location || '',
                                        date: item.date || '',
                                        description: item.description || '',
                                        coverImage: item.cover_image || '',
                                        bannerImage: item.banner_image || '',
                                        isFeatured: item.is_featured || false,
                                        status: item.status || 'published',
                                    });
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn-delete"
                                onClick={async () => {
                                    if (confirm('Are you sure you want to delete this couple?')) {
                                        await fetch(`/api/couples/${item.slug}`, {
                                            method: 'DELETE',
                                            headers: { 'x-admin-token': token },
                                        });
                                        refresh();
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <form className="admin-form" onSubmit={submit}>
                <div className="form-header">
                    <div>
                        <p className="form-eyebrow">{editing ? 'Update existing couple' : 'Add new real wedding'}</p>
                        <h3 className="form-title">{editing ? 'Edit Couple' : 'Add New Couple'}</h3>
                        <p className="form-subtitle">Add details to showcase this beautiful wedding story.</p>
                    </div>
                    {editing && <span className="form-badge">Editing mode</span>}
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip">Basics</span>
                        <p className="section-description">Set up their names, URL slug, and core details.</p>
                    </div>
                    <div className="form-grid-3 form-grid-tight">
                        <input
                            type="text"
                            placeholder="Couple Name (e.g. Arti & Darshil) *"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="form-input"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Slug (e.g. arti-and-darshil) *"
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className="form-input"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Location (e.g. Wedding Celebration)"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Date (e.g. October 12, 2025)"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            className="form-input"
                        />
                    </div>
                    
                    <div className="media-field" style={{marginTop: '20px'}}>
                        <label className="form-label" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <input 
                                type="checkbox" 
                                checked={form.isFeatured} 
                                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} 
                            />
                            Featured Couple (Will be displayed on the main Portfolio grid. Max 6 recommended)
                        </label>
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip accent">Cover Image</span>
                        <p className="section-description">Upload the vertical portrait showcase image.</p>
                    </div>

                    <div className="media-field">
                        {!form.coverImage ? (
                            <div className="media-input">
                                <input
                                    type="text"
                                    placeholder="Cover Image URL"
                                    value={form.coverImage}
                                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                                    className="form-input"
                                />
                                <label className={`upload-btn ${uploadingCover ? 'uploading' : ''}`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageUpload(e.target.files[0], 'cover')}
                                        disabled={uploadingCover}
                                    />
                                    {uploadingCover ? 'Uploading...' : 'Upload Cover'}
                                </label>
                            </div>
                        ) : (
                            <div className="media-preview">
                                <img
                                    src={form.coverImage}
                                    alt="Cover preview"
                                    className="media-preview-img"
                                />
                                <div className="media-preview-copy">
                                    <strong>Listing image uploaded</strong>
                                </div>
                                <button
                                    type="button"
                                    className="btn-danger-outline"
                                    onClick={() => setForm({ ...form, coverImage: '' })}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip accent">Inner Page Banner Image</span>
                        <p className="section-description">Upload the horizontal banner image for their story page.</p>
                    </div>

                    <div className="media-field">
                        {!form.bannerImage ? (
                            <div className="media-input">
                                <input
                                    type="text"
                                    placeholder="Banner Image URL"
                                    value={form.bannerImage}
                                    onChange={(e) => setForm({ ...form, bannerImage: e.target.value })}
                                    className="form-input"
                                />
                                <label className={`upload-btn ${uploadingBanner ? 'uploading' : ''}`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageUpload(e.target.files[0], 'banner')}
                                        disabled={uploadingBanner}
                                    />
                                    {uploadingBanner ? 'Uploading...' : 'Upload Banner'}
                                </label>
                            </div>
                        ) : (
                            <div className="media-preview">
                                <img
                                    src={form.bannerImage}
                                    alt="Banner preview"
                                    className="media-preview-img h-[150px!important] object-cover"
                                />
                                <div className="media-preview-copy">
                                    <strong>Banner image uploaded</strong>
                                </div>
                                <button
                                    type="button"
                                    className="btn-danger-outline"
                                    onClick={() => setForm({ ...form, bannerImage: '' })}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-section">
                    <div className="section-header">
                        <span className="section-chip soft">Content</span>
                        <p className="section-description">Write a beautiful excerpt about this event.</p>
                    </div>
                    <FormattedTextarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={4}
                    />
                </div>

                <div className="form-actions">
                    <button className="btn-submit" type="submit">
                        {editing ? 'Update Couple' : 'Add Couple'}
                    </button>
                    {editing && (
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => {
                                setEditing(null);
                                setForm({
                                    slug: '', name: '', location: '', date: '', description: '', coverImage: '', bannerImage: '', isFeatured: false, status: 'published'
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                <div className="form-status">
                    {status && <span className="form-status">{status}</span>}
                    {!editing && (
                        <p className="text-[13px] text-amber-600 mt-2 font-medium">
                            * Tip: Once you create the couple, you can edit it to manage the separate event category galleries (Wedding, Sangeet, etc.)
                        </p>
                    )}
                </div>
            </div>
        </form>

        {editing && (
                <div className="admin-form mt-8" style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '40px' }}>
                    <div className="form-header">
                        <div>
                            <p className="form-eyebrow">Visual Gallery</p>
                            <h3 className="form-title">Category Images for {editing.name}</h3>
                            <p className="form-subtitle">Manage the deep-dive photos for each event category.</p>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-header">
                            <span className="section-chip">Category Selection</span>
                            <p className="section-description">Choose which event gallery you are adding photos to.</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="form-select pill-select"
                                style={{ minWidth: '200px' }}
                            >
                                <option value="centerpiece">Centerpiece</option>
                                <option value="wedding">Wedding</option>
                                <option value="sangeet-garba">Sangeet / Garba</option>
                                <option value="vidhi-haldi">Vidhi / Haldi</option>
                                <option value="reception">Reception</option>
                            </select>

                            <label className={`upload-btn ${uploadingGallery ? 'uploading' : ''}`} style={{ marginBottom: 0 }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={async (e) => {
                                        const files = Array.from(e.target.files);
                                        for (const file of files) {
                                            await handleImageUpload(file, 'gallery');
                                        }
                                    }}
                                    disabled={uploadingGallery}
                                />
                                {uploadingGallery ? 'Uploading...' : 'Upload Image(s)'}
                            </label>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-header">
                            <span className="section-chip soft">Existing Gallery Images</span>
                            <p className="section-description">Photos currently assigned to categories.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categoryImages.map((img) => (
                                <div key={img.id} className="relative group rounded-lg overflow-hidden h-32 bg-gray-100 border border-gray-200">
                                    <img src={img.media_url} alt="Gallery" className="w-full h-full object-cover" />
                                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full capitalize">
                                        {img.category.replace('-', ' ')}
                                    </div>
                                    <button 
                                        onClick={async () => {
                                            if (confirm('Delete this image?')) {
                                                await fetch(`/api/couples/${editing.slug}/images?id=${img.id}`, {
                                                    method: 'DELETE',
                                                    headers: { 'x-admin-token': token }
                                                });
                                                refreshGallery(editing.slug);
                                            }
                                        }}
                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M18 6L6 18M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {categoryImages.length === 0 && (
                            <p className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-100 rounded-xl">
                                No category images uploaded yet.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

function ConsultationsSection({ token }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('');

    const fetchConsultations = useCallback(() => {
        setLoading(true);
        setStatus('');
        
        const params = new URLSearchParams();
        if (fromDate) params.append('from', fromDate);
        if (toDate) params.append('to', toDate);
        
        const url = `/api/wedding-consultation${params.toString() ? `?${params.toString()}` : ''}`;
        
        fetch(url, { headers: { 'x-admin-token': token } })
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setList(data);
                } else {
                    console.error('API did not return an array:', data);
                    setList([]);
                    if (data?.error) setStatus(`Error: ${data.error}`);
                }
            })
            .catch((err) => {
                console.error('Error fetching consultations:', err);
                setStatus(`Error: ${err.message}`);
                setList([]);
            })
            .finally(() => setLoading(false));
    }, [token, fromDate, toDate]);

    useEffect(() => {
        fetchConsultations();
    }, [fetchConsultations]);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        
        try {
            const res = await fetch(`/api/wedding-consultation?id=${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-token': token }
            });
            
            if (res.ok) {
                setList(list.filter(item => item.id !== id));
                setStatus('Deleted successfully');
            } else {
                const data = await res.json();
                setStatus(`Error: ${data?.error || 'Failed to delete'}`);
            }
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <div className="consultations-section">
            <div className="filter-bar" style={{ 
                display: 'flex', 
                gap: '16px', 
                alignItems: 'center', 
                marginBottom: '24px',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>From Date</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '14px',
                            minWidth: '150px'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>To Date</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '14px',
                            minWidth: '150px'
                        }}
                    />
                </div>
                <button
                    onClick={fetchConsultations}
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        background: '#96034f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginTop: '20px'
                    }}
                >
                    {loading ? 'Loading...' : 'Filter'}
                </button>
                <button
                    onClick={() => {
                        setFromDate('');
                        setToDate('');
                        setTimeout(() => fetchConsultations(), 0);
                    }}
                    style={{
                        padding: '10px 20px',
                        background: '#f3f4f6',
                        color: '#666',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginTop: '20px'
                    }}
                >
                    Clear
                </button>
                <button
                    onClick={() => {
                        if (list.length === 0) return;
                        const headers = ['Name', 'Email', 'Contact', 'Wedding Date', 'Location', 'Submitted At'];
                        const rows = list.map(item => [
                            item.name,
                            item.email,
                            item.contact,
                            item.wedding_date || '',
                            item.event_location || '',
                            item.created_at
                        ]);
                        const csv = [
                            headers.join(','),
                            ...rows.map(r => r.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(','))
                        ].join('\n');
                        const blob = new Blob([csv], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `inquiries-${fromDate || 'all'}-to-${toDate || 'all'}.csv`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }}
                    disabled={list.length === 0}
                    style={{
                        padding: '10px 20px',
                        background: list.length === 0 ? '#e5e7eb' : '#065f46',
                        color: list.length === 0 ? '#9ca3af' : 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: list.length === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginTop: '20px'
                    }}
                >
                    Download CSV
                </button>
            </div>

            {status && (
                <div style={{ 
                    padding: '12px 16px', 
                    marginBottom: '16px', 
                    borderRadius: '8px',
                    background: status.includes('Error') ? '#fee2e2' : '#d1fae5',
                    color: status.includes('Error') ? '#991b1b' : '#065f46',
                    fontSize: '14px'
                }}>
                    {status}
                </div>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <thead>
                        <tr style={{ background: '#f9fafb' }}>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666', borderBottom: '1px solid #e5e7eb' }}>Contact</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666', borderBottom: '1px solid #e5e7eb' }}>Wedding Date</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666', borderBottom: '1px solid #e5e7eb' }}>Location</th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666', borderBottom: '1px solid #e5e7eb' }}>Submitted</th>
                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                                    {loading ? 'Loading inquiries...' : 'No inquiries found for the selected date range.'}
                                </td>
                            </tr>
                        ) : (
                            list.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111' }}>{item.name}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#666' }}>{item.email}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#666' }}>{item.contact}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#666' }}>{item.wedding_date || '-'}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#666' }}>{item.event_location || '-'}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#999' }}>{formatDate(item.created_at)}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            style={{
                                                padding: '6px 12px',
                                                background: '#fee2e2',
                                                color: '#dc2626',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '16px', fontSize: '13px', color: '#666' }}>
                Total inquiries: <strong>{list.length}</strong>
            </div>
        </div>
    );
}
