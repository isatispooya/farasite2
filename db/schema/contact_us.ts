import { pgTable, varchar, text, timestamp, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import settingSite from "./setting_site";

//تماس با ما
const contactUs = pgTable('contact_us', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
    subject: varchar('subject', { length: 255 }).notNull(),
    message: text('message').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const contactUsRelations = relations(contactUs, ({ one }) => ({
    settingSite: one(settingSite, {
    fields: [contactUs.settingSite],
        references: [settingSite.id],
    }),
}));

export type ContactUs = typeof contactUs.$inferSelect;
export type NewContactUs = typeof contactUs.$inferInsert;

export default contactUs;
