 import { Component, NgZone } from '@angular/core';
 import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor (
    private ngZone: NgZone, 
    private router: Router
  ) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }

  ngOnInit () {
    this.ngZone.run(() => this.router.navigateByUrl('/home'));
  }

}

