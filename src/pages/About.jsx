import { Link } from 'react-router-dom';
import { FiAward, FiUsers, FiHeart } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';

const IMG = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80';

const values = [
  { icon: <FiAward />, title: 'Expertise', text: 'Deep knowledge of the Albanian property market and legal process.' },
  { icon: <FiUsers />, title: 'Client first', text: 'We listen, advise honestly and stay with you after the deal is closed.' },
  { icon: <FiHeart />, title: 'Transparency', text: 'Clear prices, verified documents and no hidden fees.' },
];

export default function About() {
  return (
    <>
      <PageHeader title="About JD Properties" subtitle="Real estate done with care, honesty and expertise." />

      <section className="section">
        <div className="container about">
          <img src={IMG} alt="JD Properties interior" />
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>Helping people find their place since day one</h2>
            <p>
              JD Properties is a real estate agency based in Tirana, specialized in premium residential and commercial
              properties across Albania. From city apartments to seaside villas, we guide our clients through every
              step: search, viewings, negotiation, documents and notary.
            </p>
            <p>
              Whether you are buying your first home, investing, or selling a property, our team gives you honest
              advice and full support.
            </p>
            <Link to="/contact" className="btn btn--primary">
              Talk to an agent
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">Our values</span>
            <h2>Why choose us</h2>
          </div>
          <div className="services services--3">
            {values.map((v) => (
              <div className="service" key={v.title}>
                <div className="service__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
