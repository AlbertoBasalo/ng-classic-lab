import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookingDto } from '@app/models/booking.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { PassengerDto } from '@app/models/passenger.dto';

@Component({
  selector: 'app-bookings-form',
  template: `
    <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
      <app-control
        [form]="bookingForm"
        formControlName="numberOfSeats"
        type="number"
        min="1"
        (change)="onSeatsChange()"
      />
      <ng-container *ngIf="bookingForm.value.numberOfSeats || 0 > 0" formArrayName="passengers">
        <div *ngFor="let passengerForm of passengers.controls; let i = index">
          <h3>Passenger {{ i + 1 }}</h3>
          <ng-container [formGroupName]="i">
            <app-control
              [form]="bookingForm"
              formControlName="contactPhone"
              formArrayNameStr="passengers"
              [formArrayIndexNbr]="i"
            />
            <app-control
              [form]="bookingForm"
              formControlName="contactEmail"
              type="email"
              formArrayNameStr="passengers"
              [formArrayIndexNbr]="i"
            />
            <app-control
              [form]="bookingForm"
              formControlName="emergencyContact"
              formArrayNameStr="passengers"
              [formArrayIndexNbr]="i"
            />
            <div formGroupName="travelPreferences">
              <app-control
                [form]="bookingForm"
                formControlName="preferredDestination"
                formArrayNameStr="passengers"
                formGroupNameStr="travelPreferences"
                [formArrayIndexNbr]="i"
              />
              <app-control
                [form]="bookingForm"
                formControlName="dietaryRestrictions"
                formArrayNameStr="passengers"
                formGroupNameStr="travelPreferences"
                [formArrayIndexNbr]="i"
              />
            </div>
          </ng-container>
        </div>
      </ng-container>
      <button type="submit" [disabled]="bookingForm.invalid">Book Now</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsFormComponent {
  @Input() launch!: LaunchDto;
  @Output() book = new EventEmitter<{
    booking: Partial<BookingDto>;
    passengers: Partial<PassengerDto>[];
  }>();

  bookingForm = this.formBuilder.group({
    numberOfSeats: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(10)]),
    passengers: this.formBuilder.array([]),
  });

  get numberOfSeats(): AbstractControl {
    return this.bookingForm.get('numberOfSeats')!;
  }

  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  constructor(private readonly formBuilder: FormBuilder) {
    this.addPassengerForm();
  }

  private createPassengerForm(): FormGroup {
    return this.formBuilder.group({
      contactPhone: ['', [Validators.required]],
      contactEmail: ['', [Validators.required, Validators.email]],
      emergencyContact: [''],
      travelPreferences: this.formBuilder.group({
        preferredDestination: [''],
        dietaryRestrictions: [''],
      }),
    });
  }

  private addPassengerForm(): void {
    this.passengers.push(this.createPassengerForm());
  }

  onSeatsChange(): void {
    const seats = this.numberOfSeats.value || 0;
    const currentForms = this.passengers.length;

    if (seats > currentForms) {
      for (let i = currentForms; i < seats; i++) {
        this.addPassengerForm();
      }
    } else if (seats < currentForms) {
      for (let i = currentForms; i > seats; i--) {
        this.passengers.removeAt(i - 1);
      }
    }
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      const booking: Partial<BookingDto> = {
        launchId: this.launch.id,
        numberOfSeats: formValue.numberOfSeats!,
        status: 'pending',
        totalPrice: this.launch.pricePerSeat * formValue.numberOfSeats!,
        passengers: [], // IDs will be assigned after passenger creation
      };
      const newBooking = {
        booking,
        passengers: formValue.passengers as Partial<PassengerDto>[],
      };
      console.log('🚀 newBooking', newBooking);
      this.book.emit(newBooking);
    }
  }
}
