class BrandingChecklistController {
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

      const heading = document.createElement("h3");
      heading.className = "text-lg font-semibold mb-2";
      heading.textContent = section.section;
      sectionDiv.appendChild(heading);

      section.items.forEach((item, iIdx) => {
        const itemId = `${this.storagePrefix}-${sIdx}-${iIdx}`;

        const itemDiv = document.createElement("div");
        itemDiv.className = "checklist-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = itemId;
        checkbox.setAttribute("data-item", itemId);

        const label = document.createElement("label");
        label.htmlFor = itemId;

        const link = document.createElement("a");
        link.href = item.link;
        link.target = "_blank";
        link.textContent = item.title;

        label.appendChild(link);
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        sectionDiv.appendChild(itemDiv);
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
    ).textContent = `${completed}/${this.total} action items completed`;
    localStorage.setItem(`${this.storagePrefix}-overall-percent`, percent);
  }
}

fragmentRegistry.register("branding", function initBrandingPage() {
  fetch("data/branding.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load checklist data");
      return response.json();
    })
    .then((checklistData) => {
      const controller = new BrandingChecklistController({
        containerId: "branding-checklist-container",
        progressBarId: "branding-progress-bar",
        progressTextId: "branding-progress-text",
        progressCountId: "branding-progress-count",
        storagePrefix: "branding",
        total: 15,
      });
      controller.init(checklistData);
    })
    .catch((error) => {
      console.error("Error loading branding checklist data:", error);
    });
});
