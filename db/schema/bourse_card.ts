import { pgTable, text, serial } from "drizzle-orm/pg-core";

//کارت بورس
const bourse_card = pgTable('bourse_card', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    photo: text('photo').notNull()
})

export type BourseCard = typeof bourse_card.$inferSelect;
export type NewBourseCard = typeof bourse_card.$inferInsert;

export default bourse_card;
