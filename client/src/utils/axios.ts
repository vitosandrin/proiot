import axios from "axios";

const APP_HOST = "http://localhost:8000";

export const api = axios.create({ baseURL: APP_HOST });
