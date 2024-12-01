import { pgTable, text, serial } from "drizzle-orm/pg-core";

//پیوست
const attachment = pgTable('attachment', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(), 
    file: text('file').notNull()
})

export type Attachment = typeof attachment.$inferSelect;
export type NewAttachment = typeof attachment.$inferInsert;

export default attachment;
