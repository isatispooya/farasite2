import { serial, pgTable, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//شرکای تجاری
const businesspartners = pgTable('businesspartners', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    name: varchar('name', { length: 255 }).notNull(),
    logo: varchar('logo', { length: 255 }).notNull(),
    link: varchar('link', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),  
}); 
        
export const businesspartnersRelations = relations(businesspartners, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [businesspartners.settingSite],
        references: [settingSite.id],
    }),
}));

export type Businesspartners = typeof businesspartners.$inferSelect;
export type NewBusinesspartners = typeof businesspartners.$inferInsert;

export default businesspartners;                