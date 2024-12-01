import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const settingSite = pgTable('setting_site', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    logo: varchar('logo', { length: 256 }).default(''),
    logoText: varchar('logo_text', { length: 256 }),
    favicon: varchar('favicon', { length: 256 }),
    description: text('description'),
    keywords: text('keywords'),
    email: varchar('email', { length: 256 }).notNull(),
    phone: varchar('phone', { length: 256 }).notNull(),
    phone_reserve: varchar('phone_reserve', { length: 256 }),
    address: text('address').notNull(),
    national_code: varchar('national_code', { length: 256 }).notNull(),
    postal_code: varchar('postal_code', { length: 256 }),
    about_us: text('about_us').notNull(),
    about_us_short: text('about_us_short'),
    map: text('map'),
    instagram: varchar('instagram', { length: 256 }),
    telegram: varchar('telegram', { length: 256 }),
    twitter: varchar('twitter', { length: 256 }),
    youtube: varchar('youtube', { length: 256 }),
    facebook: varchar('facebook', { length: 256 }),
    type_of_company: varchar('type_of_company', { length: 256 }).notNull(),
    field_of_activity: varchar('field_of_activity', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export type SettingSite = typeof settingSite.$inferSelect;
export type NewSettingSite = typeof settingSite.$inferInsert;
