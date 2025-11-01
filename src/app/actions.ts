// src/app/actions.ts
"use server";

import { redirect } from "next/navigation";
import { Invoices } from "@/db/schema";
import { openDb } from "@/db";
import { auth } from "@clerk/nextjs/server";

export async function createAction(formData: FormData) {
  const session = await auth();
  const userId = session.userId;
  if (!userId) redirect("/sign-in");

  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = String(formData.get("description") ?? "");
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");

  const { db, client } = await openDb();
  try {
    const results = await db.insert(Invoices)
      .values({
        value,
        description,
        userId,
        status: "open",
        billingName: name,     // ensure your schema has these exact camelCase columns
        billingEmail: email,
      })
      .returning({ id: Invoices.id });

    const insertedId = results?.[0]?.id;
    if (!insertedId) throw new Error("Invoice creation failed: ID not returned");

    // TODO (optional): generate DOCX using a fetch() of a template stored in /public or R2,
    // then stream it back from an API route or upload to R2 and give the user a link.

    redirect(`/invoices/${insertedId}`);
  } finally {
    await client.end();
  }
}
