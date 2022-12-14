import axios from "axios";

export const API = axios.create({
    // baseURL: "http://localhost:5000/landtick/",
    baseURL: "https://server-production-391f.up.railway.app/landtick"
});

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};