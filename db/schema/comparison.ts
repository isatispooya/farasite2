import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";    
import comparisonSections from "./comparison_sections";

//مقایسه
const comparison = pgTable('comparison', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  settingSite: integer('setting_site').references(() => settingSite.id),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),    
})        

export const comparisonRelations = relations(comparison, ({ one, many }) => ({
    settingSite: one(settingSite, {
        fields: [comparison.settingSite],
        references: [settingSite.id],
    }),
    comparisonSections: many(comparisonSections)            
}));

export type Comparison = typeof comparison.$inferSelect;
export type NewComparison = typeof comparison.$inferInsert;

export default comparison;