import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '../interfaces/interface';
const { VITE_APP_API_BASE_URL } = import.meta.env;

const apiClient = axios.create({
  baseURL: VITE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("jwt");
    if (token) {
      if(isTokenExpired(token)) {
        token = await generateGuestToken();
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const isTokenExpired = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Math.floor(Date.now() / 1000); // 以秒為單位的當前時間
  return decoded.exp < currentTime;
};

const generateGuestToken = async () => {
  return await apiClient.get('/api/system/generateToken?account=GUEST').then(res => {
    localStorage.setItem('jwt', res.data);
    return res.data;
  }).catch(err => {
    console.error(err);
  })
}

export default apiClient;
