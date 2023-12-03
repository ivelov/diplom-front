<template>
  <v-container>
    <h1 class="mb-4 text-center">Supply charts</h1>
    <p>
      In this section you can see statistics regarding asset supply and
      transactions.
    </p>

    <h2 class="mb-4 mt-6">Capitalisation chart</h2>
    <p class="mb-2">
      In the first chart you can see the sum USD value of all active native
      units in the last year for every coin:
    </p>

    <v-card class="py-3 px-3">
      <SupplyChart
        v-if="timestampData?.length > 0 && assets.length > 0"
        :data="timestampData"
        :assets="assets"
        property="CapAct1yrUSD"
        divide
      ></SupplyChart>
    </v-card>

    <h2 class="mb-4 mt-8">Transactions chart</h2>
    <p class="mb-2">
      In the second chart you can see the sum count of transfers that interval.
      Transfers represent movements of native units from one ledger entity to
      another distinct ledger entity. Only transfers that are the result of a
      transaction and that have a positive (non-zero) value are counted.
    </p>

    <v-card class="py-3 px-3">
      <SupplyChart
        v-if="timestampData?.length > 0 && assets.length > 0"
        :data="timestampData"
        :assets="assets"
        property="TxTfrCnt"
        :divide="false"
      ></SupplyChart>
    </v-card>

    <p class="my-8">
      See also: <RouterLink to="stability">stability statistics</RouterLink>
    </p>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import SupplyChart from "./charts/SupplyChart.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useAppStore();
const { timestampData, assets } = storeToRefs(store);

onMounted(() => {
  store.getTimestampData();
  store.getAssets();
});
</script>
