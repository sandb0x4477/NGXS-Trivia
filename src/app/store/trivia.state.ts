import { State, Action, Selector, StateContext } from '@ngxs/store';
import { asapScheduler } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  PopulateQuestions,
  UpdateQuery,
  FetchQuestions,
  FetchQuestionsSuccess,
  UpdateQuestion,
  ChangePage,
  Finish,
} from './trivia.actions';
import { Query } from '../_models/query.model';
import { Question } from '../_models/question.model';
import { Navigation } from '../_models/navigation.model';
import { OpenTriviaService } from '../_services/open-trivia.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

export interface TriviaStateModel {
  query: Query;
  questions: Question[];
  navigation: Navigation;
}

@State<TriviaStateModel>({
  name: 'trivia',
  defaults: {
    query: {
      numberOfQuests: 2,
      category: 'any',
      difficulty: 'any',
      type: 'any',
    },
    questions: [],
    navigation: {
      currentPage: 0,
      totalPages: null,
      isFinished: false,
      score: 0,
    },
  },
})
export class TriviaState {
  constructor(private triviaService: OpenTriviaService, private router: Router, private ngZone: NgZone) {}

  @Selector()
  public static getState(state: TriviaStateModel) {
    return state;
  }

  @Selector()
  public static query(state: TriviaStateModel): Query {
    return state.query;
  }

  @Selector()
  public static questions(state: TriviaStateModel): Question[] {
    return state.questions;
  }

  @Selector()
  public static navigation(state: TriviaStateModel): Navigation {
    return state.navigation;
  }

  @Action(ChangePage)
  public changePage(
    { getState, patchState }: StateContext<TriviaStateModel>,
    { payload }: ChangePage,
  ) {
    patchState({
      navigation: { ...getState().navigation, currentPage: payload },
    });
  }

  @Action(Finish)
  public finish({ getState, patchState }: StateContext<TriviaStateModel>, { payload }: Finish) {
    patchState({
      navigation: {
        ...getState().navigation,
        isFinished: payload.isFinished,
        score: payload.score,
      },
    });
  }

  @Action(UpdateQuery)
  public updateQuery(
    { getState, patchState }: StateContext<TriviaStateModel>,
    { payload }: UpdateQuery,
  ) {
    patchState({
      query: payload,
    });
  }

  @Action(PopulateQuestions)
  public add(
    { getState, patchState }: StateContext<TriviaStateModel>,
    { payload }: PopulateQuestions,
  ) {
    patchState({
      questions: payload,
    });
  }

  @Action(UpdateQuestion)
  public updateQuestion(ctx: StateContext<TriviaStateModel>, action: UpdateQuestion) {
    const state = ctx.getState();

    ctx.patchState({
      questions: state.questions.map((item, index) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      }),
    });
  }

  @Action(FetchQuestions, { cancelUncompleted: true })
  public fetchQuestions(
    { getState, patchState, dispatch }: StateContext<TriviaStateModel>,
    action: FetchQuestions,
  ) {
    const query = Object.assign({}, action.payload);

    return this.triviaService.getQuestions(query).subscribe(
      (questions: Question[]) => {
        console.log('Success fetching data');
        dispatch(new FetchQuestionsSuccess(questions));
      },
      error => {
        console.log(error);
      },
    );
    // return this.triviaService
    //   .getQuestions(query)
    //   .pipe(
    //     map((questions: Question[]) =>
    //       asapScheduler.schedule(() => dispatch(new FetchQuestionsSuccess(questions))),
    //     ),
    //   );
  }

  @Action(FetchQuestionsSuccess)
  public fetchQuestionsSuccess(
    { getState, patchState, dispatch }: StateContext<TriviaStateModel>,
    { payload }: FetchQuestionsSuccess,
  ) {
    let questions: Question[] = this.parseText(payload);
    questions = this.fillQuestionsPool(questions);

    patchState({
      questions: questions,
      navigation: { currentPage: 0, totalPages: questions.length, isFinished: false, score: 0 },
    });
    // this.router.navigateByUrl('trivia');
    this.ngZone.run(() => this.router.navigate(['/trivia'])).then();
  }

  // =============================================================================
  // * FUNCTIONS
  // =============================================================================
  fillQuestionsPool(questions: Question[]) {
    for (let i = 0; i < questions.length; i++) {
      questions[i].id = i;
      questions[i].clickedButtonIndex = null;
      questions[i].buttonClass = [];
      const randomInt = this.getRandomInt(0, questions[i].incorrect_answers.length);
      questions[i].questions_pool = [...questions[i].incorrect_answers];
      questions[i].questions_pool.splice(randomInt, 0, questions[i].correct_answer);
      questions[i].correctAnswer_index = randomInt;
      questions[i].isAnswered = false;
      for (let j = 0; j < questions[i].questions_pool.length; j++) {
        questions[i].buttonClass[j] = 'uk-button uk-button-default uk-width-1-1';
      }
    }
    return questions;
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // ===========================================================================
  // * CONVERT HTML TEXT
  // ===========================================================================
  parseText(questions: Question[]) {
    for (let i = 0; i < questions.length; i++) {
      questions[i].question = this.decodeHtml(questions[i].question);
      questions[i].correct_answer = this.decodeHtml(questions[i].correct_answer);

      for (let j = 0; j < questions[i].incorrect_answers.length; j++) {
        questions[i].incorrect_answers[j] = this.decodeHtml(questions[i].incorrect_answers[j]);
      }
    }
    return questions;
  }

  decodeHtml(html: string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
}
