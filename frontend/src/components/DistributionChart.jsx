import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DistributionChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.category_name),
        datasets: [
            {
                data: data.map(item => item.total),
                backgroundColor: data.map(item => item.color || '#ccc'), // Use backend color or default
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    font: { size: 12 }
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="card" style={{ height: '300px' }}>
            <h3 style={{ marginTop: 0 }}>Distribuzione</h3>
            <div style={{ height: '220px', position: 'relative' }}>
                {data.length > 0 ? (
                    <Pie data={chartData} options={options} />
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                        Nessun dato disponibile
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistributionChart;
