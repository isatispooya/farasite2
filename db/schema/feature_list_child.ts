import { serial, timestamp } from "drizzle-orm/pg-core";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import contentTabs from "./feature_list_tabs";
import { relations } from "drizzle-orm";

//زیر ویژگی ها
const feature_list_Child = pgTable('content_feature_list_child', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    icon: varchar('icon', { length: 255 }),
    contentTabs: integer('content_tabs').references(() => contentTabs.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const contentListChildRelations = relations(feature_list_Child, ({ one }) => ({
    contentTabs: one(contentTabs, {
        fields: [feature_list_Child.contentTabs],
        references: [contentTabs.id],
    }),
}));

export type ContentListChild = typeof feature_list_Child.$inferSelect;
export type NewContentListChild = typeof feature_list_Child.$inferInsert;

export default feature_list_Child;
