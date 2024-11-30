import { serial, varchar, text, pgTable, integer, timestamp } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//لیست ویژگی ها 
const featureList = pgTable('feature_list', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    description: text('description'),       
    image: varchar('image', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const featureListRelations = relations(featureList, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [featureList.settingSite],
        references: [settingSite.id],
    }),
}));    

export type ContentList = typeof featureList.$inferSelect;
export type NewContentList = typeof featureList.$inferInsert;

export default featureList;