<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue';

const income = ref(75000);
const filingStatus = ref('single');
const deductions = ref(13850);
const capitalGains = ref(0);
const dividends = ref(0);
const stateRate = ref(5);

// 2024 Federal Tax Brackets
const taxBrackets = {
  single: [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],
  married: [
    { limit: 23200, rate: 0.10 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],
  head: [
    { limit: 16550, rate: 0.10 },
    { limit: 63100, rate: 0.12 },
    { limit: 100500, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243700, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ]
};

const calculateFederalTax = (taxableIncome: number) => {
  const brackets = taxBrackets[filingStatus.value as keyof typeof taxBrackets];
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= previousLimit) break;

    const taxableInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
    tax += taxableInBracket * bracket.rate;
    previousLimit = bracket.limit;
  }

  return tax;
};

const taxableIncome = computed(() => Math.max(0, income.value - deductions.value));
const federalTax = computed(() => calculateFederalTax(taxableIncome.value));
const capitalGainsTax = computed(() => {
  // Simplified capital gains: 0% up to 44625 (single), 15% up to 492300, 20% above
  const threshold1 = filingStatus.value === 'single' ? 44625 : 89250;
  const threshold2 = filingStatus.value === 'single' ? 492300 : 553850;

  if (taxableIncome.value <= threshold1) return capitalGains.value * 0;
  if (taxableIncome.value <= threshold2) return capitalGains.value * 0.15;
  return capitalGains.value * 0.20;
});

const stateTax = computed(() => (income.value * stateRate.value) / 100);
const ficaTax = computed(() => {
  const socialSecurity = Math.min(income.value, 160200) * 0.062;
  const medicare = income.value * 0.0145;
  return socialSecurity + medicare;
});

const totalTax = computed(() => federalTax.value + capitalGainsTax.value + stateTax.value + ficaTax.value);
// @ts-ignore - used in template
const effectiveRate = computed(() => income.value > 0 ? (totalTax.value / income.value) * 100 : 0);
// @ts-ignore - used in template
const takeHome = computed(() => income.value - totalTax.value + dividends.value - capitalGains.value);
</script>

<template lang="pug">
.page-container
  .hero-section
    h1.page-title Tax Calculator
    p.page-subtitle Calculate your federal, state, and FICA taxes for 2024

  .content-wrapper
    .controls-card
      h2.card-title Income & Deductions

      .input-group
        label.input-label Annual Income
        .input-wrapper
          span.currency-symbol $
          input.input-field(
            type="number"
            v-model.number="income"
            min="0"
            step="1000"
          )

      .input-group
        label.input-label Filing Status
        select.input-field(v-model="filingStatus")
          option(value="single") Single
          option(value="married") Married Filing Jointly
          option(value="head") Head of Household

      .input-group
        label.input-label Standard Deduction
        .input-wrapper
          span.currency-symbol $
          input.input-field(
            type="number"
            v-model.number="deductions"
            min="0"
            step="100"
          )

      .input-group
        label.input-label Long-Term Capital Gains
        .input-wrapper
          span.currency-symbol $
          input.input-field(
            type="number"
            v-model.number="capitalGains"
            min="0"
            step="1000"
          )

      .input-group
        label.input-label Qualified Dividends
        .input-wrapper
          span.currency-symbol $
          input.input-field(
            type="number"
            v-model.number="dividends"
            min="0"
            step="100"
          )

      .input-group
        label.input-label State Tax Rate
        .input-wrapper
          input.input-field(
            type="number"
            v-model.number="stateRate"
            min="0"
            max="15"
            step="0.5"
          )
          span.percent-symbol %

    .results-card
      h2.card-title Tax Breakdown

      .tax-breakdown
        .breakdown-item
          .breakdown-label Gross Income
          .breakdown-value {{ '$' + income.toLocaleString() }}

        .breakdown-item
          .breakdown-label Standard Deduction
          .breakdown-value -{{ '$' + deductions.toLocaleString() }}

        .breakdown-item.highlight
          .breakdown-label Taxable Income
          .breakdown-value {{ '$' + taxableIncome.toLocaleString() }}

      .tax-details
        .tax-item
          .tax-label Federal Income Tax
          .tax-value {{ '$' + federalTax.toFixed(2).toLocaleString() }}

        .tax-item
          .tax-label Capital Gains Tax
          .tax-value {{ '$' + capitalGainsTax.toFixed(2).toLocaleString() }}

        .tax-item
          .tax-label State Tax
          .tax-value {{ '$' + stateTax.toFixed(2).toLocaleString() }}

        .tax-item
          .tax-label FICA Tax
          .tax-value {{ '$' + ficaTax.toFixed(2).toLocaleString() }}

      .total-summary
        .summary-row
          .summary-label Total Tax
          .summary-value {{ '$' + totalTax.toFixed(2).toLocaleString() }}

        .summary-row
          .summary-label Effective Tax Rate
          .summary-value {{ effectiveRate.toFixed(2) }}%

        .summary-row.highlight
          .summary-label Take Home Pay
          .summary-value {{ '$' + takeHome.toFixed(2).toLocaleString() }}
</template>

<style lang="stylus" scoped>
.page-container
  min-height calc(100vh - 80px)
  background linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
  padding 2rem 1rem

.hero-section
  text-align center
  margin-bottom 3rem
  animation fadeInDown 0.6s ease

.page-title
  font-size 2.5rem
  font-weight 700
  color #f1f5f9
  margin-bottom 0.5rem
  text-shadow 2px 2px 4px rgba(0, 0, 0, 0.3)

.page-subtitle
  font-size 1.125rem
  color #cbd5e1
  font-weight 400

.content-wrapper
  max-width 1200px
  margin 0 auto
  display grid
  grid-template-columns 1fr 1fr
  gap 2rem
  animation fadeInUp 0.6s ease

.controls-card,
.results-card
  background #1e293b
  border 1px solid #334155
  border-radius 16px
  padding 2rem
  box-shadow 0 10px 30px rgba(0, 0, 0, 0.3)
  transition transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease

  &:hover
    transform translateY(-4px)
    box-shadow 0 15px 40px rgba(0, 0, 0, 0.5)
    border-color #475569

.card-title
  font-size 1.5rem
  font-weight 600
  color #f1f5f9
  margin-bottom 2rem
  padding-bottom 1rem
  border-bottom 2px solid #334155

.input-group
  margin-bottom 1.5rem

.input-label
  display block
  font-size 0.875rem
  font-weight 600
  color #cbd5e1
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
  border 2px solid #334155
  border-radius 8px
  font-size 1rem
  transition all 0.3s ease
  background #0f172a
  color #f1f5f9

  &:focus
    outline none
    border-color #60a5fa
    background #1e293b
    box-shadow 0 0 0 4px rgba(96, 165, 250, 0.15)

  &::placeholder
    color #64748b

select.input-field
  cursor pointer

.currency-symbol,
.percent-symbol
  position absolute
  font-weight 600
  color #60a5fa
  font-size 1rem

.currency-symbol
  left 1rem

.input-wrapper:has(.currency-symbol) .input-field
  padding-left 2rem

.percent-symbol
  right 1rem

.input-wrapper:has(.percent-symbol) .input-field
  padding-right 3rem

.tax-breakdown
  background #0f172a
  border-radius 12px
  padding 1.5rem
  margin-bottom 2rem

.breakdown-item
  display flex
  justify-content space-between
  align-items center
  padding 0.75rem 0

  &:not(:last-child)
    border-bottom 1px solid #334155

  &.highlight
    margin-top 0.5rem
    padding-top 1rem
    border-top 2px solid #60a5fa

.breakdown-label
  font-size 0.875rem
  color #cbd5e1
  font-weight 500

.breakdown-value
  font-size 1.125rem
  font-weight 600
  color #f1f5f9

.breakdown-item.highlight .breakdown-value
  color #60a5fa
  font-size 1.25rem

.tax-details
  margin-bottom 2rem

.tax-item
  display flex
  justify-content space-between
  align-items center
  padding 0.875rem 1rem
  background #0f172a
  border-radius 8px
  margin-bottom 0.75rem
  transition all 0.3s ease

  &:hover
    background #1e293b
    transform translateX(4px)

.tax-label
  font-size 0.9375rem
  color #cbd5e1
  font-weight 500

.tax-value
  font-size 1.125rem
  font-weight 600
  color #f1f5f9

.total-summary
  background linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)
  border-radius 12px
  padding 1.5rem
  box-shadow 0 4px 20px rgba(59, 130, 246, 0.3)

.summary-row
  display flex
  justify-content space-between
  align-items center
  padding 0.75rem 0

  &:not(:last-child)
    border-bottom 1px solid rgba(255, 255, 255, 0.15)

  &.highlight
    padding-top 1rem
    margin-top 0.5rem
    border-top 2px solid rgba(255, 255, 255, 0.3)

.summary-label
  font-size 0.9375rem
  color rgba(255, 255, 255, 0.95)
  font-weight 500

.summary-value
  font-size 1.25rem
  font-weight 700
  color #ffffff

.summary-row.highlight .summary-value
  font-size 1.5rem
  color #fbbf24

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
  .results-card
    padding 1.5rem

  .summary-value
    font-size 1.125rem

  .summary-row.highlight .summary-value
    font-size 1.35rem
</style>
