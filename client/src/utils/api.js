import axios from 'axios';

// We create an 'axios instance' and use a relative path so it works in any environment (like remote workspaces)
const api = axios.create({
  baseURL: '/api',
});

// Later in Phase 3, we will add a special interceptor here 
// to automatically attach the JWT token to every request!

export default api;
