import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

const list = pgTable('list', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    list: text('list').notNull(),
})

export const listRelations = relations(list, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [list.settingSite],
        references: [settingSite.id],
    }),
}));    

export type List = typeof list.$inferSelect;
export type NewList = typeof list.$inferInsert;

export default list;
