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
      const barText = document.querySelector(`#${section}-progress-text`);
      const barStatus = document.querySelector(`#${section}-status`);
      if (bar) {
        bar.style.width = `${percent}%`;
        barText.textContent = `${percent}%`;
        barStatus.textContent = percent >= 100 ? "Completed" : "In Progress";
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

class DashboardConfigManager {
  constructor({ sections, blocker, configDialog, saveBtn }) {
    this.sections = sections;
    this.blocker = blocker;
    this.configDialog = configDialog;
    this.saveBtn = saveBtn;
  }

  getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  renderSectionInputs(prefill = {}) {
    const container = document.getElementById("config-section-dates");
    container.innerHTML = "";

    this.sections.forEach((section) => {
      const wrapper = document.createElement("div");
      wrapper.className = "flex flex-col";

      const label = document.createElement("label");
      label.className = "text-sm font-medium mb-1";
      label.textContent = `End date for ${section}`;

      const input = document.createElement("input");
      input.type = "date";
      input.id = `config-end-${section}`;
      input.className = "w-full p-2 border rounded";
      input.value = prefill[section] || "";
      input.addEventListener("input", () => this.validateConfigFields());

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    });
  }

  prefillConfigDialog(timeline = {}) {
    document.getElementById("config-name").value = timeline.name || "";
    document.getElementById("config-start-date").value =
      timeline.startDate || this.getTodayDate();
    document.getElementById("config-target-date").value =
      timeline.targetDate || this.getTodayDate();
    this.renderSectionInputs(timeline.deadlines || {});
    this.validateConfigFields();
  }

  showConfigDialog() {
    const stored = localStorage.getItem("TIMELINE");
    const timeline = stored ? JSON.parse(stored) : {};
    this.prefillConfigDialog(timeline);
    this.configDialog.classList.remove("hidden");
  }

  hideConfigDialog() {
    this.configDialog.classList.add("hidden");
  }

  validateConfigFields() {
    const name = document.getElementById("config-name").value.trim();
    const start = document.getElementById("config-start-date").value;
    const target = document.getElementById("config-target-date").value;

    document.getElementById("config-target-date").min = start;

    const allFilled =
      name &&
      start &&
      target &&
      this.sections.every((section) => {
        const input = document.getElementById(`config-end-${section}`);
        return input && input.value;
      });

    this.saveBtn.disabled = !allFilled;
    this.saveBtn.classList.toggle("opacity-50", !allFilled);
    this.saveBtn.classList.toggle("cursor-not-allowed", !allFilled);
  }

  validateAndSaveConfig() {
    const name = document.getElementById("config-name").value.trim();
    const startDate = document.getElementById("config-start-date").value;
    const targetDate = document.getElementById("config-target-date").value;

    const start = new Date(startDate);
    const target = new Date(targetDate);
    if (target <= start) {
      alert("Target date must be after start date.");
      return;
    }

    const deadlines = {};
    for (const section of this.sections) {
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

    const timeline = { name, startDate, targetDate, deadlines };
    localStorage.setItem("TIMELINE", JSON.stringify(timeline));
    this.hideConfigDialog();
    this.blocker.classList.add("hidden");
    this.initDashboardController(timeline);
  }

  clearConfig() {
    localStorage.removeItem("TIMELINE");
    location.reload();
  }

  initDashboardController(timeline) {
    const controller = new DashboardController({
      sections: this.sections,
      timeline,
      name: timeline.name,
      startDate: timeline.startDate,
      targetDate: timeline.targetDate,
    });
    controller.init();
  }

  bindEvents() {
    document.getElementById("open-config").onclick = () =>
      this.showConfigDialog();
    document.getElementById("trigger-config").onclick = () =>
      this.showConfigDialog();
    this.saveBtn.onclick = () => this.validateAndSaveConfig();
    document.getElementById("clear-config").onclick = () => this.clearConfig();

    ["config-name", "config-start-date", "config-target-date"].forEach((id) => {
      document
        .getElementById(id)
        .addEventListener("input", () => this.validateConfigFields());
    });
  }

  init() {
    const stored = localStorage.getItem("TIMELINE");
    if (stored) {
      const timeline = JSON.parse(stored);
      this.blocker.classList.add("hidden");
      this.prefillConfigDialog(timeline);
      this.initDashboardController(timeline);
    } else {
      this.blocker.classList.remove("hidden");
      this.prefillConfigDialog(); // default values
    }
    this.bindEvents();
  }
}

fragmentRegistry.register("dashboard", function initDashboard() {
  const manager = new DashboardConfigManager({
    sections: ["aws", "coding", "branding", "german", "system-design"],
    blocker: document.getElementById("blocker-overlay"),
    configDialog: document.getElementById("config-dialog"),
    saveBtn: document.getElementById("save-config"),
  });
  manager.init();
});
