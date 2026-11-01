import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { properties as sampleProperties } from './properties.js';
import { fetchProperties, isConfigured } from '../lib/supabase.js';

// Ngarkon pronat nga Supabase një herë dhe ua jep të gjitha faqeve.
// Nëse Supabase s'është lidhur ende, përdoren pronat shembull.
const PropertiesContext = createContext(null);

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState(isConfigured ? [] : sampleProperties);
  const [loading, setLoading] = useState(isConfigured);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    if (!isConfigured) return;
    setLoading(true);
    try {
      setProperties(await fetchProperties());
      setError('');
    } catch (e) {
      // Nëse databaza s'përgjigjet, faqja publike tregon pronat shembull që të mos duket bosh
      setProperties(sampleProperties);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <PropertiesContext.Provider value={{ properties, loading, error, reload }}>
      {children}
    </PropertiesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProperties() {
  return useContext(PropertiesContext);
}
