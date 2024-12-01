
import { serial, varchar, pgTable, integer, timestamp } from "drizzle-orm/pg-core";
import {settingSite} from "./setting_site";
import { relations } from "drizzle-orm";

//گالری عکس
const galleryPhoto = pgTable('gallery_photo', {
    id: serial('id').primaryKey(),
    alt: varchar('alt', { length: 255 }),
    src: varchar('src', { length: 255 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    settingSite: integer('setting_site').references(() => settingSite.id),
})          

export const galleryPhotoRelations = relations(galleryPhoto, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [galleryPhoto.settingSite],
        references: [settingSite.id],
    }),
}));

export type GalleryPhoto = typeof galleryPhoto.$inferSelect;
export type NewGalleryPhoto = typeof galleryPhoto.$inferInsert;

export default galleryPhoto;    
