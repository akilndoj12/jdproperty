import { useState } from 'react';
import { site } from '../data/site.js';

// Formulari i kontaktit. Pa backend, mesazhi hapet gati në WhatsApp.
// Nëse më vonë lidhni një backend (Node/Express) ose shërbim si Formspree, ndryshoni handleSubmit.
export default function ContactForm({ propertyTitle }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: propertyTitle ? `Hello, I'm interested in "${propertyTitle}".` : '',
  });
  const [sent, setSent] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text =
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Full name" value={form.name} onChange={update} required />
      <div className="form__row">
        <input name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={update} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={update} />
      </div>
      <textarea name="message" rows="5" placeholder="Your message" value={form.message} onChange={update} required />
      <button type="submit" className="btn btn--primary btn--block">
        Send message
      </button>
      {sent && <p className="form__success">Thank you! We will get back to you shortly.</p>}
    </form>
  );
}
