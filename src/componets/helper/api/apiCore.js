import { jwtDecode } from "jwt-decode";
import axios from "axios";
import config from "../../config";

// axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = config.API_URL;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message;
    if (error && error.response && error.response.status === 404) {
      message = error.response.data.message;
      return Promise.reject(error.response.data.message);
    } else if (error && error.response && error.response.status === 403) {
      return Promise.reject(error.response.data.message);
    } else {
      switch (error.response.status) {
        case 400:
          message = error.response.data || "Error";
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
            "Sorry! the data you are looking for could not be found";
          break;
        default: {
          message =
            error.response && error.response.data
              ? error.response.data
              : error || error;
        }
      }
      return Promise.reject(message);
    }
  }
);

const AUTH_SESSION_KEY = "camp_booking";

/**
* Sets the default authorization
* @param {*} token
*/
const setAuthorization = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = token;
  else delete axios.defaults.headers.common["Authorization"];
};
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
  /**
   * Fetches data from given url
   */
  get = (url, params) => {
    let queryString = "";
    if (params) {
      queryString = Object.keys(params)
        .map((key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        )
        .join("&");
    }
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    return axios.get(fullUrl);
  };
  getFile = (url, params) => {
    let response;
    if (params) {
      var queryString = params
        ? Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, { responseType: "blob" });
    } else {
      response = axios.get(`${url}`, { responseType: "blob" });
    }
    return response;
  };
  getMultiple = (urls, params) => {
    const reqs = [];
    let queryString = "";
    if (params) {
      queryString = params
        ? Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&")
        : "";
    }
    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };

  /**
   * Updates patch data
   */
  updatePatch = (url, data) => {
    return axios.patch(url, data);
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url) => {
    return axios.delete(url);
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url, data) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }
    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };
  /**
   * post given data to url with file
   */
  updateWithFile = (url, data) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }
    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config);
  };
  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();
    if (!user || (user && !user.token)) {
      return false;
    }
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      localStorage.clear();
      window.location.href = "/camp/home";
      return false;
    } else {
      return true;
    }
  };
  setLoggedInUser = (session) => {
    if (session)
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    else {
      localStorage.removeItem(AUTH_SESSION_KEY);
    }
  };
  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    return getUserFromSession();
  };
  setUserInSession = (modifiedUser) => {
    let userInfo = localStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const { token, user } = JSON.parse(userInfo);
      this.setLoggedInUser({ token, ...user, ...modifiedUser });
    }
  };
}

/*
Check if token available in session
*/
let user = getUserFromSession();
if (user) {
  const { token } = user;
  if (token) {
    setAuthorization(token);
  }
}
export { APICore, setAuthorization, getUserFromSession };