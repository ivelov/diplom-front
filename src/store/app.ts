// Utilities
import StabilityService from "@/api/services/Stability";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface StabilityChartData {
  id: string;
  periods: PeriodsData;
}

export interface PeriodsData {
  [period: string]: {
    data: { x: number; y: number }[];
    standardDeviation: number;
    cost: number;
  };
}

export const useAppStore = defineStore("app", () => {
  const stabilityChartData = ref<StabilityChartData[]>([]);

  const getStabilityChartData = async () => {
    const data = await StabilityService.getStabilityChartData();
    stabilityChartData.value = data;

    return data;
  };

  return {
    stabilityChartData,
    getStabilityChartData,
  };
});
