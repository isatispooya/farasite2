import { pgTable, serial, text } from "drizzle-orm/pg-core";

//چارت پیشینه
const chart_founds = pgTable('chart_founds', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    name: text('name').notNull(),
    efficiency: text('efficiency').notNull()
})

export type ChartFounds = typeof chart_founds.$inferSelect;
export type NewChartFounds = typeof chart_founds.$inferInsert;

export default chart_founds;
