import { Question } from '../_models/question.model';
import { Query } from '../_models/query.model';
import { Navigation } from '../_models/navigation.model';

export class UpdateQuery {
  public static readonly type = '[Query] Update Query';
  constructor(public payload: Query) {}
}

export class PopulateQuestions {
  static readonly type = '[Questions] Populate Questions';
  constructor(public payload: Question[]) { }
}

// !FETCH QUESTIONS
export class FetchQuestions {
  static readonly type = '[Questions] Fetch Questions';

  constructor(public payload: Query) {}
}

export class FetchQuestionsSuccess {
  static readonly type = '[Questions] Fetch Questions Success';

  constructor(public payload: Question[]) {}
}

export class FetchQuestionsFail {
  static readonly type = '[Questions] Fetch Questions Fail';

  constructor(public payload?: any) {}
}

export class UpdateQuestion {
  static readonly type = '[Questions] Update Question';

  constructor(public payload: Question) { }
}

export class ChangePage {
  static readonly type = '[Navigation] Next Page';

  constructor(public payload: number) { }
}

export class Finish {
  static readonly type = '[Navigation] Finish';

  constructor(public payload: Partial<Navigation>) { }
}



