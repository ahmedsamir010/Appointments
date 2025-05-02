import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[Input]',
})
export class InputDirective implements AfterViewInit {
  @Input() label = '';
  @Input() required = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    const parentDiv = this.renderer.createElement('div');
    this.renderer.addClass(parentDiv, 'w-full');

    const labelElement = this.renderer.createElement('label');
    this.renderer.addClass(labelElement, 'block');

    this.translate.get(this.label).subscribe((translatedLabel: string) => {
      const labelContainer = this.renderer.createElement('div');
      this.renderer.addClass(labelContainer, 'flex');
      this.renderer.addClass(labelContainer, 'items-center');
      this.renderer.addClass(labelContainer, 'gap-1');
      this.renderer.addClass(labelContainer, 'text-l');
      this.renderer.addClass(labelContainer, 'text-[#121217]');
      this.renderer.addClass(labelContainer, 'mt-3');

      const labelText = this.renderer.createText(translatedLabel);
      this.renderer.appendChild(labelContainer, labelText);

      if (this.required) {
        const star = this.renderer.createElement('span');
        this.renderer.addClass(star, 'text-red-500');
        this.renderer.addClass(star, 'text-sm');
        const starText = this.renderer.createText('*');
        this.renderer.appendChild(star, starText);
        this.renderer.appendChild(labelContainer, star);
      }

      this.renderer.appendChild(labelElement, labelContainer);
    });

    const inputElement = this.el.nativeElement;

    this.renderer.insertBefore(
      inputElement.parentNode,
      parentDiv,
      inputElement
    );
    this.renderer.appendChild(parentDiv, labelElement);
    this.renderer.appendChild(parentDiv, inputElement);
    this.renderer.addClass(inputElement, 'p-2');
    this.renderer.addClass(inputElement, 'mt-2');
    this.renderer.addClass(inputElement, 'border');
    this.renderer.addClass(inputElement, 'rounded-lg');
    this.renderer.addClass(inputElement, 'w-full');
    this.renderer.addClass(inputElement, 'border-gray-400');
    this.renderer.addClass(inputElement, 'focus:outline-none');
    this.renderer.addClass(inputElement, 'focus:ring-0');
    this.renderer.addClass(inputElement, 'mt-1');
    this.renderer.addClass(inputElement, 'focus:border-primary');
  }
}