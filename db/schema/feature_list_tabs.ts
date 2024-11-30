
    import { serial, text, pgTable, integer, timestamp } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//محتوا
const feature_list_tabs = pgTable('content_tabs', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})  

export const contentTabsRelations = relations(feature_list_tabs, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [feature_list_tabs.settingSite],
        references: [settingSite.id],
    }),
}));

export type ContentTabs = typeof feature_list_tabs.$inferSelect;
export type NewContentTabs = typeof feature_list_tabs.$inferInsert;

export default feature_list_tabs;

