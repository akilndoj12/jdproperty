// Të dhënat e pronave (SHEMBUJ – jo prona reale). Zëvendësoji me pronat reale të agjencisë.
// Fotot janë nga Unsplash; vendos fotot tuaja te /public/images dhe ndrysho linket.

const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const properties = [
  {
    id: 1,
    title: 'Modern Villa with Pool',
    type: 'Villa',
    status: 'For Sale',
    city: 'Tirana',
    address: 'Lunder, Tirana',
    price: 650000,
    beds: 5,
    baths: 4,
    area: 420,
    featured: true,
    images: [u('photo-1613490493576-7fde63acd811'), u('photo-1600596542815-ffad4c1539a9'), u('photo-1600607687939-ce8a6c25118c')],
    description:
      'A contemporary villa on a quiet hillside with panoramic views of Tirana. Open-plan living, private pool, landscaped garden and a two-car garage.',
    features: ['Swimming pool', 'Garden', 'Garage', 'Smart home', 'Fireplace', 'Security system'],
  },
  {
    id: 2,
    title: 'Luxury Apartment at Blloku',
    type: 'Apartment',
    status: 'For Sale',
    city: 'Tirana',
    address: 'Blloku, Tirana',
    price: 285000,
    beds: 3,
    baths: 2,
    area: 145,
    featured: true,
    images: [u('photo-1502672260266-1c1ef2d93688'), u('photo-1560448204-e02f11c3d0e2'), u('photo-1600585154340-be6161a56a0c')],
    description:
      'Bright, fully furnished apartment in the heart of Blloku, steps from cafés, restaurants and parks. High-end finishes and a large terrace.',
    features: ['Furnished', 'Terrace', 'Elevator', 'Underground parking', 'Air conditioning'],
  },
  {
    id: 3,
    title: 'Seafront Penthouse',
    type: 'Apartment',
    status: 'For Sale',
    city: 'Durrës',
    address: 'Plazh, Durrës',
    price: 390000,
    beds: 3,
    baths: 3,
    area: 190,
    featured: true,
    images: [u('photo-1512917774080-9991f1c4c750'), u('photo-1600566753190-17f0baa2a6c3'), u('photo-1600210492486-724fe5c67fb0')],
    description:
      'Top-floor penthouse directly on the beach with a wraparound terrace and uninterrupted sea views. Ideal as a home or holiday rental.',
    features: ['Sea view', 'Terrace', 'Jacuzzi', 'Parking', 'Elevator'],
  },
  {
    id: 4,
    title: 'Family House with Garden',
    type: 'Villa',
    status: 'For Sale',
    city: 'Tirana',
    address: 'Farkë, Tirana',
    price: 320000,
    beds: 4,
    baths: 3,
    area: 260,
    featured: false,
    images: [u('photo-1580587771525-78b9dba3b914'), u('photo-1600047509807-ba8f99d2cdde'), u('photo-1600566753086-00f18fb6b3ea')],
    description:
      'Spacious detached house near the Farka Lake, with a large garden, barbecue area and plenty of natural light throughout.',
    features: ['Garden', 'Garage', 'Barbecue area', 'Storage', 'Heating'],
  },
  {
    id: 5,
    title: 'Studio Apartment for Rent',
    type: 'Apartment',
    status: 'For Rent',
    city: 'Tirana',
    address: 'Rruga e Kavajës, Tirana',
    price: 550,
    beds: 1,
    baths: 1,
    area: 55,
    featured: false,
    images: [u('photo-1522708323590-d24dbb6b0267'), u('photo-1493809842364-78817add7ffb'), u('photo-1484154218962-a197022b5858')],
    description:
      'Modern, fully equipped studio close to the city center. Perfect for young professionals. Utilities not included.',
    features: ['Furnished', 'Air conditioning', 'Balcony', 'Elevator'],
  },
  {
    id: 6,
    title: 'Villa with Sea View',
    type: 'Villa',
    status: 'For Sale',
    city: 'Vlorë',
    address: 'Radhimë, Vlorë',
    price: 540000,
    beds: 4,
    baths: 4,
    area: 310,
    featured: true,
    images: [u('photo-1600585154526-990dced4db0d'), u('photo-1600607687644-c7171b42498f'), u('photo-1600573472550-8090b5e0745e')],
    description:
      'Elegant Mediterranean villa overlooking the Bay of Vlorë. Infinity pool, outdoor kitchen and direct access to a private beach path.',
    features: ['Sea view', 'Infinity pool', 'Outdoor kitchen', 'Garden', 'Parking'],
  },
  {
    id: 7,
    title: 'Office Space in Business District',
    type: 'Commercial',
    status: 'For Rent',
    city: 'Tirana',
    address: 'Bulevardi Zogu I, Tirana',
    price: 2400,
    beds: 0,
    baths: 2,
    area: 220,
    featured: false,
    images: [u('photo-1497366216548-37526070297c'), u('photo-1497366811353-6870744d04b2'), u('photo-1524758631624-e2822e304c36')],
    description:
      'Open-plan office on a high floor with meeting rooms, reception area and fiber internet. Close to ministries and banks.',
    features: ['Reception', 'Meeting rooms', 'Fiber internet', 'Parking', '24/7 security'],
  },
  {
    id: 8,
    title: 'Two-Bedroom Apartment for Rent',
    type: 'Apartment',
    status: 'For Rent',
    city: 'Durrës',
    address: 'Shkëmbi i Kavajës, Durrës',
    price: 800,
    beds: 2,
    baths: 1,
    area: 90,
    featured: false,
    images: [u('photo-1505691938895-1758d7feb511'), u('photo-1556020685-ae41abfc9365'), u('photo-1556912173-3bb406ef7e77')],
    description:
      'Bright apartment a short walk from the beach, with a large balcony and partial sea view. Available for long-term rent.',
    features: ['Partial sea view', 'Balcony', 'Furnished', 'Air conditioning'],
  },
  {
    id: 9,
    title: 'Building Plot with Permit Potential',
    type: 'Land',
    status: 'For Sale',
    city: 'Tirana',
    address: 'Tirana outskirts',
    price: 180000,
    beds: 0,
    baths: 0,
    area: 1500,
    featured: false,
    images: [u('photo-1500382017468-9049fed747ef'), u('photo-1500076656116-558758c991c1'), u('photo-1501785888041-af3ef285b470')],
    description:
      'Flat plot of land with road access, suitable for a residential villa or small development project.',
    features: ['Road access', 'Utilities nearby', 'Clear documents'],
  },
];

export const cities = [...new Set(properties.map((p) => p.city))];
// Kategoritë e agjencisë (si te Instagram)
export const types = ['Apartment', 'Villa', 'Commercial', 'Land'];

// Formaton çmimin: p.sh. 650000 -> "€650,000" ose "€550 / month" për qira
export function formatPrice(p) {
  const value = '€' + p.price.toLocaleString('en-US');
  return p.status === 'For Rent' ? `${value} / month` : value;
}
