import { pgTable, serial, text } from "drizzle-orm/pg-core";

//لیست سبدگردان
const brief_list = pgTable('brief_list', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    photo: text('photo').notNull()
})

export type BriefList = typeof brief_list.$inferSelect;
export type NewBriefList = typeof brief_list.$inferInsert;

export default brief_list;
