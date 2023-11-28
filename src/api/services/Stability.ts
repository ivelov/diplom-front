import { apiInstance } from "../axios";

const StabilityService = {
  getStabilityChartData() {
    return apiInstance
      .get("/stability")
      .then(({ data }) => data)
      .catch(() => console.log("Unauthenticated"));
  },
};

export default StabilityService;
