import { pgTable, text, serial, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//مسئولیت اجتماعی
const socialResponsibility = pgTable('social_responsibility', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    content: text('content').notNull(),
    picture: varchar('picture', { length: 255 }).notNull(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

export const socialResponsibilityRelations = relations(socialResponsibility, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [socialResponsibility.settingSite],
        references: [settingSite.id],
    }),
}));

export type SocialResponsibility = typeof socialResponsibility.$inferSelect;
export type NewSocialResponsibility = typeof socialResponsibility.$inferInsert;

export default socialResponsibility;
