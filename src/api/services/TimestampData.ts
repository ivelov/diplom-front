import { apiInstance } from "../axios";

const TimestampDataService = {
  getData() {
    return apiInstance
      .get("/timestamp-data")
      .then(({ data }) => data)
      .catch(() => console.log("Unauthenticated"));
  },
};

export default TimestampDataService;
