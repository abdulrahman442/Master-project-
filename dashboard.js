let snapshots = [];
let outbox = [];
let isSimulating = true;

const massFlowChartCtx = document.getElementById('massFlowChart').getContext('2d');
const densityTempChartCtx = document.getElementById('densityTempChart').getContext('2d');

const massFlowChart = new Chart(massFlowChartCtx, {
  type: 'line',
  data: { labels: [], datasets: [{ label: 'Mass Flow', data: [], borderColor: '#2563eb', fill: false }] },
  options: { responsive: true, animation: false }
});

const densityTempChart = new Chart(densityTempChartCtx, {
  type: 'line',
  data: { labels: [], datasets: [
    { label: 'Density', data: [], borderColor: '#0891b2', fill: false },
    { label: 'Temperature', data: [], borderColor: '#ea580c', fill: false }
  ]},
  options: { responsive: true, animation: false }
});

function newSnapshot() {
  return {
    id: `BNK-2026-${Math.floor(Math.random() * 9000) + 1000}`,
    metrics: {
      massFlow: (40 + Math.random() * 5).toFixed(2),
      density: (930 + Math.random() * 10).toFixed(2),
      temperature: (50 + Math.random() * 4).toFixed(2)
    },
    signature: Math.random().toString(36).substring(2, 10)
  };
}

function updateUI(snapshot) {
  document.getElementById('massFlow').innerText = snapshot.metrics.massFlow;
  document.getElementById('density').innerText = snapshot.metrics.density;
  document.getElementById('temperature').innerText = snapshot.metrics.temperature;
  document.getElementById('outbox').innerText = outbox.length;

  // Update charts
  massFlowChart.data.labels.push(new Date().toLocaleTimeString());
  massFlowChart.data.datasets[0].data.push(snapshot.metrics.massFlow);
  if (massFlowChart.data.labels.length > 20) {
    massFlowChart.data.labels.shift();
    massFlowChart.data.datasets[0].data.shift();
  }
  massFlowChart.update();

  densityTempChart.data.labels.push(new Date().toLocaleTimeString());
  densityTempChart.data.datasets[0].data.push(snapshot.metrics.density);
  densityTempChart.data.datasets[1].data.push(snapshot.metrics.temperature);
  if (densityTempChart.data.labels.length > 20) {
    densityTempChart.data.labels.shift();
    densityTempChart.data.datasets[0].data.shift();
    densityTempChart.data.datasets[1].data.shift();
  }
  densityTempChart.update();

  // Update log table
  const logBody = document.getElementById('logBody');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${snapshot.id}</td><td>${snapshot.signature}</td><td>VALIDATED</td>`;
  logBody.prepend(row);
  if (logBody.rows.length > 20) logBody.deleteRow(-1);
}

function simulate() {
  const s = newSnapshot();
  snapshots.push(s);
  if (Math.random() < 0.1) outbox.push(s);
  document.getElementById('connectionStatus').innerText = outbox.length > 0 ? "Buffering" : "Connected";
  updateUI(s);
}

setInterval(() => { if (isSimulating) simulate(); }, 2000);

document.getElementById('toggleSim').addEventListener('click', () => {
  isSimulating = !isSimulating;
  document.getElementById('toggleSim').innerText = isSimulating ? "Stop Simulator" : "Start Simulator";
});
