// src/app/dashboard/page.tsx
export const runtime = 'edge';            // run on Workers-compatible runtime
export const dynamic = 'force-dynamic';   // never pre-render; always SSR
export const revalidate = 0;              // disable ISR for this page

import { db } from '@/db';
import { Invoices } from '@/db/schema';
import Container from '@/components/Container';
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Helpful type from Drizzle
type InvoiceRow = typeof Invoices.$inferSelect;

export default async function DashboardPage() {
  let results: InvoiceRow[] = [];

  // Make sure DB access only happens at request time (not at module top-level)
  try {
    results = await db.select().from(Invoices);
  } catch (e) {
    // If the DB is unreachable during build or env is missing, fail gracefully
    // (You can log e to an observability tool if you want)
    results = [];
  }

  return (
    <main className="h-full mb-6">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl text-left font-bold">Invoices</h1>
          <p>
            <Button className="inline-flex gap-2" variant="ghost" asChild>
              <Link href="/invoices/new">
                <CirclePlus className="h-4 w-4" />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px] p-4">Date</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {results.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="p-4 text-center text-sm text-muted-foreground">
                  No invoices yet.
                </TableCell>
              </TableRow>
            )}

            {results.map((result) => {
              const dateText = result.createTs
                ? new Date(result.createTs).toLocaleDateString()
                : '--';

              const name = (result as any).billing_name ?? '—';
              const email = (result as any).billing_email ?? '—';
              const valueText = `$${(result.value / 100).toFixed(2)}`;

              return (
                <TableRow key={result.id}>
                  <TableCell className="font-medium text-left p-0">
                    <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                      {dateText}
                    </Link>
                  </TableCell>

                  <TableCell className="text-left p-0">
                    <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                      {name}
                    </Link>
                  </TableCell>

                  <TableCell className="text-left p-0">
                    <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                      {email}
                    </Link>
                  </TableCell>

                  <TableCell className="text-center p-0">
                    <Link href={`/invoices/${result.id}`} className="block p-4">
                      <Badge
                        className={cn(
                          'rounded-full capitalize',
                          result.status === 'open' && 'bg-blue-500',
                          result.status === 'paid' && 'bg-green-600',
                          result.status === 'void' && 'bg-zinc-700',
                          result.status === 'uncollected' && 'bg-red-600'
                        )}
                      >
                        {result.status}
                      </Badge>
                    </Link>
                  </TableCell>

                  <TableCell className="text-right p-0">
                    <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                      {valueText}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
