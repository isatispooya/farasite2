import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import chart_founds from "./chart_founds";
import { relations } from "drizzle-orm";

//چارت بار
const chart_bar = pgTable('barchart', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    Introduction_of_Fund: integer('Introduction_of_Fund').references(() => chart_founds.id),
    title: text('title').notNull(),
    description: text('description').notNull()
})

export const chart_barRelations = relations(chart_bar, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [chart_bar.settingSite],
        references: [settingSite.id],
    }),
    Introduction_of_Fund: one(chart_founds, {
        fields: [chart_bar.Introduction_of_Fund],
        references: [chart_founds.id],
    }),
}));

export type Barchart = typeof chart_bar.$inferSelect;
export type NewBarchart = typeof chart_bar.$inferInsert;

export default chart_bar;
