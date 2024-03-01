import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddNFTComponent } from './add-nft/add-nft.component';
import { AddErc721Component } from './add-erc721/add-erc721.component';
import { AddErc1155Component } from './add-erc1155/add-erc1155.component';
import { ShowMyNFTsComponent } from './show-my-nfts/show-my-nfts.component';

var AnimationHome = "home_animation"
var AnimationAdd = "add_animation"
var AnimationNFT721 = "add_721_animation"
var AnimationNFT1155 = "add_1155_animation"
var AnimationShowNFTs = "show_NFTs_animation"

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: {animationState: AnimationHome}},
  { path: 'add-NFT', component: AddNFTComponent, data: {animationState: AnimationAdd}},
  { path: 'add-erc721', component: AddErc721Component, data: {animationState: AnimationNFT721}},
  { path: 'add-erc1155', component: AddErc1155Component, data: {animationState: AnimationNFT1155}},
  { path: 'show-NFTs', component: ShowMyNFTsComponent, data: {animationState: AnimationShowNFTs}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
