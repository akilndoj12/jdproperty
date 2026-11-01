import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMapPin, FiCheck, FiArrowLeft, FiPhone } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { BiArea } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';
import ContactForm from '../components/ContactForm.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import NotFound from './NotFound.jsx';
import { properties, formatPrice } from '../data/properties.js';
import { site } from '../data/site.js';

// "key" bën që galeria të fillojë nga fotoja e parë kur kalon nga një pronë te tjetra
export default function PropertyDetail() {
  const { id } = useParams();
  return <Detail key={id} id={id} />;
}

function Detail({ id }) {
  const p = properties.find((x) => x.id === Number(id));
  const [active, setActive] = useState(0);

  if (!p) return <NotFound />;

  const similar = properties.filter((x) => x.id !== p.id && (x.city === p.city || x.type === p.type)).slice(0, 3);
  const waText = encodeURIComponent(`Hello, I'm interested in "${p.title}" (${formatPrice(p)}).`);

  return (
    <section className="section detail">
      <div className="container">
        <Link to="/properties" className="link-arrow back">
          <FiArrowLeft /> Back to properties
        </Link>

        <div className="detail__head">
          <div>
            <span className={`badge badge--static ${p.status === 'For Rent' ? 'badge--rent' : ''}`}>{p.status}</span>
            <h1>{p.title}</h1>
            <p className="card__loc">
              <FiMapPin /> {p.address}
            </p>
          </div>
          <div className="detail__price">{formatPrice(p)}</div>
        </div>

        {/* Galeria: kliko foton e vogël për ta parë të madhe */}
        <div className="gallery">
          <img className="gallery__main" src={p.images[active]} alt={p.title} />
          <div className="gallery__thumbs">
            {p.images.map((img, i) => (
              <button key={img} className={i === active ? 'is-active' : ''} onClick={() => setActive(i)}>
                <img src={img} alt={`${p.title} ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="detail__layout">
          <div>
            <div className="detail__meta">
              {p.beds > 0 && (
                <div>
                  <IoBedOutline />
                  <strong>{p.beds}</strong> Bedrooms
                </div>
              )}
              <div>
                <LuBath />
                <strong>{p.baths}</strong> Bathrooms
              </div>
              <div>
                <BiArea />
                <strong>{p.area} m²</strong> Area
              </div>
            </div>

            <h2>Description</h2>
            <p className="detail__desc">{p.description}</p>

            <h2>Features</h2>
            <ul className="features">
              {p.features.map((f) => (
                <li key={f}>
                  <FiCheck /> {f}
                </li>
              ))}
            </ul>
          </div>

          <aside className="detail__aside">
            <h3>Interested in this property?</h3>
            <div className="detail__quick">
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn--outline">
                <FiPhone /> Call
              </a>
              <a href={`https://wa.me/${site.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer" className="btn btn--whatsapp">
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
            <ContactForm propertyTitle={p.title} />
          </aside>
        </div>

        {similar.length > 0 && (
          <>
            <h2 className="similar__title">Similar properties</h2>
            <div className="grid">
              {similar.map((s) => (
                <PropertyCard key={s.id} property={s} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
