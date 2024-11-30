import { relations } from "drizzle-orm";
import { pgTable, varchar, text, integer, serial, timestamp } from "drizzle-orm/pg-core";
import positionOfManagers from "./position_of_managers";

//مدیران و اعضای اداری
const managersPeople = pgTable('managers_people', {
    id: serial('id').primaryKey(),
    position: integer('position').references(() => positionOfManagers.id),
    title: text('title').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    picture: varchar('picture', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()       
});

export const managersPeopleRelations = relations(managersPeople, ({ one }) => ({
    position: one(positionOfManagers, {
        fields: [managersPeople.position],
        references: [positionOfManagers.id],
    }),
}));

export type ManagersPeople = typeof managersPeople.$inferSelect;
export type NewManagersPeople = typeof managersPeople.$inferInsert;

export default managersPeople;
