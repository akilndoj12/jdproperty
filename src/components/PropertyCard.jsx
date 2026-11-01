import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { BiArea } from 'react-icons/bi';
import { formatPrice } from '../data/properties.js';

export default function PropertyCard({ property: p }) {
  return (
    <Link to={`/properties/${p.id}`} className="card">
      <div className="card__img">
        <img src={p.images[0]} alt={p.title} loading="lazy" />
        <span className={`badge ${p.status === 'For Rent' ? 'badge--rent' : ''}`}>{p.status}</span>
        <span className="card__type">{p.type}</span>
      </div>
      <div className="card__body">
        <div className="card__price">{formatPrice(p)}</div>
        <h3>{p.title}</h3>
        <p className="card__loc">
          <FiMapPin /> {p.address}
        </p>
        <div className="card__meta">
          {p.beds > 0 && (
            <span>
              <IoBedOutline /> {p.beds} {p.beds === 1 ? 'Bed' : 'Beds'}
            </span>
          )}
          {p.baths > 0 && (
            <span>
              <LuBath /> {p.baths} {p.baths === 1 ? 'Bath' : 'Baths'}
            </span>
          )}
          <span>
            <BiArea /> {p.area} m²
          </span>
        </div>
      </div>
    </Link>
  );
}
