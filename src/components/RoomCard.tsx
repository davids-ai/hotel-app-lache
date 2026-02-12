'use client';

import { Room, RoomStatus, ModifiedBy } from '@/types/room';
import { DoorOpen, DoorClosed, Lock } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onStatusChange: (roomId: string, newStatus: RoomStatus, guestName?: string, guestPhone?: string, modifiedBy?: ModifiedBy) => void;
  onOpenModal: (roomId: string) => void;
}

export default function RoomCard({ room, onStatusChange, onOpenModal }: RoomCardProps) {
  const getIcon = (status: RoomStatus) => {
    const iconProps = "h-6 w-6 sm:h-10 sm:w-10";
    switch (status) {
      case 'disponible':
        return <DoorOpen className={iconProps} />;
      case 'ocupada':
        return <DoorClosed className={iconProps} />;
      case 'arrendada':
        return <Lock className={iconProps} />;
    }
  };

  const statusConfig: Record<RoomStatus, { color: string; bgColor: string; bgHover: string }> = {
    disponible: {
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      bgHover: 'hover:bg-green-100',
    },
    ocupada: {
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      bgHover: 'hover:bg-red-100',
    },
    arrendada: {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 border-yellow-200',
      bgHover: 'hover:bg-yellow-100',
    },
  };

  const statusBadgeConfig: Record<RoomStatus, string> = {
    disponible: 'bg-green-100 text-green-800',
    ocupada: 'bg-red-100 text-red-800',
    arrendada: 'bg-yellow-100 text-yellow-800',
  };

  const statusLabels: Record<RoomStatus, string> = {
    disponible: 'Disponible',
    ocupada: 'Ocupada',
    arrendada: 'Arrendada',
  };

  const config = statusConfig[room.status];
  const hasGuestInfo = room.guestName && room.guestPhone;

  // Fallback en caso de estado desconocido
  if (!config) {
    return (
      <div className="relative min-h-32 sm:min-h-40 rounded-xl sm:rounded-2xl border-2 border-gray-300 bg-gray-100 p-2 sm:p-4 flex items-center justify-center">
        <p className="text-gray-600 text-xs sm:text-sm">Estado no válido</p>
      </div>
    );
  }

  const handleClick = () => {
    if (room.status === 'disponible') {
      // Si está disponible, abre el modal para registrar
      onOpenModal(room.id);
    } else {
      // Si está ocupada o arrendada, regresa a disponible
      onStatusChange(room.id, 'disponible');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative min-h-32 sm:min-h-40 rounded-xl sm:rounded-2xl border-2 p-2 sm:p-4 transition-all duration-300 ease-in-out ${config.bgColor} ${config.bgHover} hover:shadow-lg active:scale-95`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-1 sm:gap-2">
        <div className={`${config.color}`}>
          {getIcon(room.status)}
        </div>

        <span className="text-lg sm:text-2xl font-bold text-gray-800">
          {String(room.number).padStart(3, '0')}
        </span>

        <span className={`rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold uppercase transition-all duration-300 ${statusBadgeConfig[room.status]}`}>
          {statusLabels[room.status]}
        </span>

        {hasGuestInfo && (
          <div className="mt-1 sm:mt-2 w-full text-center text-xs">
            <p className="font-semibold text-gray-700 truncate text-xs">{room.guestName}</p>
            <p className="text-gray-600 truncate text-xs">{room.guestPhone}</p>
            {room.modifiedBy && (
              <p className="text-gray-500 truncate text-xs mt-0.5">Por: {room.modifiedBy}</p>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
