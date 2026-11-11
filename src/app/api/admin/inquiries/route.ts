import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb, isAuthorizedAdmin } from '@/lib/mongodb';

export async function GET(req: Request) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const rows = await db
      .collection('inquiries')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    const inquiries = rows.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toString(),
    }));

    return NextResponse.json({ ok: true, inquiries });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load inquiries';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = (await req.json()) as {
      id?: string;
      status?: 'new' | 'read' | 'replied';
    };

    if (!id || !ObjectId.isValid(id) || !status || !['new', 'read', 'replied'].includes(status)) {
      return NextResponse.json({ ok: false, error: 'Invalid inquiry id or status.' }, { status: 400 });
    }

    const db = await getDb();
    await db
      .collection('inquiries')
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update inquiry';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid inquiry id.' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('inquiries').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete inquiry';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
