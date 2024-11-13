import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
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

  constructor(private route: ActivatedRoute, private launchService: LaunchService) {}
}
