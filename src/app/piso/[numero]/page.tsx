import FloorView from '@/components/FloorView';

interface FloorPageProps {
  params: Promise<{
    numero: string;
  }>;
}

export default async function FloorPage({ params }: FloorPageProps) {
  const { numero } = await params;
  const floorNumber = parseInt(numero, 10);

  if (isNaN(floorNumber) || floorNumber < 1 || floorNumber > 3) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Piso no válido</h1>
          <p className="text-gray-600">Los pisos disponibles son 1, 2 y 3</p>
        </div>
      </div>
    );
  }

  return <FloorView floorNumber={floorNumber} />;
}
