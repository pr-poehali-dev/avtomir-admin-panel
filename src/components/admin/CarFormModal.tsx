import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car } from "@/types";

interface CarFormModalProps {
  car?: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (car: Omit<Car, "id" | "createdAt">) => void;
}

const CarFormModal = ({ car, isOpen, onClose, onSave }: CarFormModalProps) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    transmission: "manual" as "manual" | "automatic",
    bodyType: "sedan" as "sedan" | "hatchback" | "suv" | "coupe" | "wagon",
    engineType: "petrol" as "petrol" | "diesel" | "electric",
    driveType: "front" as "front" | "rear" | "all",
    horsepower: 0,
    acceleration: 0,
    engineVolume: 0,
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        transmission: car.transmission,
        bodyType: car.bodyType,
        engineType: car.engineType,
        driveType: car.driveType,
        horsepower: car.horsepower,
        acceleration: car.acceleration,
        engineVolume: car.engineVolume,
        imageUrl: car.imageUrl,
        description: car.description,
      });
    } else {
      setFormData({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        transmission: "manual",
        bodyType: "sedan",
        engineType: "petrol",
        driveType: "front",
        horsepower: 0,
        acceleration: 0,
        engineVolume: 0,
        imageUrl: "",
        description: "",
      });
    }
  }, [car, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {car ? "Редактировать автомобиль" : "Добавить автомобиль"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Марка</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="model">Модель</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Год выпуска</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) =>
                  handleInputChange("year", parseInt(e.target.value))
                }
                min="1900"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
            <div>
              <Label htmlFor="transmission">КПП</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) =>
                  handleInputChange("transmission", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Механика</SelectItem>
                  <SelectItem value="automatic">Автомат</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bodyType">Тип кузова</Label>
              <Select
                value={formData.bodyType}
                onValueChange={(value) => handleInputChange("bodyType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Седан</SelectItem>
                  <SelectItem value="hatchback">Хэтчбек</SelectItem>
                  <SelectItem value="suv">Внедорожник</SelectItem>
                  <SelectItem value="coupe">Купе</SelectItem>
                  <SelectItem value="wagon">Универсал</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="engineType">Тип двигателя</Label>
              <Select
                value={formData.engineType}
                onValueChange={(value) =>
                  handleInputChange("engineType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Бензин</SelectItem>
                  <SelectItem value="diesel">Дизель</SelectItem>
                  <SelectItem value="electric">Электро</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="driveType">Привод</Label>
              <Select
                value={formData.driveType}
                onValueChange={(value) => handleInputChange("driveType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="front">Передний</SelectItem>
                  <SelectItem value="rear">Задний</SelectItem>
                  <SelectItem value="all">Полный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="horsepower">Мощность (л.с.)</Label>
              <Input
                id="horsepower"
                type="number"
                value={formData.horsepower}
                onChange={(e) =>
                  handleInputChange("horsepower", parseInt(e.target.value))
                }
                min="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="acceleration">Разгон 0-100 (сек)</Label>
              <Input
                id="acceleration"
                type="number"
                step="0.1"
                value={formData.acceleration}
                onChange={(e) =>
                  handleInputChange("acceleration", parseFloat(e.target.value))
                }
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="engineVolume">Объем двигателя (л)</Label>
              <Input
                id="engineVolume"
                type="number"
                step="0.1"
                value={formData.engineVolume}
                onChange={(e) =>
                  handleInputChange("engineVolume", parseFloat(e.target.value))
                }
                min="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">URL изображения</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Краткое описание автомобиля"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">{car ? "Сохранить" : "Добавить"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CarFormModal;
