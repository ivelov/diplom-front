<template>
  <StabilityComponent />
  <StabilityCalculatorComponent />
  <StabilityComparisonComponent />
  <p class="mt-8">
    See also: <RouterLink to="investment-tips">investment tips</RouterLink>
  </p>
</template>

<script lang="ts" setup>
import StabilityComponent from "@/components/StabilityComponent.vue";
import StabilityCalculatorComponent from "@/components/StabilityCalculatorComponent.vue";
import StabilityComparisonComponent from "@/components/StabilityComparisonComponent.vue";
</script>
