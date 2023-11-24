<template>
  <v-app class="app">
    <default-bar />

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
</script>

<style scoped>
.app {
  background-color: #f7f8fa;
}
</style>