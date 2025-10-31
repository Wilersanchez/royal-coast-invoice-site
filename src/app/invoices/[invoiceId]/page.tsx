import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function InvoicePage(
  { params }: { params: { invoiceId: string } }
) {
  const { invoiceId } = params;
  const numericId = Number(invoiceId);

  if (!Number.isFinite(numericId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, numericId))
    .limit(1);

  if (!result) {
    notFound();
  }

  return (
    <main className="h-full max-w-5xl mx-auto my-12">
      <div className="flex justify-between mb-8">
        <h1 className="flex items-center gap-4 text-3xl text-left font-bold">
          Invoice {invoiceId}
          <Badge
            className={cn(
              "rounded-full capitalize",
              result.status === "open" && "bg-blue-500",
              result.status === "paid" && "bg-green-600",
              result.status === "void" && "bg-zinc-700",
              result.status === "uncollected" && "bg-red-600"
            )}
          >
            {result.status}
          </Badge>
        </h1>
        <p>{/* Put any top-right controls here (e.g., Print/Download) */}</p>
      </div>

      <p className="text-3xl mb-3">${(result.value / 100).toFixed(2)}</p>

      <p className="text-lg mb-8">{result.description}</p>

      <h2 className="font-bold text-lg mb-4">Billing Details</h2>

      <ul className="grid gap-2">
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice ID
          </strong>
          <span>{invoiceId}</span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice Date
          </strong>
          <span>
            {result.createTs
              ? new Date(result.createTs).toLocaleDateString()
              : "--"}
          </span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing Name
          </strong>
          <span>{/* insert name if you store it */}</span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing Email
          </strong>
          <span>{/* insert email if you store it */}</span>
        </li>
      </ul>
    </main>
  );
}
