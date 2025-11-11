class AwsChecklistController {
  constructor(config) {
    this.containerId = config.containerId;
    this.progressBarId = config.progressBarId;
    this.progressTextId = config.progressTextId;
    this.storagePrefix = config.storagePrefix;
    this.data = {};
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

    Object.entries(this.data).forEach(([weekTitle, tasks]) => {
      const weekDiv = document.createElement("div");
      weekDiv.className =
        "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6";

      const heading = document.createElement("h2");
      heading.className =
        "text-lg font-semibold text-blue-700 mb-3 border-b pb-1";
      heading.textContent = weekTitle;
      weekDiv.appendChild(heading);

      tasks.forEach((task, index) => {
        const key = `${this.storagePrefix}-${weekTitle}-${index}`;

        const label = document.createElement("label");
        label.className =
          "flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 mb-2 cursor-pointer";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className =
          "form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out";
        checkbox.id = key;
        checkbox.checked = localStorage.getItem(key) === "true";

        const link = document.createElement("a");
        link.href = task.link;
        link.target = "_blank";
        link.textContent = task.text;
        link.className =
          "hover:underline text-blue-600 dark:text-blue-400 font-medium";

        label.appendChild(checkbox);
        label.appendChild(link);
        weekDiv.appendChild(label);
      });

      container.appendChild(weekDiv);
    });
  }

  restoreState() {
    Object.entries(this.data).forEach(([weekTitle, tasks]) => {
      tasks.forEach((task, index) => {
        const key = `${this.storagePrefix}-${weekTitle}-${index}`;
        const checkbox = document.getElementById(key);
        if (checkbox) {
          checkbox.checked = localStorage.getItem(key) === "true";
          checkbox.addEventListener("change", () => {
            localStorage.setItem(key, checkbox.checked ? "true" : "false");
            this.updateProgress();
          });
        }
      });
    });
  }

  updateProgress() {
    const allBoxes = document.querySelectorAll(
      `#${this.containerId} input[type='checkbox']`
    );
    const checked = Array.from(allBoxes).filter((cb) => cb.checked).length;
    const percent = allBoxes.length
      ? Math.round((checked / allBoxes.length) * 100)
      : 0;

    document.getElementById(this.progressBarId).style.width = `${percent}%`;
    document.getElementById(
      this.progressTextId
    ).textContent = `Progress: ${percent}%`;
    localStorage.setItem(`${this.storagePrefix}-overall-percent`, percent);
  }
}

fragmentRegistry.register("aws", function initAwsChecklist() {
  fetch("data/aws.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load checklist data");
      return response.json();
    })
    .then((checklistData) => {
      const controller = new AwsChecklistController({
        containerId: "checklist",
        progressBarId: "progress-bar",
        progressTextId: "progress-text",
        storagePrefix: "aws-task",
      });
      controller.init(checklistData);
    })
    .catch((error) => {
      console.error("Error loading AWS checklist:", error);
    });
});
