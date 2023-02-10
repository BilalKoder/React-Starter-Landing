import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useLazyGetUsageQuery } from "../../services/api";
import { getUserData } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent";

function resetTime(time) {
  const date = new Date(time);
  const options = { month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  // LineElement,
  BarElement,
  // Title,
  Tooltip
  // Legend
);
export const options = {
  responsive: true,
  scales: {
    x: {
      display: false,
    },
  },
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Usage Chart",
    },
  },
};

const Graph = () => {
  const [
    getUsage,
    { data: usageData, isLoading, isError, isSuccess, isFetching },
  ] = useLazyGetUsageQuery();
  console.log("data", usageData);

  const handleFetch = () => {
    getUsage();
  };
  useEffect(() => {
    handleFetch();
  }, []);

  if (isFetching) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorComponent handleLoading={handleFetch} />;
  }

  if (!isSuccess) {
    return null;
  }

  const labels = usageData?.map((item) => resetTime(item?.createdAt));

  const data = {
    labels,
    datasets: [
      {
        label: "No of words",
        data: usageData?.map((item) => item?.no_of_words),
        borderColor: "rgb(33 102 205 / 55%)",
        backgroundColor: "rgb(33 102 205 / 75%)",
        tension: 0.4,
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={data}
      style={{ width: "30vw", height: "30vh" }}
    />
  );
};

export default Graph;
