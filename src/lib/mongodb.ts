import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'jayasimbu_portfolio';

interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoClient>;
}

const globalWithMongo = globalThis as typeof globalThis & GlobalWithMongo;

function getClientPromise(): Promise<MongoClient> {
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    globalWithMongo._mongoClientPromise = client.connect();
  }
  return globalWithMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(MONGODB_DB);
}

export function isAuthorizedAdmin(req: Request): boolean {
  const expectedKey = process.env.ADMIN_KEY;
  if (!expectedKey) return false;
  const providedKey = req.headers.get('x-admin-key') || '';
  return providedKey === expectedKey;
}
