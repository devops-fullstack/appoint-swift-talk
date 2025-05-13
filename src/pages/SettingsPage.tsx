
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SettingsPage = () => {
  const { language, setLanguage } = useApp();
  const t = (path: string) => getTranslation(language, path);
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
  };
  
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("navigation.settings")}</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Language</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="en">{t("english")}</option>
              <option value="it">{t("italian")}</option>
              <option value="es">{t("spanish")}</option>
            </select>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Voice Response Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-enabled">Voice booking enabled</Label>
              <Switch id="voice-enabled" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="response-confirmation">Require confirmation</Label>
              <Switch id="response-confirmation" defaultChecked />
            </div>
            
            <div>
              <Label htmlFor="voice-type" className="block mb-2">Voice type</Label>
              <select id="voice-type" className="w-full p-2 border rounded-md">
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="voice-speed" className="block mb-2">Voice speed</Label>
              <select id="voice-speed" className="w-full p-2 border rounded-md">
                <option value="slow">Slow</option>
                <option value="normal" selected>Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="booking-notifications">New booking alerts</Label>
              <Switch id="booking-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="cancellation-notifications">Cancellation notifications</Label>
              <Switch id="cancellation-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={handleSave} className="w-full">Save Settings</Button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
