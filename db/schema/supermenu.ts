import { pgTable, text, serial, varchar, integer } from "drizzle-orm/pg-core";
import sunSuperMenu from "./sub_super_menu";
import { relations } from "drizzle-orm";

//سوپرمنو
const supermenu = pgTable('supermenu', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    vector: text('vector').notNull(),
    sort: integer('sort').notNull(),
    type: text('type', { enum: ['.....','link', 'button'] }).notNull(),
    url: varchar('url', { length: 255 }).notNull(),
    sub: integer('sunSuperMenu').references(() => sunSuperMenu.id)  
})

export const supermenuRelations = relations(supermenu, ({ one }) => ({
    sunSuperMenu: one(sunSuperMenu, {
        fields: [supermenu.sub],
        references: [sunSuperMenu.id],
    }),
}));
    
export type Supermenu = typeof supermenu.$inferSelect;
export type NewSupermenu = typeof supermenu.$inferInsert;

export default supermenu;