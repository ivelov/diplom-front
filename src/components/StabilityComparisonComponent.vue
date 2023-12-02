<template>
  <v-container>
    <h2 class="mb-4">Stability comparison</h2>
    <p class="mb-2">
      This chart allows you to see the difference between assets in terms of
      stability:
    </p>

    <v-card class="py-3 px-3">
      <v-row class="justify-content-between px-3 py-3">
        <h2 class="mb-2">Stability comparison chart</h2>
        <div style="width: 450px" class="mt-2 mr-2">
          <v-row class="justify-content-right">
            <div style="width: 100px" class="mr-2">
              <v-select
                v-model="selectedPeriod"
                :items="periods"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
            <div style="width: 100px" class="mr-2">
              <v-select
                v-model="selectedAssetId1"
                :items="assets"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
            <div style="width: 100px">
              <v-select
                v-model="selectedAssetId2"
                :items="assets"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
          </v-row>
        </div>
      </v-row>
      <StabilityComparisonChart
        v-if="
          stabilityChartData?.length > 0 &&
          selectedAssetIndex1 !== -1 &&
          selectedAssetIndex2 !== -1
        "
        :first="
          stabilityChartData[selectedAssetIndex1].periods[selectedPeriod].data
        "
        :first-title="stabilityChartData[selectedAssetIndex1].id"
        :second="
          stabilityChartData[selectedAssetIndex2].periods[selectedPeriod].data
        "
        :second-title="stabilityChartData[selectedAssetIndex2].id"
      ></StabilityComparisonChart>
    </v-card>
    <p class="my-8">
      See also: <RouterLink to="investment-tips">investment tips</RouterLink>
    </p>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import StabilityComparisonChart from "./charts/StabilityComparisonChart.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { ref } from "vue";
import { computed } from "vue";

const store = useAppStore();

const { stabilityChartData } = storeToRefs(store);

const selectedAssetId1 = ref<string>();
const selectedAssetId2 = ref<string>();

const periods = ref([
  { value: "all", title: "all time" },
  { value: "years1", title: "1 year" },
  { value: "years2", title: "2 years" },
]);
const selectedPeriod = ref<string>("all");

const assets = computed(() => {
  return stabilityChartData.value.map((val) => val.id);
});

const selectedAssetIndex1 = computed(() => {
  if (!selectedAssetId1.value) {
    return -1;
  }
  return stabilityChartData.value.findIndex(
    (asset) => asset.id === selectedAssetId1.value
  );
});
const selectedAssetIndex2 = computed(() => {
  if (!selectedAssetId2.value) {
    return -1;
  }
  return stabilityChartData.value.findIndex(
    (asset) => asset.id === selectedAssetId2.value
  );
});

onMounted(() => {
  store.getStabilityChartData().then(() => {
    selectedAssetId1.value = stabilityChartData.value[0].id;
    selectedAssetId2.value = stabilityChartData.value[1].id;
  });
});
</script>
