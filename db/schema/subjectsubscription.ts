import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//موضوع اشتراک
const subjectSubscription = pgTable('subject_subscription', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})          

export const subjectSubscriptionRelations = relations(subjectSubscription, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [subjectSubscription.settingSite],
        references: [settingSite.id],
    }),
}));

export type SubjectSubscription = typeof subjectSubscription.$inferSelect;
export type NewSubjectSubscription = typeof subjectSubscription.$inferInsert;

export default subjectSubscription; 
