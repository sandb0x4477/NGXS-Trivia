import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Query } from '../_models/query.model';
import { Question } from '../_models/question.model';


@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  jsonDbURL = 'http://localhost:3000/results';

  trviaURL = 'https://opentdb.com/api.php?amount=';

  constructor(private http: HttpClient) { }

  getQuestions(query: Query): Observable<Question[]> {
    // const url = `${ this.trviaURL }${ query.numberOfQuests }&category=${
    //   query.category
    //   }&difficulty=${ query.difficulty }&type=${ query.type }`;
    // // console.log(url);
    const url = this.jsonDbURL;

    return this.http.get<Question[]>(url);
  }
}
