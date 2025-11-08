fragmentRegistry.register("challenges", function initChallengesPage() {
  fetch("./output.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("challenges-container").innerHTML = html;
      initializeChallengeFeatures();
    });

  function initializeChallengeFeatures() {
    const categories = [
      "Arrays",
      "Strings",
      "Trees",
      "Graphs",
      "HashMap",
      "Linked List",
      "Sliding Window",
      "Binary Search",
      "Expand Around Center",
      "Deque",
      "Two Pointers",
      "Stack",
      "Dynamic Programming",
      "Backtracking",
      "Heap",
      "Matrix",
      "System Design",
      "Javascript",
      "Design",
      "Intervals",
      "Prefix Sum",
      "Recursion",
      "DFS",
      "BFS",
      "Trie",
      "Knapsack",
      "Simulation",
      "Voting Algorithm",
      "Center Expansion",
      "Greedy",
      "In-Place",
      "Preprocessing",
      "Optimization",
      "Timer",
      "Validation",
      "Bit Manipulation",
    ];

    const difficulties = ["Easy", "Medium", "Hard"];

    document.querySelectorAll(".challenge-card").forEach((card) => {
      const category = card.dataset.category || "";
      const difficulty = card.dataset.difficulty || "";

      category.split(",").forEach((tag) => {
        if (tag.trim()) categories.add(tag.trim());
      });

      if (difficulty.trim()) difficulties.add(difficulty.trim());
    });

    // Inject category datalist
    const datalist = document.createElement("datalist");
    datalist.id = "category-list";
    categories.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      datalist.appendChild(option);
    });
    const categoryInput = document.getElementById("category-search");
    categoryInput.setAttribute("list", "category-list");
    document.getElementById("search-filter").appendChild(datalist);

    // Inject difficulty options
    const select = document.getElementById("difficulty-select");
    select.innerHTML = "";
    const allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All Difficulties";
    select.appendChild(allOption);
    Array.from(difficulties)
      .sort()
      .forEach((level) => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        select.appendChild(option);
      });

    // Solution toggle
    document.querySelectorAll(".solution-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const card = btn.closest(".challenge-card");
        const solution = card.querySelector(".solution-toggle");
        const icon = btn.querySelector("i");
        const label = btn.querySelector("span");

        const isHidden = solution.classList.contains("hidden");
        solution.classList.toggle("hidden", !isHidden);
        solution.classList.toggle("active", isHidden);
        icon.classList.toggle("fa-chevron-down", !isHidden);
        icon.classList.toggle("fa-chevron-up", isHidden);
        label.textContent = isHidden ? "Hide Solution" : "View Solution";
      });
    });

    // Mark as complete
    document.querySelectorAll(".mark-complete-btn").forEach((btn) => {
      const challengeId = btn.dataset.id;
      const key = `challenge-complete-${challengeId}`;
      if (localStorage.getItem(key) === "true") {
        btn.classList.add("text-green-600", "dark:text-green-400");
      }
      btn.addEventListener("click", function () {
        localStorage.setItem(key, "true");
        btn.classList.add("text-green-600", "dark:text-green-400");
        updateOverallProgress();
      });
    });

    // Bookmark toggle
    document.querySelectorAll(".bookmark-btn").forEach((btn) => {
      const challengeId = btn.dataset.id;
      let bookmarks = JSON.parse(
        localStorage.getItem("bookmarked-challenges") || "[]"
      );
      if (bookmarks.includes(challengeId)) {
        btn.classList.add("bookmarked");
      }

      btn.addEventListener("click", function () {
        if (!bookmarks.includes(challengeId)) {
          bookmarks.push(challengeId);
          btn.classList.add("bookmarked");
        } else {
          bookmarks = bookmarks.filter((id) => id !== challengeId);
          btn.classList.remove("bookmarked");
        }
        localStorage.setItem(
          "bookmarked-challenges",
          JSON.stringify(bookmarks)
        );
      });
    });

    // View bookmarked
    document
      .getElementById("view-bookmarked")
      .addEventListener("click", function () {
        const bookmarks = JSON.parse(
          localStorage.getItem("bookmarked-challenges") || "[]"
        );
        document.querySelectorAll(".challenge-card").forEach((card) => {
          card.style.display = bookmarks.includes(card.dataset.id)
            ? ""
            : "none";
        });
      });

    // Title search
    document
      .getElementById("title-search")
      .addEventListener("input", function () {
        const searchValue = this.value.trim().toLowerCase();
        document.querySelectorAll(".challenge-card").forEach((card) => {
          const title = card
            .querySelector(".challenge-title")
            .textContent.toLowerCase();
          card.style.display =
            title.includes(searchValue) || searchValue === "" ? "" : "none";
        });
      });

    // Category search
    document
      .getElementById("category-search")
      .addEventListener("input", function () {
        const searchValue = this.value.trim().toLowerCase();
        document.querySelectorAll(".challenge-card").forEach((card) => {
          const tags = (card.dataset.category || "").toLowerCase();
          card.style.display =
            tags.includes(searchValue) || searchValue === "" ? "" : "none";
        });
      });

    // Clear category search
    document
      .getElementById("clear-category-search")
      .addEventListener("click", function () {
        const input = document.getElementById("category-search");
        input.value = "";
        input.blur();
        document.querySelectorAll(".challenge-card").forEach((card) => {
          card.style.display = "";
        });
      });

    // Difficulty filter
    document
      .getElementById("difficulty-select")
      .addEventListener("change", function () {
        const selected = this.value;
        document.querySelectorAll(".challenge-card").forEach((card) => {
          const level = card.dataset.difficulty || "";
          card.style.display =
            selected === "All" || level === selected ? "" : "none";
        });
      });

    updateOverallProgress();
  }

  function updateOverallProgress() {
    const cards = document.querySelectorAll(".challenge-card");
    let completed = 0;
    cards.forEach((card) => {
      const challengeId = card.dataset.id;
      if (
        localStorage.getItem(`challenge-complete-${challengeId}`) === "true"
      ) {
        completed++;
        card.classList.add("completed");
      } else {
        card.classList.remove("completed");
      }
    });

    const percent = cards.length
      ? Math.round((completed / cards.length) * 100)
      : 0;
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) progressBar.style.width = `${percent}%`;

    localStorage.setItem("coding-overall-percent", percent);

    const progressText = document.querySelector(".mt-2 span:first-child");
    const progressCount = document.querySelector(".mt-2 span:last-child");
    if (progressText) progressText.textContent = `${percent}% completed`;
    if (progressCount)
      progressCount.textContent = `${completed}/${cards.length} challenges solved`;
  }
});
