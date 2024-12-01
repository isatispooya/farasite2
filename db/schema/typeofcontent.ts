import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//نوع محتوا
const typeofContent = pgTable('typeofcontent', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const typeofContentRelations = relations(typeofContent, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [typeofContent.settingSite],
        references: [settingSite.id],
    }),
}));

export type TypeofContent = typeof typeofContent.$inferSelect;
export type NewTypeofContent = typeof typeofContent.$inferInsert;

export default typeofContent;
