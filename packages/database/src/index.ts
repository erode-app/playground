export interface Record {
  id: string;
  [key: string]: unknown;
}

const store = new Map<string, Map<string, Record>>();

function getCollection(collection: string): Map<string, Record> {
  if (!store.has(collection)) {
    store.set(collection, new Map());
  }
  return store.get(collection)!;
}

export function insert(collection: string, record: Record): Record {
  getCollection(collection).set(record.id, record);
  return record;
}

export function findById(collection: string, id: string): Record | undefined {
  return getCollection(collection).get(id);
}

export function findAll(collection: string): Record[] {
  return Array.from(getCollection(collection).values());
}
