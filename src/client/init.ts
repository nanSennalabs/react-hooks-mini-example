import axios from "axios";
import { QueryCache, QueryClient } from "react-query";
import { Client } from "./Client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
const queryCache = new QueryCache();
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const client = new Client(axiosInstance);

export { queryClient, queryCache, client };
