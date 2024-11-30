


import { pgTable, varchar, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//ویدئو های زنده
const live = pgTable('live', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    streamUrl: varchar('stream_url', { length: 255 }).notNull(),
    title: text('title').notNull(),
    streamKey: varchar('stream_key', { length: 255 }).notNull(),
    url: varchar('url', { length: 255 }).notNull(),
    play: varchar('play', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})  

export const liveRelations = relations(live, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [live.settingSite],
        references: [settingSite.id],
    }),
}));

export type Live = typeof live.$inferSelect;
export type NewLive = typeof live.$inferInsert;

export default live;    
