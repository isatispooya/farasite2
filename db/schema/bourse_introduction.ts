import { pgTable, text, serial } from "drizzle-orm/pg-core";

//معرفی بورس
const bourse_introduction = pgTable('bourse_introduction', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    photo: text('photo').notNull()
})

export type BourseIntroduction = typeof bourse_introduction.$inferSelect;
export type NewBourseIntroduction = typeof bourse_introduction.$inferInsert;

export default bourse_introduction;
