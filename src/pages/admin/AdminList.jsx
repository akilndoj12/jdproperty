import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { useProperties } from '../../data/PropertiesContext.jsx';
import { formatPrice } from '../../data/properties.js';
import { deleteProperty } from '../../lib/supabase.js';

// Lista e të gjitha pronave me butonat Ndrysho / Fshi
export default function AdminList() {
  const { properties, loading, error, reload } = useProperties();
  const [query, setQuery] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [msg, setMsg] = useState('');

  const list = properties.filter((p) =>
    `${p.title} ${p.city} ${p.address} ${p.type}`.toLowerCase().includes(query.toLowerCase())
  );

  const remove = async (id) => {
    setBusyId(id);
    setMsg('');
    try {
      await deleteProperty(id);
      await reload();
      setMsg('Property deleted.');
    } catch (e) {
      setMsg(`Could not delete: ${e.message}`);
    } finally {
      setBusyId(null);
      setConfirmId(null);
    }
  };

  return (
    <>
      <div className="admin__head">
        <div>
          <h1>Properties</h1>
          <p className="muted">{loading ? 'Loading…' : `${properties.length} properties on the website`}</p>
        </div>
        <Link to="/admin/new" className="btn btn--primary">
          <FiPlus /> Add property
        </Link>
      </div>

      {error && <p className="form__error">Database error: {error}. Check that schema.sql was run in Supabase.</p>}
      {msg && <p className="admin__msg">{msg}</p>}

      <input
        className="admin__search"
        placeholder="Search by title, city, type…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {!loading && list.length === 0 && (
        <div className="admin__card admin__empty">
          <p>No properties yet.</p>
          <Link to="/admin/new" className="btn btn--primary">
            <FiPlus /> Add the first property
          </Link>
        </div>
      )}

      <div className="admin__list">
        {list.map((p) => (
          <div className="admin__row" key={p.id}>
            <div className="admin__thumb">{p.images?.[0] && <img src={p.images[0]} alt="" />}</div>
            <div className="admin__info">
              <strong>
                {p.featured && <FiStar className="admin__star" title="Featured" />} {p.title}
              </strong>
              <span className="muted">
                {p.type} · {p.status} · {p.city}
              </span>
              <span className="admin__price">{formatPrice(p)}</span>
            </div>
            <div className="admin__actions">
              <Link to={`/admin/edit/${p.id}`} className="btn btn--outline btn--sm">
                <FiEdit2 /> Edit
              </Link>
              {confirmId === p.id ? (
                <button className="btn btn--danger btn--sm" onClick={() => remove(p.id)} disabled={busyId === p.id}>
                  {busyId === p.id ? 'Deleting…' : 'Confirm delete'}
                </button>
              ) : (
                <button className="btn btn--ghost btn--sm" onClick={() => setConfirmId(p.id)}>
                  <FiTrash2 /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
