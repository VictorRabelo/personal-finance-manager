# Personal Finance Manager

A simple, intuitive, and mobile-first **Personal Finance Manager** built with **React 18+**, **TailwindCSS**, and **Context API/Zustand**.
This project follows **Clean Code**, **Clean Architecture**, and **responsive-first design principles**, making it scalable, maintainable, and user-friendly.

## 🚀 Features

- **Budget Categories**: Configurable categories such as Fixed Costs, Comfort, Goals, Pleasures, Financial Freedom, and Knowledge.
- **Dynamic Sliders**: Adjust percentages for each category (total must equal 100%).
- **Expense Control**: Manual input of expenses per category with automatic calculation of spent vs. remaining budget.
- **Interactive Dashboard**:
  - Donut/Pie chart for category distribution
  - Progress bars with visual feedback
  - Detailed expense table
  - Total spent and remaining balance
- **Persistence**: LocalStorage to keep data across sessions.
- **Dark/Light Theme Toggle**.
- **Language Toggle (EN ↔ PT-BR)**.

## 🛠️ Tech Stack

- **React 18+** (functional components + hooks)
- **TailwindCSS** (modern and mobile-first UI)
- **Context API or Zustand** (lightweight state manager)
- **Recharts or Chart.js** (interactive charts)
- **localStorage** (data persistence)

## 📈 Future Improvements (Planned for v2.0)

- Expense history (month/year view)
- Goal tracking (planned vs achieved)
- Local alerts/notifications (e.g., category reaches 80% usage)
- Backend API integration (FastAPI) for synchronization and multi-user support

## 📂 Project Structure

```
/src
  /components   → Reusable UI components
  /contexts     → Global state management (Context API or Zustand)
  /hooks        → Custom React hooks
  /i18n         → Internationalization (EN ↔ PT-BR)
  /lib          → External libraries, config helpers or adapters
  /pages        → Main application pages (Dashboard, Settings, etc.)
  /types        → TypeScript types and interfaces
  App.tsx       → Main application component
  App.css       → Global app styles
  index.css     → Tailwind base styles
  main.tsx      → Application entry point
  vite-env.d.ts → Vite environment typings
```

## 🧑‍💻 Clean Code & Architecture Guidelines

- Keep components **small, reusable, and single-responsibility**.
- Use **hooks** for logic separation.
- Maintain a clear separation between **UI, domain logic, and data handling**.
- Follow **consistent naming conventions**.
- Ensure the app is **mobile-first** and responsive.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VictorRabelo/personal-finance-manager.git
   cd personal-finance-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open in your browser:
   ```
   http://localhost:8080
   ```

## 📜 License

This project is licensed under the MIT License.
Feel free to use, modify, and share it.

---

### Author

Developed by **Victor Rabelo** as a personal project and portfolio piece.