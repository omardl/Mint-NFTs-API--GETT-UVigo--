import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router'
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('floatInSpace', [
      transition('* => *', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('1500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {

  public err: boolean = false;
  public err_msg: string = '';
  
  public ethereum: any;
  public isConnected: boolean = false;

  GOERLI_NETWORK_ID = 5;

  ngOnInit() {
    this.loginCompleted();
  }

  constructor(
    private ngZone: NgZone,
    private router: Router
  ) { }
  
  private checkIfMetamaskInstalled(): boolean {

    if (typeof (window as any).ethereum !== 'undefined') {
      this.ethereum = (window as any).ethereum;
      return true;
    
    } else {
      return false;
    } 
  }

  private async checkUserLogged(): Promise<boolean> {
    
    try {
      await this.ethereum.request({ method: 'eth_requestAccounts' });
      return true;
    
    } catch(error) {
      return false;
    }
  }

  private async checkGoerliTestnet(): Promise<boolean> {
    const network_id = await this.ethereum.request({method: 'net_version'})

    if (network_id == this.GOERLI_NETWORK_ID) {
      return true;

    } else {
      return false;
    }
  }

  private async loginCompleted() {
    this.err = false;

    if(this.checkIfMetamaskInstalled()) {

      if (await this.checkUserLogged()) {
      
        if (await this.checkGoerliTestnet()) {
          return true;

        } else {
          this.err = true;
          this.err_msg = "Connect metamask to Goerli testnet to use this APP";
          return false;
        }

      } else {
        this.err_msg = "Log in your metamask account to use this APP";
        this.err = true;
        return false;
      }

    } else {
      this.err_msg = "Install metamask to use this APP"
      this.err = true;
      return false;
    }
  }


  public async connectMetamask() {
    
    if (await this.loginCompleted()) {
      this.ngZone.run(() => this.router.navigateByUrl('/add-NFT'));
    }

  }
}