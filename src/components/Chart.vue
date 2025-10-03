<template lang="pug">
.canvas-wrap
  canvas(ref="canvasEl")
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

export default defineComponent({
  name: 'APRChart',
  props: {
    principal: { type: Number, default: 10000 },
    aprPercent: { type: Number, default: 5 },
    years: { type: Number, default: 10 },
    color: { type: String, default: '#00bcd4' },
  },
  setup(props) {
    const canvasEl = ref<HTMLCanvasElement | null>(null);
    let chart: ChartJS | null = null;

    const labels = computed(() => Array.from({ length: props.years + 1 }, (_, i) => `Year ${i}`));

    const balances = computed(() => {
      const r = props.aprPercent / 100;
      const balancesArr: number[] = [];
      for (let year = 0; year <= props.years; year++) {
        const value = props.principal * Math.pow(1 + r, year);
        balancesArr.push(parseFloat(value.toFixed(2)));
      }
      return balancesArr;
    });

    const config = computed(() => ({
      type: 'line' as const,
      data: {
        labels: labels.value,
        datasets: [
          {
            label: `${props.aprPercent}% APR — Compound annually`,
            data: balances.value,
            borderColor: props.color,
            backgroundColor: props.color + '33',
            pointRadius: 3,
            fill: true,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (ctx: any) => `Balance: $${ctx.parsed.y.toLocaleString()}`,
            },
          },
        },
        scales: {
          y: {
            title: { display: true, text: 'Balance ($)' },
            ticks: { callback: (v: any) => `$${Number(v).toLocaleString()}` },
            beginAtZero: false,
          },
          x: { title: { display: true, text: 'Year' } },
        },
      },
    }));

    const render = () => {
      if (!canvasEl.value) return;
      if (chart) {
        chart.destroy();
        chart = null;
      }
      chart = new ChartJS(canvasEl.value.getContext('2d')!, config.value as any);
    };

    onMounted(() => {
      render();
    });

    watch([() => props.principal, () => props.aprPercent, () => props.years], () => {
      render();
    });

    onBeforeUnmount(() => {
      if (chart) chart.destroy();
    });

    return { canvasEl };
  },
});
</script>

<style scoped>
.canvas-wrap {
  width: 100%;
  max-width: 900px;
  margin: 20px auto;
}
canvas { display: block; width: 100%; height: 380px; }
</style>
