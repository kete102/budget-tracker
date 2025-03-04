import { z } from "zod";
import bcrypt from "bcryptjs";
import { userTable, PublicUser } from "../db/schemas/user.schema";
import { db } from "../drizzle";
import { PostgresError } from "postgres";
import { eq } from "drizzle-orm";
import { transactionHistoryTable } from "../db/schemas/transaction-history.schema";
import { categoryTable } from "../db/schemas/category.schema";
import { GetUserOverview } from "../../../shared/user/types";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

export const loginSchema = registerSchema.omit({ username: true });

export class UserModel {
  static async create({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) {
    try {
      //NOTE: Hash the password
      const hash_password = await bcrypt.hash(password, 10);

      //NOTE: Save the user in the db
      const [savedUser] = await db
        .insert(userTable)
        .values({
          email: email,
          username: username,
          password_hash: hash_password,
        })
        .returning();

      if (!savedUser) {
        throw new Error("Failed to create user");
      }

      //NOTE: Destructure the public user data to return it
      const publicUser: PublicUser = {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
        currency: savedUser.currency,
        balance: savedUser.balance,
        totalExpenses: savedUser.totalExpenses,
        totalIncome: savedUser.totalIncome,
      };

      return publicUser;
    } catch (error) {
      if (error instanceof PostgresError && error.code === "23505") {
        throw new Error("User already exists");
      }

      if (error instanceof PostgresError) {
        throw new Error(`Postgres error ${error.message}`);
      }

      throw new Error("Unexpected error");
    }
  }
  static async login({ email, password }: { email: string; password: string }) {
    try {
      //NOTE: check existing user
      const [existingUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email))
        .limit(1);

      if (!existingUser) {
        throw new Error("User not found");
      }
      //NOTE: check hash password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password_hash,
      );

      if (!isPasswordValid) {
        throw new Error("Incorrect password");
      }

      // NOTE: Return the public user data
      const publicUser: PublicUser = {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        currency: existingUser.currency,
        balance: existingUser.balance,
        totalExpenses: existingUser.totalExpenses,
        totalIncome: existingUser.totalIncome,
      };

      return publicUser;
    } catch (error) {
      if (error instanceof PostgresError) {
        throw new Error(`Postgres error ${error.message}`);
      }

      throw new Error("Unexpected error");
    }
  }
  static async getUserOverview({
    userId,
  }: {
    userId: string;
  }): Promise<GetUserOverview> {
    try {
      const [userResume] = await db
        .select({
          username: userTable.username,
          email: userTable.email,
          balance: userTable.balance,
          totalIncome: userTable.totalIncome,
          totalExpenses: userTable.totalExpenses,
        })
        .from(userTable)
        .where(eq(userTable.id, userId));

      const userTransactions = await db
        .select()
        .from(transactionHistoryTable)
        .where(eq(transactionHistoryTable.userId, userId));

      const userCategories = await db
        .select()
        .from(categoryTable)
        .where(eq(categoryTable.userId, userId));

      return { userResume, userTransactions, userCategories };
    } catch (error) {
      console.log(error);
      if (error instanceof PostgresError) {
        throw new Error(`Postgres error ${error.message}`);
      }

      throw new Error("Unexpected error");
    }
  }
}
