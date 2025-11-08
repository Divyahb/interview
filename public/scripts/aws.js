fragmentRegistry.register("aws", function initAwsChecklist() {
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
        weekDiv.className =
          "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6";

        const heading = document.createElement("h2");
        heading.className =
          "text-lg font-semibold text-blue-700 mb-3 border-b pb-1";
        heading.textContent = weekTitle;
        weekDiv.appendChild(heading);

        tasks.forEach((task, index) => {
          const key = `aws-task-${weekTitle}-${index}`;

          const label = document.createElement("label");
          label.className =
            "flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 mb-2 cursor-pointer";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className =
            "form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out";
          checkbox.checked = localStorage.getItem(key) === "true";
          checkbox.addEventListener("change", () => {
            localStorage.setItem(key, checkbox.checked);
            updateProgress();
          });

          const link = document.createElement("a");
          link.href = task.link;
          link.target = "_blank";
          link.textContent = task.text;
          link.className =
            "hover:underline text-blue-600 dark:text-blue-400 font-medium";

          label.appendChild(checkbox);
          label.appendChild(link);
          weekDiv.appendChild(label);

          totalTasks++;
          if (checkbox.checked) completedTasks++;
        });

        checklistContainer.appendChild(weekDiv);
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
});
