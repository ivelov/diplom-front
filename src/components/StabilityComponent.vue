<template>
  <v-container>
    <h1 class="mb-4 text-center">Stability charts</h1>
    <p>In this section you can see statistics regarding asset stability.</p>
    <p class="mb-2">In the first chart you can see the cost stability:</p>

    <v-card class="py-3 px-3">
      <v-row class="justify-content-between px-3 py-3">
        <h2 class="mb-2">Stability chart</h2>
        <div style="width: 450px" class="mt-2 mr-2">
          <v-row class="justify-content-right">
            <div style="width: 130px" class="mr-2">
              <v-select
                v-model="selectedPeriod"
                :items="periods"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
            <div style="width: 130px">
              <v-select
                v-model="selectedAssetId"
                :items="assets"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
          </v-row>
        </div>
      </v-row>
      <StabilityChart
        v-if="stabilityChartData?.length > 0 && selectedAssetIndex !== -1"
        :asset="selectedAssetId"
        :data="
          stabilityChartData[selectedAssetIndex].periods[selectedPeriod].data
        "
        :average="
          stabilityChartData[selectedAssetIndex].periods[selectedPeriod].cost
        "
        :deviation="
          stabilityChartData[selectedAssetIndex].periods[selectedPeriod]
            .standardDeviation
        "
      ></StabilityChart>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import StabilityChart from "./charts/StabilityChart.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { ref } from "vue";
import { computed } from "vue";

const store = useAppStore();

const { stabilityChartData } = storeToRefs(store);

const selectedAssetId = ref<string>();

const periods = ref([
  { value: "all", title: "all time" },
  { value: "years1", title: "1 year" },
  { value: "years2", title: "2 years" },
]);
const selectedPeriod = ref<string>("all");

const assets = computed(() => {
  return stabilityChartData.value.map((val) => ({
    value: val.id,
    title: val.title,
  }));
});

const selectedAssetIndex = computed(() => {
  if (!selectedAssetId.value) {
    return -1;
  }
  return stabilityChartData.value.findIndex(
    (asset) => asset.id === selectedAssetId.value
  );
});

onMounted(() => {
  store.getStabilityChartData().then(() => {
    selectedAssetId.value = stabilityChartData.value[0].id;
  });
});
</script>
