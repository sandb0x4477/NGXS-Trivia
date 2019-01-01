import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';

import { OpenTriviaService } from '../_services/open-trivia.service';
import { Store, Select } from '@ngxs/store';
import { PopulateQuestions } from '../store/trivia.actions';

import { Query } from '../_models/query.model';
import { Question } from '../_models/question.model';
import { TriviaState } from '../store/trivia.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styles: [],
})
export class StartPageComponent implements OnInit {
  query: Query;
  questions: Question[];
  queryForm;

  @Select(TriviaState.questions) questions$: Observable<Question[]>;
  @Select(TriviaState.query) query$: Observable<Query>;

  constructor(
    private fb: FormBuilder,
    private triviaService: OpenTriviaService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.query = {
      numberOfQuests: 5,
      category: 'any',
      difficulty: 'any',
      type: 'any',
    };

  }

  // createForm() {
  //   this.queryForm = this.fb.group({

  //   });
  // }

  checkAnswer(question, i, j) {
    console.log('i', i);
    console.log('j', j);
    for (let k = 0; k < this.questions[i].buttonClass.length; k++) {
      this.questions[i].buttonClass[k] = 'uk-button uk-button-default uk-width-1-1';
    }
    // if (j === question.correctAnswer_index) {
    //   console.log('Correct');
    //   this.questions[i].buttonClass[j] = 'uk-button uk-button-primary uk-width-1-1';
    // } else {
    //   console.log('Inorrect');
    //   this.questions[i].buttonClass[j] = 'uk-button uk-button-danger uk-width-1-1';
    // }
    this.questions[i].buttonClass[j] = 'uk-button uk-button-secondary uk-width-1-1';
    this.questions[i].isAnswered = true;
    this.questions[i].clickedButtonIndex = j;
    console.log('this.questions[i]', this.questions[i]);
  }

  fetchQuestions(f: NgForm) {
    if (f.value.category === 'any') {
      f.value.category = '';
    }
    if (f.value.difficulty === 'any') {
      f.value.difficulty = '';
    }
    if (f.value.type === 'any') {
      f.value.type = '';
    }
    this.triviaService.getQuestions(f.value).subscribe((response: Question[]) => {
      this.questions = this.parseText(response);
      this.fillQuestionsPool(this.questions);
      console.log('this.questions', this.questions);
      this.store.dispatch(new PopulateQuestions(this.questions));
    });
  }

  fillQuestionsPool(questions: Question[]) {
    for (let i = 0; i < questions.length; i++) {
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
