import { pgTable, text, varchar, boolean, integer, timestamp, serial } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import grouping from "./grouping";
import { relations } from "drizzle-orm";

//اخبار
const news = pgTable('news', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    grouping: integer('grouping').references(() => grouping.id),
    title: text('title').notNull(),
    content: text('content').notNull(),
    shortDescription: text('short_description'),
    keywords: text('keywords'),
    route: varchar('route', { length: 255 }),
    picture: varchar('picture', { length: 255 }),
    isShow: boolean('is_show').default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const newsRelations = relations(news, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [news.settingSite],
        references: [settingSite.id],
    }),
    grouping: one(grouping, {
        fields: [news.grouping], 
        references: [grouping.id],
    }),
}));

export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;

export default news;
