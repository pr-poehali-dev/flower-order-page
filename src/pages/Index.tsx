
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Данные о заказах букетов
const orders = [
  {
    id: 1,
    customerName: "Анна Иванова",
    phone: "+7 (912) 345-67-89",
    bouquetName: "Нежность пионов",
    price: 5900,
    status: "completed",
    date: "2025-05-08",
    address: "ул. Ленина, 45-12, Москва"
  },
  {
    id: 2,
    customerName: "Петр Сидоров",
    phone: "+7 (923) 456-78-90",
    bouquetName: "Нежный рассвет",
    price: 6200,
    status: "completed",
    date: "2025-05-07",
    address: "пр. Мира, 78-22, Санкт-Петербург"
  },
  {
    id: 3,
    customerName: "Елена Петрова",
    phone: "+7 (934) 567-89-01",
    bouquetName: "Весенний шепот",
    price: 4200,
    status: "processing",
    date: "2025-05-09",
    address: "ул. Гагарина, 15-33, Москва"
  },
  {
    id: 4,
    customerName: "Максим Кузнецов",
    phone: "+7 (945) 678-90-12",
    bouquetName: "Греческий закат",
    price: 4400,
    status: "pending",
    date: "2025-05-10",
    address: "ул. Пушкина, 92-15, Казань"
  },
  {
    id: 5,
    customerName: "Ольга Смирнова",
    phone: "+7 (956) 789-01-23",
    bouquetName: "Голубая лагуна",
    price: 5999,
    status: "processing",
    date: "2025-05-09",
    address: "пр. Ленина, 34-56, Екатеринбург"
  }
];

// Статистика по продажам
const salesStats = {
  totalOrders: orders.length,
  totalRevenue: orders.reduce((sum, order) => sum + order.price, 0),
  pendingOrders: orders.filter(order => order.status === "pending").length,
  processingOrders: orders.filter(order => order.status === "processing").length,
  completedOrders: orders.filter(order => order.status === "completed").length
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Фильтрация заказов по статусу и поисковому запросу
  const filteredOrders = orders
    .filter(order => activeTab === "all" || order.status === activeTab)
    .filter(order => 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.bouquetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm)
    );

  // Получаем статус текстом
  const getStatusText = (status: string) => {
    switch(status) {
      case "pending": return "Ожидает";
      case "processing": return "В обработке";
      case "completed": return "Выполнен";
      default: return "Неизвестно";
    }
  };

  // Получаем цвет бейджа в зависимости от статуса
  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case "pending": return "default";
      case "processing": return "secondary";
      case "completed": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хедер */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Flower" className="h-6 w-6 text-purple-600" />
            <h1 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">Система учета заказов букетов</h1>
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Icon name="Bell" className="h-4 w-4 mr-2" />
              Уведомления
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Icon name="Settings" className="h-4 w-4 mr-2" />
              Настройки
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="LogOut" className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Выход</span>
            </Button>
          </nav>
        </div>
      </header>

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardDescription>Всего заказов</CardDescription>
                <CardTitle className="text-2xl">{salesStats.totalOrders}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" className="h-4 w-4 mr-1" />
                  +12% с прошлого месяца
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardDescription>Общая выручка</CardDescription>
                <CardTitle className="text-2xl">{salesStats.totalRevenue.toLocaleString()} ₽</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" className="h-4 w-4 mr-1" />
                  +5% с прошлого месяца
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardDescription>Ожидают обработки</CardDescription>
                <CardTitle className="text-2xl">{salesStats.pendingOrders + salesStats.processingOrders}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-orange-500">
                  <Icon name="Clock" className="h-4 w-4 mr-1" />
                  Требует внимания
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardDescription>Выполнено заказов</CardDescription>
                <CardTitle className="text-2xl">{salesStats.completedOrders}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="CheckCircle" className="h-4 w-4 mr-1" />
                  На этой неделе
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Панель управления заказами */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="font-playfair">Заказы букетов</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Поиск заказов..." 
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button>
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Новый заказ
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Табы для фильтрации */}
              <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">Все заказы</TabsTrigger>
                  <TabsTrigger value="pending">Ожидают</TabsTrigger>
                  <TabsTrigger value="processing">В обработке</TabsTrigger>
                  <TabsTrigger value="completed">Выполнены</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Таблица заказов */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Букет</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{order.customerName}</div>
                              <div className="text-sm text-muted-foreground">{order.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>{order.bouquetName}</TableCell>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString('ru-RU')}
                          </TableCell>
                          <TableCell className="font-medium">{order.price.toLocaleString()} ₽</TableCell>
                          <TableCell>
                            <Badge 
                              variant={getStatusBadgeVariant(order.status)}
                              className={
                                order.status === "completed" 
                                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                : order.status === "processing"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                              }
                            >
                              {getStatusText(order.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Icon name="Eye" className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Icon name="Edit" className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Icon name="MoreVertical" className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Заказы не найдены
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Icon name="Flower" className="h-5 w-5 text-purple-600" />
              <span className="font-playfair font-bold text-gray-800">FloraShop CRM</span>
            </div>
            <p className="text-gray-600 text-sm">© 2025 FloraShop. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
