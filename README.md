# Budget Tracker Web App

## 🚀 Project Overview
This is a web application for tracking personal finances. Users can log income and expenses, categorize transactions, and visualize financial trends through charts. The app supports multiple currencies and aims to provide insights into spending habits.

## 🛠 Tech Stack

### **Frontend:**
- React
- TypeScript
- React Router
- TanStack Form
- TailwindCSS
- Chart libraries (TBD)

### **Backend:**
- TypeScript
- Express
- Zod

### **Database:**
- PostgreSQL
- Drizzle ORM (running in a Docker container)

### **Authentication:**
- JWT (JSON Web Tokens)

## 📌 Features

### ✅ Implemented:
- Users can **add expenses and income**, specifying category and amount.
- **Multi-currency support** (EUR, USD, JPY, GBP).
- **Charts** to visualize income/expense trends and category breakdowns.

### 🔜 Coming Soon:
- Users will be able to **download a transaction summary**.
- Further refinements to the **Home Page**, including informative sections and upcoming features.
- Additional **data insights and reporting**.

## 🏗 Installation & Setup

### Prerequisites:
- Node >22 & pnpm
- Docker (for PostgreSQL container)

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/budget-tracker.git
   cd budget-tracker
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the database container:
   ```sh
   docker-compose up -d
   ```
4. Run the backend:
   ```sh
   cd backend
   pnpm run dev
   ```
5. Run the frontend:
   ```sh
   cd frontend
   pnpm run dev
   ```

## 🛠 Environment Variables

Create a `.env` file in the backend directory with:
```
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

## 📌 Contribution & Future Enhancements
We welcome contributions! Future enhancements include:
- Advanced analytics & insights
- Custom budget setting
- Recurring transactions support

Feel free to fork the repo and submit PRs! 🎉

