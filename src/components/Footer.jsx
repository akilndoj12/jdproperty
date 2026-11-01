import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { site } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="logo logo--light">
            <b className="logo__mark">JD</b><span>PROPERTIES</span>
          </Link>
          <p className="footer__text">
            Beyond Real Estate. Residential, commercial and investment properties across Albania.
          </p>
          <div className="footer__social">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            {site.facebook && (
              <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/properties">All properties</Link>
          <Link to="/properties?type=Apartment">Apartments</Link>
          <Link to="/properties?type=Villa">Villas</Link>
          <Link to="/properties?type=Commercial">Commercial</Link>
          <Link to="/properties?type=Land">Land</Link>
          <Link to="/about">About us</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>
            <FiPhone /> {site.phone}
          </a>
          {site.email && (
            <a href={`mailto:${site.email}`}>
              <FiMail /> {site.email}
            </a>
          )}
          <span>
            <FiMapPin /> {site.address}
          </span>
        </div>
      </div>
      <div className="footer__bottom">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
