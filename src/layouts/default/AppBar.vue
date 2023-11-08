<template>
  <v-app-bar>
    <v-app-bar-title>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      Stablecoins Dashboard
    </v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list v-model:opened="open">
      <v-list-item prepend-icon="mdi-apps" link title="Overview" to="/"></v-list-item>
      <v-list-group value="Theory">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-book-open-page-variant-outline"
            title="Theory"
          ></v-list-item>
        </template>
        <v-list-item link title="List Item 1"></v-list-item>
        <v-list-item link title="List Item 2"></v-list-item>
        <v-list-item link title="List Item 3"></v-list-item>
      </v-list-group>
      <v-list-group value="Statistics">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-chart-bell-curve"
            title="Statistics"
          ></v-list-item>
        </template>
        <v-list-item link title="List Item 1"></v-list-item>
        <v-list-item link title="List Item 2"></v-list-item>
        <v-list-item link title="List Item 3"></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let drawer = ref(false);
let open = ref(['Statistics', 'Theory']);
</script>
