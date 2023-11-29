import { apiInstance } from "../axios";

const AssetsService = {
  getAssets() {
    return apiInstance
      .get("/assets")
      .then(({ data }) => data)
      .catch(() => console.log("Unauthenticated"));
  },
};

export default AssetsService;
