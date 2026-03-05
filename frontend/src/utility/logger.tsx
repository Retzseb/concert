export type AdminAction =
  | { type: "USER_ADD"; payload: any }
  | { type: "USER_DELETE"; payload: any }
  | { type: "USER_ROLE_UPDATE"; payload: any }
  | { type: "ORDER_ADD"; payload: any }
  | { type: "ORDER_UPDATE"; payload: any }
  | { type: "ORDER_DELETE"; payload: any }
  | { type: "SHOW_DELETE"; payload: any }
  | { type: "SHOW_STATUS_UPDATE"; payload: any }
  | { type: "SEAT_PRICES_SAVE"; payload: { showId: string; prices: { A: number; B: number; C: number } } };

export function logAction(action: AdminAction) {
  const stamp = new Date().toISOString();
  console.groupCollapsed(`🧾 [${stamp}] ${action.type}`);
  console.log(action.payload);
  console.groupEnd();
}