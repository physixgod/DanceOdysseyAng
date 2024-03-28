import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<re-captcha (resolved)="resolved($event)" siteKey="6LdCdJMpAAAAAKltrUz-qET2XZVRliujyOkTXmvy"></re-captcha>`
})
export class AppComponent {
  title = 'DanceOdyssey';
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
