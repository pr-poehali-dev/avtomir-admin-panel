import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Car } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface CarDetailsModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetailsModal = ({ car, isOpen, onClose }: CarDetailsModalProps) => {
  if (!car) return null;

  const getTransmissionLabel = (transmission: string) => {
    const labels = {
      manual: "Механика",
      automatic: "Автомат",
      robot: "Робот",
    };
    return labels[transmission as keyof typeof labels] || transmission;
  };

  const getBodyTypeLabel = (bodyType: string) => {
    const labels = {
      sedan: "Седан",
      liftback: "Лифтбек",
      hatchback: "Хетчбек",
      truck: "Грузовик",
    };
    return labels[bodyType as keyof typeof labels] || bodyType;
  };

  const getEngineTypeLabel = (engineType: string) => {
    const labels = {
      petrol: "Бензин",
      diesel: "Дизель",
      electric: "Электрокар",
    };
    return labels[engineType as keyof typeof labels] || engineType;
  };

  const getDriveTypeLabel = (driveType: string) => {
    const labels = {
      front: "Передний",
      rear: "Задний",
      all: "Полный",
    };
    return labels[driveType as keyof typeof labels] || driveType;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {car.brand} {car.model} ({car.year})
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Основные характеристики
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Марка:</span>
                  <span className="text-sm font-medium">{car.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Модель:</span>
                  <span className="text-sm font-medium">{car.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Год выпуска:</span>
                  <span className="text-sm font-medium">{car.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Тип кузова:</span>
                  <Badge variant="secondary">
                    {getBodyTypeLabel(car.bodyType)}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Трансмиссия и привод
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">КПП:</span>
                  <Badge variant="outline">
                    {getTransmissionLabel(car.transmission)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Привод:</span>
                  <Badge variant="outline">
                    {getDriveTypeLabel(car.driveType)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Двигатель
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Тип:</span>
                  <Badge variant="outline">
                    {getEngineTypeLabel(car.engineType)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Объем:</span>
                  <span className="text-sm font-medium">
                    {car.engineVolume > 0 ? `${car.engineVolume} л` : "Электро"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Мощность:</span>
                  <span className="text-sm font-medium">
                    {car.horsepower} л.с.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">0-100 км/ч:</span>
                  <span className="text-sm font-medium">
                    {car.acceleration} сек
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Дата добавления
              </h3>
              <span className="text-sm text-gray-600">
                {format(car.createdAt, "dd MMMM yyyy", { locale: ru })}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsModal;
