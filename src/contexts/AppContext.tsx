
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define business types
export type BusinessType = 
  | 'medical_office' 
  | 'analytical_laboratory' 
  | 'pizzeria_restaurant' 
  | 'lawyer' 
  | 'beauty_salon' 
  | 'professional'
  | '';

// Language options
export type Language = 'en' | 'it' | 'es';

// Time slot type
export type TimeSlot = {
  time: string;
  selected: boolean;
};

// Appointment type
export type Appointment = {
  date: string; // ISO format date
  time: string;
  name?: string;
  phoneNumber?: string;
};

// Menu item for restaurants
export type MenuItem = {
  name: string;
  price: string;
};

// Context state type
interface AppState {
  language: Language;
  setLanguage: (language: Language) => void;
  userName: string;
  setUserName: (name: string) => void;
  businessType: BusinessType;
  setBusinessType: (type: BusinessType) => void;
  availableDates: Record<string, boolean>; // ISO date string → available (true) or busy (false)
  toggleDateAvailability: (dateString: string) => void;
  selectedDate: string | null; // ISO format
  setSelectedDate: (date: string | null) => void;
  timeSlots: TimeSlot[];
  setTimeSlots: (slots: TimeSlot[]) => void;
  toggleTimeSlot: (time: string) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  restaurantMenuUrl: string;
  setRestaurantMenuUrl: (url: string) => void;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  phoneBookingActive: boolean;
  setPhoneBookingActive: (active: boolean) => void;
}

// Create context with default values
const AppContext = createContext<AppState>({
  language: 'en',
  setLanguage: () => {},
  userName: '',
  setUserName: () => {},
  businessType: '',
  setBusinessType: () => {},
  availableDates: {},
  toggleDateAvailability: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
  timeSlots: [],
  setTimeSlots: () => {},
  toggleTimeSlot: () => {},
  appointments: [],
  addAppointment: () => {},
  restaurantMenuUrl: '',
  setRestaurantMenuUrl: () => {},
  menuItems: [],
  setMenuItems: () => {},
  phoneBookingActive: false,
  setPhoneBookingActive: () => {},
});

// Time slots generation (30 minutes intervals)
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour < 18; hour++) {
    slots.push({ time: `${hour}:00`, selected: false });
    slots.push({ time: `${hour}:30`, selected: false });
  }
  return slots;
};

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [userName, setUserName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('');
  const [availableDates, setAvailableDates] = useState<Record<string, boolean>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [restaurantMenuUrl, setRestaurantMenuUrl] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [phoneBookingActive, setPhoneBookingActive] = useState(false);

  // Load saved language on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Toggle a date between available and busy
  const toggleDateAvailability = (dateString: string) => {
    setAvailableDates((prevDates) => ({
      ...prevDates,
      [dateString]: !prevDates[dateString],
    }));
  };

  // Toggle a time slot between selected and not selected
  const toggleTimeSlot = (time: string) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.time === time ? { ...slot, selected: !slot.selected } : slot
      )
    );
  };

  // Add a new appointment
  const addAppointment = (appointment: Appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        userName,
        setUserName,
        businessType,
        setBusinessType,
        availableDates,
        toggleDateAvailability,
        selectedDate,
        setSelectedDate,
        timeSlots,
        setTimeSlots,
        toggleTimeSlot,
        appointments,
        addAppointment,
        restaurantMenuUrl,
        setRestaurantMenuUrl,
        menuItems,
        setMenuItems,
        phoneBookingActive,
        setPhoneBookingActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using this context
export const useApp = () => useContext(AppContext);

export default AppContext;
