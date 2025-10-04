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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
            labels: {
              font: { size: 14, weight: '600' },
              padding: 20,
              color: '#2c3e50',
            }
          },
          tooltip: {
            backgroundColor: 'rgba(44, 62, 80, 0.95)',
            padding: 12,
            titleFont: { size: 14, weight: '600' },
            bodyFont: { size: 13 },
            borderColor: '#667eea',
            borderWidth: 2,
            callbacks: {
              label: (ctx: any) => `Balance: $${ctx.parsed.y.toLocaleString()}`,
            },
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Balance ($)',
              font: { size: 13, weight: '600' },
              color: '#5a6c7d',
            },
            ticks: {
              callback: (v: any) => `$${Number(v).toLocaleString()}`,
              font: { size: 12 },
              color: '#5a6c7d',
            },
            beginAtZero: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawTicks: false,
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year',
              font: { size: 13, weight: '600' },
              color: '#5a6c7d',
            },
            ticks: {
              font: { size: 12 },
              color: '#5a6c7d',
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawTicks: false,
            }
          },
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
  height: 450px;
  position: relative;
}
canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
