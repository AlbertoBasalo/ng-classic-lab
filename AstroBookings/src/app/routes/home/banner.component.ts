import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LaunchDto } from 'src/app/shared/models/launch.dto';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  @Input() nextLaunches: LaunchDto[] = [
    {
      id: '1',
      agencyId: '1',
      rocketId: '1',
      date: new Date(),
      mission: 'Mission 1',
      destination: 'Destination 1',
      pricePerSeat: 100,
      status: 'scheduled',
    },
    {
      id: '2',
      agencyId: '2',
      rocketId: '2',
      date: new Date(),
      mission: 'Mission 2',
      destination: 'Destination 2',
      pricePerSeat: 200,
      status: 'scheduled',
    },
  ];
}
