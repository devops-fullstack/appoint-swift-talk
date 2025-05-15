
import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { getTranslation } from '@/translations';
import CalendarService, { CalendarData } from '@/services/CalendarService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const AdminPortalIntegration: React.FC = () => {
  const { language, appointments, addAppointment, availableDates, toggleDateAvailability } = useApp();
  const t = (path: string) => getTranslation(language, path);
  
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Fetch data from the Angular Admin Portal format
  const fetchCalendarData = async () => {
    try {
      setIsSyncing(true);
      const data = await CalendarService.getCalendarData();
      setCalendarData(data);
      
      // Sync available dates
      syncAvailableDates(data);
      
      // Sync appointments
      syncAppointments(data);
      
      // Update last sync time
      const now = new Date();
      setLastSyncTime(now.toLocaleString());
      
      toast.success(t('admin.syncSuccess'));
      
    } catch (error) {
      console.error('Error syncing with Admin Portal:', error);
      toast.error(t('admin.syncError'));
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync available dates from calendar data
  const syncAvailableDates = (data: CalendarData) => {
    // Get date range for next 3 months
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
    
    // Iterate through each day and update availableDates
    for (
      let date = new Date(startDate); 
      date <= endDate; 
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split('T')[0];
      const isAvailable = CalendarService.isDateAvailable(data, dateString);
      
      // Only toggle if needed to avoid unnecessary state updates
      if (availableDates[dateString] !== isAvailable) {
        toggleDateAvailability(dateString);
      }
    }
  };

  // Sync appointments from calendar data
  const syncAppointments = (data: CalendarData) => {
    const newAppointments = CalendarService.convertToAppointments(data);
    
    // Check if each new appointment already exists
    newAppointments.forEach(newAppt => {
      const existing = appointments.some(
        appt => appt.date === newAppt.date && appt.time === newAppt.time
      );
      
      // Add only new appointments
      if (!existing) {
        addAppointment(newAppt);
      }
    });
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>{t('admin.portalIntegration')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <p>{t('admin.portalDescription')}</p>
          
          {lastSyncTime && (
            <p className="text-sm text-muted-foreground">
              {t('admin.lastSync')}: {lastSyncTime}
            </p>
          )}
          
          <Button 
            onClick={fetchCalendarData} 
            disabled={isSyncing}
            className="w-full"
          >
            {isSyncing ? t('admin.syncing') : t('admin.syncWithPortal')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPortalIntegration;
