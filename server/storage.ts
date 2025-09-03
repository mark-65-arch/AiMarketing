import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type LeadMagnetSubmission, type InsertLeadMagnetSubmission, users, contactSubmissions, leadMagnetSubmissions } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createLeadMagnetSubmission(submission: InsertLeadMagnetSubmission): Promise<LeadMagnetSubmission>;
  getAllLeadMagnetSubmissions(): Promise<LeadMagnetSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return result[0];
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  async createLeadMagnetSubmission(insertSubmission: InsertLeadMagnetSubmission): Promise<LeadMagnetSubmission> {
    const result = await db.insert(leadMagnetSubmissions).values(insertSubmission).returning();
    return result[0];
  }

  async getAllLeadMagnetSubmissions(): Promise<LeadMagnetSubmission[]> {
    return await db.select().from(leadMagnetSubmissions);
  }
}

export const storage = new DatabaseStorage();
