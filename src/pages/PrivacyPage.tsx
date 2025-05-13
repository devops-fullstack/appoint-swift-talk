
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const PrivacyPage = () => {
  const { language } = useApp();
  const t = (path: string) => getTranslation(language, path);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("navigation.privacy")}</h1>
        
        <Card className="mb-6">
          <CardHeader className="flex flex-col items-center">
            <Shield className="h-12 w-12 mb-2 text-primary" />
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Our Commitment to Privacy</h3>
                <p className="text-gray-700">
                  At AppointmentPro, we are committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, and safeguard 
                  your information when you use our application.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Voice Booking Protection</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>{t("privacy.noRecording")}</li>
                  <li>{t("privacy.noBackgroundMic")}</li>
                  <li>{t("privacy.userControlled")}</li>
                  <li>{t("privacy.appointmentsOnly")}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Data We Collect</h3>
                <p className="text-gray-700 mb-4">
                  We only collect information that you voluntarily provide to us:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Your name and business information</li>
                  <li>Your language preference</li>
                  <li>Your appointment calendar availability</li>
                  <li>Restaurant menu information (if applicable)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">How We Use Your Data</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>To provide our appointment booking services</li>
                  <li>To display and manage your business calendar</li>
                  <li>To facilitate voice-based appointment booking</li>
                  <li>To improve our services based on your preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Your Rights</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Access and view all personal data we hold about you</li>
                  <li>Request correction of any inaccurate information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
                <p className="text-gray-700">
                  If you have any questions or concerns about our privacy practices,
                  please contact us through the Contacts section of the application.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
