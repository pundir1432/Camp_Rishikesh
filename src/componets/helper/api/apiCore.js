import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "../../../config";

// Base URL for all requests
axios.defaults.baseURL = config.API_URL;

// Global Response Interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    let message;
    const status = error?.response?.status;

    if (status) {
      switch (status) {
        case 400:
          message = error.response.data || "Bad Request";
          break;
        case 401:
          message = error.response.data.message || "Invalid credentials";
          break;
        case 403:
          message = error.response.data.message || "Access Forbidden";
          break;
        case 404:
          message =
            error.response.data.message ||
            "Sorry! The data you are looking for could not be found";
          break;
        default:
          message = error.response?.data || error.message || "An error occurred";
      }
    } else {
      message = "Network error or server not responding.";
    }

    return Promise.reject(message);
  }
);

const AUTH_SESSION_KEY = "camp_booking";

// Set token in Axios default headers
const setAuthorization = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = token;
  else delete axios.defaults.headers.common["Authorization"];
};

// Get user session from localStorage
const getUserFromSession = () => {
  const raw = localStorage.getItem(AUTH_SESSION_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Invalid user data in session:", e);
    return null;
  }
};

class APICore {
  // Generic GET with query
  get = (url, params) => {
    const queryString = params
      ? "?" +
        Object.entries(params)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&")
      : "";
    return axios.get(`${url}${queryString}`);
  };

  // Download File (Blob)
  getFile = (url, params) => {
    const queryString = params
      ? "?" +
        Object.entries(params)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&")
      : "";
    return axios.get(`${url}${queryString}`, { responseType: "blob" });
  };

  // Multiple GET requests
  getMultiple = (urls, params) => {
    const queryString = params
      ? "?" +
        Object.entries(params)
          .map(([k, v]) => `${k}=${v}`)
          .join("&")
      : "";
    return axios.all(urls.map((url) => axios.get(`${url}${queryString}`)));
  };

  // POST
  create = (url, data) => axios.post(url, data);

  // PUT
  update = (url, data) => axios.put(url, data);

  // PATCH
  updatePatch = (url, data) => axios.patch(url, data);

  // DELETE
  delete = (url) => axios.delete(url);

  // POST with file upload
  createWithFile = (url, data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    return axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  // PATCH with file
  updateWithFile = (url, data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    return axios.patch(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  // Check user auth
  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();
    if (!user?.token) return false;

    try {
      const decoded = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem(AUTH_SESSION_KEY);
        localStorage.clear();
        window.location.href = "/camp/home";
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  setLoggedInUser = (session) => {
    if (session) {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      setAuthorization(session.token);
    } else {
      localStorage.removeItem(AUTH_SESSION_KEY);
      setAuthorization(null);
    }
  };

  getLoggedInUser = () => getUserFromSession();

  setUserInSession = (modifiedUser) => {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const updated = { token: parsed.token, ...parsed.user, ...modifiedUser };
      this.setLoggedInUser(updated);
    }
  };
}

// Set token if available on page load
const sessionUser = getUserFromSession();
if (sessionUser?.token) {
  setAuthorization(sessionUser.token);
}

export { APICore, setAuthorization, getUserFromSession };
