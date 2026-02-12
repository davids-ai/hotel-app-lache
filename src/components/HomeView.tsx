'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Building2, ChevronRight } from 'lucide-react';

export default function HomeView() {
  const floors = [
    { number: 1, rooms: '10 habitaciones' },
    { number: 2, rooms: '10 habitaciones' },
    { number: 3, rooms: '10 habitaciones' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <Image 
              src="/logo.png" 
              alt="Hotel Gran Lache Logo"
              width={128}
              height={128}
              priority
              className="w-32 h-32"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Hotel Gran Lache Administrador</h1>
              <p className="text-xs sm:text-sm text-gray-600">Sistema de Gestión de Habitaciones</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Selecciona un Piso</h2>
          <p className="text-sm sm:text-base text-gray-600">Elige el piso para gestionar sus habitaciones</p>
        </div>

        {/* Floors Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {floors.map(floor => (
            <Link href={`/piso/${floor.number}`} key={floor.number}>
              <div className="group relative h-40 sm:h-48 rounded-2xl border-2 border-gray-200 bg-white p-4 sm:p-6 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl sm:hover:scale-105 cursor-pointer active:scale-95">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-between">
                  {/* Icon */}
                  <div className="rounded-full bg-blue-100 p-3 sm:p-4 transition-transform duration-300 group-hover:scale-110">
                    <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>

                  {/* Text */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Piso {floor.number}</h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">{floor.rooms}</p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
