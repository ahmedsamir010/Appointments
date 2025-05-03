import { AppointmentStatus } from './../../../Core/enums/AppointmentStatus';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../Core/services/language.service';
import { CustomeDialogService } from '../../../Core/services/custome-dialog.service';
import { BaseComponent } from '../../../Core/base/base.component';
import { AppointmentDialogComponent } from '../../components/appointment-dialog/appointment-dialog.component';
import { ConfirmDeleteService } from '../../../Core/services/confirm-delete.service';
import { ApiService } from '../../../Core/services/api.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { PagedResponse } from '../../../Core/models/PagedResponse';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Appointment } from '../../../Core/models/Appointment';

@Component({
  selector: 'app-appointment',
  imports: [
    RouterModule,
    TranslateModule,
    TableModule,
    CommonModule,
    PaginatorModule,
    FormsModule,
    SelectModule,
    DatePicker,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent extends BaseComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  status: number | null = null;
  AppointmentStatus = AppointmentStatus;
  appointments: Appointment[] = [];
  initialAppointments: Appointment[] = [];
  first: number = 0;
  searchValue: string = '';
  rows: number = 10;
  totalRecords: number = 0;
  currentPage: number = 1;
  rangeDates: Date[] | undefined;
  appointmentStatusOptions: {
    label: string;
    value: AppointmentStatus | null;
  }[] = [];
  constructor(
    languageService: LanguageService,
    private dialog: CustomeDialogService,
    private confirm: ConfirmDeleteService,
    private api: ApiService,
    private translate: TranslateService,
  ) {
    super(languageService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getData();
    this.getAppointmentStatus();
  }
  getAppointmentStatus() {
    this.appointmentStatusOptions = [
      {
        label: this.translate.instant('All'),
        value: null,
      },
      {
        label: this.translate.instant('Scheduled'),
        value: AppointmentStatus.Scheduled,
      },
      {
        label: this.translate.instant('Completed'),
        value: AppointmentStatus.Completed,
      },
      {
        label: this.translate.instant('Canceled'),
        value: AppointmentStatus.Canceled,
      },
    ];
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.currentPage = this.first / this.rows + 1;
    this.getData();
  }
  getData(): void {
    let conditions: string[] = [];

    if (this.searchValue) {
      conditions.push(
        `(customerName.Contains("${this.searchValue}") || notes.Contains("${this.searchValue}"))`
      );
    }

    if (this.status != null) {
      conditions.push(`status == ${this.status}`);
    }

    if (this.rangeDates?.[0] && this.rangeDates?.[1]) {
      const startDate = new Date(this.rangeDates[0]).toISOString();
      const endDate = new Date(this.rangeDates[1]).toISOString();
      conditions.push(`dateTime >= "${startDate}" && dateTime <= "${endDate}"`);
    }

    const query = conditions.length > 0 ? conditions.join(' && ') : '';

    const params = {
      SearchValue: query,
      PageNumber: this.currentPage,
      PageSize: this.rows,
    };

    this.api
      .get<PagedResponse<Appointment>>('Appointments', { params })
      .subscribe((response) => {
        this.appointments = response.items;
        this.initialAppointments = response.items;
        this.rows = response.pageSize;
        this.currentPage = response.pageNumber;
        this.first = (this.currentPage - 1) * this.rows;
        this.totalRecords = response.pageSize * response.totalPages;
      });
  }

  onSearchClick(): void {
    this.getData();
  }

  addAppointment(): void {
    this.dialog
      .open({
        Component: AppointmentDialogComponent,
        header: 'Add Appointment',
        width: '680px',
        height: '700px',
      })
      .onClose.subscribe((result: boolean) => {
        result ? this.getData() : 0;
      });
  }
  editAppointment(data: Appointment): void {
    const dateTime = new Date(data.dateTime);
  
    if (isNaN(dateTime.getTime())) {
      console.error('Invalid dateTime value');
      return;
    }
  
    dateTime.setHours(dateTime.getHours() + 3);
  
    const updatedData = {
      ...data,
      dateTime: dateTime.toISOString(), 
    };
  
    this.dialog
      .open({
        Component: AppointmentDialogComponent,
        header: 'Edit Appointment',
        dialogData: { mode: 'edit', data: updatedData },
      })
      .onClose.subscribe((result: boolean) => {
        result ? this.getData() : 0;
      });
  }
  
  
  customSort(event: SortEvent): void {
    if (event.order === 0) {
      this.appointments = [...this.initialAppointments];
      this.dt.reset();
    } else {
      this.appointments.sort((data1, data2) => {
        const value1 = event.field
          ? data1[event.field as keyof Appointment]
          : null;
        const value2 = event.field
          ? data2[event.field as keyof Appointment]
          : null;
        let result = 0;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else if (value1 !== null && value2 !== null) {
          result =
            value1 !== undefined && value2 !== undefined
              ? value1 < value2
                ? -1
                : value1 > value2
                ? 1
                : 0
              : 0;
        }

        return (event.order ?? 0) * result;
      });
    }
  }

  confirmDelete(event: Event, id: number) {
    this.confirm.confirmDelete(event, () => {
      this.api.delete('appointments', id).subscribe(() => {
        this.getData();
      });
    });
  }
}
