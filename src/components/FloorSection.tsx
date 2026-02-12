'use client';

import { Room } from '@/types/room';
import RoomCard from './RoomCard';
import { Building2 } from 'lucide-react';

interface FloorSectionProps {
  floor: number;
  rooms: Room[];
  onToggleRoom: (roomId: string) => void;
}

export default function FloorSection({ floor, rooms, onToggleRoom }: FloorSectionProps) {
  const availableCount = rooms.filter(r => r.status === 'disponible').length;
  const occupiedCount = rooms.filter(r => r.status === 'ocupada').length;
  const rentedCount = rooms.filter(r => r.status === 'arrendada').length;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b-2 border-gray-300 pb-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-gray-700" />
          <h2 className="text-3xl font-bold text-gray-800">Piso {floor}</h2>
        </div>
        <div className="ml-auto flex gap-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Disponibles</p>
            <p className="text-2xl font-bold text-green-600">{availableCount}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Ocupadas</p>
            <p className="text-2xl font-bold text-red-600">{occupiedCount}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Arrendadas</p>
            <p className="text-2xl font-bold text-yellow-600">{rentedCount}</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            onStatusChange={onToggleRoom}
          />
        ))}
      </div>
    </section>
  );
}
