// insights.js - sirf Aman edit karega.
// data.js ka function: getComplaints()

const complaints = getComplaints();

// ---------- 1. Priority ke hisaab se ----------
const priorityList = ["HIGH", "MEDIUM", "NORMAL"];
const priorityColor = { HIGH: "var(--red)", MEDIUM: "var(--amber)", NORMAL: "var(--green)" };

const priorityCount = { HIGH: 0, MEDIUM: 0, NORMAL: 0 };
let openHigh = 0;

complaints.forEach(function (c) {
  if (priorityCount[c.priority] !== undefined) {
    priorityCount[c.priority]++;
  }
  if (c.priority === "HIGH" && c.status !== "Repaired") {
    openHigh++;
  }
});

const priorityBox = document.getElementById("insights-priority");

priorityList.forEach(function (name) {
  const row = document.createElement("div");
  row.className = "insights-row";

  const label = document.createElement("span");
  label.textContent = name;

  const bar = document.createElement("div");
  bar.className = "insights-bar";

  const fill = document.createElement("div");
  fill.className = "insights-bar-fill";
  const percent = complaints.length === 0 ? 0 : (priorityCount[name] / complaints.length) * 100;
  fill.style.width = percent + "%";
  fill.style.background = priorityColor[name];
  bar.appendChild(fill);

  const count = document.createElement("span");
  count.className = "insights-count";
  count.textContent = priorityCount[name];

  row.appendChild(label);
  row.appendChild(bar);
  row.appendChild(count);
  priorityBox.appendChild(row);
});

document.getElementById("insights-open-note").textContent =
  openHigh + " of " + priorityCount.HIGH + " HIGH priority complaints are still waiting or under repair.";

// ---------- 2. Ward ke hisaab se ----------
const wards = {};

complaints.forEach(function (c) {
  if (wards[c.ward] === undefined) {
    wards[c.ward] = { total: 0, Reported: 0, "Under Repair": 0, Repaired: 0 };
  }
  wards[c.ward].total++;
  if (wards[c.ward][c.status] !== undefined) {
    wards[c.ward][c.status]++;
  }
});

// Ward ko number ke hisaab se sajana (Ward 2 pehle, Ward 10 baad me)
const wardNames = Object.keys(wards).sort(function (a, b) {
  return parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10);
});

const tbody = document.getElementById("insights-ward-body");

wardNames.forEach(function (name) {
  const data = wards[name];
  const row = document.createElement("tr");
  const cells = [name, data.total, data.Reported, data["Under Repair"], data.Repaired];

  cells.forEach(function (value, index) {
    const td = document.createElement("td");
    td.textContent = value;
    if (index === 1) td.className = "insights-total";
    row.appendChild(td);
  });
  tbody.appendChild(row);
});

document.getElementById("insights-empty").hidden = wardNames.length !== 0;
// insights.js  -  sirf Aman edit karega.
