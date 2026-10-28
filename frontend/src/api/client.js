import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_URL,
});

// Turn backend validation errors into a readable message in error.response.data.detail.
client.interceptors.response.use(
  response => response,
  error => {
    const data = error.response?.data;
    if (data && typeof data === 'object') {
      if (Array.isArray(data.detail)) {
        // FastAPI validation errors: [{ loc, msg }, ...]
        data.detail = data.detail
          .map(d => (d.loc ? `${d.loc[d.loc.length - 1]}: ` : '') + (d.msg || JSON.stringify(d)))
          .join(' ');
      } else if (!data.detail) {
        // Django REST Framework: { field: ["msg", ...] }; Express: { message } / { error }
        const messages = Object.entries(data).map(([field, value]) => {
          const text = Array.isArray(value) ? value.join(' ') : String(value);
          return ['non_field_errors', 'message', 'error'].includes(field)
            ? text
            : `${field.charAt(0).toUpperCase() + field.slice(1)}: ${text}`;
        });
        if (messages.length) data.detail = messages.join(' ');
      }
    }
    return Promise.reject(error);
  }
);


client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;