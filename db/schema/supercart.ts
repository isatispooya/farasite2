import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//سوپر کارت
const supercart = pgTable('supercart', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    logo: varchar('logo', { length: 255 }).notNull(),
    description: text('description'),
    url: varchar('url', { length: 255 }).notNull(),
    titleUrl: text('title_url').notNull(),
    url2: varchar('url2', { length: 255 }).notNull(), 
    titleUrl2: text('title_url2').notNull(),
    url3: varchar('url3', { length: 255 }).notNull(),
    titleUrl3: text('title_url3').notNull(),
    url4: varchar('url4', { length: 255 }).notNull(),
    titleUrl4: text('title_url4').notNull(),
    url5: varchar('url5', { length: 255 }).notNull(),
    titleUrl5: text('title_url5').notNull(),
    url6: varchar('url6', { length: 255 }).notNull(),
    titleUrl6: text('title_url6').notNull(),
    url7: varchar('url7', { length: 255 }).notNull(),
    titleUrl7: text('title_url7').notNull(),
    url8: varchar('url8', { length: 255 }).notNull(),
    titleUrl8: text('title_url8').notNull(),
    url9: varchar('url9', { length: 255 }).notNull(),
    titleUrl9: text('title_url9').notNull(),
    url10: varchar('url10', { length: 255 }).notNull(),
    titleUrl10: text('title_url10').notNull(),
    backgroundColor: varchar('background_color', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const supercartRelations = relations(supercart, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [supercart.settingSite],
        references: [settingSite.id],
    }),
}));

export type Supercart = typeof supercart.$inferSelect;
export type NewSupercart = typeof supercart.$inferInsert;

export default supercart;
