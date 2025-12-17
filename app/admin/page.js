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
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </div>

                    <div className="tab-content">
                        {tab === 'blog' && <BlogSection token={token} />}
                        {tab === 'case' && <CaseSection token={token} />}
                        {tab === 'faq' && <FaqSection token={token} />}
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
        category: '',
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
                    category: '',
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
                            {item.category} • {item.author}
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
                            placeholder="Category"
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                                    category: '',
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
        category: '',
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
                    category: '',
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
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                                    category: '',
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
