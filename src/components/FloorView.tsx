'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Room, RoomStatus, ModifiedBy } from '@/types/room';
import RoomCard from '@/components/RoomCard';
import StatusModal from '@/components/StatusModal';
import { supabase } from '@/lib/supabase';

const STORAGE_KEY = 'hotel-rooms-state';

const normalizeStatus = (status: any): RoomStatus => {
  const validStatuses: RoomStatus[] = ['disponible', 'ocupada', 'arrendada'];
  if (validStatuses.includes(status)) {
    return status as RoomStatus;
  }
  // Convert old status values
  if (status === 'available') return 'disponible';
  if (status === 'occupied') return 'ocupada';
  return 'disponible';
};

interface FloorViewProps {
  floorNumber: number;
}

export default function FloorView({ floorNumber }: FloorViewProps) {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<RoomStatus>('ocupada');

  useEffect(() => {
    const initializeRooms = async () => {
      try {
        // Intentar cargar desde Supabase
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('floor', floorNumber);

        if (error) throw error;

        if (data) {
          // Convertir datos de Supabase al formato Room
          const supabaseRooms: Room[] = data.map((row: any) => ({
            id: `room-${row.floor}-${row.room_number}`,
            number: row.room_number,
            floor: row.floor,
            status: row.status as RoomStatus,
            guestName: row.guest_name || undefined,
            guestPhone: row.guest_phone || undefined,
            modifiedBy: row.modified_by as ModifiedBy | undefined,
          }));

          setRooms(supabaseRooms);
          setMounted(true);
          return;
        }
      } catch (error) {
        console.log('Supabase not available, using localStorage:', error);
      }

      // Fallback a localStorage si Supabase no está disponible
      const savedState = localStorage.getItem(STORAGE_KEY);
      const defaultRooms = createDefaultRooms();

      if (savedState) {
        try {
          const allRooms = JSON.parse(savedState);
          const normalizedRooms = allRooms.map((r: any) => ({
            ...r,
            status: normalizeStatus(r.status),
          }));
          const floorRooms = normalizedRooms.filter((r: Room) => r.floor === floorNumber);
          
          // Ensure we have all 10 rooms for this floor
          if (floorRooms.length < 10) {
            const existingNumbers = floorRooms.map((r: Room) => r.number);
            const missingRooms = defaultRooms.filter((r: Room) => !existingNumbers.includes(r.number));
            floorRooms.push(...missingRooms);
          }
          
          setRooms(floorRooms);
        } catch {
          setRooms(defaultRooms);
        }
      } else {
        setRooms(defaultRooms);
      }

      setMounted(true);
    };

    initializeRooms();
  }, [floorNumber]);

  useEffect(() => {
    if (mounted && rooms.length > 0) {
      // Guardar en Supabase
      const saveToSupabase = async () => {
        try {
          for (const room of rooms) {
            const { error } = await supabase
              .from('rooms')
              .upsert({
                room_number: room.number,
                floor: room.floor,
                status: room.status,
                guest_name: room.guestName || null,
                guest_phone: room.guestPhone || null,
                modified_by: room.modifiedBy || null,
              }, {
                onConflict: 'floor,room_number'
              });

            if (error) console.error('Error saving room to Supabase:', error);
          }
        } catch (error) {
          console.log('Supabase save failed, using localStorage:', error);
          // Fallback a localStorage
          const allRooms = localStorage.getItem(STORAGE_KEY);
          const existingRooms = allRooms ? JSON.parse(allRooms).map((r: any) => ({
            ...r,
            status: normalizeStatus(r.status),
          })) : [];
          const otherRooms = existingRooms.filter((r: Room) => r.floor !== floorNumber);
          const allUpdatedRooms = [...otherRooms, ...rooms];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(allUpdatedRooms));
        }
      };

      saveToSupabase();
    }
  }, [rooms, mounted, floorNumber]);

  const createDefaultRooms = (): Room[] => {
    const startNumber = floorNumber * 100 + 1;
    const roomsArray: Room[] = [];

    for (let i = 0; i < 10; i++) {
      roomsArray.push({
        id: `room-${floorNumber}-${i + 1}`,
        number: startNumber + i,
        floor: floorNumber,
        status: 'disponible',
      });
    }

    return roomsArray;
  };

  const handleStatusChange = (roomId: string, newStatus: RoomStatus, guestName?: string, guestPhone?: string, modifiedBy?: ModifiedBy) => {
    setRooms(prev =>
      prev.map(room =>
        room.id === roomId
          ? {
              ...room,
              status: newStatus,
              guestName: guestName,
              guestPhone: guestPhone,
              modifiedBy: modifiedBy,
            }
          : room
      )
    );
  };

  const handleOpenModal = (roomId: string) => {
    setSelectedRoomId(roomId);
    setModalOpen(true);
  };

  const handleModalConfirm = (name: string, phone: string, status: RoomStatus, modifiedBy: ModifiedBy) => {
    if (selectedRoomId) {
      handleStatusChange(selectedRoomId, status, name, phone, modifiedBy);
    }
    setModalOpen(false);
    setSelectedRoomId(null);
  };

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const availableCount = rooms.filter(r => r.status === 'disponible').length;
  const occupiedCount = rooms.filter(r => r.status === 'ocupada').length;
  const rentedCount = rooms.filter(r => r.status === 'arrendada').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
          {/* Top Row - Title */}
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <button
              onClick={() => router.push('/')}
              className="rounded-lg p-2 hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Piso {floorNumber}</h1>
              <p className="text-xs sm:text-sm text-gray-600">10 habitaciones</p>
            </div>
          </div>

          {/* Counters - Bottom Row on Mobile, Inline on Desktop */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 sm:ml-14">
            <div className="text-center bg-green-50 rounded-lg p-2 sm:bg-transparent sm:p-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Disponibles</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">{availableCount}</p>
            </div>
            <div className="text-center bg-red-50 rounded-lg p-2 sm:bg-transparent sm:p-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Ocupadas</p>
              <p className="text-lg sm:text-2xl font-bold text-red-600">{occupiedCount}</p>
            </div>
            <div className="text-center bg-yellow-50 rounded-lg p-2 sm:bg-transparent sm:p-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Arrendadas</p>
              <p className="text-lg sm:text-2xl font-bold text-yellow-600">{rentedCount}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Rooms Grid */}
      <main className="mx-auto max-w-7xl px-3 py-6 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onStatusChange={handleStatusChange}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      <StatusModal
        isOpen={modalOpen}
        roomNumber={rooms.find(r => r.id === selectedRoomId)?.number || 0}
        onConfirm={handleModalConfirm}
        onCancel={() => {
          setModalOpen(false);
          setSelectedRoomId(null);
        }}
      />
    </div>
  );
}
