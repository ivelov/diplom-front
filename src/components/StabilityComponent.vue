<template>
  <v-container>
    <h1 class="mb-4 text-center">Stability charts</h1>

    <v-card class="py-3 px-3">
      <v-row class="justify-content-between px-3 py-3">
        <h2 class="mb-2">Stability chart</h2>
        <div style="width: 200px">
          <v-select v-model="selectedAssetId" :items="assets" variant="outlined" density="compact"></v-select>
        </div>
      </v-row>
      <StabilityChart
        v-if="stabilityChartData?.length > 0 && selectedAssetIndex !== -1"
        :asset="selectedAssetId"
        :data="stabilityChartData[selectedAssetIndex].periods.all.data"
        :average="stabilityChartData[selectedAssetIndex].periods.all.cost"
        :deviation="
          stabilityChartData[selectedAssetIndex].periods.all.standardDeviation
        "
      ></StabilityChart>
    </v-card>
    <p class="mt-8">
      See also: <RouterLink to="investment-tips">investment tips</RouterLink>
    </p>
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

const assets = computed(() => {
  return stabilityChartData.value.map((val) => val.id);
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