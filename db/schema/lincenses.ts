import { pgTable, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//لیسانس
const lincense = pgTable('lincenses', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    content: varchar('content', { length: 2000 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    settingSite: integer('setting_site').references(() => settingSite.id)
})

export const lincenseRelations = relations(lincense, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [lincense.settingSite],
        references: [settingSite.id],
    }),
}));

export type Lincense = typeof lincense.$inferSelect;
export type NewLincense = typeof lincense.$inferInsert;

export default lincense;

