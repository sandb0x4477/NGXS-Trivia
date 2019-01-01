import { State, Action, Selector, StateContext } from '@ngxs/store';

import { PopulateQuestions, UpdateQuery } from './trivia.actions';
import { Query } from '../_models/query.model';
import { Question } from '../_models/question.model';

export interface TriviaStateModel {
  query: Query;
  questions: Question[];
}

@State<TriviaStateModel>({
  name: 'trivia',
  defaults: {
    query: {
      numberOfQuests: 5,
      category: '9',
      difficulty: 'any',
      type: 'any',
    },
    questions: [],
  },
})
export class TriviaState {
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
  public updateQuery({ getState, patchState }: StateContext<TriviaStateModel>, { payload }: UpdateQuery) {
    patchState({
      query: payload,
    });
  }

  @Action(PopulateQuestions)
  public add({ getState, patchState }: StateContext<TriviaStateModel>, { payload }: PopulateQuestions) {
    patchState({
      questions: payload,
    });
  }
}
