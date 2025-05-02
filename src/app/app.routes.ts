import { Routes } from '@angular/router';
import { languageGuard } from './Core/guards/language.guard';
import { AppointmentComponent } from './Features/Pages/appointment/appointment.component';
export const routes: Routes = [
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  {
    path: ':lang',
    canActivate: [languageGuard],
    children: [
      { path: '', redirectTo: 'appointment', pathMatch: 'full' },
      { path: 'appointment', component: AppointmentComponent },
    ],
  },
  { path: '**', redirectTo: 'en/appointment' },
];