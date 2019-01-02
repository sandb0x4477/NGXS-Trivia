import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Question } from '../_models/question.model';
import { TriviaState } from '../store/trivia.state';
import { OpenTriviaService } from '../_services/open-trivia.service';
import { UpdateQuestion } from '../store/trivia.actions';

@Component({
  selector: 'app-trivia',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-trivia-display
      [questions]="questions$ | async"
      (buttonClick)="buttonClick($event)"
    ></app-trivia-display>
  `,
  styles: [],
})
export class TriviaComponent implements OnInit {
  // questions: Question[];

  @Select(TriviaState.questions) questions$: Observable<Question[]>;

  constructor(private store: Store, private triviaService: OpenTriviaService) {}

  ngOnInit() {}

  buttonClick(payload: Question) {
    // console.log('QuestionAfterChange', question);
    this.store.dispatch(new UpdateQuestion(payload));
  }
}
