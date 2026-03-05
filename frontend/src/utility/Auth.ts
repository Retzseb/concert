export function getRole(u: any): number | null {
  const r = u?.role ?? u?.role_id ?? u?.roleId ?? u?.Role ?? null;
  if (r === null || r === undefined) return null;

  const n = Number(r);
  return Number.isFinite(n) ? n : null;
}

export function isAdmin(u: any): boolean {
  return getRole(u) === 0;
}

export function isRegisteredUser(u: any): boolean {
  return getRole(u) === 2;
}