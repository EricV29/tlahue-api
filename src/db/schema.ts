import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  startDate: timestamp("start_at"),
  endDate: timestamp("end_at"),
  description: text("description").notNull(),
  image: text("image").notNull(),
  location: text("location").notNull(),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const goverment = pgTable("goverment", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  degree: text("degree"),
  phone: text("phone"),
  ext: text("ext"),
  email: text("email"),
  image: text("image").notNull(),
  textSvg: text("textSvg").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  nameCreator: text("name_creator"),
  linkOrigin: text("link_origin"),
  location: text("location"),
  locationLink: text("location_link"),
  captureAt: timestamp("capture_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const imageCategories = pgTable("image_categories", {
  imageId: integer("image_id").references(() => images.id),
  categoryId: integer("category_id").references(() => categories.id),
});
