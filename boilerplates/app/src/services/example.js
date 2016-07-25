import xFetch from './xFetch';

export async function query() {
  return xFetch('/api/users');
}
