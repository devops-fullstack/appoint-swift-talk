import { Appointment } from '@/contexts/AppContext';

// Types matching the shared JSON format
export interface Doctor {
  id: string;
  name: string;
  specialties: string[];
  offices: Office[];
}

export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  weekly_schedule: WeeklySchedule;
  slot_duration: number;
  booked_appointments: BookedAppointment[];
  exceptions: AppointmentException[];
}

export interface WeeklySchedule {
  monday: TimeRange[];
  tuesday: TimeRange[];
  wednesday: TimeRange[];
  thursday: TimeRange[];
  friday: TimeRange[];
  saturday: TimeRange[];
  sunday: TimeRange[];
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface BookedAppointment {
  date: string;
  slots: string[];
}

export interface AppointmentException {
  date: string;
  available_slots: string[];
}

export interface AppointmentType {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export interface CalendarData {
  doctors: Doctor[];
  appointment_types: AppointmentType[];
  unavailable_dates: string[];
  next_available_dates: Record<string, Record<string, string[]>>;
}

class CalendarService {
  // Fetch calendar data from API
  async getCalendarData(): Promise<CalendarData> {
    try {
      const response = await fetch('/api/calendar');
      if (!response.ok) {
        throw new Error('Failed to fetch calendar data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      throw error;
    }
  }

  // Convert the API calendar format to the AppContext appointment format
  convertToAppointments(calendarData: CalendarData): Appointment[] {
    const appointments: Appointment[] = [];
    
    calendarData.doctors.forEach(doctor => {
      doctor.offices.forEach(office => {
        office.booked_appointments.forEach(bookedDay => {
          const date = bookedDay.date;
          
          bookedDay.slots.forEach(time => {
            appointments.push({
              date,
              time,
              name: doctor.name,
              phoneNumber: office.phone
            });
          });
        });
      });
    });
    
    return appointments;
  }

  // Check if a date is available based on the calendar data
  isDateAvailable(calendarData: CalendarData, dateString: string): boolean {
    // Check if it's in unavailable dates
    if (calendarData.unavailable_dates.includes(dateString)) {
      return false;
    }
    
    // Check if any doctor has this date as a next available date
    for (const doctorId in calendarData.next_available_dates) {
      const doctorOffices = calendarData.next_available_dates[doctorId];
      for (const officeId in doctorOffices) {
        if (doctorOffices[officeId].includes(dateString)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  // Get all available time slots for a specific date
  getAvailableTimeSlotsForDate(calendarData: CalendarData, dateString: string): {doctorId: string, officeId: string, slots: string[]}[] {
    const result: {doctorId: string, officeId: string, slots: string[]}[] = [];
    
    // For each doctor
    calendarData.doctors.forEach(doctor => {
      // For each office
      doctor.offices.forEach(office => {
        // Get the day of week
        const date = new Date(dateString);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Convert to our format
        const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const dayName = dayNames[dayOfWeek] as keyof WeeklySchedule;
        
        // Get the time ranges for that day
        const timeRanges = office.weekly_schedule[dayName];
        
        // If there are no time ranges for that day, skip
        if (!timeRanges.length) return;
        
        // Find if there's a booked appointment for this date
        const bookedAppointment = office.booked_appointments.find(
          booking => booking.date === dateString
        );
        
        // Find if there's an exception for this date
        const exception = office.exceptions.find(
          exc => exc.date === dateString
        );
        
        // If there's an exception with no available slots, skip
        if (exception && exception.available_slots.length === 0) return;
        
        // Generate all possible time slots
        const allSlots: string[] = [];
        timeRanges.forEach(range => {
          const [startHour, startMinute] = range.start.split(':').map(Number);
          const [endHour, endMinute] = range.end.split(':').map(Number);
          
          let currentHour = startHour;
          let currentMinute = startMinute;
          
          while (
            currentHour < endHour || 
            (currentHour === endHour && currentMinute < endMinute)
          ) {
            const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
            allSlots.push(timeString);
            
            // Increment by slot duration
            currentMinute += office.slot_duration;
            if (currentMinute >= 60) {
              currentHour += Math.floor(currentMinute / 60);
              currentMinute %= 60;
            }
          }
        });
        
        // Remove booked slots
        const availableSlots = allSlots.filter(slot => {
          // If it's in the exception, it's only available if it's in the available_slots
          if (exception) {
            return exception.available_slots.includes(slot);
          }
          
          // Otherwise, it's available if it's not booked
          return !bookedAppointment || !bookedAppointment.slots.includes(slot);
        });
        
        result.push({
          doctorId: doctor.id,
          officeId: office.id,
          slots: availableSlots
        });
      });
    });
    
    return result;
  }
}

export default new CalendarService();
