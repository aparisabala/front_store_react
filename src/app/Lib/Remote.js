import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 10000,
});
function handleError(err) {
  let status = 500;
  let message = "Unknown error";

  if (err.response) {
    status = err.response.status;
    message = err.response.data?.message || err.response.statusText || "Server Error";
  } else if (err.request) {
    message = "No response from server";
  } else {
    message = err.message;
  }
  return { data: null, status, error: message };
}
export const Remote = {
  async get(endpoint, params = {}) {
    try {
      const response = await api.get(endpoint, { params });
      return { data: response.data, status: response.status, error: null };
    } catch (err) {
      return handleError(err);
    }
  },
  async post(endpoint, payload = {}) {
    try {
      const response = await api.post(endpoint, payload);
      return { data: response.data, status: response.status, error: null };
    } catch (err) {
      return handleError(err);
    }
  },
  async put(endpoint, payload = {}) {
    try {
      const response = await api.put(endpoint, payload);
      return { data: response.data, status: response.status, error: null };
    } catch (err) {
      return handleError(err);
    }
  },
  async delete(endpoint, params = {}) {
    try {
      const response = await api.delete(endpoint, { params });
      return { data: response.data, status: response.status, error: null };
    } catch (err) {
      return handleError(err);
    }
  },
};
