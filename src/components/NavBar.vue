<script setup lang="ts">
</script>

<template lang="pug">
nav.navbar
  .container
    .brand
      router-link.brand-link(to="/")
        span.brand-text MyApp
    ul.nav-links
      li.nav-item
        router-link.nav-link(to="/") Home
      li.nav-item
        router-link.nav-link(to="/test") Compound Interest
      li.nav-item
        router-link.nav-link(to="/tax") Tax Calculator
</template>

<style lang="stylus" scoped>
.navbar
  background linear-gradient(135deg, #1e293b 0%, #0f172a 100%)
  padding 1rem 2rem
  box-shadow 0 2px 20px rgba(0, 0, 0, 0.1)
  position sticky
  top 0
  z-index 1000
  backdrop-filter blur(10px)

.container
  max-width 1200px
  margin 0 auto
  display flex
  align-items center
  justify-content space-between

.brand
  .brand-link
    text-decoration none
    display flex
    align-items center
    transition transform 0.3s ease

    &:hover
      transform scale(1.05)

  .brand-text
    font-size 1.5rem
    font-weight 700
    color white
    letter-spacing 0.5px

.nav-links
  display flex
  list-style none
  margin 0
  padding 0
  gap 0.5rem
  align-items center

.nav-item
  position relative

.nav-link
  color rgba(255, 255, 255, 0.9)
  text-decoration none
  padding 0.75rem 1.5rem
  border-radius 8px
  font-weight 500
  font-size 1rem
  transition all 0.3s ease
  position relative
  overflow hidden

  &:before
    content ''
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background rgba(255, 255, 255, 0.1)
    transform scaleX(0)
    transform-origin left
    transition transform 0.3s ease
    border-radius 8px

  &:hover
    color white
    transform translateY(-2px)

    &:before
      transform scaleX(1)

  &.router-link-active
    background rgba(255, 255, 255, 0.2)
    color white
    font-weight 600

@media (max-width: 768px)
  .navbar
    padding 0.75rem 1rem

  .container
    flex-direction column
    gap 1rem

  .nav-links
    width 100%
    justify-content center
    flex-wrap wrap

  .nav-link
    padding 0.5rem 1rem
    font-size 0.9rem
</style>