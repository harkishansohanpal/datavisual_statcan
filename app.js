// URL to fetch data from Stats Canada (replace with actual data source)
const API_URL = 'https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidMember/18100205/1';

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const chartData = processData(data);
        renderChart(chartData);

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// Function to process raw data into a format usable by the chart
function processData(data) {
    const labels = [];
    const values = [];

    data.forEach(item => {
        labels.push(item.date);  // Customize this based on the dataset structure
        values.push(item.value); // Customize this based on the dataset structure
    });

    return { labels, values };
}

// Function to render the chart
function renderChart(chartData) {
    const ctx = document.getElementById('dataChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Data from Stats Canada',
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

// Fetch and render the data
fetchData();
