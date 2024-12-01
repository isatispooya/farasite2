import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//نام محصولات
const productName = pgTable('product_name', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),          
    name: varchar('name', { length: 255 }).notNull()

})  

export const productNameRelations = relations(productName, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [productName.settingSite],
        references: [settingSite.id],
    }),
}));

export type ProductName = typeof productName.$inferSelect;
export type NewProductName = typeof productName.$inferInsert;

export default productName;
