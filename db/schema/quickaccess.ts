import { pgTable, varchar, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//سریع دسترسی
const quickAccess = pgTable('quickaccess', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    url: varchar('url', { length: 255 }).notNull(),
    picture: varchar('picture', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()   
})

export const quickAccessRelations = relations(quickAccess, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [quickAccess.settingSite],
        references: [settingSite.id],
    }),
}));

export type QuickAccess = typeof quickAccess.$inferSelect;
export type NewQuickAccess = typeof quickAccess.$inferInsert;

export default quickAccess;
