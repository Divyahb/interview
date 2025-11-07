function renderChecklist(checklistData) {
  const container = document.getElementById("checklist-container");
  container.innerHTML = "";
  checklistData.forEach((section, sIdx) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "checklist-section";
    sectionDiv.innerHTML = `<h3 class="text-lg font-semibold mb-2">${section.section}</h3>`;
    section.items.forEach((item, iIdx) => {
      const itemId = `german-${sIdx}-${iIdx}`;
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

// Update progress bar and text
function updateProgress() {
  const total = 24;
  let completed = 0;
  checklistData.forEach((section, sIdx) => {
    section.items.forEach((item, iIdx) => {
      const itemId = `german-${sIdx}-${iIdx}`;
      if (localStorage.getItem(itemId) === "true") completed++;
    });
  });
  const percent = Math.round((completed / total) * 100);
  document.getElementById("overall-progress-bar").style.width = percent + "%";
  document.getElementById(
    "overall-progress-text"
  ).textContent = `${percent}% completed`;
  document.getElementById(
    "overall-progress-count"
  ).textContent = `${completed}/${total} lessons completed`;
  localStorage.setItem("german-overall-percent", percent);
}

// Initialize checklist and progress
function initializeGermanChecklist(checklistData) {
  renderChecklist(checklistData);
  // Restore checked state
  checklistData.forEach((section, sIdx) => {
    section.items.forEach((item, iIdx) => {
      const itemId = `german-${sIdx}-${iIdx}`;
      const checkbox = document.getElementById(itemId);
      if (localStorage.getItem(itemId) === "true") {
        checkbox.checked = true;
      }
      checkbox.addEventListener("change", function () {
        localStorage.setItem(itemId, this.checked ? "true" : "false");
        updateProgress();
      });
    });
  });
  updateProgress();
}
fetch("../data/german.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to load checklist data");
    return response.json();
  })
  .then((checklistData) => {
    // Render checklist
    initializeGermanChecklist(checklistData);
  })
  .catch((error) => {
    console.error("Error loading German checklist data:", error);
  });
