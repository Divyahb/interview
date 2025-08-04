const awsOverallPercent = Number(localStorage.getItem("aws-overall-percent") || 0);
const codingOverallPercent = Number(localStorage.getItem("coding-overall-percent") || 0);
const brandingOverallPercent = Number(localStorage.getItem("branding-overall-percent") || 0);
const germanOverallPercent = Number(localStorage.getItem("german-overall-percent") || 0);
const dashboardOverallPercent = Number(localStorage.getItem("dashboard-overall-percent") || 0);

function updateCountdowns() {
  const elements = document.querySelectorAll(".days-left");
  const today = new Date();

  elements.forEach(el => {
    const deadline = new Date(el.dataset.date);
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    el.textContent = diff >= 0 ? `${diff}` : "Expired";
  });
}

function updateProgress(sectionId, percent) {
  const progressEl = document.querySelector(`#${sectionId}-progress`);

  progressEl.innerHTML = `<div style="width:${percent}%;height:100%;background:#2e6bde;border-radius:5px;"></div>`;
}

function updateTopInfo() {
  const startDate = new Date("2025-08-03"); // Adjust if your kickoff date differs
  const today = new Date();
  const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  document.getElementById("today-date").textContent = formattedDate;
  document.getElementById("day-number").textContent = diffDays <= 60 ? diffDays : "Complete";

  
  const overallProgress = [
    awsOverallPercent, 
    codingOverallPercent,
    brandingOverallPercent,    
    germanOverallPercent,
    dashboardOverallPercent
  ];
  const overallPercent = ((overallProgress.reduce((a, b) => a + b, 0) / 4) || 0);
  document.getElementById("overall-progress").textContent = overallPercent;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountdowns();
  updateProgress("aws", awsOverallPercent);
  updateProgress("coding", codingOverallPercent);
  updateProgress("branding", brandingOverallPercent);
  updateProgress("german", germanOverallPercent);
  updateProgress("dashboard", dashboardOverallPercent);
  updateTopInfo(); 
});

