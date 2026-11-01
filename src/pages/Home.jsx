import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiHome, FiKey, FiTrendingUp, FiShield } from 'react-icons/fi';
import PropertyCard from '../components/PropertyCard.jsx';
import { properties, cities, types } from '../data/properties.js';

const HERO = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80';

const services = [
  { icon: <FiHome />, title: 'Buy a Property', text: 'Find homes, villas and apartments that match your lifestyle and budget.' },
  { icon: <FiKey />, title: 'Rent a Property', text: 'Short and long-term rentals in the best neighborhoods of Albania.' },
  { icon: <FiTrendingUp />, title: 'Sell a Property', text: 'We market your property to qualified buyers and get you the best price.' },
  { icon: <FiShield />, title: 'Legal Support', text: 'Full assistance with documents, notary and property registration.' },
];

const stats = [
  { value: '250+', label: 'Properties sold' },
  { value: '500+', label: 'Happy clients' },
  { value: '10+', label: 'Years of experience' },
  { value: '4', label: 'Cities covered' },
];

const testimonials = [
  { name: 'Arben K.', text: 'Professional and honest team. They found us the perfect apartment in Blloku in less than two weeks.' },
  { name: 'Elira M.', text: 'They sold our house quickly and handled all the paperwork. Highly recommended!' },
  { name: 'Marco R.', text: 'As a foreign buyer I felt fully supported from the first visit to the notary.' },
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
          <span className="eyebrow eyebrow--light">Luxury Real Estate in Albania</span>
          <h1>Find the home that fits your life</h1>
          <p>Buy, sell and rent premium apartments, villas and commercial spaces with a team you can trust.</p>

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

      {/* STATS */}
      <section className="stats">
        <div className="container stats__grid">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
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
            <h2>Our services</h2>
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

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">Testimonials</span>
            <h2>What our clients say</h2>
          </div>
          <div className="testimonials">
            {testimonials.map((t) => (
              <blockquote key={t.name}>
                <p>“{t.text}”</p>
                <cite>— {t.name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <div>
            <h2>Thinking of selling your property?</h2>
            <p>Get a free valuation from our experts today.</p>
          </div>
          <Link to="/contact" className="btn btn--light">
            Get a free valuation
          </Link>
        </div>
      </section>
    </>
  );
}
