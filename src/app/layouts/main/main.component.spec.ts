import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";
import {AuthService} from "../../services/auth/auth.service";
import {ElementRef} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('MainComponent', () => {
  let component: MainComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainComponent,
        RouterTestingModule,
        LocalizeRouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      teardown: { destroyAfterEach: false }
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const clickEvent = new Event('click');
    const spy = spyOn(authService, 'logout');
    component.logout(clickEvent);
    expect(spy).toHaveBeenCalledTimes(1)
  });

  it('should test toggle method of the class', () => {
    const debugElement = fixture.debugElement;
    component.accordionSidebar = new ElementRef(debugElement.query(By.css('#accordionSidebar')).nativeElement);

    fixture.detectChanges();

    component.toggle();
    expect(component.accordionSidebar.nativeElement.classList.contains('toggled')).toBeTruthy();

    component.toggle();
    expect(component.accordionSidebar.nativeElement.classList.contains('toggled')).toBeFalsy();
  });

});
