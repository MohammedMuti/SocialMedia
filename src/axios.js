import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-media-5mcf.onrender.com/api",
});

// https://social-media-5mcf.onrender.com

export const PF = "https://social-media-5mcf.onrender.com/Profiles/";

export default instance;
