import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Question } from '../_models/question.model';
import { TriviaState } from '../store/trivia.state';
import { UpdateQuestion, ChangePage, PopulateQuestions, Finish } from '../store/trivia.actions';
import { Navigation } from '../_models/navigation.model';

@Component({
  selector: 'app-trivia',
  template: `
    <app-trivia-display
      [questions]="questions$ | async"
      [navigation]="navigation$ | async"
      (buttonClick)="buttonClick($event)"
      (changePageEm)="changePage($event)"
      (finishEm)="finish($event)"
    ></app-trivia-display>
  `,
  styles: [],
})
export class TriviaComponent implements OnInit {
  // questions: Question[];

  @Select(TriviaState.questions) questions$: Observable<Question[]>;
  @Select(TriviaState.navigation) navigation$: Observable<Navigation>;

  constructor(private store: Store) {}

  ngOnInit() {}

  buttonClick(click) {
    const { question, j } = click;
    const payload: any = JSON.parse(JSON.stringify(question));

    payload.clickedButtonIndex = j;
    for (let k = 0; k < payload.buttonClass.length; k++) {
      payload.buttonClass[k] = 'uk-button uk-button-default uk-width-1-1';
    }
    payload.buttonClass.splice(j, 1, 'uk-button uk-button-secondary uk-width-1-1');
    payload.isAnswered = true;

    this.store.dispatch(new UpdateQuestion(payload));
  }

  changePage(event: number) {
    this.store.dispatch(new ChangePage(event));
  }

  finish(questions: Question[]) {
    const payload: Question[] = JSON.parse(JSON.stringify(questions));
    let score = 0;
    const isFinished = true;

    for (let i = 0; i < payload.length; i++) {
      if (payload[i].clickedButtonIndex === payload[i].correctAnswer_index) {
        payload[i].buttonClass[payload[i].clickedButtonIndex] = 'uk-button uk-button-primary uk-width-1-1';
        score ++;
      } else {
        payload[i].buttonClass[payload[i].clickedButtonIndex] = 'uk-button uk-button-danger uk-width-1-1';
        payload[i].buttonClass[payload[i].correctAnswer_index] = 'uk-button uk-button-primary uk-width-1-1';
      }
    }


    console.log('payload', payload);
    this.store.dispatch( new Finish({isFinished, score}));
    this.store.dispatch( new PopulateQuestions(payload));
    console.log('score', score);
  }
}
