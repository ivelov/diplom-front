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
  Tooltip,
} from "chart.js";
import { watch } from "vue";
import { format } from "date-fns";

ChartJS.register(
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface Props {
  data: { x: number; y: number }[];
}

const props = defineProps<Props>();

const labels = ref(props.data.map((value) => format(new Date(value.x), 'yyyy/MM/dd') ));

const dataset = ref({
  data: props.data.map((value) => Math.round(value.y / 1000000) / 1000),
  pointRadius: 0,
  borderColor: "#36A2EB",
  backgroundColor: "#9BD0F5",
});

watch(props, (newProps) => {
  dataset.value.data = newProps.data.map(
    (value) => Math.round(value.y / 1000000) / 1000
  );
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
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: true,
        callback: function (value: number) {
          return "$" + value + "B";
        },
      },
    },
  },
});
</script>

<style scoped></style>
