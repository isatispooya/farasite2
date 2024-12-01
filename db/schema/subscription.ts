import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import subjectSubscription from "./subjectsubscription";
import { relations } from "drizzle-orm";

//اشتراک
const subscription = pgTable('subscription', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    subject: integer('subject').references(() => subjectSubscription.id),
    phone: text('phone').notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const subscriptionRelations = relations(subscription, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [subscription.settingSite],
        references: [settingSite.id],
    }),
    subject: one(subjectSubscription, {
        fields: [subscription.subject],
        references: [subjectSubscription.id], 
    }),
}));

export type Subscription = typeof subscription.$inferSelect;
export type NewSubscription = typeof subscription.$inferInsert;

export default subscription;
