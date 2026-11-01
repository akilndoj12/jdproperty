// Lidhja me Supabase (databaza + login + fotot) pa librari shtesë, vetëm me fetch.
// URL dhe "anon key" janë publike (janë bërë për t'u përdorur në browser).
// Siguria bëhet nga rregullat RLS në databazë: të gjithë lexojnë, vetëm admini shkruan.

export const SUPABASE_URL = 'https://skjbyacswtlqyxouodjc.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_Bujddag5HNK12PSOHKxytQ_14YO2Wst'; // Publishable key (publik)

export const BUCKET = 'property-images';
export const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const SESSION_KEY = 'jd_admin_session';

// ---------- Sesioni i adminit ----------
function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function saveSession(data) {
  const session = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (data.expires_in - 60) * 1000,
    email: data.user?.email,
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* s'ka problem */
  }
  return session;
}

export function getSession() {
  return readSession();
}

export function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* s'ka problem */
  }
}

async function authRequest(grantType, body) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=${grantType}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || 'Login failed');
  return saveSession(data);
}

export function signIn(email, password) {
  return authRequest('password', { email, password });
}

// Kthen token-in e vlefshëm (e rinovon nëse ka skaduar)
async function accessToken() {
  const s = readSession();
  if (!s) throw new Error('Not logged in');
  if (Date.now() < s.expires_at) return s.access_token;
  try {
    const fresh = await authRequest('refresh_token', { refresh_token: s.refresh_token });
    return fresh.access_token;
  } catch (e) {
    signOut();
    throw e;
  }
}

// ---------- Databaza ----------
async function rest(path, { method = 'GET', body, auth = false } = {}) {
  // Pa login dërgohet vetëm "apikey" (punon edhe me "anon" edhe me "publishable" key)
  const headers = { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = `Bearer ${await accessToken()}`;
  if (method !== 'GET') headers.Prefer = 'return=representation';
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);
  return data;
}

export function fetchProperties() {
  return rest('properties?select=*&order=created_at.desc');
}

export async function createProperty(p) {
  const [row] = await rest('properties', { method: 'POST', body: p, auth: true });
  return row;
}

export async function updateProperty(id, p) {
  const [row] = await rest(`properties?id=eq.${id}`, { method: 'PATCH', body: p, auth: true });
  return row;
}

export function deleteProperty(id) {
  return rest(`properties?id=eq.${id}`, { method: 'DELETE', auth: true });
}

// ---------- Fotot ----------
export async function uploadImage(file) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': file.type || 'image/jpeg',
    },
    body: file,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Upload failed');
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
