import { AppointmentStatus } from "../enums/AppointmentStatus";
export interface Appointment {
  customerName: string;
  dateTime: Date;
  status: AppointmentStatus;
  notes?: string;
}