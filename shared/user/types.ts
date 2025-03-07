export interface UserResume {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  currency: string;
  balance: string;
  totalIncome: string;
  totalExpenses: string;
}

export interface UserTransactions {
  id: string;
  transactionId: string;
  userId: string;
  action: "created" | "updated" | "deleted";
  oldValue: string;
  newValue: string;
  timestamp: Date;
}

export interface UserCategories {
  id: string;
  userId: string;
  categoryName: string;
  categoryIcon: string;
  categoryType: "income" | "expense";
}

export interface GetUserOverview {
  userResume: UserResume;
  userTransactions: UserTransactions[] | [];
  userCategories: UserCategories[] | [];
}
