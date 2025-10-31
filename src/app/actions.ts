"use server";

import { redirect } from 'next/navigation';
import { Invoices } from '@/db/schema';
import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';

import { DXT } from 'docxtemplater';

import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export async function createAction(formData: FormData) {
    const session = await auth();
    const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
    const description = formData.get('description') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const userId = session.userId;
    if ( !userId ) {
        redirect('/sign-in');
    }

    const results = await db.insert(Invoices)
        .values({
            value,
            description,
            userId,
            status: 'open',
            billingName: name,
            billingEmail: email
        })
        .returning({
            id: Invoices.id
        });

    const insertedId = results?.[0]?.id;

    if (!insertedId) {
        throw new Error("Invoice creation failed: ID not returned");
    }

    const templatePath = path.resolve("src", "templates", "invoice_document_v2.docx");
    const templateContent = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater(zip);

    doc.setData({
        name,
        value: `$${(value / 100).toFixed(2)}`,
        description,
        date: new Date().toLocaleDateString(),
        invoiceId: insertedId,
    });

     try {
            doc.render();
        } catch (error) {
            console.error("Error generating document:", error);
            throw error;
        }

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const outputPath = path.resolve("public", `invoice-${insertedId}.docx`);
    fs.writeFileSync(outputPath, buffer);

    redirect(`/invoices/${insertedId}`)
}