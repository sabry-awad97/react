import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID xncGhnrHHjSNKw1RUc7s-FzOAL17kY_XPyZtAI_ZEO8",
  },
});
