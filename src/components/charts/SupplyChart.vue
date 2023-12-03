<template>
  <Line id="chart" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
import { TimestampData } from "@/store/app";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Props {
  data: TimestampData[];
  assets: { id: string; title: string }[];
  property:
    | "CapAct1yrUSD"
    | "PriceUSD"
    | "SplyAct1yr"
    | "TxTfrCnt"
    | "TxTfrValAdjUSD"
    | "VelCur1yr";
  divide: boolean;
}
const props = defineProps<Props>();

const labels = ref(
  props.data.map((value) => format(new Date(value.timestamp), "yyyy/MM/dd"))
);

interface Dataset {
  pointRadius: number;
  borderColor?: string;
  backgroundColor?: string;
  label?: string;
  data: number[];
}

function getDatasets() {
  const datasets: Dataset[] = [];
  if (props.data.length === 0) {
    return [];
  }
  const colors = [
    "#D32F2F",
    "#3949AB",
    "#039BE5",
    "#00897B",
    "#43A047",
    "#C0CA33",
    "#FFA000",
    "#6D4C41",
  ];
  for (let i = 0; i < Object.keys(props.data[0].assets).length; i++) {
    datasets.push({
      pointRadius: 0,
      borderColor: colors[i],
      backgroundColor: colors[i],
      label: props.assets.find(
        (value) => value.id === Object.keys(props.data[0].assets)[i]
      )?.title,
      data: [],
    });
  }
  for (const timestamp of props.data) {
    const assetIds = Object.keys(timestamp.assets);
    for (let i = 0; i < assetIds.length; i++) {
      if (props.divide) {
        datasets[i].data.push(
          Math.round(timestamp.assets[assetIds[i]][props.property] / 1000000) /
            1000
        );
      } else {
        datasets[i].data.push(timestamp.assets[assetIds[i]][props.property]);
      }
    }
  }
  return datasets;
}

const chartData = ref({
  labels: labels.value,
  datasets: getDatasets(),
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
          if (props.divide) {
            return "$" + value + "B";
          } else {
            return value;
          }
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      mode: "index",
      position: "nearest",
      intersect: false,
    },
    customLine: false
  },
});
</script>
