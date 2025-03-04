import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type PublicUser = Omit<User, "password_hash">;
