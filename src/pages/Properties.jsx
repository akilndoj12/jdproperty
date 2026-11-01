import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import { properties, cities, types } from '../data/properties.js';

export default function Properties() {
  // Filtrat ruhen në URL (p.sh. /properties?city=Tirana) që linku të ndahet lehtë
  const [params, setParams] = useSearchParams();
  const status = params.get('status') || '';
  const type = params.get('type') || '';
  const city = params.get('city') || '';
  const sort = params.get('sort') || 'newest';

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  const list = useMemo(() => {
    let r = properties.filter(
      (p) => (!status || p.status === status) && (!type || p.type === type) && (!city || p.city === city)
    );
    if (sort === 'price-asc') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'newest') r = [...r].sort((a, b) => b.id - a.id);
    return r;
  }, [status, type, city, sort]);

  return (
    <>
      <PageHeader title="Our Properties" subtitle="Browse apartments, villas, houses and commercial spaces." />

      <section className="section">
        <div className="container">
          <div className="filters">
            <select value={status} onChange={(e) => setFilter('status', e.target.value)}>
              <option value="">Buy or Rent</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
            <select value={type} onChange={(e) => setFilter('type', e.target.value)}>
              <option value="">All types</option>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select value={city} onChange={(e) => setFilter('city', e.target.value)}>
              <option value="">All cities</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setFilter('sort', e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
            {(status || type || city) && (
              <button className="btn btn--ghost" onClick={() => setParams({})}>
                Clear
              </button>
            )}
          </div>

          <p className="results">{list.length} properties found</p>

          {list.length ? (
            <div className="grid">
              {list.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <p className="empty">No properties match your filters. Try changing them.</p>
          )}
        </div>
      </section>
    </>
  );
}
