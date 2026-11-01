import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminList from './pages/admin/AdminList.jsx';
import AdminForm from './pages/admin/AdminForm.jsx';
import { PropertiesProvider } from './data/PropertiesContext.jsx';

// Kthen faqen në krye sa herë ndryshon adresa
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <PropertiesProvider>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Paneli i adminit: /admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminList />} />
            <Route path="new" element={<AdminForm />} />
            <Route path="edit/:id" element={<AdminForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </PropertiesProvider>
  );
}
