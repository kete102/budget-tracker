import { InferSelectModel } from "drizzle-orm";
import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  currency: text("currency").default("USD").notNull(),
  balance: numeric("balance", { precision: 20, scale: 2 })
    .notNull()
    .default("0"),
  totalIncome: numeric("total_income", { precision: 20, scale: 2 })
    .notNull()
    .default("0"),
  totalExpenses: numeric("total_expenses", { precision: 20, scale: 2 })
    .notNull()
    .default("0"),
});

export type User = InferSelectModel<typeof userTable>;
export type PublicUser = Omit<User, "password_hash">;
