<script setup lang="ts">
import { ref } from 'vue';
// @ts-ignore - Used in Pug template
import Chart from "../components/Chart.vue";

const principal = ref(10000);
const aprPercent = ref(5);
const years = ref(10);

const finalBalance = ref(0);
const totalInterest = ref(0);

const calculateResults = () => {
  const balance = principal.value * Math.pow(1 + aprPercent.value / 100, years.value);
  finalBalance.value = Math.round(balance * 100) / 100;
  totalInterest.value = Math.round((balance - principal.value) * 100) / 100;
};

calculateResults();
</script>

<template lang="pug">
.page-container
  .hero-section
    h1.page-title Compound Interest Calculator
    p.page-subtitle Visualize how your money grows over time with compound interest

  .content-wrapper
    .controls-card
      h2.card-title Investment Parameters

      .input-group
        label.input-label Principal Amount
        .input-wrapper
          span.currency-symbol $
          input.input-field(
            type="number"
            v-model.number="principal"
            @input="calculateResults"
            min="0"
            step="1000"
          )

      .input-group
        label.input-label Annual Interest Rate
        .input-wrapper
          input.input-field(
            type="number"
            v-model.number="aprPercent"
            @input="calculateResults"
            min="0"
            max="100"
            step="0.1"
          )
          span.percent-symbol %

      .input-group
        label.input-label Investment Period
        .input-wrapper
          input.input-field(
            type="number"
            v-model.number="years"
            @input="calculateResults"
            min="1"
            max="50"
          )
          span.years-symbol years

      .results-summary
        .result-item
          .result-label Final Balance
          .result-value {{ '$' + finalBalance.toLocaleString() }}
        .result-item.highlight
          .result-label Total Interest Earned
          .result-value {{ '$' + totalInterest.toLocaleString() }}

    .chart-card
      Chart(
        :principal="principal"
        :aprPercent="aprPercent"
        :years="years"
        color="#667eea"
      )
</template>

<style lang="stylus" scoped>
.page-container
  min-height calc(100vh - 80px)
  background linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)
  padding 2rem 1rem

.hero-section
  text-align center
  margin-bottom 3rem
  animation fadeInDown 0.6s ease

.page-title
  font-size 2.5rem
  font-weight 700
  color #2c3e50
  margin-bottom 0.5rem
  text-shadow 2px 2px 4px rgba(0, 0, 0, 0.1)

.page-subtitle
  font-size 1.125rem
  color #5a6c7d
  font-weight 400

.content-wrapper
  max-width 1200px
  margin 0 auto
  display grid
  grid-template-columns 1fr 2fr
  gap 2rem
  animation fadeInUp 0.6s ease

.controls-card,
.chart-card
  background white
  border-radius 16px
  padding 2rem
  box-shadow 0 10px 30px rgba(0, 0, 0, 0.1)
  transition transform 0.3s ease, box-shadow 0.3s ease

  &:hover
    transform translateY(-4px)
    box-shadow 0 15px 40px rgba(0, 0, 0, 0.15)

.card-title
  font-size 1.5rem
  font-weight 600
  color #2c3e50
  margin-bottom 2rem
  padding-bottom 1rem
  border-bottom 2px solid #e8ecf1

.input-group
  margin-bottom 1.5rem

.input-label
  display block
  font-size 0.875rem
  font-weight 600
  color #5a6c7d
  margin-bottom 0.5rem
  text-transform uppercase
  letter-spacing 0.5px

.input-wrapper
  position relative
  display flex
  align-items center

.input-field
  width 100%
  padding 0.75rem 1rem
  border 2px solid #e8ecf1
  border-radius 8px
  font-size 1rem
  transition all 0.3s ease
  background #f8f9fa

  &:focus
    outline none
    border-color #667eea
    background white
    box-shadow 0 0 0 4px rgba(102, 126, 234, 0.1)

.currency-symbol,
.percent-symbol,
.years-symbol
  position absolute
  font-weight 600
  color #667eea
  font-size 1rem

.currency-symbol
  left 1rem

.input-wrapper:has(.currency-symbol) .input-field
  padding-left 2rem

.percent-symbol,
.years-symbol
  right 1rem

.input-wrapper:has(.percent-symbol) .input-field,
.input-wrapper:has(.years-symbol) .input-field
  padding-right 3rem

.results-summary
  margin-top 2rem
  padding 1.5rem
  background linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  border-radius 12px

.result-item
  display flex
  justify-content space-between
  align-items center
  padding 0.75rem 0

  &:not(:last-child)
    border-bottom 1px solid rgba(255, 255, 255, 0.2)

  &.highlight
    padding-top 1rem

.result-label
  font-size 0.875rem
  color rgba(255, 255, 255, 0.9)
  font-weight 500

.result-value
  font-size 1.5rem
  font-weight 700
  color white

.result-item.highlight .result-value
  font-size 1.75rem
  color #ffd700

@keyframes fadeInDown
  from
    opacity 0
    transform translateY(-20px)
  to
    opacity 1
    transform translateY(0)

@keyframes fadeInUp
  from
    opacity 0
    transform translateY(20px)
  to
    opacity 1
    transform translateY(0)

@media (max-width: 968px)
  .content-wrapper
    grid-template-columns 1fr

  .page-title
    font-size 2rem

  .page-subtitle
    font-size 1rem

@media (max-width: 640px)
  .page-container
    padding 1rem 0.5rem

  .page-title
    font-size 1.75rem

  .controls-card,
  .chart-card
    padding 1.5rem

  .result-value
    font-size 1.25rem

  .result-item.highlight .result-value
    font-size 1.5rem
</style>
