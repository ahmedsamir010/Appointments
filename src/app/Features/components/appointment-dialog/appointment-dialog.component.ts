import { Component, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormFooterComponent } from '../../../Shared/components/form-footer/form-footer.component';
import { InputDirective } from '../../../Core/directives/input.directive';
import { BaseComponent } from '../../../Core/base/base.component';
import { LanguageService } from '../../../Core/services/language.service';
import { AppointmentStatus } from '../../../Core/enums/AppointmentStatus';
import { ApiService } from '../../../Core/services/api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-appointment-dialog',
  imports: [
    SelectModule,
    TranslateModule,
    DatePickerModule,
    InputDirective,
    FormFooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.scss',
})
export class AppointmentDialogComponent
  extends BaseComponent
  implements OnInit
{
  countries: { name: string }[] = [];
  mode: 'add' | 'edit' = 'add';
  form!: FormGroup;
  minDate: Date = new Date();
  apiErrorMessage: string[] = [];
  disabled: boolean = false;
  constructor(
    public ref: DynamicDialogRef,
    languageService: LanguageService,
    private translate: TranslateService,
    private api: ApiService,
    private messageService: MessageService,
    public config: DynamicDialogConfig
  ) {
    super(languageService);
  }
  appointmentStatusOptions: { label: string; value: AppointmentStatus }[] = [];
  override ngOnInit(): void {
    super.ngOnInit();
    this.minDate = new Date();

    if (this.config.data?.mode === 'edit') {
      this.mode = 'edit';
    }

    this.getAppointmentStatus();
    this.initializeForm();

    if (this.mode === 'edit') {
      this.getDetails();
    }
  }

  initializeForm() {
    this.form = new FormGroup({
      customerName: new FormControl('', Validators.required),
      appointmentDate: new FormControl(null, Validators.required),
      notes: new FormControl(''),
      status: new FormControl(AppointmentStatus.Scheduled),
    });
  }

  getAppointmentStatus() {
    this.appointmentStatusOptions = [
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
  getDetails() {
    if (this.config.data?.data) {
      const data = this.config.data.data;
      console.log(data);
      
      this.updateForm(data)

      this.disabled = data.status === 1 || data.status === 2;
    }
  }
  private updateForm(data: any): void {
    const date = new Date(data.dateTime);
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);  
  
    this.form.patchValue({
      customerName: data.customerName,
      appointmentDate: local,
      notes: data.notes,
      status: Number(data.status),
    });
  }
  
  

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const dateTime = new Date(formValue.appointmentDate).toISOString();

    const requestData = {
      customerName: formValue.customerName,
      dateTime: dateTime,
      notes: formValue.notes,
      status: formValue.status,
    };

    const request$ =
      this.mode === 'add'
        ? this.api.create('Appointments', requestData)
        : this.api.update(
            `Appointments`,
            requestData,
            this.config.data?.data.id
          );

    request$.subscribe({
      next: () => {
        this.ref.close(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Appointment saved successfully!',
        });
      },
      error: (err) => {
        console.error('API Error:', err);
        this.apiErrorMessage =
          err?.error?.errors || 'Unexpected error occurred.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.apiErrorMessage.join(', '),
        });
      },
    });
  }

 
}