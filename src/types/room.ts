export type RoomStatus = 'disponible' | 'ocupada' | 'arrendada';
export type ModifiedBy = 'Fredy' | 'Rocio' | 'Administrador';

export interface Room {
  id: string;
  number: number;
  floor: number;
  status: RoomStatus;
  guestName?: string;
  guestPhone?: string;
  modifiedBy?: ModifiedBy;
}

export interface FloorConfig {
  floor: number;
  roomCount: number;
  startNumber: number;
}
