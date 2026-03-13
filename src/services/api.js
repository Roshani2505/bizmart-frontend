import axios from "axios";

const API = axios.create({
  baseURL: "https://bizmart-backend-evp2.onrender.com/api"
});

export default API;