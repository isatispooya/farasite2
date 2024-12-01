import { pgTable, serial, text } from "drizzle-orm/pg-core";

//شماره سبدگردان
const brief_number = pgTable('brief_number', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    number: text('number').notNull(),
    little: text('little').notNull()
})

export type BriefNumber = typeof brief_number.$inferSelect;
export type NewBriefNumber = typeof brief_number.$inferInsert;

export default brief_number;
