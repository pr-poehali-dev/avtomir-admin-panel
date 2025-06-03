import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/types";
import { Edit2, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import CarDetailsModal from "./CarDetailsModal";

interface CarsTableProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (carId: string) => void;
}

const CarsTable = ({ cars, onEdit, onDelete }: CarsTableProps) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getEngineTypeColor = (type: string) => {
    switch (type) {
      case "electric":
        return "bg-green-100 text-green-800";
      case "diesel":
        return "bg-yellow-100 text-yellow-800";
      case "petrol":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Марка</TableHead>
              <TableHead className="font-semibold">Модель</TableHead>
              <TableHead className="font-semibold">Год</TableHead>
              <TableHead className="font-semibold">Двигатель</TableHead>
              <TableHead className="font-semibold">Мощность</TableHead>
              <TableHead className="font-semibold">Добавлено</TableHead>
              <TableHead className="font-semibold text-center">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow
                key={car.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">{car.brand}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>
                  <Badge className={getEngineTypeColor(car.engineType)}>
                    {car.engineType === "electric"
                      ? "Электро"
                      : car.engineType === "diesel"
                        ? "Дизель"
                        : "Бензин"}
                  </Badge>
                </TableCell>
                <TableCell>{car.horsepower} л.с.</TableCell>
                <TableCell className="text-gray-600">
                  {format(car.createdAt, "dd.MM.yy", { locale: ru })}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(car)}
                      className="h-8 w-8 p-0 hover:bg-blue-100"
                    >
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(car)}
                      className="h-8 w-8 p-0 hover:bg-yellow-100"
                    >
                      <Edit2 className="h-4 w-4 text-yellow-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(car.id)}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CarDetailsModal
        car={selectedCar}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedCar(null);
        }}
      />
    </>
  );
};

export default CarsTable;
