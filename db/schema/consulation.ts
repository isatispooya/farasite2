import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//مشاوره
const consulation = pgTable('consulation', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    description: text('description'),
    photo: varchar('photo', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const consullationRelations = relations(consulation, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [consulation.settingSite],
        references: [settingSite.id],
    }),
}));

export type Consulation = typeof consulation.$inferSelect;
export type NewConsulation = typeof consulation.$inferInsert;

export default consulation;