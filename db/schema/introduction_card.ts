import { pgTable, serial, text } from "drizzle-orm/pg-core";

const introductionBrif = pgTable('introduction_brif', {
    id: serial('id').primaryKey(),
    card: text('card').notNull(),
})



export type IntroductionBrif = typeof introductionBrif.$inferSelect;
export type NewIntroductionBrif = typeof introductionBrif.$inferInsert;

export default introductionBrif;
