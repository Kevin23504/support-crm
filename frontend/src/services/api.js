import axios from "axios";

const API = axios.create({
  baseURL: "https://support-crm-r1z2.onrender.com/api",
});

export default API;