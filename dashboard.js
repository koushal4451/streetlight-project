// dashboard.js  -  sirf Member 3 edit karega.
// data.js ke functions: getComplaints(), addComplaint({...}), updateStatus(id, status)

const STATUSES = ["Reported", "Under Repair", "Repaired"];
const PRIORITY_ORDER = { HIGH: 0, MEDIUM: 1, NORMAL: 2 };

const tbody = document.getElementById("dash-body");
const emptyMessage = document.getElementById("dash-empty");
const filterButtons = document.querySelectorAll(".dash-filter");

let currentFilter = "All";

// Har cell textContent se bhara jaata hai, taaki user ka likha text HTML ki tarah na chale
function makeCell(text, className) {
  const td = document.createElement("td");
  td.textContent = text;
  if (className) td.className = className;
  return td;
}

function toneClass(status) {
  if (status === "Repaired") return "dash-tone-repaired";
  if (status === "Under Repair") return "dash-tone-repair";
  return "dash-tone-reported";
}

function makeStatusCell(complaint) {
  const td = document.createElement("td");
  const select = document.createElement("select");
  select.className = "dash-status-select " + toneClass(complaint.status);
  select.setAttribute("aria-label", "Status of " + complaint.id);

  STATUSES.forEach(function (status) {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status === "Reported" ? "Waiting" : status;
    if (status === complaint.status) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener("change", function () {
    updateStatus(complaint.id, select.value);
    render();
  });

  td.appendChild(select);
  return td;
}

function makePriorityCell(priority) {
  const td = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = "dash-badge dash-" + priority.toLowerCase();
  badge.textContent = priority;
  td.appendChild(badge);
  return td;
}

function render() {
  const all = getComplaints();

  // Counts aur progress bar
  const counts = { All: all.length, Reported: 0, "Under Repair": 0, Repaired: 0 };
  all.forEach(function (c) {
    if (counts[c.status] !== undefined) counts[c.status]++;
  });
  Object.keys(counts).forEach(function (key) {
    document.getElementById("dash-count-" + key).textContent = counts[key];
  });

  const percent = all.length === 0 ? 0 : Math.round((counts.Repaired / all.length) * 100);
  document.getElementById("dash-percent").textContent = percent + "%";
  document.getElementById("dash-bar-fill").style.width = percent + "%";

  // Filter lagao, phir HIGH priority sabse upar rakho
  const shown = all
    .filter(function (c) { return currentFilter === "All" || c.status === currentFilter; })
    .sort(function (a, b) {
      const byPriority = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      return byPriority !== 0 ? byPriority : a.id.localeCompare(b.id);
    });

  tbody.innerHTML = "";
  shown.forEach(function (c) {
    const row = document.createElement("tr");
    row.appendChild(makeCell(c.id, "dash-id"));
    row.appendChild(makeCell(c.landmark));
    row.appendChild(makeCell(c.ward));
    row.appendChild(makeCell(c.outageType));
    row.appendChild(makePriorityCell(c.priority));
    row.appendChild(makeCell(c.date));
    row.appendChild(makeStatusCell(c));
    tbody.appendChild(row);
  });

  emptyMessage.hidden = shown.length !== 0;
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(function (b) { b.classList.remove("dash-active"); });
    button.classList.add("dash-active");
    render();
  });
});

render();
