import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type LeadMagnetSubmission, type InsertLeadMagnetSubmission, users, contactSubmissions, leadMagnetSubmissions } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

// Initialize database only if DATABASE_URL is available
let db: any = null;
if (process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL!);
  db = drizzle(sql);
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createLeadMagnetSubmission(submission: InsertLeadMagnetSubmission): Promise<LeadMagnetSubmission>;
  getAllLeadMagnetSubmissions(): Promise<LeadMagnetSubmission[]>;
}

// In-memory storage for development when no database is available
export class MemoryStorage implements IStorage {
  private users: User[] = [];
  private contactSubmissions: ContactSubmission[] = [];
  private leadMagnetSubmissions: LeadMagnetSubmission[] = [];
  private nextUserId = 1;
  private nextContactId = 1;
  private nextLeadMagnetId = 1;

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: (this.nextUserId++).toString(),
      username: insertUser.username,
      password: insertUser.password,
    };
    this.users.push(user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const submission: ContactSubmission = {
      id: (this.nextContactId++).toString(),
      firstName: insertSubmission.firstName,
      lastName: insertSubmission.lastName,
      email: insertSubmission.email,
      phone: insertSubmission.phone,
      businessType: insertSubmission.businessType,
      message: insertSubmission.message,
      submittedAt: new Date(),
    };
    this.contactSubmissions.push(submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return this.contactSubmissions;
  }

  async createLeadMagnetSubmission(insertSubmission: InsertLeadMagnetSubmission): Promise<LeadMagnetSubmission> {
    const submission: LeadMagnetSubmission = {
      id: (this.nextLeadMagnetId++).toString(),
      firstName: insertSubmission.firstName,
      lastName: insertSubmission.lastName,
      email: insertSubmission.email,
      phone: insertSubmission.phone ?? null,
      businessType: insertSubmission.businessType,
      leadMagnetType: insertSubmission.leadMagnetType,
      additionalInfo: insertSubmission.additionalInfo || null,
      submittedAt: new Date(),
    };
    this.leadMagnetSubmissions.push(submission);
    return submission;
  }

  async getAllLeadMagnetSubmissions(): Promise<LeadMagnetSubmission[]> {
    return this.leadMagnetSubmissions;
  }
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

// Use in-memory storage if no database is available, otherwise use database storage
export const storage = db ? new DatabaseStorage() : new MemoryStorage();

// Log which storage implementation is being used
if (process.env.NODE_ENV === 'development') {
  console.log(`🗄️  Using ${db ? 'database' : 'in-memory'} storage for development`);
}
