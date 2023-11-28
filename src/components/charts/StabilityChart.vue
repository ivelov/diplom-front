<template>
  <Line id="chart" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";
import { watch } from "vue";

const customGridLinePlugin = {
  id: "customLine",
  beforeDraw(chart: any) {
    const ctx = chart.ctx;
    const y = chart.chartArea.bottom;

    const linePosition = (chart.chartArea.right + chart.chartArea.left) / 2;

    ctx.save();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(linePosition, y);
    ctx.lineTo(linePosition, 0);
    ctx.stroke();

    ctx.restore();
  },
};

ChartJS.register(
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  customGridLinePlugin
);

interface Props {
  data: { x: number; y: number }[];
  average: number;
  deviation: number;
}

const props = defineProps<Props>();

const labels = ref(
  props.data.map((value) => Math.round(value.x * 1000) / 1000)
);
// const labels = ref(
//   props.data.map((value) => {
//     switch (value.x) {
//       case 0.995:
//         return "0.995";
//       case 0.9999902:
//         return "1";
//       case 1.005:
//         return "1.005";

//       default:
//         return '';
//     }
//   })
// );

const dataset = ref({
  label: `Average cost: ${props.average}; Standard deviation: ${props.deviation}`,
  data: props.data.map((value) => value.y),
  pointRadius: 0,
  borderColor: "#36A2EB",
  backgroundColor: "#9BD0F5",
});

watch(props, (newProps) => {
  dataset.value = {
    label: `Average cost: ${newProps.average}; Standard deviation: ${newProps.deviation}`,
    data: newProps.data.map((value) => value.y),
    pointRadius: 0,
    borderColor: "#36A2EB",
    backgroundColor: "#9BD0F5",
  };
  chartData.value = {
    labels: labels.value,
    datasets: [dataset.value],
  };
});

const chartData = ref({
  labels: labels.value,
  datasets: [dataset.value],
});
const chartOptions = ref({
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 10.1,
        beginAtZero: true,
      },
    },
    y: {
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "chartArea",
      display: true,
      labels: {
        usePointStyle: false,
        boxWidth: 0,
        font: {
          size: 16,
        },
      },
    },
  },
});
</script>

<style scoped></style>
