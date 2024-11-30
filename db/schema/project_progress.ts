import { pgTable, text, timestamp, serial, integer } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//پیشرفت پروژه ها
const projectProgress = pgTable('project_progress', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    date: timestamp('date').notNull(),
    file: text('file').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const projectProgressRelations = relations(projectProgress, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [projectProgress.settingSite],
        references: [settingSite.id],
    }),
}));            

export type ProjectProgress = typeof projectProgress.$inferSelect;
export type NewProjectProgress = typeof projectProgress.$inferInsert;

export default projectProgress;
