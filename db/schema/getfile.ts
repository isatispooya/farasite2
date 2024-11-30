import { pgTable, varchar, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//فایل ها
const getFile = pgTable('get_file', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    file: varchar('file', { length: 255 }).notNull(),
    title: text('title').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})  

export const getFileRelations = relations(getFile, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [getFile.settingSite],
        references: [settingSite.id],
    }),
}));

export type GetFile = typeof getFile.$inferSelect;
export type NewGetFile = typeof getFile.$inferInsert;

export default getFile;
