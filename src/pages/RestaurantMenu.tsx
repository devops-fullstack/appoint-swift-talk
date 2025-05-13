
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, MenuItem } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const RestaurantMenu = () => {
  const {
    language,
    restaurantMenuUrl,
    setRestaurantMenuUrl,
    menuItems,
    setMenuItems,
    phoneBookingActive,
    setPhoneBookingActive,
  } = useApp();
  const navigate = useNavigate();
  
  const t = (path: string) => getTranslation(language, path);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("18:00");

  const fetchMenuData = async () => {
    if (!restaurantMenuUrl) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an actual API call
      // Simulating API call with mock data
      setTimeout(() => {
        // Mock menu data
        const mockMenu: MenuItem[] = [
          { name: "Margherita Pizza", price: "€8.50" },
          { name: "Pepperoni Pizza", price: "€10.00" },
          { name: "Quattro Formaggi", price: "€11.00" },
          { name: "Capricciosa", price: "€10.50" },
          { name: "Caesar Salad", price: "€6.00" },
          { name: "Tiramisu", price: "€5.00" },
          { name: "Panna Cotta", price: "€4.50" },
        ];
        
        setMenuItems(mockMenu);
        setShowConfirmDialog(true);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error fetching menu:", error);
      toast.error("Failed to fetch menu data");
      setIsLoading(false);
    }
  };

  const handleConfirmMenu = (confirmed: boolean) => {
    setShowConfirmDialog(false);
    
    if (confirmed) {
      toast.success("Menu confirmed!");
    } else {
      // Reset menu items if not confirmed
      setMenuItems([]);
    }
  };

  const handleSaveAndEnable = () => {
    setPhoneBookingActive(true);
    toast.success(t("phoneBooking.phoneBookingActive"));
    navigate("/");
  };
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : `${i}`;
    return `${hour}:00`;
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Restaurant Menu Setup</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("restaurant.enterMenuUrl")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="url"
                value={restaurantMenuUrl}
                onChange={(e) => setRestaurantMenuUrl(e.target.value)}
                placeholder="https://www.yourrestaurant.com/menu"
              />
              <Button onClick={fetchMenuData} disabled={isLoading || !restaurantMenuUrl} className="w-full">
                {isLoading ? "Loading..." : t("restaurant.fetchMenu")}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {menuItems.length > 0 && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {menuItems.map((item, index) => (
                    <div key={index} className="py-3 flex justify-between">
                      <span>{item.name}</span>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t("restaurant.dayOfWeek")}</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">Select a day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t("restaurant.startTime")}</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  className="w-full p-2 border rounded"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </CardContent>
            </Card>
            
            <Button 
              onClick={handleSaveAndEnable} 
              className={`w-full ${phoneBookingActive ? "bg-activered hover:bg-red-700" : ""}`}
              disabled={!selectedDay}
            >
              {t("restaurant.saveAndEnable")}
            </Button>
          </>
        )}
        
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("restaurant.confirmMenu")}</DialogTitle>
              <DialogDescription>
                We've found {menuItems.length} items from your menu.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-4 mt-4">
              <Button variant="outline" onClick={() => handleConfirmMenu(false)}>
                {t("restaurant.no")}
              </Button>
              <Button onClick={() => handleConfirmMenu(true)}>
                {t("restaurant.yes")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default RestaurantMenu;
