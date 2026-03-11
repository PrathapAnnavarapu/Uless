// centralize configuration for the external Flask backend
export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function fetchJson(input: RequestInfo, init?: RequestInit) {
  const resp = await fetch(input, init);
  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(errorText || "Network response was not ok");
  }
  return resp.json();
}
