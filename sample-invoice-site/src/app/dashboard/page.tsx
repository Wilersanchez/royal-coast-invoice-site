import { db } from '@/db';
import { Invoices } from '@/db/schema';
import Container from '@/components/Container';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { cn } from '@/lib/utils';


export default async function Home() {
  const results = await db.select().from(Invoices); // uncomment this when you have xata or supabase working
  return (
     <main className="h-full mb-6">
        <Container>
            <div className="flex justify-between">
            <h1 className="text-3xl text-left font-bold">
                Invoices
          </h1>
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
                    <TableHead className="w-[100px] p-4">
                        Date
                    </TableHead>
                    <TableHead className="p-4">
                        Customer
                    </TableHead>
                    <TableHead className="p-4">
                        Email
                    </TableHead>
                    <TableHead className="text-center p-4">
                        Status
                    </TableHead>
                    <TableHead className="text-right p-4">
                        Value
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((result) => {
                        return (
                    <TableRow key={result.id}>
                        <TableCell className="font-medium text-left p-0">
                            <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                                { new Date(result.createTs).toLocaleDateString()}
                            </Link>
                        </TableCell>
                        <TableCell className="text-left p-0">
                            <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                                Wiler Sanchez
                            </Link>
                        </TableCell>
                        <TableCell className="text-left p-0">
                            <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                                wilersanchez1@gmail.com
                            </Link>
                        </TableCell>
                        <TableCell className="text-center p-0">
                            <Link href={`/invoices/${result.id}`} className='block p-4'>
                                <Badge className={cn(
                                    "rounded-full capitalize",
                                    result.status === 'open' && 'bg-blue-500',
                                    result.status === 'paid' && 'bg-green-600',
                                    result.status === 'void' && 'bg-zinc-700',
                                    result.status === 'uncollected' && 'bg-red-600',
                                )}>
                                    { result.status }
                                </Badge>
                            </Link>
                        </TableCell>
                        <TableCell className="text-right p-0">
                            <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                                $250.00
                                ${ (result.value / 100).toFixed(2) }
                            </Link>
                        </TableCell>
                    </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Container>
      </main>
  );
}
