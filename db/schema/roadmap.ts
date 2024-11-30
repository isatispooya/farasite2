import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

const roadmap = pgTable("roadmap", {
  id: serial("id").primaryKey(),
  settingSite: integer("setting_site").references(() => settingSite.id),
  title: text("title").notNull(),
  cartDescription: text("cart_description"),
  color: varchar("color", { length: 255 }),
  sort: integer("sort"),
  description: text("description"),
})

export const roadmapRelations = relations(roadmap, ({ one }) => ({
  settingSite: one(settingSite, {
    fields: [roadmap.settingSite],
    references: [settingSite.id],
  }),
}));    

export type Roadmap = typeof roadmap.$inferSelect;
export type NewRoadmap = typeof roadmap.$inferInsert;

export default roadmap;