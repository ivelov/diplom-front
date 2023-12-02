<template>
  <v-container>
    <h1 class="mb-4 text-center">Supply charts</h1>
    <p>
      In this section you can see statistics regarding asset supply and
      transactions.
    </p>
    <p class="mb-2">In the first chart you can see the supply of a coin:</p>

    <v-card class="py-3 px-3">
      <v-row class="justify-content-between px-3 py-3">
        <h2 class="mb-2">Supply chart</h2>
        <div style="width: 450px" class="mt-2 mr-2">
          <v-row class="justify-content-right">
            <div style="width: 130px">
              <v-select
                v-model="selectedAssetId"
                :items="assets"
                variant="outlined"
                density="compact"
                item-value="id"
              ></v-select>
            </div>
          </v-row>
        </div>
      </v-row>
      <SupplyChart
        v-if="timestampData?.length > 0 && selectedAssetId"
        :asset="selectedAssetId"
        :data="assetData"
      ></SupplyChart>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import SupplyChart from "./charts/SupplyChart.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { ref } from "vue";
import { computed } from "vue";

const store = useAppStore();

const { timestampData, assets } = storeToRefs(store);

const selectedAssetId = ref<string>();

const assetData = computed(() => {
  const assetId = selectedAssetId.value;
  if (!assetId) {
    return [];
  }
  return timestampData.value.map((value) => ({
    y: value.assets[assetId].SplyAct1yr,
    x: value.timestamp,
  }));
});

onMounted(() => {
  store.getTimestampData();
  store.getAssets().then(() => {
    selectedAssetId.value = assets.value[0].id;
  });
});
</script>
