# 📊 Planner Hub Dashboard

A modular, responsive productivity dashboard built with **native JavaScript**, **HTML**, and **Tailwind CSS**. It tracks progress across multiple focus areas like AWS Certification, Coding, Resume Branding, German Language, and System Design — all powered by dynamic JSON-driven configuration.

---

## 🚀 Features

- ✅ Fragment-based routing using hash navigation (`#route`)
- ✅ Dynamic progress tracking via `localStorage`
- ✅ Centralized timeline management via `timeline.js`
- ✅ Responsive layout with Tailwind utility classes
- ✅ No frameworks or bundlers — pure HTML + JS
- ✅ Fully customizable via JSON — no hardcoded dates or values

---

## 🧠 How It Works

- **Routing**: Each sidebar link uses a `data-fragment` attribute. Clicking loads the corresponding HTML fragment and its script dynamically.
- **Progress**: Each module stores its progress percentage in `localStorage`, visualized via animated progress bars.
- **Timeline**: All deadlines, start dates, and end dates are defined in `scripts/timeline.js` and accessed globally via `window.TIMELINE`.
- **Customization**: Nothing is hardcoded — developers can modify `timeline.js` or other JSON-like structures to adapt the dashboard to any set of goals, timelines, or modules.

## 🛠️ How to Run Locally

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run start
   ```
3. **Open the dashboard in your browser**:
   Navigate to `http://localhost:3000` in your web browser.

The app is served using Express and runs on port 3000 by default.

## 📦 Requirements

- Node.js (v16 or higher recommended)
- Modern browser (Chrome, Firefox, Edge)
- JavaScript enabled
- No build tools or bundlers required

---

## 🧩 Customization

- All dates, deadlines, and progress logic are driven by `scripts/timeline.js`
- Developers can freely modify the structure to:
  - Change start and end dates
  - Add or remove modules
  - Rename sections or update deadlines
- Nothing is hardcoded — the dashboard adapts entirely from the JSON structure

---

## 🧼 Notes

- No dark mode components are included by default
- Tailwind CSS is loaded via CDN for styling
- All logic is written in **vanilla JavaScript** — no frameworks or libraries

---

## 📄 License

- MIT License
- Free to use, modify, and distribute for personal or commercial projects
