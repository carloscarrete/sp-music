import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const {VITE_API_URL} = getEnv();
console.log(VITE_API_URL)
const webPlayerApi = axios.create({
    baseURL: VITE_API_URL,
})

webPlayerApi.interceptors.request.use((config)=> {
    const token = localStorage.getItem('token');
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})

export default webPlayerApi;