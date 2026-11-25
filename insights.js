// insights.js - sirf Aman edit karega
// Complaints ko gin ke bar charts banata hai

const complaints = getComplaints();

// Ek chhota helper: element banao, class aur text laga do
function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  el.className = className;
  if (text !== undefined) {
    el.textContent = text;
  }
  return el;
}

// Kisi field ke hisaab se gino.
// Jaise countBy("priority") ->  { HIGH: 3, MEDIUM: 2, NORMAL: 3 }
function countBy(field) {
  const counts = {};

  for (let i = 0; i < complaints.length; i++) {
    const key = complaints[i][field];

    if (counts[key] === undefined) {
      counts[key] = 1;
    } else {
      counts[key] = counts[key] + 1;
    }
  }

  return counts;
}

// Gine hue data se bar chart banao
function drawBars(boxId, counts) {
  const box = document.getElementById(boxId);

  // Object ko list me badlo, phir bade number se chhote ki taraf lagao
  const rows = [];
  for (const name in counts) {
    rows.push({ name: name, count: counts[name] });
  }
  rows.sort(function (a, b) {
    return b.count - a.count;
  });

  // Sabse bada number (usi ke hisaab se baaki bars ki lambai nikalenge)
  const biggest = rows.length > 0 ? rows[0].count : 1;

  for (let i = 0; i < rows.length; i++) {
    const row = makeEl("div", "insights-row");

    const track = makeEl("div", "insights-track");
    const bar = makeEl("div", "insights-bar");
    bar.style.width = (rows[i].count / biggest) * 100 + "%";
    track.appendChild(bar);

    row.appendChild(makeEl("span", "insights-label", rows[i].name));
    row.appendChild(track);
    row.appendChild(makeEl("span", "insights-count", rows[i].count));

    box.appendChild(row);
  }
}

// Chaaron charts banao
drawBars("chart-priority", countBy("priority"));
drawBars("chart-outage", countBy("outageType"));
drawBars("chart-nearby", countBy("nearby"));
drawBars("chart-ward", countBy("ward"));
