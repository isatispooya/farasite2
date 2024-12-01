import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import brief_number from "./brief_number";
import brief_list from "./brief_list";
import brief_card from "./brief_card";
import { relations } from "drizzle-orm";

//سبدگردان
const brief = pgTable('brief', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    question: text('question').notNull(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    briefNumber: integer('brief_number').references(() => brief_number.id),
    briefList: integer('brief_list').references(() => brief_list.id),
    briefCard: integer('brief_card').references(() => brief_card.id)
})

export const briefRelations = relations(brief, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [brief.settingSite],
        references: [settingSite.id],
    }),
    briefNumber: one(brief_number, {
        fields: [brief.briefNumber],
        references: [brief_number.id],
    }),
    briefList: one(brief_list, {
        fields: [brief.briefList],
        references: [brief_list.id],
    }),
    briefCard: one(brief_card, {
        fields: [brief.briefCard],
        references: [brief_card.id],
    }),
}));    



export type Brief = typeof brief.$inferSelect;
export type NewBrief = typeof brief.$inferInsert;

export default brief;
