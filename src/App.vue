<template lang="pug">
  router-view
</template>

<style lang="stylus">
@import "./assets/vars.styl"
@import url('https://fonts.googleapis.com/css2?family=Asap+Condensed&display=swap')
html, body
  min-width: 100vw
  min-height: 100vh
  background: appBackground
  color: primaryText
*
  box-sizing border-box
  margin 0
#app
  height: 100%
  font-family 'Asap Condensed', sans-serif
</style>

<script setup lang="ts">
const time = new Date()
console.log('App '+ time)
</script>
