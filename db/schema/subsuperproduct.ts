import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

//محصولات فرعی و اصلی
const subSuperProduct = pgTable('subsuperproduct', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    name: text('name').notNull(), 
    description: text('description'),
    url: varchar('url', { length: 255 }),
    image: varchar('image', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})



export type SubSuperProduct = typeof subSuperProduct.$inferSelect;
export type NewSubSuperProduct = typeof subSuperProduct.$inferInsert;

export default subSuperProduct;