class Router {
  constructor(routes) {
    this.routes = routes;
    this.contentEl = document.getElementById("content");
    this.menuEl = document.getElementById("menu");
  }

  init() {
    this.bindMenu();
    this.bindHashChange();
    const initialRoute = window.location.hash.replace("#", "") || "dashboard";
    this.loadRoute(initialRoute);
  }

  bindMenu() {
    const menuItems = this.menuEl.querySelectorAll("a");
    menuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const routeKey = item.getAttribute("data-fragment");
        if (routeKey) {
          window.location.hash = routeKey;
          this.loadRoute(routeKey);
        }
      });
    });
  }

  bindHashChange() {
    window.addEventListener("hashchange", () => {
      const routeKey = window.location.hash.replace("#", "");
      this.loadRoute(routeKey);
    });
  }

  loadRoute(routeKey) {
    const route = this.routes[routeKey];
    if (!route) {
      return this.loadFallback(`Route not found: ${routeKey}`);
    }

    fetch(`./templates/${route.template}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load fragment");
        return res.text();
      })
      .then((html) => {
        this.contentEl.innerHTML = html;
        document.title = route.title;
        this.loadFragmentScript(route.script, route.key);
      })
      .catch((err) => {
        this.loadFallback(`Error loading ${route.template}: ${err.message}`);
      });
  }

  loadFragmentScript(scriptName, routeKey) {
    const existing = document.querySelector(
      `script[data-fragment-script="${scriptName}"]`
    );
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = `./scripts/${scriptName}?t=${Date.now()}`;
    script.type = "module";
    script.setAttribute("data-fragment-script", scriptName);
    script.onload = () => {
      const initFn = fragmentRegistry.get(routeKey);
      if (typeof initFn === "function") {
        initFn();
      }
    };
    document.body.appendChild(script);
  }

  loadFallback(message) {
    this.contentEl.innerHTML = `
      <section class="p-6 text-center text-red-600 space-y-4">
        <h2 class="text-xl font-semibold">⚠️ Content Unavailable</h2>
        <p>${message}</p>
        <button onclick="window.router.loadRoute('dashboard')" class="px-4 py-2 bg-blue-600 text-white rounded">
          Go to Dashboard
        </button>
      </section>
    `;
    document.title = "Error";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.router = new Router(window.routes);
  window.router.init();
});
