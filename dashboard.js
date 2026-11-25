const rows = document.getElementById("report-rows");
const count = document.getElementById("result-count");
const search = document.getElementById("search");
const emptyState = document.getElementById("empty-state");
const resetButton = document.getElementById("reset");

let reports = getComplaints();
let activeFilter = "all";

function render() {
  const query = search.value.trim().toLowerCase();

  const visible = reports.filter((report) => {
    const priority = String(report.priority || "").toUpperCase();

    const filterMatches =
      activeFilter === "all" ||
      (activeFilter === "high" && priority === "HIGH") ||
      (activeFilter === "pending" && report.status !== "Repaired") ||
      (activeFilter === "repaired" && report.status === "Repaired");

    const searchText =
      `${report.landmark || ""} ${report.ward || ""}`.toLowerCase();

    return filterMatches && searchText.includes(query);
  });

  rows.replaceChildren();

  visible.forEach((report) => {
    const tr = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = report.id;

    const locationCell = document.createElement("td");
    locationCell.textContent = report.landmark;

    const wardCell = document.createElement("td");
    wardCell.textContent = report.ward;

    const typeCell = document.createElement("td");
    typeCell.textContent = report.outageType;

    const priorityCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className =
      `priority ${String(report.priority || "").toLowerCase()}`;
    badge.textContent = report.priority;
    priorityCell.appendChild(badge);

    const statusCell = document.createElement("td");
    const statusSelect = document.createElement("select");
    statusSelect.className = "status-select";
    statusSelect.setAttribute("aria-label", `Status for ${report.id}`);

    ["Reported", "Under Repair", "Repaired"].forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      option.selected = status === report.status;
      statusSelect.appendChild(option);
    });

    statusSelect.addEventListener("change", () => {
      updateStatus(report.id, statusSelect.value);
      reports = getComplaints();
      render();
    });

    statusCell.appendChild(statusSelect);
    tr.append(idCell, locationCell, wardCell, typeCell, priorityCell, statusCell);
    rows.appendChild(tr);
  });

  emptyState.hidden = visible.length > 0;
  count.textContent = `Showing ${visible.length} of ${reports.length} reports`;

  const repaired = reports.filter(
    (report) => report.status === "Repaired"
  ).length;
  const percent = reports.length
    ? Math.round((repaired / reports.length) * 100)
    : 0;

  document.getElementById("progress-label").textContent =
    `${repaired} of ${reports.length} poles repaired (${percent}%)`;
  document.getElementById("progress-fill").style.width = `${percent}%`;

  const progressTrack = document.querySelector(".progress-track");
  progressTrack.setAttribute("aria-valuemax", reports.length);
  progressTrack.setAttribute("aria-valuenow", repaired);

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.classList.toggle(
      "selected",
      button.dataset.filter === activeFilter
    );
  });
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    render();
  });
});

search.addEventListener("input", render);

document.getElementById("theme-toggle").addEventListener("click", (event) => {
  document.body.classList.toggle("light");
  event.currentTarget.textContent =
    document.body.classList.contains("light") ? "Dark mode" : "Light mode";
});

resetButton.addEventListener("click", () => {
  const confirmed = confirm(
    "Reset demo data? This clears reports saved in this browser and restores sample reports."
  );

  if (confirmed) {
    localStorage.removeItem("streetlightComplaints");
    reports = getComplaints();
    activeFilter = "all";
    render();
  }
});

render();
