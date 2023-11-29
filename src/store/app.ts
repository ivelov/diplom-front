import AssetsService from "@/api/services/Assets";
import StabilityService, { StabilityCalculatorParams } from "@/api/services/Stability";
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

export interface StabilityCalculatorData {
  instances: number;
  overallTime: number;
  maxContinuousTime: number;
  medianContinuousTime: number;
}

export const useAppStore = defineStore("app", () => {
  const assets = ref<{id: string; title: string}[]>([]);
  const stabilityChartData = ref<StabilityChartData[]>([]);
  const stabilityCalculatorData = ref<StabilityCalculatorData>({
    instances: 0,
    maxContinuousTime: 0,
    overallTime: 0,
    medianContinuousTime: 0,
  });

  const getAssets = async () => {
    const data = await AssetsService.getAssets();
    assets.value = data;
    return data;
  };

  const getStabilityChartData = async () => {
    const data = await StabilityService.getStabilityChartData();
    stabilityChartData.value = data;
    return data;
  };

  const getStabilityCalculatorData = async (params: StabilityCalculatorParams) => {
    const data = await StabilityService.getStabilityCalculatorData(params);
    stabilityCalculatorData.value = data;
    return data;
  };

  return {
    assets,
    stabilityChartData,
    stabilityCalculatorData,
    getStabilityChartData,
    getStabilityCalculatorData,
    getAssets,
  };
});
