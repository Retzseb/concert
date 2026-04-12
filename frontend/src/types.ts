export type RoleValue = number | null;

export type User = {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  role?: number | string | null;
  role_id?: number | string | null;
  roleId?: number | string | null;
  Role?: number | string | null;
};

export type Place = {
  id: number;
  name: string;
  city?: string;
  address?: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Performer = {
  id: number;
  name: string;
  genre: number | null;
  description?: string;
  country?: string;
};

export type Room = {
  id: number;
  place_id: number;
  serial_number: number;
  total_rows: number;
  total_columns: number;
};

export type Concert = {
  id: number;
  name: string;
  picture?: string;
  date?: string;
  base_price?: number;
  performer_id?: number;
  performer_name?: string;
  place_id?: number;
  place_name?: string;
  genre_id?: number | null;
  genre_name?: string;
  room_id?: number;
  serial_number?: string | number;
  room_total_rows?: number;
  room_total_columns?: number;
  description?: string;
};
