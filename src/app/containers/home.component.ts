import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h2 class="uk-text-center">
      Welcome to NGXS Trivia!
    </h2>
    <div class="uk-margin uk-width-1-1 uk-text-center">
    <button class="uk-button uk-button-primary uk-width-1-1" [routerLink]="'/new'">
      New Trivia!
    </button>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
