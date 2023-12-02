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
  customGridLinePlugin
);

interface Props {
  first: { x: number; y: number }[];
  second: { x: number; y: number }[];
  firstTitle: string;
  secondTitle: string;
}

const props = defineProps<Props>();

const labels = ref(
  props.first.map((value) => Math.round(value.x * 1000) / 1000)
);

const dataset1 = ref({
  label: props.firstTitle,
  data: props.first.map((value) => value.y),
  pointRadius: 0,
  borderColor: "#36A2EB",
  backgroundColor: "#9BD0F5",
});

const dataset2 = ref({
  label: props.secondTitle,
  data: props.second.map((value) => value.y),
  pointRadius: 0,
  borderColor: "#e3d44f",
  backgroundColor: "#ccbf49",
});


watch(props, (newProps) => {
  dataset1.value.data = newProps.first.map((value) => value.y);
  dataset1.value.label = newProps.firstTitle
  dataset2.value.data = newProps.second.map((value) => value.y);
  dataset2.value.label = newProps.secondTitle
  chartData.value = {
    labels: labels.value,
    datasets: [dataset1.value, dataset2.value],
  };
});

const chartData = ref({
  labels: labels.value,
  datasets: [dataset1.value, dataset2.value],
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
      position: 'bottom'
    }
  }
});
</script>