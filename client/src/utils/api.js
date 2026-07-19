import axios from 'axios';

// We create an 'axios instance' and use a relative path so it works in any environment (like remote workspaces)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export default api;
