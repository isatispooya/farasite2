import { integer, pgTable, text, timestamp, varchar, serial } from "drizzle-orm/pg-core";
import comparison from "./comparison";
import { relations } from "drizzle-orm";

//بخش های مقایسه
const comparisonSections = pgTable('comparison_sections', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    comparison: integer('comparison').references(() => comparison.id),
    description: text('description'),
    image: varchar('image', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),      
})      

export const comparisonSectionsRelations = relations(comparisonSections, ({ one }) => ({
    comparison: one(comparison, {
        fields: [comparisonSections.comparison],
        references: [comparison.id],
    }),

}));

export type ComparisonSections = typeof comparisonSections.$inferSelect;    
export type NewComparisonSections = typeof comparisonSections.$inferInsert;

export default comparisonSections;  
