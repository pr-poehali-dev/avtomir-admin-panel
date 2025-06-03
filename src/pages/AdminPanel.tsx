import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/admin/StatsCard";
import CarsTable from "@/components/admin/CarsTable";
import OrdersTable from "@/components/admin/OrdersTable";
import CarFormModal from "@/components/admin/CarFormModal";
import { mockCars, mockOrders } from "@/data/mockData";
import { Car, Order } from "@/types";
import { Car as CarIcon, ShoppingCart, Plus, TrendingUp } from "lucide-react";

const AdminPanel = () => {
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState("overview");

  const handleDeleteCar = (carId: string) => {
    setCars((prev) => prev.filter((car) => car.id !== carId));
  };

  const handleEditCar = (car: Car) => {
    // TODO: Implement edit functionality
    console.log("Edit car:", car);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const handleSaveCar = (carData: Omit<Car, "id" | "createdAt">) => {
    if (editingCar) {
      setCars((prev) =>
        prev.map((car) =>
          car.id === editingCar.id ? { ...car, ...carData } : car,
        ),
      );
    } else {
      const newCar: Car = {
        ...carData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setCars((prev) => [newCar, ...prev]);
    }
    setEditingCar(null);
    setIsCarFormOpen(false);
  };

  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isCarFormOpen, setIsCarFormOpen] = useState(false);

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setIsCarFormOpen(true);
  };

  const handleAddCar = () => {
    setEditingCar(null);
    setIsCarFormOpen(true);
  };

  const getOrdersStats = () => {
    const total = orders.length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const pending = orders.filter(
      (o) => o.status === "reviewing" || o.status === "in_transit",
    ).length;
    return { total, completed, pending };
  };

  const orderStats = getOrdersStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">АвтоМир</h1>
            <p className="text-gray-600 mt-1">Панель администрирования</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="cars">Автомобили</TabsTrigger>
            <TabsTrigger value="orders">Заявки</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Всего автомобилей"
                value={cars.length}
                icon={CarIcon}
                description="В каталоге системы"
                trend="neutral"
              />
              <StatsCard
                title="Активные заявки"
                value={orderStats.pending}
                icon={TrendingUp}
                description="Требуют внимания"
                trend="up"
              />
              <StatsCard
                title="Всего заявок"
                value={orderStats.total}
                icon={ShoppingCart}
                description="За всё время"
                trend="neutral"
              />
              <StatsCard
                title="Завершенных"
                value={orderStats.completed}
                icon={TrendingUp}
                description="Успешно закрыто"
                trend="up"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Последние добавленные авто
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cars.slice(0, 3).map((car) => (
                      <div
                        key={car.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            {car.brand} {car.model}
                          </div>
                          <div className="text-sm text-gray-500">
                            {car.year} год
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {car.horsepower} л.с.
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Недавние заявки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            {order.carBrand} {order.carModel}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.phoneNumber}
                          </div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {order.status === "reviewing"
                            ? "На рассмотрении"
                            : order.status === "completed"
                              ? "Завершено"
                              : "В пути"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Управление автомобилями
                </h2>
                <p className="text-gray-600">
                  Всего автомобилей: {cars.length}
                </p>
              </div>
              <Button
                className="flex items-center gap-2"
                onClick={handleAddCar}
              >
                <Plus className="h-4 w-4" />
                Добавить автомобиль
              </Button>
            </div>

            <CarsTable
              cars={cars}
              onEdit={handleEditCar}
              onDelete={handleDeleteCar}
            />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Управление заявками
                </h2>
                <p className="text-gray-600">Всего заявок: {orders.length}</p>
              </div>
            </div>

            <OrdersTable
              orders={orders}
              cars={cars}
              onDelete={handleDeleteOrder}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
        </Tabs>

        <CarFormModal
          car={editingCar}
          isOpen={isCarFormOpen}
          onClose={() => {
            setIsCarFormOpen(false);
            setEditingCar(null);
          }}
          onSave={handleSaveCar}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
