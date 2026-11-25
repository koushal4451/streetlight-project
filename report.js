// report.js  -  sirf Member 2 edit karega.
// data.js ke functions: getComplaints(), addComplaint({...}), updateStatus(id, status)

const form = document.getElementById("report-form");
const result = document.getElementById("report-result");
const submitButton = form.querySelector(".report-button");

// Ward 1 se 20 tak options yahin se bante hain
const wardSelect = document.getElementById("ward");
for (let i = 1; i <= 20; i++) {
  const option = document.createElement("option");
  option.value = "Ward " + i;
  option.textContent = "Ward " + i;
  wardSelect.appendChild(option);
}

// Priority: school / bus stop / dark alleyway ke paas + poori dark = HIGH
function getPriority(nearby, outageType) {
  const highRiskLocations = ["School", "Bus Stop", "Dark Alleyway"];
  if (highRiskLocations.includes(nearby) && outageType === "Completely Dark") {
    return "HIGH";
  }
  if (highRiskLocations.includes(nearby)) {
    return "MEDIUM";
  }
  return "NORMAL";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Double click se duplicate complaint na bane
  submitButton.disabled = true;

  const landmark = document.getElementById("landmark").value.trim();
  const ward = wardSelect.value;
  const outageType = document.querySelector('input[name="outageType"]:checked').value;
  const nearby = document.getElementById("nearby").value;
  const priority = getPriority(nearby, outageType);

  const saved = addComplaint({
    landmark: landmark,
    ward: ward,
    outageType: outageType,
    nearby: nearby,
    priority: priority
  });

  const badgeClass = "report-badge-" + priority.toLowerCase();

  result.innerHTML =
    "Complaint submitted! ID: " + saved.id +
    ' <span class="report-badge ' + badgeClass + '">' + priority + "</span>";

  form.reset();
  submitButton.disabled = false;
});