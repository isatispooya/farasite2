import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";
import contentDrop from "./contentdrop";

//تب ویژگی
const tabVision = pgTable('tabvision', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title'),
    summary: text('summary').notNull(),
    Summernot_for_content: integer('Summernot_for_content').references(() => contentDrop.id)  
})      

export const tabVisionRelations = relations(tabVision, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [tabVision.settingSite],
        references: [settingSite.id],
    }),
    Summernot_for_content: one(contentDrop, {
        fields: [tabVision.Summernot_for_content],
        references: [contentDrop.id],
    }),
}));

export type TabVision = typeof tabVision.$inferSelect;
export type NewTabVision = typeof tabVision.$inferInsert;

export default tabVision;
