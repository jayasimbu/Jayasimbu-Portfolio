import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim() || '';
    const email = body.email?.trim() || '';
    const subject = body.subject?.trim() || 'General Inquiry';
    const message = body.message?.trim() || '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const doc = {
      name,
      email,
      subject,
      message,
      status: 'new' as const,
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection('inquiries').insertOne(doc);

    return NextResponse.json(
      {
        ok: true,
        id: result.insertedId.toString(),
        message: 'Inquiry saved to MongoDB successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save inquiry';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
