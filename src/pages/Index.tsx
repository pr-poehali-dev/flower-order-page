
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

// Данные о букетах
const bouquets = [
  {
    id: 1,
    name: "Нежность пионов",
    price: 5900,
    status: "ordered",
    image: "https://images.unsplash.com/photo-1556894410-fea7c012207b?auto=format&fit=crop&q=80&w=774&ixlib=rb-4.0.3",
    description: "Нежный букет из розовых пионов с добавлением зелени и эвкалипта"
  },
  {
    id: 2,
    name: "Нежный рассвет",
    price: 6200,
    status: "completed",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=774&ixlib=rb-4.0.3",
    description: "Комбинация розовых и персиковых роз с декоративными элементами"
  },
  {
    id: 3,
    name: "Весенний шепот",
    price: 4200,
    status: "ordered",
    image: "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?auto=format&fit=crop&q=80&w=774&ixlib=rb-4.0.3",
    description: "Яркий весенний букет с тюльпанами и нарциссами"
  },
  {
    id: 4,
    name: "Греческий закат",
    price: 4400,
    status: "completed",
    image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?auto=format&fit=crop&q=80&w=774&ixlib=rb-4.0.3",
    description: "Сочетание белых и синих цветов, напоминающее о побережье Греции"
  },
  {
    id: 5,
    name: "Голубая лагуна",
    price: 5999,
    status: "ordered",
    image: "https://images.unsplash.com/photo-1529613503687-8f8cfe184b58?auto=format&fit=crop&q=80&w=774&ixlib=rb-4.0.3",
    description: "Букет в голубых тонах с гортензиями и голубыми розами"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredBouquets = activeTab === "all" 
    ? bouquets 
    : bouquets.filter(bouquet => bouquet.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хедер */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Flower" className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-playfair font-bold text-gray-800">FloraShop</h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost">Главная</Button>
            <Button variant="ghost">Каталог</Button>
            <Button variant="ghost">О нас</Button>
            <Button variant="ghost">Контакты</Button>
          </nav>
        </div>
      </header>

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-playfair font-bold text-gray-800">Заказы букетов</h2>
          <Button>
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Новый заказ
          </Button>
        </div>

        {/* Табы для фильтрации */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Все букеты</TabsTrigger>
            <TabsTrigger value="ordered">Заказанные</TabsTrigger>
            <TabsTrigger value="completed">Выполненные</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Список букетов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBouquets.map((bouquet) => (
            <Card key={bouquet.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="h-64 overflow-hidden">
                <img 
                  src={bouquet.image} 
                  alt={bouquet.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="font-playfair">{bouquet.name}</CardTitle>
                  <Badge 
                    variant={bouquet.status === "completed" ? "secondary" : "default"}
                    className={bouquet.status === "completed" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}
                  >
                    {bouquet.status === "completed" ? "Выполнен" : "Заказан"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{bouquet.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xl font-semibold text-gray-900">{bouquet.price.toLocaleString()} ₽</span>
                <Button variant="outline" size="sm">
                  <Icon name="Eye" className="mr-2 h-4 w-4" />
                  Детали
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Icon name="Flower" className="h-5 w-5 text-purple-600" />
              <span className="font-playfair font-bold text-gray-800">FloraShop</span>
            </div>
            <p className="text-gray-600 text-sm">© 2025 FloraShop. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
