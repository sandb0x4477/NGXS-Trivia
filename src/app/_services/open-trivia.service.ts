import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Query } from '../_models/query.model';
import { Question } from '../_models/question.model';

@Injectable({
  providedIn: 'root',
})
export class OpenTriviaService {
  jsonDbURL = 'http://localhost:3000/results';

  trviaURL = 'https://opentdb.com/api.php?amount=';

  constructor(private http: HttpClient) {}

  getQuestions(query: Query): Observable<Question[]> {
    // console.log('queryFromService', query);
    if (query.category === 'any') {
      query.category = '';
    }
    if (query.difficulty === 'any') {
      query.difficulty = '';
    }
    if (query.type === 'any') {
      query.type = '';
    }

    const url = `${this.trviaURL}${query.numberOfQuests}&category=${query.category}&difficulty=${
      query.difficulty
    }&type=${query.type}`;
    // console.log(url);

    return this.http
      .get<{ results: Question[] }>(url)
      .pipe(map(response => response.results || []));

    // const url = this.jsonDbURL;
    // return this.http.get<Question[]>(url);
  }
}
