import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './castle-view.component.html',
  styleUrls: ['./castle-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CastleViewComponent {
}
