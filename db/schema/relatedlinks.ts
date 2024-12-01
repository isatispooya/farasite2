import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//لینک  های مرتبط
const relatedLinks = pgTable('relatedlinks', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    link: varchar('link', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const relatedLinksRelations = relations(relatedLinks, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [relatedLinks.settingSite],
        references: [settingSite.id],
    }),
}));

export type RelatedLinks = typeof relatedLinks.$inferSelect;
export type NewRelatedLinks = typeof relatedLinks.$inferInsert;

export default relatedLinks;
