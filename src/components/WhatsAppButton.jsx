import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../data/site.js';

// Butoni jeshil i WhatsApp-it poshtë djathtas
export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp"
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp">
      <FaWhatsapp />
    </a>
  );
}
