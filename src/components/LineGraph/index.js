import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

const LineGraph = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        const data = res.data;
        const newChartData = {
          labels: Object.keys(data.cases),
          datasets: [
            {
              label: "Cases",
              data: Object.values(data.cases),
              fill: false,
              borderColor: "#a3ff8f",
              borderWidth: 1.4,
            },
          ],
        };

        setChartData(newChartData);
      });

    // Register necessary scales and elements
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip
    );
  }, []);

  return (
    <div>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        {chartData.datasets ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value, index, values) {
                      if (value >= 1000) {
                        return value / 100000 + "k";
                      }
                      return value.toString();
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <div className="loader-card">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineGraph;
