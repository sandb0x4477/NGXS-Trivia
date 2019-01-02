import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Query } from '../_models/query.model';
import { TriviaState } from '../store/trivia.state';
import { UpdateQuery, FetchQuestions } from '../store/trivia.actions';

@Component({
  selector: 'app-qf-container',
  template: `
    <app-query-form [query]="query$ | async" (start)="onSubmit($event)">
    </app-query-form>
  `,
  styles: [],
})
export class QfContainerComponent implements OnInit {
  @Select(TriviaState.query) query$: Observable<Query>;

  constructor(private store: Store) {}

  ngOnInit() {}

  onSubmit(query: Query) {
    this.store.dispatch(new UpdateQuery(query));
    this.store.dispatch(new FetchQuestions(query));
  }
}
