class SystemDesignChecklistController {
  constructor(config) {
    this.containerId = config.containerId;
    this.progressBarId = config.progressBarId;
    this.progressTextId = config.progressTextId;
    this.progressCountId = config.progressCountId;
    this.storagePrefix = config.storagePrefix;
    this.data = [];
  }

  init(data) {
    this.data = data;
    this.render();
    this.restoreState();
    this.updateProgress();
  }

  render() {
    const container = document.getElementById(this.containerId);
    container.innerHTML = "";

    this.data.forEach((challenge, idx) => {
      const itemId = `${this.storagePrefix}-${idx}`;
      const itemDiv = document.createElement("div");
      itemDiv.className = "checklist-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = itemId;
      checkbox.setAttribute("data-item", itemId);

      const label = document.createElement("label");
      label.htmlFor = itemId;

      const link = document.createElement("a");
      link.href = challenge.link;
      link.target = "_blank";
      link.textContent = challenge.title;

      label.appendChild(link);
      itemDiv.appendChild(checkbox);
      itemDiv.appendChild(label);
      container.appendChild(itemDiv);
    });
  }

  restoreState() {
    this.data.forEach((_, idx) => {
      const itemId = `${this.storagePrefix}-${idx}`;
      const checkbox = document.getElementById(itemId);
      if (localStorage.getItem(itemId) === "true") {
        checkbox.checked = true;
      }
      checkbox.addEventListener("change", () => {
        localStorage.setItem(itemId, checkbox.checked ? "true" : "false");
        this.updateProgress();
      });
    });
  }

  updateProgress() {
    const total = this.data.length;
    let completed = 0;

    this.data.forEach((_, idx) => {
      const itemId = `${this.storagePrefix}-${idx}`;
      if (localStorage.getItem(itemId) === "true") completed++;
    });

    const percent = total ? Math.round((completed / total) * 100) : 0;
    document.getElementById(this.progressBarId).style.width = `${percent}%`;
    document.getElementById(
      this.progressTextId
    ).textContent = `${percent}% completed`;
    document.getElementById(
      this.progressCountId
    ).textContent = `${completed}/${total} challenges completed`;
    localStorage.setItem(`${this.storagePrefix}-overall-percent`, percent);
  }
}

fragmentRegistry.register("system_design", function initSystemDesignPage() {
  fetch("../data/design.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load challenges data");
      return response.json();
    })
    .then((systemDesignChallenges) => {
      const controller = new SystemDesignChecklistController({
        containerId: "system-design-checklist-container",
        progressBarId: "system-design-progress-bar",
        progressTextId: "system-design-progress-text",
        progressCountId: "system-design-progress-count",
        storagePrefix: "system-design",
      });
      controller.init(systemDesignChallenges);
    })
    .catch((error) => {
      console.error("Error loading challenges:", error);
    });
});
