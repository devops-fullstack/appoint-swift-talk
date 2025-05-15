
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AdminPortalIntegration from "@/components/AdminPortalIntegration";

const SettingsPage = () => {
  const { language, phoneBookingActive, setPhoneBookingActive } = useApp();
  const t = (path: string) => getTranslation(language, path);

  const handlePhoneBookingChange = (checked: boolean) => {
    setPhoneBookingActive(checked);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-2xl font-bold">{t("settings.title")}</h1>

        <AdminPortalIntegration />
        
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.voiceResponse")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch 
                id="phone-booking" 
                checked={phoneBookingActive}
                onCheckedChange={handlePhoneBookingChange}
              />
              <Label htmlFor="phone-booking">{t("settings.enablePhoneBooking")}</Label>
            </div>
            
            {phoneBookingActive && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
                <p>{t("phoneBooking.authorize")}</p>
                <p>{t("phoneBooking.listenWithoutRecording")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage;
