let snapshots = [];
let outbox = [];
let isSimulating = true;

function newSnapshot() {
  return {
    metrics: {
      massFlow: (40 + Math.random() * 5).toFixed(2),
      density: (930 + Math.random() * 10).toFixed(2),
      temperature: (50 + Math.random() * 4).toFixed(2)
    }
  };
}

function updateUI(snapshot) {
  document.getElementById('massFlow').innerText = snapshot.metrics.massFlow;
  document.getElementById('density').innerText = snapshot.metrics.density;
  document.getElementById('temperature').innerText = snapshot.metrics.temperature;
  document.getElementById('outbox').innerText = outbox.length;
}

function simulate() {
  const s = newSnapshot();
  snapshots.push(s);

  if (Math.random() < 0.1) {
    outbox.push(s);
    document.getElementById('connectionStatus').innerText = "Buffering";
  } else {
    document.getElementById('connectionStatus').innerText = "Connected";
  }
  if (snapshots.length > 20) snapshots.shift();
  updateUI(s);
}

setInterval(() => {
  if (isSimulating) simulate();
}, 2000);

document.getElementById('toggleSim').addEventListener('click', () => {
  isSimulating = !isSimulating;
  document.getElementById('toggleSim').innerText = isSimulating ? "Stop Simulator" : "Start Simulator";
});
