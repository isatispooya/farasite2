import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//دوره آموزشی
const trainingCourse = pgTable('training_course', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    photo: text('image').notNull(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    teacher: text('teacher').notNull(),
    duration: integer('duration').notNull(),
    kind: text('kind').notNull(),
    date: text('date').notNull(),
    createdAt: text('created_at').notNull().default(new Date().toISOString())
})

export const trainingCourseRelations = relations(trainingCourse, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [trainingCourse.settingSite],
        references: [settingSite.id],
    }),
}));

export type TrainingCourse = typeof trainingCourse.$inferSelect;
export type NewTrainingCourse = typeof trainingCourse.$inferInsert;

export default trainingCourse;      
