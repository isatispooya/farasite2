import { timestamp, varchar } from "drizzle-orm/pg-core";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//تاریخچه شرکت ها
const historyOfCompanies = pgTable('history_of_companies', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    paragraph: text('paragraph'),
    picture: varchar('picture', { length: 255 }),
    video: varchar('video', { length: 255 }),
    icon: varchar('icon', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),                  
})                      

export const historyOfCompaniesRelations = relations(historyOfCompanies, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [historyOfCompanies.settingSite],
        references: [settingSite.id],
    }),
})); 

export type HistoryOfCompanies = typeof historyOfCompanies.$inferSelect;
export type NewHistoryOfCompanies = typeof historyOfCompanies.$inferInsert;

export default historyOfCompanies;
