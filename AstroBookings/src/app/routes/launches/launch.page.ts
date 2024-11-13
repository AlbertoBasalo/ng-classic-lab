import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, forkJoin, map } from 'rxjs';
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
  launch$ = this.launchService.getLaunchById$(this.launchId);

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

  constructor(private route: ActivatedRoute, private launchService: LaunchService) {}
}
