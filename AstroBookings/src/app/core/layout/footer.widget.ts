import { Component } from '@angular/core';
import { environment } from '@app/env/environment';
@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <nav>
        <span>Environment: {{ environment | json }}</span>
      </nav>
    </footer>
  `,
})
export class FooterWidget {
  environment = environment;
}
