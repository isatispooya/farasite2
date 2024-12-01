import { pgTable, serial, text } from "drizzle-orm/pg-core";

//کارت سبدگردان
const brief_card = pgTable('brief_card', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(), 
    photo: text('photo').notNull()
})

export type BriefCard = typeof brief_card.$inferSelect;
export type NewBriefCard = typeof brief_card.$inferInsert;

export default brief_card;
