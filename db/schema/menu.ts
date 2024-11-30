import { pgTable, varchar, text, integer, serial, timestamp } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//منو ها
const menu = pgTable('menu', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    link: varchar('link', { length: 255 }).notNull(),
    icon: varchar('icon', { length: 255 }),
    sort: integer('sort').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()   
})

export const menuRelations = relations(menu, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [menu.settingSite],
        references: [settingSite.id],
    }),
}));    

export type Menu = typeof menu.$inferSelect;
export type NewMenu = typeof menu.$inferInsert;

export default menu;
