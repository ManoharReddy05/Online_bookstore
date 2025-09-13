const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}
