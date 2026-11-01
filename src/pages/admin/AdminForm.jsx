import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiUpload, FiX, FiStar } from 'react-icons/fi';
import { useProperties } from '../../data/PropertiesContext.jsx';
import { types } from '../../data/properties.js';
import { createProperty, updateProperty, uploadImage } from '../../lib/supabase.js';

const empty = {
  title: '',
  type: 'Apartment',
  status: 'For Sale',
  city: 'Tirana',
  address: '',
  price: '',
  beds: '',
  baths: '',
  area: '',
  featured: false,
  description: '',
  features: '',
  images: [],
};

// Formulari për të shtuar ose ndryshuar një pronë
export default function AdminForm() {
  const { id } = useParams();
  const { properties, loading, reload } = useProperties();
  const existing = id ? properties.find((p) => String(p.id) === String(id)) : null;

  if (id && loading) return <p>Loading…</p>;
  if (id && !existing) return <p>Property not found.</p>;

  // "key" që formulari të rifillojë kur ndërrohet prona
  return <Form key={id || 'new'} id={id} existing={existing} reload={reload} />;
}

function Form({ id, existing, reload }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(() =>
    existing
      ? {
          ...empty,
          ...existing,
          price: existing.price ?? '',
          beds: existing.beds ?? '',
          baths: existing.baths ?? '',
          area: existing.area ?? '',
          features: (existing.features || []).join(', '),
          images: existing.images || [],
        }
      : empty
  );
  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (e) =>
    setForm({ ...form, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const addImages = async (files) => {
    const list = [...files].filter((f) => f.type.startsWith('image/'));
    if (!list.length) return;
    setError('');
    setUploading((n) => n + list.length);
    for (const file of list) {
      try {
        const url = await uploadImage(file);
        setForm((f) => ({ ...f, images: [...f.images, url] }));
      } catch (e) {
        setError(`Photo upload failed: ${e.message}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
  };

  const removeImage = (url) => setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));
  const makeCover = (url) => setForm((f) => ({ ...f, images: [url, ...f.images.filter((i) => i !== url)] }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const num = (v) => (v === '' || v === null ? null : Number(v));
    const payload = {
      title: form.title.trim(),
      type: form.type,
      status: form.status,
      city: form.city.trim(),
      address: form.address.trim(),
      price: num(form.price),
      beds: num(form.beds) ?? 0,
      baths: num(form.baths) ?? 0,
      area: num(form.area),
      featured: form.featured,
      description: form.description.trim(),
      features: form.features
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      images: form.images,
    };
    try {
      if (id) await updateProperty(id, payload);
      else await createProperty(payload);
      await reload();
      navigate('/admin');
    } catch (e) {
      setError(`Could not save: ${e.message}`);
      setSaving(false);
    }
  };

  return (
    <form className="admin__form" onSubmit={save}>
      <Link to="/admin" className="link-arrow back">
        <FiArrowLeft /> Back to list
      </Link>
      <h1>{id ? 'Edit property' : 'Add property'}</h1>

      <div className="admin__card form">
        <label>
          Title *
          <input value={form.title} onChange={set('title')} placeholder="e.g. 2+1 Apartment at Square 21" required />
        </label>

        <div className="admin__grid">
          <label>
            Type
            <select value={form.type} onChange={set('type')}>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            For
            <select value={form.status} onChange={set('status')}>
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
          </label>
          <label>
            City *
            <input value={form.city} onChange={set('city')} required />
          </label>
          <label>
            Area / address
            <input value={form.address} onChange={set('address')} placeholder="e.g. Blloku, Tirana" />
          </label>
        </div>

        <div className="admin__grid admin__grid--4">
          <label>
            Price (€) *{form.status === 'For Rent' && <small> / month</small>}
            <input type="number" min="0" value={form.price} onChange={set('price')} required />
          </label>
          <label>
            Area (m²)
            <input type="number" min="0" value={form.area} onChange={set('area')} />
          </label>
          <label>
            Bedrooms
            <input type="number" min="0" value={form.beds} onChange={set('beds')} />
          </label>
          <label>
            Bathrooms
            <input type="number" min="0" value={form.baths} onChange={set('baths')} />
          </label>
        </div>

        <label>
          Description
          <textarea rows="5" value={form.description} onChange={set('description')} />
        </label>
        <label>
          Features <small className="muted">(separated by commas)</small>
          <input value={form.features} onChange={set('features')} placeholder="Elevator, Parking, Terrace" />
        </label>
        <label className="admin__check">
          <input type="checkbox" checked={form.featured} onChange={set('featured')} />
          Show on the home page (featured)
        </label>
      </div>

      <div className="admin__card">
        <h3>Photos</h3>
        <p className="muted">The first photo is the cover. Tap ★ on any photo to make it the cover.</p>
        <div className="admin__photos">
          {form.images.map((url, i) => (
            <div className="admin__photo" key={url}>
              <img src={url} alt="" />
              {i === 0 && <span className="admin__cover">Cover</span>}
              <div className="admin__photo-actions">
                {i !== 0 && (
                  <button type="button" onClick={() => makeCover(url)} title="Make cover">
                    <FiStar />
                  </button>
                )}
                <button type="button" onClick={() => removeImage(url)} title="Remove">
                  <FiX />
                </button>
              </div>
            </div>
          ))}
          <label className="admin__upload">
            <FiUpload />
            <span>{uploading ? `Uploading ${uploading}…` : 'Add photos'}</span>
            <input type="file" accept="image/*" multiple hidden onChange={(e) => addImages(e.target.files)} />
          </label>
        </div>
      </div>

      {error && <p className="form__error">{error}</p>}
      <div className="admin__save">
        <Link to="/admin" className="btn btn--ghost">
          Cancel
        </Link>
        <button className="btn btn--primary" disabled={saving || uploading > 0}>
          {saving ? 'Saving…' : id ? 'Save changes' : 'Publish property'}
        </button>
      </div>
    </form>
  );
}
