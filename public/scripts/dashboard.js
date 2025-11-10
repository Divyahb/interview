class DashboardController {
  constructor(config) {
    this.sections = config.sections;
    this.timeline = config.timeline;
    this.name = config.name;
    this.startDate = new Date(config.startDate);
    this.targetDate = new Date(config.targetDate);
  }

  init() {
    this.updateCountdowns();
    this.updateProgressBars();
    this.updateTopInfo();
  }

  formatDate(date) {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  daysLeft(targetDate) {
    const today = new Date();
    const end = new Date(targetDate);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : "Expired";
  }

  getDayNumber() {
    const today = new Date();
    const totalDays = Math.ceil(
      (this.targetDate - this.startDate) / (1000 * 60 * 60 * 24)
    );
    const currentDay =
      Math.ceil((today - this.startDate) / (1000 * 60 * 60 * 24)) + 1;
    return {
      current: Math.min(totalDays, Math.max(1, currentDay)),
      total: totalDays,
    };
  }

  getProgress(key, fallback = 0) {
    const val = localStorage.getItem(key);
    return val !== null ? parseInt(val, 10) : fallback;
  }

  updateCountdowns() {
    document.querySelectorAll(".days-left").forEach((el) => {
      const key = el.dataset.key;
      const deadline = this.timeline.deadlines[key];
      el.textContent = this.daysLeft(deadline);
    });

    document.querySelectorAll(".deadline-date").forEach((el) => {
      const key = el.dataset.key;
      const deadline = this.timeline.deadlines[key];
      el.textContent = new Date(deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
    });
  }

  updateProgressBars() {
    this.sections.forEach((section) => {
      const percent = this.getProgress(`${section}-overall-percent`);
      const bar = document.querySelector(`#${section}-progress`);
      if (bar) {
        bar.style.width = `${percent}%`;
        bar.textContent = `${percent}%`;
      }
    });
  }

  updateTopInfo() {
    const today = new Date();
    const { current, total } = this.getDayNumber();
    document.getElementById("today-date").textContent = this.formatDate(today);
    document.getElementById(
      "day-number"
    ).textContent = `${current} of ${total}`;
    document.getElementById("user-name").textContent = this.name;

    const overallProgress = this.sections.map((section) =>
      this.getProgress(`${section}-overall-percent`)
    );
    const avg = Math.round(
      overallProgress.reduce((a, b) => a + b, 0) / overallProgress.length
    );
    document.getElementById("overall-progress").textContent = avg;
  }
}

fragmentRegistry.register("dashboard", function initDashboard() {
  const blocker = document.getElementById("blocker-overlay");
  const configDialog = document.getElementById("config-dialog");
  const openBtn = document.getElementById("open-config");
  const triggerBtn = document.getElementById("trigger-config");
  const saveBtn = document.getElementById("save-config");
  const clearBtn = document.getElementById("clear-config");

  const sections = ["aws", "coding", "branding", "german", "systemDesign"];

  function showConfigDialog() {
    configDialog.classList.remove("hidden");
  }

  function hideConfigDialog() {
    configDialog.classList.add("hidden");
  }

  function renderSectionInputs() {
    const container = document.getElementById("config-section-dates");
    container.innerHTML = "";

    sections.forEach((section) => {
      const wrapper = document.createElement("div");
      wrapper.className = "flex flex-col";

      const label = document.createElement("label");
      label.className = "text-sm font-medium mb-1";
      label.textContent = `End date for ${section}`;

      const input = document.createElement("input");
      input.type = "date";
      input.id = `config-end-${section}`;
      input.className = "w-full p-2 border rounded";

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    });
  }

  function validateAndSaveConfig() {
    const name = document.getElementById("config-name").value.trim();
    const startDate = document.getElementById("config-start-date").value;
    const targetDate = document.getElementById("config-target-date").value;

    if (!name || !startDate || !targetDate) {
      alert("Please fill in your name, start date, and target date.");
      return;
    }

    const start = new Date(startDate);
    const target = new Date(targetDate);
    if (target <= start) {
      alert("Target date must be after start date.");
      return;
    }

    const deadlines = {};
    for (const section of sections) {
      const endDate = document.getElementById(`config-end-${section}`).value;
      if (!endDate) {
        alert(`Please enter an end date for ${section}.`);
        return;
      }
      const end = new Date(endDate);
      if (end > target) {
        alert(`${section} end date must be on or before the target date.`);
        return;
      }
      deadlines[section] = endDate;
    }

    const timeline = {
      name,
      startDate,
      targetDate,
      deadlines,
    };

    localStorage.setItem("TIMELINE", JSON.stringify(timeline));
    hideConfigDialog();
    blocker.classList.add("hidden");
    initDashboardController(timeline);
  }

  function clearConfig() {
    localStorage.removeItem("TIMELINE");
    location.reload();
  }

  function initDashboardController(timeline) {
    const controller = new DashboardController({
      sections,
      timeline,
      name: timeline.name,
      startDate: timeline.startDate,
      targetDate: timeline.targetDate,
    });
    controller.init();
  }

  // Event bindings
  openBtn.onclick = showConfigDialog;
  triggerBtn.onclick = showConfigDialog;
  saveBtn.onclick = validateAndSaveConfig;
  clearBtn.onclick = clearConfig;

  renderSectionInputs();

  const stored = localStorage.getItem("TIMELINE");
  if (stored) {
    const timeline = JSON.parse(stored);
    blocker.classList.add("hidden");
    initDashboardController(timeline);
  } else {
    blocker.classList.remove("hidden");
  }
});
