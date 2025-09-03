import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type").notNull(),
  message: text("message"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const leadMagnetSubmissions = pgTable("lead_magnet_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  businessType: text("business_type").notNull(),
  leadMagnetType: text("lead_magnet_type").notNull(), // audit, guide, checklist, calendar, calculator
  additionalInfo: text("additional_info"), // For specific questions per lead magnet
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  businessType: true,
  message: true,
});

export const insertLeadMagnetSubmissionSchema = createInsertSchema(leadMagnetSubmissions).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  businessType: true,
  leadMagnetType: true,
  additionalInfo: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertLeadMagnetSubmission = z.infer<typeof insertLeadMagnetSubmissionSchema>;
export type LeadMagnetSubmission = typeof leadMagnetSubmissions.$inferSelect;
