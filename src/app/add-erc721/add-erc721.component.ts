import { Component, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { ethers } from 'ethers';
const axios = require('axios');

@Component({
  selector: 'app-add-erc721',
  templateUrl: './add-erc721.component.html',
  styleUrls: ['./add-erc721.component.css'],
  animations: [
    trigger('floatInSpace', [
      transition('* => *', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('1500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})

export class AddErc721Component {

  public isUploaded = false;
   
  image_file!: File;

  public image_hash: any;
  public metadata: any;

  readonly PINATA_URL_PINFile = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  readonly PINATA_URL_PINJson = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  readonly PINATA_API_PUBLIC_KEY = 'd098536294ad1cc3664d';
  readonly PINATA_API_PRIVATE_KEY = 'cd5c4b26c7e91eb3db0881c23138f7d6414626e306a382461830da744b379204';

  readonly CONTRACT_ADDRESS: string = '0x1158774683249F57273049166DE9EF8BcE443C32';
  readonly CONTRACT_ABI  = [
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
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
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
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
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
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
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
      "inputs": [],
      "name": "baseURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
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
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "tokenURI",
          "type": "string"
        }
      ],
      "name": "mintNFT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
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
          "name": "tokenId",
          "type": "uint256"
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
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
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
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
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
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  public ethereum: any;
  
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


  constructor(
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder,
  ) {}

  form_721 = this.fb.group({
    name: '',
    description: '',
    image: '',
    attributes: this.fb.array([])
  });

  get Attributes(): FormArray {
    return this.form_721.controls["attributes"] as FormArray;
  }

  addAttribute() {
    const attributesForm = this.fb.group({
      trait_type: '',
      value: ''
    })
    this.Attributes.push(attributesForm);
  }

  deleteAttribute(attributeIndex: number) {
    this.Attributes.removeAt(attributeIndex);
  }

  async onFileSelected(event: any): Promise<void> {
    this.image_file = event.target.files[0] as File;
  }

  async uploadImage() {

    const data = new FormData();
    data.append('file', this.image_file);

    await axios.post(this.PINATA_URL_PINFile, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'pinata_api_key': this.PINATA_API_PUBLIC_KEY,
        'pinata_secret_api_key': this.PINATA_API_PRIVATE_KEY
      }}).then((response:any) => {
          this.image_hash = response.data.IpfsHash;
          this.isUploaded = true;
        })
        .catch((error: any) => {
          console.error('Error pinning file to IPFS:', error);
          this.isUploaded = false;
    })
  }

  uploadMetadata() {

    this.form_721.value.image = 'https://gateway.pinata.cloud/ipfs/' + this.image_hash;
    console.log('Image hash: ',this.form_721.value.image);

    const formdata = this.form_721.value
    const jsondata = JSON.stringify(formdata)

    return axios.post(this.PINATA_URL_PINJson, jsondata, {
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': this.PINATA_API_PUBLIC_KEY,
        'pinata_secret_api_key': this.PINATA_API_PRIVATE_KEY
      }}).then((response:any) => {
        console.log(jsondata)
        this.metadata = 'ipfs://' + response.data.IpfsHash;
      })
        .catch((error: any) => {
          console.error('Error pinning JSON to IPFS:', error);
    })
    
  }

  async onSubmit() {
    
    if (await this.loginCompleted()) {

      await this.uploadMetadata();

      const provider_var = new ethers.BrowserProvider((window as any).ethereum);
      
      await provider_var.send("eth_requestAccounts", []);
      const signer_var = await provider_var.getSigner();

      const contract_mint_721 = new ethers.Contract(this.CONTRACT_ADDRESS, this.CONTRACT_ABI, signer_var);
      
      const token_uri = this.metadata;

      console.log('token: ', token_uri)
      
      try {
        await contract_mint_721['mintNFT'](signer_var.getAddress(), token_uri);
      } catch (err: any) {
        console.error(err.message);
      }   

      this.ngZone.run(() => this.router.navigateByUrl('/add-NFT'))
    } else {
      this.ngZone.run(() => this.router.navigateByUrl('/home'))
    }
  }
}
