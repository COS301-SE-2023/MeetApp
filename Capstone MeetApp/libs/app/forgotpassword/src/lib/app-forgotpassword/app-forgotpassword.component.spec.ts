import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppForgotpasswordComponent } from './app-forgotpassword.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
describe('AppForgotpasswordComponent', () => {
  let component: AppForgotpasswordComponent;
  let fixture: ComponentFixture<AppForgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppForgotpasswordComponent, RouterTestingModule,],
    }).compileComponents();

    fixture = TestBed.createComponent(AppForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
