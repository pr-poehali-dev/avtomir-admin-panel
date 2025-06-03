import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">АвтоМир</h1>
          <p className="text-xl text-gray-600 mb-8">
            Система управления автомобильным сервисом
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin")}
          size="lg"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Settings className="h-5 w-5" />
          Перейти в админ-панель
        </Button>
      </div>
    </div>
  );
};

export default Index;
