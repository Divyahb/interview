const TIMELINE = window.TIMELINE;

// Format date as "Friday, 07 Nov 2025"
function formatDate(date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Calculate days left until a target date
function daysLeft(targetDate) {
  const today = new Date();
  const end = new Date(targetDate);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : "Expired";
}

// Calculate current day number in the 60-day plan
function getDayNumber() {
  const start = new Date(TIMELINE.startDate);
  const today = new Date();
  return Math.min(
    60,
    Math.max(1, Math.ceil((today - start) / (1000 * 60 * 60 * 24)) + 1)
  );
}

// Retrieve progress from localStorage
function getProgress(key, fallback = 0) {
  const val = localStorage.getItem(key);
  return val !== null ? parseInt(val, 10) : fallback;
}

// Update deadline text and countdown
function updateCountdowns() {
  document.querySelectorAll(".days-left").forEach((el) => {
    const key = el.dataset.key;
    const deadline = TIMELINE.deadlines[key];
    el.textContent = daysLeft(deadline);
  });

  document.querySelectorAll(".deadline-date").forEach((el) => {
    const key = el.dataset.key;
    const deadline = TIMELINE.deadlines[key];
    el.textContent = new Date(deadline).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  });
}

// Update progress bar width
function updateProgress(sectionId, percent) {
  const bar = document.querySelector(`#${sectionId}-progress`);
  bar.style.width = `${percent}%`;
}

// Update top info section
function updateTopInfo() {
  const today = new Date();
  const dayNum = getDayNumber();
  document.getElementById("today-date").textContent = formatDate(today);
  document.getElementById("day-number").textContent =
    dayNum <= 60 ? dayNum : "Complete";

  const overallProgress = [
    getProgress("aws-overall-percent"),
    getProgress("coding-overall-percent"),
    getProgress("branding-overall-percent"),
    getProgress("german-overall-percent"),
    getProgress("system-design-overall-percent"),
  ];

  const avg = Math.round(
    overallProgress.reduce((a, b) => a + b, 0) / overallProgress.length
  );
  document.getElementById("overall-progress").textContent = avg;
}

// Initialize dashboard
(function initDashboard() {
  updateCountdowns();
  updateProgress("aws", getProgress("aws-overall-percent"));
  updateProgress("coding", getProgress("coding-overall-percent"));
  updateProgress("branding", getProgress("branding-overall-percent"));
  updateProgress("german", getProgress("german-overall-percent"));
  updateProgress("system-design", getProgress("system-design-overall-percent"));
  updateTopInfo();
})();
