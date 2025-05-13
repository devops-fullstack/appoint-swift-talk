
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const AccountPage = () => {
  const { language, userName, setUserName, businessType } = useApp();
  const t = (path: string) => getTranslation(language, path);
  
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  
  const getBusinessTypeName = (type: string) => {
    return type ? t(`businessTypes.${type}`) : "";
  };
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    toast.success("Account information saved successfully");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("navigation.account")}</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Name</label>
              <Input 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">Phone Number</label>
              <Input 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Business Type</label>
              <Input readOnly value={getBusinessTypeName(businessType)} />
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">Business Name</label>
              <Input 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">Address</label>
              <Input 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={handleSave} className="w-full">Save Information</Button>
      </div>
    </Layout>
  );
};

export default AccountPage;
