// report-mine.js - tere apne HTML ke hisaab se.
// data.js ka function: addComplaint({...})

// Page ke elements pakadna (ids tere HTML wali hi hain)
const landmarkInput = document.getElementById("polenumber");
const wardSelect = document.getElementById("ward");
const nearbySelect = document.getElementById("nearbylocation");
const photoInput = document.getElementById("photo");
const submitButton = document.getElementById("submitcomplaint");
const radios = document.querySelectorAll('input[type="radio"]');

// Message dikhane ke liye ek jagah (HTML me nahi thi, isliye JS se bana di)
const message = document.createElement("p");
message.style.textAlign = "center";
message.style.fontWeight = "bold";
submitButton.after(message);

// "completely dark" ko "Completely Dark" banata hai
function toTitle(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Chuna hua outage type dhoondhna (radio ka naam uske label ke text se milta hai)
function getOutageType() {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return toTitle(radios[i].parentElement.textContent.trim());
    }
  }
  return "";
}

// Priority nikalna
function getPriority(nearby, outageType) {
  const isRisky = nearby === "School" || nearby === "Bus Stop" || nearby === "Dark Alleyway";

  if (isRisky && outageType === "Completely Dark") {
    return "HIGH";
  } else if (isRisky) {
    return "MEDIUM";
  } else {
    return "NORMAL";
  }
}

// Submit button dabane par
submitButton.addEventListener("click", function () {
  const landmark = landmarkInput.value.trim();
  const ward = toTitle(wardSelect.value);
  const outageType = getOutageType();
  const nearby = toTitle(nearbySelect.value);

  // Koi field khaali ho to rok do
  if (landmark === "" || ward === "" || outageType === "" || nearby === "" || photoInput.files.length === 0) {
    message.textContent = "Please fill every field and choose a photo.";
    message.style.color = "#ff6b5b";
    return;
  }

  // Priority nikalna aur complaint save karna (data.js ka function)
  const priority = getPriority(nearby, outageType);
  const saved = addComplaint({
    landmark: landmark,
    ward: ward,
    outageType: outageType,
    nearby: nearby,
    priority: priority
  });

  // Success message
  message.textContent = "Complaint submitted! ID: " + saved.id + " | Priority: " + priority;
  message.style.color = "#5ad19a";

  // Form khaali karna
  landmarkInput.value = "";
  wardSelect.value = "";
  nearbySelect.value = "";
  photoInput.value = "";
  radios.forEach(function (radio) {
    radio.checked = false;
  });
});
// report.js  -  sirf Member 2 edit karega.
// data.js ke functions: getComplaints(), addComplaint({...}), updateStatus(id, status)
