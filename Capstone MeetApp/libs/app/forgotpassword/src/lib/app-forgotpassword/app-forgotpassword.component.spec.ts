import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppForgotpasswordComponent } from './app-forgotpassword.component';

describe('AppForgotpasswordComponent', () => {
  let component: AppForgotpasswordComponent;
  let fixture: ComponentFixture<AppForgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppForgotpasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
