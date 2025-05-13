
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const CalendarView = () => {
  const {
    language,
    userName,
    availableDates,
    toggleDateAvailability,
    selectedDate,
    setSelectedDate,
    timeSlots,
    toggleTimeSlot,
    addAppointment,
    phoneBookingActive,
    setPhoneBookingActive,
  } = useApp();

  const t = (path: string) => getTranslation(language, path);
  
  const [currentDate] = useState(new Date());
  const [calendarDates, setCalendarDates] = useState<Date[][]>([]);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [showTimeSlotsDialog, setShowTimeSlotsDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  
  // Generate calendar dates
  useEffect(() => {
    const dates: Date[][] = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7; // Make Sunday the 7th day
    
    // Create an array with dates from previous month to fill the first week
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    let week: Date[] = [];
    
    // Add days from previous month
    for (let i = 1; i < firstDayOfWeek; i++) {
      const day = daysInPrevMonth - firstDayOfWeek + i + 1;
      week.push(new Date(currentYear, currentMonth - 1, day));
    }
    
    // Add days from current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      week.push(new Date(currentYear, currentMonth, day));
      
      // Start a new week on Sundays
      if (new Date(currentYear, currentMonth, day).getDay() === 0) {
        dates.push(week);
        week = [];
      }
    }
    
    // Add days from next month to complete the last week
    const lastDayOfWeek = lastDayOfMonth.getDay();
    if (lastDayOfWeek < 6) {
      for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
        week.push(new Date(currentYear, currentMonth + 1, i));
      }
    }
    
    // Add the last week
    if (week.length > 0) {
      dates.push(week);
    }
    
    setCalendarDates(dates);
  }, [currentMonth, currentYear]);
  
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isAvailable = (dateString: string) => {
    return availableDates[dateString] === true;
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateClick = (date: Date) => {
    if (isPastDate(date)) return;
    
    const dateString = formatDateString(date);
    toggleDateAvailability(dateString);
    
    if (!isAvailable(dateString)) {
      setSelectedDate(dateString);
      setShowTimeSlotsDialog(true);
    } else {
      setSelectedDate(null);
    }
  };
  
  const handleSaveAppointments = () => {
    if (!selectedDate) return;
    
    // Get selected time slots
    const selectedSlots = timeSlots.filter(slot => slot.selected);
    
    // Create appointments from selected slots
    selectedSlots.forEach(slot => {
      addAppointment({
        date: selectedDate,
        time: slot.time,
      });
    });
    
    setShowTimeSlotsDialog(false);
    setShowConfirmationDialog(true);
  };
  
  const handleConfirmation = () => {
    setShowConfirmationDialog(false);
    toast.success(t("calendar.appointmentsSaved"));
  };
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const togglePhoneBooking = () => {
    setPhoneBookingActive(!phoneBookingActive);
    
    if (!phoneBookingActive) {
      toast.success(t("phoneBooking.phoneBookingActive"));
    }
  };
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("calendar.selectDate")}</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={prevMonth}>&larr;</Button>
              <CardTitle className="text-xl font-bold">
                {monthNames[currentMonth]} {currentYear}
              </CardTitle>
              <Button variant="outline" onClick={nextMonth}>&rarr;</Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Calendar */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day names */}
              {dayNames.map((day) => (
                <div key={day} className="text-center font-medium py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar dates */}
              {calendarDates.map((week, weekIndex) => (
                week.map((date, dayIndex) => {
                  const dateString = formatDateString(date);
                  const isPast = isPastDate(date);
                  const isAvailableDay = isAvailable(dateString);
                  const isCurrentMonth = date.getMonth() === currentMonth;
                  
                  let bgClass = "bg-white";
                  
                  if (isPast) {
                    bgClass = "bg-past text-gray-400";
                  } else if (isAvailableDay) {
                    bgClass = "bg-available text-white";
                  } else {
                    bgClass = "bg-busy text-white";
                  }
                  
                  if (!isCurrentMonth) {
                    bgClass += " opacity-40";
                  }
                  
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`aspect-square flex items-center justify-center rounded cursor-pointer ${bgClass} ${
                        isPast ? "cursor-not-allowed" : "hover:opacity-80"
                      }`}
                      onClick={() => !isPast && handleDateClick(date)}
                    >
                      {date.getDate()}
                    </div>
                  );
                })
              ))}
            </div>
            
            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-past rounded mr-2"></div>
                <span className="text-sm">{t("calendar.pastDay")}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-busy rounded mr-2"></div>
                <span className="text-sm">{t("calendar.busyDay")}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-available rounded mr-2"></div>
                <span className="text-sm">{t("calendar.availableDay")}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-confirmed rounded mr-2"></div>
                <span className="text-sm">{t("calendar.confirmedAppointmentDay")}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button 
              onClick={togglePhoneBooking}
              className={`w-full ${phoneBookingActive ? "bg-activered hover:bg-red-700" : ""}`}
            >
              {t("phoneBooking.activate")}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Phone booking details */}
        {phoneBookingActive && (
          <Card className="mt-4">
            <CardContent className="pt-4">
              <p className="font-medium text-center">{t("phoneBooking.phoneBookingActive")}</p>
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
                <p>{t("phoneBooking.authorize")}</p>
                <p>{t("phoneBooking.listenWithoutRecording")}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Time slots dialog */}
        <Dialog open={showTimeSlotsDialog} onOpenChange={setShowTimeSlotsDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("calendar.selectTime")}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-2 my-4">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={slot.selected ? "default" : "outline"}
                  className={slot.selected ? "bg-available" : ""}
                  onClick={() => toggleTimeSlot(slot.time)}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
            <Button onClick={handleSaveAppointments} className="w-full">
              {t("calendar.saveAppointments")}
            </Button>
          </DialogContent>
        </Dialog>
        
        {/* Confirmation dialog */}
        <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("calendar.appointmentsSaved")}</DialogTitle>
            </DialogHeader>
            <div className="my-4">
              <p>
                {selectedDate && new Date(selectedDate).toLocaleDateString(language)}
              </p>
              <div className="mt-2">
                {timeSlots
                  .filter(slot => slot.selected)
                  .map(slot => (
                    <div key={slot.time} className="py-1">
                      {slot.time}
                    </div>
                  ))
                }
              </div>
            </div>
            <Button onClick={handleConfirmation} className="w-full">
              OK
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CalendarView;
