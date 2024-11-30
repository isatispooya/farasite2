import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import settingSite from "./setting_site";
import { relations } from "drizzle-orm";

//موقعیت مدیران
const positionOfManagers = pgTable('position_of_managers', {
    id: serial('id').primaryKey(),
    settingSite: integer('setting_site').references(() => settingSite.id),
    title: text('title').notNull(),
    level: integer('level').notNull(),
    senior: text('senior').notNull()
})  

export const positionOfManagersRelations = relations(positionOfManagers, ({ one }) => ({
    settingSite: one(settingSite, {
        fields: [positionOfManagers.settingSite],
        references: [settingSite.id],
    }),
}));    

export type PositionOfManagers = typeof positionOfManagers.$inferSelect;
export type NewPositionOfManagers = typeof positionOfManagers.$inferInsert;

export default positionOfManagers;
