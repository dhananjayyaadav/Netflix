import axios from "axios";

export const axiosInstance = axios.create({
  //production
  baseURL: "https://videoappbyankit.vercel.app/api/",
  //local devlopment
  // baseURL: "http://localhost:8080/api/",
});
