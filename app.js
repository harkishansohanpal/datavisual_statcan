// URL to the ZIP file (Stats Canada API)
const API_URL = 'https://www150.statcan.gc.ca/t1/wds/rest/getFullTableDownloadCSV/17100005/en';

// Function to fetch the ZIP file and extract data
function fetchZipFile() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error('Failed to download ZIP');
            return response.blob();
        })
        .then(JSZip.loadAsync) // Load the ZIP file with JSZip
        .then(zip => {
            // Assuming there is only one CSV file in the ZIP, you can loop through files if there are multiple
            return zip.file("17100005.csv").async("string"); // Replace with actual file name inside the ZIP
        })
        .then(csvData => {
            // Use PapaParse to parse CSV data (if the file is CSV)
            Papa.parse(csvData, {
                header: true,
                complete: function(results) {
                    console.log(results.data); // Check the parsed data
                    const chartData = processData(results.data);
                    renderChart(chartData);
                }
            });
        })
        .catch(error => console.error('Error fetching or parsing ZIP file:', error));
}

// Process the parsed data to extract labels and values
function processData(data) {
    // Assuming the CSV contains "Year" and "Value" columns
    const labels = data.map(row => row["Year"]);
    const values = data.map(row => parseFloat(row["Value"])); // Ensure values are numeric
    return { labels, values };
}

// Render chart using Chart.js
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
            responsive: true,
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

// Call the function to fetch and display data
fetchZipFile();
