import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";
import { InferSelectModel } from "drizzle-orm";

export const categoryTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  categoryName: text("category_name").notNull(),
  categoryIcon: text("category_icon").notNull(),
  categoryType: text("category_type").notNull().$type<"income" | "expense">(),
});

export type Category = InferSelectModel<typeof categoryTable>;
