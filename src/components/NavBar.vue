<script setup lang="ts">
import { ref } from 'vue';
</script>

<template lang="pug">
nav
  .full-width
    li
      router-link(to="/") Home
    li
      router-link(to="test") Test Page
</template>

<style lang="stylus" scoped>
.full-width
  display flex
  width 100%
  justify-content space-between
</style>