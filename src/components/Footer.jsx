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
            JD<span>Properties</span>
          </Link>
          <p className="footer__text">
            Your trusted partner for buying, selling and renting premium properties across Albania.
          </p>
          <div className="footer__social">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/properties">All properties</Link>
          <Link to="/properties?status=For Sale">For sale</Link>
          <Link to="/properties?status=For Rent">For rent</Link>
          <Link to="/about">About us</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>
            <FiPhone /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`}>
            <FiMail /> {site.email}
          </a>
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
