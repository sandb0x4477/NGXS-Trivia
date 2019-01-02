import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { TriviaState } from '../store/trivia.state';
import { Navigation } from 'selenium-webdriver';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  @Select(TriviaState.navigation) navigation$: Observable<Navigation>;

  constructor(private store: Store) { }

  ngOnInit() {
  }
}
