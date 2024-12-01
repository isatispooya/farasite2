import { pgTable, text, serial } from "drizzle-orm/pg-core";

//محتوای درباره ما
const contentDrop = pgTable('contentdrop', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    summary: text('summary').notNull(),
})


export type ContentDrop = typeof contentDrop.$inferSelect;
export type NewContentDrop = typeof contentDrop.$inferInsert;

export default contentDrop;
