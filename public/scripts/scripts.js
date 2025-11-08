const routes = window.routes;

function initializeMenu() {
  const menuItems = document.querySelectorAll("#menu a");
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (event) => {
      event.preventDefault();
      const routeKey = menuItem.getAttribute("data-fragment");
      if (routeKey) {
        window.location.hash = routeKey;
        loadRoute(routeKey);
      }
    });
  });
}

function loadRoute(routeKey) {
  const route = routes[routeKey];
  const content = document.getElementById("content");

  if (!route) {
    return loadFallback(`Route not found: ${routeKey}`);
  }

  fetch(`./templates/${route.template}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load fragment");
      return response.text();
    })
    .then((html) => {
      content.innerHTML = html;
      document.title = route.title;

      const script = document.createElement("script");
      script.src = `./scripts/${route.script}`;
      script.onload = () => {
        const initFn = fragmentRegistry.get(route.key);
        if (typeof initFn === "function") {
          initFn();
        }
      };
      document.body.appendChild(script);
    })
    .catch((error) => {
      loadFallback(`Error loading ${route.template}: ${error.message}`);
    });
}

function loadFragmentScript(scriptName) {
  // Remove any existing script with the same src
  const existing = document.querySelector(
    `script[data-fragment-script="${scriptName}"]`
  );
  if (existing) {
    existing.remove();
  }

  // Create a new script tag with cache-busting query
  const script = document.createElement("script");
  script.src = `./scripts/${scriptName}?t=${Date.now()}`;
  script.type = "module";
  script.setAttribute("data-fragment-script", scriptName);
  document.body.appendChild(script);
}

function initializeScripts() {
  // Optional fragment-specific logic
}

function loadFallback(message) {
  const content = document.getElementById("content");
  content.innerHTML = `
    <section class="p-6 text-center text-red-600 space-y-4">
      <h2 class="text-xl font-semibold">⚠️ Content Unavailable</h2>
      <p>${message}</p>
      <button onclick="loadRoute('dashboard')" class="px-4 py-2 bg-blue-600 text-white rounded">
        Go to Dashboard
      </button>
    </section>
  `;
  document.title = "Error";
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMenu();
  const initialRoute = window.location.hash.replace("#", "") || "dashboard";
  loadRoute(initialRoute);
});

window.addEventListener("hashchange", () => {
  const routeKey = window.location.hash.replace("#", "");
  loadRoute(routeKey);
});
