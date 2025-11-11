class ChallengeManager {
  constructor(containerId = "challenges-container") {
    this.container = document.getElementById(containerId);
    this.categories = new Set([
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
    ]);
    this.difficulties = new Set(["Easy", "Medium", "Hard"]);
  }

  async init() {
    const html = await this.loadHTML("templates/output.html");
    this.container.innerHTML = html;
    this.extractTagsFromCards();
    this.injectCategoryDatalist();
    this.injectDifficultyOptions();
    this.bindSolutionToggles();
    this.bindCompletionMarkers();
    this.bindBookmarkToggles();
    this.bindBookmarkView();
    this.bindTitleSearch();
    this.bindCategorySearch();
    this.bindClearCategory();
    this.bindDifficultyFilter();
    this.updateProgress();
  }

  async loadHTML(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Failed to load challenge HTML");
    return res.text();
  }

  extractTagsFromCards() {
    document.querySelectorAll(".challenge-card").forEach((card) => {
      const category = card.dataset.category || "";
      const difficulty = card.dataset.difficulty || "";
      category.split(",").forEach((tag) => this.categories.add(tag.trim()));
      if (difficulty.trim()) this.difficulties.add(difficulty.trim());
    });
  }

  injectCategoryDatalist() {
    const datalist = document.createElement("datalist");
    datalist.id = "category-list";
    this.categories.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      datalist.appendChild(option);
    });
    const input = document.getElementById("category-search");
    input.setAttribute("list", "category-list");
    document.getElementById("search-filter").appendChild(datalist);
  }

  injectDifficultyOptions() {
    const select = document.getElementById("difficulty-select");
    select.innerHTML = "";
    const allOption = new Option("All Difficulties", "All");
    select.appendChild(allOption);
    Array.from(this.difficulties)
      .sort()
      .forEach((level) => {
        select.appendChild(new Option(level, level));
      });
  }

  bindSolutionToggles() {
    document.querySelectorAll(".solution-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
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
  }

  bindCompletionMarkers() {
    document.querySelectorAll(".mark-complete-btn").forEach((btn) => {
      const id = btn.dataset.id;
      const key = `challenge-complete-${id}`;
      if (localStorage.getItem(key) === "true") {
        btn.classList.add("text-green-600", "dark:text-green-400");
      }
      btn.addEventListener("click", () => {
        localStorage.setItem(key, "true");
        btn.classList.add("text-green-600", "dark:text-green-400");
        this.updateProgress();
      });
    });
  }

  bindBookmarkToggles() {
    document.querySelectorAll(".bookmark-btn").forEach((btn) => {
      const id = btn.dataset.id;
      let bookmarks = JSON.parse(
        localStorage.getItem("bookmarked-challenges") || "[]"
      );
      if (bookmarks.includes(id)) btn.classList.add("bookmarked");

      btn.addEventListener("click", () => {
        if (!bookmarks.includes(id)) {
          bookmarks.push(id);
          btn.classList.add("bookmarked");
        } else {
          bookmarks = bookmarks.filter((x) => x !== id);
          btn.classList.remove("bookmarked");
        }
        localStorage.setItem(
          "bookmarked-challenges",
          JSON.stringify(bookmarks)
        );
      });
    });
  }

  bindBookmarkView() {
    document.getElementById("view-bookmarked").addEventListener("click", () => {
      const bookmarks = JSON.parse(
        localStorage.getItem("bookmarked-challenges") || "[]"
      );
      document.querySelectorAll(".challenge-card").forEach((card) => {
        card.style.display = bookmarks.includes(card.dataset.id) ? "" : "none";
      });
    });
  }

  bindTitleSearch() {
    document
      .getElementById("title-search")
      .addEventListener("input", function () {
        const value = this.value.trim().toLowerCase();
        document.querySelectorAll(".challenge-card").forEach((card) => {
          const title = card
            .querySelector(".challenge-title")
            .textContent.toLowerCase();
          card.style.display =
            title.includes(value) || value === "" ? "" : "none";
        });
      });
  }

  bindCategorySearch() {
    document
      .getElementById("category-search")
      .addEventListener("input", function () {
        const value = this.value.trim().toLowerCase();
        document.querySelectorAll(".challenge-card").forEach((card) => {
          const tags = (card.dataset.category || "").toLowerCase();
          card.style.display =
            tags.includes(value) || value === "" ? "" : "none";
        });
      });
  }

  bindClearCategory() {
    document
      .getElementById("clear-category-search")
      .addEventListener("click", () => {
        const input = document.getElementById("category-search");
        input.value = "";
        input.blur();
        document.querySelectorAll(".challenge-card").forEach((card) => {
          card.style.display = "";
        });
      });
  }

  bindDifficultyFilter() {
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
  }

  updateProgress() {
    const cards = document.querySelectorAll(".challenge-card");
    let completed = 0;
    cards.forEach((card) => {
      const id = card.dataset.id;
      const done = localStorage.getItem(`challenge-complete-${id}`) === "true";
      card.classList.toggle("completed", done);
      if (done) completed++;
    });

    const percent = cards.length
      ? Math.round((completed / cards.length) * 100)
      : 0;
    const bar = document.querySelector(".progress-bar");
    if (bar) bar.style.width = `${percent}%`;

    localStorage.setItem("coding-overall-percent", percent);

    const text = document.querySelector(".mt-2 span:first-child");
    const count = document.querySelector(".mt-2 span:last-child");
    if (text) text.textContent = `${percent}% completed`;
    if (count)
      count.textContent = `${completed}/${cards.length} challenges solved`;
  }
}

fragmentRegistry.register("challenges", function initChallengesPage() {
  const manager = new ChallengeManager();
  manager.init();
});
