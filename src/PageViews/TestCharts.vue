<script setup lang="ts">
// @ts-ignore - Used in Pug template
import Chart from "../components/Chart.vue";
</script>

<template lang="pug">
.section
  h1 APR over 10 years (compound annually)
  p Example: $10,000 principal at 5% APR
  Chart(principal=10000 aprPercent=5 years=10)
</template>

<style scoped>

</style>
