import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";
import { categoryTable } from "./category.schema";
import { InferSelectModel } from "drizzle-orm";

export const transactionTable = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => categoryTable.id, { onDelete: "cascade" })
    .notNull(),
  amount: text("transaction_amount").notNull(),
  date: timestamp("transaction_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Trasaction = InferSelectModel<typeof transactionTable>;
