const token = localStorage.getItem("token");
const API_URL_BASE = "http://localhost:5000/api";

async function fetchAPI(endpoint, options = {}) {
    options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    const res = await fetch(`${API_URL_BASE}/${endpoint}`, options);
    return res.json();
}