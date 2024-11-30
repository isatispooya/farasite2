import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import contentTabs from "./feature_list_tabs";
import { relations } from "drizzle-orm";

//سوالات و جواب ها
const qaofcontenttabs = pgTable('qaofcontenttabs', {
    id: serial('id').primaryKey(),
    contentTab: integer('content_tab').references(() => contentTabs.id),         
    title: text('title').notNull(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    image: varchar('image', { length: 255 }),
    link: varchar('link', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const qaofcontenttabsRelations = relations(qaofcontenttabs, ({ one }) => ({
    contentTab: one(contentTabs, {
        fields: [qaofcontenttabs.contentTab],
        references: [contentTabs.id],
    }),
}));    

export type QAofContentTabs = typeof qaofcontenttabs.$inferSelect;
export type NewQAofContentTabs = typeof qaofcontenttabs.$inferInsert;

export default qaofcontenttabs;
