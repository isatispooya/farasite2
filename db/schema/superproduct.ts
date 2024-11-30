
import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import settingSite from "./setting_site";

const superProduct = pgTable('superproduct', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    image: varchar('image', { length: 255 }),
    description: text('description'),
    settingSite: integer('setting_site').references(() => settingSite.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const superProductRelations = relations(superProduct, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [superProduct.settingSite],
        references: [settingSite.id],
    }),
}));    

export type SuperProduct = typeof superProduct.$inferSelect;
export type NewSuperProduct = typeof superProduct.$inferInsert;

export default superProduct;


