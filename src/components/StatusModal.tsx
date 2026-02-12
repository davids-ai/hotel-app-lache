'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { RoomStatus, ModifiedBy } from '@/types/room';

interface StatusModalProps {
  isOpen: boolean;
  roomNumber: number;
  onConfirm: (name: string, phone: string, status: RoomStatus, modifiedBy: ModifiedBy) => void;
  onCancel: () => void;
}

export default function StatusModal({
  isOpen,
  roomNumber,
  onConfirm,
  onCancel,
}: StatusModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<RoomStatus>('ocupada');
  const [modifiedBy, setModifiedBy] = useState<ModifiedBy>('Administrador');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm(name, phone, status, modifiedBy);
      setName('');
      setPhone('');
      setStatus('ocupada');
      setModifiedBy('Administrador');
      setErrors({});
    }
  };

  const handleCancel = () => {
    setName('');
    setPhone('');
    setStatus('ocupada');
    setModifiedBy('Administrador');
    setErrors({});
    onCancel();
  };

  if (!isOpen) return null;

  const statusLabels: Record<RoomStatus, string> = {
    disponible: 'Disponible',
    ocupada: 'Ocupada',
    arrendada: 'Arrendada',
  };

  const statusColors: Record<RoomStatus, string> = {
    disponible: 'bg-green-100 text-green-800',
    ocupada: 'bg-red-100 text-red-800',
    arrendada: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4 pt-12 sm:pt-0">
      <div className="w-full max-w-md rounded-b-3xl sm:rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Habitación {roomNumber}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Registrar información del huésped</p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3 sm:space-y-4 px-4 sm:px-6 py-4 sm:py-6">
          {/* Status Select */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Estado *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as RoomStatus)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-3 sm:px-4 py-2 text-sm text-gray-900 font-semibold transition-colors focus:outline-none focus:border-blue-500"
            >
              <option value="ocupada" className="text-gray-900">Ocupada</option>
              <option value="arrendada" className="text-gray-900">Arrendada</option>
            </select>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="Ingresa el nombre completo"
              className={`w-full rounded-lg border-2 px-3 sm:px-4 py-2 text-sm text-gray-900 font-semibold placeholder-gray-500 transition-colors focus:outline-none ${
                errors.name
                  ? 'border-red-500 bg-red-50 focus:border-red-600'
                  : 'border-gray-300 bg-white focus:border-blue-500'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              placeholder="Ingresa el teléfono"
              className={`w-full rounded-lg border-2 px-3 sm:px-4 py-2 text-sm text-gray-900 font-semibold placeholder-gray-500 transition-colors focus:outline-none ${
                errors.phone
                  ? 'border-red-500 bg-red-50 focus:border-red-600'
                  : 'border-gray-300 bg-white focus:border-blue-500'
              }`}
            />
            {errors.phone && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Modified By Select */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Modificado por *
            </label>
            <select
              value={modifiedBy}
              onChange={(e) => setModifiedBy(e.target.value as ModifiedBy)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-3 sm:px-4 py-2 text-sm text-gray-900 font-semibold transition-colors focus:outline-none focus:border-blue-500"
            >
              <option value="Fredy" className="text-gray-900">Fredy</option>
              <option value="Rocio" className="text-gray-900">Rocio</option>
              <option value="Administrador" className="text-gray-900">Administrador</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white flex gap-3 border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-b-3xl sm:rounded-none">
          <button
            onClick={handleCancel}
            className="flex-1 rounded-lg border-2 border-gray-300 px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 active:scale-95"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-lg bg-blue-600 px-3 sm:px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 active:scale-95"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
