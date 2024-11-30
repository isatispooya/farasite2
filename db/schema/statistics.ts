import { pgTable, varchar, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//آمار
const statistics = pgTable('statistics', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    icon: varchar('icon', { length: 255 }),
    number: integer('number').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const statisticsRelations = relations(statistics, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [statistics.settingSite],
        references: [settingSite.id],
    }),
}));

export type Statistics = typeof statistics.$inferSelect;
export type NewStatistics = typeof statistics.$inferInsert;

export default statistics;
