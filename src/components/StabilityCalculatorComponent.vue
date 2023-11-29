<template>
  <v-container>
    <h2 class="mb-2">Stability calculator</h2>
    <p class="mb-2">
      This stability calculator shows the total number of days an asset's value
      has been above/below a specified limit.
    </p>
    <v-card class="py-5 px-3">
      <v-row class="justify-content-between px-3 py-3 align-items-center">
        <div style="width: 200px">
          <v-select
            v-model="selectedAssetId"
            :items="assets"
            variant="outlined"
            density="compact"
            label="Asset"
            hide-details
          ></v-select>
        </div>
        <div style="width: 200px" class="mr-2">
          <v-select
            v-model="selectedPeriod"
            :items="periods"
            variant="outlined"
            density="compact"
            label="Period"
            hide-details
          ></v-select>
        </div>
        <div style="width: 200px">
          <v-select
            v-model="selectedCondition"
            :items="conditions"
            variant="outlined"
            density="compact"
            label="Above/below"
            hide-details
          ></v-select>
        </div>
        <div style="width: 100px">
          <v-select
            v-model="selectedPercentage"
            :items="percentages"
            variant="outlined"
            density="compact"
            label="Percentage"
            hide-details
          ></v-select>
        </div>
        <v-btn color="green" @click="getData" :loading="loading">Calculate</v-btn>
      </v-row>
      <v-row class="px-3 py-3 justify-content-around">
        <v-card class="px-3 py-3"
          >Instances: {{ stabilityCalculatorData.instances }}</v-card
        >
        <v-card class="px-3 py-3"
          >Total time: {{ stabilityCalculatorData.overallTime }} days</v-card
        >
        <v-card class="px-3 py-3"
          >Max continuous time:
          {{ stabilityCalculatorData.maxContinuousTime }} days</v-card
        >
        <v-card class="px-3 py-3"
          >Median continuous time:
          {{ stabilityCalculatorData.medianContinuousTime }} days</v-card
        >
      </v-row>
    </v-card>
    <p class="mt-8">
      See also: <RouterLink to="investment-tips">investment tips</RouterLink>
    </p>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { ref } from "vue";

const loading = ref(false);

const store = useAppStore();

const { stabilityCalculatorData, assets } = storeToRefs(store);

const selectedAssetId = ref<string>("usdt");

const periods = ref([
  { value: "all", title: "all time" },
  { value: "1 year", title: "1 year" },
  { value: "2 years", title: "2 years" },
]);
const selectedPeriod = ref<string>("all");

const conditions = ref([
  { value: "around", title: "Around" },
  { value: "above", title: "Above" },
  { value: "below", title: "Below" },
]);
const selectedCondition = ref<string>("around");

const percentages = ref([
  { value: "0.5", title: "0.5%" },
  { value: "1", title: "1%" },
  { value: "2", title: "2%" },
  { value: "5", title: "5%" },
]);
const selectedPercentage = ref<string>("0.5");

function getData() {
  loading.value = true
  store.getStabilityCalculatorData({
    asset: selectedAssetId.value,
    condition: selectedCondition.value,
    percentage: selectedPercentage.value,
    period: selectedPeriod.value,
  }).then(()=>{
    loading.value = false
  })
}

onMounted(() => {
  store.getAssets().then(() => {
    selectedAssetId.value = assets.value[0].id;
    getData();
  });
});
</script>
