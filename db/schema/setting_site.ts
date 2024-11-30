import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import lincense from "./lincenses";

//تنظیمات سایت
const settingSite = pgTable('setting_sites', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    logo: varchar('logo', { length: 255 }).notNull(),
    logoText: varchar('logo_text', { length: 255 }),
    favicon: varchar('favicon', { length: 255 }),
    description: varchar('description', { length: 255 }),
    keywords: varchar('keywords', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    phone_reserve: varchar('phone_reserve', { length: 20 }),
    address: varchar('address', { length: 500 }).notNull(),   
    national_code: varchar('national_code', { length: 20 }).notNull(),
    postal_code: varchar('postal_code', { length: 20 }),
    about_us: varchar('about_us', { length: 2000 }).notNull(),
    about_us_short: varchar('about_us_short', { length: 500 }),
    map: varchar('map', { length: 2000 }),
    instagram: varchar('instagram', { length: 255 }),
    telegram: varchar('telegram', { length: 255 }),
    twitter: varchar('twitter', { length: 255 }),
    youtube: varchar('youtube', { length: 255 }),
    facebook: varchar('facebook', { length: 255 }), 
    lincense: integer('lincense').references(() => lincense.id),
    type_of_company: varchar('type_of_company', { length: 255 }).notNull(),
    field_of_activity: varchar('field_of_activity', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});


export const settingSiteRelations = relations(settingSite, ({ one }) => ({
    lincense: one(lincense, {
        fields: [settingSite.lincense],
        references: [lincense.id],
    }),
}));

export type SettingSite = typeof settingSite.$inferSelect;
export type NewSettingSite = typeof settingSite.$inferInsert;
export default settingSite;
