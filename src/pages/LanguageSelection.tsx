
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, BusinessType } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

const LanguageSelection = () => {
  const { 
    language, 
    setLanguage, 
    userName, 
    setUserName, 
    businessType, 
    setBusinessType 
  } = useApp();
  const navigate = useNavigate();
  const [formComplete, setFormComplete] = useState(false);
  
  const t = (path: string) => getTranslation(language, path);
  
  // Check if form is completed
  useEffect(() => {
    setFormComplete(!!userName && !!businessType);
  }, [userName, businessType]);

  const handleContinue = () => {
    if (businessType === 'pizzeria_restaurant') {
      navigate('/restaurant-menu');
    } else {
      navigate('/calendar');
    }
    toast(`Welcome, ${userName}!`);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">AppointmentPro</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="language-select" className="block text-sm font-medium mb-1">
              {t('languageSelection')}
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="w-full p-2 border rounded-md"
            >
              <option value="en">{t('english')}</option>
              <option value="it">{t('italian')}</option>
              <option value="es">{t('spanish')}</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="name-input" className="block text-sm font-medium mb-1">
              {t('nameInput')}
            </label>
            <Input
              id="name-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t('nameInput')}
            />
          </div>
          
          <div>
            <label htmlFor="business-type" className="block text-sm font-medium mb-1">
              {t('businessTypeSelection')}
            </label>
            <select
              id="business-type"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value as BusinessType)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">{t('businessTypeSelection')}</option>
              <option value="medical_office">{t('businessTypes.medical_office')}</option>
              <option value="analytical_laboratory">{t('businessTypes.analytical_laboratory')}</option>
              <option value="pizzeria_restaurant">{t('businessTypes.pizzeria_restaurant')}</option>
              <option value="lawyer">{t('businessTypes.lawyer')}</option>
              <option value="beauty_salon">{t('businessTypes.beauty_salon')}</option>
              <option value="professional">{t('businessTypes.professional')}</option>
            </select>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleContinue} 
            disabled={!formComplete}
            className="w-full"
          >
            {t('continue')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LanguageSelection;
