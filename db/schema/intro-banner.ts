import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

const introBanner = pgTable('intro_banner', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    description: text('description').notNull(),
    question: text('question').notNull()
})

export const introBannerRelations = relations(introBanner, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [introBanner.settingSite],
        references: [settingSite.id],
    }),
}));    

export type IntroBanner = typeof introBanner.$inferSelect;
export type NewIntroBanner = typeof introBanner.$inferInsert;

export default introBanner;
