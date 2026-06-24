import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'div[app-button]',
    imports: [
        NgClass,
        TranslateModule,
        LocalizeRouterModule,
        RouterLink,
    ],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit, OnChanges{
  @Output() linkEmitter = new EventEmitter<any>;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() style: 'none' | 'link' | 'solid' | 'outline' = 'solid';
  @Input() colorStyle: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() buttonStyle: 'default' |'info' | 'error' | 'warning'  = 'default';
  
  @Input() text: any;
  @Input() size?: "normal" | "small" = "small";
  @Input() route?: string = '';
  @Input() queryParams?: any;

  @Input() button?: {type: "button" | "submit", text: string};
  @Input() href?: string;
  @Input() textAlign?: "start" | "center" | "end" = "center";
  @Input() isOutline: boolean = false;
  @Input() disabled: boolean = false;
  @Input() color?: string = "ac-100";
  @Input() bgColor?: string = "ac-700";
  @Input() border?: string = "ac-000-60";
  @Input() icons?:{left?:string, leftStyle?:string, right?:string, rightStyle?:string};
  @Input() iconColor?: string = "";
  @Input() classList?:string = ""; //Se utiliza para aplicar estilos sobre el div que contiene iconos + texto del botón
  @Input() animatedIcon?: string;
  @Input() classText = ''; //Se utiliza para aplicar estilos directamente sobre el span que contiene el texto
  @Input() ellipsis: boolean = false;
  @Input() overDark: boolean = false; // Se utiliza para saber el color del fondo donde se encuentra el botón y adaptar el foco
  @Input() customDisabled: boolean = false;
  @Input() targetBlank? : boolean = false;
  @Input() targetCustom? : string = '_blank';
  @Input() fullSize : boolean = false; //En los botones con route para que ocupen el 100% del contenedor
  @Input() loading?: boolean = false

  animated:boolean = false;
  btnStyle:string = '';

  colorTable: any[] = [
    {colorStyle: 'primary', style: 'solid', buttonStyle: 'default', class: "bg-corporate-normal text-white border-corporate-normal"},
    {colorStyle: 'primary', style: 'solid', buttonStyle: 'info', class: "bg-informative-normal text-white border-informative-normal"},
    {colorStyle: 'primary', style: 'solid', buttonStyle: 'error', class: "bg-error-normal text-white border-error-normal"},
    {colorStyle: 'primary', style: 'solid', buttonStyle: 'warning', class: "bg-warning-normal text-white border-warning-normal"},

    {colorStyle: 'secondary', style: 'solid', buttonStyle: 'default', class: "bg-corporate-light text-corporate-normal border-corporate-normal"},
    {colorStyle: 'secondary', style: 'solid', buttonStyle: 'info', class: "bg-informative-light text-informative-normal border-informative-normal"},
    {colorStyle: 'secondary', style: 'solid', buttonStyle: 'error', class: "bg-error-light text-error-normal border-error-normal"},
    {colorStyle: 'secondary', style: 'solid', buttonStyle: 'warning', class: "bg-warning-light text-warning-normal border-warning-normal"},

    {colorStyle: 'tertiary', style: 'solid', buttonStyle: 'default', class: "bg-neutral-hover text-white border-transparent"},
    {colorStyle: 'tertiary', style: 'solid', buttonStyle: 'info', class: "bg-informative-light text-informative-normal border-transparent"},
    {colorStyle: 'tertiary', style: 'solid', buttonStyle: 'error', class: "bg-error-light text-error-normal border-transparent"},
    {colorStyle: 'tertiary', style: 'solid', buttonStyle: 'warning', class: "bg-warning-light text-warning-normal border-transparent"},
  ];

  buttonClick() {
    if (this.disabled) {
      return;
    }

    console.log(this.disabled);

    if(this.animatedIcon) {
      this.animated = true;
      this.linkEmitter.emit();
    } else {
      this.linkEmitter.emit();
    }
  }

  ngOnInit() {
    this.btnStyle = this.setbtnStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['style']){
      this.btnStyle = this.setbtnStyle();}
  }

  setbtnStyle():string {
    if(this.style=='solid') {
      return 'gap-0 btn btn-'+this.color+' ' + (this.border ? ' border-'+this.border + ' ' : ' btn-border ');
    }
    if(this.style=='outline') {
      if(this.border) {
        return 'gap-0 btn btn-border border-'+this.border+' text-'+this.color+ (this.bgColor ? ' bg-'+this.bgColor : '');
      }
      return 'gap-0 btn btn-border border-'+this.color+' text-'+this.color+ (this.bgColor ? ' bg-'+this.bgColor : '');
    }

    if(this.style=="link") {
      this.classText = this.classText ? this.classText : '' + "text-decoration-underline text-underline-offset";

      return 'border-0 bg-transparent cursor-pointer text-decoration-none '+ 'text-'+this.color;
    }
    if(this.style=="none") {
      return 'border-0 bg-transparent text-decoration-none text-'+this.color;
    }
    return '';
  }

  get styleClass(): string {
    if(this.disabled && !this.customDisabled) {
      return '';
    }

    return this.colorTable.find(item => 
      item.colorStyle === this.colorStyle && 
      item.style === this.style && 
      item.buttonStyle === this.buttonStyle)?.class || '';

  }
}
