import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertLeadMagnetSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ success: true, id: submission.id });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationError.message 
        });
      }
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // Lead magnet submission endpoint
  app.post("/api/lead-magnet", async (req, res) => {
    try {
      const validatedData = insertLeadMagnetSubmissionSchema.parse(req.body);
      const submission = await storage.createLeadMagnetSubmission(validatedData);
      res.json({ success: true, id: submission.id });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationError.message 
        });
      }
      res.status(500).json({ error: "Failed to submit lead magnet form" });
    }
  });

  // Get all lead magnet submissions (for admin purposes)
  app.get("/api/lead-magnet-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllLeadMagnetSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lead magnet submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
