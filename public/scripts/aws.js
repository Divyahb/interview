(function initAwsChecklist() {
  fetch("./data/aws.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load checklist data");
      return response.json();
    })
    .then((checklistData) => {
      const checklistContainer = document.getElementById("checklist");
      const progressBar = document.getElementById("progress-bar");
      const progressText = document.getElementById("progress-text");

      let totalTasks = 0;
      let completedTasks = 0;

      Object.entries(checklistData).forEach(([weekTitle, tasks]) => {
        const weekDiv = document.createElement("div");
        weekDiv.className = "week";

        const heading = document.createElement("h2");
        heading.textContent = weekTitle;
        weekDiv.appendChild(heading);

        tasks.forEach((task, index) => {
          const label = document.createElement("label");
          const checkbox = document.createElement("input");
          const key = `aws-task-${weekTitle}-${index}`;
          checkbox.type = "checkbox";
          checkbox.checked = localStorage.getItem(key) === "true";
          checkbox.addEventListener("change", () => {
            localStorage.setItem(key, checkbox.checked);
            updateProgress();
          });

          label.appendChild(checkbox);

          const link = document.createElement("a");
          link.href = task.link;
          link.target = "_blank";
          link.textContent = task.text;
          label.appendChild(link);

          weekDiv.appendChild(label);
          checklistContainer.appendChild(weekDiv);

          totalTasks++;
          if (checkbox.checked) completedTasks++;
        });
      });

      function updateProgress() {
        const allBoxes = document.querySelectorAll("input[type='checkbox']");
        const checked = Array.from(allBoxes).filter((cb) => cb.checked).length;
        const percent = Math.round((checked / allBoxes.length) * 100);
        progressBar.style.width = percent + "%";
        progressText.textContent = `Progress: ${percent}%`;
        localStorage.setItem("aws-overall-percent", percent);
      }

      updateProgress();
    })
    .catch((error) => {
      console.error("Error loading AWS checklist:", error);
    });
})();
