// index.js - home page ke 4 numbers bharta hai.
// data.js ka function: getComplaints()

const complaints = getComplaints();

// Kisi status ki complaints gino
function countStatus(status) {
  let count = 0;
  for (let i = 0; i < complaints.length; i++) {
    if (complaints[i].status === status) {
      count++;
    }
  }
  return count;
}

document.getElementById("stat-total").textContent = complaints.length;
document.getElementById("stat-waiting").textContent = countStatus("Reported");
document.getElementById("stat-repairing").textContent = countStatus("Under Repair");
document.getElementById("stat-repaired").textContent = countStatus("Repaired");
