import { State, Action, Selector, StateContext } from '@ngxs/store';
import { classToPlain } from 'class-transformer';
import 'reflect-metadata';
import { asapScheduler } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import {
  PopulateQuestions,
  UpdateQuery,
  FetchQuestions,
  FetchQuestionsSuccess,
  UpdateQuestion,
} from './trivia.actions';
import { Query } from '../_models/query.model';
import { Question } from '../_models/question.model';
import { OpenTriviaService } from '../_services/open-trivia.service';

export interface TriviaStateModel {
  query: Query;
  questions: Question[];
}

@State<TriviaStateModel>({
  name: 'trivia',
  defaults: {
    query: {
      numberOfQuests: 10,
      category: 'any',
      difficulty: 'any',
      type: 'any',
    },
    questions: [],
  },
})
export class TriviaState {
  constructor(private triviaService: OpenTriviaService) {}

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
    // const question: any = classToPlain(action.payload);
    // const question: any = action.payload;
    // const questions = state.questions;

    ctx.patchState({
      questions: state.questions.map((item, index) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      }),
    });
  }

  @Action(FetchQuestions)
  public fetchQuestions(
    { getState, patchState, dispatch }: StateContext<TriviaStateModel>,
    action: FetchQuestions,
  ) {
    const query = Object.assign({}, action.payload);

    return this.triviaService
      .getQuestions(query)
      .pipe(
        map((questions: Question[]) =>
          asapScheduler.schedule(() => dispatch(new FetchQuestionsSuccess(questions))),
        ),
      );
    // return this.triviaService
    //   .getQuestions(query)
    //   .pipe(tap((questions: Question[]) => dispatch(new FetchQuestionsSuccess(questions))));
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
    });
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
      // questions[i].buttonClass.push('uk-button uk-button-default uk-width-1-1');
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
