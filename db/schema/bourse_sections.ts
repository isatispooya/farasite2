import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import bourse_content from "./bourse_content";
import bourse_card from "./bourse_card";
import { settingSite } from "./setting_site";
import { relations } from "drizzle-orm";

//بخش بورس
const bourse_sections = pgTable('bourse_sections', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    bourse_content: integer('bourse_content').references(() => bourse_content.id),
    bourse_card: integer('bourse_card').references(() => bourse_card.id),
    setting_site: integer('setting_site').references(() => settingSite.id)
})

export const bourseSectionsRelations = relations(bourse_sections, ({ one }) => ({
    bourseContent: one(bourse_content, {
        fields: [bourse_sections.bourse_content],
        references: [bourse_content.id],
    }),
    bourseCard: one(bourse_card, {
        fields: [bourse_sections.bourse_card],
        references: [bourse_card.id],
    }),
    settingSite: one(settingSite, {
        fields: [bourse_sections.setting_site],
        references: [settingSite.id],
    }),
}));

export type BourseSections = typeof bourse_sections.$inferSelect;
export type NewBourseSections = typeof bourse_sections.$inferInsert;

export default bourse_sections;
