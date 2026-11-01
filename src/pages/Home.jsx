import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiHome, FiBriefcase, FiTrendingUp, FiShield, FiMap } from 'react-icons/fi';
import { MdOutlineVilla, MdOutlineApartment } from 'react-icons/md';
import PropertyCard from '../components/PropertyCard.jsx';
import { properties, cities, types } from '../data/properties.js';

const HERO = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80';

const services = [
  { icon: <FiHome />, title: 'Residential', text: 'Apartments and villas in the best locations across Albania.' },
  { icon: <FiBriefcase />, title: 'Commercial', text: 'Shops, offices and commercial units for your business.' },
  { icon: <FiTrendingUp />, title: 'Investment', text: 'Opportunities in new residential projects with strong value growth.' },
  { icon: <FiShield />, title: 'Full Support', text: 'Guidance on documents, notary and registration from start to finish.' },
];

// Kategoritë si te Instagram: Komerciale, Vila, Toka, Apartamente
const categories = [
  { type: 'Commercial', label: 'Commercial', sq: 'Komerciale', icon: <FiBriefcase /> },
  { type: 'Villa', label: 'Villas', sq: 'Vila', icon: <MdOutlineVilla /> },
  { type: 'Land', label: 'Land', sq: 'Toka', icon: <FiMap /> },
  { type: 'Apartment', label: 'Apartments', sq: 'Apartamente', icon: <MdOutlineApartment /> },
];

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ status: '', type: '', city: '' });
  const featured = properties.filter((p) => p.featured).slice(0, 3);

  // Kërkimi dërgon filtrat te faqja Properties përmes URL-së
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(search).forEach(([k, v]) => v && params.set(k, v));
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ backgroundImage: `url(${HERO})` }}>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <span className="eyebrow eyebrow--light">Beyond Real Estate</span>
          <h1>Residential, commercial & investment properties in Albania</h1>
          <p>Apartments, villas, land and commercial units — find your next property or investment opportunity with JD Properties.</p>

          <form className="search" onSubmit={handleSearch}>
            <select value={search.status} onChange={(e) => setSearch({ ...search, status: e.target.value })}>
              <option value="">Buy or Rent</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
            <select value={search.type} onChange={(e) => setSearch({ ...search, type: e.target.value })}>
              <option value="">Property type</option>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select value={search.city} onChange={(e) => setSearch({ ...search, city: e.target.value })}>
              <option value="">City</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <button type="submit" className="btn btn--primary">
              <FiSearch /> Search
            </button>
          </form>
        </div>
      </section>

      {/* KATEGORITË */}
      <section className="cats">
        <div className="container cats__grid">
          {categories.map((c) => (
            <Link key={c.type} to={`/properties?type=${c.type}`} className="cat">
              <span className="cat__icon">{c.icon}</span>
              <span>
                <strong>{c.label}</strong>
                <small>{c.sq}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <span className="eyebrow">Featured listings</span>
              <h2>Handpicked properties</h2>
            </div>
            <Link to="/properties" className="link-arrow">
              View all <FiArrowRight />
            </Link>
          </div>
          <div className="grid">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">What we do</span>
            <h2>Residential • Commercial • Investment</h2>
          </div>
          <div className="services">
            {services.map((s) => (
              <div className="service" key={s.title}>
                <div className="service__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <div>
            <h2>Looking for an investment opportunity?</h2>
            <p>Call or message us on WhatsApp and we'll find the right property for you.</p>
          </div>
          <Link to="/contact" className="btn btn--light">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
