export type DiscountType = "full" | "student" | "senior";

export type OrderItem = {
  concertId: number;
  concertName: string;
  date?: string;
  place?: string;
  seatId: string;
  basePrice: number;
  discount: DiscountType;
  finalPrice: number;
};

export type OrderRecord = {
  id: string;            // pl. "ORD-1700000000000"
  userName: string;      // most mock (később auth)
  userEmail?: string;
  createdAt: string;     // ISO
  status: "Függő" | "Fizetve" | "Törölve";
  total: number;
  items: OrderItem[];
};

const ORDERS_KEY = "seaty_orders_v1";
const SOLD_KEY = "seaty_sold_seats_v1";

export function loadOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrders(list: OrderRecord[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
}

export function appendOrder(order: OrderRecord) {
  const list = loadOrders();
  list.unshift(order); // érkezés szerint csökkenő
  saveOrders(list);
}

export function getOrderById(id: string): OrderRecord | undefined {
  return loadOrders().find((o) => o.id === id);
}

export function markSeatsSold(concertId: number, seatIds: string[]) {
  const raw = localStorage.getItem(SOLD_KEY);
  const store: Record<string, string[]> = raw ? JSON.parse(raw) : {};
  const k = String(concertId);
  const arr = new Set(store[k] ?? []);
  seatIds.forEach((s) => arr.add(s));
  store[k] = Array.from(arr);
  localStorage.setItem(SOLD_KEY, JSON.stringify(store));
}

export function getSoldSeats(concertId: number): Set<string> {
  try {
    const raw = localStorage.getItem(SOLD_KEY);
    const store: Record<string, string[]> = raw ? JSON.parse(raw) : {};
    return new Set(store[String(concertId)] ?? []);
  } catch {
    return new Set();
  }
}