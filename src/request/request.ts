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
    let token = localStorage.getItem('jwt');
    if (token) {
      if(isTokenExpired(token)) {
        localStorage.removeItem('jwt');
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

apiClient.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      console.error("API Error:", response);
    }
    if (response.data === 401 || response.data === 403) {
      localStorage.removeItem('jwt');
      console.error("Unauthorized access, jwt removed.");
      window.location.href = '/'; 
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('jwt');
      console.error("Unauthorized access, jwt removed.");
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
)

const isTokenExpired = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Math.floor(Date.now() / 1000); // 以秒為單位的當前時間
  return decoded.exp < currentTime;
};

const generateGuestToken = async () => {
  return await apiClient.post('/api/system/generateToken?account=GUEST', {
    account: 'GUEST'
  }).then(res => {
    localStorage.setItem('jwt', res.data);
    console.log('refresh token');
    return res.data;
  }).catch(err => {
    console.error(err);
  })
}

export default apiClient;
