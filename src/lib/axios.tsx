// src/utils/axios.jsx
import axios from "axios";

const token = localStorage.getItem("token"); // or dynamically set in each request

const api = axios.create({
    baseURL: "https://api-sms.slarenasitsolutions.com/public/api",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export default api;