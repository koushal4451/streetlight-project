// =====================================================
// data.js  -  SHARED FILE (isko koi edit mat karna)
// Complaints ka saara data yahan se save aur read hota hai.
// =====================================================

// Browser ki memory (localStorage) me data is naam se save hoga
const STORAGE_KEY = "streetlightComplaints";

// Shuru me dashboard khaali na dikhe isliye kuch fake complaints
const sampleComplaints = [
  { id: "SL-001", landmark: "Near Govt School, Model Town", ward: "Ward 14", outageType: "Completely Dark", nearby: "School", priority: "HIGH", status: "Reported", date: "05/09/2026" },
  { id: "SL-002", landmark: "Pole 45, Railway Road", ward: "Ward 3", outageType: "Flickering", nearby: "Bus Stop", priority: "MEDIUM", status: "Under Repair", date: "06/09/2026" },
  { id: "SL-003", landmark: "Behind City Market Lane", ward: "Ward 8", outageType: "Completely Dark", nearby: "Dark Alleyway", priority: "HIGH", status: "Under Repair", date: "07/09/2026" },
  { id: "SL-004", landmark: "Pole 12, Nehru Colony", ward: "Ward 5", outageType: "Damaged Pole", nearby: "Residential", priority: "NORMAL", status: "Repaired", date: "01/09/2026" },
  { id: "SL-005", landmark: "Main Bus Stand Gate", ward: "Ward 1", outageType: "Completely Dark", nearby: "Bus Stop", priority: "HIGH", status: "Repaired", date: "02/09/2026" },
  { id: "SL-006", landmark: "Gandhi Chowk Crossing", ward: "Ward 10", outageType: "Flickering", nearby: "Main Road", priority: "NORMAL", status: "Reported", date: "09/09/2026" },
  { id: "SL-007", landmark: "Pole 78, Civil Lines", ward: "Ward 17", outageType: "Damaged Pole", nearby: "Main Road", priority: "NORMAL", status: "Reported", date: "10/09/2026" },
  { id: "SL-008", landmark: "Near DAV Public School", ward: "Ward 6", outageType: "Flickering", nearby: "School", priority: "MEDIUM", status: "Repaired", date: "03/09/2026" }
];

// Saari complaints wapas deta hai (pehli baar sample data load karta hai)
function getComplaints() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleComplaints));
    return sampleComplaints;
  }
  return JSON.parse(saved);
}

// Poori list ko dobara save karta hai
function saveComplaints(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Nayi complaint add karta hai. id, status aur date khud laga deta hai.
// Tumhe sirf landmark, ward, outageType, nearby, priority bhejna hai.
function addComplaint(newComplaint) {
  const list = getComplaints();
  const number = list.length + 1;
  newComplaint.id = "SL-" + String(number).padStart(3, "0");
  newComplaint.status = "Reported";
  newComplaint.date = new Date().toLocaleDateString("en-GB");
  list.push(newComplaint);
  saveComplaints(list);
  return newComplaint;
}

// Kisi complaint ka status badalta hai
// newStatus sirf ye 3 me se ek: "Reported", "Under Repair", "Repaired"
function updateStatus(id, newStatus) {
  const list = getComplaints();
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list[i].status = newStatus;
    }
  }
  saveComplaints(list);
}
