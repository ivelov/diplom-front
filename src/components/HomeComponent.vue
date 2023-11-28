<template>
  <v-container>
    <v-card class="px-3 py-4">
      <v-row>
        <v-col
          ><h1>Overview</h1>
          <h2 class="mt-2">Welcome to Stablecoins Dashboard!</h2>
          <p class="mt-4">
            On this site you can learn more about stablecoins and see visual
            statistics about them
          </p></v-col
        >
        <v-col
          class="d-flex align-items-end"
          ><v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            src="https://images.ctfassets.net/2chiqpnroeav/7IKDCk8NAIvjtslSj2dAGc/8b66308597dd46f839e7198fc7a3ad0b/article9867-stablecoins-the-race-for-the-future-of-money.jpg"
          ></v-img
        ></v-col>
      </v-row>
    </v-card>
    <v-row class="mt-2">
      <v-col>
        <v-card class="py-2 px-2">
          <h3>Learn more</h3>
          <v-list>
            <v-list-item
              prepend-icon="mdi-circle-small"
              link
              to="/what-is-cryptocurrency"
              title="What is cryptocurrency"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-circle-small"
              link
              to="/investment-mistakes"
              title="Basic investment mistakes"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-circle-small"
              link
              to="/investment-tips"
              title="Investment tips"
            ></v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="py-2 px-2">
          <h3>See the statistics</h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>
