import { pgTable, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import settingSite from "./setting_site";


//آدرس های شعب
const branch = pgTable('branches', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    name: varchar('name', { length: 255 }).notNull(),
    province: varchar('province', { length: 100 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    address: varchar('address', { length: 500 }).notNull(),
    telephone: varchar('telephone', { length: 20 }).notNull(),
    code: varchar('code', { length: 50 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}); 

export const branchRelations = relations(branch, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [branch.settingSite],
        references: [settingSite.id],
    }),
}));

export type Branch = typeof branch.$inferSelect;
export type NewBranch = typeof branch.$inferInsert;

export default branch;                          
