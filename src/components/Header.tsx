'use client';

import { Hotel } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 p-2">
              <Hotel className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hotel Management</h1>
              <p className="text-sm text-gray-600">Sistema de Gestión de Habitaciones</p>
            </div>
          </div>
          
          {onReset && (
            <button
              onClick={onReset}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-700 active:scale-95"
            >
              Resetear Todo
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
