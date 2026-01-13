// switch this manullaly to point to your backend server if needed
const API_URL = `http://localhost:3000/api/v1/metrics`;

async function loadMetrics() {
  console.log("Fetching metrics from:", API_URL);

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro HTTP");

    const data = await res.json();

    document.getElementById("connections").innerText = data.connections;
    document.getElementById("slowQueries").innerText = data.slowQueries;
    document.getElementById("locks").innerText = data.locks;

    const statusEl = document.getElementById("status");
    statusEl.innerText = data.status;
    statusEl.className = "status " + (data.status === "OK" ? "ok" : "alert");

    const table = document.getElementById("queriesTable");
    table.innerHTML = "";

    data.topQueries.forEach(q => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${q.query}</td>
        <td>${q.avg_time}</td>
        <td>${q.calls}</td>
        <td>${q.datname}</td>
      `;
      table.appendChild(row);
    });

  } catch (err) {
    console.error("Erro ao carregar métricas", err);
  }
}

loadMetrics();
setInterval(loadMetrics, 10000);
