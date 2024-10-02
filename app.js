// Mock data to test the chart rendering
const mockData = {
    labels: ['2020', '2021', '2022', '2023'],
    values: [100, 150, 200, 250]
};

function fetchData() {
    // Simulate successful data fetch using mock data
    const chartData = mockData;  // Use mock data instead of fetching from API
    renderChart(chartData);
}

function renderChart(chartData) {
    const ctx = document.getElementById('dataChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Mock Data',
                data: chartData.values,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}

fetchData();
