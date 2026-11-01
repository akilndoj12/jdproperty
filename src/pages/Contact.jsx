import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { site } from '../data/site.js';

export default function Contact() {
  const items = [
    { icon: <FiPhone />, label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    { icon: <FiMail />, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: <FiMapPin />, label: 'Office', value: site.address },
    { icon: <FiClock />, label: 'Working hours', value: site.hours },
  ];

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you. Send us a message or give us a call." />

      <section className="section">
        <div className="container contact">
          <div>
            <h2>Get in touch</h2>
            <ul className="contact__list">
              {items.map((i) => (
                <li key={i.label}>
                  <span className="service__icon">{i.icon}</span>
                  <div>
                    <small>{i.label}</small>
                    {i.href ? <a href={i.href}>{i.value}</a> : <p>{i.value}</p>}
                  </div>
                </li>
              ))}
            </ul>
            {/* Harta: ndrysho "q=" me adresën e saktë të zyrës */}
            <iframe
              className="map"
              title="Map"
              loading="lazy"
              src="https://www.google.com/maps?q=Tirana,Albania&output=embed"
            />
          </div>

          <div className="contact__form">
            <h2>Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
