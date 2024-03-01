import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import axios from 'axios';

@Component({
  selector: 'app-show-my-nfts',
  templateUrl: './show-my-nfts.component.html',
  styleUrls: ['./show-my-nfts.component.css'],
  animations: [
    trigger('floatInSpace', [
      transition('* => *', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('1500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ShowMyNFTsComponent {

  nfts: any[] = [];
  filteredNfts: any[] = [];

  constructor() { }

  async ngOnInit() {

    const OPENSEA_API_URL = 'https://testnets-api.opensea.io/api/v2/chain/goerli/account/';
    
    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = accounts[0];

    console.log(account)

    const options = {
      method: 'GET',
      url: OPENSEA_API_URL + account + '/nfts',
      headers: {accept: 'application/json'}
    };
    
    axios.request(options).then( (response) => {
      //this.nfts = response.data.nfts;
      this.filteredNfts = response.data.nfts.filter((item: { contract: any; }) => item.contract === "0x1158774683249f57273049166de9ef8bce443c32");
      this.nfts = this.filteredNfts.map((item: { metadata_url: any; }) => {
        return {
          ...item,
          metadata_url: item.metadata_url.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') // Modify the 'param' property here
        };
      });
      console.log(this.nfts);
    }).catch(function (error) {
      console.error(error);
    });

  }

}
