const BASE_URL = "https://5f18-103-18-73-90.ngrok-free.app";
const maxPoints = 20;

let liveAlertData = [];
let fileAccessData = [];
let activeUsersData = [];
let networkTrafficData = [];

let chart;

function initializeChart() {
    const ctx = document.getElementById("trafficChart").getContext("2d");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Live Alerts",
                    data: [],
                    borderColor: "blue",
                    fill: false
                },
                {
                    label: "File Access Logs",
                    data: [],
                    borderColor: "red",
                    fill: false
                },
                {
                    label: "Active Users",
                    data: [],
                    borderColor: "green",
                    fill: false
                },
                {
                    label: "Network Traffic",
                    data: [],
                    borderColor: "orange",
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                x: {
                    title: { display: true, text: "Time" }
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Log Count" }
                }
            }
        }
    });
}

function updateChart() {
    const now = new Date().toLocaleTimeString();

    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(liveAlertData.length);
    chart.data.datasets[1].data.push(fileAccessData.length);
    chart.data.datasets[2].data.push(activeUsersData.length);
    chart.data.datasets[3].data.push(networkTrafficData.length);

    if (chart.data.labels.length > maxPoints) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(dataset => dataset.data.shift());
    }

    chart.update();
}

// Fetch Live Alerts
function fetchLiveAlerts() {
    return fetch(`${BASE_URL}/get_live_alerts`, {
        headers: { "ngrok-skip-browser-warning": "true" }
    })
        .then(response => response.json())
        .then(data => {
            const logs = data.logs;
            liveAlertData = logs;

            const table = document.getElementById("alertsTable").getElementsByTagName("tbody")[0];
            table.innerHTML = "";

            logs.forEach(log => {
                const row = table.insertRow();
                row.insertCell(0).innerText = log.timestamp;
                row.insertCell(1).innerText = log.system;
                row.insertCell(2).innerText = log.message;
            });
        })
        .catch(error => console.error("❌ Error fetching live alerts:", error));
}

// Fetch File Access Logs
function fetchFileLogs() {
    return fetch(`${BASE_URL}/get_file_access_logs`, {
        headers: { "ngrok-skip-browser-warning": "true" }
    })
        .then(response => response.json())
        .then(data => {
            const logs = data.logs;
            fileAccessData = logs;

            const table = document.getElementById("fileLogTable").getElementsByTagName("tbody")[0];
            table.innerHTML = "";

            logs.forEach(log => {
                let row = table.insertRow();
                row.insertCell(0).innerText = log.timestamp;
                row.insertCell(1).innerText = log.log;
            });
        })
        .catch(error => console.error("❌ Error fetching file logs:", error));
}

// Fetch Active Users
function fetchActiveUsers() {
    return fetch(`${BASE_URL}/get_active_users`, {
        headers: { "ngrok-skip-browser-warning": "true" }
    })
        .then(response => response.json())
        .then(data => {
            activeUsersData = data.users;

            const table = document.getElementById("userTable").getElementsByTagName("tbody")[0];
            table.innerHTML = "";

            data.users.forEach(user => {
                let row = table.insertRow();
                row.insertCell(0).innerText = user.username;
                row.insertCell(1).innerText = user.terminal;
                row.insertCell(2).innerText = user.login_time;
            });
        })
        .catch(error => console.error("❌ Error fetching active users:", error));
}

// Fetch Network Traffic
function fetchNetworkTraffic() {
    return fetch(`${BASE_URL}/get_network_traffic`, {
        headers: { "ngrok-skip-browser-warning": "true" }
    })
        .then(response => response.json())
        .then(data => {
            networkTrafficData = data.traffic;

            const table = document.getElementById("trafficTable").getElementsByTagName("tbody")[0];
            table.innerHTML = "";

            data.traffic.forEach(entry => {
                let row = table.insertRow();
                row.insertCell(0).innerText = entry.protocol;
                row.insertCell(1).innerText = entry.source_ip;
                row.insertCell(2).innerText = entry.destination_ip;
                row.insertCell(3).innerText = entry.state;
                row.insertCell(4).innerText = entry.process;
            });
        })
        .catch(error => console.error("❌ Error fetching network traffic:", error));
}

// Combined refresh
function refreshAll() {
    Promise.all([
        fetchLiveAlerts(),
        fetchFileLogs(),
        fetchActiveUsers(),
        fetchNetworkTraffic()
    ]).then(updateChart);
}

// Initialize on page load
window.onload = () => {
    initializeChart();
    refreshAll();
    setInterval(refreshAll, 5000);
};
