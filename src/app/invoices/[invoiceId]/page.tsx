import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import Invoice from "./Invoice";

type RouteParams = { invoiceId: string };

export default async function InvoicePage(
  props: { params: Promise<RouteParams> }
) {
  const { userId, orgId } = auth();
  if (!userId) {
    // Avoid returning undefined from a page component
    redirect("/sign-in");
  }

  const { invoiceId: invoiceIdStr } = await props.params;   // <-- await the promise
  const invoiceId = Number(invoiceIdStr);
  if (!Number.isFinite(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  // Demo default (remove/adjust for production):
  let [result]: Array<{
    invoices: typeof Invoices.$inferSelect;
    customers: typeof Customers.$inferSelect;
  }> = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .limit(1);

  // Proper auth-aware lookup:
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(and(eq(Invoices.id, invoiceId), eq(Invoices.organizationId, orgId)))
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId),
        ),
      )
      .limit(1);
  }

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.invoices,
    customer: result.customers,
  };

  return <Invoice invoice={invoice} />;
}
