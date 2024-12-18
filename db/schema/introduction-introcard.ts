import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";
import introduction_card from "./introduction_card";

//کارت اولین صفحه
const introductionIntrocard = pgTable('introduction_introcard', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    introduction_card: integer('introduction_card').references(() => introduction_card.id)      
})

export const introductionIntrocardRelations = relations(introductionIntrocard, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [introductionIntrocard.settingSite],
        references: [settingSite.id],
    }),
    introductionCard: one(introduction_card, {
        fields: [introductionIntrocard.introduction_card],
        references: [introduction_card.id],
    }), 
}));    

export  type IntroductionIntrocard = typeof introductionIntrocard.$inferSelect;
export type NewIntroductionIntrocard = typeof introductionIntrocard.$inferInsert;

export default introductionIntrocard;


