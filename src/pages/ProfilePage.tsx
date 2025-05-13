
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

const ProfilePage = () => {
  const { language } = useApp();
  const t = (path: string) => getTranslation(language, path);
  
  const handleAddPayment = () => {
    toast.info("Payment method would be added here");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("navigation.profile")}</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-10">
              <div className="flex justify-center mb-4">
                <CreditCard className="h-16 w-16 text-gray-400" />
              </div>
              <p className="mb-4">No payment methods added yet</p>
              <Button onClick={handleAddPayment}>Add Payment Method</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Free Trial</h3>
                  <p className="text-sm text-gray-600">Basic features</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-4 mb-4 cursor-pointer hover:border-primary transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Premium Plan</h3>
                  <p className="text-sm text-gray-600">All features including voice booking</p>
                </div>
                <span className="text-primary text-sm font-medium">
                  €9.99/month
                </span>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Professional Plan</h3>
                  <p className="text-sm text-gray-600">All features + multiple businesses</p>
                </div>
                <span className="text-primary text-sm font-medium">
                  €19.99/month
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
