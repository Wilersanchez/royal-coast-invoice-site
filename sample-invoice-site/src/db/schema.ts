import { pgTable, pgEnum, serial, timestamp, integer, text } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['open', 'paid', 'void', 'uncollected'])

export const Invoices = pgTable('invoices', {
    id: serial('id').primaryKey().notNull(),
    createTs: timestamp('createTs').defaultNow().notNull(),
    value: integer('value').notNull(),
    description: text('description').notNull(),
    userId: text('userId').notNull(),
    status: statusEnum('status').notNull(),
    billingName: text('billing_name').notNull(),
    billingEmail: text('billing_email').notNull(),
});