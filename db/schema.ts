import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const jobs = sqliteTable("jobs", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  postcode: text("postcode").notNull(),
  town: text("town").notNull().default(""),
  category: text("category").notNull(),
  urgency: text("urgency").notNull(),
  propertyType: text("property_type").notNull(),
  description: text("description").notNull(),
  photoKeys: text("photo_keys").notNull().default("[]"),
  consent: integer("consent", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("submitted"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const contractorApplications = sqliteTable("contractor_applications", {
  id: text("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  postcode: text("postcode").notNull(),
  serviceRadius: text("service_radius").notNull(),
  yearsExperience: integer("years_experience").notNull(),
  companyNumber: text("company_number").notNull().default(""),
  insuranceConfirmed: integer("insurance_confirmed", { mode: "boolean" }).notNull().default(false),
  services: text("services").notNull().default("[]"),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
