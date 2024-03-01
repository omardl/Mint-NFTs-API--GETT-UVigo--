import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { ethers } from 'ethers';
import axios from 'axios';

@Component({
  selector: 'app-add-erc1155',
  templateUrl: './add-erc1155.component.html',
  styleUrls: ['./add-erc1155.component.css'],
  animations: [
    trigger('floatInSpace', [
      transition('* => *', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('1500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})


export class AddErc1155Component {

  CONTRACT_ADDRESS = '0x7D6Ddfed7BE46E9Aa9500F6f3D808110fE732fB2';
  CONTRACT_ABI =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "TransferBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "TransferSingle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "value",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "URI",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "accounts",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        }
      ],
      "name": "balanceOfBatch",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "itemIds",
          "type": "uint256[]"
        }
      ],
      "name": "getBalances",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "itemIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "mintBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "itemId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mintToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "uri",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  OPENSEA_API_URL = 'https://testnets-api.opensea.io/api/v2/chain/goerli/account/';


  public ethereum: any;


  form_1155: FormGroup;
  
  filteredNfts: any[] = [];
  someItem1 = false;
  someItem2 = false;
  someItem3 = false;
  someItem4 = false;

  imgItem1 = ''
  imgItem2 = ''
  imgItem3 = ''
  imgItem4 = ''

  err = false
  err_msg = ''

  amountItem1 = 0
  amountItem2 = 0
  amountItem3 = 0
  amountItem4 = 0

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder,
  ) {
    this.form_1155 = this.fb.group({
      type1: [0],
      type2: [0],
      type3: [0],
      type4: [0],
    });
  }

  async ngOnInit() {

    const provider_var = new ethers.BrowserProvider((window as any).ethereum);
    
    await provider_var.send("eth_requestAccounts", []);
    const signer_var = await provider_var.getSigner();

    const contract_mint_1155 = new ethers.Contract(this.CONTRACT_ADDRESS, this.CONTRACT_ABI, signer_var);

    try {
      const ammounts = await contract_mint_1155['getBalances'](signer_var.getAddress(), [1, 2, 3, 4])
      if (ammounts[0] > 0) {
        this.someItem1 = true;
        this.amountItem1 = ammounts[0]
      } 
      if (ammounts[1] > 0) {
        this.someItem2 = true;
        this.amountItem2 = ammounts[1]
      } 
      if (ammounts[2] > 0) {
        this.someItem3 = true;
        this.amountItem3 = ammounts[2]
      } 
      if (ammounts[3] > 0) {
        this.someItem4 = true;
        this.amountItem4 = ammounts[3]
      }
    } catch (err: any) {
      console.error(err.message);
    }



    const options = {
      method: 'GET',
      url: this.OPENSEA_API_URL + signer_var.address + '/nfts',
      headers: {accept: 'application/json'}
    };
    
    axios.request(options).then( (response) => {

      console.log(response)

      this.filteredNfts = response.data.nfts.filter((item: { contract: any; }) => item.contract === "0x7d6ddfed7be46e9aa9500f6f3d808110fe732fb2");
      console.log(this.filteredNfts)

      this.filteredNfts.forEach(item => {
        if (item.identifier == 1) {
          this.imgItem1 = item.image_url;
        } else if (item.identifier == 2) {
          this.imgItem2 = item.image_url;
        } else if (item.identifier == 3) {
          this.imgItem3 = item.image_url;
        } else if (item.identifier == 4) {
          this.imgItem4 = item.image_url;
        }
      })

    }).catch(function (error) {
      console.error(error);
    });
  }

  private checkIfMetamaskInstalled(): boolean {

    if (typeof (window as any).ethereum !== 'undefined') {
      this.ethereum = (window as any).ethereum;
      return true;
    
    } else {
      return false;
    } 
  }

  private async checkUserLogged(): Promise<boolean> {
    
    return await this.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
    
      if (accounts.length > 0) {
        return true;

      } else {
        return false;
      }
    });
  }

  private async checkGoerliTestnet(): Promise<boolean> {

    const network_id = await this.ethereum.request({method: 'net_version'})

    if (network_id == 5) {
      return true;

    } else {
      return false;
    }
  }

  private async loginCompleted() {
    if(this.checkIfMetamaskInstalled()) {

      if (await this.checkUserLogged()) {
      
        if (await this.checkGoerliTestnet()) {
          return true;

        } else {
          return false;
        }

      } else {
        return false;
      }

    } else {
      return false;
    }
  }

  checkError(item: number) {

    if (item == 1) {
      if (this.amountItem1 == 1) {
        this.err_msg = "You already get the maximum items of type 1.";
      } else if (this.form_1155.value.type1 > 1) {
        this.err_msg = "You can only mint 1 items of type 1 at a time.";
      }

    } else if (item == 2) {
      if (this.amountItem2 == 100) {
        this.err_msg = "You already get the maximum items of type 2.";
      } else if (this.form_1155.value.type2 > 10) {
        this.err_msg = "You can only mint 10 items of type 2 at a time.";
      }

    } else if(item == 3) {
      if (this.amountItem3 == 1000) {
        this.err_msg = "You already get the maximum items of type 3.";
      } else if (this.form_1155.value.type3 > 100) {
        this.err_msg = "You can only mint 100 items of type 3 at a time.";
      }

    } else if(item == 4) {
      if (this.amountItem4 == 10000) {
        this.err_msg = "You already get the maximum items of type 4.";
      } else if (this.form_1155.value.type4 > 1000) {
        this.err_msg = "You can only mint 1000 items of type 4 at a time.";
      }
    }
  }

  async onSubmit() {

    if (await this.loginCompleted()) {

      const provider_var = new ethers.BrowserProvider((window as any).ethereum);
      
      await provider_var.send("eth_requestAccounts", []);
      const signer_var = await provider_var.getSigner();

      const contract_mint_1155 = new ethers.Contract(this.CONTRACT_ADDRESS, this.CONTRACT_ABI, signer_var);

      var items: any[] = [];
      var ammount: any[] = [];

      if (this.form_1155.value.type1 != 0) {
        items.push(1);
        ammount.push(this.form_1155.value.type1);
      } 
      if (this.form_1155.value.type2 != 0) {
        items.push(2);
        ammount.push(this.form_1155.value.type2);
      } 
      if (this.form_1155.value.type3 != 0) {
        items.push(3);
        ammount.push(this.form_1155.value.type3);
      }
      if (this.form_1155.value.type4 != 0) {
        items.push(4);
        ammount.push(this.form_1155.value.type4);
      }

      if (items.length == 1) {
        try {
          await contract_mint_1155['mintToken'](items[0], ammount[0]);
          this.err = false;

        } catch (err: any) {
          this.checkError(items[0])
          this.err = true;
        } 

      } else if (items.length > 1) {
        try {
          await contract_mint_1155['mintBatch'](items, ammount);
          this.err = false;

        } catch (err: any) {
          items.forEach(item => {
            this.checkError(item)
          })
          this.err = true;
        } 
      }
      if (!this.err) {
        this.ngZone.run(() => this.router.navigateByUrl('/add-NFT'))
      }
    } else {
      this.ngZone.run(() => this.router.navigateByUrl('/home'))
    }
  }
}


