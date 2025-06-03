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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, Car } from "@/types";
import { Trash2, ArrowUpDown, Filter } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import CarDetailsModal from "./CarDetailsModal";

interface OrdersTableProps {
  orders: Order[];
  cars: Car[];
  onDelete: (orderId: string) => void;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

const OrdersTable = ({
  orders,
  cars,
  onDelete,
  onStatusChange,
}: OrdersTableProps) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusLabel = (status: string) => {
    const labels = {
      created: "Создана",
      reviewing: "На рассмотрении",
      in_transit: "В пути",
      cancelled: "Отменено",
      completed: "Завершено",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "created":
        return "bg-gray-100 text-gray-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "in_transit":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewCar = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    if (car) {
      setSelectedCar(car);
      setIsCarDetailsOpen(true);
    }
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredAndSortedOrders = orders
    .filter((order) => statusFilter === "all" || order.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Фильтр по статусу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="created">Создана</SelectItem>
            <SelectItem value="reviewing">На рассмотрении</SelectItem>
            <SelectItem value="in_transit">В пути</SelectItem>
            <SelectItem value="cancelled">Отменено</SelectItem>
            <SelectItem value="completed">Завершено</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Телефон</TableHead>
              <TableHead className="font-semibold">Авто</TableHead>
              <TableHead className="font-semibold">ID авто</TableHead>
              <TableHead className="font-semibold">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-semibold hover:bg-transparent"
                  onClick={toggleSort}
                >
                  Дата заявки
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">Статус</TableHead>
              <TableHead className="font-semibold text-center">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">
                  {order.phoneNumber}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.carBrand}</div>
                    <div className="text-sm text-gray-500">
                      {order.carModel}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-mono text-blue-600 hover:text-blue-800"
                    onClick={() => handleViewCar(order.carId)}
                  >
                    #{order.carId}
                  </Button>
                </TableCell>
                <TableCell className="text-gray-600">
                  {format(order.createdAt, "dd.MM.yy", { locale: ru })}
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) => onStatusChange(order.id, value)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created">Создана</SelectItem>
                      <SelectItem value="reviewing">На рассмотрении</SelectItem>
                      <SelectItem value="in_transit">В пути</SelectItem>
                      <SelectItem value="cancelled">Отменено</SelectItem>
                      <SelectItem value="completed">Завершено</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(order.id)}
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
        isOpen={isCarDetailsOpen}
        onClose={() => {
          setIsCarDetailsOpen(false);
          setSelectedCar(null);
        }}
      />
    </>
  );
};

export default OrdersTable;
