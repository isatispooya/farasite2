import { serial, timestamp, varchar, text, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//گروه بندی
const grouping = pgTable('grouping', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    icon: varchar('icon', { length: 255 }),
    url: varchar('url', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})   

export const groupingRelations = relations(grouping, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [grouping.settingSite],
        references: [settingSite.id],
    }),
}));

export type Grouping = typeof grouping.$inferSelect;
export type NewGrouping = typeof grouping.$inferInsert;

export default grouping;
