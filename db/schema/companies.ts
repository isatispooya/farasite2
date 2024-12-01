import { serial, varchar, text, timestamp, pgTable, integer } from 'drizzle-orm/pg-core';
import {settingSite} from './setting_site';
import { relations } from 'drizzle-orm';

//شرکت ها
const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  settingSite: integer('setting_site').references(() => settingSite.id),
  name: varchar('name', { length: 255 }).notNull(),
  subName: varchar('sub_name', { length: 255 }),
  logo: varchar('logo', { length: 255 }).notNull(),
  link: varchar('link', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  address: text('address').notNull(),
  shortAboutUs: text('short_about_us').notNull(),
  longAboutUs: text('long_about_us'),
  picture: varchar('picture', { length: 255 }),
  size: varchar('size', { length: 50 }),
  background: varchar('background', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const companiesRelations = relations(companies, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [companies.settingSite],
        references: [settingSite.id],
    }),
}));

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;

export default companies;
