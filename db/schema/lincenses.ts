import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

//لیسانس
const lincense = pgTable('lincenses', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    content: varchar('content', { length: 2000 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export default lincense;

