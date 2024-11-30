import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//محصولات
    const products = pgTable('products', {
        id: serial('id').primaryKey(),
        settingSite: integer('setting_site').references(() => settingSite.id),
        title: text('title').notNull(),
        paragraph: text('paragraph'),
        picture: varchar('picture', { length: 255 }),
        route: varchar('route', { length: 255 }),
        additionalImages: varchar('additional_images', { length: 255 }),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull()
        })  

export const productsRelations = relations(products, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [products.settingSite],
        references: [settingSite.id],
    }),
}));

export type Products = typeof products.$inferSelect;
export type NewProducts = typeof products.$inferInsert;

export default products;
