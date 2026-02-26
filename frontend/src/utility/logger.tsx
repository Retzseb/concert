export type AdminAction =
  | { type: "USER_ADD"; payload: any }
  | { type: "USER_DELETE"; payload: any }
  | { type: "USER_ROLE_UPDATE"; payload: any }
  | { type: "ORDER_ADD"; payload: any }
  | { type: "ORDER_UPDATE"; payload: any }
  | { type: "ORDER_DELETE"; payload: any };

export function logAction(action: AdminAction) {
  const stamp = new Date().toISOString();
  console.groupCollapsed(`🧾 [${stamp}] ${action.type}`);
  console.log(action.payload);
  console.groupEnd();
}