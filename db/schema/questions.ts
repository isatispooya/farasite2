import { integer, pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//سوالات و جواب ها
const questions = pgTable('questions', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    question: text('question').notNull(),
    answer: text('answer').notNull(), 
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const questionsRelations = relations(questions, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [questions.settingSite],
        references: [settingSite.id],
    }),
}));

export type Questions = typeof questions.$inferSelect;
export type NewQuestions = typeof questions.$inferInsert;

export default questions;
