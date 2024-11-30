import { serial, varchar, pgTable, integer, timestamp } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//گالری ویدئو
const galleryVideo = pgTable('gallery_video', {
    id: serial('id').primaryKey(),
    alt: varchar('alt', { length: 255 }),
    src: varchar('src', { length: 255 }),
    shortVideo: varchar('short_video', { length: 255 }),
    route: varchar('route', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    settingSite: integer('setting_site').references(() => settingSite.id),
})

export const galleryVideoRelations = relations(galleryVideo, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [galleryVideo.settingSite],
        references: [settingSite.id],
    }),
}));

export type GalleryVideo = typeof galleryVideo.$inferSelect;
export type NewGalleryVideo = typeof galleryVideo.$inferInsert;

export default galleryVideo;
