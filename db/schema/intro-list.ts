import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";    

const introList = pgTable('intro_list', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
})  

export const introListRelations = relations(introList, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [introList.settingSite],
        references: [settingSite.id],
    }),
}));    

export type IntroList = typeof introList.$inferSelect;
export type NewIntroList = typeof introList.$inferInsert;

export default introList;


