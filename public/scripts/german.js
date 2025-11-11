class GermanChecklistController {
  constructor(config) {
    this.containerId = config.containerId;
    this.progressBarId = config.progressBarId;
    this.progressTextId = config.progressTextId;
    this.progressCountId = config.progressCountId;
    this.storagePrefix = config.storagePrefix;
    this.total = config.total;
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

    this.data.forEach((section, sIdx) => {
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "checklist-section";
      sectionDiv.innerHTML = `<h3 class="text-lg font-semibold mb-2">${section.section}</h3>`;

      section.items.forEach((item, iIdx) => {
        const itemId = `${this.storagePrefix}-${sIdx}-${iIdx}`;
        sectionDiv.innerHTML += `
          <div class="checklist-item">
            <input type="checkbox" id="${itemId}" data-item="${itemId}">
            <label for="${itemId}">
              <a href="${item.link}" target="_blank">${item.title}</a>
            </label>
          </div>
        `;
      });

      container.appendChild(sectionDiv);
    });
  }

  restoreState() {
    this.data.forEach((section, sIdx) => {
      section.items.forEach((item, iIdx) => {
        const itemId = `${this.storagePrefix}-${sIdx}-${iIdx}`;
        const checkbox = document.getElementById(itemId);
        if (localStorage.getItem(itemId) === "true") {
          checkbox.checked = true;
        }
        checkbox.addEventListener("change", () => {
          localStorage.setItem(itemId, checkbox.checked ? "true" : "false");
          this.updateProgress();
        });
      });
    });
  }

  updateProgress() {
    let completed = 0;
    this.data.forEach((section, sIdx) => {
      section.items.forEach((item, iIdx) => {
        const itemId = `${this.storagePrefix}-${sIdx}-${iIdx}`;
        if (localStorage.getItem(itemId) === "true") completed++;
      });
    });

    const percent = Math.round((completed / this.total) * 100);
    document.getElementById(this.progressBarId).style.width = `${percent}%`;
    document.getElementById(
      this.progressTextId
    ).textContent = `${percent}% completed`;
    document.getElementById(
      this.progressCountId
    ).textContent = `${completed}/${this.total} lessons completed`;
    localStorage.setItem(`${this.storagePrefix}-overall-percent`, percent);
  }
}

fragmentRegistry.register("german", function initGermanPage() {
  fetch("data/german.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load checklist data");
      return response.json();
    })
    .then((checklistData) => {
      const controller = new GermanChecklistController({
        containerId: "checklist-container",
        progressBarId: "overall-progress-bar",
        progressTextId: "overall-progress-text",
        progressCountId: "overall-progress-count",
        storagePrefix: "german",
        total: 24,
      });
      controller.init(checklistData);
    })
    .catch((error) => {
      console.error("Error loading German checklist data:", error);
    });
});
