import axios from "axios";

const API = axios.create({
  baseURL: "https://support-crm-1-pjhp.onrender.com/api",
});

export default API;