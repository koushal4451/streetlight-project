// =====================================================
// home.js  -  sirf Aman edit karega
// Home page ke 4 numbers asli data se bharta hai
// (data.js pehle load hona chahiye, tabhi getComplaints() milega)
// =====================================================

// 1. Saari complaints lo
const allComplaints = getComplaints();

// 2. Status ke hisaab se gino
let waiting = 0;    // status "Reported"
let repairing = 0;  // status "Under Repair"
let repaired = 0;   // status "Repaired"

for (let i = 0; i < allComplaints.length; i++) {
  const status = allComplaints[i].status;

  if (status === "Reported") {
    waiting = waiting + 1;
  } else if (status === "Under Repair") {
    repairing = repairing + 1;
  } else if (status === "Repaired") {
    repaired = repaired + 1;
  }
}

// 3. Number ko 0 se target tak chadhate hue dikhao
function showCount(boxId, target) {
  const box = document.getElementById(boxId);

  // Jinhe animation pasand nahi (phone settings), unhe seedha number dikhao
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || target === 0) {
    box.textContent = target;
    return;
  }

  let current = 0;
  // Poori animation lagbhag 0.6 second me khatam ho
  const delay = Math.max(15, Math.floor(600 / target));

  const timer = setInterval(function () {
    current = current + 1;
    box.textContent = current;
    if (current >= target) {
      clearInterval(timer);
    }
  }, delay);
}

// 4. Chaaron boxes me daal do
showCount("stat-total", allComplaints.length);
showCount("stat-waiting", waiting);
showCount("stat-repairing", repairing);
showCount("stat-repaired", repaired);

// ===== Alert strip: HIGH priority aur abhi tak repair nahi hui =====
let highPending = 0;

for (let i = 0; i < allComplaints.length; i++) {
  const c = allComplaints[i];
  if (c.priority === "HIGH" && c.status !== "Repaired") {
    highPending = highPending + 1;
  }
}

if (highPending > 0) {
  const verb = highPending === 1 ? " high priority outage is" : " high priority outages are";
  document.getElementById("alert-text").textContent = highPending + verb + " still not repaired.";
  document.getElementById("alert-strip").classList.add("show");
}

// ===== Latest 5 complaints =====
// Ek chhota span banane wala helper
function makeSpan(className, text) {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

const latestList = document.getElementById("latest-list");
let shown = 0;

// List ke aakhir se peeche ki taraf chalo (sabse nayi complaint sabse last me hoti hai)
for (let i = allComplaints.length - 1; i >= 0 && shown < 5; i--) {
  const c = allComplaints[i];

  const item = document.createElement("li");
  item.className = "latest-item";

  const main = document.createElement("div");
  main.appendChild(makeSpan("latest-place", c.landmark));
  main.appendChild(makeSpan("latest-meta", c.ward + ", " + c.outageType));

  const side = document.createElement("div");
  side.className = "latest-side";
  side.appendChild(makeSpan("badge badge-" + c.priority.toLowerCase(), c.priority));
  side.appendChild(makeSpan("latest-status", c.status));

  item.appendChild(main);
  item.appendChild(side);
  latestList.appendChild(item);

  shown = shown + 1;
}
