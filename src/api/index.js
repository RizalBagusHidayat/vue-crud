// import axios
import axios from "axios";

// Ambil token dari localStorage, Vuex, atau langsung hardcode untuk sementara
const token =
  localStorage.getItem("token") ||
  "737e2fad7efd0a99405eef4f3bbbbb499104c243ecfbd3aafc32d232cd95693e";

const Api = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    Authorization: `Bearer ${token}`, // Tambahkan Bearer Token di sini
  },
});

export default Api;
