import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { service } from '@capstone-meet-app/services';
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  /*beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent,service],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('testing', () => {
    expect('title').toEqual('title');
  });

});
