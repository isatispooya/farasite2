import { pgTable, serial, text } from "drizzle-orm/pg-core";

//کارت اولین صفحه
const introduction_card = pgTable('introduction_brif', {
    id: serial('id').primaryKey(),
    card: text('card').notNull(),
})



export type IntroductionBrif = typeof introduction_card.$inferSelect;
export type NewIntroductionBrif = typeof introduction_card.$inferInsert;

export default introduction_card;
