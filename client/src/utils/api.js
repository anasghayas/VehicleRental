import axios from 'axios';

// We create an 'axios instance' so we don't have to type http://localhost:5000/api every single time!
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Later in Phase 3, we will add a special interceptor here 
// to automatically attach the JWT token to every request!

export default api;
