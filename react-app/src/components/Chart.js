import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { authContext } from "../contexts/Auth";

// Register the necessary components from Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

function calculateDistribution(arr) {
    const distribution = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        5: 0,
        8: 0,
        13: 0,
        21: 0,
    };

    // Iterate over each value in the array
    arr.forEach((value) => {
        // If the value already exists in the distribution, increment its count
        if (distribution[value] !== undefined) {
            distribution[value] += 1;
        }
    });

    return distribution;
}

export default function Chart({ users }) {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [color, setColor] = useState();
    const { isDarkMode } = useContext(authContext);

    useEffect(() => {
        const votesValues = [];
        users.forEach((user) => {
            votesValues.push(user.votevalue);
        });

        const chartData = {
            labels: [0, 1, 2, 3, 5, 8, 13, 21],
            datasets: [
                {
                    data: Object.values(calculateDistribution(votesValues)),
                    backgroundColor: "rgb(13, 110, 253)",
                },
            ],
        };

        if (chartData === undefined) return;
        setData(chartData);
    }, [users]);

    useEffect(() => {
        setColor(isDarkMode ? "#fff" : "#000");
    }, [isDarkMode]);

    // Options for the chart
    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false, // Removes the grid lines on the x-axis
                },
                ticks: {
                    color: color, // Change this to the desired tick color if needed
                },
            },
            y: {
                display: false,
            },
        },
        layout: {
            padding: {
                top: 30, // Adds extra padding to the top for the labels
            },
        },
        plugins: {
            datalabels: {
                anchor: "end",
                align: "top",
                color: color, // Label color
                font: {
                    weight: "bold",
                },
            },
            legend: {
                display: false,
            },
        },
    };

    return <Bar data={data} options={options} />;
}
