import axios from "axios";
import { config } from "./config";
import { toast } from "react-hot-toast";

export const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });
