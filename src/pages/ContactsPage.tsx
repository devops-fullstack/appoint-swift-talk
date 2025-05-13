
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ContactsPage = () => {
  const { language } = useApp();
  const t = (path: string) => getTranslation(language, path);
  
  const [activeTab, setActiveTab] = useState("technical");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    
    // Show success message
    toast.success("Your message has been sent!");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("navigation.contacts")}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="technical">{t("contacts.technical")}</TabsTrigger>
                <TabsTrigger value="legal">{t("contacts.legal")}</TabsTrigger>
                <TabsTrigger value="administrative">{t("contacts.administrative")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="technical">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Name</label>
                    <Input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Email</label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Message</label>
                    <Textarea 
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your technical issue..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {t("contacts.sendMessage")}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="legal">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Name</label>
                    <Input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Email</label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Message</label>
                    <Textarea 
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your legal query..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {t("contacts.sendMessage")}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="administrative">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Name</label>
                    <Input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Email</label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Invoice Number (if applicable)</label>
                    <Input />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Message</label>
                    <Textarea 
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your administrative or invoicing query..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {t("contacts.sendMessage")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContactsPage;
