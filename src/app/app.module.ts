import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddNFTComponent } from './add-nft/add-nft.component';
import { HomeComponent } from './home/home.component';
import { AddErc721Component } from './add-erc721/add-erc721.component';
import { AddErc1155Component } from './add-erc1155/add-erc1155.component';
import { ShowMyNFTsComponent } from './show-my-nfts/show-my-nfts.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNFTComponent,
    HomeComponent,
    AddErc721Component,
    AddErc1155Component,
    ShowMyNFTsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
