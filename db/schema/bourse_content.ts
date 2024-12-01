import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import bourse_introduction from "./bourse_introduction";
import { relations } from "drizzle-orm";

//محتوای بورس
const bourse_content = pgTable('bourse_content', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    bourse_introduction: integer('bourse_introduction').references(() => bourse_introduction.id)
})

export const bourseContentRelations = relations(bourse_content, ({ one }) => ({
    bourseIntroduction: one(bourse_introduction, {
        fields: [bourse_content.bourse_introduction],
        references: [bourse_introduction.id],
    }),
}));

export type BourseContent = typeof bourse_content.$inferSelect;
export type NewBourseContent = typeof bourse_content.$inferInsert;

export default bourse_content;
