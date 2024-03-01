import { Component, NgZone } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-nft',
  templateUrl: './add-nft.component.html',
  styleUrls: ['./add-nft.component.css'],
  animations: [
    trigger('floatInSpace', [
      transition('* => *', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('1500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AddNFTComponent {

  constructor(
    private ngZone: NgZone,
    private router: Router
  ) { }

  mint721() {
    this.ngZone.run(() => this.router.navigateByUrl('/add-erc721'));
  }

  mint1155() {
    this.ngZone.run(() => this.router.navigateByUrl('/add-erc1155'));
  }

  show() {
    this.ngZone.run(() => this.router.navigateByUrl('/show-NFTs'));
  }

}
