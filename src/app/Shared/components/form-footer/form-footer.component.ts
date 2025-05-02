import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-footer',
  imports: [TranslateModule],
  templateUrl: './form-footer.component.html',
  styleUrl: './form-footer.component.scss',
})
export class FormFooterComponent {
  @Output() submitHandler = new EventEmitter<void>();
  @Output() cancelHandler = new EventEmitter<void>();
  @Input() disabled: boolean = false;
}
