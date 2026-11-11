import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb, isAuthorizedAdmin } from '@/lib/mongodb';

type AllowedCollection = 'projects' | 'skill_categories' | 'experiences';

const ALLOWED_COLLECTIONS: AllowedCollection[] = [
  'projects',
  'skill_categories',
  'experiences',
];

export async function POST(req: Request) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      collection?: AllowedCollection;
      item?: Record<string, unknown>;
    };

    if (!body.collection || !ALLOWED_COLLECTIONS.includes(body.collection) || !body.item) {
      return NextResponse.json({ ok: false, error: 'Invalid collection or item.' }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection(body.collection);
    const count = await col.countDocuments();

    const doc = {
      ...body.item,
      order: count,
      createdAt: new Date().toISOString(),
    };

    const result = await col.insertOne(doc);
    return NextResponse.json(
      { ok: true, _id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save item';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection') as AllowedCollection | null;
    const id = searchParams.get('id') || '';

    if (!collection || !ALLOWED_COLLECTIONS.includes(collection) || !ObjectId.isValid(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid collection or id.' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete item';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
