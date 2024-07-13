import axios from "axios";
import { ActiveRoute, MetricData } from "./types";

export const getActiveRoutes = async (): Promise<ActiveRoute[]> => {
  try {
    const res = await axios.get(
      "https://6690ce72c0a7969efd9d9935.mockapi.io/api/active/"
    );
    return res.data;
  } catch (error) {
    return [];
  }
};

export const getMetrics = async (): Promise<MetricData[]> => {
  try {
    const res = await axios.get(
      "https://6690ce72c0a7969efd9d9935.mockapi.io/api/metrics"
    );
    return res.data;
  } catch (error) {
    return [];
  }
};
