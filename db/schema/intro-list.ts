import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";    
import list from "./list";

//لیست اولین صفحه
const introList = pgTable('intro_list', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    list:integer('list').references(() => list.id)       
})  

export const introListRelations = relations(introList, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [introList.settingSite],
        references: [settingSite.id],
    }),
    list: one(list, {
        fields: [introList.list],
        references: [list.id],
    }), 
}));    

export type IntroList = typeof introList.$inferSelect;
export type NewIntroList = typeof introList.$inferInsert;

export default introList;


