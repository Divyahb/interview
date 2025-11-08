function renderBrandingChecklist(brandingChecklistData) {
  const container = document.getElementById("branding-checklist-container");
  container.innerHTML = "";
  brandingChecklistData.forEach((section, sIdx) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "checklist-section";

    const heading = document.createElement("h3");
    heading.className = "text-lg font-semibold mb-2";
    heading.textContent = section.section;
    sectionDiv.appendChild(heading);

    section.items.forEach((item, iIdx) => {
      const itemId = `branding-${sIdx}-${iIdx}`;
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

function updateBrandingProgress(brandingChecklistData) {
  const total = 15;
  let completed = 0;
  brandingChecklistData.forEach((section, sIdx) => {
    section.items.forEach((item, iIdx) => {
      const itemId = `branding-${sIdx}-${iIdx}`;
      if (localStorage.getItem(itemId) === "true") completed++;
    });
  });
  const percent = Math.round((completed / total) * 100);
  document.getElementById("branding-progress-bar").style.width = percent + "%";
  document.getElementById(
    "branding-progress-text"
  ).textContent = `${percent}% completed`;
  document.getElementById(
    "branding-progress-count"
  ).textContent = `${completed}/${total} action items completed`;
  localStorage.setItem("branding-overall-percent", percent);
}

function initializeBrandingChecklist(brandingChecklistData) {
  renderBrandingChecklist(brandingChecklistData);
  brandingChecklistData.forEach((section, sIdx) => {
    section.items.forEach((item, iIdx) => {
      const itemId = `branding-${sIdx}-${iIdx}`;
      const checkbox = document.getElementById(itemId);
      if (localStorage.getItem(itemId) === "true") {
        checkbox.checked = true;
      }
      checkbox.addEventListener("change", function () {
        localStorage.setItem(itemId, this.checked ? "true" : "false");
        updateBrandingProgress(brandingChecklistData);
      });
    });
  });
  updateBrandingProgress(brandingChecklistData);
}

fragmentRegistry.register("branding", function initBrandingPage() {
  fetch("../data/branding.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load checklist data");
      return response.json();
    })
    .then((checklistData) => {
      brandingChecklistData = checklistData;
      initializeBrandingChecklist(brandingChecklistData);
    });
});
