import { pgTable, varchar, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//اسلایدر
const slider = pgTable('slider', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    picture: varchar('picture', { length: 255 }).notNull(),
    alt: varchar('alt', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const sliderRelations = relations(slider, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [slider.settingSite],
        references: [settingSite.id],
    }),
}));

export type Slider = typeof slider.$inferSelect;
export type NewSlider = typeof slider.$inferInsert;

export default slider;