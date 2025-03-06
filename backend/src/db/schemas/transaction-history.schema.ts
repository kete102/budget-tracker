import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";
import { transactionTable } from "./transaction.schema";
import { InferInsertModel } from "drizzle-orm";

export const transactionHistoryTable = pgTable("transaction_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  transactionId: uuid("transaction_id")
    .references(() => transactionTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  action: text("action").notNull().$type<"created" | "updated" | "deleted">(),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type Transaction = InferInsertModel<typeof transactionHistoryTable>;
