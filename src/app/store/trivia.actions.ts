import { Question } from '../_models/question.model';
import { Query } from '../_models/query.model';

export class UpdateQuery {
  public static readonly type = '[Query] Update Query';
  constructor(public payload: Query) {}
}

export class PopulateQuestions {
  static readonly type = '[Questions] Populate Questions';
  constructor(public payload: Question[]) { }
}
