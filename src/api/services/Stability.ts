import { apiInstance } from "../axios";

export interface StabilityCalculatorParams {
  asset: string;
  condition: string;
  percentage: string;
  period: string;
}

const StabilityService = {
  getStabilityChartData() {
    return apiInstance
      .get("/stability/chart")
      .then(({ data }) => data)
      .catch(() => console.log("Unauthenticated"));
  },
  getStabilityCalculatorData(params: StabilityCalculatorParams) {
    return apiInstance
      .get("/stability/calculator", { params })
      .then(({ data }) => data.data)
      .catch(() => console.log("Unauthenticated"));
  },
};

export default StabilityService;
