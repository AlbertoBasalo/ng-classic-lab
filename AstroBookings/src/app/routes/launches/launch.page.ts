import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PassengerDto } from '@app/models/passenger.dto';
import { concatMap, forkJoin, map, shareReplay, tap } from 'rxjs';
import { LaunchService } from './launch.service';

@Component({
  templateUrl: './launch.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchPage {
  // Get launchId once as snapshot
  private readonly launchId: string = this.route.snapshot.params['id'] || '';

  /**
   * LaunchDto from the launchId
   */
  launch$ = this.launchService.getLaunchById$(this.launchId).pipe(shareReplay());

  /**
   * AgencyDto from the launchId, when the launchDto is loaded
   */
  agency$ = this.launch$.pipe(
    // Get the agency from the launchId, when the launchDto is loaded
    concatMap((launch) => this.launchService.getAgencyById$(launch.agencyId)),
  );

  /**
   * RocketDto and BookingDto[] from the launchId, when the launchDto is loaded
   */
  rocketAndBookings$ = this.launch$.pipe(
    concatMap((launch) =>
      forkJoin({
        rocket: this.launchService.getRocketById$(launch.rocketId),
        bookings: this.launchService.getBookingsByLaunchId$(launch.id),
      }),
    ),
    shareReplay(),
  );

  /**
   * Available seats for the launch, when the rocket and bookings are loaded
   */
  availableSeats$ = this.rocketAndBookings$.pipe(
    map(({ rocket, bookings }) => {
      const capacity = rocket.capacity;
      const bookingsCount = bookings.reduce((acc, curr) => acc + curr.numberOfSeats, 0);
      return capacity - bookingsCount;
    }),
  );

  /**
   * PassengerDto[] from the launchId, when the rocket and bookings are loaded
   */
  passengersId$ = this.rocketAndBookings$.pipe(
    // array of passengers from the array of bookings, where each booking has an array of passengers
    // we must flatten the array of bookings to get an array of passengers
    // similar to RxJs, but fully synchronous
    map(({ bookings }) => bookings.flatMap((booking) => booking.passengers)),
    tap((passengers) => {
      // this call uses mergeMap internally,
      // gets an array of passengersIds and returns a passenger for each id
      this.launchService.getPassengersByBookingIds$(passengers).subscribe((passenger) => {
        this.passengers = [...this.passengers, passenger];
        // force the change detection to update the view
        this.cd.markForCheck();
      });
    }),
  );

  /**
   * Array of passengers, filled when the passengersId$ is loaded
   */
  passengers: PassengerDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private launchService: LaunchService,
    private cd: ChangeDetectorRef,
  ) {}
}
