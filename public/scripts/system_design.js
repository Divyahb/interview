fetch("../data/design.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to load challenges data");
    return response.json();
  })
  .then((systemDesignChallenges) => {
    initializeSystemDesignChecklist(systemDesignChallenges);
  })
  .catch((error) => {
    console.error("Error loading challenges:", error);
  });

function renderSystemDesignChecklist(systemDesignChallenges) {
  const container = document.getElementById(
    "system-design-checklist-container"
  );
  container.innerHTML = "";
  systemDesignChallenges.forEach((challenge, idx) => {
    const itemId = `system-design-${idx}`;
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

function updateSystemDesignProgress(systemDesignChallenges) {
  const total = systemDesignChallenges.length;
  let completed = 0;
  systemDesignChallenges.forEach((_, idx) => {
    const itemId = `system-design-${idx}`;
    if (localStorage.getItem(itemId) === "true") completed++;
  });
  const percent = Math.round((completed / total) * 100);
  document.getElementById("system-design-progress-bar").style.width =
    percent + "%";
  document.getElementById(
    "system-design-progress-text"
  ).textContent = `${percent}% completed`;
  document.getElementById(
    "system-design-progress-count"
  ).textContent = `${completed}/${total} challenges completed`;
  localStorage.setItem("system-design-overall-percent", percent);
}

function initializeSystemDesignChecklist(systemDesignChallenges) {
  renderSystemDesignChecklist(systemDesignChallenges);
  systemDesignChallenges.forEach((_, idx) => {
    const itemId = `system-design-${idx}`;
    const checkbox = document.getElementById(itemId);
    if (localStorage.getItem(itemId) === "true") {
      checkbox.checked = true;
    }
    checkbox.addEventListener("change", function () {
      localStorage.setItem(itemId, this.checked ? "true" : "false");
      updateSystemDesignProgress();
    });
  });
  updateSystemDesignProgress(systemDesignChallenges);
}
